import { REGISTRATION_ENDPOINTS } from "@/src/api/endpoints";
import { postStepOneRegistration } from "@/src/api/registration/shared";
import type {
  StepOneRegistrationRequest,
  StepOneRegistrationResponse,
} from "@/src/types/dto/registration.dto";

export async function registerBankOfficer(
  payload: StepOneRegistrationRequest
): Promise<StepOneRegistrationResponse> {
  // Create a new bank-officer account from admin onboarding form data.
  return postStepOneRegistration(REGISTRATION_ENDPOINTS.bankOfficer.create, payload);
}
