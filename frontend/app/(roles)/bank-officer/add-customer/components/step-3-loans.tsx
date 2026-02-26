"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui";
import { StepProps } from "./types";
import { LoanDraftErrors, validateLoanCollection, validateLoanDraft } from "./validation";

type LoanStepErrors = LoanDraftErrors & {
  loans?: string;
  step?: string;
};

export function Loans({ formData, updateFormData, onNext, onBack }: StepProps) {
  const [loanType, setLoanType] = useState("");
  const [monthlyEmi, setMonthlyEmi] = useState("");
  const [remainingBalance, setRemainingBalance] = useState("");
  const [errors, setErrors] = useState<LoanStepErrors>({});

  const handleAddLoan = () => {
    const draftErrors = validateLoanDraft({ type: loanType, monthlyEmi, remainingBalance });
    if (Object.keys(draftErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...draftErrors }));
      return;
    }

    updateFormData({
      loans: [...formData.loans, { type: loanType.trim(), monthlyEmi: monthlyEmi.trim(), remainingBalance: remainingBalance.trim() }]
    });
    setLoanType("");
    setMonthlyEmi("");
    setRemainingBalance("");
    setErrors((prev) => ({ ...prev, type: undefined, monthlyEmi: undefined, remainingBalance: undefined, loans: undefined, step: undefined }));
  };

  const handleNext = () => {
    const newErrors: LoanStepErrors = {};
    const hasPendingLoan = Boolean(loanType.trim() || monthlyEmi.trim() || remainingBalance.trim());

    if (hasPendingLoan) {
      newErrors.step = "Add the current loan to the summary or clear the fields before continuing.";
    }

    const loanCollectionError = validateLoanCollection(formData.loans);
    if (loanCollectionError) {
      newErrors.loans = loanCollectionError;
    }

    setErrors((prev) => ({ ...prev, ...newErrors }));
    if (Object.keys(newErrors).length === 0) {
      onNext();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="px-8 py-6 border-b border-slate-100">
        <h2 className="text-xl font-bold text-[#0d3b66]">Add Loan</h2>
        <p className="text-sm text-slate-500 mt-1">Enter details of any existing loans the customer currently holds.</p>
      </div>
      
      <div className="p-8 space-y-8">
        <div className="space-y-3">
          <Label className="text-slate-700 font-medium">Loan Type</Label>
          <Input 
             value={loanType}
             onChange={(e) => {
               setLoanType(e.target.value);
               if (errors.type || errors.step) {
                 setErrors((prev) => ({ ...prev, type: undefined, step: undefined }));
               }
             }}
             placeholder="Select Loan Type"
             className={`bg-slate-50 border-slate-200 h-11 ${errors.type ? "border-red-500" : ""}`}
          />
          {errors.type && <p className="text-red-500 text-xs">{errors.type}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="space-y-3">
              <Label className="text-slate-700 font-medium">Monthly EMI (LKR)</Label>
              <Input 
                 value={monthlyEmi}
                 onChange={(e) => {
                   setMonthlyEmi(e.target.value);
                   if (errors.monthlyEmi || errors.step) {
                     setErrors((prev) => ({ ...prev, monthlyEmi: undefined, step: undefined }));
                   }
                 }}
                 placeholder="0.00"
                 className={`bg-slate-50 border-slate-200 h-11 ${errors.monthlyEmi ? "border-red-500" : ""}`}
              />
              {errors.monthlyEmi && <p className="text-red-500 text-xs">{errors.monthlyEmi}</p>}
           </div>
           <div className="space-y-3">
              <Label className="text-slate-700 font-medium">Remaining Balance (LKR)</Label>
              <Input 
                 value={remainingBalance}
                 onChange={(e) => {
                   setRemainingBalance(e.target.value);
                   if (errors.remainingBalance || errors.step) {
                     setErrors((prev) => ({ ...prev, remainingBalance: undefined, step: undefined }));
                   }
                 }}
                 placeholder="0.00"
                 className={`bg-slate-50 border-slate-200 h-11 ${errors.remainingBalance ? "border-red-500" : ""}`}
              />
              {errors.remainingBalance && <p className="text-red-500 text-xs">{errors.remainingBalance}</p>}
           </div>
        </div>

        <Button onClick={handleAddLoan} className="w-full bg-[#3e9fd3] hover:bg-[#328ab8] text-white">
           + Add Loan to Summary
        </Button>

        {formData.loans.length > 0 && (
          <p className="text-xs font-medium text-emerald-700">
            {formData.loans.length} loan{formData.loans.length > 1 ? "s" : ""} added to summary.
          </p>
        )}

        {errors.step && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-700">
            {errors.step}
          </div>
        )}
        {errors.loans && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-700">
            {errors.loans}
          </div>
        )}
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
        <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-slate-400 cursor-pointer hover:text-slate-600">Save Draft</span>
            <Button 
              onClick={handleNext}
              className="gap-2 bg-[#3e9fd3] hover:bg-[#328ab8] text-white px-8 h-10 shadow-md shadow-blue-200"
            >
                Continue <ArrowRight size={16} />
            </Button>
        </div>
      </div>
    </div>
  );
}
