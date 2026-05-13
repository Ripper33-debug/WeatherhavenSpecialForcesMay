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
    <div className="relative h-[100px] w-full shrink-0 overflow-hidden rounded-sm border border-zinc-700/50 bg-zinc-950 sm:h-[104px] sm:w-[46%] sm:max-w-[168px]">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/40 via-zinc-950 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgb(146_64_14/0.12),transparent_55%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(161 161 170) 1px, transparent 1px), linear-gradient(to bottom, rgb(161 161 170) 1px, transparent 1px)",
          backgroundSize: "14px 14px",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-zinc-800/10" />
      <div className="absolute bottom-2 left-2 right-2 top-2 flex items-center justify-center opacity-[0.35]">
        <ProductCardIcon name={icon} className="h-16 w-16 text-zinc-300" />
      </div>
      <div className="absolute bottom-2 left-2 h-0.5 w-8 rounded-full bg-amber-600/60" />
    </div>
  );
}

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
      <div className="relative -mx-6 -mt-7 mb-5 overflow-hidden border-b border-zinc-800/90">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/90 via-zinc-950 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_0%_0%,rgb(146_64_14/0.08),transparent_50%)]" />
        <div className="relative flex min-h-[112px] flex-col gap-4 px-6 pb-5 pt-6 sm:flex-row sm:items-stretch sm:justify-between">
          <div className="flex flex-1 flex-col justify-center">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
              Capability
            </span>
            <div className="mt-3 flex items-center gap-3">
              <span className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-sm border border-zinc-600/60 bg-black/40 shadow-[inset_0_1px_0_rgb(255_255_255/0.06)]">
                <ProductCardIcon name={icon} className="h-8 w-8 text-amber-500/95" />
              </span>
            </div>
          </div>
          <ProductVisualPanel icon={icon} />
        </div>
      </div>
      {tags.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {tags.map((t) => (
            <span
              key={t}
              className="rounded-sm border border-zinc-600/70 bg-zinc-950/90 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-zinc-300"
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
    "group relative block overflow-hidden rounded-sm border border-zinc-800/80 bg-zinc-900/30 p-6 pt-7 shadow-sm transition duration-300 before:absolute before:inset-x-0 before:top-0 before:h-0.5 before:bg-gradient-to-r before:from-amber-900/40 before:via-amber-500/90 before:to-amber-900/40 hover:-translate-y-0.5 hover:border-zinc-600/80 hover:bg-zinc-900/55 hover:shadow-[0_24px_56px_-28px_rgb(0_0_0/0.95)] active:translate-y-0";

  if (href) {
    return (
      <Link href={href} className={className}>
        {inner}
      </Link>
    );
  }

  return <div className={className}>{inner}</div>;
}
