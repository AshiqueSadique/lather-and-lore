"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const STORY_PARAGRAPHS = [
  "I grew up watching my grandmother make soap every autumn in her stone kitchen near Apt. She never measured anything. She knew the olive oil by its colour, the lye by its feel, the lavender by the hour she'd cut it.",
  "When I left for the city, I carried that memory in my hands. Fifteen years in a perfume laboratory gave me the science. But the soul — the soul came from her.",
  "Lather & Lore began with twelve bars and a borrowed mould. It is now the work of seven artisans, two farms, and one unwavering commitment: never let efficiency replace care.",
  "Every bar we make asks one question of itself before it leaves our hands — does this deserve to exist?",
];

function FadeInLine({ text, delay }: { text: string; delay: number }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.23, 1, 0.32, 1] }}
      className="font-serif text-lg md:text-xl text-charcoal/80 leading-relaxed mb-6"
    >
      {text}
    </motion.p>
  );
}

export default function FounderStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax: image moves at 60% scroll speed relative to section
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      ref={sectionRef}
      id="story"
      className="relative py-section bg-cream px-8 md:px-16 overflow-hidden"
      aria-label="Founder's story"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
        {/* ── Left: photo with parallax ── */}
        <div
          ref={imageRef}
          className="relative overflow-hidden"
          style={{
            aspectRatio: "3/4",
            borderRadius: "50% 50% 40% 60% / 40% 40% 60% 60%",
          }}
          aria-hidden="false"
        >
          <motion.div
            className="absolute inset-0 w-full h-[120%] top-[-10%]"
            style={{ y: imageY }}
          >
            <Image
              src="https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=800&q=80"
              alt="Founder of Lather & Lore crafting soap in her atelier"
              fill
              className="object-cover grayscale"
              sizes="(max-width: 768px) 90vw, 40vw"
              priority={false}
            />
          </motion.div>

          {/* Warm sepia tint */}
          <div
            className="absolute inset-0 mix-blend-multiply opacity-30"
            style={{ backgroundColor: "#B8956A" }}
            aria-hidden="true"
          />

          {/* Name caption */}
          <div className="absolute bottom-6 left-6 right-6 bg-cream/80 backdrop-blur-xs px-4 py-3">
            <p className="font-serif text-base text-charcoal">Élise Bonnard</p>
            <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-charcoal/50">
              Founder · Master Soap-maker
            </p>
          </div>
        </div>

        {/* ── Right: story text ── */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-3 mb-6"
          >
            <span
              className="block w-10 h-px bg-terracotta"
              aria-hidden="true"
            />
            <span className="font-sans text-xs tracking-[0.3em] uppercase text-terracotta">
              Our Origin
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-display-md text-charcoal leading-none mb-10"
          >
            Rooted in<br />
            <em>grandmother&apos;s hands.</em>
          </motion.h2>

          {STORY_PARAGRAPHS.map((text, i) => (
            <FadeInLine key={i} text={text} delay={i * 0.12} />
          ))}

          {/* Signature */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-8 flex items-center gap-4"
          >
            <div>
              {/* Handwriting-style SVG signature */}
              <svg viewBox="0 0 180 50" className="w-36 h-10 overflow-visible" aria-label="Élise Bonnard signature">
                <path
                  d="M10 35 C20 20, 35 15, 45 28 C55 40, 50 45, 60 30 C70 15, 80 22, 90 35 C100 46, 110 20, 130 30 C145 38, 155 25, 170 28"
                  fill="none"
                  stroke="#1C1A17"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  pathLength="1"
                  className="animate-[drawPath_2s_ease-out_1s_forwards]"
                  style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
                />
              </svg>
              <style>{`
                @keyframes drawPath {
                  from { stroke-dashoffset: 1; }
                  to { stroke-dashoffset: 0; }
                }
              `}</style>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
