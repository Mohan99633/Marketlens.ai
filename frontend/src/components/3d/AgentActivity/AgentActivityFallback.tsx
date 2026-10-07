"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Activity, ShieldCheck, Database, FileSearch, Sparkles } from "lucide-react";

interface AgentActivityProps {
  currentPhase?: "Research" | "SourceIngest" | "Analysis" | "Validation" | "Generation";
  className?: string;
}

const PHASES = [
  { id: "Research", label: "Research", icon: FileSearch, color: "text-cyan-500", bg: "bg-cyan-500/10 border-cyan-500/30" },
  { id: "SourceIngest", label: "Ingestion", icon: Database, color: "text-blue-500", bg: "bg-blue-500/10 border-blue-500/30" },
  { id: "Analysis", label: "Analysis", icon: Activity, color: "text-indigo-500", bg: "bg-indigo-500/10 border-indigo-500/30" },
  { id: "Validation", label: "Validation", icon: ShieldCheck, color: "text-amber-500", bg: "bg-amber-500/10 border-amber-500/30" },
  { id: "Generation", label: "Generation", icon: Sparkles, color: "text-emerald-500", bg: "bg-emerald-500/10 border-emerald-500/30" },
];

export function AgentActivityFallback({
  currentPhase = "Analysis",
  className,
}: AgentActivityProps) {
  return (
    <div className={cn("p-4 rounded-xl border border-border/80 bg-card", className)}>
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1">
        {PHASES.map((phase) => {
          const Icon = phase.icon;
          const isActive = phase.id === currentPhase;

          return (
            <div
              key={phase.id}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-semibold transition-all shrink-0",
                isActive
                  ? `${phase.bg} ${phase.color} shadow-xs ring-1 ring-primary/20`
                  : "border-border/60 bg-muted/20 text-muted-foreground"
              )}
            >
              <Icon className={cn("size-3.5", isActive && "animate-pulse")} />
              <span>{phase.label}</span>
              {isActive && (
                <span className="size-1.5 rounded-full bg-current animate-ping" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
