"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppShell, useAppShell } from "@/components/layout/AppShell";
import { CompetitiveIntelligencePanel } from "@/components/dashboard/CompetitiveIntelligencePanel";
import { StockCompetitionChart } from "@/components/dashboard/StockCompetitionChart";
import { LatestNewsGrid } from "@/components/dashboard/LatestNewsGrid";
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
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-border">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-sans">
                WEB DASHBOARD
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-muted text-muted-foreground border border-border">
                PROTOTYPE v4.2
              </span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              Your competitive landscape at a glance.
            </p>
          </div>

          {/* Top Right Status Indicators */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Market Status Pill */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-[#E8F5E9] text-[#2E7D32] border border-[#A5D6A7]">
              <span className="w-2 h-2 rounded-full bg-[#4CAF50] animate-pulse" />
              <span>MARKET OPEN</span>
            </div>

            {/* Connection Status Pill */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-muted text-muted-foreground border border-border">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span>CONNECTED</span>
            </div>

            {/* Leon Status Compact Pill */}
            <Link
              href="/agent"
              className="flex items-center gap-2 px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-primary text-primary-foreground hover:bg-primary/90 border border-primary transition-colors group"
              title="Open Leon Agent Chat"
            >
              <div className="w-4 h-4 rounded-full overflow-hidden shrink-0 flex items-center justify-center bg-primary-foreground/20 text-primary-foreground">
                <Sparkles size={12} />
              </div>
              <span>LEON ● ACTIVE</span>
              <span className="text-[10px] text-primary-foreground/70 group-hover:translate-x-0.5 transition-transform">
                →
              </span>
            </Link>
          </div>
        </div>

        {/* FIRST MAJOR CONTENT AREA — TWO MAJOR PANELS SIDE BY SIDE (50 / 50 Desktop) */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* LEFT PANEL: STOCK COMPETITION */}
          <div className="w-full">
            <StockCompetitionChart />
          </div>

          {/* RIGHT PANEL: COMPETITIVE INTELLIGENCE */}
          <div className="w-full">
            <CompetitiveIntelligencePanel />
          </div>
        </section>

        {/* SECOND MAJOR CONTENT AREA — LATEST NEWS & INTELLIGENCE */}
        <section className="pt-2">
          <LatestNewsGrid />
        </section>

        {/* THIRD MAJOR CONTENT AREA — WATCHLIST & PORTFOLIO TELEMETRY */}
        <section className="bg-card rounded-md border border-border p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-border pb-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold tracking-tight text-foreground font-mono uppercase">
                  Monitored Enterprise Watchlist
                </h3>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-muted text-muted-foreground">
                  {MONITORED_MARKET_STOCKS.length} Entities
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Active telemetry trackers armed across filings, benchmark repositories & patent databases.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-muted p-1 rounded-md text-xs font-mono font-semibold border border-border">
                {(["ALL", "GAINERS", "LOSERS"] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setWatchlistFilter(filter)}
                    className={cn(
                      "px-2 py-0.5 rounded-sm transition-all",
                      watchlistFilter === filter
                        ? "bg-primary text-primary-foreground font-bold"
                        : "text-muted-foreground hover:text-foreground"
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
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shrink-0"
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
                  className="p-3 rounded-md border border-border hover:border-primary hover:bg-muted transition-all text-xs space-y-1.5 group bg-background"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-foreground transition-colors">
                      {stock.ticker}
                    </span>
                    <span
                      className={cn(
                        "font-mono font-bold text-[11px]",
                        isPositive ? "text-[#2E7D32]" : "text-[#C62828]"
                      )}
                    >
                      {isPositive ? "+" : ""}
                      {stock.change1DPercent.toFixed(1)}%
                    </span>
                  </div>
                  <div className="font-mono font-semibold text-foreground text-xs">
                    ${stock.price.toFixed(2)}
                  </div>
                  <div className="text-[10px] text-muted-foreground font-mono flex items-center justify-between">
                    <span>{stock.marketCapStr}</span>
                    <span className="truncate max-w-[55px] font-sans">
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
