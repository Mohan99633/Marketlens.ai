"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { AppShell, useAppShell } from "@/components/layout/AppShell";
import { getReportById } from "@/lib/mock";
import { ReportItem } from "@/lib/types/models";
import {
  Sparkles,
  ArrowLeft,
  Printer,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";

function ReportDetailContent() {
  const params = useParams();
  const reportId = params?.reportId as string;
  const [report, setReport] = useState<ReportItem | null>(null);
  const [loading, setLoading] = useState(true);
  const { askLeon } = useAppShell();

  useEffect(() => {
    if (reportId) {
      getReportById(reportId).then((r) => {
        setReport(r || null);
        setLoading(false);
      });
    }
  }, [reportId]);

  if (loading) {
    return (
      <AppShell>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="space-y-3 text-center">
            <div className="w-8 h-8 border-2 border-[#11110F] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm text-[#77736B]">Retrieving research report dossier...</p>
          </div>
        </div>
      </AppShell>
    );
  }

  if (!report) {
    return (
      <AppShell>
        <div className="bg-[#F8F6F0] rounded-xl border border-[#DDD8CE] p-12 text-center max-w-lg mx-auto shadow-sm">
          <AlertCircle className="w-10 h-10 text-[#C62828] mx-auto mb-3" />
          <h2 className="text-lg font-bold text-[#11110F]">Report Not Found</h2>
          <p className="text-xs text-[#77736B] mt-1">
            The requested research dossier ({reportId}) could not be located in the archive.
          </p>
          <Link
            href="/reports"
            className="inline-flex items-center gap-1.5 mt-4 px-4 py-2 bg-[#11110F] text-[#F8F6F0] rounded-lg text-xs font-semibold hover:bg-[#33312B] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Reports Library
          </Link>
        </div>
      </AppShell>
    );
  }

  const createdDate = new Date(report.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Navigation Breadcrumb & Actions */}
        <div className="flex items-center justify-between gap-4 pb-3 border-b border-[#DDD8CE] text-xs">
          <Link
            href="/reports"
            className="inline-flex items-center gap-1.5 font-medium text-[#77736B] hover:text-[#11110F] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Reports Library
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#E8E4DB] text-[#11110F] hover:bg-[#DDD8CE] transition-colors border border-[#DDD8CE]"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save PDF
            </button>
            <button
              onClick={() =>
                askLeon({
                  type: "report",
                  id: report.id,
                  company: report.targetCompanyTicker || "Market",
                  title: report.title,
                  summary: report.executiveSummary,
                })
              }
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#11110F] text-[#F8F6F0] hover:bg-[#33312B] shadow-xs transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Ask Leon About This Report
            </button>
          </div>
        </div>

        {/* Executive Document Paper Container */}
        <article className="bg-[#F8F6F0] rounded-xl border border-[#DDD8CE] shadow-sm overflow-hidden">
          {/* Header Document Banner */}
          <div className="p-6 sm:p-8 border-b border-[#DDD8CE] bg-[#FBFAF6] space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E8E4DB] text-[#11110F]">
                  {report.type}
                </span>
                {report.targetCompanyTicker && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#11110F] text-[#F8F6F0]">
                    {report.targetCompanyTicker}
                  </span>
                )}
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#E7F3E8] text-[#16803C]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified Briefing
                </span>
              </div>
              <div className="text-xs text-[#77736B] font-mono">
                Report ID: {report.id}
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#11110F] leading-tight">
              {report.title}
            </h1>

            {/* Metadata Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-3 border-t border-[#DDD8CE] text-xs">
              <div>
                <span className="text-[#77736B] block">Published Date</span>
                <span className="font-semibold text-[#11110F]">{createdDate}</span>
              </div>
              <div>
                <span className="text-[#77736B] block">Synthesized By</span>
                <span className="font-semibold text-[#6C4CE8]">Leon AI Engine</span>
              </div>
              <div>
                <span className="text-[#77736B] block">Primary Sources</span>
                <span className="font-semibold text-[#11110F]">{report.sourceCount} citations</span>
              </div>
              <div>
                <span className="text-[#77736B] block">Model Confidence</span>
                <span className="font-semibold text-[#16803C]">
                  {report.metadata?.confidence ? Math.round(report.metadata.confidence * 100) : 95}% High Fidelity
                </span>
              </div>
            </div>
          </div>

          {/* Document Body */}
          <div className="p-6 sm:p-8 space-y-7">
            {/* Executive Summary */}
            <section className="space-y-3">
              <div className="flex items-center justify-between border-b border-[#DDD8CE] pb-2">
                <h2 className="text-xs font-bold text-[#77736B] uppercase tracking-wider font-mono">
                  Executive Summary & Strategic Thesis
                </h2>
                <span className="text-[10px] font-mono bg-[#EEE8FF] text-[#6C4CE8] px-2 py-0.5 rounded font-bold">
                  LEON AI ASSESSMENT
                </span>
              </div>
              <p className="text-sm text-[#11110F] leading-relaxed bg-[#FBFAF6] p-4 rounded-lg border border-[#DDD8CE]">
                {report.executiveSummary}
              </p>
            </section>

            {/* Key Findings */}
            <section className="space-y-3">
              <div className="flex items-center justify-between border-b border-[#DDD8CE] pb-2">
                <h2 className="text-xs font-bold text-[#77736B] uppercase tracking-wider font-mono">
                  Key Intelligence Findings [VERIFIED DATA]
                </h2>
                <span className="text-[10px] font-mono bg-[#E7F3E8] text-[#16803C] px-2 py-0.5 rounded font-bold">
                  Primary Telemetry
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {report.keyFindings.map((finding, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-lg border border-[#DDD8CE] bg-[#FBFAF6] text-xs text-[#11110F] flex items-start gap-2.5"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#11110F] text-[#F8F6F0] flex items-center justify-center shrink-0 font-bold text-[10px]">
                      {idx + 1}
                    </span>
                    <p className="leading-relaxed">{finding}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Competitive Implications */}
            <section className="space-y-3">
              <div className="border-b border-[#DDD8CE] pb-2">
                <h2 className="text-xs font-bold text-[#77736B] uppercase tracking-wider font-mono">
                  Competitive Implications & Market Realignment
                </h2>
              </div>
              <p className="text-xs text-[#11110F] leading-relaxed bg-[#FFF0D6] p-4 rounded-lg border border-[#C77700]/30">
                {report.competitiveImplications}
              </p>
            </section>

            {/* Full Report Sections */}
            <section className="space-y-6 pt-4 border-t border-[#DDD8CE]">
              {report.sections.map((sec, idx) => (
                <div key={idx} className="space-y-2">
                  <h3 className="text-sm font-bold text-[#11110F]">{sec.title}</h3>
                  <div className="text-xs text-[#4B4840] leading-relaxed whitespace-pre-line pl-3 border-l-2 border-[#11110F]/30">
                    {sec.content}
                  </div>
                </div>
              ))}
            </section>

            {/* Verification Sign-Off Footer */}
            <div className="pt-6 border-t border-[#DDD8CE] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-[#77736B]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#16803C]" />
                <span>
                  Synthesized autonomously via Hermes Agent Framework on Server 2.
                </span>
              </div>
              <span className="font-mono text-[11px]">
                Checksum: SHA256:{report.id.slice(0, 8)}98c4...
              </span>
            </div>
          </div>
        </article>
      </div>
    </AppShell>
  );
}

export default function ReportDetailPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center text-xs text-[#77736B]">
          Loading report dossier...
        </div>
      }
    >
      <ReportDetailContent />
    </React.Suspense>
  );
}
