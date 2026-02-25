"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Bell, CheckCircle2, Info, Menu, Plus, TriangleAlert, X } from "lucide-react";
import { Sidebar, useFeatureLayout } from "@/src/components/layout";
import { cn } from "@/src/lib/utils";
import type { UserRole } from "@/config/site";
import {
  type NotificationItem,
  getNotificationsForContext,
  resolveNotificationRouteContext,
} from "@/src/components/notifications/notification-data";

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

const NOTIFICATION_KIND_ICON: Record<NotificationItem["kind"], React.ReactNode> = {
  info: <Info size={14} className="text-sky-400" />,
  success: <CheckCircle2 size={14} className="text-emerald-400" />,
  warning: <TriangleAlert size={14} className="text-amber-400" />,
  alert: <TriangleAlert size={14} className="text-rose-400" />,
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
  notificationBadge,
  rightContent,
  avatarSrc,
  avatarStatusDot = false,
  menuMode = "none",
  sidebarRole = "BANK_OFFICER",
  sidebarHideCollapse = false,
}: ModuleHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const featureLayout = useFeatureLayout();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const notificationsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setIsMenuOpen(false);
      setIsNotificationsOpen(false);
    });
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  useEffect(() => {
    if (!isNotificationsOpen) return;

    const handleMouseDown = (event: MouseEvent) => {
      if (!notificationsRef.current?.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isNotificationsOpen]);

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
        onClick={() => {
          const base = pathname?.startsWith("/bank-customer")
            ? "/bank-customer"
            : pathname?.startsWith("/public-customer")
            ? "/public-customer"
            : "";
          const target = base ? `${base}/spendiq/add` : "/public-customer/spendiq/add";
          router.push(target);
        }}
        className="hidden items-center gap-2 rounded-lg bg-blue-500 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600 md:inline-flex"
      >
        <Plus size={16} />
        <span>Add Entry</span>
      </button>
    );
  }, [rightContent, theme, router, pathname]);

  const handleOpenMenu = () => {
    if (menuMode === "feature-layout") {
      featureLayout?.openMobileSidebar();
      return;
    }

    if (menuMode === "sidebar-overlay") {
      setIsMenuOpen(true);
    }
  };

  const routeContext = useMemo(() => resolveNotificationRouteContext(pathname), [pathname]);
  const notifications = useMemo(() => getNotificationsForContext(routeContext), [routeContext]);
  const previewNotifications = useMemo(() => notifications.slice(0, 4), [notifications]);
  const unreadCount = useMemo(() => notifications.filter((item) => item.unread).length, [notifications]);
  const profilePath = routeContext.profilePath;
  const notificationsPath = routeContext.notificationsPath;

  const profileContent = (
    <>
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
    </>
  );

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
          <div className="relative" ref={notificationsRef}>
            <button
              type="button"
              aria-label="Notifications"
              onClick={() => setIsNotificationsOpen((current) => !current)}
              className="relative rounded-md bg-white/10 p-2 transition hover:bg-white/15"
            >
              <Bell size={18} />
              <NotificationBadge
                show={showBadges}
                value={typeof notificationBadge === "number" ? notificationBadge : unreadCount || notificationBadge}
              />
            </button>

            {isNotificationsOpen ? (
              <div className="fixed left-2 right-2 top-16 z-50 rounded-2xl border border-slate-200 bg-white p-3 text-slate-900 shadow-2xl sm:absolute sm:left-auto sm:right-0 sm:top-12 sm:w-[360px] sm:max-w-[92vw]">
                <div className="mb-2 flex items-center justify-between px-1">
                  <div>
                    <p className="text-sm font-semibold">Notifications</p>
                    <p className="text-xs text-slate-500">{unreadCount} unread updates</p>
                  </div>
                  {notificationsPath ? (
                    <button
                      type="button"
                      onClick={() => {
                        setIsNotificationsOpen(false);
                        router.push(notificationsPath);
                      }}
                      className="rounded-md bg-[#0d3b66] px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-white transition hover:bg-[#0a2e50]"
                    >
                      View All
                    </button>
                  ) : null}
                </div>

                <div className="max-h-80 space-y-2 overflow-y-auto pr-1">
                  {previewNotifications.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setIsNotificationsOpen(false);
                        if (item.ctaHref) {
                          router.push(item.ctaHref);
                          return;
                        }
                        if (notificationsPath) {
                          router.push(notificationsPath);
                        }
                      }}
                      className={cn(
                        "w-full rounded-xl border px-3 py-2.5 text-left transition-colors",
                        item.unread ? "border-slate-200 bg-slate-50 hover:bg-slate-100" : "border-slate-100 hover:bg-slate-50"
                      )}
                    >
                      <div className="mb-1 flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          {NOTIFICATION_KIND_ICON[item.kind]}
                          <p className="text-xs font-semibold text-slate-900">{item.title}</p>
                        </div>
                        {item.unread ? <span className="mt-1 h-2 w-2 rounded-full bg-sky-500" /> : null}
                      </div>
                      <p className="line-clamp-2 text-xs text-slate-600">{item.message}</p>
                      <p className="mt-1 text-[11px] text-slate-500">{item.time}</p>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          {resolvedRightContent}

          {profilePath ? (
            <button
              type="button"
              onClick={() => router.push(profilePath)}
              className="flex min-w-0 items-center gap-2 rounded-full bg-white/10 px-2 py-1 transition hover:bg-white/20 sm:px-3"
              aria-label="Go to profile page"
            >
              {profileContent}
            </button>
          ) : (
            <div className="flex min-w-0 items-center gap-2 rounded-full bg-white/10 px-2 py-1 sm:px-3">{profileContent}</div>
          )}
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
            <Sidebar role={sidebarRole} className="h-full w-full md:w-full" hideCollapse={sidebarHideCollapse || sidebarRole === "ADMIN"} />
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
