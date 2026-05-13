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
        eyebrow="Controlled disclosure"
        title="Request access to technical exchanges and program materials."
        description="Complete the form using official contact information. We verify affiliation and route your request according to export and program rules. This channel is not for classified content."
        pullQuote="Controlled technical exchanges protect both sides: clearances, export posture, and program alignment before drawings move."
        secondaryCta={{ href: "/contact", label: "General inquiries" }}
      />

      <section>
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
          <RequestAccessForm />
        </div>
      </section>
    </>
  );
}
