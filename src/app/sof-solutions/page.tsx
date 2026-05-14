import Image from "next/image";
import Link from "next/link";
import {
  IconBolt,
  IconBed,
  IconCalendar,
  IconFileDownload,
  IconLayoutDashboard,
  IconMessage,
  IconPackages,
  IconPlane,
  IconTemperature,
  IconTool,
  IconStethoscope,
} from "@tabler/icons-react";
import { SofCountUp, type SofCredStat } from "./_components/SofCountUp";

const heroStats = [
  { num: "45+", label: "Years" },
  { num: "52+", label: "Patents" },
  { num: "39", label: "Militaries Served" },
  { num: "96+", label: "Countries Deployed" },
];

const capabilityTiles = [
  {
    title: "Rapid Deployment",
    desc: "Shelter systems staged and fielded in hours, not days.",
    Icon: IconBolt,
  },
  {
    title: "Mobility",
    desc: "Air, sea, and ground transportable configurations.",
    Icon: IconPlane,
  },
  {
    title: "Climate Control",
    desc: "ECU systems rated for Arctic to desert extremes.",
    Icon: IconTemperature,
  },
  {
    title: "Command & Control",
    desc: "C2-ready layouts with power, data, and blackout capability.",
    Icon: IconLayoutDashboard,
  },
  {
    title: "Medical Support",
    desc: "Field-deployable medical shelter configurations.",
    Icon: IconStethoscope,
  },
  {
    title: "Maintenance",
    desc: "Heavy maintenance shelter systems for aviation and vehicle support.",
    Icon: IconTool,
  },
  {
    title: "Accommodation",
    desc: "Berthing and life support for extended operations.",
    Icon: IconBed,
  },
  {
    title: "Logistics",
    desc: "Integrated sustainment and camp infrastructure sequencing.",
    Icon: IconPackages,
  },
];

const useCases = [
  {
    tag: "C2 / SOF",
    title: "Command Posts",
    desc: "Planning, comms, and blackout-capable command envelopes.",
  },
  {
    tag: "EXPEDITIONARY",
    title: "Mobile Operations",
    desc: "Displacement-friendly footprints for forward teams.",
  },
  {
    tag: "BASE INFRASTRUCTURE",
    title: "Expeditionary Base Camps",
    desc: "Utilities, circulation, and sustainment sequenced to tempo.",
  },
  {
    tag: "MEDICAL / CASEVAC",
    title: "Medical Shelters",
    desc: "Patient flow and utility chases for field medical roles.",
  },
  {
    tag: "AVIATION MX",
    title: "Aviation Support",
    desc: "High-bay maintenance envelopes and tool-control zones.",
  },
  {
    tag: "SUSTAINMENT",
    title: "Remote Logistics",
    desc: "Staging, power, and spares aligned to resupply reality.",
  },
];

const credStats: SofCredStat[] = [
  {
    id: "y",
    target: 45,
    suffix: "+",
    label: "Years",
    description: "Expeditionary shelter and deployable camp heritage.",
  },
  {
    id: "p",
    target: 52,
    suffix: "+",
    label: "Patents",
    description: "Modular shelter, integration, and environmental control.",
  },
  {
    id: "m",
    target: 39,
    suffix: "",
    label: "Militaries Served",
    description: "Allied defense programs with disciplined disclosure.",
  },
  {
    id: "c",
    target: 96,
    suffix: "+",
    label: "Countries Deployed",
    description: "Field presence across climates and logistics realities.",
  },
];

