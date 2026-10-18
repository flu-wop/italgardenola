"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Headline, Magnetic } from "@/components/motion/motion";
import { LINKS } from "@/lib/site-config";
import { cn } from "@/lib/cn";

type CardSpec = { src: string; alt: string; className: string; speed: number; rotate: number; round?: boolean; delay: number };

const DESKTOP: CardSpec[] = [
  { src: "/images/menu/ra-pasta.jpg", alt: "Ra Pasta", className: "right-[6%] top-[12%] h-[22rem] w-[17rem] lg:h-[26rem] lg:w-[20rem]", speed: -110, rotate: 3, delay: 0 },
  { src: "/images/menu/jackfruit-ribs.jpg", alt: "Jackfruit ribs", className: "right-[36%] top-[58%] h-[12rem] w-[11rem] lg:h-[15rem] lg:w-[13rem]", speed: -190, rotate: -5, delay: 1.2 },
  { src: "/images/menu/kale-salad.jpg", alt: "Hell Yeah Kale Yeah salad", className: "right-[3%] top-[66%] h-[10rem] w-[10rem] lg:h-[12rem] lg:w-[12rem]", speed: -70, rotate: 0, round: true, delay: 2.4 },
  { src: "/images/menu/cauliflower-wings.jpg", alt: "Cauliwings", className: "right-[35%] top-[10%] h-[8rem] w-[8rem] lg:h-[9.5rem] lg:w-[9.5rem]", speed: -150, rotate: 0, round: true, delay: 3.1 },
];

const MOBILE: CardSpec[] = [
  { src: "/images/menu/ra-pasta.jpg", alt: "Ra Pasta", className: "left-1/2 top-0 h-[15rem] w-[11.5rem] -translate-x-[40%]", speed: -40, rotate: 4, delay: 0 },
  { src: "/images/menu/jackfruit-ribs.jpg", alt: "Jackfruit ribs", className: "left-[4%] top-[8.5rem] h-[9rem] w-[8rem]", speed: -80, rotate: -6, delay: 1.2 },
  { src: "/images/menu/kale-salad.jpg", alt: "Hell Yeah Kale Yeah salad", className: "right-[3%] top-[11rem] h-[7.5rem] w-[7.5rem]", speed: -30, rotate: 0, round: true, delay: 2.2 },
];

function Dish({ spec, progress, priority, still }: { spec: CardSpec; progress: MotionValue<number>; priority?: boolean; still: boolean }) {
  const y = useTransform(progress, [0, 1], [0, still ? 0 : spec.speed]);
  const r = useTransform(progress, [0, 1], [spec.rotate, still ? spec.rotate : spec.rotate * 2]);
  return (
    <motion.div className={cn("absolute", spec.className)} style={{ y, rotate: r }}>
      <div className={cn("relative h-full w-full animate-bob overflow-hidden bg-sand shadow-lift motion-reduce:animate-none", spec.round ? "rounded-full" : "rounded-[1.75rem]")} style={{ animationDelay: `${spec.delay}s` }}>
        <Image src={spec.src} alt={spec.alt} fill priority={priority} sizes="(max-width: 768px) 50vw, 20rem" className="object-cover" />
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = !!useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const sunY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 100]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -36]);

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden bg-paper pb-16 pt-10 md:pb-0 md:pt-0">
      <motion.div aria-hidden style={{ y: sunY }} className="absolute hidden rounded-full bg-sun/90 md:-right-[12%] md:top-[2%] md:block md:h-[58vw] md:max-h-[860px] md:w-[58vw] md:max-w-[860px]" />
      <div aria-hidden className="absolute -left-20 bottom-10 hidden h-64 w-64 rounded-full bg-sage/60 md:block" />

      <div className="pointer-events-none absolute inset-0 hidden md:block">
        {DESKTOP.map((c, i) => (
          <Dish key={c.src} spec={c} progress={scrollYProgress} priority={i === 0} still={reduce} />
        ))}
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-5rem)] max-w-6xl flex-col justify-center px-5 md:px-6">
        <motion.div style={{ y: textY }} className="max-w-[40rem] text-center md:max-w-[31rem] md:text-left lg:max-w-[36rem]">
          <p className="eyebrow mb-5">New Orleans · 100% plant-based</p>
          <Headline as="h1" immediate delay={0.1} text="I-tal cuisine inspired by the flavors of *New Orleans.*" className="text-[2.7rem] font-bold leading-[1] text-espresso sm:text-6xl lg:text-[4.4rem]" />
          <motion.p initial={reduce ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }} className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-ink/85 md:mx-0">
            Fresh, 100% plant-based meals made with wholesome ingredients, bold seasonings, and soulful tradition.
          </motion.p>
          <motion.div initial={reduce ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95, duration: 0.8 }} className="mt-8">
            <div className="flex flex-wrap justify-center gap-3 md:justify-start">
              <Magnetic>
                <a href={LINKS.order} target="_blank" rel="noopener noreferrer" className="inline-flex rounded-full bg-leaf-deep px-8 py-4 text-[15px] font-bold tracking-wide text-white shadow-lift transition-colors hover:bg-leaf">
                  Order Online
                </a>
              </Magnetic>
              <Magnetic>
                <Link href="/menu" className="inline-flex rounded-full border-2 border-espresso/25 bg-paper/70 px-7 py-[14px] text-[15px] font-bold tracking-wide text-espresso backdrop-blur transition-colors hover:border-leaf-deep">
                  View Menu
                </Link>
              </Magnetic>
            </div>
            <p className="mt-3 text-sm text-ink/75">Online ordering opens on Toast in a new tab.</p>
          </motion.div>
        </motion.div>

        <div className="pointer-events-none relative mx-auto mt-10 h-[21rem] w-full max-w-sm md:hidden">
          <div aria-hidden className="absolute left-1/2 top-[46%] h-[20rem] w-[20rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sun/90" />
          {MOBILE.map((c, i) => (
            <Dish key={c.src} spec={c} progress={scrollYProgress} priority={i === 0} still={reduce} />
          ))}
        </div>
      </div>
    </section>
  );
}
