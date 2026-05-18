"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

export function SofProcessSection() {
  const { ref, rootClass } = useScrollReveal({ variant: "slide-up-stagger", staggerMs: 80, threshold: 0.15 });

  return (
    <section ref={ref} className={`sof-section bg-[#080a0c] ${rootClass}`}>
      <p className="sof-label">OUR PROCESS</p>
      <h2 className="font-display mt-6 max-w-5xl text-[32px] font-medium tracking-[-0.02em] text-white lg:text-[40px]">
        Mission threads drive layout — not a fixed catalog.
      </h2>
      <div className="mt-16 grid grid-cols-1 gap-0 lg:mt-20 lg:grid-cols-3 lg:gap-10">
        {[
          {
            n: "01",
            t: "Operational Analysis",
            b: "CONOPS become spatial requirements, circulation, and environmental envelopes that survive first-day reality.",
          },
          {
            n: "02",
            t: "Configuration Discipline",
            b: "Options stay inside validated subsystems — transparent trade space, not cookie-cutter bundles.",
          },
          {
            n: "03",
            t: "Field Integration",
            b: "Commissioning, training, and documentation tuned to maintenance echelons and CDRL expectations.",
          },
        ].map((step) => (
          <div key={step.n} data-reveal-child className="border-t border-[rgba(255,255,255,0.1)] pt-6 lg:pt-8">
            <p className="text-[11px] font-medium tracking-[0.15em] text-[#c8a96e]">{step.n}</p>
            <p className="mt-4 text-lg font-medium text-white">{step.t}</p>
            <p className="mt-3 text-sm leading-relaxed text-[#8a9099]">{step.b}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
