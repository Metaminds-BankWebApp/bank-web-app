import apiClient, { toApiError } from "@/src/api/client";
import { BANK_CUSTOMER_FINANCIAL_ENDPOINTS, CUSTOMER_ENDPOINTS } from "@/src/api/endpoints";
import type {
  BankCustomerCardStepRequest,
  BankCustomerFinancialRecordResponse,
  BankCustomerFinancialRecordSummaryResponse,
  BankCustomerCribRequestStepRequest,
  BankCustomerCribStepResponse,
  BankCustomerFinancialStepResponse,
  BankCustomerIncomeStepRequest,
  BankCustomerLiabilityStepRequest,
  BankCustomerLoanStepRequest,
  BankOfficerCustomerIdentityResponse,
  BankOfficerCustomerStepOnePrefillResponse,
  GeneratedBankCustomerCredentialsResponse,
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

export async function findOwnedBankCustomerStepOneByNic(
  nic: string,
): Promise<BankOfficerCustomerStepOnePrefillResponse> {
  try {
    const { data } = await apiClient.get<BankOfficerCustomerStepOnePrefillResponse>(
      CUSTOMER_ENDPOINTS.bankOfficerCustomerStepOneByNic,
      {
        params: {
          nic,
        },
      },
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function generateBankCustomerCredentials(
  firstName: string,
  lastName: string,
): Promise<GeneratedBankCustomerCredentialsResponse> {
  try {
    const { data } = await apiClient.get<GeneratedBankCustomerCredentialsResponse>(
      CUSTOMER_ENDPOINTS.bankOfficerCustomerGeneratedCredentials,
      {
        params: {
          firstName,
          lastName,
        },
      },
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function getCurrentBankCustomerFinancialRecord(
  bankCustomerId: number,
): Promise<BankCustomerFinancialRecordResponse> {
  try {
    const { data } = await apiClient.get<BankCustomerFinancialRecordResponse>(
      BANK_CUSTOMER_FINANCIAL_ENDPOINTS.current(bankCustomerId),
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function getBankCustomerFinancialRecordHistory(
  bankCustomerId: number,
): Promise<BankCustomerFinancialRecordSummaryResponse[]> {
  try {
    const { data } = await apiClient.get<BankCustomerFinancialRecordSummaryResponse[]>(
      BANK_CUSTOMER_FINANCIAL_ENDPOINTS.history(bankCustomerId),
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function getBankCustomerFinancialRecordById(
  bankCustomerId: number,
  bankRecordId: number,
): Promise<BankCustomerFinancialRecordResponse> {
  try {
    const { data } = await apiClient.get<BankCustomerFinancialRecordResponse>(
      BANK_CUSTOMER_FINANCIAL_ENDPOINTS.byId(bankCustomerId, bankRecordId),
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

export async function saveBankCustomerCribLinkingStep(
  bankCustomerId: number,
  payload: BankCustomerCribRequestStepRequest,
): Promise<BankCustomerCribStepResponse> {
  try {
    const { data } = await apiClient.post<BankCustomerCribStepResponse>(
      BANK_CUSTOMER_FINANCIAL_ENDPOINTS.saveCribLinkingStep(bankCustomerId),
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
