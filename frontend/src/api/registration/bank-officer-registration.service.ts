import { REGISTRATION_ENDPOINTS } from "@/src/api/endpoints";
import apiClient, { toApiError } from "@/src/api/client";
import type { StepOneRegistrationResponse } from "@/src/types/dto/registration.dto";

export interface BankOfficerActivationRegistrationRequest {
  firstName: string;
  lastName: string;
  nic: string;
  dob: string;
  email: string;
  mobile: string;
  province: string;
  address?: string;
  username: string;
  branchId: number;
  createdByAdminUserId?: number;
}

export async function registerBankOfficer(
  payload: BankOfficerActivationRegistrationRequest
): Promise<StepOneRegistrationResponse> {
  // Create a new bank-officer account from admin onboarding form data.
  try {
    const { data } = await apiClient.post<StepOneRegistrationResponse>(
      REGISTRATION_ENDPOINTS.bankOfficer.create,
      payload
    );
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}
