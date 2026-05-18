import { createAdminClient } from "@/lib/supabase/admin";

export type AccessRequestRow = {
  id: string;
  full_name: string | null;
  organization: string | null;
  email: string | null;
  role: string | null;
  program: string | null;
  requirements: string | null;
  submitted_at: string | null;
  status: string | null;
};

export type AccessRequestInsert = {
  full_name: string;
  organization: string;
  email: string;
  role: string;
  program?: string | null;
  requirements?: string | null;
  status?: string;
};

export async function insertAccessRequest(data: AccessRequestInsert) {
  const supabase = createAdminClient();
  const { data: row, error } = await supabase
    .from("access_requests")
    .insert({
      full_name: data.full_name,
      organization: data.organization,
      email: data.email,
      role: data.role,
      program: data.program ?? null,
      requirements: data.requirements ?? null,
      status: data.status ?? "pending",
    })
    .select()
    .single();

  if (error) {
    console.error("access_requests insert error:", error.message);
    return { ok: false as const, error: error.message };
  }
  return { ok: true as const, row: row as AccessRequestRow };
}

export async function listAccessRequests() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("access_requests")
    .select("*")
    .order("submitted_at", { ascending: false });

  if (error) {
    console.error("access_requests list error:", error.message);
    return [] as AccessRequestRow[];
  }
  return (data ?? []) as AccessRequestRow[];
}

export async function updateAccessRequestStatus(id: string, status: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("access_requests").update({ status }).eq("id", id);
  if (error) {
    return { ok: false as const, error: error.message };
  }
  return { ok: true as const };
}
