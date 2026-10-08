"use client";

import React from "react";
import Link from "next/link";
import { CompanyLogo } from "@/components/shared/company-logo";
import { cn } from "@/lib/utils";

interface MarketCapRow {
  rank: number;
  ticker: string;
  name: string;
  fullName: string;
  marketCap: string;
  valueB: number; // for bar width
  change1M: string;
  isPositive: boolean;
}

const MARKET_CAP_DATA: MarketCapRow[] = [
  {
    rank: 1,
    ticker: "NVDA",
    name: "NVIDIA",
    fullName: "NVIDIA (NVDA)",
    marketCap: "$3.21T",
    valueB: 3210,
    change1M: "+28.4%",
    isPositive: true,
  },
  {
    rank: 2,
    ticker: "MSFT",
    name: "Microsoft",
    fullName: "Microsoft (MSFT)",
    marketCap: "$2.78T",
    valueB: 2780,
    change1M: "+8.3%",
    isPositive: true,
  },
  {
    rank: 3,
    ticker: "GOOGL",
    name: "Alphabet",
    fullName: "Alphabet (GOOGL)",
    marketCap: "$2.12T",
    valueB: 2120,
    change1M: "+6.5%",
    isPositive: true,
  },
  {
    rank: 4,
    ticker: "AMZN",
    name: "Amazon",
    fullName: "Amazon (AMZN)",
    marketCap: "$1.98T",
    valueB: 1980,
    change1M: "+4.2%",
    isPositive: true,
  },
  {
    rank: 5,
    ticker: "AMD",
    name: "AMD",
    fullName: "AMD (AMD)",
    marketCap: "$289B",
    valueB: 289,
    change1M: "+12.1%",
    isPositive: true,
  },
  {
    rank: 6,
    ticker: "INTC",
    name: "Intel",
    fullName: "Intel (INTC)",
    marketCap: "$129B",
    valueB: 129,
    change1M: "-2.1%",
    isPositive: false,
  },
];

const MAX_VALUE_B = 3210;

export function CompetitiveIntelligencePanel() {
  return (
    <div className="bg-[#F8F6F0] rounded-xl border border-[#C9C4B9] p-5 lg:p-6 shadow-xs flex flex-col justify-between h-full min-h-[440px] select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-3">
        <div>
          <h2 className="text-base font-bold text-[#11110F]">Market Capitalization</h2>
          <p className="text-xs text-[#77736B] mt-0.5">
            Compare company size by market cap
          </p>
        </div>
        <Link
          href="/companies"
          className="text-xs font-semibold text-[#11110F] hover:underline flex items-center gap-1"
        >
          View All <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-12 text-[11px] font-bold text-[#77736B] border-b border-[#DDD8CE] pb-2 pt-1">
        <div className="col-span-1">#</div>
        <div className="col-span-4">Company</div>
        <div className="col-span-4 text-right pr-4">Market Cap</div>
        <div className="col-span-3 text-right">1M Change</div>
      </div>

      {/* Rows */}
      <div className="divide-y divide-[#DDD8CE]/60 flex-1 flex flex-col justify-around py-1">
        {MARKET_CAP_DATA.map((row) => {
          const barWidthPercent = Math.max((row.valueB / MAX_VALUE_B) * 100, 3);

          return (
            <Link
              key={row.ticker}
              href={`/companies/${row.ticker}`}
              className="grid grid-cols-12 items-center py-2 text-xs transition-colors hover:bg-[#E8E4DB]/50 rounded-xs px-1"
            >
              {/* Rank */}
              <div className="col-span-1 text-[11px] font-mono font-medium text-[#77736B]">
                {row.rank}
              </div>

              {/* Company Logo & Name */}
              <div className="col-span-4 flex items-center gap-2 min-w-0 pr-1">
                <CompanyLogo ticker={row.ticker} size={18} />
                <div className="truncate">
                  <span className="font-semibold text-[#11110F]">{row.name}</span>{" "}
                  <span className="text-[11px] text-[#77736B] font-mono">({row.ticker})</span>
                </div>
              </div>

              {/* Horizontal Bar & Market Cap Value */}
              <div className="col-span-4 flex items-center justify-end gap-2 pr-4">
                <div className="w-16 sm:w-20 bg-[#E8E4DB] h-2.5 rounded-2xs overflow-hidden flex justify-start">
                  <div
                    className="bg-[#4B4840] h-full rounded-2xs transition-all duration-300"
                    style={{ width: `${barWidthPercent}%` }}
                  />
                </div>
                <span className="font-mono text-xs font-bold text-[#11110F] shrink-0">
                  {row.marketCap}
                </span>
              </div>

              {/* 1M Change */}
              <div
                className={cn(
                  "col-span-3 text-right font-mono text-xs font-bold",
                  row.isPositive ? "text-[#16803C]" : "text-[#C62828]"
                )}
              >
                {row.change1M}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
