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
      <div className="rounded-sm border border-zinc-800/80 bg-gradient-to-b from-zinc-900/40 to-zinc-950 p-6 sm:p-8 lg:col-span-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-lg font-semibold tracking-tight text-zinc-50">
              Mission Solution Builder
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-500">
              Start from mission narrative, environment, team size, and power baseline—then synthesize
              a notional package. Outputs support solution workshops; they are unclassified and not
              procurement records.
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
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Crew size (notional)</p>
              <p className="font-display text-2xl font-semibold tabular-nums text-zinc-50">{crew}</p>
            </div>
            <input
              type="range"
              min={8}
              max={80}
              step={4}
              value={crew}
              onChange={(e) => setCrew(Number(e.target.value))}
              className="mt-3 w-full accent-amber-600"
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
          className="mt-10 w-full rounded-sm bg-amber-500 py-3.5 text-sm font-semibold uppercase tracking-wide text-zinc-950 shadow-[0_0_0_1px_rgb(245_158_11/0.35)] transition duration-200 hover:bg-amber-400 active:scale-[0.99]"
        >
          Generate mission solution brief
        </button>
        {stale && generated && (
          <p className="mt-3 text-center text-xs text-amber-500/90">Inputs updated — generate again to refresh.</p>
        )}
      </div>

      <div className="lg:col-span-7">
        {!generated || !brief ? (
          <div className="relative flex min-h-[320px] flex-col justify-center overflow-hidden rounded-sm border border-zinc-800/80 bg-zinc-950/50 p-10 text-center lg:min-h-[420px]">
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
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                Mission solution brief
              </p>
              <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-zinc-400">
                Define mission, theater, power, and force size—then generate a structured brief: mission
                package, shelter approach, power baseline, environment, and sustainment notes.
              </p>
            </div>
          </div>
        ) : (
          <div
            key={briefId ?? "brief"}
            className="wh-brief-in overflow-hidden rounded-sm border border-zinc-700/50 bg-gradient-to-br from-zinc-900/90 via-zinc-950 to-black shadow-[0_32px_80px_-40px_rgb(0_0_0/0.9),inset_0_1px_0_rgb(255_255_255/0.04)]"
          >
            <div className="border-b border-zinc-800/90 bg-black/40 px-6 py-5 sm:px-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                    Weatherhaven Resource Inc.
                  </p>
                  <h3 className="font-display mt-2 text-xl font-semibold tracking-tight text-zinc-50 sm:text-2xl">
                    Mission solution brief
                  </h3>
                </div>
                <div className="text-right font-mono text-[11px] leading-relaxed text-zinc-500">
                  <p className="text-zinc-400">{briefId}</p>
                  <p className="mt-1">{stamp}</p>
                  <p className="mt-2 text-amber-600/90">Unclassified · advisory only</p>
                </div>
              </div>
            </div>

            <div className="space-y-0 divide-y divide-zinc-800/80 px-6 sm:px-8">
              <OutputRow
                k="01"
                title="Recommended mission package"
                body={
                  <p className="text-sm leading-relaxed text-zinc-300">{brief.recommendedMissionPackage}</p>
                }
              />
              <OutputRow
                k="02"
                title="Shelter / system approach"
                body={
                  <p className="text-sm leading-relaxed text-zinc-300">{brief.shelterSystemApproach}</p>
                }
              />
              <OutputRow
                k="03"
                title="Power baseline"
                body={<p className="text-sm leading-relaxed text-zinc-300">{brief.powerBaseline}</p>}
              />
              <OutputRow
                k="04"
                title="Environmental considerations"
                body={
                  <p className="text-sm leading-relaxed text-zinc-300">{brief.environmentalConsiderations}</p>
                }
              />
              <OutputRow
                k="05"
                title="Sustainment & support notes"
                body={
                  <ul className="list-none space-y-2.5 text-sm leading-relaxed text-zinc-300">
                    {brief.sustainmentSupportNotes.map((line) => (
                      <li key={line} className="flex gap-3">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber-500/80" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                }
              />
            </div>

            <div className="border-t border-zinc-800/80 bg-zinc-950/80 px-6 py-6 sm:flex sm:items-center sm:justify-between sm:px-8 sm:py-7">
              <p className="max-w-lg text-xs leading-relaxed text-zinc-500">
                Next step: align this outline with engineering validation, program constraints, and
                controlled disclosure for theater-specific detail.
              </p>
              <Link
                href="/request-access"
                className="mt-4 inline-flex shrink-0 items-center justify-center rounded-sm bg-amber-500 px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-zinc-950 transition hover:bg-amber-400 sm:mt-0"
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
    <div className="grid gap-4 py-6 sm:grid-cols-[7rem_1fr] sm:gap-8 sm:py-7">
      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-600">{k}</p>
      <div>
        <h4 className="font-display text-base font-semibold tracking-tight text-zinc-100">{title}</h4>
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
                  ? "border-amber-500/60 bg-amber-950/20 shadow-[inset_0_0_0_1px_rgb(245_158_11/0.15)]"
                  : "border-zinc-800/90 bg-zinc-950/50 hover:border-zinc-600/80 hover:bg-zinc-900/50"
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
