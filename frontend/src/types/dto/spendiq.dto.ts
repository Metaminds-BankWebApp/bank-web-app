export type SpendIqPaymentMethod = "CASH" | "BANK_TRANSFER" | "CARD";
export type SpendIqCategoryType = "FIXED" | "VARIABLE";

export interface CreateSpendIqCategoryRequest {
  categoryName: string;
  categoryType: SpendIqCategoryType;
}

export interface SpendIqCategoryResponse {
  categoryId: number;
  userId: number;
  categoryName: string;
  categoryType: SpendIqCategoryType | string;
  createdAt: string;
}

export interface CreateSpendIqExpenseRequest {
  categoryId?: number;
  category?: string;
  amount: number;
  expenseDate: string;
  paymentType: SpendIqPaymentMethod;
}

export interface SpendIqExpenseResponse {
  expenseId: number;
  userId: number;
  categoryId: number;
  categoryName: string;
  amount: number;
  expenseDate: string;
  paymentType: SpendIqPaymentMethod | string;
  createdAt: string;
}

export interface CreateSpendIqIncomeRequest {
  sourceName: string;
  amount: number;
  incomeDate: string;
}

export interface SpendIqIncomeResponse {
  incomeId: number;
  userId: number;
  sourceName: string;
  amount: number;
  incomeDate: string;
  createdAt: string;
}

export interface CreateSpendIqBudgetRequest {
  categoryId: number;
  budgetAmount: number;
  month: number;
  year: number;
}

export interface SpendIqBudgetResponse {
  budgetId: number;
  userId: number;
  categoryId: number;
  categoryName: string;
  budgetAmount: number;
  month: number;
  year: number;
  createdAt: string;
  updatedAt: string;
}

export interface SpendIqMonthlySummaryResponse {
  month: number;
  year: number;
  totalIncome: number;
  totalExpense: number;
  totalBudget: number;
  netSavings: number;
  remainingBudget: number;
  budgetUsagePercentage: number;
}
