import apiClient, { toApiError } from "@/src/api/client";
import { ADMIN_ENDPOINTS } from "@/src/api/endpoints";
import type {
  AdminDashboardSummaryResponse,
  AdminRecentActionResponse,
} from "@/src/types/dto/admin-dashboard.dto";

export async function getAdminDashboardSummary(): Promise<AdminDashboardSummaryResponse> {
  try {
    const { data } = await apiClient.get<AdminDashboardSummaryResponse>(
      ADMIN_ENDPOINTS.dashboardSummary
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function getAdminRecentActions(params?: {
  hours?: number;
  limit?: number;
}): Promise<AdminRecentActionResponse[]> {
  try {
    const { data } = await apiClient.get<AdminRecentActionResponse[]>(
      ADMIN_ENDPOINTS.dashboardRecentActions,
      {
        params: {
          hours: params?.hours ?? 12,
          limit: params?.limit ?? 20,
        },
      }
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}
