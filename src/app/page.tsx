import { HomeHero } from "@/components/HomeHero";
import { ProductCard } from "@/components/ProductCard";
import { CapabilitySection } from "@/components/CapabilitySection";
import { StatsSection } from "@/components/StatsSection";
import { CTA } from "@/components/CTA";

export default function HomePage() {
  return (
    <>
      <HomeHero
        eyebrow="Mission-engineered infrastructure"
        title="Deployable infrastructure shaped around your mission."
        description="Weatherhaven starts with your mission profile, environment, personnel, mobility, power, timeline, and sustainment—then composes deployable shelter, ECU, power, flooring, and layout engineering as configurable building blocks, not cookie-cutter products."
        pullQuote="Built around the mission, not pulled from a shelf."
        primaryCta={{ href: "/request-access", label: "Request access" }}
        secondaryCta={{ href: "/capabilities", label: "Capabilities" }}
      />

      <section className="border-b border-white/[0.06] bg-zinc-950/40">
        <div className="mx-auto max-w-7xl px-4 py-9 sm:px-6 lg:px-10">
          <p className="text-center font-display text-[17px] font-medium leading-snug tracking-tight text-zinc-300 sm:text-lg">
            Weatherhaven starts with mission profile, environment, personnel, mobility, power, timeline, and sustainment—then
            composes shelter, ECU, power, flooring, and layout as configurable building blocks for command, maintenance,
            medical, and berthing—without cookie-cutter assumptions.
          </p>
        </div>
      </section>

      <StatsSection
        eyebrow="Credibility"
        title="Decades of expeditionary delivery."
        stats={[
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
        ]}
      />

      <section className="border-b border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-18">
          <p className="text-[13px] font-medium text-amber-500/90">Mission solution areas</p>
          <h2 className="font-display mt-2 max-w-3xl text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl lg:text-4xl">
            Representative packages—not fixed SKUs.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-[15px]">
            Starting points we reshape with your program: final shelter, MEP, logistics, and sustainment follow your
            inputs—not a fixed catalog stack.
          </p>
          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <ProductCard
              icon="shelter"
              title="Deployable shelter architecture"
              description="Soft-wall and rigid envelopes for command, maintenance, berthing, and sensitive workflows—utilities and circulation from mission parameters."
              tags={["SOF", "Expeditionary"]}
              href="/configurable-solutions"
              linkLabel="Explore configurable solutions"
            />
            <ProductCard
              icon="camp"
              title="Integrated camp infrastructure"
              description="Power, environmental control, flooring, and interconnects staged for air, sea, or ground movement—sequenced to timeline and sustainment."
              tags={["Logistics", "Integration"]}
              href="/configurable-solutions"
              linkLabel="Explore configurable solutions"
            />
            <ProductCard
              icon="ai"
              title="Advisory configuration workflow"
              description="Structured inputs become workshop-ready packages so teams compare bounded options while engineering keeps sign-off."
              tags={["Advisory", "Workshop"]}
              href="/mission-solution-builder"
              linkLabel="Open Mission Solution Builder"
            />
          </div>
        </div>
      </section>

      <CapabilitySection
        eyebrow="How we work"
        title="Mission threads drive layout—not a fixed catalog."
        subtitle="We embed with program offices and operators early to lock footprint, signature, throughput, and sustainment before metal moves."
        items={[
          {
            title: "Operational analysis",
            description:
              "CONOPS become spatial requirements, circulation, and environmental envelopes that survive first-day reality.",
          },
          {
            title: "Configuration discipline",
            description:
              "Options stay inside validated subsystems—transparent trade space, not cookie-cutter bundles.",
          },
          {
            title: "Field integration",
            description: "Commissioning, training, and documentation tuned to maintenance echelons and CDRL expectations.",
          },
        ]}
      />

      <CTA
        title="Engage our SOF solutions team."
        description="Share your deployment profile for a controlled technical exchange matched to clearance and program status."
        primary={{ href: "/request-access", label: "Request access" }}
        secondary={{ href: "/contact", label: "Contact programs" }}
      />
    </>
  );
}
