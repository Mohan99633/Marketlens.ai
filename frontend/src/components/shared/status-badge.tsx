import React from "react";
import { LeonAgentState } from "@/lib/types/design-system";
import { LEON_STATE_TOKENS } from "@/lib/constants/design-tokens";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  state: LeonAgentState;
  showDot?: boolean;
  pulse?: boolean;
  size?: "sm" | "default" | "lg";
  className?: string;
}

export function StatusBadge({
  state,
  showDot = true,
  pulse = true,
  size = "default",
  className,
}: StatusBadgeProps) {
  const token = LEON_STATE_TOKENS[state] || LEON_STATE_TOKENS.Offline;

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs font-medium gap-1.5",
    default: "px-2.5 py-1 text-xs font-semibold gap-2",
    lg: "px-3 py-1.5 text-sm font-semibold gap-2.5",
  };

  const dotSizes = {
    sm: "size-1.5",
    default: "size-2",
    lg: "size-2.5",
  };

  const isAnimated =
    pulse &&
    token.pulseSpeed !== "none" &&
    state !== "Offline" &&
    state !== "Completed";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border transition-colors select-none",
        "border-border/60 bg-muted/40 text-foreground",
        sizeClasses[size],
        className
      )}
      style={{
        borderColor: `${token.color}33`,
        backgroundColor: `${token.color}10`,
      }}
    >
      {showDot && (
        <span className="relative flex shrink-0">
          {isAnimated && (
            <span
              className={cn(
                "absolute -inset-0.5 rounded-full animate-ping opacity-75",
                token.pulseSpeed === "fast" && "duration-700",
                token.pulseSpeed === "normal" && "duration-1000",
                token.pulseSpeed === "slow" && "duration-1500"
              )}
              style={{ backgroundColor: token.color }}
            />
          )}
          <span
            className={cn("relative rounded-full shrink-0", dotSizes[size])}
            style={{ backgroundColor: token.color }}
          />
        </span>
      )}
      <span className="truncate">{token.label}</span>
    </span>
  );
}
