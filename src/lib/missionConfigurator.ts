export const MISSION_PROFILE_STORAGE_KEY = "wh-mission-profile";

export type EnvironmentId = "arctic" | "desert" | "jungle" | "maritime";
export type MissionTypeId = "c2" | "medical" | "maintenance" | "basecamp";
export type MobilityId = "air" | "ground" | "sea" | "sling";
export type TimelineId = "immediate" | "near" | "por" | "concept";

export type MissionProfileSelections = {
  environment: EnvironmentId;
  environmentLabel: string;
  missionType: MissionTypeId;
  missionTypeLabel: string;
  mobility: MobilityId;
  mobilityLabel: string;
  timeline: TimelineId;
  timelineLabel: string;
  recommendedTitle: string;
  completedAt: string;
};

export type ConfiguratorStepOption = {
  id: string;
  label: string;
  icon: string;
};

export type ConfiguratorStep = {
  step: number;
  label: string;
  headline: string;
  options: ConfiguratorStepOption[];
};

export const CONFIGURATOR_STEPS: ConfiguratorStep[] = [
  {
    step: 1,
    label: "OPERATIONAL ENVIRONMENT",
    headline: "Where will this system deploy?",
    options: [
      { id: "arctic", label: "Arctic / Cold Weather", icon: "snowflake" },
      { id: "desert", label: "Desert / Arid", icon: "sun" },
      { id: "jungle", label: "Jungle / Tropical", icon: "tree" },
      { id: "maritime", label: "Maritime / Coastal", icon: "anchor" },
    ],
  },
  {
    step: 2,
    label: "MISSION TYPE",
    headline: "What is the primary mission function?",
    options: [
      { id: "c2", label: "Command & Control", icon: "layout" },
      { id: "medical", label: "Medical Support", icon: "stethoscope" },
      { id: "maintenance", label: "Maintenance & Aviation", icon: "tool" },
      { id: "basecamp", label: "Expeditionary Base Camp", icon: "camp" },
    ],
  },
  {
    step: 3,
    label: "MOBILITY REQUIREMENT",
    headline: "How will the system move?",
    options: [
      { id: "air", label: "Air Transportable (C-130 / CH-47)", icon: "plane" },
      { id: "ground", label: "Ground Vehicle", icon: "truck" },
      { id: "sea", label: "Sea Container", icon: "ship" },
      { id: "sling", label: "Helicopter Sling Load", icon: "helicopter" },
    ],
  },
  {
    step: 4,
    label: "DEPLOYMENT TIMELINE",
    headline: "When does this need to be fielded?",
    options: [
      { id: "immediate", label: "Immediate (0-6 months)", icon: "bolt" },
      { id: "near", label: "Near Term (6-12 months)", icon: "calendar" },
      { id: "por", label: "Program of Record (12+ months)", icon: "file" },
      { id: "concept", label: "Concept Exploration", icon: "compass" },
    ],
  },
];

const envShort: Record<EnvironmentId, string> = {
  arctic: "Arctic",
  desert: "Desert",
  jungle: "Jungle",
  maritime: "Maritime",
};

const missionShort: Record<MissionTypeId, string> = {
  c2: "C2",
  medical: "Medical",
  maintenance: "Aviation MX",
  basecamp: "Base Camp",
};

const timelinePackage: Record<TimelineId, string> = {
  immediate: "Rapid Deploy Package",
  near: "Near-Term Fielding Package",
  por: "Program of Record Configuration",
  concept: "Concept Exploration Brief",
};

export function buildRecommendedTitle(
  environment: EnvironmentId,
  missionType: MissionTypeId,
  timeline: TimelineId,
): string {
  return `${envShort[environment]} ${missionShort[missionType]} — ${timelinePackage[timeline]}`;
}

export function saveMissionProfile(profile: MissionProfileSelections): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(MISSION_PROFILE_STORAGE_KEY, JSON.stringify(profile));
  } catch {
    /* quota / private mode */
  }
}

export function loadMissionProfile(): MissionProfileSelections | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(MISSION_PROFILE_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as MissionProfileSelections;
  } catch {
    return null;
  }
}

export function clearMissionProfile(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(MISSION_PROFILE_STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

/** Map homepage configurator picks to Mission Solution Builder demo fields. */
export function mapProfileToBuilderInputs(profile: MissionProfileSelections) {
  const climateMap: Record<EnvironmentId, "cold" | "hot" | "maritime" | "mountain"> = {
    arctic: "cold",
    desert: "hot",
    jungle: "mountain",
    maritime: "maritime",
  };
  const missionMap: Record<MissionTypeId, "hq" | "medical" | "fad" | "training"> = {
    c2: "hq",
    medical: "medical",
    maintenance: "fad",
    basecamp: "training",
  };
  const crewMap: Record<TimelineId, number> = {
    immediate: 16,
    near: 24,
    por: 36,
    concept: 12,
  };
  return {
    climate: climateMap[profile.environment],
    mission: missionMap[profile.missionType],
    crew: crewMap[profile.timeline],
  };
}
