"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MONITORED_MARKET_STOCKS } from "@/lib/mock/market-data";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Zap,
  ChevronRight,
} from "lucide-react";

export function CompetitiveIntelligencePanel() {
  const router = useRouter();
  const [hoveredTicker, setHoveredTicker] = useState<string | null>(null);
  return (
    <div className="bg-card rounded-md border border-border shadow-xs flex flex-col justify-between overflow-hidden">
      {/* Header with Title */}
      <div className="p-4 sm:p-5 border-b border-border flex items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">
              Competitive Intelligence
            </span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-muted text-muted-foreground border border-border">
              6 Monitored Entities
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Real-time competitive momentum, market capitalizations, and strategic vectors.
          </p>
        </div>
      </div>

      {/* Monitored Company Rows */}
      <div className="divide-y divide-border flex-1">
        {MONITORED_MARKET_STOCKS.map((stock) => {
          const isHovered = hoveredTicker === stock.ticker;
          const isPositive = stock.change1DPercent >= 0;

          return (
            <div
              key={stock.ticker}
              onMouseEnter={() => setHoveredTicker(stock.ticker)}
              onMouseLeave={() => setHoveredTicker(null)}
              onClick={() => router.push(`/companies/${stock.ticker.toLowerCase()}`)}
              className={cn(
                "p-3.5 sm:p-4 transition-all duration-200 cursor-pointer group flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3",
                isHovered
                  ? "bg-muted/80 -translate-y-0.5 shadow-xs border-l-4 border-l-primary pl-3 sm:pl-3"
                  : "bg-background hover:bg-muted/40"
              )}
            >
              {/* Left Column: Company & Ticker + Latest Signal */}
              <div className="flex items-start gap-3 min-w-0 flex-1">
                <div
                  className="w-9 h-9 rounded-md flex items-center justify-center font-mono font-bold text-xs text-white shrink-0 shadow-2xs transition-transform group-hover:scale-105"
                  style={{ backgroundColor: stock.color }}
                >
                  {stock.ticker.slice(0, 3)}
                </div>

                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-xs text-foreground group-hover:opacity-80 transition-opacity">
                      {stock.name}
                    </span>
                    <span className="font-mono text-[11px] font-semibold text-muted-foreground">
                      {stock.ticker}
                    </span>
                    <span
                      className={cn(
                        "px-1.5 py-0.2 rounded text-[10px] font-mono font-bold",
                        stock.momentumStatus === "declining"
                          ? "bg-[#FFEBEE] text-[#C62828] border border-[#FFCDD2]"
                          : "bg-[#E8F5E9] text-[#2E7D32] border border-[#A5D6A7]"
                      )}
                    >
                      {stock.momentum}
                    </span>
                  </div>

                  <p className="text-[11px] text-muted-foreground truncate flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 animate-pulse" />
                    <span className="text-foreground font-medium">{stock.latestSignal}</span>
                  </p>
                </div>
              </div>

              {/* Middle Mini Sparkline */}
              <div className="hidden lg:flex items-center px-2">
                <svg width="72" height="24" className="overflow-visible">
                  <polyline
                    fill="none"
                    stroke={isPositive ? "#2E7D32" : "#C62828"}
                    strokeWidth="1.8"
                    points={stock.sparkline
                      .map((val, i) => {
                        const min = Math.min(...stock.sparkline);
                        const max = Math.max(...stock.sparkline);
                        const range = Math.max(max - min, 1);
                        const x = (i / (stock.sparkline.length - 1)) * 68;
                        const y = 22 - ((val - min) / range) * 18;
                        return `${x},${y}`;
                      })
                      .join(" ")}
                  />
                </svg>
              </div>

              {/* Right Column: Pricing & Market Cap & Action */}
              <div className="flex items-center justify-between sm:justify-end gap-5 shrink-0">
                <div className="text-right">
                  <div className="font-mono font-bold text-xs text-foreground">
                    ${stock.price.toFixed(2)}
                  </div>
                  <div
                    className={cn(
                      "font-mono text-[11px] font-semibold flex items-center justify-end gap-0.5",
                      isPositive ? "text-[#2E7D32]" : "text-[#C62828]"
                    )}
                  >
                    {isPositive ? "+" : ""}
                    {stock.change1DPercent.toFixed(2)}%
                  </div>
                </div>

                <div className="text-right min-w-[70px]">
                  <span className="text-[10px] text-muted-foreground font-mono block">CAP</span>
                  <span className="font-mono font-bold text-xs text-foreground">
                    {stock.marketCapStr}
                  </span>
                </div>

                <div className="text-muted-foreground group-hover:text-foreground transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Banner */}
      <div className="p-3 bg-muted/70 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
        <span className="font-mono text-[11px] flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-[#8C5F12]" />
          <span>Last automated telemetry sweep 18 sec ago</span>
        </span>
        <Link
          href="/companies"
          className="font-semibold text-primary hover:text-primary/80 flex items-center gap-1"
        >
          View Full Portfolio <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
