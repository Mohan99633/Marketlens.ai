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
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs flex flex-col justify-between overflow-hidden">
      {/* Header with Title */}
      <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-800">
              Competitive Intelligence
            </span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              6 Monitored Entities
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time competitive momentum, market capitalizations, and strategic vectors.
          </p>
        </div>
      </div>

      {/* Monitored Company Rows */}
      <div className="divide-y divide-slate-100 flex-1">
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
                  ? "bg-slate-50/80 -translate-y-0.5 shadow-xs border-l-4 border-l-blue-600 pl-3 sm:pl-3"
                  : "hover:bg-slate-50/40"
              )}
            >
              {/* Left Column: Company & Ticker + Latest Signal */}
              <div className="flex items-start gap-3 min-w-0 flex-1">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center font-mono font-bold text-xs text-white shrink-0 shadow-2xs transition-transform group-hover:scale-105"
                  style={{ backgroundColor: stock.color }}
                >
                  {stock.ticker.slice(0, 3)}
                </div>

                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-xs text-slate-900 group-hover:text-blue-600 transition-colors">
                      {stock.name}
                    </span>
                    <span className="font-mono text-[11px] font-semibold text-slate-500">
                      {stock.ticker}
                    </span>
                    <span
                      className={cn(
                        "px-1.5 py-0.2 rounded text-[10px] font-mono font-bold",
                        stock.momentumStatus === "declining"
                          ? "bg-rose-50 text-rose-700 border border-rose-200"
                          : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      )}
                    >
                      {stock.momentum}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 truncate flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 animate-pulse" />
                    <span className="text-slate-700 font-medium">{stock.latestSignal}</span>
                  </p>
                </div>
              </div>

              {/* Middle Mini Sparkline */}
              <div className="hidden lg:flex items-center px-2">
                <svg width="72" height="24" className="overflow-visible">
                  <polyline
                    fill="none"
                    stroke={isPositive ? "#059669" : "#E11D48"}
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
                  <div className="font-mono font-bold text-xs text-slate-900">
                    ${stock.price.toFixed(2)}
                  </div>
                  <div
                    className={cn(
                      "font-mono text-[11px] font-semibold flex items-center justify-end gap-0.5",
                      isPositive ? "text-emerald-700" : "text-rose-700"
                    )}
                  >
                    {isPositive ? "+" : ""}
                    {stock.change1DPercent.toFixed(2)}%
                  </div>
                </div>

                <div className="text-right min-w-[70px]">
                  <span className="text-[10px] text-slate-400 font-mono block">CAP</span>
                  <span className="font-mono font-bold text-xs text-slate-800">
                    {stock.marketCapStr}
                  </span>
                </div>

                <div className="text-slate-300 group-hover:text-blue-600 transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Banner */}
      <div className="p-3 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span className="font-mono text-[11px] flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-amber-500" />
          <span>Last automated telemetry sweep 18 sec ago</span>
        </span>
        <Link
          href="/companies"
          className="font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
        >
          View Full Portfolio <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
