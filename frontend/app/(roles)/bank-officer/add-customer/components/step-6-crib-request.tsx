"use client";

import { useState, useEffect } from "react";
import { ArrowRight, ArrowLeft, Loader2, Link, Server, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui";
import { StepProps } from "./types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { Checkbox } from "@/src/components/ui/checkbox";

export function CRIBRequest({ formData, updateFormData, onNext, onBack }: StepProps) {
  const [requestStatus, setRequestStatus] = useState<"draft" | "processing" | "sent" | "connected" | "retrieved">("draft");
  const [consentGiven, setConsentGiven] = useState(false);

  // Simulate process
  useEffect(() => {
    if (requestStatus === "processing") {
      const timer = setTimeout(() => {
        setRequestStatus("sent");
      }, 1500);
      return () => clearTimeout(timer);
    }
    if (requestStatus === "sent") {
      const timer = setTimeout(() => {
        setRequestStatus("connected");
      }, 1500);
      return () => clearTimeout(timer);
    }
    if (requestStatus === "connected") {
        const timer = setTimeout(() => {
          setRequestStatus("retrieved");
          onNext(); // Auto-advance to retrieval view
        }, 1500);
        return () => clearTimeout(timer);
    }
  }, [requestStatus, onNext]);

  const handleInitiateRequest = () => {
    if (consentGiven) {
      setRequestStatus("processing");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6 animate-in fade-in duration-500">
      
      {/* Left Column: Request Form */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
        <div className="px-8 py-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-[#0d3b66]">CRIB Information Request</h2>
          <p className="text-sm text-slate-500 mt-1">Initiate and retrieve credit information for the customer from the central bureau.</p>
        </div>
        
        <div className="p-8 space-y-8 flex-1">
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Full Name</p>
                   <p className="font-semibold text-slate-800">{formData.fullName || "Not Provided"}</p>
                </div>
                <div>
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">NIC Number</p>
                   <p className="font-semibold text-slate-800">{formData.nic || "Not Provided"}</p>
                </div>
             </div>
             
             <div className="h-px bg-slate-200 w-full mb-6"></div>

             <h3 className="text-sm font-bold text-[#0d3b66] mb-4 flex items-center gap-2">
                <ShieldCheck size={16} className="text-[#3e9fd3]" /> Request Parameters
             </h3>

             <div className="space-y-4">
                <div className="space-y-2">
                   <Label className="text-slate-700 font-medium">Request Reason</Label>
                   <Select defaultValue="new-loan">
                      <SelectTrigger className="bg-white border-slate-200 h-10">
                         <SelectValue placeholder="Select Reason" />
                      </SelectTrigger>
                      <SelectContent>
                         <SelectItem value="new-loan">New Loan Application</SelectItem>
                         <SelectItem value="periodic-review">Periodic Review</SelectItem>
                         <SelectItem value="credit-card">Credit Card Issuance</SelectItem>
                      </SelectContent>
                   </Select>
                </div>
                
                <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100/50 flex items-start gap-3">
                    <Checkbox 
                        id="consent" 
                        checked={consentGiven} 
                        onChange={(e) => setConsentGiven(e.target.checked)}
                        className="mt-1"
                    />
                    <label htmlFor="consent" className="text-xs text-slate-600 leading-relaxed cursor-pointer select-none">
                        I confirm that the Customer Consent Form has been signed and physical copy is archived in the branch records. <span className="text-red-500">*</span>
                    </label>
                </div>
             </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-slate-50 px-8 py-4 flex items-center justify-between border-t border-slate-100 mt-auto">
            <Button 
            variant="ghost" 
            onClick={onBack}
            className="gap-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100"
            disabled={requestStatus !== "draft"}
            >
                <ArrowLeft size={16} /> Back
            </Button>
            
            <Button 
              onClick={handleInitiateRequest}
              disabled={!consentGiven || requestStatus !== "draft"}
              className="gap-2 bg-[#3e9fd3] hover:bg-[#328ab8] text-white px-8 h-10 shadow-md shadow-blue-200 min-w-[140px]"
            >
                {requestStatus === "draft" ? (
                    <>Initiate Request <ArrowRight size={16} /></>
                ) : (
                    <><Loader2 size={16} className="animate-spin" /> Processing...</>
                )}
            </Button>
        </div>
      </div>

      {/* Right Column: Processing Status */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden h-fit sticky top-6">
         <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
            <h3 className="text-sm font-bold text-[#0d3b66] flex items-center gap-2">
                <Loader2 size={14} className={requestStatus !== "draft" && requestStatus !== "retrieved" ? "animate-spin text-[#3e9fd3]" : "text-slate-400"} />
                Processing Status
            </h3>
         </div>
         
         <div className="p-6 relative">
            {/* Timeline Line */}
            <div className="absolute left-9 top-10 bottom-10 w-0.5 bg-slate-100"></div>

            <div className="space-y-8 relative z-10">
                {/* Step 1 */}
                <div className="flex gap-4">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border-2 transition-all duration-300 ${
                        requestStatus !== "draft" 
                        ? "bg-[#3e9fd3] border-[#3e9fd3] text-white" 
                        : "bg-white border-slate-200 text-slate-300"
                    }`}>
                        <CheckCircle2 size={14} />
                    </div>
                    <div>
                        <p className={`text-sm font-bold transition-colors ${requestStatus !== "draft" ? "text-slate-800" : "text-slate-400"}`}>Draft Created</p>
                        <p className="text-[10px] text-slate-400">Request prepared for submission</p>
                    </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-4">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border-2 transition-all duration-300 ${
                        ["sent", "connected", "retrieved"].includes(requestStatus)
                        ? "bg-[#3e9fd3] border-[#3e9fd3] text-white" 
                        : requestStatus === "processing" 
                            ? "bg-white border-[#3e9fd3] text-[#3e9fd3] animate-pulse"
                            : "bg-white border-slate-200 text-slate-300"
                    }`}>
                        {["sent", "connected", "retrieved"].includes(requestStatus) ? <CheckCircle2 size={14} /> : <div className="w-1.5 h-1.5 rounded-full bg-current" />}
                    </div>
                    <div>
                        <p className={`text-sm font-bold transition-colors ${["sent", "connected", "retrieved"].includes(requestStatus) ? "text-slate-800" : "text-slate-400"}`}>Request Sent</p>
                        <p className="text-[10px] text-slate-400">Waiting for transmission...</p>
                    </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-4">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border-2 transition-all duration-300 ${
                        ["connected", "retrieved"].includes(requestStatus)
                        ? "bg-[#3e9fd3] border-[#3e9fd3] text-white" 
                        : requestStatus === "sent" 
                            ? "bg-white border-[#3e9fd3] text-[#3e9fd3] animate-pulse"
                            : "bg-white border-slate-200 text-slate-300"
                    }`}>
                         {["connected", "retrieved"].includes(requestStatus) ? <CheckCircle2 size={14} /> : <div className="w-1.5 h-1.5 rounded-full bg-current" />}
                    </div>
                    <div>
                        <p className={`text-sm font-bold transition-colors ${["connected", "retrieved"].includes(requestStatus) ? "text-slate-800" : "text-slate-400"}`}>Gateway Connected</p>
                        <p className="text-[10px] text-slate-400">Pending handshake</p>
                    </div>
                </div>

                {/* Step 4 */}
                <div className="flex gap-4">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border-2 transition-all duration-300 ${
                        requestStatus === "retrieved"
                        ? "bg-[#3e9fd3] border-[#3e9fd3] text-white" 
                        : requestStatus === "connected" 
                            ? "bg-white border-[#3e9fd3] text-[#3e9fd3] animate-pulse"
                            : "bg-white border-slate-200 text-slate-300"
                    }`}>
                         {requestStatus === "retrieved" ? <CheckCircle2 size={14} /> : <div className="w-1.5 h-1.5 rounded-full bg-current" />}
                    </div>
                    <div>
                        <p className={`text-sm font-bold transition-colors ${requestStatus === "retrieved" ? "text-slate-800" : "text-slate-400"}`}>Report Retrieved</p>
                        <p className="text-[10px] text-slate-400">Awaiting data stream</p>
                    </div>
                </div>
            </div>
            
            {/* CRIB Status Snapshot */}
            <div className="mt-8 pt-6 border-t border-slate-100">
                <h4 className="text-xs font-bold text-[#0d3b66] mb-3">CRIB Snapshot</h4>
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-100 flex items-center justify-center flex-col gap-2 min-h-[100px]">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-300">
                        <Server size={20} />
                    </div>
                    <p className="text-xs text-slate-400 text-center">Data not yet retrieved</p>
                    <p className="text-[10px] text-slate-300 text-center leading-tight px-4">Please complete the request process to view customer credit score.</p>
                </div>
            </div>
         </div>
      </div>
    </div>
  );
}
