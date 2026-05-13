"use client";

import { useMemo, useState } from "react";
import {
  buildConfiguratorBrief,
  type Climate,
  type Mission,
  type Power,
} from "@/lib/configuratorBrief";

const missionOptions: { value: Mission; title: string; hint: string }[] = [
  { value: "fad", title: "Forward support", hint: "Throughput, circulation, fuel separation planning" },
  { value: "training", title: "Training & certification", hint: "Observer lanes, AAR space, equipment stow" },
  { value: "hq", title: "Command & planning", hint: "Comms alcoves, map walls, structured utility paths" },
  { value: "medical", title: "Medical & stabilization", hint: "Patient flow, utility chases, isolation options" },
];

const climateOptions: { value: Climate; title: string; hint: string }[] = [
  { value: "hot", title: "Hot / arid", hint: "Shading, dust mitigation, expanded sensible loads" },
  { value: "cold", title: "Cold / high latitude", hint: "Insulation, snow load, vestibule airlocks" },
  { value: "maritime", title: "Maritime / littoral", hint: "Corrosion-aware hardware, elevated flooring" },
  { value: "mountain", title: "Mountain / dispersed", hint: "Anchoring, wind bracing, split environmental" },
];

const powerOptions: { value: Power; title: string; hint: string }[] = [
  { value: "tactical", title: "Tactical generators", hint: "Deployable gen-set bank, silent-hours profile" },
  { value: "hybrid", title: "Hybrid microgrid", hint: "Storage + gen-set with staged load management" },
  { value: "grid", title: "Shore / grid tie", hint: "PDU staging, isolation, controlled shore interconnect" },
];

