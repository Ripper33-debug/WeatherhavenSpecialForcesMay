import Link from "next/link";

const items = [
  {
    id: "sof-website",
    title: "SOF-aligned public website",
    badge: "Deliverable",
    summary:
      "Next.js experience covering SOF solutions, mission packages, capabilities, and contact paths—structured for defense program audiences without classified or export-controlled content.",
    outcomes: [
      "Responsive layouts and shared UI patterns for credibility and readability.",
      "Clear routing between marketing pages and controlled disclosure (Request Access).",
    ],
    href: "/",
    cta: "View site home",
  },
  {
    id: "ai-configurator",
    title: "Mission Solution Builder",
    badge: "Deliverable",
    summary:
      "Guided workspace that maps mission profile, environment, power baseline, and notional crew size into a structured mission solution brief—illustrative only, not engineering sign-off.",
    outcomes: [
      "Rules-based synthesis that mirrors workshop-ready documentation structure.",
      "Clear separation between advisory output and production configuration management.",
    ],
    href: "/ai-configurator",
    cta: "Open Mission Solution Builder",
  },
  {
    id: "lead-flow",
    title: "Customer lead intake flow",
    badge: "Deliverable",
    summary:
      "Request Access form with validation, reference identifiers, and a server route prepared for CRM, ticketing, or secure email forwarding.",
    outcomes: [
      "Official-style intake framing appropriate for defense business development.",
      "Separation between public marketing and vetted technical exchange requests.",
    ],
    href: "/request-access",
    cta: "View lead form",
  },
  {
    id: "positioning",
    title: "Mission & solution positioning narrative",
    badge: "Deliverable",
    summary:
      "Modular storytelling for mission-tailored deployable infrastructure—configurable shelter, camp integration, and advisory workflows—without performance claims tied to specific programs.",
    outcomes: [
      "Consistent value props: tempo, integration discipline, and field support.",
      "Solution-line cards and capability sections tuned for acquisition and operator readers.",
    ],
    href: "/products",
    cta: "View configurable systems",
  },
  {
    id: "market-research",
    title: "Defense market context (unclassified)",
    badge: "Deliverable",
    summary:
      "High-level synthesis of expeditionary infrastructure demand signals: coalition interoperability, contested logistics, and modular camp footprints—based on open industry and government themes only.",
    outcomes: [
      "Positions Weatherhaven-class offerings against macro trends, not specific threats.",
      "Supports internship reporting without sensitive sourcing or controlled data.",
    ],
    href: "/capabilities",
    cta: "See capabilities framing",
  },
] as const;

export function InternshipDeliverablesSection() {
  return (
    <section
      id="ent-4943-deliverables"
      className="scroll-mt-24 border-b border-zinc-800/90 bg-zinc-950/40"
    >
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="rounded-sm border border-zinc-800/90 bg-gradient-to-br from-zinc-900/50 via-zinc-950 to-zinc-950 p-6 shadow-[0_24px_80px_-48px_rgb(0_0_0/0.85)] sm:p-10">
          <div className="flex flex-col gap-6 border-b border-zinc-800/80 pb-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-500/95">
                ENT 4943 · Internship agreement alignment
              </p>
              <h2 className="font-display mt-3 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl lg:text-4xl">
                Screenshot-ready deliverable summary
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
                This panel summarizes course and internship outcomes reflected in this repository:
                public SOF website, Mission Solution Builder, lead flow, positioning, and unclassified market context.
                All materials are suitable for academic submission and employer review—no classified or
                export-controlled technical data.
              </p>
            </div>
            <Link
              href="/ent-4943"
              className="inline-flex shrink-0 items-center justify-center rounded-sm border border-zinc-600 bg-zinc-950/60 px-4 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-900/60"
            >
              Full deliverables page →
            </Link>
          </div>

          <ul className="mt-10 grid gap-6 lg:grid-cols-2">
            {items.map((item, idx) => (
              <li
                key={item.id}
                id={item.id}
                className="scroll-mt-28 rounded-sm border border-zinc-800/80 bg-zinc-950/50 p-6 transition duration-200 hover:border-zinc-700/90 hover:bg-zinc-950/70"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="rounded-sm border border-amber-800/40 bg-amber-950/30 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-amber-500/95">
                    {item.badge}
                  </span>
                </div>
                <h3 className="font-display mt-3 text-lg font-semibold tracking-tight text-zinc-50 sm:text-xl">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{item.summary}</p>
                <ul className="mt-4 space-y-2 text-sm text-zinc-300">
                  {item.outcomes.map((o) => (
                    <li key={o} className="flex gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber-600/80" />
                      <span>{o}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={item.href}
                  className="mt-5 inline-block font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-500/95 transition hover:text-amber-400"
                >
                  {item.cta} →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
