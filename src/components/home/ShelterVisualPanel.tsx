"use client";

import { useEffect, useState } from "react";
import { InteractiveShelterVisual } from "@/components/home/InteractiveShelterVisual";
import { Shelter3DVisual, type ShelterViewMode } from "@/components/home/Shelter3DVisual";

type Props = {
  activeView: ShelterViewMode;
  className?: string;
};

export function ShelterVisualPanel({ activeView, className }: Props) {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (mobile) {
    return <InteractiveShelterVisual className={className} />;
  }

  return <Shelter3DVisual activeView={activeView} className={className} />;
}
