import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { RequestAccessForm } from "@/components/RequestAccessForm";

export const metadata: Metadata = {
  title: "Request Access",
  description:
    "Request controlled access to technical materials and program engagements with Weatherhaven Resource Inc.",
};

export default function RequestAccessPage() {
  return (
    <>
      <Hero
        topo
        compactTop
        eyebrow="Controlled disclosure"
        title="Request access to program materials and technical exchanges."
        description="Official contact information for online customer tracking and follow-up. We verify affiliation, log requests in the SOF lead register with pipeline status, and route per export and program rules. Not for classified content."
        pullQuote="Controlled exchanges protect both sides: clearances, export posture, and program alignment before drawings move."
      />

      <section className="border-t border-white/[0.08] bg-[#080a0c]">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <RequestAccessForm />
        </div>
      </section>
    </>
  );
}
