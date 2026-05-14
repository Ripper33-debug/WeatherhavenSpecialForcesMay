"use client";

import { useMemo } from "react";
import { useCountUpFromZero } from "@/hooks/useCountUpFromZero";

export type SofCredStat = {
  id: string;
  target: number;
  suffix: string;
  label: string;
  description: string;
};

export function SofCountUp({ stats }: { stats: SofCredStat[] }) {
  const targets = useMemo(() => stats.map((s) => s.target), [stats]);
  const { rootRef, displayValues } = useCountUpFromZero(targets, 2000);

  return (
    <div ref={rootRef} className="mt-16 md:mt-20">
      <div className="grid grid-cols-1 gap-px bg-[rgba(255,255,255,0.1)] md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div key={stat.id} className="bg-[#080a0c] px-6 py-10 md:px-8 lg:px-10 lg:py-12">
            <p className="font-display text-[64px] font-medium leading-none tracking-[-0.02em] text-white">
              <span className="tabular-nums">{displayValues[i] ?? 0}</span>
              <span className="tabular-nums">{stat.suffix}</span>
            </p>
            <p className="mt-2 text-base font-medium text-white">{stat.label}</p>
            <p className="mt-2 text-[13px] leading-relaxed text-[#8a9099]">{stat.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
