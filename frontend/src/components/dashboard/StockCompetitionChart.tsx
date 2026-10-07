"use client";

import React, { useState, useMemo } from "react";
import {
  MONITORED_MARKET_STOCKS,
  getStockChartData,
  TimeframeOption,
  LEON_MARKET_ASSESSMENT,
} from "@/lib/mock/market-data";
import { cn } from "@/lib/utils";
import { Sparkles, BarChart2 } from "lucide-react";

type RankingMetric = "marketCap" | "revenue" | "price" | "performance";

export function StockCompetitionChart() {
  const [timeframe, setTimeframe] = useState<TimeframeOption>("1M");
  const [activeTickers, setActiveTickers] = useState<string[]>([
    "NVDA",
    "AMD",
    "MSFT",
    "GOOGL",
  ]);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [rankingMetric, setRankingMetric] = useState<RankingMetric>("marketCap");

  const chartData = useMemo(() => getStockChartData(timeframe), [timeframe]);

  const toggleTicker = (ticker: string) => {
    if (activeTickers.includes(ticker)) {
      if (activeTickers.length > 1) {
        setActiveTickers(activeTickers.filter((t) => t !== ticker));
      }
    } else {
      setActiveTickers([...activeTickers, ticker]);
    }
  };

  // SVG Chart bounds
  const width = 640;
  const height = 260;
  const padding = { top: 20, right: 30, bottom: 35, left: 45 };
  const graphWidth = width - padding.left - padding.right;
  const graphHeight = height - padding.top - padding.bottom;

  // Normalized percentage scale based on first point
  const normalizedSeries = useMemo(() => {
    if (chartData.length === 0) return {};
    const firstPoint = chartData[0];
    const series: Record<string, { x: number; y: number; pct: number; raw: number }[]> = {};

    activeTickers.forEach((ticker) => {
      const baseVal = Number(firstPoint[ticker]) || 1;
      series[ticker] = chartData.map((d, i) => {
        const raw = Number(d[ticker]) || baseVal;
        const pct = ((raw - baseVal) / baseVal) * 100;
        return {
          x: padding.left + (i / (chartData.length - 1)) * graphWidth,
          y: 0, // computed below
          pct,
          raw,
        };
      });
    });

    // Compute min and max percentage across active tickers
    let minPct = -5;
    let maxPct = 10;
    activeTickers.forEach((ticker) => {
      series[ticker]?.forEach((pt) => {
        if (pt.pct < minPct) minPct = pt.pct;
        if (pt.pct > maxPct) maxPct = pt.pct;
      });
    });

    const range = Math.max(maxPct - minPct, 4);
    activeTickers.forEach((ticker) => {
      series[ticker]?.forEach((pt) => {
        pt.y = padding.top + graphHeight - ((pt.pct - minPct) / range) * graphHeight;
      });
    });

    return { series, minPct, maxPct };
  }, [chartData, activeTickers, graphHeight, graphWidth, padding.left, padding.top]);

  const activeHoverPoint = hoverIndex !== null ? chartData[hoverIndex] : chartData[chartData.length - 1];

  // Ranked companies according to selected metric
  const rankedStocks = useMemo(() => {
    const sorted = [...MONITORED_MARKET_STOCKS];
    switch (rankingMetric) {
      case "marketCap":
        return sorted.sort((a, b) => b.marketCapValue - a.marketCapValue);
      case "revenue":
        return sorted.sort((a, b) => b.revenueValue - a.revenueValue);
      case "price":
        return sorted.sort((a, b) => b.price - a.price);
      case "performance":
        return sorted.sort((a, b) => b.change1MPercent - a.change1MPercent);
    }
  }, [rankingMetric]);

  const maxRankValue = useMemo(() => {
    switch (rankingMetric) {
      case "marketCap":
        return 4520;
      case "revenue":
        return 604.3;
      case "price":
        return 450;
      case "performance":
        return 20;
    }
  }, [rankingMetric]);

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs flex flex-col justify-between overflow-hidden">
      {/* Header with Title and Timeframes */}
      <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-800">
              Stock Competition
            </span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Real-time Benchmark
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Comparative price trajectories normalized by timeframe.
          </p>
        </div>

        {/* Timeframe Selector */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg self-start sm:self-center">
          {(["1D", "1W", "1M", "3M", "6M", "1Y"] as TimeframeOption[]).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={cn(
                "px-2.5 py-1 text-xs font-mono font-bold rounded-md transition-all",
                timeframe === tf
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/50"
              )}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Company Filter Pills */}
      <div className="px-4 sm:px-5 pt-3 flex flex-wrap items-center gap-1.5">
        <span className="text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-wider mr-1">
          Entities:
        </span>
        {MONITORED_MARKET_STOCKS.map((stock) => {
          const isActive = activeTickers.includes(stock.ticker);
          return (
            <button
              key={stock.ticker}
              onClick={() => toggleTicker(stock.ticker)}
              className={cn(
                "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-bold transition-all border",
                isActive
                  ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                  : "bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              )}
            >
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: stock.color }}
              />
              <span>{stock.ticker}</span>
              <span className="font-normal opacity-70 hidden sm:inline">
                ${stock.price.toFixed(2)}
              </span>
            </button>
          );
        })}
      </div>

      {/* Chart Canvas Area */}
      <div className="p-4 sm:p-5 relative">
        <div className="w-full relative h-[250px] overflow-hidden select-none">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-full overflow-visible"
            onMouseLeave={() => setHoverIndex(null)}
          >
            {/* Grid horizontal lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => {
              const yPos = padding.top + pct * graphHeight;
              return (
                <g key={idx}>
                  <line
                    x1={padding.left}
                    y1={yPos}
                    x2={width - padding.right}
                    y2={yPos}
                    stroke="#E2E8F0"
                    strokeDasharray="3 3"
                    strokeWidth={1}
                  />
                </g>
              );
            })}

            {/* Zero % reference baseline */}
            {normalizedSeries.minPct !== undefined &&
              normalizedSeries.minPct < 0 &&
              normalizedSeries.maxPct !== undefined &&
              normalizedSeries.maxPct > 0 && (
                <line
                  x1={padding.left}
                  y1={
                    padding.top +
                    graphHeight -
                    ((0 - normalizedSeries.minPct) /
                      (normalizedSeries.maxPct - normalizedSeries.minPct)) *
                      graphHeight
                  }
                  x2={width - padding.right}
                  y2={
                    padding.top +
                    graphHeight -
                    ((0 - normalizedSeries.minPct) /
                      (normalizedSeries.maxPct - normalizedSeries.minPct)) *
                      graphHeight
                  }
                  stroke="#94A3B8"
                  strokeWidth={1}
                />
              )}

            {/* Render lines for active tickers */}
            {activeTickers.map((ticker) => {
              const pts = normalizedSeries.series?.[ticker];
              if (!pts || pts.length === 0) return null;
              const stock = MONITORED_MARKET_STOCKS.find((s) => s.ticker === ticker);
              const color = stock?.color || "#2563EB";

              const pathString = pts.reduce(
                (acc, pt, i) => `${acc} ${i === 0 ? "M" : "L"} ${pt.x} ${pt.y}`,
                ""
              );

              return (
                <g key={ticker}>
                  <path
                    d={pathString}
                    fill="none"
                    stroke={color}
                    strokeWidth={2.2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-all duration-300"
                  />
                  {/* End node pill */}
                  <circle
                    cx={pts[pts.length - 1].x}
                    cy={pts[pts.length - 1].y}
                    r={3.5}
                    fill={color}
                  />
                </g>
              );
            })}

            {/* Hover Vertical Scrubber Line */}
            {hoverIndex !== null && chartData[hoverIndex] && (
              <line
                x1={padding.left + (hoverIndex / (chartData.length - 1)) * graphWidth}
                y1={padding.top}
                x2={padding.left + (hoverIndex / (chartData.length - 1)) * graphWidth}
                y2={padding.top + graphHeight}
                stroke="#0F172A"
                strokeWidth={1.5}
                strokeDasharray="2 2"
              />
            )}

            {/* X-axis date labels */}
            {chartData.map((d, i) => {
              if (i % Math.ceil(chartData.length / 6) !== 0 && i !== chartData.length - 1)
                return null;
              const xPos = padding.left + (i / (chartData.length - 1)) * graphWidth;
              return (
                <text
                  key={i}
                  x={xPos}
                  y={height - 10}
                  textAnchor="middle"
                  className="fill-slate-400 font-mono text-[10px]"
                >
                  {d.dateLabel}
                </text>
              );
            })}

            {/* Interactive hover rect columns */}
            {chartData.map((_, i) => {
              const colWidth = graphWidth / chartData.length;
              const xPos = padding.left + i * colWidth - colWidth / 2;
              return (
                <rect
                  key={i}
                  x={xPos}
                  y={padding.top}
                  width={colWidth}
                  height={graphHeight}
                  fill="transparent"
                  className="cursor-crosshair"
                  onMouseEnter={() => setHoverIndex(i)}
                />
              );
            })}
          </svg>
        </div>

        {/* Live Hover Readout Strip */}
        <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2 text-xs font-mono">
          <span className="text-slate-500 font-sans">
            Date: <strong className="text-slate-800">{activeHoverPoint?.dateLabel}</strong>
          </span>
          <div className="flex items-center gap-3 flex-wrap">
            {activeTickers.map((ticker) => {
              const stock = MONITORED_MARKET_STOCKS.find((s) => s.ticker === ticker);
              const val = activeHoverPoint ? Number(activeHoverPoint[ticker]) : undefined;
              return (
                <span key={ticker} className="flex items-center gap-1">
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: stock?.color }}
                  />
                  <span className="font-bold text-slate-800">{ticker}:</span>
                  <span className="text-slate-600">${val ? val.toFixed(2) : "--"}</span>
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Market Cap & Metric Ranking Sub-Section */}
      <div className="px-4 sm:px-5 py-3.5 bg-slate-50/70 border-t border-slate-100">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-2.5">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <BarChart2 className="w-3.5 h-3.5 text-blue-600" />
            Competitive Sizing Leaderboard
          </span>

          <div className="flex items-center gap-1 text-[11px] font-mono">
            {(
              [
                { id: "marketCap", label: "Market Cap" },
                { id: "revenue", label: "Revenue" },
                { id: "price", label: "Stock Price" },
                { id: "performance", label: "1M Drift" },
              ] as const
            ).map((btn) => (
              <button
                key={btn.id}
                onClick={() => setRankingMetric(btn.id)}
                className={cn(
                  "px-2 py-0.5 rounded transition-all",
                  rankingMetric === btn.id
                    ? "bg-slate-900 text-white font-bold"
                    : "text-slate-500 hover:text-slate-900 bg-white border border-slate-200"
                )}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Progress Bars */}
        <div className="space-y-1.5">
          {rankedStocks.map((s, idx) => {
            let displayVal = "";
            let numVal = 0;
            if (rankingMetric === "marketCap") {
              displayVal = s.marketCapStr;
              numVal = s.marketCapValue;
            } else if (rankingMetric === "revenue") {
              displayVal = s.revenueStr;
              numVal = s.revenueValue;
            } else if (rankingMetric === "price") {
              displayVal = `$${s.price.toFixed(2)}`;
              numVal = s.price;
            } else {
              displayVal = `+${s.change1MPercent}%`;
              numVal = s.change1MPercent;
            }

            const pctWidth = Math.min(100, Math.max(8, (numVal / maxRankValue) * 100));

            return (
              <div key={s.ticker} className="flex items-center gap-3 text-xs">
                <span className="w-5 font-mono text-slate-400 font-semibold">{idx + 1}.</span>
                <span className="w-14 font-mono font-bold text-slate-800">{s.ticker}</span>
                <div className="flex-1 bg-white h-2 rounded-full border border-slate-200 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${pctWidth}%`,
                      backgroundColor: s.color,
                    }}
                  />
                </div>
                <span className="w-18 text-right font-mono font-bold text-slate-900">
                  {displayVal}
                </span>
                <span
                  className={cn(
                    "w-28 text-right text-[11px] font-medium hidden sm:inline",
                    s.momentumStatus === "declining" ? "text-rose-600" : "text-emerald-700"
                  )}
                >
                  {s.momentum}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Leon Assessment Synthesis Strip */}
      <div className="p-3.5 bg-blue-50/60 border-t border-blue-100 flex items-start gap-2.5">
        <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <div className="text-xs">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="font-bold text-blue-950 font-mono text-[11px]">
              LEON ASSESSMENT
            </span>
            <span className="text-[10px] text-blue-700 font-mono">
              Confidence: {Math.round(LEON_MARKET_ASSESSMENT.confidence * 100)}%
            </span>
          </div>
          <p className="text-slate-700 text-[11px] leading-relaxed">
            {LEON_MARKET_ASSESSMENT.synthesis}
          </p>
        </div>
      </div>
    </div>
  );
}
