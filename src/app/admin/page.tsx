import { redirect } from "next/navigation";
import { isAdminEmail } from "@/lib/auth-admin";
import { fetchAdminAnalytics } from "@/lib/admin-analytics";
import { listAccessRequests } from "@/lib/accessRequests";
import { listContactLeads } from "@/lib/contactLeads";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { AdminDashboard } from "./AdminDashboard";
import type { AdminUserRow } from "./actions";

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !isAdminEmail(user.email)) {
    redirect("/");
  }

  const [analytics, authList, accessRequests, contactLeads] = await Promise.all([
    fetchAdminAnalytics(),
    createAdminClient().auth.admin.listUsers({ perPage: 1000 }),
    listAccessRequests(),
    listContactLeads(),
  ]);

  const initialUsers: AdminUserRow[] = (authList.data?.users ?? []).map((u) => ({
    id: u.id,
    email: u.email,
    created_at: u.created_at ?? "",
    last_sign_in_at: u.last_sign_in_at,
  }));

  return (
    <main className="min-h-dvh bg-[#080a0c] pt-16 text-white lg:pt-[4.25rem]">
      <AdminDashboard
        analytics={analytics}
        initialAuthUsers={initialUsers}
        accessRequests={accessRequests}
        contactLeads={contactLeads}
      />
    </main>
  );
}
