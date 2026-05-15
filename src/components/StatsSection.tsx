import { HomeStatsCountUp } from "./HomeStatsCountUp";

export type Stat = { value: string; label: string; detail?: string };

export type StatsSectionProps = {
  eyebrow?: string;
  title?: string;
  stats: Stat[];
};

export function StatsSection({ eyebrow, title, stats }: StatsSectionProps) {
  return (
    <section data-analytics-section="credibility" className="border-y border-white/[0.08] bg-[#080a0c]">
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 sm:py-20 lg:px-12">
        {(eyebrow || title) && (
          <div className="mb-14 max-w-2xl">
            {eyebrow && <p className="wh-label border-b border-white/10 pb-3">{eyebrow}</p>}
            {title && (
              <h2 className="font-display mt-6 text-3xl font-semibold leading-tight tracking-[-0.02em] text-white sm:text-4xl">
                {title}
              </h2>
            )}
          </div>
        )}
        <HomeStatsCountUp stats={stats} />
      </div>
    </section>
  );
}
