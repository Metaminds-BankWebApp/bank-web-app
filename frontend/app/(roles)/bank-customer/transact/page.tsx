/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import { AuthGuard } from "@/src/components/auth";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ArcElement,
  ChartOptions
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";
import { Bell, Mail, ArrowUpRight, Search } from "lucide-react";
import React from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ArcElement
);

const lineData = {
  labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
  datasets: [
    {
      fill: true,
      label: "Transactions",
      data: [1500, 2200, 1800, 2900, 2400, 3100, 3800, 2500, 3900, 2800, 3500, 2100],
      borderColor: "#0c3f4fff",
      backgroundColor: (context: any) => {
        const ctx = context.chart.ctx as CanvasRenderingContext2D;
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, "rgba(14, 79, 98, 0.5)");
        gradient.addColorStop(1, "rgba(14, 79, 98, 0.0)");
        return gradient;
      },
      tension: 0.4,
      pointRadius: 0,
      pointHoverRadius: 6,
    },
  ],
};

const lineOptions: ChartOptions<"line"> = {
  responsive: true,
  plugins: {
    legend: { display: false },
    tooltip: { 
      backgroundColor: "#094151ff",
      displayColors: false,
      callbacks: { label: (c) => `LKR ${c.raw}` }
    },
  },
  scales: {
    x: { 
        grid: { display: false }, 
        ticks: { color: "#9ca3af", font: { size: 10 } } 
    },
    y: { 
        beginAtZero: true, 
        grid: { color: "#f3f4f6" }, 
        ticks: { 
            maxTicksLimit: 6,
            callback: (val) => (val as number) >= 1000 ? `${(val as number)/1000}k` : val 
        },
        border: { display: false },
    },
  },
  interaction: {
      mode: "index",
      intersect: false,
  }
};

const doughnutData = {
  labels: ["Success", "Failed"],
  datasets: [
    {
      data: [89, 11],
      backgroundColor: ["#399FD8", "#0B3E5A"],
      borderWidth: 0,
      hoverOffset: 4,
    },
  ],
};

const doughnutOptions: ChartOptions<"doughnut"> = {
    cutout: "75%",
    plugins: {
        legend: { display: false },
        tooltip: { enabled: false }
    }
};

export default function TransactDashboard() {
  return (
    <AuthGuard requiredRole="BANK_CUSTOMER">
      <div className="flex flex-col gap-8 p-4 md:p-8 min-h-screen bg-white font-sans text-slate-800">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center bg-[#0B3E5A] text-white p-6 rounded-2xl shadow-lg gap-4">
          <h1 className="text-2xl font-bold tracking-wide w-full md:w-auto">Dashboard</h1>
          <div className="flex items-center gap-6 w-full md:w-auto justify-end">
            <div className="flex gap-4">
               <button className="relative p-2 hover:bg-white/10 rounded-full transition-colors"><Mail size={20} /><span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-[#0e4f62]"></span></button>
               <button className="relative p-2 hover:bg-white/10 rounded-full transition-colors"><Bell size={20} /><span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-[#0e4f62]"></span></button>
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

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           <div className="bg-[#0B3E5A] text-white p-6 rounded-2xl shadow-md h-36 flex flex-col justify-between relative overflow-hidden group">
               <div className="flex justify-between items-start z-10">
                   <span className="text-sm font-medium opacity-90">Current Balance</span>
                   <ArrowUpRight size={18} className="text-white/50" />
               </div>
               <div className="text-right z-10">
                   <span className="text-xs opacity-70 mr-1">LKR</span>
                   <span className="text-3xl font-bold">81,000</span>
               </div>
           </div>

           <div className="bg-[#000000] text-white p-6 rounded-2xl shadow-md h-36 flex flex-col justify-between relative overflow-hidden group">
               <div className="flex justify-between items-start z-10">
                   <span className="text-sm font-medium opacity-90">Total Transactions</span>
                   <ArrowUpRight size={18} className="text-white/50" />
               </div>
               <div className="text-right z-10">
                   <span className="text-xs opacity-70 mr-1">LKR</span>
                   <span className="text-3xl font-bold">175,000</span>
               </div>
           </div>

           <div className="bg-[#e0f7fa] text-[#0e4f62] p-6 rounded-2xl shadow-sm h-36 flex flex-col justify-between group">
               <div className="flex justify-between items-start">
                   <span className="text-sm font-medium opacity-80">Total Sent</span>
                   <ArrowUpRight size={18} className="text-[#0e4f62]/40" />
               </div>
               <div className="text-right">
                   <span className="text-xs opacity-60 mr-1">LKR</span>
                   <span className="text-3xl font-bold">100,500</span>
               </div>
           </div>

           <div className="bg-[#e0f7fa] text-[#0e4f62] p-6 rounded-2xl shadow-sm h-36 flex flex-col justify-between group">
               <div className="flex justify-between items-start">
                   <span className="text-sm font-medium opacity-80">Total Received</span>
                   <ArrowUpRight size={18} className="text-[#0e4f62]/40" />
               </div>
               <div className="text-right">
                   <span className="text-xs opacity-60 mr-1">LKR</span>
                   <span className="text-3xl font-bold">75,000</span>
               </div>
           </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           
           {/* Timeline Chart */}
           <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <div className="flex justify-between items-end mb-6">
                 <div>
                    <h2 className="text-lg font-bold text-[#0e4f62] mb-1">Transaction Timeline</h2> 
                 </div>
                 <div className="flex gap-2">
                    {["Daily", "Weekly", "Annually"].map(period => (
                       <button key={period} className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors ${period === "Annually" ? "bg-[#0b1a3a] text-white" : "text-slate-500 bg-slate-100 hover:bg-slate-200"}`}>
                          {period}
                       </button>
                    ))}
                 </div>
              </div>
              
              <div className="relative h-72 w-full">
                 <div className="absolute top-0 left-0">
                     <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Transactions 2026</p>
                     <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        <span className="text-xs font-bold text-green-600">1.3% VS LAST YEAR</span>
                     </div>
                 </div>
                 <div className="pt-10 h-full">
                    <Line options={lineOptions} data={lineData} />
                 </div>
              </div>
           </div>

           {/* Status Chart */}
           <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col items-center relative min-h-[400px]">
              <h2 className="w-full text-left text-lg font-bold text-[#0e4f62] mb-8">Transaction status</h2>
              
              <div className="relative w-48 h-48 flex-shrink-0">
                 <Doughnut data={doughnutData} options={doughnutOptions} />
                 {/* Center Text */}
                 <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-3xl font-bold text-[#0e4f62]">1.05</span>
                    <span className="text-xs text-slate-400 font-medium">Average range</span>
                 </div>
              </div>

              <div className="w-full mt-12 space-y-6">
                 <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-2">
                    <div className="flex items-center gap-3">
                       <span className="w-3 h-3 rounded-full bg-[#ef4444]"></span>
                       <span className="font-bold text-[#0e4f62]">Success</span>
                    </div>
                    <span className="text-slate-400 font-medium">410</span>
                 </div>
                 <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-2">
                    <div className="flex items-center gap-3">
                       <span className="w-3 h-3 rounded-full bg-[#2f9d94]"></span>
                       <span className="font-bold text-[#0e4f62]">Failed</span>
                    </div>
                    <span className="text-slate-400 font-medium">142</span>
                 </div>
              </div>
           </div>

        </div>

      </div>
    </AuthGuard>
  );
}
