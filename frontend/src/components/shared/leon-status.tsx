import React from "react";
import { LeonAgentState } from "@/lib/types/design-system";
import { LEON_STATE_TOKENS } from "@/lib/constants/design-tokens";
import { StatusBadge } from "./status-badge";
import { cn } from "@/lib/utils";
import { Bot, Activity } from "lucide-react";

interface LeonStatusProps {
  state: LeonAgentState;
  currentTask?: string;
  activeTasksCount?: number;
  compact?: boolean;
  className?: string;
}

export function LeonStatus({
  state,
  currentTask,
  activeTasksCount = 0,
  compact = false,
  className,
}: LeonStatusProps) {
  const token = LEON_STATE_TOKENS[state] || LEON_STATE_TOKENS.Offline;

  if (compact) {
    return (
      <div
        className={cn(
          "inline-flex items-center gap-2.5 rounded-lg border border-border/80 bg-card px-3 py-1.5 shadow-xs",
          className
        )}
      >
        <div
          className="flex size-6 items-center justify-center rounded-md text-white shadow-xs"
          style={{ backgroundColor: token.color }}
        >
          <Bot className="size-3.5" />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold tracking-tight">LEON</span>
            <StatusBadge state={state} size="sm" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-border/80 bg-card p-4 shadow-xs transition-all hover:border-primary/40",
        className
      )}
    >
      {/* Subtle top indicator bar */}
      <div
        className="absolute top-0 inset-x-0 h-1 transition-colors duration-500"
        style={{ backgroundColor: token.color }}
      />

      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className="relative flex size-10 shrink-0 items-center justify-center rounded-lg text-white shadow-sm transition-transform duration-300"
            style={{ backgroundColor: token.color }}
          >
            <Bot className="size-5" />
            {state !== "Offline" && state !== "Idle" && (
              <span className="absolute -top-1 -right-1 flex size-3">
                <span
                  className="absolute inline-flex size-full animate-ping rounded-full opacity-75"
                  style={{ backgroundColor: token.color }}
                />
                <span
                  className="relative inline-flex size-3 rounded-full border-2 border-card"
                  style={{ backgroundColor: token.color }}
                />
              </span>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold tracking-tight text-foreground">
                LEON BRAIN RUNTIME
              </h4>
              <span className="text-[11px] font-mono text-muted-foreground uppercase">
                HERMES v0.3
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              {token.description}
            </p>
          </div>
        </div>

        <StatusBadge state={state} size="default" />
      </div>

      {currentTask && (
        <div className="mt-3.5 rounded-lg border border-border/60 bg-muted/30 p-2.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 truncate">
            <Activity className="size-3.5 text-primary shrink-0 animate-pulse" />
            <span className="text-muted-foreground font-medium">Task:</span>
            <span className="font-semibold text-foreground truncate">
              {currentTask}
            </span>
          </div>
          {activeTasksCount > 0 && (
            <span className="shrink-0 rounded bg-primary/10 px-2 py-0.5 font-mono text-[11px] font-bold text-primary">
              {activeTasksCount} ACTIVE
            </span>
          )}
        </div>
      )}
    </div>
  );
}
