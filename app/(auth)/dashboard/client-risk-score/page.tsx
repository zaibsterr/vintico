"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  Mail, 
  Building, 
  DollarSign, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock, 
  MessageSquare, 
  FileText,
  TrendingUp,
  TrendingDown,
  Shield
} from "lucide-react";

interface ClientData {
  id: string;
  clientName: string;
  clientEmail: string;
  company: string;
  projectBudget: string;
  negotiationDifficulty: number;
  paymentDelayHistory: number;
  communicationSpeed: number;
  projectClarity: number;
  createdAt: string;
}

interface RiskScore {
  overall: number;
  level: "Low Risk" | "Medium Risk" | "High Risk";
  paymentReliability: number;
  communication: number;
  budgetStability: number;
  recommendation: string;
}

export default function ClientRiskScore() {
  const [clients, setClients] = useState<ClientData[]>([
    {
      id: "1",
      clientName: "Acme Corporation",
      clientEmail: "contact@acme.com",
      company: "Acme Corporation",
      projectBudget: "15000",
      negotiationDifficulty: 3,
      paymentDelayHistory: 2,
      communicationSpeed: 4,
      projectClarity: 5,
      createdAt: "2024-03-15"
    },
    {
      id: "2",
      clientName: "Startup XYZ",
      clientEmail: "founder@startupxyz.com",
      company: "Startup XYZ",
      projectBudget: "5000",
      negotiationDifficulty: 5,
      paymentDelayHistory: 4,
      communicationSpeed: 2,
      projectClarity: 3,
      createdAt: "2024-03-10"
    }
  ]);

  const [newClient, setNewClient] = useState({
    clientName: "",
    clientEmail: "",
    company: "",
    projectBudget: "",
    negotiationDifficulty: "3",
    paymentDelayHistory: "3",
    communicationSpeed: "3",
    projectClarity: "3"
  });

  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);

  const calculateRiskScore = (client: ClientData): RiskScore => {
    // Calculate individual risk factors (lower is better for difficulty/delay, higher is better for speed/clarity)
    const paymentReliability = Math.max(0, 100 - (client.negotiationDifficulty * 10) - (client.paymentDelayHistory * 15));
    const communication = Math.min(100, (client.communicationSpeed * 15) + (client.projectClarity * 10));
    const budgetStability = parseFloat(client.projectBudget) > 10000 ? 80 : parseFloat(client.projectBudget) > 5000 ? 60 : 40;
    
    // Calculate overall risk score
    const overall = (paymentReliability * 0.4) + (communication * 0.3) + (budgetStability * 0.3);
    
    let level: "Low Risk" | "Medium Risk" | "High Risk";
    let recommendation: string;
    
    if (overall >= 75) {
      level = "Low Risk";
      recommendation = "Safe to accept project";
    } else if (overall >= 50) {
      level = "Medium Risk";
      recommendation = "Request deposit first";
    } else {
      level = "High Risk";
      recommendation = "High risk client - consider declining";
    }
    
    return {
      overall: Math.round(overall),
      level,
      paymentReliability: Math.round(paymentReliability),
      communication: Math.round(communication),
      budgetStability: Math.round(budgetStability),
      recommendation
    };
  };

  const handleAddClient = () => {
    if (!newClient.clientName || !newClient.clientEmail || !newClient.projectBudget) return;

    const client: ClientData = {
      id: Date.now().toString(),
      clientName: newClient.clientName,
      clientEmail: newClient.clientEmail,
      company: newClient.company,
      projectBudget: newClient.projectBudget,
      negotiationDifficulty: parseInt(newClient.negotiationDifficulty),
      paymentDelayHistory: parseInt(newClient.paymentDelayHistory),
      communicationSpeed: parseInt(newClient.communicationSpeed),
      projectClarity: parseInt(newClient.projectClarity),
      createdAt: new Date().toISOString().split('T')[0]
    };

    setClients([client, ...clients]);
    setNewClient({
      clientName: "",
      clientEmail: "",
      company: "",
      projectBudget: "",
      negotiationDifficulty: "3",
      paymentDelayHistory: "3",
      communicationSpeed: "3",
      projectClarity: "3"
    });
    setShowAddForm(false);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case "Low Risk": return "bg-green-100 text-green-800 border-green-200";
      case "Medium Risk": return "bg-amber-100 text-amber-800 border-amber-200";
      case "High Risk": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case "Low Risk": return <CheckCircle className="h-4 w-4" />;
      case "Medium Risk": return <AlertTriangle className="h-4 w-4" />;
      case "High Risk": return <XCircle className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 75) return "text-green-600";
    if (score >= 50) return "text-amber-600";
    return "text-red-600";
  };

  const getRecommendationColor = (recommendation: string) => {
    if (recommendation.includes("Safe")) return "bg-green-50 text-green-800 border-green-200";
    if (recommendation.includes("deposit")) return "bg-amber-50 text-amber-800 border-amber-200";
    return "bg-red-50 text-red-800 border-red-200";
  };

  const selectedClient = clients.find(c => c.id === selectedClientId);
  const riskScore = selectedClient ? calculateRiskScore(selectedClient) : null;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Client Risk Score</h1>
        <p className="text-muted-foreground mt-1">
          Evaluate client reliability before starting work.
        </p>
      </div>

      {/* Add Client Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Add Client</CardTitle>
              <CardDescription>
                Enter client information to evaluate project risk.
              </CardDescription>
            </div>
            <Button onClick={() => setShowAddForm(!showAddForm)}>
              {showAddForm ? "Cancel" : "Add Client"}
            </Button>
          </div>
        </CardHeader>
        {showAddForm && (
          <CardContent className="space-y-6">
            {/* Basic Information */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="clientName">Client Name *</Label>
                <Input
                  id="clientName"
                  value={newClient.clientName}
                  onChange={(e) => setNewClient({...newClient, clientName: e.target.value})}
                  placeholder="Enter client name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientEmail">Client Email *</Label>
                <Input
                  id="clientEmail"
                  type="email"
                  value={newClient.clientEmail}
                  onChange={(e) => setNewClient({...newClient, clientEmail: e.target.value})}
                  placeholder="client@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={newClient.company}
                  onChange={(e) => setNewClient({...newClient, company: e.target.value})}
                  placeholder="Company name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="projectBudget">Project Budget ($) *</Label>
                <Input
                  id="projectBudget"
                  type="number"
                  value={newClient.projectBudget}
                  onChange={(e) => setNewClient({...newClient, projectBudget: e.target.value})}
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* Client Behavior Data */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Client Behavior Data</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="negotiation">Negotiation Difficulty (1-5)</Label>
                  <Select value={newClient.negotiationDifficulty} onValueChange={(value: string) => setNewClient({...newClient, negotiationDifficulty: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 - Very Easy</SelectItem>
                      <SelectItem value="2">2 - Easy</SelectItem>
                      <SelectItem value="3">3 - Moderate</SelectItem>
                      <SelectItem value="4">4 - Difficult</SelectItem>
                      <SelectItem value="5">5 - Very Difficult</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="paymentDelay">Payment Delay History (1-5)</Label>
                  <Select value={newClient.paymentDelayHistory} onValueChange={(value: string) => setNewClient({...newClient, paymentDelayHistory: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 - Always On Time</SelectItem>
                      <SelectItem value="2">2 - Usually On Time</SelectItem>
                      <SelectItem value="3">3 - Sometimes Late</SelectItem>
                      <SelectItem value="4">4 - Often Late</SelectItem>
                      <SelectItem value="5">5 - Always Late</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="communication">Communication Speed (1-5)</Label>
                  <Select value={newClient.communicationSpeed} onValueChange={(value: string) => setNewClient({...newClient, communicationSpeed: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 - Very Slow</SelectItem>
                      <SelectItem value="2">2 - Slow</SelectItem>
                      <SelectItem value="3">3 - Moderate</SelectItem>
                      <SelectItem value="4">4 - Fast</SelectItem>
                      <SelectItem value="5">5 - Very Fast</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="clarity">Project Clarity (1-5)</Label>
                  <Select value={newClient.projectClarity} onValueChange={(value: string) => setNewClient({...newClient, projectClarity: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 - Very Unclear</SelectItem>
                      <SelectItem value="2">2 - Unclear</SelectItem>
                      <SelectItem value="3">3 - Moderate</SelectItem>
                      <SelectItem value="4">4 - Clear</SelectItem>
                      <SelectItem value="5">5 - Very Clear</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Button onClick={handleAddClient} className="w-full">
              Calculate Risk Score
            </Button>
          </CardContent>
        )}
      </Card>

      {/* Client List */}
      <Card>
        <CardHeader>
          <CardTitle>Client Evaluations</CardTitle>
          <CardDescription>
            Click on a client to view their detailed risk assessment.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {clients.map((client) => {
              const score = calculateRiskScore(client);
              return (
                <div 
                  key={client.id} 
                  className={`border rounded-lg p-4 cursor-pointer transition-colors hover:bg-muted/50 ${
                    selectedClientId === client.id ? "border-primary bg-primary/5" : ""
                  }`}
                  onClick={() => setSelectedClientId(client.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <h3 className="font-semibold">{client.clientName}</h3>
                        <p className="text-sm text-muted-foreground">{client.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="font-semibold">${parseFloat(client.projectBudget).toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">Budget</p>
                      </div>
                      <Badge variant="outline" className={getRiskColor(score.level)}>
                        <div className="flex items-center gap-1">
                          {getRiskIcon(score.level)}
                          {score.level}
                        </div>
                      </Badge>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Risk Score Result */}
      {riskScore && selectedClient && (
        <Card>
          <CardHeader>
            <CardTitle>Risk Score Result</CardTitle>
            <CardDescription>
              Comprehensive risk assessment for {selectedClient.clientName}.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-6xl font-bold mb-2">
                <span className={getScoreColor(riskScore.overall)}>{riskScore.overall}</span>
                <span className="text-2xl text-muted-foreground">/100</span>
              </div>
              <Badge variant="outline" className={`text-lg px-4 py-2 ${getRiskColor(riskScore.level)}`}>
                <div className="flex items-center gap-2">
                  {getRiskIcon(riskScore.level)}
                  {riskScore.level}
                </div>
              </Badge>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label className="text-base font-medium">Overall Risk Score</Label>
                <span className="text-sm font-medium">{riskScore.overall}%</span>
              </div>
              <Progress value={riskScore.overall} className="h-3" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Risk Indicators */}
      {riskScore && selectedClient && (
        <Card>
          <CardHeader>
            <CardTitle>Risk Indicators</CardTitle>
            <CardDescription>
              Detailed breakdown of risk factors.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold">Payment Reliability</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Score</span>
                    <span className="font-bold text-blue-600">{riskScore.paymentReliability}%</span>
                  </div>
                  <Progress value={riskScore.paymentReliability} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    Based on negotiation difficulty and payment history
                  </p>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <MessageSquare className="h-5 w-5 text-green-600" />
                  <h3 className="font-semibold">Communication</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Score</span>
                    <span className="font-bold text-green-600">{riskScore.communication}%</span>
                  </div>
                  <Progress value={riskScore.communication} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    Based on response speed and project clarity
                  </p>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                  <h3 className="font-semibold">Budget Stability</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Score</span>
                    <span className="font-bold text-purple-600">{riskScore.budgetStability}%</span>
                  </div>
                  <Progress value={riskScore.budgetStability} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    Based on project budget size and stability
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recommendation */}
      {riskScore && selectedClient && (
        <Card>
          <CardHeader>
            <CardTitle>Recommendation</CardTitle>
            <CardDescription>
              Suggested approach based on risk assessment.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className={`border rounded-lg p-6 ${getRecommendationColor(riskScore.recommendation)}`}>
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Recommended Action</h3>
                  <p className="text-base">{riskScore.recommendation}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Strengths
                </h4>
                <ul className="text-sm space-y-1">
                  {riskScore.paymentReliability >= 70 && <li>• Reliable payment history</li>}
                  {riskScore.communication >= 70 && <li>• Good communication patterns</li>}
                  {riskScore.budgetStability >= 70 && <li>• Stable project budget</li>}
                </ul>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  Areas of Concern
                </h4>
                <ul className="text-sm space-y-1">
                  {riskScore.paymentReliability < 50 && <li>• Payment reliability concerns</li>}
                  {riskScore.communication < 50 && <li>• Communication may be challenging</li>}
                  {riskScore.budgetStability < 50 && <li>• Budget stability risks</li>}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
