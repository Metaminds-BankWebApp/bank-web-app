"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BellRing, Info, TriangleAlert, X } from "lucide-react";
import { cn } from "@/src/lib/utils";
import {
  type FeatureSegment,
  type NotificationItem,
  type RoleSegment,
  buildNotificationRouteContext,
  getNotificationsForContext,
} from "./notification-data";

type NotificationPageContentProps = {
  roleSegment: RoleSegment;
  featureSegment?: FeatureSegment;
};

const KIND_STYLE: Record<NotificationItem["kind"], string> = {
  info: "bg-sky-50 text-sky-700 border-sky-200",
  success: "bg-emerald-50 text-emerald-700 border-emerald-200",
  warning: "bg-amber-50 text-amber-700 border-amber-200",
  alert: "bg-rose-50 text-rose-700 border-rose-200",
};

const KIND_DOT: Record<NotificationItem["kind"], string> = {
  info: "bg-sky-500",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  alert: "bg-rose-500",
};

export function NotificationPageContent({ roleSegment, featureSegment }: NotificationPageContentProps) {
  const context = useMemo(
    () => buildNotificationRouteContext(roleSegment, featureSegment ?? null),
    [featureSegment, roleSegment]
  );
  const contextKey = `${roleSegment}:${featureSegment ?? "all"}`;
  const isTransact = context.featureSegment === "transact";
  const isLoanSense = context.featureSegment === "loansense";
  const sourceNotifications = useMemo(() => getNotificationsForContext(context), [context]);
  const [dismissedByContext, setDismissedByContext] = useState<Record<string, string[]>>({});
  const dismissedIds = useMemo(() => dismissedByContext[contextKey] ?? [], [contextKey, dismissedByContext]);
  const notifications = useMemo(
    () => sourceNotifications.filter((item) => !dismissedIds.includes(item.id)),
    [dismissedIds, sourceNotifications]
  );

  const unreadCount = notifications.filter((item) => item.unread).length;
  const alertCount = notifications.filter((item) => item.kind === "alert").length;
  const metricCardClass = isTransact
    ? "transact-card transact-card-hover transact-creditlens-shade"
    : isLoanSense
    ? "loansense-card loansense-card-hover loansense-creditlens-shade"
    : "border border-slate-200 bg-white shadow-sm";
  const contentCardClass = isTransact
    ? "transact-card transact-creditlens-shade"
    : isLoanSense
    ? "loansense-card loansense-creditlens-shade"
    : "border border-slate-200 bg-white shadow-sm";
  const rowCardClass = isTransact
    ? "transact-card transact-card-hover transact-creditlens-shade"
    : isLoanSense
    ? "loansense-card loansense-card-hover loansense-creditlens-shade"
    : "";

  const handleDeleteNotification = (id: string) => {
    setDismissedByContext((prev) => {
      const existing = prev[contextKey] ?? [];
      if (existing.includes(id)) return prev;
      return {
        ...prev,
        [contextKey]: [...existing, id],
      };
    });
  };

  return (
    <section className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-3">
        <MetricCard cardClassName={metricCardClass} label="Unread" value={String(unreadCount)} icon={<BellRing size={15} />} />
        <MetricCard cardClassName={metricCardClass} label="Total" value={String(notifications.length)} icon={<Info size={15} />} />
        <MetricCard cardClassName={metricCardClass} label="Action Needed" value={String(alertCount)} icon={<TriangleAlert size={15} />} />
      </div>

      <div
        className={cn(
          "rounded-2xl p-4 sm:p-6",
          contentCardClass
        )}
      >
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{context.moduleLabel} Notifications</h3>
            <p className="text-sm text-slate-500">Recent updates and alerts for {context.roleLabel}</p>
          </div>
          <button
            type="button"
            className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-600 transition hover:bg-slate-50"
          >
            Mark All As Read
          </button>
        </div>

        <div className="space-y-3">
          {notifications.map((item) => (
            <article
              key={item.id}
              className={cn(
                "relative rounded-xl border p-4 transition-colors hover:border-slate-300",
                rowCardClass,
                isTransact || isLoanSense
                  ? item.unread
                    ? "border-slate-200/70"
                    : "border-slate-100/70"
                  : item.unread
                  ? "border-slate-200 bg-slate-50/60"
                  : "border-slate-100 bg-white"
              )}
            >
              <button
                type="button"
                onClick={() => handleDeleteNotification(item.id)}
                className="absolute right-3 top-3 inline-flex h-6 w-6 items-center justify-center rounded-md text-slate-400 transition hover:bg-slate-200/70 hover:text-slate-700"
                aria-label="Remove notification"
              >
                <X size={14} />
              </button>
              <div className="mb-2 flex items-start gap-3">
                <span className={cn("mt-1 h-2.5 w-2.5 shrink-0 rounded-full", KIND_DOT[item.kind])} />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-sm font-semibold text-slate-900">{item.title}</h4>
                    {item.unread ? (
                      <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                        New
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 text-sm text-slate-600">{item.message}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 pl-5">
                <span className={cn("inline-flex rounded-full border px-2 py-1 text-[11px] font-semibold uppercase tracking-wide", KIND_STYLE[item.kind])}>
                  {item.kind}
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500">{item.time}</span>
                  {item.ctaHref ? (
                    <Link
                      href={item.ctaHref}
                      className="inline-flex items-center gap-1 rounded-md bg-[#0d3b66] px-2.5 py-1.5 text-xs font-semibold text-white transition hover:bg-[#0a2e50]"
                    >
                      {item.ctaLabel ?? "Open"}
                    </Link>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>


      </div>
    </section>
  );
}

function MetricCard({
  label,
  value,
  icon,
  cardClassName,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  cardClassName: string;
}) {
  return (
    <div className={cn("rounded-xl px-4 py-3", cardClassName)}>
      <div className="mb-1 flex items-center justify-between text-slate-500">
        <span className="text-xs font-semibold uppercase tracking-wide">{label}</span>
        {icon}
      </div>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
    </div>
  );
}
