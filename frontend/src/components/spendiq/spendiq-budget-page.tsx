"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AlertTriangle, Pencil } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Dialog } from "@/src/components/ui/dialog";
import ModuleHeader from "@/src/components/ui/module-header";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { useToast } from "@/src/components/ui/toast";
import {
  getSpendIqBudgets,
  getSpendIqCategories,
  getSpendIqExpenses,
  getSpendIqMonthlySummary,
  upsertSpendIqBudget,
} from "@/src/api/spendiq/spendiq.service";
import { toApiError } from "@/src/api/client";
import type { SpendIqBudgetResponse, SpendIqCategoryResponse, SpendIqExpenseResponse } from "@/src/types/dto/spendiq.dto";

type BudgetRow = {
  categoryId: number;
  categoryName: string;
  budgetAmount: number;
  spentAmount: number;
  remainingAmount: number;
  usagePercentage: number;
};

const BUDGET_NEAR_LIMIT_PERCENTAGE = 80;
const BUDGET_OVER_LIMIT_PERCENTAGE = 100;

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

function buildSplitAllocations(
  totalBudget: number,
  categories: SpendIqCategoryResponse[],
  categoryRatios: Record<number, number>,
): { allocations: Map<number, number>; allocatedTotal: number } {
  const ratioTotal = categories.reduce((acc, category) => acc + Number(categoryRatios[category.categoryId] ?? 0), 0);
  if (ratioTotal <= 0) {
    return { allocations: new Map(), allocatedTotal: 0 };
  }

  const totalCents = Math.round(totalBudget * 100);
  const provisional: Array<{ categoryId: number; cents: number; remainder: number }> = [];
  let usedCents = 0;
  for (const category of categories) {
    const ratio = Number(categoryRatios[category.categoryId] ?? 0);
    const weight = ratio / ratioTotal;
    const rawCents = weight * totalCents;
    const floorCents = Math.floor(rawCents);
    provisional.push({
      categoryId: category.categoryId,
      cents: floorCents,
      remainder: rawCents - floorCents,
    });
    usedCents += floorCents;
  }

  let remainderCents = totalCents - usedCents;
  provisional.sort((a, b) => b.remainder - a.remainder);
  for (const item of provisional) {
    if (remainderCents <= 0) break;
    item.cents += 1;
    remainderCents -= 1;
  }

  const allocations = new Map<number, number>();
  for (const item of provisional) {
    allocations.set(item.categoryId, round2(item.cents / 100));
  }

  const allocatedTotal = round2(Array.from(allocations.values()).reduce((acc, value) => acc + value, 0));
  return { allocations, allocatedTotal };
}

function rebalanceRatios(
  categories: SpendIqCategoryResponse[],
  currentRatios: Record<number, number>,
  changedCategoryId: number,
  nextChangedRatio: number,
): Record<number, number> {
  const normalizedTarget = Math.max(0, Math.min(100, nextChangedRatio));
  const otherCategories = categories.filter((category) => category.categoryId !== changedCategoryId);
  const result: Record<number, number> = { ...currentRatios, [changedCategoryId]: normalizedTarget };

  if (otherCategories.length === 0) {
    result[changedCategoryId] = 100;
    return result;
  }

  const remainingTarget = 100 - normalizedTarget;
  const currentOthersTotal = otherCategories.reduce(
    (acc, category) => acc + Number(currentRatios[category.categoryId] ?? 0),
    0,
  );

  if (remainingTarget <= 0) {
    for (const category of otherCategories) {
      result[category.categoryId] = 0;
    }
    return result;
  }

  if (currentOthersTotal <= 0) {
    const equalShare = remainingTarget / otherCategories.length;
    for (const category of otherCategories) {
      result[category.categoryId] = equalShare;
    }
    return result;
  }

  for (const category of otherCategories) {
    const currentRatio = Number(currentRatios[category.categoryId] ?? 0);
    const weight = currentRatio / currentOthersTotal;
    result[category.categoryId] = weight * remainingTarget;
  }

  return result;
}

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

