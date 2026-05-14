"use client";

import { useMemo, useState } from "react";
import { adminAddUser, adminDeleteUser, adminListUsers, type AdminUserRow } from "./actions";

function formatDate(iso: string | undefined | null) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return String(iso);
  }
}

export function AdminUsersClient({ initialUsers }: { initialUsers: AdminUserRow[] }) {
  const [users, setUsers] = useState<AdminUserRow[]>(initialUsers);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [banner, setBanner] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [pending, setPending] = useState(false);

  const sorted = useMemo(
    () => [...users].sort((a, b) => (a.email ?? "").localeCompare(b.email ?? "")),
    [users],
  );

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setBanner(null);
    setPending(true);
    const res = await adminAddUser(email.trim(), password);
    setPending(false);
    if (res.ok) {
      setBanner({ type: "success", text: "User added successfully." });
      setEmail("");
      setPassword("");
      const next = await adminListUsers();
      setUsers(next);
    } else {
      setBanner({ type: "error", text: "Failed to add user." });
    }
  }

  async function handleRemove(userId: string) {
    setBanner(null);
    const res = await adminDeleteUser(userId);
    if (res.ok) {
      setUsers((prev) => prev.filter((u) => u.id !== userId));
      setBanner({ type: "success", text: "User removed." });
    } else {
      setBanner({ type: "error", text: "Failed to remove user." });
    }
  }

  return (
    <div className="mx-auto max-w-[900px] px-4 py-16 sm:px-6 lg:px-12">
      <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[#c8a96e]">USER MANAGEMENT</p>
      <h1 className="font-display mt-4 text-3xl font-semibold tracking-tight text-white">Admin</h1>

      {banner && (
        <p className={`mt-6 text-sm ${banner.type === "success" ? "text-green-500" : "text-red-500"}`}>{banner.text}</p>
      )}

      <form className="mt-10 space-y-4 border-b border-[rgba(255,255,255,0.08)] pb-12" onSubmit={handleAdd}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="new-email" className="sr-only">
              Email
            </label>
            <input
              id="new-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="New user email"
              className="w-full border border-[rgba(255,255,255,0.12)] bg-[#0d0f12] px-4 py-3 text-sm text-white outline-none placeholder:text-[#8a9099]"
            />
          </div>
          <div>
            <label htmlFor="new-password" className="sr-only">
              Password
            </label>
            <input
              id="new-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Temporary password"
              className="w-full border border-[rgba(255,255,255,0.12)] bg-[#0d0f12] px-4 py-3 text-sm text-white outline-none placeholder:text-[#8a9099]"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={pending}
          className="border-0 bg-white px-6 py-3 text-sm font-medium text-black transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          Add User
        </button>
      </form>

      <div className="mt-12">
        <h2 className="font-display text-lg font-semibold text-white">Users</h2>
        <ul className="mt-6 divide-y divide-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.08)]">
          {sorted.map((u) => (
            <li key={u.id} className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0 text-sm">
                <p className="truncate font-medium text-white">{u.email ?? "—"}</p>
                <p className="mt-1 text-[13px] text-[#8a9099]">
                  Created: {formatDate(u.created_at)} · Last sign in: {formatDate(u.last_sign_in_at)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => void handleRemove(u.id)}
                className="shrink-0 border border-[rgba(255,255,255,0.2)] bg-transparent px-4 py-2 text-xs font-medium text-white transition-opacity hover:opacity-80"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
