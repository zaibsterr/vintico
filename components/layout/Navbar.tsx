"use client";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Bell, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left: Page title area */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2">
            <div className="relative flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 via-violet-600 to-emerald-500 shadow-sm shadow-violet-500/20">
              <span className="text-white font-extrabold text-xs leading-none tracking-tighter select-none">V</span>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-sm font-bold tracking-tight">Vintico</span>
              <span className="text-[9px] font-semibold tracking-widest uppercase text-muted-foreground/70">Digital Hub</span>
            </div>
          </div>
          <Separator orientation="vertical" className="hidden sm:block h-6" />
          <h2 className="text-lg font-semibold tracking-tight">Dashboard</h2>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="rounded-lg hover:bg-accent/60 transition-colors gap-1.5" asChild>
            <Link href="/dashboard/pricing">
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline text-sm font-medium">Pricing</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="relative rounded-lg hover:bg-accent/60 transition-colors">
            <Bell className="h-4 w-4" />
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <UserButton />
        </div>
      </div>
    </header>
  );
}
