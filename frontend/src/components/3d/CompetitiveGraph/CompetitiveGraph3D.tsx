"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface CompetitiveGraph3DProps {
  onContextLost?: () => void;
  className?: string;
}

export function CompetitiveGraph3D({
  onContextLost,
  className,
}: CompetitiveGraph3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameId = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 360;
    const height = 240;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 1.8, 6.5);
    camera.lookAt(0, 0, 0);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      container.appendChild(renderer.domElement);
    } catch {
      onContextLost?.();
      return;
    }

    const canvas = renderer.domElement;
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      onContextLost?.();
    };
    canvas.addEventListener("webglcontextlost", handleContextLost);

    // Group for entire cluster to rotate slowly
    const cluster = new THREE.Group();
    scene.add(cluster);

    // Nodes positions (NVDA, AMD, INTC, MSFT, GOOGL)
    const nodePositions = [
      { pos: new THREE.Vector3(0, 0, 0), color: 0x2563eb, size: 0.35 },    // Center NVDA
      { pos: new THREE.Vector3(-1.8, 0.4, 0.5), color: 0xea580c, size: 0.28 }, // AMD
      { pos: new THREE.Vector3(1.7, -0.5, -0.4), color: 0x0284c7, size: 0.24 }, // INTC
      { pos: new THREE.Vector3(1.4, 0.8, 0.8), color: 0x7c3aed, size: 0.3 },   // MSFT
      { pos: new THREE.Vector3(-1.2, -0.7, -0.6), color: 0x059669, size: 0.26 }, // GOOGL
    ];

    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];

    // Create spheres
    nodePositions.forEach((node) => {
      const geo = new THREE.SphereGeometry(node.size, 16, 16);
      const mat = new THREE.MeshBasicMaterial({
        color: node.color,
        wireframe: true,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.copy(node.pos);
      cluster.add(mesh);
      geometries.push(geo);
      materials.push(mat);

      // Inner solid node
      const innerGeo = new THREE.SphereGeometry(node.size * 0.4, 8, 8);
      const innerMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const innerMesh = new THREE.Mesh(innerGeo, innerMat);
      innerMesh.position.copy(node.pos);
      cluster.add(innerMesh);
      geometries.push(innerGeo);
      materials.push(innerMat);
    });

    // Create linking vectors between center and satellites
    nodePositions.slice(1).forEach((sat) => {
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        nodePositions[0].pos,
        sat.pos,
      ]);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x2563eb,
        transparent: true,
        opacity: 0.4,
      });
      const line = new THREE.Line(lineGeo, lineMat);
      cluster.add(line);
      geometries.push(lineGeo);
      materials.push(lineMat);
    });

    // Intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          isVisibleRef.current = e.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const clock = new THREE.Clock();
    const animate = () => {
      animFrameId.current = requestAnimationFrame(animate);
      if (!isVisibleRef.current) return;

      const delta = clock.getDelta();
      cluster.rotation.y += delta * 0.25;
      cluster.rotation.x = Math.sin(clock.getElapsedTime() * 0.5) * 0.1;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      observer.disconnect();
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      renderer.dispose();
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
  }, [onContextLost]);

  return <div ref={containerRef} className={className} style={{ width: "100%", height: 240 }} />;
}
