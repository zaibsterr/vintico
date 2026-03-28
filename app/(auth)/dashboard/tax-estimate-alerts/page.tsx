"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, DollarSign, Calendar, Bell, TrendingUp, AlertCircle, CheckCircle, Plus, Calculator } from "lucide-react";

interface IncomeEntry {
  id: string;
  project: string;
  amount: number;
  date: string;
}

interface TaxBracket {
  country: string;
  rate: number;
  minIncome: number;
  maxIncome?: number;
}

const taxBrackets: TaxBracket[] = [
  { country: "United States", rate: 22, minIncome: 0, maxIncome: 50000 },
  { country: "United States", rate: 24, minIncome: 50000, maxIncome: 100000 },
  { country: "United States", rate: 32, minIncome: 100000, maxIncome: 200000 },
  { country: "United States", rate: 35, minIncome: 200000, maxIncome: 500000 },
  { country: "United States", rate: 37, minIncome: 500000 },
  { country: "Canada", rate: 15, minIncome: 0, maxIncome: 55000 },
  { country: "Canada", rate: 20.5, minIncome: 55000, maxIncome: 111000 },
  { country: "Canada", rate: 26, minIncome: 111000, maxIncome: 173000 },
  { country: "Canada", rate: 29, minIncome: 173000, maxIncome: 246000 },
  { country: "Canada", rate: 33, minIncome: 246000 },
  { country: "United Kingdom", rate: 20, minIncome: 0, maxIncome: 50000 },
  { country: "United Kingdom", rate: 40, minIncome: 50000, maxIncome: 125000 },
  { country: "United Kingdom", rate: 45, minIncome: 125000 },
  { country: "Australia", rate: 19, minIncome: 0, maxIncome: 45000 },
  { country: "Australia", rate: 32.5, minIncome: 45000, maxIncome: 120000 },
  { country: "Australia", rate: 37, minIncome: 120000, maxIncome: 180000 },
  { country: "Australia", rate: 45, minIncome: 180000 },
];

const quarterlyDeadlines = [
  { quarter: "Q1", deadline: "April 15", description: "Jan 1 - Mar 31" },
  { quarter: "Q2", deadline: "June 15", description: "Apr 1 - May 31" },
  { quarter: "Q3", deadline: "September 15", description: "Jun 1 - Aug 31" },
  { quarter: "Q4", deadline: "January 15", description: "Sep 1 - Dec 31" },
];

