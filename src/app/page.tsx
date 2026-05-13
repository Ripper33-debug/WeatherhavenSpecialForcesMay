import { HomeHero } from "@/components/HomeHero";
import { ProductCard } from "@/components/ProductCard";
import { CapabilitySection } from "@/components/CapabilitySection";
import { StatsSection } from "@/components/StatsSection";
import { CTA } from "@/components/CTA";

export default function HomePage() {
  return (
    <>
      <HomeHero
        eyebrow="Deployable infrastructure"
        title="Shelter systems built for mission tempo."
        description="Expeditionary shelters, mobile camps, and integrated environmental and power packages for U.S. SOF and allied defense programs—field-proven hardware with disciplined program execution."
        pullQuote="Emplace faster, recover cleaner, and reconfigure without losing configuration control."
        primaryCta={{ href: "/request-access", label: "Request program access" }}
        secondaryCta={{ href: "/capabilities", label: "Capabilities" }}
      />

      <section className="border-b border-zinc-800/90 bg-zinc-900/20">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <p className="text-center font-display text-lg font-medium leading-snug tracking-tight text-zinc-200 sm:text-xl">
            Command, maintenance, medical, and berthing—engineered for austere theaters and honest
            load cases.
          </p>
        </div>
      </section>

      <StatsSection
        eyebrow="Global credibility"
        title="Four decades of expeditionary delivery."
        stats={[
          {
            value: "45+",
            label: "Years",
            detail: "Heritage in deployable shelter and camp infrastructure.",
          },
          {
            value: "52+",
            label: "Patents",
            detail: "Innovation portfolio supporting modular systems and integration.",
          },
          {
            value: "39+",
            label: "Militaries served",
            detail: "Allied programs with disciplined disclosure and sustainment.",
          },
          {
            value: "96+",
            label: "Countries deployed",
            detail: "Field presence across climates and logistics realities.",
          },
        ]}
      />

      <section className="border-b border-zinc-800/90">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-500/95">
            Core offerings
          </p>
          <h2 className="font-display mt-4 max-w-3xl text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl lg:text-4xl">
            Mobile camp infrastructure for measured performance in harsh environments.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
            Single-cell through multi-domain layouts—aligned to climate, threat, and logistics without
            theatrics.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ProductCard
              icon="shelter"
              title="Deployable shelter systems"
              description="Soft-wall and rigid-frame options for command, maintenance, berthing, and sensitive activities—with utility distribution designed in."
              tags={["SOF", "Expeditionary"]}
              href="/products"
            />
            <ProductCard
              icon="camp"
              title="Mobile infrastructure packages"
              description="Power, environmental control, flooring, and interconnects staged for air, sea, or ground movement and rapid integration on arrival."
              tags={["Logistics", "Integration"]}
              href="/products"
            />
            <ProductCard
              icon="ai"
              title="AI-assisted configuration"
              description="Advisor workflows that translate mission parameters into structured bills of material—accelerating workshops while preserving engineering authority."
              tags={["Advisory", "Demo"]}
              href="/ai-configurator"
            />
          </div>
        </div>
      </section>

      <CapabilitySection
        eyebrow="How we work"
        title="Mission threads drive layout—not the catalog."
        subtitle="We embed with program offices and operators early to lock footprint, signature, and throughput before metal moves."
        items={[
          {
            title: "Operational analysis",
            description:
              "CONOPS become spatial requirements, circulation, and environmental envelopes that survive first-day reality.",
          },
          {
            title: "Configuration discipline",
            description:
              "Options stay inside validated subsystems—transparent trade space, not endless SKUs.",
          },
          {
            title: "Field integration",
            description:
              "Commissioning, training, and documentation tuned to maintenance echelons and CDRL expectations.",
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
