import { Resend } from "resend";
import { NextResponse } from "next/server";
import { isAdminEmail } from "@/lib/auth-admin";
import { createClient } from "@/lib/supabase/server";

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
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user || !isAdminEmail(user.email)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { email, name, tempPassword } = (await request.json()) as {
      email?: string;
      name?: string;
      tempPassword?: string;
    };

    if (!email?.trim() || !tempPassword?.trim()) {
      return NextResponse.json({ error: "Missing email or password" }, { status: 422 });
    }

    const safeEmail = escapeHtml(email.trim());
    const safePassword = escapeHtml(tempPassword.trim());

    await getResend().emails.send({
      from: "Weatherhaven Platform <onboarding@resend.dev>",
      to: email.trim(),
      subject: "Weatherhaven Platform Access Approved",
      html: `
        <div style="background:#080a0c;color:#ffffff;padding:40px;font-family:monospace;max-width:600px;">
          <p style="color:#c8a96e;letter-spacing:0.2em;font-size:11px;margin:0;">WEATHERHAVEN RESOURCE INC.</p>
          <h1 style="color:#ffffff;font-size:22px;margin:8px 0;">Platform Access Approved</h1>
          <p style="color:#8a9099;font-size:14px;margin:24px 0;">Your request has been reviewed and approved. Use the credentials below to access the platform.</p>
          <div style="border:1px solid rgba(255,255,255,0.08);padding:24px;margin:24px 0;">
            <p style="color:#8a9099;font-size:11px;letter-spacing:0.15em;margin:0 0 16px;">ACCESS CREDENTIALS</p>
            <p style="margin:0 0 8px;font-size:13px;">
              <span style="color:#8a9099;">Login URL: </span>
              <span style="color:#ffffff;">https://weatherhavenusa.com/login</span>
            </p>
            <p style="margin:0 0 8px;font-size:13px;">
              <span style="color:#8a9099;">Email: </span>
              <span style="color:#ffffff;">${safeEmail}</span>
            </p>
            <p style="margin:0;font-size:13px;">
              <span style="color:#8a9099;">Temporary Password: </span>
              <span style="color:#c8a96e;">${safePassword}</span>
            </p>
          </div>
          <p style="color:#8a9099;font-size:13px;">Please change your password after your first login.</p>
          <p style="color:#8a9099;font-size:10px;margin-top:40px;letter-spacing:0.1em;">ACCESS RESTRICTED TO AUTHORIZED PERSONNEL · WEATHERHAVENUSA.COM</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Welcome email error:", error);
    return NextResponse.json({ error: "Failed to send welcome email" }, { status: 500 });
  }
}
