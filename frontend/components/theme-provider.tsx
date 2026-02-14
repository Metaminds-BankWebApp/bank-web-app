"use client";

import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes";

type PrimeCoreThemeProviderProps = Omit<ThemeProviderProps, "attribute">;

export function ThemeProvider({ children, ...props }: PrimeCoreThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      storageKey="primecore-theme"
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
