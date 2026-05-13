import Link from "next/link";

export type ProductCardProps = {
  title: string;
  description: string;
  tags?: string[];
  href?: string;
  linkLabel?: string;
};

export function ProductCard({
  title,
  description,
  tags = [],
  href,
  linkLabel = "View details",
}: ProductCardProps) {
  const inner = (
    <>
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
    "group relative block overflow-hidden rounded-sm border border-zinc-800/90 bg-zinc-900/40 p-6 pt-7 transition before:absolute before:inset-x-0 before:top-0 before:h-0.5 before:bg-gradient-to-r before:from-amber-800/30 before:via-amber-600 before:to-amber-800/30 hover:border-zinc-600/90 hover:bg-zinc-900/65";

  if (href) {
    return (
      <Link href={href} className={className}>
        {inner}
      </Link>
    );
  }

  return <div className={className}>{inner}</div>;
}
