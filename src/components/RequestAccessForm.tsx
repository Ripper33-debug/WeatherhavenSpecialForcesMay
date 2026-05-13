"use client";

import { useState } from "react";

const initial = {
  name: "",
  organization: "",
  email: "",
  role: "",
  program: "",
  message: "",
};

export function RequestAccessForm() {
  const [form, setForm] = useState(initial);
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof typeof initial>(key: K, value: (typeof initial)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/request-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as { ok?: boolean; reference?: string; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error ?? "Submission failed. Please verify required fields.");
        return;
      }
      setReference(data.reference ?? null);
      setSubmitted(true);
    } catch {
      setError("Network error. Confirm connectivity and retry.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="relative overflow-hidden rounded-sm border border-zinc-800/90 bg-zinc-950/80 p-8 shadow-[0_24px_80px_-40px_rgb(0_0_0/0.9)] sm:p-10">
        <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-amber-700/80 via-amber-600 to-amber-800/80" />
        <div className="relative pl-5 sm:pl-6">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-emerald-500/95">
            Transmission complete
          </p>
          <h3 className="font-display mt-3 text-2xl font-semibold tracking-tight text-zinc-50">
            Request logged
          </h3>
          {reference && (
            <p className="mt-4 inline-flex items-center gap-2 rounded-sm border border-zinc-800/90 bg-zinc-900/50 px-3 py-2 font-mono text-sm text-zinc-200">
              <span className="text-[11px] uppercase tracking-wider text-zinc-500">Reference</span>
              <span className="font-semibold text-amber-500/95">{reference}</span>
            </p>
          )}
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-zinc-400">
            Programs will verify affiliation and respond through official channels. Do not transmit
            classified or export-controlled technical data by email or this form.
          </p>
        </div>
      </div>
    );
  }

  const inputClass =
    "mt-1.5 w-full rounded-sm border border-zinc-700/90 bg-zinc-950/80 px-3 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none ring-amber-700/0 transition duration-200 focus:border-amber-700/50 focus:ring-2 focus:ring-amber-700/20";

  return (
    <div className="relative overflow-hidden rounded-sm border border-zinc-800/90 bg-gradient-to-br from-zinc-950 via-zinc-950 to-zinc-900/40 shadow-[0_24px_80px_-48px_rgb(0_0_0/0.85)]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-700/35 to-transparent" />
      <div className="border-b border-zinc-800/80 bg-zinc-950/60 px-6 py-5 sm:px-8 sm:py-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Weatherhaven Resource Inc.
            </p>
            <h2 className="font-display mt-2 text-xl font-semibold tracking-tight text-zinc-50 sm:text-2xl">
              Program access request
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-500">
              Official contact information only. This channel routes controlled disclosures and
              technical exchanges—not general marketing.
            </p>
          </div>
          <dl className="grid shrink-0 gap-1 rounded-sm border border-zinc-800/80 bg-zinc-900/40 px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-zinc-500 sm:text-left">
            <div className="flex justify-between gap-6 sm:flex-col sm:gap-1">
              <dt>Form</dt>
              <dd className="text-zinc-300">WH-PR-01</dd>
            </div>
            <div className="flex justify-between gap-6 sm:flex-col sm:gap-1">
              <dt>Revision</dt>
              <dd className="text-zinc-300">A</dd>
            </div>
            <div className="flex justify-between gap-6 sm:flex-col sm:gap-1">
              <dt>Medium</dt>
              <dd className="text-zinc-300">HTTPS</dd>
            </div>
          </dl>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 px-6 py-8 sm:px-8 sm:py-10">
        {error && (
          <div
            className="rounded-sm border border-red-900/50 bg-red-950/30 px-4 py-3 text-sm text-red-200"
            role="alert"
          >
            {error}
          </div>
        )}
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="ra-name" className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              Full name
            </label>
            <input
              id="ra-name"
              required
              className={inputClass}
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              autoComplete="name"
            />
          </div>
          <div>
            <label htmlFor="ra-org" className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              Organization
            </label>
            <input
              id="ra-org"
              required
              className={inputClass}
              value={form.organization}
              onChange={(e) => update("organization", e.target.value)}
              autoComplete="organization"
            />
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="ra-email" className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              Official email
            </label>
            <input
              id="ra-email"
              type="email"
              required
              className={inputClass}
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              autoComplete="email"
            />
          </div>
          <div>
            <label htmlFor="ra-role" className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              Role / title
            </label>
            <input
              id="ra-role"
              required
              className={inputClass}
              value={form.role}
              onChange={(e) => update("role", e.target.value)}
            />
          </div>
        </div>
        <div>
          <label htmlFor="ra-program" className="text-xs font-medium uppercase tracking-wide text-zinc-500">
            Program or unit (optional)
          </label>
          <input
            id="ra-program"
            className={inputClass}
            value={form.program}
            onChange={(e) => update("program", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="ra-message" className="text-xs font-medium uppercase tracking-wide text-zinc-500">
            Requirements summary
          </label>
          <textarea
            id="ra-message"
            rows={4}
            className={`${inputClass} resize-y min-h-[108px]`}
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            placeholder="Theater, timeline, footprint class, and integration constraints (unclassified)."
          />
        </div>
        <div className="rounded-sm border border-zinc-800/80 bg-zinc-950/50 p-4">
          <p className="text-[11px] leading-relaxed text-zinc-500">
            By submitting, you confirm this request contains no classified material. Export-controlled
            discussions require program alignment; a representative may request additional vetting
            before technical data is shared.
          </p>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-sm bg-amber-600 py-3 text-sm font-semibold uppercase tracking-wide text-zinc-950 transition hover:bg-amber-500 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-12"
        >
          {loading ? "Submitting…" : "Submit request"}
        </button>
      </form>
    </div>
  );
}
