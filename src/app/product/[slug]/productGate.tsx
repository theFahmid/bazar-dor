"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function ProductGate({ children }: { children: ReactNode }) {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const toasted = useRef(false);

  useEffect(() => {
    if (!isPending && !session) {
      if (!toasted.current) {
        toasted.current = true;
        toast.error("Please sign in to view this product");
      }
      router.replace("/signin");
    }
  }, [isPending, session, router]);

  if (isPending || !session) return <p>Loading...</p>;
  return <>{children}</>;
}
