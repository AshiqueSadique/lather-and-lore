"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOTANICALS = [
  {
    name: "Lavender",
    latin: "Lavandula angustifolia",
    benefit: "Calming · Antiseptic",
    emoji: "🌿",
    color: "#7B6D8D",
    svg: (
      <svg viewBox="0 0 60 100" className="w-12 h-20" fill="none">
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
    emoji: "🌾",
    color: "#B8956A",
    svg: (
      <svg viewBox="0 0 60 100" className="w-12 h-20" fill="none">
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
    emoji: "🍯",
    color: "#D4A017",
    svg: (
      <svg viewBox="0 0 80 80" className="w-16 h-16" fill="none">
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
    emoji: "🖤",
    color: "#2C2C2C",
    svg: (
      <svg viewBox="0 0 80 80" className="w-16 h-16" fill="none">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <polygon
            key={i}
            points="40,16 52,28 52,44 40,56 28,44 28,28"
            fill="#1C1A17"
            opacity={0.15 + i * 0.1}
            transform={`rotate(${i * 8} 40 40) translate(${Math.cos(i) * 2}, ${Math.sin(i) * 2})`}
          />
        ))}
        <polygon points="40,20 50,30 50,44 40,54 30,44 30,30" fill="#2C2C2C" opacity="0.8" />
        <line x1="35" y1="30" x2="45" y2="44" stroke="#555" strokeWidth="1" opacity="0.5" />
        <line x1="45" y1="30" x2="35" y2="44" stroke="#555" strokeWidth="1" opacity="0.5" />
      </svg>
    ),
  },
  {
    name: "Rosemary",
    latin: "Salvia rosmarinus",
    benefit: "Stimulating · Antioxidant",
    emoji: "🌱",
    color: "#3D6B45",
    svg: (
      <svg viewBox="0 0 60 100" className="w-12 h-20" fill="none">
        <line x1="30" y1="100" x2="30" y2="10" stroke="#3D6B45" strokeWidth="2" />
        {Array.from({ length: 12 }).map((_, i) => {
          const y = 15 + i * 7;
          const side = i % 2 === 0 ? -1 : 1;
          return (
            <line key={i} x1="30" y1={y} x2={30 + side * 14} y2={y - 3} stroke="#5A8C60" strokeWidth="1.5" strokeLinecap="round" />
          );
        })}
      </svg>
    ),
  },
  {
    name: "Shea Butter",
    latin: "Vitellaria paradoxa",
    benefit: "Nourishing · Emollient",
    emoji: "🤍",
    color: "#C4A882",
    svg: (
      <svg viewBox="0 0 80 80" className="w-16 h-16" fill="none">
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
    emoji: "🌲",
    color: "#4A7C5A",
    svg: (
      <svg viewBox="0 0 60 100" className="w-12 h-20" fill="none">
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
    emoji: "🌹",
    color: "#C4504A",
    svg: (
      <svg viewBox="0 0 80 80" className="w-16 h-16" fill="none">
        <circle cx="40" cy="40" r="18" fill="#C4504A" opacity="0.85" />
        <circle cx="40" cy="40" r="12" fill="#D4604A" opacity="0.6" />
        {[0, 72, 144, 216, 288].map((deg, i) => {
          const rad = (deg - 90) * (Math.PI / 180);
          return (
            <line key={i} x1="40" y1="18" x2={40 + Math.cos(rad) * 8} y2={18 + Math.sin(rad) * 8} stroke="#8B3530" strokeWidth="1.5" transform={`rotate(${deg} 40 40)`} />
          );
        })}
      </svg>
    ),
  },
];

interface TooltipData {
  item: (typeof BOTANICALS)[0];
  x: number;
  y: number;
}

export default function IngredientsRibbon() {
  const [paused, setPaused] = useState(false);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const ribbonRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (
    item: (typeof BOTANICALS)[0],
    index: number,
    e: React.MouseEvent
  ) => {
    setPaused(true);
    setHoverIndex(index);
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setTooltip({ item, x: rect.left + rect.width / 2, y: rect.top - 12 });
  };

  const handleMouseLeave = () => {
    setPaused(false);
    setHoverIndex(null);
    setTooltip(null);
  };

  // Duplicate for seamless loop
  const items = [...BOTANICALS, ...BOTANICALS];

  return (
    <section
      aria-label="Our botanical ingredients"
      className="relative py-16 bg-[#EDE4D7] overflow-hidden"
    >
      {/* Heading */}
      <div className="text-center mb-10 px-8">
        <p className="font-sans text-xs tracking-[0.4em] uppercase text-terracotta mb-2">
          Pure Ingredients
        </p>
        <h2 className="font-serif text-display-md text-charcoal">
          Nature&apos;s finest, unmixed.
        </h2>
      </div>

      {/* Gradient fade edges */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-16 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #EDE4D7, transparent)" }}
      />
      <div
        aria-hidden="true"
        className="absolute right-0 top-16 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #EDE4D7, transparent)" }}
      />

      <div
        ref={ribbonRef}
        className="flex items-center"
        style={{ overflow: "hidden" }}
        role="list"
        aria-label="Botanical ingredients list"
      >
        <motion.div
          className="flex items-center gap-0"
          animate={paused ? { x: 0 } : {}}
          style={{
            display: "flex",
            animation: paused ? "none" : "marquee 28s linear infinite",
            width: "max-content",
          }}
        >
          {items.map((item, index) => (
            <motion.div
              key={`${item.name}-${index}`}
              role="listitem"
              className="flex flex-col items-center gap-3 px-10 py-4 cursor-default group"
              data-cursor-hover="true"
              onMouseEnter={(e) => handleMouseEnter(item, index, e)}
              onMouseLeave={handleMouseLeave}
              animate={hoverIndex === index ? { scale: 1.18 } : { scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div
                className="flex items-center justify-center w-16 h-16 transition-all duration-300"
                style={{ filter: hoverIndex === index ? "none" : "grayscale(20%) opacity(0.75)" }}
              >
                {item.svg}
              </div>
              <span className="font-sans text-xs tracking-[0.2em] uppercase text-charcoal/60 whitespace-nowrap">
                {item.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Tooltip */}
      <AnimatePresence>
        {tooltip && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed z-50 pointer-events-none bg-charcoal text-cream px-5 py-3 shadow-xl -translate-x-1/2 -translate-y-full"
            style={{ left: tooltip.x, top: tooltip.y, borderRadius: "2px" }}
            aria-live="polite"
            role="tooltip"
          >
            <p className="font-serif text-base leading-tight">{tooltip.item.name}</p>
            <p className="font-sans text-[10px] italic text-cream/50 mb-1">{tooltip.item.latin}</p>
            <p className="font-sans text-[11px] tracking-wide text-terracotta">{tooltip.item.benefit}</p>
            {/* Arrow */}
            <span
              aria-hidden="true"
              className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0"
              style={{ borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderTop: "6px solid #1C1A17" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
