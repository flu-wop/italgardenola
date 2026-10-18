import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "default" | "outline" | "ghost" | "light";
  external?: boolean;
  className?: string;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-body text-[15px] font-bold tracking-wide transition-colors duration-300";

export const buttonVariants = {
  default: "bg-leaf-deep text-white shadow-soft hover:bg-leaf",
  light: "bg-paper text-espresso shadow-soft hover:bg-white",
  outline: "border-2 border-espresso/25 text-espresso hover:border-leaf-deep hover:text-leaf-deep",
  ghost: "text-espresso hover:text-leaf",
};

export function Button({ href, children, variant = "default", external, className = "" }: ButtonProps) {
  const classes = cn(base, buttonVariants[variant], className);
  if (external || href.startsWith("tel:") || href.startsWith("mailto:")) {
    return (
      <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className={classes}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
