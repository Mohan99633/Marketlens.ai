"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { getReports, getCompanies } from "@/lib/mock";
import { ReportItem, Company } from "@/lib/types/models";
import {
  Sparkles,
  Plus,
  Clock,
  ArrowRight,
  CheckCircle2,
  Search,
  BookOpen,
  Loader2,
} from "lucide-react";

export default function ReportsPage() {
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [typeFilter, setTypeFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState("");
  const [generationProgress, setGenerationProgress] = useState(0);

  // Modal form state
  const [newReportType, setNewReportType] = useState<string>("Competitor Report");
  const [newTargetCompany, setNewTargetCompany] = useState<string>("AMD");
  const [newCustomTitle, setNewCustomTitle] = useState("");

  useEffect(() => {
    getReports().then((data) => setReports(data));
    getCompanies().then((data) => setCompanies(data));
  }, []);

  const handleStartGeneration = () => {
    setIsGenerating(true);
    setGenerationProgress(10);
    setGenerationStep("Leon initializing research task via Hermes Agent...");

    setTimeout(() => {
      setGenerationProgress(35);
      setGenerationStep("Querying SEC 10-Q filings, cloud benchmarks & news telemetry...");
    }, 1200);

    setTimeout(() => {
      setGenerationProgress(65);
      setGenerationStep("Synthesizing multi-variable competitive moats & margin models...");
    }, 2500);

    setTimeout(() => {
      setGenerationProgress(90);
      setGenerationStep("Validating citation sources & cross-referencing confidence score...");
    }, 3800);

    setTimeout(() => {
      setGenerationProgress(100);
      setGenerationStep("Report generated successfully!");

      const generatedId = `rpt_${Date.now()}`;
      const newReport: ReportItem = {
        id: generatedId,
        title:
          newCustomTitle ||
          `${newTargetCompany}: Autonomous Strategic Competitive Assessment (2026-2027)`,
        type: newReportType as ReportItem["type"],
        targetCompanyTicker: newTargetCompany,
        status: "Completed",
        createdAt: new Date().toISOString(),
        completedAt: new Date().toISOString(),
        progressPercent: 100,
        currentPhase: "Report Published",
        executiveSummary: `Autonomous synthesis executed by Leon for ${newTargetCompany}. Cross-referenced 32 primary sources covering product release cadences, revenue trajectory, and architecture differentiation.`,
        keyFindings: [
          `${newTargetCompany} expanded enterprise datacenter footprint by 24% year-over-year.`,
          "Gross margins exhibit strong resilience against merchant accelerator price cuts.",
          "Software ecosystem parity accelerating with multi-framework compiler integrations.",
        ],
        competitiveImplications:
          "Enterprise decision makers should prioritize dual-sourcing options to prevent vendor lock-in.",
        sourceCount: 32,
        intelligenceCount: 9,
        sections: [
          {
            title: "1. Executive Strategic Briefing",
            content: `A comprehensive evaluation of ${newTargetCompany}'s competitive positioning and strategic opportunities across cloud, enterprise, and edge compute.`,
          },
          {
            title: "2. Moat & Technology Analysis",
            content: "Evaluation of hardware architectures, proprietary interconnects, and developer adoption curves.",
          },
        ],
        metadata: {
          confidence: 0.94,
          durationSeconds: 4.8,
        },
      };

      setReports((prev) => [newReport, ...prev]);
      setIsGenerating(false);
      setIsModalOpen(false);
      setNewCustomTitle("");
    }, 4800);
  };

  const filteredReports = reports.filter((r) => {
    const matchesType = typeFilter === "ALL" || r.type === typeFilter;
    const matchesSearch =
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.executiveSummary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.targetCompanyTicker &&
        r.targetCompanyTicker.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesSearch;
  });

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                <BookOpen className="w-3.5 h-3.5" />
                Intelligence Library
              </span>
              <span className="text-xs text-slate-500 font-mono">
                {reports.length} generated strategic briefings
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">
              Autonomous Intelligence Reports
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Deep-dive competitive dossiers, weekly synthesis briefings, and custom multi-entity investigations generated by Leon.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 shadow-sm transition-colors"
            >
              <Plus className="w-4 h-4" />
              Generate Autonomous Report
            </button>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mr-1">
              Report Type:
            </span>
            {[
              "ALL",
              "Competitor Report",
              "Company Report",
              "Industry Report",
              "Weekly Intelligence",
              "Custom Investigation",
            ].map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-2.5 py-1 rounded text-xs font-medium whitespace-nowrap transition-colors ${
                  typeFilter === t
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {t === "ALL" ? "All Briefings" : t}
              </button>
            ))}
          </div>

          <div className="relative min-w-[220px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search reports by title or ticker..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-blue-500 text-slate-900"
            />
          </div>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredReports.map((report) => {
            const isCompleted = report.status === "Completed";
            const createdDate = new Date(report.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            });

            return (
              <div
                key={report.id}
                className="bg-white rounded-lg border border-slate-200 p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700 font-mono">
                        {report.type}
                      </span>
                      {report.targetCompanyTicker && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 font-mono">
                          {report.targetCompanyTicker}
                        </span>
                      )}
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        isCompleted
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-blue-50 text-blue-700 border border-blue-200 animate-pulse"
                      }`}
                    >
                      {isCompleted ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Ready
                        </>
                      ) : (
                        <>
                          <Loader2 className="w-3 h-3 animate-spin text-blue-600" />
                          {report.status} ({report.progressPercent}%)
                        </>
                      )}
                    </span>
                  </div>

                  <h2 className="text-sm font-bold text-slate-900 leading-snug hover:text-blue-600 transition-colors">
                    <Link href={`/reports/${report.id}`}>{report.title}</Link>
                  </h2>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {report.executiveSummary}
                  </p>

                  {!isCompleted && (
                    <div className="space-y-1 pt-1">
                      <div className="flex justify-between text-[11px] text-slate-500">
                        <span>{report.currentPhase}</span>
                        <span className="font-mono">{report.progressPercent}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-blue-600 h-1.5 rounded-full transition-all duration-500"
                          style={{ width: `${report.progressPercent}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {createdDate}
                    </span>
                    <span>•</span>
                    <span>{report.sourceCount} Sources</span>
                    {report.metadata?.confidence && (
                      <>
                        <span>•</span>
                        <span className="font-mono font-semibold text-slate-700">
                          {Math.round(report.metadata.confidence * 100)}% Conf.
                        </span>
                      </>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/reports/${report.id}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800"
                    >
                      <span>Read Dossier</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Generate Report Modal / Dialog */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-lg w-full p-6 space-y-5 animate-in fade-in-50 zoom-in-95">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-md bg-blue-600 text-white flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Generate Autonomous Intelligence Report
                    </h3>
                    <p className="text-xs text-slate-500">
                      Dispatches Leon research agent to query filings, benchmarks & news telemetry
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => !isGenerating && setIsModalOpen(false)}
                  disabled={isGenerating}
                  className="text-slate-400 hover:text-slate-600 text-sm p-1"
                >
                  ✕
                </button>
              </div>

              {isGenerating ? (
                <div className="py-6 space-y-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center mx-auto text-blue-600 animate-spin">
                    <Loader2 className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-900">
                      Leon Autonomous Research Active
                    </h4>
                    <p className="text-xs text-blue-700 font-medium">
                      {generationStep}
                    </p>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden max-w-xs mx-auto">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${generationProgress}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 font-mono">
                    Simulating live execution on Hermes Agent runtime (Server 2)
                  </p>
                </div>
              ) : (
                <div className="space-y-4 text-xs">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      Report Category
                    </label>
                    <select
                      value={newReportType}
                      onChange={(e) => setNewReportType(e.target.value)}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-md text-slate-900 focus:bg-white"
                    >
                      <option value="Competitor Report">Competitor Deep-Dive</option>
                      <option value="Company Report">Single Company Dossier</option>
                      <option value="Industry Report">Sector-Wide Market Briefing</option>
                      <option value="Custom Investigation">Custom Strategic Investigation</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      Primary Target Entity
                    </label>
                    <select
                      value={newTargetCompany}
                      onChange={(e) => setNewTargetCompany(e.target.value)}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-md text-slate-900 focus:bg-white"
                    >
                      {companies.map((c) => (
                        <option key={c.id} value={c.ticker}>
                          {c.ticker} — {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      Custom Investigation Thesis / Focus Area (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Dual-sourcing impact on cloud margin compression..."
                      value={newCustomTitle}
                      onChange={(e) => setNewCustomTitle(e.target.value)}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-md text-slate-900 focus:bg-white"
                    />
                  </div>

                  <div className="p-3 rounded bg-blue-50/50 border border-blue-100 text-slate-600 text-[11px] space-y-1">
                    <span className="font-semibold text-blue-900 block">Leon Generation Pipeline:</span>
                    <p>
                      Includes automated web harvesting, SEC 10-Q/10-K parsing, vector similarity recall, cross-citation validation, and executive synthesis formatting.
                    </p>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="px-3 py-1.5 rounded text-slate-600 hover:bg-slate-100"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleStartGeneration}
                      className="px-4 py-1.5 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-sm"
                    >
                      Start Autonomous Generation
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
