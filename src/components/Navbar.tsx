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
      className={`wh-label transition-colors ${
        active ? "text-zinc-100" : "text-zinc-500 hover:text-zinc-200"
      }`}
    >
      {label}
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-black/80 backdrop-blur-2xl">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-4 sm:h-16 sm:px-6 lg:px-12">
        <Link href="/" className="group flex shrink-0 items-baseline gap-2">
          <span className="font-display text-lg font-semibold tracking-tight text-white sm:text-xl">
            {company.shortName}
          </span>
          <span className="hidden font-mono text-[10px] font-normal tracking-[0.16em] text-zinc-600 sm:inline">
            RESOURCE INC.
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
          {navLinks.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}
        </nav>

        <div className="hidden items-center lg:flex">
          <Link
            href="/request-access"
            className="wh-cta inline-flex items-center justify-center border border-white bg-white px-5 py-2.5 text-black transition hover:bg-zinc-100"
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
        <div className="max-h-[min(75vh,560px)] overflow-y-auto border-t border-white/[0.08] bg-black px-4 py-6 backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="wh-label block rounded-md px-3 py-3.5 text-left text-zinc-300 transition hover:bg-white/[0.06] hover:text-white"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/request-access"
              className="wh-cta mt-4 border border-white bg-white py-3.5 text-center text-black transition hover:bg-zinc-100"
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
