"use client";

import * as React from "react";
import { cn } from "@/src/lib/utils";

type TableActionTone = "slate" | "blue" | "red";

const toneClasses: Record<TableActionTone, string> = {
  slate: "text-slate-500 hover:bg-slate-100 hover:text-slate-700",
  blue: "text-blue-600 hover:bg-blue-50 hover:text-blue-700",
  red: "text-red-600 hover:bg-red-50 hover:text-red-700",
};

type TableActionIconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  tone?: TableActionTone;
};

export const TableActionIconButton = React.forwardRef<HTMLButtonElement, TableActionIconButtonProps>(
  ({ label, tone = "slate", type = "button", className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        aria-label={label}
        title={label}
        className={cn(
          "inline-flex h-8 w-8 items-center justify-center rounded-lg transition",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F9D94] focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-40",
          toneClasses[tone],
          className,
        )}
        {...props}
      />
    );
  },
);

TableActionIconButton.displayName = "TableActionIconButton";
