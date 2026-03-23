"use client";

import { SignUp } from "@clerk/nextjs";
import { useEffect } from "react";

export default function SignUpPage() {
  useEffect(() => {
    // Trigger Stripe bot detection on sign-up page load
    fetch("/api/stripe/bot-detect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: "/sign-up", event: "signup_attempt" }),
    }).catch(() => {});
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <SignUp
        fallbackRedirectUrl="/dashboard"
        signInUrl="/sign-in"
      />
    </div>
  );
}
