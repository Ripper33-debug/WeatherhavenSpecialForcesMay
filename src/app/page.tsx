import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { CapabilitySection } from "@/components/CapabilitySection";
import { StatsSection } from "@/components/StatsSection";
import { CTA } from "@/components/CTA";

export default function HomePage() {
  return (
    <>
      <Hero
        eyebrow="Deployable infrastructure"
        title="Shelter systems that keep pace with the mission."
        description="Weatherhaven Resource Inc. engineers expeditionary shelters, mobile camps, and integrated environmental and power packages for U.S. Special Operations and allied defense programs. Field-proven hardware, disciplined program execution, and configuration tooling that respects classification boundaries."
        pullQuote="Infrastructure is tempo: emplace faster, recover cleaner, and reconfigure without losing configuration control."
        primaryCta={{ href: "/request-access", label: "Request program access" }}
        secondaryCta={{ href: "/capabilities", label: "View capabilities" }}
      />

      <section className="border-b border-zinc-800/90 bg-zinc-900/20">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <p className="text-center font-display text-xl font-medium leading-snug tracking-tight text-zinc-200 sm:text-2xl">
            We protect readiness through shelter—command nodes, maintenance envelopes, medical and
            berthing spaces—built for austere theaters and honest load cases.
          </p>
        </div>
      </section>

      <StatsSection
        eyebrow="Field credibility"
        title="Built for throughput, recovery, and repeatability."
        stats={[
          {
            value: "40+",
            label: "Years expeditionary heritage",
            detail: "Shelter systems and camp infrastructure delivered worldwide.",
          },
          {
            value: "ISO-aligned",
            label: "Quality & configuration control",
            detail: "Documented processes for traceability and change management.",
          },
          {
            value: "24–72 hr",
            label: "Typical emplacement window",
            detail: "Depends on footprint, lift, and environmental load cases.",
          },
          {
            value: "Program-led",
            label: "Sustainment & spares",
            detail: "Lifecycle planning aligned to unit maintenance concepts.",
          },
        ]}
      />

      <section className="border-b border-zinc-800/90">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-500/95">
            Core offerings
          </p>
          <h2 className="font-display mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
            Mobile camp infrastructure for measured performance in harsh environments.
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
            From single-cell shelters to multi-domain layouts, we align footprints to climate,
            threat, and logistics constraints—without theatrics.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <ProductCard
              title="Deployable shelter systems"
              description="Soft-wall and rigid-frame options sized for command, maintenance, berthing, and sensitive activities with utility distribution designed in."
              tags={["SOF", "Expeditionary"]}
              href="/products"
            />
            <ProductCard
              title="Mobile infrastructure packages"
              description="Power, environmental control, flooring, and interconnects staged for air/sea/ground movement and rapid integration on arrival."
              tags={["Logistics", "Integration"]}
              href="/products"
            />
            <ProductCard
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
        title="Mission threads drive layout—not the other way around."
        subtitle="We embed with program offices and operators early to lock assumptions on footprint, signature, and throughput before metal moves."
        items={[
          {
            title: "Operational analysis",
            description:
              "We translate CONOPS into spatial requirements, circulation, and environmental envelopes that survive first-day reality.",
          },
          {
            title: "Configuration discipline",
            description:
              "Options are bounded by validated subsystems. Customers see transparent trade space, not endless catalogs.",
          },
          {
            title: "Field integration",
            description:
              "Commissioning support, training packages, and documentation tuned to maintenance echelons and contract data requirements lists.",
          },
        ]}
      />

      <CTA
        title="Engage our SOF solutions team."
        description="Share your deployment profile and we will coordinate a controlled technical exchange appropriate to your clearance and program status."
        primary={{ href: "/request-access", label: "Request access" }}
        secondary={{ href: "/contact", label: "Contact programs" }}
      />
    </>
  );
}
