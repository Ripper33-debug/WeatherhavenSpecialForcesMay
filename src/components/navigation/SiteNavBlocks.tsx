"use client";

import Link from "next/link";
import { useState } from "react";
import { IconChevronDown, IconMenu2, IconX } from "@tabler/icons-react";
import { company, navContactLink, navFlatLinks, navResourcesItems, navSolutionsItems } from "@/lib/site";

function DesktopDropdown({
  label,
  items,
}: {
  label: string;
  items: readonly { href: string; label: string; description: string }[];
}) {
  return (
    <div className="group relative flex items-center">
      <span className="cursor-default whitespace-nowrap text-[14px] font-normal text-white transition-opacity duration-150 ease-out hover:opacity-70">
        {label}
      </span>
      <div className="pointer-events-none invisible absolute left-1/2 top-full z-[120] min-w-[280px] -translate-x-1/2 pt-2 opacity-0 transition-[opacity,visibility] duration-150 ease-out group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100">
        <div role="menu" className="border border-[rgba(255,255,255,0.08)] bg-[#0d0f12] py-2 shadow-none">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-3 no-underline transition-opacity duration-150 ease-out hover:opacity-70"
            >
              <span className="block text-[14px] leading-tight text-white">{item.label}</span>
              <span className="mt-1 block text-[13px] leading-snug text-[#8a9099]">{item.description}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function NavDesktopCenter({ className = "" }: { className?: string }) {
  return (
    <nav className={`flex flex-wrap items-center justify-center gap-x-8 gap-y-2 ${className}`}>
      <DesktopDropdown label="Solutions" items={navSolutionsItems} />
      {navFlatLinks.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="whitespace-nowrap text-[14px] font-normal text-white no-underline transition-opacity duration-150 ease-out hover:opacity-70"
        >
          {item.label}
        </Link>
      ))}
      <DesktopDropdown label="Resources" items={navResourcesItems} />
      <Link
        href={navContactLink.href}
        className="whitespace-nowrap text-[14px] font-normal text-white no-underline transition-opacity duration-150 ease-out hover:opacity-70"
      >
        {navContactLink.label}
      </Link>
    </nav>
  );
}

export function NavRequestAccessCta({
  className = "",
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href="/request-access"
      onClick={onNavigate}
      className={`inline-flex items-center justify-center border border-white bg-transparent px-5 py-2.5 text-[14px] font-medium text-white no-underline transition-opacity duration-150 ease-out hover:opacity-70 ${className}`}
    >
      Request Access
    </Link>
  );
}

export function NavMobileOverlay({
  open,
  onClose,
  showWordmark = true,
}: {
  open: boolean;
  onClose: () => void;
  showWordmark?: boolean;
}) {
  const [solOpen, setSolOpen] = useState(false);
  const [resOpen, setResOpen] = useState(false);

  if (!open) return null;

  const close = () => {
    onClose();
    setSolOpen(false);
    setResOpen(false);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-[#080a0c] md:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
    >
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-[rgba(255,255,255,0.1)] px-4 sm:h-16">
        {showWordmark ? (
          <Link href="/" className="font-display text-lg font-semibold tracking-tight text-white" onClick={close}>
            {company.shortName}
          </Link>
        ) : (
          <span className="font-display text-lg font-semibold tracking-tight text-white">{company.shortName}</span>
        )}
        <button
          type="button"
          className="flex p-2 text-white transition-opacity hover:opacity-70"
          aria-label="Close menu"
          onClick={close}
        >
          <IconX size={22} stroke={1.5} />
        </button>
      </div>

      <nav className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 py-6">
        <div>
          <button
            type="button"
            className="flex w-full items-center justify-between border-b border-[rgba(255,255,255,0.08)] py-4 text-left text-[24px] leading-snug text-white transition-opacity hover:opacity-70"
            onClick={() => setSolOpen((v) => !v)}
            aria-expanded={solOpen}
          >
            Solutions
            <IconChevronDown
              size={22}
              stroke={1.5}
              className={`shrink-0 transition-transform ${solOpen ? "rotate-180" : ""}`}
            />
          </button>
          {solOpen && (
            <div className="border-b border-[rgba(255,255,255,0.08)] py-2 pl-6">
              {navSolutionsItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block py-3 no-underline transition-opacity hover:opacity-70"
                  onClick={close}
                >
                  <span className="block text-[16px] text-white">{item.label}</span>
                  <span className="mt-1 block text-[13px] leading-snug text-[#8a9099]">{item.description}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {navFlatLinks.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="border-b border-[rgba(255,255,255,0.08)] py-4 text-[24px] leading-snug text-white no-underline transition-opacity hover:opacity-70"
            onClick={close}
          >
            {item.label}
          </Link>
        ))}

        <div>
          <button
            type="button"
            className="flex w-full items-center justify-between border-b border-[rgba(255,255,255,0.08)] py-4 text-left text-[24px] leading-snug text-white transition-opacity hover:opacity-70"
            onClick={() => setResOpen((v) => !v)}
            aria-expanded={resOpen}
          >
            Resources
            <IconChevronDown
              size={22}
              stroke={1.5}
              className={`shrink-0 transition-transform ${resOpen ? "rotate-180" : ""}`}
            />
          </button>
          {resOpen && (
            <div className="border-b border-[rgba(255,255,255,0.08)] py-2 pl-6">
              {navResourcesItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block py-3 no-underline transition-opacity hover:opacity-70"
                  onClick={close}
                >
                  <span className="block text-[16px] text-white">{item.label}</span>
                  <span className="mt-1 block text-[13px] leading-snug text-[#8a9099]">{item.description}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link
          href={navContactLink.href}
          className="border-b border-[rgba(255,255,255,0.08)] py-4 text-[24px] leading-snug text-white no-underline transition-opacity hover:opacity-70"
          onClick={close}
        >
          {navContactLink.label}
        </Link>
      </nav>

      <div className="shrink-0 border-t border-[rgba(255,255,255,0.1)] p-4">
        <NavRequestAccessCta className="w-full py-4 text-center" onNavigate={close} />
      </div>
    </div>
  );
}

export function NavHamburgerButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      className="flex p-2 text-[#8a9099] transition-opacity hover:opacity-70 md:hidden"
      aria-expanded={false}
      aria-label="Open menu"
      onClick={onClick}
    >
      <IconMenu2 size={22} stroke={1.5} />
    </button>
  );
}
