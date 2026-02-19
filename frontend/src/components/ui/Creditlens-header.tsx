"use client";

import React from "react";

type CreditLensHeaderProps = {
  title?: string;
  subtitle?: string;
  name?: string;
  role?: string;
  showBadges?: boolean;
};

export default function CreditLensHeader({
  title = "Dashboard",
  subtitle = "CreditLens — Overview",
  name = "Kamal Edirisinghe",
  role = "Public Customer",
  showBadges = true,
}: CreditLensHeaderProps) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-[linear-gradient(90deg,#0b2447,#09203a)] p-4 text-white shadow-sm">
      {/* Left */}
      <div className="flex items-center gap-3">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-white/70">{subtitle}</p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Mail */}
        <div className="relative">
          <button
            type="button"
            className="rounded-md bg-white/10 p-2 hover:bg-white/15 transition"
            aria-label="Messages"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </button>
          {showBadges && (
            <span className="absolute -right-1 -top-1 inline-flex h-2 w-2 rounded-full bg-red-500" />
          )}
        </div>

        {/* Bell */}
        <div className="relative">
          <button
            type="button"
            className="rounded-md bg-white/10 p-2 hover:bg-white/15 transition"
            aria-label="Notifications"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h11z"
              />
            </svg>
          </button>
          {showBadges && (
            <span className="absolute -right-1 -top-1 inline-flex h-2 w-2 rounded-full bg-red-500" />
          )}
        </div>

        {/* User chip */}
        <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1">
          <div className="h-8 w-8 rounded-full bg-white/20" />
          <div className="text-sm leading-tight">
            <div className="font-medium">{name}</div>
            <div className="text-xs text-white/60">{role}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
