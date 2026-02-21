"use client";

import { useState } from "react";
import { AuthGuard } from "@/src/components/auth";
import { useRouter } from "next/navigation";
import { 
  Check, 
  Trash2, 
  Edit2, 
  Info, 
  Plus, 
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  CreditCard,
  Briefcase,
  Banknote,
  FileText,
  AlertTriangle
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
import { useToast } from "@/src/components/ui/toast";
import { cn } from "@/src/lib/utils";

// --- Types ---
type Income = {
  id: string;
  type: string;
  amount: number;
  salaryType?: string;
  employmentType?: string;
  contractDuration?: string;
};

type Loan = {
  id: string;
  type: string;
  monthlyEMI: number;
  balance: number;
};

type Card = {
  id: string;
  limit: number;
  outstanding: number;
  provider: string; // e.g., "HSBK Platinum Visa"
};

type Liability = {
  id: string;
  description: string;
  amount: number;
};

// --- Main Application Component ---
export default function PublicCustomerApplicationPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    incomes: [] as Income[],
    loans: [] as Loan[],
    cards: [] as Card[],
    liabilities: [] as Liability[],
    missedPayments: 0,
    acceptedTerms: false,
  });

  // --- Step 1 State (Income) ---
  const [incomeType, setIncomeType] = useState("Salary Worker");
  const [salaryType, setSalaryType] = useState("Fixed");
  const [salaryAmount, setSalaryAmount] = useState("");
  const [employmentType, setEmploymentType] = useState("Permanent");
  const [contractDuration, setContractDuration] = useState("");

  // --- Step 2 State (Loans) ---
  const [loanType, setLoanType] = useState("");
  const [loanEMI, setLoanEMI] = useState("");
  const [loanBalance, setLoanBalance] = useState("");

  // --- Step 3 State (Cards) ---
  const [cardLimit, setCardLimit] = useState("");
  const [cardOutstanding, setCardOutstanding] = useState("");
  const [cardProvider, setCardProvider] = useState("Standard Card");

  // --- Step 4 State (Liabilities) ---
  const [liabilityDesc, setLiabilityDesc] = useState("");
  const [liabilityAmount, setLiabilityAmount] = useState("");

  // --- Handlers ---
  const handleAddIncome = () => {
    if (!salaryAmount) return;
    const newIncome: Income = {
      id: Math.random().toString(36).substr(2, 9),
      type: incomeType,
      amount: parseFloat(salaryAmount),
      salaryType,
      employmentType,
      contractDuration
    };
    setFormData(prev => ({ ...prev, incomes: [...prev.incomes, newIncome] }));
    setSalaryAmount("");
    setContractDuration("");
  };

  const handleAddLoan = () => {
    if (!loanType || !loanEMI || !loanBalance) return;
    const newLoan: Loan = {
      id: Math.random().toString(36).substr(2, 9),
      type: loanType,
      monthlyEMI: parseFloat(loanEMI),
      balance: parseFloat(loanBalance)
    };
    setFormData(prev => ({ ...prev, loans: [...prev.loans, newLoan] }));
    setLoanType("");
    setLoanEMI("");
    setLoanBalance("");
  };

  const handleAddCard = () => {
    if (!cardLimit || !cardOutstanding) return;
    const newCard: Card = {
      id: Math.random().toString(36).substr(2, 9),
      limit: parseFloat(cardLimit),
      outstanding: parseFloat(cardOutstanding),
      provider: cardProvider
    };
    setFormData(prev => ({ ...prev, cards: [...prev.cards, newCard] }));
    setCardLimit("");
    setCardOutstanding("");
  };

  const handleAddLiability = () => {
    if (!liabilityDesc || !liabilityAmount) return;
    const newLiability: Liability = {
      id: Math.random().toString(36).substr(2, 9),
      description: liabilityDesc,
      amount: parseFloat(liabilityAmount)
    };
    setFormData(prev => ({ ...prev, liabilities: [...prev.liabilities, newLiability] }));
    setLiabilityDesc("");
    setLiabilityAmount("");
  };

  const removeItem = (category: keyof typeof formData, id: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFormData(prev => ({ ...prev, [category]: (prev[category] as any[]).filter((item: any) => item.id !== id) }));
  };

  const totalIncome = formData.incomes.reduce((acc, curr) => acc + curr.amount, 0);
  const totalLoanCommitment = formData.loans.reduce((acc, curr) => acc + curr.monthlyEMI, 0);
  const totalLoanBalance = formData.loans.reduce((acc, curr) => acc + curr.balance, 0);
  const totalCardExposure = formData.cards.reduce((acc, curr) => acc + curr.limit, 0);
  const totalCardOutstanding = formData.cards.reduce((acc, curr) => acc + curr.outstanding, 0);
  const totalLiabilities = formData.liabilities.reduce((acc, curr) => acc + curr.amount, 0);

  const formatCurrency = (amount: number) => {
    return `LKR ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 5));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));
  const { showToast } = useToast();

  const submitApplication = () => {
    // Logic to submit data would go here
    // In a real app, you would send formData to the backend
    
    showToast({ 
      title: "Application Submitted", 
      description: "Your application has been received. Redirecting to dashboard...",
      type: "success"
    });
    
    setTimeout(() => {
      router.replace("/public-customer"); // Redirect to dashboard
    }, 1500);
  };

  return (
    <AuthGuard requiredRole="PUBLIC_CUSTOMER">
      <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4 pb-32 font-sans text-slate-800">
        
        {/* Header Logo */}
        <div className="w-full max-w-6xl flex justify-end mb-8">
           <h1 className="text-2xl font-bold text-[#0d3b66]">Prime<span className="text-[#3e9fd3]">Core</span></h1>
        </div>

        {/* Progress Steps */}
        <div className="w-full max-w-3xl mb-12">
           <div className="flex items-center justify-between relative">
              {/* Progress Line Background */}
              <div className="absolute left-0 top-1/2 w-full h-0.5 bg-slate-200 -z-10 transform -translate-y-1/2"></div>
              
              {/* Active Progress Line */}
              <div 
                className="absolute left-0 top-1/2 h-0.5 bg-[#3e9fd3] -z-10 transform -translate-y-1/2 transition-all duration-500 ease-in-out"
                style={{ width: `${((step - 1) / 3) * 100}%` }}
              ></div>

              {[
                { id: 1, label: "INCOME" },
                { id: 2, label: "LOANS" },
                { id: 3, label: "CARDS" },
                { id: 4, label: "LIABILITIES" }
              ].map((s) => (
                <div key={s.id} className="flex flex-col items-center gap-2 bg-slate-50 px-2">
                   <div 
                     className={cn(
                       "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-2",
                       step > s.id 
                         ? "bg-[#3e9fd3] border-[#3e9fd3] text-white" 
                         : step === s.id 
                           ? "bg-[#3e9fd3] border-[#3e9fd3] text-white shadow-[0_0_0_4px_rgba(62,159,211,0.2)]" 
                           : "bg-white border-slate-200 text-slate-400"
                     )}
                   >
                      {step > s.id ? <Check size={18} /> : s.id}
                   </div>
                   <span className={cn(
                     "text-[10px] font-bold tracking-widest uppercase transition-colors duration-300",
                     step >= s.id ? "text-[#3e9fd3]" : "text-slate-400"
                   )}>
                     {s.label}
                   </span>
                </div>
              ))}
           </div>
        </div>

        {/* --- STEP 1: INCOME --- */}
        {step === 1 && (
          <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
             
             {/* Left: Form */}
             <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 h-fit">
                <h2 className="text-xl font-bold text-slate-900 mb-2">Income Sources</h2>
                <p className="text-slate-500 mb-8 text-sm">Tell us about your monthly earnings. You can add multiple income types.</p>
                
                <div className="space-y-6">
                   <div>
                      <label className="text-xs font-bold text-slate-700 uppercase mb-2 block">Customer Income Type</label>
                      <Select value={incomeType} onValueChange={setIncomeType}>
                        <SelectTrigger className="h-12 bg-slate-50 border-slate-200">
                           <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="Salary Worker">Salary Worker</SelectItem>
                           <SelectItem value="Business">Business Owner</SelectItem>
                           <SelectItem value="Freelance">Freelance / Contract</SelectItem>
                        </SelectContent>
                      </Select>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-xs font-bold text-slate-700 uppercase mb-2 block">Salary Type</label>
                        <Select value={salaryType} onValueChange={setSalaryType}>
                           <SelectTrigger className="h-12 bg-slate-50 border-slate-200">
                              <SelectValue />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectItem value="Fixed">Fixed</SelectItem>
                              <SelectItem value="Variable">Variable</SelectItem>
                           </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-700 uppercase mb-2 block">Monthly Salary Amount (LKR)</label>
                        <div className="relative">
                           <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">LKR</span>
                           <Input 
                              type="number" 
                              className="h-12 pl-12 bg-slate-50 border-slate-200" 
                              placeholder="0.00" 
                              value={salaryAmount}
                              onChange={(e) => setSalaryAmount(e.target.value)}
                           />
                        </div>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-xs font-bold text-slate-700 uppercase mb-2 block">Employment Type</label>
                        <Select value={employmentType} onValueChange={setEmploymentType}>
                           <SelectTrigger className="h-12 bg-slate-50 border-slate-200">
                              <SelectValue />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectItem value="Permanent">Permanent</SelectItem>
                              <SelectItem value="Contract">Contract</SelectItem>
                              <SelectItem value="Probation">Probation</SelectItem>
                           </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-700 uppercase mb-2 block">Contract Duration (Months)</label>
                        <Input 
                           type="text" 
                           className="h-12 bg-slate-50 border-slate-200"
                           placeholder="e.g. 12" 
                           value={contractDuration}
                           onChange={(e) => setContractDuration(e.target.value)}
                        />
                      </div>
                   </div>

                   <Button 
                     onClick={handleAddIncome}
                     className="w-full h-12 bg-[#3e9fd3] hover:bg-[#2c8ac0] text-white font-semibold rounded-lg shadow-lg shadow-blue-500/20 mt-4"
                   >
                      <Plus className="w-5 h-5 mr-2" /> Add Income to List
                   </Button>
                </div>
             </div>

             {/* Right: Summary List */}
             <div className="h-fit space-y-6">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                   <div className="flex justify-between items-center mb-6">
                      <h3 className="font-bold text-slate-900">Added Income Sources</h3>
                      <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">{formData.incomes.length} Items</span>
                   </div>

                   {formData.incomes.length === 0 ? (
                      <div className="text-center py-12 text-slate-400">
                         <p>No income sources added yet.</p>
                      </div>
                   ) : (
                      <div className="space-y-4">
                         {/* Header */}
                         <div className="flex text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4">
                            <span className="w-1/2">Type</span>
                            <span className="w-1/3 text-right">Amount</span>
                            <span className="w-1/6 text-right">Actions</span>
                         </div>
                         
                         {/* Items */}
                         {formData.incomes.map((item) => (
                            <div key={item.id} className="bg-white border border-slate-100 rounded-xl p-4 flex items-center shadow-sm">
                               <div className="w-1/2">
                                  <p className="font-bold text-slate-800 text-sm">{item.type}</p>
                                  <p className="text-xs text-slate-500">{item.salaryType}</p>
                               </div>
                               <div className="w-1/3 text-right">
                                  <p className="font-bold text-slate-800 text-sm">{formatCurrency(item.amount)}</p>
                               </div>
                               <div className="w-1/6 flex justify-end gap-2">
                                  <button className="text-slate-400 hover:text-blue-500"><Edit2 size={14} /></button>
                                  <button onClick={() => removeItem("incomes", item.id)} className="text-slate-400 hover:text-red-500"><Trash2 size={14} /></button>
                               </div>
                            </div>
                         ))}
                      </div>
                   )}
                   
                   {formData.incomes.length > 0 && (
                      <div className="mt-8 pt-6 border-t border-slate-200 flex justify-between items-center">
                         <span className="text-slate-500 font-medium">Total Monthly Income</span>
                         <span className="text-[#3e9fd3] font-bold text-lg">{formatCurrency(totalIncome)}</span>
                      </div>
                   )}
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 text-blue-700 text-sm">
                   <Info className="flex-shrink-0 w-5 h-5" />
                   <p className="leading-relaxed">Adding all income sources accurately ensures a higher chance of approval for your application.</p>
                </div>
             </div>
          </div>
        )}

        {/* --- STEP 2: LOANS --- */}
        {step === 2 && (
          <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
             
             {/* Left: Form */}
             <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 h-fit">
                <h2 className="text-xl font-bold text-slate-900 mb-2">Add Loan Details</h2>
                <p className="text-slate-500 mb-8 text-sm">Please provide information about your current active loans.</p>
                
                <div className="space-y-6">
                   <div>
                      <label className="text-xs font-bold text-slate-700 uppercase mb-2 block">Loan Type</label>
                      <Select value={loanType} onValueChange={setLoanType}>
                        <SelectTrigger className="h-12 bg-slate-50 border-slate-200">
                           <SelectValue placeholder="Select loan type" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="Vehicle Loan">Vehicle Loan</SelectItem>
                           <SelectItem value="Personal Loan">Personal Loan</SelectItem>
                           <SelectItem value="Housing Loan">Housing Loan</SelectItem>
                           <SelectItem value="Education Loan">Education Loan</SelectItem>
                        </SelectContent>
                      </Select>
                   </div>

                   <div>
                     <label className="text-xs font-bold text-slate-700 uppercase mb-2 block">Monthly EMI (LKR)</label>
                     <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">LKR</span>
                        <Input 
                           type="number" 
                           className="h-12 pl-12 bg-slate-50 border-slate-200" 
                           placeholder="0.00" 
                           value={loanEMI}
                           onChange={(e) => setLoanEMI(e.target.value)}
                        />
                     </div>
                   </div>

                   <div>
                     <label className="text-xs font-bold text-slate-700 uppercase mb-2 block">Remaining Balance (LKR)</label>
                     <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">LKR</span>
                        <Input 
                           type="number" 
                           className="h-12 pl-12 bg-slate-50 border-slate-200" 
                           placeholder="0.00" 
                           value={loanBalance}
                           onChange={(e) => setLoanBalance(e.target.value)}
                        />
                     </div>
                   </div>

                   <Button 
                     onClick={handleAddLoan}
                     className="w-full h-12 bg-[#3e9fd3] hover:bg-[#2c8ac0] text-white font-semibold rounded-lg shadow-lg shadow-blue-500/20 mt-4"
                   >
                      <Plus className="w-5 h-5 mr-2" /> Add Loan Record
                   </Button>
                </div>
             </div>

             {/* Right: Summary List */}
             <div className="h-fit space-y-6">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                   <div className="flex justify-between items-center mb-6">
                      <h3 className="font-bold text-slate-900">Current Loans</h3>
                      <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">{formData.loans.length} Active Items</span>
                   </div>

                   {formData.loans.length === 0 ? (
                      <div className="text-center py-12 text-slate-400">
                         <p>No loans added yet.</p>
                      </div>
                   ) : (
                      <div className="space-y-4">
                         <div className="flex text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4">
                            <span className="w-1/3">Loan Type</span>
                            <span className="w-1/3 text-right">Monthly EMI</span>
                            <span className="w-1/3 text-right">Balance</span>
                            <span className="w-10"></span>
                         </div>
                         
                         {formData.loans.map((item) => (
                            <div key={item.id} className="bg-white border border-slate-100 rounded-xl p-4 flex items-center shadow-sm">
                               <div className="w-1/3 flex items-center gap-3">
                                  <div className={`p-2 rounded-lg ${item.type.includes("Vehicle") ? "bg-blue-50 text-blue-600" : "bg-emerald-50 text-emerald-600"}`}>
                                    {item.type.includes("Vehicle") ? <CreditCard size={14} /> : <Banknote size={14} />}
                                  </div>
                                  <p className="font-bold text-slate-800 text-sm">{item.type}</p>
                               </div>
                               <div className="w-1/3 text-right">
                                  <p className="font-bold text-slate-700 text-sm">{formatCurrency(item.monthlyEMI)}</p>
                               </div>
                               <div className="w-1/3 text-right">
                                  <p className="font-semibold text-slate-500 text-xs">{formatCurrency(item.balance)}</p>
                               </div>
                               <div className="w-10 flex justify-end">
                                  <button onClick={() => removeItem("loans", item.id)} className="text-slate-400 hover:text-red-500"><Trash2 size={14} /></button>
                               </div>
                            </div>
                         ))}
                      </div>
                   )}
                   
                   {formData.loans.length > 0 && (
                      <div className="mt-8 pt-6 border-t border-slate-200 flex justify-between items-center">
                         <span className="text-slate-500 font-medium">Total Commitment</span>
                         <span className="text-[#3e9fd3] font-bold text-lg">{formatCurrency(totalLoanCommitment)}</span>
                      </div>
                   )}
                </div>
             </div>
          </div>
        )}

        {/* --- STEP 3: CARDS --- */}
        {step === 3 && (
          <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
             
             {/* Left: Form */}
             <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 h-fit">
                <h2 className="text-xl font-bold text-slate-900 mb-2">Add Credit Card</h2>
                <p className="text-slate-500 mb-8 text-sm">Please provide details of your current active credit cards.</p>
                
                <div className="space-y-6">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-xs font-bold text-slate-700 uppercase mb-2 block">Credit Limit (LKR)</label>
                        <div className="relative">
                           <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">LKR</span>
                           <Input 
                              type="number" 
                              className="h-12 pl-12 bg-slate-50 border-slate-200" 
                              placeholder="500,000" 
                              value={cardLimit}
                              onChange={(e) => setCardLimit(e.target.value)}
                           />
                        </div>
                        <p className="text-[10px] text-slate-400 mt-1">Total sanctioned limit of your card.</p>
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-700 uppercase mb-2 block">Outstanding Balance (LKR)</label>
                        <div className="relative">
                           <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">LKR</span>
                           <Input 
                              type="number" 
                              className="h-12 pl-12 bg-slate-50 border-slate-200" 
                              placeholder="25,000" 
                              value={cardOutstanding}
                              onChange={(e) => setCardOutstanding(e.target.value)}
                           />
                        </div>
                        <p className="text-[10px] text-slate-400 mt-1">Current amount due as per latest statement.</p>
                      </div>
                   </div>

                   <Button 
                     onClick={handleAddCard}
                     className="w-40 h-12 bg-[#3e9fd3] hover:bg-[#2c8ac0] text-white font-semibold rounded-lg shadow-lg shadow-blue-500/20 mt-4"
                   >
                      <Plus className="w-5 h-5 mr-2" /> Add Card to List
                   </Button>
                </div>
             </div>

             {/* Right: Summary List */}
             <div className="h-fit space-y-6">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                   <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-2">
                         <CreditCard className="text-[#3e9fd3] w-5 h-5" />
                         <h3 className="font-bold text-slate-900">Your Credit Cards</h3>
                      </div>
                      <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">{formData.cards.length} Cards</span>
                   </div>

                   {formData.cards.length === 0 ? (
                      <div className="text-center py-12 text-slate-400">
                         <p>No cards added yet.</p>
                      </div>
                   ) : (
                      <div className="space-y-4">
                         <div className="flex text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4">
                            <span className="w-1/3">Limit</span>
                            <span className="w-1/3">Balance</span>
                            <span className="w-1/3 text-right">Actions</span>
                         </div>
                         
                         {formData.cards.map((item) => (
                            <div key={item.id} className="bg-white border border-slate-100 rounded-xl p-4 flex items-center shadow-sm text-sm">
                               <div className="w-1/3 font-bold text-slate-800">{formatCurrency(item.limit)}</div>
                               <div className="w-1/3 font-medium text-slate-600">{formatCurrency(item.outstanding)}</div>
                               <div className="w-1/3 flex justify-end gap-2">
                                  <button className="text-slate-400 hover:text-blue-500"><Edit2 size={14} /></button>
                                  <button onClick={() => removeItem("cards", item.id)} className="text-slate-400 hover:text-red-500"><Trash2 size={14} /></button>
                               </div>
                            </div>
                         ))}
                      </div>
                   )}
                   
                   {formData.cards.length > 0 && (
                      <div className="mt-8 pt-6 border-t border-slate-200">
                         <div className="flex justify-between items-center mb-2">
                             <span className="text-slate-500 text-sm">Total Exposure</span>
                             <span className="text-slate-900 font-bold">{formatCurrency(totalCardExposure)}</span>
                         </div>
                         <div className="flex justify-between items-center">
                             <span className="text-slate-500 text-sm">Total Outstanding</span>
                             <span className="text-slate-900 font-bold">{formatCurrency(totalCardOutstanding)}</span>
                         </div>
                      </div>
                   )}
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 text-blue-700 text-sm">
                   <Info className="flex-shrink-0 w-5 h-5" />
                   <div className="flex flex-col">
                     <span className="font-bold text-blue-800 mb-1">Why is this required?</span>
                     <p className="leading-relaxed text-xs">We analyze your debt-to-income ratio to offer you the best possible interest rates for your new PrimeCore account.</p>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* --- STEP 4: LIABILITIES --- */}
        {step === 4 && (
          <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
             
             {/* Left: Form */}
             <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 h-fit">
                <div className="flex items-center gap-2 mb-2">
                    <div className="bg-[#3e9fd3] p-1 rounded-md text-white"><FileText size={16} /></div>
                    <h2 className="text-xl font-bold text-slate-900">Liability Details</h2>
                </div>
                
                <div className="space-y-6 mt-8">
                   <div>
                      <label className="text-xs font-bold text-slate-700 uppercase mb-2 block">Description</label>
                      <Input 
                        placeholder="e.g. Rent, Leasing, Utilities" 
                        className="h-12 bg-slate-50 border-slate-200"
                        value={liabilityDesc}
                        onChange={(e) => setLiabilityDesc(e.target.value)}
                      />
                   </div>

                   <div>
                     <label className="text-xs font-bold text-slate-700 uppercase mb-2 block">Other Monthly Obligations Total (LKR)</label>
                     <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">LKR</span>
                        <Input 
                           type="number" 
                           className="h-12 pl-12 bg-slate-50 border-slate-200" 
                           placeholder="0.00" 
                           value={liabilityAmount}
                           onChange={(e) => setLiabilityAmount(e.target.value)}
                        />
                     </div>
                   </div>

                   <Button className="w-full h-12 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg mt-2" onClick={handleAddLiability}>
                      <Plus className="w-4 h-4 mr-2" /> Add Other Obligation
                   </Button>

                   <div className="mt-8 pt-8 border-t border-slate-100">
                      <div className="flex justify-between items-center mb-4">
                         <label className="text-sm font-medium text-slate-700">Missed Payments Count (last 12 months)</label>
                         <span className="text-[#3e9fd3] font-bold text-lg">{formData.missedPayments}</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="12" 
                        value={formData.missedPayments} 
                        onChange={(e) => setFormData(prev => ({ ...prev, missedPayments: parseInt(e.target.value) }))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#3e9fd3]"
                      />
                      <p className="text-[10px] text-slate-400 mt-2">Include any late payments on credit cards or loans.</p>
                   </div>
                </div>
             </div>

             {/* Right: Summary List */}
             <div className="h-fit space-y-6">
                
                {/* Reliability Score */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 flex items-center justify-between">
                   <div className="flex items-center gap-4">
                      <div className="p-3 bg-white rounded-lg shadow-sm text-blue-500">
                         <AlertTriangle size={20} />
                      </div>
                      <div>
                         <h4 className="font-bold text-slate-800 text-sm">Payment Reliability</h4>
                         <p className="text-xs text-slate-500">Status based on reported missed payments</p>
                      </div>
                   </div>
                   <span className={cn(
                     "px-3 py-1 rounded-full text-xs font-bold uppercase",
                     formData.missedPayments === 0 
                       ? "bg-emerald-100 text-emerald-600" 
                       : formData.missedPayments < 3 
                         ? "bg-amber-100 text-amber-600" 
                         : "bg-red-100 text-red-600"
                   )}>
                     {formData.missedPayments === 0 ? "Excellent" : formData.missedPayments < 3 ? "Review" : "High Risk"}
                   </span>
                </div>

                <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                   <div className="flex justify-between items-center mb-6">
                      <h3 className="font-bold text-slate-900 text-sm">Summary of Obligations</h3>
                      <span className="text-slate-400 text-xs">{formData.liabilities.length} Items Added</span>
                   </div>

                   {formData.liabilities.length === 0 ? (
                      <div className="text-center py-8 text-slate-400">
                         <p>No other obligations added.</p>
                      </div>
                   ) : (
                      <div className="space-y-4">
                         <div className="flex text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4">
                            <span className="w-1/2">Description</span>
                            <span className="w-1/3 text-right">Monthly Amount</span>
                            <span className="w-1/6 text-right">Action</span>
                         </div>
                         
                         {formData.liabilities.map((item) => (
                            <div key={item.id} className="bg-white hover:bg-slate-50 p-3 rounded-lg flex items-center border-b border-slate-50 last:border-0 transition-colors">
                               <div className="w-1/2">
                                  <p className="font-bold text-slate-800 text-sm">{item.description}</p>
                                  <p className="text-[10px] text-slate-400">Fixed Monthly</p>
                               </div>
                               <div className="w-1/3 text-right font-bold text-slate-700 text-sm">
                                  {formatCurrency(item.amount)}
                               </div>
                               <div className="w-1/6 flex justify-end">
                                  <button onClick={() => removeItem("liabilities", item.id)} className="text-slate-400 hover:text-red-500"><Trash2 size={14} /></button>
                               </div>
                            </div>
                         ))}
                      </div>
                   )}
                   
                   {formData.liabilities.length > 0 && (
                      <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
                         <span className="text-slate-800 font-bold text-sm">Total Obligations</span>
                         <span className="text-[#3e9fd3] font-bold">{formatCurrency(totalLiabilities)}</span>
                      </div>
                   )}
                </div>
             </div>
          </div>
        )}

        {/* --- STEP 5: REVIEW --- */}
        {step === 5 && (
          <div className="w-full max-w-4xl space-y-6 animate-in fade-in zoom-in-95 duration-500">
              <div className="text-center mb-8">
                 <h2 className="text-2xl font-bold text-slate-900 mb-2">Review Your Application</h2>
                 <p className="text-slate-500">Please double-check all information before submitting your financial onboarding request.</p>
              </div>

              {/* Income Review */}
              <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100">
                 <div className="flex items-center gap-2 mb-6 border-b border-slate-50 pb-4">
                    <Banknote className="text-[#3e9fd3]" size={20} />
                    <h3 className="font-bold text-slate-900">Income Sources</h3>
                    <button onClick={() => setStep(1)} className="ml-auto text-xs font-bold text-[#3e9fd3] flex items-center"><Edit2 size={12} className="mr-1" /> Edit</button>
                 </div>
                 <div className="space-y-3">
                    {formData.incomes.map(item => (
                       <div key={item.id} className="flex justify-between text-sm py-2">
                          <span className="font-medium text-slate-600">{item.type} ({item.salaryType})</span>
                          <span className="font-bold text-slate-900">{formatCurrency(item.amount)}</span>
                       </div>
                    ))}
                    <div className="flex justify-between text-sm py-2 border-t border-slate-100 pt-3 mt-2">
                       <span className="font-bold text-slate-400 uppercase text-xs">Total Monthly Income</span>
                       <span className="font-bold text-[#3e9fd3]">{formatCurrency(totalIncome)}</span>
                    </div>
                 </div>
              </div>

              {/* Loans Review */}
              <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100">
                 <div className="flex items-center gap-2 mb-6 border-b border-slate-50 pb-4">
                    <Briefcase className="text-[#3e9fd3]" size={20} />
                    <h3 className="font-bold text-slate-900">Existing Loans</h3>
                    <button onClick={() => setStep(2)} className="ml-auto text-xs font-bold text-[#3e9fd3] flex items-center"><Edit2 size={12} className="mr-1" /> Edit</button>
                 </div>
                 <div className="space-y-3">
                    {formData.loans.map(item => (
                       <div key={item.id} className="flex justify-between text-sm py-2">
                          <span className="font-medium text-slate-600">{item.type}</span>
                          <span className="font-bold text-slate-900">{formatCurrency(item.monthlyEMI)}</span>
                       </div>
                    ))}
                 </div>
              </div>

              {/* Cards & Liabilities Review */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100">
                    <div className="flex items-center gap-2 mb-6 border-b border-slate-50 pb-4">
                       <CreditCard className="text-[#3e9fd3]" size={20} />
                       <h3 className="font-bold text-slate-900">Credit Cards</h3>
                       <button onClick={() => setStep(3)} className="ml-auto text-xs font-bold text-[#3e9fd3] flex items-center"><Edit2 size={12} className="mr-1" /> Edit</button>
                    </div>
                    {formData.cards.map(item => (
                       <div key={item.id} className="flex justify-between text-sm py-2">
                          <span className="font-medium text-slate-600">{item.provider}</span>
                          <span className="font-bold text-slate-900">{formatCurrency(item.limit)}</span>
                       </div>
                    ))}
                 </div>

                 <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100">
                    <div className="flex items-center gap-2 mb-6 border-b border-slate-50 pb-4">
                       <AlertTriangle className="text-[#3e9fd3]" size={20} />
                       <h3 className="font-bold text-slate-900">Other Liabilities</h3>
                       <button onClick={() => setStep(4)} className="ml-auto text-xs font-bold text-[#3e9fd3] flex items-center"><Edit2 size={12} className="mr-1" /> Edit</button>
                    </div>
                    {formData.liabilities.length === 0 ? <p className="text-slate-400 text-sm text-center py-4">No additional liabilities reported.</p> : 
                       formData.liabilities.map(item => (
                          <div key={item.id} className="flex justify-between text-sm py-2">
                             <span className="font-medium text-slate-600">{item.description}</span>
                             <span className="font-bold text-slate-900">{formatCurrency(item.amount)}</span>
                          </div>
                    ))}
                 </div>
              </div>

              {/* Terms Warning */}
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start gap-3">
                 <Info className="flex-shrink-0 text-blue-600 w-5 h-5 mt-0.5" />
                 <p className="text-xs text-blue-800 leading-relaxed">
                    By clicking &quot;Submit Application&quot;, you confirm that all the information provided is accurate and you agree to our Terms of Service and Privacy Policy.
                 </p>
              </div>

              <div className="flex justify-center pt-4">
                 <Button onClick={submitApplication} className="bg-[#3e9fd3] hover:bg-[#2c8ac0] text-white px-12 py-6 rounded-lg font-bold text-lg shadow-xl shadow-blue-500/20">
                    Submit Application
                 </Button>
              </div>
          </div>
        )}

        {/* Global Navigation Buttons (Bottom) */}
        {step < 5 && (
           <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 py-4 px-6 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
              <div className="max-w-6xl mx-auto flex justify-between items-center">
                  <Button variant="outline" onClick={prevStep} disabled={step === 1} className="gap-2 border-slate-300 text-slate-600 hover:text-slate-900 hover:bg-slate-100 h-10 px-6">
                     <ArrowLeft size={16} /> Back
                  </Button>
                  
                  <div className="flex items-center gap-4">
                     <div className="hidden sm:flex flex-col items-end mr-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Next Step</span>
                        <span className="font-bold text-slate-800 text-xs">
                           {step === 1 ? "Loans" : step === 2 ? "Credit Cards" : step === 3 ? "Liabilities" : "Review"}
                        </span>
                     </div>
                     <Button onClick={nextStep} className="bg-[#3e9fd3] hover:bg-[#2c8ac0] text-white gap-2 px-8 h-10 rounded-lg shadow-lg shadow-blue-400/20">
                           Next <span className="hidden sm:inline">Section</span> <ArrowRight size={16} />
                     </Button>
                  </div>
              </div>
           </div>
        )}

      </div>
    </AuthGuard>
  );
}
