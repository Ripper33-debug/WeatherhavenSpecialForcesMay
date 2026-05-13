import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Weatherhaven Resource Inc. for program, partnership, and media inquiries.",
};

export default function ContactPage() {
  return (
    <>
      <Hero
        eyebrow="Programs & partnerships"
        title="Direct lines for defense and enterprise customers."
        description="Prefer official email domains. For technical packages or export-sensitive topics, start with Request Access so disclosure matches program status."
        pullQuote="We route by discipline—structures, power, environmental, and field services."
        primaryCta={{ href: "/request-access", label: "Request access" }}
      />

      <section className="border-t border-zinc-800/90">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <h2 className="font-display text-xl font-semibold tracking-tight text-zinc-50 sm:text-2xl">
                Program office inquiries
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                For SOWs, RFI/RFP alignment, and workshops, route through programs. Include contract
                vehicle and security classification guide in your introduction.
              </p>
              <dl className="mt-8 space-y-4 text-sm">
                <div>
                  <dt className="font-medium text-zinc-300">Programs routing</dt>
                  <dd className="mt-1 text-zinc-500">
                    Issued after affiliation verification. Open a thread via{" "}
                    <Link href="/request-access" className="text-amber-600/90 hover:text-amber-500">
                      Request Access
                    </Link>
                    .
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-zinc-300">Business hours</dt>
                  <dd className="mt-1 text-zinc-500">Monday–Friday, 08:00–18:00 local</dd>
                </div>
              </dl>
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold tracking-tight text-zinc-50 sm:text-2xl">
                Teaming & suppliers
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                Selective supplier relationships preserve quality and delivery assurance. Capability
                briefs aligned to expeditionary infrastructure should note “Teaming” in the subject.
              </p>
              <div className="mt-8 rounded-sm border border-zinc-800/90 bg-zinc-900/40 p-6 transition hover:border-zinc-700/90">
                <p className="text-sm text-zinc-400">
                  Need structured vetting before sharing controlled information?{" "}
                  <Link href="/request-access" className="font-medium text-amber-600/90 hover:text-amber-500">
                    Request Access
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
