"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as { error?: string } | null;
      setError(data?.error || "Unable to create account.");
      setLoading(false);
      return;
    }

    const login = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (!login || login.error) {
      window.location.href = "/login";
      return;
    }

    window.location.href = "/";
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-md space-y-4 rounded-3xl border border-black/10 bg-white p-7 shadow-sm">
      <h1 className="text-2xl font-semibold tracking-tight">Create your free account</h1>

      <div>
        <label className="mb-1 block text-sm font-medium">Name</label>
        <input
          className="w-full rounded-xl border border-black/15 bg-zinc-50 px-3 py-2.5 text-sm outline-none transition focus:border-black/30 focus:bg-white"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>

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
        <label className="mb-1 block text-sm font-medium">Password (min 8 chars)</label>
        <input
          type="password"
          required
          minLength={8}
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
        {loading ? "Creating account..." : "Start free"}
      </button>

      <p className="text-sm text-black/70">
        Already have an account? <Link className="underline" href="/login">Log in</Link>
      </p>
    </form>
  );
}
