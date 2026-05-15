import type { TopClickedElement } from "@/lib/admin-analytics";

export function SiteClickSummary({ items }: { items: TopClickedElement[] }) {
  return (
    <div className="mt-12 border border-[rgba(255,255,255,0.08)] p-8">
      <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[#c8a96e]">
        Site-wide click summary
      </p>
      <p className="mt-2 text-sm text-[#8a9099]">Top 10 most clicked elements across all users</p>
      <ol className="mt-6 space-y-0">
        {items.length === 0 ? (
          <li className="py-3 text-sm text-[#8a9099]">No clicks recorded yet.</li>
        ) : (
          items.map((item, i) => (
            <li
              key={`${item.elementText}-${item.page}-${i}`}
              className={`flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-[rgba(255,255,255,0.04)] py-3 last:border-0 ${
                i === 0 ? "border-l-2 border-l-[#c8a96e] pl-4" : "pl-4"
              }`}
            >
              <span className="text-white">
                <span className="font-medium">{item.elementText}</span>
                <span className="text-[#8a9099]"> on </span>
                <span className="text-[#c8a96e]">{item.page}</span>
              </span>
              <span className="tabular-nums text-sm text-[#8a9099]">{item.count} clicks</span>
            </li>
          ))
        )}
      </ol>
    </div>
  );
}
