"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppShell } from "@/components/layout/AppShell";
import { SafeImage } from "@/components/shared/safe-image";
import { ArrowRight, Sparkles, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface NewsCardItem {
  id: string;
  ticker: string;
  companyName: string;
  impact: "High" | "Medium" | "Low";
  category: string;
  timeAgo: string;
  title: string;
  summary: string;
  whyItMatters: string;
  leonAssessment: string;
  imageUrl: string;
}

const FEATURED_NEWS: NewsCardItem[] = [
  {
    id: "intel_1843",
    ticker: "NVDA",
    companyName: "NVIDIA",
    impact: "High",
    category: "Technology",
    timeAgo: "2 hours ago",
    title: "NVIDIA announces Blackwell Ultra architecture roadmap with 30% performance boost",
    summary:
      "New architecture promises substantial efficiency gains for large language model inference and training workloads.",
    whyItMatters:
      "Solidifies NVIDIA's 80%+ datacenter AI GPU moat while raising barrier for AMD and custom ASIC silicon.",
    leonAssessment: "Expect hyperscalers to commit upfront capex ahead of H2 2025 rollout.",
    imageUrl: "/images/nvda-blackwell.svg",
  },
  {
    id: "intel_1842",
    ticker: "AMD",
    companyName: "AMD",
    impact: "Medium",
    category: "Partnership",
    timeAgo: "4 hours ago",
    title: "AMD expands cloud partnerships for MI300X accelerator deployments",
    summary:
      "Tier-2 hyperscalers and European sovereign cloud providers sign multi-year cluster agreements.",
    whyItMatters:
      "Validates ROCm software stack maturity and offers competitive alternative to CUDA vendor lock-in.",
    leonAssessment: "Pricing pressure on mid-tier inference may accelerate adoption across non-frontier models.",
    imageUrl: "/images/amd-mi350.svg",
  },
  {
    id: "intel_1820",
    ticker: "MSFT",
    companyName: "Microsoft",
    impact: "Medium",
    category: "Strategy",
    timeAgo: "6 hours ago",
    title: "Microsoft accelerates custom silicon deployment across Azure datacenters",
    summary:
      "Maia 100 chips entering production clusters for internal Copilot workloads to reduce GPU dependency.",
    whyItMatters:
      "Direct attempt to compress gross margin pressure from external chip procurement.",
    leonAssessment: "Near-term NVIDIA volume remains intact, but creates long-term margin cap.",
    imageUrl: "/images/msft-azure.svg",
  },
  {
    id: "intel_1828",
    ticker: "GOOGL",
    companyName: "Google",
    impact: "Low",
    category: "Product",
    timeAgo: "8 hours ago",
    title: "Google announces next-generation TPU v6 with enhanced optical interconnect",
    summary:
      "TPU v6 Trillium enters general availability for enterprise customers with 4.7x compute density increase.",
    whyItMatters:
      "Provides Google Cloud with proprietary cost-performance advantage against generic hyperscalers.",
    leonAssessment: "Internal workload efficiency continues to decouple Google from merchant GPU supply.",
    imageUrl: "/images/googl-tpu.svg",
  },
];

export function LatestNewsGrid() {
  const router = useRouter();
  const { askLeon } = useAppShell();
  const [news] = useState<NewsCardItem[]>(FEATURED_NEWS);

  return (
    <section className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-[#11110F]">
            Latest News & Intelligence
          </h2>
          <p className="text-xs text-[#77736B]">
            Key developments across your monitored companies
          </p>
        </div>

        <Link
          href="/intelligence"
          className="text-xs font-semibold text-[#11110F] hover:text-[#4B4840] inline-flex items-center gap-1 transition-colors"
        >
          <span>View All Intelligence</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 4-Card Desktop Grid (1 col mobile, 2 col tablet, 4 col desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 items-stretch">
        {news.map((item) => {
          return (
            <article
              key={item.id}
              className="bg-[#F8F6F0] rounded-xl border border-[#C9C4B9] overflow-hidden flex flex-col justify-between hover:border-[#11110F] shadow-xs transition-all duration-200 h-full"
            >
              <div className="flex flex-col flex-1">
                {/* Fixed 16:9 Aspect Ratio Thumbnail Image Container */}
                <div className="w-full aspect-[16/9] relative overflow-hidden bg-[#E8E4DB] shrink-0">
                  <SafeImage
                    src={item.imageUrl}
                    alt={item.title}
                    fallbackTicker={item.ticker}
                    fallbackName={item.companyName}
                    aspectRatio="16/9"
                    priority={true}
                    enableHoverEffect={true}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-103"
                  />

                  {/* Overlaid Ticker Badge */}
                  <div className="absolute top-2.5 left-2.5 z-10">
                    <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-[#11110F] text-[#F8F6F0] shadow-sm">
                      {item.ticker}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2.5">
                    {/* Badge & Timestamp Row */}
                    <div className="flex items-center justify-between gap-1 text-[11px]">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {/* Impact Badge */}
                        <span
                          className={cn(
                            "px-1.5 py-0.5 rounded font-mono font-bold text-[10px]",
                            item.impact === "High"
                              ? "bg-[#E7F3E8] text-[#16803C]"
                              : item.impact === "Medium"
                              ? "bg-[#FFF0D6] text-[#C77700]"
                              : "bg-[#E7F0FC] text-[#1769D1]"
                          )}
                        >
                          [{item.impact}]
                        </span>
                        {/* Category */}
                        <span className="px-1.5 py-0.5 rounded bg-[#E8E4DB] text-[#4B4840] font-medium text-[10px]">
                          {item.category}
                        </span>
                      </div>

                      <span className="text-[#77736B] text-[10px] whitespace-nowrap">
                        {item.timeAgo}
                      </span>
                    </div>

                    {/* Headline */}
                    <h3
                      onClick={() => router.push(`/intelligence/${item.id}`)}
                      className="text-[13px] font-bold text-[#11110F] leading-snug cursor-pointer hover:text-[#4B4840] line-clamp-2 min-h-[36px] transition-colors"
                    >
                      {item.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-xs text-[#4B4840] line-clamp-2 min-h-[32px] leading-relaxed">
                      {item.summary}
                    </p>
                  </div>

                  <div className="space-y-2 pt-1">
                    {/* WHY IT MATTERS Section */}
                    <div className="p-2.5 rounded-lg bg-[#FBFAF6] border border-[#DDD8CE] text-xs space-y-1">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#77736B] block">
                        Why It Matters
                      </span>
                      <p className="text-[11px] text-[#11110F] leading-relaxed line-clamp-2">
                        {item.whyItMatters}
                      </p>
                    </div>

                    {/* LEON'S ASSESSMENT Section */}
                    <div className="p-2.5 rounded-lg bg-[#EEE8FF] border border-[#DDD8CE] text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#6C4CE8] flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-[#6C4CE8]" />
                          Leon&apos;s Assessment
                        </span>
                        <span className="text-[9px] font-mono text-[#6C4CE8] font-bold bg-[#E8E4DB]/60 px-1 rounded">
                          AI
                        </span>
                      </div>
                      <p className="text-[11px] text-[#11110F] leading-relaxed line-clamp-2">
                        {item.leonAssessment}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 pt-0 border-t border-[#DDD8CE] mt-2 flex items-center gap-2">
                <button
                  onClick={() => router.push(`/intelligence/${item.id}`)}
                  className="flex-1 py-1.5 px-2.5 rounded-lg text-xs font-semibold bg-[#11110F] text-[#F8F6F0] hover:bg-[#33312B] transition-colors text-center"
                >
                  View Intelligence
                </button>
                <button
                  onClick={() =>
                    askLeon({
                      type: "intelligence",
                      company: item.companyName,
                      title: item.title,
                      summary: item.summary,
                    })
                  }
                  className="py-1.5 px-2.5 rounded-lg text-xs font-semibold bg-[#E8E4DB] text-[#11110F] hover:bg-[#DDD8CE] transition-colors inline-flex items-center gap-1"
                  title="Ask Leon about this development"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Ask Leon</span>
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
