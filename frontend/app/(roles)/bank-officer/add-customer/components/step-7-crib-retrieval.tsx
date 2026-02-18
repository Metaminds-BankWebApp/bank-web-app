"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, AlertTriangle, FileText, Download, Printer, User, Building, CreditCard, Ban } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { StepProps } from "./types";
import { Badge } from "@/src/components/ui/badge";

export function CRIBRetrieval({ formData, updateFormData, onNext, onBack }: StepProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data parsing
    const timer = setTimeout(() => {
      setLoading(false);
      // Update form data with mock CRIB results if not already present
      if (!formData.creditScore) {
        updateFormData({
            creditScore: 785,
            missedPaymentsLast12Months: 0,
            activeLoansCount: 2,
            totalActiveLoanValue: 4500000
        });
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [formData.creditScore, updateFormData]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] animate-in fade-in duration-500">
         <div className="relative w-24 h-24 mb-6">
            <div className="absolute inset-0 border-t-4 border-[#3e9fd3] rounded-full animate-spin"></div>
            <div className="absolute inset-2 border-r-4 border-slate-200 rounded-full animate-spin direction-reverse"></div>
            <div className="absolute inset-0 flex items-center justify-center">
               <FileText className="text-[#3e9fd3] animate-pulse" size={32} />
            </div>
         </div>
         <h2 className="text-xl font-bold text-[#0d3b66] mb-2">Retrieving Credit Report</h2>
         <p className="text-slate-500 text-sm">Please wait while we fetch data from CRIB securely...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
       <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          {/* Header */}
          <div className="bg-emerald-50/50 px-8 py-6 border-b border-emerald-100 flex items-center justify-between">
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                   <CheckCircle2 className="text-emerald-600" size={24} />
                </div>
                <div>
                   <h2 className="text-lg font-bold text-emerald-900">Report Successfully Retrieved</h2>
                   <p className="text-sm text-emerald-700">Reference ID: CRIB-2024-88392 • {new Date().toLocaleDateString()}</p>
                </div>
             </div>
             <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2 h-8 text-emerald-700 hover:text-emerald-800 border-emerald-200 hover:bg-emerald-100">
                   <Download size={14} /> PDF
                </Button>
                <Button variant="outline" size="sm" className="gap-2 h-8 text-emerald-700 hover:text-emerald-800 border-emerald-200 hover:bg-emerald-100">
                   <Printer size={14} /> Print
                </Button>
             </div>
          </div>

          <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
             {/* Score Card */}
             <div className="col-span-1 bg-slate-50 rounded-xl p-6 border border-slate-200 flex flex-col items-center justify-center text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2">
                   <Badge className="bg-[#3e9fd3] hover:bg-[#328ab8]">Excellent</Badge>
                </div>
                <div className="w-32 h-32 rounded-full border-8 border-slate-200 border-t-[#3e9fd3] border-r-[#3e9fd3] flex flex-col items-center justify-center mb-4">
                   <span className="text-4xl font-bold text-[#0d3b66]">{formData.creditScore || 785}</span>
                   <span className="text-xs text-slate-500 uppercase font-semibold">Score</span>
                </div>
                <p className="text-sm font-medium text-slate-600">Credit Risk: <span className="text-emerald-600 font-bold">Low</span></p>
                <p className="text-xs text-slate-400 mt-2">Calculated based on CRIB V3.0</p>
             </div>

             {/* Details Grid */}
             <div className="col-span-2 grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                   <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500">
                         <Building size={16} />
                      </div>
                      <span className="text-sm font-semibold text-slate-700">Active Facilities</span>
                   </div>
                   <p className="text-2xl font-bold text-[#0d3b66]">{formData.activeLoansCount !== undefined ? formData.activeLoansCount : 2}</p>
                   <p className="text-xs text-slate-400">Total Value: LKR {(formData.totalActiveLoanValue || 4500000).toLocaleString()}</p>
                </div>

                <div className="p-4 rounded-lg bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                   <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-500">
                         <Ban size={16} />
                      </div>
                      <span className="text-sm font-semibold text-slate-700">Dishonored Cheques</span>
                   </div>
                   <p className="text-2xl font-bold text-[#0d3b66]">0</p>
                   <p className="text-xs text-slate-400">Last 24 Months</p>
                </div>

                <div className="p-4 rounded-lg bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                   <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-500">
                         <CreditCard size={16} />
                      </div>
                      <span className="text-sm font-semibold text-slate-700">Inquiries</span>
                   </div>
                   <p className="text-2xl font-bold text-[#0d3b66]">{formData.inquiryCount || 1}</p>
                   <p className="text-xs text-slate-400">Last 3 Months</p>
                </div>

                <div className="p-4 rounded-lg bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                   <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-500">
                         <AlertTriangle size={16} />
                      </div>
                      <span className="text-sm font-semibold text-slate-700">Missed Payments</span>
                   </div>
                   <p className="text-2xl font-bold text-[#0d3b66]">{formData.missedPaymentsLast12Months || 0}</p>
                   <p className="text-xs text-slate-400">Last 12 Months</p>
                </div>
             </div>
          </div>
       </div>

       <div className="flex justify-between pt-4">
          <Button variant="ghost" onClick={onBack} className="text-slate-500 hover:text-slate-800">
             <ArrowLeft size={16} className="mr-2" /> Back
          </Button>
          <Button onClick={onNext} className="bg-[#3e9fd3] hover:bg-[#328ab8] text-white px-8 h-10 shadow-md shadow-blue-200">
             Proceed to Final Review <ArrowRight size={16} className="ml-2" />
          </Button>
       </div>
    </div>
  );
}
