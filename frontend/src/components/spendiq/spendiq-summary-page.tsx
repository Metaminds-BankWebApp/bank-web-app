"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getSpendIqExpenses,
  getSpendIqMonthlySummary,
} from "@/src/api/spendiq/spendiq.service";
import { toApiError } from "@/src/api/client";
import ModuleHeader from "@/src/components/ui/module-header";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { useToast } from "@/src/components/ui/toast";
import type {
  SpendIqExpenseResponse,
  SpendIqMonthlySummaryResponse,
} from "@/src/types/dto/spendiq.dto";

const monthOptions = [
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

const emptySummary: SpendIqMonthlySummaryResponse = {
  month: new Date().getMonth() + 1,
  year: new Date().getFullYear(),
  totalIncome: 0,
  totalExpense: 0,
  totalBudget: 0,
  netSavings: 0,
  remainingBudget: 0,
  budgetUsagePercentage: 0,
};

function monthBounds(year: number, month: number): { fromDate: string; toDate: string } {
  const from = new Date(Date.UTC(year, month - 1, 1));
  const to = new Date(Date.UTC(year, month, 0));
  const toIso = (value: Date) => value.toISOString().slice(0, 10);
  return { fromDate: toIso(from), toDate: toIso(to) };
}

function formatMoney(value: number): string {
  return new Intl.NumberFormat("en-LK", {
    style: "currency",
    currency: "LKR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value || 0);
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

export function SpendIqSummaryPage() {
  const { showToast } = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const today = new Date();
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());

  const [summary, setSummary] = useState<SpendIqMonthlySummaryResponse>(emptySummary);
  const [expenses, setExpenses] = useState<SpendIqExpenseResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const spendIqRoot = useMemo(() => pathname.replace(/\/summary$/, ""), [pathname]);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const { fromDate, toDate } = monthBounds(selectedYear, selectedMonth);
      const [summaryData, expenseData] = await Promise.all([
        getSpendIqMonthlySummary(selectedMonth, selectedYear),
        getSpendIqExpenses({ fromDate, toDate }),
      ]);
      setSummary(summaryData);
      setExpenses(expenseData);
    } catch (error) {
      const apiError = toApiError(error);
      showToast({ type: "error", title: "Failed to load monthly summary", description: apiError.message });
    } finally {
      setIsLoading(false);
    }
  }, [selectedMonth, selectedYear, showToast]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const categoryRows = useMemo(() => {
    const byCategory = new Map<string, number>();
    for (const expense of expenses) {
      byCategory.set(expense.categoryName, (byCategory.get(expense.categoryName) ?? 0) + Number(expense.amount));
    }
    const total = Number(summary.totalExpense) || Array.from(byCategory.values()).reduce((acc, value) => acc + value, 0);
    return Array.from(byCategory.entries())
      .map(([name, amount]) => ({ name, amount, percent: total > 0 ? round2((amount / total) * 100) : 0 }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);
  }, [expenses, summary.totalExpense]);

  const openCategoryTransactions = useCallback((categoryName: string) => {
    const { fromDate, toDate } = monthBounds(selectedYear, selectedMonth);
    const query = new URLSearchParams({ category: categoryName, fromDate, toDate });
    router.push(`${spendIqRoot}/category/transactions?${query.toString()}`);
  }, [router, selectedMonth, selectedYear, spendIqRoot]);

  const currentMonthLabel = monthOptions.find((item) => item.value === selectedMonth)?.label ?? "Selected";
  const hasNegativeSavings = Number(summary.netSavings) < 0;
  const maxCategoryAmount = categoryRows.reduce((max, row) => Math.max(max, row.amount), 0);

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-[#f4f6fb] dark:bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        <ModuleHeader theme="spendiq" menuMode="feature-layout" title="Monthly Summary" />

        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-md p-6 border border-transparent dark:border-slate-800">
          <div className="grid md:grid-cols-2 gap-4 items-end">
            <div>
              <label className="text-xs font-medium text-gray-500 dark:text-slate-400">Month</label>
              <Select value={String(selectedMonth)} onValueChange={(value) => setSelectedMonth(Number(value))}>
                <SelectTrigger className="w-full py-6 border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800">
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
                className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          <SummaryCard title="Total Income" value={formatMoney(Number(summary.totalIncome))} subtitle={`${currentMonthLabel} ${selectedYear}`} />
          <SummaryCard title="Total Expense" value={formatMoney(Number(summary.totalExpense))} subtitle={`${currentMonthLabel} ${selectedYear}`} />
          <SummaryCard
            title="Net Savings"
            value={formatMoney(Number(summary.netSavings))}
            subtitle={hasNegativeSavings ? "Expenses higher than income" : "Income minus expenses"}
            highlight={hasNegativeSavings ? "red" : "green"}
          />
          <SummaryCard
            title="Budget Usage"
            value={`${round2(Number(summary.budgetUsagePercentage))}%`}
            subtitle={formatMoney(Number(summary.remainingBudget)) + " remaining"}
            highlight={Number(summary.budgetUsagePercentage) > 90 ? "red" : undefined}
          />
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-md p-6 border border-transparent dark:border-slate-800">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-sm font-semibold text-gray-700 dark:text-slate-200">Top Spending Categories</h2>
            <Link
              href={`${spendIqRoot}/category`}
              className="text-xs font-semibold text-[#0a234c] dark:text-sky-300 hover:underline"
            >
              View full category analysis
            </Link>
          </div>

          {isLoading ? (
            <p className="text-sm text-slate-500 dark:text-slate-400">Loading category breakdown...</p>
          ) : categoryRows.length === 0 ? (
            <p className="text-sm text-slate-500 dark:text-slate-400">No expenses recorded for this period.</p>
          ) : (
            <div className="space-y-5">
              {categoryRows.map((row) => (
                <button
                  key={row.name}
                  type="button"
                  onClick={() => openCategoryTransactions(row.name)}
                  className="block w-full rounded-xl p-2 text-left transition hover:bg-slate-50 dark:hover:bg-slate-800/70"
                >
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-gray-700 dark:text-slate-200">{row.name}</span>
                    <span className="text-gray-500 dark:text-slate-400">{formatMoney(row.amount)} ({row.percent}%)</span>
                  </div>
                  <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-3 bg-[#0a234c] dark:bg-cyan-500 rounded-full transition-all duration-700"
                      style={{ width: `${maxCategoryAmount > 0 ? round2((row.amount / maxCategoryAmount) * 100) : 0}%` }}
                    />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          <QuickLinkCard title="Expense History" description="Browse and filter every recorded expense." href={`${spendIqRoot}/history`} />
          <QuickLinkCard title="Budget Management" description="Adjust category limits for this month." href={`${spendIqRoot}/budget`} />
          <QuickLinkCard title="Analytics Report" description="See trends, SpendIQ score, and predictions." href={`${spendIqRoot}/report`} />
        </div>
      </div>
    </div>
  );
}

function SummaryCard({
  title,
  value,
  subtitle,
  highlight,
}: {
  title: string;
  value: string;
  subtitle: string;
  highlight?: "green" | "red";
}) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-md space-y-2 border border-transparent dark:border-slate-800">
      <p className="text-sm text-gray-500 dark:text-slate-400">{title}</p>
      <h2 className={`text-lg font-bold ${highlight === "green" ? "text-emerald-600" : highlight === "red" ? "text-red-500" : "text-slate-800 dark:text-slate-100"}`}>
        {value}
      </h2>
      <p className="text-xs text-gray-400 dark:text-slate-500">{subtitle}</p>
    </div>
  );
}

function QuickLinkCard({ title, description, href }: { title: string; description: string; href: string }) {
  return (
    <Link
      href={href}
      className="group block bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-md border border-transparent dark:border-slate-800 transition hover:shadow-lg hover:border-slate-200 dark:hover:border-slate-700"
    >
      <h3 className="text-sm font-bold text-[#0b1a3a] dark:text-cyan-300">{title}</h3>
      <p className="mt-2 text-xs text-gray-500 dark:text-slate-400">{description}</p>
      <span className="mt-4 inline-block text-xs font-semibold text-[#0a234c] dark:text-sky-300 transition group-hover:translate-x-1">
        Open →
      </span>
    </Link>
  );
}
