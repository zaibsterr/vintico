"use client";

import { useState } from "react";
import {
  MessageSquare,
  Plus,
  Download,
  Send,
  Clock,
  CheckCircle,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const mockQuotes = [
  {
    id: 1,
    client: "Jerry",
    phone: "+12896551429",
    amount: "$70",
    status: "Sent",
    date: "3/26/2026",
  },
  {
    id: 2,
    client: "Sarah",
    phone: "+15551234567",
    amount: "$150",
    status: "Pending",
    date: "3/25/2026",
  },
  {
    id: 3,
    client: "Mike",
    phone: "+18889997777",
    amount: "$95",
    status: "Won",
    date: "3/24/2026",
  },
  {
    id: 4,
    client: "Emily",
    phone: "+12223334444",
    amount: "$200",
    status: "Sent",
    date: "3/23/2026",
  },
  {
    id: 5,
    client: "David",
    phone: "+14445556666",
    amount: "$85",
    status: "Pending",
    date: "3/22/2026",
  },
];

export default function QuoteNudgeDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    quoteAmount: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsModalOpen(false);
    setFormData({
      customerName: "",
      customerPhone: "",
      quoteAmount: "",
      message: "",
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Dashboard Header */}
        <header className="bg-white border-b border-gray-200 px-4 md:px-8 py-4 md:py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">QuoteNudge</h1>
              <p className="text-gray-600 mt-1 text-sm md:text-base">
                Manage quotes, track follow-ups, and convert leads into paying clients.
              </p>
            </div>
            <div className="flex items-center">
              <Badge className="bg-green-100 text-green-800 border-green-200 text-xs md:text-sm">
                Module Active
              </Badge>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4 md:p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
            <Card className="bg-white border-gray-200 rounded-lg shadow-sm">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Quotes Sent</p>
                    <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">47</p>
                  </div>
                  <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Send className="h-4 w-4 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 rounded-lg shadow-sm">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending Follow-Ups</p>
                    <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">12</p>
                  </div>
                  <div className="h-8 w-8 bg-amber-100 rounded-lg flex items-center justify-center">
                    <Clock className="h-4 w-4 text-amber-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 rounded-lg shadow-sm">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Deals Won</p>
                    <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">23</p>
                  </div>
                  <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 rounded-lg shadow-sm">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Credits Remaining</p>
                    <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">850</p>
                  </div>
                  <div className="h-8 w-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="h-4 w-4 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6 md:mb-8">
            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 md:px-6 py-2 flex items-center justify-center gap-2 text-sm md:text-base"
            >
              <Plus className="h-4 w-4" />
              New Quote
            </Button>
            <Button
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg px-4 md:px-6 py-2 flex items-center justify-center gap-2 text-sm md:text-base"
            >
              <Download className="h-4 w-4" />
              Export PDF
            </Button>
          </div>

          {/* Quotes Table */}
          <Card className="bg-white border-gray-200 rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Quotes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-gray-700">Client</th>
                      <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-gray-700 hidden sm:table-cell">Phone</th>
                      <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-gray-700">Amount</th>
                      <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-gray-700">Status</th>
                      <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-gray-700">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockQuotes.map((quote) => (
                      <tr key={quote.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm text-gray-900">{quote.client}</td>
                        <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm text-gray-600 hidden sm:table-cell">{quote.phone}</td>
                        <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-gray-900">{quote.amount}</td>
                        <td className="py-2 md:py-3 px-2 md:px-4">
                          <Badge
                            variant={
                              quote.status === "Won"
                                ? "default"
                                : quote.status === "Pending"
                                ? "secondary"
                                : "outline"
                            }
                            className={
                              quote.status === "Won"
                                ? "bg-green-100 text-green-800 border-green-200"
                                : quote.status === "Pending"
                                ? "bg-amber-100 text-amber-800 border-amber-200"
                                : "bg-blue-100 text-blue-800 border-blue-200"
                            }
                          >
                            {quote.status}
                          </Badge>
                        </td>
                        <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm text-gray-600">{quote.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Send Quote Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md mx-4">
          <DialogHeader>
            <DialogTitle className="text-base md:text-lg font-semibold text-gray-900">
              Send a Quote
            </DialogTitle>
            <DialogDescription className="text-gray-600 text-sm md:text-base">
              Fill in the details below to send a quote via SMS.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Customer Name</label>
              <input
                type="text"
                required
                className="mt-1 w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter customer name"
                value={formData.customerName}
                onChange={(e) => handleInputChange("customerName", e.target.value)}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700">Customer Phone Number</label>
              <input
                type="tel"
                required
                className="mt-1 w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="+1234567890"
                value={formData.customerPhone}
                onChange={(e) => handleInputChange("customerPhone", e.target.value)}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700">Quote Amount ($)</label>
              <input
                type="number"
                required
                className="mt-1 w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="0.00"
                value={formData.quoteAmount}
                onChange={(e) => handleInputChange("quoteAmount", e.target.value)}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700">Message</label>
              <textarea
                required
                className="mt-1 w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={4}
                placeholder="Enter your quote message..."
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
              />
            </div>
            
            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 flex items-center justify-center gap-2 text-sm md:text-base"
              >
                <Send className="h-4 w-4" />
                Send Quote
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg py-2 text-sm md:text-base"
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
