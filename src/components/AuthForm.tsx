"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") ?? "/account";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const url = mode === "login" ? "/api/auth/login" : "/api/auth/register";
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          mode === "login" ? { email, password } : { name, email, password },
        ),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        setLoading(false);
        return;
      }
      router.push(next.startsWith("/") ? next : "/account");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {mode === "register" && (
        <div>
          <label className="label-luxe">Full name</label>
          <input className="input-luxe" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
      )}
      <div>
        <label className="label-luxe">Email</label>
        <input type="email" className="input-luxe" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label className="label-luxe">Password</label>
        <input
          type="password"
          className="input-luxe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
        />
        {mode === "register" && <p className="mt-1 text-xs text-espresso/45">At least 8 characters</p>}
      </div>

      {error && <p className="text-sm text-red-700 bg-red-50 border border-red-200 px-4 py-3">{error}</p>}

      <button type="submit" disabled={loading} className="btn-luxe w-full">
        {loading ? "Please wait…" : mode === "login" ? "Sign In" : "Create Account"}
      </button>

      <p className="text-sm text-espresso/60 text-center">
        {mode === "login" ? (
          <>
            New to Boutique?{" "}
            <Link href="/register" className="underline underline-offset-4">Create an account</Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link href="/login" className="underline underline-offset-4">Sign in</Link>
          </>
        )}
      </p>

      {mode === "login" && (
        <div className="mt-6 p-4 bg-ivory-deep/50 border border-line text-xs text-espresso/60 leading-relaxed">
          <p className="font-medium text-espresso mb-1">Demo access</p>
          <p>Admin: admin@boutique.example / Atelier#2026</p>
        </div>
      )}
    </form>
  );
}
