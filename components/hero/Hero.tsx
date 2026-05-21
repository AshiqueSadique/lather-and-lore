"use client";

import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SteamParticles from "./SteamParticles";

gsap.registerPlugin(ScrollTrigger);

// Lazy-load the heavy Three.js scene
const SoapModel = lazy(() => import("./SoapModel"));

const HEADLINE_LINES = ["Bathed", "in", "Botany."];
const SUBTEXT =
  "Small-batch soaps, hand-poured in the south of France. Each bar a love letter to the earth.";

// Splits a string into individual letter <span> elements for GSAP animation
function SplitHeadline({ line, delay }: { line: string; delay: number }) {
  const lineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;

    const letters = el.querySelectorAll<HTMLSpanElement>(".split-letter");

    gsap.set(letters, { clipPath: "inset(0 0 100% 0)", y: 30, opacity: 0 });

    gsap.to(letters, {
      clipPath: "inset(0 0 0% 0)",
      y: 0,
      opacity: 1,
      duration: 1.1,
      ease: "power4.out",
      stagger: 0.04,
      delay: delay,
    });
  }, [delay]);

  return (
    <span ref={lineRef} className="block overflow-hidden leading-none">
      {[...line].map((char, i) => (
        <span
          key={i}
          className="split-letter"
          aria-hidden="true"
          style={{ marginRight: char === " " ? "0.25em" : undefined }}
        >
          {char === " " ? " " : char}
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const [normalizedMouse, setNormalizedMouse] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  // Mouse parallax tracking
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      mousePos.current = { x, y };
      setNormalizedMouse({ x, y });
    };

    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  // Scroll hint fade on scroll
  useEffect(() => {
    const hint = scrollHintRef.current;
    if (!hint) return;

    ScrollTrigger.create({
      trigger: heroRef.current,
      start: "top top",
      end: "30% top",
      onUpdate: (self) => {
        gsap.set(hint, { opacity: 1 - self.progress * 2.5 });
      },
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  // Subtext and CTA animate in after headline
  useEffect(() => {
    const sub = subtextRef.current;
    const cta = ctaRef.current;
    if (!sub || !cta) return;

    gsap.fromTo(
      sub,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 1.6 }
    );

    gsap.fromTo(
      cta,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.0, ease: "power3.out", delay: 2.0 }
    );

    setIsLoaded(true);
  }, []);

  // Decorative tagline marquee strip above headline
  const taglineItems = [
    "Small-Batch Crafted",
    "·",
    "Botanical Purity",
    "·",
    "Slow Luxury",
    "·",
    "Hand-Poured",
    "·",
  ];

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative w-full min-h-screen flex flex-col overflow-hidden bg-cream"
      aria-label="Hero — Lather & Lore"
    >
      {/* Steam / mist particles */}
      <SteamParticles />

      {/* Fine paper-warm vignette */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 60%, transparent 40%, rgba(28,26,23,0.18) 100%)",
        }}
      />

      {/* Top navigation bar */}
      <header className="relative z-20 flex items-center justify-between px-8 md:px-16 pt-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-xl tracking-[0.2em] text-charcoal"
        >
          L&amp;L
        </motion.div>

        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hidden md:flex items-center gap-10"
          aria-label="Main navigation"
        >
          {["Collection", "Process", "Story", "Journal"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="font-sans text-xs tracking-[0.2em] uppercase text-charcoal/70 hover:text-terracotta transition-colors duration-300"
            >
              {item}
            </a>
          ))}
        </motion.nav>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <a
            href="#collection"
            className="font-sans text-xs tracking-[0.2em] uppercase px-6 py-3 border border-charcoal/30 text-charcoal hover:bg-olive hover:text-cream hover:border-olive transition-all duration-400"
          >
            Shop
          </a>
        </motion.div>
      </header>

      {/* Main hero layout: text left, 3D model right */}
      <div className="relative z-10 flex-1 flex flex-col md:flex-row items-center px-8 md:px-16 pt-8 pb-20 gap-8">
        {/* ── Left column: headline + meta ── */}
        <div className="flex-1 flex flex-col justify-center max-w-2xl">
          {/* Small decorative tagline */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center gap-3 mb-8"
          >
            <span
              aria-hidden="true"
              className="block w-12 h-px bg-terracotta"
            />
            <span className="font-sans text-xs tracking-[0.3em] uppercase text-terracotta">
              Artisan Soap · Est. 2018
            </span>
          </motion.div>

          {/* Giant serif headline — GSAP letter-by-letter reveal */}
          <h1
            className="font-serif text-display-xl text-charcoal leading-none mb-6 select-none"
            aria-label={HEADLINE_LINES.join(" ")}
          >
            {HEADLINE_LINES.map((line, i) => (
              <SplitHeadline key={line} line={line} delay={0.5 + i * 0.22} />
            ))}
          </h1>

          {/* Subtext */}
          <p
            ref={subtextRef}
            className="font-sans text-base md:text-lg text-charcoal/65 max-w-sm leading-relaxed opacity-0 mb-10"
          >
            {SUBTEXT}
          </p>

          {/* CTA buttons */}
          <div ref={ctaRef} className="flex flex-wrap items-center gap-5 opacity-0">
            <a
              href="#collection"
              className="group relative overflow-hidden inline-flex items-center gap-3 font-sans text-xs tracking-[0.2em] uppercase px-8 py-4 bg-olive text-cream border border-olive transition-colors duration-500"
              data-cursor-hover="true"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-terracotta origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.87,0,0.13,1)]"
              />
              <span className="relative z-10">Explore Collection</span>
              <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </a>

            <a
              href="#process"
              className="font-sans text-xs tracking-[0.2em] uppercase text-charcoal/60 hover:text-charcoal transition-colors duration-300 underline underline-offset-4 decoration-terracotta/50"
              data-cursor-hover="true"
            >
              Our Process
            </a>
          </div>
        </div>

        {/* ── Right column: 3D Soap Model ── */}
        <div
          className="flex-1 relative flex items-center justify-center"
          style={{ minHeight: "420px", maxWidth: "580px" }}
        >
          {/* Decorative circle behind model */}
          <div
            aria-hidden="true"
            className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full opacity-20"
            style={{
              background:
                "radial-gradient(circle, #C97B5C 0%, #E8D5C4 50%, transparent 70%)",
              transform: `translate(${normalizedMouse.x * -8}px, ${normalizedMouse.y * -8}px)`,
              transition: "transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)",
            }}
          />

          {/* Soft ellipse shadow on the floor */}
          <div
            aria-hidden="true"
            className="absolute bottom-8 w-56 h-8 opacity-20"
            style={{
              background: "radial-gradient(ellipse, #3D4A2A 0%, transparent 70%)",
              filter: "blur(12px)",
            }}
          />

          {/* 3D Scene — lazy loaded, degrades to static on mobile */}
          <div
            className="w-full h-full"
            style={{ minHeight: "380px" }}
            role="img"
            aria-label="3D rotating handmade soap bar with Lather & Lore embossing"
          >
            {/* Mobile fallback image */}
            <div
              className="md:hidden w-full h-64 flex items-center justify-center"
              aria-hidden="true"
            >
              {/* SVG soap illustration as mobile fallback */}
              <svg viewBox="0 0 300 160" className="w-72 opacity-90" aria-hidden="true">
                <defs>
                  <linearGradient id="soapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#D4B896" />
                    <stop offset="100%" stopColor="#B8946A" />
                  </linearGradient>
                  <filter id="softShadow">
                    <feDropShadow dx="0" dy="8" stdDeviation="12" floodOpacity="0.2" />
                  </filter>
                </defs>
                <rect
                  x="20"
                  y="30"
                  width="260"
                  height="100"
                  rx="14"
                  fill="url(#soapGrad)"
                  filter="url(#softShadow)"
                />
                <ellipse cx="150" cy="80" rx="95" ry="32" fill="none" stroke="#7a5c3a" strokeWidth="1.5" opacity="0.6" />
                <text x="150" y="72" fontFamily="Georgia" fontSize="14" fill="#4a3520" textAnchor="middle" fontWeight="bold">LATHER</text>
                <text x="150" y="92" fontFamily="Georgia" fontSize="14" fill="#4a3520" textAnchor="middle" fontWeight="bold">&amp; LORE</text>
              </svg>
            </div>

            {/* Three.js canvas — desktop only */}
            <div className="hidden md:block w-full h-full" style={{ minHeight: "420px" }}>
              <Suspense
                fallback={
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full border border-terracotta/30 animate-pulse" />
                  </div>
                }
              >
                <SoapModel mousePos={normalizedMouse} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>

      {/* ── Decorative rotating marquee strip ── */}
      <div
        aria-hidden="true"
        className="absolute bottom-24 left-0 right-0 overflow-hidden border-t border-b border-charcoal/8 py-3 opacity-40"
      >
        <div
          className="flex whitespace-nowrap"
          style={{ animation: "marquee 20s linear infinite" }}
        >
          {[...Array(4)].flatMap(() => taglineItems).map((item, i) => (
            <span
              key={i}
              className="font-sans text-xs tracking-[0.3em] uppercase text-charcoal/60 mx-6"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── Scroll hint ── */}
      <div
        ref={scrollHintRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        aria-label="Scroll to explore"
      >
        <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-charcoal/40">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={16} className="text-charcoal/40" />
        </motion.div>
      </div>

      {/* ── Bottom wave divider ── */}
      <div aria-hidden="true" className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          className="w-full"
          style={{ display: "block", height: "60px" }}
        >
          <path
            d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z"
            fill="#EDE4D7"
          />
        </svg>
      </div>
    </section>
  );
}
