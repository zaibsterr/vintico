"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@clerk/nextjs";
import { MessageCircle, Send, X, Minimize2, Maximize2, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  text: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

interface UserProfile {
  plan: string;
  credits?: number;
}

const AIAssistant = () => {
  const { isSignedIn, userId } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Knowledge base for Vintico platform
  const knowledgeBase = {
    "Quote Nudge": {
      description: "Intelligent follow-up engine that converts pending quotes into confirmed deals with automated SMS nudges.",
      features: ["Free 3 credits per signup", "Automated SMS sequences", "Smart scheduling", "Conversion analytics", "Alert when credits end"],
      limits: { starter: "3 free credits on signup", growth: "500 credits per month", pro: "2000 credits per month" }
    },
    "Leave Guard": {
      description: "Streamlined leave management with overlap detection and instant approvals.",
      features: ["Submit leave requests", "Overlap detection", "RLS isolation for data security", "One-click approvals", "Calendar sync"],
      access: "Requires logged-in user with appropriate permissions"
    },
    "Distill Guard": {
      description: "Text summarization service with secure storage and history tracking.",
      features: ["Input text summarization", "Summary history", "Secure storage", "Compliance monitoring"],
      access: "Available to all logged-in users"
    },
    "Cyber Guard": {
      description: "Enterprise-grade password analysis and security reporting.",
      features: ["Password strength generator", "Security reports", "Threat detection", "Vulnerability scanning"],
      access: "Available to all logged-in users"
    },
    "Vintico Pulse": {
      description: "Daily energy and focus tracker with trend analysis.",
      features: ["Daily energy/focus tracking", "Chart trends", "Analytics dashboard", "PDF export"],
      access: "Available to all logged-in users"
    },
    "Plans & Billing": {
      description: "Flexible subscription plans with Stripe integration.",
      plans: {
        starter: { price: "$29/month", features: ["Basic modules", "50 credits", "Email support"] },
        growth: { price: "$79/month", features: ["All modules", "200 credits", "Priority support", "Advanced analytics"] },
        pro: { price: "$199/month", features: ["Unlimited everything", "Custom integrations", "Dedicated support", "API access"] }
      },
      credits: ["Credit packs available", "Bot detection API with Stripe meter", "Server-side verification"]
    },
    "Security": {
      description: "Enterprise-grade security infrastructure.",
      features: ["Clerk authentication", "Supabase database with RLS", "JWT token mapping", "Bot detection API", "Secure data isolation"]
    }
  };

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fetch user profile for personalized responses
  useEffect(() => {
    if (isSignedIn && userId) {
      // In a real implementation, this would fetch from your API
      setUserProfile({ plan: "free", credits: 3 });
    }
  }, [isSignedIn, userId]);

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Greeting responses
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
      return "Hi, how can I help you today?";
    }

    // Feature-specific responses
    if (lowerMessage.includes("quote nudge")) {
      const quoteInfo = knowledgeBase["Quote Nudge"];
      const userPlan = userProfile?.plan || 'starter';
      const userCredits = userProfile?.credits || 3;
      
      if (userCredits <= 0) {
        return `You have reached your credits. Consider upgrading to one of our plans. Starter is $19/month with 100 credits, Growth is $49/month with 500 credits, Pro is $89/month with 2000 credits. You can also buy additional credits packs of 500 or 2000.`;
      }
      
      return `Quote Nudge is our intelligent follow-up engine that helps convert pending quotes into confirmed deals. It includes automated SMS sequences, smart scheduling, conversion analytics, and alerts when credits end. You have ${userCredits} credits remaining. Once you finish them, you can upgrade to Growth or Pro plan to continue sending messages.`;
    }

    if (lowerMessage.includes("leave guard")) {
      return "Leave Guard streamlines your leave management process. You can submit leave requests, check for overlaps with team members, and get instant approvals. The system uses Row Level Security to ensure data isolation between users and teams. It also includes calendar sync for better planning.";
    }

    if (lowerMessage.includes("distill guard")) {
      return "Distill Guard helps you summarize and manage text content efficiently. Simply input your text, and AI will generate a concise summary. All summaries are stored securely in your history for future reference. It's available to all logged-in users.";
    }

    if (lowerMessage.includes("cyber guard")) {
      return "Cyber Guard provides enterprise-grade password security and analysis. You can generate secure passwords, analyze existing ones for vulnerabilities, and get comprehensive security reports to protect your organization. This service is available to all logged-in users.";
    }

    if (lowerMessage.includes("vintico pulse") || lowerMessage.includes("pulse")) {
      return "Vintico Pulse is your daily energy and focus tracking system. Track your daily energy levels and focus patterns, visualize trends over time, and export insights for better productivity management. This service is available to all logged-in users.";
    }

    if (lowerMessage.includes("plan") || lowerMessage.includes("pricing") || lowerMessage.includes("credits")) {
      return "Starter is $19/month with 100 credits, Growth is $49/month with 500 credits, Pro is $89/month with 2000 credits. All plans include 3 free credits on signup. You can also buy additional credits packs of 500 or 2000. Each plan includes access to all modules with different credit limits for Quote Nudge.";
    }

    if (lowerMessage.includes("security") || lowerMessage.includes("auth")) {
      return "Your data is protected with enterprise-grade encryption. We use Clerk for secure authentication with JWT token mapping to Supabase. All service tables use Row Level Security to ensure proper data isolation between users.";
    }

    // Help and guidance responses
    if (lowerMessage.includes("how to") || lowerMessage.includes("getting started") || lowerMessage.includes("begin")) {
      return "Getting started with Vintico is easy. First, sign up for your free account. Then activate the modules you need. Each module has its own dedicated dashboard. You can use Vintico Pulse to monitor your productivity. Start with Quote Nudge for immediate business impact, use Leave Guard to streamline team management, and enable Cyber Guard for security compliance.";
    }

    if (lowerMessage.includes("credit") && (lowerMessage.includes("left") || lowerMessage.includes("remaining"))) {
      if (!isSignedIn) {
        return "Please sign in to check your credit balance. You'll get 3 free credits for Quote Nudge upon signup.";
      }
      const userCredits = userProfile?.credits || 0;
      if (userCredits <= 0) {
        return "You have reached your credits. Consider upgrading to one of our plans. Starter is $19/month with 100 credits, Growth is $49/month with 500 credits, Pro is $89/month with 2000 credits. You can also buy additional credits packs of 500 or 2000.";
      }
      return `You have ${userCredits} credits remaining. Once you finish them, you can upgrade to Growth or Pro plan to continue sending messages.`;
    }

    // Default response
    return "I'm here to help you understand Vintico Digital Hub. I can explain Quote Nudge for automated follow up, Leave Guard for secure leave requests, Distill Guard for text summarization, Cyber Guard for password analysis, Vintico Pulse for productivity analytics, and our pricing plans. How can I help you today?";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(inputValue),
        sender: "assistant",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Offline fallback
  const isOnline = typeof window !== "undefined" && navigator.onLine;

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="relative gap-1 md:gap-2 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 shadow-lg hover:shadow-xl transition-all duration-300 rounded-full px-3 md:px-4 py-2"
        >
          <MessageCircle className="h-4 w-4 md:h-5 md:w-5" />
          <span className="hidden sm:inline text-xs md:text-sm">AI Assistant</span>
          {!isOnline && (
            <Badge variant="destructive" className="absolute -top-2 -right-2 h-3 w-3 p-0" />
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 left-4 sm:left-auto sm:right-4 z-50 w-full sm:w-auto sm:max-w-md max-w-sm">
      <Card className="shadow-2xl border-0 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
        {/* Header */}
        <CardHeader className="flex flex-row items-center justify-between p-3 md:p-4 border-b bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-t-lg">
          <div className="flex items-center gap-2">
            <Bot className="h-4 w-4 md:h-5 md:w-5" />
            <div>
              <h3 className="font-semibold text-sm md:text-base">Vintico AI Assistant</h3>
              <p className="text-xs opacity-90">
                {isOnline ? "Online" : "Offline - Limited functionality"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="h-8 w-8 p-0 text-white hover:bg-white/20"
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 p-0 text-white hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        {!isMinimized && (
          <>
            {/* Messages */}
            <CardContent className="p-0">
              <ScrollArea className="h-80 md:h-96 p-3 md:p-4">
                <div className="space-y-3 md:space-y-4">
                  {messages.length === 0 && (
                    <div className="text-center text-muted-foreground py-6 md:py-8">
                      <Bot className="h-10 w-10 md:h-12 md:w-12 mx-auto mb-3 md:mb-4 text-blue-600" />
                      <h4 className="font-semibold mb-2 text-sm md:text-base">Welcome to Vintico AI Assistant!</h4>
                      <p className="text-xs md:text-sm">
                        Hi, how can I help you today? I can explain Vintico Digital Hub features and dashboard tools for instant digital problem solving.
                      </p>
                    </div>
                  )}
                  
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {message.sender === "assistant" && (
                        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 flex items-center justify-center flex-shrink-0">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                      )}
                      <div
                        className={`max-w-[85%] md:max-w-[80%] rounded-lg p-2 md:p-3 ${
                          message.sender === "user"
                            ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white"
                            : "bg-muted"
                        }`}
                      >
                        <p className="text-xs md:text-sm whitespace-pre-line">{message.text}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                      {message.sender === "user" && (
                        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 flex items-center justify-center flex-shrink-0">
                          <User className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex gap-3 justify-start">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 flex items-center justify-center">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <div className="bg-muted rounded-lg p-3">
                        <div className="flex gap-1">
                          <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" />
                          <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                          <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
            </CardContent>

            {/* Input */}
            <div className="p-3 md:p-4 border-t">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={
                    !isOnline
                      ? "Offline - Limited responses available"
                      : isSignedIn
                      ? "Ask about Vintico features..."
                      : "Ask about Vintico (sign in for personalized help)..."
                  }
                  disabled={!isOnline}
                  className="flex-1 text-sm"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || !isOnline}
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default AIAssistant;
