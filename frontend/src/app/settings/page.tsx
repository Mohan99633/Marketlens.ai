"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import {
  Settings,
  Server,
  Save,
  CheckCircle2,
  Lock,
} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"general" | "monitoring" | "leon" | "architecture">("general");
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Settings State
  const [autoReportOnCritical, setAutoReportOnCritical] = useState(true);
  const [minConfidenceScore, setMinConfidenceScore] = useState(85);
  const [alertSound, setAlertSound] = useState(false);
  const [emailDigest, setEmailDigest] = useState("Daily");
  const [threeDAcceleration, setThreeDAcceleration] = useState(true);
  const [reducedMotionFallback, setReducedMotionFallback] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
    }, 2500);
  };

  return (
    <AppShell>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                <Settings className="w-3.5 h-3.5" />
                System Preferences
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">
              Platform & Agent Settings
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Configure autonomous monitoring cadence, reasoning thresholds, and infrastructure telemetry.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {savedSuccess && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 animate-in fade-in">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Settings Saved
              </span>
            )}
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 shadow-sm transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              Save Configuration
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-slate-200 flex items-center gap-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab("general")}
            className={`pb-3 px-1 border-b-2 transition-colors ${
              activeTab === "general"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            General & Visuals
          </button>
          <button
            onClick={() => setActiveTab("monitoring")}
            className={`pb-3 px-1 border-b-2 transition-colors ${
              activeTab === "monitoring"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            Threat & Alert Thresholds
          </button>
          <button
            onClick={() => setActiveTab("leon")}
            className={`pb-3 px-1 border-b-2 transition-colors ${
              activeTab === "leon"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            Leon Reasoning Engine
          </button>
          <button
            onClick={() => setActiveTab("architecture")}
            className={`pb-3 px-1 border-b-2 transition-colors ${
              activeTab === "architecture"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            Two-Server Architecture
          </button>
        </div>

        {/* Tab Contents */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-xs space-y-6">
          {activeTab === "general" && (
            <div className="space-y-6 text-xs">
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">
                  Visual Acceleration & Rendering
                </h3>
                <p className="text-slate-500 mb-4">
                  Manage Three.js WebGL 3D rendering and motion preferences.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3.5 rounded-lg border border-slate-200 bg-slate-50/50">
                    <div>
                      <span className="font-semibold text-slate-800 block">
                        Hardware 3D Acceleration (WebGL)
                      </span>
                      <span className="text-slate-500">
                        Renders the LeonCore neural orb and 3D Competitive relationship clusters.
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={threeDAcceleration}
                      onChange={(e) => setThreeDAcceleration(e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-lg border border-slate-200 bg-slate-50/50">
                    <div>
                      <span className="font-semibold text-slate-800 block">
                        Force 2D SVG/CSS Fallback Mode
                      </span>
                      <span className="text-slate-500">
                        Disables all WebGL canvases and uses low-power SVG vector visualizers.
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={reducedMotionFallback}
                      onChange={(e) => setReducedMotionFallback(e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-sm font-bold text-slate-900 mb-1">
                  Decision-Maker Workspace
                </h3>
                <p className="text-slate-500 mb-3">Default view preferences for MarketLens.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      Default Landing View
                    </label>
                    <select className="w-full p-2 bg-slate-50 border border-slate-200 rounded-md text-slate-900">
                      <option value="dashboard">Executive Dashboard</option>
                      <option value="intelligence">Live Intelligence Feed</option>
                      <option value="agent">Leon Control Center</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      Default Currency Format
                    </label>
                    <select className="w-full p-2 bg-slate-50 border border-slate-200 rounded-md text-slate-900">
                      <option value="usd">USD ($)</option>
                      <option value="eur">EUR (€)</option>
                      <option value="gbp">GBP (£)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "monitoring" && (
            <div className="space-y-6 text-xs">
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">
                  Autonomous Alert Delivery
                </h3>
                <p className="text-slate-500 mb-4">
                  Configure real-time notifications for critical and high-priority competitive shifts.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3.5 rounded-lg border border-slate-200 bg-slate-50/50">
                    <div>
                      <span className="font-semibold text-slate-800 block">
                        Auto-generate Investigation Report on Critical Threat
                      </span>
                      <span className="text-slate-500">
                        When a &quot;Critical&quot; alert triggers, Leon immediately drafts a deep dossier in the background.
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={autoReportOnCritical}
                      onChange={(e) => setAutoReportOnCritical(e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-lg border border-slate-200 bg-slate-50/50">
                    <div>
                      <span className="font-semibold text-slate-800 block">
                        Audible Chime on Critical Breach
                      </span>
                      <span className="text-slate-500">
                        Plays a discreet notification tone when tier-1 vendor shifts are validated.
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={alertSound}
                      onChange={(e) => setAlertSound(e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600"
                    />
                  </div>

                  <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50">
                    <label className="font-semibold text-slate-800 block mb-1">
                      Executive Digest Cadence
                    </label>
                    <div className="flex items-center gap-3 mt-2">
                      {["Real-time", "Daily", "Weekly", "Off"].map((cad) => (
                        <label key={cad} className="flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="radio"
                            name="digest"
                            value={cad}
                            checked={emailDigest === cad}
                            onChange={(e) => setEmailDigest(e.target.value)}
                            className="text-blue-600"
                          />
                          <span className="text-slate-700">{cad}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "leon" && (
            <div className="space-y-6 text-xs">
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">
                  Leon Reasoning & Validation Strictness
                </h3>
                <p className="text-slate-500 mb-4">
                  Tune the underlying Hermes Agent verification rigor and citation policy.
                </p>

                <div className="space-y-4">
                  <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/50 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-slate-800">
                        Minimum Factual Confidence Threshold
                      </span>
                      <span className="font-mono font-bold text-blue-700">{minConfidenceScore}%</span>
                    </div>
                    <input
                      type="range"
                      min="70"
                      max="98"
                      value={minConfidenceScore}
                      onChange={(e) => setMinConfidenceScore(Number(e.target.value))}
                      className="w-full accent-blue-600"
                    />
                    <p className="text-[11px] text-slate-500">
                      Intelligence with confidence below this threshold is quarantined into the &quot;Pending Review&quot; queue.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/50 space-y-2">
                    <span className="font-semibold text-slate-800 block">
                      Primary Source Verification Policy
                    </span>
                    <div className="space-y-2 pt-1">
                      <label className="flex items-center gap-2">
                        <input type="radio" name="citation_policy" defaultChecked className="text-blue-600" />
                        <span>Require at least 2 independent primary citations (SEC 8-K / 10-Q or corporate statement)</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="radio" name="citation_policy" className="text-blue-600" />
                        <span>Accept tier-1 financial press (WSJ, Bloomberg, Reuters) as single-source</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "architecture" && (
            <div className="space-y-6 text-xs">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Server className="w-4 h-4 text-blue-600" />
                  <h3 className="text-sm font-bold text-slate-900">
                    Two-Server Isolation Architecture (Approved Spec)
                  </h3>
                </div>
                <p className="text-slate-500 mb-4">
                  Physical and logical separation between the public Application Server and the private Leon Agent Server.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">SERVER 1 — Application Server</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        ONLINE
                      </span>
                    </div>
                    <ul className="space-y-1.5 text-slate-600 pl-4 list-disc">
                      <li>Public-facing Nginx Reverse Proxy</li>
                      <li>Next.js 16 (App Router) + Tailwind CSS v4</li>
                      <li>FastAPI REST & WebSocket Gateway</li>
                      <li>PostgreSQL 16 + pgvector primary store</li>
                      <li>Leon Gateway Adapter (Private gRPC proxy)</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-lg border border-blue-200 bg-blue-50/20 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-blue-900">SERVER 2 — Leon Agent Server</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                        PRIVATE SUBNET
                      </span>
                    </div>
                    <ul className="space-y-1.5 text-slate-600 pl-4 list-disc">
                      <li>Hermes Agent Framework v0.3 (Nous Research)</li>
                      <li>Autonomous Research & Crawling Workers</li>
                      <li>SEC Edgar, Patent & Cloud Telemetry Listeners</li>
                      <li>No direct browser access (Accessible only via Server 1)</li>
                      <li>Dedicated EC2 GPU Compute instance</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-4 p-3.5 rounded-lg border border-amber-200 bg-amber-50/30 flex items-start gap-3">
                  <Lock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div className="text-slate-700">
                    <span className="font-semibold block mb-0.5">Security Invariant:</span>
                    <p className="text-[11px] leading-relaxed">
                      Server 2 never accepts inbound traffic from the public internet. All interactions with Leon flow strictly through the Leon Gateway on Server 1 with authenticated session tokens.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
