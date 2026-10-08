"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppShell, useAppShell } from "@/components/layout/AppShell";
import { CompanyLogo } from "@/components/shared/company-logo";
import { SafeImage } from "@/components/shared/safe-image";
import { getIntelligence } from "@/lib/mock";
import { IntelligenceItem } from "@/lib/types/models";
import { getIntelligenceMedia } from "@/lib/media/intelligence-images";
import {
  Search,
  ChevronDown,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Bookmark,
} from "lucide-react";
import { cn } from "@/lib/utils";

const COMPANY_TABS = [
  { label: "All", ticker: "ALL" },
  { label: "NVIDIA", ticker: "NVDA" },
  { label: "AMD", ticker: "AMD" },
  { label: "Microsoft", ticker: "MSFT" },
  { label: "Google", ticker: "GOOGL" },
  { label: "Amazon", ticker: "AMZN" },
  { label: "Intel", ticker: "INTC" },
];

export default function IntelligenceFeedPage() {
  const router = useRouter();
  const { askLeon } = useAppShell();
  const [items, setItems] = useState<IntelligenceItem[]>([]);
  const [selectedCompany, setSelectedCompany] = useState("ALL");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedImpact, setSelectedImpact] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    getIntelligence().then(setItems);
  }, []);

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const filtered = items.filter((item) => {
    if (selectedCompany !== "ALL" && item.companyTicker !== selectedCompany) {
      return false;
    }
    if (selectedCategory !== "ALL" && item.category !== selectedCategory) {
      return false;
    }
    if (selectedImpact !== "ALL" && item.impact !== selectedImpact) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.companyTicker.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#DDD8CE]">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#11110F]">
              Intelligence
            </h1>
            <p className="text-xs sm:text-sm text-[#77736B] mt-0.5">
              Curated insights, analysis, and key developments across your monitored companies.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                askLeon({
                  type: "general",
                  title: "Intelligence Feed Synthesis",
                  summary: "Synthesize the most urgent developments across semiconductors and hyperscalers.",
                })
              }
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-[#11110F] text-[#F8F6F0] hover:bg-[#33312B] transition-colors shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F8F6F0]" />
              <span>Ask Leon Feed Synthesis</span>
            </button>
          </div>
        </div>

        {/* Company Logo Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {COMPANY_TABS.map((tab) => (
              <button
                key={tab.ticker}
                onClick={() => setSelectedCompany(tab.ticker)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5",
                  selectedCompany === tab.ticker
                    ? "bg-[#11110F] text-[#F8F6F0] font-semibold"
                    : "bg-[#E8E4DB] text-[#4B4840] hover:bg-[#DDD8CE]"
                )}
              >
                {tab.ticker !== "ALL" && (
                  <CompanyLogo ticker={tab.ticker} size={14} />
                )}
                <span>{tab.label}</span>
              </button>
            ))}
            <button className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#E8E4DB] text-[#4B4840] hover:bg-[#DDD8CE] inline-flex items-center gap-1">
              <span>More</span>
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#77736B]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search intelligence..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg text-xs bg-[#E8E4DB] border border-[#DDD8CE] text-[#11110F] placeholder-[#77736B] focus:outline-none focus:border-[#11110F]"
            />
          </div>
        </div>

        {/* Secondary Filter Dropdowns */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-[#77736B] font-mono text-[11px] uppercase">Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-[#E8E4DB] border border-[#DDD8CE] text-[#11110F] rounded-lg px-2.5 py-1 text-xs focus:outline-none"
            >
              <option value="ALL">All Categories</option>
              <option value="Technology">Technology</option>
              <option value="Partnership">Partnership</option>
              <option value="Strategy">Strategy</option>
              <option value="Product">Product</option>
              <option value="Financial">Financial</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[#77736B] font-mono text-[11px] uppercase">Impact:</span>
            <select
              value={selectedImpact}
              onChange={(e) => setSelectedImpact(e.target.value)}
              className="bg-[#E8E4DB] border border-[#DDD8CE] text-[#11110F] rounded-lg px-2.5 py-1 text-xs focus:outline-none"
            >
              <option value="ALL">All Impact</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <span className="text-[#77736B] text-[11px] font-mono ml-auto">
            Showing {filtered.length} developments
          </span>
        </div>

        {/* Intelligence Feed Cards */}
        <div className="space-y-4">
          {filtered.map((item, idx) => {
            const media = getIntelligenceMedia(item.id, item.companyTicker);
            const isSaved = savedIds.includes(item.id);

            return (
              <article
                key={item.id}
                onClick={() => router.push(`/intelligence/${item.id}`)}
                className="bg-[#F8F6F0] rounded-xl border border-[#C9C4B9] p-4 sm:p-5 hover:border-[#11110F] shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col md:flex-row gap-5 items-start group"
              >
                {/* Left Thumbnail Image */}
                <div className="w-full md:w-56 aspect-[16/9] md:h-36 rounded-lg bg-[#E8E4DB] overflow-hidden shrink-0 relative">
                  <SafeImage
                    src={media.imageUrl}
                    alt={item.title}
                    fallbackTicker={item.companyTicker}
                    aspectRatio="16/9"
                    priority={idx < 3}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-103"
                  />
                  <div className="absolute top-2 left-2 z-10">
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-[#11110F] text-[#F8F6F0]">
                      {item.companyTicker}
                    </span>
                  </div>
                </div>

                {/* Right Content */}
                <div className="flex-1 space-y-2.5 w-full">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <CompanyLogo ticker={item.companyTicker} size={16} />
                      <span className="text-xs font-bold text-[#11110F]">
                        {item.companyName}
                      </span>
                      {/* Impact badge */}
                      <span
                        className={cn(
                          "px-2 py-0.5 rounded text-[10px] font-mono font-bold",
                          item.impact === "Critical"
                            ? "bg-[#F9E7E5] text-[#C62828]"
                            : item.impact === "High"
                            ? "bg-[#E7F3E8] text-[#16803C]"
                            : item.impact === "Medium"
                            ? "bg-[#FFF0D6] text-[#C77700]"
                            : "bg-[#E7F0FC] text-[#1769D1]"
                        )}
                      >
                        [{item.impact}]
                      </span>
                      {/* Category tag */}
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#E8E4DB] text-[#4B4840]">
                        {item.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-[#77736B] font-mono">
                        {new Date(item.timestamp).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <button
                        onClick={(e) => toggleSave(item.id, e)}
                        className="text-[#77736B] hover:text-[#11110F] p-1"
                        title={isSaved ? "Remove bookmark" : "Save article"}
                      >
                        <Bookmark
                          className={cn(
                            "w-4 h-4",
                            isSaved ? "fill-[#11110F] text-[#11110F]" : ""
                          )}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Headline */}
                  <h2 className="text-base font-bold text-[#11110F] leading-snug group-hover:text-[#4B4840] transition-colors">
                    {item.title}
                  </h2>

                  {/* Summary */}
                  <p className="text-xs text-[#4B4840] leading-relaxed line-clamp-2">
                    {item.summary}
                  </p>

                  {/* Why it matters preview */}
                  <div className="p-2.5 rounded-lg bg-[#FBFAF6] border border-[#DDD8CE] text-xs">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#77736B] block">
                      Why It Matters
                    </span>
                    <p className="text-[11px] text-[#11110F] leading-relaxed line-clamp-1 mt-0.5">
                      {item.leonAnalysis.marketImpact}
                    </p>
                  </div>

                  {/* Footer & Actions */}
                  <div className="flex items-center justify-between pt-1 text-xs">
                    <span className="text-[11px] text-[#77736B] font-mono flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#16803C]" />
                      <span>{item.sources.length} Verified Sources</span>
                    </span>

                    <div
                      className="flex items-center gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() =>
                          askLeon({
                            type: "intelligence",
                            company: item.companyName,
                            title: item.title,
                            summary: item.summary,
                          })
                        }
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#E8E4DB] text-[#11110F] hover:bg-[#DDD8CE] transition-colors"
                      >
                        <Sparkles className="w-3 h-3 text-[#6C4CE8]" />
                        <span>Ask Leon</span>
                      </button>

                      <Link
                        href={`/intelligence/${item.id}`}
                        className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#11110F] text-[#F8F6F0] hover:bg-[#33312B] transition-colors"
                      >
                        <span>View Intelligence</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
