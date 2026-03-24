"use client";

import {
  Zap,
  Rocket,
  Crown,
  Package,
  Boxes,
  Check,
  Star,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Starter",
    price: "$19",
    period: "/mo",
    credits: 100,
    icon: Zap,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-500/10",
    borderColor: "",
    highlight: false,
    badge: null,
    benefits: [
      "100 monthly credits",
      "Quote Nudge SMS sending",
      "Leave Guard management",
      "Basic Vintico Pulse view",
      "Email support",
    ],
    url: "https://buy.stripe.com/4gM7sNgivamAcTz6fl1Fe01",
    btnClass: "",
  },
  {
    name: "Growth",
    price: "$49",
    period: "/mo",
    credits: 500,
    icon: Rocket,
    iconColor: "text-violet-500",
    iconBg: "bg-violet-500/10",
    borderColor: "ring-2 ring-violet-500/50",
    highlight: true,
    badge: "Most Popular",
    benefits: [
      "500 monthly credits",
      "All Starter features",
      "Cyber Guard full reports & export",
      "Vintico Pulse full export",
      "Advanced insights & analytics",
      "Priority support",
    ],
    url: "https://buy.stripe.com/eVq28t3vJ9iwcTzbzF1Fe02",
    btnClass:
      "bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white shadow-md shadow-violet-500/20",
  },
  {
    name: "Pro",
    price: "$89",
    period: "/mo",
    credits: 2000,
    icon: Crown,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-500/10",
    borderColor: "",
    highlight: false,
    badge: null,
    benefits: [
      "2,000 monthly credits",
      "All Growth features",
      "Unlimited leave requests",
      "Unlimited distillations",
      "White-glove onboarding",
      "Dedicated account manager",
    ],
    url: "https://buy.stripe.com/4gM00leaneCQ8Dj5bh1Fe03",
    btnClass: "",
  },
];

const creditPacks = [
  {
    name: "Credits Pack 500",
    credits: 500,
    price: "$29",
    period: " one-time",
    icon: Package,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-500/10",
    benefits: [
      "500 bonus credits",
      "No expiration",
      "Stack with any plan",
    ],
    url: "https://buy.stripe.com/cNi7sN8Q352g5r7avB1Fe04",
  },
  {
    name: "Credits Pack 2000",
    credits: 2000,
    price: "$99",
    period: " one-time",
    icon: Boxes,
    iconColor: "text-orange-500",
    iconBg: "bg-orange-500/10",
    benefits: [
      "2,000 bonus credits",
      "No expiration",
      "Stack with any plan",
      "Best value per credit",
    ],
    url: "https://buy.stripe.com/4gMdRb2rFfGUg5LeLR1Fe05",
  },
];

export default function PricingPage() {
  return (
    <div className="space-y-8 sm:space-y-10">
      {/* Header */}
      <div className="text-center space-y-2 px-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Choose Your Plan
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
          Start free, upgrade when you&apos;re ready. Every plan includes core
          Vintico tools — pick the one that fits your growth.
        </p>
      </div>

      {/* Subscription Plans */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => {
          const Icon = plan.icon;
          return (
            <Card
              key={plan.name}
              className={`relative flex flex-col ${plan.borderColor}`}
            >
              {plan.badge && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-violet-600 text-white hover:bg-violet-600 px-3 py-0.5 text-xs">
                  <Star className="h-3 w-3 mr-1 fill-current" />
                  {plan.badge}
                </Badge>
              )}
              <CardHeader className="text-center pb-2">
                <div
                  className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl ${plan.iconBg} mb-3`}
                >
                  <Icon className={`h-7 w-7 ${plan.iconColor}`} />
                </div>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="pt-2">
                  <span className="text-4xl font-extrabold tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {plan.period}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground pt-1">
                  {plan.credits.toLocaleString()} credits / month
                </p>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <ul className="space-y-2.5 flex-1">
                  {plan.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 mt-0.5 shrink-0 text-emerald-500" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full mt-6 ${plan.btnClass}`}
                  variant={plan.highlight ? "default" : "outline"}
                  asChild
                >
                  <a href={plan.url} target="_blank" rel="noopener noreferrer">
                    Get {plan.name}
                  </a>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Credit Packs */}
      <div className="space-y-4">
        <div className="text-center">
          <h2 className="text-xl font-bold tracking-tight">
            Need Extra Credits?
          </h2>
          <p className="text-sm text-muted-foreground">
            Top up anytime — credits never expire and stack with your plan.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 max-w-2xl mx-auto">
          {creditPacks.map((pack) => {
            const Icon = pack.icon;
            return (
              <Card key={pack.name} className="flex flex-col">
                <CardHeader className="text-center pb-2">
                  <div
                    className={`mx-auto flex h-12 w-12 items-center justify-center rounded-2xl ${pack.iconBg} mb-2`}
                  >
                    <Icon className={`h-6 w-6 ${pack.iconColor}`} />
                  </div>
                  <CardTitle className="text-lg">{pack.name}</CardTitle>
                  <div className="pt-1">
                    <span className="text-3xl font-extrabold tracking-tight">
                      {pack.price}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {pack.period}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground pt-1">
                    {pack.credits.toLocaleString()} credits
                  </p>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <ul className="space-y-2 flex-1">
                    {pack.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 mt-0.5 shrink-0 text-emerald-500" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6" variant="outline" asChild>
                    <a
                      href={pack.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Buy {pack.credits.toLocaleString()} Credits
                    </a>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
