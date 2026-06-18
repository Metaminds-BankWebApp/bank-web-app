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
  // Keep all officer customer CreditLens routes consistent from one base path.
  return `/creditlens/officer/customers/${bankCustomerId}`;
}

/**
 * Bank-officer CreditLens API client for portfolio, customer, trend, insight, and report views.
 */
// Loads the officer CreditLens dashboard data.
export async function getOfficerCreditDashboard(): Promise<BankCreditAnalysisDashboardResponse> {
  // Portfolio-level summary shown on officer credit-analysis list page.
  try {
    const { data } = await apiClient.get<BankCreditAnalysisDashboardResponse>(
      "/creditlens/officer/dashboard",
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

// Loads the selected bank customer profile for officer CreditLens.
export async function getOfficerCreditCustomerProfile(
  bankCustomerId: number,
): Promise<BankCreditAnalysisCustomerProfileResponse> {
  // Identity and account context for one selected customer.
  try {
    const { data } = await apiClient.get<BankCreditAnalysisCustomerProfileResponse>(
      `${officerCustomerBase(bankCustomerId)}/profile`,
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

// Loads the selected bank customer current CreditLens evaluation.
export async function getOfficerCreditCurrentEvaluation(
  bankCustomerId: number,
): Promise<BankCreditEvaluationResponse> {
  // Latest evaluation snapshot for overview tab.
  try {
    const { data } = await apiClient.get<BankCreditEvaluationResponse>(
      `${officerCustomerBase(bankCustomerId)}/current`,
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

// Loads CreditLens history for an officer-owned customer.
export async function getOfficerCreditEvaluationHistory(
  bankCustomerId: number,
): Promise<BankCreditEvaluationSummaryResponse[]> {
  // Historical evaluations used for trend/report month selection.
  try {
    const { data } = await apiClient.get<BankCreditEvaluationSummaryResponse[]>(
      `${officerCustomerBase(bankCustomerId)}/history`,
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

// Loads one officer-owned customer CreditLens evaluation by id.
export async function getOfficerCreditEvaluationById(
  bankCustomerId: number,
  bankEvaluationId: number,
): Promise<BankCreditEvaluationResponse> {
  // Fetch a single evaluation when a specific record is opened.
  try {
    const { data } = await apiClient.get<BankCreditEvaluationResponse>(
      `${officerCustomerBase(bankCustomerId)}/evaluations/${bankEvaluationId}`,
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

// Loads CreditLens trends for an officer-owned customer.
export async function getOfficerCreditTrends(
  bankCustomerId: number,
  range: "6m" | "12m" = "6m",
): Promise<CreditTrendResponse> {
  // Trend chart data for selected time window.
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

// Loads CreditLens insights for an officer-owned customer.
export async function getOfficerCreditInsights(
  bankCustomerId: number,
): Promise<CreditInsightsResponse> {
  // Insight cards (risk drivers + positive signals + tips).
  try {
    const { data } = await apiClient.get<CreditInsightsResponse>(
      `${officerCustomerBase(bankCustomerId)}/insights`,
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

// Loads CreditLens report data for an officer-owned customer.
export async function getOfficerCreditReport(
  bankCustomerId: number,
): Promise<CreditReportResponse> {
  // Monthly report snapshots used in report tab and export flow.
  try {
    const { data } = await apiClient.get<CreditReportResponse>(
      `${officerCustomerBase(bankCustomerId)}/report`,
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

// Downloads the officer customer CreditLens PDF report.
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
