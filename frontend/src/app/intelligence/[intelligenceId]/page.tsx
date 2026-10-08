"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { AppShell, useAppShell } from "@/components/layout/AppShell";
import { CompanyLogo } from "@/components/shared/company-logo";
import { SafeImage } from "@/components/shared/safe-image";
import { getIntelligenceById } from "@/lib/mock";
import { IntelligenceItem } from "@/lib/types/models";
import { getIntelligenceMedia } from "@/lib/media/intelligence-images";
import {
  ArrowLeft,
  Bookmark,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";

function IntelligenceDetailContent() {
  const params = useParams();
  const router = useRouter();
  const { askLeon } = useAppShell();
  const intelligenceId = (params?.intelligenceId as string) || "intel_1842";

  const [item, setItem] = useState<IntelligenceItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    getIntelligenceById(intelligenceId).then((res) => {
      setItem(res || null);
      setLoading(false);
    });
  }, [intelligenceId]);

  if (loading) {
    return (
      <AppShell>
        <div className="space-y-4 max-w-5xl mx-auto">
          <div className="h-6 w-36 bg-[#E8E4DB] animate-pulse rounded" />
          <div className="h-64 bg-[#E8E4DB] animate-pulse rounded-xl" />
        </div>
      </AppShell>
    );
  }

  if (!item) {
    return (
      <AppShell>
        <div className="p-8 max-w-xl mx-auto text-center space-y-4">
          <h2 className="text-lg font-bold text-[#11110F]">Intelligence Record Not Found</h2>
          <p className="text-xs text-[#77736B]">
            No intelligence dossier matches identifier &quot;{intelligenceId}&quot;.
          </p>
          <button
            onClick={() => router.push("/intelligence")}
            className="px-4 py-2 rounded-lg bg-[#11110F] text-[#F8F6F0] text-xs font-semibold"
          >
            Back to Intelligence Feed
          </button>
        </div>
      </AppShell>
    );
  }

  const media = getIntelligenceMedia(item.id, item.companyTicker);

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Navigation & Actions */}
        <div className="flex items-center justify-between text-xs text-[#77736B] pb-3 border-b border-[#DDD8CE]">
          <button
            onClick={() => router.push("/intelligence")}
            className="inline-flex items-center gap-1.5 hover:text-[#11110F] transition-colors font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Intelligence Feed</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSaved(!isSaved)}
              className={cn(
                "inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border border-[#DDD8CE] transition-colors",
                isSaved
                  ? "bg-[#11110F] text-[#F8F6F0]"
                  : "bg-[#E8E4DB] text-[#4B4840] hover:bg-[#DDD8CE]"
              )}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>{isSaved ? "Saved" : "Save"}</span>
            </button>

            <button
              onClick={() =>
                askLeon({
                  type: "intelligence",
                  company: item.companyName,
                  title: item.title,
                  summary: item.summary,
                })
              }
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#11110F] text-[#F8F6F0] hover:bg-[#33312B] transition-colors shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F8F6F0]" />
              <span>Ask Leon About This</span>
            </button>
          </div>
        </div>

        {/* Article Header */}
        <div className="space-y-3">
          {/* Metadata Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E8E4DB] text-[#11110F] text-xs font-bold">
              <CompanyLogo ticker={item.companyTicker} size={14} />
              <span>{item.companyName} ({item.companyTicker})</span>
            </div>

            <span
              className={cn(
                "px-2.5 py-0.5 rounded-full text-xs font-mono font-bold",
                item.impact === "Critical"
                  ? "bg-[#F9E7E5] text-[#C62828]"
                  : item.impact === "High"
                  ? "bg-[#E7F3E8] text-[#16803C]"
                  : item.impact === "Medium"
                  ? "bg-[#FFF0D6] text-[#C77700]"
                  : "bg-[#E7F0FC] text-[#1769D1]"
              )}
            >
              [{item.impact} Impact]
            </span>

            <span className="px-2.5 py-0.5 rounded-full bg-[#E8E4DB] text-[#4B4840] text-xs font-medium">
              {item.category}
            </span>

            <span className="text-xs text-[#77736B] font-mono ml-auto">
              Published {new Date(item.timestamp).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#11110F] leading-tight">
            {item.title}
          </h1>

          <p className="text-xs text-[#77736B]">
            Primary Source:{" "}
            <a
              href={item.sources[0]?.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#11110F] underline hover:text-[#4B4840] inline-flex items-center gap-1"
            >
              <span>{item.sources[0]?.publisher || "SEC EDGAR"}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </p>
        </div>

        {/* Hero Image */}
        <div className="w-full h-72 sm:h-96 rounded-xl overflow-hidden bg-[#E8E4DB] border border-[#DDD8CE] relative">
          <SafeImage
            src={media.imageUrl}
            alt={media.altText}
            fallbackTicker={item.companyTicker}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#11110F]/80 to-transparent p-4 text-[#F8F6F0] text-xs">
            <span className="font-semibold">{media.caption}</span>
            <span className="text-[#DDD8CE] block text-[11px] mt-0.5">
              Verified autonomous telemetry capture by Leon Intelligence Engine
            </span>
          </div>
        </div>

        {/* Two-Column Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (65% width): Core Analysis */}
          <div className="lg:col-span-8 space-y-6">
            {/* Executive Summary */}
            <div className="bg-[#F8F6F0] rounded-xl border border-[#DDD8CE] p-5 shadow-sm space-y-3">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#77736B] font-mono">
                Executive Summary
              </h2>
              <p className="text-sm text-[#11110F] leading-relaxed font-sans">
                {item.summary}
              </p>
            </div>

            {/* Why It Matters */}
            <div className="bg-[#F8F6F0] rounded-xl border border-[#DDD8CE] p-5 shadow-sm space-y-3">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#77736B] font-mono">
                Why It Matters
              </h2>
              <div className="p-3.5 rounded-lg bg-[#FBFAF6] border border-[#DDD8CE] text-xs text-[#11110F] leading-relaxed">
                {item.leonAnalysis.marketImpact}
              </div>
            </div>

            {/* Empirical Evidence & Corroboration */}
            <div className="bg-[#F8F6F0] rounded-xl border border-[#DDD8CE] p-5 shadow-sm space-y-3">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#77736B] font-mono">
                Empirical Evidence & Corroboration
              </h2>
              <ul className="space-y-2">
                {item.evidence.map((ev, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs text-[#4B4840] leading-relaxed"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#16803C] shrink-0 mt-0.5" />
                    <span>{ev}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column (35% width): Quick Facts & Leon Assessment */}
          <div className="lg:col-span-4 space-y-5">
            {/* Quick Facts Card */}
            <div className="bg-[#F8F6F0] rounded-xl border border-[#DDD8CE] p-5 shadow-sm space-y-3 text-xs">
              <h3 className="text-sm font-bold text-[#11110F] pb-2 border-b border-[#DDD8CE]">
                Quick Facts
              </h3>

              <div className="space-y-2.5">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#77736B]">Primary Entity</span>
                  <div className="font-bold text-[#11110F] mt-0.5">{item.companyName} ({item.companyTicker})</div>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase text-[#77736B]">Category</span>
                  <div className="font-semibold text-[#11110F] mt-0.5">{item.category}</div>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase text-[#77736B]">Impact Classification</span>
                  <div className="font-bold text-[#16803C] mt-0.5">[{item.impact}]</div>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase text-[#77736B]">Related Entities</span>
                  <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                    {item.relatedCompanies.map((ticker) => (
                      <span
                        key={ticker}
                        className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-[#E8E4DB] text-[#11110F]"
                      >
                        {ticker}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Leon Assessment Card */}
            <div className="bg-[#EEE8FF] rounded-xl border border-[#DDD8CE] p-5 shadow-sm space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#DDD8CE]/60">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#6C4CE8]" />
                  <span className="font-bold text-[#6C4CE8] text-xs">Leon&apos;s Assessment</span>
                </div>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#6C4CE8] text-[#F8F6F0]">
                  AI ENGINE
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase text-[#6C4CE8] font-bold block">
                  Competitive Implications
                </span>
                <p className="text-xs text-[#11110F] leading-relaxed mt-1">
                  {item.leonAnalysis.competitiveImplications}
                </p>
              </div>

              {item.leonAnalysis.threatAssessment && (
                <div className="p-3 rounded-lg bg-[#FBFAF6] border border-[#DDD8CE] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#C62828] flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-[#C62828]" />
                      Threat to {item.leonAnalysis.threatAssessment.to}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-[#C62828]">
                      [{item.leonAnalysis.threatAssessment.level}]
                    </span>
                  </div>
                  <p className="text-[11px] text-[#4B4840] leading-relaxed">
                    {item.leonAnalysis.threatAssessment.reasoning}
                  </p>
                </div>
              )}

              <button
                onClick={() =>
                  askLeon({
                    type: "intelligence",
                    company: item.companyName,
                    title: item.title,
                    summary: item.summary,
                  })
                }
                className="w-full py-2 rounded-lg bg-[#6C4CE8] text-[#F8F6F0] font-semibold text-xs hover:bg-[#5839C9] transition-colors text-center shadow-xs"
              >
                Ask Leon for scenario modeling →
              </button>
            </div>
          </div>
        </div>

        {/* Source References Table */}
        <div className="bg-[#F8F6F0] rounded-xl border border-[#DDD8CE] p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-[#DDD8CE] pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#16803C]" />
              <h3 className="text-sm font-bold text-[#11110F]">
                Verified Source Citations
              </h3>
            </div>
            <span className="text-[11px] font-mono text-[#77736B]">
              {item.sources.length} Primary Documents Corroborated
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#DDD8CE] text-[#77736B] font-mono text-[10px] uppercase">
                  <th className="py-2 px-3 w-8">#</th>
                  <th className="py-2 px-3">Document Title</th>
                  <th className="py-2 px-3">Publisher</th>
                  <th className="py-2 px-3">Credibility</th>
                  <th className="py-2 px-3 text-right">Link</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DDD8CE]">
                {item.sources.map((src, idx) => (
                  <tr key={src.id} className="hover:bg-[#FBFAF6] transition-colors">
                    <td className="py-2.5 px-3 font-mono text-[#77736B]">{idx + 1}</td>
                    <td className="py-2.5 px-3 font-bold text-[#11110F]">{src.title}</td>
                    <td className="py-2.5 px-3 text-[#4B4840]">{src.publisher}</td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#E7F3E8] text-[#16803C]">
                        {src.credibility}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[#11110F] hover:text-[#4B4840] font-semibold"
                      >
                        <span>Open</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

export default function IntelligenceDetailPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-[#F2EFE7] flex items-center justify-center text-xs text-[#77736B]">
          Loading intelligence dossier...
        </div>
      }
    >
      <IntelligenceDetailContent />
    </React.Suspense>
  );
}
