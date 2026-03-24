"use client";

import { useEffect, useState, useCallback } from "react";
import { useSupabase } from "@/lib/useSupabase";
import { ShieldCheck, Sparkles } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import PDFExportButton from "@/components/common/PDFExportButton";
import { toast } from "sonner";

// ── Lightweight extractive summarization ───────────────────────
const BUSINESS_KEYWORDS = [
  "revenue", "profit", "growth", "risk", "compliance", "strategy",
  "customer", "market", "performance", "target", "deadline", "budget",
  "report", "analysis", "critical", "important", "significant",
  "increase", "decrease", "impact", "result", "outcome", "key",
  "decision", "recommend", "action", "priority", "objective",
];

function splitSentences(text: string): string[] {
  return text
    .replace(/([.!?])\s+/g, "$1|")
    .split("|")
    .map((s) => s.trim())
    .filter((s) => s.length > 10);
}

function scoreSentence(sentence: string, index: number, total: number): number {
  const lower = sentence.toLowerCase();
  let score = 0;
  if (index === 0) score += 3;
  if (index === total - 1) score += 1;
  if (index < 3) score += 2;
  for (const kw of BUSINESS_KEYWORDS) {
    if (lower.includes(kw)) score += 1;
  }
  const wordCount = sentence.split(/\s+/).length;
  if (wordCount >= 8 && wordCount <= 35) score += 1;
  return score;
}

function extractSummary(text: string): string[] {
  const sentences = splitSentences(text);
  if (sentences.length <= 6) return sentences;

  const scored = sentences.map((s, i) => ({
    sentence: s,
    index: i,
    score: scoreSentence(s, i, sentences.length),
  }));

  scored.sort((a, b) => b.score - a.score);
  const top = scored.slice(0, Math.min(6, Math.max(4, Math.ceil(sentences.length * 0.3))));
  top.sort((a, b) => a.index - b.index);

  return top.map((t) => t.sentence);
}

// ── Types ──────────────────────────────────────────────────────
interface DistillEntry {
  id: string;
  originalText: string;
  summary: string;
  createdAt: string;
}

export default function DistillGuardPage() {
  const { getDb, userId } = useSupabase();
  const [history, setHistory] = useState<DistillEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [inputText, setInputText] = useState("");
  const [currentSummary, setCurrentSummary] = useState<string[] | null>(null);

  const fetchHistory = useCallback(async () => {
    try {
      const db = await getDb();
      if (!db) return;
      const { data } = await db
        .from("distillations")
        .select("*")
        .order("created_at", { ascending: false });
      setHistory(
        (data ?? []).map((r: Record<string, unknown>) => ({
          id: r.id as string,
          originalText: r.original_text as string,
          summary: r.summary as string,
          createdAt: r.created_at as string,
        }))
      );
    } catch {
      /* table may not exist yet */
    } finally {
      setLoading(false);
    }
  }, [getDb]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const handleDistill = async () => {
    const trimmed = inputText.trim();
    if (!trimmed) {
      toast.error("Please enter some text to distill");
      return;
    }
    if (trimmed.length < 50) {
      toast.error("Text must be at least 50 characters long");
      return;
    }

    setProcessing(true);
    try {
      const sentences = extractSummary(trimmed);
      const summaryText = sentences.join(" ");

      setCurrentSummary(sentences);

      const db = await getDb();
      if (db) {
        await db.from("distillations").insert({
          user_id: userId,
          original_text: trimmed,
          summary: summaryText,
        });
        fetchHistory();
      }

      toast.success("Summary generated successfully");
    } catch {
      toast.error("Failed to generate summary");
    } finally {
      setProcessing(false);
    }
  };

  const exportPDF = async () => {
    const jsPDF = (await import("jspdf")).default;
    await import("jspdf-autotable");
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Distillation Report", 14, 20);
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 28);

    let yPos = 38;

    history.forEach((entry, idx) => {
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }

      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text(`Entry ${idx + 1} — ${new Date(entry.createdAt).toLocaleDateString()}`, 14, yPos);
      yPos += 8;

      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.text("Original Text:", 14, yPos);
      yPos += 5;

      const preview = entry.originalText.length > 300
        ? entry.originalText.slice(0, 300) + "…"
        : entry.originalText;
      const origLines = doc.splitTextToSize(preview, 180);
      doc.text(origLines, 14, yPos);
      yPos += origLines.length * 4 + 4;

      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }

      doc.setFont("helvetica", "bold");
      doc.text("Summary:", 14, yPos);
      yPos += 5;
      doc.setFont("helvetica", "normal");
      const sumLines = doc.splitTextToSize(entry.summary, 180);
      doc.text(sumLines, 14, yPos);
      yPos += sumLines.length * 4 + 10;
    });

    doc.save("distillation-report.pdf");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500">
          <ShieldCheck className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Distill Guard</h1>
          <p className="text-sm text-muted-foreground">
            Paste text to generate a clean, distilled summary.
          </p>
        </div>
        <Badge variant="secondary" className="ml-auto">Module Active</Badge>
      </div>

      <div className="flex gap-2">
        <PDFExportButton onClick={exportPDF} disabled={history.length === 0} />
      </div>

      {/* Input Area */}
      <Card>
        <CardHeader>
          <CardTitle>New Distillation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Paste your text below *</Label>
            <Textarea
              rows={8}
              placeholder="Paste a long document, article, or report here (min. 50 characters)…"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <p className="text-xs text-muted-foreground mt-1">
              {inputText.length} characters
            </p>
          </div>
          <Button onClick={handleDistill} disabled={processing}>
            <Sparkles className="h-4 w-4 mr-1" />
            {processing ? "Processing…" : "Distill"}
          </Button>
        </CardContent>
      </Card>

      {/* Current Summary Output */}
      {currentSummary && (
        <Card>
          <CardHeader>
            <CardTitle>Distilled Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {currentSummary.map((sentence, idx) => (
              <p key={idx} className={idx === 0 ? "font-semibold" : ""}>
                {sentence}
              </p>
            ))}
          </CardContent>
        </Card>
      )}

      <Separator />

      {/* History */}
      <Card>
        <CardHeader>
          <CardTitle>History ({history.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : history.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No distillations yet — paste your first text to generate a summary.
            </p>
          ) : (
            <div className="space-y-4">
              {history.map((entry) => (
                <Card key={entry.id} className="border">
                  <CardContent className="pt-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">
                        {new Date(entry.createdAt).toLocaleDateString()}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Original (preview)</p>
                      <p className="text-sm">
                        {entry.originalText.length > 200
                          ? entry.originalText.slice(0, 200) + "…"
                          : entry.originalText}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Summary</p>
                      <p className="text-sm font-medium">{entry.summary}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
