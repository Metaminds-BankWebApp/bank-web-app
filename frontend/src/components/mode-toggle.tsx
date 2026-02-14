"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";

type ModeToggleProps = {
  className?: string;
};

export function ModeToggle({ className }: ModeToggleProps) {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      className={cn("h-9 w-9 px-0", className)}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
