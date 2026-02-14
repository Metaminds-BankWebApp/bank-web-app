import * as React from "react";
import { cn } from "@/src/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[#2F9D94] text-[#F7F6F2] shadow-[0_8px_18px_-14px_rgba(2,95,103,0.9)] hover:bg-[#258b84] dark:bg-[linear-gradient(120deg,#2F9D94,#025F67)] dark:hover:brightness-105",
  secondary:
    "bg-[#15466f] text-[#F7F6F2] hover:bg-[#0f3b5f] dark:bg-[#113a5e] dark:hover:bg-[#17507f]",
  outline:
    "border border-(--primecore-border) bg-transparent text-(--primecore-foreground) hover:bg-[#2F9D94]/10 dark:hover:bg-[#2F9D94]/14",
  ghost:
    "bg-transparent text-(--primecore-foreground) hover:bg-[#2F9D94]/10 dark:hover:bg-[#2F9D94]/20",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-5 text-base",
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
