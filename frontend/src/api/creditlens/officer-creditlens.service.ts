import apiClient, { toApiError } from "@/src/api/client";
import { CREDITLENS_OFFICER_ENDPOINTS } from "@/src/api/endpoints";
import type {
  BankCreditAnalysisDashboardResponse,
  BankCreditAnalysisCustomerProfileResponse,
  BankCreditEvaluationResponse,
} from "@/src/types/dto/creditlens-officer.dto";

export async function getOfficerCreditDashboard(): Promise<BankCreditAnalysisDashboardResponse> {
  try {
    const { data } = await apiClient.get<BankCreditAnalysisDashboardResponse>(CREDITLENS_OFFICER_ENDPOINTS.dashboard);
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function getOfficerCustomerProfile(bankCustomerId: number): Promise<BankCreditAnalysisCustomerProfileResponse> {
  try {
    const { data } = await apiClient.get<BankCreditAnalysisCustomerProfileResponse>(
      CREDITLENS_OFFICER_ENDPOINTS.customerProfile(bankCustomerId),
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function getOfficerCustomerCurrentEvaluation(bankCustomerId: number): Promise<BankCreditEvaluationResponse> {
  try {
    const { data } = await apiClient.get<BankCreditEvaluationResponse>(
      CREDITLENS_OFFICER_ENDPOINTS.customerCurrentEvaluation(bankCustomerId),
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export const officerCreditLensService = {
  getOfficerCreditDashboard,
  getOfficerCustomerProfile,
  getOfficerCustomerCurrentEvaluation,
};