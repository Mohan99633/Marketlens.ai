"use client";

import React from "react";
import { SmartImage, SmartImageProps } from "./smart-image";

export function SafeImage(props: SmartImageProps) {
  return <SmartImage {...props} />;
}
