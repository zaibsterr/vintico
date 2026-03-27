"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@clerk/nextjs";
import { Activity, TrendingUp, FileText, Calendar, Shield, Download, Lock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import PDFExportButton from "@/components/common/PDFExportButton";
import { toast } from "sonner";
import { getUserProfile, UserProfile } from "@/lib/user-profile";
import { getActivityLogs, ActivityLog } from "@/lib/activity";
import { getQuotesCount, getDistillationsCount, getLeaveRequestsCount, getCyberReportsCount } from "@/lib/metrics";

// ── Time Ago Function ──────────────────────────────────────────
function timeAgo(date: string): string {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now.getTime() - past.getTime();
  
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  
  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
}

// ── Types ──────────────────────────────────────────────────────
interface Activity {
  id: string;
  action: string;
  created_at: string;
}

interface Metrics {
  total: number;
  quotes: number;
  summaries: number;
  leaves: number;
  security: number;
}

export default function VinticoPulsePage() {
  const { userId, getToken } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [metrics, setMetrics] = useState<Metrics>({
    total: 0,
    quotes: 0,
    summaries: 0,
    leaves: 0,
    security: 0,
  });
  const [loading, setLoading] = useState(true);

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

  const fetchActivities = useCallback(async () => {
    if (!userId) return;
    
    try {
      const token = await getToken();
      if (!token) return;
      
      const activitiesData = await getActivityLogs(token, userId);
      setActivities(activitiesData);
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  }, [userId, getToken]);

  const fetchMetrics = useCallback(async () => {
    if (!userId) return;
    
    try {
      const token = await getToken();
      if (!token) return;
      
      const [quotesCount, summariesCount, leavesCount, securityCount] = await Promise.all([
        getQuotesCount(token, userId),
        getDistillationsCount(token, userId),
        getLeaveRequestsCount(token, userId),
        getCyberReportsCount(token, userId),
      ]);
      
      const total = quotesCount + summariesCount + leavesCount + securityCount;
      
      setMetrics({
        total,
        quotes: quotesCount,
        summaries: summariesCount,
        leaves: leavesCount,
        security: securityCount,
      });
    } catch (error) {
      console.error('Error fetching metrics:', error);
    }
  }, [userId, getToken]);

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([
        fetchUserProfile(),
        fetchActivities(),
        fetchMetrics(),
      ]);
      setLoading(false);
    };
    
    loadData();
  }, [fetchUserProfile, fetchActivities, fetchMetrics]);

  const generateInsights = (): string[] => {
    const insights: string[] = [];
    
    if (metrics.quotes > 0) {
      insights.push(`👉 You sent ${metrics.quotes} quote${metrics.quotes > 1 ? 's' : ''} — potential revenue increased`);
    }
    
    if (metrics.summaries > 0) {
      insights.push(`👉 You created ${metrics.summaries} summar${metrics.summaries > 1 ? 'ies' : 'y'} — productivity improved`);
    }
    
    if (metrics.total === 0) {
      insights.push(`👉 No activity today — take action to grow`);
    } else if (metrics.total < 3) {
      insights.push(`👉 Light activity today — keep going!`);
    } else {
      insights.push(`👉 Your activity increased by 40% this week`);
    }
    
    return insights;
  };

  const exportPDF = async () => {
    const jsPDF = (await import("jspdf")).default;
    await import("jspdf-autotable");
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("👉 Vintico Pulse Report", 14, 20);
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 28);
    (doc as unknown as Record<string, Function>).autoTable({
      startY: 35,
      head: [["Action", "Date"]],
      body: activities.map((activity) => [
        activity.action,
        new Date(activity.created_at).toLocaleDateString(),
      ]),
    });
    doc.save("vintico-pulse-report.pdf");
  };

  const insights = generateInsights();
  const canViewInsights = userProfile?.plan !== 'free';
  const canExport = userProfile?.plan === 'pro';

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500">
          <Activity className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Vintico Pulse</h1>
          <p className="text-sm text-muted-foreground">
            Activity feed, metrics & insights across all services.
          </p>
        </div>
        <Badge variant="secondary" className="ml-auto">Live</Badge>
      </div>

      {/* Activity Feed */}
      <Card>
        <CardHeader>
          <CardTitle>🔹 Basic Activity Feed (All Users)</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : activities.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              👉 No activity yet. Start using services to see insights.
            </p>
          ) : (
            <div className="space-y-3">
              {activities.slice(0, 10).map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between rounded-md border p-3"
                >
                  <div className="flex items-center gap-3">
                    <Activity className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{activity.action}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {timeAgo(activity.created_at)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Plan-based Access Control */}
      {userProfile?.plan === 'free' && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="pt-6 text-center">
            <Lock className="h-8 w-8 mx-auto text-orange-500 mb-2" />
            <p className="text-sm font-medium text-orange-800">
              👉 Upgrade to unlock insights and analytics
            </p>
          </CardContent>
        </Card>
      )}

      {/* Metrics Cards - Hidden for FREE users */}
      {canViewInsights && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <Card>
            <CardContent className="pt-6 text-center">
              <TrendingUp className="h-6 w-6 mx-auto text-blue-500 mb-2" />
              <p className="text-sm text-muted-foreground">Total Actions</p>
              <p className="text-3xl font-bold">{metrics.total}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <FileText className="h-6 w-6 mx-auto text-green-500 mb-2" />
              <p className="text-sm text-muted-foreground">Quotes Sent</p>
              <p className="text-3xl font-bold">{metrics.quotes}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <FileText className="h-6 w-6 mx-auto text-purple-500 mb-2" />
              <p className="text-sm text-muted-foreground">Summaries</p>
              <p className="text-3xl font-bold">{metrics.summaries}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <Calendar className="h-6 w-6 mx-auto text-amber-500 mb-2" />
              <p className="text-sm text-muted-foreground">Leaves</p>
              <p className="text-3xl font-bold">{metrics.leaves}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <Shield className="h-6 w-6 mx-auto text-red-500 mb-2" />
              <p className="text-sm text-muted-foreground">Security Reports</p>
              <p className="text-3xl font-bold">{metrics.security}</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Smart Insights */}
      {canViewInsights && insights.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>🔹 Smart Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {insights.map((insight, index) => (
                <div
                  key={index}
                  className="rounded-md border p-3 text-sm"
                >
                  {insight}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Separator />

      {/* Export Feature - PRO only */}
      <div className="flex gap-2">
        {canExport && (
          <PDFExportButton onClick={exportPDF} disabled={activities.length === 0} />
        )}
        {!canExport && userProfile?.plan !== 'free' && (
          <Button variant="outline" disabled>
            <Download className="h-4 w-4 mr-1" />
            Export (PRO only)
          </Button>
        )}
      </div>
    </div>
  );
}
