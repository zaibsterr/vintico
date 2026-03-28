"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  MessageSquare, 
  Mail, 
  Phone, 
  Calendar, 
  DollarSign, 
  Send, 
  Clock, 
  Bot, 
  Settings, 
  Play, 
  Pause, 
  Edit,
  Plus,
  User,
  FileText
} from "lucide-react";

interface FollowUpCampaign {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  projectName: string;
  quoteValue: string;
  quoteSentDate: string;
  followUpSequence: FollowUpMessage[];
  smsEnabled: boolean;
  emailEnabled: boolean;
  status: "active" | "paused" | "completed";
  createdAt: string;
}

interface FollowUpMessage {
  id: string;
  order: number;
  delayHours: number;
  message: string;
  sent?: boolean;
  sentAt?: string;
}

export default function AutomatedFollowUpMessaging() {
  const [campaigns, setCampaigns] = useState<FollowUpCampaign[]>([
    {
      id: "1",
      clientName: "Acme Corporation",
      clientEmail: "contact@acme.com",
      clientPhone: "+1-555-0123",
      projectName: "Website Redesign",
      quoteValue: "15000",
      quoteSentDate: "2024-03-20",
      followUpSequence: [
        { id: "1", order: 1, delayHours: 36, message: "Hi {{client_name}}, just checking if you had time to review the proposal I sent earlier." },
        { id: "2", order: 2, delayHours: 96, message: "Following up on the {{project_name}} proposal. Do you have any questions I can help clarify?" },
        { id: "3", order: 3, delayHours: 216, message: "Hi {{client_name}}, I wanted to make sure you received the quote for {{project_name}}. Is this still something you're considering?" }
      ],
      smsEnabled: true,
      emailEnabled: true,
      status: "active",
      createdAt: "2024-03-20"
    },
    {
      id: "2",
      clientName: "Tech Startup LLC",
      clientEmail: "founder@techstartup.com",
      clientPhone: "+1-555-0456",
      projectName: "Mobile App Development",
      quoteValue: "25000",
      quoteSentDate: "2024-03-18",
      followUpSequence: [
        { id: "1", order: 1, delayHours: 48, message: "Hi {{client_name}}, hope you had a chance to review the mobile app development proposal." },
        { id: "2", order: 2, delayHours: 120, message: "Following up on the {{project_name}} quote. I'm available to discuss any modifications you might need." }
      ],
      smsEnabled: false,
      emailEnabled: true,
      status: "paused",
      createdAt: "2024-03-18"
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<FollowUpCampaign | null>(null);
  const [editingMessage, setEditingMessage] = useState<string | null>(null);

  const [newCampaign, setNewCampaign] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    projectName: "",
    quoteValue: "",
    quoteSentDate: ""
  });

  const [newFollowUpMessage, setNewFollowUpMessage] = useState({
    delayHours: "",
    message: ""
  });

  const handleCreateCampaign = () => {
    if (!newCampaign.clientName || !newCampaign.clientEmail || !newCampaign.projectName || !newCampaign.quoteValue) return;

    const campaign: FollowUpCampaign = {
      id: Date.now().toString(),
      clientName: newCampaign.clientName,
      clientEmail: newCampaign.clientEmail,
      clientPhone: newCampaign.clientPhone,
      projectName: newCampaign.projectName,
      quoteValue: newCampaign.quoteValue,
      quoteSentDate: newCampaign.quoteSentDate || new Date().toISOString().split('T')[0],
      followUpSequence: [
        { 
          id: "1", 
          order: 1, 
          delayHours: 36, 
          message: `Hi ${newCampaign.clientName}, just checking if you had time to review the proposal I sent earlier.` 
        }
      ],
      smsEnabled: true,
      emailEnabled: true,
      status: "active",
      createdAt: new Date().toISOString().split('T')[0]
    };

    setCampaigns([campaign, ...campaigns]);
    setNewCampaign({
      clientName: "",
      clientEmail: "",
      clientPhone: "",
      projectName: "",
      quoteValue: "",
      quoteSentDate: ""
    });
    setShowCreateForm(false);
  };

  const handleAddFollowUpMessage = (campaignId: string) => {
    if (!newFollowUpMessage.delayHours || !newFollowUpMessage.message) return;

    setCampaigns(prev => prev.map(campaign => {
      if (campaign.id === campaignId) {
        const newMessage: FollowUpMessage = {
          id: Date.now().toString(),
          order: campaign.followUpSequence.length + 1,
          delayHours: parseInt(newFollowUpMessage.delayHours),
          message: newFollowUpMessage.message
        };
        return {
          ...campaign,
          followUpSequence: [...campaign.followUpSequence, newMessage].sort((a, b) => a.delayHours - b.delayHours)
        };
      }
      return campaign;
    }));

    setNewFollowUpMessage({ delayHours: "", message: "" });
  };

  const handleUpdateMessage = (campaignId: string, messageId: string, newMessage: string) => {
    setCampaigns(prev => prev.map(campaign => {
      if (campaign.id === campaignId) {
        return {
          ...campaign,
          followUpSequence: campaign.followUpSequence.map(msg => 
            msg.id === messageId ? { ...msg, message: newMessage } : msg
          )
        };
      }
      return campaign;
    }));
    setEditingMessage(null);
  };

  const handleDeleteMessage = (campaignId: string, messageId: string) => {
    setCampaigns(prev => prev.map(campaign => {
      if (campaign.id === campaignId) {
        return {
          ...campaign,
          followUpSequence: campaign.followUpSequence.filter(msg => msg.id !== messageId)
        };
      }
      return campaign;
    }));
  };

  const handleToggleCampaign = (campaignId: string) => {
    setCampaigns(prev => prev.map(campaign => {
      if (campaign.id === campaignId) {
        return {
          ...campaign,
          status: campaign.status === "active" ? "paused" : "active"
        };
      }
      return campaign;
    }));
  };

  const handleToggleSMS = (campaignId: string, enabled: boolean) => {
    setCampaigns(prev => prev.map(campaign => {
      if (campaign.id === campaignId) {
        return { ...campaign, smsEnabled: enabled };
      }
      return campaign;
    }));
  };

  const handleToggleEmail = (campaignId: string, enabled: boolean) => {
    setCampaigns(prev => prev.map(campaign => {
      if (campaign.id === campaignId) {
        return { ...campaign, emailEnabled: enabled };
      }
      return campaign;
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800 border-green-200";
      case "paused": return "bg-amber-100 text-amber-800 border-amber-200";
      case "completed": return "bg-blue-100 text-blue-800 border-blue-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDelay = (hours: number) => {
    if (hours < 24) return `${hours} hours`;
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    return remainingHours > 0 ? `${days} days ${remainingHours} hours` : `${days} days`;
  };

  const totalActiveCampaigns = campaigns.filter(c => c.status === "active").length;
  const totalQuotesValue = campaigns.reduce((sum, c) => sum + parseFloat(c.quoteValue || "0"), 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Automated Follow-Up Messaging</h1>
        <p className="text-muted-foreground mt-1">
          Automatically follow up with clients after sending a quote.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Bot className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Active Campaigns</p>
                <p className="text-2xl font-bold text-blue-600">{totalActiveCampaigns}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Quote Value</p>
                <p className="text-2xl font-bold text-green-600">${totalQuotesValue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <MessageSquare className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Messages</p>
                <p className="text-2xl font-bold text-purple-600">
                  {campaigns.reduce((sum, c) => sum + c.followUpSequence.length, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create Follow-Up Campaign */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Create Follow-Up Campaign</CardTitle>
              <CardDescription>
                Set up automated follow-ups for a new quote.
              </CardDescription>
            </div>
            <Button onClick={() => setShowCreateForm(!showCreateForm)}>
              {showCreateForm ? "Cancel" : "New Campaign"}
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
                  value={newCampaign.clientName}
                  onChange={(e) => setNewCampaign({...newCampaign, clientName: e.target.value})}
                  placeholder="Enter client name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientEmail">Client Email *</Label>
                <Input
                  id="clientEmail"
                  type="email"
                  value={newCampaign.clientEmail}
                  onChange={(e) => setNewCampaign({...newCampaign, clientEmail: e.target.value})}
                  placeholder="client@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientPhone">Client Phone</Label>
                <Input
                  id="clientPhone"
                  value={newCampaign.clientPhone}
                  onChange={(e) => setNewCampaign({...newCampaign, clientPhone: e.target.value})}
                  placeholder="+1-555-0123"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="projectName">Project Name *</Label>
                <Input
                  id="projectName"
                  value={newCampaign.projectName}
                  onChange={(e) => setNewCampaign({...newCampaign, projectName: e.target.value})}
                  placeholder="Enter project name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quoteValue">Quote Value ($) *</Label>
                <Input
                  id="quoteValue"
                  type="number"
                  value={newCampaign.quoteValue}
                  onChange={(e) => setNewCampaign({...newCampaign, quoteValue: e.target.value})}
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quoteSentDate">Quote Sent Date</Label>
                <Input
                  id="quoteSentDate"
                  type="date"
                  value={newCampaign.quoteSentDate}
                  onChange={(e) => setNewCampaign({...newCampaign, quoteSentDate: e.target.value})}
                />
              </div>
            </div>
            <Button onClick={handleCreateCampaign} className="w-full">
              Create Campaign
            </Button>
          </CardContent>
        )}
      </Card>

      {/* Campaigns List */}
      <Card>
        <CardHeader>
          <CardTitle>Active Campaigns</CardTitle>
          <CardDescription>
            Click on a campaign to view and edit follow-up sequences.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {campaigns.map((campaign) => (
              <div 
                key={campaign.id}
                className={`border rounded-lg p-4 cursor-pointer transition-colors hover:bg-muted/50 ${
                  selectedCampaign?.id === campaign.id ? "border-primary bg-primary/5" : ""
                }`}
                onClick={() => setSelectedCampaign(campaign)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <h3 className="font-semibold">{campaign.clientName}</h3>
                      <p className="text-sm text-muted-foreground">{campaign.projectName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="font-semibold">${parseFloat(campaign.quoteValue).toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">{campaign.followUpSequence.length} messages</p>
                    </div>
                    <Badge variant="outline" className={getStatusColor(campaign.status)}>
                      {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Follow-Up Sequence Builder */}
      {selectedCampaign && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Follow-Up Sequence</CardTitle>
                <CardDescription>
                  Configure automated messages for {selectedCampaign.clientName}.
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleToggleCampaign(selectedCampaign.id)}
                >
                  {selectedCampaign.status === "active" ? (
                    <><Pause className="h-4 w-4 mr-1" /> Pause</>
                  ) : (
                    <><Play className="h-4 w-4 mr-1" /> Resume</>
                  )}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Add New Message */}
            <div className="border rounded-lg p-4 bg-muted/30">
              <h3 className="font-semibold mb-3">Add New Follow-Up</h3>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="delay-hours">Send After</Label>
                  <Select value={newFollowUpMessage.delayHours} onValueChange={(value: string) => setNewFollowUpMessage({...newFollowUpMessage, delayHours: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select delay" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="24">24 hours</SelectItem>
                      <SelectItem value="36">36 hours</SelectItem>
                      <SelectItem value="48">2 days</SelectItem>
                      <SelectItem value="72">3 days</SelectItem>
                      <SelectItem value="96">4 days</SelectItem>
                      <SelectItem value="120">5 days</SelectItem>
                      <SelectItem value="168">7 days</SelectItem>
                      <SelectItem value="216">9 days</SelectItem>
                      <SelectItem value="240">10 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message-text">Message</Label>
                  <Input
                    id="message-text"
                    value={newFollowUpMessage.message}
                    onChange={(e) => setNewFollowUpMessage({...newFollowUpMessage, message: e.target.value})}
                    placeholder="Enter follow-up message..."
                  />
                </div>
              </div>
              <Button 
                onClick={() => handleAddFollowUpMessage(selectedCampaign.id)}
                disabled={!newFollowUpMessage.delayHours || !newFollowUpMessage.message}
                className="mt-3"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Message
              </Button>
            </div>

            {/* Existing Messages */}
            <div className="space-y-3">
              {selectedCampaign.followUpSequence.map((message, index) => (
                <div key={message.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">
                        Follow-Up {index + 1}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        <Clock className="h-3 w-3 inline mr-1" />
                        {formatDelay(message.delayHours)}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setEditingMessage(editingMessage === message.id ? null : message.id)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteMessage(selectedCampaign.id, message.id)}
                      >
                        ×
                      </Button>
                    </div>
                  </div>
                  
                  {editingMessage === message.id ? (
                    <div className="space-y-2">
                      <Textarea
                        value={message.message}
                        onChange={(e) => handleUpdateMessage(selectedCampaign.id, message.id, e.target.value)}
                        rows={3}
                      />
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => setEditingMessage(null)}>
                          Save
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setEditingMessage(null)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm">{message.message}</p>
                  )}
                  
                  <div className="mt-2 text-xs text-muted-foreground">
                    Available variables: {"{{client_name}}"}, {"{{project_name}}"}, {"{{quote_value}}"}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Automation Toggle */}
      {selectedCampaign && (
        <Card>
          <CardHeader>
            <CardTitle>Automation Settings</CardTitle>
            <CardDescription>
              Configure which channels to use for follow-up messages.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                  <div>
                    <h3 className="font-semibold">SMS Follow-Up</h3>
                    <p className="text-sm text-muted-foreground">Send follow-up messages via SMS using Twilio</p>
                  </div>
                </div>
                <Checkbox
                  checked={selectedCampaign.smsEnabled}
                  onCheckedChange={(checked: boolean) => handleToggleSMS(selectedCampaign.id, checked)}
                />
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-green-600" />
                  <div>
                    <h3 className="font-semibold">Email Follow-Up</h3>
                    <p className="text-sm text-muted-foreground">Send follow-up messages via email</p>
                  </div>
                </div>
                <Checkbox
                  checked={selectedCampaign.emailEnabled}
                  onCheckedChange={(checked: boolean) => handleToggleEmail(selectedCampaign.id, checked)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
