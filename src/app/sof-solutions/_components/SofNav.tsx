"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  NavDesktopCenter,
  NavHamburgerButton,
  NavMobileOverlay,
  NavRequestAccessCta,
} from "@/components/navigation/SiteNavBlocks";
import { NavSignOut } from "@/components/navigation/NavSignOut";
import { company } from "@/lib/site";

export function SofNav() {
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
        className={`fixed left-0 right-0 top-0 z-[80] overflow-visible backdrop-blur-[12px] transition-[border-color] duration-200 ${
          scrolled ? "border-b border-[rgba(255,255,255,0.1)]" : "border-b border-transparent"
        }`}
        style={{ backgroundColor: "rgba(8,10,12,0.92)" }}
      >
        <div className="mx-auto grid h-16 max-w-[1600px] grid-cols-[1fr_auto] items-center gap-4 px-6 md:grid-cols-[1fr_auto_1fr] lg:h-[4.25rem] lg:px-20">
          <Link href="/" className="justify-self-start font-display text-lg font-medium tracking-[-0.02em] text-white">
            {company.shortName}
          </Link>

          <div className="hidden justify-self-center md:col-start-2 md:block">
            <NavDesktopCenter />
          </div>

          <div className="col-start-2 flex items-center justify-end gap-4 justify-self-end md:col-start-3">
            <div className="hidden items-center gap-4 md:flex">
              <NavSignOut />
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
