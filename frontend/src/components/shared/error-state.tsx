import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AlertOctagon, RotateCw } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  message?: string;
  errorCode?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = "Telemetry Error Encountered",
  message = "Unable to fetch intelligence vector from backend gateway. Please check network connectivity or retry.",
  errorCode,
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-destructive/30 bg-destructive/5 p-8 text-center",
        className
      )}
    >
      <div className="flex size-12 items-center justify-center rounded-xl bg-destructive/10 text-destructive shadow-xs">
        <AlertOctagon className="size-6 stroke-[1.75]" />
      </div>
      <h3 className="mt-4 text-sm font-semibold tracking-tight text-foreground">
        {title}
      </h3>
      <p className="mt-1.5 max-w-sm text-xs text-muted-foreground leading-relaxed">
        {message}
      </p>
      {errorCode && (
        <span className="mt-2 rounded-md bg-muted px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
          Code: {errorCode}
        </span>
      )}
      {onRetry && (
        <Button
          onClick={onRetry}
          variant="outline"
          size="sm"
          className="mt-4 gap-1.5 font-medium border-destructive/20 text-destructive hover:bg-destructive/10"
        >
          <RotateCw className="size-3.5" />
          Retry Request
        </Button>
      )}
    </div>
  );
}
