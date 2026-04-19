export const AUTH_ENDPOINTS = {
  login: "/auth/login",
  register: "/auth/register",
  logout: "/auth/logout",
  forgotPassword: "/auth/forgot-password",
  verifyOtp: "/auth/verify-otp",
  resetPassword: "/auth/reset-password",
} as const;

export const REGISTRATION_ENDPOINTS = {
  bankCustomer: {
    stepOneDraft: "/users/bank-customer/step-1/draft",
    stepOneContinue: "/users/bank-customer/step-1/continue",
  },
  publicCustomer: "/users/public-customer",
  bankOfficer: "/users/bank-officer",
} as const;

export const CUSTOMER_ENDPOINTS = {
  bankOfficerCustomers: "/users/bank-officer/customers",
} as const;
