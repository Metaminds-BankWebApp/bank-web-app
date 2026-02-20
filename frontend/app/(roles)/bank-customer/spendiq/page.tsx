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
          
        </div>

        {/* GLASS BUDGET SECTION */}
        <div className="backdrop-blur-xl bg-white/50 border border-white/40 shadow-2xl rounded-2xl p-6 transition hover:shadow-3xl">
          <h2 className="text-sm font-semibold mb-6 text-gray-700">
            Budget Usage by Category
          </h2>

          <div className="space-y-6">
            {budgetCategories.map((cat) => {
              const percent = (cat.used / cat.total) * 100;

              return (
                <div key={cat.name}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-gray-800">
                      {cat.name}
                    </span>
                    <span className="text-gray-600">
                      {cat.used} / {cat.total} LKR
                    </span>
                  </div>

                  <div className="h-3 bg-white/60 rounded-full overflow-hidden">
                    <div
                      className="h-3 bg-[#0a234c] rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* -------- GLASS RECENT EXPENSES -------- */}
      <div className="backdrop-blur-xl bg-white/50 border border-white/40 shadow-2xl rounded-2xl p-6">
        <h2 className="text-sm font-semibold mb-6 text-gray-700">
          Recent Expenses
        </h2>

        <div className="space-y-4">
          {recentExpenses.map((exp, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center bg-white/60 p-4 rounded-xl transition hover:bg-white/80"
            >
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-medium text-gray-800">
                    {exp.title}
                  </span>
                  <span className="text-xs bg-[#0a234c]/10 text-[#0a234c] px-2 py-1 rounded-full">
                    {exp.payment}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {exp.description}
                </p>
                <p className="text-xs text-gray-500">
                  {exp.date}
                </p>
              </div>

              <div className="font-semibold text-[#0a234c]">
                {exp.amount.toLocaleString()} LKR
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* -------- Glass Card Component -------- */

function GlassCard({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: string;
  subtitle: string;
}) {
  return (
    <div className="backdrop-blur-xl bg-white/50 border border-white/40 shadow-2xl rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02]">
      <p className="text-sm text-gray-600">{title}</p>
      <h2 className="text-xl font-bold text-[#0a234c] mt-2">
        {value}
      </h2>
      <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
    </div>
  );
}