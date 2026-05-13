import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { ConfiguratorDemo } from "@/components/ConfiguratorDemo";
import { CTA } from "@/components/CTA";

export const metadata: Metadata = {
  title: "Mission Solution Builder",
  description:
    "Guided mission solution builder for expeditionary shelter and camp infrastructure—translate mission parameters into unclassified advisory briefs.",
};

export default function AiConfiguratorPage() {
  return (
    <>
      <Hero
        eyebrow="Mission Solution Builder"
        title="Configure infrastructure from the mission narrative outward."
        description="Walk mission profile, operating environment, power baseline, and force size to synthesize a notional package. This workspace supports how SOF teams buy solutions: start with objectives, logistics, timeline, and sustainment—then converge on shelter, MEP, and integration—not the reverse."
        pullQuote="Configurable shelter and support systems for complex operating environments."
        primaryCta={{ href: "/request-access", label: "Request enterprise briefing" }}
        secondaryCta={{ href: "/capabilities", label: "Modeling & CM" }}
      />

      <section className="border-b border-zinc-800/80">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <ConfiguratorDemo />
        </div>
      </section>

      <CTA
        title="Bring mission parameters—we map them to controlled option sets."
        description="Outputs are advisory and unclassified. Engineering sign-off, codes, and program constraints still govern what ships."
        primary={{ href: "/request-access", label: "Schedule a walkthrough" }}
        secondary={{ href: "/contact", label: "Contact" }}
      />
    </>
  );
}
