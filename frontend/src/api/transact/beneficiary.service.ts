import apiClient, { toApiError } from "@/src/api/client";
import { TRANSACT_ENDPOINTS } from "@/src/api/endpoints";
import type { BeneficiaryResponse, CreateBeneficiaryRequest } from "@/src/types/dto/transact.dto";

export async function createBeneficiary(payload: CreateBeneficiaryRequest): Promise<BeneficiaryResponse> {
  try {
    const { data } = await apiClient.post<BeneficiaryResponse>(TRANSACT_ENDPOINTS.beneficiaries, payload);
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export const beneficiaryService = {
  createBeneficiary,
};
