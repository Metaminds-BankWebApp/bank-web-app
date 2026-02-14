"use client";

import * as React from "react";
import { cn } from "@/src/lib/utils";

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function Dialog({ open, onOpenChange, title, description, children, footer }: DialogProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close dialog backdrop"
        className="absolute inset-0 bg-[#063154]/50 backdrop-blur-[2px]"
        onClick={() => onOpenChange(false)}
      />
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "relative z-10 w-full max-w-lg rounded-2xl border border-(--primecore-border)",
          "bg-(--primecore-surface) p-6 shadow-[0_24px_48px_-26px_rgba(2,14,28,0.75)] dark:bg-(--primecore-surface)",
        )}
      >
        {(title || description) && (
          <div className="mb-4 space-y-1">
            {title && <h2 className="text-lg font-semibold text-(--primecore-foreground)">{title}</h2>}
            {description && <p className="text-sm text-(--primecore-foreground)/75">{description}</p>}
          </div>
        )}
        <div className="text-sm text-(--primecore-foreground)">{children}</div>
        {footer && <div className="mt-5 flex justify-end gap-2">{footer}</div>}
      </div>
    </div>
  );
}
