import apiClient, { toApiError } from "@/src/api/client";
import { ADMIN_ENDPOINTS } from "@/src/api/endpoints";

export type AdminBankOfficerStatus = "ACTIVE" | "INACTIVE" | "LOCKED";

export interface AdminBankOfficerSummaryResponse {
  userId: number;
  employeeCode: string;
  fullName: string;
  email: string;
  phone: string;
  status: AdminBankOfficerStatus;
  createdAt: string | null;
  lastUpdated: string | null;
  branchId: number | null;
  branchName: string;
}

export async function getAdminBankOfficers(): Promise<AdminBankOfficerSummaryResponse[]> {
  try {
    const { data } = await apiClient.get<AdminBankOfficerSummaryResponse[]>(ADMIN_ENDPOINTS.bankOfficers);
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function updateAdminBankOfficerStatus(
  userId: number,
  status: AdminBankOfficerStatus
): Promise<AdminBankOfficerSummaryResponse> {
  try {
    const { data } = await apiClient.patch<AdminBankOfficerSummaryResponse>(
      `${ADMIN_ENDPOINTS.bankOfficers}/${userId}/status`,
      null,
      {
        params: { status },
      }
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function deactivateAdminBankOfficer(
  userId: number
): Promise<AdminBankOfficerSummaryResponse> {
  try {
    const { data } = await apiClient.delete<AdminBankOfficerSummaryResponse>(
      `${ADMIN_ENDPOINTS.bankOfficers}/${userId}`
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}
