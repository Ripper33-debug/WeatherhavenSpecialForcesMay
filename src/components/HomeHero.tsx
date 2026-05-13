import Link from "next/link";

type Cta = { href: string; label: string; variant?: "primary" | "secondary" };

export type HomeHeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  pullQuote?: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
};

export function HomeHero({
  eyebrow,
  title,
  description,
  pullQuote,
  primaryCta,
  secondaryCta,
}: HomeHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-zinc-800/90 bg-zinc-950">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.1] wh-grid-drift"
        style={{
          backgroundImage: `linear-gradient(to right, rgb(63 63 70 / 0.55) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(63 63 70 / 0.55) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_15%_20%,rgb(146_64_14/0.18),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_100%_30%,rgb(24_24_27/0.9),transparent_45%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-zinc-950" />
      <div className="pointer-events-none absolute -left-32 top-1/4 h-[28rem] w-[28rem] rounded-full bg-amber-900/12 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-amber-950/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-10 lg:py-28 xl:py-32">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16 xl:gap-20">
          <div className="wh-fade-up lg:col-span-5">
            {eyebrow && (
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.32em] text-amber-500">
                {eyebrow}
              </p>
            )}
            <h1 className="font-display mt-5 max-w-3xl text-4xl font-semibold leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-[3.35rem] xl:text-6xl">
              {title}
            </h1>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg lg:max-w-lg">
              {description}
            </p>
            {(primaryCta || secondaryCta) && (
              <div className="mt-11 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                {primaryCta && (
                  <Link
                    href={primaryCta.href}
                    className={
                      primaryCta.variant === "secondary"
                        ? "inline-flex min-h-11 items-center justify-center rounded-sm border border-zinc-500 px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-zinc-100 transition duration-200 hover:border-zinc-400 hover:bg-white/5 active:scale-[0.99]"
                        : "inline-flex min-h-11 items-center justify-center rounded-sm bg-amber-500 px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-zinc-950 shadow-[0_0_0_1px_rgb(245_158_11/0.4)] transition duration-200 hover:bg-amber-400 hover:shadow-[0_0_40px_-8px_rgb(251_191_36/0.45)] active:scale-[0.99]"
                    }
                  >
                    {primaryCta.label}
                  </Link>
                )}
                {secondaryCta && (
                  <Link
                    href={secondaryCta.href}
                    className="inline-flex min-h-11 items-center justify-center rounded-sm border border-zinc-600/90 bg-zinc-950/50 px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-zinc-200 backdrop-blur-sm transition duration-200 hover:border-zinc-500 hover:bg-zinc-900/70 active:scale-[0.99]"
                  >
                    {secondaryCta.label}
                  </Link>
                )}
              </div>
            )}
          </div>

          <div className="wh-fade-up-delayed lg:col-span-7">
            <div className="relative mx-auto w-full lg:mx-0 lg:max-w-none">
              <div className="absolute -inset-[1px] rounded-sm bg-gradient-to-br from-zinc-500/30 via-zinc-800/20 to-transparent p-px">
                <div className="h-full w-full rounded-sm bg-zinc-950" />
              </div>
              <div className="relative overflow-hidden rounded-sm border border-zinc-700/50 bg-zinc-950 shadow-[0_32px_120px_-32px_rgb(0_0_0/0.95),inset_0_1px_0_rgb(255_255_255/0.04)]">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-950/20 via-transparent to-zinc-950" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_70%_100%,rgb(24_24_27),transparent_55%)]" />

                <div className="relative flex items-center justify-between border-b border-zinc-800/80 bg-black/30 px-5 py-4 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_14px_rgb(16_185_129/0.55)]" />
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-zinc-400">
                      Expeditionary systems
                    </span>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">Systems</span>
                </div>

                <div className="relative aspect-[16/11] w-full min-h-[220px] lg:aspect-[16/10] lg:min-h-[320px] xl:min-h-[380px]">
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,rgb(9_9_11)_0%,transparent_45%,rgb(9_9_11)_100%)]" />
                  <div className="pointer-events-none absolute -right-1/4 top-0 h-full w-3/5 bg-gradient-to-l from-amber-900/15 to-transparent" />
                  <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />
                  <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black via-zinc-950/80 to-transparent" />
                  <div className="absolute inset-x-10 bottom-16 top-10 flex items-end justify-center lg:inset-x-14 lg:bottom-20">
                    <HeroShelterVisual className="w-full max-w-[min(100%,420px)] text-zinc-500/90 lg:max-w-[480px]" />
                  </div>
                </div>

                <div className="relative grid divide-y divide-zinc-800/80 border-t border-zinc-800/80 bg-gradient-to-r from-zinc-950 via-zinc-900/80 to-zinc-950 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                  <MiniVisual label="Shelter stack" accent="from-amber-900/30 to-zinc-950" />
                  <MiniVisual label="Power & ECU" accent="from-zinc-800/50 to-zinc-950" />
                  <MiniVisual label="Field integration" accent="from-zinc-800/40 to-zinc-950" />
                </div>

                <div className="pointer-events-none absolute left-3 top-[4.25rem] h-8 w-8 border-l border-t border-amber-600/25" />
                <div className="pointer-events-none absolute right-3 top-[4.25rem] h-8 w-8 border-r border-t border-amber-600/25" />
                <div className="pointer-events-none absolute bottom-14 left-3 h-8 w-8 border-b border-l border-amber-600/20" />
                <div className="pointer-events-none absolute bottom-14 right-3 h-8 w-8 border-b border-r border-amber-600/20" />
              </div>
            </div>

            {pullQuote && (
              <aside className="mt-10 border-t border-zinc-800/90 pt-10 lg:mt-12 lg:border-t-0 lg:border-l lg:border-zinc-800/90 lg:pl-10 lg:pt-0">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.35em] text-amber-600/90">
                  Operating principle
                </span>
                <p className="mt-4 max-w-xl text-sm font-medium leading-relaxed text-zinc-300 sm:text-base">
                  {pullQuote}
                </p>
              </aside>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function MiniVisual({ label, accent }: { label: string; accent: string }) {
  return (
    <div className={`relative overflow-hidden px-5 py-5 ${accent} bg-gradient-to-b`}>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="relative">
        <div className="h-1 w-10 rounded-full bg-amber-600/50" />
        <p className="mt-3 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">{label}</p>
      </div>
    </div>
  );
}

function HeroShelterVisual({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 440 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="hroof" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="rgb(63 63 70)" stopOpacity="0.9" />
          <stop offset="1" stopColor="rgb(24 24 27)" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="hwall" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="rgb(39 39 42)" stopOpacity="0.85" />
          <stop offset="1" stopColor="rgb(9 9 11)" stopOpacity="0.95" />
        </linearGradient>
      </defs>
      <path d="M24 198 L220 32 L416 198 Z" stroke="currentColor" strokeWidth="1.1" fill="url(#hroof)" opacity="0.95" />
      <path d="M72 198 V118 L220 48 L368 118 V198" stroke="currentColor" strokeWidth="0.9" fill="url(#hwall)" />
      <rect x="168" y="118" width="104" height="80" stroke="currentColor" strokeWidth="0.75" fill="rgb(24 24 27 / 0.55)" />
      <line x1="220" y1="32" x2="220" y2="118" stroke="currentColor" strokeWidth="0.5" opacity="0.35" />
      <line x1="48" y1="198" x2="392" y2="198" stroke="currentColor" strokeWidth="1.5" opacity="0.25" />
      <rect x="110" y="168" width="48" height="30" rx="1" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <rect x="282" y="168" width="48" height="30" rx="1" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
    </svg>
  );
}
