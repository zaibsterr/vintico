"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarIcon, DollarSign, Mail, Phone, MessageSquare, AlertCircle, CheckCircle, Clock, Send, FileText } from "lucide-react";

interface Invoice {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  projectName: string;
  amount: number;
  dueDate: string;
  paymentMethod: string;
  status: "paid" | "pending" | "overdue";
  createdAt: string;
}

interface AutomationSettings {
  reminderDays: number[];
  channels: {
    email: boolean;
    sms: boolean;
  };
}

export default function InvoiceRecoveryAutomation() {
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: "1",
      clientName: "Acme Corporation",
      clientEmail: "billing@acme.com",
      clientPhone: "+1-555-0123",
      projectName: "Website Redesign",
      amount: 5000,
      dueDate: "2024-04-15",
      paymentMethod: "Bank Transfer",
      status: "pending",
      createdAt: "2024-03-15"
    },
    {
      id: "2", 
      clientName: "Tech Startup LLC",
      clientEmail: "finance@techstartup.com",
      clientPhone: "+1-555-0456",
      projectName: "Mobile App Development",
      amount: 12000,
      dueDate: "2024-03-20",
      paymentMethod: "Stripe",
      status: "overdue",
      createdAt: "2024-02-20"
    },
    {
      id: "3",
      clientName: "Marketing Agency",
      clientEmail: "accounts@marketingagency.com",
      clientPhone: "+1-555-0789",
      projectName: "Brand Strategy",
      amount: 3500,
      dueDate: "2024-03-10",
      paymentMethod: "PayPal",
      status: "paid",
      createdAt: "2024-02-10"
    }
  ]);

  const [newInvoice, setNewInvoice] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    projectName: "",
    amount: "",
    dueDate: "",
    paymentMethod: ""
  });

  const [automationSettings, setAutomationSettings] = useState<AutomationSettings>({
    reminderDays: [3, 7, 14],
    channels: {
      email: true,
      sms: false
    }
  });

  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleCreateInvoice = () => {
    if (!newInvoice.clientName || !newInvoice.amount || !newInvoice.dueDate) return;

    const invoice: Invoice = {
      id: Date.now().toString(),
      clientName: newInvoice.clientName,
      clientEmail: newInvoice.clientEmail,
      clientPhone: newInvoice.clientPhone,
      projectName: newInvoice.projectName,
      amount: parseFloat(newInvoice.amount),
      dueDate: newInvoice.dueDate,
      paymentMethod: newInvoice.paymentMethod,
      status: "pending",
      createdAt: new Date().toISOString().split('T')[0]
    };

    setInvoices([invoice, ...invoices]);
    setNewInvoice({
      clientName: "",
      clientEmail: "",
      clientPhone: "",
      projectName: "",
      amount: "",
      dueDate: "",
      paymentMethod: ""
    });
    setShowCreateForm(false);
  };

  const handleSendReminder = (invoiceId: string) => {
    console.log(`Sending reminder for invoice ${invoiceId}`);
    // In a real app, this would trigger email/SMS sending
  };

  const handleSendFinalNotice = (invoiceId: string) => {
    console.log(`Sending final notice for invoice ${invoiceId}`);
    // In a real app, this would send a final notice
  };

  const handleEscalateRecovery = (invoiceId: string) => {
    console.log(`Escalating recovery for invoice ${invoiceId}`);
    // In a real app, this would escalate to collections or legal
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "bg-green-100 text-green-800 border-green-200";
      case "pending": return "bg-blue-100 text-blue-800 border-blue-200";
      case "overdue": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid": return <CheckCircle className="h-4 w-4" />;
      case "pending": return <Clock className="h-4 w-4" />;
      case "overdue": return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  const totalAmount = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const paidAmount = invoices.filter(inv => inv.status === "paid").reduce((sum, inv) => sum + inv.amount, 0);
  const pendingAmount = invoices.filter(inv => inv.status === "pending").reduce((sum, inv) => sum + inv.amount, 0);
  const overdueAmount = invoices.filter(inv => inv.status === "overdue").reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Invoice Recovery Automation</h1>
        <p className="text-muted-foreground mt-1">
          Automatically recover unpaid invoices with smart reminders.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-muted-foreground" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Invoiced</p>
                <p className="text-2xl font-bold">${totalAmount.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Paid</p>
                <p className="text-2xl font-bold text-green-600">${paidAmount.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-blue-600">${pendingAmount.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertCircle className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Overdue</p>
                <p className="text-2xl font-bold text-red-600">${overdueAmount.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create New Invoice Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Create New Invoice</CardTitle>
              <CardDescription>
                Add a new invoice to track and automate payment recovery.
              </CardDescription>
            </div>
            <Button onClick={() => setShowCreateForm(!showCreateForm)}>
              {showCreateForm ? "Cancel" : "New Invoice"}
            </Button>
          </div>
        </CardHeader>
        {showCreateForm && (
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="clientName">Client Name *</Label>
                <Input
                  id="clientName"
                  value={newInvoice.clientName}
                  onChange={(e) => setNewInvoice({...newInvoice, clientName: e.target.value})}
                  placeholder="Enter client name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientEmail">Client Email</Label>
                <Input
                  id="clientEmail"
                  type="email"
                  value={newInvoice.clientEmail}
                  onChange={(e) => setNewInvoice({...newInvoice, clientEmail: e.target.value})}
                  placeholder="client@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientPhone">Client Phone</Label>
                <Input
                  id="clientPhone"
                  value={newInvoice.clientPhone}
                  onChange={(e) => setNewInvoice({...newInvoice, clientPhone: e.target.value})}
                  placeholder="+1-555-0123"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="projectName">Project Name</Label>
                <Input
                  id="projectName"
                  value={newInvoice.projectName}
                  onChange={(e) => setNewInvoice({...newInvoice, projectName: e.target.value})}
                  placeholder="Enter project name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Invoice Amount *</Label>
                <Input
                  id="amount"
                  type="number"
                  value={newInvoice.amount}
                  onChange={(e) => setNewInvoice({...newInvoice, amount: e.target.value})}
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date *</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newInvoice.dueDate}
                  onChange={(e) => setNewInvoice({...newInvoice, dueDate: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <Select value={newInvoice.paymentMethod} onValueChange={(value: string) => setNewInvoice({...newInvoice, paymentMethod: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PayPal">PayPal</SelectItem>
                    <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                    <SelectItem value="Stripe">Stripe</SelectItem>
                    <SelectItem value="Custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={handleCreateInvoice} className="w-full">
              Create Invoice
            </Button>
          </CardContent>
        )}
      </Card>

      {/* Automation Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Automation Settings</CardTitle>
          <CardDescription>
            Configure when and how to send payment reminders.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="text-base font-medium">Send reminder after:</Label>
            <div className="mt-3 space-y-2">
              {[3, 7, 14].map((days) => (
                <div key={days} className="flex items-center space-x-2">
                  <Checkbox
                    id={`days-${days}`}
                    checked={automationSettings.reminderDays.includes(days)}
                    onCheckedChange={(checked: boolean) => {
                      if (checked) {
                        setAutomationSettings({
                          ...automationSettings,
                          reminderDays: [...automationSettings.reminderDays, days]
                        });
                      } else {
                        setAutomationSettings({
                          ...automationSettings,
                          reminderDays: automationSettings.reminderDays.filter(d => d !== days)
                        });
                      }
                    }}
                  />
                  <Label htmlFor={`days-${days}`} className="text-sm">
                    {days} days
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-base font-medium">Channels:</Label>
            <div className="mt-3 space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="email-reminder"
                  checked={automationSettings.channels.email}
                  onCheckedChange={(checked: boolean) => {
                    setAutomationSettings({
                      ...automationSettings,
                      channels: {
                        ...automationSettings.channels,
                        email: checked as boolean
                      }
                    });
                  }}
                />
                <Label htmlFor="email-reminder" className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4" />
                  Email reminder
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="sms-reminder"
                  checked={automationSettings.channels.sms}
                  onCheckedChange={(checked: boolean) => {
                    setAutomationSettings({
                      ...automationSettings,
                      channels: {
                        ...automationSettings.channels,
                        sms: checked as boolean
                      }
                    });
                  }}
                />
                <Label htmlFor="sms-reminder" className="flex items-center gap-2 text-sm">
                  <MessageSquare className="h-4 w-4" />
                  SMS reminder
                </Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Invoice Status Tracker */}
      <Card>
        <CardHeader>
          <CardTitle>Invoice Status Tracker</CardTitle>
          <CardDescription>
            Monitor all your invoices and their payment status.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <h3 className="font-semibold">{invoice.clientName}</h3>
                      <p className="text-sm text-muted-foreground">{invoice.projectName}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className={getStatusColor(invoice.status)}>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(invoice.status)}
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </div>
                  </Badge>
                </div>
                
                <div className="grid gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount:</span>
                    <span className="font-medium">${invoice.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Due Date:</span>
                    <span className={`font-medium ${isOverdue(invoice.dueDate) ? "text-red-600" : ""}`}>
                      {new Date(invoice.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payment Method:</span>
                    <span className="font-medium">{invoice.paymentMethod}</span>
                  </div>
                </div>

                {/* Recovery Actions */}
                {invoice.status !== "paid" && (
                  <div className="flex gap-2 pt-2 border-t">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleSendReminder(invoice.id)}
                      className="flex items-center gap-1"
                    >
                      <Send className="h-3 w-3" />
                      Send Reminder
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleSendFinalNotice(invoice.id)}
                      className="flex items-center gap-1"
                    >
                      <AlertCircle className="h-3 w-3" />
                      Final Notice
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => handleEscalateRecovery(invoice.id)}
                      className="flex items-center gap-1"
                    >
                      <AlertCircle className="h-3 w-3" />
                      Escalate
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
