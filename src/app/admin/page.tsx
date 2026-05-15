import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { AdminUsersClient } from "./AdminUsersClient";
import type { AdminUserRow } from "./actions";

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    redirect("/");
  }

  const admin = createAdminClient();
  const { data } = await admin.auth.admin.listUsers({ perPage: 1000 });
  const initialUsers: AdminUserRow[] = (data?.users ?? []).map((u) => ({
    id: u.id,
    email: u.email,
    created_at: u.created_at ?? "",
    last_sign_in_at: u.last_sign_in_at,
  }));

  return (
    <main className="min-h-dvh bg-[#080a0c] pt-16 text-white lg:pt-[4.25rem]">
      <AdminUsersClient initialUsers={initialUsers} />
    </main>
  );
}
