import apiClient, { toApiError } from "@/src/api/client";
import { ADMIN_ENDPOINTS } from "@/src/api/endpoints";
import type { BankCustomerSummaryResponse } from "@/src/types/dto/bank-customer.dto";

export type AdminBankOfficerSummaryResponse = BankCustomerSummaryResponse & {
  employeeCode?: string | null;
  branchId?: number | null;
  branchName?: string | null;
};

export async function getAdminBankOfficers(): Promise<AdminBankOfficerSummaryResponse[]> {
  try {
    const { data } = await apiClient.get<AdminBankOfficerSummaryResponse[]>(ADMIN_ENDPOINTS.bankOfficers);
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}
