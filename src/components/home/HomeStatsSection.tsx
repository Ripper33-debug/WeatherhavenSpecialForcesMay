"use client";

import { useEffect, useState } from "react";
import { HomeStatsCountUp } from "@/components/HomeStatsCountUp";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { Stat } from "@/components/StatsSection";

const stats: Stat[] = [
  {
    value: "45+",
    label: "Years",
    detail: "Expeditionary shelter and deployable camp heritage.",
  },
  {
    value: "52+",
    label: "Patents",
    detail: "Modular shelter, integration, and environmental control.",
  },
  {
    value: "39",
    label: "Militaries served",
    detail: "Allied defense programs with disciplined disclosure.",
  },
  {
    value: "96+",
    label: "Countries deployed",
    detail: "Field presence across climates and logistics realities.",
  },
];

export function HomeStatsSection() {
  const { ref, rootClass } = useScrollReveal();
  const [flickerIndex, setFlickerIndex] = useState<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    let idx = 0;
    const pulse = () => {
      setFlickerIndex(idx);
      idx = (idx + 1) % stats.length;
      window.setTimeout(() => setFlickerIndex(null), 300);
    };

    const id = window.setInterval(pulse, 8000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section data-analytics-section="credibility" className="border-y border-white/[0.08] bg-[#080a0c]">
      <div ref={ref} className={`mx-auto max-w-[1400px] px-4 py-16 sm:px-6 sm:py-20 lg:px-12 ${rootClass}`}>
        <div className="mb-14 max-w-2xl">
          <p className="wh-label border-b border-white/10 pb-3">Credibility</p>
          <h2 className="font-display mt-6 text-3xl font-semibold leading-tight tracking-[-0.02em] text-white sm:text-4xl">
            Decades of expeditionary delivery.
          </h2>
        </div>
        <HomeStatsCountUp stats={stats} flickerIndex={flickerIndex} />
      </div>
    </section>
  );
}
