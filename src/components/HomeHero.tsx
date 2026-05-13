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
        className="pointer-events-none absolute inset-0 opacity-[0.14] wh-grid-drift"
        style={{
          backgroundImage: `linear-gradient(to right, rgb(63 63 70 / 0.5) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(63 63 70 / 0.5) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_-10%,rgb(146_64_14/0.22),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-transparent to-zinc-950" />
      <div className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-amber-900/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-zinc-700/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="wh-fade-up lg:col-span-7">
            {eyebrow && (
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.32em] text-amber-500/95">
                {eyebrow}
              </p>
            )}
            <h1 className="font-display mt-4 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight text-zinc-50 sm:text-5xl lg:text-[3.25rem] xl:text-6xl">
              {title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
              {description}
            </p>
            {(primaryCta || secondaryCta) && (
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                {primaryCta && (
                  <Link
                    href={primaryCta.href}
                    className={
                      primaryCta.variant === "secondary"
                        ? "inline-flex min-h-11 items-center justify-center rounded-sm border border-zinc-500 px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-zinc-200 transition duration-200 hover:border-zinc-400 hover:bg-zinc-900/60 active:scale-[0.99]"
                        : "inline-flex min-h-11 items-center justify-center rounded-sm bg-amber-600 px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-zinc-950 shadow-[0_0_0_1px_rgb(180_83_9/0.35)] transition duration-200 hover:bg-amber-500 hover:shadow-[0_0_24px_-4px_rgb(245_158_11/0.35)] active:scale-[0.99]"
                    }
                  >
                    {primaryCta.label}
                  </Link>
                )}
                {secondaryCta && (
                  <Link
                    href={secondaryCta.href}
                    className="inline-flex min-h-11 items-center justify-center rounded-sm border border-zinc-600 bg-zinc-950/40 px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-zinc-200 backdrop-blur-sm transition duration-200 hover:border-zinc-500 hover:bg-zinc-900/55 active:scale-[0.99]"
                  >
                    {secondaryCta.label}
                  </Link>
                )}
              </div>
            )}
          </div>

          <div className="wh-fade-up-delayed lg:col-span-5">
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div className="absolute -inset-px rounded-sm bg-gradient-to-b from-zinc-600/40 via-zinc-800/30 to-zinc-950/80 p-px">
                <div className="h-full w-full rounded-sm bg-zinc-950/90" />
              </div>
              <div className="relative overflow-hidden rounded-sm border border-zinc-800/90 bg-gradient-to-br from-zinc-900/90 via-zinc-950 to-zinc-950 shadow-[0_24px_80px_-24px_rgb(0_0_0/0.85)]">
                <div className="absolute left-3 top-3 z-10 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/90 shadow-[0_0_12px_rgb(16_185_129/0.5)]" />
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                    Weatherhaven imagery
                  </span>
                </div>
                <div className="absolute right-3 top-3 z-10 max-w-[42%] text-right font-mono text-[10px] uppercase leading-tight tracking-wider text-zinc-600">
                  Hero slot · 16:9–4:5
                </div>

                <div className="relative aspect-[16/10] w-full lg:aspect-[4/5]">
                  <div className="pointer-events-none absolute inset-3 rounded-sm border border-zinc-700/25 bg-zinc-950/20" />
                  <div
                    className="pointer-events-none absolute inset-0 opacity-[0.06]"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(0deg, transparent, transparent 2px, rgb(244 244 245) 2px, rgb(244 244 245) 3px)",
                    }}
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_85%,rgb(146_64_14/0.12),transparent_55%)]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/15 to-zinc-950/40" />
                  <div className="absolute inset-x-6 bottom-32 top-12 flex flex-col items-center justify-end gap-3 sm:inset-x-10 sm:bottom-36">
                    <p className="text-center font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-zinc-600">
                      Shelter / product photography or render
                    </p>
                    <ShelterSilhouette className="w-full max-w-[300px] text-zinc-500/95 opacity-95 sm:max-w-[340px]" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent" />
                  <p className="absolute bottom-3 left-4 right-4 font-mono text-[10px] leading-relaxed text-zinc-500 sm:bottom-4">
                    Replace the silhouette with approved Weatherhaven shelter stills, cutaways, or a
                    neutral 3D turntable. Frame scales from wide hero (mobile/tablet) to portrait
                    emphasis on large screens.
                  </p>
                </div>

                <div className="border-t border-zinc-800/80 bg-zinc-950/80 px-4 py-3 sm:flex sm:items-center sm:justify-between sm:px-5">
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                    Secondary strip
                  </p>
                  <p className="mt-1 font-mono text-[10px] leading-relaxed text-zinc-600 sm:mt-0 sm:max-w-[70%] sm:text-right">
                    Optional: second image for interior fit-out, ECU yard, or palletized logistics—keeps
                    hero screenshot-ready for course packets.
                  </p>
                </div>

                <div className="pointer-events-none absolute left-2 top-10 h-6 w-6 border-l border-t border-amber-700/35" />
                <div className="pointer-events-none absolute right-2 top-10 h-6 w-6 border-r border-t border-amber-700/35" />
                <div className="pointer-events-none absolute bottom-10 left-2 h-6 w-6 border-b border-l border-amber-700/35" />
                <div className="pointer-events-none absolute bottom-10 right-2 h-6 w-6 border-b border-r border-amber-700/35" />
              </div>
            </div>

            {pullQuote && (
              <aside className="mt-8 border-t border-zinc-800/90 pt-8 lg:mt-10 lg:border-t-0 lg:border-l lg:border-zinc-800/90 lg:pl-8 lg:pt-0">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.35em] text-amber-600/90">
                  Operating principle
                </span>
                <p className="mt-3 text-sm font-medium leading-relaxed text-zinc-300 sm:text-base">
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

function ShelterSilhouette({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M20 180 L200 40 L380 180 Z"
        stroke="currentColor"
        strokeWidth="1.25"
        fill="rgb(24 24 27 / 0.5)"
      />
      <path d="M60 180 V120 L200 50 L340 120 V180" stroke="currentColor" strokeWidth="1" fill="rgb(39 39 42 / 0.4)" />
      <rect x="150" y="115" width="100" height="65" stroke="currentColor" strokeWidth="0.75" fill="rgb(63 63 70 / 0.25)" />
      <line x1="200" y1="40" x2="200" y2="115" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
      <line x1="95" y1="180" x2="305" y2="180" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
    </svg>
  );
}
