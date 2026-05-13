import { NextResponse } from "next/server";
import { getLeadStatuses, listLeads, updateLeadStatus } from "@/lib/leadsStore";

function unauthorized() {
  return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
}

function auth(req: Request) {
  const token = process.env.LEADS_ADMIN_TOKEN;
  if (!token) return false;
  const h = req.headers.get("authorization");
  if (!h?.startsWith("Bearer ")) return false;
  return h.slice(7) === token;
}

export async function GET(req: Request) {
  if (!auth(req)) return unauthorized();
  return NextResponse.json({ ok: true, leads: listLeads(), statuses: [...getLeadStatuses()] });
}

export async function PATCH(req: Request) {
  if (!auth(req)) return unauthorized();
  let body: { reference?: string; status?: string };
  try {
    body = (await req.json()) as { reference?: string; status?: string };
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }
  const ref = typeof body.reference === "string" ? body.reference.trim() : "";
  const status = typeof body.status === "string" ? body.status.trim() : "";
  if (!ref || !status) {
    return NextResponse.json({ ok: false, error: "reference and status required." }, { status: 422 });
  }
  const updated = updateLeadStatus(ref, status);
  if (!updated) {
    return NextResponse.json({ ok: false, error: "Lead not found or invalid status." }, { status: 404 });
  }
  return NextResponse.json({ ok: true, lead: updated });
}
