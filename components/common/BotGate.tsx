"use client";

import { useEffect, useState } from "react";
import { ShieldAlert } from "lucide-react";

export default function BotGate({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<"loading" | "verified" | "blocked">(
    "loading"
  );

  useEffect(() => {
    const cached = sessionStorage.getItem("vintico_bot_verified");
    if (cached === "true") {
      setStatus("verified");
      return;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const verify = async () => {
      try {
        const res = await fetch("/api/stripe/bot-detect", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ page: window.location.pathname }),
          signal: controller.signal,
        });
        const data = await res.json();
        clearTimeout(timeout);

        if (data.verified) {
          sessionStorage.setItem("vintico_bot_verified", "true");
          setStatus("verified");
        } else {
          setStatus("blocked");
        }
      } catch {
        // Timeout or network error — allow through to avoid blocking real users
        sessionStorage.setItem("vintico_bot_verified", "true");
        setStatus("verified");
      }
    };

    verify();
    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Verifying session…</p>
        </div>
      </div>
    );
  }

  if (status === "blocked") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4 text-center max-w-sm">
          <ShieldAlert className="h-12 w-12 text-destructive" />
          <h1 className="text-xl font-bold">Access Denied</h1>
          <p className="text-sm text-muted-foreground">
            This request has been blocked by our security system. If you believe
            this is an error, please try again or contact support.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
