export type CapabilityCategoryId =
  | "shelter"
  | "ecu"
  | "power"
  | "flooring"
  | "c2"
  | "medical"
  | "aviation"
  | "camp";

export type CapabilityCategory = {
  id: CapabilityCategoryId;
  label: string;
  headline: string;
  paragraphs: string[];
  features: string[];
  relatedSlugs: string[];
  diagramLabel: string;
};

export const CAPABILITY_CATEGORIES: CapabilityCategory[] = [
  {
    id: "shelter",
    label: "Shelter Systems",
    headline: "Modular envelopes sized from mission profile",
    paragraphs: [
      "Soft-wall and rigid shelter cells are configuration building blocks—not catalog rows. Footprint, circulation, and utility spines derive from CONOPS, personnel counts, and threat posture before envelope details freeze.",
      "Weatherhaven validates wind, snow, seismic, and recovery cases per program with explicit assumptions for government review. Final cell counts and module mix scale through controlled technical exchanges.",
    ],
    features: [
      "Soft-wall and rigid-frame modular cells",
      "20×32 ft base module — combinable multi-bay campuses",
      "Anchoring kits for soil, ice, concrete, and dispersed sites",
    ],
    relatedSlugs: ["mwss-c2", "rads-12", "efss-base"],
    diagramLabel: "Modular frame — multi-bay spine",
  },
  {
    id: "ecu",
    label: "Environmental Control",
    headline: "ECU stacks matched to envelope loads",
    paragraphs: [
      "Environmental control is sized from sensible and latent loads derived from envelope models—not marketing nameplates. Split ECU concepts, redundancy goals, and quiet-hours profiles are captured in workshop.",
      "Kits for arctic, desert, maritime, and high-altitude theaters include winterization, dust mitigation, dehumidification, and corrosion-aware hardware.",
    ],
    features: [
      "Arctic through desert operational bands",
      "Split and paired ECU yard concepts",
      "Redundancy and silent-hours load shedding",
    ],
    relatedSlugs: ["power-int", "arcs-cold", "efss-desert"],
    diagramLabel: "ECU yard — split package",
  },
  {
    id: "power",
    label: "Power Systems",
    headline: "Generation, storage, and distribution discipline",
    paragraphs: [
      "Tactical gen-set banks, hybrid microgrids, and shore interconnect postures are composed from mission power narratives. PDU branches, surge isolation, and grounding plans follow load studies.",
      "Cable derating for heat and dust, refuel windows, and maintenance echelon training are part of the deliverable—not aftermarket assumptions.",
    ],
    features: [
      "Tactical, hybrid, and shore-tie architectures",
      "PDU staging with branch panel discipline",
      "Lighting bands for maintenance and tactical lux",
    ],
    relatedSlugs: ["power-int", "camp-int", "mwss-c2"],
    diagramLabel: "PDU spine — gen-set yard",
  },
  {
    id: "flooring",
    label: "Flooring & Infrastructure",
    headline: "Subfloor grids and site-class integration",
    paragraphs: [
      "Leveling subfloor with disciplined cable paths is a configuration building block matched to site class, traffic lanes, and decontamination requirements.",
      "Elevated flooring for littoral and jungle sites pairs with corrosion-aware hardware and drip-loop discipline at entries.",
    ],
    features: [
      "Site-class-dependent subfloor packages",
      "Cable egress and maintenance access",
      "Integration with vestibule and circulation plans",
    ],
    relatedSlugs: ["efss-base", "lsas-log", "camp-int"],
    diagramLabel: "Subfloor grid — cable chase",
  },
  {
    id: "c2",
    label: "Command & Control Integration",
    headline: "TOC layouts with emissions discipline",
    paragraphs: [
      "Command posts combine planning walls, comms alcoves, and visitor circulation with blackout and emissions requirements where programs demand them.",
      "Raceway discipline preserves growth headroom for future kit without layout rework after fielding.",
    ],
    features: [
      "Blackout-capable vestibule sequencing",
      "Comms rack and map-wall backing",
      "SCIF and sensitive compartment options",
    ],
    relatedSlugs: ["mwss-c2", "scif-mod", "rads-12"],
    diagramLabel: "TOC cell — comms spine",
  },
  {
    id: "medical",
    label: "Medical Configuration",
    headline: "Clinical envelopes and patient flow",
    paragraphs: [
      "Medical configurations prioritize dirty/clean separation, utility chases for racks, and clinical load power branches with ECU redundancy stated up front.",
      "Role 1 through Role 2 concepts scale from triage footprints to surgical bays with optional negative-pressure kits.",
    ],
    features: [
      "Triage, treatment, and holding zones",
      "Clinical power and isolation options",
      "CASEVAC and ambulance circulation",
    ],
    relatedSlugs: ["mwss-med", "efss-desert", "power-int"],
    diagramLabel: "Clinical flow — utility chase",
  },
  {
    id: "aviation",
    label: "Aviation Support",
    headline: "High-bay maintenance and recovery",
    paragraphs: [
      "Aviation maintenance shelters combine high-bay clearance, crane-assist options, and separated fuel versus tool-control circulation.",
      "Power and ECU sizing account for hoist loads, open-volume sensible loads, and desert or cold maintenance windows.",
    ],
    features: [
      "High-bay arch configurations",
      "Recovery lanes and crane hard points",
      "Dust and cold maintenance kits",
    ],
    relatedSlugs: ["mwss-mx", "efss-desert", "power-int"],
    diagramLabel: "MX bay — high clearance",
  },
  {
    id: "camp",
    label: "Camp Integration",
    headline: "Campus planning and phased emplacement",
    paragraphs: [
      "Full camp integration sequences shelter, power, ECU, flooring, and sustainment as a campus with shared utility loops—not isolated products on a pad.",
      "Phased emplacement, training, and CDRL-aligned documentation transfer ownership cleanly to operator and maintainer echelons.",
    ],
    features: [
      "Master circulation and utility spine",
      "Phased lift-window-aligned build",
      "Sustainment and spares posture",
    ],
    relatedSlugs: ["camp-int", "efss-base", "lsas-log"],
    diagramLabel: "Campus spine — multi-bay",
  },
];

export function getCapabilityCategory(id: CapabilityCategoryId): CapabilityCategory | undefined {
  return CAPABILITY_CATEGORIES.find((c) => c.id === id);
}
