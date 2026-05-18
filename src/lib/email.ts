import { Resend } from "resend";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export type AccessNotificationPayload = {
  name: string;
  organization: string;
  email: string;
  role: string;
  program?: string | null;
  requirements?: string | null;
  source?: string;
};

export async function sendAccessNotification(payload: AccessNotificationPayload) {
  const resend = getResend();
  if (!resend) {
    console.warn("RESEND_API_KEY not set — skipping email notification.");
    return { ok: false as const, skipped: true };
  }

  const name = escapeHtml(payload.name);
  const organization = escapeHtml(payload.organization);
  const email = escapeHtml(payload.email);
  const role = escapeHtml(payload.role);
  const program = escapeHtml(payload.program?.trim() || "Not provided");
  const requirements = escapeHtml(payload.requirements?.trim() || "Not provided");
  const source = escapeHtml(payload.source || "Request Access");

  const { error } = await resend.emails.send({
    from: "Weatherhaven Platform <onboarding@resend.dev>",
    to: "barry.castelli33@gmail.com",
    subject: `New ${source} Submission — ${organization}`,
    html: `
      <div style="background:#080a0c;color:#ffffff;padding:40px;font-family:monospace;">
        <h2 style="color:#c8a96e;letter-spacing:0.2em;font-size:12px;">NEW ${source.toUpperCase()} SUBMISSION</h2>
        <h1 style="color:#ffffff;font-size:24px;margin-top:8px;">${name} — ${organization}</h1>
        <table style="width:100%;margin-top:24px;border-collapse:collapse;">
          <tr style="border-bottom:1px solid rgba(255,255,255,0.08);">
            <td style="color:#8a9099;padding:12px 0;width:160px;">Full Name</td>
            <td style="color:#ffffff;padding:12px 0;">${name}</td>
          </tr>
          <tr style="border-bottom:1px solid rgba(255,255,255,0.08);">
            <td style="color:#8a9099;padding:12px 0;">Organization</td>
            <td style="color:#ffffff;padding:12px 0;">${organization}</td>
          </tr>
          <tr style="border-bottom:1px solid rgba(255,255,255,0.08);">
            <td style="color:#8a9099;padding:12px 0;">Official Email</td>
            <td style="color:#ffffff;padding:12px 0;">${email}</td>
          </tr>
          <tr style="border-bottom:1px solid rgba(255,255,255,0.08);">
            <td style="color:#8a9099;padding:12px 0;">Role / Title</td>
            <td style="color:#ffffff;padding:12px 0;">${role}</td>
          </tr>
          <tr style="border-bottom:1px solid rgba(255,255,255,0.08);">
            <td style="color:#8a9099;padding:12px 0;">Program / Unit</td>
            <td style="color:#ffffff;padding:12px 0;">${program}</td>
          </tr>
          <tr>
            <td style="color:#8a9099;padding:12px 0;">Requirements</td>
            <td style="color:#ffffff;padding:12px 0;">${requirements}</td>
          </tr>
        </table>
        <p style="color:#8a9099;font-size:11px;margin-top:32px;">Submitted via weatherhavenusa.com · ${new Date().toISOString()}</p>
      </div>
    `,
  });

  if (error) {
    console.error("Resend error:", error);
    return { ok: false as const, error: error.message };
  }
  return { ok: true as const };
}

export async function sendWelcomeEmail(params: {
  to: string;
  password: string;
  siteUrl: string;
}) {
  const resend = getResend();
  if (!resend) {
    return { ok: false as const, skipped: true };
  }

  const to = escapeHtml(params.to);
  const password = escapeHtml(params.password);
  const siteUrl = escapeHtml(params.siteUrl);

  const { error } = await resend.emails.send({
    from: "Weatherhaven Platform <onboarding@resend.dev>",
    to: params.to,
    subject: "Weatherhaven Platform Access Approved",
    html: `
      <div style="background:#080a0c;color:#ffffff;padding:40px;font-family:monospace;">
        <h2 style="color:#c8a96e;letter-spacing:0.2em;font-size:12px;">ACCESS APPROVED</h2>
        <h1 style="color:#ffffff;font-size:22px;margin-top:8px;">Weatherhaven Platform</h1>
        <p style="color:#8a9099;font-size:14px;line-height:1.6;margin-top:16px;">
          Your request for platform access has been approved. Use the credentials below to sign in.
        </p>
        <table style="width:100%;margin-top:24px;border-collapse:collapse;">
          <tr style="border-bottom:1px solid rgba(255,255,255,0.08);">
            <td style="color:#8a9099;padding:12px 0;width:140px;">Email</td>
            <td style="color:#ffffff;padding:12px 0;">${to}</td>
          </tr>
          <tr>
            <td style="color:#8a9099;padding:12px 0;">Temporary password</td>
            <td style="color:#c8a96e;padding:12px 0;font-weight:600;">${password}</td>
          </tr>
        </table>
        <p style="margin-top:28px;">
          <a href="${siteUrl}/login" style="display:inline-block;background:#ffffff;color:#000000;padding:12px 24px;text-decoration:none;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;">Sign in</a>
        </p>
        <p style="color:#8a9099;font-size:11px;margin-top:32px;">Change your password after first login. Do not share credentials.</p>
      </div>
    `,
  });

  if (error) {
    return { ok: false as const, error: error.message };
  }
  return { ok: true as const };
}

export function generateTempPassword() {
  return `WH-${Math.random().toString(36).slice(2, 10).toUpperCase()}`;
}
