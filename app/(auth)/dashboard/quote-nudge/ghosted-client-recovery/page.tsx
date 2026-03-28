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
  Users, 
  Clock, 
  MessageSquare, 
  Mail, 
  Phone, 
  Calendar, 
  DollarSign, 
  AlertTriangle,
  Send,
  Settings,
  Play,
  Pause,
  Edit,
  Zap,
  RefreshCw,
  Target,
  Plus
} from "lucide-react";

interface InactiveLead {
  id: string;
  clientName: string;
  projectValue: number;
  daysInactive: number;
  lastActivity: string;
  projectName: string;
  stage: "quote-sent" | "follow-up-sent" | "negotiation";
  recoverySequence: RecoveryMessage[];
  autoRecoveryEnabled: boolean;
}

interface RecoveryMessage {
  id: string;
  day: number;
  channel: "email" | "sms" | "phone";
  message: string;
  sent?: boolean;
  sentAt?: string;
}

export default function GhostedClientRecovery() {
  const [inactiveLeads, setInactiveLeads] = useState<InactiveLead[]>([
    {
      id: "1",
      clientName: "TechStart Inc",
      projectValue: 25000,
      daysInactive: 12,
      lastActivity: "Quote sent - no response",
      projectName: "Mobile App Development",
      stage: "quote-sent",
      recoverySequence: [
        {
          id: "1",
          day: 7,
          channel: "email",
          message: "Hi {{client_name}}, I wanted to follow up on the {{project_name}} proposal I sent last week. Is this still something you're considering?",
          sent: true,
          sentAt: "2024-03-17"
        },
        {
          id: "2", 
          day: 14,
          channel: "sms",
          message: "Hi {{client_name}}, checking in on the {{project_name}} quote. Would love to hear your thoughts!",
          sent: false
        }
      ],
      autoRecoveryEnabled: true
    },
    {
      id: "2",
      clientName: "Global Solutions",
      projectValue: 18000,
      daysInactive: 8,
      lastActivity: "Follow-up sent - no reply",
      projectName: "API Integration",
      stage: "follow-up-sent",
      recoverySequence: [
        {
          id: "1",
          day: 7,
          channel: "email",
          message: "Hi {{client_name}}, just wanted to make sure you received the {{project_name}} information. Do you have any questions I can help answer?",
          sent: true,
          sentAt: "2024-03-21"
        },
        {
          id: "2",
          day: 14,
          channel: "phone",
          message: "Call to discuss {{project_name}} project and address any concerns",
          sent: false
        }
      ],
      autoRecoveryEnabled: true
    },
    {
      id: "3",
      clientName: "MarketingPro",
      projectValue: 15000,
      daysInactive: 15,
      lastActivity: "Negotiation stalled",
      projectName: "Marketing Automation",
      stage: "negotiation",
      recoverySequence: [
        {
          id: "1",
          day: 7,
          channel: "email",
          message: "Hi {{client_name}}, I noticed we haven't connected regarding the {{project_name}} project. Is the timing still right for you?",
          sent: true,
          sentAt: "2024-03-14"
        },
        {
          id: "2",
          day: 14,
          channel: "email",
          message: "Hi {{client_name}}, following up one last time on the {{project_name}} opportunity. If the timing isn't right, I completely understand. Either way, I'd appreciate a quick note so I can plan accordingly.",
          sent: false
        }
      ],
      autoRecoveryEnabled: false
    },
    {
      id: "4",
      clientName: "FinanceHub",
      projectValue: 35000,
      daysInactive: 22,
      lastActivity: "Final proposal delivered",
      projectName: "Banking Platform",
      stage: "negotiation",
      recoverySequence: [
        {
          id: "1",
          day: 7,
          channel: "email",
          message: "Hi {{client_name}}, checking in on the {{project_name}} proposal. Any questions or concerns I can address?",
          sent: true,
          sentAt: "2024-03-07"
        },
        {
          id: "2",
          day: 14,
          channel: "phone",
          message: "Call to revive {{project_name}} discussion",
          sent: true,
          sentAt: "2024-03-14"
        },
        {
          id: "3",
          day: 21,
          channel: "email",
          message: "Hi {{client_name}}, I haven't heard back regarding the {{project_name}} project. I'm assuming the timing isn't right, but please feel free to reach out if circumstances change. Best regards!",
          sent: false
        }
      ],
      autoRecoveryEnabled: true
    }
  ]);

  const [selectedLead, setSelectedLead] = useState<InactiveLead | null>(null);
  const [editingSequence, setEditingSequence] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState({
    day: "",
    channel: "email" as "email" | "sms" | "phone",
    message: ""
  });

  const defaultRecoveryTemplates = [
    {
      day: 7,
      channel: "email" as const,
      message: "Hi {{client_name}}, I wanted to follow up on the {{project_name}} proposal. Is this still something you're considering?"
    },
    {
      day: 14,
      channel: "email" as const,
      message: "Hi {{client_name}}, just checking in one more time regarding the {{project_name}} opportunity. If the timing isn't right, I completely understand. Either way, I'd appreciate a quick note."
    },
    {
      day: 21,
      channel: "sms" as const,
      message: "Hi {{client_name}}, following up on {{project_name}}. Is this still a priority for you?"
    }
  ];

  const getInactivityColor = (days: number) => {
    if (days <= 10) return "bg-amber-100 text-amber-800 border-amber-200";
    if (days <= 20) return "bg-orange-100 text-orange-800 border-orange-200";
    return "bg-red-100 text-red-800 border-red-200";
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "email": return <Mail className="h-4 w-4" />;
      case "sms": return <MessageSquare className="h-4 w-4" />;
      case "phone": return <Phone className="h-4 w-4" />;
      default: return <Send className="h-4 w-4" />;
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "quote-sent": return "bg-blue-100 text-blue-800";
      case "follow-up-sent": return "bg-purple-100 text-purple-800";
      case "negotiation": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleToggleAutoRecovery = (leadId: string) => {
    setInactiveLeads(prev => prev.map(lead => 
      lead.id === leadId ? { ...lead, autoRecoveryEnabled: !lead.autoRecoveryEnabled } : lead
    ));
  };

  const handleAddRecoveryMessage = (leadId: string) => {
    if (!newMessage.day || !newMessage.message) return;

    setInactiveLeads(prev => prev.map(lead => {
      if (lead.id === leadId) {
        const message: RecoveryMessage = {
          id: Date.now().toString(),
          day: parseInt(newMessage.day),
          channel: newMessage.channel,
          message: newMessage.message
        };
        return {
          ...lead,
          recoverySequence: [...lead.recoverySequence, message].sort((a, b) => a.day - b.day)
        };
      }
      return lead;
    }));

    setNewMessage({ day: "", channel: "email", message: "" });
  };

  const handleUpdateRecoveryMessage = (leadId: string, messageId: string, newMessageText: string) => {
    setInactiveLeads(prev => prev.map(lead => {
      if (lead.id === leadId) {
        return {
          ...lead,
          recoverySequence: lead.recoverySequence.map(msg => 
            msg.id === messageId ? { ...msg, message: newMessageText } : msg
          )
        };
      }
      return lead;
    }));
  };

  const handleDeleteRecoveryMessage = (leadId: string, messageId: string) => {
    setInactiveLeads(prev => prev.map(lead => {
      if (lead.id === leadId) {
        return {
          ...lead,
          recoverySequence: lead.recoverySequence.filter(msg => msg.id !== messageId)
        };
      }
      return lead;
    }));
  };

  const handleSendManualRecovery = (leadId: string) => {
    console.log(`Sending manual recovery for lead ${leadId}`);
    // In a real app, this would trigger immediate recovery message
  };

  const totalInactiveLeads = inactiveLeads.length;
  const totalValueAtRisk = inactiveLeads.reduce((sum, lead) => sum + lead.projectValue, 0);
  const averageInactiveDays = inactiveLeads.reduce((sum, lead) => sum + lead.daysInactive, 0) / inactiveLeads.length;
  const autoRecoveryEnabled = inactiveLeads.filter(lead => lead.autoRecoveryEnabled).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Ghosted Client Recovery</h1>
        <p className="text-muted-foreground mt-1">
          Automatically revive deals where clients stopped responding.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Inactive Leads</p>
                <p className="text-2xl font-bold text-blue-600">{totalInactiveLeads}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Value at Risk</p>
                <p className="text-2xl font-bold text-red-600">${totalValueAtRisk.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-amber-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Avg Inactive Days</p>
                <p className="text-2xl font-bold text-amber-600">{averageInactiveDays.toFixed(1)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Zap className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Auto Recovery</p>
                <p className="text-2xl font-bold text-green-600">{autoRecoveryEnabled}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Inactive Leads */}
      <Card>
        <CardHeader>
          <CardTitle>Inactive Leads</CardTitle>
          <CardDescription>
            Leads with no response for 7+ days. Click to view recovery sequence.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {inactiveLeads.map((lead) => (
              <div 
                key={lead.id}
                className={`border rounded-lg p-4 cursor-pointer transition-colors hover:bg-muted/50 ${
                  selectedLead?.id === lead.id ? "border-primary bg-primary/5" : ""
                }`}
                onClick={() => setSelectedLead(lead)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{lead.clientName}</h3>
                    <p className="text-sm text-muted-foreground">{lead.projectName}</p>
                  </div>
                  <Badge variant="outline" className={getInactivityColor(lead.daysInactive)}>
                    {lead.daysInactive} days
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Project Value</span>
                    <span className="font-semibold">${lead.projectValue.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Stage</span>
                    <Badge variant="outline" className={getStageColor(lead.stage)}>
                      {lead.stage.replace("-", " ")}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Last Activity</span>
                    <span className="text-sm">{lead.lastActivity}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Auto Recovery</span>
                    <Checkbox
                      checked={lead.autoRecoveryEnabled}
                      onCheckedChange={() => handleToggleAutoRecovery(lead.id)}
                    />
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Recovery Sequence</span>
                    <span className="text-sm font-medium">{lead.recoverySequence.length} messages</span>
                  </div>
                  <div className="flex gap-1 mt-2">
                    {lead.recoverySequence.slice(0, 3).map((msg, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {getChannelIcon(msg.channel)}
                        Day {msg.day}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recovery Sequence & Message Editor */}
      {selectedLead && (
        <div className="grid gap-6 md:grid-cols-2">
          {/* Recovery Sequence */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recovery Sequence</CardTitle>
                  <CardDescription>
                    Automated messages for {selectedLead.clientName}
                  </CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setEditingSequence(editingSequence === selectedLead.id ? null : selectedLead.id)}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedLead.recoverySequence.map((message, index) => (
                <div key={message.id} className="border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">
                        {getChannelIcon(message.channel)}
                        Day {message.day}
                      </Badge>
                      {message.sent && (
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          Sent
                        </Badge>
                      )}
                    </div>
                    {editingSequence === selectedLead.id && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteRecoveryMessage(selectedLead.id, message.id)}
                      >
                        ×
                      </Button>
                    )}
                  </div>
                  
                  {editingSequence === selectedLead.id ? (
                    <Textarea
                      value={message.message}
                      onChange={(e) => handleUpdateRecoveryMessage(selectedLead.id, message.id, e.target.value)}
                      rows={3}
                      className="text-sm"
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">{message.message}</p>
                  )}
                  
                  {message.sent && message.sentAt && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Sent on {new Date(message.sentAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              ))}

              {editingSequence === selectedLead.id && (
                <div className="border-2 border-dashed rounded-lg p-4">
                  <h4 className="font-medium mb-3">Add New Message</h4>
                  <div className="space-y-3">
                    <div className="grid gap-3 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="day">Day</Label>
                        <Input
                          id="day"
                          type="number"
                          value={newMessage.day}
                          onChange={(e) => setNewMessage({...newMessage, day: e.target.value})}
                          placeholder="7"
                          min="1"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="channel">Channel</Label>
                        <Select value={newMessage.channel} onValueChange={(value: "email" | "sms" | "phone") => setNewMessage({...newMessage, channel: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="sms">SMS</SelectItem>
                            <SelectItem value="phone">Phone</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        value={newMessage.message}
                        onChange={(e) => setNewMessage({...newMessage, message: e.target.value})}
                        placeholder="Enter recovery message..."
                        rows={3}
                      />
                    </div>
                    <Button 
                      onClick={() => handleAddRecoveryMessage(selectedLead.id)}
                      disabled={!newMessage.day || !newMessage.message}
                      size="sm"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Message
                    </Button>
                  </div>
                </div>
              )}

              {editingSequence === selectedLead.id && (
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => setEditingSequence(null)}>
                    Save Sequence
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setEditingSequence(null)}>
                    Cancel
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recovery Message Editor */}
          <Card>
            <CardHeader>
              <CardTitle>Recovery Message Templates</CardTitle>
              <CardDescription>
                Proven templates to revive ghosted clients.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {defaultRecoveryTemplates.map((template, index) => (
                  <div key={index} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">
                        {getChannelIcon(template.channel)}
                        Day {template.day}
                      </Badge>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          setNewMessage({
                            day: template.day.toString(),
                            channel: template.channel,
                            message: template.message
                          });
                        }}
                      >
                        Use Template
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">{template.message}</p>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Message Tips</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Keep messages short and friendly</li>
                  <li>• Use variables like {"{{client_name}}"} for personalization</li>
                  <li>• Create urgency without being pushy</li>
                  <li>• Provide an easy "out" for clients</li>
                </ul>
              </div>

              <Button 
                className="w-full"
                onClick={() => handleSendManualRecovery(selectedLead.id)}
              >
                <Send className="h-4 w-4 mr-2" />
                Send Manual Recovery
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Bulk actions to manage ghosted clients efficiently.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="h-5 w-5 text-green-600" />
                <h3 className="font-semibold">Enable Auto Recovery</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Activate automated recovery sequences for all inactive leads.
              </p>
              <Button variant="outline" className="w-full">
                Enable All
              </Button>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <MessageSquare className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold">Bulk SMS Recovery</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Send SMS to all leads inactive for 14+ days.
              </p>
              <Button variant="outline" className="w-full">
                Send Bulk SMS
              </Button>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <RefreshCw className="h-5 w-5 text-purple-600" />
                <h3 className="font-semibold">Reset Sequences</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Reset all recovery sequences to default templates.
              </p>
              <Button variant="outline" className="w-full">
                Reset All
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
