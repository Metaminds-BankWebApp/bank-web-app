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

type ReportSuggestion = {
  title: string;
  detail: string;
};

type SpendPrediction = {
  nextMonthSpend: number;
  nextMonthSavings: number;
  label: string;
  detail: string;
};

type TrendRangeMonths = 3 | 6 | 12;

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const allPeriodsValue = 0;
const trendRangeOptions: Array<{ value: TrendRangeMonths; label: string }> = [
  { value: 3, label: "Last 3 months" },
  { value: 6, label: "Last 6 months" },
  { value: 12, label: "Last 12 months" },
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

function firstDayOfMonth(year: number, month: number) {
  return `${year}-${String(month).padStart(2, "0")}-01`;
}

function lastDayOfMonth(year: number, month: number) {
  return new Date(Date.UTC(year, month, 0)).toISOString().slice(0, 10);
}

function monthKey(value: string) {
  return value.slice(0, 7);
}

function monthLabelFromKey(value: string) {
  const [year, month] = value.split("-").map(Number);
  return `${monthNames[(month || 1) - 1]} ${String(year).slice(2)}`;
}

function summarizeRecords(
  expenses: SpendIqExpenseResponse[],
  incomes: SpendIqIncomeResponse[],
  budgets: SpendIqBudgetResponse[],
  month: number,
  year: number,
): SpendIqMonthlySummaryResponse {
  const totalExpense = expenses.reduce((sum, expense) => sum + Number(expense.amount ?? 0), 0);
  const totalIncome = incomes.reduce((sum, income) => sum + Number(income.amount ?? 0), 0);
  const totalBudget = budgets.reduce((sum, budget) => sum + Number(budget.budgetAmount ?? 0), 0);
  const netSavings = totalIncome - totalExpense;
  const remainingBudget = totalBudget - totalExpense;

  return {
    month,
    year,
    totalIncome,
    totalExpense,
    totalBudget,
    netSavings,
    remainingBudget,
    budgetUsagePercentage: totalBudget > 0 ? (totalExpense / totalBudget) * 100 : 0,
  };
}

function buildTrendRows(
  expenses: SpendIqExpenseResponse[],
  incomes: SpendIqIncomeResponse[],
  rangeMonths: TrendRangeMonths,
  endMonth: number,
  endYear: number,
) {
  const grouped = new Map<string, { income: number; spend: number }>();
  const rangeKeys = Array.from({ length: rangeMonths }, (_, index) => {
    const date = new Date(endYear, endMonth - 1 - (rangeMonths - 1 - index), 1);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
  });

  for (const key of rangeKeys) {
    grouped.set(key, { income: 0, spend: 0 });
  }

  for (const expense of expenses) {
    const key = monthKey(expense.expenseDate);
    if (!grouped.has(key)) continue;
    const row = grouped.get(key) ?? { income: 0, spend: 0 };
    row.spend += Number(expense.amount ?? 0);
    grouped.set(key, row);
  }

  for (const income of incomes) {
    const key = monthKey(income.incomeDate);
    if (!grouped.has(key)) continue;
    const row = grouped.get(key) ?? { income: 0, spend: 0 };
    row.income += Number(income.amount ?? 0);
    grouped.set(key, row);
  }

  return rangeKeys
    .map((key) => [key, grouped.get(key) ?? { income: 0, spend: 0 }] as const)
    .map(([key, row]) => ({
      month: monthLabelFromKey(key),
      income: row.income,
      spend: row.spend,
      savings: row.income - row.spend,
    }));
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

function escapePdfText(value: string | number) {
  return String(value)
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)")
    .replace(/[^\x20-\x7E]/g, "");
}

function wrapText(value: string, maxLength: number) {
  const words = value.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxLength && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }

  if (current) {
    lines.push(current);
  }

  return lines.length > 0 ? lines : [""];
}

