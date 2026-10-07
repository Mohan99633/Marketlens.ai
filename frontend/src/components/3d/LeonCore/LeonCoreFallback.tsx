"use client";

import React from "react";
import { LeonAgentState } from "@/lib/types/design-system";
import { LEON_STATE_TOKENS } from "@/lib/constants/design-tokens";
import { cn } from "@/lib/utils";

interface LeonCoreFallbackProps {
  state?: LeonAgentState;
  size?: number;
  className?: string;
  isReducedMotion?: boolean;
}

/**
 * 2D SVG / CSS fallback for Leon Intelligence Core.
 * Guaranteed 100% reliable on all devices, headless browsers, or when WebGL fails.
 */
export function LeonCoreFallback({
  state = "Idle",
  size = 180,
  className,
  isReducedMotion = false,
}: LeonCoreFallbackProps) {
  const token = LEON_STATE_TOKENS[state] || LEON_STATE_TOKENS.Offline;
  const isOffline = state === "Offline";
  const isError = state === "Error";

  // Animation speeds based on state
  const rotationClass = isReducedMotion || isOffline
    ? ""
    : state === "Researching" || state === "Analyzing"
    ? "animate-[spin_6s_linear_infinite]"
    : state === "Generating" || state === "Validating"
    ? "animate-[spin_10s_linear_infinite]"
    : "animate-[spin_18s_linear_infinite]";

  const pulseClass = isReducedMotion || isOffline
    ? ""
    : isError
    ? "animate-pulse"
    : state === "Researching" || state === "Analyzing"
    ? "animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]"
    : "animate-[pulse_3s_ease-in-out_infinite]";

  return (
    <div
      className={cn(
        "relative flex items-center justify-center select-none",
        className
      )}
      style={{ width: size, height: size }}
      role="img"
      aria-label={`Leon Intelligence Core (${state})`}
    >
      {/* Ambient background glow */}
      {!isOffline && (
        <div
          className="absolute inset-4 rounded-full blur-xl transition-all duration-700 opacity-40"
          style={{ backgroundColor: token.color }}
        />
      )}

      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10"
      >
        {/* Outer Orbit Ring */}
        <circle
          cx="100"
          cy="100"
          r="86"
          stroke={token.color}
          strokeWidth="1.5"
          strokeDasharray="6 8"
          strokeOpacity={isOffline ? "0.2" : "0.5"}
          className={rotationClass}
          style={{ transformOrigin: "100px 100px" }}
        />

        {/* Secondary Orbit Ellipse */}
        <ellipse
          cx="100"
          cy="100"
          rx="72"
          ry="38"
          stroke={token.color}
          strokeWidth="1.25"
          strokeOpacity={isOffline ? "0.15" : "0.45"}
          transform="rotate(45 100 100)"
          className={rotationClass}
          style={{ transformOrigin: "100px 100px" }}
        />

        {/* Third Orbit Ellipse */}
        <ellipse
          cx="100"
          cy="100"
          rx="72"
          ry="38"
          stroke={token.color}
          strokeWidth="1.25"
          strokeOpacity={isOffline ? "0.15" : "0.45"}
          transform="rotate(-45 100 100)"
          className={rotationClass}
          style={{ transformOrigin: "100px 100px", animationDirection: "reverse" }}
        />

        {/* Geometric Hexagonal Lattice Core */}
        <polygon
          points="100,60 135,80 135,120 100,140 65,120 65,80"
          stroke={token.color}
          strokeWidth="1.5"
          fill={token.color}
          fillOpacity={isOffline ? "0.05" : "0.12"}
        />

        {/* Inner Facet Lines */}
        <line x1="100" y1="60" x2="100" y2="140" stroke={token.color} strokeWidth="1" strokeOpacity="0.4" />
        <line x1="65" y1="80" x2="135" y2="120" stroke={token.color} strokeWidth="1" strokeOpacity="0.4" />
        <line x1="65" y1="120" x2="135" y2="80" stroke={token.color} strokeWidth="1" strokeOpacity="0.4" />

        {/* Center Node / Brain Nucleus */}
        <circle
          cx="100"
          cy="100"
          r="16"
          fill={token.color}
          fillOpacity={isOffline ? "0.2" : "0.85"}
          className={pulseClass}
          style={{ transformOrigin: "100px 100px" }}
        />
        <circle
          cx="100"
          cy="100"
          r="8"
          fill="#ffffff"
          fillOpacity={isOffline ? "0.3" : "0.95"}
        />

        {/* Satellite Data Nodes */}
        {!isOffline && (
          <>
            <circle cx="100" cy="14" r="3.5" fill={token.color} />
            <circle cx="186" cy="100" r="3.5" fill={token.color} />
            <circle cx="100" cy="186" r="3" fill={token.color} />
            <circle cx="14" cy="100" r="3" fill={token.color} />
          </>
        )}
      </svg>
    </div>
  );
}
