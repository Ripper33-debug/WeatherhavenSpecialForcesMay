import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { ConfiguratorDemo } from "@/components/ConfiguratorDemo";
import { CTA } from "@/components/CTA";

export const metadata: Metadata = {
  title: "AI Configurator",
  description:
    "Guided solution builder for expeditionary shelter and camp infrastructure—translate mission parameters into unclassified advisory outlines.",
};

export default function AiConfiguratorPage() {
  return (
    <>
      <Hero
        eyebrow="Guided solution architecture"
        title="Build a mission package—not a shopping cart."
        description="Step through mission profile, operating environment, power baseline, and force size to produce a structured advisory outline. This workspace supports solution design conversations: what to emplace, how to power and condition it, and what sustainment assumptions to test—before anything is treated as a fixed product."
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
