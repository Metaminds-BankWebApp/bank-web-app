import * as React from "react";
import { cn } from "@/src/lib/utils";

type SectionProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
};

export function Section({ id, children, className }: SectionProps) {
  return (
    <section id={id} className={cn("py-14 sm:py-16", className)}>
      {children}
    </section>
  );
}
