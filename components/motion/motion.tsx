"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { motion, useInView, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { cn } from "@/lib/cn";

const EASE = [0.2, 0.7, 0.2, 1] as const;

/** Wraps a CTA so it drifts toward the pointer. Mouse only; off under reduced motion. */
export function Magnetic({ children, strength = 0.28, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });
  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Word-by-word masked reveal on scroll. Wrap one word in *asterisks* for the
 * Square Peg script accent. Under reduced motion the text is simply shown.
 */
export function Headline({
  text,
  as: Tag = "h2",
  className,
  delay = 0,
  immediate = false,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  immediate?: boolean;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const show = immediate || inView || !!reduce;

  const words: { w: string; em: boolean }[] = [];
  for (const part of text.split(/(\*[^*]+\*)/g).filter(Boolean)) {
    const em = part.startsWith("*") && part.endsWith("*");
    const clean = em ? part.slice(1, -1) : part;
    for (const w of clean.split(/\s+/).filter(Boolean)) {
      // punctuation glued to the previous word stays with it
      if (!em && words.length && /^[.,;:!?]+$/.test(w)) words[words.length - 1].w += w;
      else words.push({ w, em });
    }
  }

  return (
    <Tag ref={ref} className={className} aria-label={text.replace(/\*/g, "")}>
      {words.map(({ w, em }, k) => (
        <span key={k} aria-hidden className="mr-[0.26em] inline-block overflow-hidden pb-[0.18em] align-bottom -mb-[0.18em] last:mr-0">
          <motion.span
            className="inline-block"
            initial={reduce ? false : { y: "115%" }}
            animate={show ? { y: "0%" } : { y: "115%" }}
            transition={{ duration: 0.9, delay: delay + k * 0.05, ease: EASE }}
          >
            <span className={cn(em && "script text-leaf")}>{w}</span>
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

export function Reveal({ children, className, delay = 0, y = 22 }: { children: ReactNode; className?: string; delay?: number; y?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
