"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppShell, useAppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CategoryBadge } from "@/components/shared/category-badge";
import { SeverityBadge } from "@/components/shared/severity-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { getIntelligence } from "@/lib/mock";
import { IntelligenceItem } from "@/lib/types/models";
import { IntelligenceCategory, AlertSeverity } from "@/lib/types/design-system";
import {
  BrainCircuit,
  Search,
  Bot,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  Sparkles,
} from "lucide-react";

const ALL_CATEGORIES: IntelligenceCategory[] = [
  "Product",
  "Financial",
  "Technology",
  "Partnership",
  "Acquisition",
  "Regulatory",
  "Strategy",
  "Market",
];

const ALL_IMPACTS: AlertSeverity[] = ["Critical", "High", "Medium", "Low"];

export default function IntelligenceCenterPage() {
  const router = useRouter();
  const { askLeon } = useAppShell();
  const [items, setItems] = useState<IntelligenceItem[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedImpact, setSelectedImpact] = useState<string>("all");
  const [selectedCompany, setSelectedCompany] = useState<string>("all");

  useEffect(() => {
    getIntelligence().then(setItems);
  }, []);

  const filtered = items.filter((item) => {
    if (selectedCategory !== "all" && item.category !== selectedCategory) return false;
    if (selectedImpact !== "all" && item.impact !== selectedImpact) return false;
    if (selectedCompany !== "all" && item.companyTicker !== selectedCompany) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.companyTicker.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <AppShell>
      <div className="p-4 md:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-mono flex items-center gap-2">
              <BrainCircuit className="size-6 text-primary" />
              INTELLIGENCE CENTER
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Live feed of autonomous market discoveries, strategic moves, and competitive threat assessments.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => alert("Simulating continuous ingest refresh from Leon...")}
              className="text-xs h-8 gap-1.5"
            >
              <RefreshCw className="size-3" /> Refresh Feed
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() =>
                askLeon({
                  type: "general",
                  title: "Intelligence Feed Overview",
                })
              }
              className="text-xs h-8 gap-1.5 font-bold"
            >
              <Bot className="size-3.5" /> Ask Leon
            </Button>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="rounded-xl border border-border/80 bg-card p-4 shadow-xs space-y-3">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-2.5 size-3.5 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search intelligence titles, companies, or keywords..."
                className="pl-9 text-xs h-9"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <span className="text-xs font-semibold text-muted-foreground shrink-0">Company:</span>
              <select
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
                className="h-8 rounded-lg border border-border/80 bg-background px-2.5 text-xs text-foreground outline-hidden"
              >
                <option value="all">All Companies</option>
                <option value="NVDA">NVIDIA (NVDA)</option>
                <option value="AMD">AMD (AMD)</option>
                <option value="INTC">Intel (INTC)</option>
                <option value="MSFT">Microsoft (MSFT)</option>
                <option value="GOOGL">Alphabet (GOOGL)</option>
                <option value="AMZN">Amazon (AMZN)</option>
              </select>

              <span className="text-xs font-semibold text-muted-foreground shrink-0 ml-2">Impact:</span>
              <select
                value={selectedImpact}
                onChange={(e) => setSelectedImpact(e.target.value)}
                className="h-8 rounded-lg border border-border/80 bg-background px-2.5 text-xs text-foreground outline-hidden"
              >
                <option value="all">All Impacts</option>
                {ALL_IMPACTS.map((imp) => (
                  <option key={imp} value={imp}>
                    {imp}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Chips Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-border/60 pb-1">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors shrink-0 ${
                selectedCategory === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted"
              }`}
            >
              All Categories
            </button>
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors shrink-0 ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Intelligence Feed Cards */}
        {filtered.length === 0 ? (
          <EmptyState
            title="No Intelligence Matching Filters"
            description="No competitive discoveries meet your current filter combination. Try clearing some filters."
            actionLabel="Reset All Filters"
            onAction={() => {
              setSelectedCategory("all");
              setSelectedImpact("all");
              setSelectedCompany("all");
              setSearch("");
            }}
          />
        ) : (
          <div className="space-y-4">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-border/80 bg-card p-5 shadow-xs hover:border-primary/40 transition-all space-y-4"
              >
                {/* Item Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-muted text-foreground">
                      {item.companyTicker}
                    </span>
                    <CategoryBadge category={item.category} size="sm" />
                    <SeverityBadge severity={item.impact} size="sm" showIcon />
                    <span className="text-[11px] text-muted-foreground font-mono">
                      {new Date(item.timestamp).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 self-end sm:self-auto">
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() =>
                        askLeon({
                          type: "intelligence",
                          id: item.id,
                          company: item.companyTicker,
                          category: item.category,
                          impact: item.impact,
                          title: item.title,
                        })
                      }
                      className="text-xs h-7 text-primary hover:bg-primary/10 gap-1"
                    >
                      <Bot className="size-3.5" /> Ask Leon
                    </Button>
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={() => router.push(`/intelligence/${item.id}`)}
                      className="text-xs h-7 gap-1"
                    >
                      <ExternalLink className="size-3" /> Detailed Evidence
                    </Button>
                  </div>
                </div>

                {/* Title & Summary */}
                <div>
                  <Link href={`/intelligence/${item.id}`} className="hover:underline">
                    <h2 className="text-base font-bold text-foreground leading-snug">
                      {item.title}
                    </h2>
                  </Link>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                {/* Leon AI Synthesis Box */}
                <div className="rounded-xl border border-border/60 bg-muted/20 p-3.5 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-primary">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="size-3.5" /> Leon Strategic Assessment
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground uppercase">
                      Threat Target: {item.leonAnalysis.threatAssessment.to} ({item.leonAnalysis.threatAssessment.level})
                    </span>
                  </div>
                  <p className="text-xs text-foreground leading-relaxed">
                    {item.leonAnalysis.competitiveImplications}
                  </p>
                </div>

                {/* Footer Sources & Related Companies */}
                <div className="pt-3 border-t border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                    <ShieldCheck className="size-3.5 text-emerald-600" />
                    <span>{item.sources.length} Verified Sources:</span>
                    <span className="font-medium truncate max-w-xs">
                      {item.sources.map((s) => s.publisher).join(", ")}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-muted-foreground font-mono">Related:</span>
                    <div className="flex gap-1">
                      {item.relatedCompanies.map((rel) => (
                        <span
                          key={rel}
                          className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] font-bold text-foreground"
                        >
                          {rel}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
