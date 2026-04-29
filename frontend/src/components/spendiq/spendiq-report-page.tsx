"use client";

import { Download, RefreshCw } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  getSpendIqBudgets,
  getSpendIqCategories,
  getSpendIqExpenses,
  getSpendIqIncomes,
  getSpendIqMonthlySummary,
} from "@/src/api/spendiq/spendiq.service";
import { toApiError } from "@/src/api/client";
import { Button } from "@/src/components/ui/button";
import ModuleHeader from "@/src/components/ui/module-header";
import { useToast } from "@/src/components/ui/toast";
import type {
  SpendIqBudgetResponse,
  SpendIqCategoryResponse,
  SpendIqExpenseResponse,
  SpendIqIncomeResponse,
  SpendIqMonthlySummaryResponse,
} from "@/src/types/dto/spendiq.dto";

type SpendIqReportPageProps = {
  title?: string;
};

type CategoryReportRow = {
  name: string;
  amount: number;
  count: number;
  type: string;
};

type MonthlyTrendRow = {
  month: string;
  income: number;
  spend: number;
  savings: number;
};

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

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

function firstDayOfMonth(year: number, month: number) {
  return `${year}-${String(month).padStart(2, "0")}-01`;
}

function lastDayOfMonth(year: number, month: number) {
  return new Date(Date.UTC(year, month, 0)).toISOString().slice(0, 10);
}

function formatCurrency(amount: number) {
  return `LKR ${amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function csvCell(value: string | number) {
  return `"${String(value).replace(/"/g, '""')}"`;
}

function downloadBlob(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const blobUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(blobUrl);
}