export function ConfiguratorDemo() {
  const [mission, setMission] = useState<Mission>("fad");
  const [climate, setClimate] = useState<Climate>("hot");
  const [power, setPower] = useState<Power>("tactical");
  const [crew, setCrew] = useState(24);
  const [generated, setGenerated] = useState(false);
  const [briefId, setBriefId] = useState<string | null>(null);
  const [generatedAt, setGeneratedAt] = useState<string | null>(null);
  const [inputSnapshot, setInputSnapshot] = useState<{
    mission: Mission;
    climate: Climate;
    power: Power;
    crew: number;
  } | null>(null);

  const stale = useMemo(() => {
    if (!generated || !inputSnapshot) return false;
    return (
      inputSnapshot.mission !== mission ||
      inputSnapshot.climate !== climate ||
      inputSnapshot.power !== power ||
      inputSnapshot.crew !== crew
    );
  }, [generated, inputSnapshot, mission, climate, power, crew]);

  const brief = useMemo(
    () => (inputSnapshot ? buildConfiguratorBrief(inputSnapshot) : null),
    [inputSnapshot],
  );

  function generate() {
    const id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? `DEMO-${crypto.randomUUID().slice(0, 8).toUpperCase()}`
        : `DEMO-${Math.random().toString(36).slice(2, 10).toUpperCase()}`;
    setBriefId(id);
    setGeneratedAt(new Date().toISOString());
    setInputSnapshot({ mission, climate, power, crew });
    setGenerated(true);
  }

  const stamp =
    generatedAt?.replace("T", " ").replace(/\.\d{3}Z$/, "Z") ?? "—";

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
      <div className="rounded-sm border border-zinc-800/90 bg-gradient-to-b from-zinc-900/50 to-zinc-950/80 p-5 shadow-[0_0_0_1px_rgb(24_24_27/0.5)] sm:p-8 lg:col-span-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-lg font-semibold tracking-tight text-zinc-100">
              Interactive demo
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-500">
              Select inputs, then generate a realistic sample brief. Illustrative only—not engineering
              sign-off or procurement authority.
            </p>
          </div>
          <span className="shrink-0 rounded-sm border border-zinc-700/80 bg-zinc-950/80 px-2 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
            Demo
          </span>
        </div>

        <div className="mt-8 space-y-8">
          <OptionGroup
            label="Mission profile"
            options={missionOptions}
            value={mission}
            onChange={(v) => setMission(v)}
          />
          <OptionGroup
            label="Operating environment"
            options={climateOptions}
            value={climate}
            onChange={(v) => setClimate(v)}
          />
          <OptionGroup
            label="Power baseline"
            options={powerOptions}
            value={power}
            onChange={(v) => setPower(v)}
          />
          <div>
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Crew size (notional)</p>
              <p className="font-display text-2xl font-semibold tabular-nums text-zinc-100">{crew}</p>
            </div>
            <input
              type="range"
              min={8}
              max={80}
              step={4}
              value={crew}
              onChange={(e) => setCrew(Number(e.target.value))}
              className="mt-3 w-full accent-amber-700"
              aria-valuemin={8}
              aria-valuemax={80}
              aria-valuenow={crew}
            />
            <p className="mt-2 text-xs text-zinc-600">Scales footprint class and illustrative floor area band.</p>
          </div>
        </div>

        <button
          type="button"
          onClick={generate}
          className="mt-10 w-full rounded-sm bg-amber-600 py-3 text-sm font-semibold uppercase tracking-wide text-zinc-950 shadow-[0_0_0_1px_rgb(180_83_9/0.35)] transition hover:bg-amber-500 active:scale-[0.99] sm:py-3.5"
        >
          Generate configuration brief
        </button>
        {stale && generated && (
          <p className="mt-3 text-center text-xs text-amber-600/90">Inputs changed — generate again to refresh the brief.</p>
        )}
      </div>

      <div className="rounded-sm border border-zinc-800/90 bg-zinc-950/60 p-5 sm:p-8 lg:col-span-7">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800/80 pb-4">
          <h3 className="font-display text-lg font-semibold tracking-tight text-zinc-100">
            Configuration brief
          </h3>
          {briefId && (
            <span className="font-mono text-[11px] font-medium uppercase tracking-wide text-zinc-500">
              Ref {briefId}
            </span>
          )}
        </div>

        {!generated || !brief ? (
          <div className="mt-10 rounded-sm border border-dashed border-zinc-800/90 bg-zinc-950/40 p-8 text-center">
            <p className="text-sm leading-relaxed text-zinc-500">
              Set mission profile, operating environment, power baseline, and crew size—then generate
              a workshop-style sample output.
            </p>
          </div>
        ) : (
          <div key={briefId ?? "brief"} className="wh-brief-in mt-6 space-y-6">
            <div className="rounded-sm border border-zinc-800/80 bg-zinc-950/80 p-4 font-mono text-[11px] leading-relaxed text-zinc-400 sm:text-xs">
              <p className="text-zinc-500">WEATHERHAVEN RESOURCE INC. — CONFIGURATION ADVISORY (DEMONSTRATION)</p>
              <p className="mt-2 text-amber-600/90">UNCLASSIFIED // SAMPLE OUTPUT — NOT FOR PROCUREMENT</p>
              <p className="mt-2 text-zinc-500">Timestamp (UTC): {stamp}</p>
            </div>

            <BriefBlock k="00" title="Executive summary">
              <p className="mt-2">{brief.exec}</p>
            </BriefBlock>

            <BriefBlock k="01" title="Recorded inputs">
              <ul className="mt-2 list-disc space-y-1 pl-4">
                <li>Mission profile: {brief.mission}</li>
                <li>Operating environment: {brief.environment}</li>
                <li>Power baseline: {brief.power}</li>
                <li>Notional crew: {brief.crew}</li>
              </ul>
            </BriefBlock>

            <BriefBlock k="02" title="Footprint & spatial planning (illustrative)">
              <p className="mt-2">
                <span className="font-medium text-zinc-200">Class: </span>
                {brief.footprintLabel}
              </p>
              <p className="mt-2">
                <span className="font-medium text-zinc-200">Notional conditioned area: </span>
                {brief.notionalFloor}
              </p>
            </BriefBlock>

            <BriefBlock k="03" title="Environmental kit">
              <p className="mt-2">{brief.envKit}</p>
            </BriefBlock>

            <BriefBlock k="04" title="Power architecture">
              <p className="mt-2">{brief.pwrArch}</p>
            </BriefBlock>

            <BriefBlock k="05" title="Mission alignment">
              <p className="mt-2">{brief.missionAlignment}</p>
            </BriefBlock>

            <BriefBlock k="06" title="Sample BOM lines (notional SKUs)">
              <ul className="mt-2 list-decimal space-y-1.5 pl-5">
                {brief.bomSample.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </BriefBlock>

            <BriefBlock k="07" title="Logistics & receipt assumptions">
              <p className="mt-2">{brief.logistics}</p>
            </BriefBlock>

            <BriefBlock k="08" title="Deployment phasing (planning-level)">
              <ul className="mt-2 space-y-2">
                {brief.phases.map((ph) => (
                  <li key={ph.t}>
                    <span className="font-medium text-zinc-200">{ph.t}</span>
                    <span className="text-zinc-400"> — {ph.d}</span>
                  </li>
                ))}
              </ul>
            </BriefBlock>

            <BriefBlock k="09" title="Assumptions & limits">
              <ul className="mt-2 list-disc space-y-1 pl-4">
                {brief.risks.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </BriefBlock>

            <BriefBlock k="10" title="Recommended next steps (internal)">
              <ol className="mt-2 list-decimal space-y-1.5 pl-5">
                <li>Validate environmental and electrical assumptions with site survey data.</li>
                <li>Lock option set under formal configuration management.</li>
                <li>Schedule a controlled technical exchange via Request Access if program-specific.</li>
              </ol>
            </BriefBlock>

            <p className="border-t border-zinc-800/80 pt-4 text-xs leading-relaxed text-zinc-500">
              This document is generated for demonstration and ENT 4943 evidence only. Production use
              requires engineering verification, codes, and program constraints.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function BriefBlock({ k, title, children }: { k: string; title: string; children: React.ReactNode }) {
  return (
    <section>
      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-zinc-500">
        Sec {k}
      </p>
      <h4 className="mt-1 font-display text-base font-semibold text-zinc-100">{title}</h4>
      <div className="mt-1 text-sm leading-relaxed text-zinc-300">{children}</div>
    </section>
  );
}

function OptionGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; title: string; hint: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">{label}</p>
      <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {options.map((opt) => {
          const active = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={`rounded-sm border px-3 py-3 text-left transition duration-200 sm:min-h-[88px] ${
                active
                  ? "border-amber-600/70 bg-amber-950/25 shadow-[inset_0_0_0_1px_rgb(180_83_9/0.2)]"
                  : "border-zinc-800/90 bg-zinc-950/40 hover:border-zinc-600/80 hover:bg-zinc-900/50"
              }`}
            >
              <span className={`block text-sm font-semibold ${active ? "text-zinc-50" : "text-zinc-200"}`}>
                {opt.title}
              </span>
              <span className="mt-1 block text-xs leading-snug text-zinc-500">{opt.hint}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
