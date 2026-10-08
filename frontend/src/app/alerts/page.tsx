"use client";

import React, { useState } from "react";
import { AppShell, useAppShell } from "@/components/layout/AppShell";
import { CompanyLogo } from "@/components/shared/company-logo";
import {
  Plus,
  Search,
  Star,
  CheckCircle2,
  Trash2,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface InstitutionalAlert {
  id: string;
  title: string;
  summary: string;
  ticker: string;
  companyName: string;
  type: "Contract" | "Supply Chain" | "Technology" | "Regulatory" | "Valuation";
  priority: "Critical" | "High" | "Medium" | "Low";
  timeAgo: string;
  read: boolean;
  starred: boolean;
}

const INITIAL_ALERTS: InstitutionalAlert[] = [
  {
    id: "alt_01",
    title: "Microsoft contracts $4.2B with AMD for Instinct MI350/MI400 GPUs",
    summary: "Tier-1 hyperscaler dual-sourcing breaks single-vendor reliance on NVIDIA GB200 racks.",
    ticker: "AMD",
    companyName: "AMD",
    type: "Contract",
    priority: "Critical",
    timeAgo: "2 hours ago",
    read: false,
    starred: true,
  },
  {
    id: "alt_02",
    title: "TSMC CoWoS packaging allocation shifts 14% toward non-NVIDIA customers",
    summary: "Foundry capacity constraints easing for AMD Instinct and Google TPU custom silicon.",
    ticker: "NVDA",
    companyName: "NVIDIA",
    type: "Supply Chain",
    priority: "Critical",
    timeAgo: "4 hours ago",
    read: false,
    starred: false,
  },
  {
    id: "alt_03",
    title: "Intel Foundry 18A yields surpass internal commercial milestone",
    summary: "Test chip tape-outs with tier-1 defense and cloud customer reach milestone verification.",
    ticker: "INTC",
    companyName: "Intel",
    type: "Technology",
    priority: "High",
    timeAgo: "6 hours ago",
    read: false,
    starred: true,
  },
  {
    id: "alt_04",
    title: "Google DeepMind unveils Gemini 2.5 architecture running natively on TPU v6",
    summary: "Optical compute network eliminates cross-host interconnect bottlenecks in inference.",
    ticker: "GOOGL",
    companyName: "Google",
    type: "Technology",
    priority: "High",
    timeAgo: "12 hours ago",
    read: true,
    starred: false,
  },
  {
    id: "alt_05",
    title: "U.S. BIS updates sovereign compute export thresholds for Gulf allies",
    summary: "NVIDIA and AMD secure modified architecture export licenses for UAE sovereign clusters.",
    ticker: "NVDA",
    companyName: "NVIDIA",
    type: "Regulatory",
    priority: "Medium",
    timeAgo: "1 day ago",
    read: true,
    starred: false,
  },
  {
    id: "alt_06",
    title: "Amazon AWS expands custom Trainium2 deployment to 500,000 instances",
    summary: "Internal Anthropic workload migration reaches 65% on proprietary AWS silicon.",
    ticker: "AMZN",
    companyName: "Amazon",
    type: "Contract",
    priority: "Medium",
    timeAgo: "2 days ago",
    read: true,
    starred: false,
  },
];

const TABS = [
  "All Alerts",
  "Company Alerts",
  "Market Alerts",
  "Competitor Alerts",
  "Industry Alerts",
];

export default function AlertsPage() {
  const { askLeon } = useAppShell();
  const [alerts, setAlerts] = useState<InstitutionalAlert[]>(INITIAL_ALERTS);
  const [activeTab, setActiveTab] = useState("All Alerts");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [digestNotifs, setDigestNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(false);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filtered.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filtered.map((a) => a.id));
    }
  };

  const toggleStar = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, starred: !a.starred } : a))
    );
  };

  const markSelectedAsRead = () => {
    setAlerts((prev) =>
      prev.map((a) => (selectedIds.includes(a.id) ? { ...a, read: true } : a))
    );
    setSelectedIds([]);
  };

  const deleteSelected = () => {
    setAlerts((prev) => prev.filter((a) => !selectedIds.includes(a.id)));
    setSelectedIds([]);
  };

  const filtered = alerts.filter((a) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      a.title.toLowerCase().includes(q) ||
      a.summary.toLowerCase().includes(q) ||
      a.ticker.toLowerCase().includes(q);

    if (!matchesSearch) return false;
    if (activeTab === "Company Alerts") return a.type === "Contract";
    if (activeTab === "Competitor Alerts") return a.priority === "Critical";
    return true;
  });

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#DDD8CE]">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#11110F]">
              Alerts
            </h1>
            <p className="text-xs sm:text-sm text-[#77736B] mt-0.5">
              Stay informed with real-time alerts and strategic intelligence signals.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                askLeon({
                  type: "general",
                  title: "Custom Strategic Alert Rule",
                  summary: "Configure custom threshold tracking for datacenter GPU capacity and cloud pricing changes.",
                })
              }
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-[#11110F] text-[#F8F6F0] hover:bg-[#33312B] transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Create Alert</span>
            </button>
          </div>
        </div>

        {/* Top 5 KPI Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          <div className="bg-[#F8F6F0] rounded-xl border border-[#DDD8CE] p-3.5 shadow-sm">
            <div className="text-[10px] font-mono uppercase text-[#77736B]">Total Alerts</div>
            <div className="text-xl font-bold font-mono text-[#11110F] mt-1">24</div>
            <div className="text-[10px] text-[#16803C] font-mono mt-0.5">+6 this week</div>
          </div>

          <div className="bg-[#F8F6F0] rounded-xl border border-[#DDD8CE] p-3.5 shadow-sm">
            <div className="text-[10px] font-mono uppercase text-[#C62828] font-bold">Critical</div>
            <div className="text-xl font-bold font-mono text-[#C62828] mt-1">3</div>
            <div className="text-[10px] text-[#77736B] mt-0.5">Requires immediate review</div>
          </div>

          <div className="bg-[#F8F6F0] rounded-xl border border-[#DDD8CE] p-3.5 shadow-sm">
            <div className="text-[10px] font-mono uppercase text-[#C77700] font-bold">High Priority</div>
            <div className="text-xl font-bold font-mono text-[#C77700] mt-1">7</div>
            <div className="text-[10px] text-[#77736B] mt-0.5">Strategic developments</div>
          </div>

          <div className="bg-[#F8F6F0] rounded-xl border border-[#DDD8CE] p-3.5 shadow-sm">
            <div className="text-[10px] font-mono uppercase text-[#1769D1] font-bold">Medium Priority</div>
            <div className="text-xl font-bold font-mono text-[#1769D1] mt-1">10</div>
            <div className="text-[10px] text-[#77736B] mt-0.5">Market movements</div>
          </div>

          <div className="bg-[#F8F6F0] rounded-xl border border-[#DDD8CE] p-3.5 shadow-sm col-span-2 sm:col-span-1">
            <div className="text-[10px] font-mono uppercase text-[#77736B]">Low Priority</div>
            <div className="text-xl font-bold font-mono text-[#11110F] mt-1">4</div>
            <div className="text-[10px] text-[#77736B] mt-0.5">Routine telemetry</div>
          </div>
        </div>

        {/* Tab Filter Row & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#DDD8CE] pb-3">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors",
                  activeTab === tab
                    ? "bg-[#11110F] text-[#F8F6F0] font-semibold"
                    : "bg-[#E8E4DB] text-[#4B4840] hover:bg-[#DDD8CE]"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#77736B]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search alerts..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg text-xs bg-[#E8E4DB] border border-[#DDD8CE] text-[#11110F] placeholder-[#77736B] focus:outline-none focus:border-[#11110F]"
            />
          </div>
        </div>

        {/* Split Layout (Left: Table/List | Right: Settings & AI Insights) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Left Side (8 cols): Alert Table / List */}
          <div className="lg:col-span-8 bg-[#F8F6F0] rounded-xl border border-[#DDD8CE] overflow-hidden shadow-sm space-y-0">
            {/* Action Bar */}
            <div className="p-3 bg-[#FBFAF6] border-b border-[#DDD8CE] flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-1.5 cursor-pointer text-[#4B4840]">
                  <input
                    type="checkbox"
                    checked={
                      filtered.length > 0 && selectedIds.length === filtered.length
                    }
                    onChange={toggleSelectAll}
                    className="rounded border-[#C9C4B9] text-[#11110F] focus:ring-0"
                  />
                  <span className="font-medium text-[11px]">Select All</span>
                </label>

                {selectedIds.length > 0 && (
                  <span className="text-[11px] font-mono text-[#77736B]">
                    ({selectedIds.length} selected)
                  </span>
                )}
              </div>

              {selectedIds.length > 0 && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={markSelectedAsRead}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#E8E4DB] hover:bg-[#DDD8CE] text-[#11110F] text-[11px] font-medium"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Mark Read</span>
                  </button>
                  <button
                    onClick={deleteSelected}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#F9E7E5] text-[#C62828] hover:bg-[#F3D5D2] text-[11px] font-medium"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              )}
            </div>

            {/* Alert List Rows */}
            <div className="divide-y divide-[#DDD8CE]">
              {filtered.map((alert) => (
                <div
                  key={alert.id}
                  onClick={() => toggleSelect(alert.id)}
                  className={cn(
                    "p-4 flex items-start gap-3 hover:bg-[#FBFAF6] transition-colors cursor-pointer",
                    !alert.read ? "bg-[#F8F6F0]" : "bg-[#FBFAF6]/60 opacity-80"
                  )}
                >
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(alert.id)}
                    onChange={() => toggleSelect(alert.id)}
                    onClick={(e) => e.stopPropagation()}
                    className="rounded border-[#C9C4B9] text-[#11110F] mt-1 shrink-0"
                  />

                  <button
                    onClick={(e) => toggleStar(alert.id, e)}
                    className="text-[#C9C4B9] hover:text-[#D9A400] mt-0.5 shrink-0"
                  >
                    <Star
                      className={cn(
                        "w-4 h-4",
                        alert.starred ? "fill-[#D9A400] text-[#D9A400]" : ""
                      )}
                    />
                  </button>

                  <div className="w-6 shrink-0 mt-0.5">
                    <CompanyLogo ticker={alert.ticker} size={20} />
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#E8E4DB] text-[#11110F]">
                          {alert.ticker}
                        </span>

                        <span
                          className={cn(
                            "px-1.5 py-0.5 rounded text-[10px] font-mono font-bold",
                            alert.priority === "Critical"
                              ? "bg-[#F9E7E5] text-[#C62828]"
                              : alert.priority === "High"
                              ? "bg-[#E7F3E8] text-[#16803C]"
                              : "bg-[#FFF0D6] text-[#C77700]"
                          )}
                        >
                          [{alert.priority}]
                        </span>

                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#E8E4DB] text-[#4B4840]">
                          {alert.type}
                        </span>
                      </div>

                      <span className="text-[10px] text-[#77736B] font-mono shrink-0">
                        {alert.timeAgo}
                      </span>
                    </div>

                    <h3 className="text-xs font-bold text-[#11110F] leading-snug">
                      {alert.title}
                    </h3>

                    <p className="text-[11px] text-[#4B4840] leading-relaxed line-clamp-2">
                      {alert.summary}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side (4 cols): Settings & AI Insights */}
          <div className="lg:col-span-4 space-y-5">
            {/* Panel 1: Alert Settings (Manage) */}
            <div className="bg-[#F8F6F0] rounded-xl border border-[#DDD8CE] p-5 shadow-sm space-y-3.5 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#DDD8CE]">
                <h3 className="text-sm font-bold text-[#11110F]">Alert Settings</h3>
                <span className="text-[10px] font-mono text-[#77736B]">Manage</span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-[#11110F]">Real-time Email Alerts</div>
                    <div className="text-[10px] text-[#77736B]">Immediate dispatch for Critical signals</div>
                  </div>
                  <button
                    onClick={() => setEmailNotifs(!emailNotifs)}
                    className={cn(
                      "w-9 h-5 rounded-full transition-colors relative",
                      emailNotifs ? "bg-[#11110F]" : "bg-[#C9C4B9]"
                    )}
                  >
                    <span
                      className={cn(
                        "absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform",
                        emailNotifs ? "right-0.5" : "left-0.5"
                      )}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-[#11110F]">Daily Intelligence Digest</div>
                    <div className="text-[10px] text-[#77736B]">Summary at 08:00 EST market open</div>
                  </div>
                  <button
                    onClick={() => setDigestNotifs(!digestNotifs)}
                    className={cn(
                      "w-9 h-5 rounded-full transition-colors relative",
                      digestNotifs ? "bg-[#11110F]" : "bg-[#C9C4B9]"
                    )}
                  >
                    <span
                      className={cn(
                        "absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform",
                        digestNotifs ? "right-0.5" : "left-0.5"
                      )}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-[#11110F]">SMS Urgent Alerts</div>
                    <div className="text-[10px] text-[#77736B]">For critical contract breaks</div>
                  </div>
                  <button
                    onClick={() => setSmsNotifs(!smsNotifs)}
                    className={cn(
                      "w-9 h-5 rounded-full transition-colors relative",
                      smsNotifs ? "bg-[#11110F]" : "bg-[#C9C4B9]"
                    )}
                  >
                    <span
                      className={cn(
                        "absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform",
                        smsNotifs ? "right-0.5" : "left-0.5"
                      )}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Panel 2: Alert Insights (AI) BETA */}
            <div className="bg-[#EEE8FF] rounded-xl border border-[#DDD8CE] p-5 shadow-sm space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#DDD8CE]/60">
                <div className="flex items-center gap-1.5 text-[#6C4CE8] font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>Alert Insights (AI)</span>
                </div>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-[#6C4CE8] text-[#F8F6F0]">
                  BETA
                </span>
              </div>

              <p className="text-xs text-[#11110F] leading-relaxed">
                Leon has identified an emerging pattern: 3 critical alerts in the last 48 hours all indicate hyperscalers (Microsoft, Amazon, Google) are actively migrating inference workloads toward alternative and custom silicon architectures.
              </p>

              <button
                onClick={() =>
                  askLeon({
                    type: "alert",
                    title: "Hyperscaler Custom Silicon Synthesis",
                    summary: "Synthesize the 3 critical alerts regarding hyperscaler silicon diversification away from NVIDIA.",
                  })
                }
                className="w-full py-2 rounded-lg bg-[#6C4CE8] text-[#F8F6F0] font-semibold text-xs hover:bg-[#5839C9] transition-colors text-center shadow-xs inline-flex items-center justify-center gap-1"
              >
                <span>Ask Leon for deeper analysis</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
