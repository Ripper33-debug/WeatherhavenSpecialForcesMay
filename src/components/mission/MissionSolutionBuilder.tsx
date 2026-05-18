"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { IconChevronDown } from "@tabler/icons-react";
import { HeroTopoCanvas } from "@/components/HeroTopoCanvas";
import { trackEvent } from "@/lib/analytics";
import {
  buildProfileSummary,
  buildRequirementsText,
  hasConfiguratorPrefill,
  MISSION_BUILDER_DEFAULTS,
  prefillFromConfigurator,
  recommendProducts,
  type MissionBuilderState,
} from "@/lib/missionBuilder";

const inputClass =
  "mt-1.5 w-full border border-[rgba(255,255,255,0.12)] bg-[#0d0f12] px-3 py-2.5 text-sm text-white outline-none focus:border-[rgba(255,255,255,0.35)]";

const selectClass = inputClass;

const SPECIAL_OPTS = [
  "RF/TEMPEST shielding",
  "Blackout capability",
  "Positive pressure",
  "Airlock entry",
  "Blast protection",
  "NBC filtration",
];

const SECTIONS = [
  { id: "env", label: "OPERATIONAL ENVIRONMENT" },
  { id: "fn", label: "MISSION FUNCTION" },
  { id: "mob", label: "MOBILITY & TRANSPORT" },
  { id: "time", label: "TIMELINE & SUSTAINMENT" },
  { id: "power", label: "POWER & ENVIRONMENTAL" },
  { id: "extra", label: "ADDITIONAL REQUIREMENTS" },
] as const;

function Section({
  id,
  label,
  open,
  onToggle,
  children,
}: {
  id: string;
  label: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-[rgba(255,255,255,0.08)]">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between py-5 text-left"
        aria-expanded={open}
        aria-controls={`section-${id}`}
      >
        <span className="font-mono text-[11px] font-medium tracking-[0.15em] text-[#c8a96e]">{label}</span>
        <IconChevronDown
          className={`shrink-0 text-[#8a9099] transition-transform ${open ? "rotate-180" : ""}`}
          size={18}
          aria-hidden
        />
      </button>
      {open && (
        <div id={`section-${id}`} className="space-y-4 pb-8">
          {children}
        </div>
      )}
    </section>
  );
}

