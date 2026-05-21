"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
  size: number;
  life: number;
  maxLife: number;
}

export default function SteamParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const spawn = (): Particle => {
      const maxLife = 120 + Math.random() * 80;
      return {
        x: canvas.width * 0.3 + Math.random() * canvas.width * 0.4,
        y: canvas.height * 0.65 + Math.random() * 30,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -(0.5 + Math.random() * 0.8),
        opacity: 0,
        size: 8 + Math.random() * 20,
        life: 0,
        maxLife,
      };
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn new particles at a gentle rate
      if (particlesRef.current.length < 20 && Math.random() < 0.3) {
        particlesRef.current.push(spawn());
      }

      particlesRef.current = particlesRef.current.filter((p) => p.life < p.maxLife);

      for (const p of particlesRef.current) {
        p.life++;
        p.x += p.vx + Math.sin(p.life * 0.05) * 0.3;
        p.y += p.vy;
        p.vx *= 0.998;
        p.size += 0.12;

        // Fade in for first 20% of life, hold, then fade out over last 40%
        const progress = p.life / p.maxLife;
        if (progress < 0.2) {
          p.opacity = (progress / 0.2) * 0.18;
        } else if (progress < 0.6) {
          p.opacity = 0.18;
        } else {
          p.opacity = ((1 - progress) / 0.4) * 0.18;
        }

        // Radial gradient blob for each particle
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        gradient.addColorStop(0, `rgba(245, 239, 230, ${p.opacity})`);
        gradient.addColorStop(0.5, `rgba(245, 239, 230, ${p.opacity * 0.5})`);
        gradient.addColorStop(1, `rgba(245, 239, 230, 0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  if (typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
