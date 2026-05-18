"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import type { Product } from "@/lib/products";
import { useProductCompare } from "@/contexts/ProductCompareContext";

export function ProductCatalogCard({ product }: { product: Product }) {
  const { isSelected, toggleCompare, selectedSlugs } = useProductCompare();
  const [hover, setHover] = useState(false);
  const selected = isSelected(product.slug);
  const compareFull = selectedSlugs.length >= 3 && !selected;

  return (
    <Link
      href={`/configurable-solutions/${product.slug}`}
      className={`group relative isolate flex min-h-[320px] flex-col overflow-hidden border border-transparent transition-[border-color,filter] duration-200 hover:border-[rgba(200,169,110,0.4)] ${
        selected ? "border-[#c8a96e]" : ""
      }`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => void trackEvent("click", `Product card viewed — ${product.name}`)}
    >
      <Image
        src="/sof/card.svg"
        alt=""
        fill
        className={`object-cover transition-[filter] duration-300 ${hover ? "brightness-[1.15]" : "brightness-[0.65]"}`}
        sizes="(max-width:768px) 100vw, 33vw"
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(8,10,12,0.92) 0%, rgba(8,10,12,0.25) 55%)" }}
      />

      <div
        className={`absolute right-4 top-4 transition-opacity duration-200 ${
          hover || selected ? "opacity-100" : "opacity-0"
        }`}
      >
        <label
          className="flex cursor-pointer items-center gap-2 border border-white/20 bg-black/60 px-2 py-1.5"
          onClick={(e) => e.preventDefault()}
        >
          <input
            type="checkbox"
            checked={selected}
            disabled={compareFull}
            onChange={() => toggleCompare(product.slug)}
            className="accent-[#c8a96e]"
          />
          <span className="font-mono text-[9px] uppercase tracking-wider text-[#8a9099]">Compare</span>
        </label>
      </div>

      <p className="absolute left-4 top-4 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[#c8a96e]">
        {product.tag}
      </p>

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 sm:p-5">
        <div>
          <p className="font-mono text-[11px] text-[#8a9099]">{product.code}</p>
          <p className="font-display mt-1 text-lg font-medium leading-snug text-white sm:text-xl">{product.name}</p>
          {hover && (
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[#c8a96e]">View System →</p>
          )}
        </div>
        <span className="shrink-0 text-xl text-white/80 transition-opacity group-hover:text-[#c8a96e]" aria-hidden>
          →
        </span>
      </div>
    </Link>
  );
}
