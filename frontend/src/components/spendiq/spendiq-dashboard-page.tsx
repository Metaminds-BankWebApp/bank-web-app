"use client";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import type { ChartOptions, Plugin } from "chart.js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { getSpendIqBudgets, getSpendIqExpenses, getSpendIqIncomes } from "@/src/api/spendiq/spendiq.service";
import { toApiError } from "@/src/api/client";
import ModuleHeader from "@/src/components/ui/module-header";
import { useToast } from "@/src/components/ui/toast";
import type { SpendIqExpenseResponse, SpendIqMonthlySummaryResponse } from "@/src/types/dto/spendiq.dto";

ChartJS.register(ArcElement, Tooltip, Legend);

type SpendIqDashboardPageProps = {
  spendIqRoot: string;
};

export function SpendIqDashboardPage({ spendIqRoot }: SpendIqDashboardPageProps) {
  const { showToast } = useToast();
  const router = useRouter();
  const chartRef = useRef<ChartJS<"doughnut"> | null>(null);
  const [categoryExpenses, setCategoryExpenses] = useState<Array<{ name: string; value: number }>>([]);
  const [budgetUsageRows, setBudgetUsageRows] = useState<Array<{ name: string; used: number; total: number }>>([]);
  const [recentExpenses, setRecentExpenses] = useState<SpendIqExpenseResponse[]>([]);
  const [summary, setSummary] = useState<SpendIqMonthlySummaryResponse>({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    totalIncome: 0,
    totalExpense: 0,
    totalBudget: 0,
    netSavings: 0,
    remainingBudget: 0,
    budgetUsagePercentage: 0,
  });

  const loadExpenseByCategory = useCallback(async () => {
    try {
      const [expenses, budgets, incomes] = await Promise.all([
        getSpendIqExpenses(),
        getSpendIqBudgets(),
        getSpendIqIncomes(),
      ]);

      const byCategory = new Map<string, number>();
      for (const expense of expenses) {
        byCategory.set(expense.categoryName, (byCategory.get(expense.categoryName) ?? 0) + Number(expense.amount));
      }

      const budgetByCategory = new Map<string, number>();
      for (const budget of budgets) {
        budgetByCategory.set(budget.categoryName, (budgetByCategory.get(budget.categoryName) ?? 0) + Number(budget.budgetAmount));
      }

      const rows = Array.from(byCategory.entries())
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value);

      const usageRows = Array.from(new Set([...byCategory.keys(), ...budgetByCategory.keys()]))
        .map((name) => ({
          name,
          used: byCategory.get(name) ?? 0,
          total: budgetByCategory.get(name) ?? 0,
        }))
        .filter((row) => row.used > 0 || row.total > 0)
        .sort((a, b) => b.used - a.used)
        .slice(0, 5);

      setCategoryExpenses(rows);
      setBudgetUsageRows(usageRows);
      setRecentExpenses(expenses.slice(0, 5));

      const totalExpense = expenses.reduce((sum, expense) => sum + Number(expense.amount ?? 0), 0);
      const totalIncome = incomes.reduce((sum, income) => sum + Number(income.amount ?? 0), 0);
      const totalBudget = budgets.reduce((sum, budget) => sum + Number(budget.budgetAmount ?? 0), 0);
      const netSavings = totalIncome - totalExpense;
      const remainingBudget = totalBudget - totalExpense;

      setSummary({
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        totalIncome,
        totalExpense,
        totalBudget,
        netSavings,
        remainingBudget,
        budgetUsagePercentage: totalBudget > 0 ? (totalExpense / totalBudget) * 100 : 0,
      });
    } catch (error) {
      const apiError = toApiError(error);
      showToast({ type: "error", title: "Failed to load dashboard data", description: apiError.message });
    }
  }, [showToast]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadExpenseByCategory();
  }, [loadExpenseByCategory]);

  const total = useMemo(
    () => categoryExpenses.reduce((acc, item) => acc + item.value, 0),
    [categoryExpenses],
  );

  const openCategoryTransactions = useCallback((categoryName: string) => {
    const query = new URLSearchParams({
      category: categoryName,
    });
    router.push(`${spendIqRoot}/category/transactions?${query.toString()}`);
  }, [router, spendIqRoot]);

  const data = useMemo(() => {
    const colors = ["#0a234c", "#163d7a", "#1f4f9c", "#2962c9", "#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe"];
    return {
      labels: categoryExpenses.map((item) => item.name),
      datasets: [
        {
          data: categoryExpenses.map((item) => item.value),
          backgroundColor: categoryExpenses.map((_, index) => colors[index % colors.length]),
          borderWidth: 0,
          hoverOffset: 8,
        },
      ],
    };
  }, [categoryExpenses]);

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    cutout: "70%",
    onHover: (event, elements) => {
      const target = event.native?.target;
      if (target instanceof HTMLElement) {
        target.style.cursor = elements.length > 0 ? "pointer" : "default";
      }
    },
    onClick: (event) => {
      const chart = chartRef.current;
      if (!chart || !event.native) return;

      const elements = chart.getElementsAtEventForMode(event.native, "nearest", { intersect: true }, true);
      const firstElement = elements[0];
      if (!firstElement) return;

      const category = categoryExpenses[firstElement.index]?.name;
      if (category) {
        openCategoryTransactions(category);
      }
    },
    animation: {
      duration: 1200,
      easing: "easeOutCubic" as const,
    },
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          padding: 20,
          boxWidth: 14,
        },
      },
    },
  } satisfies ChartOptions<"doughnut">;

  const formatCurrency = (amount: number) =>
    `LKR ${amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const formatDate = (value: string) =>
    new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(`${value}T00:00:00`));

  const hasNegativeSavings = summary.netSavings < 0;
  const chartCenterLabel = useMemo<Plugin<"doughnut">>(() => ({
    id: "spendiqCenterLabel",
    afterDraw(chart) {
      const { ctx, chartArea } = chart;
      const totalText = formatCurrency(total);
      const isDark = document.documentElement.classList.contains("dark");
      const centerX = (chartArea.left + chartArea.right) / 2;
      const centerY = (chartArea.top + chartArea.bottom) / 2;
      const maxTextWidth = (chartArea.right - chartArea.left) * 0.45;
      const fontFamily = "Inter, ui-sans-serif, system-ui, sans-serif";
      let valueFontSize = 18;

      ctx.save();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = isDark ? "#94a3b8" : "#4b5563";
      ctx.font = `12px ${fontFamily}`;
      ctx.fillText("Total", centerX, centerY - 11);

      ctx.font = `700 ${valueFontSize}px ${fontFamily}`;
      while (ctx.measureText(totalText).width > maxTextWidth && valueFontSize > 11) {
        valueFontSize -= 1;
        ctx.font = `700 ${valueFontSize}px ${fontFamily}`;
      }
      ctx.fillStyle = isDark ? "#bae6fd" : "#0a234c";
      ctx.fillText(totalText, centerX, centerY + 12);
      ctx.restore();
    },
  }), [total]);

  return (
    <div className="p-6 space-y-8 bg-gradient-to-br from-[#f0f4ff] to-[#e6ecf9] dark:from-slate-950 dark:to-slate-900 min-h-screen">
      <ModuleHeader theme="spendiq" menuMode="feature-layout" title="SpendIQ - Expense Overview" />

      <div className="grid md:grid-cols-4 gap-6">
        <GlassCard title="Total Expenses" value={formatCurrency(summary.totalExpense)} subtitle="All time" href={`${spendIqRoot}/history`} actionLabel="View expenses" />
        <GlassCard title="Budget Total" value={formatCurrency(summary.totalBudget)} subtitle="All saved budgets" href={`${spendIqRoot}/budget`} actionLabel="Edit budget" />
        <GlassCard title="Remaining Budget" value={formatCurrency(summary.remainingBudget)} subtitle={summary.remainingBudget >= 0 ? "Across saved budgets" : "Over saved budgets"} href={`${spendIqRoot}/budget`} actionLabel="Review budget" />
        <GlassCard
          title="Savings Estimate"
          value={formatCurrency(summary.netSavings)}
          subtitle={hasNegativeSavings ? "Expenses are higher than income" : "Income minus expenses"}
          href={`${spendIqRoot}/summary`}
          actionLabel="View summary"
          variant={hasNegativeSavings ? "danger" : "default"}
          notice={hasNegativeSavings ? "Negative savings this month" : undefined}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="relative backdrop-blur-xl bg-white/50 dark:bg-slate-900/80 border border-white/40 dark:border-slate-700 shadow-2xl rounded-2xl p-6 transition hover:shadow-3xl">
          <h2 className="text-sm font-semibold mb-4 text-gray-700 dark:text-slate-200">Expense by Category</h2>

          <div className="relative h-80 flex items-center justify-center">
            {categoryExpenses.length > 0 ? (
              <Doughnut ref={chartRef} data={data} options={options} plugins={[chartCenterLabel]} />
            ) : (
              <p className="text-sm text-slate-500 dark:text-slate-400">No expense data found.</p>
            )}
          </div>
        </div>

        <div className="backdrop-blur-xl bg-white/50 dark:bg-slate-900/80 border border-white/40 dark:border-slate-700 shadow-2xl rounded-2xl p-6 transition hover:shadow-3xl">
          <h2 className="text-sm font-semibold mb-6 text-gray-700 dark:text-slate-200">Budget Usage by Category</h2>

          {budgetUsageRows.length === 0 ? (
            <p className="text-sm text-slate-500 dark:text-slate-400">No budget usage data for this month.</p>
          ) : (
            <div className="space-y-6">
              {budgetUsageRows.map((cat) => {
                const percent = cat.total > 0 ? (cat.used / cat.total) * 100 : 0;
                const progress = Math.max(0, Math.min(percent, 100));
                const barColor = cat.total <= 0 ? "bg-slate-500" : percent > 100 ? "bg-red-500" : "bg-[#0a234c]";

                return (
                  <button
                    key={cat.name}
                    type="button"
                    onClick={() => openCategoryTransactions(cat.name)}
                    className="block w-full rounded-xl p-2 text-left transition hover:bg-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a234c] dark:hover:bg-slate-800/70 dark:focus-visible:ring-sky-400"
                    aria-label={`View ${cat.name} transactions`}
                  >
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-gray-800 dark:text-slate-100">{cat.name}</span>
                      <span className="text-gray-600 dark:text-slate-400">{formatCurrency(cat.used)} / {formatCurrency(cat.total)}</span>
                    </div>

                    <div className="h-3 bg-white/60 dark:bg-slate-800/80 rounded-full overflow-hidden">
                      <div className={`h-3 rounded-full transition-all duration-1000 ease-out ${barColor}`} style={{ width: `${progress}%` }} />
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="backdrop-blur-xl bg-white/50 dark:bg-slate-900/80 border border-white/40 dark:border-slate-700 shadow-2xl rounded-2xl p-6">
        <h2 className="text-sm font-semibold mb-6 text-gray-700 dark:text-slate-200">Recent Expenses</h2>

        {recentExpenses.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">No recent expenses found.</p>
        ) : (
          <div className="space-y-4">
            {recentExpenses.map((exp) => (
              <div key={exp.expenseId} className="flex justify-between items-center bg-white/60 dark:bg-slate-800/80 p-4 rounded-xl transition hover:bg-white/80 dark:hover:bg-slate-800">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-gray-800 dark:text-slate-100">{exp.categoryName}</span>
                    <span className="text-xs bg-[#0a234c]/10 dark:bg-sky-400/10 text-[#0a234c] dark:text-sky-200 px-2 py-1 rounded-full">{exp.paymentType}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-slate-400">Recorded expense</p>
                  <p className="text-xs text-gray-500 dark:text-slate-400">{formatDate(exp.expenseDate)}</p>
                </div>

                <div className="font-semibold text-[#0a234c] dark:text-sky-200">{formatCurrency(Number(exp.amount))}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function GlassCard({
  title,
  value,
  subtitle,
  href,
  actionLabel,
  variant = "default",
  notice,
}: {
  title: string;
  value: string;
  subtitle: string;
  href: string;
  actionLabel: string;
  variant?: "default" | "danger";
  notice?: string;
}) {
  const isDanger = variant === "danger";

  return (
    <Link
      href={href}
      aria-label={`${actionLabel}: ${title}`}
      className={`group block backdrop-blur-xl bg-white/50 dark:bg-slate-900/80 border shadow-2xl rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 ${
        isDanger ? "border-red-200 focus-visible:ring-red-500" : "border-white/40 dark:border-slate-700 focus-visible:ring-[#0a234c] dark:focus-visible:ring-sky-400"
      }`}
    >
      <p className="text-sm text-gray-600 dark:text-slate-400">{title}</p>
      <h2 className={`text-xl font-bold mt-2 ${isDanger ? "text-red-600" : "text-[#0a234c] dark:text-sky-200"}`}>{value}</h2>
      {notice ? <p className="mt-2 rounded-md bg-red-50 dark:bg-red-950/50 px-2 py-1 text-xs font-semibold text-red-700 dark:text-red-200">{notice}</p> : null}
      <div className="mt-1 flex items-center justify-between gap-3">
        <p className="text-xs text-gray-500 dark:text-slate-400">{subtitle}</p>
        <span className={`text-xs font-semibold transition group-hover:translate-x-1 ${isDanger ? "text-red-700" : "text-[#0a234c] dark:text-sky-200"}`}>{actionLabel}</span>
      </div>
    </Link>
  );
}
