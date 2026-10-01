import { Resend } from "resend";
import { NextResponse } from "next/server";

const MAX_FILE_BYTES = 2 * 1024 * 1024;
const ACCEPTED_EXTENSIONS = [".pdf", ".doc", ".docx", ".ppt", ".pptx"];
const ACCEPTED_MIME = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
]);

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
    const apiKey = process.env.RESEND_API_KEY?.trim();
    const recipient = process.env.RESEND_TO_EMAIL?.trim() || "hello@tamatos.com";
    const fromEmail = process.env.RESEND_FROM_EMAIL?.trim() || "onboarding@resend.dev";

    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing RESEND_API_KEY on the server." },
        { status: 500 }
      );
    }

    const { payload, file } = await parseBody(request);
    const type = String(payload.type || "");
    const fullName = String(payload.fullName || "").trim();
    const replyEmail = String(payload.email || "").trim();

    if (!fullName || !replyEmail) {
      return NextResponse.json(
        { error: "Full name and email are required." },
        { status: 400 }
      );
    }

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
    const fromName = "Tamatos Contact Form";
    const from = `${fromName} <${fromEmail}>`;

    const attachments =
      file && file.size > 0
        ? [
            {
              filename: file.name,
              content: Buffer.from(await file.arrayBuffer()),
            },
          ]
        : undefined;

    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from,
      to: recipient,
      replyTo: replyEmail,
      subject,
      html,
      attachments,
    });

    if (error) {
      console.error("Resend API error:", error);
      return NextResponse.json(
        {
          error:
            error.message ||
            "Email provider rejected the message. Check RESEND_FROM_EMAIL domain verification.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id ?? null });
  } catch (error) {
    console.error("Contact API error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to send contact message.";
    return NextResponse.json({ error: message }, { status: 500 });
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
      return `<p><strong>${formatLabel(key)}:</strong> ${escapeHtml(String(value))}</p>`;
    }),
    detailMode
      ? `<p><strong>Project details mode:</strong> ${detailMode === "upload" ? "Upload" : "Write"}</p>`
      : null,
    fileName ? `<p><strong>Attachment:</strong> ${escapeHtml(fileName)}</p>` : null,
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

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
