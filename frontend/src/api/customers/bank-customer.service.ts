import apiClient, { toApiError } from "@/src/api/client";
import { CUSTOMER_ENDPOINTS } from "@/src/api/endpoints";
import type { BankCustomerSummaryResponse } from "@/src/types/dto/bank-customer.dto";

export async function getBankCustomersForOfficer(): Promise<BankCustomerSummaryResponse[]> {
  try {
    const { data } = await apiClient.get<BankCustomerSummaryResponse[]>(CUSTOMER_ENDPOINTS.bankOfficerCustomers);
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}
