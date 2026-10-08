"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { AppShell, useAppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SeverityBadge } from "@/components/shared/severity-badge";
import { MetricCard } from "@/components/shared/metric-card";
import { getCompanyById, getIntelligence } from "@/lib/mock";
import { Company, IntelligenceItem } from "@/lib/types/models";
import { getCompanyMedia } from "@/lib/media/company-images";
import { SafeImage } from "@/components/shared/safe-image";
import {
  Scale,
  Bot,
  ArrowLeft,
  ShieldCheck,
  Cpu,
  ExternalLink,
  Layers,
} from "lucide-react";

function CompanyDetailContent() {
  const params = useParams();
  const router = useRouter();
  const { askLeon } = useAppShell();
  const companyId = (params?.companyId as string) || "nvda";

  const [company, setCompany] = useState<Company | null>(null);
  const [relatedIntel, setRelatedIntel] = useState<IntelligenceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCompanyById(companyId).then((comp) => {
      setCompany(comp || null);
      if (comp) {
        getIntelligence().then((items) => {
          setRelatedIntel(
            items.filter(
              (item) =>
                item.companyTicker === comp.ticker ||
                item.relatedCompanies.includes(comp.ticker)
            )
          );
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });
  }, [companyId]);

  if (loading) {
    return (
      <AppShell>
        <div className="p-8 max-w-7xl mx-auto space-y-4">
          <div className="h-8 w-48 bg-muted animate-pulse rounded-md" />
          <div className="h-40 bg-muted/50 animate-pulse rounded-xl" />
        </div>
      </AppShell>
    );
  }

  if (!company) {
    return (
      <AppShell>
        <div className="p-8 max-w-3xl mx-auto text-center space-y-4">
          <h2 className="text-lg font-bold text-foreground">Company Entity Not Found</h2>
          <p className="text-xs text-muted-foreground">
            No intelligence dossier matches the ticker or identifier &quot;{companyId}&quot;.
          </p>
          <Button variant="outline" size="sm" onClick={() => router.push("/companies")}>
            Back to Companies Portfolio
          </Button>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="p-4 md:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
        {/* Navigation Breadcrumb & Back */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.push("/companies")}
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors font-medium"
          >
            <ArrowLeft className="size-3.5" /> Back to Companies Portfolio
          </button>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/comparison")}
              className="text-xs h-8 gap-1.5"
            >
              <Scale className="size-3.5" /> Compare vs Rivals
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() =>
                askLeon({
                  type: "company",
                  id: company.id,
                  company: company.ticker,
                  title: `${company.name} Comprehensive Dossier`,
                })
              }
              className="text-xs h-8 gap-1.5 font-bold"
            >
              <Bot className="size-3.5" /> Ask Leon About {company.ticker}
            </Button>
          </div>
        </div>

        {/* Company Header Card with Hero Banner */}
        <div className="rounded-2xl border border-border/80 bg-card shadow-xs relative overflow-hidden">
          {/* Real-world Hero Image Banner */}
          <div className="w-full h-40 sm:h-48 relative overflow-hidden bg-slate-900">
            <SafeImage
              src={getCompanyMedia(company.ticker).hero}
              alt={`${company.name} Technology Infrastructure`}
              fallbackTicker={company.ticker}
              enableHoverEffect={true}
              className="w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent pointer-events-none" />
            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-xs text-white text-[11px] font-mono px-2.5 py-1 rounded border border-white/10">
              Verified Primary Infrastructure
            </div>
          </div>

          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div
                  className="flex size-14 items-center justify-center rounded-xl font-mono text-xl font-black text-white shadow-xs shrink-0"
                  style={{ backgroundColor: getCompanyMedia(company.ticker).brandColor }}
                >
                  {company.ticker}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-mono">
                      {company.name}
                    </h1>
                    <span className="rounded bg-muted px-2 py-0.5 font-mono text-xs font-semibold text-muted-foreground">
                      {company.sector}
                    </span>
                    <SeverityBadge severity={company.pulse.threatLevel} size="sm" showIcon />
                  </div>
                  <p className="text-xs text-muted-foreground max-w-2xl leading-relaxed">
                    {company.overview}
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0 border-t md:border-t-0 pt-3 md:pt-0">
                <div className="text-2xl font-black font-mono text-foreground">
                  {company.stockPrice}
                </div>
                <span
                  className={`font-mono text-xs font-bold ${
                    company.stockChange1M.startsWith("+")
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-rose-600 dark:text-rose-400"
                  }`}
                >
                  {company.stockChange1M} past 30 days
                </span>
                <div className="text-[10px] text-muted-foreground font-mono mt-0.5">
                  CAP: {company.marketCap} • REV: {company.revenue}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3D Company Intelligence Network Card */}
        <div className="rounded-xl border border-slate-200/90 bg-white p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" />
              <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-800">
                3D Company Intelligence Network ({company.ticker})
              </h2>
            </div>
            <span className="text-[10px] font-mono text-slate-400">
              Interactive relationship cluster: Moats • Products • Supply Chain • Competitors
            </span>
          </div>
        </div>

        {/* 1. VERIFIED FACTS & FINANCIAL CORE */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-4 text-emerald-600" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              [VERIFIED MARKET DATA] Financials & Performance
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <MetricCard
              label="Market Capitalization"
              value={company.marketCap}
              description="Current enterprise value"
            />
            <MetricCard
              label="Annual Revenue"
              value={company.revenue}
              delta={{ value: company.revenueGrowth, trend: "up", label: "YoY" }}
              description="Trailing twelve months"
            />
            <MetricCard
              label="Net Operating Income"
              value={company.netIncome}
              description="Reported GAAP earnings"
            />
            <MetricCard
              label="Latest R&D Capex"
              value={company.financials[0]?.rdExpense || "$2.5B"}
              description="Quarterly R&D deployment"
            />
          </div>
        </section>

        {/* 2. LEON AI ASSESSMENT & COMPETITIVE PULSE (CLEARLY SEPARATED) */}
        <section className="rounded-2xl border border-primary/30 bg-primary/5 p-6 space-y-6 shadow-xs relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-primary/20 pb-4">
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-xs">
                <Bot className="size-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">
                  [LEON ASSESSMENT] AI Competitive Pulse & Threat Evaluation
                </h2>
                <p className="text-[11px] text-muted-foreground">
                  Autonomous synthesis generated by Hermes Agent • Factual confidence: {Math.round(company.leonAssessment.confidence * 100)}%
                </p>
              </div>
            </div>
            <div className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-card text-foreground border border-border/80">
              AI SCORE: {company.aiScore} / 100
            </div>
          </div>

          {/* Pulse Sub-Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-xl bg-card p-3 border border-border/80">
              <span className="text-[10px] font-mono uppercase text-muted-foreground">Strategic Moat</span>
              <div className="font-mono text-lg font-bold text-foreground mt-0.5">
                {company.pulse.marketPower} <span className="text-xs text-muted-foreground">/100</span>
              </div>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">Tier-1 Monopoly Power</span>
            </div>
            <div className="rounded-xl bg-card p-3 border border-border/80">
              <span className="text-[10px] font-mono uppercase text-muted-foreground">Innovation Velocity</span>
              <div className="font-mono text-lg font-bold text-foreground mt-0.5">
                {company.pulse.innovation} <span className="text-xs text-muted-foreground">/100</span>
              </div>
              <span className="text-[10px] text-muted-foreground">High patent output</span>
            </div>
            <div className="rounded-xl bg-card p-3 border border-border/80">
              <span className="text-[10px] font-mono uppercase text-muted-foreground">Tech Strength</span>
              <div className="font-mono text-lg font-bold text-foreground mt-0.5">
                {company.pulse.technologyStrength} <span className="text-xs text-muted-foreground">/100</span>
              </div>
              <span className="text-[10px] text-muted-foreground">Custom ASIC & IP</span>
            </div>
            <div className="rounded-xl bg-card p-3 border border-border/80">
              <span className="text-[10px] font-mono uppercase text-muted-foreground">Momentum Trajectory</span>
              <div className="font-mono text-lg font-bold text-foreground mt-0.5">
                {company.pulse.momentum}
              </div>
              <span className="text-[10px] text-primary font-semibold">Positive vector</span>
            </div>
          </div>

          {/* Detailed Leon Synthesis Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="rounded-xl bg-card p-4 border border-border/80 space-y-1.5">
              <span className="font-mono text-[10px] uppercase font-bold text-primary">Strategic Moat Assessment</span>
              <p className="text-muted-foreground leading-relaxed">
                {company.leonAssessment.strategicMoat}
              </p>
            </div>
            <div className="rounded-xl bg-card p-4 border border-border/80 space-y-1.5">
              <span className="font-mono text-[10px] uppercase font-bold text-rose-600 dark:text-rose-400">Critical Vulnerability</span>
              <p className="text-muted-foreground leading-relaxed">
                {company.leonAssessment.keyVulnerability}
              </p>
            </div>
            <div className="rounded-xl bg-card p-4 border border-border/80 space-y-1.5">
              <span className="font-mono text-[10px] uppercase font-bold text-foreground">18-Month Outlook</span>
              <p className="text-muted-foreground leading-relaxed">
                {company.leonAssessment.outlook}
              </p>
            </div>
          </div>
        </section>

        {/* 3. DOSSIER TABS: Products, Technology, Financials, Partnerships */}
        <section className="space-y-4">
          <Tabs defaultValue="products" className="w-full">
            <TabsList className="grid grid-cols-4 w-full max-w-xl">
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="technology">Technology</TabsTrigger>
              <TabsTrigger value="financials">Quarterly Trend</TabsTrigger>
              <TabsTrigger value="partnerships">Partnerships</TabsTrigger>
            </TabsList>

            {/* Products Tab */}
            <TabsContent value="products" className="pt-4">
              <div className="rounded-xl border border-border/80 bg-card overflow-hidden divide-y divide-border/60">
                {company.products.map((p, i) => (
                  <div key={i} className="p-3.5 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-xs text-foreground">{p.name}</h4>
                      <span className="text-[11px] text-muted-foreground">{p.category}</span>
                    </div>
                    <div className="text-right font-mono">
                      <span className="text-xs font-bold text-foreground">{p.marketShare}</span>
                      <div className="text-[10px] text-muted-foreground">Market Share</div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Technology Tab */}
            <TabsContent value="technology" className="pt-4">
              <div className="rounded-xl border border-border/80 bg-card p-4 space-y-2">
                {company.technology.map((tech, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs p-2 rounded-lg bg-muted/30">
                    <Cpu className="size-4 text-primary shrink-0" />
                    <span className="font-medium text-foreground">{tech}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Financials Tab */}
            <TabsContent value="financials" className="pt-4">
              <div className="rounded-xl border border-border/80 bg-card overflow-hidden divide-y divide-border/60 font-mono text-xs">
                {company.financials.map((f, i) => (
                  <div key={i} className="p-3.5 flex items-center justify-between">
                    <span className="font-bold text-foreground">{f.quarter}</span>
                    <span>Revenue: {f.revenue}</span>
                    <span>Op. Margin: {f.operatingMargin}</span>
                    <span>R&D: {f.rdExpense}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Partnerships Tab */}
            <TabsContent value="partnerships" className="pt-4">
              <div className="rounded-xl border border-border/80 bg-card overflow-hidden divide-y divide-border/60">
                {company.partnerships.map((part, i) => (
                  <div key={i} className="p-3.5 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-foreground">{part.partner}</span>
                      <p className="text-muted-foreground mt-0.5">{part.scope}</p>
                    </div>
                    <span className="font-mono text-[11px] text-muted-foreground shrink-0 ml-4">
                      {part.date}
                    </span>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* 4. ACTIVE INTELLIGENCE FEED FOR THIS COMPANY */}
        {relatedIntel.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Recent Verified Intelligence Related to {company.ticker}
            </h2>
            <div className="space-y-2.5">
              {relatedIntel.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-border/80 bg-card p-4 flex items-center justify-between hover:border-primary/40 transition-colors"
                >
                  <div className="space-y-1 pr-4">
                    <div className="flex items-center gap-2">
                      <SeverityBadge severity={item.impact} size="sm" />
                      <span className="font-bold text-xs text-foreground">{item.title}</span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1">{item.summary}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={() => router.push(`/intelligence/${item.id}`)}
                    className="shrink-0 text-xs h-7"
                  >
                    Examine <ExternalLink className="size-3 ml-1" />
                  </Button>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </AppShell>
  );
}

export default function CompanyDetailPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center text-xs text-slate-500">
          Loading company profile...
        </div>
      }
    >
      <CompanyDetailContent />
    </React.Suspense>
  );
}
