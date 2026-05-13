export type Stat = { value: string; label: string; detail?: string };

export type StatsSectionProps = {
  eyebrow?: string;
  title?: string;
  stats: Stat[];
};

export function StatsSection({ eyebrow, title, stats }: StatsSectionProps) {
  return (
    <section className="border-y border-zinc-800/80 bg-zinc-900/20">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {(eyebrow || title) && (
          <div className="mb-12 max-w-2xl">
            {eyebrow && (
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600/90">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-100 sm:text-3xl">
                {title}
              </h2>
            )}
          </div>
        )}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-semibold tracking-tight text-zinc-100 sm:text-4xl">
                {s.value}
              </p>
              <p className="mt-2 text-sm font-medium text-zinc-300">{s.label}</p>
              {s.detail && <p className="mt-1 text-xs leading-relaxed text-zinc-500">{s.detail}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
