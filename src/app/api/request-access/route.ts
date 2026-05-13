import { NextResponse } from "next/server";

type Body = {
  name?: string;
  organization?: string;
  email?: string;
  role?: string;
  program?: string;
  message?: string;
};

function isNonEmpty(s: unknown): s is string {
  return typeof s === "string" && s.trim().length > 0;
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  if (
    !isNonEmpty(body.name) ||
    !isNonEmpty(body.organization) ||
    !isNonEmpty(body.email) ||
    !isNonEmpty(body.role)
  ) {
    return NextResponse.json(
      { ok: false, error: "Name, organization, official email, and role are required." },
      { status: 422 },
    );
  }

  const reference = `WH-RA-${Date.now().toString(36).toUpperCase().slice(-8)}`;
  const submittedAt = new Date().toISOString();
  const payload = {
    reference,
    submittedAt,
    name: body.name.trim(),
    organization: body.organization.trim(),
    email: body.email.trim(),
    role: body.role.trim(),
    program: body.program?.trim() || null,
    message: body.message?.trim() || null,
  };

  let webhookDelivered = false;
  const webhookUrl = process.env.REQUEST_ACCESS_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const wh = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event: "request_access", ...payload }),
      });
      webhookDelivered = wh.ok;
    } catch {
      webhookDelivered = false;
    }
  }

  return NextResponse.json({
    ok: true,
    reference,
    webhookDelivered: webhookUrl ? webhookDelivered : undefined,
    message: "Request recorded. A programs representative will respond through official channels.",
  });
}
