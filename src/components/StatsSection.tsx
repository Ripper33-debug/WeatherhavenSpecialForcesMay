export type Stat = { value: string; label: string; detail?: string };

export type StatsSectionProps = {
  eyebrow?: string;
  title?: string;
  stats: Stat[];
};

export function StatsSection({ eyebrow, title, stats }: StatsSectionProps) {
  return (
    <section className="relative border-y border-zinc-800/90 bg-zinc-900/25">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {(eyebrow || title) && (
          <div className="mb-12 max-w-3xl">
            {eyebrow && (
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-500/95">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
                {title}
              </h2>
            )}
          </div>
        )}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-zinc-800/90">
          {stats.map((s, i) => (
            <div key={s.label} className={i > 0 ? "lg:pl-10" : ""}>
              <p className="font-display text-3xl font-semibold tabular-nums tracking-tight text-zinc-50 sm:text-4xl">
                {s.value}
              </p>
              <p className="mt-2 text-sm font-medium uppercase tracking-wide text-zinc-300">{s.label}</p>
              {s.detail && (
                <p className="mt-2 text-xs leading-relaxed text-zinc-500">{s.detail}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
