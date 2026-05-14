import Link from "next/link";
import { company, navFooterLeafLinks } from "@/lib/site";

export function SofFooter() {
  return (
    <footer className="border-t border-[rgba(255,255,255,0.08)] bg-[#080a0c] px-6 py-12 lg:px-20">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <Link href="/" className="font-display text-lg font-medium tracking-[-0.02em] text-white no-underline">
          {company.shortName}
        </Link>
        <nav className="flex flex-wrap gap-x-8 gap-y-3">
          {navFooterLeafLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-xs text-[#8a9099] no-underline transition-opacity hover:opacity-70"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mx-auto mt-10 max-w-[1600px] text-xs leading-relaxed text-[#8a9099]">
        <p>
          © {new Date().getFullYear()} {company.name} All rights reserved.
        </p>
        <p className="mt-4 max-w-3xl">
          Export-controlled technical data may apply. Distribution limited to authorized recipients and programs of
          record.
        </p>
        <p className="mt-4 max-w-4xl">
          Reference to U.S. Department of Defense organizations or visual style does not imply endorsement. Shelter and
          infrastructure descriptions are illustrative of capability classes and may vary by contract and theater.
        </p>
      </div>
    </footer>
  );
}
