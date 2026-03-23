"use client";

import { useEffect, useState, useCallback } from "react";
import { useSupabase } from "@/lib/useSupabase";
import { CalendarDays, Plus, Check, X } from "lucide-react";
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
import type { LeaveRequest } from "@/types";

export default function LeaveGuardPage() {
  const { getDb, userId } = useSupabase();
  const [requests, setRequests] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ employeeName: "", leaveType: "annual" as LeaveRequest["leaveType"], startDate: "", endDate: "", reason: "" });

  const fetchData = useCallback(async () => {
    try {
      const db = await getDb();
      if (!db) return;
      const { data } = await db.from("leave_requests").select("*").order("created_at", { ascending: false });
      setRequests((data ?? []).map((r: Record<string, unknown>) => ({
        id: r.id as string,
        employeeName: r.employee_name as string,
        leaveType: r.leave_type as LeaveRequest["leaveType"],
        startDate: r.start_date as string,
        endDate: r.end_date as string,
        status: r.status as LeaveRequest["status"],
        reason: r.reason as string | undefined,
      })));
    } catch { /* */ } finally { setLoading(false); }
  }, [getDb]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const add = async () => {
    if (!form.employeeName || !form.startDate || !form.endDate) return;
    try {
      const db = await getDb();
      if (!db) return;
      await db.from("leave_requests").insert({
        user_id: userId, employee_name: form.employeeName,
        leave_type: form.leaveType, start_date: form.startDate,
        end_date: form.endDate, status: "pending", reason: form.reason || null,
      });
      setForm({ employeeName: "", leaveType: "annual", startDate: "", endDate: "", reason: "" });
      setShowForm(false);
      fetchData();
    } catch { /* */ }
  };

  const updateStatus = async (id: string, status: "approved" | "rejected") => {
    try {
      const db = await getDb();
      if (!db) return;
      await db.from("leave_requests").update({ status }).eq("id", id);
      fetchData();
    } catch { /* */ }
  };

  const exportPDF = async () => {
    const jsPDF = (await import("jspdf")).default;
    await import("jspdf-autotable");
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Leave Guard — Leave Report", 14, 20);
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 28);
    (doc as unknown as Record<string, Function>).autoTable({
      startY: 35,
      head: [["Employee", "Type", "Start", "End", "Status", "Reason"]],
      body: requests.map((r) => [r.employeeName, r.leaveType, r.startDate, r.endDate, r.status, r.reason || "—"]),
    });
    doc.save("leave-guard-report.pdf");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500">
          <CalendarDays className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Leave Guard</h1>
          <p className="text-sm text-muted-foreground">Employee leave management & approvals.</p>
        </div>
        <Badge variant="secondary" className="ml-auto">Module Active</Badge>
      </div>

      <div className="flex gap-2">
        <Button size="sm" onClick={() => setShowForm(!showForm)}><Plus className="h-4 w-4 mr-1" /> New Request</Button>
        <PDFExportButton onClick={exportPDF} disabled={requests.length === 0} />
      </div>

      {showForm && (
        <Card>
          <CardContent className="pt-6 grid gap-4 sm:grid-cols-2">
            <div><Label>Employee Name</Label><Input value={form.employeeName} onChange={(e) => setForm({ ...form, employeeName: e.target.value })} /></div>
            <div>
              <Label>Leave Type</Label>
              <select className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm" value={form.leaveType} onChange={(e) => setForm({ ...form, leaveType: e.target.value as LeaveRequest["leaveType"] })}>
                <option value="annual">Annual</option>
                <option value="sick">Sick</option>
                <option value="personal">Personal</option>
                <option value="unpaid">Unpaid</option>
              </select>
            </div>
            <div><Label>Start Date</Label><Input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} /></div>
            <div><Label>End Date</Label><Input type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} /></div>
            <div className="sm:col-span-2"><Label>Reason (optional)</Label><Textarea value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} /></div>
            <div className="sm:col-span-2"><Button onClick={add}>Submit Request</Button></div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader><CardTitle>Leave Requests ({requests.length})</CardTitle></CardHeader>
        <CardContent>
          {loading ? <p className="text-sm text-muted-foreground">Loading…</p> : requests.length === 0 ? (
            <p className="text-sm text-muted-foreground">No leave requests yet.</p>
          ) : (
            <Table>
              <TableHeader><TableRow><TableHead>Employee</TableHead><TableHead>Type</TableHead><TableHead>Start</TableHead><TableHead>End</TableHead><TableHead>Status</TableHead><TableHead></TableHead></TableRow></TableHeader>
              <TableBody>
                {requests.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-medium">{r.employeeName}</TableCell>
                    <TableCell>{r.leaveType}</TableCell>
                    <TableCell>{r.startDate}</TableCell>
                    <TableCell>{r.endDate}</TableCell>
                    <TableCell><Badge variant={r.status === "approved" ? "default" : r.status === "rejected" ? "destructive" : "secondary"}>{r.status}</Badge></TableCell>
                    <TableCell>
                      {r.status === "pending" && (
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" onClick={() => updateStatus(r.id, "approved")}><Check className="h-3 w-3" /></Button>
                          <Button variant="ghost" size="sm" onClick={() => updateStatus(r.id, "rejected")}><X className="h-3 w-3" /></Button>
                        </div>
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
