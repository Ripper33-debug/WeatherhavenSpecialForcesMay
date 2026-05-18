"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

export function SofProblemSection() {
  const { ref, rootClass } = useScrollReveal({ variant: "fade-up", threshold: 0.15 });

  return (
    <section
      ref={ref}
      className={`sof-section border-t border-[rgba(255,255,255,0.08)] bg-[#080a0c] ${rootClass}`}
    >
      <p className="sof-label mb-12">THE PROBLEM</p>
      <div className="grid max-w-[1400px] gap-16 lg:grid-cols-2 lg:gap-20">
        <blockquote className="font-display text-[28px] font-normal italic leading-snug tracking-[-0.02em] text-white lg:text-[36px]">
          SOF teams need fast, deployable infrastructure in denied, remote, and extreme environments — and they need it
          to work the first time.
        </blockquote>
        <div>
          {[
            {
              t: "Speed",
              b: "Rapid deployment windows leave no margin for complex setup or missing components.",
            },
            {
              t: "Environment",
              b: "Arctic, desert, and high-altitude operations demand climate control that does not fail.",
            },
            {
              t: "Signature",
              b: "Low-visibility operations require shelters that minimize thermal and visual exposure.",
            },
          ].map((row) => (
            <div key={row.t} className="mb-8 border-l-2 border-[#c8a96e] pl-5 last:mb-0 md:mb-10">
              <p className="text-sm font-medium text-white">{row.t}</p>
              <p className="mt-2 text-sm leading-relaxed text-[#8a9099]">{row.b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
