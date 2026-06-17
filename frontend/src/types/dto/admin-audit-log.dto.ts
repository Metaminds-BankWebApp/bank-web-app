export type AdminAuditTone = "SUCCESS" | "WARNING" | "INFO" | "ERROR";

export type AdminAuditLogRecordResponse = {
  actionId: number;
  title: string;
  details: string | null;
  actionType: string;
  targetType: string | null;
  targetId: string | null;
  tone: AdminAuditTone;
  actorName: string;
  actorRole: string | null;
  ipAddress: string | null;
  createdAt: string | null;
};

export type AdminAuditLogPageResponse = {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  records: AdminAuditLogRecordResponse[];
};

export type AdminAuditLogFilterOptionsResponse = {
  actionTypes: string[];
  tones: string[];
  actorRoles: string[];
  targetTypes: string[];
};

export type AdminAuditLogSearchParams = {
  page?: number;
  size?: number;
  fromDateTime?: string;
  toDateTime?: string;
  tone?: AdminAuditTone;
  actionType?: string;
  actorRole?: string;
  targetType?: string;
  actorName?: string;
  query?: string;
};
