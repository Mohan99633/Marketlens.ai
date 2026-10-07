import React from "react";
import { AlertSeverity } from "@/lib/types/design-system";
import { SEVERITY_TOKENS } from "@/lib/constants/design-tokens";
import { cn } from "@/lib/utils";
import { AlertCircle, AlertTriangle, Info, Bell } from "lucide-react";

interface SeverityBadgeProps {
  severity: AlertSeverity;
  showIcon?: boolean;
  showDot?: boolean;
  size?: "sm" | "default" | "lg";
  className?: string;
}

export function SeverityBadge({
  severity,
  showIcon = false,
  showDot = true,
  size = "default",
  className,
}: SeverityBadgeProps) {
  const token = SEVERITY_TOKENS[severity] || SEVERITY_TOKENS.Low;

  const sizeClasses = {
    sm: "px-2 py-0.5 text-[11px] font-medium gap-1",
    default: "px-2.5 py-0.5 text-xs font-semibold gap-1.5",
    lg: "px-3 py-1 text-sm font-semibold gap-2",
  };

  const iconSizes = {
    sm: "size-3",
    default: "size-3.5",
    lg: "size-4",
  };

  const dotSizes = {
    sm: "size-1.5",
    default: "size-2",
    lg: "size-2.5",
  };

  const getIcon = () => {
    switch (severity) {
      case "Critical":
        return <AlertCircle className={cn(iconSizes[size], "text-red-600 dark:text-red-400")} />;
      case "High":
        return <AlertTriangle className={cn(iconSizes[size], "text-orange-600 dark:text-orange-400")} />;
      case "Medium":
        return <Bell className={cn(iconSizes[size], "text-amber-600 dark:text-amber-400")} />;
      case "Low":
        return <Info className={cn(iconSizes[size], "text-slate-600 dark:text-slate-400")} />;
    }
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border font-mono select-none tracking-tight",
        token.badgeBg,
        token.badgeText,
        token.badgeBorder,
        sizeClasses[size],
        className
      )}
    >
      {showIcon && getIcon()}
      {!showIcon && showDot && (
        <span
          className={cn("rounded-full shrink-0", dotSizes[size], token.pulseColor)}
        />
      )}
      <span>{token.label.toUpperCase()}</span>
    </span>
  );
}
