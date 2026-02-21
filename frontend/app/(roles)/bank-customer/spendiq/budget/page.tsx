"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { SpendIqHeader } from "@/src/components/SpendIqHeader";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function CategoryAnalysisPage() {
  const categories = [
    { name: "Utilities", amount: 200 },
    { name: "Food", amount: 155 },
    { name: "Shopping", amount: 120 },
    { name: "Healthcare", amount: 65 },
    { name: "Entertainment", amount: 50 },
    { name: "Transportation", amount: 30 },
  ];

  const data = {
    labels: categories.map((c) => c.name),
    datasets: [
      {
        data: categories.map((c) => c.amount),
        backgroundColor: "#3b82f6",
        borderRadius: 6,
        barThickness: 60,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "#e5e7eb",
        },
        ticks: {
          color: "#6b7280",
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#6b7280",
        },
      },
    },
    animation: {
      duration: 1200,
      easing: "easeOutQuart" as const,
    },
  };

  const cards = [
    {
      name: "Utilities",
      amount: "20000.00",
      percent: "32.2%",
      expenses: "1 expense",
      used: 200,
      total: 250,
    },
    {
      name: "Food & Dining",
      amount: "15000.00",
      percent: "25.2%",
      expenses: "3 expenses",
      used: 156.75,
      total: 400,
    },
    {
      name: "Shopping",
      amount: "10000.00",
      percent: "19.3%",
      expenses: "1 expense",
      used: 120,
      total: 300,
    },
    {
      name: "Healthcare",
      amount: "5000.00",
      percent: "10.5%",
      expenses: "1 expense",
      used: 65,
      total: 100,
    },
    {
      name: "Entertainment",
      amount: "2000.00",
      percent: "8.0%",
      expenses: "1 expense",
      used: 50,
      total: 200,
    },
    {
      name: "Transportation",
      amount: "6000.00",
      percent: "4.8%",
      expenses: "1 expense",
      used: 30,
      total: 150,
    },
  ];

  return (
    <div className="p-8 space-y-8 bg-[#f4f6fb] min-h-screen">

      <SpendIqHeader title="Category Analysis" />

      {/* ---------------- CHART ---------------- */}
      <div className="bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-sm font-semibold text-gray-600 mb-6">
          Spending by Category
        </h2>

        <Bar data={data} options={options} height={120} />
      </div>

      {/* ---------------- CARDS ---------------- */}
      <div className="grid md:grid-cols-3 gap-8">
        {cards.map((card) => {
          const percent = (card.used / card.total) * 100;

          return (
            <div
              key={card.name}
              className="bg-white rounded-2xl shadow-md p-6 space-y-5"
            >
              {/* Header */}
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-semibold text-gray-700">
                  {card.name}
                </h3>
                <span className="text-xs bg-black text-white px-3 py-1 rounded-full">
                  On Track
                </span>
              </div>

              {/* Amount */}
              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  {card.amount} LKR
                </h2>
                <p className="text-xs text-gray-500">
                  {card.percent} of total expenses
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {card.expenses}
                </p>
              </div>

              {/* Budget Usage */}
              <div>
                <p className="text-xs text-gray-500 mb-2">
                  Budget Usage
                </p>

                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-2 bg-black rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${percent}%` }}
                  />
                </div>

                <p className="text-xs text-gray-400 mt-2">
                  ${card.used.toFixed(2)} / ${card.total.toFixed(2)}
                </p>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}