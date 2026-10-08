"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

import { StatusBadge } from "@/components/shared/status-badge";
import { SeverityBadge } from "@/components/shared/severity-badge";
import { CategoryBadge } from "@/components/shared/category-badge";
import { ConnectionStatus } from "@/components/shared/connection-status";
import { LeonStatus } from "@/components/shared/leon-status";
import { MetricCard } from "@/components/shared/metric-card";
import { DataTable, ColumnDef } from "@/components/shared/data-table";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorState } from "@/components/shared/error-state";

import {
  LeonAgentState,
  AlertSeverity,
  IntelligenceCategory,
  ConnectionState,
} from "@/lib/types/design-system";
import {
  CATEGORY_TOKENS,
  LEON_STATE_TOKENS,
  SEVERITY_TOKENS,
} from "@/lib/constants/design-tokens";

import {
  Search,
  Layers,
  Sparkles,
  Shield,
  Activity,
  Terminal,
  Cpu,
  TrendingUp,
  Eye,
  RefreshCw,
} from "lucide-react";

interface SampleCompany {
  ticker: string;
  name: string;
  marketCap: string;
  category: IntelligenceCategory;
  threatLevel: AlertSeverity;
  score: number;
  momentum: string;
  status: "Monitored" | "Analyzing" | "Idle";
}

const SAMPLE_COMPANIES: SampleCompany[] = [
  {
    ticker: "NVDA",
    name: "NVIDIA Corporation",
    marketCap: "$3.12T",
    category: "Technology",
    threatLevel: "High",
    score: 94,
    momentum: "+12.4%",
    status: "Monitored",
  },
  {
    ticker: "AMD",
    name: "Advanced Micro Devices",
    marketCap: "$248.5B",
    category: "Partnership",
    threatLevel: "Critical",
    score: 82,
    momentum: "+18.2%",
    status: "Analyzing",
  },
  {
    ticker: "INTC",
    name: "Intel Corporation",
    marketCap: "$98.4B",
    category: "Strategy",
    threatLevel: "Medium",
    score: 68,
    momentum: "-4.5%",
    status: "Monitored",
  },
  {
    ticker: "MSFT",
    name: "Microsoft Corporation",
    marketCap: "$3.05T",
    category: "Product",
    threatLevel: "High",
    score: 91,
    momentum: "+6.8%",
    status: "Monitored",
  },
  {
    ticker: "GOOGL",
    name: "Alphabet Inc.",
    marketCap: "$2.15T",
    category: "Acquisition",
    threatLevel: "Medium",
    score: 88,
    momentum: "+9.1%",
    status: "Idle",
  },
];

