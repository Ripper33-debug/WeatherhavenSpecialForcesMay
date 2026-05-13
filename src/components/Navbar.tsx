"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { company, navLinks } from "@/lib/site";

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
  return (
    <Link
      href={href}
      className={`text-[11px] font-medium tracking-tight transition-colors xl:text-[12px] ${
        active ? "text-zinc-50" : "text-zinc-500 hover:text-zinc-200"
      }`}
    >
      {label}
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-zinc-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:h-[3.75rem] sm:px-6 lg:px-10">
        <Link href="/" className="group flex shrink-0 items-baseline gap-2">
          <span className="font-display text-[1.0625rem] font-semibold tracking-tight text-zinc-50 sm:text-lg">
            {company.shortName}
          </span>
          <span className="hidden text-[11px] font-normal text-zinc-600 sm:inline">Resource Inc.</span>
        </Link>

        <nav className="hidden items-center gap-4 text-[11px] font-medium xl:gap-5 xl:text-[12px] 2xl:gap-6 lg:flex">
          {navLinks.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}
        </nav>

        <div className="hidden items-center lg:flex">
          <Link
            href="/request-access"
            className="rounded-full bg-zinc-100 px-4 py-2 text-[12px] font-semibold text-zinc-950 transition hover:bg-white"
          >
            Request access
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-zinc-400 lg:hidden"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            {open ? <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <div className="max-h-[min(70vh,520px)] overflow-y-auto border-t border-white/[0.06] bg-zinc-950/95 px-4 py-5 backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col gap-0.5">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-3 text-[15px] text-zinc-200 transition hover:bg-white/[0.04]"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/request-access"
              className="mt-3 rounded-full bg-zinc-100 px-4 py-3 text-center text-[13px] font-semibold text-zinc-950"
              onClick={() => setOpen(false)}
            >
              Request access
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
