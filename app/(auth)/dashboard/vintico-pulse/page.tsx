"use client";

import { useEffect, useState, useCallback } from "react";
import { useSupabase } from "@/lib/useSupabase";
import {
  Activity,
  FileText,
  CalendarDays,
  ShieldCheck,
  ShieldAlert,
  DollarSign,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import PDFExportButton from "@/components/common/PDFExportButton";
import UpgradePopup from "@/components/common/UpgradePopup";

// ── Time-ago helper ────────────────────────────────────────────
function timeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  if (isNaN(then)) return "—";
  const diffMs = now - then;
  const seconds = Math.floor(diffMs / 1000);
  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days === 1 ? "" : "s"} ago`;
  return new Date(dateStr).toLocaleDateString();
}

// ── Types ──────────────────────────────────────────────────────
interface ActivityItem {
  id: string;
  type: "Quote Sent" | "Leave Request" | "Summary Generated" | "Security Report";
  message: string;
  timestamp: string;
}

interface KPIs {
  totalQuotes: number;
  totalLeave: number;
  totalDistill: number;
  totalCyber: number;
  revenueProtected: number;
}

export default function VinticoPulsePage() {
  const { getDb } = useSupabase();
  const [kpis, setKpis] = useState<KPIs>({
    totalQuotes: 0,
    totalLeave: 0,
    totalDistill: 0,
    totalCyber: 0,
    revenueProtected: 0,
  });
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUpgrade, setShowUpgrade] = useState(false);

  const fetchAll = useCallback(async () => {
    try {
      const db = await getDb();
      if (!db) return;

      const feed: ActivityItem[] = [];

      // ── Quotes ──
      let totalQuotes = 0;
      let revenueProtected = 0;
      try {
        const { data: quotes } = await db
          .from("quotes")
          .select("*")
          .order("created_at", { ascending: false });
        const q = quotes ?? [];
        totalQuotes = q.length;
        revenueProtected = q.reduce(
          (sum: number, r: Record<string, unknown>) =>
            sum + (Number(r.amount ?? r.premium) || 0),
          0
        );
        q.slice(0, 10).forEach((r: Record<string, unknown>) => {
          const name = (r.customer_name ?? r.client_name ?? "Customer") as string;
          const amt = Number(r.amount ?? r.premium) || 0;
          feed.push({
            id: `q-${r.id}`,
            type: "Quote Sent",
            message: `Quote sent to ${name} – $${amt}`,
            timestamp: r.created_at as string,
          });
        });
      } catch {
        /* table may not exist */
      }

      // ── Leave Requests ──
      let totalLeave = 0;
      try {
        const { data: leaves } = await db
          .from("leave_requests")
          .select("*")
          .order("created_at", { ascending: false });
        const l = leaves ?? [];
        totalLeave = l.length;
        l.slice(0, 10).forEach((r: Record<string, unknown>) => {
          const name = (r.employee_name ?? "Employee") as string;
          const type = (r.leave_type ?? "leave") as string;
          feed.push({
            id: `l-${r.id}`,
            type: "Leave Request",
            message: `${name} submitted ${type} leave request`,
            timestamp: r.created_at as string,
          });
        });
      } catch {
        /* table may not exist */
      }

      // ── Distillations ──
      let totalDistill = 0;
      try {
        const { data: distills } = await db
          .from("distillations")
          .select("*")
          .order("created_at", { ascending: false });
        const d = distills ?? [];
        totalDistill = d.length;
        d.slice(0, 10).forEach((r: Record<string, unknown>) => {
          feed.push({
            id: `d-${r.id}`,
            type: "Summary Generated",
            message: "Text distilled successfully",
            timestamp: r.created_at as string,
          });
        });
      } catch {
        /* table may not exist */
      }

      // ── Cyber Reports ──
      let totalCyber = 0;
      try {
        const { data: cyber } = await db
          .from("cyber_reports")
          .select("*")
          .order("created_at", { ascending: false });
        const c = cyber ?? [];
        totalCyber = c.length;
        c.slice(0, 10).forEach((r: Record<string, unknown>) => {
          const score = r.score != null ? ` – Score: ${r.score}%` : "";
          feed.push({
            id: `c-${r.id}`,
            type: "Security Report",
            message: `Security report generated${score}`,
            timestamp: r.created_at as string,
          });
        });
      } catch {
        /* table may not exist */
      }

      // Sort by latest first
      feed.sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );

      setKpis({
        totalQuotes,
        totalLeave,
        totalDistill,
        totalCyber,
        revenueProtected,
      });
      setActivities(feed);
    } catch {
      /* safe fallback — keep defaults */
    } finally {
      setLoading(false);
    }
  }, [getDb]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const activityIcon = (type: ActivityItem["type"]) => {
    switch (type) {
      case "Quote Sent":
        return <FileText className="h-4 w-4 text-blue-500" />;
      case "Leave Request":
        return <CalendarDays className="h-4 w-4 text-amber-500" />;
      case "Summary Generated":
        return <ShieldCheck className="h-4 w-4 text-emerald-500" />;
      case "Security Report":
        return <ShieldAlert className="h-4 w-4 text-red-500" />;
    }
  };

  const exportPDF = async () => {
    const jsPDF = (await import("jspdf")).default;
    await import("jspdf-autotable");
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Vintico Pulse — Full Report", 14, 20);
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 28);

    // KPIs table
    (doc as unknown as Record<string, Function>).autoTable({
      startY: 36,
      head: [["KPI", "Value"]],
      body: [
        ["Total Quotes Sent", String(kpis.totalQuotes)],
        ["Total Leave Requests", String(kpis.totalLeave)],
        ["Total Distillations", String(kpis.totalDistill)],
        ["Total Cyber Reports", String(kpis.totalCyber)],
        ["Revenue Protected", `$${kpis.revenueProtected.toLocaleString()}`],
      ],
    });

    const afterKpi =
      ((doc as unknown as Record<string, unknown>).lastAutoTable as Record<string, number>)
        ?.finalY ?? 90;

    // Activity table
    if (activities.length > 0) {
      doc.setFontSize(12);
      doc.text("Recent Activity", 14, afterKpi + 10);
      (doc as unknown as Record<string, Function>).autoTable({
        startY: afterKpi + 16,
        head: [["Type", "Activity", "Date"]],
        body: activities.slice(0, 20).map((a) => [
          a.type,
          a.message,
          new Date(a.timestamp).toLocaleDateString(),
        ]),
      });
    }

    doc.save("vintico-pulse-full-report.pdf");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500">
          <Activity className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Vintico Pulse</h1>
          <p className="text-sm text-muted-foreground">
            Central system overview with aggregated data & insights.
          </p>
        </div>
        <Badge variant="secondary" className="ml-auto">Module Active</Badge>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardContent className="pt-6 text-center">
            <FileText className="h-5 w-5 mx-auto text-blue-500 mb-2" />
            <p className="text-2xl font-bold">{kpis.totalQuotes}</p>
            <p className="text-xs text-muted-foreground mt-1">Quotes Sent</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <CalendarDays className="h-5 w-5 mx-auto text-amber-500 mb-2" />
            <p className="text-2xl font-bold">{kpis.totalLeave}</p>
            <p className="text-xs text-muted-foreground mt-1">Leave Requests</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <ShieldCheck className="h-5 w-5 mx-auto text-emerald-500 mb-2" />
            <p className="text-2xl font-bold">{kpis.totalDistill}</p>
            <p className="text-xs text-muted-foreground mt-1">Distillations</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <ShieldAlert className="h-5 w-5 mx-auto text-red-500 mb-2" />
            <p className="text-2xl font-bold">{kpis.totalCyber}</p>
            <p className="text-xs text-muted-foreground mt-1">Cyber Reports</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <DollarSign className="h-5 w-5 mx-auto text-emerald-600 mb-2" />
            <p className="text-2xl font-bold">
              ${kpis.revenueProtected.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Revenue Protected</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-2">
        <PDFExportButton
          onClick={() => setShowUpgrade(true)}
          label="Export Full Report"
          disabled={activities.length === 0 && kpis.totalQuotes === 0}
        />
      </div>

      <Separator />

      {/* Activity Feed */}
      <Card>
        <CardHeader>
          <CardTitle>Activity Feed</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : activities.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No activity yet — start using services to see insights.
            </p>
          ) : (
            <div className="space-y-3">
              {activities.map((a) => (
                <div
                  key={a.id}
                  className="flex items-start gap-3 rounded-md border p-3"
                >
                  <div className="mt-0.5">{activityIcon(a.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {a.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground ml-auto whitespace-nowrap">
                        {timeAgo(a.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm mt-1">{a.message}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      <UpgradePopup
        open={showUpgrade}
        onOpenChange={setShowUpgrade}
        title="Feature Restricted"
        message={"Full report export and advanced insights are paid features.\nUpgrade your plan to unlock complete analytics and reporting."}
      />
    </div>
  );
}
