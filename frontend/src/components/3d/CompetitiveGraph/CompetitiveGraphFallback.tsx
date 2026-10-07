"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface CompetitorNode {
  ticker: string;
  name: string;
  score: number;
  threat: "Critical" | "High" | "Medium" | "Low";
  x: number;
  y: number;
  radius: number;
}

const DEFAULT_NODES: CompetitorNode[] = [
  { ticker: "NVDA", name: "NVIDIA", score: 94, threat: "High", x: 150, y: 80, radius: 28 },
  { ticker: "AMD", name: "AMD", score: 82, threat: "Medium", x: 75, y: 140, radius: 22 },
  { ticker: "INTC", name: "Intel", score: 68, threat: "Low", x: 225, y: 150, radius: 20 },
  { ticker: "MSFT", name: "Microsoft", score: 91, threat: "High", x: 230, y: 65, radius: 24 },
  { ticker: "GOOGL", name: "Alphabet", score: 88, threat: "Medium", x: 70, y: 60, radius: 22 },
];

export function CompetitiveGraphFallback({ className }: { className?: string }) {
  return (
    <div className={cn("relative flex flex-col items-center justify-center p-4", className)}>
      <svg viewBox="0 0 300 220" className="w-full max-w-md h-auto" fill="none">
        {/* Background Radar Rings */}
        <circle cx="150" cy="110" r="95" stroke="currentColor" strokeOpacity="0.08" strokeDasharray="3 3" />
        <circle cx="150" cy="110" r="65" stroke="currentColor" strokeOpacity="0.1" />
        <circle cx="150" cy="110" r="35" stroke="currentColor" strokeOpacity="0.12" />

        {/* Center Target Crosshair */}
        <line x1="150" y1="15" x2="150" y2="205" stroke="currentColor" strokeOpacity="0.08" />
        <line x1="55" y1="110" x2="245" y2="110" stroke="currentColor" strokeOpacity="0.08" />

        {/* Competitor Links */}
        <line x1="150" y1="80" x2="75" y2="140" stroke="#2563eb" strokeOpacity="0.35" strokeWidth="1.5" />
        <line x1="150" y1="80" x2="225" y2="150" stroke="#2563eb" strokeOpacity="0.35" strokeWidth="1.5" />
        <line x1="150" y1="80" x2="230" y2="65" stroke="#7c3aed" strokeOpacity="0.35" strokeWidth="1.5" />
        <line x1="150" y1="80" x2="70" y2="60" stroke="#059669" strokeOpacity="0.35" strokeWidth="1.5" />

        {/* Nodes */}
        {DEFAULT_NODES.map((node) => (
          <g key={node.ticker} className="cursor-pointer transition-transform hover:scale-110">
            <circle
              cx={node.x}
              cy={node.y}
              r={node.radius}
              fill="#ffffff"
              stroke="#2563eb"
              strokeWidth="2"
              className="drop-shadow-xs dark:fill-slate-900"
            />
            <circle
              cx={node.x}
              cy={node.y}
              r={node.radius - 4}
              fill={node.threat === "High" ? "#ea580c" : "#2563eb"}
              fillOpacity="0.12"
            />
            <text
              x={node.x}
              y={node.y + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-foreground font-mono font-bold text-[11px]"
            >
              {node.ticker}
            </text>
            <text
              x={node.x}
              y={node.y + node.radius + 12}
              textAnchor="middle"
              className="fill-muted-foreground font-mono text-[9px] font-semibold"
            >
              {node.score} PTS
            </text>
          </g>
        ))}
      </svg>
      <div className="mt-2 flex items-center justify-center gap-4 text-[11px] font-medium text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-blue-600" /> Market Anchor
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-orange-600" /> Direct Competitor
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-emerald-600" /> Platform Ally
        </span>
      </div>
    </div>
  );
}
