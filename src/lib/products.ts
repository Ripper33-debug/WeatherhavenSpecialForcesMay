export type ProductFilterMission =
  | "c2"
  | "medical"
  | "maintenance"
  | "accommodation"
  | "logistics"
  | "all";
export type ProductFilterEnvironment =
  | "arctic"
  | "desert"
  | "tropical"
  | "maritime"
  | "highalt"
  | "all";
export type ProductFilterMobility = "c130" | "helicopter" | "ground" | "iso" | "all";
export type ProductFilterSize = "small" | "platoon" | "company" | "battalion" | "all";

export type ProductSpec = { label: string; value: string };

export type CompareSpecKey =
  | "footprint"
  | "personnel"
  | "transport"
  | "setupTime"
  | "climate"
  | "power"
  | "priceRange";

export type Product = {
  slug: string;
  code: string;
  name: string;
  subtitle: string;
  tag: string;
  missionTypes: Exclude<ProductFilterMission, "all">[];
  environments: Exclude<ProductFilterEnvironment, "all">[];
  mobilities: Exclude<ProductFilterMobility, "all">[];
  sizes: Exclude<ProductFilterSize, "all">[];
  description: string;
  overview: string[];
  features: { title: string; description: string }[];
  specs: ProductSpec[];
  compareScores: Record<CompareSpecKey, number>;
  configurations: { title: string; description: string }[];
  downloads: { name: string; type: string; size: string; href: string }[];
  relatedSlugs: string[];
};

export const FILTER_MISSION_OPTIONS = [
  { value: "all", label: "All" },
  { value: "c2", label: "Command & Control" },
  { value: "medical", label: "Medical" },
  { value: "maintenance", label: "Maintenance" },
  { value: "accommodation", label: "Accommodation" },
  { value: "logistics", label: "Logistics" },
] as const;

export const FILTER_ENVIRONMENT_OPTIONS = [
  { value: "all", label: "All" },
  { value: "arctic", label: "Arctic" },
  { value: "desert", label: "Desert" },
  { value: "tropical", label: "Tropical" },
  { value: "maritime", label: "Maritime" },
  { value: "highalt", label: "High Altitude" },
] as const;

export const FILTER_MOBILITY_OPTIONS = [
  { value: "all", label: "All" },
  { value: "c130", label: "C-130" },
  { value: "helicopter", label: "Helicopter" },
  { value: "ground", label: "Ground" },
  { value: "iso", label: "ISO Container" },
] as const;

export const FILTER_SIZE_OPTIONS = [
  { value: "all", label: "All" },
  { value: "small", label: "Small Team" },
  { value: "platoon", label: "Platoon" },
  { value: "company", label: "Company" },
  { value: "battalion", label: "Battalion" },
] as const;

export const COMPARE_SPEC_LABELS: Record<CompareSpecKey, string> = {
  footprint: "Footprint",
  personnel: "Personnel",
  transport: "Transport",
  setupTime: "Setup Time",
  climate: "Climate",
  power: "Power",
  priceRange: "Price Range",
};

