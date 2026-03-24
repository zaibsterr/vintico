import {
  Zap,
  Shield,
  BarChart3,
  Bell,
  Clock,
  Lock,
  Globe,
  Layers,
  RefreshCw,
  Users,
  FileText,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const highlights = [
  {
    icon: Zap,
    title: "Lightning Fast",
    desc: "Real-time data processing with sub-second response times across all modules.",
    color: "from-amber-500 to-orange-500",
    bg: "bg-amber-500/10",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    desc: "Bank-grade encryption, SOC 2 compliance, and continuous threat monitoring.",
    color: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-500/10",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    desc: "AI-powered insights with customizable dashboards and automated reporting.",
    color: "from-blue-500 to-cyan-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    desc: "Context-aware alerts that prioritize what matters and reduce noise.",
    color: "from-violet-500 to-purple-500",
    bg: "bg-violet-500/10",
  },
  {
    icon: Clock,
    title: "Workflow Automation",
    desc: "Automate repetitive tasks with intelligent triggers and scheduling.",
    color: "from-rose-500 to-pink-500",
    bg: "bg-rose-500/10",
  },
  {
    icon: Globe,
    title: "Cloud Native",
    desc: "Built for scale with 99.99% uptime SLA and global CDN distribution.",
    color: "from-sky-500 to-indigo-500",
    bg: "bg-sky-500/10",
  },
];

const capabilities = [
  {
    icon: Layers,
    title: "Unified Platform",
    desc: "Five powerful modules working together seamlessly in one dashboard.",
  },
  {
    icon: RefreshCw,
    title: "Real-Time Sync",
    desc: "Changes propagate instantly across all connected services and users.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    desc: "Role-based access, shared views, and activity feeds for your entire team.",
  },
  {
    icon: Lock,
    title: "Data Privacy",
    desc: "Your data stays yours. Full GDPR compliance with granular permissions.",
  },
  {
    icon: FileText,
    title: "Audit Trails",
    desc: "Complete history of every action, exportable for compliance reviews.",
  },
  {
    icon: BarChart3,
    title: "Custom Reports",
    desc: "Build and schedule reports tailored to your business KPIs.",
  },
];

export default function FeaturesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ─── Hero ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-blue-400/15 via-violet-400/15 to-transparent blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-emerald-400/10 via-cyan-400/10 to-transparent blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground mb-6">
            <Zap className="h-3 w-3 text-amber-500" />
            Platform Features
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Built for teams that
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-emerald-500 bg-clip-text text-transparent">
              move fast
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Every feature in Vintico Digital Hub is designed to save time,
            reduce risk, and give your team superpowers.
          </p>
        </div>
      </section>

      {/* ─── Highlight Grid ────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Why teams love Vintico
          </h2>
          <p className="mt-2 text-muted-foreground">
            Core capabilities that set us apart.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group relative rounded-2xl border bg-card p-6 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
              >
                {/* Gradient accent top */}
                <div
                  className={`absolute top-0 left-6 right-6 h-[2px] rounded-full bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />

                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${item.bg} mb-4`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── Illustrated Feature Showcase ──────────────────────── */}
      <section className="border-t bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            {/* Left — Illustrated dashboard */}
            <div className="relative">
              <div className="rounded-2xl border bg-card p-6 shadow-xl shadow-black/5">
                {/* Window chrome */}
                <div className="flex items-center gap-2 mb-5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  <div className="ml-3 h-2.5 flex-1 max-w-[200px] rounded-full bg-muted" />
                </div>

                {/* Metric cards */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    { label: "Uptime", value: "99.99%", accent: "text-emerald-600" },
                    { label: "Avg Response", value: "42ms", accent: "text-blue-600" },
                    { label: "Active Users", value: "2,847", accent: "text-violet-600" },
                  ].map((m) => (
                    <div key={m.label} className="rounded-lg border bg-background p-3">
                      <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                        {m.label}
                      </p>
                      <p className={`mt-1 text-lg font-bold ${m.accent}`}>
                        {m.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Mini chart */}
                <div className="rounded-lg border bg-background p-4">
                  <div className="flex items-end gap-1 h-16">
                    {[35, 55, 40, 70, 50, 80, 60, 75, 45, 85, 65, 90].map(
                      (h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-t-sm bg-gradient-to-t from-blue-500 to-violet-500 opacity-75"
                          style={{ height: `${h}%` }}
                        />
                      )
                    )}
                  </div>
                  <p className="mt-2 text-[10px] text-muted-foreground text-center">
                    Platform performance — last 12 months
                  </p>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-3 -right-3 rounded-xl border bg-card px-3 py-2 shadow-lg flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-medium">Live</span>
              </div>
            </div>

            {/* Right — Copy */}
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-6">
                A dashboard that works
                <br />
                <span className="text-muted-foreground">as hard as you do</span>
              </h2>
              <div className="space-y-5">
                {capabilities.map((cap) => {
                  const Icon = cap.icon;
                  return (
                    <div key={cap.title} className="flex gap-4">
                      <div className="flex-shrink-0 flex h-9 w-9 items-center justify-center rounded-lg bg-accent/60">
                        <Icon className="h-4 w-4 text-foreground/80" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold">{cap.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {cap.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ───────────────────────────────────────────────── */}
      <section className="border-t">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Ready to supercharge your workflow?
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Join thousands of teams already using Vintico Digital Hub to
            streamline operations and boost productivity.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-md shadow-violet-500/20 hover:shadow-lg hover:shadow-violet-500/30 transition-all duration-200 gap-2"
              >
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" size="lg" className="rounded-lg gap-2">
                View Services
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
