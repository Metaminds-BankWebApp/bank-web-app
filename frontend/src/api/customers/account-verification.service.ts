import apiClient, { toApiError } from "@/src/api/client";
import { CUSTOMER_ENDPOINTS } from "@/src/api/endpoints";
import type { AccountVerificationResponse } from "@/src/types/dto/account-verification.dto";

export async function verifyBankAccount(accountNumber: string): Promise<AccountVerificationResponse> {
  try {
    const { data } = await apiClient.get<AccountVerificationResponse>(CUSTOMER_ENDPOINTS.verifyBankAccount, {
      params: { accountNumber },
    });
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}
