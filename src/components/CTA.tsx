import Link from "next/link";

export type CTAProps = {
  title: string;
  description?: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
};

export function CTA({ title, description, primary, secondary }: CTAProps) {
  return (
    <section className="border-t border-zinc-800/80">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="rounded-lg border border-zinc-800 bg-gradient-to-br from-zinc-900/80 to-zinc-950 px-6 py-12 sm:px-10 lg:px-14">
          <h2 className="max-w-2xl text-2xl font-semibold tracking-tight text-zinc-100 sm:text-3xl">
            {title}
          </h2>
          {description && (
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
              {description}
            </p>
          )}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={primary.href}
              className="inline-flex items-center justify-center rounded-sm bg-amber-700 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-amber-600"
            >
              {primary.label}
            </Link>
            {secondary && (
              <Link
                href={secondary.href}
                className="inline-flex items-center justify-center rounded-sm border border-zinc-600 px-5 py-2.5 text-sm font-medium text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-900/50"
              >
                {secondary.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
