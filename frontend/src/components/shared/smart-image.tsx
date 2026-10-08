"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { CompanyLogo } from "./company-logo";

export interface SmartImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "alt"> {
  src: string;
  alt: string;
  fallbackTicker?: string;
  fallbackName?: string;
  aspectRatio?: "16/9" | "1/1" | "21/9" | "4/3" | "auto";
  priority?: boolean;
  className?: string;
  containerClassName?: string;
  enableHoverEffect?: boolean;
}

export function SmartImage({
  src,
  alt,
  fallbackTicker = "NVDA",
  fallbackName,
  aspectRatio = "16/9",
  priority = false,
  className,
  containerClassName,
  enableHoverEffect = false,
  ...props
}: SmartImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [prevSrc, setPrevSrc] = useState(src);

  // Reset states if src changes (official React pattern without cascading effect)
  if (prevSrc !== src) {
    setPrevSrc(src);
    setLoaded(false);
    setError(false);
  }

  const aspectClass =
    aspectRatio === "16/9"
      ? "aspect-[16/9]"
      : aspectRatio === "1/1"
      ? "aspect-square"
      : aspectRatio === "21/9"
      ? "aspect-[21/9]"
      : aspectRatio === "4/3"
      ? "aspect-[4/3]"
      : "";

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-[#E8E4DB] select-none",
        aspectClass,
        containerClassName
      )}
    >
      {/* Warm Neutral Skeleton / Shimmer during loading (Palette: #E8E4DB -> #DDD8CE) */}
      {!loaded && !error && (
        <div className="absolute inset-0 bg-[#E8E4DB] flex items-center justify-center animate-pulse">
          <div className="opacity-25 flex items-center justify-center scale-90">
            <CompanyLogo ticker={fallbackTicker} size={32} />
          </div>
        </div>
      )}

      {/* Graceful Fallback if image fails or is unavailable */}
      {error ? (
        <div className="absolute inset-0 bg-[#F8F6F0] border border-[#DDD8CE] flex flex-col items-center justify-center p-3 text-center">
          <CompanyLogo ticker={fallbackTicker} size={28} className="mb-1.5" />
          <span className="font-mono text-xs font-bold text-[#11110F]">
            {fallbackTicker}
          </span>
          <span className="text-[10px] text-[#77736B] font-mono mt-0.5">
            {fallbackName || "Enterprise Telemetry"}
          </span>
        </div>
      ) : (
        /* The Actual Image */
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={cn(
            "w-full h-full object-cover transition-all duration-300 ease-out",
            loaded ? "opacity-100" : "opacity-0",
            enableHoverEffect && "hover:scale-103",
            className
          )}
          {...props}
        />
      )}
    </div>
  );
}
