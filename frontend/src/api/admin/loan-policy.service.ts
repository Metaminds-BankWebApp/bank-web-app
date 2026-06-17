import apiClient, { toApiError } from "@/src/api/client";
import { ADMIN_ENDPOINTS } from "@/src/api/endpoints";
import type {
  AdminBulkLoanPolicyInterestRateUpdateRequest,
  AdminLoanPolicyResponse,
} from "@/src/types/dto/admin-loan-policy.dto";

export async function getAdminLoanPolicies(): Promise<AdminLoanPolicyResponse[]> {
  try {
    const { data } = await apiClient.get<AdminLoanPolicyResponse[]>(
      ADMIN_ENDPOINTS.loanPolicies
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function updateAdminLoanPolicyInterestRates(
  payload: AdminBulkLoanPolicyInterestRateUpdateRequest
): Promise<AdminLoanPolicyResponse[]> {
  try {
    const { data } = await apiClient.put<AdminLoanPolicyResponse[]>(
      `${ADMIN_ENDPOINTS.loanPolicies}/interest-rates`,
      payload
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}
