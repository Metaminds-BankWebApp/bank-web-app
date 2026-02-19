import * as React from "react";
import { cn } from "@/src/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg" | "icon";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white shadow-[0_8px_18px_-14px_rgba(79,70,229,0.5)] hover:bg-primary/90 hover:brightness-110 active:scale-[0.98] transition-transform duration-200 dark:bg-[linear-gradient(120deg,var(--primecore-primary),#4338ca)] dark:shadow-[0_4px_20px_-8px_rgba(79,70,229,0.7)]",
  secondary:
    "bg-(--primecore-surface-soft) text-(--primecore-foreground) hover:bg-(--primecore-surface-soft)/90 dark:bg-(--primecore-surface-soft) dark:text-white dark:hover:bg-(--primecore-surface-soft)/80 border border-(--primecore-border)",
  outline:
    "border border-(--primecore-border) bg-transparent text-(--primecore-foreground) hover:bg-primary/10 hover:border-primary/50 dark:hover:bg-primary/15",
  ghost:
    "bg-transparent text-(--primecore-foreground) hover:bg-primary/10 dark:hover:bg-primary/20",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-5 text-base",
  icon: "h-10 w-10 p-0",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading = false, disabled, children, ...props }, ref) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F9D94] focus-visible:ring-offset-2",
          "ring-offset-(--primecore-background) disabled:cursor-not-allowed disabled:opacity-60",
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        disabled={isDisabled}
        {...props}
      >
        {loading && (
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
        )}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
