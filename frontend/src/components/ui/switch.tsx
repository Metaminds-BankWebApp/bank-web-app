"use client";

import * as React from "react";
import { cn } from "@/src/lib/utils";

export interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  id?: string;
  "aria-label"?: string;
}

export function Switch({
  checked,
  onCheckedChange,
  disabled = false,
  className,
  id,
  "aria-label": ariaLabel,
}: SwitchProps) {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        "relative inline-flex h-9 w-16 items-center rounded-full border transition-all duration-200",
        "border-(--primecore-border) focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-[#2F9D94] focus-visible:ring-offset-2 ring-offset-(--primecore-background)",
        checked ? "bg-[#025F67]" : "bg-(--primecore-surface-soft)",
        disabled && "cursor-not-allowed opacity-60",
        className,
      )}
    >
      <span
        className={cn(
          "inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#F7F6F2] text-[10px]",
          "font-semibold uppercase tracking-tight text-[#2F9D94] shadow-[0_2px_8px_rgba(0,0,0,0.25)] transition-transform duration-200",
          checked ? "translate-x-7" : "translate-x-1",
        )}
      >
       
      </span>
    </button>
  );
}
