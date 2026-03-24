"use client";

import { useEffect, useRef, useState } from "react";
import { Users, Clock, Star, Timer } from "lucide-react";

interface StatConfig {
  end: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  sub: string;
  icon: React.ElementType;
  gradient: string;
  iconBg: string;
}

const stats: StatConfig[] = [
  {
    end: 10000,
    suffix: "+",
    label: "Active Users",
    sub: "Teams trust Vintico daily",
    icon: Users,
    gradient: "from-blue-600 to-cyan-500",
    iconBg: "bg-blue-500/10 text-blue-600",
  },
  {
    end: 99.9,
    decimals: 1,
    suffix: "%",
    label: "Platform Uptime",
    sub: "Enterprise-grade reliability",
    icon: Clock,
    gradient: "from-emerald-600 to-teal-500",
    iconBg: "bg-emerald-500/10 text-emerald-600",
  },
  {
    end: 4.8,
    decimals: 1,
    suffix: "/5",
    label: "Customer Rating",
    sub: "Based on verified reviews",
    icon: Star,
    gradient: "from-amber-500 to-orange-500",
    iconBg: "bg-amber-500/10 text-amber-600",
  },
  {
    end: 2,
    prefix: "<",
    suffix: "min",
    label: "Avg. Setup Time",
    sub: "From sign-up to first dashboard",
    icon: Timer,
    gradient: "from-violet-600 to-purple-500",
    iconBg: "bg-violet-500/10 text-violet-600",
  },
];

function useCountUp(
  end: number,
  decimals: number,
  duration: number,
  trigger: boolean
) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!trigger) return;

    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(parseFloat((eased * end).toFixed(decimals)));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [trigger, end, decimals, duration]);

  return value;
}

function StatCard({ config, index }: { config: StatConfig; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const Icon = config.icon;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const count = useCountUp(
    config.end,
    config.decimals ?? 0,
    1800 + index * 200,
    visible
  );

  const formatted =
    config.end >= 1000
      ? count.toLocaleString("en-US", {
          maximumFractionDigits: config.decimals ?? 0,
        })
      : count.toFixed(config.decimals ?? 0);

  return (
    <div
      ref={ref}
      className="group relative rounded-2xl border bg-card p-6 sm:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1 overflow-hidden"
    >
      {/* Ambient gradient */}
      <div
        className={`absolute -top-10 -right-10 h-28 w-28 rounded-full bg-gradient-to-br ${config.gradient} opacity-[0.06] group-hover:opacity-[0.12] blur-2xl transition-opacity duration-500`}
      />

      <div className="relative">
        {/* Icon */}
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${config.iconBg} mb-5 transition-transform duration-300 group-hover:scale-110`}
        >
          <Icon className="h-5 w-5" />
        </div>

        {/* Counter */}
        <p className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground tabular-nums">
          {config.prefix ?? ""}
          {formatted}
          {config.suffix ?? ""}
        </p>

        {/* Label */}
        <p className="mt-1.5 text-sm font-semibold text-foreground/80">
          {config.label}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">{config.sub}</p>
      </div>

      {/* Bottom accent */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${config.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      />
    </div>
  );
}

export default function AnimatedStats() {
  return (
    <section className="relative border-t overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-violet-400/10 via-blue-400/10 to-transparent blur-3xl" />
      </div>
      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
        <div className="text-center mb-14">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Built for scale, loved by teams
          </h2>
          <p className="mt-2 text-muted-foreground">
            Numbers that speak for themselves.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <StatCard key={s.label} config={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
