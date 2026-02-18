"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeft, Briefcase, DollarSign } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui";
import { StepProps } from "./types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";

export function FinancialData({ formData, updateFormData, onNext, onBack }: StepProps) {
  const [activeTab, setActiveTab] = useState<"salary" | "business">("salary");

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="px-8 py-6 border-b border-slate-100">
        <h2 className="text-xl font-bold text-[#0d3b66]">Income Details</h2>
        <p className="text-sm text-slate-500 mt-1">Enter various income sources for calculating net worth and eligibility.</p>
      </div>
      
      <div className="p-8 space-y-8">
        <div>
          <Label className="text-slate-700 font-medium mb-3 block">Income Type</Label>
          <div className="flex bg-slate-50 p-1 rounded-lg w-fit border border-slate-200">
            <button
              onClick={() => setActiveTab("salary")}
              className={`px-6 py-2 rounded-md text-sm font-semibold transition-all ${
                activeTab === "salary" 
                  ? "bg-white text-[#0d3b66] shadow-sm border border-slate-100" 
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Salary
            </button>
            <button
              onClick={() => setActiveTab("business")}
              className={`px-6 py-2 rounded-md text-sm font-semibold transition-all ${
                activeTab === "business" 
                  ? "bg-white text-[#0d3b66] shadow-sm border border-slate-100" 
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Business
            </button>
          </div>
        </div>

        {activeTab === "salary" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                   <Label className="text-slate-700 font-medium">Salary Type</Label>
                   <Select defaultValue="fixed">
                      <SelectTrigger className="bg-slate-50 border-slate-200 h-11">
                         <SelectValue placeholder="Select Salary Type" />
                      </SelectTrigger>
                      <SelectContent>
                         <SelectItem value="fixed">Fixed Basic Salary</SelectItem>
                         <SelectItem value="hourly">Hourly Wage</SelectItem>
                      </SelectContent>
                   </Select>
                </div>
                <div className="space-y-3">
                   <Label htmlFor="monthlySalary" className="text-slate-700 font-medium">Monthly Amount (LKR)</Label>
                   <div className="relative">
                      <Input 
                        id="monthlySalary" 
                        value={formData.monthlySalary}
                        onChange={(e) => updateFormData({ monthlySalary: e.target.value })}
                        placeholder="0.00" 
                        className="bg-slate-50 border-slate-200 h-11 pl-10" 
                      />
                      <DollarSign className="absolute left-3 top-3 text-slate-400" size={16} />
                   </div>
                </div>
             </div>

             <div className="space-y-3">
                <Label className="text-slate-700 font-medium">Employment Type</Label>
                <div className="flex gap-4">
                   {["Permanent", "Contract", "Freelance"].map((type) => (
                      <div 
                        key={type}
                        onClick={() => updateFormData({ employmentType: type })}
                        className={`flex-1 border rounded-xl p-4 cursor-pointer transition-all hover:border-[#3e9fd3] flex items-center justify-center text-sm font-medium
                        ${formData.employmentType === type 
                          ? "border-[#3e9fd3] bg-blue-50 text-[#0d3b66]" 
                          : "border-slate-200 bg-white text-slate-500"}`}
                      >
                         {type}
                      </div>
                   ))}
                </div>
             </div>
          </div>
        )}

        {activeTab === "business" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
             <div className="space-y-3">
                <Label htmlFor="businessIncome" className="text-slate-700 font-medium">Average Monthly Business Income (LKR)</Label>
                <Input 
                  id="businessIncome" 
                  value={formData.businessIncome}
                  onChange={(e) => updateFormData({ businessIncome: e.target.value })}
                  placeholder="0.00" 
                  className="bg-slate-50 border-slate-200 h-11" 
                />
             </div>
          </div>
        )}
        
        <div className="dashed-border rounded-xl p-6 border-2 border-slate-200 border-dashed flex flex-col items-center justify-center text-slate-400 hover:text-slate-600 hover:border-slate-300 hover:bg-slate-50 cursor-pointer transition-all">
            <Button variant="ghost" className="text-[#3e9fd3] hover:text-[#328ab8] hover:bg-transparent">
               + Add Salary Income
            </Button>
        </div>
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
