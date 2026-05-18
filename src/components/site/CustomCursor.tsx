"use client";

import { useEffect, useState } from "react";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      setActive(Boolean(t?.closest("a, button, [role='button'], input, select, textarea, label")));
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    document.body.classList.add("wh-custom-cursor");

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.body.classList.remove("wh-custom-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      className={`wh-cursor-crosshair pointer-events-none fixed z-[200] ${active ? "wh-cursor-active" : ""}`}
      style={{ left: pos.x, top: pos.y }}
      aria-hidden
    >
      <span className="wh-cursor-h" />
      <span className="wh-cursor-v" />
    </div>
  );
}
