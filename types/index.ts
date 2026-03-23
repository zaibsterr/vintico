// ─── Quote Nudge ─────────────────────────────────────────────
export interface Quote {
  id: string;
  clientName: string;
  product: string;
  premium: number;
  status: "pending" | "sent" | "accepted" | "declined";
  createdAt: string;
  followUpDate?: string;
}

// ─── Distill Guard ───────────────────────────────────────────
export interface DistillRecord {
  id: string;
  entityName: string;
  licenseNumber: string;
  expiryDate: string;
  complianceStatus: "compliant" | "warning" | "expired";
  lastChecked: string;
}

// ─── Leave Guard ─────────────────────────────────────────────
export interface LeaveRequest {
  id: string;
  employeeName: string;
  leaveType: "annual" | "sick" | "personal" | "unpaid";
  startDate: string;
  endDate: string;
  status: "pending" | "approved" | "rejected";
  reason?: string;
}

// ─── Cyber Guard ─────────────────────────────────────────────
export interface CyberAlert {
  id: string;
  severity: "low" | "medium" | "high" | "critical";
  title: string;
  description: string;
  source: string;
  detectedAt: string;
  resolved: boolean;
}

// ─── Vintico Pulse ───────────────────────────────────────────
export interface PulseMetric {
  id: string;
  metricName: string;
  value: number;
  unit: string;
  trend: "up" | "down" | "stable";
  recordedAt: string;
}

// ─── Shared ──────────────────────────────────────────────────
export interface ServiceModule {
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
}
