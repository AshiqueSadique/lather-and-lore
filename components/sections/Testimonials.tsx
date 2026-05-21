"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const TESTIMONIALS = [
  {
    quote:
      "I have tried soaps from every apothecary from Paris to Portland. Nothing has ever felt like this. It is not soap — it is a sacrament.",
    author: "Margot L.",
    location: "Lyon, France",
    product: "Provençal Bloom",
  },
  {
    quote:
      "My skin has never felt this alive. After one week with the Charcoal bar, my dermatologist asked what I had changed. I told him: everything.",
    author: "James H.",
    location: "London, UK",
    product: "Midnight Charcoal",
  },
  {
    quote:
      "The packaging alone moved me to tears — but the scent, the lather, the way it leaves my hands feeling. This is what luxury should feel like.",
    author: "Aiko M.",
    location: "Kyoto, Japan",
    product: "Rose & Clay",
  },
];

function TypewriterQuote({ text, inView }: { text: string; inView: boolean }) {
  return (
    <p
      className="font-serif text-xl md:text-2xl text-charcoal leading-relaxed italic"
      aria-label={text}
    >
      {text.split(" ").map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.06, delay: i * 0.06 }}
          className="inline-block mr-[0.35em]"
          aria-hidden="true"
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
}

function TestimonialCard({ testimonial, index }: { testimonial: (typeof TESTIMONIALS)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        ease: [0.23, 1, 0.32, 1],
      }}
      className="relative py-12 px-8 md:px-12"
      role="article"
      aria-label={`Testimonial from ${testimonial.author}`}
    >
      {/* Giant opening quote mark */}
      <motion.span
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
        animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.2 + 0.1, ease: "backOut" }}
        className="absolute top-6 left-6 font-serif text-[6rem] leading-none text-terracotta/20 select-none"
      >
        &ldquo;
      </motion.span>

      {/* Quote text — typewriter reveal */}
      <div className="relative mt-8 mb-6">
        <TypewriterQuote text={testimonial.quote} inView={inView} />
      </div>

      {/* Attribution */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
        className="flex items-center gap-4"
      >
        <div
          className="w-8 h-px bg-terracotta"
          aria-hidden="true"
        />
        <div>
          <p className="font-sans text-sm font-medium text-charcoal">
            {testimonial.author}
          </p>
          <p className="font-sans text-xs text-charcoal/40">
            {testimonial.location} · <em>{testimonial.product}</em>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Testimonials() {
  return (
    <section
      className="relative py-section bg-[#EDE4D7] px-8 md:px-16 overflow-hidden"
      aria-label="Customer testimonials"
    >
      {/* Background large italic text */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
      >
        <span
          className="font-serif text-[12vw] italic text-charcoal/[0.025] whitespace-nowrap"
        >
          &ldquo;Pure luxury for the skin&rdquo;
        </span>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Section heading */}
        <div className="text-center mb-16">
          <p className="font-sans text-xs tracking-[0.4em] uppercase text-terracotta mb-3">
            From Our Community
          </p>
          <h2 className="font-serif text-display-md text-charcoal">
            Words that lather.
          </h2>
        </div>

        {/* Testimonial grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-charcoal/10"
          role="list"
        >
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.author} testimonial={t} index={i} />
          ))}
        </div>

        {/* Star rating decoration */}
        <div
          className="mt-12 flex justify-center items-center gap-2"
          aria-label="Rated 5 stars"
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, type: "spring", stiffness: 300 }}
              aria-hidden="true"
              className="text-terracotta text-lg"
            >
              ★
            </motion.span>
          ))}
          <span className="ml-2 font-sans text-xs text-charcoal/40 tracking-wide">
            4.97 / 5 — from 1,240 reviews
          </span>
        </div>
      </div>
    </section>
  );
}
