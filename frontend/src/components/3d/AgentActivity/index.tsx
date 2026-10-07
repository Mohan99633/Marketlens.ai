"use client";

import React from "react";
import { AgentActivityFallback } from "./AgentActivityFallback";

export function AgentActivity({
  currentPhase,
  className,
}: {
  currentPhase?: "Research" | "SourceIngest" | "Analysis" | "Validation" | "Generation";
  className?: string;
}) {
  return <AgentActivityFallback currentPhase={currentPhase} className={className} />;
}

export { AgentActivityFallback };
