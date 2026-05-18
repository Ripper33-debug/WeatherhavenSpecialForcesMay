import { company } from "@/lib/site";

export default function RequestAccessLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-[#080a0c]">
      <header className="border-b border-white/[0.08] px-6 py-5 sm:px-8">
        <span className="font-display text-lg font-semibold tracking-tight text-white sm:text-xl">
          {company.shortName}
        </span>
      </header>
      {children}
    </div>
  );
}
