import { HomeHero } from "@/components/HomeHero";
import { InternshipDeliverablesSection } from "@/components/InternshipDeliverablesSection";
import { ProductCard } from "@/components/ProductCard";
import { CapabilitySection } from "@/components/CapabilitySection";
import { StatsSection } from "@/components/StatsSection";
import { CTA } from "@/components/CTA";

export default function HomePage() {
  return (
    <>
      <HomeHero
        eyebrow="Mission-engineered infrastructure"
        title="Tailored deployable infrastructure for special operations."
        description="Weatherhaven starts with your mission narrative—environment, team size, timeline, logistics, power, sustainment, and operational goals—then configures deployable shelter and support systems for complex theaters. Every footprint is engineered with discipline, not selected from a static catalog."
        pullQuote="Built around the mission, not pulled from a shelf."
        primaryCta={{ href: "/request-access", label: "Request program access" }}
        secondaryCta={{ href: "/capabilities", label: "Capabilities" }}
      />

      <section className="border-b border-zinc-800/90 bg-zinc-900/20">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <p className="text-center font-display text-lg font-medium leading-snug tracking-tight text-zinc-200 sm:text-xl">
            Mission-specific infrastructure packages designed around personnel, climate, timeline,
            mobility, and sustainment needs—from command and maintenance envelopes to medical and
            berthing—without cookie-cutter assumptions.
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
            detail: "Expeditionary shelter and deployable camp systems heritage.",
          },
          {
            value: "52+",
            label: "Patents",
            detail: "Modular shelter, integration, and environmental control innovation.",
          },
          {
            value: "39",
            label: "Militaries served",
            detail: "Allied defense programs with disciplined disclosure and sustainment.",
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
            Mission solution areas
          </p>
          <h2 className="font-display mt-4 max-w-3xl text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl lg:text-4xl">
            Representative mission packages—not fixed off-the-shelf products.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
            The blocks below are configurable starting points we reshape with your program office: final
            shelter, MEP, logistics, and sustainment threads follow your mission inputs—not a product
            grid.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ProductCard
              icon="shelter"
              title="Deployable shelter architecture"
              description="Soft-wall and rigid-frame envelopes sized for command, maintenance, berthing, and sensitive workflows—utility distribution and circulation defined from mission parameters."
              tags={["SOF", "Expeditionary"]}
              href="/products"
              linkLabel="Explore solution lines"
            />
            <ProductCard
              icon="camp"
              title="Integrated camp infrastructure"
              description="Power, environmental control, flooring, and interconnects sequenced for air, sea, or ground movement and rapid integration—staged around timeline and sustainment needs."
              tags={["Logistics", "Integration"]}
              href="/products"
              linkLabel="Explore solution lines"
            />
            <ProductCard
              icon="ai"
              title="Advisory configuration workflow"
              description="Structured parameters translate into workshop-ready packages so teams compare bounded options while engineering retains sign-off authority."
              tags={["Advisory", "Workshop"]}
              href="/ai-configurator"
              linkLabel="Open Mission Solution Builder"
            />
          </div>
        </div>
      </section>

      <CapabilitySection
        eyebrow="How we work"
        title="Mission threads drive layout—not a product grid."
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
              "Options stay inside validated subsystems—transparent trade space, not cookie-cutter bundles or endless SKUs.",
          },
          {
            title: "Field integration",
            description:
              "Commissioning, training, and documentation tuned to maintenance echelons and CDRL expectations.",
          },
        ]}
      />

      <InternshipDeliverablesSection />

      <CTA
        title="Engage our SOF solutions team."
        description="Share your deployment profile for a controlled technical exchange matched to clearance and program status."
        primary={{ href: "/request-access", label: "Request access" }}
        secondary={{ href: "/contact", label: "Contact programs" }}
      />
    </>
  );
}
