"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getSpendIqExpenses } from "@/src/api/spendiq/spendiq.service";
import { toApiError } from "@/src/api/client";
import type { SpendIqExpenseResponse } from "@/src/types/dto/spendiq.dto";
import { Button } from "@/src/components/ui/button";
import ModuleHeader from "@/src/components/ui/module-header";
import { useToast } from "@/src/components/ui/toast";

function formatDate(value: string): string {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function formatAmount(value: number): string {
  return new Intl.NumberFormat("en-LK", {
    style: "currency",
    currency: "LKR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function paymentLabel(value: string): string {
  if (value === "BANK_TRANSFER") return "Bank Transfer";
  if (value === "CARD") return "Card";
  if (value === "CASH") return "Cash";
  return value;
}

export function SpendIqCategoryTransactionsPage() {
  const { showToast } = useToast();
  const searchParams = useSearchParams();

  const category = searchParams.get("category") ?? "";
  const fromDate = searchParams.get("fromDate") ?? "";
  const toDate = searchParams.get("toDate") ?? "";

  const [expenses, setExpenses] = useState<SpendIqExpenseResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = useCallback(async () => {
    if (!category) {
      setExpenses([]);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const data = await getSpendIqExpenses({
        fromDate: fromDate || undefined,
        toDate: toDate || undefined,
      });
      setExpenses(data);
    } catch (error) {
      const apiError = toApiError(error);
      showToast({ type: "error", title: "Failed to load category transactions", description: apiError.message });
    } finally {
      setIsLoading(false);
    }
  }, [category, fromDate, toDate, showToast]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const categoryExpenses = useMemo(
    () =>
      expenses
        .filter((item) => item.categoryName === category)
        .sort((a, b) => new Date(b.expenseDate).getTime() - new Date(a.expenseDate).getTime()),
    [expenses, category],
  );

  const totalAmount = categoryExpenses.reduce((acc, item) => acc + Number(item.amount), 0);

  return (
    <div className="p-8 space-y-8 bg-[#f4f6fb] dark:bg-slate-950 min-h-screen">
      <ModuleHeader theme="spendiq" menuMode="feature-layout" title="Category Transactions" />

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-md p-6 border border-transparent dark:border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-[#0b1a3a] dark:text-cyan-300">{category || "Category not provided"}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {fromDate && toDate ? `Period: ${fromDate} to ${toDate}` : "All available period"}
            </p>
          </div>
          <div className="text-sm font-semibold text-slate-700 dark:text-slate-200">Total: {formatAmount(totalAmount)}</div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-md p-6 border border-transparent dark:border-slate-800">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-slate-200">Transactions</h3>
          <Button type="button" variant="outline" onClick={() => window.history.back()}>
            Back
          </Button>
        </div>

        {!category ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">Category parameter is missing.</p>
        ) : isLoading ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">Loading transactions...</p>
        ) : categoryExpenses.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">No transactions found for this category in the selected period.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">
                <tr>
                  <th className="text-left py-3">Date</th>
                  <th className="text-left py-3">Category</th>
                  <th className="text-left py-3">Amount</th>
                  <th className="text-left py-3">Payment Type</th>
                </tr>
              </thead>
              <tbody>
                {categoryExpenses.map((expense) => (
                  <tr key={expense.expenseId} className="border-b border-slate-200 dark:border-slate-800 last:border-none">
                    <td className="py-4 text-slate-700 dark:text-slate-200">{formatDate(expense.expenseDate)}</td>
                    <td className="py-4">
                      <span className="px-3 py-1 text-xs rounded-full bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-200">
                        {expense.categoryName}
                      </span>
                    </td>
                    <td className="py-4 font-semibold text-red-500">-{formatAmount(Number(expense.amount))}</td>
                    <td className="py-4 text-slate-700 dark:text-slate-200">{paymentLabel(expense.paymentType)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
