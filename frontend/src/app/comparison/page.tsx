"use client";

import React, { useState, useEffect, useTransition } from "react";
import Link from "next/link";
import { AppShell, useAppShell } from "@/components/layout/AppShell";
import { getCompanies } from "@/lib/mock";
import { Company } from "@/lib/types/models";
import { SeverityBadge } from "@/components/shared/severity-badge";
import {
  Sparkles,
  Layers,
  ArrowRight,
  Plus,
  X,
  BarChart3,
  Download,
} from "lucide-react";

export default function ComparisonPage() {
  const [allCompanies, setAllCompanies] = useState<Company[]>([]);
  const [selectedTickers, setSelectedTickers] = useState<string[]>(["NVDA", "AMD"]);
  const [activeTab, setActiveTab] = useState<"metrics" | "products" | "strategy" | "leon">("metrics");
  const [, startTransition] = useTransition();
  const { askLeon } = useAppShell();

  useEffect(() => {
    getCompanies().then((comps) => {
      setAllCompanies(comps);
    });
  }, []);

  const selectedCompanies = allCompanies.filter((c) =>
    selectedTickers.includes(c.ticker)
  );

  const toggleTicker = (ticker: string) => {
    startTransition(() => {
      if (selectedTickers.includes(ticker)) {
        if (selectedTickers.length > 2) {
          setSelectedTickers(selectedTickers.filter((t) => t !== ticker));
        }
      } else {
        if (selectedTickers.length < 4) {
          setSelectedTickers([...selectedTickers, ticker]);
        }
      }
    });
  };

  const handlePreset = (tickers: string[]) => {
    setSelectedTickers(tickers);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                <Layers className="w-3.5 h-3.5" />
                Multi-Entity Benchmark
              </span>
              <span className="text-xs text-slate-500 font-mono">
                {selectedCompanies.length} of 4 entities selected
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">
              Competitive Comparison
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Side-by-side quantitative benchmarking, technology stack dissection, and Leon comparative synthesis.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() =>
                askLeon({
                  type: "comparison",
                  id: selectedTickers.join("-"),
                  company: selectedTickers.join(" vs "),
                  title: `Competitive divergence between ${selectedTickers.join(" and ")}`,
                  summary: `Comparing market position, revenue growth, AI moats, and vulnerabilities among ${selectedTickers.join(", ")}.`,
                })
              }
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 shadow-sm transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Ask Leon to Synthesize
            </button>
            <button
              onClick={() => alert("Comparison dossier generated (Simulated PDF download)")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Export Dossier
            </button>
          </div>
        </div>

        {/* Company Selection Bar & Presets */}
        <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Selected Entities (Min 2, Max 4):
            </span>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <span className="font-medium text-slate-700">Quick Presets:</span>
              <button
                onClick={() => handlePreset(["NVDA", "AMD"])}
                className="px-2 py-0.5 rounded text-xs hover:bg-slate-100 text-slate-700 border border-slate-200"
              >
                NVDA vs AMD
              </button>
              <button
                onClick={() => handlePreset(["NVDA", "AMD", "INTC"])}
                className="px-2 py-0.5 rounded text-xs hover:bg-slate-100 text-slate-700 border border-slate-200"
              >
                Semiconductor Trio
              </button>
              <button
                onClick={() => handlePreset(["MSFT", "GOOGL", "AMZN"])}
                className="px-2 py-0.5 rounded text-xs hover:bg-slate-100 text-slate-700 border border-slate-200"
              >
                Hyperscale Cloud
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {allCompanies.map((comp) => {
              const isSelected = selectedTickers.includes(comp.ticker);
              return (
                <button
                  key={comp.id}
                  onClick={() => toggleTicker(comp.ticker)}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${
                    isSelected
                      ? "bg-slate-900 border-slate-900 text-white shadow-xs"
                      : "bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <span className="font-bold">{comp.ticker}</span>
                  <span className="opacity-80 font-normal truncate max-w-[100px]">{comp.name}</span>
                  {isSelected ? (
                    <X className="w-3.5 h-3.5 ml-0.5 opacity-70 hover:opacity-100" />
                  ) : (
                    <Plus className="w-3.5 h-3.5 ml-0.5 opacity-70 hover:opacity-100" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3D Competitive Relationship Cluster */}
        <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 uppercase font-mono tracking-wider">
                  <BarChart3 className="w-4 h-4 text-blue-600" />
                  COMPETITIVE RELATIONSHIP MAP
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Three.js 3D Network
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Node size = Market Influence • Node elevation = Technology Strength • Links = Competition, Technology & Supply Chain
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span> NVDA (Leader)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-600"></span> AMD (Challenger)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-600"></span> INTC (Incumbent)
              </span>
            </div>
          </div>
        </div>

        {/* Leon Autonomous Comparative Synthesis */}
        <div className="rounded-lg border border-blue-200 bg-gradient-to-r from-blue-50/60 via-slate-50 to-white p-5 shadow-xs">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-md bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Leon Autonomous Comparative Synthesis
                  </h3>
                  <p className="text-xs text-blue-700 font-medium">
                    Hermes Agent v0.3 • Real-time cross-entity divergence engine
                  </p>
                </div>
                <span className="text-[11px] font-mono bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-semibold">
                  [LEON AI ASSESSMENT]
                </span>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed">
                While <strong>NVIDIA</strong> retains an estimated 82% margin dominance driven by CUDA developer lock-in,
                <strong> AMD</strong>’s aggressive ROCm 6.3 open-source alliance with OpenAI and Microsoft represents a direct structural threat to NVIDIA’s pricing power.
                NVIDIA’s revenue growth (+122.4% YoY) significantly outpaces AMD (+17.6% YoY), but AMD’s cost-to-performance ratio in inference workloads is tightening the competitive gap for Tier-2 cloud providers.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                <div className="p-2.5 rounded bg-white border border-slate-200 text-xs">
                  <span className="font-semibold text-slate-800 block mb-1">Key Moat Divergence</span>
                  <p className="text-slate-600">
                    CUDA software ecosystem vs. open-source ROCm/Triton flexibility and chiplet packaging margins.
                  </p>
                </div>
                <div className="p-2.5 rounded bg-white border border-slate-200 text-xs">
                  <span className="font-semibold text-slate-800 block mb-1">Margin Vulnerability</span>
                  <p className="text-slate-600">
                    Hyperscalers (MSFT, GOOGL, AMZN) deploying internal ASICs to erode merchant accelerator dependence.
                  </p>
                </div>
                <div className="p-2.5 rounded bg-white border border-slate-200 text-xs">
                  <span className="font-semibold text-slate-800 block mb-1">Leon Strategic Forecast</span>
                  <p className="text-slate-600">
                    Next 12 months will see inference workloads commoditize faster than training clusters.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Controls for Side-by-Side Matrix */}
        <div className="border-b border-slate-200 flex items-center gap-2">
          <button
            onClick={() => setActiveTab("metrics")}
            className={`pb-3 px-3 text-sm font-semibold border-b-2 transition-colors ${
              activeTab === "metrics"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            Financial & Market Metrics
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`pb-3 px-3 text-sm font-semibold border-b-2 transition-colors ${
              activeTab === "products"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            AI Products & Tech Stack
          </button>
          <button
            onClick={() => setActiveTab("strategy")}
            className={`pb-3 px-3 text-sm font-semibold border-b-2 transition-colors ${
              activeTab === "strategy"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            Moats, Vulnerabilities & Strategy
          </button>
          <button
            onClick={() => setActiveTab("leon")}
            className={`pb-3 px-3 text-sm font-semibold border-b-2 transition-colors ${
              activeTab === "leon"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            AI Pulse & Momentum Breakdown
          </button>
        </div>

        {/* Comparison Grid */}
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs">
          {activeTab === "metrics" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="py-3 px-4 font-semibold text-slate-700 w-48">
                      Metric [VERIFIED DATA]
                    </th>
                    {selectedCompanies.map((c) => (
                      <th key={c.id} className="py-3 px-4 font-bold text-slate-900 border-l border-slate-200 min-w-[200px]">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-sm font-bold block">{c.ticker}</span>
                            <span className="text-slate-500 font-normal">{c.name}</span>
                          </div>
                          <Link
                            href={`/companies/${c.ticker.toLowerCase()}`}
                            className="text-blue-600 hover:text-blue-800 p-1"
                            title="View Full Company Profile"
                          >
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-600 bg-slate-50/50">Competitive Status</td>
                    {selectedCompanies.map((c) => (
                      <td key={c.id} className="py-3 px-4 border-l border-slate-200">
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200 font-mono">
                          {c.status}
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-600 bg-slate-50/50">Market Capitalization</td>
                    {selectedCompanies.map((c) => (
                      <td key={c.id} className="py-3 px-4 border-l border-slate-200 font-mono font-semibold text-slate-900">
                        {c.marketCap}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-600 bg-slate-50/50">Annual Revenue (TTM)</td>
                    {selectedCompanies.map((c) => (
                      <td key={c.id} className="py-3 px-4 border-l border-slate-200 font-mono font-medium text-slate-900">
                        {c.revenue}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-600 bg-slate-50/50">Revenue Growth (YoY)</td>
                    {selectedCompanies.map((c) => (
                      <td key={c.id} className="py-3 px-4 border-l border-slate-200 font-mono font-bold text-emerald-700">
                        {c.revenueGrowth}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-600 bg-slate-50/50">Net Income</td>
                    {selectedCompanies.map((c) => (
                      <td key={c.id} className="py-3 px-4 border-l border-slate-200 font-mono text-slate-900">
                        {c.netIncome}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-600 bg-slate-50/50">R&D Investment</td>
                    {selectedCompanies.map((c) => (
                      <td key={c.id} className="py-3 px-4 border-l border-slate-200">
                        <span className="font-mono font-medium text-slate-900">
                          {c.financials[0]?.rdExpense || "N/A"}
                        </span>
                        <span className="text-[11px] text-slate-500 block font-sans">
                          Latest Quarter
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-600 bg-slate-50/50">Stock Price & 1M Drift</td>
                    {selectedCompanies.map((c) => (
                      <td key={c.id} className="py-3 px-4 border-l border-slate-200">
                        <span className="font-mono font-bold text-slate-900">{c.stockPrice}</span>
                        <span className="text-[11px] block font-mono font-medium text-emerald-700">
                          {c.stockChange1M} (1M)
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-600 bg-slate-50/50">AI Score (0-100)</td>
                    {selectedCompanies.map((c) => (
                      <td key={c.id} className="py-3 px-4 border-l border-slate-200">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-slate-100 rounded-full h-2 overflow-hidden">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${c.aiScore}%` }}
                            />
                          </div>
                          <span className="font-mono font-bold text-slate-900">{c.aiScore}</span>
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-600 bg-slate-50/50">Threat Vector</td>
                    {selectedCompanies.map((c) => (
                      <td key={c.id} className="py-3 px-4 border-l border-slate-200">
                        <SeverityBadge severity={c.pulse.threatLevel} />
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "products" && (
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {selectedCompanies.map((c) => (
                <div key={c.id} className="space-y-4 border border-slate-200 rounded-lg p-4 bg-slate-50/30">
                  <div className="border-b border-slate-200 pb-2">
                    <span className="text-sm font-bold text-slate-900 block">{c.name} ({c.ticker})</span>
                    <span className="text-xs text-slate-500">{c.sector}</span>
                  </div>
                  <div className="space-y-3">
                    <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
                      Core AI Offerings:
                    </span>
                    {c.products.map((p, idx) => (
                      <div key={idx} className="p-2.5 rounded bg-white border border-slate-200 text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900">{p.name}</span>
                          <span className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-mono">
                            {p.category}
                          </span>
                        </div>
                        <span className="text-[11px] text-blue-700 font-medium block">
                          Market Share: {p.marketShare}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "strategy" && (
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {selectedCompanies.map((c) => (
                <div key={c.id} className="space-y-4 border border-slate-200 rounded-lg p-4 bg-slate-50/30">
                  <div className="border-b border-slate-200 pb-2">
                    <span className="text-sm font-bold text-slate-900 block">{c.name} ({c.ticker})</span>
                    <span className="text-xs text-slate-500">Competitive Defense Posture</span>
                  </div>
                  <div className="space-y-3 text-xs">
                    <div>
                      <span className="font-semibold text-slate-800 block mb-0.5">Primary Strategy</span>
                      <p className="text-slate-600">{c.strategy}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-emerald-800 block mb-0.5">Defensible Moat</span>
                      <p className="text-slate-600">{c.leonAssessment.strategicMoat}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-rose-800 block mb-0.5">Key Vulnerability</span>
                      <p className="text-slate-600">{c.leonAssessment.keyVulnerability}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "leon" && (
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {selectedCompanies.map((c) => (
                <div key={c.id} className="space-y-4 border border-blue-200 rounded-lg p-4 bg-blue-50/20">
                  <div className="border-b border-blue-200 pb-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-900">{c.ticker}</span>
                      <span className="text-[10px] font-mono bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded font-bold">
                        Pulse {c.pulse.competitiveScore}/100
                      </span>
                    </div>
                    <span className="text-xs text-slate-500">{c.name}</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center py-1 border-b border-slate-100">
                      <span className="text-slate-600">Momentum</span>
                      <span className="font-mono font-bold text-slate-900">{c.pulse.momentum}</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-slate-100">
                      <span className="text-slate-600">Innovation Index</span>
                      <span className="font-mono font-bold text-slate-900">{c.pulse.innovation}/100</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-slate-100">
                      <span className="text-slate-600">Market Power</span>
                      <span className="font-mono font-bold text-slate-900">{c.pulse.marketPower}/100</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-slate-100">
                      <span className="text-slate-600">Technology Depth</span>
                      <span className="font-mono font-bold text-slate-900">{c.pulse.technologyStrength}/100</span>
                    </div>
                    <div className="pt-2">
                      <span className="font-semibold text-slate-800 block mb-1">Leon Outlook</span>
                      <p className="text-slate-600 text-[11px] italic bg-white p-2 rounded border border-slate-200">
                        &quot;{c.leonAssessment.outlook}&quot;
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
