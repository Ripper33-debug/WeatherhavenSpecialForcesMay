"use client";

import {
  FILTER_ENVIRONMENT_OPTIONS,
  FILTER_MISSION_OPTIONS,
  FILTER_MOBILITY_OPTIONS,
  FILTER_SIZE_OPTIONS,
  type ProductFilterEnvironment,
  type ProductFilterMission,
  type ProductFilterMobility,
  type ProductFilterSize,
} from "@/lib/products";
import { useProductCompare } from "@/contexts/ProductCompareContext";

export type ProductFilters = {
  mission: ProductFilterMission;
  environment: ProductFilterEnvironment;
  mobility: ProductFilterMobility;
  size: ProductFilterSize;
};

type Props = {
  filters: ProductFilters;
  onChange: (filters: ProductFilters) => void;
  onClear: () => void;
  sticky?: boolean;
};

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex min-w-0 flex-col gap-1.5">
      <span className="font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-[#8a9099]">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-9 border border-white/10 bg-[#080a0c] px-3 py-2 font-mono text-[11px] text-white outline-none transition-colors hover:border-white/20 focus:border-[#c8a96e]/50"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-[#080a0c]">
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function ProductFilterBar({ filters, onChange, onClear, sticky = true }: Props) {
  const { selectedSlugs, setCompareOpen } = useProductCompare();

  const activeTags: { key: keyof ProductFilters; label: string }[] = [];
  if (filters.mission !== "all") {
    activeTags.push({
      key: "mission",
      label: FILTER_MISSION_OPTIONS.find((o) => o.value === filters.mission)?.label ?? filters.mission,
    });
  }
  if (filters.environment !== "all") {
    activeTags.push({
      key: "environment",
      label: FILTER_ENVIRONMENT_OPTIONS.find((o) => o.value === filters.environment)?.label ?? filters.environment,
    });
  }
  if (filters.mobility !== "all") {
    activeTags.push({
      key: "mobility",
      label: FILTER_MOBILITY_OPTIONS.find((o) => o.value === filters.mobility)?.label ?? filters.mobility,
    });
  }
  if (filters.size !== "all") {
    activeTags.push({
      key: "size",
      label: FILTER_SIZE_OPTIONS.find((o) => o.value === filters.size)?.label ?? filters.size,
    });
  }

  return (
    <div
      className={`border-b border-white/[0.08] bg-[#0d0f12] ${sticky ? "sticky top-14 z-40 sm:top-16" : ""}`}
    >
      <div className="mx-auto max-w-[1400px] px-4 py-4 sm:px-6 lg:px-12">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <FilterSelect
              label="Mission Type"
              value={filters.mission}
              options={FILTER_MISSION_OPTIONS}
              onChange={(v) => onChange({ ...filters, mission: v as ProductFilterMission })}
            />
            <FilterSelect
              label="Environment"
              value={filters.environment}
              options={FILTER_ENVIRONMENT_OPTIONS}
              onChange={(v) => onChange({ ...filters, environment: v as ProductFilterEnvironment })}
            />
            <FilterSelect
              label="Mobility"
              value={filters.mobility}
              options={FILTER_MOBILITY_OPTIONS}
              onChange={(v) => onChange({ ...filters, mobility: v as ProductFilterMobility })}
            />
            <FilterSelect
              label="Size"
              value={filters.size}
              options={FILTER_SIZE_OPTIONS}
              onChange={(v) => onChange({ ...filters, size: v as ProductFilterSize })}
            />
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => selectedSlugs.length >= 2 && setCompareOpen(true)}
              disabled={selectedSlugs.length < 2}
              className="min-h-9 border border-white/20 bg-transparent px-4 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition enabled:hover:border-[#c8a96e]/50 enabled:hover:text-[#c8a96e] disabled:opacity-40"
            >
              Compare ({selectedSlugs.length})
            </button>
            <button
              type="button"
              onClick={onClear}
              className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#8a9099] transition hover:text-white"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {activeTags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {activeTags.map((tag) => (
              <button
                key={tag.key}
                type="button"
                onClick={() => onChange({ ...filters, [tag.key]: "all" })}
                className="inline-flex items-center gap-2 border border-[#c8a96e]/30 bg-[#c8a96e]/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-[#c8a96e] transition hover:bg-[#c8a96e]/20"
              >
                {tag.label}
                <span aria-hidden>×</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