export const PRODUCTS: Product[] = [
  {
    slug: "mwss-c2",
    code: "MWSS-C2",
    name: "Mission Warfare Shelter System — Command",
    subtitle: "TOC / JOC deployable command envelope",
    tag: "C2 / SOF",
    missionTypes: ["c2"],
    environments: ["arctic", "desert", "tropical", "highalt"],
    mobilities: ["c130", "helicopter"],
    sizes: ["small", "platoon"],
    description:
      "Modular command post configured for planning, communications, and blackout operations. Composed from mission profile—not a fixed catalog SKU.",
    overview: [
      "The MWSS-C2 family provides a disciplined command envelope for SOF and conventional headquarters elements operating at the edge. Layout engineering separates planning, communications, and visitor circulation before MEP and ECU selections freeze.",
      "Power and data distribution are staged for tactical gen-sets or hybrid microgrids, with branch panels sized to comms rack density and future growth headroom.",
      "Blackout and emissions discipline are treated as configuration building blocks—vestibule sequencing, cable paths, and acoustic treatment scale to program requirements.",
    ],
    features: [
      { title: "Blackout-ready layout", description: "Controlled lighting bands and vestibule airlocks for emissions discipline." },
      { title: "Comms alcoves", description: "Raceway discipline and map-wall backing sized to staff throughput." },
      { title: "Rapid emplacement", description: "Palletized modules compatible with C-130J and CH-47 lift profiles." },
    ],
    specs: [
      { label: "Footprint", value: "2.4–4.8k ft² conditioned (planning-level)" },
      { label: "Personnel", value: "12–32 staff" },
      { label: "Transport", value: "C-130J / CH-47 palletized" },
      { label: "Setup Time", value: "4–12 hours (trained crew)" },
      { label: "Climate Rating", value: "Arctic through desert bands" },
      { label: "Power Requirement", value: "18–35 kW (notional)" },
    ],
    compareScores: { footprint: 6, personnel: 5, transport: 8, setupTime: 8, climate: 7, power: 6, priceRange: 6 },
    configurations: [
      { title: "Alpha TOC — 12 pax", description: "Compact two-cell spine with utility module and single ECU yard." },
      { title: "Bravo TOC — 24 pax", description: "Four-cell layout with separated comms and planning bays." },
      { title: "Blackout package", description: "Enhanced vestibules, light discipline, and emissions control hardware." },
    ],
    downloads: [
      { name: "MWSS-C2 Spec Sheet", type: "PDF", size: "2.4 MB", href: "/resources" },
      { name: "Capabilities Brief — C2", type: "PDF", size: "4.1 MB", href: "/resources" },
      { name: "Layout Drawing — TOC", type: "DWG", size: "8.2 MB", href: "/resources" },
    ],
    relatedSlugs: ["rads-12", "scif-mod", "power-int"],
  },
  {
    slug: "mwss-med",
    code: "MWSS-MED",
    name: "Mobile Medical Shelter",
    subtitle: "Role 1/2 treatment and CASEVAC staging",
    tag: "MEDICAL / CASEVAC",
    missionTypes: ["medical"],
    environments: ["desert", "tropical", "tropical", "maritime"],
    mobilities: ["c130", "ground", "helicopter"],
    sizes: ["small", "platoon"],
    description:
      "Field medical shelter with patient flow separation, utility chases, and clinical load power branches sized to Role 1/2 throughput.",
    overview: [
      "MWSS-MED configurations prioritize dirty/clean separation, utility chases for medical racks, and ECU redundancy goals stated during mission workshops—not retrofitted after layout freeze.",
      "Flooring and subfloor packages support decontamination paths and equipment anchoring without compromising cable egress discipline.",
      "Integration with CASEVAC tempo, staffing models, and theater environmental envelopes drives final cell count and power architecture.",
    ],
    features: [
      { title: "Patient flow engineering", description: "Triage, treatment, and holding zones with separated circulation." },
      { title: "Clinical power branches", description: "Dedicated PDU legs for racks and isolation transformers where required." },
      { title: "Environmental control", description: "Split ECU concepts for hot/cold clinical bands." },
    ],
    specs: [
      { label: "Footprint", value: "1.8–4.0k ft² clinical envelope" },
      { label: "Personnel", value: "8–24 medical staff" },
      { label: "Transport", value: "Air pallet / ground convoy" },
      { label: "Setup Time", value: "6–10 hours" },
      { label: "Climate Rating", value: "Hot, cold, maritime kits" },
      { label: "Power Requirement", value: "25–55 kW (notional)" },
    ],
    compareScores: { footprint: 5, personnel: 5, transport: 7, setupTime: 6, climate: 7, power: 7, priceRange: 7 },
    configurations: [
      { title: "Role 1 triage", description: "Stabilization and holding with minimal footprint." },
      { title: "Role 2 surgical bay", description: "Expanded clinical cell with negative-pressure option." },
      { title: "CASEVAC interface", description: "Helo pad adjacency and ambulance circulation lanes." },
    ],
    downloads: [
      { name: "MWSS-MED Spec Sheet", type: "PDF", size: "2.8 MB", href: "/resources" },
      { name: "Medical Layout Guide", type: "PDF", size: "3.6 MB", href: "/resources" },
      { name: "Clinical Power One-Line", type: "PDF", size: "1.2 MB", href: "/resources" },
    ],
    relatedSlugs: ["rads-12", "power-int", "efss-base"],
  },
  {
    slug: "mwss-mx",
    code: "MWSS-MX",
    name: "Maintenance & Aviation Shelter",
    subtitle: "High-bay maintenance and tool-control zones",
    tag: "AVIATION MX",
    missionTypes: ["maintenance"],
    environments: ["desert", "arctic", "tropical"],
    mobilities: ["c130", "ground"],
    sizes: ["platoon", "company"],
    description:
      "High-bay maintenance envelope with separated fuel handling, crane-assist options, and ECU headroom for large open volumes.",
    overview: [
      "MWSS-MX integrates recovery lanes, tool-control zones, and circulation separated from fuel operations when CONOPS require it.",
      "Power distribution accounts for hoist loads, maintenance lighting bands, and sensible ECU loads in large bays.",
      "Layouts scale from line maintenance to limited depot functions based on throughput and available lift.",
    ],
    features: [
      { title: "High-bay clearance", description: "Configurable arch height for rotor and wing work." },
      { title: "Crane-assist ready", description: "Structural hard points where programs authorize lift." },
      { title: "Dust and heat kits", description: "Desert ECU and vestibule packages for extreme maintenance windows." },
    ],
    specs: [
      { label: "Footprint", value: "4–8k ft² high-bay cell" },
      { label: "Personnel", value: "16–40 maintainers" },
      { label: "Transport", value: "C-130 / heavy ground haul" },
      { label: "Setup Time", value: "8–16 hours" },
      { label: "Climate Rating", value: "Desert and cold bands" },
      { label: "Power Requirement", value: "35–80 kW (notional)" },
    ],
    compareScores: { footprint: 8, personnel: 7, transport: 6, setupTime: 5, climate: 6, power: 8, priceRange: 8 },
    configurations: [
      { title: "Aviation line MX", description: "Open bay with tool crib and parts staging." },
      { title: "Vehicle maintenance", description: "Lower bay height with separated fuel path." },
      { title: "Recovery lane", description: "Disabled equipment ingress and crane assist." },
    ],
    downloads: [
      { name: "MWSS-MX Spec Sheet", type: "PDF", size: "3.1 MB", href: "/resources" },
      { name: "High-Bay Structural Brief", type: "PDF", size: "2.0 MB", href: "/resources" },
      { name: "MX Layout Drawing", type: "DWG", size: "9.4 MB", href: "/resources" },
    ],
    relatedSlugs: ["efss-base", "power-int", "rads-40"],
  },
  {
    slug: "efss-base",
    code: "EFSS-BASE",
    name: "Expeditionary Force Support System — Base",
    subtitle: "FOB life support and utility spine",
    tag: "BASE INFRASTRUCTURE",
    missionTypes: ["accommodation", "logistics"],
    environments: ["tropical", "desert", "tropical"],
    mobilities: ["ground", "iso", "c130"],
    sizes: ["company", "battalion"],
    description:
      "Multi-bay camp spine integrating berthing, dining, hygiene, and utility loops sequenced to sustainment tempo.",
    overview: [
      "EFSS-BASE composes berthing, life support, and shared utilities as a campus—not isolated shelter SKUs on a pad.",
      "Master circulation separates sustainment traffic from sensitive workflows while keeping ECU yards accessible.",
      "Phased emplacement aligns with lift windows, shore power cutover, and training touchpoints for acceptance.",
    ],
    features: [
      { title: "Utility spine", description: "Shared power, water, and environmental distribution across cells." },
      { title: "Phased growth", description: "Start with core services; add bays as tempo increases." },
      { title: "Sustainment integration", description: "Staged spares, fuels, and resupply paths from CONOPS." },
    ],
    specs: [
      { label: "Footprint", value: "8–12k ft² campus (planning-level)" },
      { label: "Personnel", value: "80–150 personnel" },
      { label: "Transport", value: "Sea container / multi-lift air" },
      { label: "Setup Time", value: "3–6 weeks phased" },
      { label: "Climate Rating", value: "Full environmental band kits" },
      { label: "Power Requirement", value: "60–120 kW campus baseline" },
    ],
    compareScores: { footprint: 9, personnel: 8, transport: 5, setupTime: 3, climate: 8, power: 9, priceRange: 9 },
    configurations: [
      { title: "Core services package", description: "Dining, hygiene, and admin spine." },
      { title: "Berthing expansion", description: "Additional sleeping bays on shared utilities." },
      { title: "Sustainment yard", description: "Fuels, parts, and vehicle staging cells." },
    ],
    downloads: [
      { name: "EFSS-BASE Camp Plan", type: "PDF", size: "5.2 MB", href: "/resources" },
      { name: "Utility Spine Drawing", type: "DWG", size: "11 MB", href: "/resources" },
      { name: "Capabilities Brief — Base", type: "PDF", size: "4.0 MB", href: "/resources" },
    ],
    relatedSlugs: ["camp-int", "lsas-log", "power-int"],
  },
  {
    slug: "rads-40",
    code: "RADS-40",
    name: "Rapid Deploy Shelter System — 40 Person",
    subtitle: "Company-scale expeditionary footprint",
    tag: "EXPEDITIONARY",
    missionTypes: ["accommodation", "c2"],
    environments: ["desert", "tropical", "tropical"],
    mobilities: ["c130", "ground"],
    sizes: ["company"],
    description:
      "Company-scale rapid deploy package balancing airlift discipline with berthing, admin, and utility spine integration.",
    overview: [
      "RADS-40 targets deliberate planning cycles with modular cells staged for C-130 and ground convoy movement.",
      "Environmental control is zoned across berthing and operations to manage sensible loads without oversizing gen-sets.",
      "Layout engineering captures personnel density, circulation, and sustainment interfaces before metal moves.",
    ],
    features: [
      { title: "Company berthing", description: "Density-modeled sleeping and locker circulation." },
      { title: "Operations cell", description: "Admin and comms module on shared spine." },
      { title: "Lift planning", description: "Piece weights compatible with tactical airlift classes." },
    ],
    specs: [
      { label: "Footprint", value: "5–7k ft² conditioned" },
      { label: "Personnel", value: "40 personnel" },
      { label: "Transport", value: "C-130 / LMTV convoy" },
      { label: "Setup Time", value: "10–14 days phased" },
      { label: "Climate Rating", value: "Hot / temperate standard" },
      { label: "Power Requirement", value: "45–70 kW (notional)" },
    ],
    compareScores: { footprint: 7, personnel: 7, transport: 7, setupTime: 4, climate: 6, power: 7, priceRange: 7 },
    configurations: [
      { title: "Standard company", description: "Berthing + admin + hygiene core." },
      { title: "With TOC module", description: "Adds planning cell on spine." },
      { title: "Desert ECU upgrade", description: "Expanded sensible-load headroom." },
    ],
    downloads: [
      { name: "RADS-40 Spec Sheet", type: "PDF", size: "2.6 MB", href: "/resources" },
      { name: "Company Layout Pack", type: "PDF", size: "3.8 MB", href: "/resources" },
      { name: "Lift Plan Template", type: "XLSX", size: "420 KB", href: "/resources" },
    ],
    relatedSlugs: ["rads-12", "efss-base", "power-int"],
  },
  {
    slug: "rads-12",
    code: "RADS-12",
    name: "Rapid Deploy Shelter System — 12 Person",
    subtitle: "SOF small-team footprint",
    tag: "SOF / SMALL TEAM",
    missionTypes: ["c2", "accommodation"],
    environments: ["arctic", "desert", "highalt", "tropical"],
    mobilities: ["c130", "helicopter"],
    sizes: ["small"],
    description:
      "Compact expeditionary cluster for forward teams—minimal crane dependency, trained-crew emplacement under 72 hours.",
    overview: [
      "RADS-12 emphasizes air mobile discipline with 4–12 operators, anchoring kits for dispersed sites, and split ECU where power is constrained.",
      "Cells combine berthing and operations with vestibule hardening for environmental separation.",
      "Sustainment assumptions are captured in the advisory brief—not afterthought line items.",
    ],
    features: [
      { title: "72-hour deploy", description: "Trained crew emplacement target under nominal weather." },
      { title: "Sling-load option", description: "Module weights within CH-47 / UH-60 envelope." },
      { title: "Low signature", description: "Compact footprint and emissions-aware power shed." },
    ],
    specs: [
      { label: "Footprint", value: "1.2–2.0k ft² cluster" },
      { label: "Personnel", value: "4–12 operators" },
      { label: "Transport", value: "C-130 / sling load" },
      { label: "Setup Time", value: "Under 72 hours" },
      { label: "Climate Rating", value: "Cold / hot / altitude kits" },
      { label: "Power Requirement", value: "8–18 kW (notional)" },
    ],
    compareScores: { footprint: 3, personnel: 3, transport: 9, setupTime: 9, climate: 7, power: 4, priceRange: 4 },
    configurations: [
      { title: "SOF team", description: "Berthing + ops two-cell cluster." },
      { title: "Arctic kit", description: "Insulated envelope and winter ECU." },
      { title: "Altitude package", description: "Anchoring and wind bracing for ridge-line sites." },
    ],
    downloads: [
      { name: "RADS-12 Spec Sheet", type: "PDF", size: "1.9 MB", href: "/resources" },
      { name: "SOF Footprint Brief", type: "PDF", size: "2.2 MB", href: "/resources" },
      { name: "Sling Load Data", type: "PDF", size: "890 KB", href: "/resources" },
    ],
    relatedSlugs: ["mwss-c2", "arcs-cold", "scif-mod"],
  },
  {
    slug: "scif-mod",
    code: "SCIF-MOD",
    name: "Modular SCIF Shelter",
    subtitle: "Expeditionary sensitive compartment",
    tag: "SENSITIVE / SCIF",
    missionTypes: ["c2"],
    environments: ["tropical", "desert", "arctic"],
    mobilities: ["ground", "iso", "c130"],
    sizes: ["small", "platoon"],
    description:
      "Emissions-controlled environment with RF shielding options, access control, and TEMPEST-aware layout discipline.",
    overview: [
      "SCIF-MOD treats shielding, access control, and cable discipline as configuration building blocks validated against program security requirements.",
      "Layouts separate visitor paths, equipment racks, and maintenance access without compromising emissions posture.",
      "Integration workshops align footprint with clearance posture and export constraints before detailed release.",
    ],
    features: [
      { title: "RF discipline", description: "Shielding concepts and filtered power entry where required." },
      { title: "Access control", description: "Vestibule sequencing and visitor paths from CONOPS." },
      { title: "Growth headroom", description: "Raceway paths for future kit without layout rework." },
    ],
    specs: [
      { label: "Footprint", value: "1.5–3.5k ft² secure envelope" },
      { label: "Personnel", value: "6–18 cleared staff" },
      { label: "Transport", value: "Ground / ISO / air pallet" },
      { label: "Setup Time", value: "5–10 days (program-dependent)" },
      { label: "Climate Rating", value: "Standard + hardened ECU" },
      { label: "Power Requirement", value: "15–30 kW filtered (notional)" },
    ],
    compareScores: { footprint: 4, personnel: 4, transport: 6, setupTime: 5, climate: 5, power: 5, priceRange: 8 },
    configurations: [
      { title: "JSOC planning cell", description: "Compact SCIF with comms alcove." },
      { title: "Dual-compartment", description: "Separated operations and storage." },
      { title: "TEMPEST package", description: "Enhanced filtering and cable discipline." },
    ],
    downloads: [
      { name: "SCIF-MOD Overview", type: "PDF", size: "2.1 MB", href: "/resources" },
      { name: "Security Integration Guide", type: "PDF", size: "1.5 MB", href: "/resources" },
      { name: "Layout — SCIF", type: "DWG", size: "6.8 MB", href: "/resources" },
    ],
    relatedSlugs: ["mwss-c2", "rads-12", "power-int"],
  },
  {
    slug: "lsas-log",
    code: "LSAS-LOG",
    name: "Logistics Support & Storage Shelter",
    subtitle: "Staging, spares, and distribution",
    tag: "SUSTAINMENT",
    missionTypes: ["logistics"],
    environments: ["maritime", "desert", "tropical"],
    mobilities: ["iso", "ground", "c130"],
    sizes: ["platoon", "company"],
    description:
      "Staging bays, pallet discipline, and power distribution aligned to resupply reality and corrosion exposure.",
    overview: [
      "LSAS-LOG configurations emphasize throughput for parts, fuels, and spares without becoming signature magnets.",
      "Corrosion-aware hardware and elevated flooring options support littoral and desert sites.",
      "Utility spines allow growth from single-cell staging to multi-bay sustainment campuses.",
    ],
    features: [
      { title: "Staging bays", description: "High-door cells for pallet flow and forklift access." },
      { title: "Corrosion kit", description: "Maritime hardware and drip-loop discipline." },
      { title: "Expandable spine", description: "Add cells as resupply tempo increases." },
    ],
    specs: [
      { label: "Footprint", value: "2–4k ft² staging cluster" },
      { label: "Personnel", value: "12–30 logistics staff" },
      { label: "Transport", value: "ISO / ground convoy" },
      { label: "Setup Time", value: "3–8 days" },
      { label: "Climate Rating", value: "Maritime / desert kits" },
      { label: "Power Requirement", value: "12–28 kW (notional)" },
    ],
    compareScores: { footprint: 5, personnel: 5, transport: 7, setupTime: 6, climate: 6, power: 5, priceRange: 5 },
    configurations: [
      { title: "Parts staging", description: "Shelved storage with climate control." },
      { title: "Fuels adjacency", description: "Separated circulation from fuel operations." },
      { title: "Sea deployment", description: "ISO-optimized crating and corrosion inspection." },
    ],
    downloads: [
      { name: "LSAS-LOG Spec Sheet", type: "PDF", size: "2.3 MB", href: "/resources" },
      { name: "Sustainment Layout", type: "PDF", size: "3.0 MB", href: "/resources" },
      { name: "ISO Packing List", type: "PDF", size: "1.1 MB", href: "/resources" },
    ],
    relatedSlugs: ["efss-base", "camp-int", "power-int"],
  },
  {
    slug: "arcs-cold",
    code: "ARCS-COLD",
    name: "Arctic Configuration System",
    subtitle: "Extreme cold weather package",
    tag: "ARCTIC / COLD WEATHER",
    missionTypes: ["c2", "accommodation", "maintenance"],
    environments: ["arctic", "highalt"],
    mobilities: ["c130", "ground"],
    sizes: ["small", "platoon", "company"],
    description:
      "Insulated envelope, snow-load hardware, vestibule airlocks, and ECU winterization to -40°F operational bands.",
    overview: [
      "ARCS-COLD integrates insulation packages, snow-load structural sets, and ECU winterization as validated subsystems—not field improvisations.",
      "Anchoring and ballast consumables are sized to permafrost, ice, and high-latitude wind cases.",
      "Power derating and fuel planning are captured for extreme cold before procurement narratives freeze.",
    ],
    features: [
      { title: "-40°F ECU band", description: "Winterized ECU with redundancy options." },
      { title: "Snow load kit", description: "Structural hardware for latitude-specific cases." },
      { title: "Vestibule airlocks", description: "Thermal and contamination separation at entries." },
    ],
    specs: [
      { label: "Footprint", value: "Scales with cell count" },
      { label: "Personnel", value: "4–120 (package-dependent)" },
      { label: "Transport", value: "C-130 / ground" },
      { label: "Setup Time", value: "Extended cold-weather window" },
      { label: "Climate Rating", value: "Arctic / subarctic" },
      { label: "Power Requirement", value: "+15% cold derate (planning)" },
    ],
    compareScores: { footprint: 6, personnel: 6, transport: 6, setupTime: 4, climate: 10, power: 7, priceRange: 8 },
    configurations: [
      { title: "Small team arctic", description: "RADS-scale cluster with full cold kit." },
      { title: "Company cold camp", description: "Multi-bay with shared ECU yard." },
      { title: "MX cold bay", description: "Heated maintenance with airlock sequencing." },
    ],
    downloads: [
      { name: "ARCS-COLD Spec Sheet", type: "PDF", size: "3.4 MB", href: "/resources" },
      { name: "Winterization Guide", type: "PDF", size: "2.7 MB", href: "/resources" },
      { name: "Snow Load Tables", type: "PDF", size: "1.4 MB", href: "/resources" },
    ],
    relatedSlugs: ["rads-12", "mwss-c2", "power-int"],
  },
  {
    slug: "efss-desert",
    code: "EFSS-DESERT",
    name: "Desert Operations Package",
    subtitle: "Arid environment integrated camp",
    tag: "ARID / DESERT",
    missionTypes: ["accommodation", "maintenance", "logistics"],
    environments: ["desert"],
    mobilities: ["ground", "c130"],
    sizes: ["platoon", "company"],
    description:
      "Dust mitigation, solar shading, expanded ECU sensible-load headroom, and vestibule packages for arid theaters.",
    overview: [
      "EFSS-DESERT sequences dust control at vestibules, cable derating for heat exposure, and shading packages that reduce ECU load.",
      "Layouts separate fuel, maintenance, and life-support traffic for high-temperature operating windows.",
      "Sustainment planning includes water, power, and spares exposure between resupply cycles.",
    ],
    features: [
      { title: "Dust control", description: "Vestibule and filtration discipline at high-traffic entries." },
      { title: "Solar shading", description: "Reduced sensible load on ECU and interior spaces." },
      { title: "Heat derating", description: "Generator and cable schedules for ambient extremes." },
    ],
    specs: [
      { label: "Footprint", value: "4–10k ft² (package-dependent)" },
      { label: "Personnel", value: "20–120 personnel" },
      { label: "Transport", value: "Ground / C-130" },
      { label: "Setup Time", value: "7–21 days phased" },
      { label: "Climate Rating", value: "Hot / arid" },
      { label: "Power Requirement", value: "40–90 kW (notional)" },
    ],
    compareScores: { footprint: 7, personnel: 7, transport: 6, setupTime: 4, climate: 9, power: 8, priceRange: 7 },
    configurations: [
      { title: "Platoon desert FOB", description: "Berthing + admin + shaded ECU yard." },
      { title: "MX desert bay", description: "Maintenance cell with dust kit." },
      { title: "Medical desert", description: "Clinical cell with expanded ECU." },
    ],
    downloads: [
      { name: "EFSS-DESERT Brief", type: "PDF", size: "3.2 MB", href: "/resources" },
      { name: "Dust Mitigation Guide", type: "PDF", size: "1.8 MB", href: "/resources" },
      { name: "Desert Power Derating", type: "PDF", size: "980 KB", href: "/resources" },
    ],
    relatedSlugs: ["mwss-med", "mwss-mx", "power-int"],
  },
  {
    slug: "power-int",
    code: "POWER-INT",
    name: "Integrated Power & ECU Package",
    subtitle: "Power distribution and environmental control",
    tag: "POWER / ENVIRONMENTAL",
    missionTypes: ["logistics", "c2", "medical", "maintenance"],
    environments: ["arctic", "desert", "tropical", "maritime", "tropical", "highalt"],
    mobilities: ["ground", "iso", "c130"],
    sizes: ["small", "platoon", "company", "battalion"],
    description:
      "PDU staging, ECU yards, hybrid microgrid options, and branch panels sized to campus or cell-level loads.",
    overview: [
      "POWER-INT composes generation, storage, distribution, and ECU as configurable building blocks matched to envelope sensible/latent bands.",
      "Silent-hours shed lists and tactical versus shore interconnect postures are captured in workshop—not assumed from catalog.",
      "Redundancy goals and maintenance echelon training scale with program requirements.",
    ],
    features: [
      { title: "Hybrid microgrid", description: "Gen-set plus storage with staged load management." },
      { title: "ECU yard design", description: "Split packages for multi-cell campuses." },
      { title: "PDU discipline", description: "Branch panels, surge isolation, and grounding plans." },
    ],
    specs: [
      { label: "Footprint", value: "ECU yard + gen-skid staging" },
      { label: "Personnel", value: "Supports 4–200+ pax campuses" },
      { label: "Transport", value: "Skid / ISO / palletized" },
      { label: "Setup Time", value: "Parallel with shelter emplacement" },
      { label: "Climate Rating", value: "All environmental bands" },
      { label: "Power Requirement", value: "Sized to load study" },
    ],
    compareScores: { footprint: 4, personnel: 8, transport: 7, setupTime: 7, climate: 9, power: 10, priceRange: 6 },
    configurations: [
      { title: "Tactical gen-set bank", description: "Parallel generators with refuel planning." },
      { title: "Hybrid silent hours", description: "Battery storage and inverter staging." },
      { title: "Shore interconnect", description: "Grid tie with isolation and PDU staging." },
    ],
    downloads: [
      { name: "POWER-INT One-Line", type: "PDF", size: "1.6 MB", href: "/resources" },
      { name: "ECU Sizing Worksheet", type: "XLSX", size: "520 KB", href: "/resources" },
      { name: "Power Integration Brief", type: "PDF", size: "2.4 MB", href: "/resources" },
    ],
    relatedSlugs: ["camp-int", "efss-base", "mwss-c2"],
  },
  {
    slug: "camp-int",
    code: "CAMP-INT",
    name: "Full Camp Integration Package",
    subtitle: "Turnkey expeditionary campus",
    tag: "FULL CAMP",
    missionTypes: ["logistics", "accommodation", "c2", "medical", "maintenance"],
    environments: ["tropical", "desert", "tropical", "maritime"],
    mobilities: ["iso", "ground", "c130"],
    sizes: ["battalion"],
    description:
      "Master-planned multi-bay campus with utility loops, circulation engineering, and phased emplacement from CONOPS.",
    overview: [
      "CAMP-INT is the integration layer—layout engineering, utility spines, and subsystem validation across shelter, power, ECU, flooring, and sustainment.",
      "Phasing aligns lift windows, training, and acceptance criteria with program offices and operators.",
      "Documentation and spares recommendations scale to utilization and environmental exposure between resupply cycles.",
    ],
    features: [
      { title: "Master circulation", description: "Fuel, maintenance, and life-support separation." },
      { title: "Phased emplacement", description: "Lift-window-aligned build sequence." },
      { title: "CDRL-ready docs", description: "Manuals and training tuned to maintenance echelons." },
    ],
    specs: [
      { label: "Footprint", value: "12k+ ft² multi-bay campus" },
      { label: "Personnel", value: "200+ personnel" },
      { label: "Transport", value: "Multi-modal / sea-heavy" },
      { label: "Setup Time", value: "6–12 weeks phased" },
      { label: "Climate Rating", value: "Full kit library" },
      { label: "Power Requirement", value: "100–200 kW campus (notional)" },
    ],
    compareScores: { footprint: 10, personnel: 10, transport: 4, setupTime: 2, climate: 9, power: 10, priceRange: 10 },
    configurations: [
      { title: "Task force campus", description: "Full suite of mission cells on shared spine." },
      { title: "Littoral package", description: "Corrosion and shore-power emphasis." },
      { title: "Distributed nodes", description: "Multiple sub-camps with backbone utilities." },
    ],
    downloads: [
      { name: "CAMP-INT Master Plan", type: "PDF", size: "6.1 MB", href: "/resources" },
      { name: "Integration Schedule", type: "PDF", size: "2.9 MB", href: "/resources" },
      { name: "Full Capabilities Brief", type: "PDF", size: "5.0 MB", href: "/resources" },
    ],
    relatedSlugs: ["efss-base", "power-int", "lsas-log"],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsBySlugs(slugs: string[]): Product[] {
  return slugs.map((s) => getProductBySlug(s)).filter((p): p is Product => Boolean(p));
}

export function filterProducts(
  products: Product[],
  filters: {
    mission: ProductFilterMission;
    environment: ProductFilterEnvironment;
    mobility: ProductFilterMobility;
    size: ProductFilterSize;
  },
): Product[] {
  return products.filter((p) => {
    if (filters.mission !== "all" && !p.missionTypes.includes(filters.mission)) return false;
    if (filters.environment !== "all" && !p.environments.includes(filters.environment)) return false;
    if (filters.mobility !== "all" && !p.mobilities.includes(filters.mobility)) return false;
    if (filters.size !== "all" && !p.sizes.includes(filters.size)) return false;
    return true;
  });
}

export function getCompareSpecValues(product: Product): Record<CompareSpecKey, string> {
  const map = Object.fromEntries(product.specs.map((s) => [s.label.toLowerCase(), s.value])) as Record<
    string,
    string
  >;
  return {
    footprint: map.footprint ?? "—",
    personnel: map.personnel ?? "—",
    transport: map.transport ?? "—",
    setupTime: map["setup time"] ?? "—",
    climate: map["climate rating"] ?? "—",
    power: map["power requirement"] ?? "—",
    priceRange:
      product.compareScores.priceRange >= 8
        ? "Program quote — contact programs"
        : "ROM via technical exchange",
  };
}