export function SpendIqReportPage({ title = "SpendIQ - Analytics Report" }: SpendIqReportPageProps) {
  const { showToast } = useToast();
  const today = useMemo(() => new Date(), []);
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);
  const [selectedYear] = useState(today.getFullYear());
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<SpendIqCategoryResponse[]>([]);
  const [expenses, setExpenses] = useState<SpendIqExpenseResponse[]>([]);
  const [incomes, setIncomes] = useState<SpendIqIncomeResponse[]>([]);
  const [budgets, setBudgets] = useState<SpendIqBudgetResponse[]>([]);
  const [summary, setSummary] = useState<SpendIqMonthlySummaryResponse>(emptySummary);
  const [monthlyTrend, setMonthlyTrend] = useState<MonthlyTrendRow[]>([]);

  const loadReport = useCallback(async () => {
    setIsLoading(true);
    try {
      const fromDate = firstDayOfMonth(selectedYear, selectedMonth);
      const toDate = lastDayOfMonth(selectedYear, selectedMonth);
      const trendMonths = Array.from({ length: 6 }, (_, index) => {
        const date = new Date(selectedYear, selectedMonth - 1 - (5 - index), 1);
        return { month: date.getMonth() + 1, year: date.getFullYear() };
      });

      const [categoryData, expenseData, incomeData, budgetData, summaryData, trendData] = await Promise.all([
        getSpendIqCategories(),
        getSpendIqExpenses({ fromDate, toDate }),
        getSpendIqIncomes({ fromDate, toDate }),
        getSpendIqBudgets({ month: selectedMonth, year: selectedYear }),
        getSpendIqMonthlySummary(selectedMonth, selectedYear),
        Promise.all(trendMonths.map((item) => getSpendIqMonthlySummary(item.month, item.year))),
      ]);

      setCategories(categoryData);
      setExpenses(expenseData);
      setIncomes(incomeData);
      setBudgets(budgetData);
      setSummary({
        month: summaryData.month,
        year: summaryData.year,
        totalIncome: Number(summaryData.totalIncome ?? 0),
        totalExpense: Number(summaryData.totalExpense ?? 0),
        totalBudget: Number(summaryData.totalBudget ?? 0),
        netSavings: Number(summaryData.netSavings ?? 0),
        remainingBudget: Number(summaryData.remainingBudget ?? 0),
        budgetUsagePercentage: Number(summaryData.budgetUsagePercentage ?? 0),
      });
      setMonthlyTrend(trendData.map((item) => ({
        month: `${monthNames[item.month - 1]} ${String(item.year).slice(2)}`,
        income: Number(item.totalIncome ?? 0),
        spend: Number(item.totalExpense ?? 0),
        savings: Number(item.netSavings ?? 0),
      })));
    } catch (error) {
      const apiError = toApiError(error);
      showToast({ type: "error", title: "Failed to load report", description: apiError.message });
    } finally {
      setIsLoading(false);
    }
  }, [selectedMonth, selectedYear, showToast]);

  useEffect(() => {
    void loadReport();
  }, [loadReport]);

  const categoryTypeById = useMemo(() => {
    return new Map(categories.map((category) => [category.categoryId, String(category.categoryType).toUpperCase()]));
  }, [categories]);

  const categoryRows = useMemo<CategoryReportRow[]>(() => {
    const rows = new Map<string, CategoryReportRow>();
    for (const expense of expenses) {
      const existing = rows.get(expense.categoryName) ?? {
        name: expense.categoryName,
        amount: 0,
        count: 0,
        type: categoryTypeById.get(expense.categoryId) ?? "VARIABLE",
      };
      existing.amount += Number(expense.amount);
      existing.count += 1;
      rows.set(expense.categoryName, existing);
    }
    return Array.from(rows.values()).sort((a, b) => b.amount - a.amount);
  }, [categoryTypeById, expenses]);

  const fixedExpenses = useMemo(
    () => categoryRows.filter((row) => row.type === "FIXED").reduce((total, row) => total + row.amount, 0),
    [categoryRows],
  );
  const variableExpenses = useMemo(
    () => categoryRows.filter((row) => row.type !== "FIXED").reduce((total, row) => total + row.amount, 0),
    [categoryRows],
  );
  const averageExpense = expenses.length > 0 ? Number(summary.totalExpense) / expenses.length : 0;
  const highValueCount = expenses.filter((expense) => Number(expense.amount) > Math.max(averageExpense * 1.5, 50000)).length;
  const budgetUsage = Number(summary.budgetUsagePercentage ?? 0);
  const spendIqScore = Math.max(0, Math.min(100, Math.round(100 - Math.min(budgetUsage, 100) * 0.55 + (summary.netSavings > 0 ? 15 : -10))));
  const scoreLabel = spendIqScore >= 75 ? "Strong" : spendIqScore >= 50 ? "Moderate" : "Needs attention";
  const selectedMonthLabel = `${monthNames[selectedMonth - 1]} ${selectedYear}`;
  const reportStamp = `${selectedYear}-${String(selectedMonth).padStart(2, "0")}`;

  const handleDownloadReport = useCallback(() => {
    const lines = [
      ["SpendIQ Report", selectedMonthLabel],
      ["Generated On", new Date().toLocaleString()],
      [],
      ["Summary"],
      ["Total Income", summary.totalIncome],
      ["Total Spend", summary.totalExpense],
      ["Total Budget", summary.totalBudget],
      ["Net Savings", summary.netSavings],
      ["Remaining Budget", summary.remainingBudget],
      ["Budget Usage %", Number(summary.budgetUsagePercentage).toFixed(2)],
      ["SpendIQ Score", spendIqScore],
      [],
      ["Category Breakdown"],
      ["Category", "Type", "Expense Count", "Total Amount"],
      ...categoryRows.map((row) => [row.name, row.type, row.count, row.amount]),
      [],
      ["Budgets"],
      ["Category", "Budget Amount"],
      ...budgets.map((budget) => [budget.categoryName, Number(budget.budgetAmount)]),
      [],
      ["Income Records"],
      ["Date", "Source", "Amount"],
      ...incomes.map((income) => [income.incomeDate, income.sourceName, Number(income.amount)]),
      [],
      ["Expense Records"],
      ["Date", "Category", "Payment Type", "Amount"],
      ...expenses.map((expense) => [expense.expenseDate, expense.categoryName, expense.paymentType, Number(expense.amount)]),
    ];

    const csv = lines.map((row) => row.map(csvCell).join(",")).join("\n");
    downloadBlob(`spendiq-report-${reportStamp}.csv`, csv, "text/csv;charset=utf-8;");
    showToast({ type: "success", title: "Report downloaded", description: `spendiq-report-${reportStamp}.csv` });
  }, [budgets, categoryRows, expenses, incomes, reportStamp, selectedMonthLabel, showToast, spendIqScore, summary]);

  return (
    <div className="min-h-screen bg-[#f4f6fb] p-6 text-slate-900 dark:bg-slate-950 dark:text-slate-100 md:p-8">
      <ModuleHeader theme="spendiq" menuMode="feature-layout" title={title} />

      <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0b1a3a] dark:text-slate-100">Monthly Spend Report</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{selectedMonthLabel}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <select
            value={selectedMonth}
            onChange={(event) => setSelectedMonth(Number(event.target.value))}
            className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          >
            {monthNames.map((month, index) => (
              <option key={month} value={index + 1}>{month}</option>
            ))}
          </select>
          <Button type="button" variant="outline" onClick={loadReport} loading={isLoading}>
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Button type="button" onClick={handleDownloadReport} disabled={isLoading}>
            <Download className="h-4 w-4" />
            Download CSV
          </Button>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-4">
        <ReportCard title="Total Spend" value={formatCurrency(Number(summary.totalExpense))} />
        <ReportCard title="Fixed Expenses" value={formatCurrency(fixedExpenses)} />
        <ReportCard title="Variable Spend" value={formatCurrency(variableExpenses)} />
        <ReportCard title="Net Savings" value={formatCurrency(Number(summary.netSavings))} tone={summary.netSavings >= 0 ? "good" : "danger"} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-base font-semibold">SpendIQ Score</h2>
          <div className="mt-6 flex justify-center">
            <RadialScore score={spendIqScore} />
          </div>
          <div className="mt-6 text-sm text-slate-500 dark:text-slate-400">
            Category: <span className="font-medium text-orange-500">{scoreLabel}</span>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-2">
          <h2 className="text-base font-semibold">Monthly Spend Trend</h2>
          <div className="mt-4 h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Line type="monotone" dataKey="spend" stroke="#2563eb" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="income" stroke="#16a34a" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-base font-semibold">Category Breakdown</h2>
          <div className="mt-4 h-[260px]">
            {categoryRows.length === 0 ? (
              <div className="flex h-full items-center justify-center text-sm text-slate-500">No expenses found for this month.</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryRows}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Bar dataKey="amount" fill="#2563eb" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-base font-semibold">Spend Behavior Insights</h2>
          <div className="mt-4">
            <BehaviorItem label="Income Records" value={String(incomes.length)} />
            <BehaviorItem label="High Value Transactions" value={String(highValueCount)} />
            <BehaviorItem label="Category Diversity" value={`${categoryRows.length} categories`} />
            <BehaviorItem label="Budget Utilization" value={`${Number(summary.budgetUsagePercentage).toFixed(2)}%`} />
          </div>
        </section>
      </div>
    </div>
  );
}

