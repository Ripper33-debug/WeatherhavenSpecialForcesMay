export type Stat = { value: string; label: string; detail?: string };

export type StatsSectionProps = {
  eyebrow?: string;
  title?: string;
  stats: Stat[];
};

export function StatsSection({ eyebrow, title, stats }: StatsSectionProps) {
  return (
    <section className="border-y border-white/[0.08] bg-zinc-950/30">
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 sm:py-20 lg:px-12">
        {(eyebrow || title) && (
          <div className="mb-14 max-w-2xl">
            {eyebrow && <p className="wh-label border-b border-white/10 pb-3 text-zinc-500">{eyebrow}</p>}
            {title && (
              <h2 className="font-display mt-6 text-3xl font-semibold leading-tight tracking-[-0.02em] text-white sm:text-4xl">
                {title}
              </h2>
            )}
          </div>
        )}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-white/[0.08]">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`lg:px-8 ${i === 0 ? "lg:pl-0" : ""} ${i === stats.length - 1 ? "lg:pr-0" : ""}`}
            >
              <p className="font-display text-4xl font-semibold tabular-nums tracking-tight text-white sm:text-[2.5rem]">
                {s.value}
              </p>
              <p className="mt-2 text-sm font-medium text-zinc-300">{s.label}</p>
              {s.detail && <p className="mt-3 text-sm leading-relaxed text-zinc-500">{s.detail}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
