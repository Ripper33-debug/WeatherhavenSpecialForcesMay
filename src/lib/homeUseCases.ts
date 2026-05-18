export type UseCaseSpec = {
  label: string;
  value: string;
};

export type UseCaseCard = {
  tag: string;
  title: string;
  desc: string;
  paragraphs: string[];
  specs: UseCaseSpec[];
  learnMoreHref: string;
  specSheetHref: string;
};

export const HOME_USE_CASES: UseCaseCard[] = [
  {
    tag: "C2 / SOF",
    title: "Command Posts",
    desc: "Planning, comms, and blackout-capable command envelopes.",
    paragraphs: [
      "Forward command posts require disciplined circulation between planning, communications, and visitor paths—without sacrificing blackout or emissions discipline.",
      "Weatherhaven composes soft-wall and rigid cells with utility spines sized to staff count, comms rack density, and map-wall requirements derived from your CONOPS.",
      "Power and data distribution are staged for tactical gen-sets or hybrid microgrids, with branch panels and raceway paths validated against maintenance echelons.",
      "Layouts support rapid emplacement, vestibule airlocks for environmental control, and future kit growth inside validated subsystem boundaries.",
    ],
    specs: [
      { label: "Typical footprint", value: "2.4–6k ft² conditioned (planning-level)" },
      { label: "Personnel supported", value: "12–48 staff (mission-dependent)" },
      { label: "Transport method", value: "C-130 / CH-47 palletized modules" },
      { label: "Climate rating", value: "Arctic through desert bands" },
      { label: "Setup time", value: "4–12 hours trained crew (site-class dependent)" },
      { label: "Power requirement", value: "15–45 kW tactical baseline (notional)" },
    ],
    learnMoreHref: "/capabilities",
    specSheetHref: "/resources",
  },
  {
    tag: "EXPEDITIONARY",
    title: "Mobile Operations",
    desc: "Displacement-friendly footprints for forward teams.",
    paragraphs: [
      "Small teams operating at the edge need footprints that pack tight, lift on common tactical airframes, and reconstitute without specialist crews.",
      "Configurations emphasize modular cells, minimal crane dependency, and anchoring kits matched to dispersed or high-altitude sites.",
      "Environmental control is split or staged to keep sensible loads manageable when power is constrained.",
      "Sustainment planning includes spares, ballast, and cable derating assumptions captured in the advisory brief—not afterthought line items.",
    ],
    specs: [
      { label: "Typical footprint", value: "1.2–2.4k ft² expeditionary cluster" },
      { label: "Personnel supported", value: "6–18 operators" },
      { label: "Transport method", value: "Helicopter sling / vehicle tow" },
      { label: "Climate rating", value: "Mountain and maritime kits available" },
      { label: "Setup time", value: "2–6 hours (nominal)" },
      { label: "Power requirement", value: "8–20 kW (notional)" },
    ],
    learnMoreHref: "/configurable-solutions",
    specSheetHref: "/resources",
  },
  {
    tag: "BASE INFRASTRUCTURE",
    title: "Expeditionary Base Camps",
    desc: "Utilities, circulation, and sustainment sequenced to tempo.",
    paragraphs: [
      "Base camps integrate berthing, maintenance, medical, and command cells with shared utility loops—not isolated SKUs dropped on a pad.",
      "Master circulation separates fuel, maintenance, and life-support traffic while keeping ECU yards and PDU staging accessible for sustainment.",
      "Phased emplacement aligns with lift windows, shore power cutover, and training touchpoints for acceptance.",
      "Documentation and spares recommendations scale to utilization and environmental exposure between resupply cycles.",
    ],
    specs: [
      { label: "Typical footprint", value: "8–12k ft² multi-bay campus (planning-level)" },
      { label: "Personnel supported", value: "48–120 personnel" },
      { label: "Transport method", value: "Sea container / multi-lift air" },
      { label: "Climate rating", value: "Full environmental band kits" },
      { label: "Setup time", value: "3–7 days phased (program-dependent)" },
      { label: "Power requirement", value: "60–150 kW campus baseline (notional)" },
    ],
    learnMoreHref: "/configurable-solutions",
    specSheetHref: "/resources",
  },
  {
    tag: "MEDICAL / CASEVAC",
    title: "Medical Shelters",
    desc: "Patient flow and utility chases for field medical roles.",
    paragraphs: [
      "Medical configurations prioritize patient flow with dirty/clean separation, utility chases for racks, and optional negative-pressure kits where programs require them.",
      "ECU and power branches are sized for clinical loads with redundancy goals stated up front—not retrofitted after layout freeze.",
      "Flooring and subfloor packages support decontamination paths and equipment anchoring without compromising cable egress discipline.",
      "Integration workshops align footprint with CASEVAC tempo, staffing, and theater environmental envelopes.",
    ],
    specs: [
      { label: "Typical footprint", value: "1.8–4k ft² clinical envelope" },
      { label: "Personnel supported", value: "8–24 medical staff" },
      { label: "Transport method", value: "Air pallet / ground convoy" },
      { label: "Climate rating", value: "Hot, cold, and maritime ECU splits" },
      { label: "Setup time", value: "6–10 hours (clinical validation separate)" },
      { label: "Power requirement", value: "25–55 kW (notional clinical load)" },
    ],
    learnMoreHref: "/capabilities",
    specSheetHref: "/resources",
  },
  {
    tag: "AVIATION MX",
    title: "Aviation Support",
    desc: "High-bay maintenance envelopes and tool-control zones.",
    paragraphs: [
      "Aviation maintenance shelters combine high-bay clearance, crane-assist options, and separated circulation for fuel handling versus tool control.",
      "Power distribution accounts for hoist loads, lighting bands, and ECU sensible headroom for large open volumes.",
      "Layouts include recovery lanes for disabled equipment and staging for line-replaceable unit flow.",
      "Environmental kits address dust, corrosion, and vestibule sequencing for extreme heat or cold maintenance windows.",
    ],
    specs: [
      { label: "Typical footprint", value: "4–8k ft² high-bay cell" },
      { label: "Personnel supported", value: "16–40 maintainers" },
      { label: "Transport method", value: "C-130 / ground heavy haul" },
      { label: "Climate rating", value: "Desert and cold maintenance bands" },
      { label: "Setup time", value: "8–16 hours with crane assist (optional)" },
      { label: "Power requirement", value: "35–80 kW (notional)" },
    ],
    learnMoreHref: "/configurable-solutions",
    specSheetHref: "/resources",
  },
  {
    tag: "SUSTAINMENT",
    title: "Remote Logistics",
    desc: "Staging, power, and spares aligned to resupply reality.",
    paragraphs: [
      "Remote logistics nodes stage power, environmental control, and shelter for parts, fuels, and spares without becoming signature magnets.",
      "Configurations emphasize pallet discipline, piece weights compatible with tactical lift, and corrosion-aware hardware for littoral sites.",
      "Utility spines allow growth from single-cell staging to multi-bay sustainment campuses as tempo increases.",
      "Workshop outputs capture resupply cadence, environmental exposure, and maintenance echelon training needs.",
    ],
    specs: [
      { label: "Typical footprint", value: "1.5–3.5k ft² staging cluster" },
      { label: "Personnel supported", value: "6–20 logistics staff" },
      { label: "Transport method", value: "Sea container / sling load" },
      { label: "Climate rating", value: "Maritime corrosion kit standard" },
      { label: "Setup time", value: "3–8 hours (nominal)" },
      { label: "Power requirement", value: "12–30 kW (notional)" },
    ],
    learnMoreHref: "/configurable-solutions",
    specSheetHref: "/resources",
  },
];
