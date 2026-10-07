import { useSyncExternalStore } from "react";

/**
 * Utility for safe WebGL environment detection, reduced-motion detection,
 * and context failure handling.
 */

let cachedWebGL: boolean | null = null;

export function isWebGLAvailable(): boolean {
  if (typeof window === "undefined") return false;
  if (cachedWebGL !== null) return cachedWebGL;

  try {
    const canvas = document.createElement("canvas");
    const gl = (canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl") ||
      canvas.getContext("webgl2")) as WebGLRenderingContext | null;

    const available = Boolean(gl && gl instanceof WebGLRenderingContext);
    if (gl) {
      const loseContext = gl.getExtension("WEBGL_lose_context");
      if (loseContext) {
        loseContext.loseContext();
      }
    }
    cachedWebGL = available;
    return available;
  } catch {
    cachedWebGL = false;
    return false;
  }
}

export function isReducedMotionPreferred(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

/**
 * React 19-safe hook to subscribe to prefers-reduced-motion
 */
const emptySubscribe = () => () => {};

export function useIsWebGLAvailable(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => isWebGLAvailable(),
    () => false
  );
}

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => isReducedMotionPreferred(),
    () => false
  );
}
