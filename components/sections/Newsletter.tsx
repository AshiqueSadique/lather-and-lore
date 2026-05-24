"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function SudsBubbles({ inView }: { inView: boolean }) {
  const bubbles = [
    { cx: "8%",  r: 28, delay: 0,   duration: 4.2 },
    { cx: "18%", r: 18, delay: 0.4, duration: 3.8 },
    { cx: "28%", r: 35, delay: 0.8, duration: 4.6 },
    { cx: "40%", r: 22, delay: 0.2, duration: 5.0 },
    { cx: "52%", r: 16, delay: 1.0, duration: 3.6 },
    { cx: "62%", r: 30, delay: 0.6, duration: 4.4 },
    { cx: "74%", r: 20, delay: 0.3, duration: 3.9 },
    { cx: "85%", r: 26, delay: 0.9, duration: 4.8 },
    { cx: "92%", r: 14, delay: 1.2, duration: 3.5 },
  ];

  return (
    <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-48 md:h-64 pointer-events-none overflow-hidden">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
        {bubbles.map((b, i) => (
          <motion.circle
            key={i}
            cx={b.cx}
            r={b.r * 0.08}
            fill="none"
            stroke="rgba(201,123,92,0.25)"
            strokeWidth="0.3"
            initial={{ cy: 100, opacity: 0 }}
            animate={inView ? { cy: [100, 85, 70, 55, 40, 20, 0], opacity: [0, 0.6, 0.8, 0.7, 0.5, 0.3, 0] } : {}}
            transition={{ duration: b.duration, delay: b.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </svg>

      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="absolute bottom-0 w-full" style={{ height: "60px" }}>
        <motion.path
          d="M0,60 C60,40 120,70 180,55 C240,40 300,65 360,50 C420,35 480,60 540,48 C600,35 660,58 720,45 C780,32 840,55 900,42 C960,30 1020,52 1080,40 C1140,28 1200,50 1260,38 C1320,26 1380,48 1440,35 L1440,80 L0,80 Z"
          fill="rgba(245,239,230,0.5)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
    </div>
  );
}

export default function Newsletter() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");
  const [focused, setFocused] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-section overflow-hidden"
      style={{ backgroundColor: "#3D4A2A" }}
      aria-label="Newsletter sign-up"
    >
      <SudsBubbles inView={inView} />

      <div className="relative z-10 max-w-2xl mx-auto text-center px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-sans text-xs tracking-[0.4em] uppercase text-terracotta mb-4">
            The Inner Sanctum
          </p>
          <h2
            className="font-serif text-cream mb-4 leading-tight"
            style={{ fontSize: "clamp(2rem, 8vw, 3.5rem)" }}
          >
            Slow letters for<br />
            <em>slow mornings.</em>
          </h2>
          <p className="font-sans text-sm text-cream/50 mb-8 md:mb-10 max-w-sm mx-auto leading-relaxed">
            Join our private list for early access to new batches, seasonal botanicals, and notes from the atelier.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-8"
            >
              <p className="font-serif text-2xl text-cream mb-2">Welcome to the fold.</p>
              <p className="font-sans text-sm text-cream/50">Your first letter arrives with the next batch.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="relative" noValidate aria-label="Email sign-up form">
              <div className="relative">
                <label
                  htmlFor="newsletter-email"
                  className={`absolute left-0 font-sans text-sm transition-all duration-300 pointer-events-none ${
                    focused || email
                      ? "-top-6 text-xs tracking-[0.2em] uppercase text-terracotta"
                      : "top-3 text-cream/40"
                  }`}
                >
                  Your email address
                </label>

                <div
                  className="flex items-end gap-0 border-b-2 transition-colors duration-400"
                  style={{ borderColor: focused ? "#C97B5C" : "rgba(245,239,230,0.2)" }}
                >
                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className="flex-1 bg-transparent pt-3 pb-3 font-sans text-base text-cream outline-none placeholder-transparent min-h-0"
                    placeholder="Your email address"
                    autoComplete="email"
                    inputMode="email"
                    aria-required="true"
                    aria-describedby={error ? "newsletter-error" : undefined}
                    aria-invalid={!!error}
                    style={{ minHeight: "unset", minWidth: "unset" }}
                  />

                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-terracotta"
                    initial={{ width: "0%" }}
                    animate={{ width: focused ? "100%" : "0%" }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    aria-hidden="true"
                  />

                  <button
                    type="submit"
                    className="pb-3 font-sans text-xs tracking-[0.25em] uppercase text-terracotta hover:text-cream transition-colors duration-300 whitespace-nowrap pl-4"
                    data-cursor-hover="true"
                    aria-label="Subscribe to newsletter"
                    style={{ minHeight: "unset", minWidth: "unset" }}
                  >
                    Join →
                  </button>
                </div>
              </div>

              {error && (
                <motion.p
                  id="newsletter-error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-3 font-sans text-xs text-red-300 text-left"
                  role="alert"
                >
                  {error}
                </motion.p>
              )}

              <p className="mt-5 md:mt-6 font-sans text-[10px] text-cream/25 tracking-wide">
                No spam. Unsubscribe at any time. We treat your inbox like our bars — with care.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
