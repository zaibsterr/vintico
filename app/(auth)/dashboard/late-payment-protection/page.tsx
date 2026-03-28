"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, DollarSign, Calendar, Shield, AlertCircle, Send, FileText, Clock, CheckCircle } from "lucide-react";

interface ClientPayment {
  id: string;
  client: string;
  project: string;
  invoiceAmount: number;
  dueDate: string;
  status: "paid" | "pending" | "overdue" | "late-fee-applied";
  daysOverdue: number;
  lateFee?: number;
}

interface LateFeeSettings {
  feeAfter7Days: number;
  feeAfter14Days: number;
  enableAutomaticFees: boolean;
}

export default function LatePaymentProtection() {
  const [clientPayments, setClientPayments] = useState<ClientPayment[]>([
    {
      id: "1",
      client: "Acme Corporation",
      project: "Website Redesign",
      invoiceAmount: 5000,
      dueDate: "2024-03-10",
      status: "late-fee-applied",
      daysOverdue: 18,
      lateFee: 500
    },
    {
      id: "2",
      client: "Tech Startup LLC",
      project: "Mobile App Development",
      invoiceAmount: 12000,
      dueDate: "2024-03-20",
      status: "overdue",
      daysOverdue: 8,
      lateFee: 600
    },
    {
      id: "3",
      client: "Marketing Agency",
      project: "Brand Strategy",
      invoiceAmount: 3500,
      dueDate: "2024-03-25",
      status: "pending",
      daysOverdue: 3
    },
    {
      id: "4",
      client: "E-commerce Store",
      project: "Product Photography",
      invoiceAmount: 2800,
      dueDate: "2024-04-05",
      status: "paid",
      daysOverdue: 0
    },
    {
      id: "5",
      client: "Consulting Firm",
      project: "Market Research",
      invoiceAmount: 7500,
      dueDate: "2024-03-15",
      status: "overdue",
      daysOverdue: 13,
      lateFee: 1125
    }
  ]);

  const [lateFeeSettings, setLateFeeSettings] = useState<LateFeeSettings>({
    feeAfter7Days: 5,
    feeAfter14Days: 10,
    enableAutomaticFees: true
  });

  const calculateDaysOverdue = (dueDate: string): number => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = today.getTime() - due.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const calculateLateFee = (amount: number, daysOverdue: number): number => {
    if (daysOverdue >= 14) {
      return amount * (lateFeeSettings.feeAfter14Days / 100);
    } else if (daysOverdue >= 7) {
      return amount * (lateFeeSettings.feeAfter7Days / 100);
    }
    return 0;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "bg-green-100 text-green-800 border-green-200";
      case "pending": return "bg-blue-100 text-blue-800 border-blue-200";
      case "overdue": return "bg-red-100 text-red-800 border-red-200";
      case "late-fee-applied": return "bg-orange-100 text-orange-800 border-orange-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid": return <CheckCircle className="h-4 w-4" />;
      case "pending": return <Clock className="h-4 w-4" />;
      case "overdue": return <AlertTriangle className="h-4 w-4" />;
      case "late-fee-applied": return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const handleSendLateFeeNotice = (paymentId: string) => {
    console.log(`Sending late fee notice for payment ${paymentId}`);
    setClientPayments(prev => prev.map(payment => 
      payment.id === paymentId 
        ? { ...payment, status: "overdue" as const }
        : payment
    ));
  };

  const handleApplyLateFee = (paymentId: string) => {
    const payment = clientPayments.find(p => p.id === paymentId);
    if (payment) {
      const lateFee = calculateLateFee(payment.invoiceAmount, payment.daysOverdue);
      setClientPayments(prev => prev.map(p => 
        p.id === paymentId 
          ? { ...p, status: "late-fee-applied" as const, lateFee }
          : p
      ));
    }
  };

  const handleSendLegalReminder = (paymentId: string) => {
    console.log(`Sending legal reminder for payment ${paymentId}`);
    // In a real app, this would send a legal notice
  };

  const totalOverdueAmount = clientPayments
    .filter(p => p.status === "overdue" || p.status === "late-fee-applied")
    .reduce((sum, p) => sum + p.invoiceAmount + (p.lateFee || 0), 0);

  const totalLateFees = clientPayments
    .reduce((sum, p) => sum + (p.lateFee || 0), 0);

  const overdueCount = clientPayments.filter(p => 
    p.status === "overdue" || p.status === "late-fee-applied"
  ).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Late Payment Protection</h1>
        <p className="text-muted-foreground mt-1">
          Track overdue payments and enforce protection rules.
        </p>
      </div>

      {/* Protection Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Overdue Invoices</p>
                <p className="text-2xl font-bold text-red-600">{overdueCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Overdue</p>
                <p className="text-2xl font-bold text-orange-600">${totalOverdueAmount.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Late Fees Applied</p>
                <p className="text-2xl font-bold text-purple-600">${totalLateFees.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Client Payments */}
      <Card>
        <CardHeader>
          <CardTitle>Active Client Payments</CardTitle>
          <CardDescription>
            Monitor all client invoices and their payment status.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Invoice Amount</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Days Overdue</TableHead>
                <TableHead>Late Fee</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clientPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.client}</TableCell>
                  <TableCell>{payment.project}</TableCell>
                  <TableCell>${payment.invoiceAmount.toLocaleString()}</TableCell>
                  <TableCell>{new Date(payment.dueDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(payment.status)}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(payment.status)}
                        {payment.status.replace("-", " ").charAt(0).toUpperCase() + payment.status.replace("-", " ").slice(1)}
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {payment.daysOverdue > 0 ? (
                      <span className="text-red-600 font-medium">{payment.daysOverdue} days</span>
                    ) : (
                      <span className="text-green-600">On time</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {payment.lateFee ? (
                      <span className="text-orange-600 font-medium">${payment.lateFee.toLocaleString()}</span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {payment.status === "overdue" && (
                        <>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleSendLateFeeNotice(payment.id)}
                            className="flex items-center gap-1"
                          >
                            <Send className="h-3 w-3" />
                            Notice
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleApplyLateFee(payment.id)}
                            className="flex items-center gap-1"
                          >
                            <DollarSign className="h-3 w-3" />
                            Apply Fee
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleSendLegalReminder(payment.id)}
                            className="flex items-center gap-1"
                          >
                            <AlertCircle className="h-3 w-3" />
                            Legal
                          </Button>
                        </>
                      )}
                      {payment.status === "pending" && payment.daysOverdue > 0 && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleSendLateFeeNotice(payment.id)}
                          className="flex items-center gap-1"
                        >
                          <Send className="h-3 w-3" />
                          Reminder
                        </Button>
                      )}
                      {payment.status === "paid" && (
                        <Badge variant="outline" className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Paid
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Overdue Detection */}
      <Card>
        <CardHeader>
          <CardTitle>Overdue Detection</CardTitle>
          <CardDescription>
            Automatic detection and highlighting of overdue payments.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {clientPayments
              .filter(p => p.status === "overdue" || p.status === "late-fee-applied")
              .map((payment) => (
                <div key={payment.id} className="border rounded-lg p-4 bg-red-50 border-red-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      <div>
                        <h3 className="font-semibold text-red-800">{payment.client}</h3>
                        <p className="text-sm text-red-600">{payment.project} - {payment.daysOverdue} days overdue</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-red-800">${(payment.invoiceAmount + (payment.lateFee || 0)).toLocaleString()}</p>
                      <p className="text-sm text-red-600">
                        {payment.lateFee ? `Includes $${payment.lateFee.toLocaleString()} late fee` : 'Late fee not applied'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            
            {clientPayments.filter(p => p.status === "overdue" || p.status === "late-fee-applied").length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <CheckCircle className="h-12 w-12 mx-auto mb-2 text-green-500" />
                <p>No overdue payments detected</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Protection Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Protection Actions</CardTitle>
          <CardDescription>
            Available actions to enforce payment discipline.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <Send className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold">Send Late Fee Notice</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Send a formal notification that late fees will be applied if payment is not received.
              </p>
              <Button variant="outline" className="w-full">
                Send Notice
              </Button>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <DollarSign className="h-5 w-5 text-orange-600" />
                <h3 className="font-semibold">Apply Late Fee</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Automatically calculate and apply late fees based on your configured settings.
              </p>
              <Button variant="outline" className="w-full">
                Apply Fees
              </Button>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <h3 className="font-semibold">Send Legal Reminder</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Send a final legal notice before escalating to collections or legal action.
              </p>
              <Button variant="destructive" className="w-full">
                Legal Notice
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Late Fee Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Late Fee Settings</CardTitle>
          <CardDescription>
            Configure your late fee structure and automatic enforcement rules.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fee-7-days">Late Fee After 7 Days (%)</Label>
              <Input
                id="fee-7-days"
                type="number"
                value={lateFeeSettings.feeAfter7Days}
                onChange={(e) => setLateFeeSettings({...lateFeeSettings, feeAfter7Days: parseFloat(e.target.value) || 0})}
                placeholder="5"
                min="0"
                max="50"
              />
              <p className="text-sm text-muted-foreground">
                {lateFeeSettings.feeAfter7Days}% fee applied 7 days after due date
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="fee-14-days">Late Fee After 14 Days (%)</Label>
              <Input
                id="fee-14-days"
                type="number"
                value={lateFeeSettings.feeAfter14Days}
                onChange={(e) => setLateFeeSettings({...lateFeeSettings, feeAfter14Days: parseFloat(e.target.value) || 0})}
                placeholder="10"
                min="0"
                max="50"
              />
              <p className="text-sm text-muted-foreground">
                {lateFeeSettings.feeAfter14Days}% fee applied 14 days after due date
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="auto-fees"
                checked={lateFeeSettings.enableAutomaticFees}
                onChange={(e) => setLateFeeSettings({...lateFeeSettings, enableAutomaticFees: e.target.checked})}
                className="rounded"
              />
              <Label htmlFor="auto-fees">Enable automatic late fee application</Label>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded p-4">
              <h4 className="font-medium text-blue-800 mb-2">Fee Structure Preview</h4>
              <div className="space-y-1 text-sm text-blue-700">
                <p>• Example: $1,000 invoice</p>
                <p>• After 7 days: ${(1000 * lateFeeSettings.feeAfter7Days / 100).toFixed(2)} fee</p>
                <p>• After 14 days: ${(1000 * lateFeeSettings.feeAfter14Days / 100).toFixed(2)} fee</p>
              </div>
            </div>
          </div>

          <Button className="w-full">
            Save Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
