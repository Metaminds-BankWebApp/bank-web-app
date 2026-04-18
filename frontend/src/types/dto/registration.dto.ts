export interface StepOneRegistrationRequest {
  firstName: string;
  lastName: string;
  nic: string;
  dob: string;
  email: string;
  mobile: string;
  province: string;
  address: string;
  username: string;
  password: string;
  confirmPassword: string;
  bankAccount: string;
}

export interface StepOneRegistrationResponse {
  userId: number;
  role: "BANK_CUSTOMER" | "PUBLIC_CUSTOMER" | "BANK_OFFICER" | string;
  state: "DRAFT" | "PENDING_STEP_2" | string;
  message: string;
}
