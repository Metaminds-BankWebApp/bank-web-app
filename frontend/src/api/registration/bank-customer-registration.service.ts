import { REGISTRATION_ENDPOINTS } from "@/src/api/endpoints";
import { postStepOneRegistration } from "@/src/api/registration/shared";
import type {
  StepOneRegistrationRequest,
  StepOneRegistrationResponse,
} from "@/src/types/dto/registration.dto";

export async function saveBankCustomerStepOneDraft(
  payload: StepOneRegistrationRequest
): Promise<StepOneRegistrationResponse> {
  return postStepOneRegistration(REGISTRATION_ENDPOINTS.bankCustomer.stepOneDraft, payload);
}

export async function continueBankCustomerStepOne(
  payload: StepOneRegistrationRequest
): Promise<StepOneRegistrationResponse> {
  return postStepOneRegistration(REGISTRATION_ENDPOINTS.bankCustomer.stepOneContinue, payload);
}
