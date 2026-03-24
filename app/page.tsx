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
  UserPlus,
  LayoutGrid,
  Rocket,
  Check,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import AnimatedStats from "@/components/common/AnimatedStats";
import SmartNotifications from "@/components/common/SmartNotifications";

const services = [
  {
    name: "Quote Nudge",
    tagline: "Convert more, chase less",
    desc: "Intelligent follow-up engine that turns pending quotes into confirmed deals with automated, personalised SMS nudges.",
    icon: FileText,
    gradient: "from-blue-600 to-cyan-500",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-600",
    metric: { value: "+28%", label: "conversion lift" },
    features: ["Automated SMS sequences", "Smart scheduling", "Conversion analytics"],
  },
  {
    name: "Distill Guard",
    tagline: "Stay compliant, automatically",
    desc: "Real-time compliance monitoring and license verification that keeps your business audit-ready around the clock.",
    icon: ShieldCheck,
    gradient: "from-emerald-600 to-teal-500",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-600",
    metric: { value: "98.7%", label: "compliance rate" },
    features: ["Auto license checks", "Audit trail export", "Expiry alerts"],
  },
  {
    name: "Leave Guard",
    tagline: "Approve smarter, not harder",
    desc: "Streamlined leave management with overlap detection, instant approvals, and team availability at a glance.",
    icon: CalendarDays,
    gradient: "from-amber-500 to-orange-500",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-600",
    metric: { value: "3x", label: "faster approvals" },
    features: ["Overlap detection", "One-click approvals", "Calendar sync"],
  },
  {
    name: "Cyber Guard",
    tagline: "Threats detected, not ignored",
    desc: "Enterprise-grade password analysis and security reporting that protects your organisation from common vulnerabilities.",
    icon: ShieldAlert,
    gradient: "from-red-600 to-rose-500",
    iconBg: "bg-red-500/10",
    iconColor: "text-red-600",
    metric: { value: "-40%", label: "risk exposure" },
    features: ["Password strength audit", "Threat reports", "Security scoring"],
  },
  {
    name: "Vintico Pulse",
    tagline: "Your business, at a glance",
    desc: "Unified analytics dashboard that aggregates KPIs from every module into a single, actionable real-time view.",
    icon: Activity,
    gradient: "from-violet-600 to-purple-500",
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-600",
    metric: { value: "+18%", label: "productivity gain" },
    features: ["Cross-module KPIs", "Activity feed", "PDF export"],
  },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ─── Nav ─────────────────────────────────────────────────── */}
      <Header />

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

        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-32 lg:py-40">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            {/* Left — Copy */}
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground mb-6">
                <Zap className="h-3 w-3 text-amber-500" />
                Intelligent Business Suite
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                One platform.
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-emerald-500 bg-clip-text text-transparent">
                  Five superpowers.
                </span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Vintico unifies quote management, compliance monitoring, leave
                tracking, cybersecurity alerts, and real-time analytics into one
                elegant dashboard - so your team can focus on what matters.
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
              <div className="relative rounded-2xl border bg-card p-3 sm:p-6 shadow-2xl shadow-black/5">
                {/* Fake top bar */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-amber-400" />
                  <div className="h-3 w-3 rounded-full bg-emerald-400" />
                  <div className="ml-4 h-3 flex-1 rounded-full bg-muted" />
                </div>

                {/* Stat row */}
                <div className="grid grid-cols-3 gap-1.5 sm:gap-3 mb-4 sm:mb-6">
                  {[
                    { label: "Quotes Sent", value: "1,284", trend: "+12%" },
                    { label: "Compliance", value: "98.7%", trend: "+2.1%" },
                    { label: "Active Alerts", value: "3", trend: "-40%" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-lg border bg-background p-1.5 sm:p-3 min-w-0"
                    >
                      <p className="text-[8px] sm:text-[10px] font-medium text-muted-foreground uppercase tracking-wider truncate">
                        {stat.label}
                      </p>
                      <p className="mt-0.5 sm:mt-1 text-base sm:text-xl font-bold">{stat.value}</p>
                      <p className="text-[10px] sm:text-xs text-emerald-600 font-medium">
                        {stat.trend}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Chart placeholder */}
                <div className="rounded-lg border bg-background p-2 sm:p-4 mb-4">
                  <div className="flex items-end gap-1 sm:gap-1.5 h-16 sm:h-24">
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
              <div className="absolute -top-4 -left-2 sm:-left-4 rounded-xl border bg-card p-2 sm:p-3 shadow-lg">
                <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-violet-500" />
              </div>
              <div className="absolute -bottom-4 -right-2 sm:-right-4 rounded-xl border bg-card p-2 sm:p-3 shadow-lg">
                <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Services Strip ──────────────────────────────────────── */}
      <section className="relative border-t overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-gradient-to-bl from-blue-400/[0.05] via-violet-400/[0.04] to-transparent blur-3xl" />
          <div className="absolute -bottom-32 left-0 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-emerald-400/[0.04] to-transparent blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-28">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground mb-5">
              <Zap className="h-3 w-3 text-amber-500" />
              Modular by Design
            </div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              Everything your business needs
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Five specialised modules, one unified platform. Each one built to solve a real problem — together they&apos;re unstoppable.
            </p>
          </div>

          {/* Top row — 3 cards */}
          <div className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-5 sm:mb-6">
            {services.slice(0, 3).map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.name}
                  className="group relative rounded-2xl border bg-card overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/[0.04] hover:-translate-y-1"
                >
                  {/* Top accent bar */}
                  <div className={`h-[3px] bg-gradient-to-r ${s.gradient}`} />

                  <div className="p-6 sm:p-7">
                    {/* Icon + metric row */}
                    <div className="flex items-start justify-between mb-5">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${s.iconBg} transition-transform duration-300 group-hover:scale-110`}>
                        <Icon className={`h-6 w-6 ${s.iconColor}`} />
                      </div>
                      <div className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 bg-gradient-to-r ${s.gradient} bg-clip-text`}>
                        <span className="text-sm font-bold text-transparent bg-gradient-to-r from-foreground to-foreground bg-clip-text">{s.metric.value}</span>
                        <span className="text-[10px] text-muted-foreground font-medium">{s.metric.label}</span>
                      </div>
                    </div>

                    {/* Title + tagline */}
                    <h3 className="text-lg font-semibold tracking-tight mb-1">{s.name}</h3>
                    <p className="text-xs font-medium text-muted-foreground/70 uppercase tracking-wider mb-3">{s.tagline}</p>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                      {s.desc}
                    </p>

                    {/* Feature list */}
                    <div className="space-y-2">
                      {s.features.map((f) => (
                        <div key={f} className="flex items-center gap-2.5">
                          <div className={`flex h-5 w-5 items-center justify-center rounded-md ${s.iconBg} shrink-0`}>
                            <Check className={`h-3 w-3 ${s.iconColor}`} />
                          </div>
                          <span className="text-sm text-muted-foreground font-medium">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Hover glow */}
                  <div className={`absolute -top-16 -right-16 h-36 w-36 rounded-full bg-gradient-to-br ${s.gradient} opacity-0 group-hover:opacity-[0.06] blur-2xl transition-opacity duration-500 pointer-events-none`} />
                </div>
              );
            })}
          </div>

          {/* Bottom row — 2 cards centered */}
          <div className="grid gap-5 sm:gap-6 sm:grid-cols-2 max-w-3xl mx-auto">
            {services.slice(3).map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.name}
                  className="group relative rounded-2xl border bg-card overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/[0.04] hover:-translate-y-1"
                >
                  {/* Top accent bar */}
                  <div className={`h-[3px] bg-gradient-to-r ${s.gradient}`} />

                  <div className="p-6 sm:p-7">
                    {/* Icon + metric row */}
                    <div className="flex items-start justify-between mb-5">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${s.iconBg} transition-transform duration-300 group-hover:scale-110`}>
                        <Icon className={`h-6 w-6 ${s.iconColor}`} />
                      </div>
                      <div className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 bg-gradient-to-r ${s.gradient} bg-clip-text`}>
                        <span className="text-sm font-bold text-transparent bg-gradient-to-r from-foreground to-foreground bg-clip-text">{s.metric.value}</span>
                        <span className="text-[10px] text-muted-foreground font-medium">{s.metric.label}</span>
                      </div>
                    </div>

                    {/* Title + tagline */}
                    <h3 className="text-lg font-semibold tracking-tight mb-1">{s.name}</h3>
                    <p className="text-xs font-medium text-muted-foreground/70 uppercase tracking-wider mb-3">{s.tagline}</p>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                      {s.desc}
                    </p>

                    {/* Feature list */}
                    <div className="space-y-2">
                      {s.features.map((f) => (
                        <div key={f} className="flex items-center gap-2.5">
                          <div className={`flex h-5 w-5 items-center justify-center rounded-md ${s.iconBg} shrink-0`}>
                            <Check className={`h-3 w-3 ${s.iconColor}`} />
                          </div>
                          <span className="text-sm text-muted-foreground font-medium">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Hover glow */}
                  <div className={`absolute -top-16 -right-16 h-36 w-36 rounded-full bg-gradient-to-br ${s.gradient} opacity-0 group-hover:opacity-[0.06] blur-2xl transition-opacity duration-500 pointer-events-none`} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Partner Scroll Strip ──────────────────────────────────── */}
      <section className="bg-black overflow-hidden">
        <style>{`
          @keyframes partnerScroll {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
        `}</style>
        <div className="py-8 sm:py-10">
          <div
            className="flex w-max items-center"
            style={{ animation: "partnerScroll 35s linear infinite" }}
          >
            {[...Array(2)].map((_, setIdx) => (
              <div key={setIdx} className="flex items-center shrink-0">
                {[
                  { name: "Stripe", file: "stripe" },
                  { name: "Twilio", file: "twilio" },
                  { name: "Salesforce", file: "salesforce" },
                  { name: "HubSpot", file: "hubspot" },
                  { name: "Slack", file: "slack" },
                  { name: "Shopify", file: "shopify" },
                  { name: "Zendesk", file: "zendesk" },
                  { name: "Microsoft Azure", file: "azure" },
                ].map((partner) => (
                  <div
                    key={`${setIdx}-${partner.name}`}
                    className="shrink-0 px-8 sm:px-12 flex items-center justify-center opacity-50 hover:opacity-90 transition-opacity duration-300 select-none"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/logos/${partner.file}.svg`}
                      alt={partner.name}
                      className="h-6 sm:h-7 w-auto object-contain"
                      loading="lazy"
                      draggable={false}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How It Works ──────────────────────────────────────────── */}
      <section className="border-t bg-muted/20 overflow-hidden">
        <style>{`
          @keyframes floatSlow { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
          @keyframes pulseDot { 0%,100%{opacity:.4;transform:scale(1)} 50%{opacity:1;transform:scale(1.3)} }
          @keyframes fillBar { from{width:0} to{width:var(--bar-w)} }
          .float-slow { animation: floatSlow 4s ease-in-out infinite; }
          .pulse-dot { animation: pulseDot 2s ease-in-out infinite; }
          .fill-bar { animation: fillBar 1.5s ease-out forwards; }
        `}</style>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14 sm:py-24">
          <div className="text-center mb-14 sm:mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground mb-5">
              <Zap className="h-3 w-3 text-amber-500" />
              Simple Setup
            </div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              Up and running in minutes
            </h2>
            <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
              No complex onboarding. Three simple steps to transform your workflow.
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8 sm:grid-cols-3 relative">
            {/* Connector line (desktop) */}
            <div className="hidden sm:block absolute top-[88px] left-[16.67%] right-[16.67%] h-[2px]">
              <div className="h-full w-full bg-gradient-to-r from-blue-400/30 via-violet-400/30 to-emerald-400/30 rounded-full" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-1">
                <ChevronRight className="h-3 w-3 text-muted-foreground/40" />
                <ChevronRight className="h-3 w-3 text-muted-foreground/40" />
              </div>
            </div>

            {/* Step 1 — Create Your Account */}
            <div className="group relative">
              <div className="rounded-2xl border bg-card p-5 sm:p-6 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 overflow-hidden">
                {/* Ambient glow */}
                <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-blue-400/10 blur-2xl group-hover:bg-blue-400/20 transition-all duration-500" />

                {/* Mini UI mockup */}
                <div className="relative rounded-xl border bg-background p-3 sm:p-4 mb-5 float-slow">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-2 w-2 rounded-full bg-blue-500 pulse-dot" />
                    <div className="h-2 w-20 rounded-full bg-muted" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <UserPlus className="h-3.5 w-3.5 text-blue-500" />
                      </div>
                      <div className="flex-1">
                        <div className="h-2 w-24 rounded-full bg-muted mb-1" />
                        <div className="h-1.5 w-16 rounded-full bg-muted/60" />
                      </div>
                      <div className="h-5 w-5 rounded-full bg-emerald-500/15 flex items-center justify-center">
                        <Check className="h-3 w-3 text-emerald-500" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-lg bg-violet-500/10 flex items-center justify-center">
                        <Lock className="h-3.5 w-3.5 text-violet-500" />
                      </div>
                      <div className="flex-1">
                        <div className="h-2 w-20 rounded-full bg-muted mb-1" />
                        <div className="h-1.5 w-12 rounded-full bg-muted/60" />
                      </div>
                      <div className="h-5 w-5 rounded-full bg-emerald-500/15 flex items-center justify-center">
                        <Check className="h-3 w-3 text-emerald-500" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 h-7 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center">
                    <span className="text-[10px] font-semibold text-white">Create Account</span>
                  </div>
                </div>

                {/* Icon + Step badge */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 shadow-md shadow-blue-500/20 transition-transform duration-300 group-hover:scale-110">
                    <UserPlus className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex h-6 items-center rounded-full bg-blue-500/10 px-2.5">
                    <span className="text-[10px] font-bold text-blue-600">Step 01</span>
                  </div>
                </div>
                <h3 className="text-base font-semibold mb-1.5">Create Your Account</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Sign up in seconds with email or SSO. No credit card required to start.
                </p>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>

            {/* Step 2 — Activate Modules */}
            <div className="group relative">
              <div className="rounded-2xl border bg-card p-5 sm:p-6 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/5 hover:-translate-y-1 overflow-hidden">
                <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-violet-400/10 blur-2xl group-hover:bg-violet-400/20 transition-all duration-500" />

                {/* Mini UI mockup — module grid */}
                <div className="relative rounded-xl border bg-background p-3 sm:p-4 mb-5 float-slow" style={{ animationDelay: "0.5s" }}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-2 w-2 rounded-full bg-violet-500 pulse-dot" style={{ animationDelay: "0.3s" }} />
                    <div className="h-2 w-24 rounded-full bg-muted" />
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { icon: FileText, color: "bg-blue-500/10 text-blue-500", on: true },
                      { icon: ShieldCheck, color: "bg-emerald-500/10 text-emerald-500", on: true },
                      { icon: CalendarDays, color: "bg-amber-500/10 text-amber-500", on: true },
                      { icon: ShieldAlert, color: "bg-red-500/10 text-red-500", on: false },
                      { icon: Activity, color: "bg-violet-500/10 text-violet-500", on: true },
                      { icon: BarChart3, color: "bg-cyan-500/10 text-cyan-500", on: false },
                    ].map((m, idx) => {
                      const MIcon = m.icon;
                      return (
                        <div key={idx} className={`flex flex-col items-center gap-1 rounded-lg border p-1.5 sm:p-2 ${m.on ? "border-violet-500/30 bg-violet-500/[0.03]" : ""}`}>
                          <MIcon className={`h-3.5 w-3.5 ${m.on ? m.color.split(" ")[1] : "text-muted-foreground/40"}`} />
                          <div className={`h-1 w-4 rounded-full ${m.on ? "bg-emerald-400" : "bg-muted"}`} />
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-purple-500 shadow-md shadow-violet-500/20 transition-transform duration-300 group-hover:scale-110">
                    <LayoutGrid className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex h-6 items-center rounded-full bg-violet-500/10 px-2.5">
                    <span className="text-[10px] font-bold text-violet-600">Step 02</span>
                  </div>
                </div>
                <h3 className="text-base font-semibold mb-1.5">Activate Modules</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Choose the services you need. Each module is ready to go with smart defaults.
                </p>

                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-600 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>

            {/* Step 3 — Scale & Optimize */}
            <div className="group relative">
              <div className="rounded-2xl border bg-card p-5 sm:p-6 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/5 hover:-translate-y-1 overflow-hidden">
                <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-emerald-400/10 blur-2xl group-hover:bg-emerald-400/20 transition-all duration-500" />

                {/* Mini UI mockup — live chart */}
                <div className="relative rounded-xl border bg-background p-3 sm:p-4 mb-5 float-slow" style={{ animationDelay: "1s" }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-emerald-500 pulse-dot" style={{ animationDelay: "0.6s" }} />
                      <div className="h-2 w-14 rounded-full bg-muted" />
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600">+18%</span>
                  </div>
                  <div className="flex items-end gap-[3px] h-12">
                    {[30, 45, 38, 55, 48, 62, 58, 72, 65, 80].map((h, idx) => (
                      <div
                        key={idx}
                        className="flex-1 rounded-t-[2px] bg-gradient-to-t from-emerald-500 to-teal-400 opacity-60 group-hover:opacity-90 transition-all duration-300"
                        style={{ height: `${h}%`, transitionDelay: `${idx * 40}ms` }}
                      />
                    ))}
                  </div>
                  <div className="mt-2 flex justify-between">
                    <span className="text-[8px] text-muted-foreground">Mon</span>
                    <span className="text-[8px] text-muted-foreground">Wed</span>
                    <span className="text-[8px] text-muted-foreground">Fri</span>
                  </div>
                  {/* KPI pills */}
                  <div className="flex gap-1.5 mt-2">
                    <div className="flex-1 rounded-md bg-emerald-500/10 py-1 text-center">
                      <p className="text-[8px] text-muted-foreground">Revenue</p>
                      <p className="text-[10px] font-bold text-emerald-600">$24.8k</p>
                    </div>
                    <div className="flex-1 rounded-md bg-blue-500/10 py-1 text-center">
                      <p className="text-[8px] text-muted-foreground">Users</p>
                      <p className="text-[10px] font-bold text-blue-600">1,284</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-teal-500 shadow-md shadow-emerald-500/20 transition-transform duration-300 group-hover:scale-110">
                    <Rocket className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex h-6 items-center rounded-full bg-emerald-500/10 px-2.5">
                    <span className="text-[10px] font-bold text-emerald-600">Step 03</span>
                  </div>
                </div>
                <h3 className="text-base font-semibold mb-1.5">Scale & Optimize</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Track performance with real-time analytics and let AI optimize your workflows.
                </p>

                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-600 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Stats / Metrics (Animated) ─────────────────────────────── */}
      <AnimatedStats />

      {/* ─── Feature Spotlight — Smart Notifications ────────────────── */}
      <SmartNotifications />

      {/* ─── Testimonials ──────────────────────────────────────────── */}
      <section className="relative border-t overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-violet-400/[0.06] via-blue-400/[0.06] to-transparent blur-3xl" />
          <div className="absolute -bottom-32 right-1/4 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-emerald-400/[0.05] to-transparent blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-28">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground mb-5">
              <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              Trusted by Teams Worldwide
            </div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              What our users say
            </h2>
            <p className="mt-3 text-muted-foreground max-w-lg mx-auto leading-relaxed">
              Real feedback from teams using Vintico Digital Hub every day.
            </p>
          </div>

          {/* Trustpilot Badge */}
          <div className="flex justify-center mb-12 sm:mb-16">
            <a
              href="https://www.trustpilot.com/review/vintico.site"
              target="_blank"
              rel="noopener noreferrer"
              className="group/tp inline-flex items-center gap-3 rounded-full border bg-card px-5 py-2.5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
            >
              {/* Trustpilot star */}
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex h-5 w-5 items-center justify-center rounded-[3px] bg-[#00b67a]">
                    <svg className="h-3 w-3 text-white fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                ))}
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-xs font-bold tracking-tight">Excellent</span>
                <span className="text-[10px] text-muted-foreground font-medium">
                  Rated 4.8/5 on{" "}
                  <span className="font-semibold text-[#00b67a] group-hover/tp:underline">Trustpilot</span>
                </span>
              </div>
              {/* Trustpilot logo mark */}
              <svg className="h-4 w-4 text-[#00b67a] ml-1" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </a>
          </div>

          {/* Testimonial Cards */}
          <div className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                quote: "Quote Nudge alone increased our conversion rate by 28%. The automated follow-ups feel personal, not robotic.",
                name: "Sarah Mitchell",
                role: "VP of Sales",
                company: "Apex Corp",
                gradient: "from-blue-600 to-cyan-500",
                accent: "blue",
              },
              {
                quote: "Distill Guard saved us from a compliance audit nightmare. Real-time monitoring gives us peace of mind we never had before.",
                name: "David Chen",
                role: "Compliance Director",
                company: "NovaTech",
                gradient: "from-emerald-600 to-teal-500",
                accent: "emerald",
              },
              {
                quote: "Having five tools unified in one dashboard cut our operational overhead in half. The UI is genuinely a joy to use.",
                name: "Priya Sharma",
                role: "COO",
                company: "Meridian Group",
                gradient: "from-violet-600 to-purple-500",
                accent: "violet",
              },
            ].map((t) => (
              <div
                key={t.name}
                className="group relative rounded-2xl border bg-card overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1"
              >
                {/* Top gradient bar */}
                <div className={`h-[3px] bg-gradient-to-r ${t.gradient}`} />

                <div className="p-6 sm:p-7">
                  {/* Rating + verified */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg key={i} className="h-4 w-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-[10px] font-medium text-muted-foreground/60 uppercase tracking-wider">Verified</span>
                  </div>

                  {/* Quote */}
                  <blockquote className="text-[15px] leading-relaxed text-foreground/80 font-medium mb-7">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>

                  {/* Divider */}
                  <div className="h-px bg-border mb-5" />

                  {/* Author */}
                  <div className="flex items-center gap-3.5">
                    <div className={`relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${t.gradient} text-white text-sm font-bold shadow-sm`}>
                      {t.name.split(" ").map((n) => n[0]).join("")}
                      {/* Online indicator */}
                      <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-card bg-emerald-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold leading-tight truncate">{t.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">
                        {t.role},{" "}
                        <span className="font-medium text-foreground/60">{t.company}</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hover ambient glow */}
                <div className={`absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br ${t.gradient} opacity-0 group-hover:opacity-[0.06] blur-2xl transition-opacity duration-500`} />
              </div>
            ))}
          </div>

          {/* Bottom — Trustpilot CTA */}
          <div className="mt-12 sm:mt-16 text-center">
            <div className="inline-flex flex-col items-center gap-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="h-px w-8 bg-border" />
                <span className="text-xs font-medium uppercase tracking-widest">Verified Reviews</span>
                <div className="h-px w-8 bg-border" />
              </div>
              <a
                href="https://www.trustpilot.com/review/vintico.site"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#00b67a] hover:underline underline-offset-4 transition-all duration-200"
              >
                Read all reviews on Trustpilot
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─────────────────────────────────────────────── */}
      <section className="relative border-t overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-blue-400/10 via-violet-400/10 to-emerald-400/10 blur-3xl" />
        </div>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16 sm:py-32 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Ready to transform
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-emerald-500 bg-clip-text text-transparent">
              your business?
            </span>
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Join thousands of teams already using Vintico Digital Hub to
            streamline operations, boost productivity, and make smarter decisions.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/sign-up">
              <Button
                size="lg"
                className="rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/30 transition-all duration-200 gap-2 h-12 px-8 text-base"
              >
                Start Free Trial
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                size="lg"
                className="rounded-xl gap-2 h-12 px-8 text-base"
              >
                Talk to Sales
              </Button>
            </Link>
          </div>
          <p className="mt-5 text-xs text-muted-foreground">
            No credit card required · Free 14-day trial · Cancel anytime
          </p>
        </div>
      </section>

      {/* ─── Footer ──────────────────────────────────────────────── */}
      <footer className="border-t mt-auto">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Vintico. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-foreground transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
