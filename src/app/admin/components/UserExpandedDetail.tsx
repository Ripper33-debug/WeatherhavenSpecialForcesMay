import type { UserAnalyticsRow } from "@/lib/admin-analytics";

function formatDateTime(iso: string | null | undefined) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

function formatDuration(seconds: number | null | undefined) {
  if (seconds == null || Number.isNaN(seconds)) return "—";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
}

export function UserExpandedDetail({ user }: { user: UserAnalyticsRow }) {
  return (
    <div className="bg-[#0d0f12] px-4 py-8 sm:px-8">
      <div className="grid gap-10 lg:grid-cols-3">
        <div>
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[#c8a96e]">Session history</p>
          <ul className="mt-4 space-y-3">
            {user.detail.sessions.length === 0 ? (
              <li className="text-sm text-[#8a9099]">No sessions recorded.</li>
            ) : (
              user.detail.sessions.map((s) => (
                <li key={s.id} className="border-b border-[rgba(255,255,255,0.06)] pb-3 text-sm last:border-0">
                  <p className="text-white">{formatDateTime(s.started_at)}</p>
                  <p className="mt-1 text-[#8a9099]">Duration: {formatDuration(s.duration_seconds)}</p>
                </li>
              ))
            )}
          </ul>
        </div>
        <div>
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[#c8a96e]">Top pages visited</p>
          <ul className="mt-4 space-y-3">
            {user.detail.topPages.length === 0 ? (
              <li className="text-sm text-[#8a9099]">No page views recorded.</li>
            ) : (
              user.detail.topPages.map((p) => (
                <li key={p.page} className="border-b border-[rgba(255,255,255,0.06)] pb-3 text-sm last:border-0">
                  <p className="text-white">{p.pageTitle || p.page}</p>
                  <p className="mt-1 text-[#8a9099]">
                    {p.visits} visits · avg {p.avgSeconds}s on page
                  </p>
                </li>
              ))
            )}
          </ul>
        </div>
        <div>
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[#c8a96e]">Actions taken</p>
          <ul className="mt-4 max-h-[320px] space-y-3 overflow-y-auto">
            {user.detail.events.length === 0 ? (
              <li className="text-sm text-[#8a9099]">No events recorded.</li>
            ) : (
              user.detail.events.map((e) => (
                <li key={e.id} className="border-b border-[rgba(255,255,255,0.06)] pb-3 text-sm last:border-0">
                  <p className="text-white">{e.event_label}</p>
                  <p className="mt-1 text-[#8a9099]">
                    {e.page ?? "—"} · {formatDateTime(e.occurred_at)}
                  </p>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
