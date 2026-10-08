"use client";

import React from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { CompetitiveIntelligencePanel } from "@/components/dashboard/CompetitiveIntelligencePanel";
import { StockCompetitionChart } from "@/components/dashboard/StockCompetitionChart";
import { LatestNewsGrid } from "@/components/dashboard/LatestNewsGrid";
import { Sparkles } from "lucide-react";

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        {/* WEB DASHBOARD HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-[#DDD8CE]">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#11110F]">
              Web Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-[#77736B] mt-0.5">
              Your competitive landscape at a glance.
            </p>
          </div>

          {/* Top Right Status Indicators */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Market Status Pill */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-[#E7F3E8] text-[#16803C] border border-[#A5D6A7]">
              <span className="w-2 h-2 rounded-full bg-[#16803C] animate-pulse" />
              <span>MARKET OPEN</span>
            </div>

            {/* Connection Status Pill */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-[#E8E4DB] text-[#4B4840] border border-[#DDD8CE]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16803C]" />
              <span>CONNECTED</span>
            </div>

            {/* Leon Status Compact Pill */}
            <Link
              href="/agent"
              className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#11110F] text-[#F8F6F0] hover:bg-[#33312B] transition-colors group shadow-sm"
              title="Open Leon Agent Chat"
            >
              <div className="w-3.5 h-3.5 rounded-full overflow-hidden shrink-0 flex items-center justify-center bg-[#F8F6F0]/20 text-[#F8F6F0]">
                <Sparkles size={10} />
              </div>
              <span>LEON ● ACTIVE</span>
              <span className="text-[10px] text-[#F8F6F0]/70 group-hover:translate-x-0.5 transition-transform">
                →
              </span>
            </Link>
          </div>
        </div>

        {/* FIRST MAJOR CONTENT AREA — TWO PANELS SIDE BY SIDE (50 / 50 Desktop) */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* LEFT PANEL: STOCK PERFORMANCE */}
          <div className="w-full h-full flex flex-col">
            <StockCompetitionChart />
          </div>

          {/* RIGHT PANEL: MARKET CAPITALIZATION */}
          <div className="w-full h-full flex flex-col">
            <CompetitiveIntelligencePanel />
          </div>
        </section>

        {/* SECOND MAJOR CONTENT AREA — LATEST NEWS & INTELLIGENCE */}
        <section className="pt-2">
          <LatestNewsGrid />
        </section>
      </div>
    </AppShell>
  );
}
