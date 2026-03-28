"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Calendar, 
  ArrowRight,
  Plus,
  Target,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Briefcase
} from "lucide-react";

interface Lead {
  id: string;
  clientName: string;
  projectValue: number;
  daysInStage: number;
  nextAction: string;
  stage: "new-lead" | "quote-sent" | "follow-up-sent" | "negotiation" | "won" | "lost";
  projectName: string;
  createdAt: string;
  lastActivity: string;
}

interface Stage {
  id: string;
  name: string;
  title: string;
  color: string;
  leads: Lead[];
}

export default function VisualLeadPipeline() {
  const [stages, setStages] = useState<Stage[]>([
    {
      id: "new-lead",
      name: "New Lead",
      title: "New Lead",
      color: "bg-gray-100 border-gray-200",
      leads: [
        {
          id: "1",
          clientName: "StartupXYZ",
          projectValue: 15000,
          daysInStage: 2,
          nextAction: "Send initial quote",
          stage: "new-lead",
          projectName: "Mobile App Development",
          createdAt: "2024-03-23",
          lastActivity: "Initial contact made"
        },
        {
          id: "2",
          clientName: "TechCorp",
          projectValue: 8000,
          daysInStage: 1,
          nextAction: "Schedule discovery call",
          stage: "new-lead",
          projectName: "Website Redesign",
          createdAt: "2024-03-24",
          lastActivity: "Email received"
        }
      ]
    },
    {
      id: "quote-sent",
      name: "Quote Sent",
      title: "Quote Sent",
      color: "bg-blue-100 border-blue-200",
      leads: [
        {
          id: "3",
          clientName: "Acme Corp",
          projectValue: 25000,
          daysInStage: 3,
          nextAction: "Follow up in 2 days",
          stage: "quote-sent",
          projectName: "E-commerce Platform",
          createdAt: "2024-03-21",
          lastActivity: "Quote sent via email"
        },
        {
          id: "4",
          clientName: "Global Solutions",
          projectValue: 12000,
          daysInStage: 1,
          nextAction: "Confirm receipt",
          stage: "quote-sent",
          projectName: "API Integration",
          createdAt: "2024-03-23",
          lastActivity: "Quote delivered"
        }
      ]
    },
    {
      id: "follow-up-sent",
      name: "Follow-Up Sent",
      title: "Follow-Up Sent",
      color: "bg-amber-100 border-amber-200",
      leads: [
        {
          id: "5",
          clientName: "MarketingPro",
          projectValue: 18000,
          daysInStage: 5,
          nextAction: "Wait for response",
          stage: "follow-up-sent",
          projectName: "Marketing Automation",
          createdAt: "2024-03-19",
          lastActivity: "Follow-up email sent"
        },
        {
          id: "6",
          clientName: "DataFlow Inc",
          projectValue: 9000,
          daysInStage: 2,
          nextAction: "Call tomorrow",
          stage: "follow-up-sent",
          projectName: "Data Analytics Dashboard",
          createdAt: "2024-03-22",
          lastActivity: "SMS reminder sent"
        }
      ]
    },
    {
      id: "negotiation",
      name: "Negotiation",
      title: "Negotiation",
      color: "bg-purple-100 border-purple-200",
      leads: [
        {
          id: "7",
          clientName: "FinanceHub",
          projectValue: 35000,
          daysInStage: 7,
          nextAction: "Revise proposal",
          stage: "negotiation",
          projectName: "Banking Platform",
          createdAt: "2024-03-17",
          lastActivity: "Negotiation call"
        },
        {
          id: "8",
          clientName: "RetailMax",
          projectValue: 22000,
          daysInStage: 3,
          nextAction: "Send revised quote",
          stage: "negotiation",
          projectName: "Inventory System",
          createdAt: "2024-03-21",
          lastActivity: "Price discussion"
        }
      ]
    },
    {
      id: "won",
      name: "Won",
      title: "Won",
      color: "bg-green-100 border-green-200",
      leads: [
        {
          id: "9",
          clientName: "HealthTech",
          projectValue: 45000,
          daysInStage: 1,
          nextAction: "Onboarding call",
          stage: "won",
          projectName: "Healthcare Platform",
          createdAt: "2024-03-23",
          lastActivity: "Contract signed"
        },
        {
          id: "10",
          clientName: "EduSoft",
          projectValue: 28000,
          daysInStage: 4,
          nextAction: "Project kickoff",
          stage: "won",
          projectName: "Learning Management System",
          createdAt: "2024-03-20",
          lastActivity: "Payment received"
        }
      ]
    },
    {
      id: "lost",
      name: "Lost",
      title: "Lost",
      color: "bg-red-100 border-red-200",
      leads: [
        {
          id: "11",
          clientName: "OldTech Co",
          projectValue: 6000,
          daysInStage: 14,
          nextAction: "Follow up in 6 months",
          stage: "lost",
          projectName: "Legacy System Update",
          createdAt: "2024-03-10",
          lastActivity: "Declined - budget"
        }
      ]
    }
  ]);

  const [draggedLead, setDraggedLead] = useState<Lead | null>(null);
  const [dragOverStage, setDragOverStage] = useState<string | null>(null);

  const handleDragStart = (lead: Lead) => {
    setDraggedLead(lead);
  };

  const handleDragOver = (e: React.DragEvent, stageId: string) => {
    e.preventDefault();
    setDragOverStage(stageId);
  };

  const handleDragLeave = () => {
    setDragOverStage(null);
  };

  const handleDrop = (e: React.DragEvent, targetStageId: string) => {
    e.preventDefault();
    setDragOverStage(null);

    if (!draggedLead || draggedLead.stage === targetStageId) return;

    setStages(prevStages => {
      return prevStages.map(stage => {
        if (stage.id === draggedLead.stage) {
          return {
            ...stage,
            leads: stage.leads.filter(lead => lead.id !== draggedLead.id)
          };
        }
        if (stage.id === targetStageId) {
          const updatedLead = {
            ...draggedLead,
            stage: targetStageId as Lead["stage"],
            daysInStage: 0,
            lastActivity: `Moved to ${stage.name}`
          };
          return {
            ...stage,
            leads: [...stage.leads, updatedLead]
          };
        }
        return stage;
      });
    });

    setDraggedLead(null);
  };

  const getStageIcon = (stageId: string) => {
    switch (stageId) {
      case "new-lead": return <Users className="h-4 w-4" />;
      case "quote-sent": return <Target className="h-4 w-4" />;
      case "follow-up-sent": return <ArrowRight className="h-4 w-4" />;
      case "negotiation": return <Briefcase className="h-4 w-4" />;
      case "won": return <CheckCircle className="h-4 w-4" />;
      case "lost": return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getDaysColor = (days: number) => {
    if (days <= 2) return "text-green-600";
    if (days <= 7) return "text-amber-600";
    return "text-red-600";
  };

  const calculatePipelineStats = () => {
    const openDeals = stages
      .filter(stage => !["won", "lost"].includes(stage.id))
      .reduce((sum, stage) => sum + stage.leads.length, 0);
    
    const totalValue = stages
      .filter(stage => !["won", "lost"].includes(stage.id))
      .reduce((sum, stage) => sum + stage.leads.reduce((stageSum, lead) => stageSum + lead.projectValue, 0), 0);
    
    const wonValue = stages
      .find(stage => stage.id === "won")?.leads
      .reduce((sum, lead) => sum + lead.projectValue, 0) || 0;
    
    const projectedRevenue = totalValue * 0.65; // 65% win rate assumption

    return { openDeals, totalValue, wonValue, projectedRevenue };
  };

  const stats = calculatePipelineStats();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Visual Lead Pipeline</h1>
        <p className="text-muted-foreground mt-1">
          Kanban-style overview of all quotes and potential revenue.
        </p>
      </div>

      {/* Pipeline Revenue Summary */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Open Deals</p>
                <p className="text-2xl font-bold text-blue-600">{stats.openDeals}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Pipeline Value</p>
                <p className="text-2xl font-bold text-green-600">${stats.totalValue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Projected Monthly Revenue</p>
                <p className="text-2xl font-bold text-purple-600">${Math.round(stats.projectedRevenue).toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-emerald-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Won This Month</p>
                <p className="text-2xl font-bold text-emerald-600">${stats.wonValue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Kanban Pipeline */}
      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-6">
        {stages.map((stage) => (
          <div
            key={stage.id}
            className={`${stage.color} rounded-lg border p-4 min-h-[600px] ${
              dragOverStage === stage.id ? "ring-2 ring-blue-400 ring-opacity-50" : ""
            }`}
            onDragOver={(e) => handleDragOver(e, stage.id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, stage.id)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                {getStageIcon(stage.id)}
                <h3 className="font-semibold text-sm">{stage.title}</h3>
              </div>
              <Badge variant="secondary" className="text-xs">
                {stage.leads.length}
              </Badge>
            </div>

            <div className="space-y-3">
              {stage.leads.map((lead) => (
                <div
                  key={lead.id}
                  draggable
                  onDragStart={() => handleDragStart(lead)}
                  className="bg-white rounded-lg p-3 shadow-sm cursor-move hover:shadow-md transition-shadow border"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm truncate">{lead.clientName}</h4>
                      <Badge variant="outline" className="text-xs">
                        ${lead.projectValue.toLocaleString()}
                      </Badge>
                    </div>
                    
                    <p className="text-xs text-muted-foreground truncate">{lead.projectName}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span className={`text-xs font-medium ${getDaysColor(lead.daysInStage)}`}>
                          {lead.daysInStage}d
                        </span>
                      </div>
                    </div>
                    
                    <div className="pt-2 border-t">
                      <p className="text-xs text-muted-foreground">{lead.nextAction}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {stage.leads.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <div className="text-2xl mb-2">—</div>
                <p className="text-xs">No leads</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common actions to manage your pipeline efficiently.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Lead
            </Button>
            <Button variant="outline">
              <Target className="h-4 w-4 mr-2" />
              Send Quotes
            </Button>
            <Button variant="outline">
              <ArrowRight className="h-4 w-4 mr-2" />
              Bulk Follow-Up
            </Button>
            <Button variant="outline">
              <Briefcase className="h-4 w-4 mr-2" />
              View Negotiations
            </Button>
            <Button variant="outline">
              <TrendingUp className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Pipeline Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Pipeline Management Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Drag & Drop</h4>
              <p className="text-sm text-blue-700">
                Drag cards between stages to update lead status instantly.
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">Monitor Aging</h4>
              <p className="text-sm text-green-700">
                Red indicators show leads stuck in stages too long.
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2">Focus on High Value</h4>
              <p className="text-sm text-purple-700">
                Prioritize follow-ups based on deal value and stage.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
