import Link from "next/link";
import type { ProductIconKey } from "@/components/ProductCardIcons";
import { ProductCardIcon } from "@/components/ProductCardIcons";

export type ProductCardProps = {
  title: string;
  description: string;
  tags?: string[];
  href?: string;
  linkLabel?: string;
  icon?: ProductIconKey;
};

function ProductVisualPanel({ icon }: { icon: ProductIconKey }) {
  return (
    <div className="relative h-[92px] w-full shrink-0 overflow-hidden border border-white/[0.06] bg-[#080a0c] sm:h-[100px] sm:w-[44%] sm:max-w-[160px]">
      <div className="absolute inset-0 bg-[rgba(8,10,12,0.5)]" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
        aria-hidden
      />
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.32]">
        <ProductCardIcon name={icon} className="h-14 w-14 text-[#8a9099] sm:h-16 sm:w-16" />
      </div>
    </div>
  );
}

export function ProductCard({
  title,
  description,
  tags = [],
  href,
  linkLabel = "Learn more",
  icon = "default",
}: ProductCardProps) {
  const inner = (
    <>
      <div className="relative -mx-5 -mt-6 mb-5 overflow-hidden border-b border-white/[0.06] bg-[#080a0c] px-5 pb-5 pt-6">
        <div className="relative flex min-h-[100px] flex-col gap-4 sm:flex-row sm:items-stretch sm:justify-between">
          <div className="flex flex-1 flex-col justify-center">
            <span className="wh-label text-[#8a9099]">Configuration building block</span>
            <div className="mt-2.5 flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-white/[0.1] bg-black/40">
                <ProductCardIcon name={icon} className="h-6 w-6 text-white" />
              </span>
            </div>
          </div>
          <ProductVisualPanel icon={icon} />
        </div>
      </div>
      {tags.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <span
              key={t}
              className="border border-white/[0.08] bg-black/40 px-2.5 py-0.5 text-[11px] font-medium text-[#8a9099]"
            >
              {t}
            </span>
          ))}
        </div>
      )}
      <h3 className="font-display text-lg font-semibold tracking-tight text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[#8a9099]">{description}</p>
      {href && (
        <span className="mt-4 inline-block text-[12px] font-semibold uppercase tracking-wider text-[#8a9099] transition group-hover:text-white">
          {linkLabel} →
        </span>
      )}
    </>
  );

  const className =
    "group relative block overflow-hidden border border-white/[0.08] bg-[#080a0c] p-5 pt-6 transition hover:border-white/[0.12] hover:bg-black/20";

  if (href) {
    return (
      <Link href={href} className={className}>
        {inner}
      </Link>
    );
  }

  return <div className={className}>{inner}</div>;
}
