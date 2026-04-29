"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/src/components/ui/button";

type PopupModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
};

const sizeClass: Record<NonNullable<PopupModalProps['size']>, string> = {
  sm: "max-w-md",
  md: "max-w-2xl",
  lg: "max-w-4xl",
  xl: "max-w-[min(96vw,1200px)]",
};

export default function PopupModal({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  size = "md",
}: PopupModalProps) {
  useEffect(() => {
    if (!open) return;

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onOpenChange(false);
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onEscape);

    return () => {
      window.removeEventListener("keydown", onEscape);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center p-3 sm:p-6" style={{ zIndex: 120 }}>
      <button
        aria-label="Close modal"
        onClick={() => onOpenChange(false)}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
      />

      <div
        role="dialog"
        aria-modal="true"
        className={`relative z-10 w-full ${sizeClass[size]} overflow-hidden rounded-[30px] border border-slate-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(248,250,252,0.97)_100%)] text-slate-800 shadow-[0_32px_90px_-35px_rgba(15,23,42,0.55)] backdrop-blur-xl`}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[linear-gradient(135deg,rgba(13,59,102,0.98)_0%,rgba(18,95,153,0.94)_52%,rgba(96,165,250,0.9)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-28 h-px bg-white/60" />
        <div className="pointer-events-none absolute -left-10 top-10 h-44 w-44 rounded-full bg-sky-300/20 blur-[76px]" />
        <div className="pointer-events-none absolute right-4 top-4 h-56 w-56 rounded-full bg-white/25 blur-[90px]" />

        <div className="relative flex items-start justify-between gap-4 px-5 pb-4 pt-4 text-white sm:px-6">
          <div className="max-w-3xl">
            {title && <h3 className="text-xl font-semibold tracking-tight sm:text-[1.75rem]">{title}</h3>}
            {description && <p className="mt-1 text-sm leading-6 text-sky-50/82">{description}</p>}
          </div>
          <button
            type="button"
            aria-label="Close modal"
            onClick={() => onOpenChange(false)}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/12 transition-colors hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="relative max-h-[calc(100vh-8rem)] overflow-y-auto px-5 pb-4 sm:px-6">{children}</div>

        {footer ? (
          <div className="relative flex flex-col-reverse gap-2 border-t border-slate-200/80 bg-white/85 px-5 py-3.5 shadow-[0_-10px_30px_-24px_rgba(15,23,42,0.35)] sm:flex-row sm:justify-end sm:px-6">{footer}</div>
        ) : (
          <div className="relative flex flex-col-reverse gap-2 border-t border-slate-200/80 bg-white/85 px-5 py-3.5 shadow-[0_-10px_30px_-24px_rgba(15,23,42,0.35)] sm:flex-row sm:justify-end sm:px-6">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="border-slate-300 text-slate-700 hover:bg-slate-100">
              Close
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
