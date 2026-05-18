"use client";

import Link from "next/link";
import { IconCalendar, IconFileDownload, IconMessage } from "@tabler/icons-react";
import { trackEvent } from "@/lib/analytics";

const boxes = [
  {
    label: "Download Capabilities Brief",
    desc: "Capability statements and program-safe summaries.",
    href: "/resources",
    Icon: IconFileDownload,
  },
  {
    label: "Request a Demo",
    desc: "Schedule a controlled technical walkthrough.",
    href: "/request-access",
    Icon: IconCalendar,
  },
  {
    label: "Contact Defense Team",
    desc: "Programs, teaming, and routing for inquiries.",
    href: "/contact",
    Icon: IconMessage,
  },
];

export function SofCtaBoxes() {
  return (
    <div className="mx-auto mt-16 grid max-w-[1100px] grid-cols-1 gap-0.5 lg:grid-cols-3">
      {boxes.map((box) => (
        <Link
          key={box.label}
          href={box.href}
          onClick={() => void trackEvent("click", `SOF CTA — ${box.label}`)}
          className="group flex flex-col border border-[rgba(255,255,255,0.12)] bg-[#080a0c] px-8 py-12 text-left no-underline transition-[border-color,background-color] duration-200 hover:border-[rgba(255,255,255,0.3)] hover:bg-[rgba(255,255,255,0.03)] lg:p-12"
        >
          <box.Icon className="text-white" size={32} stroke={1.25} aria-hidden />
          <p className="mt-6 text-lg font-medium text-white">{box.label}</p>
          <p className="mt-2 text-[13px] leading-relaxed text-[#8a9099]">{box.desc}</p>
          <span className="mt-auto pt-8 text-right text-white transition-opacity group-hover:opacity-70">→</span>
        </Link>
      ))}
    </div>
  );
}
