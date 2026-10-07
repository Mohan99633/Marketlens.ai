"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { LeonAgentState } from "@/lib/types/design-system";
import { LeonCoreFallback } from "./LeonCoreFallback";
import { useIsWebGLAvailable, usePrefersReducedMotion } from "@/lib/3d/webgl-detector";
import { useIsClient } from "@/lib/hooks/use-is-client";

// Lazy-load the Three.js 3D implementation with no SSR
const LeonCore3D = dynamic(
  () => import("./LeonCore3D").then((mod) => mod.LeonCore3D),
  {
    ssr: false,
    loading: () => <LeonCoreFallback state="Idle" size={180} />,
  }
);

interface LeonCoreProps {
  state?: LeonAgentState;
  size?: number;
  forceFallback?: boolean;
  className?: string;
}

/**
 * High-reliability Leon Intelligence Core.
 * Automatically serves 3D when WebGL is available and motion is permitted;
 * seamlessly falls back to 2D SVG/CSS with zero visual interruption.
 */
export function LeonCore({
  state = "Idle",
  size = 180,
  forceFallback = false,
  className,
}: LeonCoreProps) {
  const isClient = useIsClient();
  const isWebGL = useIsWebGLAvailable();
  const isReducedMotion = usePrefersReducedMotion();
  const [contextLost, setContextLost] = useState(false);

  const canRender3D =
    isClient && isWebGL && !isReducedMotion && !forceFallback && !contextLost;

  if (!canRender3D) {
    return (
      <LeonCoreFallback
        state={state}
        size={size}
        isReducedMotion={isReducedMotion}
        className={className}
      />
    );
  }

  return (
    <LeonCore3D
      state={state}
      size={size}
      onContextLost={() => setContextLost(true)}
      className={className}
    />
  );
}

export { LeonCoreFallback };
