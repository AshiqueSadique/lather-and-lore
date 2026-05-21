"use client";

import { useRef, MouseEvent } from "react";
import { motion } from "framer-motion";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "outline" | "ghost";
  onClick?: () => void;
  className?: string;
  href?: string;
  type?: "button" | "submit";
  "aria-label"?: string;
}

export default function Button({
  children,
  variant = "primary",
  onClick,
  className = "",
  href,
  type = "button",
  "aria-label": ariaLabel,
}: ButtonProps) {
  const fillRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (fillRef.current) {
      fillRef.current.style.left = `${x}px`;
      fillRef.current.style.top = `${y}px`;
    }
  };

  const baseClasses =
    "relative overflow-hidden inline-flex items-center gap-2 font-sans text-sm tracking-widest uppercase px-8 py-4 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta";

  const variants = {
    primary: "bg-olive text-cream hover:text-cream border border-olive",
    outline: "bg-transparent text-charcoal border border-charcoal hover:text-cream",
    ghost: "bg-transparent text-charcoal hover:text-terracotta border-0",
  };

  const fillColors = {
    primary: "bg-terracotta",
    outline: "bg-charcoal",
    ghost: "bg-transparent",
  };

  const inner = (
    <motion.span
      className="relative z-10 flex items-center gap-2"
      whileHover={{ x: 2 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.span>
  );

  const fillSpan = (
    <span
      ref={fillRef}
      aria-hidden="true"
      className={`absolute pointer-events-none w-0 h-0 rounded-full ${fillColors[variant]} opacity-0 transition-none`}
      style={{ transform: "translate(-50%, -50%)", transition: "width 0.6s ease, height 0.6s ease, opacity 0.1s" }}
    />
  );

  const sharedProps = {
    className: `${baseClasses} ${variants[variant]} ${className}`,
    onMouseEnter: handleMouseEnter,
    "data-cursor-hover": "true",
    "aria-label": ariaLabel,
    onMouseOver: (e: MouseEvent<HTMLElement>) => {
      if (fillRef.current) {
        fillRef.current.style.width = "600px";
        fillRef.current.style.height = "600px";
        fillRef.current.style.opacity = "1";
      }
    },
    onMouseOut: () => {
      if (fillRef.current) {
        fillRef.current.style.width = "0";
        fillRef.current.style.height = "0";
        fillRef.current.style.opacity = "0";
      }
    },
  };

  if (href) {
    return (
      <a href={href} {...sharedProps}>
        {fillSpan}
        {inner}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} {...sharedProps}>
      {fillSpan}
      {inner}
    </button>
  );
}
