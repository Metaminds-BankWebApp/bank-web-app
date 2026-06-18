import apiClient, { toApiError } from "@/src/api/client";
import { BANK_LOANSENSE_ENDPOINTS } from "@/src/api/endpoints";
import type {
  LoanSenseEvaluationResponse,
  LoanSenseHistoryItemResponse,
  LoanTypeDetailResponse,
} from "@/src/types/dto/bank-loansense.dto";

// Fetches CurrentLoanSenseEvaluation data from the backend API.
export async function getCurrentLoanSenseEvaluation(): Promise<LoanSenseEvaluationResponse> {
  try {
    const { data } = await apiClient.get<LoanSenseEvaluationResponse>(
      BANK_LOANSENSE_ENDPOINTS.current
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

// Fetches LoanSenseHistory data from the backend API.
export async function getLoanSenseHistory(params?: {
  loanType?: string;
  months?: number;
}): Promise<LoanSenseHistoryItemResponse[]> {
  try {
    const { data } = await apiClient.get<LoanSenseHistoryItemResponse[]>(
      BANK_LOANSENSE_ENDPOINTS.history,
      {
        params: {
          loanType: params?.loanType || undefined,
          months: params?.months || undefined,
        },
      }
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

// Fetches LoanSenseEvaluationById data from the backend API.
export async function getLoanSenseEvaluationById(
  loansenseEvaluationId: number
): Promise<LoanSenseEvaluationResponse> {
  try {
    const { data } = await apiClient.get<LoanSenseEvaluationResponse>(
      BANK_LOANSENSE_ENDPOINTS.byId(loansenseEvaluationId)
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

// Fetches LoanSenseLoanTypeDetail data from the backend API.
export async function getLoanSenseLoanTypeDetail(
  loanType: string
): Promise<LoanTypeDetailResponse> {
  try {
    const { data } = await apiClient.get<LoanTypeDetailResponse>(
      BANK_LOANSENSE_ENDPOINTS.loanType(loanType)
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}
