"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { getProductsBySlugs, type Product } from "@/lib/products";

const MAX_COMPARE = 3;

type ProductCompareContextValue = {
  selectedSlugs: string[];
  selectedProducts: Product[];
  toggleCompare: (slug: string) => void;
  removeFromCompare: (slug: string) => void;
  clearCompare: () => void;
  isSelected: (slug: string) => boolean;
  compareOpen: boolean;
  setCompareOpen: (open: boolean) => void;
};

const ProductCompareContext = createContext<ProductCompareContextValue | null>(null);

export function ProductCompareProvider({ children }: { children: React.ReactNode }) {
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);

  const selectedProducts = useMemo(() => getProductsBySlugs(selectedSlugs), [selectedSlugs]);

  const toggleCompare = useCallback((slug: string) => {
    setSelectedSlugs((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug);
      if (prev.length >= MAX_COMPARE) return prev;
      return [...prev, slug];
    });
  }, []);

  const removeFromCompare = useCallback((slug: string) => {
    setSelectedSlugs((prev) => prev.filter((s) => s !== slug));
  }, []);

  const clearCompare = useCallback(() => setSelectedSlugs([]), []);

  const isSelected = useCallback((slug: string) => selectedSlugs.includes(slug), [selectedSlugs]);

  const value = useMemo(
    () => ({
      selectedSlugs,
      selectedProducts,
      toggleCompare,
      removeFromCompare,
      clearCompare,
      isSelected,
      compareOpen,
      setCompareOpen,
    }),
    [
      selectedSlugs,
      selectedProducts,
      toggleCompare,
      removeFromCompare,
      clearCompare,
      isSelected,
      compareOpen,
    ],
  );

  return <ProductCompareContext.Provider value={value}>{children}</ProductCompareContext.Provider>;
}

export function useProductCompare() {
  const ctx = useContext(ProductCompareContext);
  if (!ctx) throw new Error("useProductCompare must be used within ProductCompareProvider");
  return ctx;
}
