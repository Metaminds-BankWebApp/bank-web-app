export type IncomeCategory = "SALARY" | "BUSINESS";

export interface PublicCustomerIncomeStepRequest {
  incomes: Array<{
    incomeCategory: IncomeCategory;
    amount: number;
    salaryType?: string;
    employmentType?: string;
    contractDurationMonths?: number;
    incomeStability?: string;
  }>;
}

export interface PublicCustomerLoanStepRequest {
  loans: Array<{
    loanType: string;
    monthlyEmi: number;
    remainingBalance: number;
  }>;
}

export interface PublicCustomerCardStepRequest {
  cards: Array<{
    provider?: string;
    creditLimit: number;
    outstandingBalance: number;
  }>;
}

export interface PublicCustomerLiabilityStepRequest {
  liabilities: Array<{
    description: string;
    monthlyAmount: number;
  }>;
  missedPayments: number;
}

export interface PublicCustomerFinancialStepResponse {
  recordId: number;
  publicCustomerId: number;
  step: string;
  message: string;
}

export interface PublicCustomerFinancialRecordSummaryResponse {
  recordId: number;
  publicCustomerId: number;
  recordStatus: string;
  createdAt: string;
  updatedAt: string;
}

export interface PublicCustomerFinancialRecordResponse {
  recordId: number;
  publicCustomerId: number;
  recordStatus: string;
  createdAt: string;
  updatedAt: string;
  incomes: Array<{
    incomeId: number;
    incomeCategory: string;
    amount: number;
    salaryType?: string;
    employmentType?: string;
    contractDurationMonths?: number;
    incomeStability?: string;
    createdAt: string;
  }>;
  loans: Array<{
    loanId: number;
    loanType: string;
    monthlyEmi: number;
    remainingBalance: number;
    createdAt: string;
  }>;
  cards: Array<{
    cardId: number;
    provider?: string;
    creditLimit: number;
    outstandingBalance: number;
    createdAt: string;
  }>;
  liabilities: Array<{
    liabilityId: number;
    description: string;
    monthlyAmount: number;
    createdAt: string;
  }>;
  missedPayments: number;
}
