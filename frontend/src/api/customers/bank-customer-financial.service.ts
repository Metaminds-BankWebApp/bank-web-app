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
  // After creating step 1, convert userId to bankCustomerId so next steps can continue.
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
  // Reuse existing step-1 data when an officer searches by NIC.
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
  // Generate suggested username/password during onboarding.
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
  // Load the latest saved financial record for edit/review screens.
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
  // Load record timeline so officers can inspect past snapshots.
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
  // Open one specific historical snapshot by record id.
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
  // Save only the income step and let the wizard move forward.
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
  // Save only the loans step.
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
  // Save only the credit-card step.
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
  // Save only the liabilities step.
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
  // Trigger CRIB linking and return bureau data that pre-fills later fields.
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
  // Finalize review step so onboarding can be marked complete.
  try {
    const { data } = await apiClient.post<BankCustomerCribStepResponse>(
      BANK_CUSTOMER_FINANCIAL_ENDPOINTS.completeCribReviewStep(bankCustomerId),
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}
