import Link from "next/link";
import {
  FileText,
  ShieldCheck,
  CalendarDays,
  ShieldAlert,
  Activity,
  ArrowRight,
  Zap,
  Lock,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    name: "Quote Nudge",
    desc: "Smart follow-ups that convert quotes into policies.",
    icon: FileText,
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    name: "Distill Guard",
    desc: "Automated compliance & license monitoring.",
    icon: ShieldCheck,
    color: "bg-emerald-500/10 text-emerald-600",
  },
  {
    name: "Leave Guard",
    desc: "Effortless leave management & approvals.",
    icon: CalendarDays,
    color: "bg-amber-500/10 text-amber-600",
  },
  {
    name: "Cyber Guard",
    desc: "Real-time cybersecurity threat detection.",
    icon: ShieldAlert,
    color: "bg-red-500/10 text-red-600",
  },
  {
    name: "Vintico Pulse",
    desc: "Live business analytics & performance metrics.",
    icon: Activity,
    color: "bg-violet-500/10 text-violet-600",
  },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ─── Nav ─────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">V</span>
            </div>
            <span className="text-xl font-bold tracking-tight">Vintico</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                Dashboard
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="sm">
                Get Started
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* ─── Hero Section ────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Background illustration — layered geometric shapes */}
        <div className="absolute inset-0 -z-10">
          {/* Large gradient orb top-right */}
          <div className="absolute -top-32 -right-32 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-blue-400/20 via-violet-400/20 to-transparent blur-3xl" />
          {/* Smaller orb bottom-left */}
          <div className="absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-emerald-400/15 via-cyan-400/15 to-transparent blur-3xl" />
          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:py-40">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            {/* Left — Copy */}
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground mb-6">
                <Zap className="h-3 w-3 text-amber-500" />
                Intelligent Business Suite
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                One platform.
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-emerald-500 bg-clip-text text-transparent">
                  Five superpowers.
                </span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Vintico unifies quote management, compliance monitoring, leave
                tracking, cybersecurity alerts, and real-time analytics into one
                elegant dashboard — so your team can focus on what matters.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/dashboard">
                  <Button size="lg" className="gap-2">
                    Launch Dashboard
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="gap-2">
                  <Lock className="h-4 w-4" />
                  Enterprise-Grade Security
                </Button>
              </div>
            </div>

            {/* Right — Illustrated dashboard mockup (pure CSS/SVG) */}
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              {/* Main card */}
              <div className="relative rounded-2xl border bg-card p-6 shadow-2xl shadow-black/5">
                {/* Fake top bar */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-amber-400" />
                  <div className="h-3 w-3 rounded-full bg-emerald-400" />
                  <div className="ml-4 h-3 flex-1 rounded-full bg-muted" />
                </div>

                {/* Stat row */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[
                    { label: "Quotes Sent", value: "1,284", trend: "+12%" },
                    { label: "Compliance", value: "98.7%", trend: "+2.1%" },
                    { label: "Active Alerts", value: "3", trend: "-40%" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-lg border bg-background p-3"
                    >
                      <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                        {stat.label}
                      </p>
                      <p className="mt-1 text-xl font-bold">{stat.value}</p>
                      <p className="text-xs text-emerald-600 font-medium">
                        {stat.trend}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Chart placeholder */}
                <div className="rounded-lg border bg-background p-4 mb-4">
                  <div className="flex items-end gap-1.5 h-24">
                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map(
                      (h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-t-sm bg-gradient-to-t from-blue-500 to-violet-500 opacity-80 transition-all"
                          style={{ height: `${h}%` }}
                        />
                      )
                    )}
                  </div>
                  <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
                    <span>Jan</span>
                    <span>Jun</span>
                    <span>Dec</span>
                  </div>
                </div>

                {/* Activity rows */}
                <div className="space-y-2">
                  {[
                    { dot: "bg-blue-500", text: "New quote #Q-1284 sent to Acme Corp" },
                    { dot: "bg-emerald-500", text: "License renewal verified — Distill Guard" },
                    { dot: "bg-amber-500", text: "Leave request approved — J. Carter" },
                  ].map((row, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 rounded-md bg-muted/50 px-3 py-2"
                    >
                      <div className={`h-2 w-2 rounded-full ${row.dot}`} />
                      <span className="text-xs text-muted-foreground">
                        {row.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating accent cards */}
              <div className="absolute -top-4 -left-4 rounded-xl border bg-card p-3 shadow-lg">
                <BarChart3 className="h-6 w-6 text-violet-500" />
              </div>
              <div className="absolute -bottom-4 -right-4 rounded-xl border bg-card p-3 shadow-lg">
                <ShieldCheck className="h-6 w-6 text-emerald-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Services Strip ──────────────────────────────────────── */}
      <section className="border-t bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Everything your business needs
            </h2>
            <p className="mt-2 text-muted-foreground">
              Five specialised modules, one unified platform.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.name}
                  className="group rounded-xl border bg-card p-5 text-center transition-all hover:shadow-md hover:-translate-y-0.5"
                >
                  <div
                    className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg ${s.color}`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-sm">{s.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Footer ──────────────────────────────────────────────── */}
      <footer className="border-t mt-auto">
        <div className="mx-auto max-w-7xl px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Vintico. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <span className="hover:text-foreground cursor-pointer transition-colors">
              Privacy
            </span>
            <span className="hover:text-foreground cursor-pointer transition-colors">
              Terms
            </span>
            <span className="hover:text-foreground cursor-pointer transition-colors">
              Support
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
