"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/" })}
      className="rounded-lg border border-black/20 bg-white px-3 py-1.5 text-xs font-medium transition hover:bg-zinc-100"
    >
      Sign out
    </button>
  );
}
