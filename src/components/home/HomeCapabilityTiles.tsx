"use client";

import {
  IconBed,
  IconBolt,
  IconLayoutDashboard,
  IconPackages,
  IconPlane,
  IconStethoscope,
  IconTemperature,
  IconTool,
} from "@tabler/icons-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const tiles = [
  { title: "Rapid Deployment", desc: "Shelter systems staged and fielded in hours, not days.", Icon: IconBolt },
  { title: "Mobility", desc: "Air, sea, and ground transportable configurations.", Icon: IconPlane },
  { title: "Climate Control", desc: "ECU systems rated for Arctic to desert extremes.", Icon: IconTemperature },
  { title: "Command & Control", desc: "C2-ready layouts with power, data, and blackout capability.", Icon: IconLayoutDashboard },
  { title: "Medical Support", desc: "Field-deployable medical shelter configurations.", Icon: IconStethoscope },
  { title: "Maintenance", desc: "Heavy maintenance shelter systems for aviation and vehicle support.", Icon: IconTool },
  { title: "Accommodation", desc: "Berthing and life support for extended operations.", Icon: IconBed },
  { title: "Logistics", desc: "Integrated sustainment and camp infrastructure sequencing.", Icon: IconPackages },
];

export function HomeCapabilityTiles() {
  const { ref, rootClass } = useScrollReveal({ variant: "fade-up-stagger", staggerMs: 100 });

  return (
    <section data-analytics-section="capabilities" className="border-b border-white/[0.08] bg-[#080a0c]">
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 sm:py-20 lg:px-12">
        <p className="wh-label">Capabilities</p>
        <h2 className="font-display mt-6 max-w-4xl text-3xl font-semibold leading-[1.05] tracking-[-0.02em] text-white sm:text-4xl lg:text-5xl">
          Built for the full mission spectrum.
        </h2>
        <div ref={ref} className={`mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12 ${rootClass}`}>
          {tiles.map(({ title, desc, Icon }) => (
            <div key={title} data-reveal-child>
              <Icon className="text-white" stroke={1.25} size={32} aria-hidden />
              <p className="mt-4 text-sm font-medium text-white">{title}</p>
              <p className="mt-2 text-[13px] leading-relaxed text-[#8a9099]">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
