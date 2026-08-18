"use client";

import { useCallback, useEffect, useState } from "react";
import {
  clearAllNotifications,
  dismissNotification,
  getNotifications,
  markAllNotificationsRead,
  markNotificationRead,
} from "@/src/api/notifications/notification.service";
import type { NotificationDto, NotificationPageDto, NotificationSource } from "@/src/types/dto/notification.dto";
import { useAuthStore } from "@/src/store";

const NOTIFICATIONS_CHANGED_EVENT = "primecore:notifications-changed";

type UseNotificationsOptions = {
  source?: NotificationSource;
  size?: number;
  pollIntervalMs?: number;
};

const EMPTY_PAGE: NotificationPageDto = {
  content: [],
  page: 0,
  size: 20,
  totalElements: 0,
  totalPages: 0,
  unreadCount: 0,
  actionNeededCount: 0,
};

export function useNotifications(options: UseNotificationsOptions = {}) {
  const token = useAuthStore((state) => state.token);
  const [data, setData] = useState<NotificationPageDto>({ ...EMPTY_PAGE, size: options.size ?? 20 });
  const [loading, setLoading] = useState(Boolean(token));
  const [clearing, setClearing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!token) {
      setData({ ...EMPTY_PAGE, size: options.size ?? 20 });
      setLoading(false);
      return;
    }

    try {
      const result = await getNotifications({ source: options.source, page: 0, size: options.size ?? 20 });
      setData(result);
      setError(null);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to load notifications.");
    } finally {
      setLoading(false);
    }
  }, [options.size, options.source, token]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  useEffect(() => {
    if (!token) return;

    const handleChanged = () => void refresh();
    window.addEventListener(NOTIFICATIONS_CHANGED_EVENT, handleChanged);
    const interval = options.pollIntervalMs
      ? window.setInterval(() => void refresh(), options.pollIntervalMs)
      : null;

    return () => {
      window.removeEventListener(NOTIFICATIONS_CHANGED_EVENT, handleChanged);
      if (interval !== null) window.clearInterval(interval);
    };
  }, [options.pollIntervalMs, refresh, token]);

  const markRead = useCallback(async (notificationId: number) => {
    setData((current) => {
      const wasUnread = current.content.some((item) => item.id === notificationId && item.unread);
      return {
        ...current,
        content: current.content.map((item) =>
          item.id === notificationId ? { ...item, unread: false } : item
        ),
        unreadCount: Math.max(0, current.unreadCount - (wasUnread ? 1 : 0)),
      };
    });
    try {
      const updated = await markNotificationRead(notificationId);
      setData((current) => ({
        ...current,
        content: current.content.map((item) => (item.id === notificationId ? updated : item)),
      }));
      window.dispatchEvent(new Event(NOTIFICATIONS_CHANGED_EVENT));
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to mark the notification as read.");
      await refresh();
    }
  }, [refresh]);

  const markAllRead = useCallback(async () => {
    setData((current) => ({
      ...current,
      content: current.content.map((item) => ({ ...item, unread: false })),
      unreadCount: 0,
    }));
    try {
      await markAllNotificationsRead(options.source);
      window.dispatchEvent(new Event(NOTIFICATIONS_CHANGED_EVENT));
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to mark all notifications as read.");
      await refresh();
    }
  }, [options.source, refresh]);

  const dismiss = useCallback(async (notificationId: number) => {
    setData((current) => {
      const dismissedItem: NotificationDto | undefined = current.content.find((item) => item.id === notificationId);
      return {
        ...current,
        content: current.content.filter((item) => item.id !== notificationId),
        totalElements: Math.max(0, current.totalElements - 1),
        unreadCount: Math.max(0, current.unreadCount - (dismissedItem?.unread ? 1 : 0)),
        actionNeededCount: Math.max(
          0,
          current.actionNeededCount - (dismissedItem && ["WARNING", "ALERT"].includes(dismissedItem.severity) ? 1 : 0)
        ),
      };
    });
    try {
      await dismissNotification(notificationId);
      window.dispatchEvent(new Event(NOTIFICATIONS_CHANGED_EVENT));
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to dismiss the notification.");
      await refresh();
    }
  }, [refresh]);

  const clearAll = useCallback(async () => {
    if (clearing) return;

    setClearing(true);
    setData((current) => ({ ...current, ...EMPTY_PAGE, size: current.size }));
    try {
      await clearAllNotifications();
      window.dispatchEvent(new Event(NOTIFICATIONS_CHANGED_EVENT));
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to clear notifications.");
      await refresh();
    } finally {
      setClearing(false);
    }
  }, [clearing, refresh]);

  return {
    notifications: data.content,
    unreadCount: data.unreadCount,
    totalCount: data.totalElements,
    actionNeededCount: data.actionNeededCount,
    loading,
    error,
    clearing,
    refresh,
    markRead,
    markAllRead,
    dismiss,
    clearAll,
  };
}
