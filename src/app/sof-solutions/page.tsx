import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { CapabilitySection } from "@/components/CapabilitySection";
import { ProductCard } from "@/components/ProductCard";
import { CTA } from "@/components/CTA";

export const metadata: Metadata = {
  title: "SOF Solutions",
  description:
    "Special operations support: expeditionary shelters, mobile infrastructure, and program integration for USSOCOM-aligned requirements.",
};

export default function SofSolutionsPage() {
  return (
    <>
      <Hero
        eyebrow="U.S. & allied special operations"
        title="Shelter and camp solutions aligned to SOF tempo."
        description="Weatherhaven supports SOF with infrastructure that deploys fast, scales with the task force, and sustains under pressure—clear layouts, disciplined power and environmental design, and documentation crews can execute without ambiguity."
        pullQuote="Low signature, rapid displacement, and coalition interoperability start with how utilities and circulation are engineered—not slogans."
        primaryCta={{ href: "/request-access", label: "Request technical exchange" }}
        secondaryCta={{ href: "/products", label: "Product families" }}
      />

      <CapabilitySection
        eyebrow="Operational fit"
        title="Designed around how SOF actually occupies ground."
        subtitle="Berthing, maintenance, sensitive activities, and command nodes each carry different circulation, acoustic, and utility signatures. We plan for all of them together—not as one-off exceptions."
        items={[
          {
            title: "Low-signature camp planning",
            description:
              "Thermal, light, and noise discipline informed by site constraints and commander’s risk guidance—not generic checklists.",
          },
          {
            title: "Rapid displacement and reconstitution",
            description:
              "Layouts and anchoring concepts that support tear-down timelines aligned to mobility platforms and recovery priorities.",
          },
          {
            title: "Training and partner capacity",
            description:
              "Packages that scale to coalition exercises with transparent configuration control and spares planning.",
          },
        ]}
      />

      <CapabilitySection
        reversed
        eyebrow="Program integration"
        title="Documentation and data that survive audits and turnover."
        subtitle="We deliver what contracting officers and field maintainers need: traceable revisions, verified interfaces, and training aligned to echelon."
        items={[
          {
            title: "CDRL-aware delivery",
            description:
              "Technical data packages structured to common defense contracting formats and review cycles.",
          },
          {
            title: "Sustainment planning",
            description:
              "Spares recommendations keyed to utilization assumptions and environmental wear factors.",
          },
          {
            title: "Controlled disclosures",
            description:
              "Technical exchanges staged to match clearance, export, and program classification boundaries.",
          },
        ]}
      />

      <section className="border-b border-zinc-800/90">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-500/95">
            Mission packages
          </p>
          <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
            Representative shelter bundles
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-zinc-400 sm:text-base">
            Configurations vary by unit, theater, and lift. The cards below describe common
            bundles used in SOF-aligned studies and deployments.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <ProductCard
              title="Forward mission support node"
              description="Command, planning, and communications spaces with redundant power paths and hardened utility distribution."
              tags={["C2", "Power"]}
            />
            <ProductCard
              title="Aviation maintenance envelope"
              description="High-bay rigid options with crane hardpoints, tool control zones, and environmental separation for volatile workloads."
              tags={["SOF Aviation"]}
            />
            <ProductCard
              title="Sensitive activity suite"
              description="Compartmented workflow support with acoustic treatments, controlled access circulation, and SCIF-ready backbone provisions where programs require."
              tags={["SAP / SCIF-ready"]}
            />
          </div>
        </div>
      </section>

      <CTA
        title="Start with a mission narrative—not a catalog number."
        description="Our engineers work from your CONOPS and environmental envelope to propose bounded options with explicit tradeoffs."
        primary={{ href: "/request-access", label: "Request access" }}
        secondary={{ href: "/ai-configurator", label: "Try configuration demo" }}
      />
    </>
  );
}
