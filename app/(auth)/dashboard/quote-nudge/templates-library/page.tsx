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
  FileText, 
  Mail, 
  MessageSquare, 
  Plus, 
  Edit, 
  Copy, 
  Trash2, 
  Clock, 
  TrendingUp,
  AlertTriangle,
  Users,
  Save,
  X
} from "lucide-react";

interface MessageTemplate {
  id: string;
  name: string;
  category: "gentle-reminder" | "value-reminder" | "urgency-close" | "ghost-recovery";
  channel: "email" | "sms";
  content: string;
  usageCount: number;
  conversionRate: number;
  createdAt: string;
  lastUsed: string;
}

const categoryInfo = {
  "gentle-reminder": {
    name: "Gentle Reminder",
    description: "Soft follow-ups for initial contact",
    icon: <Clock className="h-4 w-4" />,
    color: "bg-blue-100 text-blue-800 border-blue-200"
  },
  "value-reminder": {
    name: "Value Reminder",
    description: "Highlight value proposition",
    icon: <TrendingUp className="h-4 w-4" />,
    color: "bg-green-100 text-green-800 border-green-200"
  },
  "urgency-close": {
    name: "Urgency Close",
    description: "Create urgency for decision",
    icon: <AlertTriangle className="h-4 w-4" />,
    color: "bg-red-100 text-red-800 border-red-200"
  },
  "ghost-recovery": {
    name: "Ghost Recovery",
    description: "Recover silent clients",
    icon: <Users className="h-4 w-4" />,
    color: "bg-purple-100 text-purple-800 border-purple-200"
  }
};

