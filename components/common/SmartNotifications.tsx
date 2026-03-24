"use client";

import { useEffect, useRef, useState } from "react";
import {
  Bell,
  FileText,
  ShieldCheck,
  CalendarDays,
  ShieldAlert,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const notifications = [
  {
    icon: FileText,
    iconBg: "bg-blue-500/10 text-blue-600",
    accent: "border-l-blue-500",
    dot: "bg-blue-500",
    title: "Quote Converted",
    desc: "Acme Corp accepted proposal #Q-1284",
    time: "2m ago",
    badge: "Quote Nudge",
    badgeColor: "bg-blue-500/10 text-blue-600",
  },
  {
    icon: ShieldCheck,
    iconBg: "bg-emerald-500/10 text-emerald-600",
    accent: "border-l-emerald-500",
    dot: "bg-emerald-500",
    title: "Compliance Verified",
    desc: "License renewal auto-approved for Region B",
    time: "15m ago",
    badge: "Distill Guard",
    badgeColor: "bg-emerald-500/10 text-emerald-600",
  },
  {
    icon: CalendarDays,
    iconBg: "bg-amber-500/10 text-amber-600",
    accent: "border-l-amber-500",
    dot: "bg-amber-500",
    title: "Leave Approved",
    desc: "J. Carter — Dec 20-24 PTO confirmed",
    time: "1h ago",
    badge: "Leave Guard",
    badgeColor: "bg-amber-500/10 text-amber-600",
  },
  {
    icon: ShieldAlert,
    iconBg: "bg-red-500/10 text-red-600",
    accent: "border-l-red-500",
    dot: "bg-red-500",
    title: "Threat Blocked",
    desc: "Suspicious login attempt from unknown IP",
    time: "3h ago",
    badge: "Cyber Guard",
    badgeColor: "bg-red-500/10 text-red-600",
  },
];

const features = [
  "Cross-module unified alert feed",
  "AI-prioritized by urgency and relevance",
  "Custom notification rules per team role",
  "Instant mobile push and email digests",
];

export default function SmartNotifications() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="border-t bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14 sm:py-24">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          {/* Left — Illustrated notification panel */}
          <div className="relative">
            {/* Ambient glow */}
            <div className="absolute -top-16 -left-16 h-48 w-48 rounded-full bg-violet-400/8 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-blue-400/8 blur-3xl pointer-events-none" />

            <div className="relative rounded-2xl border bg-card p-5 sm:p-6 shadow-xl shadow-black/5 overflow-hidden">
              {/* Window chrome */}
              <div className="flex items-center gap-2 mb-5">
                <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                <div className="ml-3 flex-1 flex items-center gap-2">
                  <div className="h-2.5 w-28 rounded-full bg-muted" />
                </div>
                <div className="flex items-center gap-1.5 rounded-lg bg-violet-500/10 px-2.5 py-1">
                  <Bell className="h-3 w-3 text-violet-600" />
                  <span className="text-[10px] font-bold text-violet-600">4</span>
                </div>
              </div>

              {/* Header bar */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-foreground/70" />
                  <span className="text-xs font-semibold">Notification Center</span>
                </div>
                <span className="text-[10px] text-muted-foreground font-medium">Mark all read</span>
              </div>

              {/* Notification cards */}
              <div className="space-y-2.5">
                {notifications.map((n, i) => {
                  const Icon = n.icon;
                  return (
                    <div
                      key={n.title}
                      className={`group relative flex items-start gap-3 rounded-xl border border-l-[3px] ${n.accent} bg-background p-3.5 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 ${
                        visible
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-4"
                      }`}
                      style={{
                        transitionDelay: visible ? `${i * 150 + 200}ms` : "0ms",
                      }}
                    >
                      {/* Icon */}
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-lg ${n.iconBg} flex-shrink-0 transition-transform duration-200 group-hover:scale-110`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-0.5">
                          <p className="text-[13px] font-semibold truncate">
                            {n.title}
                          </p>
                          <span className="text-[10px] text-muted-foreground flex-shrink-0 font-medium">
                            {n.time}
                          </span>
                        </div>
                        <p className="text-[11px] text-muted-foreground truncate mb-1.5">
                          {n.desc}
                        </p>
                        <span
                          className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[9px] font-semibold ${n.badgeColor}`}
                        >
                          {n.badge}
                        </span>
                      </div>

                      {/* Unread dot */}
                      <div
                        className={`absolute top-3 right-3 h-1.5 w-1.5 rounded-full ${n.dot}`}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Bottom bar */}
              <div className="mt-4 pt-3 border-t flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-3 w-3 text-violet-500" />
                  <span className="text-[10px] text-muted-foreground font-medium">
                    AI-sorted by priority
                  </span>
                </div>
                <span className="text-[10px] text-violet-600 font-semibold cursor-pointer hover:underline">
                  View all
                </span>
              </div>
            </div>

            {/* Floating badge */}
            <div
              className={`absolute -top-3 left-0 sm:-left-3 rounded-xl border bg-card px-3.5 py-2 shadow-lg flex items-center gap-2 transition-all duration-500 ${
                visible
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 -translate-y-2 scale-95"
              }`}
              style={{ transitionDelay: visible ? "800ms" : "0ms" }}
            >
              <div className="relative">
                <Bell className="h-4 w-4 text-violet-500" />
                <div className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-violet-500 animate-ping" />
                <div className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-violet-500" />
              </div>
              <span className="text-xs font-bold">4 New</span>
            </div>

            {/* Floating priority tag */}
            <div
              className={`absolute -bottom-3 right-0 sm:-right-3 rounded-xl border bg-card px-3.5 py-2 shadow-lg flex items-center gap-2 transition-all duration-500 ${
                visible
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-2 scale-95"
              }`}
              style={{ transitionDelay: visible ? "1000ms" : "0ms" }}
            >
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-semibold">Real-time</span>
            </div>
          </div>

          {/* Right — Copy */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground mb-5">
              <Bell className="h-3 w-3 text-violet-500" />
              Smart Notifications
            </div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl mb-4">
              Never miss what matters
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Vintico&apos;s unified notification center aggregates alerts from
              all five modules into a single, prioritized feed. AI-powered
              filtering ensures you see critical updates first, while routine
              items are batched intelligently.
            </p>
            <div className="space-y-4">
              {features.map((item, i) => (
                <div
                  key={item}
                  className={`flex items-center gap-3 transition-all duration-300 ${
                    visible
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-4"
                  }`}
                  style={{
                    transitionDelay: visible ? `${i * 120 + 400}ms` : "0ms",
                  }}
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500/10 flex-shrink-0">
                    <ArrowRight className="h-3 w-3 text-emerald-600" />
                  </div>
                  <span className="text-sm text-muted-foreground font-medium">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
