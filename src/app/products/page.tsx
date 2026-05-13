import type { Metadata } from "next";
import type { ProductIconKey } from "@/components/ProductCardIcons";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { CTA } from "@/components/CTA";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Deployable shelter systems, mobile camp infrastructure, environmental and power modules from Weatherhaven Resource Inc.",
};

const products: {
  title: string;
  description: string;
  tags: readonly string[];
  icon: ProductIconKey;
}[] = [
  {
    title: "TRECC expeditionary series",
    description:
      "Rigid-frame shelters for maintenance, aviation support, and logistics throughput—wind, snow, and recovery loads documented for review.",
    tags: ["Rigid frame", "High throughput"],
    icon: "shelter",
  },
  {
    title: "Soft-wall tactical packages",
    description:
      "Light footprints for command, medical triage, and transient berthing—palletized movement and small-team emplacement.",
    tags: ["Air mobile", "Low weight"],
    icon: "shelter",
  },
  {
    title: "Environmental control units",
    description:
      "ECUs matched to envelope loads with electrical staging for tactical generators or hybrid microgrids.",
    tags: ["ECU", "Power-aware"],
    icon: "ecu",
  },
  {
    title: "Power distribution & lighting",
    description:
      "PDUs, tactical cabling, and interior lighting aligned to expeditionary electrical discipline.",
    tags: ["Electrical"],
    icon: "power",
  },
  {
    title: "Flooring & subfloor systems",
    description:
      "Elevated floors for uneven ground, drainage, and cable management—safer circulation and faster fit-out.",
    tags: ["Site prep"],
    icon: "floor",
  },
  {
    title: "Camp layout engineering",
    description:
      "Master planning for circulation, separation distances, and life-support services—documented for safety and command review.",
    tags: ["Engineering"],
    icon: "layout",
  },
];

export default function ProductsPage() {
  return (
    <>
      <Hero
        eyebrow="Product families"
        title="Shelters and camp systems engineered for measured performance."
        description="Structural clarity, maintainable subsystems, and performance data you can brief. Integration is designed in—not bolted on later."
        pullQuote="Catalog depth means nothing if crews cannot power and climate-control the footprint on day one."
        primaryCta={{ href: "/request-access", label: "Request datasheets" }}
        secondaryCta={{ href: "/capabilities", label: "Engineering depth" }}
      />

      <section className="border-b border-zinc-800/80">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <ProductCard
                key={p.title}
                icon={p.icon}
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
        description="Structured option sets, ROM framing, and technical narratives for internal review—not marketing fluff."
        primary={{ href: "/contact", label: "Contact programs" }}
        secondary={{ href: "/ai-configurator", label: "AI configurator demo" }}
      />
    </>
  );
}
