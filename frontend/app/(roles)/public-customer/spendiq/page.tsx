"use client";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { getSpendIqBudgets, getSpendIqExpenses } from "@/src/api/spendiq/spendiq.service";
import { toApiError } from "@/src/api/client";
import ModuleHeader from "@/src/components/ui/module-header";
import { useToast } from "@/src/components/ui/toast";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function SpendIQDashboard() {
  const { showToast } = useToast();
  const [categoryExpenses, setCategoryExpenses] = useState<Array<{ name: string; value: number }>>([]);
  const [budgetUsageRows, setBudgetUsageRows] = useState<Array<{ name: string; used: number; total: number }>>([]);

  const loadExpenseByCategory = useCallback(async () => {
    try {
      const now = new Date();
      const month = now.getMonth() + 1;
      const year = now.getFullYear();
      const fromDate = new Date(Date.UTC(now.getFullYear(), now.getMonth(), 1)).toISOString().slice(0, 10);
      const toDate = new Date(Date.UTC(now.getFullYear(), now.getMonth() + 1, 0)).toISOString().slice(0, 10);

      const [expenses, budgets] = await Promise.all([
        getSpendIqExpenses({ fromDate, toDate }),
        getSpendIqBudgets({ month, year }),
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
    responsive: true,
    cutout: "70%",
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
  };

  const recentExpenses = [
    {
      title: "Food & Dining",
      payment: "Card",
      description: "Lunch at downtown cafe",
      amount: 5000,
      date: "Feb 8, 2026",
    },
    {
      title: "Shopping",
      payment: "Online",
      description: "New running shoes",
      amount: 3000,
      date: "Feb 7, 2026",
    },
  ];

  return (
    <div className="p-6 space-y-8 bg-gradient-to-br from-[#f0f4ff] to-[#e6ecf9] min-h-screen">

      <ModuleHeader theme="spendiq" menuMode="feature-layout" title="SpendIQ - Expense Overview" />
      

      {/* -------- GLASS SUMMARY CARDS -------- */}
      <div className="grid md:grid-cols-4 gap-6">
        
        <GlassCard
          title="Total Expenses"
          value="LKR 25,600"
          subtitle="This month"
        />
        <GlassCard
          title="Monthly Budget"
          value="LKR 42,000"
          subtitle="Total allocated"
        />
        <GlassCard
          title="Remaining Budget"
          value="LKR 17,000"
          subtitle="Under budget"
        />
        <GlassCard
          title="Savings Estimate"
          value="LKR 20,000"
          subtitle="Potential savings"
        />
      </div>

      {/* -------- CHART + BUDGET -------- */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* GLASS CHART */}
        <div className="relative backdrop-blur-xl bg-white/50 border border-white/40 shadow-2xl rounded-2xl p-6 transition hover:shadow-3xl">
          <h2 className="text-sm font-semibold mb-4 text-gray-700">
            Expense by Category
          </h2>

          <div className="relative h-80 flex items-center justify-center">
            {categoryExpenses.length > 0 ? (
              <Doughnut data={data} options={options} />
            ) : (
              <p className="text-sm text-slate-500">No expense data for this month.</p>
            )}
            <div className="absolute text-center">
              <p className="text-xs text-gray-600">Total</p>
              <p className="text-lg font-bold text-[#0a234c]">
                {total.toLocaleString()} LKR
              </p>
              <br></br><br></br><br></br><br></br>
            </div>
            
          </div>
          
        </div>

        {/* GLASS BUDGET SECTION */}
        <div className="backdrop-blur-xl bg-white/50 border border-white/40 shadow-2xl rounded-2xl p-6 transition hover:shadow-3xl">
          <h2 className="text-sm font-semibold mb-6 text-gray-700">
            Budget Usage by Category
          </h2>

          {budgetUsageRows.length === 0 ? (
            <p className="text-sm text-slate-500">No budget usage data for this month.</p>
          ) : (
            <div className="space-y-6">
              {budgetUsageRows.map((cat) => {
                const percent = cat.total > 0 ? (cat.used / cat.total) * 100 : 0;
                const progress = Math.max(0, Math.min(percent, 100));
                const barColor = cat.total <= 0 ? "bg-slate-500" : percent > 100 ? "bg-red-500" : "bg-[#0a234c]";

                return (
                  <div key={cat.name}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-gray-800">
                        {cat.name}
                      </span>
                      <span className="text-gray-600">
                        {cat.used.toLocaleString(undefined, { maximumFractionDigits: 2 })} / {cat.total.toLocaleString(undefined, { maximumFractionDigits: 2 })} LKR
                      </span>
                    </div>

                    <div className="h-3 bg-white/60 rounded-full overflow-hidden">
                      <div
                        className={`h-3 rounded-full transition-all duration-1000 ease-out ${barColor}`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* -------- GLASS RECENT EXPENSES -------- */}
      <div className="backdrop-blur-xl bg-white/50 border border-white/40 shadow-2xl rounded-2xl p-6">
        <h2 className="text-sm font-semibold mb-6 text-gray-700">
          Recent Expenses
        </h2>

        <div className="space-y-4">
          {recentExpenses.map((exp, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center bg-white/60 p-4 rounded-xl transition hover:bg-white/80"
            >
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-medium text-gray-800">
                    {exp.title}
                  </span>
                  <span className="text-xs bg-[#0a234c]/10 text-[#0a234c] px-2 py-1 rounded-full">
                    {exp.payment}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {exp.description}
                </p>
                <p className="text-xs text-gray-500">
                  {exp.date}
                </p>
              </div>

              <div className="font-semibold text-[#0a234c]">
                {exp.amount.toLocaleString()} LKR
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* -------- Glass Card Component -------- */

function GlassCard({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: string;
  subtitle: string;
}) {
  return (
    <div className="backdrop-blur-xl bg-white/50 border border-white/40 shadow-2xl rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02]">
      <p className="text-sm text-gray-600">{title}</p>
      <h2 className="text-xl font-bold text-[#0a234c] mt-2">
        {value}
      </h2>
      <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
    </div>
  );
}
