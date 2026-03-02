"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export function LoginForm({ nextPath = "/" }: { nextPath?: string }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (!result || result.error) {
      setError("Invalid email or password.");
      return;
    }

    window.location.href = nextPath;
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-md space-y-4 rounded-3xl border border-black/10 bg-white p-7 shadow-sm">
      <h1 className="text-2xl font-semibold tracking-tight">Log in to continue</h1>

      <div>
        <label className="mb-1 block text-sm font-medium">Email</label>
        <input
          type="email"
          required
          className="w-full rounded-xl border border-black/15 bg-zinc-50 px-3 py-2.5 text-sm outline-none transition focus:border-black/30 focus:bg-white"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Password</label>
        <input
          type="password"
          required
          className="w-full rounded-xl border border-black/15 bg-zinc-50 px-3 py-2.5 text-sm outline-none transition focus:border-black/30 focus:bg-white"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      {error && <p className="text-sm text-red-700">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-black px-3 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:bg-black/50"
      >
        {loading ? "Logging in..." : "Continue"}
      </button>

      <p className="text-sm text-black/70">
        New here? <Link className="underline" href="/signup">Create an account</Link>
      </p>
    </form>
  );
}
