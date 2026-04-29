export interface BankOfficerCustomerIdentityResponse {
  bankCustomerId: number;
  userId: number;
  customerCode: string;
}

export interface BankOfficerCustomerStepOnePrefillResponse {
  bankCustomerId: number;
  userId: number;
  customerCode: string;
  accessStatus: string;
  firstName: string;
  lastName: string;
  nic: string;
  dob: string | null;
  email: string;
  mobile: string;
  province: string;
  address: string;
  username: string;
  accountNumber: string | null;
  accountStatus: string | null;
  accountType: string | null;
}

export interface BankCustomerFinancialRecordResponse {
  bankRecordId: number;
  bankCustomerId: number;
  verifiedByOfficerId: number;
  dataSource: string;
  createdAt: string;
  updatedAt: string;
  incomes: Array<{
    incomeId: number;
    incomeCategory: string;
    amount: number;
    salaryType?: string | null;
    employmentType?: string | null;
    durationMonths?: number | null;
    incomeStability?: string | null;
    createdAt?: string | null;
  }>;
  loans: Array<{
    loanId: number;
    loanType: string;
    monthlyEmi: number;
    remainingBalance: number;
    createdAt?: string | null;
  }>;
  cards: Array<{
    cardId: number;
    provider?: string | null;
    creditLimit: number;
    outstandingBalance: number;
    createdAt?: string | null;
  }>;
  liabilities: Array<{
    liabilityId: number;
    description: string;
    monthlyAmount: number;
    createdAt?: string | null;
  }>;
  missedPayments: number;
}

export interface BankCustomerFinancialRecordSummaryResponse {
  bankRecordId: number;
  bankCustomerId: number;
  verifiedByOfficerId: number;
  dataSource: string;
  createdAt: string;
  updatedAt: string;
}

export interface BankCustomerIncomeStepRequest {
  incomes: Array<{
    incomeCategory: "SALARY" | "BUSINESS";
    amount: number;
    salaryType?: string;
    employmentType?: string;
    durationMonths?: number;
    incomeStability?: string;
  }>;
}

export interface BankCustomerLoanStepRequest {
  loans: Array<{
    loanType: string;
    monthlyEmi: number;
    remainingBalance: number;
  }>;
}

export interface BankCustomerCardStepRequest {
  cards: Array<{
    provider?: string;
    creditLimit: number;
    outstandingBalance: number;
  }>;
}

export interface BankCustomerLiabilityStepRequest {
  liabilities: Array<{
    description: string;
    monthlyAmount: number;
  }>;
  missedPayments: number;
}

export interface BankCustomerCribRequestStepRequest {
  requestType: "FULL_REPORT" | "SUMMARY_ONLY" | "REFRESH" | string;
  nic?: string;
}

export interface BankCustomerCribRetrievalStepRequest {
  requestStatus?: "PENDING" | "SUBMITTED" | "IN_PROGRESS" | "COMPLETED" | "FAILED" | "CANCELLED" | string;
  reportStatus?: "NOT_REQUESTED" | "PENDING" | "PROCESSING" | "READY" | "FAILED" | "EXPIRED" | string;
}

export interface BankCustomerFinancialStepResponse {
  bankRecordId: number;
  bankCustomerId: number;
  step: string;
  message: string;
}

export interface BankCustomerCribLoanRecord {
  loanType?: string | null;
  type?: string | null;
  monthlyEmi?: number | string | null;
  emi?: number | string | null;
  remainingBalance?: number | string | null;
  outstandingBalance?: number | string | null;
}

export interface BankCustomerCribCardRecord {
  provider?: string | null;
  issuer?: string | null;
  creditLimit?: number | string | null;
  limit?: number | string | null;
  outstandingBalance?: number | string | null;
}

export interface BankCustomerCribLiabilityRecord {
  description?: string | null;
  category?: string | null;
  monthlyAmount?: number | string | null;
  amount?: number | string | null;
}

export interface BankCustomerCribDataBlock {
  creditScore?: number | string | null;
  inquiryCount?: number | string | null;
  activeLoansCount?: number | string | null;
  totalActiveLoanValue?: number | string | null;
  missedPayments?: number | string | null;
  missedPaymentsLast12Months?: number | string | null;
  loans?: BankCustomerCribLoanRecord[] | null;
  cards?: BankCustomerCribCardRecord[] | null;
  creditCards?: BankCustomerCribCardRecord[] | null;
  liabilities?: BankCustomerCribLiabilityRecord[] | null;
  otherLiabilities?: BankCustomerCribLiabilityRecord[] | null;
}

export interface BankCustomerCribStepResponse {
  cribRequestId: number | null;
  bankCustomerId: number;
  step: string;
  requestStatus: string | null;
  reportStatus: string | null;
  message: string;
  snapshot?: BankCustomerCribDataBlock | null;
  nic?: string | null;
  creditScore?: number | string | null;
  inquiryCount?: number | string | null;
  activeLoansCount?: number | string | null;
  totalActiveLoanValue?: number | string | null;
  missedPayments?: number | string | null;
  missedPaymentsLast12Months?: number | string | null;
  loans?: BankCustomerCribLoanRecord[] | null;
  cards?: BankCustomerCribCardRecord[] | null;
  creditCards?: BankCustomerCribCardRecord[] | null;
  liabilities?: BankCustomerCribLiabilityRecord[] | null;
  otherLiabilities?: BankCustomerCribLiabilityRecord[] | null;
  cribData?: BankCustomerCribDataBlock | null;
  report?: BankCustomerCribDataBlock | null;
  data?: BankCustomerCribDataBlock | null;
  bankEvaluationId?: number | null;
  bankEvaluationTotalRiskPoints?: number | null;
}
