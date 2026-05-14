"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { company, navLinks } from "@/lib/site";

export function SofNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-[80] transition-[border-color] duration-200 ${
          scrolled ? "border-b border-[rgba(255,255,255,0.1)]" : "border-b border-transparent"
        }`}
        style={{ backgroundColor: "rgba(8,10,12,0.92)", backdropFilter: "blur(12px)" }}
      >
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-4 px-6 lg:h-[4.25rem] lg:px-20">
          <Link href="/" className="font-display text-lg font-medium tracking-[-0.02em] text-white">
            {company.shortName}
          </Link>

          <nav className="absolute left-1/2 hidden max-w-[min(720px,calc(100vw-380px))] -translate-x-1/2 flex-wrap justify-center gap-x-4 gap-y-2 xl:flex xl:flex-row">
            {navLinks.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm text-white no-underline transition-opacity duration-200 hover:opacity-70 ${
                    active ? "opacity-100" : "opacity-90"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-4">
            <Link
              href="/request-access"
              className="inline-flex items-center justify-center border border-white bg-transparent px-5 py-2.5 text-sm font-medium text-white no-underline transition-opacity duration-200 hover:opacity-70"
            >
              Request Access
            </Link>
            <button
              type="button"
              className="border border-white/20 p-2 text-white xl:hidden"
              aria-expanded={open}
              aria-label="Open menu"
              onClick={() => setOpen(true)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="square" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[75] bg-[#080a0c] xl:hidden" role="dialog" aria-modal="true">
          <div className="flex h-16 items-center justify-between border-b border-[rgba(255,255,255,0.1)] px-6">
            <span className="font-display text-lg font-medium text-white">{company.shortName}</span>
            <button
              type="button"
              className="border border-white/20 px-3 py-2 text-sm text-white"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
          <nav className="flex flex-col px-6 pt-8">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-[rgba(255,255,255,0.08)] py-5 text-lg text-white no-underline transition-opacity hover:opacity-70"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/request-access"
              className="mt-8 border border-white px-5 py-4 text-center text-sm font-medium text-white no-underline transition-opacity hover:opacity-70"
              onClick={() => setOpen(false)}
            >
              Request Access
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
