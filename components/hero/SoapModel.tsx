"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  RoundedBox,
  Environment,
  Float,
  MeshTransmissionMaterial,
} from "@react-three/drei";
import * as THREE from "three";

interface SoapBarProps {
  mousePos: { x: number; y: number };
}

function SoapBar({ mousePos }: SoapBarProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const targetRotation = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!meshRef.current) return;

    // Gentle auto-rotation
    meshRef.current.rotation.y += 0.004;

    // Parallax tilt from mouse position
    targetRotation.current.x = mousePos.y * 0.3;
    targetRotation.current.y += (mousePos.x * 0.3 - meshRef.current.rotation.y) * 0.02;

    meshRef.current.rotation.x +=
      (targetRotation.current.x - meshRef.current.rotation.x) * 0.05;
  });

  // Carved botanical line art on the top face via a plane geometry with a
  // custom texture drawn on a canvas
  const stampTexture = useMemo(() => {
    const size = 512;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;

    // Warm ivory background
    ctx.fillStyle = "#E8D4B8";
    ctx.fillRect(0, 0, size, size);

    // Oval border
    ctx.strokeStyle = "#7a5c3a";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(size / 2, size / 2, size * 0.42, size * 0.35, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Brand name — serif style
    ctx.fillStyle = "#4a3520";
    ctx.font = `bold ${size * 0.08}px Georgia`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("LATHER", size / 2, size * 0.38);
    ctx.fillText("& LORE", size / 2, size * 0.52);

    // Small decorative line under text
    ctx.strokeStyle = "#7a5c3a";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(size * 0.35, size * 0.59);
    ctx.lineTo(size * 0.65, size * 0.59);
    ctx.stroke();

    // Tiny botanical leaf motifs
    const drawLeaf = (x: number, y: number, angle: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.strokeStyle = "#7a5c3a";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, -12);
      ctx.bezierCurveTo(8, -6, 8, 6, 0, 12);
      ctx.bezierCurveTo(-8, 6, -8, -6, 0, -12);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, -12);
      ctx.lineTo(0, 12);
      ctx.stroke();
      ctx.restore();
    };

    drawLeaf(size * 0.25, size * 0.5, -Math.PI / 6);
    drawLeaf(size * 0.75, size * 0.5, Math.PI / 6);
    drawLeaf(size * 0.5, size * 0.24, 0);

    return new THREE.CanvasTexture(canvas);
  }, []);

  // Side texture — subtle warm gradient
  const sideTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d")!;
    const gradient = ctx.createLinearGradient(0, 0, 256, 256);
    gradient.addColorStop(0, "#D4B896");
    gradient.addColorStop(0.5, "#C9A87A");
    gradient.addColorStop(1, "#B8946A");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);
    return new THREE.CanvasTexture(canvas);
  }, []);

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.8}>
      <mesh ref={meshRef} castShadow receiveShadow>
        {/* Rounded soap bar geometry: wide, flat, tablet-shaped */}
        <RoundedBox args={[3.2, 1.2, 2.0]} radius={0.18} smoothness={6}>
          <meshStandardMaterial
            color="#C9A87A"
            roughness={0.55}
            metalness={0.05}
            map={sideTexture}
          />
        </RoundedBox>

        {/* Stamp top face as a slightly raised plane */}
        <mesh position={[0, 0.62, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[2.6, 1.6]} />
          <meshStandardMaterial
            map={stampTexture}
            roughness={0.7}
            metalness={0}
            transparent
          />
        </mesh>
      </mesh>
    </Float>
  );
}

// Soft bloom / glow plane behind the soap
function GlowPlane() {
  return (
    <mesh position={[0, 0, -1.5]}>
      <planeGeometry args={[6, 6]} />
      <meshBasicMaterial color="#E8C9A0" transparent opacity={0.12} />
    </mesh>
  );
}

export default function SoapModel({ mousePos }: SoapBarProps) {
  return (
    <Canvas
      shadows
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 1.5, 6], fov: 40 }}
      style={{ background: "transparent" }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.6} color="#FFF5E6" />
      <directionalLight
        position={[4, 6, 4]}
        intensity={1.8}
        color="#FFE8CC"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-4, 2, -2]} intensity={0.4} color="#C4D4AA" />
      <pointLight position={[0, 4, 2]} intensity={0.8} color="#FFD0A0" distance={10} />

      <GlowPlane />
      <SoapBar mousePos={mousePos} />

      <Environment preset="sunset" />
    </Canvas>
  );
}
