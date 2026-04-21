export interface BankOfficerCustomerIdentityResponse {
  bankCustomerId: number;
  userId: number;
  customerCode: string;
}

export interface BankCustomerIncomeStepRequest {
  incomes: Array<{
    incomeCategory: "SALARY" | "BUSINESS";
    amount: number;
    salaryType?: string;
    employmentType?: string;
    contractDurationMonths?: number;
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

export interface BankCustomerCribStepResponse {
  cribRequestId: number | null;
  bankCustomerId: number;
  step: string;
  requestStatus: string | null;
  reportStatus: string | null;
  message: string;
}