export function MissionSolutionBuilder() {
  const [state, setState] = useState(MISSION_BUILDER_DEFAULTS);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    env: true,
    fn: false,
    mob: false,
    time: false,
    power: false,
    extra: false,
  });
  const [prefillBanner, setPrefillBanner] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (hasConfiguratorPrefill()) {
      setState((s) => prefillFromConfigurator(s));
      setPrefillBanner(true);
    }
  }, []);

  const summary = useMemo(() => buildProfileSummary(state), [state]);
  const recommended = useMemo(() => recommendProducts(state), [state]);

  function patch<K extends keyof MissionBuilderState>(key: K, value: MissionBuilderState[K]) {
    setState((s) => ({ ...s, [key]: value }));
  }

  function toggleSection(id: string) {
    setOpenSections((o) => ({ ...o, [id]: !o[id] }));
  }

  function toggleSpecial(req: string) {
    setState((s) => ({
      ...s,
      specialRequirements: s.specialRequirements.includes(req)
        ? s.specialRequirements.filter((r) => r !== req)
        : [...s.specialRequirements, req],
    }));
  }

  async function handleSubmit() {
    if (!state.contactName.trim() || !state.contactOrg.trim() || !state.contactEmail.trim()) {
      setError("Enter contact name, organization, and email to submit.");
      return;
    }
    setSubmitting(true);
    setError(null);
    const requirements = buildRequirementsText(state);
    try {
      const res = await fetch("/api/request-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: state.contactName,
          organization: state.contactOrg,
          email: state.contactEmail,
          role: "Mission Builder",
          program: state.primaryFunction,
          message: requirements,
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error ?? "Submission failed.");
        return;
      }
      await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: state.contactName,
          organization: state.contactOrg,
          email: state.contactEmail,
          role: "Mission Builder",
          program: state.primaryFunction,
          requirements,
          source: "Mission Solution Builder",
        }),
      });
      void trackEvent("submit", "Mission Solution Builder submitted");
      setSubmitted(true);
    } catch {
      setError("Network error. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 py-20 text-center">
        <p className="wh-label text-[#c8a96e]">Profile submitted</p>
        <p className="mt-6 max-w-lg text-base text-white">
          Request received. A Weatherhaven engineer will contact you within 48 hours.
        </p>
      </div>
    );
  }

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/[0.08] bg-[#080a0c]">
        <HeroTopoCanvas />
        <div className="relative z-10 mx-auto max-w-[1400px] px-4 pt-20 pb-14 sm:px-6 lg:px-12 lg:pb-20">
          <p className="wh-label text-[#c8a96e]">Mission solution builder</p>
          <h1 className="font-display mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Define your requirement. We&apos;ll compose the solution.
          </h1>
          <p className="mt-6 max-w-2xl text-base text-[#8a9099]">
            Work through your operational parameters and receive a tailored shelter system recommendation.
          </p>
        </div>
      </section>

      <section className="bg-[#080a0c]">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_360px] lg:gap-16 lg:px-12 lg:py-16">
          <div>
            {prefillBanner && (
              <div className="mb-8 border-l-2 border-[#c8a96e] bg-[#0d0f12] px-5 py-4">
                <p className="text-sm text-white">
                  We&apos;ve pre-loaded your mission profile from your earlier session.
                </p>
              </div>
            )}

            {SECTIONS.map((sec) => (
              <Section
                key={sec.id}
                id={sec.id}
                label={sec.label}
                open={!!openSections[sec.id]}
                onToggle={() => toggleSection(sec.id)}
              >
                {sec.id === "env" && (
                  <>
                    <label className="block text-xs uppercase tracking-wide text-[#8a9099]">
                      Environment type
                      <select className={selectClass} value={state.environment} onChange={(e) => patch("environment", e.target.value)}>
                        <option value="">Select…</option>
                        <option value="arctic">Arctic</option>
                        <option value="desert">Desert</option>
                        <option value="tropical">Tropical</option>
                        <option value="maritime">Maritime</option>
                        <option value="highalt">High Altitude</option>
                        <option value="temperate">Temperate</option>
                      </select>
                    </label>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="text-xs uppercase tracking-wide text-[#8a9099]">
                        Min °F
                        <input type="number" className={inputClass} value={state.tempMin} onChange={(e) => patch("tempMin", e.target.value)} />
                      </label>
                      <label className="text-xs uppercase tracking-wide text-[#8a9099]">
                        Max °F
                        <input type="number" className={inputClass} value={state.tempMax} onChange={(e) => patch("tempMax", e.target.value)} />
                      </label>
                    </div>
                    <label className="block text-xs uppercase tracking-wide text-[#8a9099]">
                      Elevation
                      <select className={selectClass} value={state.elevation} onChange={(e) => patch("elevation", e.target.value)}>
                        <option value="">Select…</option>
                        <option value="Sea level">Sea level</option>
                        <option value="0-5000ft">0–5000 ft</option>
                        <option value="5000-10000ft">5000–10000 ft</option>
                        <option value="10000ft+">10000 ft+</option>
                      </select>
                    </label>
                    <label className="block text-xs uppercase tracking-wide text-[#8a9099]">
                      Precipitation
                      <select className={selectClass} value={state.precipitation} onChange={(e) => patch("precipitation", e.target.value)}>
                        <option value="">Select…</option>
                        <option value="Minimal">Minimal</option>
                        <option value="Moderate">Moderate</option>
                        <option value="Heavy">Heavy</option>
                        <option value="Extreme">Extreme</option>
                      </select>
                    </label>
                  </>
                )}
                {sec.id === "fn" && (
                  <>
                    <label className="block text-xs uppercase tracking-wide text-[#8a9099]">
                      Primary function
                      <select className={selectClass} value={state.primaryFunction} onChange={(e) => patch("primaryFunction", e.target.value)}>
                        <option value="">Select…</option>
                        <option value="c2">C2</option>
                        <option value="medical">Medical</option>
                        <option value="maintenance">Maintenance</option>
                        <option value="accommodation">Accommodation</option>
                        <option value="scif">SCIF</option>
                        <option value="logistics">Logistics</option>
                      </select>
                    </label>
                    <label className="block text-xs uppercase tracking-wide text-[#8a9099]">
                      Secondary function (optional)
                      <select className={selectClass} value={state.secondaryFunction} onChange={(e) => patch("secondaryFunction", e.target.value)}>
                        <option value="">None</option>
                        <option value="c2">C2</option>
                        <option value="medical">Medical</option>
                        <option value="maintenance">Maintenance</option>
                        <option value="accommodation">Accommodation</option>
                        <option value="scif">SCIF</option>
                        <option value="logistics">Logistics</option>
                      </select>
                    </label>
                    <label className="block text-xs uppercase tracking-wide text-[#8a9099]">
                      Classification
                      <select className={selectClass} value={state.classification} onChange={(e) => patch("classification", e.target.value)}>
                        <option value="">Select…</option>
                        <option value="Unclassified">Unclassified</option>
                        <option value="CUI">CUI</option>
                        <option value="Secret">Secret</option>
                        <option value="TS/SCI">TS/SCI</option>
                      </select>
                    </label>
                    <label className="block text-xs uppercase tracking-wide text-[#8a9099]">
                      Personnel count
                      <input type="number" min={1} className={inputClass} value={state.personnelCount} onChange={(e) => patch("personnelCount", e.target.value)} />
                    </label>
                  </>
                )}
                {sec.id === "mob" && (
                  <>
                    <label className="block text-xs uppercase tracking-wide text-[#8a9099]">
                      Primary transport
                      <select className={selectClass} value={state.primaryTransport} onChange={(e) => patch("primaryTransport", e.target.value)}>
                        <option value="">Select…</option>
                        <option value="c130">C-130</option>
                        <option value="ch47">CH-47</option>
                        <option value="ground">Ground vehicle</option>
                        <option value="iso">ISO Container</option>
                        <option value="lapes">LAPES</option>
                      </select>
                    </label>
                    <label className="block text-xs uppercase tracking-wide text-[#8a9099]">
                      Secondary transport (optional)
                      <select className={selectClass} value={state.secondaryTransport} onChange={(e) => patch("secondaryTransport", e.target.value)}>
                        <option value="">None</option>
                        <option value="c130">C-130</option>
                        <option value="ch47">CH-47</option>
                        <option value="ground">Ground vehicle</option>
                        <option value="iso">ISO Container</option>
                        <option value="lapes">LAPES</option>
                      </select>
                    </label>
                    <label className="block text-xs uppercase tracking-wide text-[#8a9099]">
                      Max package weight (lbs)
                      <input type="number" className={inputClass} value={state.maxWeight} onChange={(e) => patch("maxWeight", e.target.value)} />
                    </label>
                    <p className="text-xs uppercase tracking-wide text-[#8a9099]">Max package dimensions (ft)</p>
                    <div className="grid grid-cols-3 gap-3">
                      <input placeholder="L" className={inputClass} value={state.dimLength} onChange={(e) => patch("dimLength", e.target.value)} />
                      <input placeholder="W" className={inputClass} value={state.dimWidth} onChange={(e) => patch("dimWidth", e.target.value)} />
                      <input placeholder="H" className={inputClass} value={state.dimHeight} onChange={(e) => patch("dimHeight", e.target.value)} />
                    </div>
                  </>
                )}
                {sec.id === "time" && (
                  <>
                    <label className="block text-xs uppercase tracking-wide text-[#8a9099]">
                      Required fielding date
                      <input type="date" className={inputClass} value={state.fieldingDate} onChange={(e) => patch("fieldingDate", e.target.value)} />
                    </label>
                    <label className="block text-xs uppercase tracking-wide text-[#8a9099]">
                      Setup time available
                      <select className={selectClass} value={state.setupTime} onChange={(e) => patch("setupTime", e.target.value)}>
                        <option value="">Select…</option>
                        <option value="under2">Under 2 hours</option>
                        <option value="2-8">2–8 hours</option>
                        <option value="8-24">8–24 hours</option>
                        <option value="24-72">24–72 hours</option>
                        <option value="7plus">7+ days</option>
                      </select>
                    </label>
                    <label className="block text-xs uppercase tracking-wide text-[#8a9099]">
                      Duration of deployment
                      <select className={selectClass} value={state.deploymentDuration} onChange={(e) => patch("deploymentDuration", e.target.value)}>
                        <option value="">Select…</option>
                        <option value="72h">72 hours</option>
                        <option value="30d">30 days</option>
                        <option value="90d">90 days</option>
                        <option value="6months">6 months</option>
                        <option value="12plus">12+ months</option>
                      </select>
                    </label>
                    <label className="block text-xs uppercase tracking-wide text-[#8a9099]">
                      Resupply frequency
                      <select className={selectClass} value={state.resupplyFrequency} onChange={(e) => patch("resupplyFrequency", e.target.value)}>
                        <option value="">Select…</option>
                        <option value="Daily">Daily</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Monthly">Monthly</option>
                        <option value="Austere">Austere / minimal</option>
                      </select>
                    </label>
                  </>
                )}
                {sec.id === "power" && (
                  <>
                    <label className="block text-xs uppercase tracking-wide text-[#8a9099]">
                      Power source
                      <select className={selectClass} value={state.powerSource} onChange={(e) => patch("powerSource", e.target.value)}>
                        <option value="">Select…</option>
                        <option value="Generator">Generator</option>
                        <option value="Shore power">Shore power</option>
                        <option value="Solar">Solar</option>
                        <option value="Hybrid">Hybrid</option>
                      </select>
                    </label>
                    <label className="block text-xs uppercase tracking-wide text-[#8a9099]">
                      Power requirement (kW)
                      <input type="number" className={inputClass} value={state.powerKw} onChange={(e) => patch("powerKw", e.target.value)} />
                    </label>
                    <label className="flex items-center gap-3 text-sm text-white">
                      <input type="checkbox" checked={state.ecuRequired} onChange={(e) => patch("ecuRequired", e.target.checked)} className="h-4 w-4" />
                      ECU required
                    </label>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="text-xs uppercase tracking-wide text-[#8a9099]">
                        Climate min °F
                        <input type="number" className={inputClass} value={state.climateMin} onChange={(e) => patch("climateMin", e.target.value)} />
                      </label>
                      <label className="text-xs uppercase tracking-wide text-[#8a9099]">
                        Climate max °F
                        <input type="number" className={inputClass} value={state.climateMax} onChange={(e) => patch("climateMax", e.target.value)} />
                      </label>
                    </div>
                  </>
                )}
                {sec.id === "extra" && (
                  <>
                    <p className="text-xs uppercase tracking-wide text-[#8a9099]">Special requirements</p>
                    <div className="space-y-2">
                      {SPECIAL_OPTS.map((opt) => (
                        <label key={opt} className="flex items-center gap-3 text-sm text-white">
                          <input
                            type="checkbox"
                            checked={state.specialRequirements.includes(opt)}
                            onChange={() => toggleSpecial(opt)}
                            className="h-4 w-4"
                          />
                          {opt}
                        </label>
                      ))}
                    </div>
                    <label className="block text-xs uppercase tracking-wide text-[#8a9099]">
                      Notes
                      <textarea rows={4} className={`${inputClass} min-h-[100px] resize-y`} value={state.notes} onChange={(e) => patch("notes", e.target.value)} />
                    </label>
                    <p className="text-[13px] text-[#8a9099]">
                      Technical documents can be shared during the follow-on exchange.
                    </p>
                  </>
                )}
              </Section>
            ))}
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="border border-[rgba(255,255,255,0.08)] bg-[#0d0f12] p-6">
              <p className="wh-label text-[#c8a96e]">Your mission profile</p>
              {summary.length === 0 ? (
                <p className="mt-4 text-sm text-[#8a9099]">Complete sections to build your profile summary.</p>
              ) : (
                <ul className="mt-4 space-y-2 text-sm">
                  {summary.map((row) => (
                    <li key={row.label} className="flex justify-between gap-4 border-b border-white/[0.06] py-2">
                      <span className="text-[#8a9099]">{row.label}</span>
                      <span className="text-right text-white">{row.value}</span>
                    </li>
                  ))}
                </ul>
              )}

              <p className="wh-label mt-8 text-[#c8a96e]">Recommended systems</p>
              <div className="mt-4 space-y-3">
                {recommended.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/configurable-solutions/${p.slug}`}
                    className="block border border-[rgba(255,255,255,0.08)] bg-[#080a0c] p-4 no-underline transition hover:border-[rgba(255,255,255,0.2)]"
                  >
                    <p className="font-mono text-[10px] text-[#c8a96e]">{p.code}</p>
                    <p className="mt-1 text-sm font-medium text-white">{p.name}</p>
                  </Link>
                ))}
              </div>

              <div className="mt-8 space-y-4 border-t border-white/[0.08] pt-6">
                <label className="block text-xs uppercase tracking-wide text-[#8a9099]">
                  Contact name
                  <input className={inputClass} value={state.contactName} onChange={(e) => patch("contactName", e.target.value)} required />
                </label>
                <label className="block text-xs uppercase tracking-wide text-[#8a9099]">
                  Organization
                  <input className={inputClass} value={state.contactOrg} onChange={(e) => patch("contactOrg", e.target.value)} required />
                </label>
                <label className="block text-xs uppercase tracking-wide text-[#8a9099]">
                  Official email
                  <input type="email" className={inputClass} value={state.contactEmail} onChange={(e) => patch("contactEmail", e.target.value)} required />
                </label>
              </div>

              {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

              <button
                type="button"
                disabled={submitting}
                onClick={() => void handleSubmit()}
                className="mt-6 flex min-h-11 w-full items-center justify-center border-0 bg-white py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-[rgba(255,255,255,0.85)] disabled:opacity-60"
              >
                {submitting ? "Submitting…" : "Submit mission profile"}
              </button>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
