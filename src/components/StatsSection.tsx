export type Stat = { value: string; label: string; detail?: string };

export type StatsSectionProps = {
  eyebrow?: string;
  title?: string;
  stats: Stat[];
};

export function StatsSection({ eyebrow, title, stats }: StatsSectionProps) {
  return (
    <section className="relative border-y border-zinc-800/90 bg-zinc-900/25">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-700/25 to-transparent" />
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        {(eyebrow || title) && (
          <div className="mb-10 max-w-3xl sm:mb-12">
            {eyebrow && (
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-500/95">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="font-display mt-3 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl lg:text-4xl">
                {title}
              </h2>
            )}
          </div>
        )}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {stats.map((s) => (
            <div
              key={s.label}
              className="relative rounded-sm border border-zinc-800/70 bg-zinc-950/35 px-5 py-6 transition duration-300 hover:border-zinc-700/90 hover:bg-zinc-950/55 sm:px-6"
            >
              <p className="font-display text-3xl font-semibold tabular-nums tracking-tight text-zinc-50 sm:text-4xl">
                {s.value}
              </p>
              <p className="mt-2 text-xs font-medium uppercase tracking-wide text-zinc-300 sm:text-sm">
                {s.label}
              </p>
              {s.detail && (
                <p className="mt-2 text-xs leading-relaxed text-zinc-500 sm:text-[13px]">{s.detail}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
