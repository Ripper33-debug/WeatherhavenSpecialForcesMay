export type Mission = "fad" | "training" | "hq" | "medical";
export type Climate = "hot" | "cold" | "maritime" | "mountain";
export type Power = "grid" | "tactical" | "hybrid";

export type BriefInputs = {
  mission: Mission;
  climate: Climate;
  power: Power;
  crew: number;
};

const missionTitle: Record<Mission, string> = {
  fad: "Forward support / refueling operations",
  training: "Training & certification",
  hq: "Command & planning",
  medical: "Medical & stabilization",
};

const climateTitle: Record<Climate, string> = {
  hot: "Hot / arid",
  cold: "Cold / high latitude",
  maritime: "Maritime / littoral",
  mountain: "Mountain / dispersed",
};

const powerTitle: Record<Power, string> = {
  grid: "Shore / grid tie",
  tactical: "Tactical generators",
  hybrid: "Hybrid microgrid",
};

/** Illustrative, unclassified sample brief for the ENT 4943 / demo configurator. */
export function buildConfiguratorBrief(i: BriefInputs) {
  const mission = missionTitle[i.mission];
  const environment = climateTitle[i.climate];
  const power = powerTitle[i.power];
  const crew = i.crew;

  const footprintLabel =
    crew <= 12
      ? "Alpha — soft-wall cluster (2–3 cells + utility spine)"
      : crew <= 36
        ? "Bravo — rigid-frame spine (4–6 cells + ECU yard)"
        : "Charlie — multi-bay campus (redundant utility loops)";

  const notionalCells = crew <= 12 ? "2–3" : crew <= 36 ? "4–6" : "7–10";
  const notionalFloor =
    crew <= 12
      ? "≈1.8–2.4k ft² conditioned (illustrative order-of-magnitude for planning)"
      : crew <= 36
        ? "≈4–6k ft² conditioned (illustrative order-of-magnitude for planning)"
        : "≈8–12k ft² conditioned (illustrative order-of-magnitude for planning)";

  const envKit =
    i.climate === "cold"
      ? "Insulated envelope package, snow-load hardware set, vestibule airlocks, ECU winterization kit."
      : i.climate === "maritime"
        ? "Corrosion-resistant exterior hardware, elevated subfloor, cable drip loops, dehumidification assist."
        : i.climate === "mountain"
          ? "Anchoring kit, wind bracing schedule, split ECU zoning for ridge-line temperature swings."
          : "Solar shading package, dust mitigation at vestibules, expanded ECU sensible-load headroom.";

  const pwrArch =
    i.power === "hybrid"
      ? "Hybrid stack: tactical gen-set + battery storage, inverter staging, prioritized shed list for silent hours."
      : i.power === "grid"
        ? "Shore interconnect: main PDU, branch panels, surge isolation, ground reference plan for equipment racks."
        : "Tactical power: parallel gen-set concept, refuel window planning, cable derating assumptions for dust/heat.";

  const missionAlignment =
    i.mission === "fad"
      ? "Circulation separated for fuel handling vs maintenance; recovery lane for disabled equipment; crane-assisted bay option if lift is available."
      : i.mission === "medical"
        ? "Patient flow with dirty/clean separation; utility chase for medical racks; optional negative-pressure kit (program-dependent)."
        : i.mission === "hq"
          ? "Planning wall backing, comms alcove acoustic treatment, controlled visitor path, raceway discipline for future kit."
          : "Observer lanes, AAR room footprint, secure equipment stow—aligned to training throughput, not operational tempo.";

  const bomSample = [
    `Deployable shelter cells ×${notionalCells} (${footprintLabel})`,
    "Subfloor / leveling package (site-class dependent)",
    "ECU pair or split package per environmental band",
    i.power === "hybrid" ? "Battery enclosure + inverter skid (notional)" : "PDU / panel package per power baseline",
    "Interior lighting (tactical + maintenance lux bands)",
    "Anchoring / ballast consumables per environment kit",
  ];

  const logistics =
    i.climate === "maritime"
      ? "Seaworthy crating assumptions; corrosion inspection checklist on receipt; staged shore power cutover plan."
      : "Palletized movement plan with max piece weight called out for common tactical lift classes (illustrative).";

  const exec = `Notional advisory for ${mission.toLowerCase()} in a ${environment.toLowerCase()} band with ${power.toLowerCase()} and a crew baseline of ${crew}. This brief packages footprint class, environmental and power kits, and mission-specific layout notes for an internal workshop—not a proposal, BOM authority, or safety sign-off.`;

  const phases = [
    { t: "Phase 0 — Site recon (unclassified)", d: "Confirm access routes, crane points if used, and grounding strategy." },
    { t: "Phase 1 — Emplacement (Day 0–1)", d: "Lay subfloor grid, set primary cells, establish temporary power if required." },
    { t: "Phase 2 — Close-in (Day 1–2)", d: "ECU tie-in, PDU energization, vestibule and circulation hardening." },
    { t: "Phase 3 — Acceptance", d: "Functional checks, training touchpoint, punch list for engineering review." },
  ];

  const risks = [
    "Illustrative timelines assume trained crews and nominal weather windows.",
    "Environmental loads are described qualitatively; engineering validation is required before procurement.",
    "Power and ECU selections are not substitutes for nameplate verification or on-site survey.",
  ];

  return {
    mission,
    environment,
    power,
    crew,
    footprintLabel,
    notionalFloor,
    envKit,
    pwrArch,
    missionAlignment,
    bomSample,
    logistics,
    exec,
    phases,
    risks,
  };
}
