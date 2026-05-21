"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Instagram, Mail, MapPin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const FOOTER_LINKS = {
  Shop: ["The Collection", "Gift Sets", "Subscriptions", "Wholesale"],
  Learn: ["Our Process", "Ingredients", "Sustainability", "Journal"],
  Company: ["Our Story", "Atelier Visits", "Press", "Contact"],
};

export default function Footer() {
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  // GSAP pin: wordmark stays briefly as you scroll off the page
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !wordmarkRef.current || !footerRef.current) return;

    ScrollTrigger.create({
      trigger: footerRef.current,
      start: "top bottom",
      end: "bottom bottom",
      onUpdate: (self) => {
        const progress = Math.min(self.progress * 1.5, 1);
        if (wordmarkRef.current) {
          gsap.set(wordmarkRef.current, {
            y: (1 - progress) * 40,
            opacity: progress,
          });
        }
      },
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative bg-charcoal text-cream pt-20 pb-0 overflow-hidden"
      aria-label="Site footer"
    >
      {/* Top content */}
      <div className="relative z-10 px-8 md:px-16 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Tagline */}
          <div className="mb-12 max-w-sm">
            <p className="font-serif text-2xl text-cream/80 italic leading-relaxed mb-6">
              &ldquo;Made slowly, for those who bathe slowly.&rdquo;
            </p>
            <div className="flex items-center gap-5">
              <a
                href="#"
                aria-label="Lather & Lore on Instagram"
                className="text-cream/40 hover:text-terracotta transition-colors duration-300"
                data-cursor-hover="true"
              >
                <Instagram size={18} />
              </a>
              <a
                href="mailto:hello@latherandlore.com"
                aria-label="Email Lather & Lore"
                className="text-cream/40 hover:text-terracotta transition-colors duration-300"
                data-cursor-hover="true"
              >
                <Mail size={18} />
              </a>
              <a
                href="#"
                aria-label="Find our atelier"
                className="text-cream/40 hover:text-terracotta transition-colors duration-300"
                data-cursor-hover="true"
              >
                <MapPin size={18} />
              </a>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 border-t border-cream/10 pt-12">
            {Object.entries(FOOTER_LINKS).map(([category, links]) => (
              <nav key={category} aria-label={`${category} links`}>
                <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-cream/30 mb-5">
                  {category}
                </p>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="font-sans text-sm text-cream/60 hover:text-cream transition-colors duration-300"
                        data-cursor-hover="true"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            {/* Address */}
            <div>
              <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-cream/30 mb-5">
                Atelier
              </p>
              <address className="not-italic font-sans text-sm text-cream/50 leading-relaxed">
                12 Rue des Lavandes<br />
                84100 Orange<br />
                Provence, France
              </address>
            </div>
          </div>

          {/* Legal */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-12 pt-6 border-t border-cream/10 gap-3">
            <p className="font-sans text-[11px] text-cream/25">
              © {new Date().getFullYear()} Lather & Lore. All rights reserved.
            </p>
            <div className="flex gap-6">
              {["Privacy Policy", "Terms of Use", "Accessibility"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="font-sans text-[11px] text-cream/25 hover:text-cream/50 transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Giant pinned wordmark — scroll reveal */}
      <div
        ref={wordmarkRef}
        className="relative w-full overflow-hidden pb-8 opacity-0"
        aria-hidden="true"
      >
        <div
          className="font-serif text-[15vw] leading-none text-center select-none tracking-[-0.02em] whitespace-nowrap"
          style={{
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
