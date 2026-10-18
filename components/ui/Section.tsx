import { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Section({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={cn("px-5 py-16 md:px-6 md:py-28", className)}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow mb-4">{children}</p>;
}

export function SectionHeading({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <h2 className={cn("font-display text-4xl font-bold leading-[1.05] text-espresso md:text-6xl", className)}>{children}</h2>;
}
