"use client";

import { SignIn } from "@clerk/nextjs";
import { useEffect } from "react";

export default function SignInPage() {
  useEffect(() => {
    // Trigger Stripe bot detection on sign-in page load
    fetch("/api/stripe/bot-detect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: "/sign-in", event: "signin_attempt" }),
    }).catch(() => {});
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <SignIn
        fallbackRedirectUrl="/dashboard"
        signUpUrl="/sign-up"
      />
    </div>
  );
}
