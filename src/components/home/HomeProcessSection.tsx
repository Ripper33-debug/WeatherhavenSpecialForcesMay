"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const steps = [
  {
    n: "01",
    t: "Operational analysis",
    b: "CONOPS become spatial requirements, circulation, and environmental envelopes that survive first-day reality.",
  },
  {
    n: "02",
    t: "Configuration discipline",
    b: "Options stay inside validated subsystems—transparent trade space, not cookie-cutter bundles.",
  },
  {
    n: "03",
    t: "Field integration",
    b: "Commissioning, training, and documentation tuned to maintenance echelons and CDRL expectations.",
  },
];

export function HomeProcessSection() {
  const { ref, rootClass } = useScrollReveal({ variant: "slide-left-stagger", staggerMs: 120 });

  return (
    <section className="border-b border-white/[0.08] bg-[#080a0c]">
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 sm:py-20 lg:px-12 lg:py-24">
        <p className="wh-label">How we work</p>
        <h2 className="font-display mt-6 max-w-4xl text-3xl font-semibold leading-[1.05] tracking-[-0.02em] text-white sm:text-4xl lg:text-5xl">
          Mission threads drive layout—not a fixed catalog.
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#8a9099] sm:text-lg">
          We embed with program offices and operators early to lock footprint, signature, throughput, and sustainment
          before metal moves.
        </p>
        <div ref={ref} className={`mt-14 grid grid-cols-1 gap-0 lg:mt-16 lg:grid-cols-3 lg:gap-10 ${rootClass}`}>
          {steps.map((step) => (
            <div key={step.n} data-reveal-child className="border-t border-white/[0.1] pt-6 lg:pt-8">
              <p className="text-[11px] font-medium tracking-[0.15em] text-[#c8a96e]">{step.n}</p>
              <p className="mt-4 text-lg font-medium text-white">{step.t}</p>
              <p className="mt-3 text-sm leading-relaxed text-[#8a9099]">{step.b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
