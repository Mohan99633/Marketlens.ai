"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { CompetitiveGraphFallback } from "./CompetitiveGraphFallback";
import { useIsWebGLAvailable, usePrefersReducedMotion } from "@/lib/3d/webgl-detector";
import { useIsClient } from "@/lib/hooks/use-is-client";

const CompetitiveGraph3D = dynamic(
  () => import("./CompetitiveGraph3D").then((m) => m.CompetitiveGraph3D),
  {
    ssr: false,
    loading: () => <CompetitiveGraphFallback />,
  }
);

export function CompetitiveGraph({
  forceFallback = false,
  className,
}: {
  forceFallback?: boolean;
  className?: string;
}) {
  const isClient = useIsClient();
  const isWebGL = useIsWebGLAvailable();
  const isReducedMotion = usePrefersReducedMotion();
  const [contextLost, setContextLost] = useState(false);

  const canRender3D =
    isClient && isWebGL && !isReducedMotion && !forceFallback && !contextLost;

  if (!canRender3D) {
    return <CompetitiveGraphFallback className={className} />;
  }

  return (
    <CompetitiveGraph3D
      onContextLost={() => setContextLost(true)}
      className={className}
    />
  );
}

export { CompetitiveGraphFallback };
