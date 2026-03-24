"use client";

import { useEffect, useState, useCallback } from "react";
import { useSupabase } from "@/lib/useSupabase";
import { ShieldAlert, KeyRound, Copy, RefreshCw } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import PDFExportButton from "@/components/common/PDFExportButton";
import { toast } from "sonner";
import UpgradePopup from "@/components/common/UpgradePopup";

// ── Password Generator ─────────────────────────────────────────
const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";
const DIGITS = "0123456789";
const SPECIAL = "!@#$%^&*()_+-=[]{}|;:,.<>?";
const ALL_CHARS = UPPER + LOWER + DIGITS + SPECIAL;

function generatePassword(): string {
  const len = 12 + Math.floor(Math.random() * 5); // 12–16
  const mandatory = [
    UPPER[Math.floor(Math.random() * UPPER.length)],
    LOWER[Math.floor(Math.random() * LOWER.length)],
    DIGITS[Math.floor(Math.random() * DIGITS.length)],
    SPECIAL[Math.floor(Math.random() * SPECIAL.length)],
  ];
  const rest = Array.from({ length: len - 4 }, () =>
    ALL_CHARS[Math.floor(Math.random() * ALL_CHARS.length)]
  );
  const chars = [...mandatory, ...rest];
  for (let i = chars.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars.join("");
}

// ── Strength Analysis ──────────────────────────────────────────
type StrengthLevel = "Weak" | "Medium" | "Strong";

function analyzeStrength(pw: string): { level: StrengthLevel; score: number } {
  let score = 0;
  if (pw.length >= 8) score += 20;
  if (pw.length >= 12) score += 15;
  if (pw.length >= 16) score += 10;
  if (/[A-Z]/.test(pw)) score += 15;
  if (/[a-z]/.test(pw)) score += 10;
  if (/[0-9]/.test(pw)) score += 15;
  if (/[^A-Za-z0-9]/.test(pw)) score += 15;
  score = Math.min(score, 100);
  const level: StrengthLevel = score >= 70 ? "Strong" : score >= 40 ? "Medium" : "Weak";
  return { level, score };
}

function strengthColor(level: StrengthLevel): string {
  switch (level) {
    case "Strong": return "#10B981";
    case "Medium": return "#F59E0B";
    case "Weak": return "#EF4444";
  }
}

function maskPassword(pw: string): string {
  if (pw.length <= 4) return "****";
  return pw.slice(0, 2) + "•".repeat(pw.length - 4) + pw.slice(-2);
}

// ── Types ──────────────────────────────────────────────────────
interface CyberReport {
  id: string;
  content: string;
  score: number;
  strengthLevel: StrengthLevel;
  createdAt: string;
}

export default function CyberGuardPage() {
  const { getDb, userId } = useSupabase();
  const [history, setHistory] = useState<CyberReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [generatedPw, setGeneratedPw] = useState("");
  const [analyzeInput, setAnalyzeInput] = useState("");
  const [currentResult, setCurrentResult] = useState<{
    password: string;
    level: StrengthLevel;
    score: number;
  } | null>(null);
  const [showUpgrade, setShowUpgrade] = useState(false);

  const fetchHistory = useCallback(async () => {
    try {
      const db = await getDb();
      if (!db) return;
      const { data } = await db
        .from("cyber_reports")
        .select("*")
        .eq("type", "password")
        .order("created_at", { ascending: false });
      setHistory(
        (data ?? []).map((r: Record<string, unknown>) => {
          const content = r.content as string;
          const score = (r.score as number) ?? 0;
          const level: StrengthLevel =
            score >= 70 ? "Strong" : score >= 40 ? "Medium" : "Weak";
          return {
            id: r.id as string,
            content,
            score,
            strengthLevel: level,
            createdAt: r.created_at as string,
          };
        })
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

  const saveReport = async (password: string, score: number) => {
    try {
      const db = await getDb();
      if (!db) return;
      await db.from("cyber_reports").insert({
        user_id: userId,
        type: "password",
        content: password,
        score,
      });
      fetchHistory();
    } catch {
      toast.error("Failed to generate report");
    }
  };

  const handleGenerate = async () => {
    try {
      const pw = generatePassword();
      const { level, score } = analyzeStrength(pw);
      setGeneratedPw(pw);
      setCurrentResult({ password: pw, level, score });
      await saveReport(pw, score);
      toast.success("Password generated successfully");
    } catch {
      toast.error("Failed to generate report");
    }
  };

  const handleAnalyze = async () => {
    if (!analyzeInput.trim()) {
      toast.error("Please enter a password to analyze");
      return;
    }
    try {
      const { level, score } = analyzeStrength(analyzeInput.trim());
      setCurrentResult({ password: analyzeInput.trim(), level, score });
      await saveReport(analyzeInput.trim(), score);
      toast.success("Password analyzed successfully");
    } catch {
      toast.error("Failed to generate report");
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard");
    } catch {
      toast.error("Failed to copy");
    }
  };

  const exportPDF = async () => {
    const jsPDF = (await import("jspdf")).default;
    await import("jspdf-autotable");
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Cyber Guard — Security Report", 14, 20);
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 28);
    (doc as unknown as Record<string, Function>).autoTable({
      startY: 35,
      head: [["Password", "Strength", "Score", "Date"]],
      body: history.map((r) => [
        maskPassword(r.content),
        r.strengthLevel,
        `${r.score}%`,
        new Date(r.createdAt).toLocaleDateString(),
      ]),
    });
    doc.save("cyber-guard-security-report.pdf");
  };

  const latestScore = currentResult?.score ?? (history.length > 0 ? history[0].score : 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500">
          <ShieldAlert className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Cyber Guard</h1>
          <p className="text-sm text-muted-foreground">
            Password generation, strength analysis & security scoring.
          </p>
        </div>
        <Badge variant="secondary" className="ml-auto">Module Active</Badge>
      </div>

      {/* Security Score KPI */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-sm text-muted-foreground">Security Score</p>
            <p className="text-3xl font-bold">{latestScore}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-sm text-muted-foreground">Reports Generated</p>
            <p className="text-3xl font-bold">{history.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-sm text-muted-foreground">Latest Strength</p>
            <p
              className="text-xl font-bold"
              style={{
                color: currentResult
                  ? strengthColor(currentResult.level)
                  : history.length > 0
                  ? strengthColor(history[0].strengthLevel)
                  : "#6B7280",
              }}
            >
              {currentResult?.level ?? (history.length > 0 ? history[0].strengthLevel : "—")}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Password Generator */}
      <Card>
        <CardHeader>
          <CardTitle>Generate Secure Password</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={handleGenerate}>
            <RefreshCw className="h-4 w-4 mr-1" /> Generate Password
          </Button>
          {generatedPw && (
            <div className="flex items-center gap-2">
              <code className="flex-1 rounded-md border bg-muted px-3 py-2 text-sm font-mono break-all">
                {generatedPw}
              </code>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(generatedPw)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Analyze Password */}
      <Card>
        <CardHeader>
          <CardTitle>Analyze Password Strength</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Enter a password to analyze</Label>
            <Input
              type="text"
              placeholder="Enter password…"
              value={analyzeInput}
              onChange={(e) => setAnalyzeInput(e.target.value)}
            />
          </div>
          <Button onClick={handleAnalyze}>
            <KeyRound className="h-4 w-4 mr-1" /> Analyze
          </Button>
        </CardContent>
      </Card>

      {/* Current Result */}
      {currentResult && (
        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Password</span>
              <code className="text-sm font-mono">{maskPassword(currentResult.password)}</code>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Strength</span>
              <Badge
                className="text-white"
                style={{ backgroundColor: strengthColor(currentResult.level) }}
              >
                {currentResult.level}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Score</span>
              <span className="font-bold">{currentResult.score}%</span>
            </div>
            {/* Strength bar */}
            <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${currentResult.score}%`,
                  backgroundColor: strengthColor(currentResult.level),
                }}
              />
            </div>
          </CardContent>
        </Card>
      )}

      <Separator />

      {/* History + PDF Export */}
      <div className="flex gap-2">
        <PDFExportButton
          onClick={() => setShowUpgrade(true)}
          label="Export Security Report"
          disabled={history.length === 0}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>History ({history.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : history.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No security reports yet — generate your first password.
            </p>
          ) : (
            <div className="space-y-3">
              {history.map((r) => (
                <div
                  key={r.id}
                  className="flex items-center justify-between rounded-md border p-3"
                >
                  <div className="space-y-1">
                    <code className="text-sm font-mono">{maskPassword(r.content)}</code>
                    <p className="text-xs text-muted-foreground">
                      {new Date(r.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium">{r.score}%</span>
                    <Badge
                      className="text-white"
                      style={{ backgroundColor: strengthColor(r.strengthLevel) }}
                    >
                      {r.strengthLevel}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      <UpgradePopup
        open={showUpgrade}
        onOpenChange={setShowUpgrade}
        title="Feature Restricted"
        message={"Advanced security report export is a paid feature.\nUpgrade your plan to unlock full reporting and advanced tools."}
      />
    </div>
  );
}