export default function SofSolutionsPage() {
  return (
    <main className="bg-[#080a0c] pt-16 text-white lg:pt-[4.25rem]">
      {/* SECTION 1 — HERO */}
      <section className="relative flex min-h-dvh flex-col">
        <div className="absolute inset-0">
          <Image
            src="/sof/hero.svg"
            alt=""
            fill
            className="object-cover object-center brightness-[0.7]"
            priority
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(8,10,12,0.3) 0%, rgba(8,10,12,0.75) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 flex flex-1 flex-col justify-center px-6 py-20 lg:pl-20 lg:pr-12">
          <div className="max-w-[680px]">
            <p className="sof-label mb-6">SPECIAL OPERATIONS FORCES</p>
            <h1 className="font-display text-[40px] font-medium leading-[1.05] tracking-[-0.02em] text-white lg:text-[64px]">
              Deployable infrastructure shaped around your mission.
            </h1>
            <p className="mt-6 max-w-[520px] text-lg leading-relaxed text-[#8a9099]">
              Shelter, power, and environmental control composed from your CONOPS — not pulled from a shelf.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Link
                href="/request-access"
                className="inline-flex items-center justify-center border border-white bg-white px-8 py-3 text-sm font-medium text-black no-underline transition-opacity duration-200 hover:opacity-70"
              >
                Request Access
              </Link>
              <Link
                href="/capabilities"
                className="inline-flex items-center gap-2 border border-transparent bg-transparent py-3 text-sm font-medium text-white no-underline transition-opacity duration-200 hover:opacity-70"
              >
                View Capabilities <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>

        <div
          className="relative z-10 hidden min-[480px]:block border-t border-[rgba(255,255,255,0.1)]"
          style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)" }}
        >
          <div className="grid grid-cols-2 gap-px bg-[rgba(255,255,255,0.15)] lg:grid-cols-4">
            {heroStats.map((s) => (
              <div key={s.label} className="bg-black/80 px-4 py-6 text-center lg:px-8">
                <p className="font-display text-[28px] font-medium tracking-[-0.02em] text-white">{s.num}</p>
                <p className="mt-1 text-xs text-[#8a9099]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2 — MISSION PROBLEM */}
      <section className="sof-section border-t border-[rgba(255,255,255,0.08)] bg-[#080a0c]">
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
              <div key={row.t} className="mb-8 border-l-2 border-[#c8a96e] pl-5 last:mb-0 md:mb-10" style={{ paddingLeft: "20px" }}>
                <p className="text-sm font-medium text-white">{row.t}</p>
                <p className="mt-2 text-sm leading-relaxed text-[#8a9099]">{row.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — CAPABILITIES */}
      <section className="sof-section bg-[#080a0c]">
        <p className="sof-label">CAPABILITIES</p>
        <h2 className="font-display mt-6 max-w-4xl text-[32px] font-medium tracking-[-0.02em] text-white lg:text-[40px]">
          Built for the full mission spectrum.
        </h2>
        <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-12">
          {capabilityTiles.map(({ title, desc, Icon }) => (
            <div key={title}>
              <Icon className="text-white" stroke={1.25} size={32} aria-hidden />
              <p className="mt-4 text-sm font-medium text-white">{title}</p>
              <p className="mt-2 text-[13px] leading-relaxed text-[#8a9099]">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4 — USE CASES */}
      <section className="sof-section bg-[#080a0c]">
        <p className="sof-label">MISSION APPLICATIONS</p>
        <h2 className="font-display mt-6 max-w-4xl text-[32px] font-medium tracking-[-0.02em] text-white lg:text-[40px]">
          Configured for your operational environment.
        </h2>
        <div className="mt-16 grid grid-cols-1 gap-0.5 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((c) => (
            <Link
              key={c.title}
              href="/configurable-solutions"
              className="group relative isolate min-h-[360px] overflow-hidden border border-transparent no-underline"
            >
              <Image
                src="/sof/card.svg"
                alt=""
                fill
                className="object-cover brightness-[0.7] transition-[filter] duration-300 group-hover:brightness-[1.15]"
                sizes="(max-width:768px) 100vw, 33vw"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to top, rgba(8,10,12,0.9) 0%, rgba(8,10,12,0.2) 60%)",
                }}
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8">
                <p className="sof-label-tight mb-3 text-[#c8a96e]">{c.tag}</p>
                <p className="mb-2 text-[13px] text-[#8a9099]">{c.desc}</p>
                <p className="font-display text-[22px] font-medium tracking-[-0.02em] text-white transition-all duration-300 group-hover:underline">
                  {c.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 5 — CREDIBILITY */}
      <section className="sof-section bg-[#080a0c]">
        <p className="sof-label">PROVEN IN THE FIELD</p>
        <h2 className="font-display mt-6 max-w-4xl text-[32px] font-medium tracking-[-0.02em] text-white lg:text-[40px]">
          Decades of expeditionary delivery.
        </h2>
        <SofCountUp stats={credStats} />
      </section>

      {/* SECTION 6 — PROCESS */}
      <section className="sof-section bg-[#080a0c]">
        <p className="sof-label">OUR PROCESS</p>
        <h2 className="font-display mt-6 max-w-5xl text-[32px] font-medium tracking-[-0.02em] text-white lg:text-[40px]">
          Mission threads drive layout — not a fixed catalog.
        </h2>
        <div className="mt-16 grid grid-cols-1 gap-0 lg:mt-20 lg:grid-cols-3 lg:gap-10">
          {[
            {
              n: "01",
              t: "Operational Analysis",
              b: "CONOPS become spatial requirements, circulation, and environmental envelopes that survive first-day reality.",
            },
            {
              n: "02",
              t: "Configuration Discipline",
              b: "Options stay inside validated subsystems — transparent trade space, not cookie-cutter bundles.",
            },
            {
              n: "03",
              t: "Field Integration",
              b: "Commissioning, training, and documentation tuned to maintenance echelons and CDRL expectations.",
            },
          ].map((step) => (
            <div key={step.n} className="border-t border-[rgba(255,255,255,0.1)] pt-6 lg:pt-8">
              <p className="text-[11px] font-medium tracking-[0.15em] text-[#c8a96e]">{step.n}</p>
              <p className="mt-4 text-lg font-medium text-white">{step.t}</p>
              <p className="mt-3 text-sm leading-relaxed text-[#8a9099]">{step.b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 7 — CTA */}
      <section className="sof-section border-t border-[rgba(255,255,255,0.08)] bg-[#0d0f12]">
        <div className="mx-auto max-w-[960px] text-center">
          <p className="sof-label">ENGAGE THE TEAM</p>
          <h2 className="font-display mt-6 text-[40px] font-medium tracking-[-0.02em] text-white lg:text-[48px]">
            Engage the SOF Solutions Team.
          </h2>
          <p className="mt-4 text-base text-[#8a9099]">Technical exchanges matched to clearance and program status.</p>

          <div className="mx-auto mt-16 grid max-w-[1100px] grid-cols-1 gap-0.5 lg:grid-cols-3">
            <a
              href="/resources"
              className="group flex flex-col border border-[rgba(255,255,255,0.12)] bg-[#080a0c] px-8 py-12 text-left no-underline transition-[border-color,background-color] duration-200 hover:border-[rgba(255,255,255,0.3)] hover:bg-[rgba(255,255,255,0.03)] lg:p-12"
            >
              <IconFileDownload className="text-white" size={32} stroke={1.25} aria-hidden />
              <p className="mt-6 text-lg font-medium text-white">Download Capabilities Brief</p>
              <p className="mt-2 text-[13px] leading-relaxed text-[#8a9099]">Capability statements and program-safe summaries.</p>
              <span className="mt-auto pt-8 text-right text-white transition-opacity group-hover:opacity-70">→</span>
            </a>
            <Link
              href="/request-access"
              className="group flex flex-col border border-[rgba(255,255,255,0.12)] bg-[#080a0c] px-8 py-12 text-left no-underline transition-[border-color,background-color] duration-200 hover:border-[rgba(255,255,255,0.3)] hover:bg-[rgba(255,255,255,0.03)] lg:p-12"
            >
              <IconCalendar className="text-white" size={32} stroke={1.25} aria-hidden />
              <p className="mt-6 text-lg font-medium text-white">Request a Demo</p>
              <p className="mt-2 text-[13px] leading-relaxed text-[#8a9099]">Schedule a controlled technical walkthrough.</p>
              <span className="mt-auto pt-8 text-right text-white transition-opacity group-hover:opacity-70">→</span>
            </Link>
            <Link
              href="/contact"
              className="group flex flex-col border border-[rgba(255,255,255,0.12)] bg-[#080a0c] px-8 py-12 text-left no-underline transition-[border-color,background-color] duration-200 hover:border-[rgba(255,255,255,0.3)] hover:bg-[rgba(255,255,255,0.03)] lg:p-12"
            >
              <IconMessage className="text-white" size={32} stroke={1.25} aria-hidden />
              <p className="mt-6 text-lg font-medium text-white">Contact Defense Team</p>
              <p className="mt-2 text-[13px] leading-relaxed text-[#8a9099]">Programs, teaming, and routing for inquiries.</p>
              <span className="mt-auto pt-8 text-right text-white transition-opacity group-hover:opacity-70">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
