import { notFound } from "next/navigation";
import { listLeads, getLeadStatuses } from "@/lib/leadsStore";
import { setLeadStatusAction } from "./actions";

type Props = { searchParams: Promise<{ t?: string }> };

export const dynamic = "force-dynamic";

export const metadata = {
  title: "SOF lead register",
  robots: { index: false, follow: false },
};

export default async function SofLeadRegisterPage({ searchParams }: Props) {
  const { t } = await searchParams;
  const expected = process.env.LEADS_REGISTER_VIEW_TOKEN;
  if (!expected || t !== expected) notFound();

  const leads = listLeads();
  const statuses = getLeadStatuses();

  return (
    <section className="border-b border-white/[0.06] bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-10">
        <p className="text-[13px] font-medium text-amber-500/90">Programs · internal coordination</p>
        <h1 className="font-display mt-2 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
          SOF target lead register
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-400">
          Authorized follow-up only. Entries originate from Request Access submissions. Status values support program
          vetting and customer tracking—no classified or export-controlled content on this surface.
        </p>

        <div className="mt-10 overflow-x-auto rounded-2xl border border-white/[0.08] bg-zinc-900/30">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-white/[0.08] text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                <th className="px-4 py-3">Reference</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Submitted</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Organization</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
              </tr>
            </thead>
            <tbody>
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-zinc-500">
                    No leads in this runtime yet. Submit via Request Access to populate the register.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.reference} className="border-b border-white/[0.05] text-zinc-300 last:border-0">
                    <td className="px-4 py-3 font-mono text-xs text-amber-500/90">{lead.reference}</td>
                    <td className="px-4 py-3">
                      <form action={setLeadStatusAction} className="flex items-center gap-2">
                        <input type="hidden" name="token" value={t} />
                        <input type="hidden" name="reference" value={lead.reference} />
                        <select
                          name="status"
                          defaultValue={lead.status}
                          className="max-w-[11rem] rounded-lg border border-white/[0.1] bg-zinc-950 px-2 py-1.5 text-xs text-zinc-200"
                        >
                          {statuses.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                        <button
                          type="submit"
                          className="rounded-full border border-white/[0.12] px-3 py-1 text-[11px] font-semibold text-zinc-200 hover:bg-white/[0.06]"
                        >
                          Save
                        </button>
                      </form>
                    </td>
                    <td className="px-4 py-3 text-xs text-zinc-500">{new Date(lead.submittedAt).toLocaleString()}</td>
                    <td className="px-4 py-3">{lead.name}</td>
                    <td className="px-4 py-3">{lead.organization}</td>
                    <td className="px-4 py-3 text-xs">{lead.email}</td>
                    <td className="px-4 py-3 text-xs">{lead.role}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-[11px] leading-relaxed text-zinc-600">
          API: <span className="font-mono text-zinc-500">GET /api/leads</span> and{" "}
          <span className="font-mono text-zinc-500">PATCH /api/leads</span> with{" "}
          <span className="font-mono text-zinc-500">Authorization: Bearer {"<"}LEADS_ADMIN_TOKEN{">"}</span> for
          integrations. This page requires <span className="font-mono text-zinc-500">LEADS_REGISTER_VIEW_TOKEN</span>{" "}
          in query <span className="font-mono text-zinc-500">?t=</span> — rotate tokens for any shared demo.
        </p>
      </div>
    </section>
  );
}
