import { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Badge({ children, className = "", variant = "default" }: { children: ReactNode; className?: string; variant?: "default" | "secondary" | "sun" }) {
  const v = {
    default: "bg-leaf-deep/10 text-leaf-deep",
    secondary: "bg-sand text-bark",
    sun: "bg-sun text-espresso",
  }[variant];
  return <span className={cn("inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-widest", v, className)}>{children}</span>;
}
