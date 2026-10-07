import React from "react";
import { ConnectionState } from "@/lib/types/design-system";
import { CONNECTION_STATE_TOKENS } from "@/lib/constants/design-tokens";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface ConnectionStatusProps {
  state: ConnectionState;
  showText?: boolean;
  className?: string;
}

export function ConnectionStatus({
  state,
  showText = true,
  className,
}: ConnectionStatusProps) {
  const token =
    CONNECTION_STATE_TOKENS[state] || CONNECTION_STATE_TOKENS.Disconnected;

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <div
            className={cn(
              "inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/80 px-2.5 py-1 text-xs font-medium backdrop-blur-sm transition-all select-none cursor-default",
              className
            )}
            role="status"
            aria-live="polite"
          />
        }
      >
        <span className="relative flex size-2 items-center justify-center">
          {token.ping && (
            <span
              className={cn(
                "absolute inline-flex size-full animate-ping rounded-full opacity-75",
                token.color
              )}
            />
          )}
          <span
            className={cn("relative inline-flex size-2 rounded-full", token.color)}
          />
        </span>
        {showText && (
          <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
            {state}
          </span>
        )}
      </TooltipTrigger>
      <TooltipContent side="bottom" className="text-xs">
        <p className="font-semibold">Gateway Status: {state}</p>
        <p className="text-muted-foreground">{token.label}</p>
      </TooltipContent>
    </Tooltip>
  );
}
