import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { CapabilitySection } from "@/components/CapabilitySection";
import { StatsSection } from "@/components/StatsSection";
import { CTA } from "@/components/CTA";

export default function HomePage() {
  return (
    <>
      <Hero
        eyebrow="Defense & expeditionary infrastructure"
        title="Infrastructure that keeps pace with the mission."
        description="Weatherhaven Resource Inc. engineers deployable shelter systems, mobile camps, and integrated support for U.S. Special Operations and allied defense programs. We combine field-proven hardware with disciplined program execution and configuration tools that respect classification boundaries."
        primaryCta={{ href: "/request-access", label: "Request program access" }}
        secondaryCta={{ href: "/capabilities", label: "View capabilities" }}
      />

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

      <section className="border-b border-zinc-800/80">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600/90">
            Core offerings
          </p>
          <h2 className="mt-3 max-w-2xl text-2xl font-semibold tracking-tight text-zinc-100 sm:text-3xl">
            Mobile infrastructure engineered for austere environments.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
            From single-cell shelters to multi-domain camp layouts, we align layouts to
            threat, climate, and logistics constraints—without theatrics.
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
