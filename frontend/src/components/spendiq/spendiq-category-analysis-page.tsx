"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import ModuleHeader from "@/src/components/ui/module-header";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { useToast } from "@/src/components/ui/toast";
import { toApiError } from "@/src/api/client";
import { getSpendIqBudgets, getSpendIqCategories, getSpendIqExpenses } from "@/src/api/spendiq/spendiq.service";
import type {
  SpendIqBudgetResponse,
  SpendIqCategoryResponse,
  SpendIqExpenseResponse,
} from "@/src/types/dto/spendiq.dto";

type CategoryAnalysisRow = {
  categoryId: number;
  name: string;
  amount: number;
  percent: number;
  expenses: number;
  budget: number;
  usagePercent: number;
  status: "On Track" | "Near Limit" | "Over Limit" | "No Budget";
};

function monthBounds(year: number, month: number): { fromDate: string; toDate: string } {
  const from = new Date(Date.UTC(year, month - 1, 1));
  const to = new Date(Date.UTC(year, month, 0));
  const toIso = (value: Date) => value.toISOString().slice(0, 10);
  return { fromDate: toIso(from), toDate: toIso(to) };
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

function formatMoney(value: number): string {
  return new Intl.NumberFormat("en-LK", {
    style: "currency",
    currency: "LKR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value || 0);
}

const monthOptions = [
  { value: 0, label: "All months" },
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];

export function SpendIqCategoryAnalysisPage() {
  const { showToast } = useToast();
  const router = useRouter();
  const today = new Date();
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());

  const [categories, setCategories] = useState<SpendIqCategoryResponse[]>([]);
  const [expenses, setExpenses] = useState<SpendIqExpenseResponse[]>([]);
  const [budgets, setBudgets] = useState<SpendIqBudgetResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const isAllMonths = selectedMonth === 0;
      const dateRange = isAllMonths ? undefined : monthBounds(selectedYear, selectedMonth);
      const [categoryData, expenseData, budgetData] = await Promise.all([
        getSpendIqCategories(),
        getSpendIqExpenses(dateRange),
        isAllMonths ? getSpendIqBudgets() : getSpendIqBudgets({ month: selectedMonth, year: selectedYear }),
      ]);
      setCategories(categoryData);
      setExpenses(expenseData);
      setBudgets(budgetData);
    } catch (error) {
      const apiError = toApiError(error);
      showToast({ type: "error", title: "Failed to load category analysis", description: apiError.message });
    } finally {
      setIsLoading(false);
    }
  }, [selectedMonth, selectedYear, showToast]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const rows = useMemo<CategoryAnalysisRow[]>(() => {
    const spentByCategory = new Map<number, number>();
    const countByCategory = new Map<number, number>();
    const budgetByCategory = new Map<number, number>();

    for (const expense of expenses) {
      spentByCategory.set(expense.categoryId, round2((spentByCategory.get(expense.categoryId) ?? 0) + Number(expense.amount)));
      countByCategory.set(expense.categoryId, (countByCategory.get(expense.categoryId) ?? 0) + 1);
    }

    for (const budget of budgets) {
      budgetByCategory.set(budget.categoryId, Number(budget.budgetAmount ?? 0));
    }

    const totalSpent = Array.from(spentByCategory.values()).reduce((acc, value) => acc + value, 0);

    return categories
      .map((category) => {
        const amount = Number(spentByCategory.get(category.categoryId) ?? 0);
        const budget = Number(budgetByCategory.get(category.categoryId) ?? 0);
        const usagePercent = budget > 0 ? round2((amount / budget) * 100) : 0;
        const status: CategoryAnalysisRow["status"] =
          budget <= 0 ? "No Budget" : usagePercent > 100 ? "Over Limit" : usagePercent >= 80 ? "Near Limit" : "On Track";
        return {
          categoryId: category.categoryId,
          name: category.categoryName,
          amount,
          percent: totalSpent > 0 ? round2((amount / totalSpent) * 100) : 0,
          expenses: countByCategory.get(category.categoryId) ?? 0,
          budget,
          usagePercent,
          status,
        };
      })
      .filter((row) => row.amount > 0 || row.budget > 0)
      .sort((a, b) => b.amount - a.amount);
  }, [categories, expenses, budgets]);

  const topSpendingRows = useMemo(() => rows.slice(0, 5), [rows]);
  const maxAmount = topSpendingRows.reduce((max, row) => Math.max(max, row.amount), 0);

  function openCategoryTransactions(categoryName: string) {
    const transactionsPath = pathname.endsWith("/category")
      ? pathname.replace(/\/category$/, "/category/transactions")
      : "/public-customer/spendiq/category/transactions";
    const query = new URLSearchParams({
      category: categoryName,
    });
    if (selectedMonth !== 0) {
      const { fromDate, toDate } = monthBounds(selectedYear, selectedMonth);
      query.set("fromDate", fromDate);
      query.set("toDate", toDate);
    }
    router.push(`${transactionsPath}?${query.toString()}`);
  }

  return (
    <div className="p-8 space-y-8 bg-[#f4f6fb] dark:bg-slate-950 min-h-screen">
      <ModuleHeader theme="spendiq" menuMode="feature-layout" title="Category Analysis" />

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-md p-8 border border-transparent dark:border-slate-800">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="text-xl font-bold text-[#0b1a3a] dark:text-cyan-300">Spending by Category (Top 5)</h2>
          <div className="grid grid-cols-2 gap-3 lg:w-[420px]">
            <div>
              <label className="text-xs font-medium text-gray-500 dark:text-slate-400">Month</label>
              <Select value={String(selectedMonth)} onValueChange={(value) => setSelectedMonth(Number(value))}>
                <SelectTrigger className="w-full h-10 border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  {monthOptions.map((month) => (
                    <SelectItem key={month.value} value={String(month.value)}>
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 dark:text-slate-400">Year</label>
              <input
                type="number"
                min={2000}
                max={3000}
                value={selectedYear}
                onChange={(event) => setSelectedYear(Number(event.target.value))}
                disabled={selectedMonth === 0}
                className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm"
              />
            </div>
          </div>
        </div>

        {isLoading ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">Loading category breakdown...</p>
        ) : topSpendingRows.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">No category spending data for this period.</p>
        ) : (
          <div className="space-y-6">
            {topSpendingRows.map((row) => (
              <button key={row.categoryId} type="button" className="w-full text-left" onClick={() => openCategoryTransactions(row.name)}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-gray-700 dark:text-slate-200">{row.name}</span>
                  <span className="text-gray-500 dark:text-slate-400">{formatMoney(row.amount)}</span>
                </div>
                <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-3 bg-[#0a234c] dark:bg-cyan-500 rounded-full transition-all duration-700"
                    style={{ width: `${maxAmount > 0 ? round2((row.amount / maxAmount) * 100) : 0}%` }}
                  />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {!isLoading &&
          rows.map((row) => (
            <button
              key={row.categoryId}
              type="button"
              onClick={() => openCategoryTransactions(row.name)}
              className="text-left bg-white dark:bg-slate-900 rounded-2xl shadow-md p-6 space-y-4 border border-transparent dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-600 transition"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-base font-bold text-[#0b1a3a] dark:text-cyan-300">{row.name}</h3>
                <span className="text-xs bg-[#0a234c] dark:bg-cyan-700 text-white px-3 py-1 rounded-full">{row.status}</span>
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-800 dark:text-slate-100">{formatMoney(row.amount)}</h2>
                <p className="text-xs text-gray-500 dark:text-slate-400">{row.percent}% of total expenses</p>
                <p className="text-xs text-gray-400 dark:text-slate-500 mt-1">
                  {row.expenses} expense{row.expenses > 1 ? "s" : ""}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500 dark:text-slate-400 mb-2">Budget Usage</p>
                <div className="h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-2 rounded-full transition-all duration-700 ${
                      row.budget <= 0 ? "bg-slate-400" : row.usagePercent > 100 ? "bg-red-500" : row.usagePercent >= 80 ? "bg-amber-500" : "bg-black dark:bg-cyan-500"
                    }`}
                    style={{ width: `${Math.max(0, Math.min(row.usagePercent, 100))}%` }}
                  />
                </div>
                <p className="text-xs text-gray-400 dark:text-slate-500 mt-2">
                  {formatMoney(row.amount)} / {formatMoney(row.budget)}
                </p>
              </div>
            </button>
          ))}
      </div>
    </div>
  );
}
