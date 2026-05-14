"use client";

import { useCountUpFromZero } from "@/hooks/useCountUpFromZero";
import type { Stat } from "./StatsSection";

export function parseCredibilityValue(value: string): { target: number; suffix: string } {
  const m = value.trim().match(/^(\d+)(.*)$/);
  if (!m) return { target: 0, suffix: value };
  return { target: Number(m[1]), suffix: m[2] ?? "" };
}

export function HomeStatsCountUp({ stats }: { stats: Stat[] }) {
  const parsed = stats.map((s) => parseCredibilityValue(s.value));
  const targets = parsed.map((p) => p.target);
  const { rootRef, displayValues } = useCountUpFromZero(targets, 2000);

  return (
    <div
      ref={rootRef}
      className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-white/[0.08]"
    >
      {stats.map((s, i) => (
        <div
          key={s.label}
          className={`lg:px-8 ${i === 0 ? "lg:pl-0" : ""} ${i === stats.length - 1 ? "lg:pr-0" : ""}`}
        >
          <p className="font-display text-4xl font-semibold tabular-nums tracking-tight text-white sm:text-[2.5rem]">
            <span>{displayValues[i] ?? 0}</span>
            <span>{parsed[i]?.suffix ?? ""}</span>
          </p>
          <p className="mt-2 text-sm font-medium text-white">{s.label}</p>
          {s.detail && <p className="mt-3 text-sm leading-relaxed text-[#8a9099]">{s.detail}</p>}
        </div>
      ))}
    </div>
  );
}
