"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useIsMobile } from "@/lib/hooks/useMediaQuery";

const TESTIMONIALS = [
  {
    quote: "I have tried soaps from every apothecary from Paris to Portland. Nothing has ever felt like this. It is not soap — it is a sacrament.",
    author: "Margot L.",
    location: "Lyon, France",
    product: "Provençal Bloom",
  },
  {
    quote: "My skin has never felt this alive. After one week with the Charcoal bar, my dermatologist asked what I had changed. I told him: everything.",
    author: "James H.",
    location: "London, UK",
    product: "Midnight Charcoal",
  },
  {
    quote: "The packaging alone moved me to tears — but the scent, the lather, the way it leaves my hands feeling. This is what luxury should feel like.",
    author: "Aiko M.",
    location: "Kyoto, Japan",
    product: "Rose & Clay",
  },
];

function TypewriterQuote({ text, inView }: { text: string; inView: boolean }) {
  return (
    <p className="font-serif text-lg md:text-xl lg:text-2xl text-charcoal leading-relaxed italic" aria-label={text}>
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

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: (typeof TESTIMONIALS)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.23, 1, 0.32, 1] }}
      className="relative py-10 px-6 md:py-12 md:px-12"
      role="article"
      aria-label={`Testimonial from ${testimonial.author}`}
    >
      <motion.span
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
        animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.15 + 0.1, ease: "backOut" }}
        className="absolute top-6 left-4 md:left-6 font-serif text-[5rem] md:text-[6rem] leading-none text-terracotta/20 select-none"
      >
        &ldquo;
      </motion.span>

      <div className="relative mt-6 md:mt-8 mb-5 md:mb-6">
        <TypewriterQuote text={testimonial.quote} inView={inView} />
      </div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.15 + 0.4 }}
        className="flex items-center gap-4"
      >
        <div className="w-8 h-px bg-terracotta" aria-hidden="true" />
        <div>
          <p className="font-sans text-sm font-medium text-charcoal">{testimonial.author}</p>
          <p className="font-sans text-xs text-charcoal/40">
            {testimonial.location} · <em>{testimonial.product}</em>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Mobile swipeable carousel
function MobileCarousel() {
  const [current, setCurrent] = useState(0);
  const touchStart = useRef(0);
  const touchEnd = useRef(0);

  const prev = () => setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setCurrent((c) => (c + 1) % TESTIMONIALS.length);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.targetTouches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };
  const handleTouchEnd = () => {
    const diff = touchStart.current - touchEnd.current;
    if (Math.abs(diff) > 40) {
      diff > 0 ? next() : prev();
    }
  };

  const t = TESTIMONIALS[current];

  return (
    <div
      className="relative overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
      aria-label="Customer testimonials"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="relative py-10 px-6"
          role="group"
          aria-roledescription="slide"
          aria-label={`Testimonial ${current + 1} of ${TESTIMONIALS.length}`}
        >
          <span className="absolute top-6 left-4 font-serif text-[5rem] leading-none text-terracotta/20 select-none" aria-hidden="true">
            &ldquo;
          </span>
          <p className="font-serif text-lg text-charcoal leading-relaxed italic mt-6 mb-6">{t.quote}</p>
          <div className="flex items-center gap-4">
            <div className="w-8 h-px bg-terracotta" aria-hidden="true" />
            <div>
              <p className="font-sans text-sm font-medium text-charcoal">{t.author}</p>
              <p className="font-sans text-xs text-charcoal/40">
                {t.location} · <em>{t.product}</em>
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="flex items-center justify-between px-6 pb-8">
        <button
          onClick={prev}
          aria-label="Previous testimonial"
          className="w-11 h-11 flex items-center justify-center border border-charcoal/20 text-charcoal/50 hover:text-charcoal hover:border-charcoal transition-colors"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Dots */}
        <div className="flex gap-2" role="tablist" aria-label="Testimonial navigation">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => setCurrent(i)}
              className="transition-all duration-300"
              style={{
                width: i === current ? "24px" : "6px",
                height: "6px",
                borderRadius: "3px",
                backgroundColor: i === current ? "var(--terracotta)" : "rgba(28,26,23,0.2)",
                minHeight: "unset",
                minWidth: "unset",
              }}
            />
          ))}
        </div>

        <button
          onClick={next}
          aria-label="Next testimonial"
          className="w-11 h-11 flex items-center justify-center border border-charcoal/20 text-charcoal/50 hover:text-charcoal hover:border-charcoal transition-colors"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const isMobile = useIsMobile();

  return (
    <section
      className="relative py-16 md:py-section bg-[#EDE4D7] px-5 md:px-16 overflow-hidden"
      aria-label="Customer testimonials"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
      >
        <span className="font-serif text-[12vw] italic text-charcoal/[0.025] whitespace-nowrap">
          &ldquo;Pure luxury for the skin&rdquo;
        </span>
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <p className="font-sans text-xs tracking-[0.4em] uppercase text-terracotta mb-3">From Our Community</p>
          <h2 className="font-serif text-charcoal" style={{ fontSize: "clamp(1.8rem, 6vw, 3rem)" }}>
            Words that lather.
          </h2>
        </div>

        {/* Mobile: swipeable carousel. Desktop: 3-column grid */}
        {isMobile ? (
          <MobileCarousel />
        ) : (
          <div
            className="grid grid-cols-3 divide-x divide-charcoal/10"
            role="list"
          >
            {TESTIMONIALS.map((t, i) => (
              <TestimonialCard key={t.author} testimonial={t} index={i} />
            ))}
          </div>
        )}

        {/* Star rating */}
        <div className="mt-8 md:mt-12 flex justify-center items-center gap-2" aria-label="Rated 5 stars">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, type: "spring", stiffness: 300 }}
              aria-hidden="true"
              className="text-terracotta text-lg"
              style={{ minHeight: "unset", minWidth: "unset", display: "inline" }}
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
