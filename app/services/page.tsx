import {
  FileText,
  ShieldCheck,
  CalendarDays,
  ShieldAlert,
  Activity,
  ArrowRight,
  TrendingUp,
  Users,
  AlertTriangle,
  CheckCircle2,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const services = [
  {
    name: "Quote Nudge",
    tagline: "Convert more quotes into policies",
    desc: "Smart follow-up engine that tracks open quotes, sends timely reminders, and helps your team close deals faster with AI-powered nudges.",
    icon: FileText,
    gradient: "from-blue-600 to-cyan-500",
    accent: "text-blue-600",
    bg: "bg-blue-500/10",
    stats: [
      { label: "Quotes Sent", value: "1,284" },
      { label: "Conversion", value: "34.2%" },
      { label: "Avg Response", value: "2.4h" },
    ],
    activities: [
      { dot: "bg-blue-500", text: "Quote #Q-1284 sent to Acme Corp" },
      { dot: "bg-emerald-500", text: "Follow-up scheduled — 3 days" },
      { dot: "bg-amber-500", text: "Quote #Q-1280 converted to policy" },
    ],
    chartHeights: [30, 50, 40, 65, 55, 80, 60, 75, 45, 85, 70, 90],
  },
  {
    name: "Distill Guard",
    tagline: "Automated compliance monitoring",
    desc: "Continuous license and regulatory compliance tracking. Get alerts before deadlines, auto-verify renewals, and maintain a perfect audit trail.",
    icon: ShieldCheck,
    gradient: "from-emerald-600 to-teal-500",
    accent: "text-emerald-600",
    bg: "bg-emerald-500/10",
    stats: [
      { label: "Compliance", value: "98.7%" },
      { label: "Licenses", value: "142" },
      { label: "Renewals Due", value: "5" },
    ],
    activities: [
      { dot: "bg-emerald-500", text: "License #L-089 auto-renewed" },
      { dot: "bg-amber-500", text: "Renewal due in 14 days — Johnson LLC" },
      { dot: "bg-blue-500", text: "Compliance report generated" },
    ],
    chartHeights: [70, 75, 80, 78, 82, 85, 88, 90, 87, 92, 95, 98],
  },
  {
    name: "Leave Guard",
    tagline: "Effortless leave management",
    desc: "Streamline PTO requests, approvals, and team scheduling. Visual calendar view, automatic balance tracking, and conflict detection built in.",
    icon: CalendarDays,
    gradient: "from-amber-500 to-orange-500",
    accent: "text-amber-600",
    bg: "bg-amber-500/10",
    stats: [
      { label: "Pending", value: "3" },
      { label: "Approved", value: "28" },
      { label: "Utilization", value: "67%" },
    ],
    activities: [
      { dot: "bg-emerald-500", text: "Leave approved — J. Carter (Dec 20-24)" },
      { dot: "bg-amber-500", text: "Pending review — M. Chen (Jan 2-5)" },
      { dot: "bg-blue-500", text: "Team calendar updated" },
    ],
    chartHeights: [45, 55, 60, 50, 70, 65, 40, 55, 75, 60, 50, 45],
  },
  {
    name: "Cyber Guard",
    tagline: "Real-time threat detection",
    desc: "24/7 cybersecurity monitoring with AI-driven threat analysis. Detect vulnerabilities, block attacks, and get instant incident reports.",
    icon: ShieldAlert,
    gradient: "from-red-600 to-rose-500",
    accent: "text-red-600",
    bg: "bg-red-500/10",
    stats: [
      { label: "Threats Blocked", value: "847" },
      { label: "Risk Score", value: "Low" },
      { label: "Uptime", value: "99.99%" },
    ],
    activities: [
      { dot: "bg-red-500", text: "Suspicious login blocked — IP 192.168.x.x" },
      { dot: "bg-emerald-500", text: "Security scan passed — all clear" },
      { dot: "bg-amber-500", text: "Firewall rule updated automatically" },
    ],
    chartHeights: [20, 15, 25, 10, 30, 18, 12, 22, 8, 15, 10, 5],
  },
  {
    name: "Vintico Pulse",
    tagline: "Live business analytics",
    desc: "Real-time performance dashboards with KPI tracking, trend analysis, and automated insights. Make data-driven decisions with confidence.",
    icon: Activity,
    gradient: "from-violet-600 to-purple-500",
    accent: "text-violet-600",
    bg: "bg-violet-500/10",
    stats: [
      { label: "Revenue", value: "$248K" },
      { label: "Growth", value: "+18.3%" },
      { label: "Clients", value: "1,042" },
    ],
    activities: [
      { dot: "bg-violet-500", text: "Monthly report auto-generated" },
      { dot: "bg-emerald-500", text: "Revenue target hit — Q4 goal reached" },
      { dot: "bg-blue-500", text: "New client onboarded — TechFlow Inc" },
    ],
    chartHeights: [35, 45, 50, 55, 48, 62, 58, 70, 65, 78, 82, 88],
  },
];

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ─── Hero ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-violet-400/15 via-blue-400/15 to-transparent blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-emerald-400/10 via-teal-400/10 to-transparent blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground mb-6">
            <Activity className="h-3 w-3 text-violet-500" />
            Our Services
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Five modules.
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-emerald-500 bg-clip-text text-transparent">
              One powerful platform.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Each service is a fully featured dashboard designed to handle a
            critical part of your business — all unified under Vintico Digital Hub.
          </p>
        </div>
      </section>

      {/* ─── Service Dashboard Cards ───────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="space-y-16">
          {services.map((service, idx) => {
            const Icon = service.icon;
            const isReversed = idx % 2 !== 0;

            return (
              <div
                key={service.name}
                className={`grid gap-10 lg:grid-cols-2 lg:items-center ${
                  isReversed ? "lg:direction-rtl" : ""
                }`}
              >
                {/* Illustrated Dashboard Card */}
                <div className={`${isReversed ? "lg:order-2" : ""}`}>
                  <div className="relative rounded-2xl border bg-card p-5 sm:p-6 shadow-xl shadow-black/5">
                    {/* Window chrome */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                      <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                      <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                      <div className="ml-3 flex items-center gap-2">
                        <div
                          className={`h-4 w-4 rounded bg-gradient-to-br ${service.gradient} flex items-center justify-center`}
                        >
                          <Icon className="h-2.5 w-2.5 text-white" />
                        </div>
                        <span className="text-xs font-medium text-muted-foreground">
                          {service.name}
                        </span>
                      </div>
                    </div>

                    {/* Stats row */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
                      {service.stats.map((stat) => (
                        <div
                          key={stat.label}
                          className="rounded-lg border bg-background p-2.5 sm:p-3"
                        >
                          <p className="text-[9px] sm:text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                            {stat.label}
                          </p>
                          <p
                            className={`mt-0.5 text-base sm:text-lg font-bold ${service.accent}`}
                          >
                            {stat.value}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Mini chart */}
                    <div className="rounded-lg border bg-background p-3 sm:p-4 mb-4">
                      <div className="flex items-end gap-1 h-14 sm:h-16">
                        {service.chartHeights.map((h, i) => (
                          <div
                            key={i}
                            className={`flex-1 rounded-t-sm bg-gradient-to-t ${service.gradient} opacity-70`}
                            style={{ height: `${h}%` }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Activity feed */}
                    <div className="space-y-1.5">
                      {service.activities.map((row, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2.5 rounded-md bg-muted/50 px-3 py-2"
                        >
                          <div
                            className={`h-1.5 w-1.5 rounded-full ${row.dot} flex-shrink-0`}
                          />
                          <span className="text-[11px] sm:text-xs text-muted-foreground truncate">
                            {row.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className={`${isReversed ? "lg:order-1" : ""}`}>
                  <div
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${service.bg} mb-4`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-2">
                    {service.name}
                  </h2>
                  <p
                    className={`text-sm font-semibold ${service.accent} uppercase tracking-wider mb-4`}
                  >
                    {service.tagline}
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {service.desc}
                  </p>
                  <Link href="/dashboard">
                    <Button
                      variant="outline"
                      className="rounded-lg gap-2 group"
                    >
                      Open {service.name}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── CTA ───────────────────────────────────────────────── */}
      <section className="border-t bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            All five services. One subscription.
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Get instant access to every module in Vintico Digital Hub.
            No hidden fees, no per-seat pricing surprises.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-md shadow-violet-500/20 hover:shadow-lg hover:shadow-violet-500/30 transition-all duration-200 gap-2"
              >
                Start Free Trial
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/features">
              <Button variant="outline" size="lg" className="rounded-lg gap-2">
                View Features
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
