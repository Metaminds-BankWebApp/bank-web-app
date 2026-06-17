import apiClient, { toApiError } from "@/src/api/client";
import { SPENDIQ_ENDPOINTS } from "@/src/api/endpoints";
import type {
  CreateSpendIqBudgetRequest,
  CreateSpendIqCategoryRequest,
  CreateSpendIqExpenseRequest,
  CreateSpendIqIncomeRequest,
  SpendIqBudgetResponse,
  SpendIqCategoryResponse,
  SpendIqExpenseResponse,
  SpendIqIncomeResponse,
  SpendIqMonthlySummaryResponse,
} from "@/src/types/dto/spendiq.dto";

export async function getSpendIqCategories(): Promise<SpendIqCategoryResponse[]> {
  try {
    const { data } = await apiClient.get<SpendIqCategoryResponse[]>(SPENDIQ_ENDPOINTS.categories);
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function createSpendIqCategory(payload: CreateSpendIqCategoryRequest): Promise<SpendIqCategoryResponse> {
  try {
    const { data } = await apiClient.post<SpendIqCategoryResponse>(SPENDIQ_ENDPOINTS.categories, payload);
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function getSpendIqExpenses(filters?: {
  fromDate?: string;
  toDate?: string;
}): Promise<SpendIqExpenseResponse[]> {
  try {
    const { data } = await apiClient.get<SpendIqExpenseResponse[]>(SPENDIQ_ENDPOINTS.expenses, {
      params: filters,
    });
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function createSpendIqExpense(payload: CreateSpendIqExpenseRequest): Promise<SpendIqExpenseResponse> {
  try {
    const { data } = await apiClient.post<SpendIqExpenseResponse>(SPENDIQ_ENDPOINTS.expenses, payload);
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function updateSpendIqExpense(
  expenseId: number,
  payload: CreateSpendIqExpenseRequest,
): Promise<SpendIqExpenseResponse> {
  try {
    const { data } = await apiClient.put<SpendIqExpenseResponse>(SPENDIQ_ENDPOINTS.expenseById(expenseId), payload);
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function deleteSpendIqExpense(expenseId: number): Promise<void> {
  try {
    await apiClient.delete(SPENDIQ_ENDPOINTS.expenseById(expenseId));
  } catch (error) {
    throw toApiError(error);
  }
}

export async function getSpendIqIncomes(filters?: {
  fromDate?: string;
  toDate?: string;
}): Promise<SpendIqIncomeResponse[]> {
  try {
    const { data } = await apiClient.get<SpendIqIncomeResponse[]>(SPENDIQ_ENDPOINTS.incomes, {
      params: filters,
    });
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function createSpendIqIncome(payload: CreateSpendIqIncomeRequest): Promise<SpendIqIncomeResponse> {
  try {
    const { data } = await apiClient.post<SpendIqIncomeResponse>(SPENDIQ_ENDPOINTS.incomes, payload);
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function updateSpendIqIncome(
  incomeId: number,
  payload: CreateSpendIqIncomeRequest,
): Promise<SpendIqIncomeResponse> {
  try {
    const { data } = await apiClient.put<SpendIqIncomeResponse>(SPENDIQ_ENDPOINTS.incomeById(incomeId), payload);
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function deleteSpendIqIncome(incomeId: number): Promise<void> {
  try {
    await apiClient.delete(SPENDIQ_ENDPOINTS.incomeById(incomeId));
  } catch (error) {
    throw toApiError(error);
  }
}

export async function getSpendIqBudgets(filters?: {
  month?: number;
  year?: number;
}): Promise<SpendIqBudgetResponse[]> {
  try {
    const { data } = await apiClient.get<SpendIqBudgetResponse[]>(SPENDIQ_ENDPOINTS.budgets, {
      params: filters,
    });
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function upsertSpendIqBudget(payload: CreateSpendIqBudgetRequest): Promise<SpendIqBudgetResponse> {
  try {
    const { data } = await apiClient.post<SpendIqBudgetResponse>(SPENDIQ_ENDPOINTS.budgets, payload);
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}

export async function getSpendIqMonthlySummary(month: number, year: number): Promise<SpendIqMonthlySummaryResponse> {
  try {
    const { data } = await apiClient.get<SpendIqMonthlySummaryResponse>(SPENDIQ_ENDPOINTS.summary, {
      params: { month, year },
    });
    return data;
  } catch (error) {
    throw toApiError(error);
  }
}
