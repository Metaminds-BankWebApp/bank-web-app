"use client";

import Link from "next/link";
import { useState } from "react";
import { Building2, Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/src/lib/utils";

type NavbarProps = {
  className?: string;
};

export function Navbar({ className }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={cn("absolute top-0 z-50 w-full", className)}>
      <div className="mx-auto flex h-20 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 text-base font-semibold text-white">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/45 bg-white/10">
            <Building2 size={16} />
          </span>
          <span>{siteConfig.name}</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {siteConfig.navbar.links.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="text-sm font-medium text-white/85 transition-colors hover:text-white"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href={siteConfig.navbar.auth.login.href}
            className="inline-flex h-8 items-center justify-center rounded-lg border border-white/35 bg-white px-3 text-xs font-semibold text-(--primecore-foreground) transition-colors hover:bg-white/90"
          >
            {siteConfig.navbar.auth.login.title}
          </Link>
          <Link
            href={siteConfig.navbar.auth.signup.href}
            className="inline-flex h-8 items-center justify-center rounded-lg bg-primary px-3 text-xs font-semibold text-white transition-colors hover:bg-primary/90"
          >
            {siteConfig.navbar.auth.signup.title}
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-white md:hidden"
          aria-label="Toggle navigation"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-white/15 bg-[#0a3b60]/95 backdrop-blur md:hidden">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-4 py-3 sm:px-6">
            {siteConfig.navbar.links.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="rounded-md px-2 py-2 text-sm font-medium text-white/90 hover:bg-white/10"
                onClick={() => setIsOpen(false)}
              >
                {item.title}
              </Link>
            ))}
            <div className="mt-2 flex items-center gap-2">
              <Link
                href={siteConfig.navbar.auth.login.href}
                className="inline-flex h-9 flex-1 items-center justify-center rounded-xl bg-white px-3 text-sm font-medium text-(--primecore-foreground) transition-colors hover:bg-white/90"
              >
                {siteConfig.navbar.auth.login.title}
              </Link>
              <Link
                href={siteConfig.navbar.auth.signup.href}
                className="inline-flex h-9 flex-1 items-center justify-center rounded-xl bg-primary px-3 text-sm font-medium text-white transition-colors hover:bg-primary/90"
              >
                {siteConfig.navbar.auth.signup.title}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
