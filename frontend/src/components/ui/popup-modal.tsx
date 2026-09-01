"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

type PopupModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
	/** Optional fixed/minimum dialog sizing for tabbed or data-dense modal content. */
	className?: string;
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
	className = "",
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

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center p-4 sm:p-6" style={{ zIndex: 1000 }}>
      <div
        aria-hidden="true"
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={() => onOpenChange(false)}
      />

      <div
        role="dialog"
        aria-modal="true"
		className={`relative z-10 w-full ${sizeClass[size]} flex max-h-[calc(100vh-2rem)] flex-col overflow-hidden rounded-2xl bg-white text-left align-middle shadow-2xl transition-all sm:max-h-[calc(100vh-4rem)] ${className}`}
      >
        {(title || description) && (
          <div className="flex shrink-0 items-start justify-between border-b border-slate-100 px-6 py-5">
            <div>
              {title && <h3 className="text-lg font-semibold leading-6 text-slate-900">{title}</h3>}
              {description && <p className="mt-1.5 text-sm text-slate-500">{description}</p>}
            </div>
            <button
              type="button"
              className="ml-4 inline-flex shrink-0 items-center justify-center rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#3e9fd3]"
              onClick={() => onOpenChange(false)}
            >
              <span className="sr-only">Close</span>
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        )}

        {!title && !description && (
          <button
            type="button"
            className="absolute right-4 top-4 z-20 inline-flex shrink-0 items-center justify-center rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#3e9fd3]"
            onClick={() => onOpenChange(false)}
          >
            <span className="sr-only">Close</span>
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        )}

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {children}
        </div>

        {footer && (
          <div className="shrink-0 border-t border-slate-100 bg-slate-50 px-6 py-4 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
