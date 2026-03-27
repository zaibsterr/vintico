import {
  Shield,
  MessageSquare,
  Mail,
  TrendingUp,
  FileCheck,
  DollarSign,
  Calculator,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const services = [
  {
    name: "FreelancerShield",
    description: "A freelancer protection dashboard designed to secure your income, reduce payment risk, and protect projects from scope creep.",
    icon: Shield,
    gradient: "from-emerald-600 to-teal-500",
    accent: "text-emerald-600",
    bg: "bg-emerald-500/10",
    features: [
      "Contract Risk Scanner",
      "Invoice Recovery Automation", 
      "Late Payment Protection",
      "Tax Estimate Alerts",
      "Client Risk Score",
    ],
  },
  {
    name: "QuoteNudge",
    description: "A smart follow-up and client conversion system that turns quotes into paying clients automatically.",
    icon: MessageSquare,
    gradient: "from-blue-600 to-cyan-500",
    accent: "text-blue-600",
    bg: "bg-blue-500/10",
    features: [
      "Automated SMS + Email Follow-Ups",
      "AI Smart Timing & Engagement Tracking",
      "Visual Lead Pipeline with Revenue Forecasting",
      "Professional Message Templates & A/B Testing",
      "Ghosted Client Recovery Sequences",
      "Conversion Insights & Win-Rate Analytics",
      "One-Click Actions + Full Interaction Timeline",
    ],
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
            <MessageSquare className="h-3 w-3 text-blue-500" />
            Our Services
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Two powerful services.
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-emerald-500 bg-clip-text text-transparent">
              One complete solution.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Sign up to earn credits and use Vintico for free daily with limited features.
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/signup">
              <Button
                size="lg"
                className="rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-md shadow-violet-500/20 hover:shadow-lg hover:shadow-violet-500/30 transition-all duration-200 gap-2"
              >
                Sign Up & Get Credits
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Service Cards ─────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.name}
                className="group relative overflow-hidden rounded-2xl border bg-card p-6 md:p-8 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-all duration-300"
              >
                {/* Gradient accent */}
                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${service.gradient}`} />
                
                {/* Icon */}
                <div className={`inline-flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-2xl ${service.bg} mb-4 md:mb-6`}>
                  <Icon className={`h-6 w-6 md:h-8 md:w-8 ${service.accent}`} />
                </div>
                
                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-3">
                  {service.name}
                </h3>
                
                {/* Description */}
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6">
                  {service.description}
                </p>
                
                {/* Features */}
                <div className="space-y-3 mb-8">
                  <p className="text-sm font-semibold text-foreground uppercase tracking-wider">
                    Dashboard Features:
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className={`h-2 w-2 rounded-full ${service.accent}`} />
                        <span className="text-xs md:text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* CTA Button */}
                <Link href={service.name === "FreelancerShield" ? "/dashboard/freelancer-shield" : "/dashboard/quote-nudge"}>
                  <Button
                    className={`w-full rounded-lg bg-gradient-to-r ${service.gradient} text-white shadow-md hover:shadow-lg transition-all duration-200 gap-2 text-sm md:text-base`}
                  >
                    Open Dashboard
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── CTA ───────────────────────────────────────────────── */}
      <section className="border-t bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Two essential services. One subscription.
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Get instant access to QuoteNudge and FreelancerShield in Vintico Digital Hub.
            Boost conversions and protect your business with our complete solution.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-md shadow-violet-500/20 hover:shadow-lg hover:shadow-violet-500/30 transition-all duration-200 gap-2"
              >
                Get Started Now
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/features">
              <Button variant="outline" size="lg" className="rounded-lg gap-2">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
