export const AUTH_ENDPOINTS = {
  login: "/auth/login",
  me: "/auth/me",
  register: "/auth/register",
  logout: "/auth/logout",
  forgotPassword: "/auth/forgot-password",
  verifyOtp: "/auth/verify-otp",
  resetPassword: "/auth/reset-password",
} as const;

export const REGISTRATION_ENDPOINTS = {
  bankCustomer: {
    stepOneDraft: "/bank-officers/customers/step-1/draft",
    stepOneContinue: "/bank-officers/customers/step-1/continue",
  },
  publicCustomer: "/public-customers",
  bankOfficer: {
    draft: "/admin/bank-officers/draft",
    create: "/admin/bank-officers",
  },
} as const;

export const CUSTOMER_ENDPOINTS = {
  bankOfficerCustomers: "/bank-officers/customers",
  verifyBankAccount: "/bank-officers/customers/accounts/verify",
} as const;

export const PUBLIC_CUSTOMER_FINANCIAL_ENDPOINTS = {
  base: (publicCustomerId: number) => `/public-customers/${publicCustomerId}/financial-records`,
  saveIncomeStep: (publicCustomerId: number) =>
    `/public-customers/${publicCustomerId}/financial-records/steps/income`,
  saveLoanStep: (publicCustomerId: number) =>
    `/public-customers/${publicCustomerId}/financial-records/steps/loans`,
  saveCardStep: (publicCustomerId: number) =>
    `/public-customers/${publicCustomerId}/financial-records/steps/cards`,
  saveLiabilityStep: (publicCustomerId: number) =>
    `/public-customers/${publicCustomerId}/financial-records/steps/liabilities`,
  current: (publicCustomerId: number) =>
    `/public-customers/${publicCustomerId}/financial-records/current`,
  history: (publicCustomerId: number) =>
    `/public-customers/${publicCustomerId}/financial-records/history`,
  byId: (publicCustomerId: number, recordId: number) =>
    `/public-customers/${publicCustomerId}/financial-records/${recordId}`,
} as const;

export const ADMIN_ENDPOINTS = {
  bankOfficers: "/admin/bank-officers",
  branches: "/admin/branches",
} as const;

export const TRANSACT_ENDPOINTS = {
  transactionsInitiate: "/bank-customers/transact/transactions/initiate",
  transactionsVerifyOtp: "/bank-customers/transact/transactions/verify-otp",
  transactionsResendOtp: "/bank-customers/transact/transactions/resend-otp",
  transactionsHistory: "/bank-customers/transact/transactions/history",
  transactionByReference: (referenceNo: string) => `/bank-customers/transact/transactions/${encodeURIComponent(referenceNo)}`,
  beneficiaries: "/bank-customers/transact/beneficiaries",
  beneficiaryById: (beneficiaryId: number) => `/bank-customers/transact/beneficiaries/${beneficiaryId}`,
} as const;
