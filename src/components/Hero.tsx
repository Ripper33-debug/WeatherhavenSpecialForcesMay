import Link from "next/link";

type Cta = { href: string; label: string; variant?: "primary" | "secondary" };

export type HeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  /** Short mission-style line shown beside the hero on large screens (defense marketing pattern). */
  pullQuote?: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
};

export function Hero({
  eyebrow,
  title,
  description,
  pullQuote,
  primaryCta,
  secondaryCta,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-white/[0.06] bg-zinc-950">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(to right, rgb(82 82 91 / 0.45) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(82 82 91 / 0.45) 1px, transparent 1px)`,
          backgroundSize: "56px 56px",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-950 via-transparent to-zinc-950/95" />
      <div className="pointer-events-none absolute -right-32 top-1/2 h-[min(80vw,480px)] w-[min(80vw,480px)] -translate-y-1/2 rounded-full bg-amber-900/8 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-18 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            {eyebrow && (
              <p className="text-[13px] font-medium tracking-tight text-amber-500/90">{eyebrow}</p>
            )}
            <h1 className="font-display mt-3 max-w-4xl text-3xl font-semibold leading-[1.08] tracking-tight text-zinc-50 sm:text-4xl lg:text-5xl">
              {title}
            </h1>
            <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-zinc-400 sm:text-base">{description}</p>
            {(primaryCta || secondaryCta) && (
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
                {primaryCta && (
                  <Link
                    href={primaryCta.href}
                    className={
                      primaryCta.variant === "secondary"
                        ? "inline-flex min-h-10 items-center justify-center rounded-full border border-white/[0.1] px-5 py-2.5 text-[13px] font-semibold text-zinc-200 transition hover:border-white/[0.16] hover:bg-white/[0.04]"
                        : "inline-flex min-h-10 items-center justify-center rounded-full bg-zinc-100 px-5 py-2.5 text-[13px] font-semibold text-zinc-950 transition hover:bg-white"
                    }
                  >
                    {primaryCta.label}
                  </Link>
                )}
                {secondaryCta && (
                  <Link
                    href={secondaryCta.href}
                    className="inline-flex min-h-10 items-center justify-center rounded-full border border-zinc-600/80 bg-white/[0.02] px-5 py-2.5 text-[13px] font-semibold text-zinc-200 transition hover:border-zinc-500 hover:bg-white/[0.05]"
                  >
                    {secondaryCta.label}
                  </Link>
                )}
              </div>
            )}
          </div>

          {pullQuote && (
            <aside className="flex flex-col justify-center border-t border-white/[0.06] pt-8 text-[12px] leading-relaxed text-zinc-500 lg:col-span-5 lg:border-l lg:border-t-0 lg:border-white/[0.06] lg:pl-10 lg:pt-0">
              <span className="text-[11px] font-medium text-zinc-600">Mission</span>
              <p className="mt-3 text-lg font-medium leading-snug tracking-tight text-zinc-300 sm:text-xl">
                {pullQuote}
              </p>
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}
