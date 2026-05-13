import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { ConfiguratorDemo } from "@/components/ConfiguratorDemo";
import { CTA } from "@/components/CTA";

export const metadata: Metadata = {
  title: "AI Configurator",
  description:
    "AI-assisted configuration workspace for expeditionary shelter and camp systems—unclassified advisory summaries.",
};

export default function AiConfiguratorPage() {
  return (
    <>
      <Hero
        eyebrow="Advisory tooling"
        title="Configuration assistance with engineering sign-off."
        description="Structured inputs and rules-based synthesis accelerate workshops. Production use ties to validated models, codes, and program configuration management."
        pullQuote="AI multiplies documentation and trade-space exploration—it does not replace structural, electrical, or environmental verification."
        primaryCta={{ href: "/request-access", label: "Request enterprise briefing" }}
        secondaryCta={{ href: "/capabilities", label: "Modeling & CM" }}
      />

      <section className="border-b border-zinc-800/80">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <ConfiguratorDemo />
        </div>
      </section>

      <CTA
        title="Bring your parameters. We map them to controlled option sets."
        description="Advisory tooling supports documentation and exploration under formal engineering authority."
        primary={{ href: "/request-access", label: "Schedule a walkthrough" }}
        secondary={{ href: "/contact", label: "Contact" }}
      />
    </>
  );
}
