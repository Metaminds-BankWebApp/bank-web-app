"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Download } from "lucide-react";
import { getSpendIqExpenses } from "@/src/api/spendiq/spendiq.service";
import { toApiError } from "@/src/api/client";
import type { SpendIqExpenseResponse, SpendIqPaymentMethod } from "@/src/types/dto/spendiq.dto";
import { Button } from "@/src/components/ui/button";
import ModuleHeader from "@/src/components/ui/module-header";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { useToast } from "@/src/components/ui/toast";

function paymentLabel(value: string): string {
  if (value === "BANK_TRANSFER") return "Bank Transfer";
  if (value === "CARD") return "Card";
  if (value === "CASH") return "Cash";
  return value;
}

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

function downloadCsv(filename: string, rows: string[][]) {
  const csv = rows
    .map((row) =>
      row
        .map((cell) => {
          const normalized = String(cell ?? "");
          if (normalized.includes(",") || normalized.includes("\"") || normalized.includes("\n")) {
            return `"${normalized.replaceAll("\"", "\"\"")}"`;
          }
          return normalized;
        })
        .join(","),
    )
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function SpendIqHistoryPage() {
  const { showToast } = useToast();
  const searchParams = useSearchParams();

  const [expenses, setExpenses] = useState<SpendIqExpenseResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [paymentFilter, setPaymentFilter] = useState<"ALL" | SpendIqPaymentMethod>("ALL");

  const loadExpenses = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getSpendIqExpenses();
      setExpenses(data);
    } catch (error) {
      const apiError = toApiError(error);
      showToast({ type: "error", title: "Failed to load expenses", description: apiError.message });
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    void loadExpenses();
  }, [loadExpenses]);

  useEffect(() => {
    const category = searchParams.get("category");
    const fromDate = searchParams.get("fromDate");
    const toDate = searchParams.get("toDate");
    const paymentType = searchParams.get("paymentType");

    if (category && category.trim()) {
      setCategoryFilter(category);
    }
    if (fromDate && fromDate.trim()) {
      setStartDate(fromDate);
    }
    if (toDate && toDate.trim()) {
      setEndDate(toDate);
    }
    if (paymentType === "CASH" || paymentType === "BANK_TRANSFER" || paymentType === "CARD") {
      setPaymentFilter(paymentType);
    }
  }, [searchParams]);

  const sortedExpenses = useMemo(
    () =>
      [...expenses].sort((a, b) => {
        const dateDiff = new Date(b.expenseDate).getTime() - new Date(a.expenseDate).getTime();
        if (dateDiff !== 0) return dateDiff;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }),
    [expenses],
  );

  const categoryOptions = useMemo(
    () => Array.from(new Set(sortedExpenses.map((item) => item.categoryName))).sort((a, b) => a.localeCompare(b)),
    [sortedExpenses],
  );

  const hasActiveFilter = Boolean(
    startDate || endDate || categoryFilter !== "ALL" || paymentFilter !== "ALL",
  );

  const filteredExpenses = useMemo(
    () =>
      sortedExpenses.filter((item) => {
        if (startDate && item.expenseDate < startDate) return false;
        if (endDate && item.expenseDate > endDate) return false;
        if (categoryFilter !== "ALL" && item.categoryName !== categoryFilter) return false;
        if (paymentFilter !== "ALL" && item.paymentType !== paymentFilter) return false;
        return true;
      }),
    [sortedExpenses, startDate, endDate, categoryFilter, paymentFilter],
  );

  const visibleExpenses = filteredExpenses;

  const summaryText = hasActiveFilter
    ? `${visibleExpenses.length} matching expense${visibleExpenses.length === 1 ? "" : "s"}`
    : `Showing all ${sortedExpenses.length} expense${sortedExpenses.length === 1 ? "" : "s"}`;

  function clearFilters() {
    setStartDate("");
    setEndDate("");
    setCategoryFilter("ALL");
    setPaymentFilter("ALL");
  }

  function exportCsv() {
    const rows: string[][] = [
      ["Date", "Category", "Amount (LKR)", "Payment Type"],
      ...visibleExpenses.map((item) => [
        item.expenseDate,
        item.categoryName,
        Number(item.amount).toFixed(2),
        paymentLabel(item.paymentType),
      ]),
    ];
    downloadCsv("spendiq-expense-history.csv", rows);
  }

  return (
    <div className="p-8 space-y-8 bg-[#f4f6fb] dark:bg-slate-950 min-h-screen">
      <ModuleHeader theme="spendiq" menuMode="feature-layout" title="Expense History" />

      <div className="mt-4">
        <p className="text-sm text-gray-500 dark:text-slate-400">
          Review and filter your expense history from backend records.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-md p-6 space-y-6 border border-transparent dark:border-slate-800">
        <div className="grid md:grid-cols-6 gap-6 items-end">
          <div className="flex flex-col space-y-2">
            <label className="text-xs font-medium text-gray-500 dark:text-slate-400">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-[#0b1a3a] dark:focus:border-slate-400 focus:ring-1 focus:ring-[#0b1a3a] dark:focus:ring-slate-400 bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-xs font-medium text-gray-500 dark:text-slate-400">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-[#0b1a3a] dark:focus:border-slate-400 focus:ring-1 focus:ring-[#0b1a3a] dark:focus:ring-slate-400 bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-xs font-medium text-gray-500 dark:text-slate-400">Category</label>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full py-6 border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-slate-100">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Categories</SelectItem>
                {categoryOptions.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-xs font-medium text-gray-500 dark:text-slate-400">Payment Type</label>
            <Select value={paymentFilter} onValueChange={(value) => setPaymentFilter(value as "ALL" | SpendIqPaymentMethod)}>
              <SelectTrigger className="w-full py-6 border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-slate-100">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Types</SelectItem>
                <SelectItem value="CASH">Cash</SelectItem>
                <SelectItem value="BANK_TRANSFER">Bank Transfer</SelectItem>
                <SelectItem value="CARD">Card</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={clearFilters}
              className="border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Reset Filters
            </Button>
          </div>

          <div className="flex justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={exportCsv}
              className="border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <Download size={16} />
              Export CSV
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-6 border border-transparent dark:border-slate-800">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-sm font-semibold text-gray-700 dark:text-slate-200">Expense Records</h2>
          <span className="text-xs text-gray-500 dark:text-slate-400">{summaryText}</span>
        </div>

        {isLoading ? (
          <div className="py-10 text-sm text-slate-500 dark:text-slate-400">Loading expenses...</div>
        ) : visibleExpenses.length === 0 ? (
          <div className="py-10 text-sm text-slate-500 dark:text-slate-400">No expense records found for the selected filters.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-slate-200 dark:border-slate-700 text-gray-500 dark:text-slate-400">
                <tr>
                  <th className="text-left py-3">Date</th>
                  <th className="text-left py-3">Category</th>
                  <th className="text-left py-3">Amount</th>
                  <th className="text-left py-3">Payment Type</th>
                </tr>
              </thead>
              <tbody>
                {visibleExpenses.map((expense) => (
                  <tr
                    key={expense.expenseId}
                    className="border-b border-slate-200 dark:border-slate-800 last:border-none hover:bg-gray-50 dark:hover:bg-slate-800/60 transition"
                  >
                    <td className="py-4 text-slate-700 dark:text-slate-200">{formatDate(expense.expenseDate)}</td>
                    <td>
                      <span className="px-3 py-1 text-xs rounded-full bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-200">
                        {expense.categoryName}
                      </span>
                    </td>
                    <td className="font-semibold text-red-500">-{formatAmount(Number(expense.amount))}</td>
                    <td>
                      <span className="px-3 py-1 text-xs rounded-full bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-slate-200">
                        {paymentLabel(expense.paymentType)}
                      </span>
                    </td>
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
