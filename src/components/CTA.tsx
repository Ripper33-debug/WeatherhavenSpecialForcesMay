import Link from "next/link";

export type CTAProps = {
  title: string;
  description?: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
};

export function CTA({ title, description, primary, secondary }: CTAProps) {
  return (
    <section className="border-t border-zinc-800/90">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="relative overflow-hidden rounded-sm border border-zinc-800/90 bg-gradient-to-br from-zinc-900/90 via-zinc-950 to-zinc-950 px-6 py-12 shadow-[0_24px_80px_-48px_rgb(0_0_0/0.85)] transition duration-300 hover:border-zinc-700/90 sm:px-10 lg:px-14">
          <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-amber-700/80 via-amber-600 to-amber-800/80" />
          <div className="relative pl-5 sm:pl-8">
            <h2 className="font-display max-w-2xl text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
              {title}
            </h2>
            {description && (
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
                {description}
              </p>
            )}
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link
                href={primary.href}
                className="inline-flex min-h-11 items-center justify-center rounded-sm bg-amber-600 px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-zinc-950 shadow-[0_0_0_1px_rgb(180_83_9/0.35)] transition duration-200 hover:bg-amber-500 hover:shadow-[0_0_24px_-4px_rgb(245_158_11/0.35)] active:scale-[0.99]"
              >
                {primary.label}
              </Link>
              {secondary && (
                <Link
                  href={secondary.href}
                  className="inline-flex min-h-11 items-center justify-center rounded-sm border border-zinc-500 px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-zinc-200 transition duration-200 hover:border-zinc-400 hover:bg-zinc-900/50 active:scale-[0.99]"
                >
                  {secondary.label}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
