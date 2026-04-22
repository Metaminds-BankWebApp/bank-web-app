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
  variant?: "brand" | "surface";
};

const sizeClass: Record<NonNullable<PopupModalProps['size']>, string> = {
  sm: "max-w-md",
  md: "max-w-2xl",
  lg: "max-w-4xl",
  xl: "max-w-6xl",
};

export default function PopupModal({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  size = "md",
  variant = "brand",
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

  const isBrand = variant === "brand";

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6">
      <button
        aria-label="Close modal"
        onClick={() => onOpenChange(false)}
        className={`absolute inset-0 ${isBrand ? "bg-[#052540]/60 backdrop-blur-[2px]" : "bg-slate-900/30 backdrop-blur-[1px]"}`}
      />

      <div
        role="dialog"
        aria-modal="true"
        className={`relative z-10 w-full ${sizeClass[size]} overflow-hidden rounded-[22px] p-5 ${
          isBrand
            ? "border border-sky-200/10 bg-[linear-gradient(145deg,#08345a_0%,#0a4675_55%,#0d568f_100%)] text-white shadow-[0_30px_80px_-40px_rgba(2,18,33,0.85)]"
            : "border border-slate-200 bg-white text-slate-900 shadow-2xl"
        }`}
      >
        {isBrand && <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#76d5ff]/20 blur-[80px]" />}

        <div className="relative flex items-start justify-between gap-4">
          <div>
            {title && <h3 className="text-xl font-semibold sm:text-2xl">{title}</h3>}
            {description && (
              <p className={`mt-1 text-sm ${isBrand ? "text-sky-100/80" : "text-slate-500"}`}>
                {description}
              </p>
            )}
          </div>
          <button
            type="button"
            aria-label="Close modal"
            onClick={() => onOpenChange(false)}
            className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors ${
              isBrand ? "bg-white/10 hover:bg-white/20" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5">{children}</div>

        {footer ? (
          <div className="relative mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">{footer}</div>
        ) : (
          <div className="relative mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className={isBrand ? "border-white/30 text-white hover:bg-white/10" : "border-slate-300 text-slate-700 hover:bg-slate-100"}
            >
              Close
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
