import type { Metadata } from "next";
import { ResourcesLibrary } from "@/components/resources/ResourcesLibrary";

export const metadata: Metadata = {
  title: "Resources",
  description: "Technical documents for authorized programs — capabilities briefs, spec sheets, and references.",
};

export default function ResourcesPage() {
  return (
    <main className="bg-[#080a0c] pt-16 text-white lg:pt-[4.25rem]">
      <ResourcesLibrary />
    </main>
  );
}
