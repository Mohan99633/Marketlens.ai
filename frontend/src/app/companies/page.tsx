"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppShell, useAppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable, ColumnDef } from "@/components/shared/data-table";
import { SeverityBadge } from "@/components/shared/severity-badge";
import { getCompanies } from "@/lib/mock";
import { Company } from "@/lib/types/models";
import {
  Building2,
  Search,
  Scale,
  Eye,
  Bot,
  Plus,
  Star,
  CheckSquare,
  Square,
  ArrowUpDown,
} from "lucide-react";

export default function CompaniesPage() {
  const router = useRouter();
  const { askLeon } = useAppShell();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [watchlist, setWatchlist] = useState<string[]>(["comp_nvda", "comp_amd"]);
  const [sortBy, setSortBy] = useState<"aiScore" | "name" | "1m">("aiScore");

  useEffect(() => {
    getCompanies().then(setCompanies);
  }, []);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleWatchlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWatchlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const filtered = companies
    .filter((c) => {
      const q = searchQuery.toLowerCase();
      return (
        c.name.toLowerCase().includes(q) ||
        c.ticker.toLowerCase().includes(q) ||
        c.sector.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      if (sortBy === "aiScore") return b.aiScore - a.aiScore;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return (
        parseFloat(b.stockChange1M.replace("%", "")) -
        parseFloat(a.stockChange1M.replace("%", ""))
      );
    });

  const columns: ColumnDef<Company>[] = [
    {
      key: "select",
      header: "",
      className: "w-10 px-2",
      accessor: (c) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleSelect(c.id);
          }}
          className="text-muted-foreground hover:text-primary transition-colors"
          aria-label={selectedIds.includes(c.id) ? "Deselect" : "Select for comparison"}
        >
          {selectedIds.includes(c.id) ? (
            <CheckSquare className="size-4 text-primary" />
          ) : (
            <Square className="size-4" />
          )}
        </button>
      ),
    },
    {
      key: "company",
      header: "Company & Sector",
      accessor: (c) => (
        <div className="flex items-center gap-3">
          <button
            onClick={(e) => toggleWatchlist(c.id, e)}
            className="text-muted-foreground hover:text-amber-500 transition-colors"
            aria-label="Toggle watchlist"
          >
            <Star
              className={`size-3.5 ${
                watchlist.includes(c.id) ? "fill-amber-400 text-amber-500" : ""
              }`}
            />
          </button>
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-border/80 bg-muted/40 font-mono text-xs font-bold text-foreground">
            {c.ticker}
          </div>
          <div>
            <div className="font-bold text-xs text-foreground hover:text-primary transition-colors">
              {c.name}
            </div>
            <div className="text-[11px] text-muted-foreground">{c.sector}</div>
          </div>
        </div>
      ),
    },
    {
      key: "marketCap",
      header: "Market Cap",
      isMono: true,
      align: "right",
      accessor: (c) => <span className="font-mono text-xs font-semibold">{c.marketCap}</span>,
    },
    {
      key: "revenue",
      header: "Revenue",
      isMono: true,
      align: "right",
      accessor: (c) => (
        <div className="text-right">
          <div className="font-mono text-xs font-semibold">{c.revenue}</div>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold font-mono">
            {c.revenueGrowth}
          </span>
        </div>
      ),
    },
    {
      key: "stockPrice",
      header: "Stock Price",
      isMono: true,
      align: "right",
      accessor: (c) => (
        <div className="text-right">
          <div className="font-mono text-xs font-bold">{c.stockPrice}</div>
          <span
            className={`font-mono text-[11px] font-semibold ${
              c.stockChange1M.startsWith("+")
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-rose-600 dark:text-rose-400"
            }`}
          >
            {c.stockChange1M}
          </span>
        </div>
      ),
    },
    {
      key: "threat",
      header: "Threat Level",
      align: "center",
      accessor: (c) => <SeverityBadge severity={c.pulse.threatLevel} size="sm" showIcon />,
    },
    {
      key: "aiScore",
      header: "AI Score",
      align: "right",
      sortable: true,
      accessor: (c) => (
        <div className="font-mono text-xs font-bold text-foreground">
          {c.aiScore} <span className="text-[10px] text-muted-foreground font-normal">/100</span>
        </div>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      align: "right",
      accessor: (c) => (
        <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
          <Button
            variant="ghost"
            size="xs"
            onClick={() =>
              askLeon({
                type: "company",
                id: c.id,
                company: c.ticker,
                title: `${c.name} Strategic Overview`,
              })
            }
            className="text-xs h-7 text-primary hover:bg-primary/10"
          >
            <Bot className="size-3.5 mr-1" /> Ask Leon
          </Button>
          <Button
            variant="outline"
            size="xs"
            onClick={() => router.push(`/companies/${c.ticker.toLowerCase()}`)}
            className="text-xs h-7"
          >
            <Eye className="size-3.5 mr-1" /> Dossier
          </Button>
        </div>
      ),
    },
  ];

  return (
    <AppShell>
      <div className="p-4 md:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-mono flex items-center gap-2">
              <Building2 className="size-6 text-primary" />
              COMPANIES INTELLIGENCE PORTFOLIO
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Continuously monitored enterprise entities, competitor movement, and autonomous AI score benchmarks.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => alert("Simulation: Company onboarding form opens.")}
              className="text-xs h-8 gap-1.5"
            >
              <Plus className="size-3.5" /> Track New Company
            </Button>
          </div>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="rounded-xl border border-border/80 bg-card p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-2.5 size-3.5 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by company, ticker, or sector..."
              className="pl-9 text-xs h-9"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1 shrink-0">
              <ArrowUpDown className="size-3" /> Sort:
            </span>
            <Button
              variant={sortBy === "aiScore" ? "default" : "outline"}
              size="xs"
              onClick={() => setSortBy("aiScore")}
              className="text-xs h-7"
            >
              AI Score
            </Button>
            <Button
              variant={sortBy === "1m" ? "default" : "outline"}
              size="xs"
              onClick={() => setSortBy("1m")}
              className="text-xs h-7"
            >
              1M Momentum
            </Button>
            <Button
              variant={sortBy === "name" ? "default" : "outline"}
              size="xs"
              onClick={() => setSortBy("name")}
              className="text-xs h-7"
            >
              Alphabetical
            </Button>
          </div>
        </div>

        {/* Comparison Floating Action Bar (When 2+ companies selected) */}
        {selectedIds.length > 0 && (
          <div className="rounded-xl border border-primary/40 bg-primary/5 p-3 flex items-center justify-between animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-2 text-xs font-bold text-foreground">
              <Scale className="size-4 text-primary" />
              <span>{selectedIds.length} companies selected for competitive comparison</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="xs"
                onClick={() => setSelectedIds([])}
                className="text-xs h-7 text-muted-foreground"
              >
                Clear
              </Button>
              <Button
                variant="default"
                size="xs"
                onClick={() => router.push("/comparison")}
                className="text-xs h-7 font-bold gap-1"
              >
                Launch Comparison Tool <Scale className="size-3" />
              </Button>
            </div>
          </div>
        )}

        {/* Data Table */}
        <DataTable
          data={filtered}
          columns={columns}
          keyExtractor={(c) => c.id}
          onRowClick={(c) => router.push(`/companies/${c.ticker.toLowerCase()}`)}
          emptyTitle="No Companies Found"
          emptyDescription="No monitored companies match your search criteria. Try clearing the filter."
        />
      </div>
    </AppShell>
  );
}
