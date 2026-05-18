import type { Metadata } from "next";
import { RequestAccessForm } from "@/components/RequestAccessForm";

export const metadata: Metadata = {
  title: "Request Access",
  description:
    "Request controlled access to technical materials and program engagements with Weatherhaven Resource Inc.",
};

export default function RequestAccessPage() {
  return (
    <section className="bg-[#080a0c]">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="mb-8 border-b border-white/[0.08] pb-8">
          <p className="wh-label text-[#c8a96e]">Controlled disclosure</p>
          <h1 className="font-display mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Request platform access
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#8a9099] sm:text-base">
            Submit your official affiliation for vetting. A Weatherhaven engineer will verify your program alignment
            and issue credentials within 48 hours.
          </p>
        </div>
        <RequestAccessForm />
      </div>
    </section>
  );
}
