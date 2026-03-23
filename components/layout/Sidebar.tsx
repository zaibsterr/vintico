"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  ShieldCheck,
  CalendarDays,
  ShieldAlert,
  Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

const services = [
  {
    name: "Quote Nudge",
    href: "/dashboard/quote-nudge",
    icon: FileText,
    color: "text-blue-500",
  },
  {
    name: "Distill Guard",
    href: "/dashboard/distill-guard",
    icon: ShieldCheck,
    color: "text-emerald-500",
  },
  {
    name: "Leave Guard",
    href: "/dashboard/leave-guard",
    icon: CalendarDays,
    color: "text-amber-500",
  },
  {
    name: "Cyber Guard",
    href: "/dashboard/cyber-guard",
    icon: ShieldAlert,
    color: "text-red-500",
  },
  {
    name: "Vintico Pulse",
    href: "/dashboard/vintico-pulse",
    icon: Activity,
    color: "text-violet-500",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 border-r bg-sidebar">
      <div className="flex flex-col flex-1 min-h-0">
        {/* Logo */}
        <div className="flex items-center h-16 px-6">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">V</span>
            </div>
            <span className="text-lg font-bold tracking-tight">Vintico</span>
          </Link>
        </div>

        <Separator />

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          <Link
            href="/dashboard"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              pathname === "/dashboard"
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <Activity className="h-4 w-4" />
            Overview
          </Link>

          <div className="pt-4 pb-2">
            <p className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Services
            </p>
          </div>

          {services.map((service) => {
            const Icon = service.icon;
            const isActive = pathname === service.href;
            return (
              <Link
                key={service.href}
                href={service.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <Icon className={cn("h-4 w-4", isActive ? service.color : "")} />
                {service.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
