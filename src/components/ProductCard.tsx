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
    <div className="relative h-[92px] w-full shrink-0 overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-950 sm:h-[100px] sm:w-[44%] sm:max-w-[160px]">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/30 via-zinc-950 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgb(30_58_138/0.15),transparent_55%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(161 161 170) 1px, transparent 1px), linear-gradient(to bottom, rgb(161 161 170) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.32]">
        <ProductCardIcon name={icon} className="h-14 w-14 text-zinc-300 sm:h-16 sm:w-16" />
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
      <div className="relative -mx-5 -mt-6 mb-5 overflow-hidden border-b border-white/[0.06] px-5 pb-5 pt-6">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/60 via-zinc-950 to-black" />
        <div className="relative flex min-h-[100px] flex-col gap-4 sm:flex-row sm:items-stretch sm:justify-between">
          <div className="flex flex-1 flex-col justify-center">
            <span className="wh-label text-zinc-600">Configuration building block</span>
            <div className="mt-2.5 flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.1] bg-black/40">
                <ProductCardIcon name={icon} className="h-6 w-6 text-zinc-200" />
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
              className="rounded-full border border-white/[0.08] bg-zinc-950/80 px-2.5 py-0.5 text-[11px] font-medium text-zinc-400"
            >
              {t}
            </span>
          ))}
        </div>
      )}
      <h3 className="font-display text-lg font-semibold tracking-tight text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">{description}</p>
      {href && (
        <span className="mt-4 inline-block text-[12px] font-semibold uppercase tracking-wider text-zinc-300 transition group-hover:text-white">
          {linkLabel} →
        </span>
      )}
    </>
  );

  const className =
    "group relative block overflow-hidden rounded-2xl border border-white/[0.08] bg-zinc-950/40 p-5 pt-6 transition hover:border-white/[0.12] hover:bg-zinc-900/35";

  if (href) {
    return (
      <Link href={href} className={className}>
        {inner}
      </Link>
    );
  }

  return <div className={className}>{inner}</div>;
}
