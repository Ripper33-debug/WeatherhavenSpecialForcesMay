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
        description="Use official email domains where possible. For technical packages, controlled goods, or export-sensitive discussions, begin with a Request Access submission so we can align disclosure to your program status."
        primaryCta={{ href: "/request-access", label: "Request access" }}
      />

      <section className="border-t border-zinc-800/80">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-xl font-semibold text-zinc-100">Program office inquiries</h2>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                For statements of work, RFI/RFP alignment, and technical workshops, contact our
                defense programs desk. Include contract vehicle and security classification guide
                in your introduction so we can staff the right discipline leads.
              </p>
              <dl className="mt-8 space-y-4 text-sm">
                <div>
                  <dt className="font-medium text-zinc-300">Programs routing</dt>
                  <dd className="mt-1 text-zinc-500">
                    Official contact paths are issued after affiliation verification. Start with{" "}
                    <Link href="/request-access" className="text-amber-600/90 hover:text-amber-500">
                      Request Access
                    </Link>{" "}
                    to open a controlled thread.
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-zinc-300">Business hours</dt>
                  <dd className="mt-1 text-zinc-500">Monday–Friday, 08:00–18:00 local</dd>
                </div>
              </dl>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-zinc-100">Teaming & suppliers</h2>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                We maintain selective supplier relationships to preserve quality and delivery
                assurance. If you have a capability brief aligned to expeditionary infrastructure,
                route it through the same programs channel with “Teaming” in the subject line.
              </p>
              <div className="mt-8 rounded-lg border border-zinc-800 bg-zinc-900/30 p-6">
                <p className="text-sm text-zinc-400">
                  Need structured vetting before sharing controlled information?{" "}
                  <Link href="/request-access" className="font-medium text-amber-600/90 hover:text-amber-500">
                    Submit a Request Access form
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
