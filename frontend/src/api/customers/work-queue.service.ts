import apiClient, { toApiError } from "@/src/api/client";
import { CUSTOMER_ENDPOINTS } from "@/src/api/endpoints";
import type { UpdateWorkQueueCaseRequest, WorkQueueCaseResponse } from "@/src/types/dto/work-queue.dto";

export async function getWorkQueueCases(): Promise<WorkQueueCaseResponse[]> {
  try {
    const { data } = await apiClient.get<WorkQueueCaseResponse[]>(CUSTOMER_ENDPOINTS.workQueueCases);
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function updateWorkQueueCase(payload: UpdateWorkQueueCaseRequest): Promise<WorkQueueCaseResponse> {
  try {
    const { data } = await apiClient.put<WorkQueueCaseResponse>(CUSTOMER_ENDPOINTS.workQueueCases, payload);
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}
