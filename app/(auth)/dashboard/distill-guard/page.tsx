"use client";

import { useEffect, useState, useCallback } from "react";
import { useSupabase } from "@/lib/useSupabase";
import { ShieldCheck, Plus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import PDFExportButton from "@/components/common/PDFExportButton";
import type { DistillRecord } from "@/types";

export default function DistillGuardPage() {
  const { getDb, userId } = useSupabase();
  const [records, setRecords] = useState<DistillRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ entityName: "", licenseNumber: "", expiryDate: "" });

  const fetch_ = useCallback(async () => {
    try {
      const db = await getDb();
      if (!db) return;
      const { data } = await db.from("distillations").select("*").order("created_at", { ascending: false });
      setRecords((data ?? []).map((r: Record<string, unknown>) => ({
        id: r.id as string,
        entityName: r.entity_name as string,
        licenseNumber: r.license_number as string,
        expiryDate: r.expiry_date as string,
        complianceStatus: r.compliance_status as DistillRecord["complianceStatus"],
        lastChecked: r.last_checked as string,
      })));
    } catch { /* empty */ } finally { setLoading(false); }
  }, [getDb]);

  useEffect(() => { fetch_(); }, [fetch_]);

  const add = async () => {
    if (!form.entityName || !form.licenseNumber || !form.expiryDate) return;
    try {
      const db = await getDb();
      if (!db) return;
      const expiry = new Date(form.expiryDate);
      const now = new Date();
      const diff = (expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
      const status = diff < 0 ? "expired" : diff < 30 ? "warning" : "compliant";
      await db.from("distillations").insert({
        user_id: userId, entity_name: form.entityName,
        license_number: form.licenseNumber, expiry_date: form.expiryDate,
        compliance_status: status, last_checked: new Date().toISOString(),
      });
      setForm({ entityName: "", licenseNumber: "", expiryDate: "" });
      setShowForm(false);
      fetch_();
    } catch { /* */ }
  };

  const exportPDF = async () => {
    const jsPDF = (await import("jspdf")).default;
    await import("jspdf-autotable");
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Distill Guard — Compliance Report", 14, 20);
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 28);
    (doc as unknown as Record<string, Function>).autoTable({
      startY: 35,
      head: [["Entity", "License #", "Expiry", "Status", "Last Checked"]],
      body: records.map((r) => [r.entityName, r.licenseNumber, r.expiryDate, r.complianceStatus, r.lastChecked?.split("T")[0] || "—"]),
    });
    doc.save("distill-guard-report.pdf");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500">
          <ShieldCheck className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Distill Guard</h1>
          <p className="text-sm text-muted-foreground">Compliance monitoring & license tracking.</p>
        </div>
        <Badge variant="secondary" className="ml-auto">Module Active</Badge>
      </div>

      <div className="flex gap-2">
        <Button size="sm" onClick={() => setShowForm(!showForm)}><Plus className="h-4 w-4 mr-1" /> Add Record</Button>
        <PDFExportButton onClick={exportPDF} disabled={records.length === 0} />
      </div>

      {showForm && (
        <Card>
          <CardContent className="pt-6 grid gap-4 sm:grid-cols-3">
            <div><Label>Entity Name</Label><Input value={form.entityName} onChange={(e) => setForm({ ...form, entityName: e.target.value })} /></div>
            <div><Label>License Number</Label><Input value={form.licenseNumber} onChange={(e) => setForm({ ...form, licenseNumber: e.target.value })} /></div>
            <div><Label>Expiry Date</Label><Input type="date" value={form.expiryDate} onChange={(e) => setForm({ ...form, expiryDate: e.target.value })} /></div>
            <div className="sm:col-span-3"><Button onClick={add}>Save Record</Button></div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader><CardTitle>Compliance Records ({records.length})</CardTitle></CardHeader>
        <CardContent>
          {loading ? <p className="text-sm text-muted-foreground">Loading…</p> : records.length === 0 ? (
            <p className="text-sm text-muted-foreground">No records yet. Click &quot;Add Record&quot; to create one.</p>
          ) : (
            <Table>
              <TableHeader><TableRow><TableHead>Entity</TableHead><TableHead>License #</TableHead><TableHead>Expiry</TableHead><TableHead>Status</TableHead><TableHead>Last Checked</TableHead></TableRow></TableHeader>
              <TableBody>
                {records.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-medium">{r.entityName}</TableCell>
                    <TableCell>{r.licenseNumber}</TableCell>
                    <TableCell>{r.expiryDate}</TableCell>
                    <TableCell><Badge variant={r.complianceStatus === "compliant" ? "default" : r.complianceStatus === "expired" ? "destructive" : "secondary"}>{r.complianceStatus}</Badge></TableCell>
                    <TableCell>{r.lastChecked?.split("T")[0] || "—"}</TableCell>
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
