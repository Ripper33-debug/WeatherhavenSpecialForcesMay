import Link from "next/link";
import type { ProductIconKey } from "@/components/ProductCardIcons";
import { ProductCardIcon } from "@/components/ProductCardIcons";

export type ProductCardProps = {
  title: string;
  description: string;
  tags?: string[];
  href?: string;
  linkLabel?: string;
  /** Visual accent for the card header; pairs with image placeholder strip. */
  icon?: ProductIconKey;
};

export function ProductCard({
  title,
  description,
  tags = [],
  href,
  linkLabel = "View details",
  icon = "default",
}: ProductCardProps) {
  const inner = (
    <>
      <div className="relative -mx-6 -mt-7 mb-5 overflow-hidden border-b border-zinc-800/80 bg-gradient-to-br from-zinc-900/95 via-zinc-950 to-zinc-950 px-6 pb-6 pt-6">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgb(244 244 245) 1px, transparent 1px), linear-gradient(to bottom, rgb(244 244 245) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        />
        <div className="relative flex min-h-[100px] flex-col gap-4 sm:min-h-[132px] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 flex-col justify-center">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
              Product line
            </span>
            <div className="mt-3 flex items-center gap-3">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-sm border border-zinc-700/80 bg-zinc-950/60 shadow-inner">
                <ProductCardIcon name={icon} className="h-9 w-9 text-amber-600/90" />
              </span>
            </div>
          </div>
          <div className="relative h-20 w-full shrink-0 overflow-hidden rounded-sm border border-dashed border-zinc-700/60 bg-zinc-950/50 sm:h-[88px] sm:w-[44%] sm:max-w-[160px]">
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 to-transparent" />
            <p className="absolute bottom-2 left-2 right-2 font-mono text-[9px] uppercase leading-tight tracking-wide text-zinc-600">
              Image / render
            </p>
          </div>
        </div>
      </div>
      {tags.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {tags.map((t) => (
            <span
              key={t}
              className="rounded-sm border border-zinc-700/90 bg-zinc-950/80 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-400"
            >
              {t}
            </span>
          ))}
        </div>
      )}
      <h3 className="font-display text-lg font-semibold tracking-tight text-zinc-50">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">{description}</p>
      {href && (
        <span className="mt-5 inline-block font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-500/95 transition group-hover:text-amber-400">
          {linkLabel} →
        </span>
      )}
    </>
  );

  const className =
    "group relative block overflow-hidden rounded-sm border border-zinc-800/90 bg-zinc-900/40 p-6 pt-7 shadow-sm transition duration-300 before:absolute before:inset-x-0 before:top-0 before:h-0.5 before:bg-gradient-to-r before:from-amber-800/30 before:via-amber-600 before:to-amber-800/30 hover:-translate-y-0.5 hover:border-zinc-600/90 hover:bg-zinc-900/70 hover:shadow-[0_18px_50px_-28px_rgb(0_0_0/0.9)] active:translate-y-0";

  if (href) {
    return (
      <Link href={href} className={className}>
        {inner}
      </Link>
    );
  }

  return <div className={className}>{inner}</div>;
}
