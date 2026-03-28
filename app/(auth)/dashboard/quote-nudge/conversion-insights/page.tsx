"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Target, 
  Clock, 
  DollarSign, 
  BarChart3, 
  PieChart, 
  Calendar,
  Award,
  Lightbulb,
  ArrowUp,
  ArrowDown,
  Mail,
  MessageSquare,
  CheckCircle,
  XCircle,
  Users
} from "lucide-react";

interface ConversionData {
  stage: string;
  count: number;
  value: number;
  conversionRate: number;
  color: string;
}

interface TemplatePerformance {
  name: string;
  channel: string;
  usage: number;
  conversionRate: number;
  avgTimeToResponse: number;
}

interface Insight {
  id: string;
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  category: "timing" | "template" | "channel" | "trend";
  improvement: string;
}

export default function ConversionInsights() {
  const [selectedPeriod, setSelectedPeriod] = useState("30days");

  const conversionFunnel: ConversionData[] = [
    {
      stage: "Quote Sent",
      count: 45,
      value: 285000,
      conversionRate: 100,
      color: "bg-blue-500"
    },
    {
      stage: "Follow-Up Sent",
      count: 32,
      value: 198000,
      conversionRate: 71,
      color: "bg-amber-500"
    },
    {
      stage: "Deals Won",
      count: 28,
      value: 172500,
      conversionRate: 62,
      color: "bg-green-500"
    },
    {
      stage: "Deals Lost",
      count: 17,
      value: 112500,
      conversionRate: 38,
      color: "bg-red-500"
    }
  ];

  const templatePerformance: TemplatePerformance[] = [
    {
      name: "Professional Follow-Up",
      channel: "Email",
      usage: 45,
      conversionRate: 32,
      avgTimeToResponse: 48
    },
    {
      name: "Quick SMS Check-In",
      channel: "SMS",
      usage: 78,
      conversionRate: 28,
      avgTimeToResponse: 24
    },
    {
      name: "Value Proposition Highlight",
      channel: "Email",
      usage: 23,
      conversionRate: 41,
      avgTimeToResponse: 36
    },
    {
      name: "Limited Time Offer",
      channel: "Email",
      usage: 15,
      conversionRate: 38,
      avgTimeToResponse: 18
    },
    {
      name: "Ghost Recovery - Final",
      channel: "Email",
      usage: 31,
      conversionRate: 19,
      avgTimeToResponse: 72
    },
    {
      name: "SMS Gentle Nudge",
      channel: "SMS",
      usage: 52,
      conversionRate: 22,
      avgTimeToResponse: 12
    }
  ];

  const insights: Insight[] = [
    {
      id: "1",
      title: "48-Hour Sweet Spot",
      description: "Follow-up after 48 hours converts 32% better than immediate follow-up.",
      impact: "high",
      category: "timing",
      improvement: "+32% conversion rate"
    },
    {
      id: "2",
      title: "SMS Outperforms Email",
      description: "SMS follow-ups have 45% higher response rates for leads under $10K.",
      impact: "medium",
      category: "channel",
      improvement: "+45% response rate"
    },
    {
      id: "3",
      title: "Value Templates Win",
      description: "Value-focused templates convert 41% better than generic follow-ups.",
      impact: "high",
      category: "template",
      improvement: "+41% conversion rate"
    },
    {
      id: "4",
      title: "Weekday Advantage",
      description: "Tuesday-Thursday follow-ups show 28% higher engagement than weekends.",
      impact: "medium",
      category: "timing",
      improvement: "+28% engagement"
    },
    {
      id: "5",
      title: "Morning Peak Performance",
      description: "Follow-ups sent between 9-11 AM convert 22% more often.",
      impact: "low",
      category: "timing",
      improvement: "+22% conversion"
    },
    {
      id: "6",
      title: "Second Follow-Up Magic",
      description: "Leads require average 2.3 follow-ups before conversion.",
      impact: "medium",
      category: "trend",
      improvement: "Optimal touch points"
    }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high": return "bg-red-100 text-red-800 border-red-200";
      case "medium": return "bg-amber-100 text-amber-800 border-amber-200";
      case "low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "timing": return <Clock className="h-4 w-4" />;
      case "template": return <Mail className="h-4 w-4" />;
      case "channel": return <MessageSquare className="h-4 w-4" />;
      case "trend": return <TrendingUp className="h-4 w-4" />;
      default: return <Lightbulb className="h-4 w-4" />;
    }
  };

  const getChannelIcon = (channel: string) => {
    return channel === "Email" ? <Mail className="h-4 w-4" /> : <MessageSquare className="h-4 w-4" />;
  };

  const totalQuotes = conversionFunnel[0].count;
  const totalValue = conversionFunnel[0].value;
  const winRate = conversionFunnel[2].conversionRate;
  const avgDaysToClose = 14.3;
  const bestTemplate = templatePerformance.reduce((best, current) => 
    current.conversionRate > best.conversionRate ? current : best
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Conversion Insights</h1>
        <p className="text-muted-foreground mt-1">
          Analyze follow-up performance and optimize conversion rates.
        </p>
      </div>

      {/* Period Selector */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium">Period:</span>
        <div className="flex gap-2">
          {["7days", "30days", "90days", "1year"].map((period) => (
            <Button
              key={period}
              variant={selectedPeriod === period ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPeriod(period)}
            >
              {period === "7days" ? "7 Days" : 
               period === "30days" ? "30 Days" : 
               period === "90days" ? "90 Days" : "1 Year"}
            </Button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Target className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Win Rate</p>
                <p className="text-2xl font-bold text-blue-600">{winRate}%</p>
                <div className="flex items-center text-xs text-green-600">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  +5% vs last period
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Avg Days to Close</p>
                <p className="text-2xl font-bold text-green-600">{avgDaysToClose}</p>
                <div className="flex items-center text-xs text-green-600">
                  <ArrowDown className="h-3 w-3 mr-1" />
                  -2.1 days improvement
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Award className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Best Template</p>
                <p className="text-lg font-bold text-purple-600 truncate">{bestTemplate.name}</p>
                <div className="text-xs text-purple-600">{bestTemplate.conversionRate}% conversion</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-emerald-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold text-emerald-600">${(totalValue * winRate / 100).toLocaleString()}</p>
                <div className="flex items-center text-xs text-green-600">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  +18% vs last period
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Conversion Funnel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            Conversion Funnel
          </CardTitle>
          <CardDescription>
            Track how leads move through your sales pipeline.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {conversionFunnel.map((stage, index) => (
              <div key={stage.stage} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${stage.color}`} />
                    <span className="font-medium">{stage.stage}</span>
                    <Badge variant="outline">{stage.count} deals</Badge>
                  </div>
                  <div className="text-right">
                    <span className="font-bold">${stage.value.toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground ml-2">{stage.conversionRate}%</span>
                  </div>
                </div>
                <Progress value={stage.conversionRate} className="h-3" />
                {index < conversionFunnel.length - 1 && (
                  <div className="text-center text-sm text-muted-foreground">
                    {stage.conversionRate - conversionFunnel[index + 1].conversionRate}% drop-off
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Template Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="h-5 w-5 text-purple-600" />
            Template Performance
          </CardTitle>
          <CardDescription>
            Compare conversion rates across your follow-up templates.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {templatePerformance.map((template, index) => (
              <div key={template.name} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    {getChannelIcon(template.channel)}
                    <span className="font-medium">{template.name}</span>
                  </div>
                  <Badge variant="outline">{template.usage} uses</Badge>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">{template.conversionRate}%</div>
                    <div className="text-xs text-muted-foreground">conversion</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium">{template.avgTimeToResponse}h</div>
                    <div className="text-xs text-muted-foreground">avg response</div>
                  </div>
                  {index === 0 && (
                    <Badge className="bg-yellow-100 text-yellow-800">
                      <Award className="h-3 w-3 mr-1" />
                      Best
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-amber-600" />
            AI-Powered Insights
          </CardTitle>
          <CardDescription>
            Data-driven recommendations to improve your conversion rates.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {insights.map((insight) => (
              <div key={insight.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(insight.category)}
                    <h3 className="font-semibold">{insight.title}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={getImpactColor(insight.impact)}>
                      {insight.impact} impact
                    </Badge>
                    <div className="flex items-center text-sm font-medium text-green-600">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      {insight.improvement}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{insight.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            Performance Trends
          </CardTitle>
          <CardDescription>
            Track your conversion performance over time.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Channel Performance</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-blue-700">Email</span>
                  <span className="text-sm font-bold text-blue-800">34% avg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-blue-700">SMS</span>
                  <span className="text-sm font-bold text-blue-800">25% avg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-blue-700">Phone</span>
                  <span className="text-sm font-bold text-blue-800">42% avg</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">Timing Analysis</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-green-700">Best Day</span>
                  <span className="text-sm font-bold text-green-800">Tuesday</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-green-700">Best Time</span>
                  <span className="text-sm font-bold text-green-800">10:30 AM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-green-700">Optimal Gap</span>
                  <span className="text-sm font-bold text-green-800">48 hours</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2">Conversion Factors</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-purple-700">Template Quality</span>
                  <span className="text-sm font-bold text-purple-800">High</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-purple-700">Follow-up Count</span>
                  <span className="text-sm font-bold text-purple-800">2.3 avg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-purple-700">Personalization</span>
                  <span className="text-sm font-bold text-purple-800">Critical</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Recommended Actions</CardTitle>
          <CardDescription>
            Based on your conversion data, here are the top actions to improve performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <h3 className="font-semibold">Optimize Timing</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Schedule follow-ups for Tuesday-Thursday between 9-11 AM for best results.
              </p>
              <Button size="sm" variant="outline">
                Implement Schedule
              </Button>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <Target className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold">Use Value Templates</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Switch to value-focused templates for 41% better conversion rates.
              </p>
              <Button size="sm" variant="outline">
                Update Templates
              </Button>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <MessageSquare className="h-5 w-5 text-purple-600" />
                <h3 className="font-semibold">SMS for Small Deals</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Use SMS for leads under $10K to get 45% higher response rates.
              </p>
              <Button size="sm" variant="outline">
                Adjust Strategy
              </Button>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <Users className="h-5 w-5 text-amber-600" />
                <h3 className="font-semibold">Increase Touch Points</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Add 2-3 follow-ups per lead to reach optimal conversion points.
              </p>
              <Button size="sm" variant="outline">
                Update Sequences
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
