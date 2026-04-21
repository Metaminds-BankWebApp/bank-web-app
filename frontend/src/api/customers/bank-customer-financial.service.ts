import apiClient, { toApiError } from "@/src/api/client";
import { BANK_CUSTOMER_FINANCIAL_ENDPOINTS, CUSTOMER_ENDPOINTS } from "@/src/api/endpoints";
import type {
  BankCustomerCardStepRequest,
  BankCustomerCribRequestStepRequest,
  BankCustomerCribRetrievalStepRequest,
  BankCustomerCribStepResponse,
  BankCustomerFinancialStepResponse,
  BankCustomerIncomeStepRequest,
  BankCustomerLiabilityStepRequest,
  BankCustomerLoanStepRequest,
  BankOfficerCustomerIdentityResponse,
} from "@/src/types/dto/bank-customer-financial.dto";

export async function getOwnedBankCustomerIdentityByUserId(
  userId: number,
): Promise<BankOfficerCustomerIdentityResponse> {
  try {
    const { data } = await apiClient.get<BankOfficerCustomerIdentityResponse>(
      CUSTOMER_ENDPOINTS.bankOfficerCustomerByUser(userId),
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function saveBankCustomerIncomeStep(
  bankCustomerId: number,
  payload: BankCustomerIncomeStepRequest,
): Promise<BankCustomerFinancialStepResponse> {
  try {
    const { data } = await apiClient.post<BankCustomerFinancialStepResponse>(
      BANK_CUSTOMER_FINANCIAL_ENDPOINTS.saveIncomeStep(bankCustomerId),
      payload,
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function saveBankCustomerLoanStep(
  bankCustomerId: number,
  payload: BankCustomerLoanStepRequest,
): Promise<BankCustomerFinancialStepResponse> {
  try {
    const { data } = await apiClient.post<BankCustomerFinancialStepResponse>(
      BANK_CUSTOMER_FINANCIAL_ENDPOINTS.saveLoanStep(bankCustomerId),
      payload,
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function saveBankCustomerCardStep(
  bankCustomerId: number,
  payload: BankCustomerCardStepRequest,
): Promise<BankCustomerFinancialStepResponse> {
  try {
    const { data } = await apiClient.post<BankCustomerFinancialStepResponse>(
      BANK_CUSTOMER_FINANCIAL_ENDPOINTS.saveCardStep(bankCustomerId),
      payload,
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function saveBankCustomerLiabilityStep(
  bankCustomerId: number,
  payload: BankCustomerLiabilityStepRequest,
): Promise<BankCustomerFinancialStepResponse> {
  try {
    const { data } = await apiClient.post<BankCustomerFinancialStepResponse>(
      BANK_CUSTOMER_FINANCIAL_ENDPOINTS.saveLiabilityStep(bankCustomerId),
      payload,
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function saveBankCustomerCribRequestStep(
  bankCustomerId: number,
  payload: BankCustomerCribRequestStepRequest,
): Promise<BankCustomerCribStepResponse> {
  try {
    const { data } = await apiClient.post<BankCustomerCribStepResponse>(
      BANK_CUSTOMER_FINANCIAL_ENDPOINTS.saveCribRequestStep(bankCustomerId),
      payload,
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function saveBankCustomerCribRetrievalStep(
  bankCustomerId: number,
  payload: BankCustomerCribRetrievalStepRequest,
): Promise<BankCustomerCribStepResponse> {
  try {
    const { data } = await apiClient.post<BankCustomerCribStepResponse>(
      BANK_CUSTOMER_FINANCIAL_ENDPOINTS.saveCribRetrievalStep(bankCustomerId),
      payload,
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function completeBankCustomerCribReviewStep(
  bankCustomerId: number,
): Promise<BankCustomerCribStepResponse> {
  try {
    const { data } = await apiClient.post<BankCustomerCribStepResponse>(
      BANK_CUSTOMER_FINANCIAL_ENDPOINTS.completeCribReviewStep(bankCustomerId),
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}
