import apiClient, { toApiError } from "@/src/api/client";
import { CUSTOMER_ENDPOINTS } from "@/src/api/endpoints";
import type { BankCustomerSummaryResponse } from "@/src/types/dto/bank-customer.dto";

// Filters that are sent as query parameters to the backend officer list
// endpoint. The backend is the authoritative source for filtering and
// sorting (especially for `riskLevel` and `creditScore`), so the client
// sends a compact filter contract and renders the resulting list.
export type OfficerCustomerFilters = {
  search?: string;
  status?: string;
  riskLevel?: string;
  sortBy?: string;
};

export type OfficerPageResponse<T> = {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

export async function getBankCustomersForOfficer(filters?: OfficerCustomerFilters): Promise<BankCustomerSummaryResponse[]> {
  try {
    const params = new URLSearchParams();
    if (filters?.search) params.append("search", filters.search);
    if (filters?.status) params.append("status", filters.status);
    if (filters?.riskLevel) params.append("riskLevel", filters.riskLevel);
    if (filters?.sortBy) params.append("sortBy", filters.sortBy);

    // Build the endpoint with query parameters so the backend can apply
    // server-side filtering and return the canonical results.
    const url = `${CUSTOMER_ENDPOINTS.bankOfficerCustomers}${params.toString() ? `?${params.toString()}` : ""}`;
    const { data } = await apiClient.get<BankCustomerSummaryResponse[]>(url);
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function getBankCustomersForOfficerPage(
  filters: OfficerCustomerFilters & { page: number; size: number },
): Promise<OfficerPageResponse<BankCustomerSummaryResponse>> {
  try {
    const params = new URLSearchParams({ page: String(filters.page), size: String(filters.size) });
    if (filters.search) params.append("search", filters.search);
    if (filters.status) params.append("status", filters.status);
    if (filters.riskLevel) params.append("riskLevel", filters.riskLevel);
    if (filters.sortBy) params.append("sortBy", filters.sortBy);
    const { data } = await apiClient.get<OfficerPageResponse<BankCustomerSummaryResponse>>(
      `${CUSTOMER_ENDPOINTS.bankOfficerCustomers}/page?${params.toString()}`,
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}
