export type ShelterZoneId =
  | "structure"
  | "roof"
  | "ecu"
  | "power"
  | "entrance"
  | "interior";

export type ShelterZone = {
  id: ShelterZoneId;
  groupId: string;
  name: string;
  tooltipSpec: string;
  title: string;
  bullets: string[];
  learnMoreHref: string;
};

export const SHELTER_ZONES: ShelterZone[] = [
  {
    id: "structure",
    groupId: "zone-structure",
    name: "MODULAR FRAME",
    tooltipSpec: "Soft-wall modular frame — 20×32 ft configurable",
    title: "Modular Frame Structure",
    bullets: [
      "Aluminum arch frame with tensioned fabric envelope",
      "20×32 ft base module — combinable to multi-bay campuses",
      "Anchoring kits for soil, concrete, and dispersed sites",
      "Compatible with rigid vestibule and utility spine interfaces",
    ],
    learnMoreHref: "/configurable-solutions",
  },
  {
    id: "roof",
    groupId: "zone-roof",
    name: "ROOF PANEL",
    tooltipSpec: "Insulated roof membrane — snow and solar load rated",
    title: "Roof Panel System",
    bullets: [
      "Multi-layer insulated membrane with vapor barrier",
      "Snow-load hardware sets for high-latitude deployments",
      "Solar shading packages for hot / arid theaters",
      "Integrated cable egress paths for ECU and lighting",
    ],
    learnMoreHref: "/capabilities",
  },
  {
    id: "ecu",
    groupId: "zone-ecu",
    name: "ENVIRONMENTAL CONTROL",
    tooltipSpec: "Split ECU package — Arctic to desert bands",
    title: "Environmental Control Unit",
    bullets: [
      "Split or paired ECU concepts sized to envelope sensible/latent loads",
      "Winterization and dust-mitigation kits per theater",
      "Redundant zoning for ridge-line or maritime humidity swings",
      "Quiet-hours profiles coordinated with power shed lists",
    ],
    learnMoreHref: "/capabilities",
  },
  {
    id: "power",
    groupId: "zone-power",
    name: "POWER DISTRIBUTION",
    tooltipSpec: "PDU staging — tactical gen-set to hybrid microgrid",
    title: "Power Distribution",
    bullets: [
      "Main PDU with branch panels and surge isolation",
      "Tactical gen-set, hybrid storage, or shore interconnect postures",
      "Cable derating schedules for heat and dust exposure",
      "Lighting branches for maintenance and tactical lux bands",
    ],
    learnMoreHref: "/capabilities",
  },
  {
    id: "entrance",
    groupId: "zone-entrance",
    name: "ENTRY POINTS",
    tooltipSpec: "Vestibule airlocks — contamination and thermal control",
    title: "Entry & Vestibule",
    bullets: [
      "Double-door vestibule airlocks for environmental separation",
      "Dust and decontamination paths at high-traffic entries",
      "Blackout-compatible door hardware where programs require",
      "Visitor and equipment circulation lanes from CONOPS",
    ],
    learnMoreHref: "/configurable-solutions",
  },
  {
    id: "interior",
    groupId: "zone-interior",
    name: "INTERIOR LAYOUT",
    tooltipSpec: "Subfloor grid — cable egress and circulation engineering",
    title: "Interior Layout",
    bullets: [
      "Leveling subfloor with disciplined cable paths",
      "Berthing, maintenance, and sensitive workflow separation",
      "Flooring packages matched to site class and traffic lanes",
      "Layout engineering from mission threads—not catalog rows",
    ],
    learnMoreHref: "/mission-solution-builder",
  },
];
