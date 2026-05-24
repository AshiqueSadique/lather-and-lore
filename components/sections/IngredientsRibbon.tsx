"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsTouch } from "@/lib/hooks/useMediaQuery";

const BOTANICALS = [
  {
    name: "Lavender",
    latin: "Lavandula angustifolia",
    benefit: "Calming · Antiseptic",
    color: "#7B6D8D",
    svg: (
      <svg viewBox="0 0 60 100" className="w-10 h-16 md:w-12 md:h-20" fill="none">
        <line x1="30" y1="100" x2="30" y2="20" stroke="#7B6D8D" strokeWidth="2" />
        {[0, 12, 24, 36].map((y, i) => (
          <ellipse key={i} cx={30} cy={20 + y} rx="6" ry="4" fill="#9B8DAD" opacity={0.8 - i * 0.1} transform={`rotate(${i % 2 === 0 ? -20 : 20} 30 ${20 + y})`} />
        ))}
        {[6, 18, 30, 42].map((y, i) => (
          <ellipse key={`r${i}`} cx={30} cy={20 + y} rx="6" ry="4" fill="#9B8DAD" opacity={0.8 - i * 0.1} transform={`rotate(${i % 2 === 0 ? 20 : -20} 30 ${20 + y})`} />
        ))}
      </svg>
    ),
  },
  {
    name: "Raw Oat",
    latin: "Avena sativa",
    benefit: "Soothing · Exfoliant",
    color: "#B8956A",
    svg: (
      <svg viewBox="0 0 60 100" className="w-10 h-16 md:w-12 md:h-20" fill="none">
        <line x1="30" y1="100" x2="30" y2="10" stroke="#B8956A" strokeWidth="2" />
        {[-16, -8, 0, 8, 16].map((x, i) => (
          <ellipse key={i} cx={30 + x * 0.4} cy={20 + i * 14} rx="7" ry="5" fill="#C9A87A" opacity={0.9 - i * 0.1} transform={`rotate(${x * 2} ${30 + x * 0.4} ${20 + i * 14})`} />
        ))}
      </svg>
    ),
  },
  {
    name: "Wild Honey",
    latin: "Mel naturale",
    benefit: "Hydrating · Antibacterial",
    color: "#D4A017",
    svg: (
      <svg viewBox="0 0 80 80" className="w-12 h-12 md:w-16 md:h-16" fill="none">
        <path d="M40 10 L68 25 L68 55 L40 70 L12 55 L12 25 Z" fill="#F0C040" opacity="0.9" />
        <path d="M40 10 L68 25 L68 55 L40 70 L12 55 L12 25 Z" fill="none" stroke="#C8960A" strokeWidth="1.5" />
        <path d="M40 22 L56 31 L56 49 L40 58 L24 49 L24 31 Z" fill="#D4A017" opacity="0.5" />
        <ellipse cx="40" cy="40" rx="8" ry="6" fill="#C8960A" opacity="0.3" />
      </svg>
    ),
  },
  {
    name: "Charcoal",
    latin: "Carbo activatus",
    benefit: "Purifying · Detoxifying",
    color: "#2C2C2C",
    svg: (
      <svg viewBox="0 0 80 80" className="w-12 h-12 md:w-16 md:h-16" fill="none">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <polygon key={i} points="40,16 52,28 52,44 40,56 28,44 28,28" fill="#1C1A17" opacity={0.15 + i * 0.1} transform={`rotate(${i * 8} 40 40) translate(${Math.cos(i) * 2}, ${Math.sin(i) * 2})`} />
        ))}
        <polygon points="40,20 50,30 50,44 40,54 30,44 30,30" fill="#2C2C2C" opacity="0.8" />
      </svg>
    ),
  },
  {
    name: "Rosemary",
    latin: "Salvia rosmarinus",
    benefit: "Stimulating · Antioxidant",
    color: "#3D6B45",
    svg: (
      <svg viewBox="0 0 60 100" className="w-10 h-16 md:w-12 md:h-20" fill="none">
        <line x1="30" y1="100" x2="30" y2="10" stroke="#3D6B45" strokeWidth="2" />
        {Array.from({ length: 12 }).map((_, i) => {
          const y = 15 + i * 7;
          const side = i % 2 === 0 ? -1 : 1;
          return <line key={i} x1="30" y1={y} x2={30 + side * 14} y2={y - 3} stroke="#5A8C60" strokeWidth="1.5" strokeLinecap="round" />;
        })}
      </svg>
    ),
  },
  {
    name: "Shea Butter",
    latin: "Vitellaria paradoxa",
    benefit: "Nourishing · Emollient",
    color: "#C4A882",
    svg: (
      <svg viewBox="0 0 80 80" className="w-12 h-12 md:w-16 md:h-16" fill="none">
        <circle cx="40" cy="30" r="16" fill="#E8D4B0" opacity="0.9" />
        <circle cx="40" cy="30" r="10" fill="#D4BA8A" opacity="0.7" />
        <path d="M40 46 L32 68 L40 62 L48 68 Z" fill="#C4A882" opacity="0.8" />
      </svg>
    ),
  },
  {
    name: "Tea Tree",
    latin: "Melaleuca alternifolia",
    benefit: "Clarifying · Antifungal",
    color: "#4A7C5A",
    svg: (
      <svg viewBox="0 0 60 100" className="w-10 h-16 md:w-12 md:h-20" fill="none">
        <line x1="30" y1="100" x2="30" y2="55" stroke="#4A7C5A" strokeWidth="2.5" />
        <polygon points="30,10 50,55 10,55" fill="#5A9066" opacity="0.85" />
        <polygon points="30,22 46,55 14,55" fill="#4A7C5A" opacity="0.5" />
      </svg>
    ),
  },
  {
    name: "Rose Hip",
    latin: "Rosa canina",
    benefit: "Anti-aging · Brightening",
    color: "#C4504A",
    svg: (
      <svg viewBox="0 0 80 80" className="w-12 h-12 md:w-16 md:h-16" fill="none">
        <circle cx="40" cy="40" r="18" fill="#C4504A" opacity="0.85" />
        <circle cx="40" cy="40" r="12" fill="#D4604A" opacity="0.6" />
      </svg>
    ),
  },
];

