"use client";

import { useTheme } from "next-themes";
import { Switch } from "@/src/components/ui/switch";
import { cn } from "@/src/lib/utils";

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <Switch
      checked={isDark}
      onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
      aria-label="Toggle theme"
      className={cn("transition-transform", className)}
    />
  );
}
