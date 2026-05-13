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

  function update<K extends keyof typeof initial>(key: K, value: (typeof initial)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-8">
        <h3 className="text-lg font-semibold text-zinc-100">Request received</h3>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          Thank you. Our programs team will review your credentials and respond through
          official channels. Do not include classified information in this form.
        </p>
      </div>
    );
  }

  const inputClass =
    "mt-1.5 w-full rounded-md border border-zinc-700 bg-zinc-950/80 px-3 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none ring-amber-700/0 transition focus:border-amber-700/50 focus:ring-2 focus:ring-amber-700/20";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
          <label
            htmlFor="ra-org"
            className="text-xs font-medium uppercase tracking-wide text-zinc-500"
          >
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
          <label
            htmlFor="ra-email"
            className="text-xs font-medium uppercase tracking-wide text-zinc-500"
          >
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
          <label
            htmlFor="ra-role"
            className="text-xs font-medium uppercase tracking-wide text-zinc-500"
          >
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
        <label
          htmlFor="ra-program"
          className="text-xs font-medium uppercase tracking-wide text-zinc-500"
        >
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
        <label
          htmlFor="ra-message"
          className="text-xs font-medium uppercase tracking-wide text-zinc-500"
        >
          Requirements summary
        </label>
        <textarea
          id="ra-message"
          rows={4}
          className={`${inputClass} resize-y min-h-[100px]`}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="Mission profile, deployment region, timeline, and integration needs."
        />
      </div>
      <p className="text-xs leading-relaxed text-zinc-500">
        This form is for business development inquiries only. No export-controlled technical
        data should be submitted. A representative may request additional vetting before
        technical discussions.
      </p>
      <button
        type="submit"
        className="w-full rounded-sm bg-amber-700 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-amber-600 sm:w-auto sm:px-10"
      >
        Submit request
      </button>
    </form>
  );
}