export default function MessageTemplatesLibrary() {
  const [templates, setTemplates] = useState<MessageTemplate[]>([
    {
      id: "1",
      name: "Professional Follow-Up",
      category: "gentle-reminder",
      channel: "email",
      content: "Hi {{client_name}},\n\nJust wanted to follow up on the {{project_name}} proposal I sent last week. Do you have any questions or would you like to schedule a quick call to discuss?\n\nBest regards,\n{{your_name}}",
      usageCount: 45,
      conversionRate: 32,
      createdAt: "2024-03-01",
      lastUsed: "2024-03-22"
    },
    {
      id: "2",
      name: "Quick SMS Check-In",
      category: "gentle-reminder",
      channel: "sms",
      content: "Hi {{client_name}}, just checking if you had a chance to review the {{project_name}} quote. Let me know if you have any questions!",
      usageCount: 78,
      conversionRate: 28,
      createdAt: "2024-02-15",
      lastUsed: "2024-03-23"
    },
    {
      id: "3",
      name: "Value Proposition Highlight",
      category: "value-reminder",
      channel: "email",
      content: "Hi {{client_name}},\n\nI wanted to highlight how our {{project_name}} solution can help you achieve {{key_benefit}. Our clients typically see {{result}} within {{timeframe}}.\n\nWould you be available for a 15-minute call to explore this further?\n\nBest,\n{{your_name}}",
      usageCount: 23,
      conversionRate: 41,
      createdAt: "2024-02-20",
      lastUsed: "2024-03-21"
    },
    {
      id: "4",
      name: "Limited Time Offer",
      category: "urgency-close",
      channel: "email",
      content: "Hi {{client_name}},\n\nI wanted to let you know that we have a special offer for the {{project_name}} project - {{offer_details}}. This is available until {{deadline}}.\n\nWould you like to move forward before this opportunity expires?\n\nBest regards,\n{{your_name}}",
      usageCount: 15,
      conversionRate: 38,
      createdAt: "2024-03-05",
      lastUsed: "2024-03-20"
    },
    {
      id: "5",
      name: "Ghost Recovery - Final Attempt",
      category: "ghost-recovery",
      channel: "email",
      content: "Hi {{client_name}},\n\nI haven't heard back regarding the {{project_name}} proposal, so I wanted to check if this is still a priority for you.\n\nIf the timing isn't right, I completely understand. If you'd still like to proceed, I'm here to help.\n\nEither way, I'd appreciate a quick note so I can plan accordingly.\n\nBest regards,\n{{your_name}}",
      usageCount: 31,
      conversionRate: 19,
      createdAt: "2024-02-10",
      lastUsed: "2024-03-18"
    },
    {
      id: "6",
      name: "SMS Gentle Nudge",
      category: "ghost-recovery",
      channel: "sms",
      content: "Hi {{client_name}}, following up on the {{project_name}} proposal. Is this still something you're considering?",
      usageCount: 52,
      conversionRate: 22,
      createdAt: "2024-02-28",
      lastUsed: "2024-03-19"
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<MessageTemplate | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const [newTemplate, setNewTemplate] = useState({
    name: "",
    category: "gentle-reminder" as MessageTemplate["category"],
    channel: "email" as MessageTemplate["channel"],
    content: ""
  });

  const handleCreateTemplate = () => {
    if (!newTemplate.name || !newTemplate.content) return;

    const template: MessageTemplate = {
      id: Date.now().toString(),
      name: newTemplate.name,
      category: newTemplate.category,
      channel: newTemplate.channel,
      content: newTemplate.content,
      usageCount: 0,
      conversionRate: 0,
      createdAt: new Date().toISOString().split('T')[0],
      lastUsed: ""
    };

    setTemplates([template, ...templates]);
    setNewTemplate({
      name: "",
      category: "gentle-reminder",
      channel: "email",
      content: ""
    });
    setShowCreateForm(false);
  };

  const handleEditTemplate = (template: MessageTemplate) => {
    setEditingTemplate(template);
  };

  const handleUpdateTemplate = () => {
    if (!editingTemplate) return;

    setTemplates(prev => prev.map(t => 
      t.id === editingTemplate.id ? editingTemplate : t
    ));
    setEditingTemplate(null);
  };

  const handleDuplicateTemplate = (template: MessageTemplate) => {
    const duplicated: MessageTemplate = {
      ...template,
      id: Date.now().toString(),
      name: `${template.name} (Copy)`,
      usageCount: 0,
      conversionRate: 0,
      createdAt: new Date().toISOString().split('T')[0],
      lastUsed: ""
    };

    setTemplates([duplicated, ...templates]);
  };

  const handleDeleteTemplate = (templateId: string) => {
    setTemplates(prev => prev.filter(t => t.id !== templateId));
  };

  const getChannelIcon = (channel: string) => {
    return channel === "email" ? <Mail className="h-4 w-4" /> : <MessageSquare className="h-4 w-4" />;
  };

  const getChannelColor = (channel: string) => {
    return channel === "email" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800";
  };

  const filteredTemplates = selectedCategory === "all" 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  const totalTemplates = templates.length;
  const avgConversionRate = templates.reduce((sum, t) => sum + t.conversionRate, 0) / templates.length;
  const totalUsage = templates.reduce((sum, t) => sum + t.usageCount, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Message Templates Library</h1>
        <p className="text-muted-foreground mt-1">
          Store and manage proven follow-up templates for maximum conversion.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Templates</p>
                <p className="text-2xl font-bold text-blue-600">{totalTemplates}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Avg Conversion Rate</p>
                <p className="text-2xl font-bold text-green-600">{avgConversionRate.toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Usage</p>
                <p className="text-2xl font-bold text-purple-600">{totalUsage}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Filter & Add Template */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("all")}
          >
            All Templates
          </Button>
          {Object.entries(categoryInfo).map(([key, info]) => (
            <Button
              key={key}
              variant={selectedCategory === key ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(key)}
            >
              {info.icon}
              {info.name}
            </Button>
          ))}
        </div>
        <Button onClick={() => setShowCreateForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Template
        </Button>
      </div>

      {/* Create/Edit Template Form */}
      {(showCreateForm || editingTemplate) && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingTemplate ? "Edit Template" : "Create New Template"}
            </CardTitle>
            <CardDescription>
              {editingTemplate ? "Update your template details" : "Add a new message template to your library"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="template-name">Template Name *</Label>
                <Input
                  id="template-name"
                  value={editingTemplate ? editingTemplate.name : newTemplate.name}
                  onChange={(e) => editingTemplate 
                    ? setEditingTemplate({...editingTemplate, name: e.target.value})
                    : setNewTemplate({...newTemplate, name: e.target.value})
                  }
                  placeholder="Enter template name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="template-category">Category</Label>
                <Select 
                  value={editingTemplate ? editingTemplate.category : newTemplate.category}
                  onValueChange={(value: MessageTemplate["category"]) => editingTemplate
                    ? setEditingTemplate({...editingTemplate, category: value})
                    : setNewTemplate({...newTemplate, category: value})
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(categoryInfo).map(([key, info]) => (
                      <SelectItem key={key} value={key}>
                        <div className="flex items-center gap-2">
                          {info.icon}
                          {info.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="template-channel">Channel</Label>
                <Select 
                  value={editingTemplate ? editingTemplate.channel : newTemplate.channel}
                  onValueChange={(value: MessageTemplate["channel"]) => editingTemplate
                    ? setEditingTemplate({...editingTemplate, channel: value})
                    : setNewTemplate({...newTemplate, channel: value})
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email
                      </div>
                    </SelectItem>
                    <SelectItem value="sms">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        SMS
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="template-content">Message Content *</Label>
              <Textarea
                id="template-content"
                value={editingTemplate ? editingTemplate.content : newTemplate.content}
                onChange={(e) => editingTemplate
                  ? setEditingTemplate({...editingTemplate, content: e.target.value})
                  : setNewTemplate({...newTemplate, content: e.target.value})
                }
                placeholder="Enter your message template..."
                rows={6}
              />
              <p className="text-xs text-muted-foreground">
                Available variables: {"{{client_name}}"}, {"{{project_name}}"}, {"{{your_name}}"}, {"{{key_benefit}}"}, {"{{result}}"}, {"{{timeframe}}"}, {"{{offer_details}}"}, {"{{deadline}}"}
              </p>
            </div>

            <div className="flex gap-2">
              {editingTemplate ? (
                <>
                  <Button onClick={handleUpdateTemplate}>
                    <Save className="h-4 w-4 mr-2" />
                    Update Template
                  </Button>
                  <Button variant="outline" onClick={() => setEditingTemplate(null)}>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button onClick={handleCreateTemplate}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Template
                  </Button>
                  <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Templates Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-base leading-tight">{template.name}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className={getChannelColor(template.channel)}>
                      <div className="flex items-center gap-1">
                        {getChannelIcon(template.channel)}
                        {template.channel}
                      </div>
                    </Badge>
                    <Badge variant="outline" className={categoryInfo[template.category].color}>
                      <div className="flex items-center gap-1">
                        {categoryInfo[template.category].icon}
                        {categoryInfo[template.category].name}
                      </div>
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="text-sm text-muted-foreground line-clamp-3">
                  {template.content}
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <div className="font-medium">{template.usageCount}</div>
                    <div className="text-muted-foreground">Uses</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <div className="font-medium">{template.conversionRate}%</div>
                    <div className="text-muted-foreground">Conversion</div>
                  </div>
                </div>

                <div className="flex gap-1">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => handleEditTemplate(template)}
                    className="flex-1"
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => handleDuplicateTemplate(template)}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => handleDeleteTemplate(template.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No templates found</h3>
            <p className="text-muted-foreground mb-4">
              {selectedCategory === "all" 
                ? "Create your first message template to get started"
                : `No templates in ${categoryInfo[selectedCategory as keyof typeof categoryInfo]?.name || 'this category'}`
              }
            </p>
            <Button onClick={() => setShowCreateForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Template
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Template Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Template Best Practices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-semibold">Content Tips</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Keep messages concise and personalized</li>
                <li>• Use variables like {"{{client_name}}"} for personalization</li>
                <li>• Include clear calls-to-action</li>
                <li>• Test different subject lines for emails</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Category Guidelines</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• <strong>Gentle Reminder:</strong> Soft initial follow-ups</li>
                <li>• <strong>Value Reminder:</strong> Highlight benefits and ROI</li>
                <li>• <strong>Urgency Close:</strong> Create time-sensitive offers</li>
                <li>• <strong>Ghost Recovery:</strong> Re-engage silent prospects</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
