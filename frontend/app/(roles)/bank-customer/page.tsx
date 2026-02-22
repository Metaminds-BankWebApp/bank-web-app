"use client";

import Link from "next/link";
import { AuthGuard } from "@/src/components/auth";
import { LogoutButton } from "@/src/components/logout-button";
import { 
  Briefcase, 
  CreditCard, 
  LineChart, 
  Wallet, 
  ArrowRight,
  CheckCircle2,
  Circle,
  AlertCircle
} from "lucide-react";
import { Button } from "@/src/components/ui/button";

export default function BankCustomerRolePage() {
  const features = [
    { 
      title: "CreditLens", 
      description: "Predictive credit health modeling and limit forecasting.",
      href: "/bank-customer/creditlens",
      icon: Briefcase,
      status: "ACTIVE",
      statusColor: "text-emerald-500 bg-emerald-500/10",
      progressLabel: "INTEGRITY SCORE",
      progressValue: 85,
      progressColor: "bg-emerald-500",
      progressText: "85%",
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-100"
    },
    { 
      title: "SpendIQ", 
      description: "Real-time cashflow categorization and waste detection.",
      href: "/bank-customer/spendiq",
      icon: LineChart,
      status: "PARTIAL",
      statusColor: "text-amber-500 bg-amber-500/10",
      progressLabel: "ANALYSIS LEVEL",
      progressValue: 45,
      progressColor: "bg-amber-500",
      progressText: "45%",
      iconColor: "text-amber-600",
      iconBg: "bg-amber-100"
    },
    { 
      title: "LoanSense", 
      description: "Optimized lending rates based on verified income data.",
      href: "/bank-customer/loansense",
      icon: Wallet,
      status: "LOCKED",
      statusColor: "text-slate-400 bg-slate-200/50",
      progressLabel: "ELIGIBILITY",
      progressValue: 0,
      progressColor: "bg-slate-200",
      progressText: "Incomplete",
      iconColor: "text-slate-400",
      iconBg: "bg-slate-100"
    },
    { 
      title: "Transact", 
      description: "Global settlement engine with zero-day clearance.",
      href: "/bank-customer/transact",
      icon: CreditCard,
      status: "ACTIVE",
      statusColor: "text-blue-500 bg-blue-500/10",
      progressLabel: "PROCESSING SPEED",
      progressValue: 100,
      progressColor: "bg-blue-500",
      progressText: "Ultra",
      iconColor: "text-blue-600",
      iconBg: "bg-blue-100"
    },
  ];

  const checklistItems = [
    { label: "Verified Email Address", checked: true },
    { label: "Add income details", checked: true },
    { label: "Verify mobile number", checked: false },
    { label: "Connect primary bank account", checked: false },
    { label: "Upload proof of residence", checked: false },
    { label: "Setup Biometric Auth", checked: false },
  ];

  return (
    <AuthGuard requiredRole="BANK_CUSTOMER">
      <div className="min-h-screen w-full bg-[#021c3b] relative overflow-hidden flex flex-col font-sans text-white">
        
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/20 blur-[150px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none -translate-x-1/3 translate-y-1/4"></div>

        {/* Header */}
        <header className="relative z-20 w-full px-8 py-8 flex justify-between items-start">
          <div className="flex items-center gap-3">
             {/* Logo Icon */}
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-900/20 rotate-3">
               <div className="w-5 h-5 border-[3px] border-white rounded-md transform rotate-45"></div>
            </div>
            {/* Logo Text */}
            <div className="flex flex-col">
              <span className="text-white font-bold text-lg tracking-wide">PRIME<span className="font-light text-white/80">CORE</span></span>
            </div>
          </div>
          
          <div className="flex items-center gap-8">
             {/* Profile Completion Widget */}
             <div className="hidden md:flex flex-col items-end">
                <div className="flex justify-between w-64 mb-1.5">
                    <span className="text-xs text-white/90 font-medium">72% Profile Completion</span>
                    <span className="text-xs text-emerald-400 font-bold tracking-wider">High Readiness</span>
                </div>
                <div className="w-64 h-2 bg-blue-900/50 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
                   <div className="h-full w-[72%] bg-emerald-400 rounded-full shadow-[0_0_15px_rgba(52,211,153,0.6)]"></div>
                </div>
             </div>
             
             <LogoutButton className="text-white/70 hover:text-white hover:bg-white/10" />
          </div>
        </header>


        <main className="relative z-10 flex-1 w-full max-w-[1600px] mx-auto p-8 md:px-12 flex flex-col justify-center">
            
            <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-16 items-center flex-1">
                {/* Left Column: Text & CTA */}
                <div className="flex flex-col justify-center space-y-8">
                    <h1 className="text-5xl md:text-6xl font-bold text-white leading-[1.1] tracking-tight">
                       Welcome back, <br />
                       <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-200">Dineth</span>
                    </h1>
                    
                    <p className="text-slate-300 text-lg max-w-lg leading-relaxed font-light">
                       Your financial ecosystem is evolving. Complete your profile to unlock high-yield instruments and AI-driven portfolio insights.
                    </p>
                    
                  

                    {/* Placeholder for the illustration space */}
                    <div className="relative h-[250px] w-full mt-8 hidden lg:block opacity-50">
                       {/* Elements for visual balance if image is missing */}
                    </div>
                </div>

                {/* Right Column: Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                   {features.map((item, i) => (
                      <Link href={item.href} key={i} className="group h-full">
                         <div className="bg-white rounded-[2rem] p-8 h-full min-h-[220px] flex flex-col justify-between shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl relative overflow-hidden group-hover:ring-2 ring-white/20">
                            
                            <div className="flex justify-between items-start mb-6">
                               <div className={`w-12 h-12 rounded-2xl ${item.iconBg} flex items-center justify-center ${item.iconColor} transition-transform group-hover:scale-110 duration-300`}>
                                  <item.icon className="w-6 h-6" />
                               </div>
                               <span className={`px-3 py-1 text-[10px] uppercase ${item.statusColor} rounded-full font-bold tracking-wider`}>
                                  {item.status}
                               </span>
                            </div>

                            <div className="mb-8">
                               <h3 className="text-xl font-bold text-slate-800 mb-2 tracking-tight">{item.title}</h3>
                               <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-[95%]">
                                  {item.description}
                               </p>
                            </div>

                            <div className="mt-auto">
                               <div className="flex justify-between items-end mb-2">
                                  <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">{item.progressLabel}</span>
                                  <span className={`text-[10px] font-bold ${item.progressText === "Ultra" ? "text-blue-600" : item.progressText === "Incomplete" ? "text-slate-400" : "text-emerald-600"}`}>
                                     {item.progressText}
                                  </span>
                               </div>
                               <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                  <div className={`h-full ${item.progressColor} rounded-full transition-all duration-1000 ease-out`} style={{ width: `${item.progressValue}%` }}></div>
                               </div>
                            </div>

                         </div>
                      </Link>
                   ))}
                </div>
            </div>

            {/* Bottom Section: Checklist */}
            <div className="mt-16 bg-white rounded-[1.5rem] p-4 pr-12 pl-8 flex flex-col xl:flex-row items-center gap-8 shadow-2xl shadow-black/10 max-w-full">
                <div className="flex items-center gap-4 min-w-max border-b xl:border-b-0 xl:border-r border-slate-100 pb-4 xl:pb-0 xl:pr-8">
                    <div className="bg-slate-50 p-2 rounded-full">
                        <CheckCircle2 className="w-5 h-5 text-blue-500" />
                    </div>
                    <span className="text-slate-900 font-bold text-lg">What&apos;s Missing?</span>
                </div>
              
              <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4">
                 {checklistItems.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                       {item.checked ? (
                          <div className="bg-blue-500 rounded-full p-[2px] shadow-sm shadow-blue-200 flex-shrink-0"><CheckCircle2 className="w-3 h-3 text-white" /></div>
                       ) : (
                          <div className="border-[1.5px] border-slate-300 rounded-full w-4 h-4 flex-shrink-0"></div>
                       )}
                       <span className={`text-xs font-medium ${item.checked ? "text-slate-400 line-through decoration-slate-300" : "text-slate-600"}`}>
                          {item.label}
                       </span>
                    </div>
                 ))}
              </div>
           </div>

        </main>

      </div>
    </AuthGuard>
  );
}
