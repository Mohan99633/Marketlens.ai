"use client";

import React, { useState } from "react";
import { AppShell, useAppShell } from "@/components/layout/AppShell";
import { CompanyLogo } from "@/components/shared/company-logo";
import {
  Sparkles,
  X,
  Info,
  Download,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CompEntity {
  ticker: string;
  name: string;
  color: string;
  price: number;
  change1M: number;
  marketCap: string;
  peRatio: string;
  revenueTTM: string;
  grossMargin: string;
  operatingMargin: string;
  fcf: string;
  rd: string;
  posture: string;
  role: string;
}

const COMPARISON_ENTITIES: Record<string, CompEntity> = {
  NVDA: {
    ticker: "NVDA",
    name: "NVIDIA Corporation",
    color: "#16803C",
    price: 1286.25,
    change1M: 28.4,
    marketCap: "$3.21T",
    peRatio: "72.4x",
    revenueTTM: "$112.8B",
    grossMargin: "75.1%",
    operatingMargin: "62.3%",
    fcf: "$53.8B",
    rd: "$11.2B",
    role: "Market Leader",
    posture: "Sovereign AI adoption and Blackwell GB200 pre-orders protect 80%+ datacenter GPU share.",
  },
  AMD: {
    ticker: "AMD",
    name: "Advanced Micro Devices",
    color: "#1769D1",
    price: 174.2,
    change1M: 12.1,
    marketCap: "$289B",
    peRatio: "44.2x",
    revenueTTM: "$25.7B",
    grossMargin: "52.4%",
    operatingMargin: "18.2%",
    fcf: "$3.8B",
    rd: "$6.1B",
    role: "Strong Challenger",
    posture: "Instinct MI350 adoption by Azure proves hyperscalers want dual-sourcing multi-vendor resilience.",
  },
  INTC: {
    ticker: "INTC",
    name: "Intel Corporation",
    color: "#77736B",
    price: 24.35,
    change1M: -2.1,
    marketCap: "$129B",
    peRatio: "28.1x",
    revenueTTM: "$54.2B",
    grossMargin: "41.8%",
    operatingMargin: "3.1%",
    fcf: "-$8.2B",
    rd: "$16.5B",
    role: "Turnaround Phase",
    posture: "18A manufacturing validation is make-or-break for IFS commercial foundry customer commitments.",
  },
};

const ALL_TICKERS = ["NVDA", "AMD", "INTC", "MSFT", "GOOGL", "AMZN"];
const TABS = [
  "Overview",
  "Stock Performance",
  "Financial Metrics",
  "Valuation",
  "Growth",
  "Profitability",
  "Competitive Metrics",
  "Key Takeaways",
];

export default function ComparisonPage() {
  const { askLeon } = useAppShell();
  const [selectedTickers, setSelectedTickers] = useState<string[]>(["NVDA", "AMD", "INTC"]);
  const [activeTab, setActiveTab] = useState("Overview");
  const [timeframe, setTimeframe] = useState("1M");

  const removeTicker = (ticker: string) => {
    if (selectedTickers.length > 2) {
      setSelectedTickers(selectedTickers.filter((t) => t !== ticker));
    }
  };

  const addTicker = (ticker: string) => {
    if (!selectedTickers.includes(ticker) && selectedTickers.length < 4) {
      setSelectedTickers([...selectedTickers, ticker]);
    }
  };

  const entities = selectedTickers.map(
    (t) =>
      COMPARISON_ENTITIES[t] || {
        ticker: t,
        name: t,
        color: "#6C4CE8",
        price: 200,
        change1M: 5.0,
        marketCap: "$500B",
        peRatio: "30x",
        revenueTTM: "$50B",
        grossMargin: "50%",
        operatingMargin: "20%",
        fcf: "$10B",
        rd: "$5B",
        role: "Peer",
        posture: "Peer benchmarking entity.",
      }
  );

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#DDD8CE]">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#11110F]">
              Company Comparison
            </h1>
            <p className="text-xs sm:text-sm text-[#77736B] mt-0.5">
              Compare companies across financial, market, and competitive metrics.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                askLeon({
                  type: "comparison",
                  company: selectedTickers.join(" vs "),
                  title: `Divergence Analysis: ${selectedTickers.join(" vs ")}`,
                  summary: `Comparative strategic benchmarking across valuation, revenue growth, and datacenter hardware moats.`,
                })
              }
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-[#11110F] text-[#F8F6F0] hover:bg-[#33312B] transition-colors shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask Leon Synthesis</span>
            </button>

            <button
              onClick={() => alert("Simulated comparison report download.")}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-[#E8E4DB] text-[#11110F] hover:bg-[#DDD8CE] transition-colors border border-[#DDD8CE]"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Selected Entities Pill Bar */}
        <div className="flex items-center gap-2 flex-wrap">
          {selectedTickers.map((ticker) => {
            const data = COMPARISON_ENTITIES[ticker];
            return (
              <div
                key={ticker}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FBFAF6] border border-[#DDD8CE] shadow-xs text-xs font-semibold text-[#11110F]"
              >
                <CompanyLogo ticker={ticker} size={16} />
                <span>{data ? data.name : ticker}</span>
                <span className="font-mono text-[#77736B] text-[11px]">({ticker})</span>
                {selectedTickers.length > 2 && (
                  <button
                    onClick={() => removeTicker(ticker)}
                    className="text-[#77736B] hover:text-[#C62828] ml-0.5"
                    title={`Remove ${ticker}`}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            );
          })}

          {selectedTickers.length < 4 && (
            <div className="flex items-center gap-1">
              {ALL_TICKERS.filter((t) => !selectedTickers.includes(t)).map((t) => (
                <button
                  key={t}
                  onClick={() => addTicker(t)}
                  className="px-2.5 py-1 rounded-full text-xs font-medium border border-dashed border-[#DDD8CE] text-[#77736B] hover:text-[#11110F] hover:border-[#11110F] transition-colors"
                >
                  + {t}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Tab Navigation & Timeframe */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#DDD8CE]">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-3.5 py-2.5 text-xs font-semibold whitespace-nowrap transition-colors border-b-2 -mb-[1px]",
                  activeTab === tab
                    ? "border-[#11110F] text-[#11110F]"
                    : "border-transparent text-[#77736B] hover:text-[#11110F]"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 pb-2 sm:pb-0">
            <span className="text-[11px] font-mono text-[#77736B]">Timeframe:</span>
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="bg-[#E8E4DB] border border-[#DDD8CE] text-[#11110F] rounded-md px-2 py-1 text-xs focus:outline-none font-mono"
            >
              <option value="1W">1W</option>
              <option value="1M">1M</option>
              <option value="3M">3M</option>
              <option value="1Y">1Y</option>
            </select>
          </div>
        </div>

        {/* Top Metric Cards + Leon's Insight Grid (4 columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
          {entities.map((item) => (
            <div
              key={item.ticker}
              className="bg-[#F8F6F0] rounded-xl border border-[#DDD8CE] p-4 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CompanyLogo ticker={item.ticker} size={20} />
                    <span className="font-bold text-sm text-[#11110F]">{item.name}</span>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#77736B]">
                    {item.ticker}
                  </span>
                </div>

                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-xl font-bold font-mono text-[#11110F]">
                    ${item.price.toFixed(2)}
                  </span>
                  <span
                    className={cn(
                      "font-mono font-bold text-xs flex items-center",
                      item.change1M >= 0 ? "text-[#16803C]" : "text-[#C62828]"
                    )}
                  >
                    {item.change1M >= 0 ? "+" : ""}
                    {item.change1M.toFixed(1)}% (1M)
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#DDD8CE] mt-3 text-xs">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#77736B]">Market Cap</span>
                  <div className="font-mono font-bold text-[#11110F]">{item.marketCap}</div>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#77736B]">P/E (TTM)</span>
                  <div className="font-mono font-bold text-[#11110F]">{item.peRatio}</div>
                </div>
              </div>
            </div>
          ))}

          {/* Leon's Insight Card */}
          <div className="bg-[#EEE8FF] rounded-xl border border-[#DDD8CE] p-4 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-[#6C4CE8] font-bold text-xs uppercase tracking-wider font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Leon&apos;s Comparative Insight</span>
              </div>
              <p className="text-xs text-[#11110F] leading-relaxed mt-2.5">
                NVIDIA retains pricing power and CUDA moat, while AMD captures hyperscaler diversification capex with MI300X. Intel is in turnaround execution.
              </p>
            </div>

            <button
              onClick={() =>
                askLeon({
                  type: "comparison",
                  company: selectedTickers.join(" vs "),
                  title: "Detailed Peer Comparison",
                  summary: "Analyze margin resilience and long-term moat sustainability.",
                })
              }
              className="mt-3 text-xs font-semibold text-[#6C4CE8] hover:text-[#5839C9] text-left inline-flex items-center gap-1"
            >
              <span>Ask Leon for detailed analysis</span>
              <span>→</span>
            </button>
          </div>
        </div>

        {/* 3 Charts Row (Stock Performance / Market Cap / Revenue TTM) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Chart 1: Stock Performance */}
          <div className="bg-[#F8F6F0] rounded-xl border border-[#DDD8CE] p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#DDD8CE]">
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-bold text-[#11110F]">Stock Performance</h3>
                <Info className="w-3.5 h-3.5 text-[#77736B]" />
              </div>
              <span className="text-[10px] font-mono text-[#77736B]">Normalized 1M</span>
            </div>

            <div className="w-full h-40">
              <svg viewBox="0 0 320 150" className="w-full h-full overflow-visible">
                {/* Horizontal gridlines */}
                <line x1="20" y1="30" x2="300" y2="30" stroke="#DDD8CE" strokeDasharray="3 3" />
                <line x1="20" y1="75" x2="300" y2="75" stroke="#C9C4B9" />
                <line x1="20" y1="120" x2="300" y2="120" stroke="#DDD8CE" strokeDasharray="3 3" />

                {/* NVDA Curve */}
                <path
                  d="M 20,80 Q 80,75 140,50 T 260,35 L 300,28"
                  fill="none"
                  stroke="#16803C"
                  strokeWidth="2.5"
                />
                {/* AMD Curve */}
                <path
                  d="M 20,78 Q 90,82 160,65 T 260,55 L 300,50"
                  fill="none"
                  stroke="#1769D1"
                  strokeWidth="2.5"
                />
                {/* INTC Curve */}
                <path
                  d="M 20,74 Q 90,75 160,85 T 260,95 L 300,98"
                  fill="none"
                  stroke="#77736B"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                />
              </svg>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono pt-1">
              <span className="text-[#16803C] font-bold">NVDA: +28.4%</span>
              <span className="text-[#1769D1] font-bold">AMD: +12.1%</span>
              <span className="text-[#77736B] font-bold">INTC: -2.1%</span>
            </div>
          </div>

          {/* Chart 2: Market Capitalization Bar Comparison */}
          <div className="bg-[#F8F6F0] rounded-xl border border-[#DDD8CE] p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#DDD8CE]">
              <h3 className="text-sm font-bold text-[#11110F]">Market Capitalization</h3>
              <span className="text-[10px] font-mono text-[#77736B]">Current USD</span>
            </div>

            <div className="space-y-4 pt-2">
              {entities.map((item) => {
                const widthPercent =
                  item.ticker === "NVDA"
                    ? 100
                    : item.ticker === "AMD"
                    ? 18
                    : 10;
                return (
                  <div key={item.ticker} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#11110F]">{item.name}</span>
                      <span className="font-mono font-bold text-[#11110F]">{item.marketCap}</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-[#E8E4DB] overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${widthPercent}%`,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Chart 3: Revenue (TTM) Comparison */}
          <div className="bg-[#F8F6F0] rounded-xl border border-[#DDD8CE] p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#DDD8CE]">
              <h3 className="text-sm font-bold text-[#11110F]">Revenue (TTM)</h3>
              <span className="text-[10px] font-mono text-[#77736B]">Trailing 12 Mo</span>
            </div>

            <div className="space-y-4 pt-2">
              {entities.map((item) => {
                const widthPercent =
                  item.ticker === "NVDA"
                    ? 100
                    : item.ticker === "INTC"
                    ? 48
                    : 23;
                return (
                  <div key={item.ticker} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#11110F]">{item.name}</span>
                      <span className="font-mono font-bold text-[#11110F]">{item.revenueTTM}</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-[#E8E4DB] overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${widthPercent}%`,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Section: Key Financial Metrics Table & Key Takeaways */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Left Table (7 cols) */}
          <div className="lg:col-span-7 bg-[#F8F6F0] rounded-xl border border-[#DDD8CE] p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-[#DDD8CE] pb-2">
              <h3 className="text-sm font-bold text-[#11110F]">Key Financial Metrics</h3>
              <span className="text-[10px] font-mono text-[#77736B]">SEC EDGAR Verified</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-[#DDD8CE] text-[#77736B] font-mono text-[10px] uppercase">
                    <th className="py-2.5 px-3">Metric</th>
                    {entities.map((item) => (
                      <th key={item.ticker} className="py-2.5 px-3 text-right">
                        {item.ticker}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DDD8CE] font-mono">
                  <tr>
                    <td className="py-2.5 px-3 font-sans font-medium text-[#11110F]">Market Cap</td>
                    {entities.map((e) => (
                      <td key={e.ticker} className="py-2.5 px-3 text-right font-bold text-[#11110F]">
                        {e.marketCap}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-sans font-medium text-[#11110F]">P/E Ratio</td>
                    {entities.map((e) => (
                      <td key={e.ticker} className="py-2.5 px-3 text-right text-[#4B4840]">
                        {e.peRatio}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-sans font-medium text-[#11110F]">Gross Margin</td>
                    {entities.map((e) => (
                      <td key={e.ticker} className="py-2.5 px-3 text-right font-bold text-[#11110F]">
                        {e.grossMargin}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-sans font-medium text-[#11110F]">Operating Margin</td>
                    {entities.map((e) => (
                      <td key={e.ticker} className="py-2.5 px-3 text-right text-[#4B4840]">
                        {e.operatingMargin}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-sans font-medium text-[#11110F]">Free Cash Flow</td>
                    {entities.map((e) => (
                      <td
                        key={e.ticker}
                        className={cn(
                          "py-2.5 px-3 text-right font-bold",
                          e.fcf.startsWith("-") ? "text-[#C62828]" : "text-[#16803C]"
                        )}
                      >
                        {e.fcf}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-sans font-medium text-[#11110F]">R&D Expense (TTM)</td>
                    {entities.map((e) => (
                      <td key={e.ticker} className="py-2.5 px-3 text-right text-[#4B4840]">
                        {e.rd}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Takeaways (5 cols) */}
          <div className="lg:col-span-5 bg-[#F8F6F0] rounded-xl border border-[#DDD8CE] p-5 shadow-sm space-y-4">
            <div className="border-b border-[#DDD8CE] pb-2">
              <h3 className="text-sm font-bold text-[#11110F]">Strategic Takeaways</h3>
              <p className="text-xs text-[#77736B]">Competitive postures synthesized by Leon</p>
            </div>

            <div className="space-y-3">
              {entities.map((item) => (
                <div key={item.ticker} className="p-3 rounded-lg bg-[#FBFAF6] border border-[#DDD8CE] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#11110F]">
                      {item.name} ({item.ticker})
                    </span>
                    <span
                      className="px-2 py-0.5 rounded text-[10px] font-mono font-bold"
                      style={{
                        backgroundColor: `${item.color}15`,
                        color: item.color,
                      }}
                    >
                      {item.role}
                    </span>
                  </div>
                  <p className="text-xs text-[#4B4840] leading-relaxed">
                    {item.posture}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={() =>
                askLeon({
                  type: "comparison",
                  company: selectedTickers.join(" vs "),
                  title: "Strategic Threat Matrix",
                  summary: "Provide tactical recommendations for portfolio allocation and threat hedges.",
                })
              }
              className="w-full py-2.5 rounded-lg bg-[#11110F] text-[#F8F6F0] font-semibold text-xs hover:bg-[#33312B] transition-colors text-center shadow-xs flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F8F6F0]" />
              <span>Synthesize Strategic Report with Leon</span>
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
