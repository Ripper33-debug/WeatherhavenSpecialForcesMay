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
    <section className="relative overflow-hidden border-b border-white/[0.06] bg-zinc-950">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] wh-grid-drift"
        style={{
          backgroundImage: `linear-gradient(to right, rgb(82 82 91 / 0.5) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(82 82 91 / 0.5) 1px, transparent 1px)`,
          backgroundSize: "56px 56px",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_20%_0%,rgb(120_53_15/0.12),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-zinc-950" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24 xl:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="wh-fade-up lg:col-span-5">
            {eyebrow && (
              <p className="text-[13px] font-medium tracking-tight text-amber-500/90">{eyebrow}</p>
            )}
            <h1 className="font-display mt-4 max-w-3xl text-[2rem] font-semibold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-[2.75rem] xl:text-5xl">
              {title}
            </h1>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-zinc-400 sm:text-base lg:max-w-lg">
              {description}
            </p>
            {(primaryCta || secondaryCta) && (
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
                {primaryCta && (
                  <Link
                    href={primaryCta.href}
                    className={
                      primaryCta.variant === "secondary"
                        ? "inline-flex min-h-10 items-center justify-center rounded-full border border-zinc-600/80 px-5 py-2.5 text-[13px] font-semibold text-zinc-100 transition hover:border-zinc-500 hover:bg-white/[0.04]"
                        : "inline-flex min-h-10 items-center justify-center rounded-full bg-zinc-100 px-5 py-2.5 text-[13px] font-semibold text-zinc-950 transition hover:bg-white"
                    }
                  >
                    {primaryCta.label}
                  </Link>
                )}
                {secondaryCta && (
                  <Link
                    href={secondaryCta.href}
                    className="inline-flex min-h-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] px-5 py-2.5 text-[13px] font-semibold text-zinc-200 transition hover:border-white/[0.12] hover:bg-white/[0.06]"
                  >
                    {secondaryCta.label}
                  </Link>
                )}
              </div>
            )}
          </div>

          <div className="wh-fade-up-delayed lg:col-span-7">
            <div className="relative mx-auto w-full lg:mx-0 lg:max-w-none">
              <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-zinc-950 shadow-[0_40px_100px_-48px_rgb(0_0_0/0.9)]">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-950/10 via-transparent to-zinc-950" />

                <div className="relative flex items-center justify-between border-b border-white/[0.06] px-5 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/90" />
                    <span className="text-[12px] font-medium text-zinc-500">Deployable systems</span>
                  </div>
                  <span className="text-[11px] text-zinc-600">Preview</span>
                </div>

                <div className="relative aspect-[16/11] w-full min-h-[200px] lg:aspect-[16/10] lg:min-h-[300px] xl:min-h-[340px]">
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(100deg,rgb(9_9_11)_0%,transparent_42%,rgb(9_9_11)_100%)]" />
                  <div className="pointer-events-none absolute -right-1/4 top-0 h-full w-3/5 bg-gradient-to-l from-amber-900/10 to-transparent" />
                  <div
                    className="pointer-events-none absolute inset-0 opacity-[0.03]"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                    }}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent" />
                  <div className="absolute inset-x-8 bottom-12 top-8 flex items-end justify-center sm:inset-x-12 lg:bottom-16">
                    <HeroShelterVisual className="w-full max-w-[min(100%,400px)] text-zinc-500/85 lg:max-w-[440px]" />
                  </div>
                </div>

                <div className="relative flex flex-wrap gap-x-8 gap-y-1 border-t border-white/[0.06] bg-zinc-950/80 px-5 py-4 text-[12px] text-zinc-500">
                  <span>Shelter stack</span>
                  <span className="hidden sm:inline text-zinc-700">·</span>
                  <span>Power &amp; environmental</span>
                  <span className="hidden sm:inline text-zinc-700">·</span>
                  <span>Field integration</span>
                </div>
              </div>
            </div>

            {pullQuote && (
              <aside className="mt-8 border-t border-white/[0.06] pt-8 lg:mt-10 lg:border-t-0 lg:border-l lg:border-white/[0.06] lg:pl-10 lg:pt-0">
                <span className="text-[11px] font-medium text-zinc-600">Principle</span>
                <p className="mt-2 max-w-xl text-[15px] font-medium leading-relaxed text-zinc-300">{pullQuote}</p>
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
