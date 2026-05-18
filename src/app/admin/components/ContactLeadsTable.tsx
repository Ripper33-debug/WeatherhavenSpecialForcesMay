"use client";

import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import { adminUpdateContactLeadStatus } from "../actions";
import type { ContactLeadRow } from "@/lib/contactLeads";

function StatusBadge({ status }: { status: string | null }) {
  const s = (status ?? "new").toLowerCase();
  const classes =
    s === "in progress" || s === "in_progress"
      ? "text-blue-400 border-blue-400/40"
      : s === "closed"
        ? "text-[#8a9099] border-white/20"
        : "text-[#c8a96e] border-[#c8a96e]/40";
  const label =
    s === "in progress" || s === "in_progress"
      ? "IN PROGRESS"
      : s === "closed"
        ? "CLOSED"
        : "NEW";
  return (
    <span className={`inline-block border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${classes}`}>
      {label}
    </span>
  );
}

function formatDate(iso: string | null) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

export function ContactLeadsTable({ leads }: { leads: ContactLeadRow[] }) {
  const router = useRouter();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [banner, setBanner] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function setStatus(id: string, status: string) {
    setPendingId(id);
    setBanner(null);
    const res = await adminUpdateContactLeadStatus(id, status);
    setPendingId(null);
    if (res.ok) {
      setBanner({ type: "success", text: `Status updated to ${status}.` });
      router.refresh();
    } else {
      setBanner({ type: "error", text: res.error });
    }
  }

  if (leads.length === 0) {
    return <p className="mt-12 text-center text-sm text-[#8a9099]">No engineering inquiries yet.</p>;
  }

  return (
    <div className="mt-6">
      {banner && (
        <p className={`mb-4 text-sm ${banner.type === "success" ? "text-green-500" : "text-red-500"}`}>
          {banner.text}
        </p>
      )}
      <div className="overflow-x-auto border border-[rgba(255,255,255,0.08)]">
        <table className="w-full min-w-[900px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-[rgba(255,255,255,0.08)] text-[#8a9099]">
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Organization</th>
              <th className="px-4 py-3 font-medium">Inquiry type</th>
              <th className="px-4 py-3 font-medium">Subject</th>
              <th className="px-4 py-3 font-medium">Submitted</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((row) => {
              const isClosed = (row.status ?? "new").toLowerCase() === "closed";
              return (
                <Fragment key={row.id}>
                  <tr className={`border-b border-[rgba(255,255,255,0.06)] ${isClosed ? "opacity-40" : ""}`}>
                    <td className="px-4 py-4 font-medium text-white">{row.full_name ?? "—"}</td>
                    <td className="px-4 py-4 text-[#8a9099]">{row.organization ?? "—"}</td>
                    <td className="px-4 py-4 text-[#8a9099]">{row.inquiry_type ?? "—"}</td>
                    <td className="px-4 py-4 text-white">{row.subject ?? "—"}</td>
                    <td className="px-4 py-4 text-[#8a9099]">{formatDate(row.submitted_at)}</td>
                    <td className="px-4 py-4">
                      <StatusBadge status={row.status} />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap justify-end gap-2">
                        <button
                          type="button"
                          disabled={pendingId === row.id || isClosed}
                          onClick={() => void setStatus(row.id, "in progress")}
                          className="border border-blue-400/40 px-2 py-1 text-[10px] uppercase tracking-wider text-blue-400 disabled:opacity-40"
                        >
                          Mark in progress
                        </button>
                        <button
                          type="button"
                          disabled={pendingId === row.id || isClosed}
                          onClick={() => void setStatus(row.id, "closed")}
                          className="border border-white/20 px-2 py-1 text-[10px] uppercase tracking-wider text-[#8a9099] disabled:opacity-40"
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          onClick={() => setExpandedId((id) => (id === row.id ? null : row.id))}
                          className="border border-white/20 px-2 py-1 text-[10px] uppercase tracking-wider text-white"
                        >
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedId === row.id && (
                    <tr className={isClosed ? "opacity-40" : ""}>
                      <td colSpan={7} className="bg-[#0d0f12] px-6 py-5 text-sm text-[#8a9099]">
                        <p>
                          <span className="text-white">Role:</span> {row.role || "—"}
                        </p>
                        <p className="mt-2">
                          <span className="text-white">Program:</span> {row.program || "—"}
                        </p>
                        <p className="mt-2">
                          <span className="text-white">Contact method:</span> {row.contact_method || "—"}
                          {row.phone ? ` · ${row.phone}` : ""}
                        </p>
                        <p className="mt-3 whitespace-pre-wrap">
                          <span className="text-white">Message:</span>
                          <br />
                          {row.message || "—"}
                        </p>
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
