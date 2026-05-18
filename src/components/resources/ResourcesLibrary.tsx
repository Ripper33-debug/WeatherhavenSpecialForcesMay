"use client";

import { IconLock } from "@tabler/icons-react";
import { useMemo, useState } from "react";
import { HeroTopoCanvas } from "@/components/HeroTopoCanvas";
import { trackEvent } from "@/lib/analytics";
import { PRODUCTS } from "@/lib/products";
import {
  RESOURCE_CLASSIFICATIONS,
  RESOURCE_DOCUMENTS,
  RESOURCE_DOC_TYPES,
  type ResourceClassification,
  type ResourceDocType,
} from "@/lib/resources";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function ResourcesLibrary() {
  const [docType, setDocType] = useState<string>("All");
  const [system, setSystem] = useState<string>("All");
  const [classification, setClassification] = useState<string>("All");
  const { ref, rootClass } = useScrollReveal({ variant: "slide-up-stagger", staggerMs: 80, threshold: 0.15 });

  const systemOptions = useMemo(() => {
    const names = new Set(RESOURCE_DOCUMENTS.map((d) => d.system));
    PRODUCTS.forEach((p) => names.add(p.code));
    return ["All", ...Array.from(names).sort()];
  }, []);

  const filtered = useMemo(() => {
    return RESOURCE_DOCUMENTS.filter((d) => {
      if (docType !== "All" && d.docType !== docType) return false;
      if (system !== "All" && d.system !== system) return false;
      if (classification !== "All" && d.classification !== classification) return false;
      return true;
    });
  }, [docType, system, classification]);

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/[0.08] bg-[#080a0c]">
        <HeroTopoCanvas />
        <div className="relative z-10 mx-auto max-w-[1400px] px-4 pt-20 pb-14 sm:px-6 lg:px-12 lg:pb-20">
          <p className="wh-label text-[#c8a96e]">Resources library</p>
          <h1 className="font-display mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Technical documents for authorized programs.
          </h1>
          <p className="mt-6 max-w-2xl text-base text-[#8a9099]">
            Capabilities briefs, spec sheets, and technical references. Distribution controlled.
          </p>
        </div>
      </section>

      <section className="bg-[#080a0c]">
        <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-12">
          <div className="flex gap-6 overflow-x-auto border-b border-white/[0.08] pb-4">
            <FilterGroup
              label="Document type"
              options={RESOURCE_DOC_TYPES}
              value={docType}
              onChange={setDocType}
            />
            <FilterGroup label="System" options={systemOptions} value={system} onChange={setSystem} />
            <FilterGroup
              label="Classification"
              options={RESOURCE_CLASSIFICATIONS}
              value={classification}
              onChange={setClassification}
            />
          </div>

          <div ref={ref} className={`mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 ${rootClass}`}>
            {filtered.map((doc) => (
              <article
                key={doc.id}
                data-reveal-child
                className="flex flex-col border border-[rgba(255,255,255,0.08)] bg-[#0d0f12] p-5 transition hover:border-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.02)]"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-[#c8a96e]">
                    {doc.docType}
                  </span>
                  <ClassificationBadge classification={doc.classification} />
                </div>
                <h2 className="mt-4 text-base font-medium text-white">{doc.title}</h2>
                <p className="mt-1 text-[13px] text-[#8a9099]">{doc.system}</p>
                <div className="mt-auto flex items-end justify-between gap-4 pt-8">
                  <div className="flex items-center gap-3 text-[11px] text-[#8a9099]">
                    <span className="border border-white/[0.12] px-2 py-0.5 font-mono uppercase">{doc.format}</span>
                    <span>{doc.size}</span>
                  </div>
                  {doc.classification === "CUI" ? (
                    <div className="flex items-center gap-2 text-[11px] text-amber-500/90">
                      <IconLock size={14} aria-hidden />
                      <span>Clearance verification required</span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => void trackEvent("click", `Resource download — ${doc.title}`)}
                      className="border border-white/20 bg-transparent px-3 py-2 text-[11px] font-medium uppercase tracking-wider text-white transition hover:border-white/40"
                    >
                      Download
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function FilterGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="shrink-0">
      <p className="wh-label mb-2 text-[#8a9099]">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`whitespace-nowrap border px-3 py-1.5 text-[11px] uppercase tracking-wider transition ${
              value === opt
                ? "border-[#c8a96e] text-[#c8a96e]"
                : "border-white/[0.12] text-[#8a9099] hover:border-white/25 hover:text-white"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function ClassificationBadge({ classification }: { classification: ResourceClassification }) {
  const isCui = classification === "CUI";
  return (
    <span
      className={`font-mono text-[10px] uppercase tracking-wider ${
        isCui ? "text-amber-500/90" : "text-[#8a9099]"
      }`}
    >
      {classification}
    </span>
  );
}
