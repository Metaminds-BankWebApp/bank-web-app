import { NOTIFICATION_ENDPOINTS } from "@/src/api/endpoints";
import { apiClient, toApiError } from "@/src/api/client";
import type {
  NotificationDto,
  NotificationPageDto,
  NotificationSource,
  UnreadNotificationCountDto,
} from "@/src/types/dto/notification.dto";

export type NotificationListParams = {
  source?: NotificationSource;
  unreadOnly?: boolean;
  page?: number;
  size?: number;
};

export async function getNotifications(params: NotificationListParams = {}): Promise<NotificationPageDto> {
  try {
    const response = await apiClient.get<NotificationPageDto>(NOTIFICATION_ENDPOINTS.list, { params });
    return response.data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function getUnreadNotificationCount(source?: NotificationSource): Promise<number> {
  try {
    const response = await apiClient.get<UnreadNotificationCountDto>(NOTIFICATION_ENDPOINTS.unreadCount, {
      params: source ? { source } : undefined,
    });
    return response.data.unreadCount;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function markNotificationRead(notificationId: number): Promise<NotificationDto> {
  try {
    const response = await apiClient.patch<NotificationDto>(NOTIFICATION_ENDPOINTS.markRead(notificationId));
    return response.data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function markAllNotificationsRead(source?: NotificationSource): Promise<void> {
  try {
    await apiClient.patch(NOTIFICATION_ENDPOINTS.markAllRead, undefined, {
      params: source ? { source } : undefined,
    });
  } catch (error) {
    throw toApiError(error);
  }
}

export async function dismissNotification(notificationId: number): Promise<void> {
  try {
    await apiClient.delete(NOTIFICATION_ENDPOINTS.dismiss(notificationId));
  } catch (error) {
    throw toApiError(error);
  }
}

export async function clearAllNotifications(): Promise<void> {
  try {
    await apiClient.delete(NOTIFICATION_ENDPOINTS.clearAll);
  } catch (error) {
    throw toApiError(error);
  }
}
