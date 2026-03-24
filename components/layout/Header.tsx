"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Features", href: "/features" },
  { label: "Services", href: "/services" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* ── Brand ─────────────────────────────────────── */}
        <Link href="/" className="flex items-center gap-2.5 group">
          {/* Logo mark */}
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-violet-600 to-emerald-500 shadow-md shadow-violet-500/20 transition-transform duration-200 group-hover:scale-105">
            <span className="text-white font-extrabold text-base leading-none tracking-tighter select-none">
              V
            </span>
            {/* Shine overlay */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />
          </div>
          {/* Wordmark */}
          <div className="flex flex-col leading-none">
            <span className="text-base font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Vintico
            </span>
            <span className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground/70">
              Digital Hub
            </span>
          </div>
        </Link>

        {/* ── Desktop nav ──────────────────────────────── */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative px-3.5 py-2 text-sm font-medium rounded-lg transition-colors duration-150",
                "text-muted-foreground hover:text-foreground hover:bg-accent/60"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* ── Desktop actions ──────────────────────────── */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/sign-in">
            <Button
              variant="ghost"
              size="sm"
              className="rounded-lg text-sm font-medium"
            >
              Sign In
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button
              size="sm"
              className="rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-md shadow-violet-500/20 hover:shadow-lg hover:shadow-violet-500/30 transition-all duration-200 gap-1.5"
            >
              Get Started
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        {/* ── Mobile hamburger ─────────────────────────── */}
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="md:hidden flex items-center justify-center h-9 w-9 rounded-lg text-muted-foreground hover:bg-accent transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* ── Mobile menu ────────────────────────────────── */}
      <div
        className={cn(
          "md:hidden overflow-hidden border-t border-border/40 bg-background/95 backdrop-blur-xl transition-all duration-300 ease-in-out",
          mobileOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="flex flex-col gap-1 px-6 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-accent/60 transition-colors"
            >
              {link.label}
            </Link>
          ))}

          <div className="flex flex-col gap-2 pt-3 mt-2 border-t border-border/40">
            <Link href="/sign-in" onClick={() => setMobileOpen(false)}>
              <Button
                variant="outline"
                size="sm"
                className="w-full rounded-lg text-sm"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/dashboard" onClick={() => setMobileOpen(false)}>
              <Button
                size="sm"
                className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-md gap-1.5"
              >
                Get Started
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
