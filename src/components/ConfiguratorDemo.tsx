"use client";

import { useMemo, useState } from "react";

type Mission = "fad" | "training" | "hq" | "medical";
type Climate = "hot" | "cold" | "maritime" | "mountain";
type Power = "grid" | "tactical" | "hybrid";

const missionLabels: Record<Mission, string> = {
  fad: "Forward arming & refueling",
  training: "Training & certification",
  hq: "Command & planning",
  medical: "Medical & stabilization",
};

const climateLabels: Record<Climate, string> = {
  hot: "Hot / arid",
  cold: "Cold / high latitude",
  maritime: "Maritime / littoral",
  mountain: "Mountain / dispersed",
};

const powerLabels: Record<Power, string> = {
  grid: "Grid / shore power",
  tactical: "Tactical generators",
  hybrid: "Hybrid microgrid",
};

export function ConfiguratorDemo() {
  const [mission, setMission] = useState<Mission>("fad");
  const [climate, setClimate] = useState<Climate>("hot");
  const [power, setPower] = useState<Power>("tactical");
  const [crew, setCrew] = useState(24);
  const [generated, setGenerated] = useState(false);

  const summary = useMemo(() => {
    const shelter =
      crew <= 12
        ? "Expeditionary soft-wall package (12 pax)"
        : crew <= 36
          ? "Modular rigid-frame cluster (24–36 pax)"
          : "Multi-cell deployable campus (36+ pax)";
    const env =
      climate === "cold"
        ? "Insulated envelope, snow load kit, vestibule airlock"
        : climate === "maritime"
          ? "Corrosion-resistant hardware, elevated flooring"
          : climate === "mountain"
            ? "Anchoring package, wind bracing, split HVAC"
            : "Solar shading, dust mitigation, expanded ECUs";
    const pwr =
      power === "hybrid"
        ? "Battery storage + tactical gen-set, load management"
        : power === "grid"
          ? "PDU distribution, surge isolation, shore tie-in"
          : "Deployable gen-set bank, silent hours profile";
    const missionNote =
      mission === "fad"
        ? "High-throughput circulation, fuel handling separation, blast standoff planning"
        : mission === "medical"
          ? "Patient flow lanes, negative pressure option, clean utility chase"
          : mission === "hq"
            ? "Secure comms alcove, map wall structural backing, SCIF-ready raceways"
            : "Observer lanes, after-action review space, equipment stow";
    return { shelter, env, pwr, missionNote };
  }, [mission, climate, power, crew]);

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/30 p-6 sm:p-8">
        <h3 className="text-lg font-semibold text-zinc-100">Mission parameters</h3>
        <p className="mt-2 text-sm text-zinc-500">
          Representative inputs for a notional configuration. Outputs are illustrative and
          subject to engineering review.
        </p>
        <div className="mt-8 space-y-6">
          <Field label="Mission profile">
            <select
              className={selectClass}
              value={mission}
              onChange={(e) => setMission(e.target.value as Mission)}
            >
              {(Object.keys(missionLabels) as Mission[]).map((k) => (
                <option key={k} value={k}>
                  {missionLabels[k]}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Operating environment">
            <select
              className={selectClass}
              value={climate}
              onChange={(e) => setClimate(e.target.value as Climate)}
            >
              {(Object.keys(climateLabels) as Climate[]).map((k) => (
                <option key={k} value={k}>
                  {climateLabels[k]}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Power baseline">
            <select
              className={selectClass}
              value={power}
              onChange={(e) => setPower(e.target.value as Power)}
            >
              {(Object.keys(powerLabels) as Power[]).map((k) => (
                <option key={k} value={k}>
                  {powerLabels[k]}
                </option>
              ))}
            </select>
          </Field>
          <Field label={`Crew size (notional): ${crew}`}>
            <input
              type="range"
              min={8}
              max={80}
              step={4}
              value={crew}
              onChange={(e) => setCrew(Number(e.target.value))}
              className="w-full accent-amber-700"
            />
          </Field>
        </div>
        <button
          type="button"
          onClick={() => setGenerated(true)}
          className="mt-8 w-full rounded-sm bg-amber-700 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-amber-600"
        >
          Generate configuration brief
        </button>
      </div>

      <div className="rounded-lg border border-zinc-800 bg-zinc-950/50 p-6 sm:p-8">
        <h3 className="text-lg font-semibold text-zinc-100">AI-assisted brief</h3>
        <p className="mt-2 text-sm text-zinc-500">
          Rules-based synthesis simulating advisor output. Production systems integrate
          validated load data, codes, and program constraints.
        </p>
        {!generated ? (
          <p className="mt-10 text-sm italic text-zinc-600">
            Adjust parameters and generate a brief to preview the structured recommendation
            format used in customer workshops.
          </p>
        ) : (
          <ul className="mt-8 space-y-5 text-sm leading-relaxed text-zinc-300">
            <li>
              <span className="font-semibold text-zinc-100">Shelter stack: </span>
              {summary.shelter}
            </li>
            <li>
              <span className="font-semibold text-zinc-100">Environmental kit: </span>
              {summary.env}
            </li>
            <li>
              <span className="font-semibold text-zinc-100">Power architecture: </span>
              {summary.pwr}
            </li>
            <li>
              <span className="font-semibold text-zinc-100">Mission alignment: </span>
              {summary.missionNote}
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-medium uppercase tracking-wide text-zinc-500">{label}</label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

const selectClass =
  "w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-sm text-zinc-100 outline-none focus:border-amber-700/50 focus:ring-2 focus:ring-amber-700/20";
