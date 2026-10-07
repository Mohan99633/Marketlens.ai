"use client";

import React from "react";
import { cn } from "@/lib/utils";

const PIPELINE_STAGES = [
  { name: "Source Ingest", icon: "🌐", desc: "SEC, Tech Blogs, PR", color: "#64748b" },
  { name: "Evidence Extraction", icon: "🔍", desc: "Citation parsing", color: "#0284c7" },
  { name: "Leon Synthesis", icon: "⚡", desc: "Hermes agent analysis", color: "#2563eb" },
  { name: "Intelligence Vector", icon: "📊", desc: "Classified & scored", color: "#7c3aed" },
  { name: "Alert / Action", icon: "🚨", desc: "Realtime WebSocket", color: "#ea580c" },
];

export function IntelligenceNetworkFallback({ className }: { className?: string }) {
  return (
    <div className={cn("p-4 rounded-xl border border-border/80 bg-card", className)}>
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        {PIPELINE_STAGES.map((stage, i) => (
          <React.Fragment key={stage.name}>
            <div className="flex flex-1 flex-col items-center text-center p-2.5 rounded-lg border border-border/60 bg-muted/20 w-full md:w-auto">
              <span className="text-xl mb-1">{stage.icon}</span>
              <span className="text-xs font-bold text-foreground truncate">{stage.name}</span>
              <span className="text-[10px] text-muted-foreground mt-0.5">{stage.desc}</span>
            </div>
            {i < PIPELINE_STAGES.length - 1 && (
              <span className="text-muted-foreground font-mono text-xs hidden md:inline">→</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
