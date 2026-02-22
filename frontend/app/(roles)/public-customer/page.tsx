"use client";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { SpendIqHeader } from "@/src/components/SpendIqHeader";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function SpendIQDashboard() {
  const expenseData = [
    { name: "Utilities", value: 20000 },
    { name: "Food & Dining", value: 15000 },
    { name: "Shopping", value: 10000 },
    { name: "Healthcare", value: 5000 },
    { name: "Entertainment", value: 2000 },
    { name: "Transportation", value: 6000 },
  ];

  const total = expenseData.reduce((acc, item) => acc + item.value, 0);

  const data = {
    labels: expenseData.map((item) => item.name),
    datasets: [
      {
        data: expenseData.map((item) => item.value),
        backgroundColor: [
          "#0a234c",
          "#163d7a",
          "#1f4f9c",
          "#2962c9",
          "#3b82f6",
          "#60a5fa",
        ],
        borderWidth: 0,
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: "70%",
    animation: {
      duration: 1200,
      easing: "easeOutCubic" as const,
    },
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          padding: 20,
          boxWidth: 14,
        },
      },
    },
  };

  const budgetCategories = [
    { name: "Food & Dining", used: 156.75, total: 400 },
    { name: "Transportation", used: 120, total: 300 },
    { name: "Shopping", used: 200, total: 500 },
    { name: "Entertainment", used: 80, total: 250 },
  ];

  const recentExpenses = [
    {
      title: "Food & Dining",
      payment: "Card",
      description: "Lunch at downtown cafe",
      amount: 5000,
      date: "Feb 8, 2026",
    },
    {
      title: "Shopping",
      payment: "Online",
      description: "New running shoes",
      amount: 3000,
      date: "Feb 7, 2026",
    },
  ];

  return (
    <div className="p-6 space-y-8 bg-gradient-to-br from-[#f0f4ff] to-[#e6ecf9] min-h-screen">

      <SpendIqHeader title="SpendIQ – Expense Overview" />
      

      {/* -------- GLASS SUMMARY CARDS -------- */}
      <div className="grid md:grid-cols-4 gap-6">
        
        <GlassCard
          title="Total Expenses"
          value="LKR 25,600"
          subtitle="This month"
        />
        <GlassCard
          title="Monthly Budget"
          value="LKR 42,000"
          subtitle="Total allocated"
        />
        <GlassCard
          title="Remaining Budget"
          value="LKR 17,000"
          subtitle="Under budget"
        />
        <GlassCard
          title="Savings Estimate"
          value="LKR 20,000"
          subtitle="Potential savings"
        />
      </div>

      {/* -------- CHART + BUDGET -------- */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* GLASS CHART */}
        <div className="relative backdrop-blur-xl bg-white/50 border border-white/40 shadow-2xl rounded-2xl p-6 transition hover:shadow-3xl">
          <h2 className="text-sm font-semibold mb-4 text-gray-700">
            Expense by Category
          </h2>

          <div className="relative h-80 flex items-center justify-center">
            <Doughnut data={data} options={options} />
            <div className="absolute text-center">
              <p className="text-xs text-gray-600">Total</p>
              <p className="text-lg font-bold text-[#0a234c]">
                {total.toLocaleString()} LKR
              </p>
              <br></br><br></br><br></br><br></br>
            </div>
            
          </div>
          
          <div className="flex items-center gap-8">
             {/* Profile Completion Widget */}
             <div className="hidden md:flex flex-col items-end">
                <div className="flex justify-between w-64 mb-1.5">
                    <span className="text-xs text-white/90 font-medium">15% Profile Completion</span>
                    <span className="text-xs text-blue-400 font-bold tracking-wider">Getting Started</span>
                </div>
                <div className="w-64 h-2 bg-blue-900/50 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
                   <div className="h-full w-[15%] bg-blue-400 rounded-full shadow-[0_0_15px_rgba(96,165,250,0.6)]"></div>
                </div>
             </div>
             
             <LogoutButton className="text-white/70 hover:text-white hover:bg-white/10"/>
          </div>
        </header>


        <main className="relative z-10 flex-1 w-full max-w-[1600px] mx-auto p-8 md:px-12 flex flex-col justify-center">
            
            <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-16 items-start flex-1 mb-16">
                {/* Left Column: Text & CTA */}
                <div className="flex flex-col justify-center space-y-8 sticky top-24">
                    <h1 className="text-5xl md:text-6xl font-bold text-white leading-[1.1] tracking-tight">
                       Welcome to PrimeCore <br />
                       <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">Public Access</span>
                    </h1>
                    
                    <p className="text-slate-300 text-lg max-w-lg leading-relaxed font-light">
                       Start your journey to financial freedom. Complete your application to unlock full banking features and personalized insights.
                    </p>
                    
                    <div className="pt-2">
                       <Link href="/public-customer/application">
                           <Button className="bg-[#3e9fd3] hover:bg-[#2c8ac0] text-white rounded-full px-8 py-6 text-base font-semibold shadow-[0_10px_30px_-10px_rgba(62,159,211,0.5)] transition-all hover:scale-105 hover:shadow-[0_20px_40px_-10px_rgba(62,159,211,0.6)]">
                              Start Application <ArrowRight className="ml-2 w-4 h-4" />
                           </Button>
                       </Link>
                    </div>

                  <div className="h-3 bg-white/60 rounded-full overflow-hidden">
                    <div
                      className="h-3 bg-[#0a234c] rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>

                {/* Right Column: Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                   {features.map((item, i) => (
                      <div key={i} className={`group h-full ${item.locked ? 'cursor-not-allowed' : ''}`}>
                         <Link href={item.locked ? "#" : item.href} className={`block h-full ${item.locked ? 'pointer-events-none' : ''}`}>
                            <div className={`bg-white rounded-[2rem] p-8 h-full min-h-[220px] flex flex-col justify-between shadow-xl transition-all duration-300 relative overflow-hidden ${!item.locked ? 'hover:-translate-y-2 hover:shadow-2xl group-hover:ring-2 ring-white/20' : 'opacity-80 grayscale-[0.8]'}`}>
                                
                                {item.locked && (
                                    <div className="absolute top-4 right-4 z-20">
                                        <div className="bg-slate-800/80 text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-semibold backdrop-blur-sm shadow-md">
                                            <Lock className="w-3 h-3" /> Locked
                                        </div>
                                    </div>
                                )}

                                <div className="flex justify-between items-start mb-6">
                                <div className={`w-12 h-12 rounded-2xl ${item.iconBg} flex items-center justify-center ${item.iconColor} transition-transform ${!item.locked && 'group-hover:scale-110'} duration-300`}>
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
                                    <span className={`text-[10px] font-bold ${item.progressText === "Ultra" ? "text-blue-600" : item.progressText === "Incomplete" ? "text-slate-400" : item.progressText === "Locked" ? "text-slate-500" : "text-emerald-600"}`}>
                                        {item.progressText}
                                    </span>
                                </div>
                                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                    <div className={`h-full ${item.progressColor} rounded-full transition-all duration-1000 ease-out`} style={{ width: `${item.progressValue}%` }}></div>
                                </div>
                                </div>

                            </div>
                         </Link>
                      </div>
                   ))}
                </div>
            </div>

            {/* Bottom Section: Checklist */}
            <div className="mt-8 bg-white rounded-[1.5rem] p-4 pr-12 pl-8 flex flex-col xl:flex-row items-center gap-8 shadow-2xl shadow-black/10 max-w-full">
                <div className="flex items-center gap-4 min-w-max border-b xl:border-b-0 xl:border-r border-slate-100 pb-4 xl:pb-0 xl:pr-8">
                    <div className="bg-slate-50 p-2 rounded-full">
                        <CheckCircle2 className="w-5 h-5 text-blue-500" />
                    </div>
                    <span className="text-slate-900 font-bold text-lg">Next Steps</span>
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