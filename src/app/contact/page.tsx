import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/Hero";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Weatherhaven Resource Inc. for program offices, teaming partners, and controlled technical exchanges.",
};

function ContactCard({
  title,
  subtitle,
  children,
  cta,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  cta: { href: string; label: string };
}) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-sm border border-zinc-800/90 bg-gradient-to-b from-zinc-900/50 via-zinc-950 to-black p-6 shadow-sm transition duration-300 hover:border-zinc-600/80 hover:shadow-[0_24px_56px_-28px_rgb(0_0_0/0.9)] sm:p-8">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(161 161 170) 1px, transparent 1px), linear-gradient(to bottom, rgb(161 161 170) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      <div className="relative flex flex-1 flex-col">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-600/90">
          {subtitle}
        </p>
        <h2 className="font-display mt-3 text-xl font-semibold tracking-tight text-zinc-50">{title}</h2>
        <div className="mt-4 flex-1 text-sm leading-relaxed text-zinc-400">{children}</div>
        <Link
          href={cta.href}
          className="mt-8 inline-flex w-fit items-center font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-500/95 transition hover:text-amber-400"
        >
          {cta.label} →
        </Link>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      <Hero
        eyebrow="Programs & partnerships"
        title="Routing built for defense acquisition rhythm."
        description="Use the appropriate channel so your inquiry reaches programs, teaming, or controlled technical exchange without delay. Official email domains preferred."
        pullQuote="We align disclosure to program status—starting with the mission, not a generic inbox."
        primaryCta={{ href: "/request-access", label: "Request access" }}
        secondaryCta={{ href: "/resources", label: "Resources" }}
      />

      <section className="border-t border-zinc-800/90">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="grid gap-6 lg:grid-cols-3">
            <ContactCard
              subtitle="Program channel"
              title="Program office / government buyer"
              cta={{ href: "/request-access", label: "Open programs thread" }}
            >
              <p>
                For SOW alignment, RFI/RFP workshops, and mission-specific infrastructure packages,
                begin with Request Access using official affiliation. Include contract vehicle and
                security classification guide so we staff the right engineering and program leads.
              </p>
              <p className="mt-4 text-xs text-zinc-500">Business hours: Monday–Friday, 08:00–18:00 local.</p>
            </ContactCard>

            <ContactCard
              subtitle="Industry channel"
              title="Teaming & industry partners"
              cta={{ href: "/request-access", label: "Submit teaming interest" }}
            >
              <p>
                For subcontracting, capability briefs, and selective supplier relationships aligned to
                expeditionary infrastructure, route through the same programs channel with{" "}
                <span className="font-medium text-zinc-300">Teaming</span> in the subject line so
                routing stays disciplined.
              </p>
            </ContactCard>

            <ContactCard
              subtitle="Controlled disclosure"
              title="Technical exchange / Request Access"
              cta={{ href: "/request-access", label: "Request technical exchange" }}
            >
              <p>
                For controlled technical data, detailed mission packages, and export-sensitive
                discussions, use Request Access first. We verify affiliation and align disclosure to
                clearance and program rules—no classified or export-controlled content via open web
                forms.
              </p>
            </ContactCard>
          </div>
        </div>
      </section>
    </>
  );
}
