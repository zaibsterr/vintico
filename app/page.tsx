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
import Header from "@/components/layout/Header";
import AnimatedStats from "@/components/common/AnimatedStats";
import SmartNotifications from "@/components/common/SmartNotifications";

const services = [
  {
    name: "Quote Nudge",
    desc: "Smart follow-ups that convert quotes into policies.",
    icon: FileText,
    color: "bg-blue-500/10 text-blue-600",
    gradient: "from-blue-600 to-cyan-500",
    orb: "bg-blue-400/20",
    bars: [40, 65, 50, 80, 60, 75],
    stat: { label: "Conversion", value: "34%" },
  },
  {
    name: "Distill Guard",
    desc: "Automated compliance & license monitoring.",
    icon: ShieldCheck,
    color: "bg-emerald-500/10 text-emerald-600",
    gradient: "from-emerald-600 to-teal-500",
    orb: "bg-emerald-400/20",
    bars: [70, 78, 82, 88, 90, 95],
    stat: { label: "Compliance", value: "98%" },
  },
  {
    name: "Leave Guard",
    desc: "Effortless leave management & approvals.",
    icon: CalendarDays,
    color: "bg-amber-500/10 text-amber-600",
    gradient: "from-amber-500 to-orange-500",
    orb: "bg-amber-400/20",
    bars: [45, 60, 55, 70, 50, 65],
    stat: { label: "Utilization", value: "67%" },
  },
  {
    name: "Cyber Guard",
    desc: "Real-time cybersecurity threat detection.",
    icon: ShieldAlert,
    color: "bg-red-500/10 text-red-600",
    gradient: "from-red-600 to-rose-500",
    orb: "bg-red-400/20",
    bars: [20, 15, 25, 10, 18, 8],
    stat: { label: "Threats", value: "Low" },
  },
  {
    name: "Vintico Pulse",
    desc: "Live business analytics & performance metrics.",
    icon: Activity,
    color: "bg-violet-500/10 text-violet-600",
    gradient: "from-violet-600 to-purple-500",
    orb: "bg-violet-400/20",
    bars: [35, 50, 58, 65, 72, 85],
    stat: { label: "Growth", value: "+18%" },
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
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.name}
                  className="group relative rounded-2xl border bg-card overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1"
                >
                  {/* Illustrated top area */}
                  <div className="relative h-36 overflow-hidden">
                    {/* Background gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${s.gradient} opacity-[0.07] group-hover:opacity-[0.12] transition-opacity duration-300`} />
                    {/* Ambient orb */}
                    <div className={`absolute -top-6 -right-6 h-24 w-24 rounded-full ${s.orb} blur-2xl group-hover:scale-125 transition-transform duration-500`} />

                    {/* Mini dashboard illustration */}
                    <div className="relative px-4 pt-4">
                      {/* Stat badge */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1.5">
                          <div className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${s.gradient}`} />
                          <span className="text-[9px] font-medium text-muted-foreground uppercase tracking-wider">
                            {s.stat.label}
                          </span>
                        </div>
                        <span className="text-xs font-bold">{s.stat.value}</span>
                      </div>

                      {/* Mini bar chart */}
                      <div className="flex items-end gap-[3px] h-14">
                        {s.bars.map((h, i) => (
                          <div
                            key={i}
                            className={`flex-1 rounded-t-[3px] bg-gradient-to-t ${s.gradient} opacity-50 group-hover:opacity-75 transition-all duration-300`}
                            style={{
                              height: `${h}%`,
                              transitionDelay: `${i * 40}ms`,
                            }}
                          />
                        ))}
                      </div>

                      {/* Decorative line rows */}
                      <div className="mt-3 space-y-1.5">
                        <div className="flex gap-2">
                          <div className="h-1.5 flex-[3] rounded-full bg-muted" />
                          <div className="h-1.5 flex-[2] rounded-full bg-muted/60" />
                        </div>
                        <div className="flex gap-2">
                          <div className="h-1.5 flex-[2] rounded-full bg-muted/60" />
                          <div className="h-1.5 flex-[3] rounded-full bg-muted" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content area */}
                  <div className="px-4 pb-5 pt-4 text-center">
                    <div
                      className={`mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${s.color} transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-sm">{s.name}</h3>
                    <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                      {s.desc}
                    </p>
                  </div>

                  {/* Bottom gradient accent */}
                  <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${s.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
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
            style={{ animation: "partnerScroll 30s linear infinite" }}
          >
            {[...Array(2)].map((_, setIdx) => (
              <div key={setIdx} className="flex items-center shrink-0">
                {[
                  "Stripe",
                  "Twilio",
                  "Salesforce",
                  "HubSpot",
                  "Slack",
                  "Shopify",
                  "Zendesk",
                  "Microsoft Azure",
                ].map((name) => (
                  <span
                    key={`${setIdx}-${name}`}
                    className="shrink-0 px-8 sm:px-12 text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-white/50 hover:text-white/80 transition-colors duration-300 select-none"
                  >
                    {name}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How It Works ──────────────────────────────────────────── */}
      <section className="border-t bg-muted/20">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
          <div className="text-center mb-16">
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

          <div className="grid gap-8 sm:grid-cols-3">
            {[
              {
                step: "01",
                title: "Create Your Account",
                desc: "Sign up in seconds with email or SSO. No credit card required to start.",
                gradient: "from-blue-600 to-cyan-500",
                icon: "🔐",
              },
              {
                step: "02",
                title: "Activate Modules",
                desc: "Choose the services you need. Each module is ready to go with smart defaults.",
                gradient: "from-violet-600 to-purple-500",
                icon: "⚡",
              },
              {
                step: "03",
                title: "Scale & Optimize",
                desc: "Track performance with real-time analytics and let AI optimize your workflows.",
                gradient: "from-emerald-600 to-teal-500",
                icon: "📈",
              },
            ].map((item, i) => (
              <div key={item.step} className="relative">
                {/* Connector line */}
                {i < 2 && (
                  <div className="hidden sm:block absolute top-10 left-[calc(50%+40px)] right-[calc(-50%+40px)] h-[1px] border-t border-dashed border-border" />
                )}
                <div className="flex flex-col items-center text-center">
                  {/* Step circle */}
                  <div className={`relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} shadow-lg mb-5`}>
                    <span className="text-2xl">{item.icon}</span>
                    <div className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-background border-2 border-border text-[10px] font-bold">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-base font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Stats / Metrics (Animated) ─────────────────────────────── */}
      <AnimatedStats />

      {/* ─── Feature Spotlight — Smart Notifications ────────────────── */}
      <SmartNotifications />

      {/* ─── Testimonials ──────────────────────────────────────────── */}
      <section className="border-t">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
          <div className="text-center mb-14">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              What our users say
            </h2>
            <p className="mt-2 text-muted-foreground">
              Real feedback from teams using Vintico Digital Hub every day.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                quote: "Quote Nudge alone increased our conversion rate by 28%. The automated follow-ups feel personal, not robotic.",
                name: "Sarah Mitchell",
                role: "VP of Sales, Apex Corp",
                gradient: "from-blue-600 to-cyan-500",
              },
              {
                quote: "Distill Guard saved us from a compliance audit nightmare. Real-time monitoring gives us peace of mind we never had before.",
                name: "David Chen",
                role: "Compliance Director, NovaTech",
                gradient: "from-emerald-600 to-teal-500",
              },
              {
                quote: "Having five tools unified in one dashboard cut our operational overhead in half. The UI is genuinely a joy to use.",
                name: "Priya Sharma",
                role: "COO, Meridian Group",
                gradient: "from-violet-600 to-purple-500",
              },
            ].map((t) => (
              <div
                key={t.name}
                className="group relative rounded-2xl border bg-card p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              >
                {/* Top accent */}
                <div className={`absolute top-0 left-6 right-6 h-[2px] rounded-full bg-gradient-to-r ${t.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="h-4 w-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="flex items-center gap-3">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br ${t.gradient} text-white text-xs font-bold`}>
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold leading-tight">{t.name}</p>
                    <p className="text-[11px] text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─────────────────────────────────────────────── */}
      <section className="relative border-t overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-blue-400/10 via-violet-400/10 to-emerald-400/10 blur-3xl" />
        </div>
        <div className="mx-auto max-w-3xl px-6 py-24 sm:py-32 text-center">
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
        <div className="mx-auto max-w-7xl px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
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
