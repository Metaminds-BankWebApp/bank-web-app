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
  bankAccount?: number;
  accountNumber?: string;
  branchId?: number;
  officerId?: number;
  employeeCode?: string;
  createdByAdminUserId?: number;
  customerCode?: string;
  accountType?: string;
  openingBalance?: number;
}

export interface StepOneUpdateRequest {
  firstName: string;
  lastName: string;
  nic: string;
  dob: string;
  email: string;
  mobile: string;
  province: string;
  address: string;
  username: string;
  password?: string;
  confirmPassword?: string;
  bankAccount?: number;
  accountNumber?: string;
  branchId?: number;
  officerId?: number;
  employeeCode?: string;
  createdByAdminUserId?: number;
  customerCode?: string;
  accountType?: string;
  openingBalance?: number;
}

export interface StepOneRegistrationResponse {
  userId: number;
  role: "BANK_CUSTOMER" | "PUBLIC_CUSTOMER" | "BANK_OFFICER" | string;
  state: "DRAFT" | "PENDING_STEP_2" | "SUCCESS" | string;
  message: string;
}
