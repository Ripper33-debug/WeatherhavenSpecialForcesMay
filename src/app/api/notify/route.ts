import { NextResponse } from "next/server";
import { sendAccessNotification } from "@/lib/email";

type Body = {
  name?: string;
  organization?: string;
  email?: string;
  role?: string;
  program?: string;
  requirements?: string;
  source?: string;
};

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON" }, { status: 400 });
  }

  const { name, organization, email, role, program, requirements, source } = body;
  if (!name?.trim() || !organization?.trim() || !email?.trim() || !role?.trim()) {
    return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 422 });
  }

  const result = await sendAccessNotification({
    name: name.trim(),
    organization: organization.trim(),
    email: email.trim(),
    role: role.trim(),
    program: program?.trim() || null,
    requirements: requirements?.trim() || null,
    source: source || "Request Access",
  });

  if (!result.ok && !("skipped" in result && result.skipped)) {
    return NextResponse.json({ success: false, error: "email_failed" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
