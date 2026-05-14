"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HeroTopoCanvas } from "@/components/HeroTopoCanvas";
import { createClient } from "@/lib/supabase/client";
import { company } from "@/lib/site";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    void supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.replace("/");
      }
    });
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(false);
    setSubmitting(true);
    const supabase = createClient();
    const { error: signError } = await supabase.auth.signInWithPassword({ email, password });
    setSubmitting(false);
    if (signError) {
      setError(true);
      return;
    }
    router.push("/");
    router.refresh();
  }

  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-[#080a0c] px-4 py-16">
      <HeroTopoCanvas />
      <div className="relative z-10 w-full max-w-[420px] border border-[rgba(255,255,255,0.08)] bg-[#080a0c]/90 p-12 backdrop-blur-sm">
        <Link href="/" className="block text-center font-display text-xl font-semibold tracking-tight text-white no-underline">
          {company.shortName}
        </Link>
        <p
          className="mt-8 text-center font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[#c8a96e]"
          style={{ letterSpacing: "0.2em" }}
        >
          AUTHORIZED ACCESS ONLY
        </p>
        <form className="mt-10 space-y-4" onSubmit={handleSubmit}>
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
          {error && <p className="text-sm text-red-500">Access denied. Invalid credentials.</p>}
          <button
            type="submit"
            disabled={submitting}
            className="w-full border-0 bg-white py-3 text-sm font-medium text-black transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            ACCESS SITE
          </button>
        </form>
        <p className="mt-10 text-center text-sm text-[#8a9099]">Access restricted to authorized personnel.</p>
      </div>
    </main>
  );
}
