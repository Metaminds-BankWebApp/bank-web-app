"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Banknote, CreditCard, Edit2, Landmark, Trash2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Dialog } from "@/src/components/ui/dialog";
import ModuleHeader from "@/src/components/ui/module-header";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { useToast } from "@/src/components/ui/toast";
import {
  createSpendIqCategory,
  createSpendIqExpense,
  createSpendIqIncome,
  deleteSpendIqExpense,
  deleteSpendIqIncome,
  getSpendIqCategories,
  getSpendIqExpenses,
  getSpendIqIncomes,
  updateSpendIqExpense,
  updateSpendIqIncome,
} from "@/src/api/spendiq/spendiq.service";
import type {
  SpendIqCategoryType,
  SpendIqExpenseResponse,
  SpendIqIncomeResponse,
  SpendIqPaymentMethod,
} from "@/src/types/dto/spendiq.dto";
import { toApiError } from "@/src/api/client";

type EntryType = "expense" | "income";

type TimelineRow = {
  id: string;
  recordId: number;
  createdAt: string;
  date: string;
  kind: EntryType;
  label: string;
  amount: number;
  paymentType?: string;
};

const paymentMethodOptions: Array<{ value: SpendIqPaymentMethod; label: string }> = [
  { value: "CASH", label: "Cash" },
  { value: "BANK_TRANSFER", label: "Bank Transfer" },
  { value: "CARD", label: "Card" },
];

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function paymentLabel(value?: string): string {
  if (!value) return "-";
  if (value === "BANK_TRANSFER") return "Bank Transfer";
  if (value === "CARD") return "Card";
  if (value === "CASH") return "Cash";
  return value;
}

function hasTwoDecimalPlacesOrLess(raw: string): boolean {
  return /^\d+(\.\d{1,2})?$/.test(raw);
}

