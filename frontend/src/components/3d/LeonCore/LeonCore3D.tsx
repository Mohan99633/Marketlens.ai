"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { LeonAgentState } from "@/lib/types/design-system";
import { LEON_STATE_TOKENS } from "@/lib/constants/design-tokens";

interface LeonCore3DProps {
  state?: LeonAgentState;
  size?: number;
  onContextLost?: () => void;
  className?: string;
}

export function LeonCore3D({
  state = "Idle",
  size = 200,
  onContextLost,
  className,
}: LeonCore3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameId = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);

  // References for live updates without re-instantiating WebGL
  const stateRef = useRef<LeonAgentState>(state);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene & Camera setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 5.2;

    // 2. Renderer creation with error handling
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
      renderer.setSize(size, size);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      container.appendChild(renderer.domElement);
    } catch {
      onContextLost?.();
      return;
    }

    // Context loss handler
    const canvas = renderer.domElement;
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      onContextLost?.();
    };
    canvas.addEventListener("webglcontextlost", handleContextLost, false);

    // 3. Materials & Geometries
    const token = LEON_STATE_TOKENS[stateRef.current] || LEON_STATE_TOKENS.Offline;
    const primaryColor = new THREE.Color(token.accentHex);

    // Inner Icosahedron Core (Faceted Low-Poly Wireframe)
    const coreGeo = new THREE.IcosahedronGeometry(1.0, 0);
    const coreMat = new THREE.MeshBasicMaterial({
      color: primaryColor,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreMesh);

    // Central Pulsing Nucleus Sphere
    const nucleusGeo = new THREE.SphereGeometry(0.35, 16, 16);
    const nucleusMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.95,
    });
    const nucleusMesh = new THREE.Mesh(nucleusGeo, nucleusMat);
    scene.add(nucleusMesh);

    // Outer Orbit Ring 1
    const ring1Geo = new THREE.TorusGeometry(1.7, 0.015, 8, 48);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: primaryColor,
      transparent: true,
      opacity: 0.5,
    });
    const ring1Mesh = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1Mesh.rotation.x = Math.PI / 3;
    scene.add(ring1Mesh);

    // Outer Orbit Ring 2
    const ring2Geo = new THREE.TorusGeometry(1.9, 0.012, 8, 48);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: primaryColor,
      transparent: true,
      opacity: 0.35,
    });
    const ring2Mesh = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2Mesh.rotation.y = Math.PI / 4;
    scene.add(ring2Mesh);

    // 4. Visibility Observer (Pause when off-screen)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // 5. Render loop
    const clock = new THREE.Clock();

    const animate = () => {
      animFrameId.current = requestAnimationFrame(animate);

      if (!isVisibleRef.current) return; // Completely idle when off-screen

      const delta = clock.getDelta();
      const currentState = stateRef.current;
      const currentToken = LEON_STATE_TOKENS[currentState] || LEON_STATE_TOKENS.Offline;

      // Update color dynamically if state changes
      const targetColor = new THREE.Color(currentToken.accentHex);
      coreMat.color.lerp(targetColor, 0.05);
      ring1Mat.color.lerp(targetColor, 0.05);
      ring2Mat.color.lerp(targetColor, 0.05);

      // Speed multipliers based on agent state
      let speed = 0.6;
      if (currentState === "Researching") speed = 2.4;
      else if (currentState === "Analyzing") speed = 2.0;
      else if (currentState === "Validating") speed = 1.2;
      else if (currentState === "Generating") speed = 1.8;
      else if (currentState === "Error") speed = 0.2;
      else if (currentState === "Offline") speed = 0;

      // Rotations
      coreMesh.rotation.x += delta * speed * 0.7;
      coreMesh.rotation.y += delta * speed * 0.9;
      ring1Mesh.rotation.z += delta * speed * 0.5;
      ring2Mesh.rotation.x += delta * speed * 0.4;

      // Nucleus scale pulsation
      const time = clock.getElapsedTime();
      const pulseSpeed = currentState === "Researching" || currentState === "Analyzing" ? 5 : 2;
      const pulseAmp = currentState === "Offline" ? 0 : 0.08;
      const scale = 1 + Math.sin(time * pulseSpeed) * pulseAmp;
      nucleusMesh.scale.set(scale, scale, scale);

      renderer.render(scene, camera);
    };

    animate();

    // 6. Cleanup
    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      observer.disconnect();
      canvas.removeEventListener("webglcontextlost", handleContextLost);

      coreGeo.dispose();
      coreMat.dispose();
      nucleusGeo.dispose();
      nucleusMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();

      renderer.dispose();
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    };
  }, [size, onContextLost]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: size, height: size }}
    />
  );
}
