"use client";

import React from "react";
import { IntelligenceNetworkFallback } from "./IntelligenceNetworkFallback";

export function IntelligenceNetwork({ className }: { className?: string }) {
  // Uses 2D fallback directly for maximum tabular reliability and responsiveness
  return <IntelligenceNetworkFallback className={className} />;
}

export { IntelligenceNetworkFallback };
