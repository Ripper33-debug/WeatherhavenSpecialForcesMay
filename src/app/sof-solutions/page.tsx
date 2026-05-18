import Link from "next/link";
import { HeroTopoCanvas } from "@/components/HeroTopoCanvas";
import { SofCountUp, type SofCredStat } from "./_components/SofCountUp";
import { SofPlatformStatus } from "./_components/SofPlatformStatus";
import { SofUseCaseCards } from "./_components/SofUseCaseCards";
import { SofScrollSection } from "./_components/SofScrollSection";
import { SofCtaBoxes } from "./_components/SofCtaBoxes";
import { SofCapabilitiesGrid } from "./_components/SofCapabilitiesGrid";
import { SofProblemSection } from "./_components/SofProblemSection";
import { SofProcessSection } from "./_components/SofProcessSection";

const heroStats = [
  { num: "45+", label: "Years" },
  { num: "52+", label: "Patents" },
  { num: "39", label: "Militaries Served" },
  { num: "96+", label: "Countries Deployed" },
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
      <section className="relative flex min-h-dvh flex-col">
        <HeroTopoCanvas />
        <div className="relative z-10 flex flex-1 flex-col justify-center px-6 py-20 lg:pl-20 lg:pr-12">
          <SofPlatformStatus />
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
                className="inline-flex items-center justify-center border border-white bg-white px-8 py-3 text-sm font-medium text-black no-underline transition hover:bg-[rgba(255,255,255,0.85)]"
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
          className="relative z-20 hidden min-[480px]:flex min-[480px]:border-t min-[480px]:border-[rgba(255,255,255,0.1)]"
          style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)" }}
        >
          {heroStats.map((s, i) => (
            <div
              key={`${s.num}-${s.label}`}
              className={`flex min-w-0 flex-1 flex-col items-center justify-center px-3 py-6 text-center sm:px-5 lg:px-8 ${
                i > 0 ? "border-l border-[rgba(255,255,255,0.15)]" : ""
              }`}
            >
              <p className="font-display text-[clamp(1.125rem,2.5vw,1.75rem)] font-medium leading-tight tracking-[-0.02em] text-white">
                {s.num}
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-[#8a9099] sm:text-xs sm:normal-case sm:tracking-normal">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <SofProblemSection />
      <SofCapabilitiesGrid />

      <SofScrollSection>
        <p className="sof-label">MISSION APPLICATIONS</p>
        <h2 className="font-display mt-6 max-w-4xl text-[32px] font-medium tracking-[-0.02em] text-white lg:text-[40px]">
          Configured for your operational environment.
        </h2>
        <SofUseCaseCards />
      </SofScrollSection>

      <SofScrollSection>
        <p className="sof-label">PROVEN IN THE FIELD</p>
        <h2 className="font-display mt-6 max-w-4xl text-[32px] font-medium tracking-[-0.02em] text-white lg:text-[40px]">
          Decades of expeditionary delivery.
        </h2>
        <SofCountUp stats={credStats} />
      </SofScrollSection>

      <SofProcessSection />

      <SofScrollSection className="border-t border-[rgba(255,255,255,0.08)] !bg-[#0d0f12]">
        <div className="mx-auto max-w-[960px] text-center">
          <p className="sof-label">ENGAGE THE TEAM</p>
          <h2 className="font-display mt-6 text-[40px] font-medium tracking-[-0.02em] text-white lg:text-[48px]">
            Engage the SOF Solutions Team.
          </h2>
          <p className="mt-4 text-base text-[#8a9099]">Technical exchanges matched to clearance and program status.</p>
          <SofCtaBoxes />
        </div>
      </SofScrollSection>
    </main>
  );
}
