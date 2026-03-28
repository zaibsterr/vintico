"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle, FileText, Upload, Shield, AlertCircle } from "lucide-react";

interface RiskArea {
  type: "scope" | "payment" | "timeline" | "termination" | "general";
  severity: "high" | "medium" | "low";
  title: string;
  description: string;
  recommendation: string;
}

interface ContractAnalysis {
  riskScore: number;
  riskLevel: "Low Risk" | "Medium Risk" | "High Risk";
  riskAreas: RiskArea[];
}

export default function ContractRiskScanner() {
  const [contractText, setContractText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<ContractAnalysis | null>(null);
  const [generatedClause, setGeneratedClause] = useState("");

  const riskPatterns = {
    unlimitedRevisions: /unlimited|unlimited revisions|unlimited changes|as many revisions|no limit/gi,
    vagueDeliverables: /approximately|roughly|about|around|generally|basically/gi,
    noMilestones: /upon completion|final delivery|when finished|after project/gi,
    delayedPayment: /net 30|net 60|net 90|within 30 days|within 60 days/gi,
    noTermination: /non-cancellable|cannot terminate|no termination|binding for entire term/gi,
    noDeposit: /payment upon completion|full payment on delivery|pay when finished/gi,
    scopeCreep: /additional work|extra work|beyond scope|additional services/gi
  };

  const analyzeContract = () => {
    if (!contractText.trim()) return;

    setIsAnalyzing(true);
    
    // Simulate analysis delay
    setTimeout(() => {
      const risks: RiskArea[] = [];
      let riskScore = 0;

      // Check for unlimited revisions
      if (riskPatterns.unlimitedRevisions.test(contractText)) {
        risks.push({
          type: "scope",
          severity: "high",
          title: "Unlimited Revisions Detected",
          description: "Contract contains clauses allowing unlimited revisions or changes.",
          recommendation: "Define a fixed number of revisions such as 2-3 rounds with clear specifications for each."
        });
        riskScore += 3;
      }

      // Check for vague deliverables
      if (riskPatterns.vagueDeliverables.test(contractText)) {
        risks.push({
          type: "scope",
          severity: "medium",
          title: "Vague Deliverables",
          description: "Contract uses ambiguous language to describe deliverables.",
          recommendation: "Specify exact deliverables with clear acceptance criteria and measurable outcomes."
        });
        riskScore += 2;
      }

      // Check for lack of milestones
      if (riskPatterns.noMilestones.test(contractText) && !contractText.match(/milestone|phase|deliverable payment/gi)) {
        risks.push({
          type: "payment",
          severity: "high",
          title: "No Milestone Payment Structure",
          description: "Payment is tied only to final completion without intermediate milestones.",
          recommendation: "Implement milestone-based payments (e.g., 30% upfront, 40% mid-project, 30% on completion)."
        });
        riskScore += 3;
      }

      // Check for delayed payment terms
      if (riskPatterns.delayedPayment.test(contractText)) {
        risks.push({
          type: "payment",
          severity: "medium",
          title: "Delayed Payment Terms",
          description: "Contract includes long payment terms (30+ days).",
          recommendation: "Negotiate shorter payment terms such as Net 15 or payment upon milestone completion."
        });
        riskScore += 2;
      }

      // Check for termination clause
      if (!riskPatterns.noTermination.test(contractText) && !contractText.match(/termination|cancel|end contract/gi)) {
        risks.push({
          type: "termination",
          severity: "medium",
          title: "Missing Termination Clause",
          description: "No clear termination terms are specified.",
          recommendation: "Include termination clauses with notice periods and payment for work completed."
        });
        riskScore += 2;
      }

      // Check for deposit requirement
      if (riskPatterns.noDeposit.test(contractText) && !contractText.match(/deposit|upfront|advance payment/gi)) {
        risks.push({
          type: "payment",
          severity: "high",
          title: "No Deposit Required",
          description: "Contract doesn't require upfront payment or deposit.",
          recommendation: "Require a minimum 30-50% deposit before work begins to secure commitment."
        });
        riskScore += 3;
      }

      // Check for scope creep potential
      if (riskPatterns.scopeCreep.test(contractText)) {
        risks.push({
          type: "scope",
          severity: "medium",
          title: "Scope Creep Risk",
          description: "Contract mentions additional work without clear change order process.",
          recommendation: "Define a formal change order process with pricing for any work beyond the original scope."
        });
        riskScore += 2;
      }

      // Determine risk level
      let riskLevel: "Low Risk" | "Medium Risk" | "High Risk";
      if (riskScore <= 3) {
        riskLevel = "Low Risk";
      } else if (riskScore <= 6) {
        riskLevel = "Medium Risk";
      } else {
        riskLevel = "High Risk";
      }

      setAnalysis({
        riskScore: Math.min(riskScore, 10),
        riskLevel,
        riskAreas: risks
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  const generateSaferClause = () => {
    const saferClauses = [
      "Client shall be entitled to two (2) rounds of revisions on delivered work. Additional revisions shall be billed at the hourly rate of $X per hour.",
      "Project shall be completed in phases with milestone payments: 30% upon signing, 40% upon completion of phase 1, and 30% upon final delivery.",
      "Either party may terminate this agreement with 14 days written notice. Client shall pay for all work completed up to termination date.",
      "All deliverables shall be clearly defined in Appendix A with specific acceptance criteria. Changes to scope require written change orders.",
      "Payment terms are Net 15 from invoice date. Late payments shall incur 1.5% monthly interest."
    ];
    
    const randomClause = saferClauses[Math.floor(Math.random() * saferClauses.length)];
    setGeneratedClause(randomClause);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-red-100 text-red-800 border-red-200";
      case "medium": return "bg-amber-100 text-amber-800 border-amber-200";
      case "low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getRiskIcon = (type: string) => {
    switch (type) {
      case "scope": return <FileText className="h-4 w-4" />;
      case "payment": return <AlertCircle className="h-4 w-4" />;
      case "timeline": return <AlertTriangle className="h-4 w-4" />;
      case "termination": return <Shield className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Contract Risk Scanner</h1>
        <p className="text-muted-foreground mt-1">
          Analyze contracts and detect hidden freelancer risks.
        </p>
      </div>

      {/* Contract Input Section */}
      <Card>
        <CardHeader>
          <CardTitle>Contract Input</CardTitle>
          <CardDescription>
            Paste your contract text or upload a document to analyze potential risks.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Contract Text</label>
            <Textarea
              placeholder="Paste your contract or agreement here..."
              value={contractText}
              onChange={(e) => setContractText(e.target.value)}
              rows={8}
              className="resize-none"
            />
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload Contract File
            </Button>
            <Button 
              onClick={analyzeContract}
              disabled={!contractText.trim() || isAnalyzing}
              className="flex items-center gap-2"
            >
              <Shield className="h-4 w-4" />
              {isAnalyzing ? "Scanning..." : "Scan Contract"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      {analysis && (
        <>
          {/* Risk Score */}
          <Card>
            <CardHeader>
              <CardTitle>Contract Risk Score</CardTitle>
              <CardDescription>
                Overall assessment of contract risk level
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">Risk Level: {analysis.riskLevel}</span>
                  <Badge variant="outline" className={
                    analysis.riskLevel === "Low Risk" ? "bg-green-100 text-green-800" :
                    analysis.riskLevel === "Medium Risk" ? "bg-amber-100 text-amber-800" :
                    "bg-red-100 text-red-800"
                  }>
                    {analysis.riskScore}/10
                  </Badge>
                </div>
                <Progress value={analysis.riskScore * 10} className="h-2" />
                <p className="text-sm text-muted-foreground">
                  {analysis.riskLevel === "Low Risk" && "This contract appears to have minimal risks for freelancers."}
                  {analysis.riskLevel === "Medium Risk" && "This contract contains some risks that should be addressed."}
                  {analysis.riskLevel === "High Risk" && "This contract contains significant risks that require immediate attention."}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Detected Risk Areas */}
          <Card>
            <CardHeader>
              <CardTitle>Detected Risk Areas</CardTitle>
              <CardDescription>
                Specific issues found in your contract
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analysis.riskAreas.map((risk, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      {getRiskIcon(risk.type)}
                      <h3 className="font-semibold">{risk.title}</h3>
                      <Badge variant="outline" className={getSeverityColor(risk.severity)}>
                        {risk.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{risk.description}</p>
                    <div className="bg-blue-50 border border-blue-200 rounded p-3">
                      <p className="text-sm font-medium text-blue-800 mb-1">Recommendation:</p>
                      <p className="text-sm text-blue-700">{risk.recommendation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Contract Fix Generator */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Contract Fix Generator</CardTitle>
              <CardDescription>
                Generate safer contract clauses automatically
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={generateSaferClause} className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Generate Safer Contract Clause
              </Button>
              
              {generatedClause && (
                <div className="bg-green-50 border border-green-200 rounded p-4">
                  <p className="text-sm font-medium text-green-800 mb-2">Suggested Clause:</p>
                  <p className="text-sm text-green-700">{generatedClause}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
