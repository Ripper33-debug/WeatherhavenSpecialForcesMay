"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { HeroTopoCanvas } from "@/components/HeroTopoCanvas";
import { MissionConfigurator } from "@/components/home/MissionConfigurator";
import { InteractiveShelterVisual } from "@/components/home/InteractiveShelterVisual";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const btnPrimary =
  "inline-flex min-h-11 items-center justify-center border border-white bg-white px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-zinc-100";
const btnGhost =
  "inline-flex min-h-11 items-center justify-center border border-white/25 bg-transparent px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition hover:border-white/50 hover:bg-white/[0.04]";

export function HomeHeroInteractive() {
  const [configOpen, setConfigOpen] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("");
  const { ref: heroRef, rootClass } = useScrollReveal({ immediate: true });

  useEffect(() => {
    setLastUpdated(
      new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).toUpperCase(),
    );
  }, []);

  return (
    <>
      <section className="relative min-h-[calc(100dvh-4rem)] overflow-hidden border-b border-white/[0.08] bg-[#080a0c] sm:min-h-[calc(100dvh-4.25rem)]">
        <HeroTopoCanvas />

        <div
          ref={heroRef}
          className={`relative z-10 mx-auto flex min-h-[inherit] max-w-[1400px] flex-col justify-center px-4 py-16 sm:px-6 sm:py-20 lg:px-12 lg:py-24 ${rootClass}`}
        >
          <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
            <div data-reveal-child className="lg:col-span-5">
              <div className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] tracking-[0.1em] text-[#8a9099]">
                <span className="inline-flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping bg-emerald-500/40" />
                    <span className="relative inline-flex h-2 w-2 bg-emerald-500" />
                  </span>
                  PLATFORM ACTIVE
                </span>
                <span aria-hidden>·</span>
                <span>LAST UPDATED: {lastUpdated || "—"}</span>
                <span aria-hidden>·</span>
                <span>AUTHORIZED USERS ONLY</span>
              </div>

              <p className="wh-label max-w-xl border-b border-white/10 pb-3">Mission-engineered infrastructure</p>
              <h1 className="font-display mt-6 max-w-3xl text-[2.25rem] font-semibold leading-[0.98] tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl xl:text-[3.75rem]">
                Deployable infrastructure shaped around your mission.
              </h1>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-[#8a9099] sm:text-lg lg:max-w-lg">
                Weatherhaven starts with your mission profile, environment, personnel, mobility, power, timeline, and
                sustainment—then composes deployable shelter, ECU, power, flooring, and layout engineering as configurable
                building blocks, not cookie-cutter products.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                <button type="button" onClick={() => setConfigOpen(true)} className={btnPrimary}>
                  Configure Your Mission
                </button>
                <Link href="/capabilities" className={btnGhost}>
                  Capabilities
                </Link>
              </div>
            </div>

            <div data-reveal-child className="lg:col-span-7">
              <div className="relative mx-auto w-full lg:mx-0 lg:max-w-none">
                <div className="relative overflow-hidden border border-white/[0.12] bg-[#080a0c] shadow-[0_0_0_1px_rgb(255_255_255/0.04)]">
                  <div className="relative flex items-center justify-between border-b border-white/[0.08] px-5 py-4 sm:px-6">
                    <div className="flex items-center gap-3">
                      <span className="h-1.5 w-1.5 shrink-0 border border-white/40 bg-white/20" aria-hidden />
                      <span className="wh-label text-[#8a9099]">Systems visualization</span>
                    </div>
                    <span className="wh-label text-[#8a9099]">Interactive</span>
                  </div>

                  <div className="relative aspect-[16/11] w-full min-h-[220px] bg-black lg:aspect-[16/10] lg:min-h-[320px] xl:min-h-[380px]">
                    <div
                      className="pointer-events-none absolute inset-0 opacity-[0.03]"
                      style={{
                        backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px),
                          linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)`,
                        backgroundSize: "32px 32px",
                      }}
                      aria-hidden
                    />
                    <div className="absolute inset-x-0 bottom-0 h-2/5 bg-[rgba(8,10,12,0.85)]" aria-hidden />
                    <div className="absolute inset-x-8 bottom-12 top-10 flex items-end justify-center sm:inset-x-12 lg:bottom-16">
                      <InteractiveShelterVisual className="w-full max-w-[min(100%,420px)] text-[#8a9099] lg:max-w-[460px]" />
                    </div>
                  </div>

                  <div className="relative flex flex-wrap gap-x-10 gap-y-2 border-t border-white/[0.08] bg-black/60 px-5 py-4 sm:px-6">
                    <span className="wh-label text-[#8a9099]">Shelter stack</span>
                    <span className="wh-label text-[#8a9099]">Power &amp; environmental</span>
                    <span className="wh-label text-[#8a9099]">Field integration</span>
                  </div>
                </div>
              </div>

              <aside className="mt-10 border-t border-white/[0.08] pt-10 lg:mt-12">
                <span className="wh-label text-[#8a9099]">Operating principle</span>
                <p className="font-display mt-4 max-w-xl text-xl font-medium leading-snug tracking-tight text-white sm:text-2xl">
                  Built around the mission, not pulled from a shelf.
                </p>
              </aside>
            </div>
          </div>
        </div>
      </section>

      <MissionConfigurator open={configOpen} onClose={() => setConfigOpen(false)} />
    </>
  );
}
