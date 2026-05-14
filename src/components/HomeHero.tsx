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

const btnPrimary =
  "inline-flex min-h-11 items-center justify-center border border-white bg-white px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-zinc-100";
const btnGhost =
  "inline-flex min-h-11 items-center justify-center border border-white/25 bg-transparent px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-100 transition hover:border-white/50 hover:bg-white/[0.04]";

export function HomeHero({
  eyebrow,
  title,
  description,
  pullQuote,
  primaryCta,
  secondaryCta,
}: HomeHeroProps) {
  return (
    <section className="relative min-h-[calc(100dvh-4rem)] overflow-hidden border-b border-white/[0.08] bg-black sm:min-h-[calc(100dvh-4.25rem)]">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] wh-grid-drift"
        style={{
          backgroundImage: `linear-gradient(to right, rgb(82 82 91 / 0.5) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(82 82 91 / 0.5) 1px, transparent 1px)`,
          backgroundSize: "72px 72px",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_70%_0%,rgb(30_58_138/0.18),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black to-transparent" />

      <div className="relative mx-auto flex min-h-[inherit] max-w-[1400px] flex-col justify-center px-4 py-16 sm:px-6 sm:py-20 lg:px-12 lg:py-24">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="wh-fade-up lg:col-span-5">
            {eyebrow && (
              <p className="wh-label max-w-xl border-b border-white/10 pb-3 text-zinc-500">{eyebrow}</p>
            )}
            <h1 className="font-display mt-6 max-w-3xl text-[2.25rem] font-semibold leading-[0.98] tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl xl:text-[3.75rem]">
              {title}
            </h1>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg lg:max-w-lg">
              {description}
            </p>
            {(primaryCta || secondaryCta) && (
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                {primaryCta && (
                  <Link
                    href={primaryCta.href}
                    className={primaryCta.variant === "secondary" ? btnGhost : btnPrimary}
                  >
                    {primaryCta.label}
                  </Link>
                )}
                {secondaryCta && (
                  <Link
                    href={secondaryCta.href}
                    className={secondaryCta.variant === "primary" ? btnPrimary : btnGhost}
                  >
                    {secondaryCta.label}
                  </Link>
                )}
              </div>
            )}
          </div>

          <div className="wh-fade-up-delayed lg:col-span-7">
            <div className="relative mx-auto w-full lg:mx-0 lg:max-w-none">
              <div className="relative overflow-hidden border border-white/[0.12] bg-zinc-950 shadow-[0_0_0_1px_rgb(255_255_255/0.04),0_40px_120px_-40px_rgb(0_0_0/1)]">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-transparent to-black" />

                <div className="relative flex items-center justify-between border-b border-white/[0.08] px-5 py-4 sm:px-6">
                  <div className="flex items-center gap-3">
                    <span className="h-1 w-1 rounded-full bg-emerald-400 shadow-[0_0_12px_rgb(52_211_153/0.5)]" />
                    <span className="wh-label text-zinc-500">Systems visualization</span>
                  </div>
                  <span className="wh-label text-zinc-600">Preview</span>
                </div>

                <div className="relative aspect-[16/11] w-full min-h-[220px] lg:aspect-[16/10] lg:min-h-[320px] xl:min-h-[380px]">
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,rgb(0_0_0)_0%,transparent_40%,rgb(0_0_0)_100%)]" />
                  <div className="pointer-events-none absolute -right-1/4 top-0 h-full w-3/5 bg-gradient-to-l from-blue-950/25 to-transparent" />
                  <div
                    className="pointer-events-none absolute inset-0 opacity-[0.025]"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                    }}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black via-black/80 to-transparent" />
                  <div className="absolute inset-x-8 bottom-12 top-10 flex items-end justify-center sm:inset-x-12 lg:bottom-16">
                    <HeroShelterVisual className="w-full max-w-[min(100%,420px)] text-zinc-500/90 lg:max-w-[460px]" />
                  </div>
                </div>

                <div className="relative flex flex-wrap gap-x-10 gap-y-2 border-t border-white/[0.08] bg-black/60 px-5 py-4 sm:px-6">
                  <span className="wh-label text-zinc-500">Shelter stack</span>
                  <span className="wh-label text-zinc-500">Power &amp; environmental</span>
                  <span className="wh-label text-zinc-500">Field integration</span>
                </div>
              </div>
            </div>

            {pullQuote && (
              <aside className="mt-10 border-t border-white/[0.08] pt-10 lg:mt-12 lg:border-t-0 lg:border-l lg:border-white/[0.08] lg:pl-12 lg:pt-0">
                <span className="wh-label text-zinc-600">Operating principle</span>
                <p className="font-display mt-4 max-w-xl text-xl font-medium leading-snug tracking-tight text-zinc-200 sm:text-2xl">
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
