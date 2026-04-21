"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui";
import { StepProps } from "./types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { FinancialDataErrors, validateFinancialDataStep } from "./validation";

export function FinancialData({ formData, updateFormData, onNext, onBack }: StepProps) {
  const errors: FinancialDataErrors = validateFinancialDataStep(formData);
  const incomeType = formData.incomeType || "Salary Worker";
  const salaryType = formData.salaryType || "Fixed";
  const employmentType = formData.employmentType || "Permanent";
  const contractDurationMonths = formData.contractDurationMonths || "";
  const incomeStability = formData.incomeStability || "Stable";

  const includesSalaryDetails = incomeType !== "Business Person";
  const includesBusinessDetails = incomeType !== "Salary Worker";

  const clearFieldError = (field: keyof FinancialDataErrors) => {
    if (errors[field]) {
      // Errors are derived from form state, so a field update naturally clears them on the next render.
    }
  };

  const incomeRows = [
    includesSalaryDetails && formData.monthlySalary.trim()
      ? {
          key: "salary",
          type: "Salary Worker",
          amount: Number(formData.monthlySalary),
          meta: `Salary: ${salaryType || "-"}`,
        }
      : null,
    includesBusinessDetails && formData.businessIncome.trim()
      ? {
          key: "business",
          type: "Business Person",
          amount: Number(formData.businessIncome),
          meta: `Stability: ${incomeStability || "-"}`,
        }
      : null,
  ].filter((row): row is { key: string; type: string; amount: number; meta: string } => Boolean(row));

  const totalIncome = incomeRows.reduce((sum, row) => sum + (Number.isFinite(row.amount) ? row.amount : 0), 0);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value || 0);

  const handleNext = () => {
    const validationErrors = validateFinancialDataStep(formData);
    if (Object.keys(validationErrors).length === 0) {
      onNext();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="px-8 py-6 border-b border-slate-100">
        <h2 className="text-xl font-bold text-[#0d3b66]">Income Details</h2>
        <p className="text-sm text-slate-500 mt-1">Use the same income capture model as public-customer application flow.</p>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 xl:grid-cols-[1.4fr_1fr] gap-8">
          <div className="space-y-8">
            <div>
              <Label className="text-slate-700 font-medium mb-3 block">Customer Income Type</Label>
              <Select
                value={incomeType}
                onValueChange={(value) => {
                  const nextState: Partial<typeof formData> = { incomeType: value };

                  if (value === "Business Person") {
                    nextState.monthlySalary = "";
                    nextState.salaryType = "Fixed";
                    nextState.employmentType = "Permanent";
                    nextState.contractDurationMonths = "";
                  }

                  if (value === "Salary Worker") {
                    nextState.businessIncome = "";
                    nextState.incomeStability = "Stable";
                  }

                  updateFormData(nextState);
                }}
              >
                <SelectTrigger className="h-12 bg-slate-50 border-slate-200">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Salary Worker">Salary Worker</SelectItem>
                  <SelectItem value="Business Person">Business Person</SelectItem>
                  <SelectItem value="Salary Worker + Business Person">Salary Worker + Business Person</SelectItem>
                </SelectContent>
              </Select>
              {errors.incomeType && <p className="mt-1 text-xs text-red-500">{errors.incomeType}</p>}
            </div>

            {includesSalaryDetails && (
              <div className="space-y-6 rounded-xl border border-slate-100 p-5">
                <h3 className="text-sm font-bold text-slate-800">Salary Worker</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase mb-2 block">Salary Type</label>
                    <Select
                      value={salaryType}
                      onValueChange={(value) => {
                        updateFormData({ salaryType: value });
                        clearFieldError("salaryType");
                      }}
                    >
                      <SelectTrigger className="h-12 bg-slate-50 border-slate-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Fixed">Fixed</SelectItem>
                        <SelectItem value="Average (Variable)">Average (Variable)</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.salaryType && <p className="mt-1 text-xs text-red-500">{errors.salaryType}</p>}
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase mb-2 block">Monthly Salary Amount (LKR)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">LKR</span>
                      <Input
                        type="number"
                        className="h-12 pl-12 bg-slate-50 border-slate-200"
                        placeholder="0.00"
                        value={formData.monthlySalary}
                        onChange={(e) => {
                          updateFormData({ monthlySalary: e.target.value });
                          clearFieldError("monthlySalary");
                          clearFieldError("income");
                        }}
                        error={errors.monthlySalary}
                      />
                    </div>
                    {errors.monthlySalary && <p className="mt-1 text-xs text-red-500">{errors.monthlySalary}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase mb-2 block">Employment Type</label>
                    <Select
                      value={employmentType}
                      onValueChange={(value) => {
                        updateFormData({
                          employmentType: value,
                          contractDurationMonths: value === "Contract" ? formData.contractDurationMonths : "",
                        });
                        clearFieldError("employmentType");
                        if (value !== "Contract") {
                          clearFieldError("contractDurationMonths");
                        }
                      }}
                    >
                      <SelectTrigger className="h-12 bg-slate-50 border-slate-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Permanent">Permanent</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.employmentType && <p className="mt-1 text-xs text-red-500">{errors.employmentType}</p>}
                  </div>

                  {employmentType === "Contract" && (
                    <div>
                      <label className="text-xs font-bold text-slate-700 uppercase mb-2 block">Contract Duration (Months)</label>
                      <Input
                        type="text"
                        className="h-12 bg-slate-50 border-slate-200"
                        placeholder="e.g. 12"
                        value={contractDurationMonths}
                        onChange={(e) => {
                          updateFormData({ contractDurationMonths: e.target.value });
                          clearFieldError("contractDurationMonths");
                        }}
                        error={errors.contractDurationMonths}
                      />
                      {errors.contractDurationMonths && <p className="mt-1 text-xs text-red-500">{errors.contractDurationMonths}</p>}
                    </div>
                  )}
                </div>
              </div>
            )}

            {includesBusinessDetails && (
              <div className="space-y-6 rounded-xl border border-slate-100 p-5">
                <h3 className="text-sm font-bold text-slate-800">Business Person</h3>

                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase mb-2 block">Average Monthly Business Income (LKR)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">LKR</span>
                    <Input
                      type="number"
                      className="h-12 pl-12 bg-slate-50 border-slate-200"
                      placeholder="0.00"
                      value={formData.businessIncome}
                      onChange={(e) => {
                        updateFormData({ businessIncome: e.target.value });
                        clearFieldError("businessIncome");
                        clearFieldError("income");
                      }}
                      error={errors.businessIncome}
                    />
                  </div>
                  {errors.businessIncome && <p className="mt-1 text-xs text-red-500">{errors.businessIncome}</p>}
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase mb-2 block">Income Stability</label>
                  <Select
                    value={incomeStability}
                    onValueChange={(value) => {
                      updateFormData({ incomeStability: value });
                      clearFieldError("incomeStability");
                    }}
                  >
                    <SelectTrigger className="h-12 bg-slate-50 border-slate-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Stable">Stable</SelectItem>
                      <SelectItem value="Medium Fluctuation">Medium Fluctuation</SelectItem>
                      <SelectItem value="High Fluctuation">High Fluctuation</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.incomeStability && <p className="mt-1 text-xs text-red-500">{errors.incomeStability}</p>}
                </div>
              </div>
            )}

            {errors.income && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-700">
                {errors.income}
              </div>
            )}
          </div>

          <div className="h-fit space-y-6">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-slate-900">Added Income Sources</h3>
                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">{incomeRows.length} Items</span>
              </div>

              {incomeRows.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <p>No income sources added yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4">
                    <span className="w-1/2">Type</span>
                    <span className="w-1/2 text-right">Amount</span>
                  </div>

                  {incomeRows.map((row) => (
                    <div key={row.key} className="bg-white border border-slate-100 rounded-xl p-4 flex items-center shadow-sm">
                      <div className="w-1/2">
                        <p className="font-bold text-slate-800 text-sm">{row.type}</p>
                        <p className="text-xs text-slate-500">{row.meta}</p>
                      </div>
                      <div className="w-1/2 text-right">
                        <p className="font-bold text-slate-800 text-sm">{formatCurrency(row.amount)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {incomeRows.length > 0 && (
                <div className="mt-8 pt-6 border-t border-slate-200 flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Total Monthly Income</span>
                  <span className="text-[#3e9fd3] font-bold text-lg">{formatCurrency(totalIncome)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="fixed bottom-0 right-0 left-0 lg:left-64 bg-white border-t border-slate-200 px-8 py-4 flex items-center justify-between z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <Button
          variant="ghost"
          onClick={onBack}
          className="gap-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100"
        >
          <ArrowLeft size={16} /> Back
        </Button>
        <Button
          onClick={handleNext}
          className="gap-2 bg-[#3e9fd3] hover:bg-[#328ab8] text-white px-8 h-10 shadow-md shadow-blue-200"
        >
          Continue <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  );
}