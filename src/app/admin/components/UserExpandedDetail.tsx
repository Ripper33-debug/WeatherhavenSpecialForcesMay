import type { UserAnalyticsRow } from "@/lib/admin-analytics";

function formatDateTime(iso: string | null | undefined) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

function formatClickTime(iso: string) {
  try {
    const d = new Date(iso);
    return {
      time: d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" }),
      date: d.toLocaleDateString(undefined, { month: "short", day: "numeric" }),
    };
  } catch {
    return { time: iso, date: "" };
  }
}

function formatDuration(seconds: number | null | undefined) {
  if (seconds == null || Number.isNaN(seconds)) return "—";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
}

function ElementTypeBadge({ type }: { type: string | null }) {
  return (
    <span className="inline-block border border-[rgba(255,255,255,0.12)] px-2 py-0.5 text-[11px] text-[#8a9099]">
      {type ?? "—"}
    </span>
  );
}

export function UserExpandedDetail({ user }: { user: UserAnalyticsRow }) {
  const { clickSummary } = user.detail;

  return (
    <div className="bg-[#0d0f12] px-4 py-8 sm:px-8">
      <div>
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

        <div className="mt-10 border-t border-[rgba(255,255,255,0.08)] pt-10">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[#c8a96e]">Click summary</p>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <dt className="text-xs text-[#8a9099]">Most clicked element</dt>
              <dd className="mt-1 text-sm text-white">{clickSummary.mostClickedElement}</dd>
            </div>
            <div>
              <dt className="text-xs text-[#8a9099]">Most clicked page</dt>
              <dd className="mt-1 text-sm text-[#c8a96e]">{clickSummary.mostClickedPage}</dd>
            </div>
            <div>
              <dt className="text-xs text-[#8a9099]">Clicks this session</dt>
              <dd className="mt-1 text-sm tabular-nums text-white">{clickSummary.totalClicksThisSession}</dd>
            </div>
            <div>
              <dt className="text-xs text-[#8a9099]">Clicks all time</dt>
              <dd className="mt-1 text-sm tabular-nums text-white">{clickSummary.totalClicksAllTime}</dd>
            </div>
          </dl>
        </div>

        <div className="mt-10 border-t border-[rgba(255,255,255,0.08)] pt-10">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[#c8a96e]">Click activity</p>
          <p className="mt-2 text-xs text-[#8a9099]">Last 50 clicks</p>
          <ul className="mt-4 max-h-[480px] overflow-y-auto">
            {user.detail.clicks.length === 0 ? (
              <li className="py-3 text-sm text-[#8a9099]">No clicks recorded.</li>
            ) : (
              user.detail.clicks.map((c) => {
                const { time, date } = formatClickTime(c.clicked_at);
                return (
                  <li
                    key={c.id}
                    className="flex flex-col gap-2 border-b border-[rgba(255,255,255,0.04)] py-3 last:border-0 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4"
                  >
                    <span className="shrink-0 text-xs text-[#8a9099]">
                      {time}
                      {date ? ` · ${date}` : ""}
                    </span>
                    <span className="shrink-0 text-sm text-[#c8a96e]">{c.page ?? "—"}</span>
                    <span className="min-w-0 flex-1 text-sm text-white">&quot;{c.element_text ?? "(no text)"}&quot;</span>
                    <ElementTypeBadge type={c.element_type} />
                    {c.href ? (
                      <span className="w-full text-xs text-[#8a9099] sm:w-auto">→ {c.href}</span>
                    ) : null}
                  </li>
                );
              })
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
