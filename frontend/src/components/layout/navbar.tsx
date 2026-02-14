"use client";

import Link from "next/link";
import { useState } from "react";
import { Building2, Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/src/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

type NavbarProps = {
  className?: string;
};

export function Navbar({ className }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={cn("sticky top-0 z-50 border-b border-(--primecore-border) bg-(--primecore-surface)/95 backdrop-blur", className)}>
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-base font-semibold text-(--primecore-foreground)">
          <Building2 size={18} className="text-[#2F9D94]" />
          <span>{siteConfig.name}</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {siteConfig.navbar.links.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="text-sm font-medium text-(--primecore-foreground)/80 transition-colors hover:text-(--primecore-foreground)"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href={siteConfig.navbar.auth.login.href}
            className="inline-flex h-9 items-center justify-center rounded-xl px-3 text-sm font-medium text-(--primecore-foreground) transition-colors hover:bg-(--primecore-surface-soft)"
          >
            {siteConfig.navbar.auth.login.title}
          </Link>
          <Link
            href={siteConfig.navbar.auth.signup.href}
            className="inline-flex h-9 items-center justify-center rounded-xl bg-[#2F9D94] px-3 text-sm font-medium text-[#F7F6F2] transition-colors hover:bg-[#258b84]"
          >
            {siteConfig.navbar.auth.signup.title}
          </Link>
          <ThemeToggle />
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-(--primecore-foreground) md:hidden"
          aria-label="Toggle navigation"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-(--primecore-border) bg-(--primecore-surface) md:hidden">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-4 py-3 sm:px-6">
            {siteConfig.navbar.links.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="rounded-md px-2 py-2 text-sm font-medium text-(--primecore-foreground)/90 hover:bg-(--primecore-surface-soft)"
                onClick={() => setIsOpen(false)}
              >
                {item.title}
              </Link>
            ))}
            <div className="mt-2 flex items-center gap-2">
              <Link
                href={siteConfig.navbar.auth.login.href}
                className="inline-flex h-9 flex-1 items-center justify-center rounded-xl px-3 text-sm font-medium text-(--primecore-foreground) transition-colors hover:bg-(--primecore-surface-soft)"
              >
                {siteConfig.navbar.auth.login.title}
              </Link>
              <Link
                href={siteConfig.navbar.auth.signup.href}
                className="inline-flex h-9 flex-1 items-center justify-center rounded-xl bg-[#2F9D94] px-3 text-sm font-medium text-[#F7F6F2] transition-colors hover:bg-[#258b84]"
              >
                {siteConfig.navbar.auth.signup.title}
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
