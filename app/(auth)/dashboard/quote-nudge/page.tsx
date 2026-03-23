"use client";

import { useEffect, useState, useCallback } from "react";
import { useSupabase } from "@/lib/useSupabase";
import { FileText, Plus, Send } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PDFExportButton from "@/components/common/PDFExportButton";
import type { Quote } from "@/types";

export default function QuoteNudgePage() {
  const { getDb, userId } = useSupabase();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    clientName: "",
    product: "",
    premium: "",
    followUpDate: "",
  });

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
          clientName: r.client_name as string,
          product: r.product as string,
          premium: r.premium as number,
          status: r.status as Quote["status"],
          createdAt: r.created_at as string,
          followUpDate: r.follow_up_date as string | undefined,
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
  }, [fetchQuotes]);

  const addQuote = async () => {
    if (!form.clientName || !form.product || !form.premium) return;
    try {
      const db = await getDb();
      if (!db) return;
      await db.from("quotes").insert({
        user_id: userId,
        client_name: form.clientName,
        product: form.product,
        premium: Number(form.premium),
        status: "pending",
        follow_up_date: form.followUpDate || null,
      });
      setForm({ clientName: "", product: "", premium: "", followUpDate: "" });
      setShowForm(false);
      fetchQuotes();
    } catch {
      /* handle gracefully */
    }
  };

  const sendNudge = async (quote: Quote) => {
    await fetch("/api/sms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: "+10000000000",
        message: `Hi ${quote.clientName}, this is a reminder about your ${quote.product} quote ($${quote.premium}). Reply to accept!`,
      }),
    });
    const db = await getDb();
    if (db) {
      await db.from("quotes").update({ status: "sent" }).eq("id", quote.id);
      fetchQuotes();
    }
  };

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

      <div className="flex gap-2">
        <Button size="sm" onClick={() => setShowForm(!showForm)}>
          <Plus className="h-4 w-4 mr-1" /> New Quote
        </Button>
        <PDFExportButton onClick={exportPDF} disabled={quotes.length === 0} />
      </div>

      {showForm && (
        <Card>
          <CardContent className="pt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Client Name</Label>
              <Input
                value={form.clientName}
                onChange={(e) =>
                  setForm({ ...form, clientName: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Product</Label>
              <Input
                value={form.product}
                onChange={(e) => setForm({ ...form, product: e.target.value })}
              />
            </div>
            <div>
              <Label>Premium ($)</Label>
              <Input
                type="number"
                value={form.premium}
                onChange={(e) => setForm({ ...form, premium: e.target.value })}
              />
            </div>
            <div>
              <Label>Follow-up Date</Label>
              <Input
                type="date"
                value={form.followUpDate}
                onChange={(e) =>
                  setForm({ ...form, followUpDate: e.target.value })
                }
              />
            </div>
            <div className="sm:col-span-2">
              <Button onClick={addQuote}>Save Quote</Button>
            </div>
          </CardContent>
        </Card>
      )}

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
                          onClick={() => sendNudge(q)}
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
