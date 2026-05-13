export type Stat = { value: string; label: string; detail?: string };

export type StatsSectionProps = {
  eyebrow?: string;
  title?: string;
  stats: Stat[];
};

export function StatsSection({ eyebrow, title, stats }: StatsSectionProps) {
  return (
    <section className="border-y border-white/[0.06] bg-zinc-950/50">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-10">
        {(eyebrow || title) && (
          <div className="mb-12 max-w-2xl">
            {eyebrow && <p className="text-[13px] font-medium text-amber-500/90">{eyebrow}</p>}
            {title && (
              <h2 className="font-display mt-2 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
                {title}
              </h2>
            )}
          </div>
        )}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-white/[0.06]">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`lg:px-8 ${i === 0 ? "lg:pl-0" : ""} ${i === stats.length - 1 ? "lg:pr-0" : ""}`}
            >
              <p className="font-display text-3xl font-semibold tabular-nums tracking-tight text-zinc-50 sm:text-[2.25rem]">
                {s.value}
              </p>
              <p className="mt-1.5 text-sm font-medium text-zinc-300">{s.label}</p>
              {s.detail && <p className="mt-2 text-[13px] leading-relaxed text-zinc-500">{s.detail}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
