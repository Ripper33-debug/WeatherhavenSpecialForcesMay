import { Resend } from "resend";
import { NextResponse } from "next/server";
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

type Body = {
  full_name?: string;
  organization?: string;
  role?: string;
  inquiry_type?: string;
  program?: string;
  subject?: string;
  message?: string;
  contact_method?: string;
  phone?: string;
  email?: string;
};

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as Body;
    const {
      full_name,
      organization,
      role,
      inquiry_type,
      program,
      subject,
      message,
      contact_method,
      phone,
      email,
    } = body;

    if (
      !full_name?.trim() ||
      !organization?.trim() ||
      !role?.trim() ||
      !inquiry_type?.trim() ||
      !subject?.trim() ||
      !message?.trim() ||
      !contact_method?.trim()
    ) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 422 });
    }

    const submitterEmail = email?.trim() || user.email || "";
    if (!submitterEmail) {
      return NextResponse.json({ error: "Email required" }, { status: 422 });
    }

    const { error: insertError } = await supabase.from("contact_leads").insert({
      user_id: user.id,
      full_name: full_name.trim(),
      organization: organization.trim(),
      role: role.trim(),
      inquiry_type: inquiry_type.trim(),
      program: program?.trim() || null,
      subject: subject.trim(),
      message: message.trim(),
      contact_method: contact_method.trim(),
      phone: phone?.trim() || null,
      status: "new",
    });

    if (insertError) {
      console.error("contact_leads insert error:", insertError.message);
      return NextResponse.json({ error: "Failed to save inquiry" }, { status: 500 });
    }

    const safeName = escapeHtml(full_name.trim());
    const safeOrg = escapeHtml(organization.trim());
    const safeRole = escapeHtml(role.trim());
    const safeType = escapeHtml(inquiry_type.trim());
    const safeProgram = escapeHtml(program?.trim() || "Not provided");
    const safeSubject = escapeHtml(subject.trim());
    const safeMessage = escapeHtml(message.trim());
    const safeMethod = escapeHtml(contact_method.trim());
    const safePhone = escapeHtml(phone?.trim() || "Not provided");
    const safeEmail = escapeHtml(submitterEmail);

    const resend = getResend();

    await resend.emails.send({
      from: "Weatherhaven Platform <onboarding@resend.dev>",
      to: "barry.castelli33@gmail.com",
      subject: `New Engineering Inquiry — ${inquiry_type.trim()} — ${organization.trim()}`,
      html: `
        <div style="background:#080a0c;color:#ffffff;padding:40px;font-family:monospace;max-width:600px;">
          <p style="color:#c8a96e;letter-spacing:0.2em;font-size:11px;margin:0;">ENGINEERING TEAM LEAD — NOT AN ACCESS REQUEST</p>
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
              <td style="color:#8a9099;padding:12px 0;font-size:13px;">Email</td>
              <td style="color:#ffffff;padding:12px 0;font-size:13px;">${safeEmail}</td>
            </tr>
            <tr style="border-bottom:1px solid rgba(255,255,255,0.08);">
              <td style="color:#8a9099;padding:12px 0;font-size:13px;">Role / Title</td>
              <td style="color:#ffffff;padding:12px 0;font-size:13px;">${safeRole}</td>
            </tr>
            <tr style="border-bottom:1px solid rgba(255,255,255,0.08);">
              <td style="color:#8a9099;padding:12px 0;font-size:13px;">Inquiry Type</td>
              <td style="color:#ffffff;padding:12px 0;font-size:13px;">${safeType}</td>
            </tr>
            <tr style="border-bottom:1px solid rgba(255,255,255,0.08);">
              <td style="color:#8a9099;padding:12px 0;font-size:13px;">Program / Unit</td>
              <td style="color:#ffffff;padding:12px 0;font-size:13px;">${safeProgram}</td>
            </tr>
            <tr style="border-bottom:1px solid rgba(255,255,255,0.08);">
              <td style="color:#8a9099;padding:12px 0;font-size:13px;">Subject</td>
              <td style="color:#ffffff;padding:12px 0;font-size:13px;">${safeSubject}</td>
            </tr>
            <tr style="border-bottom:1px solid rgba(255,255,255,0.08);">
              <td style="color:#8a9099;padding:12px 0;font-size:13px;">Contact Method</td>
              <td style="color:#ffffff;padding:12px 0;font-size:13px;">${safeMethod}</td>
            </tr>
            <tr style="border-bottom:1px solid rgba(255,255,255,0.08);">
              <td style="color:#8a9099;padding:12px 0;font-size:13px;">Phone</td>
              <td style="color:#ffffff;padding:12px 0;font-size:13px;">${safePhone}</td>
            </tr>
            <tr>
              <td style="color:#8a9099;padding:12px 0;font-size:13px;vertical-align:top;">Message</td>
              <td style="color:#ffffff;padding:12px 0;font-size:13px;">${safeMessage}</td>
            </tr>
          </table>
          <p style="color:#8a9099;font-size:10px;margin-top:40px;letter-spacing:0.1em;">SUBMITTED VIA WEATHERHAVENUSA.COM · ${new Date().toISOString()}</p>
        </div>
      `,
    });

    await resend.emails.send({
      from: "Weatherhaven Platform <onboarding@resend.dev>",
      to: submitterEmail,
      subject: "Weatherhaven — We received your inquiry",
      html: `
        <div style="background:#080a0c;color:#ffffff;padding:40px;font-family:monospace;max-width:600px;">
          <p style="color:#c8a96e;letter-spacing:0.2em;font-size:11px;margin:0;">WEATHERHAVEN RESOURCE INC.</p>
          <h1 style="color:#ffffff;font-size:22px;margin:8px 0;">We received your inquiry</h1>
          <p style="color:#8a9099;font-size:14px;margin:24px 0 16px;">Thank you ${safeName}. A Weatherhaven engineer will review your inquiry and respond within 48 hours. We look forward to discussing your requirement.</p>
          <p style="color:#8a9099;font-size:10px;margin-top:40px;letter-spacing:0.1em;">WEATHERHAVEN RESOURCE INC. · WEATHERHAVENUSA.COM</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact lead error:", error);
    return NextResponse.json({ error: "Failed to submit inquiry" }, { status: 500 });
  }
}
