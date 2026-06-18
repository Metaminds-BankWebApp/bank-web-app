import apiClient, { toApiError } from "@/src/api/client";
import { CUSTOMER_ENDPOINTS } from "@/src/api/endpoints";
import type { AccountVerificationResponse } from "@/src/types/dto/account-verification.dto";

export async function verifyBankAccount(accountNumber: string): Promise<AccountVerificationResponse> {
  // Quick account-existence check used before officers continue step 1.
  try {
    const { data } = await apiClient.get<AccountVerificationResponse>(CUSTOMER_ENDPOINTS.verifyBankAccount, {
      params: { accountNumber },
    });
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}
