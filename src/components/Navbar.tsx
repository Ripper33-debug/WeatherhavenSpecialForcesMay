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
      className={`text-sm font-medium tracking-wide transition-colors ${
        active
          ? "text-zinc-100"
          : "text-zinc-400 hover:text-zinc-200"
      }`}
    >
      {label}
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex shrink-0 flex-col">
          <span className="text-sm font-semibold tracking-tight text-zinc-100 sm:text-base">
            {company.shortName}
          </span>
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500 group-hover:text-zinc-400">
            Resource Inc.
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="/request-access"
            className="rounded-sm border border-amber-700/60 bg-amber-950/30 px-4 py-2 text-sm font-medium text-amber-100 transition hover:border-amber-600/80 hover:bg-amber-950/50"
          >
            Request Access
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-zinc-300 md:hidden"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-zinc-800 bg-zinc-950 px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-1 text-sm font-medium text-zinc-300"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/request-access"
              className="mt-2 rounded-sm border border-amber-700/60 bg-amber-950/30 px-4 py-2 text-center text-sm font-medium text-amber-100"
              onClick={() => setOpen(false)}
            >
              Request Access
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
