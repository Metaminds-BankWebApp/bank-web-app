import { REGISTRATION_ENDPOINTS } from "@/src/api/endpoints";
import { postStepOneRegistration, putStepOneRegistration } from "@/src/api/registration/shared";
import type {
  StepOneRegistrationRequest,
  StepOneRegistrationResponse,
  StepOneUpdateRequest,
} from "@/src/types/dto/registration.dto";

export async function saveBankCustomerStepOneDraft(
  payload: StepOneRegistrationRequest
): Promise<StepOneRegistrationResponse> {
  // Save identity details as draft so officers can safely continue later.
  return postStepOneRegistration(REGISTRATION_ENDPOINTS.bankCustomer.stepOneDraft, payload);
}

export async function continueBankCustomerStepOne(
  payload: StepOneRegistrationRequest
): Promise<StepOneRegistrationResponse> {
  // Submit step 1 as ready-to-continue in the onboarding flow.
  return postStepOneRegistration(REGISTRATION_ENDPOINTS.bankCustomer.stepOneContinue, payload);
}

export async function updateBankCustomerStepOneDraft(
  bankCustomerId: number,
  payload: StepOneUpdateRequest
): Promise<StepOneRegistrationResponse> {
  // Update an existing customer's draft step-1 record.
  return putStepOneRegistration(REGISTRATION_ENDPOINTS.bankCustomer.stepOneUpdateDraft(bankCustomerId), payload);
}

export async function updateBankCustomerStepOneContinue(
  bankCustomerId: number,
  payload: StepOneUpdateRequest
): Promise<StepOneRegistrationResponse> {
  // Update and continue step 1 for an existing customer record.
  return putStepOneRegistration(REGISTRATION_ENDPOINTS.bankCustomer.stepOneUpdateContinue(bankCustomerId), payload);
}
