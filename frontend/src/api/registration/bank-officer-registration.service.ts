import { REGISTRATION_ENDPOINTS } from "@/src/api/endpoints";
import { postStepOneRegistration } from "@/src/api/registration/shared";
import type {
  StepOneRegistrationRequest,
  StepOneRegistrationResponse,
} from "@/src/types/dto/registration.dto";

export async function saveBankOfficerStepOneDraft(
  payload: StepOneRegistrationRequest
): Promise<StepOneRegistrationResponse> {
  return postStepOneRegistration(REGISTRATION_ENDPOINTS.bankOfficer.stepOneDraft, payload);
}

export async function continueBankOfficerStepOne(
  payload: StepOneRegistrationRequest
): Promise<StepOneRegistrationResponse> {
  return postStepOneRegistration(REGISTRATION_ENDPOINTS.bankOfficer.stepOneContinue, payload);
}
