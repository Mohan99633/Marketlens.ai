"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import {
  User,
  Bell,
  Database,
  Cpu,
  Monitor,
  CheckCircle2,
  Save,
} from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "datasources", label: "Data Sources", icon: Database },
  { id: "ai", label: "AI Integration", icon: Cpu },
  { id: "display", label: "Display", icon: Monitor },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Form states
  const [userName, setUserName] = useState("Mohan");
  const [userRole, setUserRole] = useState("Senior Market Intelligence Analyst");
  const [userEmail, setUserEmail] = useState("mohan@marketlens.ai");
  const [organization, setOrganization] = useState("MarketLens Strategic Capital");
  const [timezone, setTimezone] = useState("America/New_York (EST)");

  // Notification states
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [morningBriefing, setMorningBriefing] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);

  // AI states
  const [analysisMode, setAnalysisMode] = useState("Deep Strategic Intelligence");
  const [confidenceThreshold, setConfidenceThreshold] = useState("85");
  const [strictCitations, setStrictCitations] = useState(true);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#DDD8CE]">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#11110F]">
              Settings
            </h1>
            <p className="text-xs sm:text-sm text-[#77736B] mt-0.5">
              Manage your institutional account preferences, notification thresholds, and AI parameters.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {savedSuccess && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#E7F3E8] text-[#16803C] border border-[#A5D6A7] animate-in fade-in">
                <CheckCircle2 className="w-4 h-4" />
                <span>Changes Saved</span>
              </span>
            )}
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-[#11110F] text-[#F8F6F0] hover:bg-[#33312B] transition-colors shadow-xs"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 border-b border-[#DDD8CE] overflow-x-auto scrollbar-none">
          {TABS.map((tab) => {
            const IconComp = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 text-xs font-semibold whitespace-nowrap transition-colors border-b-2 -mb-[1px]",
                  activeTab === tab.id
                    ? "border-[#11110F] text-[#11110F]"
                    : "border-transparent text-[#77736B] hover:text-[#11110F]"
                )}
              >
                <IconComp className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Profile */}
        {activeTab === "profile" && (
          <div className="space-y-6">
            <div className="bg-[#F8F6F0] rounded-xl border border-[#DDD8CE] p-6 shadow-sm space-y-6">
              <div className="flex items-center gap-4 pb-4 border-b border-[#DDD8CE]">
                <div className="w-16 h-16 rounded-full bg-[#E8E4DB] border border-[#DDD8CE] flex items-center justify-center text-xl font-bold text-[#11110F]">
                  M
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#11110F]">{userName}</h2>
                  <p className="text-xs text-[#77736B]">{userRole}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#E8E4DB] text-[#4B4840]">
                    Enterprise Analyst Account
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-semibold text-[#11110F]">Full Name</label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#FBFAF6] border border-[#DDD8CE] text-[#11110F] focus:outline-none focus:border-[#11110F]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-[#11110F]">Role / Position</label>
                  <input
                    type="text"
                    value={userRole}
                    onChange={(e) => setUserRole(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#FBFAF6] border border-[#DDD8CE] text-[#11110F] focus:outline-none focus:border-[#11110F]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-[#11110F]">Email Address</label>
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#FBFAF6] border border-[#DDD8CE] text-[#11110F] focus:outline-none focus:border-[#11110F]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-[#11110F]">Organization</label>
                  <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#FBFAF6] border border-[#DDD8CE] text-[#11110F] focus:outline-none focus:border-[#11110F]"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="font-semibold text-[#11110F]">Primary Timezone</label>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#FBFAF6] border border-[#DDD8CE] text-[#11110F] focus:outline-none"
                  >
                    <option value="America/New_York (EST)">America/New_York (EST) - Market Hours</option>
                    <option value="America/Los_Angeles (PST)">America/Los_Angeles (PST)</option>
                    <option value="Europe/London (GMT)">Europe/London (GMT)</option>
                    <option value="Asia/Tokyo (JST)">Asia/Tokyo (JST)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Notifications */}
        {activeTab === "notifications" && (
          <div className="bg-[#F8F6F0] rounded-xl border border-[#DDD8CE] p-6 shadow-sm space-y-5 text-xs">
            <h2 className="text-sm font-bold text-[#11110F] pb-3 border-b border-[#DDD8CE]">
              Notification Dispatch Rules
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-[#11110F]">Real-time Email Alerts</div>
                  <div className="text-[11px] text-[#77736B]">Instant dispatch whenever a Critical threat alert is triggered</div>
                </div>
                <button
                  onClick={() => setEmailAlerts(!emailAlerts)}
                  className={cn(
                    "w-10 h-6 rounded-full transition-colors relative",
                    emailAlerts ? "bg-[#11110F]" : "bg-[#C9C4B9]"
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-1 w-4 h-4 rounded-full bg-white transition-transform",
                      emailAlerts ? "right-1" : "left-1"
                    )}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-[#11110F]">Morning Pre-Market Briefing</div>
                  <div className="text-[11px] text-[#77736B]">Daily overview of overnight SEC filings delivered at 08:00 EST</div>
                </div>
                <button
                  onClick={() => setMorningBriefing(!morningBriefing)}
                  className={cn(
                    "w-10 h-6 rounded-full transition-colors relative",
                    morningBriefing ? "bg-[#11110F]" : "bg-[#C9C4B9]"
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-1 w-4 h-4 rounded-full bg-white transition-transform",
                      morningBriefing ? "right-1" : "left-1"
                    )}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-[#11110F]">Weekly Strategic Intelligence Dossier</div>
                  <div className="text-[11px] text-[#77736B]">Comprehensive executive PDF summary every Friday after close</div>
                </div>
                <button
                  onClick={() => setWeeklyDigest(!weeklyDigest)}
                  className={cn(
                    "w-10 h-6 rounded-full transition-colors relative",
                    weeklyDigest ? "bg-[#11110F]" : "bg-[#C9C4B9]"
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-1 w-4 h-4 rounded-full bg-white transition-transform",
                      weeklyDigest ? "right-1" : "left-1"
                    )}
                  />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Data Sources */}
        {activeTab === "datasources" && (
          <div className="bg-[#F8F6F0] rounded-xl border border-[#DDD8CE] p-6 shadow-sm space-y-4 text-xs">
            <h2 className="text-sm font-bold text-[#11110F] pb-3 border-b border-[#DDD8CE]">
              Connected Telemetry Pipelines
            </h2>

            <div className="space-y-3">
              <div className="p-3.5 rounded-lg bg-[#FBFAF6] border border-[#DDD8CE] flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#11110F]">SEC EDGAR Real-Time Feed</div>
                  <div className="text-[11px] text-[#77736B]">Forms 10-K, 10-Q, 8-K, Form 4 filings for monitored entities</div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#E7F3E8] text-[#16803C]">
                  Connected · 12ms
                </span>
              </div>

              <div className="p-3.5 rounded-lg bg-[#FBFAF6] border border-[#DDD8CE] flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#11110F]">Hyperscaler Cloud Pricing Scrapers</div>
                  <div className="text-[11px] text-[#77736B]">Azure, AWS, and GCP GPU hourly spot and reserved instance rates</div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#E7F3E8] text-[#16803C]">
                  Active · Hourly Poll
                </span>
              </div>

              <div className="p-3.5 rounded-lg bg-[#FBFAF6] border border-[#DDD8CE] flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#11110F]">US & Global Patent Registries</div>
                  <div className="text-[11px] text-[#77736B]">USPTO & WIPO packaging, optical interconnect, and TPU filings</div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#E7F3E8] text-[#16803C]">
                  Synced · Daily
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: AI Integration */}
        {activeTab === "ai" && (
          <div className="bg-[#F8F6F0] rounded-xl border border-[#DDD8CE] p-6 shadow-sm space-y-5 text-xs">
            <h2 className="text-sm font-bold text-[#11110F] pb-3 border-b border-[#DDD8CE]">
              Leon Autonomous Engine Configuration
            </h2>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="font-semibold text-[#11110F]">Leon Intelligence Analysis Mode</label>
                <select
                  value={analysisMode}
                  onChange={(e) => setAnalysisMode(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#FBFAF6] border border-[#DDD8CE] text-[#11110F] focus:outline-none"
                >
                  <option value="Deep Strategic Intelligence">Deep Strategic Intelligence — Cross-company moat & risk synthesis</option>
                  <option value="Executive Briefing">Executive Briefing — Rapid high-impact market summaries</option>
                  <option value="Forensic Filings Analysis">Forensic Filings Analysis — Detailed SEC 10-K/10-Q disclosures</option>
                </select>
                <div className="text-[11px] text-[#77736B]">
                  Configures Leon&apos;s synthesis depth and reasoning focus across company dossiers and market alerts.
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-[#11110F]">Minimum Confidence Threshold</label>
                  <span className="font-mono font-bold text-[#11110F]">{confidenceThreshold}%</span>
                </div>
                <input
                  type="range"
                  min="70"
                  max="99"
                  value={confidenceThreshold}
                  onChange={(e) => setConfidenceThreshold(e.target.value)}
                  className="w-full accent-[#11110F]"
                />
                <div className="text-[11px] text-[#77736B]">
                  Leon will withhold auto-generated threat alerts with cross-corroboration confidence below this threshold.
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#DDD8CE]">
                <div>
                  <div className="font-semibold text-[#11110F]">Strict Citation Enforcement</div>
                  <div className="text-[11px] text-[#77736B]">Only include findings validated against primary SEC or official engineering blogs</div>
                </div>
                <button
                  onClick={() => setStrictCitations(!strictCitations)}
                  className={cn(
                    "w-10 h-6 rounded-full transition-colors relative",
                    strictCitations ? "bg-[#11110F]" : "bg-[#C9C4B9]"
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-1 w-4 h-4 rounded-full bg-white transition-transform",
                      strictCitations ? "right-1" : "left-1"
                    )}
                  />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Display */}
        {activeTab === "display" && (
          <div className="bg-[#F8F6F0] rounded-xl border border-[#DDD8CE] p-6 shadow-sm space-y-4 text-xs">
            <h2 className="text-sm font-bold text-[#11110F] pb-3 border-b border-[#DDD8CE]">
              Display & Visual Experience
            </h2>

            <div className="p-4 rounded-lg bg-[#FBFAF6] border border-[#DDD8CE] space-y-2">
              <div className="font-bold text-[#11110F]">Editorial Warm Palette Active</div>
              <p className="text-[#4B4840] leading-relaxed">
                MarketLens.ai operates on an institutional warm paper aesthetic (#F2EFE7 primary background, #F8F6F0 card surfaces, #11110F primary typography) designed for all-day financial reading clarity.
              </p>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
