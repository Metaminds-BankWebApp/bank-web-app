"use client";

import { CheckCircle2, Eye, FileText, Plus, ShieldCheck } from "lucide-react";
import { Button } from "@/src/components/ui/button";

interface SuccessViewProps {
  customerName: string;
  generatedId: string;
  onReset: () => void;
}

export function SuccessView({ customerName, generatedId, onReset }: SuccessViewProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center animate-in zoom-in-50 duration-500">
      <div className="h-24 w-24 bg-blue-50 rounded-full flex items-center justify-center mb-6 relative">
         <div className="absolute inset-0 bg-[#3e9fd3]/10 rounded-full animate-ping opacity-75"></div>
         <CheckCircle2 size={48} className="text-[#3e9fd3] relative z-10" />
      </div>
      
      <h2 className="text-2xl font-bold text-[#0d3b66] mb-8">Customer Created Successfully</h2>
      
      <div className="bg-slate-50 rounded-xl p-6 w-full max-w-md border border-slate-100 mb-8">
         <div className="flex justify-between items-center py-3 border-b border-slate-200/60">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Customer Name</span>
            <span className="text-sm font-bold text-slate-700">{customerName}</span>
         </div>
         <div className="flex justify-between items-center py-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Generated ID</span>
            <span className="text-sm font-bold text-[#3e9fd3]">{generatedId}</span>
         </div>
      </div>
      
      <p className="text-sm text-slate-500 mb-8 max-w-sm">The customer profile is now active and ready for evaluation.</p>
      
      <div className="flex gap-4 w-full max-w-lg mb-8">
         <Button className="flex-1 bg-[#3e9fd3] hover:bg-[#328ab8] text-white gap-2 h-12 shadow-md shadow-blue-200">
            <FileText size={18} /> Trigger Credit Evaluation
         </Button>
         <Button variant="outline" className="flex-1 border-slate-200 text-slate-600 hover:bg-slate-50 gap-2 h-12">
            View Customer Profile <Eye size={18} />
         </Button>
      </div>
      
      <div className="flex gap-8 text-xs font-bold text-slate-400 uppercase tracking-wide">
         <button className="flex items-center gap-2 hover:text-slate-600 transition-colors">
            <ShieldCheck size={14} /> Enter Verified Data
         </button>
         <button onClick={onReset} className="flex items-center gap-2 hover:text-slate-600 transition-colors">
            <Plus size={14} /> Create Another Customer
         </button>
      </div>
    </div>
  );
}
