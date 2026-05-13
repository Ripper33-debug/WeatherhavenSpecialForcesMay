import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { ConfiguratorDemo } from "@/components/ConfiguratorDemo";
import { CTA } from "@/components/CTA";

export const metadata: Metadata = {
  title: "AI Configurator Demo",
  description:
    "Demonstration of AI-assisted product configuration for expeditionary shelter and camp systems.",
};

export default function AiConfiguratorPage() {
  return (
    <>
      <Hero
        eyebrow="Advisory tooling"
        title="Configuration assistance that respects engineering sign-off."
        description="This demo shows how structured prompts and rules-based synthesis accelerate early workshops. Production use integrates validated load models, safety codes, and program constraints under formal configuration management."
        pullQuote="AI is a force multiplier for documentation and trade-space exploration—not a substitute for structural, electrical, or environmental verification."
        primaryCta={{ href: "/request-access", label: "Request enterprise briefing" }}
        secondaryCta={{ href: "/capabilities", label: "Modeling & CM" }}
      />

      <section className="border-b border-zinc-800/80">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <ConfiguratorDemo />
        </div>
      </section>

      <CTA
        title="Bring your parameters. We will map them to controlled option sets."
        description="AI assistance is a force multiplier for documentation and exploration—not a substitute for structural, electrical, and environmental verification."
        primary={{ href: "/request-access", label: "Schedule a walkthrough" }}
        secondary={{ href: "/contact", label: "Contact" }}
      />
    </>
  );
}
