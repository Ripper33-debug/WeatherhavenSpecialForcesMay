import Link from "next/link";
import { HeroTopoCanvas } from "@/components/HeroTopoCanvas";

type Cta = { href: string; label: string; variant?: "primary" | "secondary" };

export type HeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  /** Short mission-style line shown beside the hero on large screens (defense marketing pattern). */
  pullQuote?: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
  /** Animated contour background (homepage-style). */
  topo?: boolean;
  /** Reduced top padding (80px) below site nav. */
  compactTop?: boolean;
};

const btnPrimary =
  "inline-flex min-h-11 items-center justify-center border border-white bg-white px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-zinc-100";
const btnGhost =
  "inline-flex min-h-11 items-center justify-center border border-white/25 bg-transparent px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-100 transition hover:border-white/50 hover:bg-white/[0.04]";

export function Hero({
  eyebrow,
  title,
  description,
  pullQuote,
  primaryCta,
  secondaryCta,
  topo = false,
  compactTop = false,
}: HeroProps) {
  return (
    <section
      className={`relative overflow-hidden border-b border-white/[0.08] ${topo ? "bg-[#080a0c]" : "bg-black"}`}
    >
      {topo && <HeroTopoCanvas />}
      {!topo && (
        <>
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage: `linear-gradient(to right, rgb(63 63 70 / 0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(63 63 70 / 0.4) 1px, transparent 1px)`,
              backgroundSize: "64px 64px",
            }}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-transparent to-black" />
          <div className="pointer-events-none absolute -right-1/4 top-0 h-[min(100%,900px)] w-[min(100%,900px)] rounded-full bg-blue-950/20 blur-3xl" />
        </>
      )}

      <div
        className={`relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12 ${
          compactTop ? "pt-20 pb-14 sm:pb-16 lg:pb-20" : "py-16 sm:py-20 lg:py-24"
        }`}
      >
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            {eyebrow && (
              <p className="wh-label max-w-2xl border-b border-white/10 pb-3 text-zinc-500">{eyebrow}</p>
            )}
            <h1 className="font-display mt-6 max-w-4xl text-[2.125rem] font-semibold leading-[0.98] tracking-[-0.02em] text-white sm:text-5xl lg:text-6xl xl:text-[3.5rem]">
              {title}
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">{description}</p>
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

          {pullQuote && (
            <aside className="flex flex-col justify-center border-t border-white/[0.08] pt-10 lg:col-span-5 lg:border-l lg:border-t-0 lg:border-white/[0.08] lg:pl-12 lg:pt-0">
              <span className="wh-label text-zinc-600">Mission</span>
              <p className="font-display mt-5 text-2xl font-medium leading-snug tracking-tight text-zinc-200 sm:text-3xl">
                {pullQuote}
              </p>
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}
