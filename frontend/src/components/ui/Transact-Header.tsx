"use client"

import { Bell, Mail, Menu } from "lucide-react"
import React from "react"
import { useFeatureLayout } from "@/src/components/layout"

interface TransactHeaderProps {
  title?: React.ReactNode
  subtitle?: React.ReactNode
  name?: React.ReactNode
  role?: React.ReactNode
  showBadges?: boolean
  rightContent?: React.ReactNode
}

export default function TransactHeader({
  title = "Dashboard",
  subtitle = "Transact - Overview",
  name,
  role = "Bank Customer",
  showBadges = true,
  rightContent,
}: TransactHeaderProps) {
  const featureLayout = useFeatureLayout()
  const displayName = name ?? subtitle

  return (
    <header className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[linear-gradient(90deg,#0B3E5A,#0a3046)] p-3 text-white shadow-sm sm:p-4">
      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        {featureLayout ? (
          <button
            type="button"
            aria-label="Open sidebar menu"
            onClick={featureLayout.openMobileSidebar}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 transition hover:bg-white/15 lg:hidden"
          >
            <Menu size={18} />
          </button>
        ) : null}

        <div className="min-w-0">
          <h2 className="truncate text-xl font-semibold leading-tight sm:text-2xl">{title}</h2>
          {subtitle ? <p className="truncate text-sm text-white/70">{subtitle}</p> : null}
        </div>
      </div>

      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        <div className="flex items-center gap-3 sm:gap-4">
          <button type="button" aria-label="Messages" className="relative rounded-md bg-white/10 p-2 transition hover:bg-white/15">
            <Mail size={18} />
            {showBadges ? <span className="absolute -right-1 -top-1 inline-flex h-2 w-2 rounded-full bg-red-500" /> : null}
          </button>

          <button type="button" aria-label="Notifications" className="relative rounded-md bg-white/10 p-2 transition hover:bg-white/15">
            <Bell size={18} />
            {showBadges ? <span className="absolute -right-1 -top-1 inline-flex h-2 w-2 rounded-full bg-red-500" /> : null}
          </button>
        </div>

        <div className="flex min-w-0 items-center gap-2 rounded-full bg-white/10 px-2 py-1 sm:px-3">
          <div className="h-8 w-8 shrink-0 rounded-full bg-white/20" />
          <div className="hidden min-w-0 text-sm leading-tight sm:block">
            <p className="truncate text-base font-medium">{displayName}</p>
            <p className="truncate text-xs text-white/60">{role}</p>
          </div>
        </div>

        {rightContent}
      </div>
    </header>
  )
}
