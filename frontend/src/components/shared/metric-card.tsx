import React from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface MetricCardProps {
  label: string;
  value: string | number;
  delta?: {
    value: string | number;
    trend: "up" | "down" | "neutral";
    label?: string;
  };
  description?: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  className?: string;
}

export function MetricCard({
  label,
  value,
  delta,
  description,
  icon,
  badge,
  className,
}: MetricCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border/80 bg-card p-4 shadow-xs transition-all hover:border-border/90 hover:shadow-sm",
        className
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        {icon && (
          <div className="flex size-7 items-center justify-center rounded-md border border-border/60 bg-muted/40 text-muted-foreground">
            {icon}
          </div>
        )}
        {badge}
      </div>

      <div className="mt-2.5 flex items-baseline gap-2.5">
        <span className="text-2xl font-bold tracking-tight text-foreground font-mono">
          {value}
        </span>

        {delta && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 text-xs font-semibold",
              delta.trend === "up" && "text-emerald-600 dark:text-emerald-400",
              delta.trend === "down" && "text-rose-600 dark:text-rose-400",
              delta.trend === "neutral" && "text-muted-foreground"
            )}
          >
            {delta.trend === "up" && <TrendingUp className="size-3" />}
            {delta.trend === "down" && <TrendingDown className="size-3" />}
            {delta.trend === "neutral" && <Minus className="size-3" />}
            {delta.value}
            {delta.label && (
              <span className="text-[10px] text-muted-foreground font-normal ml-0.5">
                {delta.label}
              </span>
            )}
          </span>
        )}
      </div>

      {description && (
        <p className="mt-1.5 text-xs text-muted-foreground truncate">
          {description}
        </p>
      )}
    </div>
  );
}
