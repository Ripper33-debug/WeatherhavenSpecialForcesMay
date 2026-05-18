"use client";

import Link from "next/link";
import { useState } from "react";
import { InteractiveShelterVisual } from "@/components/home/InteractiveShelterVisual";
import { ProductCatalogCard } from "@/components/products/ProductCatalogCard";
import { SectionReveal } from "@/components/site/SectionReveal";
import { trackEvent } from "@/lib/analytics";
import { getProductsBySlugs, type Product } from "@/lib/products";
import { useProductCompare } from "@/contexts/ProductCompareContext";

const TABS = ["OVERVIEW", "SPECIFICATIONS", "CONFIGURATIONS", "DOWNLOADS"] as const;
type Tab = (typeof TABS)[number];

const btnPrimary =
  "inline-flex min-h-11 items-center justify-center border border-white bg-white px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-zinc-100";
const btnGhost =
  "inline-flex min-h-11 items-center justify-center border border-white/25 bg-transparent px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition hover:border-white/50 hover:bg-white/[0.04]";

export function ProductDetailView({ product }: { product: Product }) {
  const [tab, setTab] = useState<Tab>("OVERVIEW");
  const { toggleCompare, isSelected } = useProductCompare();
  const related = getProductsBySlugs(product.relatedSlugs);

  const onTab = (t: Tab) => {
    setTab(t);
    void trackEvent("click", `Product detail tab — ${t}`);
  };

  return (
    <>
      <section className="border-b border-white/[0.08] bg-[#080a0c]">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-12 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-12 lg:py-16">
          <div className="relative min-h-[320px] border border-white/[0.12] bg-black lg:col-span-7 lg:min-h-[480px]">
            <div className="absolute inset-x-6 bottom-8 top-8 flex items-center justify-center">
              <InteractiveShelterVisual className="w-full max-w-md text-[#8a9099]" />
            </div>
            <p className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-wider text-[#8a9099]">
              Interactive systems diagram
            </p>
          </div>

          <div className="lg:col-span-5">
            <p className="wh-label">{product.tag}</p>
            <p className="mt-4 font-mono text-[13px] text-[#8a9099]">{product.code}</p>
            <h1 className="font-display mt-3 text-3xl font-semibold tracking-[-0.02em] text-white sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-6 text-base leading-relaxed text-[#8a9099]">{product.description}</p>

            <ul className="mt-8 space-y-3">
              {product.specs.map((s) => (
                <li key={s.label} className="border-l border-[#c8a96e] pl-4">
                  <p className="text-[11px] font-medium uppercase tracking-wider text-[#8a9099]">{s.label}</p>
                  <p className="mt-1 text-sm text-white">{s.value}</p>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/request-access"
                className={btnPrimary}
                onClick={() => void trackEvent("click", `Request configuration — ${product.name}`)}
              >
                Request This Configuration
              </Link>
              <Link
                href={product.downloads[0]?.href ?? "/resources"}
                className={btnGhost}
                onClick={() => void trackEvent("click", `Download spec sheet — ${product.name}`)}
              >
                Download Spec Sheet
              </Link>
            </div>
            <button
              type="button"
              onClick={() => toggleCompare(product.slug)}
              className="mt-4 font-mono text-[11px] uppercase tracking-wider text-[#c8a96e] transition hover:opacity-70"
            >
              {isSelected(product.slug) ? "Remove from Compare" : "Add to Compare"}
            </button>
          </div>
        </div>
      </section>

      <section className="border-b border-white/[0.08] bg-[#0d0f12]">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12">
          <div className="flex gap-0 overflow-x-auto border-b border-white/[0.08]">
            {TABS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => onTab(t)}
                className={`shrink-0 px-5 py-4 font-mono text-[11px] uppercase tracking-[0.14em] transition ${
                  tab === t
                    ? "border-b-2 border-[#c8a96e] text-[#c8a96e]"
                    : "text-[#8a9099] hover:text-white"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="py-10 sm:py-12">
            {tab === "OVERVIEW" && (
              <div className="max-w-3xl space-y-5 text-sm leading-relaxed text-[#8a9099] sm:text-base">
                {product.overview.map((p) => (
                  <p key={p.slice(0, 48)}>{p}</p>
                ))}
                <div className="grid gap-4 pt-6 sm:grid-cols-3">
                  {product.features.map((f) => (
                    <div key={f.title} className="border border-white/[0.08] bg-[#080a0c] p-5">
                      <p className="text-sm font-medium text-white">{f.title}</p>
                      <p className="mt-2 text-xs leading-relaxed text-[#8a9099]">{f.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === "SPECIFICATIONS" && (
              <table className="w-full border-collapse text-left text-sm">
                <tbody>
                  {product.specs.map((s, i) => (
                    <tr key={s.label} className={i % 2 === 0 ? "bg-[#080a0c]" : "bg-[#0d0f12]"}>
                      <th className="w-1/3 px-4 py-3 font-mono text-[11px] uppercase tracking-wider text-[#8a9099]">
                        {s.label}
                      </th>
                      <td className="px-4 py-3 text-white">{s.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {tab === "CONFIGURATIONS" && (
              <div className="grid gap-3 sm:grid-cols-2">
                {product.configurations.map((c) => (
                  <div key={c.title} className="border border-white/[0.08] bg-[#080a0c] p-6">
                    <p className="font-medium text-white">{c.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-[#8a9099]">{c.description}</p>
                  </div>
                ))}
              </div>
            )}

            {tab === "DOWNLOADS" && (
              <ul className="divide-y divide-white/[0.08] border border-white/[0.08]">
                {product.downloads.map((d) => (
                  <li
                    key={d.name}
                    className="flex flex-wrap items-center justify-between gap-4 bg-[#080a0c] px-4 py-4 sm:px-6"
                  >
                    <div>
                      <p className="text-sm font-medium text-white">{d.name}</p>
                      <p className="mt-1 text-xs text-[#8a9099]">
                        <span className="border border-white/20 px-1.5 py-0.5 font-mono text-[10px]">
                          {d.type}
                        </span>
                        <span className="ml-2">{d.size}</span>
                      </p>
                    </div>
                    <Link
                      href={d.href}
                      className="font-mono text-[11px] uppercase tracking-wider text-[#c8a96e] hover:opacity-70"
                      onClick={() => void trackEvent("click", `Download spec sheet — ${product.name}`)}
                    >
                      Download
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-[#080a0c] py-14 sm:py-16">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12">
            <SectionReveal>
              <p className="wh-label" data-reveal-child>
                Related systems
              </p>
              <div className="mt-8 grid grid-cols-1 gap-0.5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p) => (
                  <div key={p.slug} data-reveal-child>
                    <ProductCatalogCard product={p} />
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>
        </section>
      )}
    </>
  );
}
