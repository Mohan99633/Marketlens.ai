"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { AppShell, useAppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { CategoryBadge } from "@/components/shared/category-badge";
import { SeverityBadge } from "@/components/shared/severity-badge";
import { getIntelligenceById } from "@/lib/mock";
import { IntelligenceItem } from "@/lib/types/models";
import {
  ArrowLeft,
  Bot,
  ShieldCheck,
  ExternalLink,
  Code,
  FileSearch,
  Scale,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

function IntelligenceDetailContent() {
  const params = useParams();
  const router = useRouter();
  const { askLeon } = useAppShell();
  const intelligenceId = (params?.intelligenceId as string) || "intel_1842";

  const [item, setItem] = useState<IntelligenceItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [showJsonContext, setShowJsonContext] = useState(false);

  useEffect(() => {
    getIntelligenceById(intelligenceId).then((res) => {
      setItem(res || null);
      setLoading(false);
    });
  }, [intelligenceId]);

  if (loading) {
    return (
      <AppShell>
        <div className="p-8 max-w-4xl mx-auto space-y-4">
          <div className="h-6 w-32 bg-muted animate-pulse rounded" />
          <div className="h-64 bg-muted/40 animate-pulse rounded-xl" />
        </div>
      </AppShell>
    );
  }

  if (!item) {
    return (
      <AppShell>
        <div className="p-8 max-w-xl mx-auto text-center space-y-4">
          <h2 className="text-lg font-bold text-foreground">Intelligence Item Not Found</h2>
          <p className="text-xs text-muted-foreground">
            No intelligence record matches identifier &quot;{intelligenceId}&quot;.
          </p>
          <Button variant="outline" size="sm" onClick={() => router.push("/intelligence")}>
            Return to Intelligence Center
          </Button>
        </div>
      </AppShell>
    );
  }

  // Exact Context Object schema formatted for future Leon Gateway
  const leonContextObject = {
    type: "intelligence",
    id: item.id,
    company: item.companyTicker,
    category: item.category,
    impact: item.impact,
    sources_count: item.sources.length,
    related_companies: item.relatedCompanies,
  };

  return (
    <AppShell>
      <div className="p-4 md:p-6 lg:p-8 space-y-8 max-w-5xl mx-auto">
        {/* Back Link & Action Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <button
            onClick={() => router.push("/intelligence")}
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors font-medium"
          >
            <ArrowLeft className="size-3.5" /> Back to Intelligence Feed
          </button>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowJsonContext(!showJsonContext)}
              className="text-xs h-8 gap-1.5 font-mono"
            >
              <Code className="size-3.5" /> {showJsonContext ? "Hide Context" : "Inspect Leon Context"}
            </Button>
            <Button
              variant="default"
              size="sm"
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
              className="text-xs h-8 gap-1.5 font-bold"
            >
              <Bot className="size-3.5" /> Ask Leon About This
            </Button>
          </div>
        </div>

        {/* JSON Context Inspector (Foundation for Future Gateway Integration) */}
        {showJsonContext && (
          <div className="rounded-xl border border-primary/40 bg-slate-950 p-4 text-emerald-400 font-mono text-xs shadow-lg space-y-2 animate-in fade-in">
            <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800 pb-2">
              <span>LEON GATEWAY PROTOCOL: Context Payload Contract</span>
              <span className="text-cyan-400 font-bold">READY FOR SERVER 2</span>
            </div>
            <pre className="overflow-x-auto text-[11px] leading-relaxed">
              {JSON.stringify(leonContextObject, null, 2)}
            </pre>
          </div>
        )}

        {/* Intelligence Header Card */}
        <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-muted text-foreground">
              {item.companyTicker}
            </span>
            <CategoryBadge category={item.category} size="default" />
            <SeverityBadge severity={item.impact} size="default" showIcon />
            <span className="text-xs text-muted-foreground font-mono">
              Recorded {new Date(item.timestamp).toLocaleString()}
            </span>
          </div>

          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground leading-snug">
            {item.title}
          </h1>

          <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
            {item.summary}
          </p>

          <div className="pt-2 flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => alert(`Investigation initiated for ${item.id}`)}
              className="text-xs h-8 gap-1.5"
            >
              <FileSearch className="size-3.5" /> Launch Deep Investigation
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/comparison")}
              className="text-xs h-8 gap-1.5"
            >
              <Scale className="size-3.5" /> Compare Affected Entities
            </Button>
          </div>
        </div>

        {/* 1. LEON STRATEGIC ANALYSIS (CORE VALUE) */}
        <section className="rounded-2xl border border-primary/30 bg-primary/5 p-6 space-y-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-primary/20 pb-3">
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-xs">
                <Bot className="size-4" />
              </div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">
                Autonomous Leon Strategic Analysis
              </h2>
            </div>
            <span className="rounded bg-card px-2 py-0.5 text-[10px] font-mono font-bold text-primary border border-border/80">
              CONFIDENCE: 94%
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="space-y-2">
              <span className="font-mono text-[11px] font-bold uppercase text-primary">
                Competitive Market Implications
              </span>
              <p className="text-foreground leading-relaxed">
                {item.leonAnalysis.competitiveImplications}
              </p>
            </div>

            <div className="space-y-2">
              <span className="font-mono text-[11px] font-bold uppercase text-primary">
                Estimated Economic Impact
              </span>
              <p className="text-foreground leading-relaxed">
                {item.leonAnalysis.marketImpact}
              </p>
            </div>
          </div>

          {/* Threat Assessment Callout */}
          <div className="rounded-xl border border-red-200/80 bg-red-50/50 dark:border-red-900/40 dark:bg-red-950/20 p-4 text-xs space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-red-700 dark:text-red-300">
              <AlertTriangle className="size-4" />
              <span>
                Threat Assessment: Target {item.leonAnalysis.threatAssessment.to} ({item.leonAnalysis.threatAssessment.level} Threat)
              </span>
            </div>
            <p className="text-foreground leading-relaxed">
              {item.leonAnalysis.threatAssessment.reasoning}
            </p>
          </div>

          {/* Recommended Executive Actions */}
          <div className="space-y-2 pt-2 border-t border-primary/20">
            <span className="text-[11px] font-mono uppercase font-bold text-muted-foreground">
              Autonomous Recommended Next Steps
            </span>
            <div className="space-y-1.5">
              {item.leonAnalysis.recommendedActions.map((act, i) => (
                <div key={i} className="flex items-start gap-2 text-xs">
                  <CheckCircle2 className="size-3.5 text-primary shrink-0 mt-0.5" />
                  <span className="text-foreground">{act}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2. FACTUAL EVIDENCE CITATIONS & PRIMARY SOURCES */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-4 text-emerald-600" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              [VERIFIED CITATIONS] Primary Evidence & Source Registry ({item.sources.length})
            </h2>
          </div>

          <div className="space-y-2.5">
            {item.sources.map((src) => (
              <div
                key={src.id}
                className="rounded-xl border border-border/80 bg-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 px-1.5 py-0.5 text-[10px] font-mono font-bold">
                      {src.credibility}
                    </span>
                    <span className="font-bold text-foreground">{src.title}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    Published by {src.publisher} on {new Date(src.publishedAt).toLocaleDateString()}
                  </p>
                </div>

                <a
                  href={src.url}
                  onClick={(e) => {
                    e.preventDefault();
                    alert(`Simulated citation viewer for: ${src.title}`);
                  }}
                  className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline shrink-0"
                >
                  Inspect Source <ExternalLink className="size-3" />
                </a>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}

export default function IntelligenceDetailPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center text-xs text-slate-500">
          Loading intelligence dossier...
        </div>
      }
    >
      <IntelligenceDetailContent />
    </React.Suspense>
  );
}
