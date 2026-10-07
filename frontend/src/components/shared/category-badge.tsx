import React from "react";
import { IntelligenceCategory } from "@/lib/types/design-system";
import { CATEGORY_TOKENS } from "@/lib/constants/design-tokens";
import { cn } from "@/lib/utils";
import {
  Box,
  DollarSign,
  Cpu,
  Handshake,
  GitMerge,
  Scale,
  Compass,
  TrendingUp,
} from "lucide-react";

interface CategoryBadgeProps {
  category: IntelligenceCategory;
  showIcon?: boolean;
  size?: "sm" | "default";
  className?: string;
}

export function CategoryBadge({
  category,
  showIcon = true,
  size = "default",
  className,
}: CategoryBadgeProps) {
  const token = CATEGORY_TOKENS[category] || CATEGORY_TOKENS.Market;

  const renderIcon = () => {
    const iconClass = size === "sm" ? "size-3" : "size-3.5";
    switch (category) {
      case "Product":
        return <Box className={iconClass} />;
      case "Financial":
        return <DollarSign className={iconClass} />;
      case "Technology":
        return <Cpu className={iconClass} />;
      case "Partnership":
        return <Handshake className={iconClass} />;
      case "Acquisition":
        return <GitMerge className={iconClass} />;
      case "Regulatory":
        return <Scale className={iconClass} />;
      case "Strategy":
        return <Compass className={iconClass} />;
      case "Market":
        return <TrendingUp className={iconClass} />;
      default:
        return null;
    }
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border font-medium transition-colors select-none",
        size === "sm" ? "px-2 py-0.5 text-[11px] gap-1" : "px-2.5 py-1 text-xs gap-1.5",
        token.badgeBg,
        token.badgeText,
        token.badgeBorder,
        className
      )}
    >
      {showIcon && renderIcon()}
      <span className="font-semibold">{token.label}</span>
    </span>
  );
}
