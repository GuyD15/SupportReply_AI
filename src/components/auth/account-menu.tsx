"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SignOutButton } from "@/components/auth/signout-button";

type MeResponse = {
  authenticated?: boolean;
  isPro?: boolean;
  user?: {
    email?: string | null;
  };
};

export function AccountMenu() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    async function loadMe() {
      try {
        const response = await fetch("/api/me", { cache: "no-store" });
        const data = (await response.json()) as MeResponse;

        setAuthenticated(Boolean(data.authenticated));
        setIsPro(Boolean(data.isPro));
        setEmail(data.user?.email ?? null);
      } finally {
        setLoading(false);
      }
    }

    void loadMe();
  }, []);

  if (loading) {
    return <p className="text-xs text-black/60">Checking account...</p>;
  }

  if (!authenticated) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/pricing" className="rounded-lg border border-black/20 bg-white px-3 py-2 text-xs font-medium transition hover:bg-zinc-100">
          Pricing
        </Link>
        <Link href="/login" className="rounded-lg border border-black/20 bg-white px-3 py-2 text-xs font-medium transition hover:bg-zinc-100">
          Log in
        </Link>
        <Link href="/signup" className="rounded-lg bg-black px-3 py-2 text-xs font-medium text-white transition hover:bg-zinc-800">
          Sign up
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <div className="text-right">
        <p className="max-w-40 truncate text-xs font-medium sm:max-w-none">{email}</p>
        <p className="text-[11px] text-black/60">{isPro ? "Pro" : "Free"} plan</p>
      </div>
      <Link href="/pricing" className="rounded-lg border border-black/20 bg-white px-3 py-1.5 text-xs font-medium transition hover:bg-zinc-100">
        Billing
      </Link>
      <SignOutButton />
    </div>
  );
}
