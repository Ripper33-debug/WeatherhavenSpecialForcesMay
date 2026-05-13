import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { CTA } from "@/components/CTA";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Deployable shelter systems, mobile camp infrastructure, environmental and power modules from Weatherhaven Resource Inc.",
};

const products = [
  {
    title: "TRECC expeditionary series",
    description:
      "Modular rigid-frame shelters sized for maintenance, aviation support, and logistics throughput. Structural options for snow, wind, and crane-assisted maintenance.",
    tags: ["Rigid frame", "High throughput"],
  },
  {
    title: "Soft-wall tactical packages",
    description:
      "Lightweight footprints for command nodes, medical triage, and transient berthing. Optimized for palletized movement and small-team emplacement.",
    tags: ["Air mobile", "Low weight"],
  },
  {
    title: "Environmental control units",
    description:
      "ECUs matched to envelope and sensible loads with disciplined electrical staging for tactical generator sets or hybrid microgrids.",
    tags: ["ECU", "Power-aware"],
  },
  {
    title: "Power distribution & lighting",
    description:
      "PDUs, tactical cabling systems, and interior lighting packages aligned to NEC-minded practices adapted for expeditionary constraints.",
    tags: ["Electrical"],
  },
  {
    title: "Flooring & subfloor systems",
    description:
      "Elevated floors for uneven ground, drainage, and cable management—reducing trip hazards and accelerating interior fit-out.",
    tags: ["Site prep"],
  },
  {
    title: "Camp layout engineering",
    description:
      "Master planning for circulation, fuel separation, maintenance lines, and life-support services—documented for safety and command review.",
    tags: ["Engineering"],
  },
] as const;

export default function ProductsPage() {
  return (
    <>
      <Hero
        eyebrow="Product families"
        title="Shelters and camp systems built for measured performance."
        description="Our lines emphasize structural clarity, maintainable subsystems, and performance data you can brief. Options are integrated—not bolted on after the fact."
        pullQuote="Catalog depth means nothing if crews cannot emplace, power, and climate-control the footprint on day one."
        primaryCta={{ href: "/request-access", label: "Request datasheets" }}
        secondaryCta={{ href: "/capabilities", label: "Engineering depth" }}
      />

      <section className="border-b border-zinc-800/80">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <ProductCard
                key={p.title}
                title={p.title}
                description={p.description}
                tags={[...p.tags]}
              />
            ))}
          </div>
        </div>
      </section>

      <CTA
        title="Need a configuration package for a solicitation or J&A?"
        description="We support acquisition teams with structured option sets, ROM estimates, and technical narratives suitable for internal review—not marketing fluff."
        primary={{ href: "/contact", label: "Contact programs" }}
        secondary={{ href: "/ai-configurator", label: "AI configurator demo" }}
      />
    </>
  );
}
