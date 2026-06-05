import { Resend } from "resend";
import { NextResponse } from "next/server";

const recipient = process.env.RESEND_TO_EMAIL || "hello@tamatos.com";

function createResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("Missing Resend API key.");
  }
  return new Resend(apiKey);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, fullName } = body as { type: string; fullName: string };

    const subject = type === "project" ? "New Project Inquiry" : "New Query";
    const html = generateHtml(body);
    const fromEmail = process.env.RESEND_FROM_EMAIL || "no-reply@tamatos.com";
    const fromName = fullName || "Tamatos Contact Form";
    const from = `${fromName} <${fromEmail}>`;

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: "Missing Resend API key." }, { status: 500 });
    }

    const resend = createResendClient();
    await resend.emails.send({
      from,
      to: recipient,
      subject,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Failed to send contact message." }, { status: 500 });
  }
}

function generateHtml(payload: Record<string, unknown>) {
  const fields = Object.entries(payload)
    .filter(([key]) => key !== "type")
    .map(([key, value]) => {
      return `<p><strong>${formatLabel(key)}:</strong> ${String(value)}</p>`;
    })
    .join("");

  return `
    <div style="font-family: system-ui, sans-serif; color: #111; line-height: 1.5;">
      <h2>New contact message from Tamatos website</h2>
      ${fields}
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
    about: "About Project",
    consent: "Consent",
  };

  return labels[key] || key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase());
}
