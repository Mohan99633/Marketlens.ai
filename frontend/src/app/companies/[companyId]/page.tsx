"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { AppShell, useAppShell } from "@/components/layout/AppShell";
import { CompanyLogo } from "@/components/shared/company-logo";
import { SafeImage } from "@/components/shared/safe-image";
import {
  ArrowLeft,
  ArrowUpRight,
  ArrowDownRight,
  Check,
  Sparkles,
  Building2,
  MapPin,
  Users,
  Calendar,
  FileText,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

import { COMPANY_PROFILES } from "@/lib/mock";

const TIMEFRAMES = ["1D", "1W", "1M", "3M", "6M", "1Y"];
const TABS = ["Overview", "Financials", "Intelligence", "News", "Competitors", "Filings"];

function CompanyDetailContent() {
  const params = useParams();
  const router = useRouter();
  const { askLeon } = useAppShell();
  const companyKey = ((params?.companyId as string) || "nvda").toLowerCase();

  const company = COMPANY_PROFILES[companyKey] || COMPANY_PROFILES.nvda;

  const [activeTab, setActiveTab] = useState("Overview");
  const [selectedTimeframe, setSelectedTimeframe] = useState("1M");
  const [isFollowing, setIsFollowing] = useState(true);

  // 2D SVG Area Chart coordinates for 1M normalized trajectory
  const points = [
    { x: 30, y: 140, label: "$1,120" },
    { x: 90, y: 132, label: "$1,145" },
    { x: 160, y: 110, label: "$1,195" },
    { x: 230, y: 115, label: "$1,180" },
    { x: 300, y: 85, label: "$1,240" },
    { x: 380, y: 65, label: "$1,270" },
    { x: 450, y: 50, label: "$1,286" },
  ];

  const pathD = `M ${points.map((p) => `${p.x},${p.y}`).join(" L ")}`;
  const areaD = `${pathD} L 450,180 L 30,180 Z`;

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between text-xs text-[#77736B]">
          <div className="flex items-center gap-1.5 font-medium">
            <Link href="/companies" className="hover:text-[#11110F] transition-colors">
              Companies
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#C9C4B9]" />
            <span className="text-[#11110F] font-bold">{company.name}</span>
          </div>

          <button
            onClick={() => router.push("/companies")}
            className="inline-flex items-center gap-1 hover:text-[#11110F] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Companies</span>
          </button>
        </div>

        {/* Company Header Card */}
        <div className="bg-[#F8F6F0] rounded-xl border border-[#DDD8CE] p-5 sm:p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            {/* Left: Identity & Price */}
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-[#FBFAF6] border border-[#DDD8CE] flex items-center justify-center p-2.5 shadow-xs">
                <CompanyLogo ticker={company.ticker} size={36} />
              </div>

              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#11110F]">
                    {company.name}
                  </h1>
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#E8E4DB] text-[#4B4840]">
                    {company.ticker}
                  </span>
                  <button
                    onClick={() => setIsFollowing(!isFollowing)}
                    className={cn(
                      "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold transition-colors",
                      isFollowing
                        ? "bg-[#E7F3E8] text-[#16803C] border border-[#A5D6A7]"
                        : "bg-[#E8E4DB] text-[#4B4840]"
                    )}
                  >
                    <Check className="w-3 h-3" />
                    <span>{isFollowing ? "Following" : "Follow"}</span>
                  </button>
                </div>

                <div className="flex items-baseline gap-3 mt-2 flex-wrap">
                  <span className="text-2xl font-bold font-mono text-[#11110F]">
                    ${company.price.toFixed(2)}
                  </span>
                  <span
                    className={cn(
                      "font-mono font-bold text-sm flex items-center",
                      company.change1D >= 0 ? "text-[#16803C]" : "text-[#C62828]"
                    )}
                  >
                    {company.change1D >= 0 ? (
                      <ArrowUpRight className="w-4 h-4 inline" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 inline" />
                    )}
                    +{company.change1D.toFixed(1)}% (+${company.changeDollar.toFixed(2)})
                  </span>
                  <span className="text-xs text-[#77736B] font-mono">
                    {company.marketCap} Market Cap
                  </span>
                  <span className="text-xs text-[#77736B] font-medium">
                    · {company.industryRank}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  askLeon({
                    type: "company",
                    company: company.name,
                    title: `${company.ticker} Executive Briefing`,
                    summary: company.about,
                  })
                }
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-[#11110F] text-[#F8F6F0] hover:bg-[#33312B] transition-colors shadow-xs"
              >
                <Sparkles className="w-4 h-4 text-[#F8F6F0]" />
                <span>Ask Leon</span>
              </button>

              <Link
                href="/comparison"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-[#E8E4DB] text-[#11110F] hover:bg-[#DDD8CE] transition-colors border border-[#DDD8CE]"
              >
                <span>Compare vs Rivals</span>
              </Link>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-1 mt-6 border-b border-[#DDD8CE] overflow-x-auto scrollbar-none">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-4 py-2.5 text-xs font-semibold whitespace-nowrap transition-colors border-b-2 -mb-[1px]",
                  activeTab === tab
                    ? "border-[#11110F] text-[#11110F]"
                    : "border-transparent text-[#77736B] hover:text-[#11110F]"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* TOP 3-COLUMN LAYOUT (Stock Price / Key Metrics / Company Info) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Column 1: Stock Price Chart (5 cols) */}
          <div className="lg:col-span-5 bg-[#F8F6F0] rounded-xl border border-[#DDD8CE] p-5 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#DDD8CE]">
                <div>
                  <h3 className="text-sm font-bold text-[#11110F]">Stock Price</h3>
                  <p className="text-[11px] text-[#77736B]">1-Month trajectory & trading range</p>
                </div>

                {/* Timeframe selector */}
                <div className="flex items-center gap-1 bg-[#E8E4DB] p-1 rounded-lg">
                  {TIMEFRAMES.map((tf) => (
                    <button
                      key={tf}
                      onClick={() => setSelectedTimeframe(tf)}
                      className={cn(
                        "px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-all",
                        selectedTimeframe === tf
                          ? "bg-[#11110F] text-[#F8F6F0]"
                          : "text-[#77736B] hover:text-[#11110F]"
                      )}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2D SVG Area Chart */}
              <div className="mt-4 w-full h-44 relative">
                <svg viewBox="0 0 480 200" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="nvdaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#16803C" stopOpacity="0.28" />
                      <stop offset="100%" stopColor="#16803C" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Gridlines */}
                  <line x1="30" y1="50" x2="450" y2="50" stroke="#DDD8CE" strokeDasharray="3 3" />
                  <line x1="30" y1="100" x2="450" y2="100" stroke="#DDD8CE" strokeDasharray="3 3" />
                  <line x1="30" y1="150" x2="450" y2="150" stroke="#DDD8CE" strokeDasharray="3 3" />

                  {/* Area fill */}
                  <path d={areaD} fill="url(#nvdaGrad)" />

                  {/* Stroke path */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke="#16803C"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* End coordinate pulse circle */}
                  <circle cx="450" cy="50" r="4.5" fill="#16803C" stroke="#F8F6F0" strokeWidth="2" />
                </svg>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-[#77736B] pt-2 border-t border-[#DDD8CE]">
              <span>Low: $1,104.20</span>
              <span className="font-bold text-[#16803C]">+28.4% (30-Day Gain)</span>
              <span>High: $1,298.50</span>
            </div>
          </div>

          {/* Column 2: Key Metrics (4 cols) */}
          <div className="lg:col-span-4 bg-[#F8F6F0] rounded-xl border border-[#DDD8CE] p-5 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-[#11110F] pb-2 border-b border-[#DDD8CE]">
              Key Metrics
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#77736B]">Market Cap</span>
                <p className="font-mono font-bold text-[#11110F] text-sm mt-0.5">
                  {company.marketCap}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase text-[#77736B]">P/E Ratio</span>
                <p className="font-mono font-bold text-[#11110F] text-sm mt-0.5">
                  {company.peRatio}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase text-[#77736B]">EPS (TTM)</span>
                <p className="font-mono font-bold text-[#11110F] text-sm mt-0.5">
                  {company.eps}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase text-[#77736B]">Beta</span>
                <p className="font-mono font-bold text-[#11110F] text-sm mt-0.5">
                  {company.beta}
                </p>
              </div>

              <div className="col-span-2">
                <span className="text-[10px] font-mono uppercase text-[#77736B]">52-Week Range</span>
                <p className="font-mono font-bold text-[#11110F] text-xs mt-0.5">
                  {company.range52W}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase text-[#77736B]">Volume</span>
                <p className="font-mono font-semibold text-[#11110F] text-xs mt-0.5">
                  {company.volume}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase text-[#77736B]">Avg. Volume</span>
                <p className="font-mono font-semibold text-[#11110F] text-xs mt-0.5">
                  {company.avgVolume}
                </p>
              </div>
            </div>
          </div>

          {/* Column 3: Company Info (3 cols) */}
          <div className="lg:col-span-3 bg-[#F8F6F0] rounded-xl border border-[#DDD8CE] p-5 shadow-sm space-y-3 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-[#11110F] pb-2 border-b border-[#DDD8CE]">
                About {company.ticker}
              </h3>

              <p className="text-xs text-[#4B4840] leading-relaxed mt-2 line-clamp-4">
                {company.about}
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-[#DDD8CE] text-xs text-[#77736B]">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" /> HQ
                </span>
                <span className="font-medium text-[#11110F] text-right truncate max-w-[130px]">
                  {company.headquarters}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" /> Employees
                </span>
                <span className="font-medium text-[#11110F]">{company.employees}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> Founded
                </span>
                <span className="font-medium text-[#11110F]">{company.founded}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5" /> CEO
                </span>
                <span className="font-medium text-[#11110F]">{company.ceo}</span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM 2-COLUMN LAYOUT (Recent Developments / Competitors + Filings) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Left Col (8 cols): Recent Developments */}
          <div className="lg:col-span-8 bg-[#F8F6F0] rounded-xl border border-[#DDD8CE] p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#DDD8CE] pb-3">
              <div>
                <h3 className="text-sm font-bold text-[#11110F]">Recent Developments</h3>
                <p className="text-xs text-[#77736B]">Verified intelligence across public and sovereign filings</p>
              </div>

              <Link
                href="/intelligence"
                className="text-xs font-semibold text-[#11110F] hover:text-[#4B4840]"
              >
                View All →
              </Link>
            </div>

            <div className="space-y-3">
              {company.developments.map((dev) => (
                <div
                  key={dev.id}
                  className="p-4 rounded-xl bg-[#FBFAF6] border border-[#DDD8CE] flex flex-col sm:flex-row gap-4 items-start hover:border-[#11110F] transition-all"
                >
                  <div className="w-full sm:w-28 h-24 rounded-lg bg-[#E8E4DB] shrink-0 overflow-hidden relative">
                    <SafeImage
                      src={dev.imageUrl}
                      alt={dev.title}
                      fallbackTicker={company.ticker}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#E7F3E8] text-[#16803C]">
                        [{dev.impact}]
                      </span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-[#E8E4DB] text-[#4B4840]">
                        {dev.category}
                      </span>
                      <span className="text-[10px] text-[#77736B]">{dev.timeAgo}</span>
                    </div>

                    <h4 className="text-sm font-bold text-[#11110F] leading-snug">
                      {dev.title}
                    </h4>

                    <p className="text-xs text-[#4B4840] line-clamp-2 leading-relaxed">
                      {dev.summary}
                    </p>

                    <div className="pt-1">
                      <Link
                        href={`/intelligence/${dev.id}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#11110F] hover:text-[#4B4840]"
                      >
                        <span>View Intelligence</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Col (4 cols): Competitors + Filings */}
          <div className="lg:col-span-4 space-y-5">
            {/* Competitors Card */}
            <div className="bg-[#F8F6F0] rounded-xl border border-[#DDD8CE] p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-[#DDD8CE] pb-2">
                <h3 className="text-sm font-bold text-[#11110F]">Key Competitors</h3>
                <Link href="/comparison" className="text-xs font-semibold text-[#11110F]">
                  Matrix →
                </Link>
              </div>

              <div className="space-y-2">
                {company.competitors.map((comp) => (
                  <Link
                    key={comp.ticker}
                    href={`/companies/${comp.ticker.toLowerCase()}`}
                    className="p-2.5 rounded-lg bg-[#FBFAF6] border border-[#DDD8CE] flex items-center justify-between text-xs hover:border-[#11110F] transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <CompanyLogo ticker={comp.ticker} size={20} />
                      <div>
                        <div className="font-bold text-[#11110F]">{comp.ticker}</div>
                        <div className="text-[10px] text-[#77736B]">{comp.marketCap}</div>
                      </div>
                    </div>

                    <span
                      className={cn(
                        "font-mono font-bold text-xs",
                        comp.change >= 0 ? "text-[#16803C]" : "text-[#C62828]"
                      )}
                    >
                      {comp.change >= 0 ? "+" : ""}
                      {comp.change.toFixed(1)}%
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Filings Card */}
            <div className="bg-[#F8F6F0] rounded-xl border border-[#DDD8CE] p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-[#DDD8CE] pb-2">
                <h3 className="text-sm font-bold text-[#11110F]">Recent Filings</h3>
                <span className="text-[10px] font-mono text-[#77736B]">SEC EDGAR</span>
              </div>

              <div className="space-y-2">
                {company.filings.map((filing, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-[#FBFAF6] border border-[#DDD8CE] flex items-start gap-2.5 text-xs"
                  >
                    <FileText className="w-4 h-4 text-[#77736B] shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-[#11110F] leading-tight truncate">
                        {filing.title}
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-[#77736B] mt-1 font-mono">
                        <span className="font-bold text-[#4B4840]">{filing.form}</span>
                        <span>{filing.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

export default function CompanyDetailPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-[#F2EFE7] flex items-center justify-center text-xs text-[#77736B]">
          Loading company dossier...
        </div>
      }
    >
      <CompanyDetailContent />
    </React.Suspense>
  );
}
