"use client";

import Link from "next/link";
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

function configurationRef() {
  const a =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID().replace(/-/g, "").slice(0, 8).toUpperCase()
      : Math.random().toString(36).slice(2, 10).toUpperCase();
  return `WH-MSB-${a}`;
}

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
    setBriefId(configurationRef());
    setGeneratedAt(new Date().toISOString());
    setInputSnapshot({ mission, climate, power, crew });
    setGenerated(true);
  }

  const stamp = generatedAt ? new Date(generatedAt).toUTCString().replace(" GMT", " · Zulu") : "—";

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      <div className="rounded-2xl border border-white/[0.1] bg-zinc-950/40 p-6 sm:p-8 lg:col-span-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="wh-label text-zinc-600">Advisory workspace</p>
            <h3 className="font-display mt-3 text-lg font-semibold tracking-tight text-white">
              Mission Solution Builder
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-500">
              Start from mission profile, environment, team size, and power baseline—then synthesize a notional advisory
              brief. Outputs support solution workshops; they are unclassified and not procurement records.
            </p>
          </div>
        </div>

        <div className="mt-9 space-y-8">
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
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Personnel baseline (notional)</p>
              <p className="font-display text-2xl font-semibold tabular-nums text-zinc-50">{crew}</p>
            </div>
            <input
              type="range"
              min={8}
              max={80}
              step={4}
              value={crew}
              onChange={(e) => setCrew(Number(e.target.value))}
              className="mt-3 w-full accent-zinc-400"
              aria-valuemin={8}
              aria-valuemax={80}
              aria-valuenow={crew}
            />
            <p className="mt-2 text-xs text-zinc-600">Informs footprint class, logistics, and sustainment load.</p>
          </div>
        </div>

        <button
          type="button"
          onClick={generate}
          className="wh-cta mt-10 w-full border border-white bg-white py-3.5 text-black transition hover:bg-zinc-100 active:scale-[0.99]"
        >
          Generate configuration advisory brief
        </button>
        {stale && generated && (
          <p className="mt-3 text-center text-xs text-zinc-500">Inputs updated — generate again to refresh.</p>
        )}
      </div>

      <div className="lg:col-span-7">
        {!generated || !brief ? (
          <div className="relative flex min-h-[320px] flex-col justify-center overflow-hidden rounded-2xl border border-white/[0.08] bg-zinc-950/50 p-10 text-center lg:min-h-[420px]">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgb(161 161 170) 1px, transparent 1px), linear-gradient(to bottom, rgb(161 161 170) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-900/30 to-black/60" />
            <div className="relative">
              <p className="wh-label text-zinc-600">Configuration advisory brief</p>
              <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-zinc-400">
                Define mission, theater, power, and force size—then generate a structured brief: advisory summary,
                recommended starting point, mission package, shelter and system integration, layout and flooring, building
                blocks, power, environment, sustainment, and next steps.
              </p>
            </div>
          </div>
        ) : (
          <div
            key={briefId ?? "brief"}
            className="wh-brief-in overflow-hidden rounded-2xl border border-white/[0.1] bg-gradient-to-br from-zinc-900/90 via-zinc-950 to-black shadow-[0_32px_80px_-40px_rgb(0_0_0/0.9)]"
          >
            <div className="border-b border-white/[0.08] bg-black/40 px-6 py-5 sm:px-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="wh-label text-zinc-600">Weatherhaven Resource Inc.</p>
                  <h3 className="font-display mt-3 text-xl font-semibold tracking-tight text-white sm:text-2xl">
                    Configuration advisory brief
                  </h3>
                </div>
                <div className="text-right text-[11px] leading-relaxed text-zinc-500">
                  <p className="font-mono text-zinc-400">{briefId}</p>
                  <p className="mt-1 font-mono">{stamp}</p>
                  <p className="mt-2 font-mono text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                    Unclassified · advisory only
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-0 divide-y divide-white/[0.08] px-6 sm:px-8">
              <OutputRow
                k="A"
                title="Configuration advisory summary"
                body={<p className="text-sm leading-relaxed text-zinc-300">{brief.advisoryExecutiveSummary}</p>}
              />
              <OutputRow
                k="B"
                title="Recommended starting point"
                body={<p className="text-sm leading-relaxed text-zinc-300">{brief.recommendedStartingPoint}</p>}
              />
              <OutputRow
                k="C"
                title="Recommended mission package"
                body={<p className="text-sm leading-relaxed text-zinc-300">{brief.recommendedMissionPackage}</p>}
              />
              <OutputRow
                k="D"
                title="Shelter & system integration approach"
                body={<p className="text-sm leading-relaxed text-zinc-300">{brief.shelterSystemApproach}</p>}
              />
              <OutputRow
                k="E"
                title="Layout, flooring & circulation engineering"
                body={<p className="text-sm leading-relaxed text-zinc-300">{brief.layoutFlooringEngineering}</p>}
              />
              <OutputRow
                k="F"
                title="Configuration building blocks"
                body={
                  <ul className="list-none space-y-2 text-sm leading-relaxed text-zinc-300">
                    {brief.configurationBuildingBlocks.map((line) => (
                      <li key={line} className="flex gap-3">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white/50" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                }
              />
              <OutputRow
                k="G"
                title="Power & distribution baseline"
                body={<p className="text-sm leading-relaxed text-zinc-300">{brief.powerBaseline}</p>}
              />
              <OutputRow
                k="H"
                title="Environmental envelope"
                body={<p className="text-sm leading-relaxed text-zinc-300">{brief.environmentalConsiderations}</p>}
              />
              <OutputRow
                k="I"
                title="Sustainment & logistics"
                body={
                  <ul className="list-none space-y-2.5 text-sm leading-relaxed text-zinc-300">
                    {brief.sustainmentSupportNotes.map((line) => (
                      <li key={line} className="flex gap-3">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white/50" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                }
              />
            </div>

            <div className="border-t border-white/[0.08] bg-zinc-950/80 px-6 py-6 sm:flex sm:items-center sm:justify-between sm:gap-8 sm:px-8 sm:py-7">
              <p className="max-w-xl text-sm leading-relaxed text-zinc-400">{brief.nextStepCta}</p>
              <Link
                href="/request-access"
                className="wh-cta mt-4 inline-flex shrink-0 items-center justify-center border border-white bg-white px-5 py-2.5 text-black transition hover:bg-zinc-100 sm:mt-0"
              >
                Request technical exchange
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function OutputRow({
  k,
  title,
  body,
}: {
  k: string;
  title: string;
  body: React.ReactNode;
}) {
  return (
    <div className="grid gap-4 py-6 sm:grid-cols-[4rem_1fr] sm:gap-8 sm:py-7">
      <p className="text-[11px] font-semibold tabular-nums text-zinc-600">{k}</p>
      <div>
        <h4 className="font-display text-base font-semibold tracking-tight text-white">{title}</h4>
        <div className="mt-3">{body}</div>
      </div>
    </div>
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
      <p className="wh-label text-zinc-600">{label}</p>
      <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {options.map((opt) => {
          const active = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={`rounded-xl border px-3 py-3 text-left transition duration-200 sm:min-h-[88px] ${
                active
                  ? "border-white bg-white/[0.06] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.2)]"
                  : "border-white/[0.08] bg-black/40 hover:border-white/[0.18] hover:bg-white/[0.04]"
              }`}
            >
              <span className={`block text-sm font-semibold ${active ? "text-white" : "text-zinc-200"}`}>
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
