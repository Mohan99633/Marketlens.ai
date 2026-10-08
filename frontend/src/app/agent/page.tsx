"use client";

import React, { useState, useEffect } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { getAgentStatus, getAgentTasks, getAgentWatchers, getSimulatedLeonResponse } from "@/lib/mock";
import { AgentTask } from "@/lib/types/models";
import { AgentWatcher, MOCK_AGENT_STATUS } from "@/lib/mock/agent";
import { LeonAgentState } from "@/lib/types/design-system";
import {
  Sparkles,
  Server,
  Activity,
  Cpu,
  Clock,
  CheckCircle2,
  Send,
  Eye,
  RefreshCw,
  Terminal,
} from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "user" | "leon";
  text: string;
  timestamp: string;
  citations?: { title: string; url: string; relevance: number }[];
  confidence?: number;
  sourcesCount?: number;
}

export default function LeonControlCenterPage() {
  const [agentStatus, setAgentStatus] = useState<typeof MOCK_AGENT_STATUS | null>(null);
  const [tasks, setTasks] = useState<AgentTask[]>([]);
  const [watchers, setWatchers] = useState<AgentWatcher[]>([]);
  const [currentState, setCurrentState] = useState<LeonAgentState>("Researching");
  const [inputPrompt, setInputPrompt] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg_init",
      sender: "leon",
      text: "Leon autonomous engine online. Connected to Hermes Agent runtime on Server 2 (EC2 Private Subnet). I am actively monitoring 6 core enterprise entities across SEC filings, cloud benchmarks, and semiconductor supply chains. What would you like to investigate?",
      timestamp: "10:00 AM",
      confidence: 0.98,
      sourcesCount: 28410,
    },
  ]);

  useEffect(() => {
    getAgentStatus().then((s) => {
      setAgentStatus(s);
      setCurrentState(s.state);
    });
    getAgentTasks().then((t) => setTasks(t));
    getAgentWatchers().then((w) => setWatchers(w));
  }, []);

  const handleSendPrompt = (promptText?: string) => {
    const textToSend = promptText || inputPrompt;
    if (!textToSend.trim() || isProcessing) return;

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt("");
    setIsProcessing(true);
    setCurrentState("Analyzing");

    setTimeout(() => {
      setCurrentState("Validating");
    }, 900);

    setTimeout(() => {
      const leonSim = getSimulatedLeonResponse(textToSend, { company: "Enterprise Semiconductor Sector" });
      const leonMsg: ChatMessage = {
        id: `leon_${Date.now()}`,
        sender: "leon",
        text: leonSim.response,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        citations: leonSim.citations,
        confidence: leonSim.confidence,
        sourcesCount: leonSim.sourcesUsed,
      };

      setMessages((prev) => [...prev, leonMsg]);
      setIsProcessing(false);
      setCurrentState("Researching");
    }, 1800);
  };

  const activeTasks = tasks.filter((t) => t.status === "active");
  const completedTasks = tasks.filter((t) => t.status === "completed");

  const stateColors: Record<LeonAgentState, { badge: string; text: string }> = {
    Starting: { badge: "bg-sky-50 text-sky-700 border-sky-200", text: "Initializing runtime subsystems" },
    Idle: { badge: "bg-slate-100 text-slate-700 border-slate-200", text: "Standing by for task assignment" },
    Researching: { badge: "bg-blue-50 text-blue-700 border-blue-200", text: "Collecting & crawling multi-source data" },
    Analyzing: { badge: "bg-indigo-50 text-indigo-700 border-indigo-200", text: "Evaluating cross-entity moats & metrics" },
    Validating: { badge: "bg-amber-50 text-amber-700 border-amber-200", text: "Cross-referencing citations & confidence" },
    Generating: { badge: "bg-emerald-50 text-emerald-700 border-emerald-200", text: "Synthesizing intelligence & dossiers" },
    Completed: { badge: "bg-emerald-50 text-emerald-700 border-emerald-200", text: "Task execution finished" },
    Error: { badge: "bg-rose-50 text-rose-700 border-rose-200", text: "Pipeline anomaly detected" },
    Offline: { badge: "bg-slate-200 text-slate-800 border-slate-300", text: "Engine disconnected" },
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header with Server 2 Connection Status */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-white p-5 rounded-lg border border-slate-200 shadow-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                LEON ● ONLINE
              </span>
              <span className="text-xs font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                {agentStatus?.frameworkVersion || "Hermes Agent v0.3.1"}
              </span>
              <span className="text-xs text-slate-500 flex items-center gap-1 font-mono">
                <Server className="w-3.5 h-3.5 text-slate-400" />
                {agentStatus?.serverLocation || "Server 2 (AWS EC2 Private Subnet)"}
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Leon Autonomous Control Center
            </h1>
            <p className="text-xs text-slate-500">
              Live telemetry, real-time pipeline visualization, background watchers, and executive dispatch console.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono divide-x divide-slate-100 bg-slate-50 p-3 rounded-md border border-slate-200">
            <div className="pr-3">
              <span className="text-slate-500 block text-[10px]">UPTIME</span>
              <span className="font-bold text-slate-800">39h 40m</span>
            </div>
            <div className="px-3">
              <span className="text-slate-500 block text-[10px]">INDEXED SOURCES</span>
              <span className="font-bold text-slate-800">
                {agentStatus?.totalSourcesIndexed ? agentStatus.totalSourcesIndexed.toLocaleString() : "28,410"}
              </span>
            </div>
            <div className="px-3">
              <span className="text-slate-500 block text-[10px]">CONFIDENCE</span>
              <span className="font-bold text-emerald-700">
                {agentStatus?.accuracyConfidence ? `${(agentStatus.accuracyConfidence * 100).toFixed(1)}%` : "94.2%"}
              </span>
            </div>
            <div className="pl-3">
              <span className="text-slate-500 block text-[10px]">ACTIVE WORKERS</span>
              <span className="font-bold text-blue-700">{agentStatus?.activeTasksCount || 2} Parallel</span>
            </div>
          </div>
        </div>

        {/* 3D Core & Pipeline Stage Visualizer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 3D Leon Intelligence Core Interactive Card */}
          <div className="lg:col-span-5 bg-white rounded-lg border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-blue-600" />
                  <h2 className="text-sm font-bold text-slate-900">Autonomous Neural Core</h2>
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded text-[11px] font-semibold border ${
                    stateColors[currentState].badge
                  }`}
                >
                  {currentState}
                </span>
              </div>

              <div className="py-2 flex flex-col items-center justify-center relative">
                <div className="w-[200px] h-[200px] rounded-full bg-blue-50/50 flex items-center justify-center border-4 border-blue-100 shadow-inner">
                  <Cpu className="w-16 h-16 text-blue-500" />
                </div>
                <div className="text-center mt-4">
                  <span className="text-xs font-semibold text-slate-800 block">
                    {stateColors[currentState].text}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono mt-1 block">
                    Professional 2D Intelligence Core
                  </span>
                </div>
              </div>
            </div>

            {/* Manual State Simulation Trigger Buttons */}
            <div className="pt-3 border-t border-slate-100 space-y-1.5">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Simulate Agent Phase State:
              </span>
              <div className="grid grid-cols-3 gap-1.5 text-xs">
                {(["Idle", "Researching", "Analyzing", "Validating", "Generating", "Error"] as LeonAgentState[]).map(
                  (st) => (
                    <button
                      key={st}
                      onClick={() => setCurrentState(st)}
                      className={`px-2 py-1 rounded text-[11px] font-medium border transition-colors ${
                        currentState === st
                          ? "bg-slate-900 text-white border-slate-900 font-bold"
                          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      {st}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Autonomous Pipeline Stages & Current Activity */}
          <div className="lg:col-span-7 bg-white rounded-lg border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-600" />
                  Autonomous Execution Pipeline
                </h2>
                <span className="text-xs text-slate-500 font-mono">Hermes Workflow DAG</span>
              </div>

              {/* Step DAG */}
              <div className="grid grid-cols-5 gap-2 my-4">
                {[
                  { name: "Ingestion", desc: "Crawlers & Feeds", active: true, done: true },
                  { name: "Research", desc: "SEC & Benchmarks", active: currentState === "Researching", done: true },
                  { name: "Analysis", desc: "Moat Evaluation", active: currentState === "Analyzing", done: false },
                  { name: "Validation", desc: "Cross-Checking", active: currentState === "Validating", done: false },
                  { name: "Synthesis", desc: "Dossier / Alert", active: currentState === "Generating", done: false },
                ].map((step, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 rounded border text-center transition-all ${
                      step.active
                        ? "bg-blue-50 border-blue-300 ring-2 ring-blue-500/20"
                        : step.done
                        ? "bg-slate-50 border-slate-200"
                        : "bg-white border-slate-200 opacity-60"
                    }`}
                  >
                    <span className="text-[10px] font-bold text-slate-400 block font-mono">
                      0{idx + 1}
                    </span>
                    <span className="text-xs font-bold text-slate-900 block truncate">
                      {step.name}
                    </span>
                    <span className="text-[10px] text-slate-500 block truncate mt-0.5">
                      {step.desc}
                    </span>
                  </div>
                ))}
              </div>

              {/* Active Task Live Progress */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Active Dispatched Workloads ({activeTasks.length}):
                </span>
                {activeTasks.map((t) => (
                  <div
                    key={t.id}
                    className="p-3.5 rounded-lg border border-blue-200 bg-blue-50/20 text-xs space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{t.subject}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 font-mono">
                        {t.state}
                      </span>
                    </div>
                    <p className="text-slate-600 text-[11px]">{t.progress.phase}</p>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                      <span>Gathered: {t.progress.sourcesGathered} sources</span>
                      <span>Analyzed: {t.progress.sourcesAnalyzed}</span>
                      <span>Insights: {t.progress.insightsGenerated}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Watchers Quick Summary */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-blue-600" />
                {watchers.length} continuous watchers armed across portfolio tickers
              </span>
              <span className="font-mono text-emerald-700 font-medium">Telemetry active</span>
            </div>
          </div>
        </div>

        {/* Watchers Radar & Continuous Monitoring Grid */}
        <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-blue-600" />
                Armed Continuous Watchers Radar
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Automated listeners triggering deep research upon anomaly detection in filings, pull requests, or spot pricing.
              </p>
            </div>
            <span className="text-xs font-mono bg-slate-100 text-slate-700 px-2 py-1 rounded">
              4 Monitored Vectors
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {watchers.map((w) => (
              <div
                key={w.id}
                className="p-3 rounded-lg border border-slate-200 bg-slate-50/40 text-xs space-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 font-mono">{w.targetTicker}</span>
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                        w.status === "Triggered"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {w.status}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 block truncate">{w.targetName}</span>
                  <p className="text-slate-600 text-[11px] mt-1 line-clamp-2">{w.criteria}</p>
                </div>
                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                  <span>Freq: {w.frequency}</span>
                  <span>Triggers: {w.triggerCount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conversational Interaction & Task Dispatch Console */}
        <div className="bg-card rounded-md border border-border shadow-xs overflow-hidden flex flex-col h-[600px]">
          {/* Console Header */}
          <div className="p-4 bg-background border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold font-mono tracking-wider text-foreground">
                LEON INTELLIGENCE DISPATCH CONSOLE
              </span>
              <span className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded font-mono border border-border">
                Context-Aware Reasoning
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-muted-foreground text-[11px]">Hermes Shell</span>
            </div>
          </div>

          {/* Quick Prompts Bar */}
          <div className="px-4 py-2.5 bg-background border-b border-border flex items-center gap-2 overflow-x-auto text-xs">
            <span className="text-muted-foreground font-semibold uppercase tracking-wider text-[10px] whitespace-nowrap">
              Suggested Investigations:
            </span>
            <button
              onClick={() => handleSendPrompt("Why is the AMD-Microsoft partnership important for cloud margins?")}
              className="px-2.5 py-1 rounded bg-muted hover:bg-muted/80 border border-border text-foreground whitespace-nowrap transition-colors"
            >
              Why is this important?
            </button>
            <button
              onClick={() => handleSendPrompt("Compare AMD and NVIDIA software moat and memory capacity.")}
              className="px-2.5 py-1 rounded bg-muted hover:bg-muted/80 border border-border text-foreground whitespace-nowrap transition-colors"
            >
              Compare AMD and NVIDIA
            </button>
            <button
              onClick={() => handleSendPrompt("What critical competitive shifts changed this week across tier-1 hyperscalers?")}
              className="px-2.5 py-1 rounded bg-muted hover:bg-muted/80 border border-border text-foreground whitespace-nowrap transition-colors"
            >
              What changed this week?
            </button>
            <button
              onClick={() => handleSendPrompt("Investigate Intel 18A node progress and customer adoption risks.")}
              className="px-2.5 py-1 rounded bg-muted hover:bg-muted/80 border border-border text-foreground whitespace-nowrap transition-colors"
            >
              Investigate 18A foundry
            </button>
            <button
              onClick={() => handleSendPrompt("Generate an executive competitive report for the enterprise hardware sector.")}
              className="px-2.5 py-1 rounded bg-muted hover:bg-muted/80 border border-border text-foreground whitespace-nowrap transition-colors"
            >
              Generate a report
            </button>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6 bg-background">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-4 max-w-3xl ${
                  m.sender === "user" ? "ml-auto justify-end" : "mr-auto"
                }`}
              >
                {m.sender === "leon" && (
                  <div className="w-8 h-8 rounded-md bg-primary text-primary-foreground flex items-center justify-center shrink-0 shadow-xs border border-primary">
                    <Sparkles className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`rounded-lg p-4 text-sm leading-relaxed shadow-xs ${
                    m.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border text-foreground"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4 border-b border-border/30 pb-2 mb-2 text-[11px] opacity-80">
                    <span className="font-bold tracking-wide uppercase">
                      {m.sender === "user" ? "Decision Maker" : "Leon Autonomous Agent"}
                    </span>
                    <span className="font-mono">{m.timestamp}</span>
                  </div>

                  <p className="whitespace-pre-line">{m.text}</p>

                  {/* Evidence Citations */}
                  {m.citations && m.citations.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-border space-y-2 text-[11px]">
                      <div className="flex items-center justify-between text-muted-foreground font-mono text-[10px]">
                        <span>CITED EVIDENCE SOURCES ({m.citations.length})</span>
                        {m.confidence && (
                          <span className="text-[#2E7D32] font-bold">
                            {Math.round(m.confidence * 100)}% CONFIDENCE
                          </span>
                        )}
                      </div>
                      <div className="space-y-1.5">
                        {m.citations.map((c, idx) => (
                          <div
                            key={idx}
                            className="p-2 rounded bg-muted/50 border border-border flex items-center justify-between text-foreground"
                          >
                            <span className="truncate max-w-md font-medium">{c.title}</span>
                            <span className="text-[10px] font-mono text-primary/80 shrink-0">
                              {(c.relevance * 100).toFixed(0)}% match
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isProcessing && (
              <div className="flex items-center gap-2 text-sm text-primary bg-muted p-3.5 rounded-lg border border-border w-fit shadow-xs">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Leon is querying Hermes Agent runtime and cross-validating telemetry...</span>
              </div>
            )}
          </div>

          {/* Console Input Bar */}
          <div className="p-4 bg-background border-t border-border flex items-center gap-3">
            <input
              type="text"
              placeholder="Query Leon or command autonomous investigation (e.g., 'Compare AMD vs NVIDIA cloud margins')..."
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSendPrompt();
              }}
              className="flex-1 px-4 py-2.5 text-sm bg-card border border-border rounded-md focus:bg-background focus:outline-hidden focus:ring-1 focus:ring-primary text-foreground shadow-2xs transition-colors"
            />
            <button
              onClick={() => handleSendPrompt()}
              disabled={isProcessing || !inputPrompt.trim()}
              className="px-5 py-2.5 bg-primary text-primary-foreground rounded-md text-sm font-semibold hover:bg-primary/90 disabled:opacity-50 flex items-center gap-2 transition-colors shadow-xs"
            >
              <Send className="w-4 h-4" />
              <span>Dispatch</span>
            </button>
          </div>
        </div>

        {/* Task Execution History */}
        <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-500" />
              Completed Autonomous Task History ({completedTasks.length})
            </h2>
            <span className="text-xs text-slate-500 font-mono">Immutable Audit Trail</span>
          </div>

          <div className="divide-y divide-slate-100">
            {completedTasks.map((t) => (
              <div key={t.id} className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold text-slate-900">{t.subject}</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-100 text-slate-700">
                      {t.operation}
                    </span>
                  </div>
                  <p className="text-slate-500 text-[11px] pl-6 mt-0.5">{t.progress.message}</p>
                </div>
                <div className="flex items-center gap-3 pl-6 sm:pl-0 text-slate-500 font-mono text-[11px]">
                  <span>{t.progress.sourcesGathered} sources</span>
                  <span>•</span>
                  <span>{t.progress.insightsGenerated} insights</span>
                  <span>•</span>
                  <span className="text-emerald-700 font-semibold">Verified</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
