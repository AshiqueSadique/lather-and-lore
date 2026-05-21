"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const isHovering = useRef(false);
  const mouse = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const isMobile = window.matchMedia("(hover: none)").matches;
    if (isMobile) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

    const moveCursor = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power3.out",
      });
    };

    // Ring follows with lerp via ticker
    const ticker = () => {
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.12;
      gsap.set(ring, { x: ringPos.current.x, y: ringPos.current.y });
    };

    gsap.ticker.add(ticker);
    window.addEventListener("mousemove", moveCursor);

    const handleEnter = () => {
      isHovering.current = true;
      gsap.to(dot, { scale: 2.5, duration: 0.3, ease: "power2.out" });
      gsap.to(ring, { scale: 1.6, duration: 0.3, ease: "power2.out", opacity: 0.4 });
    };

    const handleLeave = () => {
      isHovering.current = false;
      gsap.to(dot, { scale: 1, duration: 0.3, ease: "power2.out" });
      gsap.to(ring, { scale: 1, duration: 0.3, ease: "power2.out", opacity: 1 });
    };

    const interactiveEls = document.querySelectorAll(
      "a, button, [data-cursor-hover], input, label"
    );

    interactiveEls.forEach((el) => {
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
    });

    // Observe DOM changes to add listeners to dynamically added elements
    const observer = new MutationObserver(() => {
      document
        .querySelectorAll("a, button, [data-cursor-hover], input, label")
        .forEach((el) => {
          el.removeEventListener("mouseenter", handleEnter);
          el.removeEventListener("mouseleave", handleLeave);
          el.addEventListener("mouseenter", handleEnter);
          el.addEventListener("mouseleave", handleLeave);
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      gsap.ticker.remove(ticker);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Dot — small filled circle, blends with difference */}
      <div
        id="cursor-dot"
        ref={dotRef}
        className="w-2.5 h-2.5 rounded-full bg-white"
        style={{ top: 0, left: 0 }}
      />
      {/* Ring — larger outline circle */}
      <div
        id="cursor-ring"
        ref={ringRef}
        className="w-10 h-10 rounded-full border border-charcoal/40"
        style={{ top: 0, left: 0 }}
      />
    </>
  );
}
