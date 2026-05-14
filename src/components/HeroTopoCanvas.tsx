"use client";

import { useEffect, useRef } from "react";

const BG = "#080a0c";
const LINE = "rgba(200, 169, 110, 0.12)";
const LINE_INDEX = "rgba(200, 169, 110, 0.22)";
const GRID = "rgba(200, 169, 110, 0.04)";

function strokeOrganicContour(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  baseR: number,
  t: number,
  seed: number,
) {
  const steps = 96;
  const wobbleAmp = 0.055 * baseR;
  ctx.beginPath();
  for (let i = 0; i <= steps; i++) {
    const theta = (i / steps) * Math.PI * 2;
    const w =
      wobbleAmp *
      (0.45 * Math.sin(theta * 3 + t * 0.5 + seed) +
        0.35 * Math.cos(theta * 5 - t * 0.42 + seed * 1.7) +
        0.2 * Math.sin(theta * 7 + t * 0.38 + seed * 2.3));
    const r = baseR + w;
    const x = cx + r * Math.cos(theta);
    const y = cy + r * Math.sin(theta);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.stroke();
}

export function HeroTopoCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let t0 = performance.now();

    const getReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const getMobile = () => window.matchMedia("(max-width: 767px)").matches;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, container.clientWidth);
      const h = Math.max(1, container.clientHeight);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const markers = [
      { x: 0.22, y: 0.35, phase: 0.4, freq: 0.00085 },
      { x: 0.78, y: 0.28, phase: 2.2, freq: 0.00115 },
      { x: 0.52, y: 0.72, phase: 4.5, freq: 0.00098 },
    ];

    const draw = (now: number) => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w < 1 || h < 1) return;

      const t = (now - t0) * 0.001;
      const reduced = getReducedMotion();
      const mobile = getMobile();
      const cx = w * 0.52;
      const cy = h * 0.48;
      const scale = Math.min(w, h) * 0.48;

      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, w, h);

      const numRings = mobile ? 8 : 17;
      const rMin = scale * 0.14;
      const rMax = scale * 0.94;

      for (let k = 0; k < numRings; k++) {
        const u = numRings > 1 ? k / (numRings - 1) : 0.5;
        const breathe = reduced ? 0 : 0.045 * Math.sin(t * 0.28 + k * 0.52 + u * 3.1);
        const pulse = reduced ? 0 : 0.055 * Math.sin(t * (0.33 + (k % 5) * 0.11) + k * 0.73);
        const baseR = Math.min(rMax, Math.max(rMin * 0.85, rMin + (rMax - rMin) * (u + breathe + pulse)));
        const indexContour = k % 4 === 0;
        ctx.strokeStyle = indexContour ? LINE_INDEX : LINE;
        ctx.lineWidth = indexContour ? 1.25 : 1;
        const phase = reduced ? 0 : t * 0.15;
        strokeOrganicContour(ctx, cx, cy, baseR, phase, k * 1.31);
        ctx.stroke();
      }

      if (!mobile) {
        ctx.strokeStyle = GRID;
        ctx.lineWidth = 1;
        const len = Math.hypot(w, h) * 0.75;
        for (let d = 0; d < 4; d++) {
          ctx.save();
          ctx.translate(w * (0.18 + d * 0.22), h * (0.12 + d * 0.18));
          ctx.rotate(-0.55 + d * 0.28);
          ctx.beginPath();
          ctx.moveTo(-len, 0);
          ctx.lineTo(len, 0);
          ctx.stroke();
          ctx.restore();
        }
      }

      for (const m of markers) {
        const ox = m.x * w;
        const oy = m.y * h;
        const pulse = reduced ? 0.2 : 0.1 + 0.2 * (0.5 + 0.5 * Math.sin(now * m.freq + m.phase));
        ctx.strokeStyle = `rgba(200, 169, 110, ${pulse})`;
        ctx.lineWidth = 1;
        const L = 7;
        ctx.beginPath();
        ctx.moveTo(ox - L, oy);
        ctx.lineTo(ox + L, oy);
        ctx.moveTo(ox, oy - L);
        ctx.lineTo(ox, oy + L);
        ctx.stroke();
      }
    };

    let visible = document.visibilityState === "visible";

    const loop = (now: number) => {
      if (!visible) return;
      if (getReducedMotion()) {
        draw(now);
        return;
      }
      draw(now);
      raf = requestAnimationFrame(loop);
    };

    const startLoop = () => {
      cancelAnimationFrame(raf);
      if (!getReducedMotion() && visible) {
        raf = requestAnimationFrame(loop);
      } else {
        draw(performance.now());
      }
    };

    const onVis = () => {
      visible = document.visibilityState === "visible";
      if (visible && !getReducedMotion()) startLoop();
      else cancelAnimationFrame(raf);
    };

    const onMq = () => {
      resize();
      draw(performance.now());
      if (!getReducedMotion() && visible) startLoop();
    };

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      draw(performance.now());
    });
    ro.observe(container);

    const mqRm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqM = window.matchMedia("(max-width: 767px)");
    mqRm.addEventListener("change", onMq);
    mqM.addEventListener("change", onMq);
    document.addEventListener("visibilitychange", onVis);

    const boot = () => {
      resize();
      t0 = performance.now();
      draw(performance.now());
      startLoop();
    };
    const initTimer = window.setTimeout(boot, 0);

    return () => {
      window.clearTimeout(initTimer);
      cancelAnimationFrame(raf);
      ro.disconnect();
      mqRm.removeEventListener("change", onMq);
      mqM.removeEventListener("change", onMq);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <canvas ref={canvasRef} className="absolute left-0 top-0 z-0 block h-full w-full" aria-hidden />
      {/* HERO VIDEO: drop /public/hero-video.mp4 here to replace canvas with real footage */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse 90% 80% at 60% 50%, transparent 30%, #080a0c 100%)",
        }}
        aria-hidden
      />
    </div>
  );
}
