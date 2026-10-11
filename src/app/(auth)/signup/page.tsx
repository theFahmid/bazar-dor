"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
    });
    setLoading(false);
    if (error) {
      setError(error.message ?? "Failed to create account");
      return;
    }
    router.push("/");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
    >
      <legend className="fieldset-legend">Sign Up</legend>
      <label className="label" htmlFor="name">
        Name
      </label>
      <input
        id="name"
        type="text"
        className="input"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <label className="label" htmlFor="email">
        Email
      </label>
      <input
        id="email"
        type="email"
        className="input"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label className="label" htmlFor="password">
        Password
      </label>
      <input
        id="password"
        type="password"
        className="input"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={8}
      />
      {error && <p className="text-error text-sm mt-2">{error}</p>}
      <button
        type="submit"
        className="btn btn-neutral mt-4"
        disabled={loading}
      >
        {loading ? "Creating account..." : "Create an Account"}
      </button>
      <p className="text-sm mt-2">
        Already have an account?{" "}
        <Link href="/signin" className="link">
          Sign in
        </Link>
      </p>
    </form>
  );
}
