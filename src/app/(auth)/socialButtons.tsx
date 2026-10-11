"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SocialButtons() {
  const [pending, setPending] = useState<string | null>(null);

  async function handleSocial(provider: "google" | "github") {
    setPending(provider);
    const { error } = await authClient.signIn.social({
      provider,
      callbackURL: "/",
    });
    if (error) {
      toast.error(error.message ?? `${provider} sign-in failed`);
      setPending(null);
    }
  }

  return (
    <div className="flex flex-col gap-2 mt-4">
      <div className="divider">অথবা</div>
      <button
        type="button"
        className="btn btn-outline"
        disabled={pending !== null}
        onClick={() => handleSocial("google")}
      >
        {pending === "google" ? "Connecting..." : "Continue with Google"}
      </button>
      <button
        type="button"
        className="btn btn-outline"
        disabled={pending !== null}
        onClick={() => handleSocial("github")}
      >
        {pending === "github" ? "Connecting..." : "Continue with GitHub"}
      </button>
    </div>
  );
}
