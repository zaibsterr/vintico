"use client";

import type { Metadata } from "next";
import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@clerk/nextjs";
import { ShieldAlert, KeyRound, Copy, RefreshCw } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import CyberUpgradePopup from "@/components/common/CyberUpgradePopup";
import PDFExportButton from "@/components/common/PDFExportButton";
import { toast } from "sonner";
import { getUserProfile, UserProfile } from "@/lib/user-profile";
import { createCyberReport, getUserCyberReports, CyberReport as CyberReportType } from "@/lib/cyber-reports";
import { logActivity } from "@/lib/activity";

// ── Password Generator ─────────────────────────────────────────
const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";
const DIGITS = "0123456789";
const SPECIAL = "!@#$%^&*()_+-=[]{}|;:,.<>?";
const ALL_CHARS = UPPER + LOWER + DIGITS + SPECIAL;

function generatePassword(): string {
  const len = 12 + Math.floor(Math.random() * 5); // 12–16 chars
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

// ── Strength Analysis (0-100) ──────────────────────────────────
type StrengthLevel = "Weak" | "Medium" | "Strong";

function analyzeStrength(pw: string): { level: StrengthLevel; score: number } {
  let score = 0;
  
  // Length scoring
  if (pw.length > 12) score += 30;
  
  // Character type scoring
  if (/[A-Z]/.test(pw)) score += 20;
  if (/[0-9]/.test(pw)) score += 20;
  if (/[^A-Za-z0-9]/.test(pw)) score += 30;
  
  score = Math.min(score, 100);
  
  const level: StrengthLevel = score >= 70 ? "Strong" : score >= 40 ? "Medium" : "Weak";
  return { level, score };
}

function strengthColor(level: StrengthLevel): string {
  switch (level) {
    case "Strong": return "#10B981"; // Green
    case "Medium": return "#F59E0B"; // Yellow
    case "Weak": return "#EF4444";   // Red
  }
}

function maskPassword(pw: string): string {
  if (pw.length <= 4) return "****";
  return pw.slice(0, 2) + "•".repeat(pw.length - 4) + pw.slice(-2);
}

export const metadata: Metadata = {
  title: "Cyber Guard Password Security Analysis | Vintico Digital Hub",
  description: "Generate secure passwords and analyze security vulnerabilities with Cyber Guard dashboard tool. Professional password analysis and security reporting.",
};

export default function CyberGuardPage() {
  const { userId, getToken } = useAuth();
  const [history, setHistory] = useState<CyberReportType[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [generatedPw, setGeneratedPw] = useState("");
  const [analyzeInput, setAnalyzeInput] = useState("");
  const [currentResult, setCurrentResult] = useState<{
    password: string;
    level: StrengthLevel;
    score: number;
  } | null>(null);
  const [showUpgrade, setShowUpgrade] = useState(false);

  const FREE_REPORT_LIMIT = 3;

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

  const fetchHistory = useCallback(async () => {
    if (!userId) return;
    
    try {
      const token = await getToken();
      if (!token) return;
      
      const historyData = await getUserCyberReports(token, userId);
      setHistory(historyData);
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setLoading(false);
    }
  }, [userId, getToken]);

  useEffect(() => {
    fetchUserProfile();
    fetchHistory();
  }, [fetchUserProfile, fetchHistory]);

  const saveReport = async (password: string, score: number) => {
    if (!userId) return;
    
    try {
      const token = await getToken();
      if (!token) return;
      
      const report = await createCyberReport(token, userId, "password", password, score);
      
      if (report) {
        // ACTIVITY LOG
        await logActivity(token, userId, "Generated Security Report");
        fetchHistory();
      }
    } catch (error) {
      console.error('Error saving report:', error);
      toast.error("Failed to generate report");
    }
  };

  const handleGeneratePassword = async () => {
    // ACCESS CONTROL: Check free user limit
    if (userProfile?.plan === 'free' && history.length >= FREE_REPORT_LIMIT) {
      setShowUpgrade(true);
      return;
    }

    setProcessing(true);
    try {
      const pw = generatePassword();
      const { level, score } = analyzeStrength(pw);
      setGeneratedPw(pw);
      setCurrentResult({ password: pw, level, score });
      await saveReport(pw, score);
      toast.success("Password generated successfully");
    } catch (error) {
      console.error('Error generating password:', error);
      toast.error("Failed to generate password");
    } finally {
      setProcessing(false);
    }
  };

  const handleCheckStrength = async () => {
    // Error handling: Empty password
    if (!analyzeInput.trim()) {
      toast.error("👉 Please enter a password");
      return;
    }

    // ACCESS CONTROL: Check free user limit
    if (userProfile?.plan === 'free' && history.length >= FREE_REPORT_LIMIT) {
      setShowUpgrade(true);
      return;
    }

    setProcessing(true);
    try {
      const { level, score } = analyzeStrength(analyzeInput.trim());
      setCurrentResult({ password: analyzeInput.trim(), level, score });
      await saveReport(analyzeInput.trim(), score);
      toast.success("Password analyzed successfully");
    } catch (error) {
      console.error('Error analyzing password:', error);
      toast.error("Failed to analyze password");
    } finally {
      setProcessing(false);
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
    doc.text("👉 Cyber Security Report", 14, 20);
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 28);
    (doc as unknown as Record<string, Function>).autoTable({
      startY: 35,
      head: [["Password", "Score", "Date"]],
      body: history.map((r) => [
        maskPassword(r.content),
        `${r.score}/100`,
        new Date(r.created_at).toLocaleDateString(),
      ]),
    });
    doc.save("cyber-security-report.pdf");
  };

  const latestScore = currentResult?.score ?? (history.length > 0 ? history[0].score : 0);
  const getStrengthLevel = (score: number): StrengthLevel => {
    return score >= 70 ? "Strong" : score >= 40 ? "Medium" : "Weak";
  };

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
            <p className="text-3xl font-bold">{latestScore}/100</p>
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
                  ? strengthColor(getStrengthLevel(history[0].score ?? 0))
                  : "#6B7280",
              }}
            >
              {currentResult?.level ?? (history.length > 0 ? getStrengthLevel(history[0].score ?? 0) : "—")}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Password Generator */}
      <Card>
        <CardHeader>
          <CardTitle>🔹 Option 1: Generate Secure Password</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={handleGeneratePassword} disabled={processing}>
            <RefreshCw className="h-4 w-4 mr-1" /> 👉 Generate Secure Password
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
          <CardTitle>🔹 Option 2: Analyze Password</CardTitle>
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
          <Button onClick={handleCheckStrength} disabled={processing}>
            <KeyRound className="h-4 w-4 mr-1" /> 👉 Check Strength
          </Button>
        </CardContent>
      </Card>

      {/* Current Result */}
      {currentResult && (
        <Card>
          <CardHeader>
            <CardTitle>🔹 Output (PRO UI)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Password</span>
              <code className="text-sm font-mono">{maskPassword(currentResult.password)}</code>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Strength Score</span>
              <span className="font-bold">{currentResult.score}/100</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Label</span>
              <Badge
                className="text-white"
                style={{ backgroundColor: strengthColor(currentResult.level) }}
              >
                {currentResult.level}
              </Badge>
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
        <PDFExportButton onClick={exportPDF} disabled={history.length === 0} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>🔹 History Section</CardTitle>
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
                      {new Date(r.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium">{r.score}/100</span>
                    <Badge
                      className="text-white"
                      style={{ backgroundColor: strengthColor(getStrengthLevel(r.score ?? 0)) }}
                    >
                      {getStrengthLevel(r.score ?? 0)}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      <CyberUpgradePopup
        open={showUpgrade}
        onOpenChange={setShowUpgrade}
      />
    </div>
  );
}
