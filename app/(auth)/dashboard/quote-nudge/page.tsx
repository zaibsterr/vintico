"use client";

import { useState } from "react";
import {
  MessageSquare,
  Send,
  Clock,
  CheckCircle,
  TrendingUp,
  DollarSign,
  Calendar,
  BarChart3,
  Target,
  Mail,
  Phone,
  Eye,
  Plus,
  Download,
  Users,
  Zap,
  FileText,
  Settings,
  ArrowRight,
  Brain,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const mockQuotes = [
  {
    id: 1,
    client: "Acme Corp",
    project: "Website Redesign",
    amount: "$12,500",
    status: "Won",
    lastFollowUp: "2 hours ago",
    followUpCount: 3,
  },
  {
    id: 2,
    client: "TechStart Inc",
    project: "Mobile App Development",
    amount: "$8,000",
    status: "Pending",
    lastFollowUp: "1 day ago",
    followUpCount: 2,
  },
  {
    id: 3,
    client: "Global Solutions",
    project: "API Integration",
    amount: "$5,500",
    status: "Lost",
    lastFollowUp: "3 days ago",
    followUpCount: 1,
  },
];

const mockTemplates = [
  {
    id: 1,
    name: "Professional Follow-Up",
    type: "Email",
    usage: 45,
    conversionRate: "32%",
  },
  {
    id: 2,
    name: "Quick SMS Reminder",
    type: "SMS",
    usage: 78,
    conversionRate: "28%",
  },
  {
    id: 3,
    name: "Friendly Check-In",
    type: "Email",
    usage: 23,
    conversionRate: "41%",
  },
];

const mockPipeline = [
  {
    stage: "Quote Sent",
    count: 12,
    value: "$45,000",
    conversionRate: "75%",
  },
  {
    stage: "Follow-Up",
    count: 8,
    value: "$32,000",
    conversionRate: "60%",
  },
  {
    stage: "Negotiation",
    count: 5,
    value: "$28,000",
    conversionRate: "80%",
  },
  {
    stage: "Closed Won",
    count: 15,
    value: "$67,500",
    conversionRate: "100%",
  },
];

export default function QuoteNudgeDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-4 md:py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Quote Nudge Dashboard</h1>
            <p className="text-gray-600 mt-1 text-sm md:text-base">
              Intelligent follow-up engine that converts pending quotes into confirmed deals
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Badge className="bg-green-100 text-green-800 border-green-200 text-xs md:text-sm">
              Module Active
            </Badge>
            <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-violet-600 rounded-full flex items-center justify-center">
              <MessageSquare className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="px-4 md:px-6 py-6 md:py-8">
        <div className="space-y-6 md:space-y-8">
          
          {/* Automated SMS + Email Follow-Ups Panel */}
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5 text-blue-600" />
                Automated SMS + Email Follow-Ups
              </CardTitle>
              <p className="text-sm text-gray-600">
                Smart automated follow-ups via SMS and email to maximize conversion rates
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">47</div>
                  <p className="text-sm text-gray-600">Total Follow-Ups Sent</p>
                  <p className="text-xs text-gray-500 mt-1">This month</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">32%</div>
                  <p className="text-sm text-gray-600">Response Rate</p>
                  <p className="text-xs text-gray-500 mt-1">+5% vs last month</p>
                </div>
                <div className="text-center p-4 bg-amber-50 rounded-lg">
                  <div className="text-2xl font-bold text-amber-600">12</div>
                  <p className="text-sm text-gray-600">Pending Follow-Ups</p>
                  <p className="text-xs text-gray-500 mt-1">Scheduled today</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Follow-Up
                </Button>
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Configure Automation
                </Button>
                <Button variant="outline" asChild>
                  <a href="/dashboard/quote-nudge/follow-up-messaging">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Advanced Messaging
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/dashboard/quote-nudge/smart-timing">
                    <Brain className="h-4 w-4 mr-2" />
                    AI Smart Timing
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/dashboard/quote-nudge/lead-pipeline">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Visual Pipeline
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/dashboard/quote-nudge/templates-library">
                    <FileText className="h-4 w-4 mr-2" />
                    Templates Library
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/dashboard/quote-nudge/ghosted-client-recovery">
                    <Users className="h-4 w-4 mr-2" />
                    Ghost Recovery
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/dashboard/quote-nudge/conversion-insights">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Conversion Insights
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/dashboard/quote-nudge/interaction-timeline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Interaction Timeline
                  </a>
                </Button>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Recent Follow-Ups</h4>
                {mockQuotes.slice(0, 2).map((quote) => (
                  <div key={quote.id} className="border rounded-lg p-3 md:p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{quote.client}</h4>
                        <p className="text-sm text-gray-600">{quote.project}</p>
                        <p className="text-sm font-medium text-gray-900 mt-1">{quote.amount}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          className={
                            quote.status === "Won"
                              ? "bg-green-100 text-green-800"
                              : quote.status === "Pending"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-gray-100 text-gray-800"
                          }
                        >
                          {quote.status}
                        </Badge>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">{quote.lastFollowUp}</p>
                          <p className="text-xs text-gray-500">{quote.followUpCount} follow-ups</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Smart Timing & Engagement Tracking Panel */}
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-blue-600" />
                AI Smart Timing & Engagement Tracking
              </CardTitle>
              <p className="text-sm text-gray-600">
                AI-powered optimal timing and comprehensive engagement analytics
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Optimal Send Times</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Best Time - Email</p>
                        <p className="text-xs text-gray-600">Tuesday, 10:00 AM</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">42% Open Rate</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Best Time - SMS</p>
                        <p className="text-xs text-gray-600">Thursday, 2:00 PM</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">68% Response Rate</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Engagement Metrics</h4>
                  <div className="space-y-2">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">Email Open Rate</span>
                        <span className="text-sm font-bold text-gray-900">38%</span>
                      </div>
                      <Progress value={38} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">SMS Response Rate</span>
                        <span className="text-sm font-bold text-gray-900">62%</span>
                      </div>
                      <Progress value={62} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">Click-Through Rate</span>
                        <span className="text-sm font-bold text-gray-900">24%</span>
                      </div>
                      <Progress value={24} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Visual Lead Pipeline with Revenue Forecasting Panel */}
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                Visual Lead Pipeline with Revenue Forecasting
              </CardTitle>
              <p className="text-sm text-gray-600">
                Comprehensive pipeline visualization and revenue forecasting
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {mockPipeline.map((stage, index) => (
                  <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">{stage.stage}</h4>
                    <div className="text-2xl font-bold text-blue-600">{stage.count}</div>
                    <p className="text-sm text-gray-600">{stage.value}</p>
                    <div className="mt-2">
                      <div className="text-xs text-gray-500 mb-1">Conversion</div>
                      <div className="text-sm font-bold text-green-600">{stage.conversionRate}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Forecasted Revenue</h4>
                  <div className="text-2xl font-bold text-blue-600">$172,500</div>
                  <p className="text-sm text-gray-600 mt-1">Next 30 days</p>
                  <div className="mt-2 text-xs text-green-600">+18% vs last period</div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Win Rate</h4>
                  <div className="text-2xl font-bold text-green-600">68%</div>
                  <p className="text-sm text-gray-600 mt-1">Overall conversion</p>
                  <div className="mt-2 text-xs text-green-600">+5% improvement</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Message Templates & A/B Testing Panel */}
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Professional Message Templates & A/B Testing
              </CardTitle>
              <p className="text-sm text-gray-600">
                Pre-built templates and A/B testing for optimal message performance
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Template
                </Button>
                <Button variant="outline">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View A/B Tests
                </Button>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Top Performing Templates</h4>
                {mockTemplates.slice(0, 2).map((template) => (
                  <div key={template.id} className="border rounded-lg p-3 md:p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{template.name}</h4>
                        <p className="text-sm text-gray-600">{template.type} Template</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <p className="text-xs text-gray-500">Usage</p>
                          <p className="text-sm font-bold text-gray-900">{template.usage}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-500">Conversion</p>
                          <p className="text-sm font-bold text-green-600">{template.conversionRate}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Ghosted Client Recovery Sequences Panel */}
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                Ghosted Client Recovery Sequences
              </CardTitle>
              <p className="text-sm text-gray-600">
                Automated recovery sequences for clients who have gone silent
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-amber-50 rounded-lg">
                  <div className="text-2xl font-bold text-amber-600">8</div>
                  <p className="text-sm text-gray-600">Ghosted Clients</p>
                  <p className="text-xs text-gray-500 mt-1">Active recovery</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">35%</div>
                  <p className="text-sm text-gray-600">Recovery Rate</p>
                  <p className="text-xs text-gray-500 mt-1">Above industry avg</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">24</div>
                  <p className="text-sm text-gray-600">Active Sequences</p>
                  <p className="text-xs text-gray-500 mt-1">Running now</p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Recovery Sequences</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">3-Touch Recovery</p>
                      <p className="text-xs text-gray-600">Email + SMS + Phone call</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Gentle Nudge</p>
                      <p className="text-xs text-gray-600">Light touch, 7-day interval</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Final Attempt</p>
                      <p className="text-xs text-gray-600">Last chance offer</p>
                    </div>
                    <Badge className="bg-amber-100 text-amber-800">Paused</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Conversion Insights & Win-Rate Analytics Panel */}
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-600" />
                Conversion Insights & Win-Rate Analytics
              </CardTitle>
              <p className="text-sm text-gray-600">
                Detailed analytics and insights to optimize conversion rates
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-600">Win Rate</p>
                  <p className="text-xl md:text-2xl font-bold text-green-600 mt-2">68%</p>
                  <p className="text-xs text-green-600 mt-1">+5% this month</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-600">Avg Deal Size</p>
                  <p className="text-xl md:text-2xl font-bold text-blue-600 mt-2">$8,750</p>
                  <p className="text-xs text-gray-500 mt-1">+12% vs last month</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-600">Sales Cycle</p>
                  <p className="text-xl md:text-2xl font-bold text-amber-600 mt-2">14 days</p>
                  <p className="text-xs text-amber-600 mt-1">-3 days improvement</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-600">Pipeline Value</p>
                  <p className="text-xl md:text-2xl font-bold text-purple-600 mt-2">$172K</p>
                  <p className="text-xs text-gray-500 mt-1">Next 30 days</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Conversion Funnel</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Quote Sent</span>
                      <span className="text-sm font-bold text-gray-900">100%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Response Received</span>
                      <span className="text-sm font-bold text-gray-900">75%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Negotiation Started</span>
                      <span className="text-sm font-bold text-gray-900">45%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Deal Closed</span>
                      <span className="text-sm font-bold text-green-600">68%</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Top Insights</h4>
                  <div className="space-y-2">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-900">Best Follow-Up Time</p>
                      <p className="text-xs text-gray-600">Tuesday mornings show 42% higher response rates</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-900">Effective Template</p>
                      <p className="text-xs text-gray-600">"Professional Follow-Up" converts at 32%</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* One-Click Actions + Full Interaction Timeline Panel */}
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowRight className="h-5 w-5 text-blue-600" />
                One-Click Actions + Full Interaction Timeline
              </CardTitle>
              <p className="text-sm text-gray-600">
                Quick actions and complete interaction history for each client
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Send className="h-4 w-4 mr-1" />
                  Send Follow-Up
                </Button>
                <Button size="sm" variant="outline">
                  <Phone className="h-4 w-4 mr-1" />
                  Call Client
                </Button>
                <Button size="sm" variant="outline">
                  <Mail className="h-4 w-4 mr-1" />
                  Send Email
                </Button>
                <Button size="sm" variant="outline">
                  <Calendar className="h-4 w-4 mr-1" />
                  Schedule Meeting
                </Button>
                <Button size="sm" variant="outline">
                  <DollarSign className="h-4 w-4 mr-1" />
                  Send Invoice
                </Button>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Recent Interactions</h4>
                <div className="space-y-2">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <Send className="h-4 w-4 text-blue-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Follow-up sent to Acme Corp</p>
                      <p className="text-xs text-gray-600">Email: "Just checking in on the website redesign proposal"</p>
                      <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <Phone className="h-4 w-4 text-green-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Call with TechStart Inc</p>
                      <p className="text-xs text-gray-600">Discussed mobile app requirements, scheduled follow-up</p>
                      <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Deal closed with Global Solutions</p>
                      <p className="text-xs text-gray-600">API integration project signed for $5,500</p>
                      <p className="text-xs text-gray-500 mt-1">3 days ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </main>
    </div>
  );
}
