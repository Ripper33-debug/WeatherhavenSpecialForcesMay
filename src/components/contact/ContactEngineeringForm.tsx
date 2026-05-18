"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { trackEvent } from "@/lib/analytics";

const INQUIRY_TYPES = [
  "Program Requirement",
  "Technical Exchange",
  "Demo Request",
  "Pricing & Availability",
  "Existing Program Support",
  "Other",
] as const;

const CONTACT_METHODS = ["Email", "Phone", "Secure Message"] as const;

const inputClass =
  "mt-1.5 w-full border border-[rgba(255,255,255,0.12)] bg-[#0d0f12] px-3 py-2.5 text-sm text-white outline-none placeholder:text-[#8a9099] focus:border-[rgba(255,255,255,0.35)]";

type FormState = {
  full_name: string;
  organization: string;
  role: string;
  inquiry_type: string;
  program: string;
  subject: string;
  message: string;
  contact_method: string;
  phone: string;
  email: string;
};

const initial: FormState = {
  full_name: "",
  organization: "",
  role: "",
  inquiry_type: "",
  program: "",
  subject: "",
  message: "",
  contact_method: "Email",
  phone: "",
  email: "",
};

export function ContactEngineeringForm() {
  const [form, setForm] = useState(initial);
  const [submitted, setSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    void supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      const meta = user.user_metadata as { full_name?: string } | undefined;
      const fromMeta = meta?.full_name?.trim();
      const fromEmail = user.email?.split("@")[0]?.replace(/[._]/g, " ") ?? "";
      setForm((f) => ({
        ...f,
        email: user.email ?? f.email,
        full_name: f.full_name || fromMeta || fromEmail,
      }));
    });
  }, []);

  function patch<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/contact-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as { success?: boolean; error?: string };
      if (!res.ok || !data.success) {
        setError(data.error ?? "Submission failed. Please verify required fields.");
        return;
      }
      void trackEvent("submit", `Engineering inquiry — ${form.inquiry_type}`);
      setSubmittedName(form.full_name.trim());
      setSubmitted(true);
    } catch {
      setError("Network error. Confirm connectivity and retry.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    const firstName = submittedName.split(/\s+/)[0] || "there";
    return (
      <div className="flex flex-col items-center justify-center px-6 py-16 text-center sm:px-8 sm:py-20">
        <p className="wh-label text-[#c8a96e]">Message sent</p>
        <h2 className="font-display mt-6 max-w-lg text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          We&apos;ll be in touch, {firstName}.
        </h2>
        <p className="mt-6 max-w-lg text-base leading-relaxed text-[#8a9099]">
          Your inquiry has been routed to the Weatherhaven SOF solutions team. Expect a response within 48 hours.
          Check your email for confirmation.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex min-h-11 items-center justify-center border border-white bg-white px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-black no-underline transition hover:bg-[rgba(255,255,255,0.85)]"
        >
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 border border-white/[0.08] bg-[#0d0f12] p-6 sm:p-8">
      {error && (
        <div className="border border-red-900/50 bg-red-950/30 px-4 py-3 text-sm text-red-200" role="alert">
          {error}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block text-xs font-medium uppercase tracking-wide text-[#8a9099]">
          Full name
          <input required className={inputClass} value={form.full_name} onChange={(e) => patch("full_name", e.target.value)} />
        </label>
        <label className="block text-xs font-medium uppercase tracking-wide text-[#8a9099]">
          Organization
          <input required className={inputClass} value={form.organization} onChange={(e) => patch("organization", e.target.value)} />
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block text-xs font-medium uppercase tracking-wide text-[#8a9099]">
          Role / title
          <input required className={inputClass} value={form.role} onChange={(e) => patch("role", e.target.value)} />
        </label>
        <label className="block text-xs font-medium uppercase tracking-wide text-[#8a9099]">
          Inquiry type
          <select required className={inputClass} value={form.inquiry_type} onChange={(e) => patch("inquiry_type", e.target.value)}>
            <option value="">Select…</option>
            {INQUIRY_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="block text-xs font-medium uppercase tracking-wide text-[#8a9099]">
        Program or unit (optional)
        <input className={inputClass} value={form.program} onChange={(e) => patch("program", e.target.value)} />
      </label>

      <label className="block text-xs font-medium uppercase tracking-wide text-[#8a9099]">
        Subject
        <input required className={inputClass} value={form.subject} onChange={(e) => patch("subject", e.target.value)} />
      </label>

      <label className="block text-xs font-medium uppercase tracking-wide text-[#8a9099]">
        Message
        <textarea
          required
          rows={6}
          className={`${inputClass} min-h-[140px] resize-y`}
          value={form.message}
          onChange={(e) => patch("message", e.target.value)}
        />
      </label>

      <fieldset>
        <legend className="text-xs font-medium uppercase tracking-wide text-[#8a9099]">Preferred contact method</legend>
        <div className="mt-3 flex flex-wrap gap-6">
          {CONTACT_METHODS.map((method) => (
            <label key={method} className="flex items-center gap-2 text-sm text-white">
              <input
                type="radio"
                name="contact_method"
                value={method}
                checked={form.contact_method === method}
                onChange={() => patch("contact_method", method)}
                className="h-4 w-4"
              />
              {method}
            </label>
          ))}
        </div>
      </fieldset>

      {form.contact_method === "Phone" && (
        <label className="block text-xs font-medium uppercase tracking-wide text-[#8a9099]">
          Phone number
          <input
            type="tel"
            className={inputClass}
            value={form.phone}
            onChange={(e) => patch("phone", e.target.value)}
          />
        </label>
      )}

      <button
        type="submit"
        disabled={loading}
        className="flex min-h-11 w-full items-center justify-center border-0 bg-white py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-[rgba(255,255,255,0.85)] disabled:opacity-60"
      >
        {loading ? "Sending…" : "Send to engineering team"}
      </button>
    </form>
  );
}
