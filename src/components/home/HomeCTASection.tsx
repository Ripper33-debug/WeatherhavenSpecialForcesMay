"use client";

import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const btnPrimary =
  "inline-flex min-h-11 items-center justify-center border border-white bg-white px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-zinc-100";
const btnGhost =
  "inline-flex min-h-11 items-center justify-center border border-white/25 bg-transparent px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-100 transition hover:border-white/50 hover:bg-white/[0.04]";

export function HomeCTASection() {
  const { ref, rootClass } = useScrollReveal();

  return (
    <section className="border-t border-white/[0.08] bg-[#080a0c]">
      <div ref={ref} className={`mx-auto max-w-[1400px] px-4 py-16 sm:px-6 sm:py-20 lg:px-12 ${rootClass}`}>
        <div className="relative overflow-hidden border border-white/[0.1] bg-black/30 px-6 py-12 sm:px-10 lg:px-14 lg:py-14">
          <div className="relative max-w-3xl">
            <h2 className="font-display text-3xl font-semibold leading-[1.05] tracking-[-0.02em] text-white sm:text-4xl">
              Engage our SOF solutions team.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#8a9099] sm:text-lg">
              Share your deployment profile for a controlled technical exchange matched to clearance and program status.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <Link href="/request-access" className={btnPrimary}>
                Request access
              </Link>
              <Link href="/contact" className={btnGhost}>
                Contact programs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
