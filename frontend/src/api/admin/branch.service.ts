import apiClient, { toApiError } from "@/src/api/client";
import { ADMIN_ENDPOINTS } from "@/src/api/endpoints";
import type { BranchRequest, BranchResponse, BranchStatus } from "@/src/types/dto/branch.dto";

export async function getAdminBranches(): Promise<BranchResponse[]> {
  try {
    const { data } = await apiClient.get<BranchResponse[]>(ADMIN_ENDPOINTS.branches);
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function createAdminBranch(payload: BranchRequest): Promise<BranchResponse> {
  try {
    const { data } = await apiClient.post<BranchResponse>(ADMIN_ENDPOINTS.branches, payload);
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function updateAdminBranchStatus(
  branchId: number,
  status: BranchStatus
): Promise<BranchResponse> {
  try {
    const { data } = await apiClient.patch<BranchResponse>(
      `${ADMIN_ENDPOINTS.branches}/${branchId}/status`,
      null,
      {
        params: { status },
      }
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}
