"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { getSimulatedLeonResponse } from "@/lib/mock";
import {
  Sparkles,
  Plus,
  Send,
  Globe,
  Mic,
  Paperclip,
  Bot,
  Search,
  Scale,
  TrendingUp,
  Newspaper,
  FileText,
  ShieldAlert,
  ExternalLink,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

let msgCounter = 0;
function generateMsgId(prefix: string): string {
  msgCounter += 1;
  return `${prefix}_${msgCounter}_${Date.now()}`;
}

interface ChatMessage {
  id: string;
  sender: "user" | "leon";
  text: string;
  timestamp: string;
  citations?: { title: string; url: string; relevance: number }[];
  confidence?: number;
}

const STARTER_CARDS = [
  {
    icon: Search,
    title: "Research a company",
    desc: "Get in-depth analysis on any company",
    prompt: "Provide an executive analysis of NVIDIA's datacenter market dominance, key moats, and valuation multiples.",
  },
  {
    icon: Scale,
    title: "Compare companies",
    desc: "Benchmark competitors side by side",
    prompt: "Compare AMD's Instinct MI350 accelerator with NVIDIA's Blackwell B200 on performance, price, and software adoption.",
  },
  {
    icon: TrendingUp,
    title: "Find opportunities",
    desc: "Discover market trends and growth signals",
    prompt: "Identify the fastest growing opportunities across sovereign AI datacenters and optical networking.",
  },
  {
    icon: Newspaper,
    title: "Summarize latest news",
    desc: "Digest recent key industry developments",
    prompt: "Summarize the top high-impact news stories and regulatory filings across semiconductors this week.",
  },
  {
    icon: FileText,
    title: "Generate a report",
    desc: "Create research reports with citations",
    prompt: "Draft an institutional research briefing on hyperscaler custom silicon and gross margin pressure.",
  },
  {
    icon: ShieldAlert,
    title: "Track competitors",
    desc: "Monitor strategic moves and threat alerts",
    prompt: "What are the primary strategic threats facing Intel Foundry Services in executing the 18A node turnaround?",
  },
];

const EXAMPLE_QUESTIONS = [
  "What are NVIDIA's main competitive advantages in AI?",
  "Compare AMD MI300X with NVIDIA Blackwell",
  "Summarize latest regulatory filings for Microsoft",
  "What are the biggest risks facing Intel right now?",
  "Which companies are gaining market share in cloud AI?",
];

export default function LeonAgentChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputQuery, setInputQuery] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [webSearchEnabled, setWebSearchEnabled] = useState(true);
  const [deepResearchEnabled, setDeepResearchEnabled] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isProcessing]);

  const handleSend = useCallback((text?: string) => {
    const query = (text || inputQuery).trim();
    if (!query || isProcessing) return;

    const userMsg: ChatMessage = {
      id: generateMsgId("usr"),
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery("");
    setIsProcessing(true);

    setTimeout(() => {
      const sim = getSimulatedLeonResponse(query, { company: "Enterprise Semiconductor Sector" });
      const leonMsg: ChatMessage = {
        id: generateMsgId("leon"),
        sender: "leon",
        text: sim.response,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        citations: sim.citations,
        confidence: sim.confidence,
      };

      setMessages((prev) => [...prev, leonMsg]);
      setIsProcessing(false);
    }, 1200);
  }, [inputQuery, isProcessing]);

  const handleNewChat = () => {
    setMessages([]);
    setInputQuery("");
  };

  return (
    <AppShell>
      <div className="space-y-4 flex flex-col h-[calc(100vh-6rem)]">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-[#DDD8CE] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#6C4CE8] flex items-center justify-center text-[#F8F6F0] shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-[#11110F]">Leon</h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#E7F3E8] text-[#16803C] border border-[#A5D6A7]">
                  LIVE
                </span>
              </div>
              <p className="text-[11px] text-[#77736B]">
                Your AI market intelligence agent
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleNewChat}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#11110F] text-[#F8F6F0] hover:bg-[#33312B] transition-colors shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Chat</span>
            </button>
          </div>
        </div>

        {/* Main Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1 min-h-0">
          {/* Left Column: Chat History & Composer (8 cols) */}
          <div className="lg:col-span-8 flex flex-col h-full bg-[#F8F6F0] rounded-xl border border-[#DDD8CE] overflow-hidden shadow-sm">
            {/* Scrollable Conversation Stream */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
              {messages.length === 0 ? (
                /* Empty State matching Reference Frame */
                <div className="py-6 sm:py-10 max-w-2xl mx-auto space-y-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#EEE8FF] border border-[#6C4CE8]/30 flex items-center justify-center mx-auto text-[#6C4CE8] shadow-sm">
                    <Bot className="w-8 h-8" />
                  </div>

                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#11110F]">
                      Hi, I&apos;m Leon 👋
                    </h2>
                    <p className="text-xs sm:text-sm text-[#77736B] max-w-md mx-auto mt-1 leading-relaxed">
                      Your AI market intelligence agent. I can help you analyze companies, track competitors, find opportunities, and generate insights.
                    </p>
                  </div>

                  {/* 2x3 Starter Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-left pt-2">
                    {STARTER_CARDS.map((card, idx) => {
                      const IconComp = card.icon;
                      return (
                        <div
                          key={idx}
                          onClick={() => handleSend(card.prompt)}
                          className="p-3.5 rounded-xl bg-[#FBFAF6] border border-[#DDD8CE] hover:border-[#11110F] hover:shadow-xs transition-all cursor-pointer group space-y-1.5"
                        >
                          <div className="w-7 h-7 rounded-lg bg-[#E8E4DB] flex items-center justify-center text-[#11110F] group-hover:bg-[#11110F] group-hover:text-[#F8F6F0] transition-colors">
                            <IconComp className="w-4 h-4" />
                          </div>
                          <div className="font-bold text-xs text-[#11110F]">
                            {card.title}
                          </div>
                          <p className="text-[11px] text-[#77736B] leading-tight">
                            {card.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                /* Active Message Stream */
                <div className="space-y-5 max-w-3xl mx-auto w-full">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={cn(
                        "flex gap-3",
                        msg.sender === "user" ? "justify-end" : "justify-start"
                      )}
                    >
                      {msg.sender === "leon" && (
                        <div className="w-8 h-8 rounded-full bg-[#6C4CE8] text-[#F8F6F0] flex items-center justify-center shrink-0 mt-0.5">
                          <Sparkles className="w-4 h-4" />
                        </div>
                      )}

                      <div
                        className={cn(
                          "p-4 rounded-xl text-xs max-w-2xl space-y-2 leading-relaxed shadow-xs",
                          msg.sender === "user"
                            ? "bg-[#11110F] text-[#F8F6F0] rounded-br-none"
                            : "bg-[#FBFAF6] text-[#11110F] border border-[#DDD8CE] rounded-bl-none"
                        )}
                      >
                        <div className="whitespace-pre-line text-[13px]">
                          {msg.text}
                        </div>

                        {msg.citations && msg.citations.length > 0 && (
                          <div className="pt-2 border-t border-[#DDD8CE] space-y-1.5 text-[11px]">
                            <div className="text-[10px] font-mono uppercase text-[#77736B] font-bold">
                              Verified Citations ({msg.citations.length})
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {msg.citations.map((cite, i) => (
                                <a
                                  key={i}
                                  href={cite.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#E8E4DB] text-[#11110F] hover:bg-[#DDD8CE] text-[10px]"
                                >
                                  <span>{cite.title}</span>
                                  <ExternalLink className="w-2.5 h-2.5" />
                                </a>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="text-[10px] text-[#77736B] font-mono text-right">
                          {msg.timestamp}
                        </div>
                      </div>

                      {msg.sender === "user" && (
                        <div className="w-8 h-8 rounded-full bg-[#E8E4DB] text-[#11110F] border border-[#DDD8CE] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                          M
                        </div>
                      )}
                    </div>
                  ))}

                  {isProcessing && (
                    <div className="flex gap-3 items-center text-xs text-[#77736B]">
                      <div className="w-8 h-8 rounded-full bg-[#6C4CE8] text-[#F8F6F0] flex items-center justify-center shrink-0 animate-pulse">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div className="p-3 rounded-xl bg-[#FBFAF6] border border-[#DDD8CE] text-xs flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#6C4CE8] animate-ping" />
                        <span>Leon is synthesizing verified market telemetry...</span>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Bottom Composer Area */}
            <div className="p-3 sm:p-4 bg-[#FBFAF6] border-t border-[#DDD8CE] space-y-2">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="relative bg-[#F8F6F0] rounded-xl border border-[#DDD8CE] p-2 flex items-center gap-2 focus-within:border-[#11110F] transition-colors"
              >
                <button
                  type="button"
                  className="p-1.5 rounded-lg text-[#77736B] hover:text-[#11110F] hover:bg-[#E8E4DB] transition-colors"
                  title="Attach file or context"
                >
                  <Plus className="w-4 h-4" />
                </button>

                <input
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  placeholder="Ask Leon anything about companies, markets, or industry trends..."
                  className="flex-1 bg-transparent border-0 text-xs text-[#11110F] placeholder-[#77736B] focus:outline-none"
                />

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setWebSearchEnabled(!webSearchEnabled)}
                    className={cn(
                      "p-1.5 rounded-lg text-xs transition-colors",
                      webSearchEnabled
                        ? "text-[#16803C] bg-[#E7F3E8]"
                        : "text-[#77736B] hover:bg-[#E8E4DB]"
                    )}
                    title="Toggle Web Search"
                  >
                    <Globe className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    className="p-1.5 rounded-lg text-[#77736B] hover:text-[#11110F] hover:bg-[#E8E4DB] transition-colors"
                    title="Voice input"
                  >
                    <Mic className="w-4 h-4" />
                  </button>

                  <button
                    type="submit"
                    disabled={!inputQuery.trim() || isProcessing}
                    className="w-8 h-8 rounded-full bg-[#11110F] text-[#F8F6F0] flex items-center justify-center hover:bg-[#33312B] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-xs shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>

              {/* Quick Action Chips */}
              <div className="flex items-center gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setDeepResearchEnabled(!deepResearchEnabled)}
                  className={cn(
                    "px-2.5 py-1 rounded-full text-[11px] font-medium border transition-colors flex items-center gap-1",
                    deepResearchEnabled
                      ? "bg-[#11110F] text-[#F8F6F0] border-[#11110F]"
                      : "bg-[#E8E4DB] text-[#4B4840] border-[#DDD8CE] hover:bg-[#DDD8CE]"
                  )}
                >
                  <Sparkles className="w-3 h-3 text-[#6C4CE8]" />
                  <span>Deep Research</span>
                </button>

                <button
                  type="button"
                  onClick={() => alert("Simulated context file selector opened.")}
                  className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#E8E4DB] text-[#4B4840] border border-[#DDD8CE] hover:bg-[#DDD8CE] transition-colors flex items-center gap-1"
                >
                  <Paperclip className="w-3 h-3" />
                  <span>Import File</span>
                </button>

                <button
                  type="button"
                  onClick={() => setWebSearchEnabled(!webSearchEnabled)}
                  className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#E8E4DB] text-[#4B4840] border border-[#DDD8CE] hover:bg-[#DDD8CE] transition-colors flex items-center gap-1"
                >
                  <Globe className="w-3 h-3" />
                  <span>Web Search</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Capabilities & Suggested Prompts (4 cols) */}
          <div className="lg:col-span-4 space-y-4 overflow-y-auto">
            {/* Card 1: What Leon Can Help With */}
            <div className="bg-[#F8F6F0] rounded-xl border border-[#DDD8CE] p-4 sm:p-5 shadow-sm space-y-3">
              <h3 className="text-sm font-bold text-[#11110F]">
                Leon can help you with
              </h3>

              <div className="space-y-2.5 text-xs text-[#4B4840]">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-md bg-[#E8E4DB] flex items-center justify-center text-[#11110F]">
                    <Search className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#11110F]">Company Analysis</div>
                    <div className="text-[10px] text-[#77736B]">Financials, valuation, products</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-md bg-[#E8E4DB] flex items-center justify-center text-[#11110F]">
                    <Scale className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#11110F]">Company Comparison</div>
                    <div className="text-[10px] text-[#77736B]">Side-by-side benchmark & moats</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-md bg-[#E8E4DB] flex items-center justify-center text-[#11110F]">
                    <TrendingUp className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#11110F]">Market Intelligence</div>
                    <div className="text-[10px] text-[#77736B]">Trends, news, shifts, analysis</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-md bg-[#E8E4DB] flex items-center justify-center text-[#11110F]">
                    <ShieldAlert className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#11110F]">Alerts & Monitoring</div>
                    <div className="text-[10px] text-[#77736B]">Real-time strategic alerts</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-md bg-[#E8E4DB] flex items-center justify-center text-[#11110F]">
                    <FileText className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#11110F]">Report Generation</div>
                    <div className="text-[10px] text-[#77736B]">Custom institutional research</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Example Questions */}
            <div className="bg-[#F8F6F0] rounded-xl border border-[#DDD8CE] p-4 sm:p-5 shadow-sm space-y-3">
              <h3 className="text-sm font-bold text-[#11110F]">
                Example questions
              </h3>

              <div className="space-y-2">
                {EXAMPLE_QUESTIONS.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(q)}
                    className="w-full text-left p-2.5 rounded-lg bg-[#FBFAF6] border border-[#DDD8CE] hover:border-[#11110F] text-xs text-[#11110F] hover:bg-[#F2EFE7] transition-all flex items-center justify-between group"
                  >
                    <span className="line-clamp-2">{q}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#77736B] group-hover:text-[#11110F] shrink-0 ml-1 transition-transform group-hover:translate-x-0.5" />
                  </button>
                ))}
              </div>
            </div>

            {/* Card 3: Agent Engine Details */}
            <div className="bg-[#FBFAF6] rounded-xl border border-[#DDD8CE] p-4 text-xs space-y-2">
              <div className="flex items-center gap-2 text-[#16803C] font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Hermes Agent Framework v0.3</span>
              </div>
              <p className="text-[11px] text-[#77736B] leading-relaxed">
                Operating autonomously on Server 2 (EC2 Private Subnet). Continuous monitoring over SEC EDGAR, patent filings, and datacenter telemetry.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
