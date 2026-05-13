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
    <section id={id} className="border-b border-zinc-800/80 last:border-b-0">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className={reversed ? "lg:order-2" : undefined}>
            {eyebrow && (
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600/90">
                {eyebrow}
              </p>
            )}
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-100 sm:text-3xl">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base">{subtitle}</p>
            )}
          </div>
          <ul className={`space-y-8 ${reversed ? "lg:order-1" : ""}`}>
            {items.map((item) => (
              <li key={item.title} className="border-l-2 border-amber-800/50 pl-5">
                <h3 className="text-base font-semibold text-zinc-100">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
