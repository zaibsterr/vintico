"use client";

import Link from "next/link";
import {
  FileText,
  ShieldCheck,
  CalendarDays,
  ShieldAlert,
  Activity,
  FileSearch,
  CreditCard,
  AlertTriangle,
  Calculator,
  UserSearch,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  FileText,
  ShieldCheck,
  CalendarDays,
  ShieldAlert,
  Activity,
  FileSearch,
  CreditCard,
  AlertTriangle,
  Calculator,
  UserSearch,
};

interface ServiceCardProps {
  name: string;
  description: string;
  href: string;
  icon: string;
  color: string;
}

export default function ServiceCard({
  name,
  description,
  href,
  icon,
  color,
}: ServiceCardProps) {
  const Icon = iconMap[icon] ?? FileText;
  return (
    <Link href={href}>
      <Card className="group cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-lg",
                color
              )}
            >
              <Icon className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-base">{name}</CardTitle>
              <CardDescription className="text-xs mt-1">
                {description}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}
