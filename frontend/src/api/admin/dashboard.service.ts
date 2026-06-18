import apiClient, { toApiError } from "@/src/api/client";
import { ADMIN_ENDPOINTS } from "@/src/api/endpoints";
import type {
  AdminDashboardSummaryResponse,
  AdminMonthlyUserGrowthResponse,
  AdminRecentActionResponse,
} from "@/src/types/dto/admin-dashboard.dto";

// Fetches AdminDashboardSummary data from the backend API.
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

// Fetches AdminRecentActions data from the backend API.
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

// Fetches AdminMonthlyUserGrowth data from the backend API.
export async function getAdminMonthlyUserGrowth(params?: {
  months?: number;
}): Promise<AdminMonthlyUserGrowthResponse> {
  try {
    const { data } = await apiClient.get<AdminMonthlyUserGrowthResponse>(
      ADMIN_ENDPOINTS.dashboardMonthlyUserGrowth,
      {
        params: {
          months: params?.months ?? 6,
        },
      }
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}
