import { HomeHeroInteractive } from "@/components/home/HomeHeroInteractive";
import { HomeCapabilityTiles } from "@/components/home/HomeCapabilityTiles";
import { HomeUseCaseCards } from "@/components/home/HomeUseCaseCards";
import { HomeStatsSection } from "@/components/home/HomeStatsSection";
import { HomeProcessSection } from "@/components/home/HomeProcessSection";
import { HomeCTASection } from "@/components/home/HomeCTASection";

export default function HomePage() {
  return (
    <>
      <HomeHeroInteractive />

      <section className="border-b border-white/[0.08] bg-[#080a0c]">
        <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-12">
          <p className="text-center font-display text-lg font-medium leading-snug tracking-tight text-[#8a9099] sm:text-xl">
            Weatherhaven starts with mission profile, environment, personnel, mobility, power, timeline, and sustainment—then
            composes shelter, ECU, power, flooring, and layout as configurable building blocks for command, maintenance,
            medical, and berthing—without cookie-cutter assumptions.
          </p>
        </div>
      </section>

      <HomeCapabilityTiles />
      <HomeUseCaseCards />
      <HomeStatsSection />
      <HomeProcessSection />
      <HomeCTASection />
    </>
  );
}
