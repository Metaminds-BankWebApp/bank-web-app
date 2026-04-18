import { REGISTRATION_ENDPOINTS } from "@/src/api/endpoints";
import { postStepOneRegistration } from "@/src/api/registration/shared";
import type {
  StepOneRegistrationRequest,
  StepOneRegistrationResponse,
} from "@/src/types/dto/registration.dto";

export async function savePublicCustomerStepOneDraft(
  payload: StepOneRegistrationRequest
): Promise<StepOneRegistrationResponse> {
  return postStepOneRegistration(REGISTRATION_ENDPOINTS.publicCustomer.stepOneDraft, payload);
}

export async function continuePublicCustomerStepOne(
  payload: StepOneRegistrationRequest
): Promise<StepOneRegistrationResponse> {
  return postStepOneRegistration(REGISTRATION_ENDPOINTS.publicCustomer.stepOneContinue, payload);
}
