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
    <section id={id} className="border-b border-white/[0.08] bg-black last:border-b-0">
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 sm:py-20 lg:px-12 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className={reversed ? "lg:order-2" : undefined}>
            {eyebrow && (
              <p className="wh-label max-w-xl border-b border-white/10 pb-3 text-zinc-500">{eyebrow}</p>
            )}
            <h2 className="font-display mt-6 text-3xl font-semibold leading-[1.05] tracking-[-0.02em] text-white sm:text-4xl lg:text-5xl">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-5 text-base leading-relaxed text-zinc-400 sm:text-lg">{subtitle}</p>
            )}
          </div>
          <ul className={`space-y-10 sm:space-y-11 ${reversed ? "lg:order-1" : ""}`}>
            {items.map((item, idx) => (
              <li
                key={item.title}
                className="group border-l border-white/[0.12] pl-6 transition hover:border-white/25"
              >
                <p className="wh-label text-zinc-600">{String(idx + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-zinc-100 transition group-hover:text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
