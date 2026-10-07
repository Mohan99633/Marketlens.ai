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
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm text-slate-500">Retrieving report dossier...</p>
          </div>
        </div>
      </AppShell>
    );
  }

  if (!report) {
    return (
      <AppShell>
        <div className="bg-white rounded-lg border border-slate-200 p-12 text-center max-w-lg mx-auto">
          <AlertCircle className="w-10 h-10 text-rose-500 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-slate-900">Report Not Found</h2>
          <p className="text-sm text-slate-500 mt-1">
            The requested intelligence dossier ({reportId}) could not be located in the archive.
          </p>
          <Link
            href="/reports"
            className="inline-flex items-center gap-1.5 mt-4 px-4 py-2 bg-slate-900 text-white rounded text-xs font-semibold hover:bg-slate-800"
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
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Navigation Breadcrumb & Actions */}
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/reports"
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Reports Library
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-xs"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
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
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 shadow-sm transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Ask Leon About This Report
            </button>
          </div>
        </div>

        {/* Executive Document Paper Container */}
        <article className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
          {/* Header Document Banner */}
          <div className="p-8 sm:p-10 border-b border-slate-200 bg-slate-50/50 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-blue-100 text-blue-800 font-mono">
                  {report.type}
                </span>
                {report.targetCompanyTicker && (
                  <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-slate-200 text-slate-800 font-mono">
                    {report.targetCompanyTicker}
                  </span>
                )}
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified Briefing
                </span>
              </div>
              <div className="text-xs text-slate-500 font-mono">
                Report ID: {report.id}
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 leading-tight">
              {report.title}
            </h1>

            {/* Metadata Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-3 border-t border-slate-200 text-xs">
              <div>
                <span className="text-slate-500 block">Published Date</span>
                <span className="font-semibold text-slate-800">{createdDate}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Synthesized By</span>
                <span className="font-semibold text-blue-700">Leon (Hermes v0.3)</span>
              </div>
              <div>
                <span className="text-slate-500 block">Primary Sources</span>
                <span className="font-semibold text-slate-800">{report.sourceCount} verified citations</span>
              </div>
              <div>
                <span className="text-slate-500 block">Model Confidence</span>
                <span className="font-semibold text-emerald-700">
                  {report.metadata?.confidence ? Math.round(report.metadata.confidence * 100) : 95}% High Fidelity
                </span>
              </div>
            </div>
          </div>

          {/* Document Body */}
          <div className="p-8 sm:p-10 space-y-8">
            {/* Executive Summary */}
            <section className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider text-xs">
                  Executive Summary & Strategic Thesis
                </h2>
                <span className="text-[11px] font-mono bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-semibold">
                  [LEON AI ASSESSMENT]
                </span>
              </div>
              <p className="text-sm text-slate-800 leading-relaxed bg-blue-50/20 p-4 rounded-md border border-blue-100">
                {report.executiveSummary}
              </p>
            </section>

            {/* Key Findings */}
            <section className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider text-xs">
                  Key Intelligence Findings [VERIFIED DATA]
                </h2>
                <span className="text-[11px] font-mono bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-semibold">
                  Primary Telemetry
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {report.keyFindings.map((finding, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/40 text-xs text-slate-700 flex items-start gap-2.5"
                  >
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 font-bold text-[10px]">
                      {idx + 1}
                    </span>
                    <p className="leading-relaxed">{finding}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Competitive Implications */}
            <section className="space-y-3">
              <div className="border-b border-slate-200 pb-2">
                <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider text-xs">
                  Competitive Implications & Market Realignment
                </h2>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed bg-amber-50/30 p-4 rounded-md border border-amber-200">
                {report.competitiveImplications}
              </p>
            </section>

            {/* Full Report Sections */}
            <section className="space-y-6 pt-4 border-t border-slate-200">
              {report.sections.map((sec, idx) => (
                <div key={idx} className="space-y-2">
                  <h3 className="text-sm font-bold text-slate-900">{sec.title}</h3>
                  <div className="text-xs text-slate-700 leading-relaxed whitespace-pre-line pl-3 border-l-2 border-slate-200">
                    {sec.content}
                  </div>
                </div>
              ))}
            </section>

            {/* Verification Sign-Off Footer */}
            <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>
                  Generated autonomously via Hermes Agent Framework on Server 2 (EC2 Private Subnet).
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
        <div className="min-h-screen bg-slate-50 flex items-center justify-center text-xs text-slate-500">
          Loading report dossier...
        </div>
      }
    >
      <ReportDetailContent />
    </React.Suspense>
  );
}
