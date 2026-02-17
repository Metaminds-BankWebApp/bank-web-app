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
import React from 'react';

export default function LoanSenseDashboard() {
  const loans = [
    { title: "Personal Loan", subtitle: "Flexible personal financing for your needs", status: "Eligible", statusColor: "text-emerald-500 bg-emerald-50", amount: "2,150,000" },
    { title: "Vehicle Loan", subtitle: "Finance your dream vehicle", status: "Eligible", statusColor: "text-emerald-500 bg-emerald-50", amount: "3,450,000" },
    { title: "Education Loan", subtitle: "Invest in your education and future", status: "Partially Eligible", statusColor: "text-amber-500 bg-amber-50", amount: "5,900,000" },
    { title: "Housing Loan", subtitle: "Finance your dream home", status: "Partially Eligible", statusColor: "text-amber-500 bg-amber-50", amount: "10,400,000" },
  ];

  return (
    <AuthGuard requiredRole="BANK_CUSTOMER">
      <div className="flex flex-col gap-6 p-4 md:p-8 min-h-screen bg-white font-sans text-slate-800">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center bg-[#0d3b66] text-white p-6 rounded-2xl shadow-lg gap-4">
          <h1 className="text-2xl font-bold tracking-wide w-full md:w-auto">Dashboard</h1>
          <div className="flex items-center gap-6 w-full md:w-auto justify-end">
            <div className="flex gap-4">
               <button className="relative p-2 hover:bg-white/10 rounded-full transition-colors"><Mail size={20} /><span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-[#0d3b66]"></span></button>
               <button className="relative p-2 hover:bg-white/10 rounded-full transition-colors"><Bell size={20} /><span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-[#0d3b66]"></span></button>
            </div>
            <div className="flex items-center gap-3 border-l border-white/20 pl-6">
               <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white overflow-hidden relative">
                  <div className="w-full h-full bg-gradient-to-br from-slate-400 to-slate-600"></div>
               </div>
               <div className="hidden md:block text-right">
                  <p className="text-sm font-bold leading-none">Kamal Edirisinghe</p>
                  <p className="text-xs text-white/70 mt-1">User</p>
               </div>
            </div>
          </div>
        </header>

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
                        <div key={idx} className="bg-white border border-slate-100 rounded-xl p-6 flex flex-col md:flex-row justify-between items-center hover:shadow-md transition-shadow cursor-pointer group">
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

                         <button className="w-full mt-6 bg-[#2c5282] hover:bg-[#1e3a5f] text-white text-sm font-semibold py-3 rounded-lg transition-colors shadow-lg shadow-blue-900/10">
                             How is this calculated?
                         </button>

                    </div>
                </div>

            </div>
        </div>
      </div>
    </AuthGuard>
  );
}
