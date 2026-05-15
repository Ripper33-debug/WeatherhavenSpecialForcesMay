export function AdminStatBox({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="border border-[rgba(255,255,255,0.08)] p-8">
      <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[#c8a96e]">{label}</p>
      <p className="font-display mt-4 text-4xl font-medium tabular-nums tracking-tight text-white">{value}</p>
    </div>
  );
}
