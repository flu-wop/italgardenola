"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { lockScroll } from "@/components/motion/SmoothScroll";
import { cn } from "@/lib/cn";

/**
 * Accessible modal on the native <dialog>: showModal() makes the rest of the
 * page inert (focus trap), Escape fires `cancel`, and focus returns to the
 * trigger on close. Backdrop clicks close it.
 */
export function Modal({
  open,
  onClose,
  label,
  className,
  children,
}: {
  open: boolean;
  onClose: () => void;
  label: string;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      lockScroll(true);
    } else if (!open && d.open) {
      d.close();
    }
    return () => {
      if (open) lockScroll(false);
    };
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-label={label}
      data-lenis-prevent
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClose={onClose}
      onMouseDown={(e) => {
        if (e.target === ref.current) onClose();
      }}
      className={cn("m-0 max-h-none max-w-none bg-transparent p-0 text-ink backdrop:bg-transparent", className)}
    >
      {open && children}
    </dialog>
  );
}
