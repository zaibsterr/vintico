"use client";

import type { Metadata } from "next";
import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@clerk/nextjs";
import { ShieldCheck, Sparkles } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import PDFExportButton from "@/components/common/PDFExportButton";
import { toast } from "sonner";
import { createDistillation, getUserDistillations, Distillation } from "@/lib/distillations";
import { logActivity } from "@/lib/activity";

// ── Clean Extractive Summary Logic ───────────────────────
function splitIntoSentences(text: string): string[] {
  return text
    .replace(/([.!?])\s+/g, "$1|")
    .split("|")
    .map((s) => s.trim())
    .filter((s) => s.length > 10);
}

function generateCleanSummary(text: string): string {
  const sentences = splitIntoSentences(text);
  
  // If text is short, return as-is
  if (sentences.length <= 3) {
    return sentences.join(" ").replace(/\s+/g, " ").trim();
  }
  
  // Pick first 3-5 important sentences
  const selectedSentences = sentences.slice(0, Math.min(5, Math.max(3, Math.ceil(sentences.length * 0.3))));
  
  // Clean and join sentences
  const summary = selectedSentences
    .join(" ")
    .replace(/\s+/g, " ") // Remove extra spaces
    .trim();
  
  return summary;
}

// ── Types ──────────────────────────────────────────────────────
interface DistillEntry {
  id: string;
  originalText: string;
  summary: string;
  createdAt: string;
}

export const metadata: Metadata = {
  title: "Distill Guard Text Summarization | Vintico Digital Hub",
  description: "Summarize text and manage content history with Distill Guard dashboard tool. Professional text analysis and secure storage.",
};

export default function DistillGuardPage() {
  const { userId, getToken } = useAuth();
  const [history, setHistory] = useState<Distillation[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [inputText, setInputText] = useState("");
  const [currentSummary, setCurrentSummary] = useState<string | null>(null);

  const fetchHistory = useCallback(async () => {
    if (!userId) return;
    
    setLoading(true);
    try {
      const token = await getToken();
      if (!token) return;
      
      const historyData = await getUserDistillations(token, userId);
      setHistory(historyData);
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setLoading(false);
    }
  }, [userId, getToken]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const handleGenerateSummary = async () => {
    const trimmed = inputText.trim();
    
    // Error handling: Check for empty input
    if (!trimmed) {
      toast.error("👉 Please enter text");
      return;
    }

    setProcessing(true);
    try {
      // Generate clean summary
      const summary = generateCleanSummary(trimmed);
      setCurrentSummary(summary);

      // Save to Supabase
      if (userId) {
        const token = await getToken();
        if (token) {
          const distillation = await createDistillation(token, userId, trimmed, summary);
          
          if (distillation) {
            // Log activity
            await logActivity(token, userId, "Generated Summary");
            
            // Refresh history
            fetchHistory();
            
            toast.success("Summary generated successfully");
          } else {
            console.error("Failed to save distillation");
          }
        }
      }
    } catch (error) {
      console.error('Error generating summary:', error);
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
    doc.text("👉 Distill Guard Report", 14, 20);
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 28);

    const rows = history.map((entry) => [
      entry.original_text.length > 50 ? entry.original_text.slice(0, 50) + "..." : entry.original_text,
      entry.summary.length > 50 ? entry.summary.slice(0, 50) + "..." : entry.summary,
      new Date(entry.created_at).toLocaleDateString()
    ]);

    (doc as unknown as Record<string, Function>).autoTable({
      startY: 35,
      head: [["Original Text", "Summary", "Date"]],
      body: rows,
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
          <CardTitle>👉 Generate Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Original Text *</Label>
            <Textarea
              rows={8}
              placeholder="Enter your text here to generate a clean summary..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <p className="text-xs text-muted-foreground mt-1">
              {inputText.length} characters
            </p>
          </div>
          <Button onClick={handleGenerateSummary} disabled={processing}>
            <Sparkles className="h-4 w-4 mr-1" />
            {processing ? "Processing…" : "👉 Generate Summary"}
          </Button>
        </CardContent>
      </Card>

      {/* Current Summary Output */}
      {currentSummary && (
        <Card>
          <CardHeader>
            <CardTitle>👉 Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed">
              {currentSummary}
            </p>
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
                        {new Date(entry.created_at).toLocaleDateString()}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Original Text (preview)</p>
                      <p className="text-sm">
                        {entry.original_text.length > 200
                          ? entry.original_text.slice(0, 200) + "…"
                          : entry.original_text}
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
