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
    stepOneUpdateDraft: (bankCustomerId: number) => `/bank-officers/customers/${bankCustomerId}/step-1/draft`,
    stepOneUpdateContinue: (bankCustomerId: number) => `/bank-officers/customers/${bankCustomerId}/step-1/continue`,
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
  bankOfficerCustomerStepOneByNic: "/bank-officers/customers/step-1/by-nic",
  bankOfficerCustomerGeneratedCredentials: "/bank-officers/customers/credentials/generate",
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
  saveCribLinkingStep: (bankCustomerId: number) =>
    `/bank-officers/customers/${bankCustomerId}/financial-records/steps/crib-linking/continue`,
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
  cardProviders: "/public-customers/card-providers",
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
  reportPdf: (selfEvaluationId: number) => `/creditlens/public/report/${selfEvaluationId}/pdf`,
  history: "/creditlens/public/history",
  byId: (selfEvaluationId: number) => `/creditlens/public/evaluations/${selfEvaluationId}`,
} as const;

export const BANK_CREDITLENS_ENDPOINTS = {
  current: "/creditlens/bank/current",
  dashboard: "/creditlens/bank/dashboard",
  trends: "/creditlens/bank/trends",
  insights: "/creditlens/bank/insights",
  report: "/creditlens/bank/report",
  reportPdf: (bankEvaluationId: number) => `/creditlens/bank/report/${bankEvaluationId}/pdf`,
  history: "/creditlens/bank/history",
  byId: (bankEvaluationId: number) => `/creditlens/bank/evaluations/${bankEvaluationId}`,
} as const;

export const BANK_LOANSENSE_ENDPOINTS = {
  current: "/loansense/bank/current",
  history: "/loansense/bank/history",
  byId: (loansenseEvaluationId: number) =>
    `/loansense/bank/evaluations/${loansenseEvaluationId}`,
  loanType: (loanType: string) =>
    `/loansense/bank/loan-types/${encodeURIComponent(loanType)}`,
} as const;

export const USER_PROFILE_ENDPOINTS = {
  current: "/users/profile",
  update: "/users/profile",
  imageUpload: "/users/profile/image",
  imageDelete: "/users/profile/image",
} as const;

export const ADMIN_ENDPOINTS = {
  bankOfficers: "/admin/bank-officers",
  branches: "/admin/branches",
  users: "/admin/users",
  dashboardSummary: "/admin/dashboard/summary",
  dashboardRecentActions: "/admin/dashboard/recent-actions",
  dashboardMonthlyUserGrowth: "/admin/dashboard/monthly-user-growth",
  auditLogs: "/admin/audit-logs",
  auditLogFilters: "/admin/audit-logs/filters",
  auditLogRecent: "/admin/audit-logs/recent",
  loanPolicies: "/admin/loan-policies",
} as const;

export const TRANSACT_ENDPOINTS = {
  dashboardCurrentBalance: "/bank-customers/transact/dashboard/current-balance",
  dashboardSummary: "/bank-customers/transact/dashboard/summary",
  transactionsInitiate: "/bank-customers/transact/transactions/initiate",
  transactionsVerifyOtp: "/bank-customers/transact/transactions/verify-otp",
  transactionsResendOtp: "/bank-customers/transact/transactions/resend-otp",
  transactionsHistory: "/bank-customers/transact/transactions/history",
  bankOfficerTransactionsHistory: "/bank-officers/transact/transactions",
  transactionByReference: (referenceNo: string) => `/bank-customers/transact/transactions/${encodeURIComponent(referenceNo)}`,
  beneficiaries: "/bank-customers/transact/beneficiaries",
  beneficiaryById: (beneficiaryId: number) => `/bank-customers/transact/beneficiaries/${beneficiaryId}`,
} as const;

export const SPENDIQ_ENDPOINTS = {
  categories: "/spendiq/categories",
  expenses: "/spendiq/expenses",
  incomes: "/spendiq/incomes",
  budgets: "/spendiq/budgets",
  summary: "/spendiq/summary",
  expenseById: (expenseId: number) => `/spendiq/expenses/${expenseId}`,
  incomeById: (incomeId: number) => `/spendiq/incomes/${incomeId}`,
} as const;
