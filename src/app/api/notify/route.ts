import { Resend } from "resend";
import { NextResponse } from "next/server";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not configured");
  return new Resend(key);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, organization, email, role, program, requirements } = body as {
      name?: string;
      organization?: string;
      email?: string;
      role?: string;
      program?: string;
      requirements?: string;
    };

    if (!name?.trim() || !organization?.trim() || !email?.trim() || !role?.trim()) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 422 });
    }

    const safeName = escapeHtml(name.trim());
    const safeOrg = escapeHtml(organization.trim());
    const safeEmail = escapeHtml(email.trim());
    const safeRole = escapeHtml(role.trim());
    const safeProgram = escapeHtml(program?.trim() || "Not provided");
    const safeRequirements = escapeHtml(requirements?.trim() || "Not provided");

    const resend = getResend();

    await resend.emails.send({
      from: "Weatherhaven Platform <onboarding@resend.dev>",
      to: "barry.castelli33@gmail.com",
      subject: `New Request Access Submission — ${organization.trim()}`,
      html: `
        <div style="background:#080a0c;color:#ffffff;padding:40px;font-family:monospace;max-width:600px;">
          <p style="color:#c8a96e;letter-spacing:0.2em;font-size:11px;margin:0;">NEW REQUEST ACCESS SUBMISSION</p>
          <h1 style="color:#ffffff;font-size:22px;margin:8px 0 32px;">${safeName} — ${safeOrg}</h1>
          <table style="width:100%;border-collapse:collapse;">
            <tr style="border-bottom:1px solid rgba(255,255,255,0.08);">
              <td style="color:#8a9099;padding:12px 0;width:160px;font-size:13px;">Full Name</td>
              <td style="color:#ffffff;padding:12px 0;font-size:13px;">${safeName}</td>
            </tr>
            <tr style="border-bottom:1px solid rgba(255,255,255,0.08);">
              <td style="color:#8a9099;padding:12px 0;font-size:13px;">Organization</td>
              <td style="color:#ffffff;padding:12px 0;font-size:13px;">${safeOrg}</td>
            </tr>
            <tr style="border-bottom:1px solid rgba(255,255,255,0.08);">
              <td style="color:#8a9099;padding:12px 0;font-size:13px;">Official Email</td>
              <td style="color:#ffffff;padding:12px 0;font-size:13px;">${safeEmail}</td>
            </tr>
            <tr style="border-bottom:1px solid rgba(255,255,255,0.08);">
              <td style="color:#8a9099;padding:12px 0;font-size:13px;">Role / Title</td>
              <td style="color:#ffffff;padding:12px 0;font-size:13px;">${safeRole}</td>
            </tr>
            <tr style="border-bottom:1px solid rgba(255,255,255,0.08);">
              <td style="color:#8a9099;padding:12px 0;font-size:13px;">Program / Unit</td>
              <td style="color:#ffffff;padding:12px 0;font-size:13px;">${safeProgram}</td>
            </tr>
            <tr>
              <td style="color:#8a9099;padding:12px 0;font-size:13px;vertical-align:top;">Requirements</td>
              <td style="color:#ffffff;padding:12px 0;font-size:13px;">${safeRequirements}</td>
            </tr>
          </table>
          <p style="color:#8a9099;font-size:10px;margin-top:40px;letter-spacing:0.1em;">SUBMITTED VIA WEATHERHAVENUSA.COM · ${new Date().toISOString()}</p>
        </div>
      `,
    });

    await resend.emails.send({
      from: "Weatherhaven Platform <onboarding@resend.dev>",
      to: email.trim(),
      subject: "Thank you for your interest in Weatherhaven",
      html: `
        <div style="background:#080a0c;color:#ffffff;padding:40px;font-family:monospace;max-width:600px;">
          <p style="color:#c8a96e;letter-spacing:0.2em;font-size:11px;margin:0;">WEATHERHAVEN RESOURCE INC.</p>
          <h1 style="color:#ffffff;font-size:22px;margin:8px 0;">Request Received</h1>
          <p style="color:#8a9099;font-size:14px;margin:24px 0 16px;">Thank you for your interest in Weatherhaven deployable shelter and infrastructure systems, ${safeName}.</p>
          <p style="color:#8a9099;font-size:14px;margin:0 0 16px;">We have received your request and a member of our SOF solutions team will review your submission and contact you within 48 hours to verify affiliation and discuss program alignment.</p>
          <p style="color:#8a9099;font-size:14px;margin:0 0 32px;">Technical exchanges are matched to clearance and program status prior to disclosure.</p>
          <div style="border:1px solid rgba(255,255,255,0.08);padding:24px;margin:24px 0;">
            <p style="color:#8a9099;font-size:11px;letter-spacing:0.15em;margin:0 0 16px;">YOUR SUBMISSION</p>
            <p style="margin:0 0 8px;font-size:13px;">
              <span style="color:#8a9099;">Name: </span>
              <span style="color:#ffffff;">${safeName}</span>
            </p>
            <p style="margin:0 0 8px;font-size:13px;">
              <span style="color:#8a9099;">Organization: </span>
              <span style="color:#ffffff;">${safeOrg}</span>
            </p>
            <p style="margin:0;font-size:13px;">
              <span style="color:#8a9099;">Role: </span>
              <span style="color:#ffffff;">${safeRole}</span>
            </p>
          </div>
          <p style="color:#8a9099;font-size:13px;margin:0;">If you have questions contact us directly at <a href="mailto:defense@weatherhaven.com" style="color:#c8a96e;">defense@weatherhaven.com</a></p>
          <p style="color:#8a9099;font-size:10px;margin-top:40px;letter-spacing:0.1em;">WEATHERHAVEN RESOURCE INC. · WEATHERHAVENUSA.COM</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email notification error:", error);
    return NextResponse.json({ error: "Failed to send notification" }, { status: 500 });
  }
}
