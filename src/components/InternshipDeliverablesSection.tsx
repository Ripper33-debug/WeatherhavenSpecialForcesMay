import Link from "next/link";

const links = [
  { href: "/", label: "Site" },
  { href: "/ai-configurator", label: "Builder" },
  { href: "/request-access", label: "Access" },
  { href: "/products", label: "Systems" },
  { href: "/capabilities", label: "Capabilities" },
] as const;

export function InternshipDeliverablesSection() {
  return (
    <section id="ent-4943-deliverables" className="scroll-mt-24 border-b border-white/[0.06] bg-zinc-950/30">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-6 rounded-2xl border border-white/[0.08] bg-zinc-900/25 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-8 sm:py-7">
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">ENT 4943 · Portfolio</p>
            <p className="mt-1.5 font-display text-lg font-semibold tracking-tight text-zinc-50 sm:text-xl">
              Internship deliverables in one place
            </p>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-500">
              Academic-safe summary: public experience, solution builder, lead flow, and positioning—no classified or
              export-controlled material.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:items-end">
            <div className="flex flex-wrap gap-2">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="rounded-full border border-white/[0.1] bg-zinc-950/60 px-3 py-1.5 text-[12px] font-medium text-zinc-300 transition hover:border-white/[0.16] hover:text-zinc-100"
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <Link
              href="/ent-4943"
              className="text-[13px] font-semibold text-amber-500/90 transition hover:text-amber-400"
            >
              Full portfolio page →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
