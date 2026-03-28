import ServiceCard from "@/components/services/ServiceCard";

const services = [
  {
    name: "Quote Nudge",
    description: "Manage, track, and follow up on insurance quotes with smart automation.",
    href: "/dashboard/quote-nudge",
    icon: "FileText",
    color: "bg-blue-500",
  },
  {
    name: "Distill Guard",
    description: "Monitor compliance, licenses, and regulatory requirements in real time.",
    href: "/dashboard/distill-guard",
    icon: "ShieldCheck",
    color: "bg-emerald-500",
  },
  {
    name: "Leave Guard",
    description: "Streamline employee leave requests, approvals, and calendar tracking.",
    href: "/dashboard/leave-guard",
    icon: "CalendarDays",
    color: "bg-amber-500",
  },
  {
    name: "Cyber Guard",
    description: "Detect, monitor, and respond to cybersecurity threats instantly.",
    href: "/dashboard/cyber-guard",
    icon: "ShieldAlert",
    color: "bg-red-500",
  },
  {
    name: "Vintico Pulse",
    description: "Live business analytics, KPIs, and performance dashboards.",
    href: "/dashboard/vintico-pulse",
    icon: "Activity",
    color: "bg-violet-500",
  },
  {
    name: "Contract Risk Scanner",
    description: "Analyze contracts and detect hidden freelancer risks before starting projects.",
    href: "/dashboard/contract-risk-scanner",
    icon: "FileSearch",
    color: "bg-orange-500",
  },
  {
    name: "Invoice Recovery Automation",
    description: "Automatically recover unpaid invoices with smart reminders and payment tracking.",
    href: "/dashboard/invoice-recovery",
    icon: "CreditCard",
    color: "bg-pink-500",
  },
  {
    name: "Late Payment Protection",
    description: "Track overdue payments and enforce late fee protection rules automatically.",
    href: "/dashboard/late-payment-protection",
    icon: "AlertTriangle",
    color: "bg-red-600",
  },
  {
    name: "Tax Estimate Alerts",
    description: "Estimate upcoming tax obligations and set aside money for quarterly payments.",
    href: "/dashboard/tax-estimate-alerts",
    icon: "Calculator",
    color: "bg-indigo-500",
  },
  {
    name: "Client Risk Score",
    description: "Evaluate client reliability and project risk before accepting work.",
    href: "/dashboard/client-risk-score",
    icon: "UserSearch",
    color: "bg-teal-500",
  },
];

export default function DashboardOverview() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back. Select a service module to get started.
        </p>
      </div>

      {/* Service Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service.name} {...service} />
        ))}
      </div>
    </div>
  );
}
