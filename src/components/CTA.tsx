import Link from "next/link";

export type CTAProps = {
  title: string;
  description?: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
};

export function CTA({ title, description, primary, secondary }: CTAProps) {
  return (
    <section className="border-t border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-18 lg:px-10">
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-zinc-900/40 px-6 py-10 sm:px-10 lg:px-12 lg:py-12">
          <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-amber-600/50 to-transparent" />
          <div className="relative pl-6 sm:pl-8">
            <h2 className="font-display max-w-xl text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
              {title}
            </h2>
            {description && (
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-zinc-400">{description}</p>
            )}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
              <Link
                href={primary.href}
                className="inline-flex min-h-10 items-center justify-center rounded-full bg-zinc-100 px-5 py-2.5 text-[13px] font-semibold text-zinc-950 transition hover:bg-white"
              >
                {primary.label}
              </Link>
              {secondary && (
                <Link
                  href={secondary.href}
                  className="inline-flex min-h-10 items-center justify-center rounded-full border border-white/[0.1] px-5 py-2.5 text-[13px] font-semibold text-zinc-200 transition hover:border-white/[0.16] hover:bg-white/[0.04]"
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
