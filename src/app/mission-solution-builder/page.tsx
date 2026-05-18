import type { Metadata } from "next";
import { MissionSolutionBuilder } from "@/components/mission/MissionSolutionBuilder";

export const metadata: Metadata = {
  title: "Mission Solution Builder",
  description: "Define operational parameters and receive a tailored shelter system recommendation.",
};

export default function MissionSolutionBuilderPage() {
  return (
    <main className="bg-[#080a0c] pt-16 text-white lg:pt-[4.25rem]">
      <MissionSolutionBuilder />
    </main>
  );
}
