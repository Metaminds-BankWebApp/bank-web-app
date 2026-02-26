"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui";
import { StepProps } from "./types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { LiabilitiesStepErrors, LiabilityDraftErrors, validateLiabilitiesStep, validateLiabilityCollection, validateLiabilityDraft } from "./validation";

type LiabilityStepErrors = LiabilityDraftErrors & LiabilitiesStepErrors & {
  liabilities?: string;
  step?: string;
};

export function Liabilities({ formData, updateFormData, onNext, onBack }: StepProps) {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [errors, setErrors] = useState<LiabilityStepErrors>({});

  const handleAddObligation = () => {
    const draftErrors = validateLiabilityDraft({ category, monthlyAmount: amount });
    if (Object.keys(draftErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...draftErrors }));
      return;
    }

    updateFormData({
      liabilities: [...formData.liabilities, { category: category.trim(), monthlyAmount: amount.trim() }]
    });
    setCategory("");
    setAmount("");
    setErrors((prev) => ({ ...prev, category: undefined, monthlyAmount: undefined, liabilities: undefined, step: undefined }));
  };

  const handleNext = () => {
    const newErrors: LiabilityStepErrors = {
      ...validateLiabilitiesStep(formData),
    };

    const hasPendingLiability = Boolean(category.trim() || amount.trim());
    if (hasPendingLiability) {
      newErrors.step = "Add the current obligation or clear the fields before continuing.";
    }

    const liabilityCollectionError = validateLiabilityCollection(formData.liabilities);
    if (liabilityCollectionError) {
      newErrors.liabilities = liabilityCollectionError;
    }

    setErrors((prev) => ({ ...prev, ...newErrors }));
    if (Object.keys(newErrors).length === 0) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-[#0d3b66]">Add Other Obligation</h2>
          <p className="text-sm text-slate-500 mt-1">Enter details for other recurring financial commitments.</p>
        </div>
        
        <div className="p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
                <Label className="text-slate-700 font-medium">Category</Label>
                <Select
                  value={category}
                  onValueChange={(value) => {
                    setCategory(value);
                    if (errors.category || errors.step) {
                      setErrors((prev) => ({ ...prev, category: undefined, step: undefined }));
                    }
                  }}
                >
                  <SelectTrigger className={`bg-slate-50 border-slate-200 h-11 ${errors.category ? "border-red-500" : ""}`}>
                      <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                      <SelectItem value="Rent">Rent</SelectItem>
                      <SelectItem value="Leasing">Leasing</SelectItem>
                      <SelectItem value="Education">Education</SelectItem>
                      <SelectItem value="Utility">Utility Bills</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.category && <p className="text-red-500 text-xs">{errors.category}</p>}
            </div>
            <div className="space-y-3">
                <Label htmlFor="amount" className="text-slate-700 font-medium">Monthly Amount (LKR)</Label>
                <Input 
                  id="amount" 
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    if (errors.monthlyAmount || errors.step) {
                      setErrors((prev) => ({ ...prev, monthlyAmount: undefined, step: undefined }));
                    }
                  }}
                  placeholder="0.00"
                  className={`bg-slate-50 border-slate-200 h-11 ${errors.monthlyAmount ? "border-red-500" : ""}`}
                />
                {errors.monthlyAmount && <p className="text-red-500 text-xs">{errors.monthlyAmount}</p>}
            </div>
          </div>

          <Button onClick={handleAddObligation} className="w-full bg-[#3e9fd3] hover:bg-[#328ab8] text-white">
            + Add Obligation
          </Button>

          {formData.liabilities.length > 0 && (
            <p className="text-xs font-medium text-emerald-700">
              {formData.liabilities.length} obligation{formData.liabilities.length > 1 ? "s" : ""} added to summary.
            </p>
          )}
          {errors.step && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-700">
              {errors.step}
            </div>
          )}
          {errors.liabilities && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-700">
              {errors.liabilities}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-8 flex items-start gap-4">
           <div className="h-10 w-10 shrink-0 bg-orange-50 rounded-full flex items-center justify-center text-orange-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 12" /><path d="M3 12h6" /></svg>
           </div>
           <div className="flex-1">
              <h3 className="text-md font-bold text-[#0d3b66] mb-1">Missed Payments</h3>
              <p className="text-xs text-slate-500 mb-6">Credit history for the previous 12 months.</p>
              
              <div className="space-y-3">
                  <Label htmlFor="missedPayments" className="text-xs font-bold text-[#0d3b66] uppercase tracking-wider">Missed Payments Count (Last 12 Months)</Label>
                  <div className="flex items-center gap-4">
                    <Input 
                      id="missedPayments" 
                      type="number" 
                      min="0"
                      value={formData.missedPaymentsLast12Months}
                      onChange={(e) => {
                        updateFormData({ missedPaymentsLast12Months: parseInt(e.target.value, 10) || 0 });
                        if (errors.missedPaymentsLast12Months) {
                          setErrors((prev) => ({ ...prev, missedPaymentsLast12Months: undefined }));
                        }
                      }}
                      className={`bg-slate-50 border-slate-200 h-11 w-32 ${errors.missedPaymentsLast12Months ? "border-red-500" : ""}`}
                    />
                    <span className="text-xs text-slate-400">Enter 0 if no payments were missed.</span>
                  </div>
                  {errors.missedPaymentsLast12Months && <p className="text-red-500 text-xs">{errors.missedPaymentsLast12Months}</p>}
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