export default function TaxEstimateAlerts() {
  const [incomeEntries, setIncomeEntries] = useState<IncomeEntry[]>([
    {
      id: "1",
      project: "Website Redesign",
      amount: 5000,
      date: "2024-03-01"
    },
    {
      id: "2",
      project: "Mobile App Development",
      amount: 12000,
      date: "2024-03-15"
    },
    {
      id: "3",
      project: "Brand Strategy",
      amount: 3500,
      date: "2024-02-20"
    }
  ]);

  const [newIncome, setNewIncome] = useState({
    project: "",
    amount: "",
    date: ""
  });

  const [selectedCountry, setSelectedCountry] = useState("United States");
  const [taxReserve, setTaxReserve] = useState(2000);

  const currentYear = new Date().getFullYear();
  const yearToDateIncome = incomeEntries.reduce((sum, entry) => sum + entry.amount, 0);
  
  const getTaxRate = (income: number, country: string): number => {
    const brackets = taxBrackets.filter(bracket => bracket.country === country);
    for (const bracket of brackets.sort((a, b) => a.minIncome - b.minIncome)) {
      if (income >= bracket.minIncome && (!bracket.maxIncome || income <= bracket.maxIncome)) {
        return bracket.rate;
      }
    }
    return brackets[0]?.rate || 20;
  };

  const taxRate = getTaxRate(yearToDateIncome, selectedCountry);
  const estimatedTax = yearToDateIncome * (taxRate / 100);
  const netIncome = yearToDateIncome - estimatedTax;
  const taxShortfall = Math.max(0, estimatedTax - taxReserve);
  const reservePercentage = Math.min((taxReserve / estimatedTax) * 100, 100);

  const handleAddIncome = () => {
    if (!newIncome.project || !newIncome.amount || !newIncome.date) return;

    const entry: IncomeEntry = {
      id: Date.now().toString(),
      project: newIncome.project,
      amount: parseFloat(newIncome.amount),
      date: newIncome.date
    };

    setIncomeEntries([entry, ...incomeEntries]);
    setNewIncome({ project: "", amount: "", date: "" });
  };

  const getNextQuarterDeadline = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentQuarter = Math.floor(currentMonth / 3) + 1;
    
    if (currentQuarter <= 4) {
      return quarterlyDeadlines[currentQuarter - 1];
    }
    return quarterlyDeadlines[0]; // Next year Q1
  };

  const getAlertLevel = () => {
    if (reservePercentage >= 100) return "good";
    if (reservePercentage >= 70) return "warning";
    return "danger";
  };

  const alertLevel = getAlertLevel();
  const nextDeadline = getNextQuarterDeadline();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Tax Estimate Alerts</h1>
        <p className="text-muted-foreground mt-1">
          Estimate upcoming tax obligations based on income.
        </p>
      </div>

      {/* Tax Overview Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">YTD Income</p>
                <p className="text-2xl font-bold text-green-600">${yearToDateIncome.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Calculator className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Estimated Tax</p>
                <p className="text-2xl font-bold text-blue-600">${estimatedTax.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Net Income</p>
                <p className="text-2xl font-bold text-purple-600">${netIncome.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertTriangle className={`h-8 w-8 ${
                alertLevel === "good" ? "text-green-600" :
                alertLevel === "warning" ? "text-amber-600" : "text-red-600"
              }`} />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Tax Reserve</p>
                <p className={`text-2xl font-bold ${
                  alertLevel === "good" ? "text-green-600" :
                  alertLevel === "warning" ? "text-amber-600" : "text-red-600"
                }`}>
                  ${taxReserve.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Income Tracker */}
      <Card>
        <CardHeader>
          <CardTitle>Income Tracker</CardTitle>
          <CardDescription>
            Track your freelance income for accurate tax estimation.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="project">Project</Label>
              <Input
                id="project"
                value={newIncome.project}
                onChange={(e) => setNewIncome({...newIncome, project: e.target.value})}
                placeholder="Enter project name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                value={newIncome.amount}
                onChange={(e) => setNewIncome({...newIncome, amount: e.target.value})}
                placeholder="0.00"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={newIncome.date}
                onChange={(e) => setNewIncome({...newIncome, date: e.target.value})}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={handleAddIncome} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Income
              </Button>
            </div>
          </div>

          {/* Income List */}
          <div className="space-y-2">
            {incomeEntries.map((entry) => (
              <div key={entry.id} className="flex items-center justify-between p-3 border rounded">
                <div>
                  <p className="font-medium">{entry.project}</p>
                  <p className="text-sm text-muted-foreground">{new Date(entry.date).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">${entry.amount.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tax Estimation */}
      <Card>
        <CardHeader>
          <CardTitle>Tax Estimation</CardTitle>
          <CardDescription>
            Calculate your estimated tax obligations based on your location and income.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="country">Country/Region</Label>
              <Select value={selectedCountry} onValueChange={(value: string) => setSelectedCountry(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="United States">United States</SelectItem>
                  <SelectItem value="Canada">Canada</SelectItem>
                  <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                  <SelectItem value="Australia">Australia</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tax-reserve">Current Tax Reserve ($)</Label>
              <Input
                id="tax-reserve"
                type="number"
                value={taxReserve}
                onChange={(e) => setTaxReserve(parseFloat(e.target.value) || 0)}
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">Tax Rate</h3>
              <p className="text-3xl font-bold text-blue-600">{taxRate}%</p>
              <p className="text-sm text-muted-foreground">Based on {selectedCountry} tax brackets</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">Estimated Tax</h3>
              <p className="text-3xl font-bold text-orange-600">${estimatedTax.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">For current year income</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">Net Income</h3>
              <p className="text-3xl font-bold text-green-600">${netIncome.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">After estimated taxes</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-base font-medium">Tax Reserve Coverage</Label>
              <span className="text-sm font-medium">{reservePercentage.toFixed(1)}%</span>
            </div>
            <Progress value={reservePercentage} className="h-2" />
            <p className="text-sm text-muted-foreground">
              {reservePercentage >= 100 ? "Your tax reserve fully covers estimated taxes." :
               reservePercentage >= 70 ? "Your tax reserve partially covers estimated taxes." :
               "Your tax reserve is insufficient for estimated taxes."}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Tax Alerts</CardTitle>
          <CardDescription>
            Important notifications about your tax obligations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {taxShortfall > 0 && (
              <div className="border rounded-lg p-4 bg-red-50 border-red-200">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <div>
                    <h3 className="font-semibold text-red-800">Tax Reserve Alert</h3>
                    <p className="text-red-700">
                      You should set aside ${taxShortfall.toLocaleString()} more for taxes to meet your estimated obligation.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {taxShortfall === 0 && reservePercentage >= 100 && (
              <div className="border rounded-lg p-4 bg-green-50 border-green-200">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <h3 className="font-semibold text-green-800">Tax Reserve Adequate</h3>
                    <p className="text-green-700">
                      Your tax reserve fully covers your estimated tax obligations. Great job planning ahead!
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="border rounded-lg p-4 bg-blue-50 border-blue-200">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-blue-800">Upcoming Quarterly Deadline</h3>
                  <p className="text-blue-700">
                    {nextDeadline.quarter} payment due {nextDeadline.deadline} ({nextDeadline.description})
                  </p>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4 bg-amber-50 border-amber-200">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-amber-600" />
                <div>
                  <h3 className="font-semibold text-amber-800">Tax Planning Reminder</h3>
                  <p className="text-amber-700">
                    Consider contributing to retirement accounts or making business purchases to reduce your taxable income.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quarterly Tax Reminders */}
      <Card>
        <CardHeader>
          <CardTitle>Quarterly Tax Deadlines</CardTitle>
          <CardDescription>
            Important dates for quarterly estimated tax payments.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {quarterlyDeadlines.map((deadline, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{deadline.quarter} - {deadline.deadline}</h3>
                    <p className="text-sm text-muted-foreground">{deadline.description}</p>
                  </div>
                  <Badge variant="outline">
                    {index === 0 ? "Next" : index === 1 ? "Upcoming" : "Future"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold mb-2">Tax Tips</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Set aside 25-30% of each payment for taxes</li>
              <li>• Pay quarterly to avoid penalties</li>
              <li>• Keep detailed records of all income and expenses</li>
              <li>• Consider consulting a tax professional for complex situations</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