export function SpendIqBudgetPage() {
  const { showToast } = useToast();
  const today = new Date();
  const lastBudgetWarningKeyRef = useRef("");
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());

  const [categories, setCategories] = useState<SpendIqCategoryResponse[]>([]);
  const [budgets, setBudgets] = useState<SpendIqBudgetResponse[]>([]);
  const [expenses, setExpenses] = useState<SpendIqExpenseResponse[]>([]);
  const [summary, setSummary] = useState({
    totalBudget: 0,
    totalExpense: 0,
    remainingBudget: 0,
    budgetUsagePercentage: 0,
  });

  const [budgetInputs, setBudgetInputs] = useState<Record<number, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [savingCategoryId, setSavingCategoryId] = useState<number | null>(null);
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);
  const [totalBudgetInput, setTotalBudgetInput] = useState("");
  const [isTotalBudgetDialogOpen, setIsTotalBudgetDialogOpen] = useState(false);
  const [categoryRatios, setCategoryRatios] = useState<Record<number, number>>({});
  const [isSplitting, setIsSplitting] = useState(false);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const { fromDate, toDate } = monthBounds(selectedYear, selectedMonth);
      const [categoryData, budgetData, monthlySummary, expenseData] = await Promise.all([
        getSpendIqCategories(),
        getSpendIqBudgets({ month: selectedMonth, year: selectedYear }),
        getSpendIqMonthlySummary(selectedMonth, selectedYear),
        getSpendIqExpenses({ fromDate, toDate }),
      ]);

      setCategories(categoryData);
      setBudgets(budgetData);
      setExpenses(expenseData);
      setSummary({
        totalBudget: Number(monthlySummary.totalBudget ?? 0),
        totalExpense: Number(monthlySummary.totalExpense ?? 0),
        remainingBudget: Number(monthlySummary.remainingBudget ?? 0),
        budgetUsagePercentage: Number(monthlySummary.budgetUsagePercentage ?? 0),
      });

      const nextInputs: Record<number, string> = {};
      const nextRatios: Record<number, number> = {};
      const totalAssignedBudget = budgetData.reduce((acc, item) => acc + Number(item.budgetAmount), 0);
      for (const category of categoryData) {
        const budget = budgetData.find((item) => item.categoryId === category.categoryId);
        nextInputs[category.categoryId] = budget ? Number(budget.budgetAmount).toFixed(2) : "";
        if (totalAssignedBudget > 0) {
          nextRatios[category.categoryId] = round2((Number(budget?.budgetAmount ?? 0) / totalAssignedBudget) * 100);
        }
      }
      if (totalAssignedBudget <= 0 && categoryData.length > 0) {
        const equalRatio = round2(100 / categoryData.length);
        for (const category of categoryData) {
          nextRatios[category.categoryId] = equalRatio;
        }
      }
      setBudgetInputs(nextInputs);
      setCategoryRatios(nextRatios);
      setTotalBudgetInput((prev) => prev || Number(monthlySummary.totalBudget ?? 0).toFixed(2));
    } catch (error) {
      const apiError = toApiError(error);
      showToast({ type: "error", title: "Failed to load budgets", description: apiError.message });
    } finally {
      setIsLoading(false);
    }
  }, [selectedMonth, selectedYear, showToast]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const rows = useMemo<BudgetRow[]>(() => {
    const spentByCategoryId = new Map<number, number>();
    for (const expense of expenses) {
      spentByCategoryId.set(
        expense.categoryId,
        round2((spentByCategoryId.get(expense.categoryId) ?? 0) + Number(expense.amount)),
      );
    }

    return categories
      .map((category) => {
        const budget = budgets.find((item) => item.categoryId === category.categoryId);
        const budgetAmount = Number(budget?.budgetAmount ?? 0);
        const spentAmount = Number(spentByCategoryId.get(category.categoryId) ?? 0);
        const remainingAmount = round2(budgetAmount - spentAmount);
        const usagePercentage = budgetAmount > 0 ? round2((spentAmount / budgetAmount) * 100) : 0;
        return {
          categoryId: category.categoryId,
          categoryName: category.categoryName,
          budgetAmount,
          spentAmount,
          remainingAmount,
          usagePercentage,
        };
      })
      .sort((a, b) => a.categoryName.localeCompare(b.categoryName));
  }, [budgets, categories, expenses]);

  const suggestions = useMemo(() => {
    const messages: string[] = [];
    const overBudget = rows.filter((row) => row.budgetAmount > 0 && row.usagePercentage > BUDGET_OVER_LIMIT_PERCENTAGE);
    const nearLimit = rows.filter((row) => row.budgetAmount > 0 && row.usagePercentage >= BUDGET_NEAR_LIMIT_PERCENTAGE && row.usagePercentage <= BUDGET_OVER_LIMIT_PERCENTAGE);
    const noBudgetButSpent = rows.filter((row) => row.budgetAmount === 0 && row.spentAmount > 0);

    if (summary.budgetUsagePercentage >= 90) {
      messages.push("Your overall budget usage is above 90%. Consider reducing non-essential spending this month.");
    } else if (summary.budgetUsagePercentage > 0 && summary.budgetUsagePercentage < 60) {
      messages.push("Your spending is well controlled. You can move some remaining budget to savings.");
    }

    if (overBudget.length > 0) {
      messages.push(
        `You are over budget in ${overBudget.map((item) => item.categoryName).join(", ")}. Increase limits or reduce spending in these areas.`,
      );
    } else if (nearLimit.length > 0) {
      messages.push(
        `Watch ${nearLimit.map((item) => item.categoryName).join(", ")}. These categories are close to their limits.`,
      );
    }

    if (noBudgetButSpent.length > 0) {
      messages.push(
        `Set a budget for ${noBudgetButSpent.map((item) => item.categoryName).join(", ")} to improve monthly control.`,
      );
    }

    if (messages.length === 0) {
      messages.push("Set category budgets to start receiving smart SpendIQ suggestions.");
    }

    return messages.slice(0, 3);
  }, [rows, summary.budgetUsagePercentage]);

  const budgetAlerts = useMemo(() => {
    const overBudget = rows.filter((row) => row.budgetAmount > 0 && row.usagePercentage > BUDGET_OVER_LIMIT_PERCENTAGE);
    const nearLimit = rows.filter((row) => row.budgetAmount > 0 && row.usagePercentage >= BUDGET_NEAR_LIMIT_PERCENTAGE && row.usagePercentage <= BUDGET_OVER_LIMIT_PERCENTAGE);

    return {
      overBudget,
      nearLimit,
      hasWarnings: overBudget.length > 0 || nearLimit.length > 0,
    };
  }, [rows]);

  useEffect(() => {
    if (isLoading || !budgetAlerts.hasWarnings) return;

    const warningKey = [
      selectedYear,
      selectedMonth,
      budgetAlerts.overBudget.map((row) => `${row.categoryId}:${row.usagePercentage}`).join("|"),
      budgetAlerts.nearLimit.map((row) => `${row.categoryId}:${row.usagePercentage}`).join("|"),
    ].join(":");

    if (lastBudgetWarningKeyRef.current === warningKey) return;
    lastBudgetWarningKeyRef.current = warningKey;

    if (budgetAlerts.overBudget.length > 0) {
      showToast({
        type: "error",
        title: "Budget limit exceeded",
        description: `${budgetAlerts.overBudget.map((row) => row.categoryName).join(", ")} ${budgetAlerts.overBudget.length === 1 ? "is" : "are"} over budget.`,
      });
      return;
    }

    showToast({
      type: "info",
      title: "Budget limit warning",
      description: `${budgetAlerts.nearLimit.map((row) => row.categoryName).join(", ")} ${budgetAlerts.nearLimit.length === 1 ? "is" : "are"} close to the budget limit.`,
    });
  }, [budgetAlerts, isLoading, selectedMonth, selectedYear, showToast]);

  const visibleBudgetRows = useMemo(
    () => rows.filter((row) => row.budgetAmount > 0 || row.spentAmount > 0),
    [rows],
  );

  const parsedTotalBudget = useMemo(() => {
    const parsed = Number(totalBudgetInput || "0");
    return Number.isFinite(parsed) ? parsed : 0;
  }, [totalBudgetInput]);

  const splitPreview = useMemo(
    () => buildSplitAllocations(parsedTotalBudget, categories, categoryRatios),
    [parsedTotalBudget, categories, categoryRatios],
  );

  async function handleSaveBudget(categoryId: number) {
    const rawInput = (budgetInputs[categoryId] ?? "").trim();
    if (!/^\d+(\.\d{1,2})?$/.test(rawInput)) {
      showToast({
        type: "error",
        title: "Invalid budget amount",
        description: "Amount must be a positive number with up to 2 decimal places.",
      });
      return;
    }

    const budgetAmount = Number(rawInput);
    if (!Number.isFinite(budgetAmount) || budgetAmount <= 0) {
      showToast({ type: "error", title: "Invalid budget amount", description: "Budget amount must be greater than 0." });
      return;
    }

    setSavingCategoryId(categoryId);
    try {
      await upsertSpendIqBudget({
        categoryId,
        budgetAmount,
        month: selectedMonth,
        year: selectedYear,
      });
      await loadData();
      setEditingCategoryId(null);
      showToast({ type: "success", title: "Budget saved", description: "Category budget limit saved successfully." });
    } catch (error) {
      const apiError = toApiError(error);
      showToast({ type: "error", title: "Failed to save budget", description: apiError.message });
    } finally {
      setSavingCategoryId(null);
    }
  }

  async function handleSplitAndSaveBudgets() {
    const rawInput = totalBudgetInput.trim();
    if (!/^\d+(\.\d{1,2})?$/.test(rawInput)) {
      showToast({
        type: "error",
        title: "Invalid total budget",
        description: "Total budget must be a positive number with up to 2 decimal places.",
      });
      return;
    }

    const totalBudget = Number(rawInput);
    if (!Number.isFinite(totalBudget) || totalBudget < 0) {
      showToast({ type: "error", title: "Invalid total budget", description: "Total budget cannot be negative." });
      return;
    }

    if (categories.length === 0) {
      showToast({ type: "error", title: "No categories", description: "Create at least one category before splitting budget." });
      return;
    }
    const { allocations, allocatedTotal } = buildSplitAllocations(totalBudget, categories, categoryRatios);
    if (allocatedTotal - totalBudget > 0.001) {
      showToast({
        type: "error",
        title: "Budget exceeds limit",
        description: "Split total cannot be greater than total budget.",
      });
      return;
    }

    setIsSplitting(true);
    try {
      await Promise.all(
        categories.map((category) =>
          upsertSpendIqBudget({
            categoryId: category.categoryId,
            budgetAmount: allocations.get(category.categoryId) ?? 0,
            month: selectedMonth,
            year: selectedYear,
          }),
        ),
      );

      const nextInputs: Record<number, string> = {};
      for (const category of categories) {
        nextInputs[category.categoryId] = (allocations.get(category.categoryId) ?? 0).toFixed(2);
      }
      setBudgetInputs(nextInputs);
      await loadData();
      setIsTotalBudgetDialogOpen(false);
      showToast({ type: "success", title: "Budgets split", description: "Total budget was split and saved to all categories." });
    } catch (error) {
      const apiError = toApiError(error);
      showToast({ type: "error", title: "Split failed", description: apiError.message });
    } finally {
      setIsSplitting(false);
    }
  }

  const currentMonthLabel = monthOptions.find((item) => item.value === selectedMonth)?.label ?? "Selected";

  return (
    <div className="p-8 bg-[#f4f6fb] dark:bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
      <ModuleHeader theme="spendiq" menuMode="feature-layout" title="Budget Management" />

      <p className="text-sm text-gray-500 dark:text-slate-400">Set budget limits by category and track your monthly usage.</p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-md space-y-3 border border-transparent dark:border-slate-800">
          <div className="flex items-start justify-between">
            <p className="text-sm text-gray-500 dark:text-slate-400">Total Budget</p>
            <button
              type="button"
              onClick={() => setIsTotalBudgetDialogOpen(true)}
              className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              aria-label="Edit total budget split"
            >
              <Pencil size={15} />
            </button>
          </div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">{formatMoney(summary.totalBudget)}</h2>
          <p className="text-xs text-gray-400 dark:text-slate-500">{`${currentMonthLabel} ${selectedYear}`}</p>
        </div>
        <SummaryCard title="Total Spent" value={formatMoney(summary.totalExpense)} subtitle="Current month spend" />
        <SummaryCard
          title="Remaining"
          value={formatMoney(summary.remainingBudget)}
          subtitle={summary.remainingBudget >= 0 ? "Within budget" : "Over budget"}
          highlight={summary.remainingBudget >= 0 ? "green" : "red"}
        />
        <SummaryCard
          title="Budget Usage"
          value={`${round2(summary.budgetUsagePercentage)}%`}
          subtitle="Overall budget usage"
          highlight={summary.budgetUsagePercentage > 90 ? "red" : undefined}
        />
      </div>

      {!isLoading && budgetAlerts.hasWarnings ? (
        <div
          className={`rounded-2xl border p-5 shadow-md ${
            budgetAlerts.overBudget.length > 0
              ? "border-red-200 bg-red-50 text-red-900 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-100"
              : "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-100"
          }`}
          role="alert"
        >
          <div className="flex gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
            <div className="space-y-3">
              <div>
                <h2 className="text-sm font-bold">
                  {budgetAlerts.overBudget.length > 0 ? "Budget limit exceeded" : "Budget limit warning"}
                </h2>
                <p className="mt-1 text-sm opacity-90">
                  {budgetAlerts.overBudget.length > 0
                    ? "Some categories are over their budget limit. Reduce spending or update the limit before adding more expenses."
                    : "Some categories are close to their budget limit. Keep an eye on spending before they go over budget."}
                </p>
              </div>

              <div className="grid gap-2 md:grid-cols-2">
                {budgetAlerts.overBudget.map((row) => (
                  <BudgetWarningRow key={`over-${row.categoryId}`} row={row} tone="danger" />
                ))}
                {budgetAlerts.nearLimit.map((row) => (
                  <BudgetWarningRow key={`near-${row.categoryId}`} row={row} tone="warning" />
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-md p-6 space-y-5 border border-transparent dark:border-slate-800">
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

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-md p-6 space-y-4 border border-transparent dark:border-slate-800">
        <h2 className="text-sm font-semibold text-gray-700 dark:text-slate-200">Budget Suggestions</h2>
        <ul className="space-y-2">
          {suggestions.map((item) => (
            <li key={item} className="text-sm text-slate-600 dark:text-slate-300">
              • {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-md p-6 border border-transparent dark:border-slate-800">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-semibold text-gray-700 dark:text-slate-200">Category Budgets</h2>
          <p className="text-xs text-gray-400 dark:text-slate-400">{isLoading ? "Loading..." : `${visibleBudgetRows.length} categories`}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {!isLoading &&
            visibleBudgetRows.map((row) => {
              const status =
                row.budgetAmount <= 0 ? "No Budget" : row.usagePercentage > BUDGET_OVER_LIMIT_PERCENTAGE ? "Over Limit" : row.usagePercentage >= BUDGET_NEAR_LIMIT_PERCENTAGE ? "Near Limit" : "On Track";
              const progressWidth = Math.max(0, Math.min(row.usagePercentage, 100));
              const progressColor =
                row.budgetAmount <= 0
                  ? "bg-slate-400"
                  : row.usagePercentage > BUDGET_OVER_LIMIT_PERCENTAGE
                    ? "bg-red-500"
                    : row.usagePercentage >= BUDGET_NEAR_LIMIT_PERCENTAGE
                      ? "bg-amber-500"
                      : "bg-emerald-500";
              const statusClass =
                row.budgetAmount <= 0
                  ? "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200"
                  : row.usagePercentage > BUDGET_OVER_LIMIT_PERCENTAGE
                    ? "bg-red-100 text-red-700 dark:bg-red-950/70 dark:text-red-200"
                    : row.usagePercentage >= BUDGET_NEAR_LIMIT_PERCENTAGE
                      ? "bg-amber-100 text-amber-700 dark:bg-amber-950/70 dark:text-amber-200"
                      : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-200";

              return (
                <div
                  key={row.categoryId}
                  className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/40 p-5 space-y-4 shadow-sm"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-lg font-bold text-[#0b1a3a] dark:text-cyan-300 tracking-wide">
                      {row.categoryName}
                    </h3>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${statusClass}`}>
                      {status}
                    </span>
                  </div>

                  {row.budgetAmount > 0 && row.usagePercentage >= BUDGET_NEAR_LIMIT_PERCENTAGE ? (
                    <div className={`flex items-start gap-2 rounded-lg px-3 py-2 text-xs ${
                      row.usagePercentage > BUDGET_OVER_LIMIT_PERCENTAGE
                        ? "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-200"
                        : "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-200"
                    }`}>
                      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                      <span>
                        {row.usagePercentage > BUDGET_OVER_LIMIT_PERCENTAGE
                          ? `${row.categoryName} is over budget by ${formatMoney(Math.abs(row.remainingAmount))}.`
                          : `${row.categoryName} is close to the limit with ${formatMoney(row.remainingAmount)} remaining.`}
                      </span>
                    </div>
                  ) : null}

                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div>
                      <p className="text-slate-500 dark:text-slate-400">Budget</p>
                      <p className="font-semibold text-slate-800 dark:text-slate-100">{formatMoney(row.budgetAmount)}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 dark:text-slate-400">Spent</p>
                      <p className="font-semibold text-slate-800 dark:text-slate-100">{formatMoney(row.spentAmount)}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 dark:text-slate-400">Remaining</p>
                      <p className={`font-semibold ${row.remainingAmount < 0 ? "text-red-500" : "text-emerald-600"}`}>
                        {formatMoney(row.remainingAmount)}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span>Usage</span>
                      <span>{row.budgetAmount > 0 ? `${row.usagePercentage}%` : "No budget set"}</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                      <div className={`h-2 rounded-full transition-all duration-500 ${progressColor}`} style={{ width: `${progressWidth}%` }} />
                    </div>
                  </div>

                  {editingCategoryId === row.categoryId ? (
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Edit Category Limit (LKR)</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          inputMode="decimal"
                          value={budgetInputs[row.categoryId] ?? ""}
                          onChange={(event) =>
                            setBudgetInputs((prev) => ({
                              ...prev,
                              [row.categoryId]: event.target.value,
                            }))
                          }
                          placeholder="5000.00"
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100"
                        />
                        <Button
                          type="button"
                          size="sm"
                          className="bg-[#0b1a3a] hover:bg-[#162c57] text-white whitespace-nowrap"
                          onClick={() => handleSaveBudget(row.categoryId)}
                          loading={savingCategoryId === row.categoryId}
                        >
                          Save
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingCategoryId(null)}
                          className="border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-end">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingCategoryId(row.categoryId);
                          setBudgetInputs((prev) => ({
                            ...prev,
                            [row.categoryId]: row.budgetAmount > 0 ? row.budgetAmount.toFixed(2) : "",
                          }));
                        }}
                        className="border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                      >
                        Edit Budget
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
      <Dialog
        open={isTotalBudgetDialogOpen}
        onOpenChange={setIsTotalBudgetDialogOpen}
        title="Set Total Budget And Split By Ratio"
        description="Set monthly total budget and drag each category ratio. Split total will never exceed your total budget."
        footer={
          <>
            <Button type="button" variant="outline" onClick={() => setIsTotalBudgetDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleSplitAndSaveBudgets} loading={isSplitting}>
              Save Split Budget
            </Button>
          </>
        }
      >
        <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-500 dark:text-slate-400">Total Budget (LKR)</label>
            <input
              type="text"
              inputMode="decimal"
              value={totalBudgetInput}
              onChange={(event) => setTotalBudgetInput(event.target.value)}
              placeholder="30000.00"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm"
            />
          </div>

          <div className="rounded-lg border border-slate-200 dark:border-slate-700 p-3 bg-slate-50 dark:bg-slate-900">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Planned split total: <span className="font-semibold text-slate-700 dark:text-slate-200">{formatMoney(splitPreview.allocatedTotal)}</span>
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Total budget: <span className="font-semibold text-slate-700 dark:text-slate-200">{formatMoney(parsedTotalBudget)}</span>
            </p>
          </div>

          {categories.map((category) => {
            const ratio = round2(Number(categoryRatios[category.categoryId] ?? 0));
            const plannedAmount = splitPreview.allocations.get(category.categoryId) ?? 0;
            return (
              <div key={category.categoryId} className="space-y-1.5 border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-200">{category.categoryName}</span>
                  <span className="text-slate-500 dark:text-slate-400">
                    {ratio}% ({formatMoney(plannedAmount)})
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={categoryRatios[category.categoryId] ?? 0}
                  onChange={(event) => {
                    const nextRatio = Number(event.target.value);
                    setCategoryRatios((prev) => rebalanceRatios(categories, prev, category.categoryId, nextRatio));
                  }}
                  className="w-full accent-[#0b1a3a] cursor-pointer"
                />
              </div>
            );
          })}
        </div>
      </Dialog>
      </div>
    </div>
  );
}

function BudgetWarningRow({ row, tone }: { row: BudgetRow; tone: "danger" | "warning" }) {
  const isDanger = tone === "danger";

  return (
    <div className={`rounded-lg border px-3 py-2 text-sm ${
      isDanger
        ? "border-red-200 bg-white/70 dark:border-red-900/60 dark:bg-red-950/30"
        : "border-amber-200 bg-white/70 dark:border-amber-900/60 dark:bg-amber-950/30"
    }`}>
      <div className="flex items-center justify-between gap-3">
        <span className="font-semibold">{row.categoryName}</span>
        <span className="text-xs font-bold">{row.usagePercentage}% used</span>
      </div>
      <p className="mt-1 text-xs opacity-85">
        {isDanger
          ? `Over by ${formatMoney(Math.abs(row.remainingAmount))}`
          : `${formatMoney(row.remainingAmount)} remaining`}
      </p>
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
