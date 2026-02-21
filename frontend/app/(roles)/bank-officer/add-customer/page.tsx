"use client";

import { useState } from "react";
import { Sidebar } from "@/src/components/layout";
import { AuthGuard } from "@/src/components/auth";
import { 
  CheckCircle2, 
  User, 
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import { initialFormData, CustomerFormData } from "./components/types";
import { PersonalDetails } from "./components/step-1-personal-details";
import { FinancialData } from "./components/step-2-financial-data";
import { Loans } from "./components/step-3-loans";
import { CreditCards } from "./components/step-4-credit-cards";
import { Liabilities } from "./components/step-5-liabilities";
import { CRIBRequest } from "./components/step-6-crib-request";
import { CRIBRetrieval } from "./components/step-7-crib-retrieval";
import { Review } from "./components/step-8-review";
import { SuccessView } from "./components/success-view";
import { BankOfficerHeader } from "@/src/components/ui/bank-officer-header";

const generateCustomerId = () => `PC-${Math.floor(100000 + Math.random() * 900000)}`;

export default function AddCustomerPage() {
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<CustomerFormData>(initialFormData);
  const [generatedId, setGeneratedId] = useState("");
  
  const steps = [
    { id: 1, label: "Personal Details" },
    { id: 2, label: "Financial Data" },
    { id: 3, label: "Loans" },
    { id: 4, label: "Credit Cards" },
    { id: 5, label: "Other Liabilities" },
    { id: 6, label: "CRIB Request" },
    { id: 7, label: "CRIB Retrieval" },
    { id: 8, label: "Review & Submit" },
  ];

  const updateFormData = (data: Partial<CustomerFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    if (step < steps.length) {
      setStep(step + 1);
    } else {
      // Submit form
      setGeneratedId(generateCustomerId());
      setIsSuccess(true);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setStep(1);
    setIsSuccess(false);
  };

  const renderStep = () => {
    const props = {
      formData,
      updateFormData,
      onNext: handleNext,
      onBack: handleBack
    };

    switch (step) {
      case 1: return <PersonalDetails {...props} />;
      case 2: return <FinancialData {...props} />;
      case 3: return <Loans {...props} />;
      case 4: return <CreditCards {...props} />;
      case 5: return <Liabilities {...props} />;
      case 6: return <CRIBRequest {...props} />;
      case 7: return <CRIBRetrieval {...props} />;
      case 8: return <Review {...props} />;
      default: return <PersonalDetails {...props} />;
    }
  };

  return (
    <AuthGuard requiredRole="BANK_OFFICER">
      <div className="flex h-screen bg-[#f3f4f6] overflow-hidden">
        <Sidebar role="BANK_OFFICER" className="max-lg:hidden h-full" />
      <main className="flex-1 flex flex-col p-3 sm:p-5 lg:p-7 h-full overflow-hidden">
          <BankOfficerHeader title="Add Customer" className="mb-6 shrink-0" />

          <div className="flex-1 overflow-y-auto min-h-0 pb-24">
          {isSuccess ? (
             <div className="bg-white rounded-xl shadow-sm border border-slate-100 min-h-150 flex items-center justify-center">
                <SuccessView 
                   customerName={formData.fullName}  
                   generatedId={generatedId}
                   onReset={handleReset}
                />
             </div>
          ) : (
            <>
              {/* Breadcrumb / Page Title */}
              <div className="mb-6 flex items-center gap-2 text-sm text-slate-500">
                 <span>Dashboard</span>
                 <ChevronRight size={14} />
                 <span className="font-semibold text-[#3e9fd3]">Add Customer</span>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-8">
                 {/* Left Column: Form Steps */}
                 <div className="space-y-6">
                    
                    {/* Stepper */}
                    <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-100 overflow-x-auto">
                       <div className="flex items-center justify-between min-w-150 relative">
                          {/* Connecting Line Background */}
                          <div className="absolute top-4 left-0 w-full h-0.5 bg-slate-100 z-0"></div>

                          {steps.map((s) => (
                             <div key={s.id} className="relative z-10 flex flex-col items-center gap-3 flex-1">
                                <div 
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300
                                    ${step === s.id ? "border-[#3e9fd3] bg-white text-[#3e9fd3] scale-110 shadow-lg shadow-blue-100" : 
                                      step > s.id ? "border-[#3e9fd3] bg-[#3e9fd3] text-white" : 
                                      "border-slate-200 bg-white text-slate-400"}`}
                                >
                                   {step > s.id ? <CheckCircle2 size={16} /> : s.id}
                                </div>
                                <span 
                                    className={`text-[10px] font-bold uppercase tracking-wider text-center
                                    ${step === s.id ? "text-[#3e9fd3]" : 
                                      step > s.id ? "text-[#3e9fd3]/80" : 
                                      "text-slate-400"}`}
                                >
                                    {s.label}
                                </span>
                             </div>
                          ))}
                       </div>
                    </div>

                    {/* Form Content */}
                    {renderStep()}

                 </div>

                 {/* Right Column: Live Summary */}
                 <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-slate-100 sticky top-6">
                       <div className="bg-slate-50/50 p-6 border-b border-slate-100">
                          <div className="flex items-center gap-2 mb-4">
                             <span className="text-[10px] uppercase font-bold text-[#3e9fd3] tracking-widest">Live Summary</span>
                          </div>
                          <div className="flex items-center gap-4">
                             <div className="h-14 w-14 rounded-full bg-[#e0f2fe] flex items-center justify-center text-[#0284c7]">
                                <User size={28} />
                             </div>
                             <div>
                                <h3 className="text-lg font-bold text-slate-800">{formData.fullName || "New Customer"}</h3>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">Incomplete Registration</p>
                             </div>
                          </div>
                       </div>
                       
                       <div className="p-6 space-y-5">
                          <div className="flex justify-between items-center pb-2 border-b border-slate-50/50">
                             <span className="text-xs text-slate-400 font-medium">Full Name</span>
                             <span className="text-xs font-bold text-slate-700 text-right">{formData.fullName || "-"}</span>
                          </div>
                          <div className="flex justify-between items-center pb-2 border-b border-slate-50/50">
                             <span className="text-xs text-slate-400 font-medium">NIC Number</span>
                             <span className="text-xs font-bold text-slate-700 text-right">{formData.nic || "-"}</span>
                          </div>
                          <div className="flex justify-between items-center pb-2 border-b border-slate-50/50">
                             <span className="text-xs text-slate-400 font-medium">Email Address</span>
                             <span className="text-xs font-bold text-slate-700 text-right">{formData.email || "-"}</span>
                          </div>
                          <div className="flex justify-between items-center pb-2 border-b border-slate-50/50">
                             <span className="text-xs text-slate-400 font-medium">Mobile</span>
                             <span className="text-xs font-bold text-slate-700 text-right">{formData.mobile || "-"}</span>
                          </div>
                          <div className="flex justify-between items-center pb-2 border-b border-slate-50/50">
                             <span className="text-xs text-slate-400 font-medium">Date of Birth</span>
                             <span className="text-xs font-bold text-slate-700 text-right">{formData.dob || "-"}</span>
                          </div>

                          <div className="mt-6 bg-slate-50 rounded-lg p-4 border border-slate-100">
                             <div className="flex items-start gap-3">
                                <ShieldCheck className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />
                                <div>
                                   <h4 className="text-xs font-bold text-slate-800 mb-1">System Check</h4>
                                   <p className="text-[10px] text-slate-500 leading-relaxed">
                                      Identity and mobile number are verified against local registries.
                                   </p>
                                </div>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
            </>
          )}
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