export default function DesignSystemPage() {
  const [leonState, setLeonState] = useState<LeonAgentState>("Analyzing");
  const [connectionState, setConnectionState] = useState<ConnectionState>("Connected");
  const [tableLoading, setTableLoading] = useState<boolean>(false);
  const [sampleData, setSampleData] = useState<SampleCompany[]>(SAMPLE_COMPANIES);

  const columns: ColumnDef<SampleCompany>[] = [
    {
      key: "company",
      header: "Entity / Ticker",
      accessor: (c) => (
        <div className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-md border border-border/80 bg-muted/30 font-mono text-xs font-bold text-foreground">
            {c.ticker}
          </div>
          <div>
            <div className="font-semibold text-foreground">{c.name}</div>
            <div className="text-[11px] text-muted-foreground">{c.marketCap}</div>
          </div>
        </div>
      ),
    },
    {
      key: "category",
      header: "Active Domain",
      accessor: (c) => <CategoryBadge category={c.category} size="sm" />,
    },
    {
      key: "threat",
      header: "Threat Level",
      align: "center",
      accessor: (c) => <SeverityBadge severity={c.threatLevel} size="sm" showIcon />,
    },
    {
      key: "score",
      header: "AI Score",
      align: "right",
      isMono: true,
      sortable: true,
      accessor: (c) => (
        <div className="font-mono font-bold text-sm text-foreground">
          {c.score} <span className="text-[10px] text-muted-foreground">/100</span>
        </div>
      ),
    },
    {
      key: "momentum",
      header: "1M Momentum",
      align: "right",
      isMono: true,
      accessor: (c) => (
        <span
          className={
            c.momentum.startsWith("+")
              ? "text-emerald-600 dark:text-emerald-400 font-bold"
              : "text-rose-600 dark:text-rose-400 font-bold"
          }
        >
          {c.momentum}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Action",
      align: "right",
      accessor: () => (
        <div className="flex items-center justify-end gap-1.5">
          <Button variant="ghost" size="xs" className="h-7 px-2">
            <Eye className="size-3.5 mr-1" /> Inspect
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Top Bar with System State */}
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur-md px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-black text-sm tracking-wider shadow-xs">
            ML
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold tracking-tight text-foreground">
                MARKETLENS.AI
              </h1>
              <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-mono font-bold text-primary">
                PHASE 3: DESIGN SYSTEM
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Autonomous Competitive Intelligence Platform — Visual Language & Primitive Kit
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ConnectionStatus state={connectionState} />
          <Select
            value={connectionState}
            onValueChange={(v) => setConnectionState(v as ConnectionState)}
          >
            <SelectTrigger className="h-8 text-xs w-[130px]">
              <SelectValue placeholder="Gateway State" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Connected">Connected</SelectItem>
              <SelectItem value="Connecting">Connecting</SelectItem>
              <SelectItem value="Reconnecting">Reconnecting</SelectItem>
              <SelectItem value="Disconnected">Disconnected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 pt-8 space-y-10">
        {/* Architecture & Reliability Banner */}
        <div className="rounded-xl border border-border/80 bg-card p-5 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Shield className="size-4 text-primary" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">
                  Enterprise Reliability & Visual Standards
                </h2>
              </div>
              <p className="text-xs text-muted-foreground max-w-3xl leading-relaxed">
                High-performance vector architecture with responsive data tables, charts, and institutional warm ivory tokens.
                Zero unhandled exceptions, fast rendering, and respect for{" "}
                <code className="text-primary font-mono text-[11px] bg-primary/5 px-1 py-0.5 rounded">
                  prefers-reduced-motion
                </code>.
              </p>
            </div>
          </div>
        </div>

        {/* Section 1: Leon Cognitive Runtime & Agent State */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold tracking-tight text-foreground flex items-center gap-2">
                <Sparkles className="size-4 text-primary" />
                1. Leon Cognitive Runtime & Agent State
              </h3>
              <p className="text-xs text-muted-foreground">
                State-driven dynamic core visualizing Leon&apos;s cognitive tasks and execution telemetry.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Visual Core Display */}
            <div className="lg:col-span-5 rounded-xl border border-border/80 bg-card p-6 flex flex-col items-center justify-center relative overflow-hidden shadow-xs">
              <div className="absolute top-3 left-3 text-[11px] font-mono text-muted-foreground">
                STATUS: RUNTIME ACTIVE
              </div>
              <div className="absolute top-3 right-3">
                <StatusBadge state={leonState} size="sm" />
              </div>

              <div className="my-3 flex items-center justify-center">
                <div className="w-[210px] h-[210px] rounded-full bg-blue-50/50 flex items-center justify-center border-4 border-blue-100 shadow-inner">
                  <Cpu className="w-16 h-16 text-blue-500" />
                </div>
              </div>

              <div className="text-center mt-2">
                <div className="font-mono text-xs font-bold text-foreground uppercase tracking-widest">
                  LEON COGNITIVE RUNTIME
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {LEON_STATE_TOKENS[leonState].description}
                </div>
              </div>
            </div>

            {/* State Controls & Telemetry Card */}
            <div className="lg:col-span-7 space-y-4">
              <LeonStatus
                state={leonState}
                currentTask="Synthesizing AMD & Microsoft Azure strategic AI infrastructure agreements"
                activeTasksCount={3}
              />

              <div className="rounded-xl border border-border/80 bg-card p-4 shadow-xs">
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                  Simulate Leon Cognitive Transitions
                </div>
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(LEON_STATE_TOKENS) as LeonAgentState[]).map((st) => (
                    <Button
                      key={st}
                      variant={leonState === st ? "default" : "outline"}
                      size="sm"
                      onClick={() => setLeonState(st)}
                      className="text-xs font-medium"
                    >
                      {st}
                    </Button>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Section 2: Competitive Landscape & Intelligence Flow */}
        <section className="space-y-4">
          <div>
            <h3 className="text-base font-bold tracking-tight text-foreground flex items-center gap-2">
              <Layers className="size-4 text-primary" />
              2. Domain Relationships: Competitive Landscape & Pipeline
            </h3>
            <p className="text-xs text-muted-foreground">
              Nodal threat clusters and telemetry flow from raw source ingest to real-time action.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-xl border border-border/80 bg-card p-4 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Competitive Nodal Radar
                </span>
                <span className="text-[11px] font-mono text-primary font-semibold">
                  TOP 5 TARGETS
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-border/80 bg-card p-4 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Intelligence Pipeline Ingestion
                  </span>
                  <span className="text-[11px] font-mono text-muted-foreground">
                    EVIDENCE TRACEABLE
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-muted-foreground mt-4 leading-relaxed">
                Every intelligence item produced by Leon must map to factual citations and verifiable primary sources
                before triggering an alert or updating the competitive threat vector.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Metric Stat Cards */}
        <section className="space-y-4">
          <div>
            <h3 className="text-base font-bold tracking-tight text-foreground flex items-center gap-2">
              <Activity className="size-4 text-primary" />
              3. Metric & Stat Primitives
            </h3>
            <p className="text-xs text-muted-foreground">
              Enterprise metric cards with delta percentage direction, status indicator, and tabular numbers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              label="AI Competitive Score"
              value="87.4"
              delta={{ value: "+4.2%", trend: "up", label: "vs last cycle" }}
              description="NVIDIA enterprise market dominance"
              icon={<TrendingUp className="size-3.5" />}
            />
            <MetricCard
              label="Active Monitored Targets"
              value="42"
              delta={{ value: "+3", trend: "up", label: "new targets" }}
              description="Automated continuous monitoring"
              icon={<Cpu className="size-3.5" />}
            />
            <MetricCard
              label="Threat Signals (24H)"
              value="18"
              delta={{ value: "-2.1%", trend: "down", label: "threat rate" }}
              description="4 Critical / 8 High / 6 Med"
              icon={<Shield className="size-3.5" />}
            />
            <MetricCard
              label="Synthesized Intelligence"
              value="1,248"
              delta={{ value: "+124", trend: "up", label: "this week" }}
              description="99.4% factual source corroboration"
              icon={<Sparkles className="size-3.5" />}
            />
          </div>
        </section>

        {/* Section 4: Enterprise Data Table */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold tracking-tight text-foreground flex items-center gap-2">
                <Terminal className="size-4 text-primary" />
                4. Data-Dense Enterprise Table
              </h3>
              <p className="text-xs text-muted-foreground">
                High-contrast tabular layout with sortable headers, status badges, and action triggers.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setTableLoading(!tableLoading)}
                className="text-xs"
              >
                <RefreshCw className="size-3.5 mr-1" />
                Toggle Skeleton
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSampleData(sampleData.length > 0 ? [] : SAMPLE_COMPANIES)}
                className="text-xs"
              >
                Toggle Empty State
              </Button>
            </div>
          </div>

          <DataTable
            data={sampleData}
            columns={columns}
            keyExtractor={(item) => item.ticker}
            isLoading={tableLoading}
            emptyTitle="No Market Entities Monitored"
            emptyDescription="You have not added any competitor entities to your active surveillance portfolio."
          />
        </section>

        {/* Section 5: Domain Badges & Status Indicators */}
        <section className="space-y-4">
          <div>
            <h3 className="text-base font-bold tracking-tight text-foreground">
              5. Domain Visual Vocabulary
            </h3>
            <p className="text-xs text-muted-foreground">
              Intelligence categories, alert severities, and Leon agent state badges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Categories */}
            <div className="rounded-xl border border-border/80 bg-card p-4 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Intelligence Categories
              </span>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(CATEGORY_TOKENS) as IntelligenceCategory[]).map((cat) => (
                  <CategoryBadge key={cat} category={cat} />
                ))}
              </div>
            </div>

            {/* Alert Severity */}
            <div className="rounded-xl border border-border/80 bg-card p-4 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Alert & Threat Severities
              </span>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(SEVERITY_TOKENS) as AlertSeverity[]).map((sev) => (
                  <SeverityBadge key={sev} severity={sev} showIcon />
                ))}
              </div>
              <div className="flex flex-wrap gap-2 pt-2 border-t border-border/60">
                {(Object.keys(SEVERITY_TOKENS) as AlertSeverity[]).map((sev) => (
                  <SeverityBadge key={sev} severity={sev} showDot size="sm" />
                ))}
              </div>
            </div>

            {/* Leon States */}
            <div className="rounded-xl border border-border/80 bg-card p-4 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Leon Agent States
              </span>
              <div className="flex flex-wrap gap-2">
                <StatusBadge state="Idle" size="sm" />
                <StatusBadge state="Researching" size="sm" />
                <StatusBadge state="Analyzing" size="sm" />
                <StatusBadge state="Validating" size="sm" />
                <StatusBadge state="Generating" size="sm" />
                <StatusBadge state="Error" size="sm" />
                <StatusBadge state="Offline" size="sm" />
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: UI Component Primitives */}
        <section className="space-y-4">
          <div>
            <h3 className="text-base font-bold tracking-tight text-foreground">
              6. UI Component Primitives (shadcn/ui Compliant)
            </h3>
            <p className="text-xs text-muted-foreground">
              Buttons, input fields, tabs, dialogs, and select primitives styled for light enterprise aesthetic.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Buttons & Dialog */}
            <div className="rounded-xl border border-border/80 bg-card p-5 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Button Variants & Dialog
              </span>
              <div className="flex flex-wrap gap-2">
                <Button variant="default">Primary Action</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Dialog>
                  <DialogTrigger
                    render={
                      <Button variant="outline" size="sm">
                        Open Sample Dialog
                      </Button>
                    }
                  />
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Investigate AMD AI Partnership</DialogTitle>
                      <DialogDescription>
                        Leon will cross-reference 8 primary sources to analyze the competitive impact on NVIDIA&apos;s cloud GPU business.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-3 text-xs text-muted-foreground">
                      Confirming will launch an autonomous research task on Server 2.
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="default" size="sm">
                        Execute Investigation
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <Tooltip>
                  <TooltipTrigger
                    render={
                      <Button variant="outline" size="sm">
                        Hover for Tooltip
                      </Button>
                    }
                  />
                  <TooltipContent>
                    <p className="text-xs">Contextual tooltip with delay=200</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>

            {/* Inputs & Tabs */}
            <div className="rounded-xl border border-border/80 bg-card p-5 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Inputs & Segment Tabs
              </span>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                <Input
                  placeholder="Search entities, intelligence vectors, or tickers..."
                  className="pl-9 text-xs"
                />
              </div>

              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid grid-cols-3">
                  <TabsTrigger value="all">All Intelligence</TabsTrigger>
                  <TabsTrigger value="critical">Critical Threats</TabsTrigger>
                  <TabsTrigger value="reports">Reports</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="text-xs text-muted-foreground pt-2">
                  Displaying aggregated intelligence feed across all 8 monitored categories.
                </TabsContent>
                <TabsContent value="critical" className="text-xs text-muted-foreground pt-2">
                  Filtered to high-impact strategic signals requiring immediate review.
                </TabsContent>
                <TabsContent value="reports" className="text-xs text-muted-foreground pt-2">
                  Synthesized intelligence briefings generated by Leon.
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* Section 7: Loading & Error States */}
        <section className="space-y-4">
          <div>
            <h3 className="text-base font-bold tracking-tight text-foreground">
              7. Loading, Skeleton, and Error States
            </h3>
            <p className="text-xs text-muted-foreground">
              Ensures every screen handles graceful degradation and progressive loading.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ErrorState
              title="Leon Gateway Connection Lost"
              message="The server-to-server gateway link between Server 1 and Server 2 timed out after 30 seconds."
              errorCode="GATEWAY_TIMEOUT_504"
              onRetry={() => alert("Retry triggered")}
            />

            <EmptyState
              title="No Pending Intelligence Alerts"
              description="Leon has analyzed all real-time market feeds and identified no critical threat anomalies."
              actionLabel="Launch New Investigation"
              onAction={() => alert("Action triggered")}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
