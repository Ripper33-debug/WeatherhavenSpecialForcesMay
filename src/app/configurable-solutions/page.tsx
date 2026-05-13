import type { Metadata } from "next";
import type { ProductIconKey } from "@/components/ProductCardIcons";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { CTA } from "@/components/CTA";

export const metadata: Metadata = {
  title: "Configurable Solutions",
  description:
    "Representative mission starting points and configurable system families—Weatherhaven composes shelter, ECU, power, flooring, and layout engineering from mission profile, environment, personnel, mobility, timeline, and sustainment.",
};

const exampleBlocks: {
  title: string;
  description: string;
  tags: readonly string[];
  icon: ProductIconKey;
}[] = [
  {
    title: "Rigid envelope building block (TRECC-class example)",
    description:
      "Configurable rigid-frame block for maintenance, aviation support, or logistics throughput—wind, snow, and recovery cases are revalidated per mission before configuration freezes.",
    tags: ["Rigid frame", "High throughput"],
    icon: "shelter",
  },
  {
    title: "Soft-wall tactical footprint block",
    description:
      "Light envelope building block for command, medical triage, or transient berthing—scaled to team size, lift, timeline, and displacement requirements rather than a fixed line item.",
    tags: ["Air mobile", "Low weight"],
    icon: "shelter",
  },
  {
    title: "Environmental control stack (ECU block)",
    description:
      "ECU staging matched to envelope and power baseline—rebalanced when climate, sustainment, or generator posture changes during mission design.",
    tags: ["ECU", "Power-aware"],
    icon: "ecu",
  },
  {
    title: "Power distribution & lighting block",
    description:
      "PDU, cabling, and lighting concepts for expeditionary discipline—final architecture follows mission power narrative and growth headroom.",
    tags: ["Electrical"],
    icon: "power",
  },
  {
    title: "Flooring & subfloor integration block",
    description:
      "Elevated floor approaches for uneven ground and cable management—specified after site class, circulation, and logistics constraints are captured.",
    tags: ["Site prep"],
    icon: "floor",
  },
  {
    title: "Camp layout & integration engineering block",
    description:
      "Master planning patterns for circulation, separation, and life-support services—applied as a configurable map, then hardened to your CONOPS.",
    tags: ["Layout engineering"],
    icon: "layout",
  },
];

export default function ConfigurableSolutionsPage() {
  return (
    <>
      <Hero
        eyebrow="Configurable system families"
        title="Solution families shaped from the mission in—not pulled from a shelf."
        description="We begin with mission profile, environment, personnel, mobility, power, timeline, and sustainment. The examples below are configuration building blocks and workshop starting points, not fixed catalog products. Naming, cell counts, MEP, and spares scale to your program after analysis and controlled disclosure as required."
        pullQuote="Built around the mission, not pulled from a shelf."
        primaryCta={{ href: "/request-access", label: "Build a mission package" }}
        secondaryCta={{ href: "/capabilities", label: "Engineering depth" }}
      />

      <section className="border-b border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-18">
          <p className="max-w-3xl text-[13px] font-medium text-amber-500/90">Representative mission starting points</p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-400 sm:text-[15px]">
            Each card describes a configuration building block. Final solutions combine, resize, and integrate these elements
            based on theater, mobility, threat, and sustainment—never as a one-size-fits-all catalog row.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {exampleBlocks.map((p) => (
              <ProductCard
                key={p.title}
                icon={p.icon}
                title={p.title}
                description={p.description}
                tags={[...p.tags]}
                href="/request-access"
                linkLabel="Request technical exchange"
              />
            ))}
          </div>
        </div>
      </section>

      <CTA
        title="Need a configuration package for a solicitation or J&A?"
        description="We assemble bounded option sets and technical narratives from mission inputs—not from a generic cut sheet."
        primary={{ href: "/contact", label: "Contact programs" }}
        secondary={{ href: "/mission-solution-builder", label: "Mission Solution Builder" }}
      />
    </>
  );
}