export function SpendIqAddPage() {
  const { showToast } = useToast();

  const [entryType, setEntryType] = useState<EntryType>("expense");

  const [amountInput, setAmountInput] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [expenseDate, setExpenseDate] = useState(() => new Date().toISOString().slice(0, 10));

  const [incomeSourceName, setIncomeSourceName] = useState("");
  const [incomeDate, setIncomeDate] = useState(() => new Date().toISOString().slice(0, 10));

  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryType, setNewCategoryType] = useState<SpendIqCategoryType>("VARIABLE");

  const [categories, setCategories] = useState<Array<{ categoryId: number; categoryName: string }>>([]);
  const [expenses, setExpenses] = useState<SpendIqExpenseResponse[]>([]);
  const [incomes, setIncomes] = useState<SpendIqIncomeResponse[]>([]);

  const [isSubmittingEntry, setIsSubmittingEntry] = useState(false);
  const [isSubmittingCategory, setIsSubmittingCategory] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [editTarget, setEditTarget] = useState<TimelineRow | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<TimelineRow | null>(null);
  const [isSavingEdit, setIsSavingEdit] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [editAmount, setEditAmount] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editCategoryId, setEditCategoryId] = useState("");
  const [editPaymentMethod, setEditPaymentMethod] = useState("");
  const [editSourceName, setEditSourceName] = useState("");

  const timelineRows = useMemo(() => {
    const expenseRows: TimelineRow[] = expenses.map((expense) => ({
      id: `expense-${expense.expenseId}`,
      recordId: expense.expenseId,
      createdAt: expense.createdAt,
      date: expense.expenseDate,
      kind: "expense",
      label: expense.categoryName,
      amount: Number(expense.amount),
      paymentType: expense.paymentType,
    }));

    const incomeRows: TimelineRow[] = incomes.map((income) => ({
      id: `income-${income.incomeId}`,
      recordId: income.incomeId,
      createdAt: income.createdAt,
      date: income.incomeDate,
      kind: "income",
      label: income.sourceName,
      amount: Number(income.amount),
    }));

    return [...expenseRows, ...incomeRows].sort((a, b) => {
      const createdDiff = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (createdDiff !== 0) return createdDiff;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [expenses, incomes]);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [categoryData, expenseData, incomeData] = await Promise.all([
        getSpendIqCategories(),
        getSpendIqExpenses(),
        getSpendIqIncomes(),
      ]);

      setCategories(categoryData.map((item) => ({ categoryId: item.categoryId, categoryName: item.categoryName })));
      setExpenses(expenseData);
      setIncomes(incomeData);
    } catch (error) {
      const apiError = toApiError(error);
      showToast({ type: "error", title: "Unable to load SpendIQ", description: apiError.message });
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  async function handleAddExpense() {
    if (!hasTwoDecimalPlacesOrLess(amountInput)) {
      showToast({ type: "error", title: "Invalid amount", description: "Amount can have up to 2 decimal places." });
      return;
    }

    const parsedAmount = Number(amountInput);
    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      showToast({ type: "error", title: "Invalid amount", description: "Enter a valid amount greater than 0." });
      return;
    }

    if (!selectedCategoryId) {
      showToast({ type: "error", title: "Category required", description: "Please select a category." });
      return;
    }

    if (!paymentMethod) {
      showToast({ type: "error", title: "Payment method required", description: "Select Cash, Bank Transfer, or Card." });
      return;
    }

    if (!expenseDate) {
      showToast({ type: "error", title: "Date required", description: "Select an expense date." });
      return;
    }

    setIsSubmittingEntry(true);
    try {
      const created = await createSpendIqExpense({
        categoryId: Number(selectedCategoryId),
        amount: parsedAmount,
        expenseDate,
        paymentType: paymentMethod as SpendIqPaymentMethod,
      });

      setExpenses((prev) => [created, ...prev]);
      setAmountInput("");

      showToast({ type: "success", title: "Expense added", description: "Expense saved successfully." });
    } catch (error) {
      const apiError = toApiError(error);
      showToast({ type: "error", title: "Failed to add expense", description: apiError.message });
    } finally {
      setIsSubmittingEntry(false);
    }
  }

  async function handleAddIncome() {
    if (!hasTwoDecimalPlacesOrLess(amountInput)) {
      showToast({ type: "error", title: "Invalid amount", description: "Amount can have up to 2 decimal places." });
      return;
    }

    const parsedAmount = Number(amountInput);
    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      showToast({ type: "error", title: "Invalid amount", description: "Enter a valid amount greater than 0." });
      return;
    }

    if (!incomeSourceName.trim()) {
      showToast({ type: "error", title: "Income source required", description: "Enter an income source name." });
      return;
    }

    if (!incomeDate) {
      showToast({ type: "error", title: "Date required", description: "Select an income date." });
      return;
    }

    setIsSubmittingEntry(true);
    try {
      const created = await createSpendIqIncome({
        sourceName: incomeSourceName.trim(),
        amount: parsedAmount,
        incomeDate,
      });

      setIncomes((prev) => [created, ...prev]);
      setAmountInput("");
      setIncomeSourceName("");

      showToast({ type: "success", title: "Income added", description: "Income saved successfully." });
    } catch (error) {
      const apiError = toApiError(error);
      showToast({ type: "error", title: "Failed to add income", description: apiError.message });
    } finally {
      setIsSubmittingEntry(false);
    }
  }

  async function handleAddCategory() {
    const name = newCategoryName.trim();
    if (!name) {
      showToast({ type: "error", title: "Category name required", description: "Enter a category name." });
      return;
    }

    setIsSubmittingCategory(true);
    try {
      const created = await createSpendIqCategory({ categoryName: name, categoryType: newCategoryType });
      setCategories((prev) => [{ categoryId: created.categoryId, categoryName: created.categoryName }, ...prev]);
      setSelectedCategoryId(String(created.categoryId));
      setNewCategoryName("");

      showToast({ type: "success", title: "Category added", description: "New category created successfully." });
    } catch (error) {
      const apiError = toApiError(error);
      showToast({ type: "error", title: "Failed to add category", description: apiError.message });
    } finally {
      setIsSubmittingCategory(false);
    }
  }

  function openEditDialog(row: TimelineRow) {
    setEditTarget(row);
    setEditAmount(String(row.amount));
    setEditDate(row.date);

    if (row.kind === "expense") {
      const matchingExpense = expenses.find((item) => item.expenseId === row.recordId);
      setEditCategoryId(matchingExpense ? String(matchingExpense.categoryId) : "");
      setEditPaymentMethod(matchingExpense?.paymentType ?? "");
      setEditSourceName("");
    } else {
      setEditCategoryId("");
      setEditPaymentMethod("");
      setEditSourceName(row.label);
    }
  }

  async function handleSaveEdit() {
    if (!editTarget) return;

    if (!hasTwoDecimalPlacesOrLess(editAmount)) {
      showToast({ type: "error", title: "Invalid amount", description: "Amount can have up to 2 decimal places." });
      return;
    }

    const parsedAmount = Number(editAmount);
    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      showToast({ type: "error", title: "Invalid amount", description: "Enter a valid amount greater than 0." });
      return;
    }

    if (!editDate) {
      showToast({ type: "error", title: "Date required", description: "Date is required." });
      return;
    }

    setIsSavingEdit(true);
    try {
      if (editTarget.kind === "expense") {
        if (!editCategoryId) {
          showToast({ type: "error", title: "Category required", description: "Please select a category." });
          return;
        }
        if (!editPaymentMethod) {
          showToast({ type: "error", title: "Payment method required", description: "Please select a payment method." });
          return;
        }

        const updated = await updateSpendIqExpense(editTarget.recordId, {
          categoryId: Number(editCategoryId),
          amount: parsedAmount,
          expenseDate: editDate,
          paymentType: editPaymentMethod as SpendIqPaymentMethod,
        });

        setExpenses((prev) => prev.map((item) => (item.expenseId === updated.expenseId ? updated : item)));
      } else {
        if (!editSourceName.trim()) {
          showToast({ type: "error", title: "Income source required", description: "Enter an income source." });
          return;
        }

        const updated = await updateSpendIqIncome(editTarget.recordId, {
          sourceName: editSourceName.trim(),
          amount: parsedAmount,
          incomeDate: editDate,
        });

        setIncomes((prev) => prev.map((item) => (item.incomeId === updated.incomeId ? updated : item)));
      }

      setEditTarget(null);
      showToast({ type: "success", title: "Record updated", description: "Changes saved successfully." });
    } catch (error) {
      const apiError = toApiError(error);
      showToast({ type: "error", title: "Update failed", description: apiError.message });
    } finally {
      setIsSavingEdit(false);
    }
  }

  async function handleDeleteRecord() {
    if (!deleteTarget) return;

    setIsDeleting(true);
    try {
      if (deleteTarget.kind === "expense") {
        await deleteSpendIqExpense(deleteTarget.recordId);
        setExpenses((prev) => prev.filter((item) => item.expenseId !== deleteTarget.recordId));
      } else {
        await deleteSpendIqIncome(deleteTarget.recordId);
        setIncomes((prev) => prev.filter((item) => item.incomeId !== deleteTarget.recordId));
      }

      setDeleteTarget(null);
      showToast({ type: "success", title: "Record deleted", description: "The record was removed." });
    } catch (error) {
      const apiError = toApiError(error);
      showToast({ type: "error", title: "Delete failed", description: apiError.message });
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <>
      <div className="flex flex-col gap-8 p-4 md:p-8 min-h-screen bg-white dark:bg-slate-950 font-sans text-slate-800 dark:text-slate-100">
        <ModuleHeader theme="spendiq" menuMode="feature-layout" title="Add Income / Expense" />

        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-6">Add record</h2>

          <div className="flex items-center gap-8 mb-6">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${entryType === "expense" ? "border-[#0b1a3a] dark:border-sky-400" : "border-slate-300"}`}>
                {entryType === "expense" && <div className="w-2.5 h-2.5 rounded-full bg-[#0b1a3a] dark:bg-sky-600" />}
              </div>
              <input type="radio" className="hidden" checked={entryType === "expense"} onChange={() => setEntryType("expense")} />
              <span className={`font-medium ${entryType === "expense" ? "text-slate-900 dark:text-slate-100" : "text-slate-500 dark:text-slate-400"}`}>Expense</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer group">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${entryType === "income" ? "border-[#0b1a3a] dark:border-sky-400" : "border-slate-300"}`}>
                {entryType === "income" && <div className="w-2.5 h-2.5 rounded-full bg-[#0b1a3a] dark:bg-sky-600" />}
              </div>
              <input type="radio" className="hidden" checked={entryType === "income"} onChange={() => setEntryType("income")} />
              <span className={`font-medium ${entryType === "income" ? "text-slate-900 dark:text-slate-100" : "text-slate-500 dark:text-slate-400"}`}>Income</span>
            </label>
          </div>

          <div className={`grid grid-cols-1 ${entryType === "expense" ? "md:grid-cols-4" : "md:grid-cols-3"} gap-4`}>
            <input
              type="text"
              inputMode="decimal"
              value={amountInput}
              onChange={(event) => setAmountInput(event.target.value)}
              placeholder="Amount"
              className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-[#0b1a3a] dark:focus:border-sky-400 focus:ring-1 focus:ring-[#0b1a3a] dark:focus:ring-sky-400 bg-slate-50/50 dark:bg-slate-800 dark:text-slate-100"
            />

            {entryType === "expense" ? (
              <>
                <Select value={selectedCategoryId} onValueChange={setSelectedCategoryId}>
                  <SelectTrigger className="w-full py-6 border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 dark:text-slate-100">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.categoryId} value={String(category.categoryId)}>
                        {category.categoryName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger className="w-full py-6 border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 dark:text-slate-100">
                    <SelectValue placeholder="Payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentMethodOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <input
                  type="date"
                  value={expenseDate}
                  onChange={(event) => setExpenseDate(event.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-[#0b1a3a] dark:focus:border-sky-400 focus:ring-1 focus:ring-[#0b1a3a] dark:focus:ring-sky-400 bg-slate-50/50 dark:bg-slate-800 dark:text-slate-100"
                />
              </>
            ) : (
              <>
                <input
                  type="text"
                  value={incomeSourceName}
                  onChange={(event) => setIncomeSourceName(event.target.value)}
                  placeholder="Income source"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-[#0b1a3a] dark:focus:border-sky-400 focus:ring-1 focus:ring-[#0b1a3a] dark:focus:ring-sky-400 bg-slate-50/50 dark:bg-slate-800 dark:text-slate-100"
                />

                <input
                  type="date"
                  value={incomeDate}
                  onChange={(event) => setIncomeDate(event.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-[#0b1a3a] dark:focus:border-sky-400 focus:ring-1 focus:ring-[#0b1a3a] dark:focus:ring-sky-400 bg-slate-50/50 dark:bg-slate-800 dark:text-slate-100"
                />
              </>
            )}
          </div>

          <div className="mt-5 flex justify-end">
            <Button
              onClick={entryType === "expense" ? handleAddExpense : handleAddIncome}
              loading={isSubmittingEntry}
              className="bg-[#0b1a3a] dark:bg-sky-600 hover:bg-[#162c57] text-white px-8 py-6 text-sm font-semibold rounded-lg min-w-[140px]"
            >
              Add now
            </Button>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-6">Add new category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              value={newCategoryName}
              onChange={(event) => setNewCategoryName(event.target.value)}
              placeholder="Category name"
              className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-[#0b1a3a] dark:focus:border-sky-400 bg-slate-50/50 dark:bg-slate-800 dark:text-slate-100"
            />

            <Select value={newCategoryType} onValueChange={(value) => setNewCategoryType(value as SpendIqCategoryType)}>
              <SelectTrigger className="w-full py-6 border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 dark:text-slate-100">
                <SelectValue placeholder="Category type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="VARIABLE">Variable</SelectItem>
                <SelectItem value="FIXED">Fixed</SelectItem>
              </SelectContent>
            </Select>

            <Button
              onClick={handleAddCategory}
              loading={isSubmittingCategory}
              className="bg-[#0b1a3a] dark:bg-sky-600 hover:bg-[#162c57] text-white px-8 py-6 text-sm font-semibold rounded-lg"
            >
              Add category
            </Button>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 shadow-sm overflow-hidden">
          <h2 className="text-sm text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mb-6">Recent Records</h2>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[960px]">
              <thead>
                <tr className="text-left border-b border-slate-100 dark:border-slate-800">
                  <th className="pb-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Date</th>
                  <th className="pb-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Type</th>
                  <th className="pb-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Category / Source</th>
                  <th className="pb-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest text-right">Amount</th>
                  <th className="pb-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest text-center">Payment Type</th>
                  <th className="pb-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {!isLoading && timelineRows.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-500 dark:text-slate-400">No records found.</td>
                  </tr>
                )}

                {timelineRows.map((row) => (
                  <tr key={row.id} className="border-b border-slate-50 dark:border-slate-800 last:border-0 hover:bg-slate-50/70 dark:hover:bg-slate-800/60 transition-colors">
                    <td className="py-4 font-semibold text-slate-700 dark:text-slate-200">{formatDate(row.date)}</td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${row.kind === "expense" ? "bg-red-50 text-red-600 border-red-200" : "bg-emerald-50 text-emerald-700 border-emerald-200"}`}>
                        {row.kind === "expense" ? "Expense" : "Income"}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-full text-xs font-bold border border-slate-200 dark:border-slate-700">
                        {row.label}
                      </span>
                    </td>
                    <td className={`py-4 text-right font-bold ${row.kind === "expense" ? "text-red-500" : "text-emerald-600"}`}>
                      {row.kind === "expense" ? "-" : "+"} {Number(row.amount).toLocaleString("en-US", { minimumFractionDigits: 2 })} LKR
                    </td>
                    <td className="py-4 text-center">
                      {row.kind === "expense" ? (
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold">
                          {row.paymentType === "CARD" && <CreditCard size={14} />}
                          {row.paymentType === "CASH" && <Banknote size={14} />}
                          {row.paymentType === "BANK_TRANSFER" && <Landmark size={14} />}
                          {paymentLabel(row.paymentType)}
                        </span>
                      ) : (
                        <span className="text-slate-400 dark:text-slate-500 text-xs font-semibold">-</span>
                      )}
                    </td>
                    <td className="py-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => openEditDialog(row)}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 dark:bg-slate-800"
                          aria-label="Edit record"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(row)}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
                          aria-label="Delete record"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Dialog
        open={editTarget !== null}
        onOpenChange={(open) => {
          if (!open) setEditTarget(null);
        }}
        title="Edit Record"
        description={editTarget?.kind === "expense" ? "Update expense details" : "Update income details"}
        footer={
          <>
            <Button type="button" variant="outline" onClick={() => setEditTarget(null)} disabled={isSavingEdit}>
              Cancel
            </Button>
            <Button type="button" onClick={handleSaveEdit} loading={isSavingEdit}>
              Save changes
            </Button>
          </>
        }
      >
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            inputMode="decimal"
            value={editAmount}
            onChange={(event) => setEditAmount(event.target.value)}
            placeholder="Amount"
            className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-[#0b1a3a] dark:focus:border-sky-400"
          />

          {editTarget?.kind === "expense" ? (
            <>
              <Select value={editCategoryId} onValueChange={setEditCategoryId}>
                <SelectTrigger className="w-full py-6 border-slate-200 dark:border-slate-700">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.categoryId} value={String(category.categoryId)}>
                      {category.categoryName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={editPaymentMethod} onValueChange={setEditPaymentMethod}>
                <SelectTrigger className="w-full py-6 border-slate-200 dark:border-slate-700">
                  <SelectValue placeholder="Payment method" />
                </SelectTrigger>
                <SelectContent>
                  {paymentMethodOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </>
          ) : (
            <input
              type="text"
              value={editSourceName}
              onChange={(event) => setEditSourceName(event.target.value)}
              placeholder="Income source"
              className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-[#0b1a3a] dark:focus:border-sky-400"
            />
          )}

          <input
            type="date"
            value={editDate}
            onChange={(event) => setEditDate(event.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-[#0b1a3a] dark:focus:border-sky-400"
          />
        </div>
      </Dialog>

      <Dialog
        open={deleteTarget !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
        title="Delete Record"
        description="This action cannot be undone. Are you sure you want to delete this record?"
        footer={
          <>
            <Button type="button" variant="outline" onClick={() => setDeleteTarget(null)} disabled={isDeleting}>
              Cancel
            </Button>
            <Button type="button" onClick={handleDeleteRecord} loading={isDeleting} className="bg-red-600 hover:bg-red-700">
              Delete
            </Button>
          </>
        }
      >
        <p className="text-sm text-slate-600 dark:text-slate-300">{deleteTarget ? `${deleteTarget.kind === "expense" ? "Expense" : "Income"}: ${deleteTarget.label}` : ""}</p>
      </Dialog>
    </>
  );
}
