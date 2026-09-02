"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { StepProps } from "./types";

export function Review({
  formData,
  onNext,
  onBack,
  onCompleteCribReviewStep,
  onEditStep,
  isCompletingCribReviewStep,
  isFinancialMaintenance,
}: StepProps) {
   const [errorMessage, setErrorMessage] = useState("");
   const customerFullName = `${formData.firstName} ${formData.lastName}`.trim();
   const totalMonthlyIncome = formData.incomes.reduce((total, income) => total + (Number(income.amount) || 0), 0);
   const totalBusinessIncome = formData.incomes
      .filter((income) => income.type === "Business Person")
      .reduce((total, income) => total + (Number(income.amount) || 0), 0);
   const primarySalaryIncome = formData.incomes.find((income) => income.type === "Salary Worker");
   const primaryEmploymentType = primarySalaryIncome?.employmentType || formData.employmentType || "-";
   const primarySalaryAmount = primarySalaryIncome?.amount || formData.monthlySalary || "0.00";
   const totalLoanEmi = formData.loans.reduce((total, loan) => total + (parseFloat(loan.monthlyEmi) || 0), 0);
   const totalLoanBalance = formData.loans.reduce((total, loan) => total + (parseFloat(loan.remainingBalance) || 0), 0);
   const totalCardLimit = formData.creditCards.reduce((total, card) => total + (parseFloat(card.limit) || 0), 0);
   const totalCardOutstanding = formData.creditCards.reduce((total, card) => total + (parseFloat(card.outstandingBalance) || 0), 0);
   const totalLiabilityAmount = formData.liabilities.reduce((total, item) => total + (parseFloat(item.monthlyAmount) || 0), 0);
	const cribNotFound =
		(formData.cribRequestStatus || "").trim().toUpperCase() === "FAILED" &&
		(formData.cribReportStatus || "").trim().toUpperCase() === "FAILED";

   const handleSubmit = async () => {
      setErrorMessage("");

      try {
        if (isFinancialMaintenance && onCompleteCribReviewStep) {
          await onCompleteCribReviewStep();
        }
        onNext();
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : "Failed to complete onboarding.");
      }
   };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="px-8 py-6 border-b border-slate-100">
        <h2 className="text-xl font-bold text-[#0d3b66]">Review & Submit</h2>
        <p className="text-sm text-slate-500 mt-1">Review all information before submitting for customer creation.</p>
      </div>
      
         <div className="p-8 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
               <section className="rounded-xl border border-slate-100 bg-slate-50/70 p-5 space-y-4">
                  <div className="flex items-center justify-between">
                     <h3 className="text-sm font-bold text-[#0d3b66] uppercase tracking-wide">Personal Details</h3>
                     <button type="button" onClick={() => onEditStep?.(1)} className="text-[10px] font-bold text-[#3e9fd3] hover:underline uppercase transition-colors">Edit</button>
                  </div>
                  <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
                     <div className="text-slate-500">Full Name</div>
                     <div className="font-medium text-slate-800 text-right">{customerFullName || "-"}</div>
                     <div className="text-slate-500">NIC Number</div>
                     <div className="font-medium text-slate-800 text-right">{formData.nic || "-"}</div>
                     <div className="text-slate-500">Province</div>
                     <div className="font-medium text-slate-800 text-right">{formData.province || "-"}</div>
                     <div className="text-slate-500">Address</div>
                     <div className="font-medium text-slate-800 text-right">{formData.address || "-"}</div>
                  </div>
               </section>

               <section className="rounded-xl border border-slate-100 bg-slate-50/70 p-5 space-y-4">
                  <div className="flex items-center justify-between">
                     <h3 className="text-sm font-bold text-[#0d3b66] uppercase tracking-wide">Account & Employment</h3>
                     <button type="button" onClick={() => onEditStep?.(1)} className="text-[10px] font-bold text-[#3e9fd3] hover:underline uppercase transition-colors">Edit</button>
                  </div>
                  <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
                     <div className="text-slate-500">Primary Employment</div>
                     <div className="font-medium text-slate-800 text-right">{primaryEmploymentType}</div>
                     <div className="text-slate-500">Monthly Net</div>
                     <div className="font-medium text-slate-800 text-right">LKR {primarySalaryAmount}</div>
                     <div className="text-slate-500">Income Sources</div>
                     <div className="font-medium text-slate-800 text-right">{formData.incomes.length}</div>
                     <div className="text-slate-500">Account Verification</div>
                     <div className="font-medium text-slate-800 text-right">{formData.isAccountVerified ? "Verified" : "Pending"}</div>
                  </div>
               </section>

               <section className="rounded-xl border border-slate-100 bg-slate-50/70 p-5 space-y-4">
                  <div className="flex items-center justify-between">
                     <h3 className="text-sm font-bold text-[#0d3b66] uppercase tracking-wide">Financial Snapshot</h3>
                     <button type="button" onClick={() => onEditStep?.(3)} className="text-[10px] font-bold text-[#3e9fd3] hover:underline uppercase transition-colors">Edit</button>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                     <div className="rounded-lg border border-slate-200 bg-white px-3 py-2">
                        <p className="text-[10px] text-slate-400 uppercase font-bold">Monthly Income</p>
                        <p className="font-semibold text-slate-800 mt-1">LKR {totalMonthlyIncome.toFixed(2)}</p>
                     </div>
                     <div className="rounded-lg border border-slate-200 bg-white px-3 py-2">
                        <p className="text-[10px] text-slate-400 uppercase font-bold">Business Income</p>
                        <p className="font-semibold text-slate-800 mt-1">LKR {totalBusinessIncome.toFixed(2)}</p>
                     </div>
                     <div className="rounded-lg border border-slate-200 bg-white px-3 py-2">
                        <p className="text-[10px] text-slate-400 uppercase font-bold">Total EMI</p>
                        <p className="font-semibold text-slate-800 mt-1">LKR {totalLoanEmi.toFixed(2)}</p>
                     </div>
                     <div className="rounded-lg border border-slate-200 bg-white px-3 py-2">
                        <p className="text-[10px] text-slate-400 uppercase font-bold">Other Oblig.</p>
                        <p className="font-semibold text-slate-800 mt-1">LKR {totalLiabilityAmount.toFixed(2)}</p>
                     </div>
                  </div>
               </section>

               <section className="rounded-xl border border-slate-100 bg-slate-50/70 p-5 space-y-4">
                  <div className="flex items-center justify-between">
                     <h3 className="text-sm font-bold text-[#0d3b66] uppercase tracking-wide">Portfolio Summary</h3>
                     <button type="button" onClick={() => onEditStep?.(4)} className="text-[10px] font-bold text-[#3e9fd3] hover:underline uppercase transition-colors">Edit</button>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                     <div className="rounded-lg border border-slate-200 bg-white px-3 py-2">
                        <p className="text-[10px] text-slate-400 uppercase font-bold">Loans</p>
                        <p className="font-semibold text-slate-800 mt-1">{formData.loans.length} items</p>
                        <p className="text-[11px] text-slate-500 mt-1">Balance LKR {totalLoanBalance.toFixed(2)}</p>
                     </div>
                     <div className="rounded-lg border border-slate-200 bg-white px-3 py-2">
                        <p className="text-[10px] text-slate-400 uppercase font-bold">Credit Cards</p>
                        <p className="font-semibold text-slate-800 mt-1">{formData.creditCards.length} items</p>
                        <p className="text-[11px] text-slate-500 mt-1">Limit LKR {totalCardLimit.toFixed(2)}</p>
                     </div>
                     <div className="rounded-lg border border-slate-200 bg-white px-3 py-2">
                        <p className="text-[10px] text-slate-400 uppercase font-bold">Outstanding</p>
                        <p className="font-semibold text-slate-800 mt-1">LKR {totalCardOutstanding.toFixed(2)}</p>
                     </div>
                     <div className="rounded-lg border border-slate-200 bg-white px-3 py-2">
                        <p className="text-[10px] text-slate-400 uppercase font-bold">Liabilities</p>
                        <p className="font-semibold text-slate-800 mt-1">{formData.liabilities.length} items</p>
                     </div>
                  </div>
               </section>

               <section className="rounded-xl border border-slate-100 bg-slate-50/70 p-5 space-y-4">
                  <div className="flex items-center justify-between">
					 <h3 className="text-sm font-bold text-[#0d3b66] uppercase tracking-wide">CRIB Result</h3>
                     <button type="button" onClick={() => onEditStep?.(2)} className="text-[10px] font-bold text-[#3e9fd3] hover:underline uppercase transition-colors">Edit</button>
                  </div>
					{cribNotFound ? (
						<div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
							<p className="font-semibold">Customer financial data was not found in CRIB.</p>
							<p className="mt-1 text-xs">The financial snapshot and portfolio sections contain manually entered data only; it was not retrieved from CRIB.</p>
						</div>
					) : (
						<div className="grid grid-cols-2 gap-3 text-sm">
							<div className="rounded-lg border border-slate-200 bg-white px-3 py-2"><p className="text-[10px] text-slate-400 uppercase font-bold">CRIB Request</p><p className="font-semibold text-slate-800 mt-1">{formData.cribRequestStatus || "PENDING"}</p></div>
							<div className="rounded-lg border border-slate-200 bg-white px-3 py-2"><p className="text-[10px] text-slate-400 uppercase font-bold">CRIB Report</p><p className="font-semibold text-slate-800 mt-1">{formData.cribReportStatus || "NOT_READY"}</p></div>
						</div>
					)}
               </section>
            </div>
      </div>

      {errorMessage && (
        <div className="mx-8 mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {errorMessage}
        </div>
      )}

      {/* Actions */}
      <div className="fixed bottom-0 right-0 left-0 lg:left-64 bg-white border-t border-slate-200 px-8 py-4 flex items-center justify-between z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="gap-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100"
          disabled={Boolean(isCompletingCribReviewStep)}
        >
            <ArrowLeft size={16} /> Back
        </Button>
        <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-slate-400 cursor-pointer hover:text-slate-600">Save Draft</span>
            <Button 
              onClick={handleSubmit}
              className="gap-2 bg-[#3e9fd3] hover:bg-[#328ab8] text-white px-8 h-10 shadow-md shadow-blue-200"
              disabled={Boolean(isCompletingCribReviewStep)}
            >
			  {isFinancialMaintenance ? "Finalise Financial Update" : "Continue to Account Creation"} <ArrowRight size={16} />
            </Button>
        </div>
      </div>
    </div>
  );
}
