"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function Profile() {
  const { data: session, isPending, refetch } = authClient.useSession();
  const [name, setName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  if (isPending) {
    return <p className="p-4">Loading...</p>;
  }

  if (!session?.user) {
    return (
      <div className="p-4 space-y-2">
        <p>You are not signed in.</p>
        <Link href="/signin" className="link">
          Go to sign in
        </Link>
      </div>
    );
  }

  const currentName = name ?? session.user.name;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setSaving(true);
    const { error } = await authClient.updateUser({ name: currentName });
    setSaving(false);
    if (error) {
      setError(error.message ?? "Failed to update profile");
      return;
    }
    await refetch();
    setSuccess("Profile updated");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
    >
      <legend className="fieldset-legend">আমার প্রোফাইল</legend>
      <label className="label" htmlFor="email">
        Email
      </label>
      <input
        id="email"
        type="email"
        className="input"
        value={session.user.email}
        disabled
      />
      <label className="label" htmlFor="name">
        Name
      </label>
      <input
        id="name"
        type="text"
        className="input"
        placeholder="Name"
        value={currentName}
        onChange={(e) => setName(e.target.value)}
        required
      />
      {error && <p className="text-error text-sm mt-2">{error}</p>}
      {success && <p className="text-success text-sm mt-2">{success}</p>}
      <button
        type="submit"
        className="btn btn-neutral mt-4"
        disabled={saving}
      >
        {saving ? "Saving..." : "Update profile"}
      </button>
    </form>
  );
}
