import * as React from "react";
import { cn } from "@/src/lib/utils";

type BadgeVariant = "success" | "warning" | "danger" | "info" | "outline";

const badgeVariantClasses: Record<BadgeVariant, string> = {
  success: "border bg-[var(--badge-success-bg)] text-[var(--badge-success-text)] border-[var(--badge-success-border)]",
  warning: "border bg-[var(--badge-warning-bg)] text-[var(--badge-warning-text)] border-[var(--badge-warning-border)]",
  danger: "border bg-[var(--badge-danger-bg)] text-[var(--badge-danger-text)] border-[var(--badge-danger-border)]",
  info: "border bg-[var(--badge-info-bg)] text-[var(--badge-info-text)] border-[var(--badge-info-border)]",
  outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({ className, variant = "info", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]",
        badgeVariantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}
