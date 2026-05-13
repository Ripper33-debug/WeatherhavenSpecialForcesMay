import Link from "next/link";
import { company, footerColumns } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-zinc-800/90 bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="font-display text-lg font-semibold tracking-tight text-zinc-50">{company.shortName}</p>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">{company.name}</p>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-zinc-400">
              {company.tagline} Engineering-led delivery for U.S. and allied customers.
            </p>
          </div>
          {footerColumns.map((col) => (
            <div key={col.title}>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-amber-600/90">
                {col.title}
              </p>
              <ul className="mt-4 space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-400 transition hover:text-zinc-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-zinc-800/90 pt-8 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {company.name} All rights reserved.</p>
          <p className="max-w-xl leading-relaxed">
            Export-controlled technical data may apply. Distribution limited to authorized
            recipients and programs of record.
          </p>
        </div>
        <p className="mt-6 max-w-4xl border-l-2 border-zinc-700 pl-4 text-[11px] leading-relaxed text-zinc-600">
          Reference to U.S. Department of Defense organizations or visual style does not imply
          endorsement. Shelter and infrastructure descriptions are illustrative of capability classes
          and may vary by contract and theater.
        </p>
      </div>
    </footer>
  );
}
