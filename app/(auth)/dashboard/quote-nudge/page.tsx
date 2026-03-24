"use client";

import { useEffect, useState, useCallback } from "react";
import { useSupabase } from "@/lib/useSupabase";
import { FileText, Plus, Send, CreditCard } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PDFExportButton from "@/components/common/PDFExportButton";
import { toast } from "sonner";
import UpgradePopup from "@/components/common/UpgradePopup";
import type { Quote } from "@/types";

const MAX_CREDITS = 3;

function buildDefaultMessage(name: string, amount: string) {
  return `Hi ${name || "[Customer]"}, here is your quote for $${amount || "0"}. Please review and reply to confirm. Thank you!`;
}

export default function QuoteNudgePage() {
  const { getDb, userId } = useSupabase();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [sending, setSending] = useState(false);
  const [creditsUsed, setCreditsUsed] = useState(0);
  const [showCreditModal, setShowCreditModal] = useState(false);
  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    amount: "",
    message: "",
  });

  const remaining = MAX_CREDITS - creditsUsed;

  const fetchCredits = useCallback(async () => {
    try {
      const db = await getDb();
      if (!db || !userId) return;
      const { data } = await db
        .from("user_profiles")
        .select("sms_credits_used")
        .eq("user_id", userId)
        .single();
      const used = data?.sms_credits_used ?? 0;
      setCreditsUsed(used);
    } catch {
      setCreditsUsed(0);
    }
  }, [getDb, userId]);

  const fetchQuotes = useCallback(async () => {
    try {
      const db = await getDb();
      if (!db) return;
      const { data } = await db
        .from("quotes")
        .select("*")
        .order("created_at", { ascending: false });
      setQuotes(
        (data ?? []).map((r: Record<string, unknown>) => ({
          id: r.id as string,
          clientName: (r.customer_name ?? r.client_name) as string,
          product: (r.product ?? "") as string,
          premium: (r.amount ?? r.premium) as number,
          status: r.status as Quote["status"],
          createdAt: r.created_at as string,
          followUpDate: r.follow_up_date as string | undefined,
          phone: r.phone as string | undefined,
          message: r.message as string | undefined,
        }))
      );
    } catch {
      /* table may not exist yet — show empty */
    } finally {
      setLoading(false);
    }
  }, [getDb]);

  useEffect(() => {
    fetchQuotes();
    fetchCredits();
  }, [fetchQuotes, fetchCredits]);

  const updateFormField = (field: string, value: string) => {
    const next = { ...form, [field]: value };
    if (field === "customerName" || field === "amount") {
      const name = field === "customerName" ? value : form.customerName;
      const amt = field === "amount" ? value : form.amount;
      next.message = buildDefaultMessage(name, amt);
    }
    setForm(next);
  };

  const resetForm = () => {
    setForm({ customerName: "", phone: "", amount: "", message: "" });
  };

  const handleSubmitQuote = async () => {
    if (!form.phone.trim()) {
      toast.error("Phone number is required");
      return;
    }
    if (!form.customerName.trim()) {
      toast.error("Customer name is required");
      return;
    }
    if (!form.amount.trim()) {
      toast.error("Quote amount is required");
      return;
    }

    if (remaining <= 0) {
      setShowCreditModal(true);
      return;
    }

    setSending(true);
    try {
      const res = await fetch("/api/sms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: form.phone.trim(),
          message: form.message || buildDefaultMessage(form.customerName, form.amount),
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        if (res.status === 402) {
          setCreditsUsed(MAX_CREDITS);
          setShowCreditModal(true);
          return;
        }
        toast.error(result.error || "Failed to send SMS");
        return;
      }

      const db = await getDb();
      if (db) {
        await db.from("quotes").insert({
          user_id: userId,
          customer_name: form.customerName.trim(),
          phone: form.phone.trim(),
          amount: Number(form.amount),
          message: form.message,
          status: "sent",
        });
      }

      const newUsed = result.credits_used ?? creditsUsed + 1;
      setCreditsUsed(newUsed);

      toast.success("Quote sent successfully");

      resetForm();
      setShowForm(false);
      fetchQuotes();

      if (MAX_CREDITS - newUsed <= 0) {
        setShowCreditModal(true);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "SMS send failed";
      toast.error(msg);
    } finally {
      setSending(false);
    }
  };

  const sentCount = quotes.filter((q) => q.status === "sent").length;
  const pendingCount = quotes.filter((q) => q.status === "pending").length;
  const wonCount = quotes.filter((q) => q.status === "accepted").length;

  const exportPDF = async () => {
    const jsPDF = (await import("jspdf")).default;
    await import("jspdf-autotable");
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Quote Nudge — Report", 14, 20);
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 28);

    const rows = quotes.map((q) => [
      q.clientName,
      q.product,
      `$${q.premium}`,
      q.status,
      q.followUpDate || "—",
    ]);

    (doc as unknown as Record<string, Function>).autoTable({
      startY: 35,
      head: [["Client", "Product", "Premium", "Status", "Follow-up"]],
      body: rows,
    });
    doc.save("quote-nudge-report.pdf");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500">
          <FileText className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Quote Nudge</h1>
          <p className="text-sm text-muted-foreground">
            Manage, track, and follow up on insurance quotes.
          </p>
        </div>
        <Badge variant="secondary" className="ml-auto">
          Module Active
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Quotes Sent</p>
            <p className="text-2xl font-bold">{sentCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-2xl font-bold">{pendingCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Won</p>
            <p className="text-2xl font-bold">{wonCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Credits</p>
              <p className="text-2xl font-bold">{remaining} / {MAX_CREDITS}</p>
            </div>
            <CreditCard className="h-5 w-5 text-muted-foreground" />
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-2">
        <Button size="sm" onClick={() => setShowForm(!showForm)}>
          <Plus className="h-4 w-4 mr-1" /> New Quote
        </Button>
        <PDFExportButton onClick={exportPDF} disabled={quotes.length === 0} />
      </div>

      {/* Quote Form (inside a Dialog modal) */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send a Quote</DialogTitle>
            <DialogDescription>
              Fill in the details below to send a quote via SMS.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div>
              <Label>Customer Name</Label>
              <Input
                placeholder="John Doe"
                value={form.customerName}
                onChange={(e) => updateFormField("customerName", e.target.value)}
              />
            </div>
            <div>
              <Label>Customer Phone Number *</Label>
              <Input
                placeholder="+1234567890"
                value={form.phone}
                onChange={(e) => updateFormField("phone", e.target.value)}
              />
            </div>
            <div>
              <Label>Quote Amount ($)</Label>
              <Input
                type="number"
                placeholder="500"
                value={form.amount}
                onChange={(e) => updateFormField("amount", e.target.value)}
              />
            </div>
            <div>
              <Label>Message</Label>
              <Textarea
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleSubmitQuote}
              disabled={sending}
            >
              <Send className="h-4 w-4 mr-1" />
              {sending ? "Sending…" : "Send Quote"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Credits Exhausted — Upgrade Popup */}
      <UpgradePopup
        open={showCreditModal}
        onOpenChange={setShowCreditModal}
        title="Credits Exhausted"
        message={"You just used your free 3 messages.\nYou\u2019ve already seen how Vintico helps you recover business.\nUnlock more messages and full tools to grow faster."}
      />

      <Card>
        <CardHeader>
          <CardTitle>Quotes ({quotes.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : quotes.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No quotes yet. Click &quot;New Quote&quot; to create one.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Premium</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Follow-up</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quotes.map((q) => (
                  <TableRow key={q.id}>
                    <TableCell className="font-medium">
                      {q.clientName}
                    </TableCell>
                    <TableCell>{q.product}</TableCell>
                    <TableCell>${q.premium}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          q.status === "accepted"
                            ? "default"
                            : q.status === "declined"
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {q.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{q.followUpDate || "—"}</TableCell>
                    <TableCell>
                      {q.status === "pending" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={remaining <= 0}
                          onClick={() => {
                            if (remaining <= 0) {
                              setShowCreditModal(true);
                              return;
                            }
                            setForm({
                              customerName: q.clientName,
                              phone: (q as unknown as Record<string, string>).phone || "",
                              amount: String(q.premium),
                              message: buildDefaultMessage(q.clientName, String(q.premium)),
                            });
                            setShowForm(true);
                          }}
                        >
                          <Send className="h-3 w-3 mr-1" /> Nudge
                        </Button>
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
