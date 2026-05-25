"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Instagram, Mail, MapPin, ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const FOOTER_LINKS = {
  Shop: ["The Collection", "Gift Sets", "Subscriptions", "Wholesale"],
  Learn: ["Our Process", "Ingredients", "Sustainability", "Journal"],
  Company: ["Our Story", "Atelier Visits", "Press", "Contact"],
};

// Mobile accordion section
function FooterAccordion({ title, links }: { title: string; links: string[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-cream/10">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-4 text-left"
        aria-expanded={open}
        aria-controls={`footer-${title}`}
        style={{ minHeight: "unset" }}
      >
        <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-cream/40">{title}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          aria-hidden="true"
          style={{ minHeight: "unset", minWidth: "unset", display: "inline-flex" }}
        >
          <ChevronDown size={14} className="text-cream/30" />
        </motion.span>
      </button>

      <motion.div
        id={`footer-${title}`}
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        style={{ overflow: "hidden" }}
        aria-hidden={!open}
      >
        <ul className="pb-4 space-y-3 pl-1">
          {links.map((link) => (
            <li key={link}>
              <a
                href="#"
                className="font-sans text-sm text-cream/55 hover:text-cream transition-colors duration-300"
                style={{ minHeight: "unset", minWidth: "unset", display: "inline" }}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

export default function Footer() {
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !wordmarkRef.current || !footerRef.current) return;

    stRef.current = ScrollTrigger.create({
      trigger: footerRef.current,
      start: "top bottom",
      end: "bottom bottom",
      onUpdate: (self) => {
        const progress = Math.min(self.progress * 1.5, 1);
        if (wordmarkRef.current) {
          gsap.set(wordmarkRef.current, { y: (1 - progress) * 40, opacity: progress });
        }
      },
    });

    return () => {
      stRef.current?.kill();
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative bg-charcoal text-cream pt-14 md:pt-20 pb-0 overflow-hidden"
      aria-label="Site footer"
    >
      <div className="relative z-10 px-5 md:px-16 pb-12 md:pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Tagline + social */}
          <div className="mb-10 md:mb-12">
            <p className="font-serif text-xl md:text-2xl text-cream/80 italic leading-relaxed mb-5 max-w-sm">
              &ldquo;Made slowly, for those who bathe slowly.&rdquo;
            </p>
            <div className="flex items-center gap-5">
              {[
                { icon: <Instagram size={18} />, label: "Lather & Lore on Instagram" },
                { icon: <Mail size={18} />, label: "Email Lather & Lore", href: "mailto:hello@latherandlore.com" },
                { icon: <MapPin size={18} />, label: "Find our atelier" },
              ].map(({ icon, label, href }) => (
                <a
                  key={label}
                  href={href ?? "#"}
                  aria-label={label}
                  className="w-10 h-10 flex items-center justify-center text-cream/40 hover:text-terracotta transition-colors duration-300"
                  data-cursor-hover="true"
                  style={{ minHeight: "unset", minWidth: "unset" }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Desktop: 4-column grid */}
          <div className="hidden md:grid grid-cols-4 gap-10 border-t border-cream/10 pt-12">
            {Object.entries(FOOTER_LINKS).map(([category, links]) => (
              <nav key={category} aria-label={`${category} links`}>
                <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-cream/30 mb-5">{category}</p>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="font-sans text-sm text-cream/60 hover:text-cream transition-colors duration-300"
                        style={{ minHeight: "unset", minWidth: "unset", display: "inline" }}
                        data-cursor-hover="true"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
            <div>
              <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-cream/30 mb-5">Atelier</p>
              <address className="not-italic font-sans text-sm text-cream/50 leading-relaxed">
                12 Rue des Lavandes<br />
                84100 Orange<br />
                Provence, France
              </address>
            </div>
          </div>

          {/* Mobile: accordion */}
          <div className="md:hidden border-t border-cream/10 pt-2">
            {Object.entries(FOOTER_LINKS).map(([category, links]) => (
              <FooterAccordion key={category} title={category} links={links} />
            ))}
            {/* Address — always visible on mobile */}
            <div className="pt-6 pb-2">
              <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-cream/30 mb-3">Atelier</p>
              <address className="not-italic font-sans text-sm text-cream/50 leading-relaxed">
                12 Rue des Lavandes, 84100 Orange<br />
                Provence, France
              </address>
            </div>
          </div>

          {/* Legal */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-10 md:mt-12 pt-6 border-t border-cream/10 gap-3 safe-bottom">
            <p className="font-sans text-[11px] text-cream/25">
              © {new Date().getFullYear()} Lather & Lore. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-4 md:gap-6">
              {["Privacy Policy", "Terms of Use", "Accessibility"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="font-sans text-[11px] text-cream/25 hover:text-cream/50 transition-colors"
                  style={{ minHeight: "unset", minWidth: "unset", display: "inline" }}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Giant scroll-reveal wordmark */}
      <div
        ref={wordmarkRef}
        className="relative w-full overflow-hidden pb-6 md:pb-8 opacity-0"
        aria-hidden="true"
      >
        <div
          className="font-serif leading-none text-center select-none tracking-[-0.02em] whitespace-nowrap"
          style={{
            fontSize: "clamp(3rem, 15vw, 15vw)",
            color: "transparent",
            WebkitTextStroke: "1px rgba(245,239,230,0.08)",
          }}
        >
          LATHER & LORE
        </div>
      </div>
    </footer>
  );
}
