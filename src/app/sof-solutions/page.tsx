import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { CapabilitySection } from "@/components/CapabilitySection";
import { ProductCard } from "@/components/ProductCard";
import { CTA } from "@/components/CTA";

export const metadata: Metadata = {
  title: "SOF Solutions",
  description:
    "Special operations support: mission-specific deployable shelters, camp infrastructure, and program integration for U.S. Special Forces and USSOCOM-aligned requirements.",
};

export default function SofSolutionsPage() {
  return (
    <>
      <Hero
        eyebrow="U.S. & allied special operations"
        title="Shelter and camp solutions aligned to SOF tempo."
        description="Infrastructure that deploys fast, scales with the task force, and sustains under pressure—composed from mission profile, environment, personnel, mobility, power, timeline, and sustainment before shelter, ECU, and camp integration details freeze."
        pullQuote="Signature and interoperability start with utilities and circulation—not slogans."
        primaryCta={{ href: "/request-access", label: "Request technical exchange" }}
        secondaryCta={{ href: "/configurable-solutions", label: "Configurable solutions" }}
      />

      <CapabilitySection
        eyebrow="Operational fit"
        title="Designed around how SOF occupies ground."
        subtitle="Berthing, maintenance, sensitive activities, and command nodes carry different circulation and utility signatures—we plan them together."
        items={[
          {
            title: "Low-signature camp planning",
            description:
              "Thermal, light, and noise discipline informed by site constraints and commander risk guidance.",
          },
          {
            title: "Rapid displacement and reconstitution",
            description:
              "Layouts and anchoring concepts aligned to mobility platforms and recovery priorities.",
          },
          {
            title: "Training and partner capacity",
            description:
              "Coalition exercise packages with transparent configuration control and spares planning.",
          },
        ]}
      />

      <CapabilitySection
        reversed
        eyebrow="Program integration"
        title="Documentation that survives audits and turnover."
        subtitle="Traceable revisions, verified interfaces, and training aligned to echelon."
        items={[
          {
            title: "CDRL-aware delivery",
            description:
              "Technical data packages structured to common defense contracting review cycles.",
          },
          {
            title: "Sustainment planning",
            description:
              "Spares recommendations keyed to utilization and environmental wear factors.",
          },
          {
            title: "Controlled disclosures",
            description:
              "SOF-specific materials and detailed technical data are shared through Request Access after vetting.",
          },
        ]}
      />

      <section className="border-b border-zinc-800/90">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <p className="text-[13px] font-medium text-amber-500/90">Mission packages</p>
          <h2 className="font-display mt-3 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl lg:text-4xl">
            Representative mission starting points
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-zinc-400 sm:text-base">
            Illustrative configuration building blocks—every fielded solution is derived from mission profile,
            environment, personnel, mobility, power, timeline, and sustainment inputs. Request access for
            program-specific detail.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ProductCard
              icon="c2"
              title="Forward mission support node"
              description="Command, planning, and communications spaces with redundant power paths and disciplined utility distribution."
              tags={["C2", "Power"]}
              href="/configurable-solutions"
              linkLabel="Explore configurable solutions"
            />
            <ProductCard
              icon="aviation"
              title="Aviation maintenance envelope"
              description="High-bay rigid options with crane hardpoints, tool control zones, and environmental separation for volatile workloads."
              tags={["SOF Aviation"]}
              href="/configurable-solutions"
              linkLabel="Explore configurable solutions"
            />
            <ProductCard
              icon="secure"
              title="Sensitive mission suite"
              description="Controlled-access workflows and acoustic treatments. Detailed compartmentation and program-specific options via Request Access."
              tags={["Controlled access"]}
              href="/request-access"
              linkLabel="Request access"
            />
          </div>
        </div>
      </section>

      <CTA
        title="Start with a mission narrative—not a part number."
        description="Engineers translate CONOPS, environment, and sustainment constraints into bounded solution options with explicit tradeoffs."
        primary={{ href: "/request-access", label: "Request access" }}
        secondary={{ href: "/mission-solution-builder", label: "Mission Solution Builder" }}
      />
    </>
  );
}
