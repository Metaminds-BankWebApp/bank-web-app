export type NotificationSource =
  | "ADMIN"
  | "ONBOARDING"
  | "TRANSACT"
  | "SPENDIQ"
  | "CREDITLENS"
  | "LOANSENSE"
  | "SYSTEM";

export type NotificationSeverity = "INFO" | "SUCCESS" | "WARNING" | "ALERT";

export type NotificationDto = {
  id: number;
  type: string;
  source: NotificationSource;
  severity: NotificationSeverity;
  title: string;
  message: string;
  actionKey: string | null;
  actionMetadata: Record<string, string>;
  affectedCount: number;
  unread: boolean;
  createdAt: string;
  updatedAt: string;
};

export type NotificationPageDto = {
  content: NotificationDto[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  unreadCount: number;
  actionNeededCount: number;
};

export type UnreadNotificationCountDto = {
  unreadCount: number;
};