function buildSpendIqPdfReport({
  selectedMonthLabel,
  summary,
  categoryRows,
  monthlyTrend,
  fixedExpenses,
  variableExpenses,
  spendIqScore,
  scoreLabel,
  highValueCount,
  suggestions,
  prediction,
  incomes,
  expenses,
}: {
  selectedMonthLabel: string;
  summary: SpendIqMonthlySummaryResponse;
  categoryRows: CategoryReportRow[];
  monthlyTrend: MonthlyTrendRow[];
  fixedExpenses: number;
  variableExpenses: number;
  spendIqScore: number;
  scoreLabel: string;
  highValueCount: number;
  suggestions: ReportSuggestion[];
  prediction: SpendPrediction;
  incomes: SpendIqIncomeResponse[];
  expenses: SpendIqExpenseResponse[];
}) {
  const pageWidth = 595;
  const pageHeight = 842;
  const top = (value: number) => pageHeight - value;
  const money = (value: number) => formatCurrency(Number(value || 0));
  const maxTrend = Math.max(1, ...monthlyTrend.flatMap((row) => [row.income, row.spend]));
  const maxCategory = Math.max(1, ...categoryRows.map((row) => row.amount));

  function text(value: string | number, x: number, y: number, size = 10, color = "0.12 0.16 0.25", font = "F1") {
    return `BT /${font} ${size} Tf ${color} rg ${x} ${top(y)} Td (${escapePdfText(value)}) Tj ET`;
  }

  function rect(x: number, y: number, width: number, height: number, color: string, stroke = false) {
    return `${color} ${stroke ? "RG" : "rg"} ${x} ${top(y + height)} ${width} ${height} re ${stroke ? "S" : "f"}`;
  }

  function line(x1: number, y1: number, x2: number, y2: number, color = "0.46 0.54 0.65", width = 1) {
    return `${color} RG ${width} w ${x1} ${top(y1)} m ${x2} ${top(y2)} l S`;
  }

  function metricCard(title: string, value: string, x: number, y: number, width: number) {
    return [
      rect(x, y, width, 58, "0.96 0.98 1.00"),
      rect(x, y, width, 58, "0.82 0.87 0.94", true),
      text(title, x + 12, y + 20, 8, "0.39 0.45 0.55", "F2"),
      text(value, x + 12, y + 42, 11, "0.04 0.10 0.23", "F2"),
    ].join("\n");
  }

  const pageOne: string[] = [
    rect(0, 0, pageWidth, 92, "0.04 0.10 0.23"),
    text("PrimeCore Digital Banking", 36, 28, 11, "1 1 1", "F2"),
    text("SpendIQ Analytics Report", 36, 56, 22, "1 1 1", "F2"),
    text(`${selectedMonthLabel} | Generated ${new Date().toLocaleDateString()}`, 36, 78, 10, "0.78 0.86 0.96"),
    rect(400, 24, 150, 42, "0.17 0.46 0.78"),
    text(`Score ${spendIqScore}/100`, 420, 50, 16, "1 1 1", "F2"),
    text(scoreLabel, 420, 66, 9, "0.87 0.95 1.00"),
    rect(420, 72, 106, 5, "0.70 0.84 0.96"),
    rect(420, 72, Math.max(4, (spendIqScore / 100) * 106), 5, "1.00 1.00 1.00"),
    metricCard("TOTAL SPEND", money(Number(summary.totalExpense)), 36, 120, 122),
    metricCard("FIXED EXPENSES", money(fixedExpenses), 170, 120, 122),
    metricCard("VARIABLE SPEND", money(variableExpenses), 304, 120, 122),
    metricCard("NET SAVINGS", money(Number(summary.netSavings)), 438, 120, 122),
    text("Monthly Spend Trend", 36, 218, 14, "0.04 0.10 0.23", "F2"),
    rect(36, 236, 250, 170, "0.99 1.00 1.00"),
    rect(36, 236, 250, 170, "0.82 0.87 0.94", true),
    line(62, 378, 268, 378),
    line(62, 254, 62, 378),
    text("Income", 206, 228, 8, "0.09 0.64 0.29", "F2"),
    text("Spend", 246, 228, 8, "0.15 0.39 0.92", "F2"),
    text("Category Breakdown", 316, 218, 14, "0.04 0.10 0.23", "F2"),
    rect(316, 236, 243, 170, "0.99 1.00 1.00"),
    rect(316, 236, 243, 170, "0.82 0.87 0.94", true),
  ];

  const trendX = (index: number) => 62 + (monthlyTrend.length <= 1 ? 0 : (index / (monthlyTrend.length - 1)) * 206);
  const trendY = (value: number) => 378 - (Number(value || 0) / maxTrend) * 112;
  monthlyTrend.forEach((row, index) => {
    const x = trendX(index);
    pageOne.push(text(row.month, x - 12, 394, 7, "0.39 0.45 0.55"));
    if (index > 0) {
      const prev = monthlyTrend[index - 1];
      pageOne.push(line(trendX(index - 1), trendY(prev.spend), x, trendY(row.spend), "0.15 0.39 0.92", 2));
      pageOne.push(line(trendX(index - 1), trendY(prev.income), x, trendY(row.income), "0.09 0.64 0.29", 1.5));
    }
  });

  categoryRows.slice(0, 5).forEach((row, index) => {
    const y = 262 + index * 26;
    const width = (row.amount / maxCategory) * 138;
    pageOne.push(text(row.name.slice(0, 18), 332, y, 8, "0.20 0.25 0.34", "F2"));
    pageOne.push(rect(428, y - 8, Math.max(4, width), 10, "0.15 0.39 0.92"));
    pageOne.push(text(money(row.amount), 432 + Math.max(4, width), y, 7, "0.39 0.45 0.55"));
  });

  pageOne.push(
    text("Behavior Signals", 36, 450, 14, "0.04 0.10 0.23", "F2"),
    rect(36, 468, 523, 96, "0.96 0.98 1.00"),
    rect(36, 468, 523, 96, "0.82 0.87 0.94", true),
    text(`Income Records: ${incomes.length}`, 56, 494, 10),
    text(`High Value Transactions: ${highValueCount}`, 300, 494, 10),
    text(`Category Diversity: ${categoryRows.length} categories`, 56, 522, 10),
    text(`Budget Utilization: ${Number(summary.budgetUsagePercentage).toFixed(2)}%`, 300, 522, 10),
    text("Prediction", 36, 608, 14, "0.04 0.10 0.23", "F2"),
    rect(36, 626, 523, 90, "0.93 0.98 1.00"),
    rect(36, 626, 523, 90, "0.74 0.86 0.96", true),
    text(prediction.label, 56, 654, 13, "0.04 0.10 0.23", "F2"),
    text(`Expected next month spend: ${money(prediction.nextMonthSpend)}`, 56, 678, 10),
    text(`Expected next month savings: ${money(prediction.nextMonthSavings)}`, 300, 678, 10),
    ...wrapText(prediction.detail, 92).map((lineText, index) => text(lineText, 56, 700 + index * 14, 9, "0.30 0.36 0.45")),
  );

  const pageTwo: string[] = [
    rect(0, 0, pageWidth, 70, "0.04 0.10 0.23"),
    text("SpendIQ Recommendations", 36, 44, 19, "1 1 1", "F2"),
    text(selectedMonthLabel, 430, 44, 11, "0.78 0.86 0.96", "F2"),
    text("Suggestions", 36, 104, 15, "0.04 0.10 0.23", "F2"),
  ];

  let y = 126;
  suggestions.forEach((suggestion, index) => {
    pageTwo.push(rect(36, y, 523, 62, "0.98 0.99 1.00"));
    pageTwo.push(rect(36, y, 523, 62, "0.84 0.89 0.95", true));
    pageTwo.push(text(`${index + 1}. ${suggestion.title}`, 54, y + 22, 11, "0.04 0.10 0.23", "F2"));
    wrapText(suggestion.detail, 92).slice(0, 2).forEach((lineText, lineIndex) => {
      pageTwo.push(text(lineText, 54, y + 42 + lineIndex * 13, 9, "0.30 0.36 0.45"));
    });
    y += 76;
  });

  y += 14;
  pageTwo.push(text("All Category Details", 36, y, 15, "0.04 0.10 0.23", "F2"));
  y += 20;
  pageTwo.push(rect(36, y, 523, 28, "0.91 0.95 0.99"));
  pageTwo.push(text("Category", 48, y + 18, 8, "0.20 0.25 0.34", "F2"));
  pageTwo.push(text("Type", 230, y + 18, 8, "0.20 0.25 0.34", "F2"));
  pageTwo.push(text("Records", 318, y + 18, 8, "0.20 0.25 0.34", "F2"));
  pageTwo.push(text("Total", 430, y + 18, 8, "0.20 0.25 0.34", "F2"));
  y += 32;

  categoryRows.slice(0, 14).forEach((row) => {
    pageTwo.push(line(36, y + 18, 559, y + 18, "0.88 0.91 0.95"));
    pageTwo.push(text(row.name.slice(0, 28), 48, y + 12, 8));
    pageTwo.push(text(row.type, 230, y + 12, 8));
    pageTwo.push(text(row.count, 330, y + 12, 8));
    pageTwo.push(text(money(row.amount), 430, y + 12, 8, "0.04 0.10 0.23", "F2"));
    y += 24;
  });

  if (categoryRows.length === 0) {
    pageTwo.push(text("No category records available for this period.", 48, y + 12, 9, "0.39 0.45 0.55"));
  }

  const pageThree: string[] = [
    rect(0, 0, pageWidth, 70, "0.04 0.10 0.23"),
    text("SpendIQ Transaction Detail", 36, 44, 19, "1 1 1", "F2"),
    text(selectedMonthLabel, 430, 44, 11, "0.78 0.86 0.96", "F2"),
    text("Top Expense Records", 36, 104, 15, "0.04 0.10 0.23", "F2"),
  ];

  y = 126;
  pageThree.push(rect(36, y, 523, 28, "0.91 0.95 0.99"));
  pageThree.push(text("Date", 48, y + 18, 8, "0.20 0.25 0.34", "F2"));
  pageThree.push(text("Category", 122, y + 18, 8, "0.20 0.25 0.34", "F2"));
  pageThree.push(text("Payment", 280, y + 18, 8, "0.20 0.25 0.34", "F2"));
  pageThree.push(text("Amount", 440, y + 18, 8, "0.20 0.25 0.34", "F2"));
  y += 32;

  expenses.slice(0, 20).forEach((expense) => {
    pageThree.push(line(36, y + 18, 559, y + 18, "0.88 0.91 0.95"));
    pageThree.push(text(expense.expenseDate, 48, y + 12, 8));
    pageThree.push(text(expense.categoryName.slice(0, 24), 122, y + 12, 8));
    pageThree.push(text(String(expense.paymentType).replace("_", " "), 280, y + 12, 8));
    pageThree.push(text(money(Number(expense.amount)), 440, y + 12, 8, "0.86 0.15 0.15", "F2"));
    y += 24;
  });

  if (expenses.length === 0) {
    pageThree.push(text("No expense records available for this period.", 48, y + 12, 9, "0.39 0.45 0.55"));
  }

  const pageStreams = [pageOne.join("\n"), pageTwo.join("\n"), pageThree.join("\n")];
  const objects: Array<{ number: number; content: string }> = [
    { number: 1, content: "<< /Type /Catalog /Pages 2 0 R >>" },
  ];
  const firstPageObject = 3;
  const fontRegularObject = firstPageObject + pageStreams.length * 2;
  const fontBoldObject = fontRegularObject + 1;
  const pageRefs = pageStreams.map((_, index) => `${firstPageObject + index * 2} 0 R`).join(" ");
  objects.push({ number: 2, content: `<< /Type /Pages /Kids [${pageRefs}] /Count ${pageStreams.length} >>` });

  pageStreams.forEach((stream, index) => {
    const pageObject = firstPageObject + index * 2;
    const contentObject = pageObject + 1;
    const streamLength = new TextEncoder().encode(stream).length;
    objects.push({
      number: pageObject,
      content: `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 ${fontRegularObject} 0 R /F2 ${fontBoldObject} 0 R >> >> /Contents ${contentObject} 0 R >>`,
    });
    objects.push({
      number: contentObject,
      content: `<< /Length ${streamLength} >>\nstream\n${stream}\nendstream`,
    });
  });

  objects.push({ number: fontRegularObject, content: "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>" });
  objects.push({ number: fontBoldObject, content: "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>" });

  let pdf = "%PDF-1.4\n";
  const offsets: number[] = [0];
  objects.forEach((object) => {
    offsets[object.number] = pdf.length;
    pdf += `${object.number} 0 obj\n${object.content}\nendobj\n`;
  });

  const xrefStart = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";
  for (let objectNumber = 1; objectNumber <= objects.length; objectNumber += 1) {
    pdf += `${String(offsets[objectNumber]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

  return pdf;
}

export function SpendIqReportPage({ title = "SpendIQ - Analytics Report" }: SpendIqReportPageProps) {
  const { showToast } = useToast();
  const today = useMemo(() => new Date(), []);
  const [selectedMonth, setSelectedMonth] = useState(allPeriodsValue);
  const [trendRangeMonths, setTrendRangeMonths] = useState<TrendRangeMonths>(3);
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
      const isAllPeriods = selectedMonth === allPeriodsValue;
      const dateRange = isAllPeriods
        ? undefined
        : { fromDate: firstDayOfMonth(selectedYear, selectedMonth), toDate: lastDayOfMonth(selectedYear, selectedMonth) };
      const trendEndMonth = isAllPeriods ? today.getMonth() + 1 : selectedMonth;
      const trendEndYear = isAllPeriods ? today.getFullYear() : selectedYear;
      const trendMonths = Array.from({ length: trendRangeMonths }, (_, index) => {
        const date = new Date(trendEndYear, trendEndMonth - 1 - (trendRangeMonths - 1 - index), 1);
        return { month: date.getMonth() + 1, year: date.getFullYear() };
      });

      const [categoryData, expenseData, incomeData, budgetData, summaryData, trendData] = await Promise.all([
        getSpendIqCategories(),
        getSpendIqExpenses(dateRange),
        getSpendIqIncomes(dateRange),
        isAllPeriods ? getSpendIqBudgets() : getSpendIqBudgets({ month: selectedMonth, year: selectedYear }),
        isAllPeriods ? Promise.resolve(null) : getSpendIqMonthlySummary(selectedMonth, selectedYear),
        Promise.all(trendMonths.map((item) => getSpendIqMonthlySummary(item.month, item.year))),
      ]);

      setCategories(categoryData);
      setExpenses(expenseData);
      setIncomes(incomeData);
      setBudgets(budgetData);
      setSummary(summaryData
        ? {
            month: summaryData.month,
            year: summaryData.year,
            totalIncome: Number(summaryData.totalIncome ?? 0),
            totalExpense: Number(summaryData.totalExpense ?? 0),
            totalBudget: Number(summaryData.totalBudget ?? 0),
            netSavings: Number(summaryData.netSavings ?? 0),
            remainingBudget: Number(summaryData.remainingBudget ?? 0),
            budgetUsagePercentage: Number(summaryData.budgetUsagePercentage ?? 0),
          }
        : summarizeRecords(expenseData, incomeData, budgetData, today.getMonth() + 1, today.getFullYear()));
      setMonthlyTrend(isAllPeriods
        ? buildTrendRows(expenseData, incomeData, trendRangeMonths, trendEndMonth, trendEndYear)
        : trendData.map((item) => ({
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
  }, [selectedMonth, selectedYear, showToast, today, trendRangeMonths]);

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
  const topCategory = categoryRows[0];
  const topCategoryShare = topCategory && summary.totalExpense > 0 ? topCategory.amount / Number(summary.totalExpense) : 0;
  const savingsRatio = summary.totalIncome > 0 ? Number(summary.netSavings) / Number(summary.totalIncome) : -0.25;
  const budgetPenalty = summary.totalBudget <= 0 ? 22 : budgetUsage > 100 ? Math.min(32, (budgetUsage - 100) * 0.45 + 18) : Math.max(0, (budgetUsage - 70) * 0.25);
  const savingsPenalty = savingsRatio < 0 ? Math.min(34, Math.abs(savingsRatio) * 70 + 16) : savingsRatio < 0.1 ? 10 : 0;
  const concentrationPenalty = topCategoryShare > 0.5 ? Math.min(16, (topCategoryShare - 0.5) * 45 + 6) : 0;
  const highValuePenalty = Math.min(12, highValueCount * 3);
  const spendIqScore = Math.max(0, Math.min(100, Math.round(82 - budgetPenalty - savingsPenalty - concentrationPenalty - highValuePenalty)));
  const scoreLabel = spendIqScore >= 75 ? "Strong" : spendIqScore >= 50 ? "Moderate" : "Needs attention";
  const selectedMonthLabel = selectedMonth === allPeriodsValue ? "All periods" : `${monthNames[selectedMonth - 1]} ${selectedYear}`;
  const reportStamp = selectedMonth === allPeriodsValue ? "all-periods" : `${selectedYear}-${String(selectedMonth).padStart(2, "0")}`;
  const trendAverageSpend = monthlyTrend.length > 0
    ? monthlyTrend.reduce((sum, row) => sum + Number(row.spend || 0), 0) / monthlyTrend.length
    : Number(summary.totalExpense || 0);
  const recentTrend = monthlyTrend.slice(-3);
  const recentAverageSpend = recentTrend.length > 0
    ? recentTrend.reduce((sum, row) => sum + Number(row.spend || 0), 0) / recentTrend.length
    : trendAverageSpend;
  const predictedSpend = Math.max(0, Math.round((recentAverageSpend * 0.7 + Number(summary.totalExpense || 0) * 0.3) * 100) / 100);
  const averageIncome = monthlyTrend.length > 0
    ? monthlyTrend.reduce((sum, row) => sum + Number(row.income || 0), 0) / monthlyTrend.length
    : Number(summary.totalIncome || 0);
  const predictedSavings = Math.round((averageIncome - predictedSpend) * 100) / 100;
  const prediction = useMemo<SpendPrediction>(() => ({
    nextMonthSpend: predictedSpend,
    nextMonthSavings: predictedSavings,
    label: predictedSavings >= 0 ? "Positive savings likely" : "Savings risk likely",
    detail: predictedSavings >= 0
      ? "Based on the recent trend, next month is likely to stay within a manageable spending range if category behavior remains similar."
      : "Recent spending is trending above income, so next month may produce negative savings unless high-spend categories are reduced.",
  }), [predictedSavings, predictedSpend]);
  const suggestions = useMemo<ReportSuggestion[]>(() => {
    const items: ReportSuggestion[] = [];

    if (budgetUsage > 100) {
      items.push({
        title: "Reduce overspending against budgets",
        detail: `Budget usage is ${budgetUsage.toFixed(2)}%, so review categories that crossed their limits before adding new discretionary spend.`,
      });
    } else if (budgetUsage >= 80) {
      items.push({
        title: "Slow spending before month end",
        detail: `Budget usage is already ${budgetUsage.toFixed(2)}%, so keep variable expenses controlled for the rest of the period.`,
      });
    } else if (Number(summary.totalBudget) <= 0) {
      items.push({
        title: "Create monthly category budgets",
        detail: "No active budget is available for this report period, so add limits for your main categories to unlock stronger SpendIQ guidance.",
      });
    }

    if (topCategory) {
      items.push({
        title: `Watch ${topCategory.name}`,
        detail: `${topCategory.name} is the largest spending category at ${formatCurrency(topCategory.amount)}, with ${topCategory.count} transaction${topCategory.count === 1 ? "" : "s"}.`,
      });
    }

    if (Number(summary.netSavings) < 0) {
      items.push({
        title: "Protect monthly savings",
        detail: "Expenses are higher than income for this period. Try setting a savings-first target before planning variable purchases.",
      });
    } else {
      items.push({
        title: "Keep savings momentum",
        detail: `Net savings are positive at ${formatCurrency(Number(summary.netSavings))}. Consider moving part of this surplus into a savings goal.`,
      });
    }

    if (highValueCount > 0) {
      items.push({
        title: "Review high value transactions",
        detail: `${highValueCount} transaction${highValueCount === 1 ? "" : "s"} stand out as high value. Confirm they are planned and not repeated unnecessarily.`,
      });
    }

    return items.slice(0, 4);
  }, [budgetUsage, highValueCount, summary.netSavings, summary.totalBudget, topCategory]);

  const handleDownloadReport = useCallback(() => {
    const pdf = buildSpendIqPdfReport({
      selectedMonthLabel,
      summary,
      categoryRows,
      monthlyTrend,
      fixedExpenses,
      variableExpenses,
      spendIqScore,
      scoreLabel,
      highValueCount,
      suggestions,
      prediction,
      incomes,
      expenses,
    });
    downloadBlob(`spendiq-report-${reportStamp}.pdf`, pdf, "application/pdf");
    showToast({ type: "success", title: "Report downloaded", description: `spendiq-report-${reportStamp}.pdf` });
  }, [
    categoryRows,
    expenses,
    fixedExpenses,
    highValueCount,
    incomes,
    monthlyTrend,
    prediction,
    reportStamp,
    scoreLabel,
    selectedMonthLabel,
    showToast,
    spendIqScore,
    suggestions,
    summary,
    variableExpenses,
  ]);

  const handleDownloadCsv = useCallback(() => {
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
          <h1 className="text-2xl font-bold text-[#0b1a3a] dark:text-slate-100">Spend Report</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{selectedMonthLabel}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <select
            value={selectedMonth}
            onChange={(event) => setSelectedMonth(Number(event.target.value))}
            className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          >
            <option value={allPeriodsValue}>All periods</option>
            {monthNames.map((month, index) => (
              <option key={month} value={index + 1}>{month}</option>
            ))}
          </select>
          <Button type="button" variant="outline" onClick={loadReport} loading={isLoading}>
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Button
            type="button"
            onClick={handleDownloadReport}
            disabled={isLoading}
            className="bg-[#0b1a3a] text-white shadow-sm hover:bg-[#102653] dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400"
          >
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
          <Button type="button" variant="outline" onClick={handleDownloadCsv} disabled={isLoading}>
            <Download className="h-4 w-4" />
            CSV
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
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-base font-semibold">Monthly Spend Trend</h2>
            <select
              value={trendRangeMonths}
              onChange={(event) => setTrendRangeMonths(Number(event.target.value) as TrendRangeMonths)}
              className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              aria-label="Monthly spend trend range"
            >
              {trendRangeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
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
              <div className="flex h-full items-center justify-center text-sm text-slate-500">No expenses found for this period.</div>
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

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-2">
          <h2 className="text-base font-semibold">Smart Suggestions</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {suggestions.map((suggestion) => (
              <div key={suggestion.title} className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                <h3 className="text-sm font-semibold text-[#0b1a3a] dark:text-slate-100">{suggestion.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{suggestion.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-sky-200 bg-sky-50 p-6 shadow-sm dark:border-sky-900/70 dark:bg-sky-950/30">
          <h2 className="text-base font-semibold text-[#0b1a3a] dark:text-sky-100">Next Month Prediction</h2>
          <p className="mt-3 text-sm font-semibold text-sky-700 dark:text-sky-200">{prediction.label}</p>
          <div className="mt-4 space-y-3">
            <BehaviorItem label="Expected Spend" value={formatCurrency(prediction.nextMonthSpend)} />
            <BehaviorItem label="Expected Savings" value={formatCurrency(prediction.nextMonthSavings)} />
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">{prediction.detail}</p>
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
