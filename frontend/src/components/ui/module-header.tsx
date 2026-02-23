"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { Bell, Mail, Menu, Plus, X } from "lucide-react";
import { Sidebar, useFeatureLayout } from "@/src/components/layout";
import { cn } from "@/src/lib/utils";
import type { UserRole } from "@/config/site";

type ModuleHeaderTheme = "creditlens" | "transact" | "loansense" | "spendiq" | "staff";
type ModuleHeaderMenuMode = "none" | "feature-layout" | "sidebar-overlay";
type BadgeValue = string | number | null | undefined;

type ModuleHeaderProps = {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  name?: React.ReactNode;
  role?: React.ReactNode;
  theme?: ModuleHeaderTheme;
  className?: string;
  showBadges?: boolean;
  mailBadge?: BadgeValue;
  notificationBadge?: BadgeValue;
  rightContent?: React.ReactNode;
  avatarSrc?: string;
  avatarStatusDot?: boolean;
  menuMode?: ModuleHeaderMenuMode;
  sidebarRole?: Extract<UserRole, "BANK_OFFICER" | "ADMIN">;
  sidebarHideCollapse?: boolean;
};

const THEME_BG: Record<ModuleHeaderTheme, string> = {
  creditlens: "bg-[linear-gradient(90deg,#0b2447,#09203a)]",
  transact: "bg-[linear-gradient(90deg,#0B3E5A,#0a3046)]",
  loansense: "bg-[linear-gradient(90deg,#0d3b66,#0a2f51)]",
  spendiq: "bg-[linear-gradient(90deg,#0b1a3a,#0a234c)]",
  staff: "bg-[linear-gradient(90deg,#0b1a3a,#0a234c)]",
};

function NotificationBadge({ show, value }: { show: boolean; value: BadgeValue }) {
  if (!show) return null;

  if (value === null) {
    return <span className="absolute -right-1 -top-1 inline-flex h-2 w-2 rounded-full bg-red-500" />;
  }

  if (value === undefined) {
    return <span className="absolute -right-1 -top-1 inline-flex h-2 w-2 rounded-full bg-red-500" />;
  }

  return (
    <span className="absolute -right-1 -top-1 inline-flex min-h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
      {value}
    </span>
  );
}

export default function ModuleHeader({
  title = "Dashboard",
  subtitle,
  name = "Kamal Edirisinghe",
  role = "User",
  theme = "creditlens",
  className,
  showBadges = true,
  mailBadge,
  notificationBadge,
  rightContent,
  avatarSrc,
  avatarStatusDot = false,
  menuMode = "none",
  sidebarRole = "BANK_OFFICER",
  sidebarHideCollapse = false,
}: ModuleHeaderProps) {
  const pathname = usePathname();
  const featureLayout = useFeatureLayout();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) return;
    const raf = requestAnimationFrame(() => setIsMenuOpen(false));
    return () => cancelAnimationFrame(raf);
  }, [isMenuOpen, pathname]);

  const canOpenMenu = useMemo(() => {
    if (menuMode === "sidebar-overlay") return true;
    if (menuMode === "feature-layout") return Boolean(featureLayout);
    return false;
  }, [featureLayout, menuMode]);

  const resolvedRightContent = useMemo(() => {
    if (rightContent !== undefined) return rightContent;
    if (theme !== "spendiq") return null;

    return (
      <button
        type="button"
        className="hidden items-center gap-2 rounded-lg bg-blue-500 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600 md:inline-flex"
      >
        <Plus size={16} />
        <span>Add Entry</span>
      </button>
    );
  }, [rightContent, theme]);

  const handleOpenMenu = () => {
    if (menuMode === "feature-layout") {
      featureLayout?.openMobileSidebar();
      return;
    }

    if (menuMode === "sidebar-overlay") {
      setIsMenuOpen(true);
    }
  };

  return (
    <>
      <header
        className={cn(
          "flex flex-wrap items-center justify-between gap-3 rounded-2xl p-3 text-white shadow-sm sm:p-4",
          THEME_BG[theme],
          className
        )}
      >
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          {canOpenMenu ? (
            <button
              type="button"
              aria-label="Open sidebar menu"
              onClick={handleOpenMenu}
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
          <button
            type="button"
            aria-label="Messages"
            className="relative rounded-md bg-white/10 p-2 transition hover:bg-white/15"
          >
            <Mail size={18} />
            <NotificationBadge show={showBadges} value={mailBadge} />
          </button>

          <button
            type="button"
            aria-label="Notifications"
            className="relative rounded-md bg-white/10 p-2 transition hover:bg-white/15"
          >
            <Bell size={18} />
            <NotificationBadge show={showBadges} value={notificationBadge} />
          </button>

          {resolvedRightContent}

          <div className="flex min-w-0 items-center gap-2 rounded-full bg-white/10 px-2 py-1 sm:px-3">
            <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-white/20">
              {avatarSrc ? (
                <Image src={avatarSrc} alt="User" fill className="object-cover" sizes="32px" unoptimized />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-slate-400 to-slate-600" />
              )}
              {avatarStatusDot ? (
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border border-[#0d3b66] bg-green-500" />
              ) : null}
            </div>
            <div className="hidden min-w-0 text-sm leading-tight sm:block">
              <p className="truncate text-base font-medium">{name}</p>
              <p className="truncate text-xs text-white/60">{role}</p>
            </div>
          </div>
        </div>
      </header>

      {menuMode === "sidebar-overlay" && isMenuOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setIsMenuOpen(false)}
            className="absolute inset-0 bg-slate-950/55"
          />
          <div className="relative h-full w-72 max-w-[85vw]">
            <Sidebar role={sidebarRole} className="h-full w-full md:w-full" hideCollapse={sidebarHideCollapse} />
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 text-white hover:bg-white/25"
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
