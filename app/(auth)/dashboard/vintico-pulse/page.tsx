"use client";

import { useEffect, useState, useCallback } from "react";
import { useSupabase } from "@/lib/useSupabase";
import { Activity, Plus, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import PDFExportButton from "@/components/common/PDFExportButton";
import type { PulseMetric } from "@/types";

export default function VinticoPulsePage() {
  const { getDb, userId } = useSupabase();
  const [metrics, setMetrics] = useState<PulseMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ metricName: "", value: "", unit: "", trend: "stable" as PulseMetric["trend"] });

  const fetchData = useCallback(async () => {
    try {
      const db = await getDb();
      if (!db) return;
      const { data } = await db.from("pulses").select("*").order("recorded_at", { ascending: false });
      setMetrics((data ?? []).map((r: Record<string, unknown>) => ({
        id: r.id as string,
        metricName: r.metric_name as string,
        value: r.value as number,
        unit: r.unit as string,
        trend: r.trend as PulseMetric["trend"],
        recordedAt: r.recorded_at as string,
      })));
    } catch { /* */ } finally { setLoading(false); }
  }, [getDb]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const add = async () => {
    if (!form.metricName || !form.value || !form.unit) return;
    try {
      const db = await getDb();
      if (!db) return;
      await db.from("pulses").insert({
        user_id: userId, metric_name: form.metricName,
        value: Number(form.value), unit: form.unit, trend: form.trend,
        recorded_at: new Date().toISOString(),
      });
      setForm({ metricName: "", value: "", unit: "", trend: "stable" });
      setShowForm(false);
      fetchData();
    } catch { /* */ }
  };

  const exportPDF = async () => {
    const jsPDF = (await import("jspdf")).default;
    await import("jspdf-autotable");
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Vintico Pulse — Analytics Report", 14, 20);
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 28);
    (doc as unknown as Record<string, Function>).autoTable({
      startY: 35,
      head: [["Metric", "Value", "Unit", "Trend", "Recorded"]],
      body: metrics.map((m) => [m.metricName, String(m.value), m.unit, m.trend, m.recordedAt?.split("T")[0] || "—"]),
    });
    doc.save("vintico-pulse-report.pdf");
  };

  const TrendIcon = ({ trend }: { trend: string }) => {
    if (trend === "up") return <TrendingUp className="h-4 w-4 text-emerald-500" />;
    if (trend === "down") return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-muted-foreground" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500">
          <Activity className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Vintico Pulse</h1>
          <p className="text-sm text-muted-foreground">Live business analytics & performance metrics.</p>
        </div>
        <Badge variant="secondary" className="ml-auto">Module Active</Badge>
      </div>

      {/* KPI summary cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card><CardContent className="pt-6 text-center"><p className="text-3xl font-bold">{metrics.length}</p><p className="text-xs text-muted-foreground mt-1">Total Metrics</p></CardContent></Card>
        <Card><CardContent className="pt-6 text-center"><p className="text-3xl font-bold text-emerald-500">{metrics.filter((m) => m.trend === "up").length}</p><p className="text-xs text-muted-foreground mt-1">Trending Up</p></CardContent></Card>
        <Card><CardContent className="pt-6 text-center"><p className="text-3xl font-bold text-red-500">{metrics.filter((m) => m.trend === "down").length}</p><p className="text-xs text-muted-foreground mt-1">Trending Down</p></CardContent></Card>
      </div>

      <div className="flex gap-2">
        <Button size="sm" onClick={() => setShowForm(!showForm)}><Plus className="h-4 w-4 mr-1" /> Add Metric</Button>
        <PDFExportButton onClick={exportPDF} disabled={metrics.length === 0} />
      </div>

      {showForm && (
        <Card>
          <CardContent className="pt-6 grid gap-4 sm:grid-cols-2">
            <div><Label>Metric Name</Label><Input value={form.metricName} onChange={(e) => setForm({ ...form, metricName: e.target.value })} placeholder="e.g. Revenue, NPS, Churn Rate" /></div>
            <div><Label>Value</Label><Input type="number" value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} /></div>
            <div><Label>Unit</Label><Input value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} placeholder="e.g. $, %, users" /></div>
            <div>
              <Label>Trend</Label>
              <select className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm" value={form.trend} onChange={(e) => setForm({ ...form, trend: e.target.value as PulseMetric["trend"] })}>
                <option value="up">Up</option>
                <option value="down">Down</option>
                <option value="stable">Stable</option>
              </select>
            </div>
            <div className="sm:col-span-2"><Button onClick={add}>Save Metric</Button></div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader><CardTitle>Metrics ({metrics.length})</CardTitle></CardHeader>
        <CardContent>
          {loading ? <p className="text-sm text-muted-foreground">Loading…</p> : metrics.length === 0 ? (
            <p className="text-sm text-muted-foreground">No metrics recorded yet. Click &quot;Add Metric&quot; to start tracking.</p>
          ) : (
            <Table>
              <TableHeader><TableRow><TableHead>Metric</TableHead><TableHead>Value</TableHead><TableHead>Unit</TableHead><TableHead>Trend</TableHead><TableHead>Recorded</TableHead></TableRow></TableHeader>
              <TableBody>
                {metrics.map((m) => (
                  <TableRow key={m.id}>
                    <TableCell className="font-medium">{m.metricName}</TableCell>
                    <TableCell>{m.value}</TableCell>
                    <TableCell>{m.unit}</TableCell>
                    <TableCell><div className="flex items-center gap-1"><TrendIcon trend={m.trend} /><span className="text-xs">{m.trend}</span></div></TableCell>
                    <TableCell>{m.recordedAt?.split("T")[0] || "—"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
