"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const STAGES = [
  {
    number: "01",
    title: "Source",
    headline: "Gathered from\nthe Earth.",
    body: "Each botanical is sourced directly from certified organic farms across Provence, Tuscany, and the Atlas Mountains. We visit every supplier. We know every field.",
    ingredients: ["Wild Lavender", "Raw Oat", "Alpine Clay", "Rosehip Oil"],
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800&q=80",
    imageAlt: "Hands holding fresh lavender bundles",
    color: "#5A8C60",
  },
  {
    number: "02",
    title: "Blend",
    headline: "Chemistry\nmeets intuition.",
    body: "Our master soap-maker combines cold-process lye with a blend of oils chosen for their precise saponification values. Every batch is hand-calculated, never rushed.",
    ingredients: ["Shea Butter", "Coconut Oil", "Castor Oil", "Essential Oils"],
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&q=80",
    imageAlt: "Artisan measuring botanical oils",
    color: "#C97B5C",
  },
  {
    number: "03",
    title: "Pour",
    headline: "Colour flows\nlike watercolour.",
    body: "The traced soap is poured in layers into hand-carved wooden moulds. Natural pigments — French clay, activated charcoal, turmeric — swirl into each bar's unique pattern.",
    ingredients: ["French Clay", "Turmeric", "Indigo", "Activated Charcoal"],
    image: "https://images.unsplash.com/photo-1600857062241-98e5dba7f45e?w=800&q=80",
    imageAlt: "Soap being poured into wooden mould",
    color: "#7B6D8D",
  },
  {
    number: "04",
    title: "Cure",
    headline: "Patience\nmakes perfect.",
    body: "Each loaf rests for 6 to 8 weeks on open-air wooden racks in our curing room. The slow saponification deepens the lather, hardens the bar, and matures the scent profile.",
    ingredients: ["Time", "Airflow", "Darkness", "Stillness"],
    image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800&q=80",
    imageAlt: "Rows of soap curing on wooden shelves",
    color: "#B8956A",
  },
  {
    number: "05",
    title: "Wrap",
    headline: "Wrapped with\ncare and ink.",
    body: "Every bar is hand-stamped and wrapped in recycled kraft paper printed with botanical line art. Zero plastic. Zero waste. Tied with undyed linen twine.",
    ingredients: ["Kraft Paper", "Linen Twine", "Botanical Ink", "Beeswax Seal"],
    image: "https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=800&q=80",
    imageAlt: "Artisan wrapping soap bar in kraft paper",
    color: "#3D4A2A",
  },
];

