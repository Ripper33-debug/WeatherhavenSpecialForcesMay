"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  NavDesktopCenter,
  NavHamburgerButton,
  NavMobileOverlay,
  NavRequestAccessCta,
} from "@/components/navigation/SiteNavBlocks";
import { company } from "@/lib/site";

export function Navbar() {
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
        data-global-nav
        className={`sticky top-0 z-50 overflow-visible backdrop-blur-[12px] transition-[border-color] duration-200 ${
          scrolled ? "border-b border-[rgba(255,255,255,0.1)]" : "border-b border-transparent"
        }`}
        style={{ backgroundColor: "rgba(8,10,12,0.92)" }}
      >
        <div className="mx-auto grid h-14 max-w-[1400px] grid-cols-[1fr_auto] items-center px-4 sm:h-16 sm:px-6 md:grid-cols-[1fr_auto_1fr] lg:px-12">
          <Link href="/" className="group flex shrink-0 items-baseline gap-2 justify-self-start">
            <span className="font-display text-lg font-semibold tracking-tight text-white sm:text-xl">
              {company.shortName}
            </span>
            <span className="hidden font-mono text-[10px] font-normal tracking-[0.16em] text-[#8a9099] sm:inline">
              RESOURCE INC.
            </span>
          </Link>

          <div className="hidden justify-self-center md:col-start-2 md:block">
            <NavDesktopCenter />
          </div>

          <div className="col-start-2 flex items-center justify-end gap-2 justify-self-end md:col-start-3">
            <div className="hidden md:block">
              <NavRequestAccessCta />
            </div>
            <NavHamburgerButton onClick={() => setOpen(true)} />
          </div>
        </div>
      </header>

      <NavMobileOverlay open={open} onClose={() => setOpen(false)} showWordmark />
    </>
  );
}
