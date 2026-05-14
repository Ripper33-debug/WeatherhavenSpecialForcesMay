"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { HeroTopoCanvas } from "@/components/HeroTopoCanvas";
import { company } from "@/lib/site";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    void supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.replace("/");
      }
    });
  }, [router]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      setError("Please enter email and password.");
      return;
    }

    setSubmitting(true);

    try {
      const supabase = createClient();
      const { error: signError } = await supabase.auth.signInWithPassword({
        email: trimmedEmail,
        password,
      });

      if (signError) {
        console.error("Login error:", signError.message);
        setError(signError.message);
        return;
      }

      // Full navigation so middleware sees the new session cookies reliably
      window.location.href = "/";
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong. Try again.";
      console.error("Login error:", err);
      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-[#080a0c] px-4 py-16">
      <HeroTopoCanvas />
      <div className="relative z-10 w-full max-w-[420px] border border-[rgba(255,255,255,0.08)] bg-[#080a0c]/90 p-12 backdrop-blur-sm">
        <Link
          href="/"
          className="block text-center font-display text-xl font-semibold tracking-tight text-white no-underline"
        >
          {company.shortName}
        </Link>
        <p
          className="mt-8 text-center font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[#c8a96e]"
          style={{ letterSpacing: "0.2em" }}
        >
          AUTHORIZED ACCESS ONLY
        </p>
        <form className="mt-10 space-y-4" noValidate onSubmit={handleSubmit}>
          <div>
            <label htmlFor="login-email" className="sr-only">
              Email
            </label>
            <input
              id="login-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full border border-[rgba(255,255,255,0.12)] bg-[#0d0f12] px-4 py-3 text-sm text-white outline-none placeholder:text-[#8a9099]"
            />
          </div>
          <div>
            <label htmlFor="login-password" className="sr-only">
              Password
            </label>
            <input
              id="login-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full border border-[rgba(255,255,255,0.12)] bg-[#0d0f12] px-4 py-3 text-sm text-white outline-none placeholder:text-[#8a9099]"
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="w-full border-0 bg-white py-3 text-sm font-medium text-black transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {submitting ? "AUTHENTICATING..." : "ACCESS SITE"}
          </button>
        </form>
        <p className="mt-10 text-center text-sm text-[#8a9099]">Access restricted to authorized personnel.</p>
      </div>
    </main>
  );
}
