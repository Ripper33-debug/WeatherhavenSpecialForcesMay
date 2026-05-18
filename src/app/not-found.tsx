import Link from "next/link";
import { HeroTopoCanvas } from "@/components/HeroTopoCanvas";
import { company } from "@/lib/site";

export default function NotFound() {
  return (
    <div className="fixed inset-0 z-[200] flex min-h-dvh flex-col bg-[#080a0c]">
      <HeroTopoCanvas />
      <header className="relative z-10 px-6 py-6 lg:px-12">
        <span className="font-display text-lg font-semibold tracking-tight text-white sm:text-xl">
          {company.shortName}
        </span>
      </header>
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-20 text-center">
        <p className="wh-label text-[#c8a96e]">404 · Position not found</p>
        <h1 className="font-display mt-6 max-w-xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          This position doesn&apos;t exist.
        </h1>
        <p className="mt-6 max-w-md text-base text-[#8a9099]">
          The page you&apos;re looking for has been moved, removed, or never existed.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex min-h-11 items-center justify-center border border-white bg-white px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-black no-underline transition hover:bg-[rgba(255,255,255,0.85)]"
        >
          Return to base
        </Link>
        <p className="mt-10 text-sm text-[#8a9099]">
          If you believe this is an error contact your administrator.
        </p>
      </div>
    </div>
  );
}
