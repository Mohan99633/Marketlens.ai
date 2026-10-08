"use client";

import React, { useState } from "react";
import {
  getStockChartData,
  TimeframeOption,
} from "@/lib/mock/market-data";
import { cn } from "@/lib/utils";

const COMPANIES = [
  { ticker: "NVDA", label: "NVIDIA", color: "#16803C", finalReturn: "+28.4%" },
  { ticker: "AMD", label: "AMD", color: "#1769D1", finalReturn: "+12.1%" },
  { ticker: "MSFT", label: "Microsoft", color: "#E97817", finalReturn: "+8.3%" },
  { ticker: "GOOGL", label: "Google", color: "#D9A400", finalReturn: "+6.5%" },
  { ticker: "AMZN", label: "Amazon", color: "#6C4CE8", finalReturn: "+4.2%" },
  { ticker: "INTC", label: "Intel", color: "#77736B", finalReturn: "-2.1%" },
];

export function StockCompetitionChart() {
  const [timeframe, setTimeframe] = useState<TimeframeOption>("1M");
  const [hoverIndex, setHoverIndex] = useState<number | null>(4); // Default to last point (Dec 14) as shown in reference

  const data = getStockChartData(timeframe);
  const activeIndex = hoverIndex !== null ? hoverIndex : data.length - 1;
  const activePoint = data[activeIndex] || data[data.length - 1];

  // SVG Chart Dimensions
  const svgWidth = 600;
  const svgHeight = 220;
  const padding = { top: 20, right: 30, bottom: 30, left: 45 };
  const graphWidth = svgWidth - padding.left - padding.right;
  const graphHeight = svgHeight - padding.top - padding.bottom;

  // Y-axis fixed domain: -20% to +40% (total 60%)
  const yMin = -20;
  const yMax = 40;
  const yRange = yMax - yMin;

  const getY = (val: number) => {
    return padding.top + graphHeight - ((val - yMin) / yRange) * graphHeight;
  };

  const getX = (index: number) => {
    return padding.left + (index / (data.length - 1)) * graphWidth;
  };

  // Helper to generate SVG polyline path
  const createPath = (ticker: string) => {
    return data
      .map((d, i) => `${i === 0 ? "M" : "L"} ${getX(i).toFixed(1)} ${getY(Number(d[ticker])).toFixed(1)}`)
      .join(" ");
  };

  return (
    <div className="bg-[#F8F6F0] rounded-xl border border-[#C9C4B9] p-5 lg:p-6 shadow-xs flex flex-col justify-between h-full min-h-[440px] select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3">
        <div>
          <h2 className="text-base font-bold text-[#11110F]">Stock Performance</h2>
          <p className="text-xs text-[#77736B] mt-0.5">
            Compare top AI and semiconductor companies
          </p>
        </div>

        {/* Timeframe pill selector */}
        <div className="flex items-center gap-1 bg-[#E8E4DB] p-0.5 rounded-md border border-[#DDD8CE] self-start sm:self-center">
          {(["1D", "1W", "1M", "3M", "6M", "1Y"] as TimeframeOption[]).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={cn(
                "px-2.5 py-1 text-xs font-semibold rounded-xs transition-colors",
                timeframe === tf
                  ? "bg-[#11110F] text-[#F8F6F0] shadow-xs"
                  : "text-[#4B4840] hover:text-[#11110F]"
              )}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive SVG Chart */}
      <div className="relative w-full my-2">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto overflow-visible"
          onMouseLeave={() => setHoverIndex(4)}
        >
          {/* Horizontal Gridlines & Y-Axis Labels */}
          {[40, 20, 0, -20].map((val) => {
            const y = getY(val);
            return (
              <g key={val}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={svgWidth - padding.right}
                  y2={y}
                  stroke={val === 0 ? "#C9C4B9" : "#E8E4DB"}
                  strokeWidth={val === 0 ? "1.5" : "1"}
                  strokeDasharray={val === 0 ? "none" : "3 3"}
                />
                <text
                  x={padding.left - 8}
                  y={y + 3.5}
                  textAnchor="end"
                  className="text-[10px] fill-[#77736B] font-mono"
                >
                  {val > 0 ? `+${val}%` : `${val}%`}
                </text>
              </g>
            );
          })}

          {/* Vertical Guide Line on Hover */}
          {activeIndex !== null && (
            <line
              x1={getX(activeIndex)}
              y1={padding.top}
              x2={getX(activeIndex)}
              y2={padding.top + graphHeight}
              stroke="#DDD8CE"
              strokeWidth="1.5"
              strokeDasharray="2 2"
            />
          )}

          {/* Company Trend Lines */}
          {COMPANIES.map((company) => (
            <path
              key={company.ticker}
              d={createPath(company.ticker)}
              fill="none"
              stroke={company.color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}

          {/* Dots on Active Position */}
          {COMPANIES.map((company) => {
            const val = Number(activePoint[company.ticker]);
            return (
              <circle
                key={`dot-${company.ticker}`}
                cx={getX(activeIndex)}
                cy={getY(val)}
                r="3.5"
                fill={company.color}
                stroke="#F8F6F0"
                strokeWidth="1.5"
              />
            );
          })}

          {/* Invisible interactive hover rects */}
          {data.map((d, i) => (
            <rect
              key={i}
              x={getX(i) - graphWidth / (data.length * 2)}
              y={padding.top}
              width={graphWidth / data.length}
              height={graphHeight}
              fill="transparent"
              className="cursor-crosshair"
              onMouseEnter={() => setHoverIndex(i)}
            />
          ))}

          {/* X-Axis Date Labels */}
          {data.map((d, i) => (
            <text
              key={`x-${i}`}
              x={getX(i)}
              y={svgHeight - 8}
              textAnchor="middle"
              className="text-[10px] fill-[#77736B] font-medium"
            >
              {d.dateLabel}
            </text>
          ))}
        </svg>

        {/* Floating Tooltip matching Reference Frame */}
        <div
          className="absolute right-6 top-2 z-10 w-44 rounded-md border border-[#DDD8CE] bg-[#FBFAF6] p-2.5 shadow-sm text-xs pointer-events-none"
        >
          <div className="text-[11px] font-bold text-[#11110F] pb-1.5 border-b border-[#DDD8CE]">
            Dec 14, 2024
          </div>
          <div className="space-y-1 pt-1.5 font-mono text-[11px]">
            {COMPANIES.map((c) => {
              const val = Number(activePoint[c.ticker]);
              const formatted = val > 0 ? `+${val}%` : `${val}%`;
              return (
                <div key={c.ticker} className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                    <span className="text-[#11110F] font-sans text-xs">{c.label}</span>
                  </div>
                  <span
                    className={cn(
                      "font-bold",
                      val >= 0 ? "text-[#16803C]" : "text-[#C62828]"
                    )}
                  >
                    {formatted}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Legend below the chart */}
      <div className="pt-3 border-t border-[#DDD8CE] flex items-center justify-between flex-wrap gap-2 text-xs">
        {COMPANIES.map((c) => (
          <div key={c.ticker} className="flex items-center gap-1.5 font-medium">
            <span className="size-2.5 rounded-2xs shrink-0" style={{ backgroundColor: c.color }} />
            <span className="text-[#11110F]">{c.label}</span>
            <span
              className={cn(
                "font-mono text-[11px] font-bold",
                c.finalReturn.startsWith("+") ? "text-[#16803C]" : "text-[#C62828]"
              )}
            >
              {c.finalReturn}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