interface ActiveTooltip {
  item: (typeof BOTANICALS)[0];
  index: number;
  rect: DOMRect;
}

export default function IngredientsRibbon() {
  const [paused, setPaused] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<ActiveTooltip | null>(null);
  const isTouch = useIsTouch();
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const items = [...BOTANICALS, ...BOTANICALS];

  const openTooltip = (item: (typeof BOTANICALS)[0], index: number, el: HTMLElement) => {
    setPaused(true);
    setActiveTooltip({ item, index, rect: el.getBoundingClientRect() });
  };

  const closeTooltip = () => {
    setPaused(false);
    setActiveTooltip(null);
  };

  const handleInteraction = (
    item: (typeof BOTANICALS)[0],
    index: number,
    e: React.MouseEvent | React.TouchEvent
  ) => {
    const el = e.currentTarget as HTMLElement;
    if (activeTooltip?.index === index) {
      closeTooltip();
    } else {
      openTooltip(item, index, el);
    }
  };

  return (
    <section aria-label="Our botanical ingredients" className="relative py-12 md:py-16 bg-[#EDE4D7] overflow-hidden">
      <div className="text-center mb-8 md:mb-10 px-5">
        <p className="font-sans text-xs tracking-[0.4em] uppercase text-terracotta mb-2">Pure Ingredients</p>
        <h2 className="font-serif text-charcoal" style={{ fontSize: "clamp(1.8rem, 6vw, 3rem)" }}>
          Nature&apos;s finest, unmixed.
        </h2>
      </div>

      {/* Fade edges */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 bottom-0 w-16 md:w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #EDE4D7, transparent)" }}
      />
      <div
        aria-hidden="true"
        className="absolute right-0 top-0 bottom-0 w-16 md:w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #EDE4D7, transparent)" }}
      />

      <div role="list" aria-label="Botanical ingredients" style={{ overflow: "hidden" }}>
        <div
          className="flex items-center"
          style={{
            width: "max-content",
            animation: paused ? "none" : "marquee 28s linear infinite",
          }}
        >
          {items.map((item, index) => (
            <motion.div
              key={`${item.name}-${index}`}
              ref={(el) => { itemRefs.current[index] = el; }}
              role="listitem"
              className="flex flex-col items-center gap-2 md:gap-3 px-6 md:px-10 py-4 select-none"
              data-cursor-hover="true"
              animate={activeTooltip?.index === index ? { scale: 1.18 } : { scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              // Desktop: hover events
              onMouseEnter={!isTouch ? (e) => handleInteraction(item, index, e) : undefined}
              onMouseLeave={!isTouch ? closeTooltip : undefined}
              // Touch: tap events
              onTouchEnd={isTouch ? (e) => { e.preventDefault(); handleInteraction(item, index, e); } : undefined}
              aria-label={`${item.name}: ${item.benefit}`}
            >
              <div
                className="flex items-center justify-center transition-all duration-300"
                style={{ filter: activeTooltip?.index === index ? "none" : "grayscale(20%) opacity(0.75)" }}
              >
                {item.svg}
              </div>
              <span className="font-sans text-[10px] md:text-xs tracking-[0.2em] uppercase text-charcoal/60 whitespace-nowrap">
                {item.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tooltip — positioned relative to viewport */}
      <AnimatePresence>
        {activeTooltip && (
          <>
            {/* Touch backdrop dismiss */}
            {isTouch && (
              <div className="fixed inset-0 z-40" onClick={closeTooltip} aria-hidden="true" />
            )}
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed z-50 pointer-events-none bg-charcoal text-cream px-5 py-3 shadow-xl"
              style={{
                borderRadius: "2px",
                left: Math.min(
                  Math.max(activeTooltip.rect.left + activeTooltip.rect.width / 2, 80),
                  window.innerWidth - 80
                ),
                top: activeTooltip.rect.top - 12,
                transform: "translate(-50%, -100%)",
              }}
              role="tooltip"
              aria-live="polite"
            >
              <p className="font-serif text-base leading-tight">{activeTooltip.item.name}</p>
              <p className="font-sans text-[10px] italic text-cream/50 mb-1">{activeTooltip.item.latin}</p>
              <p className="font-sans text-[11px] tracking-wide text-terracotta">{activeTooltip.item.benefit}</p>
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0"
                style={{ borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderTop: "6px solid #1C1A17" }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
