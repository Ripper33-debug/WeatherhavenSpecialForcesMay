"use client";

import { Fragment, useMemo, useState } from "react";
import { adminAddUser, adminDeleteUser, adminListUsers, type AdminUserRow } from "./actions";
import type { AdminAnalyticsPayload, UserAnalyticsRow } from "@/lib/admin-analytics";
import { AdminStatBox } from "./components/AdminStatBox";
import { EngagementBar } from "./components/EngagementBar";
import { SiteClickSummary } from "./components/SiteClickSummary";
import { UserExpandedDetail } from "./components/UserExpandedDetail";
import { AccessRequestsTable } from "./components/AccessRequestsTable";
import type { AccessRequestRow } from "@/lib/accessRequests";

const EMPTY_CLICK_SUMMARY = {
  mostClickedElement: "—",
  mostClickedPage: "—",
  totalClicksThisSession: 0,
  totalClicksAllTime: 0,
} as const;

function formatDateTime(iso: string | null | undefined) {
  if (!iso) return "—";
  try { return new Date(iso).toLocaleString(); } catch { return String(iso); }
}

export function AdminDashboard({
  analytics,
  initialAuthUsers,
  accessRequests,
}: {
  analytics: AdminAnalyticsPayload;
  initialAuthUsers: AdminUserRow[];
  accessRequests: AccessRequestRow[];
}) {
  const [users, setUsers] = useState(initialAuthUsers);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [banner, setBanner] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [pending, setPending] = useState(false);
  const analyticsById = useMemo(() => { const map = new Map<string, UserAnalyticsRow>(); analytics.users.forEach((u) => map.set(u.id, u)); return map; }, [analytics.users]);
  const tableRows = useMemo(() => users.map((auth) => { const row = analyticsById.get(auth.id); return { id: auth.id, email: auth.email ?? row?.email ?? "—", createdAt: auth.created_at || row?.createdAt || "", lastLogin: auth.last_sign_in_at ?? row?.lastLogin ?? null, totalSessions: row?.totalSessions ?? 0, totalPageViews: row?.totalPageViews ?? 0, engagementScore: row?.engagementScore ?? 0, detail: row?.detail ?? { sessions: [], topPages: [], events: [], clicks: [], clickSummary: { ...EMPTY_CLICK_SUMMARY } } } as UserAnalyticsRow; }), [users, analyticsById]);
  async function handleAdd(e: React.FormEvent) { e.preventDefault(); setBanner(null); setPending(true); const res = await adminAddUser(email.trim(), password); setPending(false); if (res.ok) { setBanner({ type: "success", text: "User added successfully." }); setEmail(""); setPassword(""); setUsers(await adminListUsers()); } else { setBanner({ type: "error", text: "Failed to add user." }); } }
  async function handleRemove(userId: string) { setBanner(null); const res = await adminDeleteUser(userId); if (res.ok) { setUsers((prev) => prev.filter((u) => u.id !== userId)); if (expandedId === userId) setExpandedId(null); setBanner({ type: "success", text: "User removed." }); } else { setBanner({ type: "error", text: "Failed to remove user." }); } }
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:px-12">
      <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[#c8a96e]">Analytics &amp; users</p>
      <h1 className="font-display mt-4 text-3xl font-semibold tracking-tight text-white">Admin dashboard</h1>
      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatBox label="Total users" value={analytics.summary.totalUsers} />
        <AdminStatBox label="Active today" value={analytics.summary.activeToday} />
        <AdminStatBox label="Total page views" value={analytics.summary.totalPageViews} />
        <AdminStatBox label="Total events" value={analytics.summary.totalEvents} />
      </div>
      <SiteClickSummary items={analytics.topClickedElements} />
      <div className="mt-16 border-t border-[rgba(255,255,255,0.08)] pt-16">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[#c8a96e]">
          Pending access requests
        </p>
        <AccessRequestsTable requests={accessRequests} />
      </div>
      <div className="mt-16">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[#c8a96e]">User analytics</p>
        <div className="mt-6 overflow-x-auto border border-[rgba(255,255,255,0.08)]">
          <table className="w-full min-w-[900px] border-collapse text-left text-sm">
            <thead><tr className="border-b border-[rgba(255,255,255,0.08)] text-[#8a9099]"><th className="px-4 py-3 font-medium">Email</th><th className="px-4 py-3 font-medium">Created</th><th className="px-4 py-3 font-medium">Last login</th><th className="px-4 py-3 font-medium">Sessions</th><th className="px-4 py-3 font-medium">Page views</th><th className="px-4 py-3 font-medium">Engagement</th><th className="px-4 py-3 font-medium" /></tr></thead>
            <tbody>{tableRows.map((row) => (<Fragment key={row.id}><tr className="border-b border-[rgba(255,255,255,0.06)]"><td className="px-4 py-4 font-medium text-white">{row.email}</td><td className="px-4 py-4 text-[#8a9099]">{formatDateTime(row.createdAt)}</td><td className="px-4 py-4 text-[#8a9099]">{formatDateTime(row.lastLogin)}</td><td className="px-4 py-4 tabular-nums text-white">{row.totalSessions}</td><td className="px-4 py-4 tabular-nums text-white">{row.totalPageViews}</td><td className="px-4 py-4"><EngagementBar score={row.engagementScore} /></td><td className="px-4 py-4"><div className="flex items-center justify-end gap-2"><button type="button" onClick={() => setExpandedId((id) => (id === row.id ? null : row.id))} className="border border-[rgba(255,255,255,0.2)] bg-transparent px-3 py-2 text-xs text-white">{expandedId === row.id ? "▲" : "▼"}</button><button type="button" onClick={() => void handleRemove(row.id)} className="border border-[rgba(255,255,255,0.2)] bg-transparent px-3 py-2 text-xs text-white">Remove</button></div></td></tr>{expandedId === row.id && (<tr><td colSpan={7} className="p-0"><UserExpandedDetail user={row} /></td></tr>)}</Fragment>))}</tbody>
          </table>
        </div>
      </div>
      <div className="mt-16 border-t border-[rgba(255,255,255,0.08)] pt-16">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[#c8a96e]">User management</p>
        {banner && <p className={`mt-6 text-sm ${banner.type === "success" ? "text-green-500" : "text-red-500"}`}>{banner.text}</p>}
        <form className="mt-8 space-y-4" onSubmit={handleAdd}><div className="grid gap-4 sm:grid-cols-2"><input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="New user email" className="w-full border border-[rgba(255,255,255,0.12)] bg-[#0d0f12] px-4 py-3 text-sm text-white outline-none placeholder:text-[#8a9099]" /><input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Temporary password" className="w-full border border-[rgba(255,255,255,0.12)] bg-[#0d0f12] px-4 py-3 text-sm text-white outline-none placeholder:text-[#8a9099]" /></div><button type="submit" disabled={pending} className="border-0 bg-white px-6 py-3 text-sm font-medium text-black disabled:opacity-60">Add User</button></form>
      </div>
    </div>
  );
}