function ReportCard({ title, value, tone = "default" }: { title: string; value: string; tone?: "default" | "good" | "danger" }) {
  const valueClass = tone === "good" ? "text-emerald-600" : tone === "danger" ? "text-red-500" : "text-[#0b1a3a] dark:text-slate-100";

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
      <p className={`mt-2 text-xl font-bold ${valueClass}`}>{value}</p>
    </div>
  );
}

function BehaviorItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-slate-100 py-3 text-sm last:border-none dark:border-slate-800">
      <span className="text-slate-600 dark:text-slate-300">{label}</span>
      <span className="font-semibold text-[#0b1a3a] dark:text-slate-100">{value}</span>
    </div>
  );
}

function RadialScore({ score }: { score: number }) {
  const circumference = 440;
  const dash = (score / 100) * circumference;

  return (
    <div className="relative h-40 w-40">
      <svg className="h-full w-full text-slate-200 dark:text-slate-700" viewBox="0 0 160 160">
        <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="15" fill="none" />
        <circle
          cx="80"
          cy="80"
          r="70"
          stroke="#f97316"
          strokeWidth="15"
          fill="none"
          strokeDasharray={`${dash} ${circumference}`}
          strokeLinecap="round"
          transform="rotate(-90 80 80)"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-[#0b1a3a] dark:text-slate-100">
        {score}
      </div>
    </div>
  );
}
