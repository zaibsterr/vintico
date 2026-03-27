"use client";

import type { Metadata } from "next";
import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@clerk/nextjs";
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
import CreditPopup from "@/components/common/CreditPopup";
import { toast } from "sonner";
import { useCredits } from "@/hooks/useCredits";
import { createQuote, getUserQuotes, Quote } from "@/lib/quotes";
import { logActivity } from "@/lib/activity";

function buildDefaultMessage(name: string, amount: string) {
  return `Hi ${name || "[Customer]"}, here is your quote for $${amount || "0"}. Please review and reply to confirm. Thank you!`;
}

export const metadata: Metadata = {
  title: "Quote Nudge Automated Follow Up | Vintico Digital Hub",
  description: "Generate motivational quotes and automated follow up messages with Quote Nudge dashboard tool. Professional quote management and SMS notifications.",
};

export default function QuoteNudgePage() {
  const { userId, getToken } = useAuth();
  const { credits, loading: creditsLoading, checkCredits, useCredit, refreshCredits } = useCredits();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [sending, setSending] = useState(false);
  const [showCreditModal, setShowCreditModal] = useState(false);
  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    amount: "",
    message: "",
  });

  const fetchQuotes = useCallback(async () => {
    if (!userId) return;
    
    try {
      const token = await getToken();
      if (!token) return;
      
      const quotesData = await getUserQuotes(token, userId);
      setQuotes(quotesData);
    } catch (error) {
      console.error('Error fetching quotes:', error);
    } finally {
      setLoading(false);
    }
  }, [userId, getToken]);

  useEffect(() => {
    fetchQuotes();
  }, [fetchQuotes]);

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

    if (!userId) {
      toast.error("User not authenticated");
      return;
    }

    // Step 1: Check Credits (STRICT)
    const canProceed = await checkCredits();
    if (!canProceed) {
      setShowCreditModal(true);
      return;
    }

    setSending(true);
    try {
      // Step 2: Send SMS using Twilio
      const res = await fetch("/api/sms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: form.phone.trim(),
          message: form.message || buildDefaultMessage(form.customerName, form.amount),
        }),
      });

      const result = await res.json();

      // EDGE CASE: If Twilio fails, do NOT deduct credit
      if (!res.ok) {
        if (res.status === 402) {
          setShowCreditModal(true);
          return;
        }
        toast.error(result.error || "Failed to send SMS");
        return;
      }

      // Step 3: Insert into quotes table
      const token = await getToken();
      if (!token) {
        toast.error("Authentication error");
        return;
      }

      const quote = await createQuote(
        token,
        userId,
        form.customerName.trim(),
        form.phone.trim(),
        Number(form.amount),
        form.message
      );

      if (!quote) {
        toast.error("Failed to save quote");
        return;
      }

      // Step 4: Deduct Credit
      const creditDeducted = await useCredit();
      if (!creditDeducted) {
        console.error("Failed to deduct credit");
      }

      // Step 5: Log Activity
      await logActivity(token, userId, "Quote SMS Sent");

      toast.success("Quote sent successfully");

      resetForm();
      setShowForm(false);
      fetchQuotes();
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
      q.customer_name,
      "Insurance",
      `$${q.amount}`,
      q.status,
      q.created_at,
    ]);

    (doc as unknown as Record<string, Function>).autoTable({
      startY: 35,
      head: [["Client", "Product", "Premium", "Status", "Date"]],
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
              <p className="text-2xl font-bold">{credits}</p>
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
              disabled={sending || credits <= 0}
            >
              <Send className="h-4 w-4 mr-1" />
              {sending ? "Sending…" : "Send Quote"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Credits Exhausted — Upgrade Popup */}
      <CreditPopup
        open={showCreditModal}
        onOpenChange={setShowCreditModal}
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
                  <TableHead>Phone</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quotes.map((q) => (
                  <TableRow key={q.id}>
                    <TableCell className="font-medium">
                      {q.customer_name}
                    </TableCell>
                    <TableCell>{q.phone}</TableCell>
                    <TableCell>${q.amount}</TableCell>
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
                    <TableCell>{new Date(q.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      {q.status === "pending" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={credits <= 0}
                          onClick={() => {
                            if (credits <= 0) {
                              setShowCreditModal(true);
                              return;
                            }
                            setForm({
                              customerName: q.customer_name,
                              phone: q.phone,
                              amount: String(q.amount),
                              message: buildDefaultMessage(q.customer_name, String(q.amount)),
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
