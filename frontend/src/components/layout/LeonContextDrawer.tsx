"use client";

import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/shared/status-badge";
import { getSimulatedLeonResponse } from "@/lib/mock";
import {
  Bot,
  Send,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  FileSearch,
  FileText,
} from "lucide-react";

export interface LeonContext {
  type: "intelligence" | "company" | "alert" | "report" | "general" | "comparison";
  id?: string;
  company?: string;
  category?: string;
  impact?: string;
  title?: string;
  summary?: string;
}

interface Message {
  id: string;
  sender: "user" | "leon";
  text: string;
  timestamp: string;
  citations?: { title: string; url: string; relevance: number }[];
  confidence?: number;
  sourcesUsed?: number;
}

interface LeonContextDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  context?: LeonContext;
}

export function LeonContextDrawer({
  open,
  onOpenChange,
  context,
}: LeonContextDrawerProps) {
  const msgIdCounter = React.useRef(0);
  const [messages, setMessages] = useState<Message[]>(() => [
    {
      id: "msg_init",
      sender: "leon",
      text: context?.company
        ? `I am active in the context of ${context.company} (${context.category || "General"}). What competitive analysis or evidence breakdown do you require?`
        : "I am standby in global intelligence mode. What company or market shift would you like to investigate?",
      timestamp: "10:00 AM",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const suggestedQuestions = [
    "Why is this important?",
    `Compare ${context?.company || "AMD"} with NVIDIA`,
    "What is the competitive threat level?",
    "Show verified primary evidence",
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    msgIdCounter.current += 1;
    const currentId = msgIdCounter.current;
    const nowTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const userMsg: Message = {
      id: `usr_${currentId}`,
      sender: "user",
      text: text.trim(),
      timestamp: nowTime,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate agent reasoning delay
    setTimeout(() => {
      const sim = getSimulatedLeonResponse(text, context);
      msgIdCounter.current += 1;
      const leonMsg: Message = {
        id: `leon_${msgIdCounter.current}`,
        sender: "leon",
        text: sim.response,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        citations: sim.citations,
        confidence: sim.confidence,
        sourcesUsed: sim.sourcesUsed,
      };
      setMessages((prev) => [...prev, leonMsg]);
      setIsTyping(false);
    }, 850);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md p-0 flex flex-col bg-card border-l border-border/80 shadow-2xl"
      >
        {/* Header */}
        <SheetHeader className="p-4 border-b border-border/80 bg-muted/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-md bg-cyan-600 text-white shadow-xs">
                <Bot className="size-4" />
              </div>
              <div>
                <SheetTitle className="text-sm font-bold tracking-tight text-foreground">
                  Ask Leon Context Engine
                </SheetTitle>
                <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-mono">
                  <span>HERMES v0.3</span>
                  <span>•</span>
                  <span className="text-cyan-600 dark:text-cyan-400 font-bold">AUTONOMOUS</span>
                </div>
              </div>
            </div>
            <StatusBadge state="Researching" size="sm" />
          </div>

          {/* Active Context Banner */}
          {context && (
            <div className="mt-3 rounded-lg border border-border/60 bg-background/80 p-2 text-xs">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase text-muted-foreground mb-1">
                <span className="flex items-center gap-1">
                  <Sparkles className="size-3 text-primary" /> Active Dashboard Context
                </span>
                <span className="font-bold text-primary">{context.type.toUpperCase()}</span>
              </div>
              <div className="font-semibold text-foreground truncate">
                {context.company ? `${context.company}: ` : ""}
                {context.title || context.id || "Current View"}
              </div>
            </div>
          )}
          <SheetDescription className="sr-only">
            Interactive context-aware conversation drawer with Leon AI Agent
          </SheetDescription>
        </SheetHeader>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${
                m.sender === "user" ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`max-w-[88%] rounded-xl p-3 text-xs leading-relaxed ${
                  m.sender === "user"
                    ? "bg-primary text-primary-foreground font-medium rounded-tr-xs"
                    : "bg-muted/50 border border-border/60 text-foreground rounded-tl-xs space-y-2"
                }`}
              >
                <p>{m.text}</p>

                {/* Citations & Evidence Pill if from Leon */}
                {m.citations && m.citations.length > 0 && (
                  <div className="mt-2.5 pt-2 border-t border-border/60 space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                      <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                        <ShieldCheck className="size-3" />
                        {m.sourcesUsed} Sources Corroborated
                      </span>
                      {m.confidence && (
                        <span>Confidence: {Math.round(m.confidence * 100)}%</span>
                      )}
                    </div>
                    <div className="space-y-1">
                      {m.citations.map((c, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between rounded bg-card p-1.5 text-[10px] font-mono border border-border/40"
                        >
                          <span className="truncate pr-2">{c.title}</span>
                          <ExternalLink className="size-2.5 text-muted-foreground shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <span className="text-[10px] text-muted-foreground mt-1 px-1 font-mono">
                {m.timestamp}
              </span>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground p-2">
              <Bot className="size-3.5 text-cyan-500 animate-spin" />
              <span className="font-mono text-[11px]">Leon is parsing knowledge vectors...</span>
            </div>
          )}
        </div>

        {/* Suggested Queries */}
        <div className="p-3 border-t border-border/60 bg-muted/10 space-y-2">
          <div className="text-[10px] font-mono uppercase text-muted-foreground">
            Suggested Context Inquiries
          </div>
          <div className="flex flex-wrap gap-1.5">
            {suggestedQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSend(q)}
                className="rounded-md border border-border/60 bg-card px-2 py-1 text-[11px] text-foreground hover:border-primary hover:text-primary transition-colors text-left"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar & Actions */}
        <div className="p-3 border-t border-border/80 bg-card">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Ask Leon about ${context?.company || "market intel"}...`}
              className="text-xs h-9"
            />
            <Button type="submit" size="icon-sm" className="size-9 shrink-0">
              <Send className="size-4" />
            </Button>
          </form>

          <div className="mt-2.5 flex items-center justify-between text-[11px]">
            <Button
              variant="ghost"
              size="xs"
              onClick={() => alert(`Autonomous Investigation initiated for ${context?.company || "target"}`)}
              className="text-[11px] text-primary h-6 px-1.5"
            >
              <FileSearch className="size-3 mr-1" /> Launch Deep Investigation
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => alert(`Report generation started for ${context?.company || "target"}`)}
              className="text-[11px] text-muted-foreground h-6 px-1.5"
            >
              <FileText className="size-3 mr-1" /> Generate Briefing
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
