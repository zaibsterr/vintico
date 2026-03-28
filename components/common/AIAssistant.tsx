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

  // Simple feature explanations for freelancers
  const featureExplanations = {
    "Contract Risk Scanner": "Analyzes your contracts for risky clauses and missing protections. For example, it can flag vague payment terms or missing late fee clauses that could leave you unprotected.",
    "Invoice Recovery Automation": "Automatically sends professional payment reminders and applies late fees when clients don't pay on time. Think of it as having a virtual assistant who handles chasing payments for you.",
    "Late Payment Protection": "Sets up automated alerts and protection systems before you start work. For instance, it can require deposits and set up milestone payments to reduce your risk.",
    "Tax Estimate Alerts": "Calculates how much tax you should set aside each quarter and sends deadline reminders. It helps you avoid surprise tax bills and penalties.",
    "Client Risk Score": "Analyzes a client's payment history and communication patterns to predict reliability. This helps you avoid risky clients before starting projects.",
    "Automated SMS + Email Follow-Ups": "Sends timely follow-up messages to prospects who haven't responded to your quotes. It's like having a sales assistant who never forgets to follow up.",
    "AI Smart Timing & Engagement Tracking": "Determines the best times to send messages and tracks who's engaging with your communications. It optimizes your outreach for better response rates.",
    "Visual Lead Pipeline with Revenue Forecasting": "Shows you where each prospect is in your sales process and predicts your future revenue. It's like having a crystal ball for your business income.",
    "Professional Message Templates & A/B Testing": "Provides proven message templates and tests which ones work best. You can see if a friendly or formal approach gets better responses.",
    "Ghosted Client Recovery Sequences": "Automatically sends recovery messages when clients disappear mid-conversation. It's designed to bring back clients who have gone silent.",
    "Conversion Insights & Win-Rate Analytics": "Shows you which of your sales techniques are working and calculates your success rates. It helps you focus on what actually brings in clients.",
    "One-Click Actions + Full Interaction Timeline": "Lets you take quick actions like sending reminders and see the complete history of all client communications. Everything you need is in one place."
  };

  const explainFeature = (featureName: string): string => {
    return featureExplanations[featureName as keyof typeof featureExplanations] || `${featureName} is a tool designed to help freelancers manage their business more effectively.`;
  };

  // Enhanced knowledge base for freelancer business management
  const knowledgeBase = {
    "FreelancerShield": {
      description: "Complete protection suite for freelancers to manage contracts, payments, and client risks.",
      features: [
        "Contract risk analysis and compliance checking",
        "Automated invoice recovery and late payment protection", 
        "Tax estimate alerts and quarterly compliance monitoring",
        "Client risk scoring and portfolio assessment",
        "Automated follow-up sequences for ghosted clients"
      ],
      benefits: [
        "Reduce payment delays by 94%",
        "Protect against contract disputes",
        "Stay compliant with tax requirements",
        "Make data-driven client decisions"
      ]
    },
    "Quote Nudge": {
      description: "Intelligent follow-up engine that converts pending quotes into confirmed deals with automated SMS nudges.",
      features: ["Free 3 credits per signup", "Automated SMS sequences", "Smart scheduling", "Conversion analytics", "Alert when credits end"],
      benefits: [
        "Increase conversion rates by 28%",
        "Save time on manual follow-ups",
        "Never miss a follow-up opportunity",
        "Track engagement and optimize timing"
      ],
      limits: { starter: "3 free credits on signup", growth: "500 credits per month", pro: "2000 credits per month" }
    },
    "Contract Management": {
      description: "Comprehensive contract analysis and risk assessment for freelance agreements.",
      features: [
        "AI-powered risk scanning",
        "Compliance checking",
        "Payment term optimization",
        "Clause recommendations",
        "Digital signature tracking"
      ],
      tips: [
        "Always include clear payment terms",
        "Define scope of work specifically",
        "Add late payment penalties",
        "Use milestone-based payments"
      ]
    },
    "Payment Protection": {
      description: "Automated systems to ensure timely payments and reduce late payments.",
      features: [
        "Automated payment reminders",
        "Late fee calculations",
        "Escrow recommendations",
        "Payment tracking dashboard",
        "Client payment history"
      ],
      tips: [
        "Set up automated reminders 3 days before due",
        "Use milestone payments for larger projects",
        "Always have written payment agreements",
        "Consider escrow for new clients"
      ]
    },
    "Client Management": {
      description: "Tools to assess, track, and manage client relationships effectively.",
      features: [
        "Risk scoring algorithm",
        "Communication tracking",
        "Payment history analysis",
        "Project profitability metrics",
        "Client segmentation"
      ],
      tips: [
        "Screen new clients thoroughly",
        "Maintain detailed communication records",
        "Track project profitability per client",
        "Diversify client base to reduce risk"
      ]
    },
    "Tax & Compliance": {
      description: "Automated tax estimates and compliance monitoring for freelancers.",
      features: [
        "Quarterly tax estimates",
        "1099 form tracking",
        "Deductible expense categorization",
        "Tax deadline reminders",
        "Compliance status monitoring"
      ],
      tips: [
        "Set aside 25-30% for taxes",
        "Track all business expenses",
        "Pay quarterly estimated taxes",
        "Keep records for 3-7 years"
      ]
    },
    "Business Growth": {
      description: "Strategies and tools to scale your freelance business effectively.",
      features: [
        "Revenue forecasting",
        "Client acquisition analytics",
        "Pricing optimization insights",
        "Market trend analysis",
        "Competitive positioning"
      ],
      tips: [
        "Raise rates annually for inflation",
        "Build a referral network",
        "Specialize in high-value services",
        "Create scalable service packages"
      ]
    },
    "Plans & Pricing": {
      description: "Flexible subscription plans designed for freelancer growth stages.",
      plans: {
        starter: { 
          price: "$29/month", 
          features: ["Basic protection tools", "50 Quote Nudge credits", "Email support", "Contract templates"],
          idealFor: "New freelancers just starting out"
        },
        growth: { 
          price: "$79/month", 
          features: ["All protection features", "200 Quote Nudge credits", "Priority support", "Advanced analytics", "Tax estimates"],
          idealFor: "Established freelancers with multiple clients"
        },
        pro: { 
          price: "$199/month", 
          features: ["Unlimited everything", "Custom integrations", "Dedicated support", "API access", "White-label options"],
          idealFor: "Freelance agencies and high-volume businesses"
        }
      },
      credits: ["Additional credit packs available", "Pay-as-you-go option", "Bulk discounts available"]
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

  const analyzeUserIntent = (message: string): { intent: string; confidence: number; suggestedAction: string } => {
    const lowerMessage = message.toLowerCase().trim();
    
    // Intent analysis patterns with confidence scoring
    const intentPatterns = [
      // Payment issues - high confidence indicators
      {
        intent: "late_payment_recovery",
        keywords: ["not paying", "late payment", "haven't paid", "overdue", "payment overdue", "client not paying", "no payment", "waiting for payment"],
        confidence: 0.9,
        action: "guide_to_payment_protection"
      },
      {
        intent: "payment_protection",
        keywords: ["payment", "get paid", "invoice", "billing", "payment terms", "deposit", "milestone"],
        confidence: 0.8,
        action: "explain_payment_protection"
      },
      
      // Contract issues - high confidence indicators
      {
        intent: "contract_risk",
        keywords: ["contract", "agreement", "legal", "terms", "clause", "dispute", "breach", "sue", "lawsuit"],
        confidence: 0.9,
        action: "guide_to_contract_scanner"
      },
      {
        intent: "contract_advice",
        keywords: ["should include", "contract template", "protect myself", "legal protection", "terms"],
        confidence: 0.8,
        action: "provide_contract_tips"
      },
      
      // Lead and quote conversion
      {
        intent: "quote_conversion",
        keywords: ["quote", "proposal", "convert", "follow up", "no response", "ghosted", "silent", "haven't heard back"],
        confidence: 0.85,
        action: "guide_to_quote_nudge"
      },
      {
        intent: "lead_followup",
        keywords: ["lead", "prospect", "client", "follow-up", "nudge", "reminder", "chase"],
        confidence: 0.8,
        action: "explain_followup_strategies"
      },
      
      // Client management
      {
        intent: "client_risk",
        keywords: ["bad client", "difficult client", "client problem", "client issue", "red flag", "screen client"],
        confidence: 0.85,
        action: "guide_to_client_scoring"
      },
      {
        intent: "client_management",
        keywords: ["client", "customer", "relationship", "communication", "manage clients"],
        confidence: 0.7,
        action: "provide_client_management_tips"
      },
      
      // Tax and compliance
      {
        intent: "tax_compliance",
        keywords: ["tax", "irs", "1099", "quarterly", "estimated tax", "deduction", "expense"],
        confidence: 0.9,
        action: "guide_to_tax_alerts"
      },
      
      // Business growth
      {
        intent: "business_growth",
        keywords: ["grow", "scale", "increase", "more clients", "raise rates", "pricing", "marketing"],
        confidence: 0.8,
        action: "provide_growth_strategies"
      },
      
      // Platform guidance
      {
        intent: "feature_help",
        keywords: ["how to", "feature", "dashboard", "shield", "nudge", "tool", "module"],
        confidence: 0.7,
        action: "explain_platform_features"
      }
    ];
    
    // Find best matching intent
    let bestMatch = { intent: "general_help", confidence: 0.5, suggestedAction: "provide_general_guidance" };
    
    for (const pattern of intentPatterns) {
      const matchCount = pattern.keywords.filter(keyword => lowerMessage.includes(keyword)).length;
      const matchRatio = matchCount / pattern.keywords.length;
      
      if (matchRatio > 0 && matchRatio > bestMatch.confidence) {
        bestMatch = {
          intent: pattern.intent,
          confidence: matchRatio,
          suggestedAction: pattern.action
        };
      }
    }
    
    return bestMatch;
  };

  const extractContextFromMessages = (messages: Message[]): { previousIntents: string[], keyInfo: string[], lastTopic: string } => {
    const previousIntents: string[] = [];
    const keyInfo: string[] = [];
    let lastTopic = "";
    
    // Analyze last few messages for context
    const recentMessages = messages.slice(-4); // Last 4 messages for context
    
    for (const message of recentMessages) {
      if (message.sender === "user") {
        const intent = analyzeUserIntent(message.text);
        if (intent.confidence > 0.7) {
          previousIntents.push(intent.intent);
          lastTopic = intent.intent;
        }
        
        // Extract key information from user messages
        const lowerText = message.text.toLowerCase();
        
        // Payment timing
        if (lowerText.includes("week") || lowerText.includes("days")) {
          const timeMatch = message.text.match(/\d+\s*(week|weeks|day|days)/i);
          if (timeMatch) keyInfo.push(`time: ${timeMatch[0]}`);
        }
        
        // Client relationship
        if (lowerText.includes("client") || lowerText.includes("customer")) {
          keyInfo.push("has_client_issue");
        }
        
        // Quote/proposal status
        if (lowerText.includes("quote") || lowerText.includes("proposal")) {
          keyInfo.push("has_quote_issue");
        }
        
        // Contract concerns
        if (lowerText.includes("contract") || lowerText.includes("agreement")) {
          keyInfo.push("has_contract_concern");
        }
        
        // Tax issues
        if (lowerText.includes("tax") || lowerText.includes("quarterly")) {
          keyInfo.push("has_tax_concern");
        }
      }
    }
    
    return { previousIntents, keyInfo, lastTopic };
  };

  const generateContextualResponse = (userMessage: string, intent: { intent: string; confidence: number; suggestedAction: string }, context: { previousIntents: string[], keyInfo: string[], lastTopic: string }): string => {
    const lowerMessage = userMessage.toLowerCase().trim();
    
    // Check if this is a follow-up message about the same topic
    const isFollowUp = context.previousIntents.includes(intent.intent) || 
                     context.keyInfo.some(info => {
                       if (intent.intent === "late_payment_recovery" && info.includes("client")) return true;
                       if (intent.intent === "quote_conversion" && info.includes("quote")) return true;
                       if (intent.intent === "contract_risk" && info.includes("contract")) return true;
                       if (intent.intent === "tax_compliance" && info.includes("tax")) return true;
                       return false;
                     });
    
    // Handle follow-up responses with context
    if (isFollowUp && context.previousIntents.length > 0) {
      switch (intent.intent) {
        case "late_payment_recovery":
          const timeInfo = context.keyInfo.find(info => info.includes("time"));
          if (timeInfo) {
            return `It sounds like your client payment is delayed. This happens often in freelancing when invoices are ignored or communication slows down.

You can use the Invoice Recovery Automation feature in FreelancerShield. It automatically sends smart reminders through email and SMS until the payment is completed.

Would you like help setting up an automated recovery sequence?`;
          }
          return `It sounds like you're still dealing with this payment issue. Late payments can really disrupt your cash flow.

Invoice Recovery Automation can handle the follow-up process for you with professional reminders and automatic late fee calculations.

How many more days are you willing to wait before escalating this?`;
        
        case "quote_conversion":
          return `It seems your prospect isn't responding to your quote. This is a common challenge when clients go silent during the decision process.

Quote Nudge's automated follow-up system can send gentle reminders at the right times to re-engage them without being pushy.

Would you like me to help you craft a follow-up message?`;
        
        case "contract_risk":
          return `I understand you're still concerned about this contract situation. Contract issues can create serious problems down the line.

The Contract Risk Scanner can identify specific clauses that might put you at risk and suggest improvements.

What specific part of the contract worries you most?`;
        
        case "client_risk":
          return `It sounds like you're still evaluating this client situation. Client relationships can make or break your freelance business.

Client Risk Score analyzes payment patterns and communication to help you decide whether to proceed with the project.

What specific red flags have you noticed so far?`;
        
        case "tax_compliance":
          return `I hear you're still working on your tax situation. Tax compliance is one of the most important parts of running a freelance business.

Tax Estimate Alerts can calculate exactly how much to set aside each quarter and send you reminders before deadlines.

What's your current annual income range? I can give you specific guidance.`;
      }
    }
    
    // Handle vague/short messages with smart follow-up questions
    if (userMessage.length < 10 || intent.confidence < 0.7) {
      // Specific patterns for very short messages
      if (lowerMessage.includes("client") && (lowerMessage.includes("pay") || lowerMessage.includes("payment"))) {
        return `It sounds like you're having a payment issue with a client. This is one of the most frustrating parts of freelancing.

Invoice Recovery Automation can send professional reminders and apply late fees automatically so you don't have to chase payments manually.

How long has the payment been overdue?`;
      }
      
      if (lowerMessage.includes("quote") && (lowerMessage.includes("no") || lowerMessage.includes("response") || lowerMessage.includes("back"))) {
        return `It seems your prospect went silent on your quote. This happens frequently when clients are busy or comparing options.

Quote Nudge can automatically send follow-up messages at the right times to bring them back into the conversation.

Is the client currently replying to your messages at all?`;
      }
      
      if (lowerMessage.includes("contract") || lowerMessage.includes("agreement")) {
        return `I understand you have questions about a contract. Contracts are your most important protection as a freelancer.

The Contract Risk Scanner can analyze your agreement and flag any clauses that might put you at risk.

Do you already have a contract with this client?`;
      }
      
      if (lowerMessage.includes("ghost") || lowerMessage.includes("disappear") || lowerMessage.includes("silent")) {
        return `It sounds like a client has gone silent on you. This can be really concerning when you're in the middle of a project or negotiation.

Ghosted Client Recovery Sequences are designed specifically to bring back clients who have disappeared mid-conversation.

When did you last hear from them?`;
      }
      
      // General vague message handling with smart follow-up
      return `I'm here to help with your freelance business challenges. I can assist with payments, contracts, clients, and growing your business.

What specific situation are you dealing with right now?`;
    }
    
    // Handle high-confidence intents with 4-step structure
    switch (intent.intent) {
      case "late_payment_recovery":
        return `It sounds like your client payment is delayed. This happens often in freelancing when invoices are ignored or communication slows down.

You can use the Invoice Recovery Automation feature in FreelancerShield. It automatically sends smart reminders through email and SMS until the payment is completed.

How long has the payment been overdue?`;
        
      case "contract_risk":
        return `I understand you're concerned about contract risks. This is smart - contracts are your main protection in freelancing.

The Contract Risk Scanner analyzes payment terms, scope clarity, and liability clauses to identify potential problems before they hurt you.

What specific part of the contract worries you most?`;
        
      case "quote_conversion":
        return `It sounds like you need help converting quotes to paying clients. Converting prospects is one of the biggest challenges freelancers face.

Quote Nudge can boost your conversion rate by 28% with automated follow-ups sent at the perfect times through email and SMS.

What's your current follow-up process like?`;
        
      case "client_risk":
        return `I understand you're worried about a client situation. Client screening is essential for protecting your time and income.

Client Risk Score analyzes payment history, communication patterns, and project complexity to help you make smarter decisions.

What specific concerns do you have about this client?`;
        
      case "tax_compliance":
        return `I hear you need help with tax compliance. Taxes are one of the most important aspects of running a successful freelance business.

Tax Estimate Alerts provide quarterly calculations, track 1099s, and send deadline reminders to keep you compliant and avoid penalties.

What's your current tax planning process like?`;
        
      default:
        return generateResponse(userMessage, context);
    }
  };

  const generateResponse = (userMessage: string, context?: { previousIntents: string[], keyInfo: string[], lastTopic: string }): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // First, analyze intent
    const intent = analyzeUserIntent(userMessage);
    
    // Use contextual response if confidence is high or message is vague
    if (intent.confidence > 0.7 || userMessage.length < 10) {
      const conversationContext = context || extractContextFromMessages(messages);
      return generateContextualResponse(userMessage, intent, conversationContext);
    }
    
    // Fall back to original keyword-based responses for specific queries
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey") || lowerMessage.includes("good morning") || lowerMessage.includes("good afternoon")) {
      return "Hello! I'm here to help you manage your freelance business more effectively. Whether you need advice on contracts, payments, client management, or growing your business, I've got you covered. What specific challenge are you facing today?";
    }

    // Platform guidance
    if (lowerMessage.includes("feature") || lowerMessage.includes("how does") || lowerMessage.includes("what is") || lowerMessage.includes("explain")) {
      // Check for specific feature mentions
      for (const featureName of Object.keys(featureExplanations)) {
        if (lowerMessage.includes(featureName.toLowerCase())) {
          return explainFeature(featureName);
        }
      }
      
      return `I can explain any FreelancerShield feature in simple terms! Here are some popular ones:

Contract Risk Scanner - Analyzes contracts for risky clauses
Invoice Recovery Automation - Automatically chases late payments
Client Risk Score - Predicts if clients will pay on time
Tax Estimate Alerts - Calculates quarterly tax payments

Which feature would you like me to explain?`;
    }

    // FreelancerShield specific help
    if (lowerMessage.includes("freelancershield") || lowerMessage.includes("shield")) {
      return `I hear you're interested in FreelancerShield. It's designed to protect freelancers like you from common business risks.

The suite includes contract analysis, payment protection, tax alerts, and client screening tools to help you run your business more safely.

Which FreelancerShield feature would you like to explore first?`;
    }

    // Quote Nudge help
    if (lowerMessage.includes("quote nudge") || lowerMessage.includes("nudge") || lowerMessage.includes("follow-up")) {
      const userCredits = userProfile?.credits || 3;
      
      if (userCredits <= 0) {
        return `It sounds like you need more Quote Nudge credits. That's great you're getting value from the automated follow-ups.

You can upgrade to Growth Plan for 500 credits/month or Pro Plan for 2000 credits/month.

How many quotes are you typically sending each month?`;
      }
      
      return `You're asking about Quote Nudge. It's excellent for converting quotes to paying clients without the manual follow-up work.

The system sends automated follow-ups through email and SMS at the perfect times to boost your conversion rate.

You have ${userCredits} credits available. Want to set up your first automated sequence?`;
    }

    // Contract management help
    if (lowerMessage.includes("contract") || lowerMessage.includes("agreement")) {
      return `I understand you need help with contracts. They're your most important protection as a freelancer.

The Contract Risk Scanner analyzes payment terms, scope clarity, and liability issues automatically so you don't miss anything risky.

Do you have a specific contract you'd like me to help you review?`;
    }

    // Payment and invoice help
    if (lowerMessage.includes("payment") || lowerMessage.includes("invoice") || lowerMessage.includes("late payment") || lowerMessage.includes("get paid")) {
      return `I hear you're dealing with payment challenges. This is one of the biggest stress points for freelancers.

Invoice Recovery Automation sends professional reminders and applies late fees automatically so you can focus on your work instead of chasing payments.

How many days overdue is your latest payment?`;
    }

    // Client management help
    if (lowerMessage.includes("client") || lowerMessage.includes("customer") || lowerMessage.includes("risk score")) {
      return `I understand you need help with client management. Good client relationships can make or break your freelance business.

Client Risk Score analyzes payment history, communication patterns, and project complexity to help you make smarter decisions about who to work with.

What's your biggest client management challenge right now?`;
    }

    // Tax and compliance help
    if (lowerMessage.includes("tax") || lowerMessage.includes("compliance") || lowerMessage.includes("1099") || lowerMessage.includes("quarterly")) {
      return `I hear you need help with tax compliance. Taxes are one of the most important parts of running a successful freelance business.

Tax Estimate Alerts calculate exactly how much to set aside each quarter and send reminders before deadlines so you never get surprised by tax bills.

What's your current tax planning process like?`;
    }

    // Business growth help
    if (lowerMessage.includes("growth") || lowerMessage.includes("scale") || lowerMessage.includes("pricing") || lowerMessage.includes("rates") || lowerMessage.includes("business growth")) {
      return `It sounds like you're thinking about business growth. That's exciting for any freelancer looking to scale up.

FreelancerShield provides revenue forecasting, client analytics, and conversion insights to help you make smart decisions about growing your business.

What's your current monthly revenue goal?`;
    }

    // Pricing and plans help
    if (lowerMessage.includes("pricing") || lowerMessage.includes("plan") || lowerMessage.includes("cost") || lowerMessage.includes("subscription")) {
      return `I understand you want to know about pricing plans. Let me help you choose the right one for your business.

Starter is $29/month for new freelancers, Growth is $79/month for established businesses, and Pro is $199/month for agencies with high volume.

How many clients are you currently working with?`;
    }

    // General freelancer advice
    if (lowerMessage.includes("how to") || lowerMessage.includes("getting started") || lowerMessage.includes("begin") || lowerMessage.includes("advice")) {
      return `I hear you're looking for freelancer advice. That's smart - seeking guidance is one of the best ways to avoid common mistakes.

Start with FreelancerShield for contract protection, use Quote Nudge for automated follow-ups, and track everything for taxes.

What specific area would you like to dive deeper into first?`;
    }

    // Credit balance inquiries
    if (lowerMessage.includes("credit") && (lowerMessage.includes("left") || lowerMessage.includes("remaining") || lowerMessage.includes("balance"))) {
      if (!isSignedIn) {
        return "To check your credit balance, you'll need to sign in first. You'll get 3 free Quote Nudge credits just for signing up!";
      }
      const userCredits = userProfile?.credits || 0;
      if (userCredits <= 0) {
        return "You're currently out of credits! The Growth Plan gives you 500 credits per month. Would you like me to help you choose the best option?";
      }
      return `You have ${userCredits} Quote Nudge credits remaining! Each follow-up uses 1 credit. Want tips on making the most of them?`;
    }

    // Help and guidance responses
    if (lowerMessage.includes("help") || lowerMessage.includes("support") || lowerMessage.includes("problem") || lowerMessage.includes("issue")) {
      return `I'm here to help solve your freelance business challenges! I specialize in helping with payments, contracts, clients, and growth.

I can guide you to the right FreelancerShield tools for your specific situation.

What problem are you facing right now?`;
    }

    // Default response - conversational and helpful
    return `I'm your freelance business assistant! I'm here to help you manage clients, payments, contracts, and grow your business.

I can assist with late payments, ghosted clients, converting leads, and protecting your income.

What's on your mind today?`;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Extract context from previous messages
    const context = extractContextFromMessages(messages);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(inputValue, context),
        sender: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
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
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="relative gap-2 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 shadow-lg hover:shadow-xl transition-all duration-300 rounded-full px-4 py-3 h-14 w-14 md:h-auto md:w-auto md:px-4 md:py-2"
        >
          <MessageCircle className="h-6 w-6 md:h-5 md:w-5" />
          <span className="hidden md:inline text-sm md:text-sm">AI Assistant</span>
          {!isOnline && (
            <Badge variant="destructive" className="absolute -top-2 -right-2 h-3 w-3 p-0" />
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed inset-x-4 bottom-4 md:inset-x-auto md:left-auto md:right-4 md:bottom-4 z-50 mx-auto max-w-sm md:max-w-md w-full md:w-auto">
      <Card className="shadow-2xl border-0 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
        {/* Header */}
        <CardHeader className="flex flex-row items-center justify-between p-4 md:p-4 border-b bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-t-lg">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 md:h-5 md:w-5" />
            <div>
              <h3 className="font-semibold text-base md:text-base">Vintico AI Assistant</h3>
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
              <ScrollArea className="h-72 md:h-96 p-4">
                <div className="space-y-4">
                  {messages.length === 0 && (
                    <div className="text-center text-muted-foreground py-8">
                      <Bot className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                      <h4 className="font-semibold mb-2 text-base">Welcome to your Freelance Business Assistant!</h4>
                      <p className="text-sm">
                        I'm here to help you manage contracts, payments, clients, and grow your freelance business. Ask me anything about running a successful freelance practice!
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
                        className={`max-w-[85%] md:max-w-[80%] rounded-lg p-3 ${
                          message.sender === "user"
                            ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white"
                            : "bg-muted"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-line">{message.text}</p>
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
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={
                    !isOnline
                      ? "Offline - Limited responses available"
                      : isSignedIn
                      ? "Ask about contracts, payments, clients, or growing your business..."
                      : "Ask about freelance business management (sign in for personalized help)..."
                  }
                  disabled={!isOnline}
                  className="flex-1 text-base"
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
