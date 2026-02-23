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
import type { Chart } from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";
import { ArrowUpRight } from "lucide-react";
import TransactHeader from "@/src/components/ui/Transact-Header";
import { Card } from "@/components/ui/card";

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

/* =======================
   Line Chart Config
======================= */

const lineData = {
  labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
  datasets: [
    {
      fill: true,
      label: "Transactions",
      data: [1500, 2200, 1800, 2900, 2400, 3100, 3800, 2500, 3900, 2800, 3500, 2100],
      borderColor: "#0e4f62",
      backgroundColor: (context: any) => {
        const ctx = context.chart.ctx as CanvasRenderingContext2D;
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, "rgba(14,79,98,0.5)");
        gradient.addColorStop(1, "rgba(14,79,98,0.0)");
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
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: "#094151",
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
      grid: { color: "#f1f5f9" },
      ticks: {
        maxTicksLimit: 6,
        callback: (val) =>
          (val as number) >= 1000 ? `${(val as number) / 1000}k` : val,
      },
      border: { display: false },
    },
  },
  interaction: {
    mode: "index",
    intersect: false,
  }
};

/* =======================
   Doughnut Chart Config
======================= */

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
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false }
  }
};

/* =======================
   Component
======================= */

export default function TransactDashboard() {
  return (
    <AuthGuard requiredRole="BANK_CUSTOMER">
      <div className="bg-white px-4 sm:px-8 py-4 sm:py-6">
        <TransactHeader title="Dashboard" subtitle="Dineth dovindu" />

        <section className=" max-w-full mx-auto mt-8">

          <Card className="rounded-xl shadow-sm p-6 sm:p-8 w-full border min-h-[600px] md:min-h-[700px] lg:min-h-[800px]">

            {/* =======================
                Stats Section
            ======================= */}
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">

              {[
                { title: "Current Balance", amount: "81,000", dark: true },
                { title: "Total Transactions", amount: "175,000", dark: true },
                { title: "Total Sent", amount: "100,500" },
                { title: "Total Received", amount: "75,000" },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`rounded-2xl shadow-sm p-4 sm:p-6 min-h-[120px] sm:min-h-[150px] flex flex-col justify-between ${
                    item.dark
                      ? "bg-[#0B3E5A] text-white"
                      : "bg-[#e0f7fa] text-[#0e4f62]"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-medium opacity-90">
                      {item.title}
                    </span>
                    <ArrowUpRight size={18} className="opacity-50" />
                  </div>

                  <div className="mt-3 sm:mt-0 text-left sm:text-right">
                    <span className="text-xs opacity-70 block sm:inline sm:mr-1">LKR</span>
                    <span className="text-2xl sm:text-3xl font-bold block sm:inline">
                      {item.amount}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* =======================
                Charts Section
            ======================= */}
            <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">

              {/* Line Chart */}
              <div className="md:col-span-2 lg:col-span-2 bg-white rounded-3xl p-5 sm:p-8 shadow-sm">
                <h2 className="text-lg font-bold text-[#0e4f62] mb-6">
                  Transaction Timeline
                </h2>

                <div className="relative w-full h-[220px] sm:h-[260px] md:h-[300px] lg:h-[350px]">
                  <Line options={lineOptions} data={lineData} />
                </div>
              </div>

              {/* Doughnut Chart */}
              <div className="bg-white rounded-3xl p-5 sm:p-8 shadow-sm flex flex-col items-center">
                <h2 className="w-full text-left text-lg font-bold text-[#0e4f62] mb-6">
                  Transaction Status
                </h2>

                <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-48 lg:h-48">
                  <Doughnut data={doughnutData} options={doughnutOptions} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-2xl sm:text-3xl font-bold text-[#0e4f62]">
                      1.05
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      Average range
                    </span>
                  </div>
                </div>

                <div className="w-full mt-10 space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium text-[#0e4f62]">Success</span>
                    <span className="text-slate-400">410</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-[#0e4f62]">Failed</span>
                    <span className="text-slate-400">142</span>
                  </div>
                </div>
              </div>

            </div>

          </Card>

        </section>
      </div>
    </AuthGuard>
  );
}
