"use client";

import { useMemo, useState } from "react";
import { HeroTopoCanvas } from "@/components/HeroTopoCanvas";
import { ProductCatalogCard } from "@/components/products/ProductCatalogCard";
import { ProductFilterBar, type ProductFilters } from "@/components/products/ProductFilterBar";
import { SectionReveal } from "@/components/site/SectionReveal";
import { filterProducts, PRODUCTS } from "@/lib/products";

const defaultFilters: ProductFilters = {
  mission: "all",
  environment: "all",
  mobility: "all",
  size: "all",
};

export function ConfigurableSolutionsShowcase() {
  const [filters, setFilters] = useState<ProductFilters>(defaultFilters);
  const [gridKey, setGridKey] = useState(0);

  const filtered = useMemo(() => filterProducts(PRODUCTS, filters), [filters]);

  const handleFilterChange = (next: ProductFilters) => {
    setFilters(next);
    setGridKey((k) => k + 1);
  };

  const handleClear = () => {
    setFilters(defaultFilters);
    setGridKey((k) => k + 1);
  };

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/[0.08] bg-[#080a0c]">
        <HeroTopoCanvas />
        <div className="relative z-10 mx-auto max-w-[1400px] px-4 py-16 sm:px-6 sm:py-20 lg:px-12 lg:py-24">
          <p className="wh-label">Shelter Systems</p>
          <h1 className="font-display mt-6 max-w-3xl text-[2.25rem] font-semibold leading-[0.98] tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">
            Every configuration starts with your mission.
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-[#8a9099] sm:text-lg">
            Browse our shelter system building blocks — filter by mission type, environment, or mobility requirement.
          </p>
        </div>
      </section>

      <ProductFilterBar filters={filters} onChange={handleFilterChange} onClear={handleClear} />

      <section className="bg-[#080a0c] py-12 sm:py-16">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12">
          <SectionReveal>
            <div
              key={gridKey}
              className="grid grid-cols-1 gap-0.5 sm:grid-cols-2 lg:grid-cols-3 wh-grid-fade-in"
            >
              {filtered.map((product) => (
                <div key={product.slug} data-reveal-child>
                  <ProductCatalogCard product={product} />
                </div>
              ))}
            </div>
            {filtered.length === 0 && (
              <p className="py-16 text-center text-sm text-[#8a9099]">No systems match the selected filters.</p>
            )}
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
