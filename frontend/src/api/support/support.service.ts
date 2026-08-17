import { apiClient } from "@/src/api/client";
import { SUPPORT_ENDPOINTS } from "@/src/api/endpoints";

export type SupportRequestPayload = { category: string; subject: string; message: string };
export async function submitSupportRequest(payload: SupportRequestPayload): Promise<void> {
  await apiClient.post(SUPPORT_ENDPOINTS.requests, payload);
}
