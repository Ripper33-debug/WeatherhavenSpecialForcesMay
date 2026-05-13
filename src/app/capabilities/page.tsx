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
        title="Capabilities from design authority through field acceptance."
        description="Disciplined engineering processes, transparent configuration control, and field teams who understand defense operating rhythms—from loads and MEP coordination to commissioning and training."
        pullQuote="We deliver what contracting officers and maintainers need: traceable revisions, verified interfaces, and manuals tuned to echelon."
        primaryCta={{ href: "/request-access", label: "Request capability statement" }}
        secondaryCta={{ href: "/contact", label: "Speak with engineering" }}
      />

      <StatsSection
        stats={[
          { value: "Multi-domain", label: "Land, littoral, cold, arid" },
          { value: "FMV-minded", label: "Fair, reasonable pricing posture" },
          { value: "Partnered", label: "Prime / sub / teammate structures" },
          { value: "Secure-ready", label: "Controlled technical exchanges" },
        ]}
      />

      <CapabilitySection
        eyebrow="Engineering & analysis"
        title="Structural, MEP, and site integration under one technical thread."
        items={[
          {
            title: "Loads and code-informed design",
            description:
              "Wind, snow, seismic, and crane pick cases documented with assumptions explicit for government review.",
          },
          {
            title: "Electrical coordination",
            description:
              "Generator sizing, cable derating, fault coordination, and lighting levels matched to mission spaces.",
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
              "Approved vendor lists, first-article inspections, and traceability for critical structural and electrical components.",
          },
          {
            title: "Factory and site acceptance",
            description:
              "Test plans aligned to contract data requirements lists and customer witnessing when required.",
          },
          {
            title: "Change control",
            description:
              "Engineering change proposals with impact analysis on schedule, cost, and interfaces.",
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
              "Experienced leads who speak operator and maintainer language; minimal drama on the ground.",
          },
          {
            title: "Operator and maintainer training",
            description:
              "Course materials tuned to echelon—from crew-level checks to depot-style deep maintenance.",
          },
          {
            title: "Sustainment handoff",
            description:
              "ILS data, recommended spares, and revision-controlled technical manuals delivered as promised.",
          },
        ]}
      />

      <CTA
        title="Tell us where the risk sits—in schedule, performance, or integration."
        description="We will propose a work scope that addresses it directly, with measurable acceptance criteria."
        primary={{ href: "/request-access", label: "Request access" }}
        secondary={{ href: "/products", label: "Browse products" }}
      />
    </>
  );
}
