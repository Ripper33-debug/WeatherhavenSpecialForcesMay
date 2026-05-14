"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

export type SofCredStat = {
  id: string;
  target: number;
  suffix: string;
  label: string;
  description: string;
};

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

function subscribeReducedMotion(cb: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export function SofCountUp({ stats }: { stats: SofCredStat[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [values, setValues] = useState(() => stats.map(() => 0));
  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  const displayValues = reduceMotion ? stats.map((s) => s.target) : values;

  useEffect(() => {
    if (reduceMotion) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [reduceMotion]);

  useEffect(() => {
    if (!started || reduceMotion) return;
    const duration = 2000;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const e = easeOutCubic(t);
      setValues(stats.map((s) => Math.round(s.target * e)));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setValues(stats.map((s) => s.target));
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, reduceMotion, stats]);

  return (
    <div
      ref={ref}
      className="mt-16 grid grid-cols-1 gap-px bg-[rgba(255,255,255,0.1)] md:mt-20 md:grid-cols-2 lg:grid-cols-4"
    >
      {stats.map((stat, i) => (
        <div key={stat.id} className="bg-[#080a0c] px-6 py-10 md:px-8 lg:px-10 lg:py-12">
          <p className="font-display text-[64px] font-medium leading-none tracking-[-0.02em] text-white">
            {displayValues[i] ?? 0}
            {stat.suffix}
          </p>
          <p className="mt-2 text-base font-medium text-white">{stat.label}</p>
          <p className="mt-2 text-[13px] leading-relaxed text-[#8a9099]">{stat.description}</p>
        </div>
      ))}
    </div>
  );
}
