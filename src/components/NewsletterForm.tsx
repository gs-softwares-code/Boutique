"use client";

import { useState } from "react";
import { CheckIcon } from "@/components/icons";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "done">("idle");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return;
    setState("done");
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-md mx-auto">
      {state === "done" ? (
        <div className="flex items-center justify-center gap-2 text-ivory">
          <CheckIcon className="w-5 h-5 text-gold-soft" />
          <span className="text-sm tracking-wide">Thank you — welcome to the atelier circle.</span>
        </div>
      ) : (
        <div className="flex border-b border-ivory/30">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            aria-label="Email address"
            className="flex-1 bg-transparent py-3.5 text-sm placeholder:text-ivory/40 focus:outline-none text-ivory"
          />
          <button type="submit" className="px-4 text-[0.68rem] tracking-luxe uppercase text-gold-soft hover:text-ivory transition-colors">
            Subscribe
          </button>
        </div>
      )}
    </form>
  );
}
