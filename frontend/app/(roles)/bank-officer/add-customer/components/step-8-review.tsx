"use client";

import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { StepProps } from "./types";

export function Review({ formData, onNext, onBack }: StepProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="px-8 py-6 border-b border-slate-100">
        <h2 className="text-xl font-bold text-[#0d3b66]">Review & Submit</h2>
        <p className="text-sm text-slate-500 mt-1">Review all information before submitting for customer creation.</p>
      </div>
      
      <div className="p-8 space-y-8">
        {/* Financial Snapshot */}
        <div className="bg-[#0b1e3b] rounded-xl p-6 text-white grid grid-cols-1 lg:grid-cols-2 gap-8 relative overflow-hidden">
           <div className="relative z-10 space-y-6">
              <div>
                 <p className="text-[10px] text-blue-300 font-bold uppercase tracking-widest mb-1">Total Monthly Income</p>
                 <p className="text-3xl font-bold text-white">LKR {formData.monthlySalary || "0.00"}</p>
                 <p className="text-xs text-blue-200/60 mt-1">+ LKR {formData.businessIncome || "0.00"} Business Income</p>
              </div>

              <div className="flex gap-8">
                 <div>
                    <p className="text-[10px] text-blue-300 font-bold uppercase tracking-widest mb-1">Total EMI</p>
                    <p className="text-lg font-bold text-white">LKR {formData.loans.reduce((acc, loan) => acc + (parseFloat(loan.monthlyEmi) || 0), 0).toFixed(2)}</p>
                 </div>
                 <div>
                    <p className="text-[10px] text-blue-300 font-bold uppercase tracking-widest mb-1">Other Oblig.</p>
                    <p className="text-lg font-bold text-white">LKR {formData.liabilities.reduce((acc, item) => acc + (parseFloat(item.monthlyAmount) || 0), 0).toFixed(2)}</p>
                 </div>
              </div>
           </div>
           
           <div className="relative z-10 space-y-6 flex flex-col justify-between">
              <div>
                 <div className="flex justify-between items-end mb-2">
                    <p className="text-[10px] text-blue-300 font-bold uppercase tracking-widest">CRIB Credit Score</p>
                    <p className="text-xl font-bold text-emerald-400">{formData.creditScore || "N/A"}</p>
                 </div>
                 <div className="h-1.5 w-full bg-blue-900/50 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-emerald-500 rounded-full transition-all duration-500" 
                        style={{ width: `${formData.creditScore ? (formData.creditScore / 900) * 100 : 0}%` }}
                    ></div>
                 </div>
              </div>

              <div className="flex items-center justify-between bg-white/5 rounded-lg p-3 border border-white/10">
                 <span className="text-xs font-medium text-blue-200">Missed Payments (12m)</span>
                 <span className={`px-2 py-1 rounded text-xs font-bold ${formData.missedPaymentsLast12Months === 0 ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>
                    {formData.missedPaymentsLast12Months === 0 ? "0 - Clean Record" : `${formData.missedPaymentsLast12Months} Missed`}
                 </span>
              </div>
           </div>

           {/* Decorative */}
           <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl"></div>
        </div>

        {/* Details Summary */}
        <div className="space-y-6">
           <div>
              <div className="flex items-center justify-between mb-4">
                 <h3 className="text-sm font-bold text-[#0d3b66] uppercase tracking-wide">Personal Details</h3>
                 <button className="text-[10px] font-bold text-[#3e9fd3] hover:underline uppercase transition-colors">Edit</button>
              </div>
              <div className="grid grid-cols-2 text-sm gap-y-2">
                 <div className="text-slate-500">Full Name</div>
                 <div className="font-medium text-slate-800 text-right">{formData.fullName}</div>
                 <div className="text-slate-500">NIC Number</div>
                 <div className="font-medium text-slate-800 text-right">{formData.nic}</div>
              </div>
           </div>
           
           <div className="border-t border-slate-100 pt-6">
              <div className="flex items-center justify-between mb-4">
                 <h3 className="text-sm font-bold text-[#0d3b66] uppercase tracking-wide">Employment</h3>
                 <button className="text-[10px] font-bold text-[#3e9fd3] hover:underline uppercase transition-colors">Edit</button>
              </div>
              <div className="grid grid-cols-2 text-sm gap-y-2">
                 <div className="text-slate-500">Primary Employment</div>
                 <div className="font-medium text-slate-800 text-right">{formData.employmentType}</div>
                 <div className="text-slate-500">Monthly Net</div>
                 <div className="font-medium text-slate-800 text-right">LKR {formData.monthlySalary}</div>
              </div>
           </div>
        </div>
        
        <div className="bg-blue-50/50 p-4 rounded-lg flex gap-3 text-xs text-slate-600 leading-relaxed border border-blue-100">
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-[#3e9fd3] mt-0.5"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="16" y2="12"/><line x1="12" x2="12.01" y1="8" y2="8"/></svg>
           <p>Final credit score will be generated after evaluation. All data will be transmitted via secure 256-bit encryption.</p>
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
              onClick={onNext}
              className="gap-2 bg-[#3e9fd3] hover:bg-[#328ab8] text-white px-8 h-10 shadow-md shadow-blue-200"
            >
                Submit & Create <ArrowRight size={16} />
            </Button>
        </div>
      </div>
    </div>
  );
}
