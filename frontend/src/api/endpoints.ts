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
  bankOfficerCustomerByUser: (userId: number) => `/bank-officers/customers/user/${userId}`,
} as const;

export const BANK_CUSTOMER_FINANCIAL_ENDPOINTS = {
  saveIncomeStep: (bankCustomerId: number) =>
    `/bank-officers/customers/${bankCustomerId}/financial-records/steps/income/continue`,
  saveLoanStep: (bankCustomerId: number) =>
    `/bank-officers/customers/${bankCustomerId}/financial-records/steps/loans/continue`,
  saveCardStep: (bankCustomerId: number) =>
    `/bank-officers/customers/${bankCustomerId}/financial-records/steps/cards/continue`,
  saveLiabilityStep: (bankCustomerId: number) =>
    `/bank-officers/customers/${bankCustomerId}/financial-records/steps/liabilities/continue`,
  saveCribRequestStep: (bankCustomerId: number) =>
    `/bank-officers/customers/${bankCustomerId}/financial-records/steps/crib-request/continue`,
  saveCribRetrievalStep: (bankCustomerId: number) =>
    `/bank-officers/customers/${bankCustomerId}/financial-records/steps/crib-retrieval/continue`,
  completeCribReviewStep: (bankCustomerId: number) =>
    `/bank-officers/customers/${bankCustomerId}/financial-records/steps/review/complete`,
  current: (bankCustomerId: number) =>
    `/bank-officers/customers/${bankCustomerId}/financial-records/current`,
  history: (bankCustomerId: number) =>
    `/bank-officers/customers/${bankCustomerId}/financial-records/history`,
  byId: (bankCustomerId: number, bankRecordId: number) =>
    `/bank-officers/customers/${bankCustomerId}/financial-records/${bankRecordId}`,
} as const;

export const PUBLIC_CUSTOMER_FINANCIAL_ENDPOINTS = {
  me: "/public-customers/me",
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

export const PUBLIC_CREDITLENS_ENDPOINTS = {
  createEvaluation: "/creditlens/public/evaluations",
  current: "/creditlens/public/current",
  dashboard: "/creditlens/public/dashboard",
  trends: "/creditlens/public/trends",
  insights: "/creditlens/public/insights",
  report: "/creditlens/public/report",
  history: "/creditlens/public/history",
  byId: (selfEvaluationId: number) => `/creditlens/public/evaluations/${selfEvaluationId}`,
} as const;

export const ADMIN_ENDPOINTS = {
  bankOfficers: "/admin/bank-officers",
  branches: "/admin/branches",
} as const;
