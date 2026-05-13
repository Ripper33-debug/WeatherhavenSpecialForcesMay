import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { CapabilitySection } from "@/components/CapabilitySection";
import { StatsSection } from "@/components/StatsSection";
import { CTA } from "@/components/CTA";

export const metadata: Metadata = {
  title: "Capabilities",
  description:
    "Engineering, manufacturing integration, field services, and configuration management for deployable defense infrastructure.",
};

export default function CapabilitiesPage() {
  return (
    <>
      <Hero
        eyebrow="End-to-end delivery"
        title="From design authority through field acceptance."
        description="Engineering, configuration control, and field teams aligned to defense operating rhythms—loads, MEP coordination, commissioning, and training."
        pullQuote="Traceable revisions, verified interfaces, and manuals tuned to echelon."
        primaryCta={{ href: "/request-access", label: "Request capability statement" }}
        secondaryCta={{ href: "/contact", label: "Engineering desk" }}
      />

      <StatsSection
        stats={[
          { value: "Multi-domain", label: "Theater coverage", detail: "Land, littoral, cold, and arid envelopes." },
          { value: "FMV-minded", label: "Pricing posture", detail: "Transparent basis for ROM and options." },
          { value: "Partnered", label: "Teaming", detail: "Prime, sub, and international structures." },
          { value: "Secure-ready", label: "Disclosure", detail: "Controlled technical exchanges by default." },
        ]}
      />

      <CapabilitySection
        eyebrow="Engineering & analysis"
        title="Structural, MEP, and site integration in one thread."
        items={[
          {
            title: "Loads and code-informed design",
            description:
              "Wind, snow, seismic, and crane cases documented with explicit assumptions for government review.",
          },
          {
            title: "Electrical coordination",
            description:
              "Generator sizing, derating, fault coordination, and lighting matched to mission spaces.",
          },
          {
            title: "Environmental performance",
            description:
              "ECU selection grounded in envelope models—not nameplate marketing numbers.",
          },
        ]}
      />

      <CapabilitySection
        reversed
        eyebrow="Manufacturing & quality"
        title="Supplier oversight with receipts."
        items={[
          {
            title: "Source control",
            description:
              "Approved vendors, first-article inspections, and traceability for critical structural and electrical items.",
          },
          {
            title: "Factory and site acceptance",
            description:
              "Test plans aligned to CDRLs and customer witnessing when required.",
          },
          {
            title: "Change control",
            description:
              "ECPs with impact on schedule, cost, and interfaces—no silent drift.",
          },
        ]}
      />

      <CapabilitySection
        eyebrow="Field services"
        title="Commissioning and training that transfer ownership cleanly."
        items={[
          {
            title: "Installation supervision",
            description:
              "Leads who speak operator and maintainer language—minimal drama on the ground.",
          },
          {
            title: "Operator and maintainer training",
            description:
              "Materials tuned from crew checks to depot-level maintenance.",
          },
          {
            title: "Sustainment handoff",
            description:
              "ILS data, spares recommendations, and revision-controlled manuals as promised.",
          },
        ]}
      />

      <CTA
        title="Where is the risk—schedule, performance, or integration?"
        description="We scope work with measurable acceptance criteria."
        primary={{ href: "/request-access", label: "Request access" }}
        secondary={{ href: "/products", label: "Browse products" }}
      />
    </>
  );
}
