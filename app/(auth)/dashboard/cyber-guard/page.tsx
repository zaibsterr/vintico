"use client";

import { useEffect, useState, useCallback } from "react";
import { useSupabase } from "@/lib/useSupabase";
import { ShieldAlert, Plus, CheckCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import PDFExportButton from "@/components/common/PDFExportButton";
import type { CyberAlert } from "@/types";

export default function CyberGuardPage() {
  const { getDb, userId } = useSupabase();
  const [alerts, setAlerts] = useState<CyberAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", severity: "medium" as CyberAlert["severity"], source: "" });

  const fetchData = useCallback(async () => {
    try {
      const db = await getDb();
      if (!db) return;
      const { data } = await db.from("cyber_reports").select("*").order("detected_at", { ascending: false });
      setAlerts((data ?? []).map((r: Record<string, unknown>) => ({
        id: r.id as string,
        severity: r.severity as CyberAlert["severity"],
        title: r.title as string,
        description: r.description as string,
        source: r.source as string,
        detectedAt: r.detected_at as string,
        resolved: r.resolved as boolean,
      })));
    } catch { /* */ } finally { setLoading(false); }
  }, [getDb]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const add = async () => {
    if (!form.title || !form.source) return;
    try {
      const db = await getDb();
      if (!db) return;
      await db.from("cyber_reports").insert({
        user_id: userId, title: form.title, description: form.description || null,
        severity: form.severity, source: form.source, resolved: false,
        detected_at: new Date().toISOString(),
      });
      setForm({ title: "", description: "", severity: "medium", source: "" });
      setShowForm(false);
      fetchData();
    } catch { /* */ }
  };

  const resolve = async (id: string) => {
    try {
      const db = await getDb();
      if (!db) return;
      await db.from("cyber_reports").update({ resolved: true }).eq("id", id);
      fetchData();
    } catch { /* */ }
  };

  const exportPDF = async () => {
    const jsPDF = (await import("jspdf")).default;
    await import("jspdf-autotable");
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Cyber Guard — Security Report", 14, 20);
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 28);
    (doc as unknown as Record<string, Function>).autoTable({
      startY: 35,
      head: [["Title", "Severity", "Source", "Detected", "Resolved"]],
      body: alerts.map((a) => [a.title, a.severity, a.source, a.detectedAt?.split("T")[0] || "—", a.resolved ? "Yes" : "No"]),
    });
    doc.save("cyber-guard-report.pdf");
  };

  const severityColor = (s: string) => {
    switch (s) {
      case "critical": return "destructive";
      case "high": return "destructive";
      case "low": return "secondary";
      default: return "default";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500">
          <ShieldAlert className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Cyber Guard</h1>
          <p className="text-sm text-muted-foreground">Cybersecurity threat detection & response.</p>
        </div>
        <Badge variant="secondary" className="ml-auto">Module Active</Badge>
      </div>

      <div className="flex gap-2">
        <Button size="sm" onClick={() => setShowForm(!showForm)}><Plus className="h-4 w-4 mr-1" /> Report Alert</Button>
        <PDFExportButton onClick={exportPDF} disabled={alerts.length === 0} />
      </div>

      {showForm && (
        <Card>
          <CardContent className="pt-6 grid gap-4 sm:grid-cols-2">
            <div><Label>Alert Title</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
            <div><Label>Source</Label><Input value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })} placeholder="e.g. Firewall, IDS, Email" /></div>
            <div>
              <Label>Severity</Label>
              <select className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm" value={form.severity} onChange={(e) => setForm({ ...form, severity: e.target.value as CyberAlert["severity"] })}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
            <div className="sm:col-span-2"><Label>Description (optional)</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
            <div className="sm:col-span-2"><Button onClick={add}>Submit Alert</Button></div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader><CardTitle>Security Alerts ({alerts.length})</CardTitle></CardHeader>
        <CardContent>
          {loading ? <p className="text-sm text-muted-foreground">Loading…</p> : alerts.length === 0 ? (
            <p className="text-sm text-muted-foreground">No alerts yet. All clear.</p>
          ) : (
            <Table>
              <TableHeader><TableRow><TableHead>Title</TableHead><TableHead>Severity</TableHead><TableHead>Source</TableHead><TableHead>Detected</TableHead><TableHead>Status</TableHead><TableHead></TableHead></TableRow></TableHeader>
              <TableBody>
                {alerts.map((a) => (
                  <TableRow key={a.id}>
                    <TableCell className="font-medium">{a.title}</TableCell>
                    <TableCell><Badge variant={severityColor(a.severity) as "default" | "secondary" | "destructive"}>{a.severity}</Badge></TableCell>
                    <TableCell>{a.source}</TableCell>
                    <TableCell>{a.detectedAt?.split("T")[0] || "—"}</TableCell>
                    <TableCell>{a.resolved ? <Badge variant="secondary">Resolved</Badge> : <Badge variant="destructive">Open</Badge>}</TableCell>
                    <TableCell>
                      {!a.resolved && (
                        <Button variant="ghost" size="sm" onClick={() => resolve(a.id)}><CheckCircle className="h-3 w-3 mr-1" /> Resolve</Button>
                      )}
                    </TableCell>
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
