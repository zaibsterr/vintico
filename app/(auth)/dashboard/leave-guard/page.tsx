"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@clerk/nextjs";
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
import LeaveUpgradePopup from "@/components/common/LeaveUpgradePopup";
import { toast } from "sonner";
import { getUserProfile, UserProfile } from "@/lib/user-profile";
import { createLeaveRequest, getUserLeaveRequests, checkOverlappingLeave, LeaveRequest } from "@/lib/leave-requests";
import { logActivity } from "@/lib/activity";

const FREE_LEAVE_LIMIT = 2;

type LeaveType = "sick" | "casual" | "paid";

function datesOverlap(
  aStart: string, aEnd: string, bStart: string, bEnd: string
): boolean {
  return aStart <= bEnd && bStart <= aEnd;
}

export default function LeaveGuardPage() {
  const { userId, getToken } = useAuth();
  const [requests, setRequests] = useState<LeaveRequest[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [form, setForm] = useState({
    employee_name: "",
    leave_type: "sick" as LeaveType,
    start_date: "",
    end_date: "",
    reason: "",
  });

  const fetchUserProfile = useCallback(async () => {
    if (!userId) return;
    
    try {
      const token = await getToken();
      if (!token) return;
      
      const profile = await getUserProfile(token, userId);
      setUserProfile(profile);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  }, [userId, getToken]);

  const fetchRequests = useCallback(async () => {
    if (!userId) return;
    
    try {
      const token = await getToken();
      if (!token) return;
      
      const requestsData = await getUserLeaveRequests(token, userId);
      setRequests(requestsData);
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  }, [userId, getToken]);

  useEffect(() => {
    fetchUserProfile();
    fetchRequests();
  }, [fetchUserProfile, fetchRequests]);

  const handleSubmitLeave = async () => {
    // Early return if not authenticated
    if (!userId) {
      toast.error("Authentication required");
      return;
    }

    // Error handling: Check empty fields
    if (!form.employee_name.trim()) {
      toast.error("👉 Employee name is required");
      return;
    }
    if (!form.leave_type) {
      toast.error("👉 Leave type is required");
      return;
    }
    if (!form.start_date) {
      toast.error("👉 Start date is required");
      return;
    }
    if (!form.end_date) {
      toast.error("👉 End date is required");
      return;
    }
    
    // Error handling: Invalid date
    if (form.end_date < form.start_date) {
      toast.error("👉 End date must be on or after start date");
      return;
    }

    // ACCESS CONTROL: Check free user limit
    if (userProfile?.plan === 'free' && requests.length >= FREE_LEAVE_LIMIT) {
      setShowUpgrade(true);
      return;
    }

    setSubmitting(true);
    try {
      const token = await getToken();
      if (!token) {
        toast.error("Authentication error");
        return;
      }

      // OVERLAP DETECTION
      const hasOverlap = await checkOverlappingLeave(
        token, 
        userId, 
        form.start_date || "", 
        form.end_date || ""
      );

      if (hasOverlap) {
        toast.error("👉 Leave dates overlap with an existing request");
        setSubmitting(false);
        return;
      }

      // SAVE TO SUPABASE
      const leaveRequest = await createLeaveRequest(
        token,
        userId,
        form.employee_name.trim(),
        form.leave_type,
        form.start_date || "",
        form.end_date || "",
        form.reason.trim()
      );

      if (leaveRequest) {
        // ACTIVITY LOG
        await logActivity(token, userId, "Leave Request Submitted");
        
        toast.success("Leave request submitted successfully");
        
        // Reset form
        setForm({
          employee_name: "",
          leave_type: "sick",
          start_date: "",
          end_date: "",
          reason: "",
        });
        setShowForm(false);
        fetchRequests();
      } else {
        toast.error("Failed to submit leave request");
      }
    } catch (error) {
      console.error('Error submitting leave request:', error);
      toast.error("Failed to submit leave request");
    } finally {
      setSubmitting(false);
    }
  };

  const updateStatus = async (id: string, status: "approved" | "rejected") => {
    try {
      const token = await getToken();
      if (!token) return;
      
      const supabase = await import("@supabase/supabase-js").then(m => m.createClient);
      const client = supabase(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      
      await client.from("leave_requests").update({ status }).eq("id", id);
      toast.success(`Leave request ${status}`);
      fetchRequests();
    } catch {
      toast.error("Failed to update status");
    }
  };

  const exportPDF = async () => {
    const jsPDF = (await import("jspdf")).default;
    await import("jspdf-autotable");
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("👉 Leave Report", 14, 20);
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 28);
    (doc as unknown as Record<string, Function>).autoTable({
      startY: 35,
      head: [["Employee", "Type", "Start", "End", "Status"]],
      body: requests.map((r) => [
        r.employee_name,
        r.leave_type,
        r.start_date,
        r.end_date,
        r.status,
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
          if (userProfile?.plan === 'free' && requests.length >= FREE_LEAVE_LIMIT) {
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
                value={form.employee_name}
                onChange={(e) => setForm({ ...form, employee_name: e.target.value })}
              />
            </div>
            <div>
              <Label>Leave Type</Label>
              <select
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                value={form.leave_type}
                onChange={(e) => setForm({ ...form, leave_type: e.target.value as LeaveType })}
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
                value={form.start_date}
                onChange={(e) => setForm({ ...form, start_date: e.target.value })}
              />
            </div>
            <div>
              <Label>End Date *</Label>
              <Input
                type="date"
                min={form.start_date || undefined}
                value={form.end_date}
                onChange={(e) => setForm({ ...form, end_date: e.target.value })}
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
              <Button onClick={handleSubmitLeave} disabled={submitting}>
                {submitting ? "Submitting…" : "👉 Submit Leave"}
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
                    <TableCell className="font-medium">{r.employee_name}</TableCell>
                    <TableCell className="capitalize">{r.leave_type}</TableCell>
                    <TableCell>{r.start_date} → {r.end_date}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          r.status === "approved"
                            ? "bg-green-500 text-white hover:bg-green-600"
                            : r.status === "rejected"
                            ? "bg-red-500 text-white hover:bg-red-600"
                            : "bg-yellow-500 text-white hover:bg-yellow-600"
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
      <LeaveUpgradePopup
        open={showUpgrade}
        onOpenChange={setShowUpgrade}
      />
    </div>
  );
}
