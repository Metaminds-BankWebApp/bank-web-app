"use client";

import { AuthGuard } from "@/src/components/auth";
import { 
  ArrowRight, 
  ArrowUpRight, 
  Bell, 
  Calendar, 
  Check, 
  CheckCircle2, 
  Info, 
  Mail, 
  RotateCcw, // For History
  Search,
  TrendingUp,
  AlertCircle // For Partially Eligible
} from "lucide-react";
import LoanSenseHeader from "@/src/components/ui/loansenseheader";
import React from 'react';
import Link from "next/link";

export default function LoanSenseDashboard() {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
  const loans = [
    { title: "Personal Loan", subtitle: "Flexible personal financing for your needs", status: "Eligible", statusColor: "text-emerald-500 bg-emerald-50", amount: "2,150,000", path: "/bank-customer/loansense/personal" },
    { title: "Vehicle Loan", subtitle: "Finance your dream vehicle", status: "Eligible", statusColor: "text-emerald-500 bg-emerald-50", amount: "3,450,000", path: "/bank-customer/loansense/vehicle" },
    { title: "Education Loan", subtitle: "Invest in your education and future", status: "Partially Eligible", statusColor: "text-amber-500 bg-amber-50", amount: "5,900,000", path: "/bank-customer/loansense/education" },
    { title: "Housing Loan", subtitle: "Finance your dream home", status: "Partially Eligible", statusColor: "text-amber-500 bg-amber-50", amount: "10,400,000", path: "/bank-customer/loansense/housing" },
  ];

  return (
    <AuthGuard requiredRole="BANK_CUSTOMER">
      <div className="flex flex-col gap-6 p-4 md:p-8 min-h-screen bg-white font-sans text-slate-800">
        
        {/* Header */}
      <LoanSenseHeader title="LoanSense Dashboard" />
      <div><p className="text-sm opacity-80 mt-2">Your personalized loan insights and recommendations</p></div>

        <div>
            <div className="flex items-center gap-4 mb-4">
                <h2 className="text-lg font-bold text-slate-900">Loan Eligibility Overview</h2>
                <p className="text-sm text-slate-500">Your comprehensive loan eligibility assessment based on current financial data</p>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Card 1 */}
                <div className="bg-[#0e4f62] text-white p-6 rounded-2xl shadow-md h-32 flex flex-col justify-between relative overflow-hidden">
                    <div className="flex justify-between items-start z-10">
                        <span className="text-sm font-medium opacity-90">Overall Eligibility</span>
                        <CheckCircle2 size={18} className="text-emerald-400" />
                    </div>
                    <div className="z-10 mt-2">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                            <Check size={12} strokeWidth={3} /> Eligible
                        </span>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="bg-[#2f5c8f] text-white p-6 rounded-2xl shadow-md h-32 flex flex-col justify-between relative overflow-hidden">
                    <div className="flex justify-between items-start z-10">
                        <span className="text-sm font-medium opacity-90">Credit Risk Level</span>
                        <TrendingUp size={18} className="text-white/60" />
                    </div>
                    <div className="z-10 mt-2">
                         <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                            Low Risk
                        </span>
                    </div>
                </div>

                {/* Card 3 */}
                <div className="bg-[#e0f7fa] text-[#0d3b66] p-6 rounded-2xl shadow-sm h-32 flex flex-col justify-between border border-slate-100">
                    <div className="flex justify-between items-start">
                        <span className="text-sm font-medium opacity-80">Max Affordable EMI</span>
                        <TrendingUp size={18} className="text-[#0d3b66]/40" />
                    </div>
                    <div>
                        <span className="text-xs opacity-60 mr-1 font-semibold">LKR</span>
                        <span className="text-2xl font-bold">45,000</span>
                    </div>
                </div>

                {/* Card 4 */}
                <div className="bg-[#eef2ff] text-[#0d3b66] p-6 rounded-2xl shadow-sm h-32 flex flex-col justify-between border border-slate-100">
                    <div className="flex justify-between items-start">
                        <span className="text-sm font-medium opacity-80">Last Evaluation</span>
                        <Calendar size={18} className="text-[#0d3b66]/40" />
                    </div>
                    <div>
                        <span className="text-sm font-semibold opacity-80">February 8, 2026</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Loan Categories List */}
                <div className="lg:col-span-2 space-y-4">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Loan Categories</h3>
                    
                    {loans.map((loan, idx) => (
                        <Link key={idx} href={loan.path} className="block">
                          <div className="bg-white border border-slate-100 rounded-xl p-6 flex flex-col md:flex-row justify-between items-center hover:shadow-md transition-shadow cursor-pointer group">
                               <div className="w-full md:w-auto mb-4 md:mb-0">
                                   <h4 className="font-bold text-slate-800 text-lg mb-1 group-hover:text-[#0d3b66] transition-colors">{loan.title}</h4>
                                   <p className="text-sm text-slate-500 mb-3">{loan.subtitle}</p>
                                   <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${loan.statusColor}`}>
                                       {loan.status === "Eligible" ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                                       {loan.status}
                                   </span>
                               </div>
                               <div className="text-right w-full md:w-auto">
                                   <p className="text-xs text-slate-400 font-semibold mb-1 uppercase tracking-wide">Max Loan Amount</p>
                                   <div className="flex items-center justify-end gap-1 text-[#0d3b66]">
                                      <span className="text-sm font-bold opacity-60">LKR</span>
                                      <span className="text-xl font-bold">{loan.amount}</span>
                                   </div>
                               </div>
                               <div className="hidden md:flex ml-6 text-slate-300">
                                   <ArrowRight size={20} />
                               </div>
                          </div>
                        </Link>
                    ))}
                </div>

                {/* Affordability Indicators */}
                <div className="bg-white border border-slate-100 rounded-2xl p-6 h-fit shadow-sm">
                    <h3 className="text-lg font-bold text-slate-800 mb-8">Affordability Indicators</h3>
                    
                    <div className="space-y-8">
                        {/* Monthly Income */}
                        <div>
                            <div className="flex justify-between text-xs font-semibold text-slate-500 mb-2">
                                <span>Monthly Income</span>
                                <span className="text-slate-900">LKR 150,000</span>
                            </div>
                            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-[#1e40af] rounded-full w-full"></div>
                            </div>
                        </div>

                        {/* Debt Obligations */}
                        <div>
                            <div className="flex justify-between text-xs font-semibold text-slate-500 mb-2">
                                <span>Total Monthly Debt Obligations</span>
                                <span className="text-slate-900">LKR 25,000</span>
                            </div>
                            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-[#f97316] rounded-full w-[16%]"></div>
                            </div>
                        </div>

                        {/* DBR Percentage */}
                        <div>
                            <div className="flex justify-between text-xs font-semibold text-slate-500 mb-2">
                                <span>DBR Percentage</span>
                                <span className="text-slate-900 font-bold">16.7%</span>
                            </div>
                            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-1">
                                <div className="h-full bg-emerald-500 rounded-full w-[16.7%]"></div>
                            </div>
                            <p className="text-[10px] text-slate-400">Within healthy range (below 40%)</p>
                        </div>

                        {/* EMI Capacity */}
                        <div className="pt-4 border-t border-slate-100">
                             <div className="flex justify-between items-center mt-2">
                                <span className="text-sm font-medium text-slate-600">Available EMI Capacity</span>
                                <span className="text-lg font-bold text-emerald-600">LKR 50,000</span>
                             </div>
                        </div>

                         <button onClick={() => setIsModalOpen(true)} className="w-full mt-6 bg-[#2c5282] hover:bg-[#1e3a5f] text-white text-sm font-semibold py-3 rounded-lg transition-colors shadow-lg shadow-blue-900/10">
                              How is this calculated?
                         </button>


                    </div>
                </div>

            </div>
        </div>
{/* Calculation Modal */}
{isModalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center">

    {/* Overlay */}
    <div
      className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      onClick={() => setIsModalOpen(false)}
    />

    {/* Modal Content */}
    <div
      role="dialog"
      aria-modal="true"
      className="relative bg-white w-[92%] max-w-2xl rounded-2xl shadow-2xl p-8 z-10"
    >

      {/* Header */}
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h2 className="text-xl font-semibold text-[#0d3b66]">
          How Your Loan Eligibility Is Calculated
        </h2>
        <button
          onClick={() => setIsModalOpen(false)}
          className="text-slate-400 hover:text-slate-700 transition text-lg"
        >
          ✕
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="space-y-6 text-sm text-slate-700 leading-relaxed max-h-[65vh] overflow-y-auto pr-2">

        {/* Step 1 */}
        <div className="bg-slate-50 rounded-lg p-4 border">
          <h3 className="font-semibold text-slate-800 mb-2">
            1️⃣ Calculate Total Monthly Debt Obligations (TMDO)
          </h3>
          <p>
            We calculate how much you already pay each month for existing
            financial commitments.
          </p>
          <p className="mt-2 font-medium text-slate-800">
            TMDO = Loan EMIs + Leasing Payments + Credit Card Minimum Payments
          </p>
        </div>

        {/* Step 2 */}
        <div className="bg-slate-50 rounded-lg p-4 border">
          <h3 className="font-semibold text-slate-800 mb-2">
            2️⃣ Determine Your Debt Burden Ratio (DBR)
          </h3>
          <p>
            DBR shows what percentage of your income is currently used to repay debts.
          </p>
          <p className="mt-2 font-medium text-slate-800">
            DBR = TMDO ÷ Monthly Income
          </p>
        </div>

        {/* Step 3 */}
        <div className="bg-slate-50 rounded-lg p-4 border">
          <h3 className="font-semibold text-slate-800 mb-2">
            3️⃣ Apply Bank Policy Limit
          </h3>
          <p>
            The bank allows only a fixed portion of your income to be used for total debt repayments.
          </p>
          <p className="mt-2 font-medium text-slate-800">
            Max Allowed EMI = Monthly Income × DBR Policy Limit
          </p>
        </div>

        {/* Step 4 */}
        <div className="bg-slate-50 rounded-lg p-4 border">
          <h3 className="font-semibold text-slate-800 mb-2">
            4️⃣ Calculate Available EMI Capacity
          </h3>
          <p>
            This is the additional monthly repayment amount you can safely afford.
          </p>
          <p className="mt-2 font-medium text-slate-800">
            Available EMI = Max Allowed EMI − TMDO
          </p>
        </div>

        {/* Step 5 */}
        <div className="bg-slate-50 rounded-lg p-4 border">
          <h3 className="font-semibold text-slate-800 mb-2">
            5️⃣ Apply Credit Risk Adjustment
          </h3>
          <p>
            Your credit risk level determines how much of the calculated amount
            the bank is willing to approve.
          </p>
          <p className="mt-2 font-medium text-slate-800">
            Final Loan Amount = Available EMI × Tenure × Risk Multiplier
          </p>
        </div>

        {/* Summary */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-900 font-medium">
            ✔ In summary, your eligibility is determined by your income,
            existing financial commitments, bank policy limits, and your credit risk profile.
          </p>
        </div>

      </div>

      {/* Footer */}
      <div className="mt-8 flex justify-end border-t pt-4">
        <button
          onClick={() => setIsModalOpen(false)}
          className="bg-[#0d3b66] hover:bg-[#082d4a] text-white px-6 py-2 rounded-lg text-sm font-semibold transition"
        >
          Close
        </button>
      </div>

    </div>
  </div>
)}


      </div>
    </AuthGuard>
  );
}
