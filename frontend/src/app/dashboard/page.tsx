"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppShell, useAppShell } from "@/components/layout/AppShell";
import { CompetitiveIntelligencePanel } from "@/components/dashboard/CompetitiveIntelligencePanel";
import { StockCompetitionChart } from "@/components/dashboard/StockCompetitionChart";
import { LatestNewsGrid } from "@/components/dashboard/LatestNewsGrid";
import { LeonCore } from "@/components/3d/LeonCore";
import { MONITORED_MARKET_STOCKS } from "@/lib/mock/market-data";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

export default function DashboardPage() {
  const { askLeon } = useAppShell();
  const [watchlistFilter, setWatchlistFilter] = useState<"ALL" | "GAINERS" | "LOSERS">("ALL");

  return (
    <AppShell>
      <div className="space-y-7">
        {/* WEB DASHBOARD HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-1 border-b border-slate-200/80">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 font-sans">
                WEB DASHBOARD
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 text-slate-700 border border-slate-200">
                PROTOTYPE v4.2
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Your competitive landscape at a glance.
            </p>
          </div>

          {/* Top Right Status Indicators */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Market Status Pill */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>MARKET OPEN</span>
            </div>

            {/* Connection Status Pill */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-slate-100 text-slate-700 border border-slate-200">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span>CONNECTED</span>
            </div>

            {/* Leon Status Compact Pill & Mini Core */}
            <Link
              href="/agent"
              className="flex items-center gap-2 px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-colors shadow-2xs group"
              title="Open Leon Agent Chat"
            >
              <div className="w-4 h-4 rounded-full overflow-hidden shrink-0 flex items-center justify-center">
                <LeonCore state="Researching" size={24} />
              </div>
              <span>LEON ● ACTIVE</span>
              <span className="text-[10px] text-blue-500 group-hover:translate-x-0.5 transition-transform">
                →
              </span>
            </Link>
          </div>
        </div>

        {/* FIRST MAJOR CONTENT AREA — TWO MAJOR PANELS SIDE BY SIDE (50 / 50 Desktop) */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* LEFT PANEL: COMPETITIVE INTELLIGENCE */}
          <div className="w-full">
            <CompetitiveIntelligencePanel />
          </div>

          {/* RIGHT PANEL: STOCK COMPETITION */}
          <div className="w-full">
            <StockCompetitionChart />
          </div>
        </section>

        {/* SECOND MAJOR CONTENT AREA — LATEST NEWS & INTELLIGENCE */}
        <section className="pt-2">
          <LatestNewsGrid />
        </section>

        {/* THIRD MAJOR CONTENT AREA — WATCHLIST & PORTFOLIO TELEMETRY */}
        <section className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold tracking-tight text-slate-900 font-mono uppercase">
                  Monitored Enterprise Watchlist
                </h3>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-slate-100 text-slate-700">
                  {MONITORED_MARKET_STOCKS.length} Entities
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Active telemetry trackers armed across filings, benchmark repositories & patent databases.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-mono font-semibold">
                {(["ALL", "GAINERS", "LOSERS"] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setWatchlistFilter(filter)}
                    className={cn(
                      "px-2 py-0.5 rounded transition-all",
                      watchlistFilter === filter
                        ? "bg-white text-slate-900 shadow-2xs font-bold"
                        : "text-slate-500 hover:text-slate-800"
                    )}
                  >
                    {filter === "ALL" ? "All" : filter === "GAINERS" ? "+ Gainers" : "- Decliners"}
                  </button>
                ))}
              </div>

              <button
                onClick={() =>
                  askLeon({
                    type: "general",
                    company: "Monitored Portfolio",
                    title: "Portfolio Valuation Divergence",
                    summary: "Synthesize current market divergence across NVIDIA, AMD, Microsoft, Google, Amazon, and Intel.",
                  })
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 shadow-xs transition-colors shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Ask Leon
              </button>
            </div>
          </div>

          {/* Quick Grid of Watchlist Entity Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {MONITORED_MARKET_STOCKS.filter((s) => {
              if (watchlistFilter === "GAINERS") return s.change1DPercent >= 0;
              if (watchlistFilter === "LOSERS") return s.change1DPercent < 0;
              return true;
            }).map((stock) => {
              const isPositive = stock.change1DPercent >= 0;
              return (
                <Link
                  key={stock.ticker}
                  href={`/companies/${stock.ticker.toLowerCase()}`}
                  className="p-3 rounded-lg border border-slate-200/80 hover:border-blue-400 hover:bg-slate-50/50 transition-all text-xs space-y-1.5 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {stock.ticker}
                    </span>
                    <span
                      className={cn(
                        "font-mono font-bold text-[11px]",
                        isPositive ? "text-emerald-700" : "text-rose-700"
                      )}
                    >
                      {isPositive ? "+" : ""}
                      {stock.change1DPercent.toFixed(1)}%
                    </span>
                  </div>
                  <div className="font-mono font-semibold text-slate-800 text-xs">
                    ${stock.price.toFixed(2)}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono flex items-center justify-between">
                    <span>{stock.marketCapStr}</span>
                    <span className="truncate max-w-[55px] text-slate-600 font-sans">
                      {stock.name}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
