"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/** Lenis smooth scroll. Not started at all under prefers-reduced-motion. */
export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | undefined;
    const start = () => {
      if (lenis || mq.matches) return;
      lenis = new Lenis({ lerp: 0.1, smoothWheel: true, autoRaf: true, anchors: true });
      window.__lenis = lenis;
    };
    const stop = () => {
      lenis?.destroy();
      lenis = undefined;
      window.__lenis = undefined;
    };
    const onChange = () => (mq.matches ? stop() : start());
    start();
    mq.addEventListener("change", onChange);
    return () => {
      mq.removeEventListener("change", onChange);
      stop();
    };
  }, []);

  // New page → top (unless there is a hash to jump to).
  useEffect(() => {
    if (window.location.hash) return;
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export function scrollToId(id: string, offset = -96) {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { offset, duration: 1.1 });
  else el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Pause/resume Lenis while a modal is open so the page behind doesn't scroll. */
export function lockScroll(locked: boolean) {
  if (locked) window.__lenis?.stop();
  else window.__lenis?.start();
  document.documentElement.style.overflow = locked ? "hidden" : "";
}
