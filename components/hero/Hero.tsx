"use client";

import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import SteamParticles from "./SteamParticles";

gsap.registerPlugin(ScrollTrigger);

const SoapModel = lazy(() => import("./SoapModel"));

const HEADLINE_LINES = ["Bathed", "in", "Botany."];
const SUBTEXT =
  "Small-batch soaps, hand-poured in the south of France. Each bar a love letter to the earth.";
const NAV_LINKS = ["Collection", "Process", "Story", "Journal"];

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
      delay,
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

// ── Mobile nav overlay ──────────────────────────────────────────────────────
function MobileNav({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  // Lock body scroll while open
  useEffect(() => {
    if (open) {
      document.documentElement.classList.add("mobile-nav-open");
    } else {
      document.documentElement.classList.remove("mobile-nav-open");
    }
    return () => document.documentElement.classList.remove("mobile-nav-open");
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9000] flex flex-col"
          style={{ backgroundColor: "#1C1A17" }}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          {/* Close bar */}
          <div className="flex items-center justify-between px-6 pt-8 pb-6 border-b border-cream/10 safe-top">
            <span className="font-serif text-xl tracking-[0.2em] text-cream">L&amp;L</span>
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="w-11 h-11 flex items-center justify-center text-cream/60 hover:text-cream transition-colors"
            >
              <X size={22} />
            </button>
          </div>

          {/* Links */}
          <nav className="flex-1 flex flex-col justify-center px-8 gap-1" aria-label="Main navigation">
            {NAV_LINKS.map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.1 + i * 0.07 }}
                onClick={onClose}
                className="font-serif py-4 border-b border-cream/8 text-cream/80 hover:text-cream transition-colors"
                style={{ fontSize: "clamp(2rem, 8vw, 3rem)", lineHeight: "1.1", display: "flex", alignItems: "center", minHeight: "unset" }}
              >
                {item}
              </motion.a>
            ))}
          </nav>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="px-8 pb-10 safe-bottom"
          >
            <a
              href="#collection"
              onClick={onClose}
              className="block w-full text-center font-sans text-xs tracking-[0.2em] uppercase px-8 py-4 bg-terracotta text-cream"
              style={{ minHeight: "unset" }}
            >
              Shop the Collection
            </a>
            <p className="mt-4 font-sans text-[11px] tracking-[0.3em] uppercase text-cream/25 text-center">
              Artisan Soap · Est. 2018
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [normalizedMouse, setNormalizedMouse] = useState({ x: 0, y: 0 });
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const stRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setNormalizedMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  useEffect(() => {
    const hint = scrollHintRef.current;
    if (!hint) return;
    stRef.current = ScrollTrigger.create({
      trigger: heroRef.current,
      start: "top top",
      end: "30% top",
      onUpdate: (self) => gsap.set(hint, { opacity: 1 - self.progress * 2.5 }),
    });
    return () => {
      stRef.current?.kill();
    };
  }, []);

  useEffect(() => {
    const sub = subtextRef.current;
    const cta = ctaRef.current;
    if (!sub || !cta) return;
    gsap.fromTo(sub, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 1.6 });
    gsap.fromTo(cta, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1.0, ease: "power3.out", delay: 2.0 });
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative w-full flex flex-col overflow-hidden bg-cream"
      style={{ minHeight: "100svh" }}
      aria-label="Hero — Lather & Lore"
    >
      <SteamParticles />

      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 60%, transparent 40%, rgba(28,26,23,0.18) 100%)" }}
      />

      {/* ── Navigation ─────────────────────────────────────────────────── */}
      <header className="relative z-20 flex items-center justify-between px-5 md:px-16 pt-6 md:pt-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-xl tracking-[0.2em] text-charcoal"
          style={{ minHeight: "unset", minWidth: "unset" }}
        >
          L&amp;L
        </motion.div>

        {/* Desktop nav */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hidden md:flex items-center gap-10"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="font-sans text-xs tracking-[0.2em] uppercase text-charcoal/70 hover:text-terracotta transition-colors duration-300"
              style={{ minHeight: "unset", minWidth: "unset" }}
            >
              {item}
            </a>
          ))}
        </motion.nav>

        <div className="flex items-center gap-3">
          {/* Desktop shop CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden md:block"
          >
            <a
              href="#collection"
              className="font-sans text-xs tracking-[0.2em] uppercase px-6 py-3 border border-charcoal/30 text-charcoal hover:bg-olive hover:text-cream hover:border-olive transition-all duration-400"
              style={{ minHeight: "unset" }}
            >
              Shop
            </a>
          </motion.div>

          {/* Mobile hamburger */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            onClick={() => setMobileNavOpen(true)}
            aria-label="Open menu"
            className="md:hidden w-11 h-11 flex items-center justify-center text-charcoal"
          >
            <Menu size={22} />
          </motion.button>
        </div>
      </header>

      <MobileNav open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />

      {/* ── Main layout ────────────────────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex flex-col md:flex-row items-center px-5 md:px-16 pt-6 md:pt-8 pb-8 md:pb-12 gap-6 md:gap-8">
        {/* Left: headline + meta */}
        <div className="flex-1 flex flex-col justify-center max-w-2xl w-full">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center gap-3 mb-6 md:mb-8"
          >
            <span aria-hidden="true" className="block w-10 md:w-12 h-px bg-terracotta" />
            <span className="font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase text-terracotta">
              Artisan Soap · Est. 2018
            </span>
          </motion.div>

          <h1
            className="font-serif text-charcoal leading-none mb-5 md:mb-6 select-none"
            style={{ fontSize: "clamp(3.5rem, 14vw, 10rem)" }}
            aria-label={HEADLINE_LINES.join(" ")}
          >
            {HEADLINE_LINES.map((line, i) => (
              <SplitHeadline key={line} line={line} delay={0.5 + i * 0.22} />
            ))}
          </h1>

          <p
            ref={subtextRef}
            className="font-sans text-sm md:text-base lg:text-lg text-charcoal/65 max-w-xs md:max-w-sm leading-relaxed opacity-0 mb-8 md:mb-10"
          >
            {SUBTEXT}
          </p>

          <div ref={ctaRef} className="flex flex-wrap items-center gap-4 md:gap-5 opacity-0">
            <a
              href="#collection"
              className="group relative overflow-hidden inline-flex items-center gap-3 font-sans text-xs tracking-[0.2em] uppercase px-7 md:px-8 py-4 bg-olive text-cream border border-olive transition-colors duration-500"
              data-cursor-hover="true"
              style={{ minHeight: "unset" }}
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-terracotta origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.87,0,0.13,1)]"
              />
              <span className="relative z-10">Explore Collection</span>
              <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">→</span>
            </a>
            <a
              href="#process"
              className="font-sans text-xs tracking-[0.2em] uppercase text-charcoal/60 hover:text-charcoal transition-colors duration-300 underline underline-offset-4 decoration-terracotta/50"
              data-cursor-hover="true"
              style={{ minHeight: "unset" }}
            >
              Our Process
            </a>
          </div>
        </div>

        {/* Right: 3D soap model */}
        <div
          className="w-full md:flex-1 flex items-center justify-center relative"
          style={{ minHeight: "min(55vw, 420px)" }}
        >
          {/* Glow circle */}
          <div
            aria-hidden="true"
            className="absolute rounded-full opacity-20"
            style={{
              width: "min(70vw, 22rem)",
              height: "min(70vw, 22rem)",
              background: "radial-gradient(circle, #C97B5C 0%, #E8D5C4 50%, transparent 70%)",
              transform: `translate(${normalizedMouse.x * -8}px, ${normalizedMouse.y * -8}px)`,
              transition: "transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)",
            }}
          />

          {/* Floor shadow */}
          <div
            aria-hidden="true"
            className="absolute bottom-4 w-48 h-6 opacity-20"
            style={{
              background: "radial-gradient(ellipse, #3D4A2A 0%, transparent 70%)",
              filter: "blur(12px)",
            }}
          />

          {/* Mobile SVG fallback */}
          <div
            className="md:hidden w-full flex items-center justify-center"
            role="img"
            aria-label="Lather & Lore handmade soap bar"
          >
            <svg viewBox="0 0 320 170" className="w-full max-w-xs opacity-90" aria-hidden="true">
              <defs>
                <linearGradient id="soapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D4B896" />
                  <stop offset="100%" stopColor="#B8946A" />
                </linearGradient>
                <filter id="softShadow">
                  <feDropShadow dx="0" dy="10" stdDeviation="16" floodOpacity="0.18" />
                </filter>
              </defs>
              <rect x="24" y="32" width="272" height="106" rx="16" fill="url(#soapGrad)" filter="url(#softShadow)" />
              <ellipse cx="160" cy="85" rx="100" ry="34" fill="none" stroke="#7a5c3a" strokeWidth="1.5" opacity="0.5" />
              <text x="160" y="77" fontFamily="Georgia,serif" fontSize="15" fill="#4a3520" textAnchor="middle" fontWeight="bold">LATHER</text>
              <text x="160" y="97" fontFamily="Georgia,serif" fontSize="15" fill="#4a3520" textAnchor="middle" fontWeight="bold">&amp; LORE</text>
              <line x1="120" y1="106" x2="200" y2="106" stroke="#7a5c3a" strokeWidth="1" opacity="0.4" />
            </svg>
          </div>

          {/* Desktop Three.js canvas */}
          <div
            className="hidden md:block w-full h-full"
            style={{ minHeight: "380px" }}
            role="img"
            aria-label="3D rotating handmade soap bar with Lather & Lore embossing"
          >
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

      {/* ── Tagline marquee — in flow, never overlaps content ──────────── */}
      <div
        aria-hidden="true"
        className="relative z-10 w-full overflow-hidden border-t border-b border-charcoal/8 py-2.5 opacity-40 pointer-events-none"
      >
        <div
          className="flex whitespace-nowrap"
          style={{ animation: "marquee 20s linear infinite" }}
        >
          {[...Array(4)]
            .flatMap(() => ["Small-Batch Crafted", "·", "Botanical Purity", "·", "Slow Luxury", "·", "Hand-Poured", "·"])
            .map((item, i) => (
              <span
                key={i}
                className="font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase text-charcoal/60 mx-4 md:mx-6"
              >
                {item}
              </span>
            ))}
        </div>
      </div>

      {/* ── Scroll hint + wave footer ─────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center justify-end pb-3 pt-4" style={{ minHeight: "56px" }}>
        <div
          ref={scrollHintRef}
          className="flex flex-col items-center gap-1.5 pointer-events-none"
          aria-label="Scroll to explore"
        >
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-charcoal/40">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={15} className="text-charcoal/40" />
          </motion.div>
        </div>
      </div>

      {/* ── Wave divider ─────────────────────────────────────────────── */}
      <div aria-hidden="true" className="absolute bottom-0 left-0 right-0 pointer-events-none">
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
