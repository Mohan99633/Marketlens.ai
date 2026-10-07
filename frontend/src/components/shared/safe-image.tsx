"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Cpu } from "lucide-react";

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackTicker?: string;
  className?: string;
  enableHoverEffect?: boolean;
}

export function SafeImage({
  src,
  alt,
  fallbackTicker = "ML",
  className,
  enableHoverEffect = true,
  ...props
}: SafeImageProps) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (error || !src) {
    return (
      <div
        className={cn(
          "w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 text-white p-4 select-none",
          className
        )}
      >
        <Cpu className="w-6 h-6 text-blue-400 mb-1 opacity-70" />
        <span className="font-mono text-xs font-bold tracking-wider text-slate-200">
          {fallbackTicker}
        </span>
        <span className="text-[10px] text-slate-400 font-mono">MarketLens Telemetry</span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative w-full h-full overflow-hidden bg-slate-900/5",
        enableHoverEffect && "group",
        className
      )}
    >
      {/* Skeleton / Blur placeholder while loading */}
      {!loaded && (
        <div className="absolute inset-0 bg-slate-100 animate-pulse flex items-center justify-center">
          <span className="text-[10px] font-mono text-slate-400">{fallbackTicker}</span>
        </div>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt || "MarketLens Intelligence Media"}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={cn(
          "w-full h-full object-cover transition-all duration-500 ease-out",
          loaded ? "opacity-100" : "opacity-0",
          enableHoverEffect && "group-hover:scale-103 group-hover:brightness-105"
        )}
        {...props}
      />
    </div>
  );
}
