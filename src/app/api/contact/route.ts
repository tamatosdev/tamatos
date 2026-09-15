import { Resend } from "resend";
import { NextResponse } from "next/server";

const recipient = process.env.RESEND_TO_EMAIL || "hello@tamatos.com";
const MAX_FILE_BYTES = 2 * 1024 * 1024;
const ACCEPTED_EXTENSIONS = [".pdf", ".doc", ".docx", ".ppt", ".pptx"];
const ACCEPTED_MIME = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
]);

function createResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("Missing Resend API key.");
  }
  return new Resend(apiKey);
}

function isAcceptedFile(file: File) {
  const lower = file.name.toLowerCase();
  const hasExt = ACCEPTED_EXTENSIONS.some((ext) => lower.endsWith(ext));
  const hasMime = !file.type || ACCEPTED_MIME.has(file.type);
  return hasExt && hasMime;
}

async function parseBody(request: Request): Promise<{
  payload: Record<string, unknown>;
  file?: File;
}> {
  const contentType = request.headers.get("content-type") || "";

  if (contentType.includes("multipart/form-data")) {
    const form = await request.formData();
    const payload: Record<string, unknown> = {};
    let file: File | undefined;

    for (const [key, value] of form.entries()) {
      if (key === "file" && value instanceof File) {
        file = value;
        continue;
      }
      payload[key] = typeof value === "string" ? value : String(value);
    }

    return { payload, file };
  }

  const payload = (await request.json()) as Record<string, unknown>;
  return { payload };
}

export async function POST(request: Request) {
  try {
    const { payload, file } = await parseBody(request);
    const type = String(payload.type || "");
    const fullName = String(payload.fullName || "");

    if (file) {
      if (!isAcceptedFile(file)) {
        return NextResponse.json(
          { error: "Only PDF, DOC, DOCX, PPT, or PPTX files are allowed." },
          { status: 400 }
        );
      }
      if (file.size > MAX_FILE_BYTES) {
        return NextResponse.json({ error: "File must be 2MB or smaller." }, { status: 400 });
      }
    }

    const subject = type === "project" ? "New Project Inquiry" : "New Query";
    const html = generateHtml(payload, file?.name);
    const fromEmail = process.env.RESEND_FROM_EMAIL || "no-reply@tamatos.com";
    const fromName = fullName || "Tamatos Contact Form";
    const from = `${fromName} <${fromEmail}>`;

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: "Missing Resend API key." }, { status: 500 });
    }

    const resend = createResendClient();
    const attachments =
      file && file.size > 0
        ? [
            {
              filename: file.name,
              content: Buffer.from(await file.arrayBuffer()),
            },
          ]
        : undefined;

    await resend.emails.send({
      from,
      to: recipient,
      subject,
      html,
      attachments,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Failed to send contact message." }, { status: 500 });
  }
}

function generateHtml(payload: Record<string, unknown>, fileName?: string) {
  const type = String(payload.type || "");
  const detailMode = String(payload.detailMode || "");

  const orderedKeys =
    type === "project"
      ? ["fullName", "email", "budget", "service", "about", "consent"]
      : ["fullName", "email", "phone", "subject", "message", "consent"];

  const rows = [
    `<p><strong>Inquiry Type:</strong> ${type === "project" ? "Project" : "Query"}</p>`,
    ...orderedKeys.map((key) => {
      const value = payload[key];
      if (value === undefined || value === null || value === "") {
        if (key === "about" && fileName) {
          return `<p><strong>${formatLabel(key)}:</strong> (see attached file)</p>`;
        }
        return null;
      }
      return `<p><strong>${formatLabel(key)}:</strong> ${String(value)}</p>`;
    }),
    detailMode
      ? `<p><strong>Project details mode:</strong> ${detailMode === "upload" ? "Upload" : "Write"}</p>`
      : null,
    fileName ? `<p><strong>Attachment:</strong> ${fileName}</p>` : null,
  ]
    .filter(Boolean)
    .join("");

  return `
    <div style="font-family: system-ui, sans-serif; color: #111; line-height: 1.5;">
      <h2>New contact message from Tamatos website</h2>
      ${rows}
    </div>
  `;
}

function formatLabel(key: string) {
  const labels: Record<string, string> = {
    type: "Inquiry Type",
    fullName: "Full Name",
    email: "Email",
    phone: "Phone",
    subject: "Subject",
    message: "Message",
    budget: "Budget",
    service: "Interested Service",
    about: "About Project",
    consent: "Consent",
  };

  return labels[key] || key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());
}
