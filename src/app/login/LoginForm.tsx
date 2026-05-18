"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { HeroTopoCanvas } from "@/components/HeroTopoCanvas";
import { company } from "@/lib/site";

function getRedirectTo(search: string): string {
  const redirectTo = new URLSearchParams(search).get("redirectTo") || "/";
  if (!redirectTo.startsWith("/") || redirectTo.startsWith("//")) {
    return "/";
  }
  return redirectTo;
}

function resolvePostLoginPath(
  redirectTo: string,
  userEmail: string | undefined,
  adminEmail: string,
): string {
  if (redirectTo !== "/") return redirectTo;
  const admin = adminEmail.trim().toLowerCase();
  if (admin && userEmail?.trim().toLowerCase() === admin) {
    return "/admin";
  }
  return redirectTo;
}

export function LoginForm({ adminEmail }: { adminEmail: string }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [cardVisible, setCardVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setCardVisible(true));
  }, []);

  useEffect(() => {
    const supabase = createClient();
    void supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const target = resolvePostLoginPath(
          getRedirectTo(window.location.search),
          session.user.email,
          adminEmail,
        );
        window.location.replace(target);
      }
    });
  }, [adminEmail]);

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
      const { data, error: signError } = await supabase.auth.signInWithPassword({
        email: trimmedEmail,
        password,
      });

      if (signError) {
        console.error("Login error:", signError.message);
        setFailedAttempts((n) => n + 1);
        setError(signError.message);
        return;
      }

      const redirectTo = getRedirectTo(window.location.search);
      const target = resolvePostLoginPath(redirectTo, data.user?.email, adminEmail);
      window.location.href = target;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong. Try again.";
      console.error("Login error:", err);
      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-[#080a0c] px-6 py-16">
      <HeroTopoCanvas />
      <div
        className={`relative z-10 w-full max-w-[420px] border border-[rgba(255,255,255,0.08)] bg-[#080a0c]/90 p-6 backdrop-blur-sm transition-all duration-500 ease-out sm:p-12 ${
          cardVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        }`}
      >
        <p className="text-center font-display text-xl font-semibold tracking-tight text-white">
          {company.shortName}
        </p>
        <p
          className="mt-8 text-center font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[#c8a96e]"
          style={{ letterSpacing: "0.2em" }}
        >
          AUTHORIZED ACCESS ONLY
        </p>
        <div className="mt-6 flex items-center justify-center gap-2 border border-[rgba(255,255,255,0.06)] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-[#8a9099]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping bg-emerald-500/40" />
            <span className="relative inline-flex h-2 w-2 bg-emerald-500" />
          </span>
          Secure connection · AES-256 · HTTPS
        </div>
        <form className="mt-8 space-y-4" noValidate onSubmit={handleSubmit}>
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
          {failedAttempts >= 3 && (
            <p className="text-sm text-red-500">
              Multiple failed attempts detected. Contact your administrator.
            </p>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="w-full border-0 bg-white py-3 text-sm font-medium text-black transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {submitting ? "AUTHENTICATING..." : "ACCESS SITE"}
          </button>
        </form>
        <div className="mt-8 border-t border-[rgba(255,255,255,0.08)] pt-8">
          <p className="text-center text-[13px] text-[#8a9099]">
            Don&apos;t have access?{" "}
            <Link href="/request-access" className="text-[#c8a96e] no-underline hover:opacity-80">
              Request Access →
            </Link>
          </p>
        </div>
        <p className="mt-8 text-center text-sm text-[#8a9099]">Access restricted to authorized personnel.</p>
      </div>
    </main>
  );
}
