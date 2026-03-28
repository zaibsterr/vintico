"use client";

import { useState } from "react";
import {
  Shield,
  FileText,
  AlertTriangle,
  DollarSign,
  TrendingUp,
  Users,
  Upload,
  Search,
  Bell,
  CheckCircle,
  Clock,
  ArrowRight,
  Download,
  Eye,
  BarChart3,
  Target,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const mockContracts = [
  {
    id: 1,
    client: "Acme Corp",
    project: "Website Redesign",
    amount: "$12,500",
    riskLevel: "Low",
    lastUpdate: "2 hours ago",
  },
  {
    id: 2,
    client: "TechStart Inc",
    project: "Mobile App Development",
    amount: "$8,000",
    riskLevel: "Medium",
    lastUpdate: "1 day ago",
  },
  {
    id: 3,
    client: "Global Solutions",
    project: "API Integration",
    amount: "$5,500",
    riskLevel: "High",
    lastUpdate: "3 days ago",
  },
];

const mockInvoices = [
  {
    id: 1,
    client: "Acme Corp",
    invoice: "INV-001",
    amount: "$12,500",
    dueDate: "2024-01-15",
    status: "Overdue",
    daysLate: 15,
  },
  {
    id: 2,
    client: "TechStart Inc",
    invoice: "INV-002",
    amount: "$8,000",
    dueDate: "2024-01-20",
    status: "Due Soon",
    daysLate: 0,
  },
  {
    id: 3,
    client: "Global Solutions",
    invoice: "INV-003",
    amount: "$5,500",
    dueDate: "2024-01-25",
    status: "Pending",
    daysLate: 0,
  },
];

const mockClients = [
  {
    id: 1,
    name: "Acme Corp",
    riskScore: 85,
    category: "Low Risk",
    contracts: 3,
    totalValue: "$45,000",
  },
  {
    id: 2,
    name: "TechStart Inc",
    riskScore: 62,
    category: "Medium Risk",
    contracts: 2,
    totalValue: "$28,000",
  },
  {
    id: 3,
    name: "Global Solutions",
    riskScore: 35,
    category: "High Risk",
    contracts: 1,
    totalValue: "$15,000",
  },
];

export default function FreelancerShieldDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-4 md:py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">FreelancerShield Dashboard</h1>
            <p className="text-gray-600 mt-1 text-sm md:text-base">
              Comprehensive protection and risk management for your freelance business
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>
            <div className="h-8 w-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
              <Users className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="px-4 md:px-6 py-6 md:py-8">
        <div className="space-y-6 md:space-y-8">
          
          {/* Contract Risk Scanner Panel */}
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-emerald-600" />
                Contract Risk Scanner
              </CardTitle>
              <p className="text-sm text-gray-600">
                Analyze contracts for potential risks and compliance issues
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Contract
                </Button>
                <Button variant="outline">
                  <Search className="h-4 w-4 mr-2" />
                  Scan Existing
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">1</div>
                  <p className="text-sm text-gray-600">Low Risk Contracts</p>
                </div>
                <div className="text-center p-4 bg-amber-50 rounded-lg">
                  <div className="text-2xl font-bold text-amber-600">1</div>
                  <p className="text-sm text-gray-600">Medium Risk Contracts</p>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">1</div>
                  <p className="text-sm text-gray-600">High Risk Contracts</p>
                </div>
              </div>

              <div className="space-y-3">
                {mockContracts.slice(0, 2).map((contract) => (
                  <div key={contract.id} className="border rounded-lg p-3 md:p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{contract.client}</h4>
                        <p className="text-sm text-gray-600">{contract.project}</p>
                        <p className="text-sm font-medium text-gray-900 mt-1">{contract.amount}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          className={
                            contract.riskLevel === "Low"
                              ? "bg-green-100 text-green-800"
                              : contract.riskLevel === "Medium"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-red-100 text-red-800"
                          }
                        >
                          {contract.riskLevel} Risk
                        </Badge>
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

          {/* Invoice Recovery Automation Panel */}
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-emerald-600" />
                Invoice Recovery Automation
              </CardTitle>
              <p className="text-sm text-gray-600">
                Automated invoice tracking and recovery workflows
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">$12,500</div>
                  <p className="text-sm text-gray-600">Overdue Amount</p>
                  <p className="text-xs text-gray-500 mt-1">1 invoice</p>
                </div>
                <div className="text-center p-4 bg-amber-50 rounded-lg">
                  <div className="text-2xl font-bold text-amber-600">$8,000</div>
                  <p className="text-sm text-gray-600">Due Soon</p>
                  <p className="text-xs text-gray-500 mt-1">1 invoice</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">$5,500</div>
                  <p className="text-sm text-gray-600">Pending</p>
                  <p className="text-xs text-gray-500 mt-1">1 invoice</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-gray-700">Client</th>
                      <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-gray-700">Invoice</th>
                      <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-gray-700">Amount</th>
                      <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-gray-700">Status</th>
                      <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-gray-700">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockInvoices.slice(0, 2).map((invoice) => (
                      <tr key={invoice.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm text-gray-900">{invoice.client}</td>
                        <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm text-gray-600">{invoice.invoice}</td>
                        <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-gray-900">{invoice.amount}</td>
                        <td className="py-2 md:py-3 px-2 md:px-4">
                          <Badge
                            className={
                              invoice.status === "Overdue"
                                ? "bg-red-100 text-red-800"
                                : invoice.status === "Due Soon"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-blue-100 text-blue-800"
                            }
                          >
                            {invoice.status}
                          </Badge>
                        </td>
                        <td className="py-2 md:py-3 px-2 md:px-4">
                          <Button size="sm" className="text-xs">
                            Send Reminder
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Late Payment Protection Panel */}
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-emerald-600" />
                Late Payment Protection
              </CardTitle>
              <p className="text-sm text-gray-600">
                Protect against late payments with automated alerts
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Active Protection</span>
                    <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Auto-Reminders</span>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Late Fee Settings</span>
                    <Badge className="bg-amber-100 text-amber-800">2% after 7 days</Badge>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Collection Success Rate</span>
                      <span className="text-sm font-bold text-gray-900">94%</span>
                    </div>
                    <Progress value={94} className="h-2" />
                  </div>
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                    <Bell className="h-4 w-4 mr-2" />
                    Configure Alerts
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
                  <Bell className="h-5 w-5 text-amber-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Payment Due Soon</p>
                    <p className="text-xs text-gray-600">TechStart Inc - INV-002 due in 2 days</p>
                  </div>
                  <span className="text-xs text-gray-500">2 hours ago</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Payment Overdue</p>
                    <p className="text-xs text-gray-600">Acme Corp - INV-001 15 days overdue</p>
                  </div>
                  <span className="text-xs text-gray-500">1 day ago</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tax Estimate Alerts Panel */}
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-emerald-600" />
                Tax Estimate Alerts
              </CardTitle>
              <p className="text-sm text-gray-600">
                Tax estimates and compliance monitoring
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-600">Q1 Estimate</p>
                  <p className="text-xl md:text-2xl font-bold text-gray-900 mt-2">$8,450</p>
                  <p className="text-xs text-emerald-600 mt-1">On Track</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-600">Q2 Estimate</p>
                  <p className="text-xl md:text-2xl font-bold text-gray-900 mt-2">$12,300</p>
                  <p className="text-xs text-amber-600 mt-1">Review Needed</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-600">YTD Total</p>
                  <p className="text-xl md:text-2xl font-bold text-gray-900 mt-2">$20,750</p>
                  <p className="text-xs text-gray-500 mt-1">+15% vs last year</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-600">Next Payment</p>
                  <p className="text-xl md:text-2xl font-bold text-amber-600 mt-2">15 days</p>
                  <p className="text-xs text-gray-500 mt-1">Apr 15, 2024</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Compliance Status</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Quarterly Filings</span>
                      <Badge className="bg-green-100 text-green-800 text-xs">Up to Date</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">1099 Forms</span>
                      <Badge className="bg-green-100 text-green-800 text-xs">Filed</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">State Taxes</span>
                      <Badge className="bg-amber-100 text-amber-800 text-xs">Pending</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Upcoming Deadlines</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm text-gray-700">Q1 Estimated Tax</span>
                      <span className="text-sm font-bold text-amber-600">Apr 15</span>
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm text-gray-700">Q2 Estimated Tax</span>
                      <span className="text-sm font-bold text-gray-600">Jun 15</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Client Risk Score Panel */}
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-emerald-600" />
                Client Risk Score
              </CardTitle>
              <p className="text-sm text-gray-600">
                Client risk assessment and scoring system
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-600">Low Risk Clients</p>
                  <p className="text-2xl font-bold text-green-600 mt-2">12</p>
                  <p className="text-xs text-gray-500 mt-1">70% of portfolio</p>
                </div>
                <div className="text-center p-4 bg-amber-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-600">Medium Risk Clients</p>
                  <p className="text-2xl font-bold text-amber-600 mt-2">4</p>
                  <p className="text-xs text-gray-500 mt-1">24% of portfolio</p>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-600">High Risk Clients</p>
                  <p className="text-2xl font-bold text-red-600 mt-2">1</p>
                  <p className="text-xs text-gray-500 mt-1">6% of portfolio</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-gray-700">Client Name</th>
                      <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-gray-700">Risk Score</th>
                      <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-gray-700">Category</th>
                      <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-gray-700 hidden sm:table-cell">Contracts</th>
                      <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-gray-700">Total Value</th>
                      <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-gray-700">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockClients.slice(0, 2).map((client) => (
                      <tr key={client.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm text-gray-900">{client.name}</td>
                        <td className="py-2 md:py-3 px-2 md:px-4">
                          <div className="flex items-center gap-2">
                            <Progress value={client.riskScore} className="h-2 w-16" />
                            <span className="text-xs md:text-sm font-medium">{client.riskScore}</span>
                          </div>
                        </td>
                        <td className="py-2 md:py-3 px-2 md:px-4">
                          <Badge
                            className={
                              client.category === "Low Risk"
                                ? "bg-green-100 text-green-800"
                                : client.category === "Medium Risk"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-red-100 text-red-800"
                            }
                          >
                            {client.category}
                          </Badge>
                        </td>
                        <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm text-gray-600 hidden sm:table-cell">{client.contracts}</td>
                        <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-gray-900">{client.totalValue}</td>
                        <td className="py-2 md:py-3 px-2 md:px-4">
                          <Button variant="outline" size="sm" className="text-xs">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

        </div>
      </main>
    </div>
  );
}
