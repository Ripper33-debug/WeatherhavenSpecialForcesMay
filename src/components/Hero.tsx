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
    <section className="relative overflow-hidden border-b border-zinc-800/90 bg-zinc-950">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.2]"
        style={{
          backgroundImage: `linear-gradient(to right, rgb(63 63 70 / 0.35) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(63 63 70 / 0.35) 1px, transparent 1px)`,
          backgroundSize: "56px 56px",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-950 via-transparent to-zinc-950/90" />
      <div className="pointer-events-none absolute -right-32 top-1/2 h-[min(80vw,520px)] w-[min(80vw,520px)] -translate-y-1/2 rounded-full bg-amber-900/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            {eyebrow && (
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.32em] text-amber-500/95">
                {eyebrow}
              </p>
            )}
            <h1 className="font-display mt-5 max-w-4xl text-3xl font-semibold leading-[1.08] tracking-tight text-zinc-50 sm:text-4xl lg:text-5xl xl:text-6xl">
              {title}
            </h1>
            <p className="mt-8 max-w-2xl border-l-2 border-amber-800/60 pl-5 text-base leading-relaxed text-zinc-400 sm:text-lg">
              {description}
            </p>
            {(primaryCta || secondaryCta) && (
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
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

          {pullQuote && (
            <aside className="flex flex-col justify-center border-t border-zinc-800 pt-10 font-mono text-xs uppercase leading-relaxed tracking-[0.2em] text-zinc-500 lg:col-span-5 lg:border-l lg:border-t-0 lg:border-zinc-800 lg:pl-10 lg:pt-0">
              <span className="text-[10px] font-semibold tracking-[0.35em] text-amber-600/90">
                Mission
              </span>
              <p className="mt-4 text-lg font-medium normal-case leading-snug tracking-tight text-zinc-300 sm:text-xl">
                {pullQuote}
              </p>
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}
