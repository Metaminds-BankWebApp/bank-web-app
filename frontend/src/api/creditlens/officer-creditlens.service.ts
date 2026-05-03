import axios from "axios";
import apiClient, { toApiError } from "@/src/api/client";
import { ApiError } from "@/src/types/api-error";
import type {
  BankCreditAnalysisCustomerProfileResponse,
  BankCreditAnalysisDashboardResponse,
  BankCreditEvaluationResponse,
  BankCreditEvaluationSummaryResponse,
  CreditInsightsResponse,
  CreditReportResponse,
  CreditTrendResponse,
} from "@/src/types/dto/officer-creditlens.dto";

/**
 * Builds the officer-scoped CreditLens route prefix for a specific bank customer.
 */
function officerCustomerBase(bankCustomerId: number): string {
  return `/creditlens/officer/customers/${bankCustomerId}`;
}

/**
 * Bank-officer CreditLens API client for portfolio, customer, trend, insight, and report views.
 */
export async function getOfficerCreditDashboard(): Promise<BankCreditAnalysisDashboardResponse> {
  try {
    const { data } = await apiClient.get<BankCreditAnalysisDashboardResponse>(
      "/creditlens/officer/dashboard",
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function getOfficerCreditCustomerProfile(
  bankCustomerId: number,
): Promise<BankCreditAnalysisCustomerProfileResponse> {
  try {
    const { data } = await apiClient.get<BankCreditAnalysisCustomerProfileResponse>(
      `${officerCustomerBase(bankCustomerId)}/profile`,
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function getOfficerCreditCurrentEvaluation(
  bankCustomerId: number,
): Promise<BankCreditEvaluationResponse> {
  try {
    const { data } = await apiClient.get<BankCreditEvaluationResponse>(
      `${officerCustomerBase(bankCustomerId)}/current`,
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function getOfficerCreditEvaluationHistory(
  bankCustomerId: number,
): Promise<BankCreditEvaluationSummaryResponse[]> {
  try {
    const { data } = await apiClient.get<BankCreditEvaluationSummaryResponse[]>(
      `${officerCustomerBase(bankCustomerId)}/history`,
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function getOfficerCreditEvaluationById(
  bankCustomerId: number,
  bankEvaluationId: number,
): Promise<BankCreditEvaluationResponse> {
  try {
    const { data } = await apiClient.get<BankCreditEvaluationResponse>(
      `${officerCustomerBase(bankCustomerId)}/evaluations/${bankEvaluationId}`,
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function getOfficerCreditTrends(
  bankCustomerId: number,
  range: "6m" | "12m" = "6m",
): Promise<CreditTrendResponse> {
  try {
    const { data } = await apiClient.get<CreditTrendResponse>(
      `${officerCustomerBase(bankCustomerId)}/trends`,
      { params: { range } },
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function getOfficerCreditInsights(
  bankCustomerId: number,
): Promise<CreditInsightsResponse> {
  try {
    const { data } = await apiClient.get<CreditInsightsResponse>(
      `${officerCustomerBase(bankCustomerId)}/insights`,
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function getOfficerCreditReport(
  bankCustomerId: number,
): Promise<CreditReportResponse> {
  try {
    const { data } = await apiClient.get<CreditReportResponse>(
      `${officerCustomerBase(bankCustomerId)}/report`,
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function downloadOfficerCreditReportPdf(
  bankCustomerId: number,
  bankEvaluationId: number,
): Promise<Blob> {
  try {
    const { data } = await apiClient.get<Blob>(
      `${officerCustomerBase(bankCustomerId)}/report/${bankEvaluationId}/pdf`,
      {
        responseType: "blob",
        headers: {
          Accept: "application/pdf",
        },
      },
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data instanceof Blob) {
      try {
        const parsed = JSON.parse(await error.response.data.text()) as { message?: string; [key: string]: unknown };
        const message = typeof parsed.message === "string" && parsed.message
          ? parsed.message
          : "Unable to prepare the CreditLens PDF report.";

        throw new ApiError({
          message,
          code: "UNKNOWN_ERROR",
          status: error.response.status,
          details: parsed,
        });
      } catch (blobError) {
        if (blobError instanceof ApiError) {
          throw blobError;
        }

        throw new ApiError({
          message: "Unable to prepare the CreditLens PDF report.",
          code: "UNKNOWN_ERROR",
          status: error.response.status,
        });
      }
    }

    throw toApiError(error);
  }
}
