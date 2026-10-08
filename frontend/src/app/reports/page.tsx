"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppShell, useAppShell } from "@/components/layout/AppShell";
import { SafeImage } from "@/components/shared/safe-image";
import {
  Plus,
  Search,
  Download,
  Share2,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ResearchReport {
  id: string;
  title: string;
  category: "Company Report" | "Market Report" | "Industry Report" | "Competitive Report" | "Custom Report";
  ticker?: string;
  companyName?: string;
  date: string;
  description: string;
  readTime: string;
  imageUrl: string;
  keyInsights: string[];
  summary: string;
  pages: number;
}

const RESEARCH_REPORTS: ResearchReport[] = [
  {
    id: "rpt_01",
    title: "NVIDIA Blackwell Architecture: Comprehensive Analysis & Market Impact",
    category: "Company Report",
    ticker: "NVDA",
    companyName: "NVIDIA",
    date: "Dec 14, 2024",
    description:
      "Deep-dive technical assessment of GB200 NVL72 liquid-cooled racks, compute density improvements, and margin sustainability against ASIC alternatives.",
    readTime: "18 min read",
    pages: 28,
    imageUrl: "/images/nvda-blackwell.svg",
    keyInsights: [
      "GB200 delivers 30x inference speedup on 1T+ parameter models compared to H100.",
      "Sovereign cloud demand accounts for over $14B in pre-orders through H2 2025.",
      "CUDA ecosystem remains 3-4 years ahead of competing framework compilers.",
    ],
    summary:
      "This comprehensive research report dissects NVIDIA's latest Blackwell generation, evaluating rack-level power delivery, CoWoS wafer allocation, and total cost of ownership (TCO) economics across hyperscale datacenters.",
  },
  {
    id: "rpt_02",
    title: "AMD Instinct MI300X/MI350: Enterprise Datacenter TCO & Dual-Sourcing Moat",
    category: "Company Report",
    ticker: "AMD",
    companyName: "AMD",
    date: "Dec 10, 2024",
    description:
      "Quantitative benchmarking of AMD MI350 against Hopper and Blackwell architectures. Hyperscaler procurement trends and software maturity analysis.",
    readTime: "14 min read",
    pages: 22,
    imageUrl: "/images/amd-mi350.svg",
    keyInsights: [
      "Microsoft Azure contract confirms dual-vendor deployment across North America.",
      "ROCm 6.2 eliminates Python-level code divergence for PyTorch workloads.",
      "Price-to-performance ratio delivers 18% savings on non-frontier LLM inference.",
    ],
    summary:
      "Evaluation of AMD's expansion into enterprise tier-1 AI clusters, focusing on total cost of ownership, software compatibility, and supply chain allocation.",
  },
  {
    id: "rpt_03",
    title: "Global AI Hardware Landscape 2025: Merchant GPUs vs Custom Hyperscaler ASICs",
    category: "Market Report",
    date: "Dec 05, 2024",
    description:
      "Macro analysis of merchant silicon vs proprietary ASICs (Google TPU, AWS Trainium, Microsoft Maia). Capex allocation and long-term margin shifts.",
    readTime: "24 min read",
    pages: 42,
    imageUrl: "/images/msft-azure.svg",
    keyInsights: [
      "Hyperscalers allocate 28% of custom capex to internal ASICs in 2025.",
      "Google Cloud achieves lowest cost-per-token utilizing internal TPU v6 Trillium.",
      "Merchant GPU gross margins face gradual compression toward 60% by 2027.",
    ],
    summary:
      "Cross-industry evaluation analyzing how major cloud providers are hedging against accelerator monopolies by co-designing internal ASICs and merchant clusters.",
  },
  {
    id: "rpt_04",
    title: "Semiconductor Foundry Consolidation: TSMC vs Intel Foundry Services (IFS)",
    category: "Industry Report",
    ticker: "INTC",
    companyName: "Intel",
    date: "Nov 28, 2024",
    description:
      "Analysis of leading-edge packaging, High-NA EUV lithography, and commercial foundry customer traction across 2nm and 18A nodes.",
    readTime: "16 min read",
    pages: 24,
    imageUrl: "/images/intc-18a.svg",
    keyInsights: [
      "TSMC retains 90%+ share of advanced AI packaging (CoWoS) through 2026.",
      "Intel 18A process enters commercial risk production with defense and cloud partners.",
      "Geopolitical diversification accelerates sovereign subsidies in Europe and the U.S.",
    ],
    summary:
      "A technical and financial breakdown of the advanced packaging duopoly, inspecting yield curves, capital intensity, and government CHIPS subsidies.",
  },
];

const CATEGORIES = [
  { label: "All Reports", count: 48 },
  { label: "Company Reports", count: 18 },
  { label: "Market Reports", count: 12 },
  { label: "Industry Reports", count: 10 },
  { label: "Competitive Reports", count: 6 },
  { label: "Custom Reports", count: 2 },
];

export default function ReportsLibraryPage() {
  const { askLeon } = useAppShell();
  const [selectedCategory, setSelectedCategory] = useState("All Reports");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReportId, setSelectedReportId] = useState<string>("rpt_01");

  const filtered = RESEARCH_REPORTS.filter((r) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      r.title.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      (r.ticker && r.ticker.toLowerCase().includes(q));

    if (!matchesSearch) return false;
    if (selectedCategory === "All Reports") return true;
    if (selectedCategory === "Company Reports") return r.category === "Company Report";
    if (selectedCategory === "Market Reports") return r.category === "Market Report";
    if (selectedCategory === "Industry Reports") return r.category === "Industry Report";
    return true;
  });

  const activeReport =
    RESEARCH_REPORTS.find((r) => r.id === selectedReportId) ||
    RESEARCH_REPORTS[0];

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#DDD8CE]">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#11110F]">
              Reports
            </h1>
            <p className="text-xs sm:text-sm text-[#77736B] mt-0.5">
              In-depth research reports, analysis, and insights across companies and markets.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                askLeon({
                  type: "general",
                  title: "Autonomous Report Generation",
                  summary: "Generate a custom deep-research dossier on hyperscaler AI capex trends.",
                })
              }
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-[#11110F] text-[#F8F6F0] hover:bg-[#33312B] transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Generate Report</span>
            </button>
          </div>
        </div>

        {/* Top Category Matrix Cards (6 cards across) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.label}
              onClick={() => setSelectedCategory(cat.label)}
              className={cn(
                "p-3 rounded-xl border text-left transition-all",
                selectedCategory === cat.label
                  ? "bg-[#11110F] text-[#F8F6F0] border-[#11110F] shadow-xs"
                  : "bg-[#F8F6F0] border-[#DDD8CE] text-[#11110F] hover:bg-[#FBFAF6]"
              )}
            >
              <div
                className={cn(
                  "text-[10px] font-mono uppercase",
                  selectedCategory === cat.label ? "text-[#DDD8CE]" : "text-[#77736B]"
                )}
              >
                {cat.label}
              </div>
              <div className="text-lg font-bold font-mono mt-0.5">
                {cat.count}
              </div>
            </button>
          ))}
        </div>

        {/* Search & Filter Bar */}
        <div className="flex items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#77736B]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reports by title, keyword, or company..."
              className="w-full pl-9 pr-3 py-2 rounded-lg text-xs bg-[#E8E4DB] border border-[#DDD8CE] text-[#11110F] placeholder-[#77736B] focus:outline-none focus:border-[#11110F]"
            />
          </div>

          <span className="text-xs font-mono text-[#77736B]">
            Showing {filtered.length} reports
          </span>
        </div>

        {/* Split Layout (Left: 60% Report Cards | Right: 40% Selected Briefing Viewer) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (7 cols): Report Cards */}
          <div className="lg:col-span-7 space-y-4">
            {filtered.map((report) => {
              const isSelected = selectedReportId === report.id;

              return (
                <article
                  key={report.id}
                  onClick={() => setSelectedReportId(report.id)}
                  className={cn(
                    "p-4 sm:p-5 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row gap-4 items-start",
                    isSelected
                      ? "bg-[#FBFAF6] border-[#11110F] shadow-sm"
                      : "bg-[#F8F6F0] border-[#DDD8CE] hover:border-[#C9C4B9]"
                  )}
                >
                  {/* Thumbnail */}
                  <div className="w-full sm:w-36 h-28 rounded-lg bg-[#E8E4DB] overflow-hidden shrink-0 relative">
                    <SafeImage
                      src={report.imageUrl}
                      alt={report.title}
                      fallbackTicker={report.ticker || "NVDA"}
                      className="w-full h-full object-cover"
                    />
                    {report.ticker && (
                      <div className="absolute top-2 left-2">
                        <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#11110F] text-[#F8F6F0]">
                          {report.ticker}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-1.5 min-w-0">
                    <div className="flex items-center justify-between text-[11px] gap-2">
                      <span className="px-2 py-0.5 rounded-full bg-[#E8E4DB] text-[#4B4840] font-medium text-[10px]">
                        {report.category}
                      </span>
                      <span className="text-[#77736B] font-mono">{report.date}</span>
                    </div>

                    <h2 className="text-sm font-bold text-[#11110F] leading-snug line-clamp-2">
                      {report.title}
                    </h2>

                    <p className="text-xs text-[#4B4840] line-clamp-2 leading-relaxed">
                      {report.description}
                    </p>

                    <div className="flex items-center justify-between pt-1 text-xs">
                      <span className="text-[11px] font-mono text-[#77736B]">
                        {report.pages} pages · {report.readTime}
                      </span>

                      <div
                        className="flex items-center gap-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Link
                          href={`/reports/${report.id}`}
                          className="px-2.5 py-1 rounded-md text-xs font-semibold bg-[#11110F] text-[#F8F6F0] hover:bg-[#33312B] transition-colors"
                        >
                          View Report
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Right Column (5 cols): Selected Report Briefing Viewer */}
          {activeReport && (
            <div className="lg:col-span-5 bg-[#F8F6F0] rounded-xl border border-[#DDD8CE] p-5 sm:p-6 shadow-sm space-y-5 sticky top-20">
              <div className="space-y-2 pb-4 border-b border-[#DDD8CE]">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-full bg-[#E8E4DB] text-[#4B4840] text-xs font-medium">
                    {activeReport.category}
                  </span>
                  <span className="text-xs font-mono text-[#77736B]">
                    {activeReport.date}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[#11110F] leading-tight">
                  {activeReport.title}
                </h3>

                <p className="text-xs text-[#77736B] font-mono">
                  {activeReport.pages} Pages · {activeReport.readTime} · Institutional Briefing
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <Link
                  href={`/reports/${activeReport.id}`}
                  className="flex-1 py-2 px-3 rounded-lg text-xs font-semibold bg-[#11110F] text-[#F8F6F0] hover:bg-[#33312B] transition-colors text-center shadow-xs"
                >
                  View Full Report
                </Link>

                <button
                  onClick={() => alert("Simulated PDF export initialized.")}
                  className="p-2 rounded-lg bg-[#E8E4DB] text-[#11110F] hover:bg-[#DDD8CE] transition-colors"
                  title="Download PDF"
                >
                  <Download className="w-4 h-4" />
                </button>

                <button
                  onClick={() => alert("Shareable research link copied.")}
                  className="p-2 rounded-lg bg-[#E8E4DB] text-[#11110F] hover:bg-[#DDD8CE] transition-colors"
                  title="Share"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              {/* Ask Leon about this report CTA */}
              <button
                onClick={() =>
                  askLeon({
                    type: "report",
                    company: activeReport.companyName || "Semiconductors",
                    title: activeReport.title,
                    summary: activeReport.summary,
                  })
                }
                className="w-full py-2.5 px-3 rounded-lg bg-[#EEE8FF] border border-[#DDD8CE] text-[#6C4CE8] hover:bg-[#E3DAFC] transition-colors text-xs font-bold inline-flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#6C4CE8]" />
                <span>Ask Leon About This Report</span>
              </button>

              {/* Key Insights */}
              <div className="space-y-2.5 pt-2">
                <h4 className="text-xs font-mono font-bold uppercase text-[#77736B] tracking-wider">
                  Key Insights
                </h4>
                <ul className="space-y-2">
                  {activeReport.keyInsights.map((insight, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-xs text-[#11110F] leading-relaxed"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#16803C] shrink-0 mt-0.5" />
                      <span>{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Summary */}
              <div className="space-y-1.5 pt-2 border-t border-[#DDD8CE]">
                <h4 className="text-xs font-mono font-bold uppercase text-[#77736B] tracking-wider">
                  Executive Briefing
                </h4>
                <p className="text-xs text-[#4B4840] leading-relaxed">
                  {activeReport.summary}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
