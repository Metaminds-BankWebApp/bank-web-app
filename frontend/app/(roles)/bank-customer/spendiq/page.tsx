"use client";

import { AuthGuard } from "@/src/components/auth";
import { 
  CreditCard,
  Banknote,
  Trash2,
  Edit2
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/src/components/ui/select";
import React, { useState } from 'react';
import SpendIQHeader from "@/src/components/ui/spendiq-header";

export default function SpendIQDashboard() {
  const [type, setType] = useState<"income" | "expense">("expense");

  const transactions = [
    { date: "Feb 8, 2026", category: "Food & Dining", amount: -450.00, type: "Card", notes: "Lunch at downtown cafe", isExpense: true },
    { date: "Feb 7, 2026", category: "Salary", amount: 45000.00, type: "Online", notes: "Nov running shoes", isExpense: false }, // "Nov running shoes" note for Salary seems odd in screenshot, keeping as is
    { date: "Feb 6, 2026", category: "Transportation", amount: -200.00, type: "Cash", notes: "Weekly metro pass", isExpense: true },
    { date: "Feb 5, 2026", category: "Food & Dining", amount: -450.00, type: "Card", notes: "Grocery shopping", isExpense: true },
    { date: "Feb 4, 2026", category: "Entertainment", amount: -450.00, type: "Online", notes: "Movie tickets and dinner", isExpense: true },
    { date: "Feb 3, 2026", category: "Salary", amount: 210000.00, type: "Card", notes: "Electricity bill", isExpense: false }, // Note "Electricity bill" on Salary is definitely a typo in the mockup reference, keeping structure
  ];

  return (
    <AuthGuard requiredRole="BANK_CUSTOMER">
      <div className="flex flex-col gap-8 p-4 md:p-8 min-h-screen bg-white font-sans text-slate-800">
        
         {/* Header */}
        <SpendIQHeader title="Add New Income / expenses" />

        {/* Add New Section */}
        <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
           <h2 className="text-lg font-bold text-slate-900 mb-6">Add new</h2>
           
           <div className="flex items-center gap-8 mb-6">
              <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${type === "income" ? "border-[#0b1a3a]" : "border-slate-300"}`}>
                      {type === "income" && <div className="w-2.5 h-2.5 rounded-full bg-[#0b1a3a]"></div>}
                  </div>
                  <input type="radio" name="type" className="hidden" checked={type === "income"} onChange={() => setType("income")} />
                  <span className={`font-medium ${type === "income" ? "text-slate-900" : "text-slate-500"} group-hover:text-slate-900`}>Income</span>
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${type === "expense" ? "border-[#0b1a3a]" : "border-slate-300"}`}>
                      {type === "expense" && <div className="w-2.5 h-2.5 rounded-full bg-[#0b1a3a]"></div>}
                  </div>
                  <input type="radio" name="type" className="hidden" checked={type === "expense"} onChange={() => setType("expense")} />
                  <span className={`font-medium ${type === "expense" ? "text-slate-900" : "text-slate-500"} group-hover:text-slate-900`}>Expenses</span>
              </label>
           </div>

           <div className="flex flex-col md:flex-row gap-6 items-start">
              <input 
                 type="text" 
                 placeholder="Amount" 
                 className="w-full md:w-1/3 px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[#0b1a3a] focus:ring-1 focus:ring-[#0b1a3a] transition-all bg-slate-50/50"
              />
              
              <div className="w-full md:w-1/3">
                 <Select>
                    <SelectTrigger className="w-full py-6 border-slate-200 bg-slate-50/50">
                       <SelectValue placeholder="category" />
                    </SelectTrigger>
                    <SelectContent>
                       <SelectItem value="food">Food & Dining</SelectItem>
                       <SelectItem value="transport">Transportation</SelectItem>
                       <SelectItem value="salary">Salary</SelectItem>
                       <SelectItem value="entertainment">Entertainment</SelectItem>
                    </SelectContent>
                 </Select>
              </div>

              <div className="w-full md:w-auto ml-auto">
                 <Button className="bg-[#0b1a3a] hover:bg-[#162c57] text-white px-8 py-6 text-sm font-semibold rounded-lg shadow-lg shadow-blue-900/10 min-w-[140px]">
                    Add now
                 </Button>
              </div>
           </div>
        </div>

        {/* Add New Category Section */}
        <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
           <h2 className="text-lg font-bold text-slate-900 mb-6">Add new category</h2>
           <div className="flex flex-col md:flex-row gap-6 items-center">
              <input 
                 type="text" 
                 placeholder="" 
                 className="w-full md:w-1/2 px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[#0b1a3a] transition-all bg-slate-50/50"
              />
              <div className="w-full md:w-auto ml-auto">
                 <Button className="bg-[#0b1a3a] hover:bg-[#162c57] text-white px-8 py-6 text-sm font-semibold rounded-lg shadow-lg shadow-blue-900/10 min-w-[140px]">
                    Add now
                 </Button>
              </div>
           </div>
        </div>

        {/* Past Expenses Table */}
        <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm overflow-hidden">
           <h2 className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-6">Past Expenses</h2>
           
           <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                 <thead>
                    <tr className="text-left border-b border-slate-100">
                       <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest w-[15%]">Date</th>
                       <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest w-[20%]">Category</th>
                       <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right w-[15%]">Amount</th>
                       <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-center w-[15%]">Payment Type</th>
                       <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest w-[25%] pl-8">Notes</th>
                       <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right w-[10%]">Actions</th>
                    </tr>
                 </thead>
                 <tbody className="text-sm">
                    {transactions.map((tx, idx) => (
                       <tr key={idx} className="group hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0">
                          <td className="py-5 font-semibold text-slate-700">{tx.date}</td>
                          <td className="py-5">
                             <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold border border-slate-200">
                                {tx.category}
                             </span>
                          </td>
                          <td className={`py-5 text-right font-bold ${tx.isExpense ? "text-red-500" : "text-emerald-500"}`}>
                             {tx.isExpense ? "-" : "+"} {Math.abs(tx.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })} LKR
                          </td>
                          <td className="py-5 text-center">
                             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold">
                                {tx.type === "Card" && <CreditCard size={14} />}
                                {tx.type === "Cash" && <Banknote size={14} />}
                                {tx.type}
                             </div>
                          </td>
                          <td className="py-5 text-slate-500 font-medium pl-8">{tx.notes}</td>
                          <td className="py-5 text-right">
                             <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-2 hover:bg-slate-200 rounded-lg text-slate-500 transition-colors">
                                   <Edit2 size={16} />
                                </button>
                                <button className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors">
                                   <Trash2 size={16} />
                                </button>
                             </div>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>

      </div>
    </AuthGuard>
  );
}
