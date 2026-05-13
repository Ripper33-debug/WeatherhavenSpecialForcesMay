import Link from "next/link";

type Cta = { href: string; label: string; variant?: "primary" | "secondary" };

export type HeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
};

export function Hero({ eyebrow, title, description, primaryCta, secondaryCta }: HeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-zinc-800/80">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `linear-gradient(to right, rgb(39 39 42 / 0.5) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(39 39 42 / 0.5) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-600/90">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-zinc-100 sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl">
          {description}
        </p>
        {(primaryCta || secondaryCta) && (
          <div className="mt-10 flex flex-wrap gap-4">
            {primaryCta && (
              <Link
                href={primaryCta.href}
                className={
                  primaryCta.variant === "secondary"
                    ? "inline-flex items-center justify-center rounded-sm border border-zinc-600 px-5 py-2.5 text-sm font-medium text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-900/50"
                    : "inline-flex items-center justify-center rounded-sm bg-amber-700 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-amber-600"
                }
              >
                {primaryCta.label}
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center justify-center rounded-sm border border-zinc-600 px-5 py-2.5 text-sm font-medium text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-900/50"
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
