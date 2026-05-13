export type CapabilityItem = {
  title: string;
  description: string;
};

export type CapabilitySectionProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  items: CapabilityItem[];
  reversed?: boolean;
};

export function CapabilitySection({
  id,
  eyebrow,
  title,
  subtitle,
  items,
  reversed,
}: CapabilitySectionProps) {
  return (
    <section id={id} className="border-b border-white/[0.06] last:border-b-0">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-18">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div className={reversed ? "lg:order-2" : undefined}>
            {eyebrow && (
              <p className="text-[13px] font-medium text-amber-500/90">{eyebrow}</p>
            )}
            <h2 className="font-display mt-2 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl lg:text-4xl">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-4 text-[15px] leading-relaxed text-zinc-400 sm:text-base">{subtitle}</p>
            )}
          </div>
          <ul className={`space-y-8 sm:space-y-9 ${reversed ? "lg:order-1" : ""}`}>
            {items.map((item, idx) => (
              <li key={item.title} className="group border-l border-white/[0.08] pl-5 transition hover:border-white/[0.14]">
                <p className="text-[11px] font-medium tabular-nums text-zinc-600">{String(idx + 1).padStart(2, "0")}</p>
                <h3 className="mt-1.5 font-display text-lg font-semibold tracking-tight text-zinc-100 transition group-hover:text-zinc-50">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
