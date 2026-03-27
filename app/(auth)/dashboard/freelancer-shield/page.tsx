"use client";

import {
  Shield,
  FileText,
  Clock,
  AlertTriangle,
  Plus,
  Upload,
  User,
  Bell,
  CheckCircle,
  XCircle,
  Eye,
  TrendingUp,
  DollarSign,
  Calendar,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

const mockContracts = [
  {
    id: 1,
    client: "Acme Corp",
    project: "Website Redesign",
    amount: "$12,500",
    status: "Protected",
    lastUpdate: "2 hours ago",
  },
  {
    id: 2,
    client: "TechStart Inc",
    project: "Mobile App Development",
    amount: "$8,000",
    status: "Pending",
    lastUpdate: "1 day ago",
  },
  {
    id: 3,
    client: "Global Solutions",
    project: "API Integration",
    amount: "$5,500",
    status: "Completed",
    lastUpdate: "3 days ago",
  },
  {
    id: 4,
    client: "Digital Agency",
    project: "E-commerce Platform",
    amount: "$15,000",
    status: "Protected",
    lastUpdate: "5 hours ago",
  },
];

const recentActivities = [
  {
    id: 1,
    action: "Contract created",
    detail: "New agreement with Acme Corp",
    time: "2 hours ago",
    icon: FileText,
    color: "text-blue-600",
  },
  {
    id: 2,
    action: "Client signed agreement",
    detail: "TechStart Inc approved contract",
    time: "4 hours ago",
    icon: CheckCircle,
    color: "text-emerald-600",
  },
  {
    id: 3,
    action: "Payment milestone triggered",
    detail: "First milestone completed - $2,500 released",
    time: "1 day ago",
    icon: DollarSign,
    color: "text-green-600",
  },
  {
    id: 4,
    action: "Protection activated",
    detail: "Enhanced protection enabled for Global Solutions",
    time: "2 days ago",
    icon: Shield,
    color: "text-violet-600",
  },
];

export default function FreelancerShieldDashboard() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      {/* Top Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-4 md:py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                FreelancerShield Dashboard
              </h1>
              <p className="text-gray-600 mt-1 text-sm md:text-base">
                Protect and track your freelance agreements
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </Button>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700 hidden md:block">John Doe</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 mx-auto max-w-7xl px-4 md:px-6 py-6 md:py-8">
        {/* Quick Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          <Card className="bg-white border-gray-200 hover:shadow-md transition-shadow">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Contracts</p>
                  <p className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">24</p>
                  <p className="text-xs text-gray-500 mt-1">+3 this month</p>
                </div>
                <div className="h-10 w-10 md:h-12 md:w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 hover:shadow-md transition-shadow">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Contracts</p>
                  <p className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">8</p>
                  <p className="text-xs text-gray-500 mt-1">2 pending approval</p>
                </div>
                <div className="h-10 w-10 md:h-12 md:w-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5 md:h-6 md:w-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 hover:shadow-md transition-shadow">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Signatures</p>
                  <p className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">3</p>
                  <p className="text-xs text-gray-500 mt-1">Awaiting client review</p>
                </div>
                <div className="h-10 w-10 md:h-12 md:w-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-5 w-5 md:h-6 md:w-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 hover:shadow-md transition-shadow">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Dispute Protection</p>
                  <p className="text-lg md:text-3xl font-bold text-gray-900 mt-2">Active</p>
                  <p className="text-xs text-emerald-600 mt-1">All contracts covered</p>
                </div>
                <div className="h-10 w-10 md:h-12 md:w-12 bg-violet-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 md:h-6 md:w-6 text-violet-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            {/* Create Protection Section */}
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5 text-emerald-600" />
                  Create New Protected Agreement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Client Name</label>
                    <input
                      type="text"
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Enter client name"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Project Title</label>
                    <input
                      type="text"
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Enter project title"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Payment Amount</label>
                    <input
                      type="text"
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="$0.00"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Contract Duration</label>
                    <input
                      type="text"
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="e.g., 3 months"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Milestones</label>
                  <textarea
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    rows={3}
                    placeholder="List project milestones..."
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Upload Proof / Files</label>
                  <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-emerald-500 transition-colors">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Drop files here or click to upload</p>
                    <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX up to 10MB</p>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600">
                  Generate Protection Contract
                </Button>
              </CardContent>
            </Card>

            {/* Active Contracts Table */}
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle>Active Contracts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-gray-700">Client Name</th>
                        <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-gray-700">Project</th>
                        <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-gray-700">Amount</th>
                        <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-gray-700">Status</th>
                        <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-gray-700 hidden md:table-cell">Last Update</th>
                        <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockContracts.map((contract) => (
                        <tr key={contract.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm text-gray-900">{contract.client}</td>
                          <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm text-gray-600">{contract.project}</td>
                          <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-gray-900">{contract.amount}</td>
                          <td className="py-2 md:py-3 px-2 md:px-4">
                            <Badge
                              variant={
                                contract.status === "Protected"
                                  ? "default"
                                  : contract.status === "Pending"
                                  ? "secondary"
                                  : "outline"
                              }
                              className={
                                contract.status === "Protected"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : contract.status === "Pending"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-gray-100 text-gray-800"
                              }
                            >
                              {contract.status}
                            </Badge>
                          </td>
                          <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm text-gray-600 hidden md:table-cell">{contract.lastUpdate}</td>
                          <td className="py-2 md:py-3 px-2 md:px-4">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
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

          {/* Side Panel */}
          <div className="space-y-6 md:space-y-8">
            {/* Protection Status Panel */}
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-emerald-600" />
                  Protection Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Current Protection Level</span>
                    <span className="text-sm font-bold text-emerald-600">Premium</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 bg-emerald-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700">Payment Security</p>
                      <p className="text-xs text-gray-500">All payments escrow protected</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 bg-emerald-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700">Contract Validity</p>
                      <p className="text-xs text-gray-500">All agreements verified</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 bg-amber-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700">Risk Alert</p>
                      <p className="text-xs text-gray-500">1 contract needs review</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Contract Validity</span>
                    <span className="text-sm font-medium text-gray-900">28 days left</span>
                  </div>
                  <Progress value={70} className="h-1 mt-2" />
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity Feed */}
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-600" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => {
                    const Icon = activity.icon;
                    return (
                      <div key={activity.id} className="flex items-start gap-3">
                        <div className={`h-8 w-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0`}>
                          <Icon className={`h-4 w-4 ${activity.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                          <p className="text-xs text-gray-600 mt-1">{activity.detail}</p>
                          <p className="text-xs text-gray-500 mt-2">{activity.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
