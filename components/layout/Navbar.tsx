"use client";

import { UserButton } from "@clerk/nextjs";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left: Page title area */}
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold tracking-tight">Dashboard</h2>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-4 w-4" />
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <UserButton />
        </div>
      </div>
    </header>
  );
}
