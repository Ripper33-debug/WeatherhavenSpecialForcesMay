import type { Metadata } from "next";
import type { ProductIconKey } from "@/components/ProductCardIcons";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { CTA } from "@/components/CTA";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Representative mission packages and configurable deployable infrastructure from Weatherhaven—tailored to environment, force size, timeline, power, and sustainment.",
};

const exampleConfigurations: {
  title: string;
  description: string;
  tags: readonly string[];
  icon: ProductIconKey;
}[] = [
  {
    title: "TRECC-class rigid envelope (example)",
    description:
      "Representative rigid-frame configuration for maintenance, aviation support, and logistics throughput—wind, snow, and recovery cases documented for engineering review, then resized to mission.",
    tags: ["Rigid frame", "High throughput"],
    icon: "shelter",
  },
  {
    title: "Soft-wall tactical footprint (example)",
    description:
      "Illustrative light footprint for command, medical triage, or transient berthing—scaled to team size, lift, and displacement timeline rather than a fixed catalog line.",
    tags: ["Air mobile", "Low weight"],
    icon: "shelter",
  },
  {
    title: "Environmental control stack (example)",
    description:
      "ECU staging matched to envelope loads and power baseline—tactical, hybrid, or shore-tied—rebalanced when climate or sustainment assumptions change.",
    tags: ["ECU", "Power-aware"],
    icon: "ecu",
  },
  {
    title: "Power distribution & lighting (example)",
    description:
      "PDU, cabling, and lighting concepts aligned to expeditionary electrical discipline—final architecture follows generator or microgrid choices and load growth.",
    tags: ["Electrical"],
    icon: "power",
  },
  {
    title: "Flooring & subfloor integration (example)",
    description:
      "Elevated floor approaches for uneven ground, drainage, and cable management—specified after site class and circulation requirements are locked.",
    tags: ["Site prep"],
    icon: "floor",
  },
  {
    title: "Camp layout & integration engineering (example)",
    description:
      "Master planning patterns for circulation, separation, and life-support services—applied as a starting map, then hardened to your CONOPS and rules of engagement.",
    tags: ["Engineering"],
    icon: "layout",
  },
];

export default function SolutionsPage() {
  return (
    <>
      <Hero
        eyebrow="Mission packages & configurable systems"
        title="Solutions engineered around requirements—not picked from a shelf."
        description="Special operations teams need deployable infrastructure that flexes with environment, team size, timeline, power posture, sustainment, and operational goals. Weatherhaven starts from validated building blocks and configures shelter, MEP, and camp integration into mission-specific packages."
        pullQuote="Built around the mission, not pulled from a shelf."
        primaryCta={{ href: "/request-access", label: "Shape a mission package" }}
        secondaryCta={{ href: "/capabilities", label: "Engineering depth" }}
      />

      <section className="border-b border-zinc-800/80">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <p className="max-w-3xl font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-500/95">
            Representative configurations
          </p>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-zinc-400 sm:text-base">
            The cards below are example configurations and workshop starting points—not fixed
            off-the-shelf products. Naming, cell counts, MEP, and sustainment threads are adjusted
            for each program after mission analysis and controlled disclosure as appropriate.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {exampleConfigurations.map((p) => (
              <ProductCard
                key={p.title}
                icon={p.icon}
                title={p.title}
                description={p.description}
                tags={[...p.tags]}
                linkLabel="Review outline"
              />
            ))}
          </div>
        </div>
      </section>

      <CTA
        title="Need a configuration package for a solicitation or J&A?"
        description="We assemble bounded option sets, ROM framing, and technical narratives from mission inputs—not from a generic catalog cut sheet."
        primary={{ href: "/contact", label: "Contact programs" }}
        secondary={{ href: "/ai-configurator", label: "Solution builder" }}
      />
    </>
  );
}
