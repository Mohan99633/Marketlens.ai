"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface CompanyLogoProps {
  ticker: string;
  className?: string;
  size?: number;
}

export function CompanyLogo({ ticker, className, size = 20 }: CompanyLogoProps) {
  const t = ticker.toUpperCase();

  if (t === "NVDA") {
    // NVIDIA recognizable green badge with white stylized claw / aperture
    return (
      <div
        className={cn(
          "flex items-center justify-center shrink-0 rounded-xs bg-[#16803C] text-white p-0.5 shadow-2xs",
          className
        )}
        style={{ width: size, height: size }}
        title="NVIDIA Corporation"
      >
        <svg viewBox="0 0 24 24" className="w-full h-full fill-current" aria-label="NVIDIA">
          <path d="M4.5 12c0-4.14 3.36-7.5 7.5-7.5 3.1 0 5.76 1.88 6.89 4.56-.63-.44-1.39-.7-2.2-.7-2.12 0-3.84 1.72-3.84 3.84 0 1.25.6 2.36 1.52 3.06-1.02.46-2.15.74-3.37.74-4.14 0-7.5-3.36-7.5-7.5zm12.39-1.31c.21.41.33.88.33 1.37 0 1.74-1.41 3.15-3.15 3.15-.65 0-1.25-.2-1.75-.53.79-.65 1.3-1.63 1.3-2.73 0-.74-.23-1.43-.63-2 .6-.17 1.24-.26 1.9-.26.71 0 1.39.11 2 .32zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10c0-2.32-.79-4.46-2.12-6.17l-1.46 1.46C19.34 8.54 20 10.19 20 12c0 4.41-3.59 8-8 8s-8-3.59-8-8 3.59-8 8-8c2.61 0 4.93 1.25 6.4 3.19l1.46-1.46C17.97 3.4 15.17 2 12 2z" />
        </svg>
      </div>
    );
  }

  if (t === "MSFT") {
    // Microsoft iconic 4-color grid
    return (
      <div
        className={cn("grid grid-cols-2 gap-0.5 shrink-0 p-0.5", className)}
        style={{ width: size, height: size }}
        title="Microsoft Corporation"
      >
        <span className="bg-[#F25022] rounded-2xs" />
        <span className="bg-[#7FBA00] rounded-2xs" />
        <span className="bg-[#00A4EF] rounded-2xs" />
        <span className="bg-[#FFB900] rounded-2xs" />
      </div>
    );
  }

  if (t === "GOOGL" || t === "GOOG") {
    // Google official 4-color G
    return (
      <div
        className={cn("flex items-center justify-center shrink-0", className)}
        style={{ width: size, height: size }}
        title="Alphabet Google"
      >
        <svg viewBox="0 0 24 24" className="w-full h-full">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>
      </div>
    );
  }

  if (t === "AMZN") {
    // Amazon logo: black 'a' with orange curve smile
    return (
      <div
        className={cn("flex flex-col items-center justify-center shrink-0", className)}
        style={{ width: size, height: size }}
        title="Amazon.com"
      >
        <span className="font-sans font-black text-[#11110F] leading-none" style={{ fontSize: size * 0.7 }}>
          a
        </span>
        <svg viewBox="0 0 16 4" className="w-4/5 h-1 fill-[#E97817] -mt-0.5">
          <path d="M1 1.5 Q8 4 15 1 Q14 2 13 3 Q8 4.5 1 1.5 Z" />
        </svg>
      </div>
    );
  }

  if (t === "AMD") {
    // AMD iconic arrow chevrons
    return (
      <div
        className={cn(
          "flex items-center justify-center shrink-0 rounded-xs bg-[#11110F] text-white p-0.5",
          className
        )}
        style={{ width: size, height: size }}
        title="Advanced Micro Devices"
      >
        <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
          <path d="M0 0v24h24V0H0zm6 6h4.5l5.25 5.25L10.5 16.5H6V6zm12 12h-4.5L8.25 12.75 13.5 7.5H18V18z" />
        </svg>
      </div>
    );
  }

  if (t === "INTC") {
    // Intel clean bold wordmark
    return (
      <div
        className={cn(
          "flex items-center justify-center shrink-0 rounded-xs bg-[#E7F0FC] text-[#1769D1] font-bold tracking-tighter px-0.5 border border-[#1769D1]/20",
          className
        )}
        style={{ width: size, height: size, fontSize: size * 0.42 }}
        title="Intel Corporation"
      >
        <span>intel</span>
      </div>
    );
  }

  // Fallback for any other ticker
  return (
    <div
      className={cn(
        "flex items-center justify-center shrink-0 rounded-xs bg-[#E8E4DB] text-[#11110F] font-mono font-bold text-[10px]",
        className
      )}
      style={{ width: size, height: size }}
    >
      {t.slice(0, 3)}
    </div>
  );
}
