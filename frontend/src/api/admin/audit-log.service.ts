import apiClient, { toApiError } from "@/src/api/client";
import { ADMIN_ENDPOINTS } from "@/src/api/endpoints";
import type {
  AdminAuditLogFilterOptionsResponse,
  AdminAuditLogPageResponse,
  AdminAuditLogSearchParams,
} from "@/src/types/dto/admin-audit-log.dto";

export async function getAdminAuditLogs(
  params?: AdminAuditLogSearchParams
): Promise<AdminAuditLogPageResponse> {
  try {
    const { data } = await apiClient.get<AdminAuditLogPageResponse>(
      ADMIN_ENDPOINTS.auditLogs,
      {
        params: {
          page: params?.page ?? 1,
          size: params?.size ?? 20,
          fromDateTime: params?.fromDateTime,
          toDateTime: params?.toDateTime,
          tone: params?.tone,
          actionType: params?.actionType?.trim() || undefined,
          actorRole: params?.actorRole?.trim() || undefined,
          targetType: params?.targetType?.trim() || undefined,
          actorName: params?.actorName?.trim() || undefined,
          query: params?.query?.trim() || undefined,
        },
      }
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function getAdminAuditLogFilters(): Promise<AdminAuditLogFilterOptionsResponse> {
  try {
    const { data } = await apiClient.get<AdminAuditLogFilterOptionsResponse>(
      ADMIN_ENDPOINTS.auditLogFilters
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}