export default function TheProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const animatingRef = useRef(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const section = sectionRef.current;
    const trigger = triggerRef.current;
    if (!section || !trigger) return;

    const totalStages = STAGES.length;

    ScrollTrigger.create({
      trigger: trigger,
      start: "top top",
      end: `+=${totalStages * 120}%`,
      pin: true,
      scrub: 0.5,
      onUpdate: (self) => {
        const newStage = Math.min(
          Math.floor(self.progress * totalStages),
          totalStages - 1
        );
        if (newStage !== countRef.current) {
          countRef.current = newStage;
          setActiveStage(newStage);
          // Animate counter
          gsap.to(
            { val: countRef.current === 0 ? 0 : (newStage - 1) * 20 },
            {
              val: newStage * 20,
              duration: 0.6,
              ease: "power2.out",
              onUpdate: function () {
                setCount(Math.round(this.targets()[0].val));
              },
            }
          );
        }
      },
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  const stage = STAGES[activeStage];

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative bg-cream"
      aria-label="Our soap-making process"
    >
      <div ref={triggerRef} className="relative w-full h-screen overflow-hidden">
        {/* Background color accent that changes per stage */}
        <div
          className="absolute inset-0 opacity-5 transition-colors duration-700"
          style={{ backgroundColor: stage.color }}
          aria-hidden="true"
        />

        {/* Section header */}
        <div className="absolute top-12 left-8 md:left-16 z-10">
          <p className="font-sans text-xs tracking-[0.4em] uppercase text-terracotta mb-1">
            The Craft
          </p>
          <h2 className="font-serif text-display-md text-charcoal">How We Make Them</h2>
        </div>

        {/* Stage number indicator — right side */}
        <div
          className="absolute top-12 right-8 md:right-16 z-10 text-right"
          aria-live="polite"
          aria-atomic="true"
        >
          <span className="font-serif text-[8rem] leading-none text-charcoal/6 select-none">
            {stage.number}
          </span>
        </div>

        {/* Progress dots */}
        <div
          className="absolute left-8 md:left-16 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10"
          role="tablist"
          aria-label="Process stages"
        >
          {STAGES.map((s, i) => (
            <div
              key={s.title}
              role="tab"
              aria-selected={i === activeStage}
              aria-label={`Stage ${i + 1}: ${s.title}`}
              className="flex items-center gap-3 group"
            >
              <div
                className="h-px transition-all duration-500"
                style={{
                  width: i === activeStage ? "32px" : "12px",
                  backgroundColor: i === activeStage ? stage.color : "#1C1A1730",
                }}
              />
              {i === activeStage && (
                <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-charcoal/50">
                  {s.title}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Main content — image + text */}
        <div className="absolute inset-0 flex items-center justify-center pt-24 pb-8 px-8 md:px-24">
          <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative order-2 md:order-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStage}
                  initial={{ opacity: 0, scale: 0.96, x: -20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 1.04, x: 20 }}
                  transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                  className="relative aspect-[4/3] overflow-hidden"
                  style={{ borderRadius: "60% 40% 55% 45% / 45% 55% 45% 55%" }}
                >
                  <Image
                    src={stage.image}
                    alt={stage.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 90vw, 45vw"
                  />
                  {/* Warm tint overlay */}
                  <div
                    className="absolute inset-0 opacity-20 mix-blend-multiply"
                    style={{ backgroundColor: stage.color }}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Floating ingredient tags */}
              <AnimatePresence>
                {stage.ingredients.slice(0, 2).map((ing, i) => (
                  <motion.div
                    key={`${activeStage}-${ing}`}
                    initial={{ opacity: 0, x: i === 0 ? -40 : 40, y: 10 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                    className="absolute bg-cream/90 backdrop-blur-sm px-4 py-2 shadow-sm"
                    style={{
                      borderRadius: "2px",
                      top: i === 0 ? "-16px" : undefined,
                      bottom: i === 1 ? "-16px" : undefined,
                      left: i === 0 ? "10%" : undefined,
                      right: i === 1 ? "10%" : undefined,
                    }}
                  >
                    <span className="font-sans text-[11px] tracking-[0.2em] uppercase text-charcoal/70">
                      {ing}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Text */}
            <div className="order-1 md:order-2 pl-0 md:pl-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStage}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                >
                  <h3
                    className="font-serif text-display-md text-charcoal mb-6 whitespace-pre-line"
                    style={{ lineHeight: "1.05" }}
                  >
                    {stage.headline}
                  </h3>

                  <p className="font-sans text-base text-charcoal/65 leading-relaxed mb-8 max-w-sm">
                    {stage.body}
                  </p>

                  {/* Ingredient list */}
                  <div className="flex flex-wrap gap-2">
                    {stage.ingredients.map((ing) => (
                      <span
                        key={ing}
                        className="font-sans text-[11px] tracking-[0.15em] uppercase px-3 py-1.5 border text-charcoal/60"
                        style={{ borderColor: `${stage.color}40`, borderRadius: "2px" }}
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Bottom scroll prompt */}
        <div className="absolute bottom-8 right-8 md:right-16 text-right">
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-charcoal/30">
            Scroll to continue
          </span>
        </div>
      </div>
    </section>
  );
}
