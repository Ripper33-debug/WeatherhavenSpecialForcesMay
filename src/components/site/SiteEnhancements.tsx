"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { CustomCursor } from "@/components/site/CustomCursor";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { ProductCompareBar } from "@/components/products/ProductCompareBar";
import { ProductCompareOverlay } from "@/components/products/ProductCompareOverlay";

export function SiteEnhancements({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(false);
    const t = window.setTimeout(() => setVisible(true), 200);
    return () => window.clearTimeout(t);
  }, [pathname]);

  return (
    <>
      <ScrollProgress />
      <CustomCursor />
      <div
        className={`wh-page-transition flex min-h-0 flex-1 flex-col ${visible ? "wh-page-in" : "wh-page-out"}`}
      >
        {children}
      </div>
      <ProductCompareBar />
      <ProductCompareOverlay />
    </>
  );
}
