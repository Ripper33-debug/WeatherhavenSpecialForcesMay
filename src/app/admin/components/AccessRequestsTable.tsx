"use client";

import { Fragment, useState } from "react";
import { adminApproveAccessRequest, adminDenyAccessRequest } from "../actions";
import type { AccessRequestRow } from "@/lib/accessRequests";

function StatusBadge({ status }: { status: string | null }) {
  const s = (status ?? "pending").toLowerCase();
  const classes =
    s === "approved"
      ? "text-green-500 border-green-500/40"
      : s === "denied"
        ? "text-red-400 border-red-500/40"
        : "text-amber-500 border-amber-500/40";
  const label = s === "approved" ? "APPROVED" : s === "denied" ? "DENIED" : "PENDING";
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

export function AccessRequestsTable({ requests }: { requests: AccessRequestRow[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [banner, setBanner] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleApprove(row: AccessRequestRow) {
    if (!row.email) return;
    setPendingId(row.id);
    setBanner(null);
    const res = await adminApproveAccessRequest(row.id, row.email);
    setPendingId(null);
    if (res.ok) {
      setBanner({ type: "success", text: `Approved. Temporary password: ${res.password}` });
    } else {
      setBanner({ type: "error", text: res.error });
    }
  }

  async function handleDeny(id: string) {
    setPendingId(id);
    setBanner(null);
    const res = await adminDenyAccessRequest(id);
    setPendingId(null);
    if (res.ok) {
      setBanner({ type: "success", text: "Request denied." });
    } else {
      setBanner({ type: "error", text: res.error });
    }
  }

  if (requests.length === 0) {
    return <p className="mt-6 text-sm text-[#8a9099]">No access requests yet.</p>;
  }

  return (
    <div className="mt-6">
      {banner && (
        <p className={`mb-4 text-sm ${banner.type === "success" ? "text-green-500" : "text-red-500"}`}>
          {banner.text}
        </p>
      )}
      <div className="overflow-x-auto border border-[rgba(255,255,255,0.08)]">
        <table className="w-full min-w-[800px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-[rgba(255,255,255,0.08)] text-[#8a9099]">
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Organization</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium">Submitted</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {requests.map((row) => (
              <Fragment key={row.id}>
                <tr className="border-b border-[rgba(255,255,255,0.06)]">
                  <td className="px-4 py-4 font-medium text-white">{row.full_name ?? "—"}</td>
                  <td className="px-4 py-4 text-[#8a9099]">{row.organization ?? "—"}</td>
                  <td className="px-4 py-4 text-white">{row.email ?? "—"}</td>
                  <td className="px-4 py-4 text-[#8a9099]">{row.role ?? "—"}</td>
                  <td className="px-4 py-4 text-[#8a9099]">{formatDate(row.submitted_at)}</td>
                  <td className="px-4 py-4">
                    <StatusBadge status={row.status} />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap justify-end gap-2">
                      <button
                        type="button"
                        disabled={pendingId === row.id || row.status === "approved"}
                        onClick={() => void handleApprove(row)}
                        className="border border-green-500/40 px-2 py-1 text-[10px] uppercase tracking-wider text-green-500 disabled:opacity-40"
                      >
                        Approve
                      </button>
                      <button
                        type="button"
                        disabled={pendingId === row.id || row.status === "denied"}
                        onClick={() => void handleDeny(row.id)}
                        className="border border-red-500/40 px-2 py-1 text-[10px] uppercase tracking-wider text-red-400 disabled:opacity-40"
                      >
                        Deny
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
                  <tr>
                    <td colSpan={7} className="bg-[#0d0f12] px-6 py-5 text-sm text-[#8a9099]">
                      <p>
                        <span className="text-white">Program:</span> {row.program || "—"}
                      </p>
                      <p className="mt-3 whitespace-pre-wrap">
                        <span className="text-white">Requirements:</span>
                        <br />
                        {row.requirements || "—"}
                      </p>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
