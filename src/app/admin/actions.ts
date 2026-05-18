"use server";

import { revalidatePath } from "next/cache";
import { isAdminEmail } from "@/lib/auth-admin";
import { updateAccessRequestStatus } from "@/lib/accessRequests";
import { updateContactLeadStatus } from "@/lib/contactLeads";
import { generateTempPassword } from "@/lib/email";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export type AdminUserRow = {
  id: string;
  email: string | undefined;
  created_at: string;
  last_sign_in_at: string | null | undefined;
};

async function assertAdmin(): Promise<boolean> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return isAdminEmail(user?.email);
}

export async function adminListUsers(): Promise<AdminUserRow[]> {
  if (!(await assertAdmin())) {
    return [];
  }
  const admin = createAdminClient();
  const { data } = await admin.auth.admin.listUsers({ perPage: 1000 });
  return (data?.users ?? []).map((u) => ({
    id: u.id,
    email: u.email,
    created_at: u.created_at ?? "",
    last_sign_in_at: u.last_sign_in_at,
  }));
}

export async function adminAddUser(
  email: string,
  password: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!(await assertAdmin())) {
    return { ok: false, error: "Unauthorized" };
  }
  const admin = createAdminClient();
  const { error } = await admin.auth.admin.createUser({ email, password, email_confirm: true });
  if (error) {
    return { ok: false, error: error.message };
  }
  revalidatePath("/admin");
  return { ok: true };
}

export async function adminDeleteUser(userId: string): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!(await assertAdmin())) {
    return { ok: false, error: "Unauthorized" };
  }
  const admin = createAdminClient();
  const { error } = await admin.auth.admin.deleteUser(userId);
  if (error) {
    return { ok: false, error: error.message };
  }
  revalidatePath("/admin");
  return { ok: true };
}

export async function adminApproveAccessRequest(
  requestId: string,
  email: string,
): Promise<{ ok: true; password: string } | { ok: false; error: string }> {
  if (!(await assertAdmin())) {
    return { ok: false, error: "Unauthorized" };
  }
  const trimmedEmail = email.trim();
  if (!trimmedEmail) {
    return { ok: false, error: "Email required" };
  }

  const password = generateTempPassword();
  const admin = createAdminClient();
  const { error: createError } = await admin.auth.admin.createUser({
    email: trimmedEmail,
    password,
    email_confirm: true,
  });

  if (createError) {
    return { ok: false, error: createError.message };
  }

  const statusResult = await updateAccessRequestStatus(requestId, "approved");
  if (!statusResult.ok) {
    return { ok: false, error: statusResult.error };
  }

  revalidatePath("/admin");
  return { ok: true, password };
}

export async function adminDenyAccessRequest(
  requestId: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!(await assertAdmin())) {
    return { ok: false, error: "Unauthorized" };
  }
  const result = await updateAccessRequestStatus(requestId, "denied");
  if (!result.ok) {
    return { ok: false, error: result.error };
  }
  revalidatePath("/admin");
  return { ok: true };
}

export async function adminUpdateContactLeadStatus(
  leadId: string,
  status: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!(await assertAdmin())) {
    return { ok: false, error: "Unauthorized" };
  }
  const result = await updateContactLeadStatus(leadId, status);
  if (!result.ok) {
    return { ok: false, error: result.error };
  }
  revalidatePath("/admin");
  return { ok: true };
}
