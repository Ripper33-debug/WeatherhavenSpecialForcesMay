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
              className="rounded-sm border border-zinc-700/80 bg-zinc-900/50 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-zinc-400"
            >
              {t}
            </span>
          ))}
        </div>
      )}
      <h3 className="text-lg font-semibold text-zinc-100">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">{description}</p>
      {href && (
        <span className="mt-4 inline-block text-sm font-medium text-amber-600/90 transition group-hover:text-amber-500">
          {linkLabel} →
        </span>
      )}
    </>
  );

  const className =
    "group block rounded-lg border border-zinc-800 bg-zinc-900/30 p-6 transition hover:border-zinc-700 hover:bg-zinc-900/50";

  if (href) {
    return (
      <Link href={href} className={className}>
        {inner}
      </Link>
    );
  }

  return <div className={className}>{inner}</div>;
}
