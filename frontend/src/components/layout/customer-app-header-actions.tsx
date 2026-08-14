"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Bell, CheckCircle2, Info, TriangleAlert, UserRound, X } from "lucide-react";
import { getMyUserProfile, resolveUserProfileImageUrl } from "@/src/api/profile/user-profile.service";
import {
  type FeatureSegment,
  type NotificationItem,
  type RoleSegment,
  buildNotificationRouteContext,
  getNotificationsForContext,
} from "@/src/components/notifications/notification-data";
import { cn } from "@/src/lib/utils";
import { useAuthStore } from "@/src/store";

type CustomerAppHeaderActionsProps = {
  roleSegment: Extract<RoleSegment, "bank-customer" | "public-customer">;
  defaultFeature: FeatureSegment;
  className?: string;
};

const NOTIFICATION_KIND_ICON: Record<NotificationItem["kind"], ReactNode> = {
  info: <Info size={14} className="text-sky-400" />,
  success: <CheckCircle2 size={14} className="text-emerald-400" />,
  warning: <TriangleAlert size={14} className="text-amber-400" />,
  alert: <TriangleAlert size={14} className="text-rose-400" />,
};

function formatRoleLabel(roleName?: string | null) {
  const normalized = roleName?.trim() ?? "";
  if (!normalized) return null;

  return normalized
    .toLowerCase()
    .split("_")
    .map((part) => (part ? part.charAt(0).toUpperCase() + part.slice(1) : part))
    .join(" ");
}

export function CustomerAppHeaderActions({
  roleSegment,
  defaultFeature,
  className,
}: CustomerAppHeaderActionsProps) {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const authUser = useAuthStore((state) => state.user);
  const authIdentity = useAuthStore((state) => state.identity);
  const authProfile = useAuthStore((state) => state.profile);
  const setAuthProfile = useAuthStore((state) => state.setProfile);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);
  const notificationsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!token || authProfile) return;

    let isCancelled = false;

    void getMyUserProfile()
      .then((profileData) => {
        if (!isCancelled) {
          setAuthProfile(profileData);
        }
      })
      .catch(() => undefined);

    return () => {
      isCancelled = true;
    };
  }, [authProfile, setAuthProfile, token]);

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

  const routeContext = useMemo(
    () => buildNotificationRouteContext(roleSegment, defaultFeature),
    [defaultFeature, roleSegment]
  );
  const notifications = useMemo(
    () => getNotificationsForContext(routeContext).filter((item) => !dismissedIds.includes(item.id)),
    [dismissedIds, routeContext]
  );
  const previewNotifications = notifications.slice(0, 4);
  const unreadCount = notifications.filter((item) => item.unread).length;

  const resolvedUserName =
    authProfile?.fullName?.trim() ||
    authIdentity?.fullName?.trim() ||
    authUser?.fullName?.trim() ||
    "User";
  const resolvedRole = authProfile?.roleDisplayName?.trim() || formatRoleLabel(authIdentity?.roleName) || routeContext.roleLabel;
  const resolvedAvatarSrc =
    resolveUserProfileImageUrl(authProfile?.profilePictureUrl) ??
    `https://ui-avatars.com/api/?name=${encodeURIComponent(resolvedUserName)}&background=random`;

  const handleRemoveNotification = (id: string) => {
    setDismissedIds((current) => (current.includes(id) ? current : [...current, id]));
  };

  return (
    <div className={cn("flex items-center gap-2 sm:gap-3", className)}>
      <div className="relative" ref={notificationsRef}>
        <button
          type="button"
          aria-label="Notifications"
          onClick={() => setIsNotificationsOpen((current) => !current)}
          className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white transition hover:bg-white/15"
        >
          <Bell size={18} />
          {unreadCount > 0 ? (
            <span className="absolute -right-1 -top-1 inline-flex min-h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
              {unreadCount}
            </span>
          ) : null}
        </button>

        {isNotificationsOpen ? (
          <div className="fixed left-2 right-2 top-20 z-50 rounded-2xl border border-slate-200 bg-white p-3 text-slate-900 shadow-2xl sm:absolute sm:left-auto sm:right-0 sm:top-12 sm:w-[360px] sm:max-w-[92vw]">
            <div className="mb-2 flex items-center justify-between px-1">
              <div>
                <p className="text-sm font-semibold">Notifications</p>
                <p className="text-xs text-slate-500">{unreadCount} unread updates</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsNotificationsOpen(false);
                  if (routeContext.notificationsPath) {
                    router.push(routeContext.notificationsPath);
                  }
                }}
                className="rounded-md bg-[#0d3b66] px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-white transition hover:bg-[#0a2e50]"
              >
                View All
              </button>
            </div>

            <div className="max-h-80 space-y-2 overflow-y-auto pr-1">
              {previewNotifications.map((item) => (
                <div key={item.id} className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setIsNotificationsOpen(false);
                      router.push(item.ctaHref || routeContext.notificationsPath || `/${roleSegment}`);
                    }}
                    className={cn(
                      "w-full rounded-xl border px-3 py-2.5 pr-9 text-left transition-colors",
                      item.unread
                        ? "border-slate-200 bg-slate-50 hover:bg-slate-100"
                        : "border-slate-100 hover:bg-slate-50"
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

                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleRemoveNotification(item.id);
                    }}
                    className="absolute right-2 top-2 z-10 inline-flex h-5 w-5 items-center justify-center rounded text-slate-400 transition hover:bg-slate-200 hover:text-slate-700"
                    aria-label="Remove notification"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <button
        type="button"
        onClick={() => {
          if (routeContext.profilePath) {
            router.push(routeContext.profilePath);
          }
        }}
        className="flex min-w-0 items-center gap-2 rounded-full bg-white/10 px-2 py-1 text-white transition hover:bg-white/20 sm:px-3"
        aria-label="Go to profile page"
      >
        <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-white/20">
          {resolvedAvatarSrc ? (
            <Image src={resolvedAvatarSrc} alt="User" fill className="object-cover" sizes="32px" unoptimized />
          ) : (
            <UserRound size={17} className="m-auto mt-[7px] text-white/80" />
          )}
        </div>
        <div className="hidden min-w-0 text-left text-sm leading-tight sm:block">
          <p className="max-w-32 truncate text-base font-medium">{resolvedUserName}</p>
          <p className="truncate text-xs text-white/60">{resolvedRole}</p>
        </div>
      </button>
    </div>
  );
}
