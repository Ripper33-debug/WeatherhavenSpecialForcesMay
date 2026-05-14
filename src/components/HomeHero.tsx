import Link from "next/link";
import { HeroTopoCanvas } from "@/components/HeroTopoCanvas";

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
  "inline-flex min-h-11 items-center justify-center border border-white/25 bg-transparent px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition hover:border-white/50 hover:bg-white/[0.04]";

export function HomeHero({
  eyebrow,
  title,
  description,
  pullQuote,
  primaryCta,
  secondaryCta,
}: HomeHeroProps) {
  return (
    <section className="relative min-h-[calc(100dvh-4rem)] overflow-hidden border-b border-white/[0.08] bg-[#080a0c] sm:min-h-[calc(100dvh-4.25rem)]">
      <HeroTopoCanvas />

      <div className="relative z-10 mx-auto flex min-h-[inherit] max-w-[1400px] flex-col justify-center px-4 py-16 sm:px-6 sm:py-20 lg:px-12 lg:py-24">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="wh-fade-up lg:col-span-5">
            {eyebrow && <p className="wh-label max-w-xl border-b border-white/10 pb-3">{eyebrow}</p>}
            <h1 className="font-display mt-6 max-w-3xl text-[2.25rem] font-semibold leading-[0.98] tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl xl:text-[3.75rem]">
              {title}
            </h1>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-[#8a9099] sm:text-lg lg:max-w-lg">
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
              <div className="relative overflow-hidden border border-white/[0.12] bg-[#080a0c] shadow-[0_0_0_1px_rgb(255_255_255/0.04)]">
                <div className="relative flex items-center justify-between border-b border-white/[0.08] px-5 py-4 sm:px-6">
                  <div className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 shrink-0 border border-white/40 bg-white/20" aria-hidden />
                    <span className="wh-label text-[#8a9099]">Systems visualization</span>
                  </div>
                  <span className="wh-label text-[#8a9099]">Preview</span>
                </div>

                <div className="relative aspect-[16/11] w-full min-h-[220px] bg-black lg:aspect-[16/10] lg:min-h-[320px] xl:min-h-[380px]">
                  <div className="pointer-events-none absolute inset-0 bg-[rgba(8,10,12,0.35)]" aria-hidden />
                  <div
                    className="pointer-events-none absolute inset-0 opacity-[0.03]"
                    style={{
                      backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)`,
                      backgroundSize: "32px 32px",
                    }}
                    aria-hidden
                  />
                  <div className="absolute inset-x-0 bottom-0 h-2/5 bg-[rgba(8,10,12,0.85)]" aria-hidden />
                  <div className="absolute inset-x-8 bottom-12 top-10 flex items-end justify-center sm:inset-x-12 lg:bottom-16">
                    <HeroShelterVisual className="w-full max-w-[min(100%,420px)] text-[#8a9099] lg:max-w-[460px]" />
                  </div>
                </div>

                <div className="relative flex flex-wrap gap-x-10 gap-y-2 border-t border-white/[0.08] bg-black/60 px-5 py-4 sm:px-6">
                  <span className="wh-label text-[#8a9099]">Shelter stack</span>
                  <span className="wh-label text-[#8a9099]">Power &amp; environmental</span>
                  <span className="wh-label text-[#8a9099]">Field integration</span>
                </div>
              </div>
            </div>

            {pullQuote && (
              <aside className="mt-10 border-t border-white/[0.08] pt-10 lg:mt-12 lg:border-t-0 lg:border-l lg:border-white/[0.08] lg:pl-12 lg:pt-0">
                <span className="wh-label text-[#8a9099]">Operating principle</span>
                <p className="font-display mt-4 max-w-xl text-xl font-medium leading-snug tracking-tight text-white sm:text-2xl">
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
      <rect x="110" y="168" width="48" height="30" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <rect x="282" y="168" width="48" height="30" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
    </svg>
  );
}
