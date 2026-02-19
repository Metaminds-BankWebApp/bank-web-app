"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui";
import { StepProps } from "./types";

export function Loans({ formData, updateFormData, onNext, onBack }: StepProps) {
  const [loanType, setLoanType] = useState("");
  const [monthlyEmi, setMonthlyEmi] = useState("");
  const [remainingBalance, setRemainingBalance] = useState("");

  const handleAddLoan = () => {
    if (loanType && monthlyEmi && remainingBalance) {
      updateFormData({
        loans: [...formData.loans, { type: loanType, monthlyEmi, remainingBalance }]
      });
      setLoanType("");
      setMonthlyEmi("");
      setRemainingBalance("");
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
             onChange={(e) => setLoanType(e.target.value)}
             placeholder="Select Loan Type"
             className="bg-slate-50 border-slate-200 h-11"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="space-y-3">
              <Label className="text-slate-700 font-medium">Monthly EMI (LKR)</Label>
              <Input 
                 value={monthlyEmi}
                 onChange={(e) => setMonthlyEmi(e.target.value)}
                 placeholder="0.00"
                 className="bg-slate-50 border-slate-200 h-11"
              />
           </div>
           <div className="space-y-3">
              <Label className="text-slate-700 font-medium">Remaining Balance (LKR)</Label>
              <Input 
                 value={remainingBalance}
                 onChange={(e) => setRemainingBalance(e.target.value)}
                 placeholder="0.00"
                 className="bg-slate-50 border-slate-200 h-11"
              />
           </div>
        </div>

        <Button onClick={handleAddLoan} className="w-full bg-[#3e9fd3] hover:bg-[#328ab8] text-white">
           + Add Loan to Summary
        </Button>
      </div>

      {/* Actions */}
      <div className="bg-slate-50 px-8 py-4 flex items-center justify-between border-t border-slate-100">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="gap-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100"
        >
            <ArrowLeft size={16} /> Back
        </Button>
        <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-slate-400 mr-4 cursor-pointer hover:text-slate-600">Save Draft</span>
            <Button 
              onClick={onNext}
              className="gap-2 bg-[#3e9fd3] hover:bg-[#328ab8] text-white px-8 h-10 shadow-md shadow-blue-200"
            >
                Continue <ArrowRight size={16} />
            </Button>
        </div>
      </div>
    </div>
  );
}
