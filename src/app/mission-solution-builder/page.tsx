import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { ConfiguratorDemo } from "@/components/ConfiguratorDemo";
import { CTA } from "@/components/CTA";

export const metadata: Metadata = {
  title: "Mission Solution Builder",
  description:
    "AI-assisted configuration advisory demo for expeditionary shelter and camp infrastructure—translate mission parameters into unclassified advisory briefs. Not engineering sign-off.",
};

export default function MissionSolutionBuilderPage() {
  return (
    <>
      <Hero
        eyebrow="Mission Solution Builder · configuration advisory demo"
        title="Compose infrastructure from mission profile, environment, and sustainment first."
        description="Walk mission profile, operating environment, power baseline, and force size to synthesize a notional advisory brief. This tool illustrates how SOF teams converge on shelter, ECU, power, flooring, and layout engineering as configurable building blocks—after mission narrative, personnel, mobility, timeline, and sustainment are understood—not the reverse."
        pullQuote="Configurable shelter and support systems for complex operating environments."
        primaryCta={{ href: "/request-access", label: "Request enterprise briefing" }}
        secondaryCta={{ href: "/capabilities", label: "Modeling & CM" }}
      />

      <section className="border-b border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
          <ConfiguratorDemo />
        </div>
      </section>

      <CTA
        title="Bring mission parameters—we map them to controlled option sets."
        description="Outputs are advisory and unclassified. Engineering sign-off, export posture, and program constraints govern what can be shared or fielded."
        primary={{ href: "/request-access", label: "Schedule a walkthrough" }}
        secondary={{ href: "/contact", label: "Contact" }}
      />
    </>
  );
}
