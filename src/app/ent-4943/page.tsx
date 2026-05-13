import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/Hero";

export const metadata: Metadata = {
  title: "ENT 4943 · Internship deliverables",
  description:
    "Summary of ENT 4943 and internship-aligned deliverables: SOF website, AI configuration demo, lead intake, product positioning, and unclassified defense market context.",
};

const panels = [
  {
    id: "sof-website",
    title: "1. SOF public website (this experience)",
    body: [
      "Responsive Next.js application with defense-industry typography, navigation, and page structure for SOF solutions, products, capabilities, and contact paths.",
      "Content is unclassified and avoids export-controlled technical detail; sensitive program discussions route through Request Access.",
    ],
    link: { href: "/", label: "Home" },
  },
  {
    id: "ai-demo",
    title: "2. AI configuration demo",
    body: [
      "Mission profile, operating environment, power baseline, and notional crew size drive a generated sample configuration brief.",
      "Demonstrates how structured inputs can accelerate workshops while preserving engineering authority and procurement disclaimers.",
    ],
    link: { href: "/ai-configurator", label: "AI Configurator" },
  },
  {
    id: "lead-flow",
    title: "3. Customer lead flow",
    body: [
      "Request Access form captures official affiliation fields, validates required inputs, and returns a reference identifier from a Next.js API route.",
      "The API route is prepared for optional webhook forwarding (environment variable) to CRM, ticketing, or secure email pipelines.",
    ],
    link: { href: "/request-access", label: "Request Access" },
  },
  {
    id: "positioning",
    title: "4. Product positioning",
    body: [
      "Product families and capability narratives emphasize expeditionary shelter classes, mobile infrastructure integration, and field support—without program-specific performance claims.",
      "Cards and sections are designed for screenshot evidence in internship and course documentation.",
    ],
    link: { href: "/products", label: "Products" },
  },
  {
    id: "market-research",
    title: "5. Defense market research (unclassified)",
    body: [
      "Framing draws on open themes: coalition interoperability, modular camps, contested logistics, and disciplined configuration management.",
      "No sensitive sourcing, order-of-battle detail, or controlled technical parameters are included.",
    ],
    link: { href: "/capabilities", label: "Capabilities" },
  },
] as const;

export default function Ent4943Page() {
  return (
    <>
      <Hero
        eyebrow="ENT 4943 · Internship documentation"
        title="Deliverables aligned to course and internship outcomes."
        description="This page is a screenshot-friendly index of the work embodied in this site: public SOF web experience, AI advisor demo, lead intake, positioning narrative, and unclassified market context."
        pullQuote="Evidence for academic submission should be clear, professional, and free of controlled technical data."
        primaryCta={{ href: "/#ent-4943-deliverables", label: "Jump to home summary" }}
        secondaryCta={{ href: "/request-access", label: "Lead intake example" }}
      />

      <section className="border-b border-zinc-800/90">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="rounded-sm border border-zinc-800/80 bg-zinc-900/30 p-5 font-mono text-[11px] leading-relaxed text-zinc-400 sm:p-6 sm:text-xs">
            <p className="text-zinc-500">DOCUMENT TYPE: STUDENT / INTERNSHIP SUMMARY (UNCLASSIFIED)</p>
            <p className="mt-2 text-amber-600/90">For ENT 4943 evidence packets and employer review only.</p>
          </div>

          <ol className="mt-12 space-y-10">
            {panels.map((p) => (
              <li
                key={p.id}
                id={p.id}
                className="scroll-mt-28 rounded-sm border border-zinc-800/90 bg-zinc-950/50 p-6 sm:p-8"
              >
                <h2 className="font-display text-xl font-semibold tracking-tight text-zinc-50 sm:text-2xl">
                  {p.title}
                </h2>
                <div className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-400">
                  {p.body.map((para) => (
                    <p key={para}>{para}</p>
                  ))}
                </div>
                <Link
                  href={p.link.href}
                  className="mt-6 inline-block font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-500/95 hover:text-amber-400"
                >
                  Open: {p.link.label} →
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
