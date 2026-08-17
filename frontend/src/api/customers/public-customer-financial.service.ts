import apiClient, { toApiError } from "@/src/api/client";
import { PUBLIC_CUSTOMER_FINANCIAL_ENDPOINTS } from "@/src/api/endpoints";
import type {
  PublicCustomerCardStepRequest,
  PublicCustomerApplicationProgressResponse,
  PublicCustomerApplicationStepCode,
  PublicCustomerCardProviderOptionResponse,
  PublicCustomerMeResponse,
  PublicCustomerFinancialRecordResponse,
  PublicCustomerFinancialRecordSummaryResponse,
  PublicCustomerFinancialStepResponse,
  PublicCustomerIncomeStepRequest,
  PublicCustomerLiabilityStepRequest,
  PublicCustomerLoanStepRequest,
} from "@/src/types/dto/public-customer-financial.dto";

export async function getMyPublicCustomerProfile(): Promise<PublicCustomerMeResponse> {
  try {
    const { data } = await apiClient.get<PublicCustomerMeResponse>(PUBLIC_CUSTOMER_FINANCIAL_ENDPOINTS.me);
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function getPublicCustomerCardProviderOptions(): Promise<PublicCustomerCardProviderOptionResponse[]> {
  try {
    const { data } = await apiClient.get<PublicCustomerCardProviderOptionResponse[]>(
      PUBLIC_CUSTOMER_FINANCIAL_ENDPOINTS.cardProviders,
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function savePublicCustomerIncomeStep(
  publicCustomerId: number,
  payload: PublicCustomerIncomeStepRequest,
): Promise<PublicCustomerFinancialStepResponse> {
  try {
    const { data } = await apiClient.put<PublicCustomerFinancialStepResponse>(
      PUBLIC_CUSTOMER_FINANCIAL_ENDPOINTS.saveIncomeStep(publicCustomerId),
      payload,
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function savePublicCustomerLoanStep(
  publicCustomerId: number,
  payload: PublicCustomerLoanStepRequest,
): Promise<PublicCustomerFinancialStepResponse> {
  try {
    const { data } = await apiClient.put<PublicCustomerFinancialStepResponse>(
      PUBLIC_CUSTOMER_FINANCIAL_ENDPOINTS.saveLoanStep(publicCustomerId),
      payload,
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function savePublicCustomerCardStep(
  publicCustomerId: number,
  payload: PublicCustomerCardStepRequest,
): Promise<PublicCustomerFinancialStepResponse> {
  try {
    const { data } = await apiClient.put<PublicCustomerFinancialStepResponse>(
      PUBLIC_CUSTOMER_FINANCIAL_ENDPOINTS.saveCardStep(publicCustomerId),
      payload,
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function savePublicCustomerLiabilityStep(
  publicCustomerId: number,
  payload: PublicCustomerLiabilityStepRequest,
): Promise<PublicCustomerFinancialStepResponse> {
  try {
    const { data } = await apiClient.put<PublicCustomerFinancialStepResponse>(
      PUBLIC_CUSTOMER_FINANCIAL_ENDPOINTS.saveLiabilityStep(publicCustomerId),
      payload,
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function getPublicCustomerApplicationProgress(
  publicCustomerId: number,
): Promise<PublicCustomerApplicationProgressResponse> {
  try {
    const { data } = await apiClient.get<PublicCustomerApplicationProgressResponse>(
      PUBLIC_CUSTOMER_FINANCIAL_ENDPOINTS.progress(publicCustomerId),
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function skipPublicCustomerApplicationStep(
  publicCustomerId: number,
  stepCode: Exclude<PublicCustomerApplicationStepCode, "REVIEW">,
): Promise<PublicCustomerApplicationProgressResponse> {
  try {
    const { data } = await apiClient.put<PublicCustomerApplicationProgressResponse>(
      PUBLIC_CUSTOMER_FINANCIAL_ENDPOINTS.skipStep(publicCustomerId, stepCode),
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function submitPublicCustomerApplication(
  publicCustomerId: number,
): Promise<PublicCustomerApplicationProgressResponse> {
  try {
    const { data } = await apiClient.put<PublicCustomerApplicationProgressResponse>(
      PUBLIC_CUSTOMER_FINANCIAL_ENDPOINTS.submit(publicCustomerId),
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function getCurrentPublicCustomerFinancialRecord(
  publicCustomerId: number,
): Promise<PublicCustomerFinancialRecordResponse> {
  try {
    const { data } = await apiClient.get<PublicCustomerFinancialRecordResponse>(
      PUBLIC_CUSTOMER_FINANCIAL_ENDPOINTS.current(publicCustomerId),
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function getPublicCustomerFinancialRecordHistory(
  publicCustomerId: number,
): Promise<PublicCustomerFinancialRecordSummaryResponse[]> {
  try {
    const { data } = await apiClient.get<PublicCustomerFinancialRecordSummaryResponse[]>(
      PUBLIC_CUSTOMER_FINANCIAL_ENDPOINTS.history(publicCustomerId),
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function getPublicCustomerFinancialRecordById(
  publicCustomerId: number,
  recordId: number,
): Promise<PublicCustomerFinancialRecordResponse> {
  try {
    const { data } = await apiClient.get<PublicCustomerFinancialRecordResponse>(
      PUBLIC_CUSTOMER_FINANCIAL_ENDPOINTS.byId(publicCustomerId, recordId),
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}
