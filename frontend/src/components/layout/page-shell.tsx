import * as React from "react";
import { cn } from "@/src/lib/utils";

type PageShellProps = {
  children: React.ReactNode;
  className?: string;
};

export function PageShell({ children, className }: PageShellProps) {
  return <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
}
