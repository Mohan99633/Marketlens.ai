"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AppShell, useAppShell } from "@/components/layout/AppShell";
import { getAlerts } from "@/lib/mock";
import { AlertItem } from "@/lib/types/models";
import { SeverityBadge } from "@/components/shared/severity-badge";
import { CategoryBadge } from "@/components/shared/category-badge";
import {
  Bell,
  AlertTriangle,
  CheckCircle2,
  Search,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Clock,
  Eye,
  EyeOff,
  Flame,
} from "lucide-react";

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [selectedSeverity, setSelectedSeverity] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "UNREAD" | "READ">("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const { askLeon } = useAppShell();

  useEffect(() => {
    getAlerts().then((data) => setAlerts(data));
  }, []);

  const toggleReadStatus = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, read: !a.read } : a))
    );
  };

  const markAllAsRead = () => {
    setAlerts((prev) => prev.map((a) => ({ ...a, read: true })));
  };

  const filteredAlerts = alerts.filter((a) => {
    const matchesSeverity =
      selectedSeverity === "ALL" || a.severity.toUpperCase() === selectedSeverity;
    const matchesStatus =
      statusFilter === "ALL" ||
      (statusFilter === "UNREAD" && !a.read) ||
      (statusFilter === "READ" && a.read);
    const matchesSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.companyTicker.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSeverity && matchesStatus && matchesSearch;
  });

  const unreadCount = alerts.filter((a) => !a.read).length;
  const criticalCount = alerts.filter((a) => a.severity === "Critical").length;
  const highCount = alerts.filter((a) => a.severity === "High").length;

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                <Flame className="w-3.5 h-3.5" />
                Autonomous Threat Radar
              </span>
              <span className="text-xs text-slate-500 font-mono">
                {unreadCount} unread actionable signals
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">
              Competitive Alerts & Early Warnings
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              High-priority events synthesized by Leon from regulatory filings, procurement contracts, and market telemetry.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-50 transition-colors"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-slate-500" />
              Mark All as Read
            </button>
            <button
              onClick={() =>
                askLeon({
                  type: "alert",
                  id: "all_critical",
                  company: "Multi-Entity Portfolio",
                  title: "Portfolio Threat Assessment",
                  summary: `Synthesize the current active alerts: ${criticalCount} Critical and ${highCount} High priority warnings across NVIDIA, Microsoft, AMD, and Intel.`,
                })
              }
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 shadow-sm transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Ask Leon to Triage
            </button>
          </div>
        </div>

        {/* Metrics Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-xs">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Active Unread
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-slate-900 font-mono">{unreadCount}</span>
              <span className="text-xs text-slate-500">of {alerts.length} total</span>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-rose-200 p-4 shadow-xs bg-rose-50/20">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-rose-700 uppercase tracking-wider block">
                Critical Threats
              </span>
              <AlertTriangle className="w-4 h-4 text-rose-600" />
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-rose-900 font-mono">{criticalCount}</span>
              <span className="text-xs text-rose-600 font-medium">Requires decision</span>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-amber-200 p-4 shadow-xs bg-amber-50/20">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider block">
                High Priority
              </span>
              <ShieldAlert className="w-4 h-4 text-amber-600" />
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-amber-900 font-mono">{highCount}</span>
              <span className="text-xs text-amber-600 font-medium">Under monitoring</span>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-xs">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Average Lead Time
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-slate-900 font-mono">4.2h</span>
              <span className="text-xs text-emerald-600 font-medium">vs public press</span>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mr-1">
              Severity:
            </span>
            {(["ALL", "CRITICAL", "HIGH", "MEDIUM", "LOW"] as const).map((sev) => (
              <button
                key={sev}
                onClick={() => setSelectedSeverity(sev)}
                className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                  selectedSeverity === sev
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {sev}
              </button>
            ))}

            <div className="h-4 w-px bg-slate-200 mx-2 hidden sm:block" />

            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mr-1">
              Status:
            </span>
            {(["ALL", "UNREAD", "READ"] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                  statusFilter === st
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {st === "ALL" ? "All" : st === "UNREAD" ? "Unread Only" : "Read Only"}
              </button>
            ))}
          </div>

          <div className="relative min-w-[240px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search alert headlines or tickers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-blue-500 text-slate-900"
            />
          </div>
        </div>

        {/* Alerts Stream */}
        <div className="space-y-3">
          {filteredAlerts.length === 0 ? (
            <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
              <Bell className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-semibold text-slate-900">No alerts match this filter</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                Try selecting &quot;ALL&quot; severities or clearing your search term to see other signals in the monitoring log.
              </p>
              <button
                onClick={() => {
                  setSelectedSeverity("ALL");
                  setStatusFilter("ALL");
                  setSearchQuery("");
                }}
                className="mt-4 px-3 py-1.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 rounded text-slate-800"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            filteredAlerts.map((alert) => {
              const formattedDate = new Date(alert.timestamp).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <div
                  key={alert.id}
                  className={`bg-white rounded-lg border transition-all shadow-xs ${
                    alert.read
                      ? "border-slate-200 opacity-80 hover:opacity-100"
                      : "border-slate-300 border-l-4 border-l-blue-600 bg-blue-50/5 ring-1 ring-blue-500/10"
                  }`}
                >
                  <div className="p-4 sm:p-5">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          {!alert.read && (
                            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" title="Unread alert" />
                          )}
                          <SeverityBadge severity={alert.severity} />
                          <CategoryBadge category={alert.category} />
                          <span className="font-mono text-xs font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                            {alert.companyTicker}
                          </span>
                          <span className="text-xs text-slate-500 flex items-center gap-1 font-mono">
                            <Clock className="w-3 h-3 text-slate-400" />
                            {formattedDate}
                          </span>
                        </div>

                        <h2 className="text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors">
                          {alert.title}
                        </h2>

                        <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
                          {alert.message}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
                        <button
                          onClick={() => toggleReadStatus(alert.id)}
                          className="p-1.5 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                          title={alert.read ? "Mark as Unread" : "Mark as Read"}
                        >
                          {alert.read ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {alert.relatedIntelligenceId && (
                          <Link
                            href={`/intelligence/${alert.relatedIntelligenceId}`}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800"
                          >
                            <span>Inspect Source Intelligence</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        )}
                        <span className="text-slate-300">•</span>
                        <Link
                          href={`/companies/${alert.companyTicker.toLowerCase()}`}
                          className="text-xs text-slate-500 hover:text-slate-800"
                        >
                          {alert.companyName} Profile
                        </Link>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            askLeon({
                              type: "alert",
                              id: alert.id,
                              company: alert.companyTicker,
                              title: alert.title,
                              summary: alert.message,
                            })
                          }
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-colors"
                        >
                          <Sparkles className="w-3 h-3 text-blue-600" />
                          Ask Leon
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </AppShell>
  );
}
