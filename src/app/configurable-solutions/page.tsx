import type { Metadata } from "next";
import { ConfigurableSolutionsShowcase } from "@/components/products/ConfigurableSolutionsShowcase";
import { CTA } from "@/components/CTA";
import { SectionReveal } from "@/components/site/SectionReveal";

export const metadata: Metadata = {
  title: "Configurable Solutions",
  description:
    "Browse Weatherhaven shelter system building blocks — filter by mission type, environment, mobility, and force size.",
};

export default function ConfigurableSolutionsPage() {
  return (
    <>
      <ConfigurableSolutionsShowcase />
      <SectionReveal>
        <CTA
          title="Need a configuration package for a solicitation or J&A?"
          description="We assemble bounded option sets and technical narratives from mission inputs—not from a generic cut sheet."
          primary={{ href: "/contact", label: "Contact programs" }}
          secondary={{ href: "/mission-solution-builder", label: "Mission Solution Builder" }}
        />
      </SectionReveal>
    </>
  );
}
