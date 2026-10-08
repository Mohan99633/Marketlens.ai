"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppShell, useAppShell } from "@/components/layout/AppShell";
import { CompanyLogo } from "@/components/shared/company-logo";
import {
  Search,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  ExternalLink,
  Sparkles,
  ChevronDown,
  SlidersHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { INSTITUTIONAL_COMPANIES } from "@/lib/mock";

const CATEGORIES = [
  "All Companies",
  "Monitored",
  "Semiconductors",
  "Tech Giants",
  "AI",
  "Cloud",
  "E-commerce",
  "Hardware",
  "Software",
];

export default function CompaniesPage() {
  const { askLeon } = useAppShell();
  const [selectedCategory, setSelectedCategory] = useState("All Companies");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>("nvda");
  const [sortField, setSortField] = useState<"marketCap" | "change1M">("marketCap");

  const filtered = INSTITUTIONAL_COMPANIES.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.sector.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (selectedCategory === "All Companies") return true;
    if (selectedCategory === "Monitored") return c.status === "Monitored";
    if (selectedCategory === "Semiconductors") return c.sector.includes("Semiconductors");
    if (selectedCategory === "Cloud") return c.sector.includes("Cloud");
    return true;
  });

  const activeCompany =
    INSTITUTIONAL_COMPANIES.find((c) => c.id === selectedCompanyId) ||
    INSTITUTIONAL_COMPANIES[0];

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#DDD8CE]">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#11110F]">
              Companies
            </h1>
            <p className="text-xs sm:text-sm text-[#77736B] mt-0.5">
              Monitor and analyze key companies, view detailed intelligence and metrics.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                askLeon({
                  type: "general",
                  title: "Company Portfolio Screen",
                  summary: "Requesting recommendation for new companies to add to monitored enterprise list.",
                })
              }
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-[#11110F] text-[#F8F6F0] hover:bg-[#33312B] transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add Company</span>
            </button>
          </div>
        </div>

        {/* Filter Pills Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors",
                selectedCategory === cat
                  ? "bg-[#11110F] text-[#F8F6F0] font-semibold"
                  : "bg-[#E8E4DB] text-[#4B4840] hover:bg-[#DDD8CE]"
              )}
            >
              {cat}
            </button>
          ))}
          <button className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#E8E4DB] text-[#4B4840] hover:bg-[#DDD8CE] inline-flex items-center gap-1">
            <span>More</span>
            <ChevronDown className="w-3 h-3" />
          </button>
        </div>

        {/* Search & Secondary Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#77736B]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search companies by name or ticker..."
              className="w-full pl-9 pr-3 py-2 rounded-lg text-xs bg-[#E8E4DB] border border-[#DDD8CE] text-[#11110F] placeholder-[#77736B] focus:outline-none focus:border-[#11110F]"
            />
          </div>

          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-[#E8E4DB] text-[#11110F] hover:bg-[#DDD8CE] border border-[#DDD8CE]">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filter</span>
            </button>
            <div className="flex items-center gap-1 bg-[#E8E4DB] p-1 rounded-lg border border-[#DDD8CE] text-xs font-mono">
              <button
                onClick={() => setSortField("marketCap")}
                className={cn(
                  "px-2.5 py-1 rounded-md text-xs",
                  sortField === "marketCap"
                    ? "bg-[#11110F] text-[#F8F6F0] font-bold"
                    : "text-[#77736B] hover:text-[#11110F]"
                )}
              >
                Market Cap
              </button>
              <button
                onClick={() => setSortField("change1M")}
                className={cn(
                  "px-2.5 py-1 rounded-md text-xs",
                  sortField === "change1M"
                    ? "bg-[#11110F] text-[#F8F6F0] font-bold"
                    : "text-[#77736B] hover:text-[#11110F]"
                )}
              >
                1M Change
              </button>
            </div>
          </div>
        </div>

        {/* Institutional Table */}
        <div className="bg-[#F8F6F0] rounded-xl border border-[#DDD8CE] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#DDD8CE] bg-[#FBFAF6] text-[#77736B] font-mono text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-3 w-10 text-center">#</th>
                  <th className="py-3 px-4">Company</th>
                  <th className="py-3 px-3">Ticker</th>
                  <th className="py-3 px-3">Sector</th>
                  <th className="py-3 px-3 text-right">Market Cap</th>
                  <th className="py-3 px-3 text-right">1D</th>
                  <th className="py-3 px-3 text-right">1W</th>
                  <th className="py-3 px-3 text-right">1M</th>
                  <th className="py-3 px-3 text-right">3M</th>
                  <th className="py-3 px-3 text-right">1Y</th>
                  <th className="py-3 px-3 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DDD8CE]">
                {filtered.map((c, idx) => {
                  const isSelected = selectedCompanyId === c.id;
                  return (
                    <tr
                      key={c.id}
                      onClick={() => setSelectedCompanyId(c.id)}
                      className={cn(
                        "cursor-pointer transition-colors hover:bg-[#FBFAF6]",
                        isSelected ? "bg-[#FBFAF6] font-medium" : ""
                      )}
                    >
                      <td className="py-3 px-3 text-center font-mono text-[#77736B]">
                        {idx + 1}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <CompanyLogo ticker={c.ticker} size={22} />
                          <div>
                            <div className="font-bold text-[#11110F]">{c.name}</div>
                            <div className="text-[11px] text-[#77736B]">${c.price.toFixed(2)}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-[#11110F]">
                        {c.ticker}
                      </td>
                      <td className="py-3 px-3 text-[#4B4840]">
                        {c.sector}
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-[#11110F]">
                        {c.marketCap}
                      </td>
                      <td
                        className={cn(
                          "py-3 px-3 text-right font-mono font-semibold",
                          c.change1D >= 0 ? "text-[#16803C]" : "text-[#C62828]"
                        )}
                      >
                        {c.change1D >= 0 ? "+" : ""}
                        {c.change1D.toFixed(1)}%
                      </td>
                      <td
                        className={cn(
                          "py-3 px-3 text-right font-mono font-semibold",
                          c.change1W >= 0 ? "text-[#16803C]" : "text-[#C62828]"
                        )}
                      >
                        {c.change1W >= 0 ? "+" : ""}
                        {c.change1W.toFixed(1)}%
                      </td>
                      <td
                        className={cn(
                          "py-3 px-3 text-right font-mono font-bold",
                          c.change1M >= 0 ? "text-[#16803C]" : "text-[#C62828]"
                        )}
                      >
                        {c.change1M >= 0 ? "+" : ""}
                        {c.change1M.toFixed(1)}%
                      </td>
                      <td
                        className={cn(
                          "py-3 px-3 text-right font-mono font-semibold",
                          c.change3M >= 0 ? "text-[#16803C]" : "text-[#C62828]"
                        )}
                      >
                        {c.change3M >= 0 ? "+" : ""}
                        {c.change3M.toFixed(1)}%
                      </td>
                      <td
                        className={cn(
                          "py-3 px-3 text-right font-mono font-bold",
                          c.change1Y >= 0 ? "text-[#16803C]" : "text-[#C62828]"
                        )}
                      >
                        {c.change1Y >= 0 ? "+" : ""}
                        {c.change1Y.toFixed(1)}%
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span
                          className={cn(
                            "px-2 py-0.5 rounded-full text-[10px] font-mono font-bold",
                            c.status === "Monitored"
                              ? "bg-[#E7F3E8] text-[#16803C]"
                              : "bg-[#FFF0D6] text-[#C77700]"
                          )}
                        >
                          {c.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div
                          className="flex items-center justify-end gap-1.5"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Link
                            href={`/companies/${c.id}`}
                            className="px-2.5 py-1 rounded-md text-xs font-semibold bg-[#11110F] text-[#F8F6F0] hover:bg-[#33312B] transition-colors"
                          >
                            View
                          </Link>
                          <button
                            onClick={() =>
                              askLeon({
                                type: "company",
                                company: c.name,
                                title: `${c.ticker} Deep Intelligence Brief`,
                                summary: `Analyze ${c.name} (${c.ticker}) competitive moats, market cap trajectory, and key risks.`,
                              })
                            }
                            className="p-1 rounded-md hover:bg-[#DDD8CE] text-[#77736B] hover:text-[#11110F]"
                            title="Ask Leon about this company"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Company Quick View Panel */}
        {activeCompany && (
          <div className="bg-[#FBFAF6] rounded-xl border border-[#DDD8CE] p-5 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#DDD8CE] pb-3">
              <div className="flex items-center gap-3">
                <CompanyLogo ticker={activeCompany.ticker} size={32} />
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold text-[#11110F]">
                      {activeCompany.name} ({activeCompany.ticker})
                    </h2>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#E7F3E8] text-[#16803C]">
                      {activeCompany.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#77736B]">{activeCompany.sector}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href={`/companies/${activeCompany.id}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#11110F] text-[#F8F6F0] hover:bg-[#33312B] transition-colors"
                >
                  <span>Open Full Dossier</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
                <button
                  onClick={() =>
                    askLeon({
                      type: "company",
                      company: activeCompany.name,
                      title: `${activeCompany.ticker} Deep Analysis`,
                      summary: activeCompany.description,
                    })
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#E8E4DB] text-[#11110F] hover:bg-[#DDD8CE] transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#6C4CE8]" />
                  <span>Ask Leon</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
              <div className="p-3 rounded-lg bg-[#F8F6F0] border border-[#DDD8CE]">
                <div className="text-[10px] font-mono uppercase text-[#77736B]">Market Cap</div>
                <div className="text-base font-bold text-[#11110F] font-mono mt-0.5">
                  {activeCompany.marketCap}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#F8F6F0] border border-[#DDD8CE]">
                <div className="text-[10px] font-mono uppercase text-[#77736B]">Stock Price</div>
                <div className="text-base font-bold text-[#11110F] font-mono mt-0.5">
                  ${activeCompany.price.toFixed(2)}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#F8F6F0] border border-[#DDD8CE]">
                <div className="text-[10px] font-mono uppercase text-[#77736B]">1-Month Return</div>
                <div className="text-base font-bold text-[#16803C] font-mono mt-0.5 flex items-center gap-0.5">
                  <ArrowUpRight className="w-4 h-4" />
                  +{activeCompany.change1M.toFixed(1)}%
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#F8F6F0] border border-[#DDD8CE]">
                <div className="text-[10px] font-mono uppercase text-[#77736B]">1-Year Return</div>
                <div
                  className={cn(
                    "text-base font-bold font-mono mt-0.5 flex items-center gap-0.5",
                    activeCompany.change1Y >= 0 ? "text-[#16803C]" : "text-[#C62828]"
                  )}
                >
                  {activeCompany.change1Y >= 0 ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                  {activeCompany.change1Y >= 0 ? "+" : ""}
                  {activeCompany.change1Y.toFixed(1)}%
                </div>
              </div>
            </div>

            <p className="text-xs text-[#4B4840] leading-relaxed">
              {activeCompany.description}
            </p>
          </div>
        )}
      </div>
    </AppShell>
  );
}
