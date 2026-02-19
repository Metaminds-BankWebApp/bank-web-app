"use client";

import React from "react";
import { Menu } from "lucide-react";
import { useFeatureLayout } from "@/src/components/layout";

type CreditLensHeaderProps = {
  title?: string;
  subtitle?: string;
  name?: string;
  role?: string;
  showBadges?: boolean;
};

export default function CreditLensHeader({
  title = "Dashboard",
  subtitle = "CreditLens - Overview",
  name = "Kamal Edirisinghe",
  role = "Public Customer",
  showBadges = true,
}: CreditLensHeaderProps) {
  const featureLayout = useFeatureLayout();

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[linear-gradient(90deg,#0b2447,#09203a)] p-3 text-white shadow-sm sm:p-4">
      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        {featureLayout ? (
          <button
            type="button"
            aria-label="Open sidebar menu"
            onClick={featureLayout.openMobileSidebar}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 transition hover:bg-white/15 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        ) : null}

        <div className="min-w-0">
          <h2 className="truncate text-xl font-semibold leading-tight sm:text-2xl">{title}</h2>
          {subtitle ? <p className="truncate text-sm text-white/70">{subtitle}</p> : null}
        </div>
      </div>

      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        <div className="relative">
          <button
            type="button"
            className="rounded-md bg-white/10 p-2 transition hover:bg-white/15"
            aria-label="Messages"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </button>
          {showBadges ? (
            <span className="absolute -right-1 -top-1 inline-flex h-2 w-2 rounded-full bg-red-500" />
          ) : null}
        </div>

        <div className="relative">
          <button
            type="button"
            className="rounded-md bg-white/10 p-2 transition hover:bg-white/15"
            aria-label="Notifications"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h11z"
              />
            </svg>
          </button>
          {showBadges ? (
            <span className="absolute -right-1 -top-1 inline-flex h-2 w-2 rounded-full bg-red-500" />
          ) : null}
        </div>

        <div className="flex min-w-0 items-center gap-2 rounded-full bg-white/10 px-2 py-1 sm:px-3">
          <div className="h-8 w-8 shrink-0 rounded-full bg-white/20" />
          <div className="hidden min-w-0 text-sm leading-tight sm:block">
            <div className="truncate text-base font-medium">{name}</div>
            <div className="truncate text-xs text-white/60">{role}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
