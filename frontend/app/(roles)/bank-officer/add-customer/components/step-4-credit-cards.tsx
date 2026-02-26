"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui";
import { StepProps } from "./types";
import { CreditCardDraftErrors, validateCreditCardCollection, validateCreditCardDraft } from "./validation";

type CreditCardStepErrors = CreditCardDraftErrors & {
  creditCards?: string;
  step?: string;
};

export function CreditCards({ formData, updateFormData, onNext, onBack }: StepProps) {
  const [issuer, setIssuer] = useState("");
  const [creditLimit, setCreditLimit] = useState("");
  const [outstandingBalance, setOutstandingBalance] = useState("");
  const [errors, setErrors] = useState<CreditCardStepErrors>({});

  const handleAddCard = () => {
    const draftErrors = validateCreditCardDraft({ issuer, limit: creditLimit, outstandingBalance });
    if (Object.keys(draftErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...draftErrors }));
      return;
    }

    updateFormData({
      creditCards: [...formData.creditCards, { issuer: issuer.trim(), limit: creditLimit.trim(), outstandingBalance: outstandingBalance.trim() }]
    });
    setIssuer("");
    setCreditLimit("");
    setOutstandingBalance("");
    setErrors((prev) => ({ ...prev, issuer: undefined, limit: undefined, outstandingBalance: undefined, creditCards: undefined, step: undefined }));
  };

  const handleNext = () => {
    const newErrors: CreditCardStepErrors = {};
    const hasPendingCard = Boolean(issuer.trim() || creditLimit.trim() || outstandingBalance.trim());

    if (hasPendingCard) {
      newErrors.step = "Add the current credit card or clear the fields before continuing.";
    }

    const cardCollectionError = validateCreditCardCollection(formData.creditCards);
    if (cardCollectionError) {
      newErrors.creditCards = cardCollectionError;
    }

    setErrors((prev) => ({ ...prev, ...newErrors }));
    if (Object.keys(newErrors).length === 0) {
      onNext();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="px-8 py-6 border-b border-slate-100">
        <h2 className="text-xl font-bold text-[#0d3b66]">Add Credit Card</h2>
        <p className="text-sm text-slate-500 mt-1">Enter details of the applicants existing credit card facilities.</p>
      </div>
      
      <div className="p-8 space-y-8">
        <div className="space-y-3">
          <Label htmlFor="issuer" className="text-slate-700 font-medium">Issuer (Optional)</Label>
          <Input 
             id="issuer" 
             value={issuer}
             onChange={(e) => {
               setIssuer(e.target.value);
               if (errors.issuer || errors.step) {
                 setErrors((prev) => ({ ...prev, issuer: undefined, step: undefined }));
               }
             }}
             placeholder="e.g. Standard Chartered, HSBC"
             className={`bg-slate-50 border-slate-200 h-11 ${errors.issuer ? "border-red-500" : ""}`}
          />
          {errors.issuer && <p className="text-red-500 text-xs">{errors.issuer}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="space-y-3">
              <Label htmlFor="limit" className="text-slate-700 font-medium">Credit Limit (LKR)</Label>
              <Input 
                 id="limit" 
                 value={creditLimit}
                 onChange={(e) => {
                   setCreditLimit(e.target.value);
                   if (errors.limit || errors.step) {
                     setErrors((prev) => ({ ...prev, limit: undefined, step: undefined }));
                   }
                 }}
                 placeholder="0.00"
                 className={`bg-slate-50 border-slate-200 h-11 ${errors.limit ? "border-red-500" : ""}`}
              />
              {errors.limit && <p className="text-red-500 text-xs">{errors.limit}</p>}
           </div>
           <div className="space-y-3">
              <Label htmlFor="balance" className="text-slate-700 font-medium">Outstanding Balance (LKR)</Label>
              <Input 
                 id="balance" 
                 value={outstandingBalance}
                 onChange={(e) => {
                   setOutstandingBalance(e.target.value);
                   if (errors.outstandingBalance || errors.step) {
                     setErrors((prev) => ({ ...prev, outstandingBalance: undefined, step: undefined }));
                   }
                 }}
                 placeholder="0.00"
                 className={`bg-slate-50 border-slate-200 h-11 ${errors.outstandingBalance ? "border-red-500" : ""}`}
              />
              {errors.outstandingBalance && <p className="text-red-500 text-xs">{errors.outstandingBalance}</p>}
           </div>
        </div>

        <Button onClick={handleAddCard} className="w-full bg-[#3e9fd3] hover:bg-[#328ab8] text-white">
           + Add Credit Card
        </Button>

        {formData.creditCards.length > 0 && (
          <p className="text-xs font-medium text-emerald-700">
            {formData.creditCards.length} credit card{formData.creditCards.length > 1 ? "s" : ""} added to summary.
          </p>
        )}

        {errors.step && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-700">
            {errors.step}
          </div>
        )}
        {errors.creditCards && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-700">
            {errors.creditCards}
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
