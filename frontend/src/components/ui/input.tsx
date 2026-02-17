import * as React from "react";
import { cn } from "@/src/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  containerClassName?: string;
  labelClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, error, helperText, className, containerClassName, labelClassName, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const messageId = `${inputId}-message`;

    return (
      <div className={cn("space-y-1.5", containerClassName)}>
        {label && <label htmlFor={inputId} className={cn("text-sm font-medium text-(--primecore-foreground)", labelClassName)}>{label}</label>}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={error || helperText ? messageId : undefined}
          className={cn(
            "w-full rounded-lg border bg-(--primecore-surface) px-3.5 py-2.5 text-sm text-(--primecore-foreground)",
            "placeholder:text-(--primecore-foreground)/55",
            "border-(--primecore-border) focus-visible:outline-none",
            "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
            "ring-offset-background",
            error && "border-red-500 focus-visible:ring-red-500",
            className,
          )}
          {...props}
        />
        {(error || helperText) && (
          <p
            id={messageId}
            className={cn("text-xs", error ? "text-red-500 dark:text-red-400" : "text-(--primecore-foreground)/70")}
          >
            {error ?? helperText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
