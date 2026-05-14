import Link from "next/link";
import { company, footerColumns } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-black">
      <div className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 lg:px-12">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="font-display text-xl font-semibold tracking-tight text-white">{company.shortName}</p>
            <p className="mt-1 font-mono text-[10px] font-medium tracking-[0.2em] text-zinc-600">{company.name}</p>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-zinc-400 sm:text-base">
              {company.tagline} Engineering-led delivery for U.S. and allied customers.
            </p>
          </div>
          {footerColumns.map((col) => (
            <div key={col.title}>
              <p className="wh-label text-zinc-600">{col.title}</p>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-400 transition hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-white/[0.08] pt-10 text-xs leading-relaxed text-zinc-600 sm:flex-row sm:items-start sm:justify-between">
          <p className="font-mono tracking-wide">
            © {new Date().getFullYear()} {company.name} All rights reserved.
          </p>
          <p className="max-w-xl">
            Export-controlled technical data may apply. Distribution limited to authorized recipients and programs of
            record.
          </p>
        </div>
        <p className="mt-6 max-w-4xl border-l border-white/10 pl-5 text-[11px] leading-relaxed text-zinc-600">
          Reference to U.S. Department of Defense organizations or visual style does not imply endorsement. Shelter and
          infrastructure descriptions are illustrative of capability classes and may vary by contract and theater.
        </p>
      </div>
    </footer>
  );
}
