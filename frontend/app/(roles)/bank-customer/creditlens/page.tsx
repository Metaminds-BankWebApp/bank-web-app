"use client";

import { AuthGuard } from "@/src/components/auth";
import { 
  Bell, 
  Mail, 
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Shield,
  Clock,
  CreditCard,
  ArrowUpRight
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler,
  ChartEvent,
  ActiveElement,
} from "chart.js";

ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler
);

export default function CreditLensDashboard() {
  
  // Gauge Chart Data (Credit Score)
  const score = 780;
  const maxScore = 850;
  
  const gaugeData = {
    labels: ["Score", "Remaining"],
    datasets: [
      {
        data: [score, maxScore - score],
        backgroundColor: ["#4ade80", "#e2e8f0"], // Green for good, slate for empty
        borderWidth: 0,
        circumference: 180,
        rotation: 270,
        cutout: "85%",
        borderRadius: 10,
      },
    ],
  };

  const gaugeOptions = {
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  // Score History Data
  const historyData = {
    labels: ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb"],
    datasets: [
      {
        label: "Credit Score",
        data: [745, 750, 755, 760, 772, 775, 780],
        borderColor: "#0a234c",
        backgroundColor: (context: { chart: { ctx: CanvasRenderingContext2D } }) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "rgba(10, 35, 76, 0.2)");
          gradient.addColorStop(1, "rgba(10, 35, 76, 0)");
          return gradient;
        },
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#0a234c",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 4,
      },
    ],
  };

  const historyOptions = {
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        min: 700,
        max: 850,
        grid: { color: "#f1f5f9" },
        ticks: { font: { size: 10 } },
      },
      x: {
        grid: { display: false },
        ticks: { font: { size: 10 } },
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <AuthGuard requiredRole="BANK_CUSTOMER">
      <div className="flex flex-col gap-6 p-4 md:p-8 min-h-screen bg-white font-sans text-slate-800">
        
         {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center bg-[#0a234c] text-white p-3 rounded-2xl shadow-lg gap-4">
          <h1 className="text-xl font-bold tracking-wide w-full md:w-auto">Credit Risk Overview</h1>
          <div className="flex items-center gap-6 w-full md:w-auto justify-end">
            <div className="flex gap-4">
               <button className="relative p-2 hover:bg-white/10 rounded-full transition-colors"><Mail size={20} /><span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-[#0a234c]"></span></button>
               <button className="relative p-2 hover:bg-white/10 rounded-full transition-colors"><Bell size={20} /><span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-[#0a234c]"></span></button>
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

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Credit Score Gauge Card */}
          <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm flex flex-col items-center justify-center relative">
            <h2 className="text-lg font-bold text-slate-900 absolute top-8 left-8">Current Score</h2>
            <div className="w-64 h-32 mt-10 relative">
               <Doughnut data={gaugeData} options={gaugeOptions} />
               <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
                  <span className="text-5xl font-bold text-[#0a234c]">{score}</span>
                  <span className="text-emerald-500 font-bold text-sm bg-emerald-50 px-3 py-1 rounded-full mt-2">Excellent</span>
               </div>
            </div>
            <p className="text-center text-slate-500 text-sm mt-8 max-w-[200px]">
               Your score is higher than 85% of customers. Great job!
            </p>
          </div>

          {/* History Chart */}
          <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm lg:col-span-2">
             <div className="flex justify-between items-center mb-6">
               <h2 className="text-lg font-bold text-slate-900">Score History</h2>
               <Button variant="outline" size="sm" className="text-xs border-slate-200">Last 6 Months</Button>
             </div>
             <div className="h-64">
                <Line data={historyData} options={historyOptions} />
             </div>
          </div>

        </div>

        {/* Risk Factors Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {/* Factor 1 */}
           <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                 <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                    <Clock size={24} />
                 </div>
                 <BadgeCheck className="text-emerald-500" />
              </div>
              <h3 className="font-bold text-slate-900 mb-1">Payment History</h3>
              <p className="text-sm text-slate-500 mb-4">100% On Time</p>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                 <div className="bg-blue-600 h-full w-full"></div>
              </div>
           </div>

           {/* Factor 2 */}
           <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                 <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                    <CreditCard size={24} />
                 </div>
                 <BadgeCheck className="text-emerald-500" />
              </div>
              <h3 className="font-bold text-slate-900 mb-1">Utilization</h3>
              <p className="text-sm text-slate-500 mb-4">12% Used</p>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                 <div className="bg-indigo-600 h-full w-[12%]"></div>
              </div>
           </div>

           {/* Factor 3 */}
           <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                 <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                    <Shield size={24} />
                 </div>
                 <BadgeAlert className="text-amber-500" />
              </div>
              <h3 className="font-bold text-slate-900 mb-1">Credit Age</h3>
              <p className="text-sm text-slate-500 mb-4">2 Years 4 Mos</p>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                 <div className="bg-amber-500 h-full w-[40%]"></div>
              </div>
           </div>

           {/* Factor 4 */}
           <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                 <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                    <TrendingUp size={24} />
                 </div>
                 <BadgeCheck className="text-emerald-500" />
              </div>
              <h3 className="font-bold text-slate-900 mb-1">Total Accounts</h3>
              <p className="text-sm text-slate-500 mb-4">8 Active</p>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                 <div className="bg-purple-600 h-full w-[80%]"></div>
              </div>
           </div>
        </div>

        {/* Offers Section */}
        <div className="bg-[#0a234c] rounded-3xl p-8 text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
           <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                 <h2 className="text-2xl font-bold mb-2">Pre-Approved for Platinum Card</h2>
                 <p className="text-slate-300 max-w-lg">Based on your excellent credit score, you are eligible for our lowest interest rate platinum credit card with zero annual fees.</p>
              </div>
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-8 py-6 rounded-xl shadow-lg shadow-emerald-900/20 flex items-center gap-2">
                 Apply Now <ArrowUpRight size={20} />
              </Button>
           </div>
        </div>

      </div>
    </AuthGuard>
  );
}

// Icons helper components since I didn't import them correctly above
function BadgeCheck({ className }: { className?: string }) {
   return <CheckCircle2 size={18} className={className} />;
}

function BadgeAlert({ className }: { className?: string }) {
   return <AlertCircle size={18} className={className} />;
}
