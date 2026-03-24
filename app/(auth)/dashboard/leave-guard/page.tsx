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
import { toast } from "sonner";
import UpgradePopup from "@/components/common/UpgradePopup";
import type { LeaveRequest } from "@/types";

const FREE_LEAVE_LIMIT = 3;

type LeaveType = "sick" | "casual" | "paid";

function datesOverlap(
  aStart: string, aEnd: string, bStart: string, bEnd: string
): boolean {
  return aStart <= bEnd && bStart <= aEnd;
}

export default function LeaveGuardPage() {
  const { getDb, userId } = useSupabase();
  const [requests, setRequests] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [form, setForm] = useState({
    employeeName: "",
    leaveType: "sick" as LeaveType,
    startDate: "",
    endDate: "",
    reason: "",
  });

  const fetchData = useCallback(async () => {
    try {
      const db = await getDb();
      if (!db) return;
      const { data } = await db
        .from("leave_requests")
        .select("*")
        .order("created_at", { ascending: false });
      setRequests(
        (data ?? []).map((r: Record<string, unknown>) => ({
          id: r.id as string,
          employeeName: r.employee_name as string,
          leaveType: r.leave_type as LeaveRequest["leaveType"],
          startDate: r.start_date as string,
          endDate: r.end_date as string,
          status: r.status as LeaveRequest["status"],
          reason: r.reason as string | undefined,
        }))
      );
    } catch {
      /* table may not exist yet */
    } finally {
      setLoading(false);
    }
  }, [getDb]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSubmit = async () => {
    if (requests.length >= FREE_LEAVE_LIMIT) {
      setShowUpgrade(true);
      return;
    }
    if (!form.employeeName.trim()) {
      toast.error("Employee name is required");
      return;
    }
    if (!form.startDate) {
      toast.error("Start date is required");
      return;
    }
    if (!form.endDate) {
      toast.error("End date is required");
      return;
    }
    if (form.endDate < form.startDate) {
      toast.error("End date must be on or after start date");
      return;
    }

    setSubmitting(true);
    try {
      const db = await getDb();
      if (!db) return;

      // ── Overlap detection ──
      const { data: existing } = await db
        .from("leave_requests")
        .select("start_date, end_date, status")
        .eq("user_id", userId)
        .eq("employee_name", form.employeeName.trim())
        .in("status", ["pending", "approved"]);

      const hasOverlap = (existing ?? []).some(
        (r: Record<string, unknown>) =>
          datesOverlap(
            form.startDate,
            form.endDate,
            r.start_date as string,
            r.end_date as string
          )
      );

      if (hasOverlap) {
        toast.error("Leave dates overlap with an existing request");
        return;
      }

      await db.from("leave_requests").insert({
        user_id: userId,
        employee_name: form.employeeName.trim(),
        leave_type: form.leaveType,
        start_date: form.startDate,
        end_date: form.endDate,
        status: "pending",
        reason: form.reason.trim() || null,
      });

      toast.success("Leave request submitted successfully");
      setForm({ employeeName: "", leaveType: "sick", startDate: "", endDate: "", reason: "" });
      setShowForm(false);
      fetchData();
    } catch {
      toast.error("Failed to submit leave request");
    } finally {
      setSubmitting(false);
    }
  };

  const updateStatus = async (id: string, status: "approved" | "rejected") => {
    try {
      const db = await getDb();
      if (!db) return;
      await db.from("leave_requests").update({ status }).eq("id", id);
      toast.success(`Leave request ${status}`);
      fetchData();
    } catch {
      toast.error("Failed to update status");
    }
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
      body: requests.map((r) => [
        r.employeeName,
        r.leaveType,
        r.startDate,
        r.endDate,
        r.status,
        r.reason || "—",
      ]),
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
        <Button size="sm" onClick={() => {
          if (requests.length >= FREE_LEAVE_LIMIT) {
            setShowUpgrade(true);
            return;
          }
          setShowForm(!showForm);
        }}>
          <Plus className="h-4 w-4 mr-1" /> New Request
        </Button>
        <PDFExportButton onClick={exportPDF} disabled={requests.length === 0} />
      </div>

      {showForm && (
        <Card>
          <CardContent className="pt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Employee Name *</Label>
              <Input
                placeholder="John Doe"
                value={form.employeeName}
                onChange={(e) => setForm({ ...form, employeeName: e.target.value })}
              />
            </div>
            <div>
              <Label>Leave Type</Label>
              <select
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                value={form.leaveType}
                onChange={(e) => setForm({ ...form, leaveType: e.target.value as LeaveType })}
              >
                <option value="sick">Sick</option>
                <option value="casual">Casual</option>
                <option value="paid">Paid</option>
              </select>
            </div>
            <div>
              <Label>Start Date *</Label>
              <Input
                type="date"
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
              />
            </div>
            <div>
              <Label>End Date *</Label>
              <Input
                type="date"
                min={form.startDate || undefined}
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
              />
            </div>
            <div className="sm:col-span-2">
              <Label>Reason (optional)</Label>
              <Textarea
                placeholder="Optional reason for leave…"
                value={form.reason}
                onChange={(e) => setForm({ ...form, reason: e.target.value })}
              />
            </div>
            <div className="sm:col-span-2">
              <Button onClick={handleSubmit} disabled={submitting}>
                {submitting ? "Submitting…" : "Submit Request"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Leave Requests ({requests.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : requests.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No leave requests yet — submit your first request.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date Range</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-medium">{r.employeeName}</TableCell>
                    <TableCell className="capitalize">{r.leaveType}</TableCell>
                    <TableCell>{r.startDate} → {r.endDate}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          r.status === "approved"
                            ? "bg-[#10B981] text-white hover:bg-[#10B981]/90"
                            : r.status === "rejected"
                            ? "bg-[#EF4444] text-white hover:bg-[#EF4444]/90"
                            : "bg-[#F59E0B] text-white hover:bg-[#F59E0B]/90"
                        }
                      >
                        {r.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {r.status === "pending" && (
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateStatus(r.id, "approved")}
                          >
                            <Check className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateStatus(r.id, "rejected")}
                          >
                            <X className="h-3 w-3" />
                          </Button>
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
      <UpgradePopup
        open={showUpgrade}
        onOpenChange={setShowUpgrade}
        title="Leave Limit Reached"
        message={"You\u2019ve used all your free leave requests.\nUpgrade your plan to submit unlimited leave requests and unlock full tools."}
      />
    </div>
  );
}
