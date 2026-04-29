import apiClient, { toApiError } from "@/src/api/client";
import { ADMIN_ENDPOINTS } from "@/src/api/endpoints";
import type { AdminDashboardSummaryResponse } from "@/src/types/dto/admin-dashboard.dto";

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

