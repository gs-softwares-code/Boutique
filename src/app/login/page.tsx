import { Suspense } from "react";
import type { Metadata } from "next";
import { AuthForm } from "@/components/AuthForm";

export const metadata: Metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto px-6 py-20">
      <h1 className="font-serif-display text-4xl text-espresso text-center">Welcome back</h1>
      <p className="mt-2 text-center text-sm text-espresso/55">Sign in to your Boutique account.</p>
      <div className="mt-8 border border-line p-7 bg-ivory-deep/20">
        <Suspense fallback={null}>
          <AuthForm mode="login" />
        </Suspense>
      </div>
    </div>
  );
}
