import type { Metadata } from "next";
import type { ProductIconKey } from "@/components/ProductCardIcons";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { CTA } from "@/components/CTA";

export const metadata: Metadata = {
  title: "Configurable Systems",
  description:
    "Representative mission packages and configurable deployable infrastructure—Weatherhaven shapes shelter, power, environment, and sustainment from mission requirements.",
};

const exampleConfigurations: {
  title: string;
  description: string;
  tags: readonly string[];
  icon: ProductIconKey;
}[] = [
  {
    title: "TRECC-class rigid envelope (example block)",
    description:
      "Representative rigid-frame building block for maintenance, aviation support, or logistics throughput—wind, snow, and recovery cases are revalidated per mission before configuration freezes.",
    tags: ["Rigid frame", "High throughput"],
    icon: "shelter",
  },
  {
    title: "Soft-wall tactical footprint (example block)",
    description:
      "Illustrative light envelope for command, medical triage, or transient berthing—scaled to team size, lift, timeline, and displacement requirements rather than a fixed line item.",
    tags: ["Air mobile", "Low weight"],
    icon: "shelter",
  },
  {
    title: "Environmental control stack (example block)",
    description:
      "ECU staging matched to envelope and power baseline—rebalanced when climate, sustainment, or generator posture changes during mission design.",
    tags: ["ECU", "Power-aware"],
    icon: "ecu",
  },
  {
    title: "Power distribution & lighting (example block)",
    description:
      "PDU, cabling, and lighting concepts for expeditionary discipline—final architecture follows mission power narrative and growth headroom.",
    tags: ["Electrical"],
    icon: "power",
  },
  {
    title: "Flooring & subfloor integration (example block)",
    description:
      "Elevated floor approaches for uneven ground and cable management—specified after site class, circulation, and logistics constraints are captured.",
    tags: ["Site prep"],
    icon: "floor",
  },
  {
    title: "Camp layout & integration engineering (example block)",
    description:
      "Master planning patterns for circulation, separation, and life-support services—applied as a configurable map, then hardened to your CONOPS.",
    tags: ["Engineering"],
    icon: "layout",
  },
];

export default function ConfigurableSystemsPage() {
  return (
    <>
      <Hero
        eyebrow="Configurable systems · mission packages"
        title="Solution families shaped from the mission in—not picked from a shelf."
        description="We begin with mission narrative, environment, team size, timeline, logistics, power, and sustainment. The examples below are configurable building blocks and workshop starting points, not off-the-shelf products. Naming, cell counts, MEP, and spares scale to your program after analysis and controlled disclosure as required."
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
            Each card describes an example configuration block. Final solutions combine, resize, and
            integrate these elements based on theater, mobility, threat, and sustainment—never as a
            one-size-fits-all catalog row.
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
        description="We assemble bounded option sets and technical narratives from mission inputs—not from a generic cut sheet."
        primary={{ href: "/contact", label: "Contact programs" }}
        secondary={{ href: "/ai-configurator", label: "Mission Solution Builder" }}
      />
    </>
  );
}
