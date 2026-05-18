"use client";

import Link from "next/link";
import { useState } from "react";
import { HeroTopoCanvas } from "@/components/HeroTopoCanvas";
import { ProductCatalogCard } from "@/components/products/ProductCatalogCard";
import { InteractiveShelterVisual } from "@/components/home/InteractiveShelterVisual";
import { SectionReveal } from "@/components/site/SectionReveal";
import { trackEvent } from "@/lib/analytics";
import {
  CAPABILITY_CATEGORIES,
  type CapabilityCategoryId,
} from "@/lib/capabilitiesExplorer";
import { getProductsBySlugs } from "@/lib/products";

export function CapabilitiesExplorer() {
  const [activeId, setActiveId] = useState<CapabilityCategoryId>("shelter");
  const [fade, setFade] = useState(true);

  const category = CAPABILITY_CATEGORIES.find((c) => c.id === activeId)!;
  const relatedProducts = getProductsBySlugs(category.relatedSlugs);

  const select = (id: CapabilityCategoryId) => {
    if (id === activeId) return;
    void trackEvent("click", `Capability category — ${CAPABILITY_CATEGORIES.find((c) => c.id === id)?.label ?? id}`);
    setFade(false);
    window.setTimeout(() => {
      setActiveId(id);
      setFade(true);
    }, 150);
  };

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/[0.08] bg-[#080a0c]">
        <HeroTopoCanvas />
        <div className="relative z-10 mx-auto max-w-[1400px] px-4 py-16 sm:px-6 sm:py-20 lg:px-12 lg:py-24">
          <p className="wh-label">Capabilities</p>
          <h1 className="font-display mt-6 max-w-4xl text-[2.25rem] font-semibold leading-[0.98] tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">
            Engineering-led capability across the full mission spectrum.
          </h1>
        </div>
      </section>

      <section className="border-b border-white/[0.08] bg-[#080a0c]">
        <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-12 lg:py-14">
          <div className="border border-white/[0.08] bg-[#0d0f12]">
            <div className="flex gap-2 overflow-x-auto border-b border-white/[0.08] p-3 lg:hidden">
              {CAPABILITY_CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => select(c.id)}
                  className={`shrink-0 border px-3 py-2 font-mono text-[10px] uppercase tracking-wider ${
                    activeId === c.id
                      ? "border-[#c8a96e] text-[#c8a96e]"
                      : "border-white/10 text-[#8a9099]"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <div className="grid lg:grid-cols-12">
              <nav className="hidden border-r border-white/[0.08] lg:col-span-4 lg:block">
                <ul className="py-2">
                  {CAPABILITY_CATEGORIES.map((c) => (
                    <li key={c.id}>
                      <button
                        type="button"
                        onClick={() => select(c.id)}
                        className={`w-full border-l-2 px-6 py-4 text-left text-sm transition ${
                          activeId === c.id
                            ? "border-[#c8a96e] bg-[#c8a96e]/[0.06] text-white"
                            : "border-transparent text-[#8a9099] hover:border-white/20 hover:text-white"
                        }`}
                      >
                        {c.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>

              <div
                className={`p-6 transition-opacity duration-300 sm:p-8 lg:col-span-8 ${
                  fade ? "opacity-100" : "opacity-0"
                }`}
              >
                <p className="wh-label">{category.label}</p>
                <h2 className="font-display mt-4 text-2xl font-semibold text-white sm:text-3xl">
                  {category.headline}
                </h2>
                <div className="mt-6 space-y-4 text-sm leading-relaxed text-[#8a9099] sm:text-base">
                  {category.paragraphs.map((p) => (
                    <p key={p.slice(0, 40)}>{p}</p>
                  ))}
                </div>
                <ul className="mt-6 space-y-2">
                  {category.features.map((f) => (
                    <li key={f} className="flex gap-3 text-sm text-[#8a9099]">
                      <span className="mt-2 h-1 w-1 shrink-0 bg-[#c8a96e]" />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="relative mt-10 min-h-[200px] border border-white/[0.1] bg-black">
                  <p className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-wider text-[#8a9099]">
                    {category.diagramLabel}
                  </p>
                  <div className="flex min-h-[200px] items-center justify-center p-8">
                    <InteractiveShelterVisual className="max-w-xs text-[#8a9099]" />
                  </div>
                </div>

                <p className="mt-10 wh-label">Related products</p>
                <div className="mt-4 grid gap-0.5 sm:grid-cols-2">
                  {relatedProducts.map((p) => (
                    <ProductCatalogCard key={p.slug} product={p} />
                  ))}
                </div>
                <Link
                  href="/configurable-solutions"
                  className="mt-8 inline-block font-mono text-[11px] uppercase tracking-wider text-[#c8a96e] hover:opacity-70"
                >
                  View all shelter systems →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionReveal className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 lg:px-12">
        <p data-reveal-child className="wh-label">
          Program engagement
        </p>
        <p data-reveal-child className="mt-4 max-w-2xl text-[#8a9099]">
          Request a controlled technical exchange matched to clearance and program status.
        </p>
        <Link
          data-reveal-child
          href="/request-access"
          className="mt-6 inline-flex min-h-11 items-center border border-white bg-white px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-black"
        >
          Request access
        </Link>
      </SectionReveal>
    </>
  );
}
