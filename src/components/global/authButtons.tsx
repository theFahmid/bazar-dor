"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function AuthButtons() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  if (isPending) {
    return (
      <div className="flex gap-2 items-center">
        <div className="skeleton h-10 w-24" />
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div>
        <Link href="/signin">
          <button className="btn btn-ghost">সাইন ইন</button>
        </Link>
        <Link href="/signup">
          <button className="btn btn-primary">সাইন আপ</button>
        </Link>
      </div>
    );
  }

  async function handleLogout() {
    setLoggingOut(true);
    const { error } = await authClient.signOut();
    setLoggingOut(false);
    if (error) {
      toast.error("Failed to log out");
      return;
    }
    toast.success("Logged out successfully");
    router.push("/");
    router.refresh();
  }

  return (
    <div>
      <Link href="/profile">
        <button className="btn btn-ghost">আমার প্রোফাইল</button>
      </Link>
      <button
        onClick={handleLogout}
        disabled={loggingOut}
        className="btn btn-primary"
      >
        {loggingOut ? "লগ আউট হচ্ছে..." : "লগ আউট"}
      </button>
    </div>
  );
}
