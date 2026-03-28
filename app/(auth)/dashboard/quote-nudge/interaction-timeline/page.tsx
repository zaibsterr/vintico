"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Calendar, 
  Send, 
  Mail, 
  MessageSquare, 
  Phone, 
  FileText, 
  CheckCircle, 
  Clock, 
  User, 
  Plus, 
  Edit,
  Eye,
  Target,
  DollarSign,
  AlertCircle
} from "lucide-react";

interface TimelineEvent {
  id: string;
  date: string;
  time: string;
  action: "quote-sent" | "message-sent" | "quote-opened" | "client-replied" | "deal-won" | "deal-lost" | "note-added" | "call-made";
  message: string;
  channel?: "email" | "sms" | "phone" | "in-person";
  metadata?: {
    quoteValue?: number;
    projectName?: string;
    duration?: string;
  };
}

interface Lead {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  projectName: string;
  quoteValue: number;
  status: "active" | "won" | "lost";
  lastActivity: string;
  timeline: TimelineEvent[];
}

export default function ClientInteractionTimeline() {
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: "1",
      clientName: "Acme Corporation",
      email: "contact@acme.com",
      phone: "+1-555-0123",
      projectName: "Website Redesign",
      quoteValue: 15000,
      status: "active",
      lastActivity: "2 hours ago",
      timeline: [
        {
          id: "1",
          date: "2024-03-24",
          time: "10:30 AM",
          action: "quote-sent",
          message: "Sent comprehensive website redesign proposal including UX/UI design, development, and deployment phases.",
          channel: "email",
          metadata: {
            quoteValue: 15000,
            projectName: "Website Redesign"
          }
        },
        {
          id: "2",
          date: "2024-03-24",
          time: "11:15 AM",
          action: "quote-opened",
          message: "Client opened and viewed the proposal document. Spent 12 minutes reviewing.",
          metadata: {
            duration: "12 minutes"
          }
        },
        {
          id: "3",
          date: "2024-03-24",
          time: "2:45 PM",
          action: "client-replied",
          message: "Hi team, thanks for the detailed proposal. We have a few questions about the timeline and would like to discuss the scope in more detail.",
          channel: "email"
        },
        {
          id: "4",
          date: "2024-03-25",
          time: "9:00 AM",
          action: "call-made",
          message: "45-minute discovery call to discuss scope, timeline, and answer client questions. Very positive response.",
          channel: "phone",
          metadata: {
            duration: "45 minutes"
          }
        }
      ]
    },
    {
      id: "2",
      clientName: "Tech Startup LLC",
      email: "founder@techstartup.com",
      phone: "+1-555-0456",
      projectName: "Mobile App Development",
      quoteValue: 25000,
      status: "won",
      lastActivity: "1 day ago",
      timeline: [
        {
          id: "1",
          date: "2024-03-20",
          time: "2:00 PM",
          action: "quote-sent",
          message: "Delivered mobile app development quote for iOS and Android platforms with backend API integration.",
          channel: "email",
          metadata: {
            quoteValue: 25000,
            projectName: "Mobile App Development"
          }
        },
        {
          id: "2",
          date: "2024-03-21",
          time: "10:30 AM",
          action: "message-sent",
          message: "Following up on the mobile app proposal. Do you have any questions about the technical specifications or timeline?",
          channel: "email"
        },
        {
          id: "3",
          date: "2024-03-22",
          time: "3:30 PM",
          action: "client-replied",
          message: "The proposal looks great! We'd like to move forward. Can we start next week?",
          channel: "email"
        },
        {
          id: "4",
          date: "2024-03-23",
          time: "11:00 AM",
          action: "deal-won",
          message: "Contract signed! $25,000 project confirmed with 50% upfront payment. Project kickoff scheduled for April 1st.",
          metadata: {
            quoteValue: 25000,
            projectName: "Mobile App Development"
          }
        }
      ]
    },
    {
      id: "3",
      clientName: "Marketing Agency",
      email: "projects@marketingagency.com",
      phone: "+1-555-0789",
      projectName: "Brand Strategy",
      quoteValue: 8500,
      status: "lost",
      lastActivity: "5 days ago",
      timeline: [
        {
          id: "1",
          date: "2024-03-15",
          time: "4:00 PM",
          action: "quote-sent",
          message: "Submitted comprehensive brand strategy proposal including market research, brand positioning, and visual identity guidelines.",
          channel: "email",
          metadata: {
            quoteValue: 8500,
            projectName: "Brand Strategy"
          }
        },
        {
          id: "2",
          date: "2024-03-17",
          time: "10:00 AM",
          action: "message-sent",
          message: "Just wanted to follow up on the brand strategy proposal. Is this still something you're considering?",
          channel: "email"
        },
        {
          id: "3",
          date: "2024-03-19",
          time: "2:30 PM",
          action: "deal-lost",
          message: "Client decided to go with internal team due to budget constraints. They appreciated the proposal and may reach out in the future.",
          metadata: {
            quoteValue: 8500,
            projectName: "Brand Strategy"
          }
        }
      ]
    },
    {
      id: "4",
      clientName: "E-commerce Store",
      email: "owner@ecommerce.com",
      phone: "+1-555-0890",
      projectName: "Product Photography",
      quoteValue: 5000,
      status: "active",
      lastActivity: "3 days ago",
      timeline: [
        {
          id: "1",
          date: "2024-03-22",
          time: "11:00 AM",
          action: "quote-sent",
          message: "Sent product photography quote for 50 product images with white background and lifestyle shots.",
          channel: "email",
          metadata: {
            quoteValue: 5000,
            projectName: "Product Photography"
          }
        },
        {
          id: "2",
          date: "2024-03-22",
          time: "1:30 PM",
          action: "quote-opened",
          message: "Client opened quote and viewed pricing details. Spent 5 minutes reviewing.",
          metadata: {
            duration: "5 minutes"
          }
        }
      ]
    }
  ]);

  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddNote, setShowAddNote] = useState(false);
  const [newNote, setNewNote] = useState("");

  const filteredLeads = leads.filter(lead => 
    lead.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getActionIcon = (action: string) => {
    switch (action) {
      case "quote-sent": return <FileText className="h-4 w-4" />;
      case "message-sent": return <Send className="h-4 w-4" />;
      case "quote-opened": return <Eye className="h-4 w-4" />;
      case "client-replied": return <Mail className="h-4 w-4" />;
      case "deal-won": return <CheckCircle className="h-4 w-4" />;
      case "deal-lost": return <AlertCircle className="h-4 w-4" />;
      case "note-added": return <Edit className="h-4 w-4" />;
      case "call-made": return <Phone className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case "quote-sent": return "bg-blue-100 text-blue-800 border-blue-200";
      case "message-sent": return "bg-amber-100 text-amber-800 border-amber-200";
      case "quote-opened": return "bg-purple-100 text-purple-800 border-purple-200";
      case "client-replied": return "bg-green-100 text-green-800 border-green-200";
      case "deal-won": return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "deal-lost": return "bg-red-100 text-red-800 border-red-200";
      case "note-added": return "bg-gray-100 text-gray-800 border-gray-200";
      case "call-made": return "bg-indigo-100 text-indigo-800 border-indigo-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getChannelIcon = (channel?: string) => {
    switch (channel) {
      case "email": return <Mail className="h-3 w-3" />;
      case "sms": return <MessageSquare className="h-3 w-3" />;
      case "phone": return <Phone className="h-3 w-3" />;
      case "in-person": return <User className="h-3 w-3" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-blue-100 text-blue-800 border-blue-200";
      case "won": return "bg-green-100 text-green-800 border-green-200";
      case "lost": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleAddNote = () => {
    if (!selectedLead || !newNote.trim()) return;

    const noteEvent: TimelineEvent = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
      action: "note-added",
      message: newNote
    };

    setLeads(prev => prev.map(lead => 
      lead.id === selectedLead.id 
        ? { ...lead, timeline: [noteEvent, ...lead.timeline] }
        : lead
    ));

    setSelectedLead(prev => prev ? {
      ...prev,
      timeline: [noteEvent, ...prev.timeline]
    } : null);

    setNewNote("");
    setShowAddNote(false);
  };

  const handleSendFollowUp = (leadId: string) => {
    console.log(`Sending follow-up to lead ${leadId}`);
    // In a real app, this would open a follow-up compose interface
  };

  const totalLeads = leads.length;
  const activeLeads = leads.filter(l => l.status === "active").length;
  const wonLeads = leads.filter(l => l.status === "won").length;
  const totalValue = leads.filter(l => l.status !== "lost").reduce((sum, l) => sum + l.quoteValue, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Client Interaction Timeline</h1>
        <p className="text-muted-foreground mt-1">
          Track every interaction with a lead in chronological order.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <User className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Leads</p>
                <p className="text-2xl font-bold text-blue-600">{totalLeads}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Target className="h-8 w-8 text-amber-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Active Leads</p>
                <p className="text-2xl font-bold text-amber-600">{activeLeads}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Won Deals</p>
                <p className="text-2xl font-bold text-green-600">{wonLeads}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Pipeline Value</p>
                <p className="text-2xl font-bold text-purple-600">${totalValue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Lead List */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Lead List */}
        <Card>
          <CardHeader>
            <CardTitle>Lead List</CardTitle>
            <CardDescription>
              Click on a lead to view their interaction timeline.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search leads..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Lead Cards */}
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {filteredLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors hover:bg-muted/50 ${
                      selectedLead?.id === lead.id ? "border-primary bg-primary/5" : ""
                    }`}
                    onClick={() => setSelectedLead(lead)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold">{lead.clientName}</h3>
                        <p className="text-sm text-muted-foreground">{lead.projectName}</p>
                      </div>
                      <Badge variant="outline" className={getStatusColor(lead.status)}>
                        {lead.status}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Value</span>
                        <span className="text-sm font-medium">${lead.quoteValue.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Last Activity</span>
                        <span className="text-sm">{lead.lastActivity}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Interactions</span>
                        <span className="text-sm font-medium">{lead.timeline.length}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timeline View */}
        {selectedLead && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{selectedLead.clientName}</CardTitle>
                  <CardDescription>
                    {selectedLead.projectName} • ${selectedLead.quoteValue.toLocaleString()}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleSendFollowUp(selectedLead.id)}>
                    <Send className="h-4 w-4 mr-1" />
                    Follow-Up
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setShowAddNote(true)}>
                    <Plus className="h-4 w-4 mr-1" />
                    Note
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Add Note Form */}
              {showAddNote && (
                <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                  <h4 className="font-semibold mb-2">Add Note</h4>
                  <Textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Enter your note..."
                    rows={3}
                    className="mb-2"
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleAddNote}>
                      Save Note
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setShowAddNote(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              {/* Timeline */}
              <div className="space-y-4">
                <h4 className="font-semibold">Interaction Timeline</h4>
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
                  
                  {/* Timeline Events */}
                  <div className="space-y-4">
                    {selectedLead.timeline.map((event, index) => (
                      <div key={event.id} className="relative flex gap-4">
                        {/* Timeline Dot */}
                        <div className="relative z-10">
                          <div className={`w-8 h-8 rounded-full border-2 border-background flex items-center justify-center ${getActionColor(event.action)}`}>
                            {getActionIcon(event.action)}
                          </div>
                        </div>
                        
                        {/* Event Card */}
                        <div className="flex-1 pb-4">
                          <div className="border rounded-lg p-3">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className={getActionColor(event.action)}>
                                  {event.action.replace("-", " ")}
                                </Badge>
                                {event.channel && (
                                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    {getChannelIcon(event.channel)}
                                    {event.channel}
                                  </div>
                                )}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {event.date} • {event.time}
                              </div>
                            </div>
                            
                            <p className="text-sm text-muted-foreground mb-2">
                              {event.message}
                            </p>
                            
                            {event.metadata && (
                              <div className="flex gap-4 text-xs text-muted-foreground">
                                {event.metadata.quoteValue && (
                                  <span>Value: ${event.metadata.quoteValue.toLocaleString()}</span>
                                )}
                                {event.metadata.projectName && (
                                  <span>Project: {event.metadata.projectName}</span>
                                )}
                                {event.metadata.duration && (
                                  <span>Duration: {event.metadata.duration}</span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* No Lead Selected */}
      {!selectedLead && (
        <Card>
          <CardContent className="text-center py-12">
            <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Select a Lead</h3>
            <p className="text-muted-foreground mb-4">
              Choose a lead from the list to view their interaction timeline
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
