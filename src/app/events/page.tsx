import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/Hero";

export const metadata: Metadata = {
  title: "Events & Capability Briefings",
  description:
    "Trade show support, private capability briefings, lead capture, and disciplined follow-up for U.S. and allied SOF program audiences.",
};

function EventCard({
  title,
  body,
  meta,
}: {
  title: string;
  body: string;
  meta: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-zinc-950/60 p-6 sm:p-8">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amber-950/10 via-transparent to-zinc-950" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(82 82 91) 1px, transparent 1px), linear-gradient(to bottom, rgb(82 82 91) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="relative">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">{meta}</p>
        <h2 className="font-display mt-2 text-xl font-semibold tracking-tight text-zinc-50">{title}</h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">{body}</p>
      </div>
    </div>
  );
}

export default function EventsPage() {
  return (
    <>
      <Hero
        eyebrow="Events & capability briefings"
        title="Trade floors, private demos, and disciplined follow-up."
        description="Weatherhaven supports expeditionary infrastructure conversations where SOF buyers expect crisp option framing: mission profile first, then configurable system families—not brochure SKUs. Lead capture routes through Request Access for vetting and export alignment."
        pullQuote="Lead collection and follow-up stay tied to program posture—never open technical disclosure."
        primaryCta={{ href: "/request-access", label: "Request briefing or lead capture" }}
        secondaryCta={{ href: "/contact", label: "Programs desk" }}
      />

      <section className="border-b border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-18">
          <div className="grid gap-5 lg:grid-cols-3">
            <EventCard
              meta="Trade engagement"
              title="Trade show support"
              body="Booth-ready narratives, bounded configuration visuals, and routing for deeper technical exchange after the floor—SOF-specific or export-sensitive detail stays behind Request Access."
            />
            <EventCard
              meta="Private sessions"
              title="Capability briefings & demos"
              body="Closed-door walkthroughs aligned to clearance and program vehicle. Visual demonstrations support decision quality without surfacing controlled data on the open web."
            />
            <EventCard
              meta="Pipeline hygiene"
              title="Lead capture & follow-up"
              body="Intake captures affiliation, mission context, and next steps. Program teams progress leads through vetting, contact, qualification, and follow-up—mirroring the online Request Access path."
            />
          </div>

          <div className="mt-10 rounded-2xl border border-white/[0.08] bg-zinc-900/25 px-6 py-8 sm:px-8">
            <p className="font-display text-lg font-semibold tracking-tight text-zinc-50">Printed & online marketing tools</p>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-400">
              Capability statements, briefing decks, and controlled one-pagers are prepared for program channels. Public pages stay unclassified; gated technical materials release only after{" "}
              <Link href="/request-access" className="font-semibold text-amber-500/90 hover:text-amber-400">
                Request Access
              </Link>{" "}
              vetting.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
