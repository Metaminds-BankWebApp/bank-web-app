import apiClient, { toApiError } from "@/src/api/client";
import type {
  StepOneRegistrationRequest,
  StepOneRegistrationResponse,
  StepOneUpdateRequest,
} from "@/src/types/dto/registration.dto";

export async function postStepOneRegistration(
  endpoint: string,
  payload: StepOneRegistrationRequest
): Promise<StepOneRegistrationResponse> {
  try {
    const { data } = await apiClient.post<StepOneRegistrationResponse>(endpoint, payload);
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function putStepOneRegistration(
  endpoint: string,
  payload: StepOneUpdateRequest
): Promise<StepOneRegistrationResponse> {
  try {
    const { data } = await apiClient.put<StepOneRegistrationResponse>(endpoint, payload);
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}
