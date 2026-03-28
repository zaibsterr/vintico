"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Eye, 
  Clock, 
  TrendingUp, 
  Send, 
  Brain, 
  Activity, 
  Calendar, 
  DollarSign, 
  User,
  Mail,
  MessageSquare,
  Target,
  Zap,
  AlertCircle,
  CheckCircle
} from "lucide-react";

interface QuoteEngagement {
  id: string;
  clientName: string;
  project: string;
  quoteValue: string;
  lastViewed: string;
  engagementLevel: "high" | "medium" | "low" | "none";
  openCount: number;
  totalViewTime: number;
  lastActivity: string;
  bestFollowUpTime: string;
  followUpReason: string;
}

export default function AISmartTiming() {
  const [quotes, setQuotes] = useState<QuoteEngagement[]>([
    {
      id: "1",
      clientName: "Acme Corporation",
      project: "Website Redesign",
      quoteValue: "$15,000",
      lastViewed: "2 hours ago",
      engagementLevel: "high",
      openCount: 5,
      totalViewTime: 12,
      lastActivity: "Viewed pricing section",
      bestFollowUpTime: "Tomorrow at 10:30 AM",
      followUpReason: "High engagement after multiple views"
    },
    {
      id: "2",
      clientName: "Tech Startup LLC",
      project: "Mobile App Development",
      quoteValue: "$25,000",
      lastViewed: "1 day ago",
      engagementLevel: "medium",
      openCount: 2,
      totalViewTime: 4,
      lastActivity: "Viewed timeline section",
      bestFollowUpTime: "Today at 2:00 PM",
      followUpReason: "Moderate interest, optimal response time"
    },
    {
      id: "3",
      clientName: "Marketing Agency",
      project: "Brand Strategy",
      quoteValue: "$8,500",
      lastViewed: "3 days ago",
      engagementLevel: "low",
      openCount: 1,
      totalViewTime: 1,
      lastActivity: "Quick scan only",
      bestFollowUpTime: "Friday at 11:00 AM",
      followUpReason: "Low engagement needs gentle nudge"
    },
    {
      id: "4",
      clientName: "E-commerce Store",
      project: "Product Photography",
      quoteValue: "$5,000",
      lastViewed: "Never",
      engagementLevel: "none",
      openCount: 0,
      totalViewTime: 0,
      lastActivity: "No activity",
      bestFollowUpTime: "Tomorrow at 9:00 AM",
      followUpReason: "No engagement, initial follow-up needed"
    },
    {
      id: "5",
      clientName: "Consulting Firm",
      project: "Market Research",
      quoteValue: "$12,000",
      lastViewed: "4 hours ago",
      engagementLevel: "high",
      openCount: 3,
      totalViewTime: 8,
      lastActivity: "Downloaded PDF version",
      bestFollowUpTime: "Today at 4:30 PM",
      followUpReason: "Recent high activity, strike while hot"
    }
  ]);

  const [selectedQuote, setSelectedQuote] = useState<QuoteEngagement | null>(null);

  const getEngagementColor = (level: string) => {
    switch (level) {
      case "high": return "bg-green-100 text-green-800 border-green-200";
      case "medium": return "bg-amber-100 text-amber-800 border-amber-200";
      case "low": return "bg-orange-100 text-orange-800 border-orange-200";
      case "none": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getEngagementIcon = (level: string) => {
    switch (level) {
      case "high": return <TrendingUp className="h-4 w-4" />;
      case "medium": return <Activity className="h-4 w-4" />;
      case "low": return <AlertCircle className="h-4 w-4" />;
      case "none": return <Clock className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getEngagementScore = (quote: QuoteEngagement): number => {
    let score = 0;
    if (quote.openCount > 0) score += 20;
    if (quote.openCount > 2) score += 20;
    if (quote.totalViewTime > 5) score += 20;
    if (quote.totalViewTime > 10) score += 20;
    if (quote.lastActivity.includes("Downloaded") || quote.lastActivity.includes("Viewed pricing")) score += 20;
    return score;
  };

  const handleSendFollowUp = (quoteId: string) => {
    console.log(`Sending follow-up for quote ${quoteId}`);
    // In a real app, this would trigger the follow-up message
  };

  const totalQuotes = quotes.length;
  const highEngagementQuotes = quotes.filter(q => q.engagementLevel === "high").length;
  const totalValue = quotes.reduce((sum, q) => sum + parseFloat(q.quoteValue.replace(/[$,]/g, "")), 0);
  const avgViewTime = quotes.reduce((sum, q) => sum + q.totalViewTime, 0) / quotes.length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">AI Smart Timing & Engagement Tracking</h1>
        <p className="text-muted-foreground mt-1">
          Detect client engagement and get AI-powered follow-up timing recommendations.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Brain className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Quotes Tracked</p>
                <p className="text-2xl font-bold text-blue-600">{totalQuotes}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">High Engagement</p>
                <p className="text-2xl font-bold text-green-600">{highEngagementQuotes}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold text-purple-600">${totalValue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Eye className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Avg View Time</p>
                <p className="text-2xl font-bold text-orange-600">{avgViewTime.toFixed(1)} min</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quote Engagement Tracker */}
      <Card>
        <CardHeader>
          <CardTitle>Quote Engagement Tracker</CardTitle>
          <CardDescription>
            Monitor how clients interact with your quotes in real-time.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client Name</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Quote Value</TableHead>
                <TableHead>Last Viewed</TableHead>
                <TableHead>Engagement Level</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quotes.map((quote) => (
                <TableRow 
                  key={quote.id}
                  className={`cursor-pointer hover:bg-muted/50 ${
                    selectedQuote?.id === quote.id ? "bg-muted" : ""
                  }`}
                  onClick={() => setSelectedQuote(quote)}
                >
                  <TableCell className="font-medium">{quote.clientName}</TableCell>
                  <TableCell>{quote.project}</TableCell>
                  <TableCell className="font-semibold">{quote.quoteValue}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      {quote.lastViewed}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getEngagementColor(quote.engagementLevel)}>
                      <div className="flex items-center gap-1">
                        {getEngagementIcon(quote.engagementLevel)}
                        {quote.engagementLevel.charAt(0).toUpperCase() + quote.engagementLevel.slice(1)}
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button 
                      size="sm" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSendFollowUp(quote.id);
                      }}
                    >
                      <Send className="h-3 w-3 mr-1" />
                      Follow Up
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* AI Follow-Up Timing & Engagement Signals */}
      {selectedQuote && (
        <div className="grid gap-6 md:grid-cols-2">
          {/* AI Follow-Up Timing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-blue-600" />
                AI Follow-Up Timing
              </CardTitle>
              <CardDescription>
                AI-recommended optimal time to contact {selectedQuote.clientName}.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-200">
                <Zap className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Best Follow-Up Time</h3>
                <p className="text-2xl font-bold text-blue-900">{selectedQuote.bestFollowUpTime}</p>
              </div>
              
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-1">AI Reasoning</h4>
                  <p className="text-sm text-gray-600">{selectedQuote.followUpReason}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Eye className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium">Open Count</span>
                    </div>
                    <p className="text-lg font-bold">{selectedQuote.openCount} times</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium">View Time</span>
                    </div>
                    <p className="text-lg font-bold">{selectedQuote.totalViewTime} min</p>
                  </div>
                </div>
              </div>
              
              <Button className="w-full" onClick={() => handleSendFollowUp(selectedQuote.id)}>
                <Send className="h-4 w-4 mr-2" />
                Send Follow-Up Now
              </Button>
            </CardContent>
          </Card>

          {/* Engagement Signals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-green-600" />
                Engagement Signals
              </CardTitle>
              <CardDescription>
                Detailed engagement metrics for {selectedQuote.clientName}.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <h4 className="font-medium">Quote Opened</h4>
                      <p className="text-sm text-muted-foreground">Client has viewed the quote</p>
                    </div>
                  </div>
                  <Badge variant={selectedQuote.openCount > 0 ? "default" : "secondary"}>
                    {selectedQuote.openCount > 0 ? "Yes" : "No"}
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    <div>
                      <h4 className="font-medium">Multiple Views</h4>
                      <p className="text-sm text-muted-foreground">Quote viewed multiple times</p>
                    </div>
                  </div>
                  <Badge variant={selectedQuote.openCount > 2 ? "default" : "secondary"}>
                    {selectedQuote.openCount > 2 ? "Yes" : "No"}
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Target className="h-5 w-5 text-purple-600" />
                    <div>
                      <h4 className="font-medium">Deep Engagement</h4>
                      <p className="text-sm text-muted-foreground">Spent significant time reviewing</p>
                    </div>
                  </div>
                  <Badge variant={selectedQuote.totalViewTime > 5 ? "default" : "secondary"}>
                    {selectedQuote.totalViewTime > 5 ? "Yes" : "No"}
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-orange-600" />
                    <div>
                      <h4 className="font-medium">Recent Activity</h4>
                      <p className="text-sm text-muted-foreground">Activity in last 24 hours</p>
                    </div>
                  </div>
                  <Badge variant={selectedQuote.lastViewed.includes("hour") ? "default" : "secondary"}>
                    {selectedQuote.lastViewed.includes("hour") ? "Yes" : "No"}
                  </Badge>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">Last Activity</h4>
                <p className="text-sm text-gray-600">{selectedQuote.lastActivity}</p>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Engagement Score</h4>
                <div className="flex items-center gap-3">
                  <div className="text-3xl font-bold text-blue-900">
                    {getEngagementScore(selectedQuote)}%
                  </div>
                  <div className="flex-1">
                    <div className="w-full bg-blue-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${getEngagementScore(selectedQuote)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Immediate actions you can take based on engagement data.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <Send className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold">Send Follow-Up</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Send a personalized follow-up message to high-engagement clients.
              </p>
              <Button variant="outline" className="w-full">
                Contact High Engagement
              </Button>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <Mail className="h-5 w-5 text-green-600" />
                <h3 className="font-semibold">Email Campaign</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Send bulk email to all medium-engagement prospects.
              </p>
              <Button variant="outline" className="w-full">
                Email Medium Engagement
              </Button>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <MessageSquare className="h-5 w-5 text-purple-600" />
                <h3 className="font-semibold">SMS Nudge</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Send SMS reminder to clients with no engagement.
              </p>
              <Button variant="outline" className="w-full">
                SMS No Engagement
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
