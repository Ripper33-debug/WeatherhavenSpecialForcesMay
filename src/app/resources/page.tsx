import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/Hero";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Capability statements, one-pagers, and gated technical materials for vetted SOF and defense program audiences.",
};

function ResourceFrame({
  title,
  description,
  foot,
}: {
  title: string;
  description: string;
  foot: string;
}) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-zinc-950/80">
      <div className="relative aspect-[16/10] w-full bg-gradient-to-br from-zinc-900 via-zinc-950 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_30%_20%,rgb(120_53_15/0.15),transparent_55%)]" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgb(82 82 91) 1px, transparent 1px), linear-gradient(to bottom, rgb(82 82 91) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="max-w-sm rounded-xl border border-white/[0.1] bg-black/40 px-4 py-3 text-center backdrop-blur-sm">
            <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">{foot}</p>
            <p className="mt-1 text-sm font-semibold text-zinc-200">{title}</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/[0.06] p-5 sm:p-6">
        <p className="text-sm leading-relaxed text-zinc-400">{description}</p>
        <Link
          href="/request-access"
          className="mt-4 inline-block text-[13px] font-semibold text-amber-500/90 hover:text-amber-400"
        >
          Request gated materials →
        </Link>
      </div>
    </div>
  );
}

export default function ResourcesPage() {
  return (
    <>
      <Hero
        eyebrow="Resources library"
        title="Capability statements, one-pagers, and gated technical packs."
        description="Public pages summarize approach and building blocks. Detailed drawings, performance data, and program-specific narratives are released only through controlled channels after mission profile, environment, clearance, and export posture are confirmed."
        pullQuote="Nothing sensitive ships through the open web—Request Access gates the rest."
        primaryCta={{ href: "/request-access", label: "Request access" }}
        secondaryCta={{ href: "/mission-solution-builder", label: "Mission Solution Builder" }}
      />

      <section className="border-b border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-18">
          <div className="grid gap-6 lg:grid-cols-3">
            <ResourceFrame
              foot="Capability statement"
              title="Mission-tailored infrastructure overview"
              description="Program-facing summary of how Weatherhaven composes deployable shelter, power, environmental, and sustainment blocks from mission inputs—suitable for acquisition and industry days after vetting."
            />
            <ResourceFrame
              foot="One-pager"
              title="SOF expeditionary footprint framing"
              description="Concise visual storyline for workshops: circulation, utilities, and signature discipline—unclassified framing only; controlled variants issued under program rules."
            />
            <ResourceFrame
              foot="Gated technical"
              title="Controlled technical data packages"
              description="Drawings, load summaries, and interface control documents for cleared recipients. Request through official channels—export-controlled content is never posted publicly."
            />
          </div>
        </div>
      </section>
    </>
  );
}
