import { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={cn("overflow-hidden rounded-3xl border border-espresso/10 bg-white shadow-soft", className)}>{children}</div>;
}

export function CardContent({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={cn("p-6", className)}>{children}</div>;
}
