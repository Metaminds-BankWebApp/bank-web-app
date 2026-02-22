"use client";

import { SpendIqHeader } from "@/src/components/SpendIqHeader";

export default function CategoryAnalysisPage() {
  const categories = [
    {
      name: "Utilities",
      amount: 20000,
      percent: 32.2,
      expenses: 1,
      used: 200,
      total: 250,
    },
    {
      name: "Food & Dining",
      amount: 15000,
      percent: 25.2,
      expenses: 3,
      used: 156.75,
      total: 400,
    },
    {
      name: "Shopping",
      amount: 10000,
      percent: 19.3,
      expenses: 1,
      used: 120,
      total: 300,
    },
    {
      name: "Healthcare",
      amount: 5000,
      percent: 10.5,
      expenses: 1,
      used: 65,
      total: 100,
    },
    {
      name: "Entertainment",
      amount: 2000,
      percent: 8.0,
      expenses: 1,
      used: 50,
      total: 200,
    },
    {
      name: "Transportation",
      amount: 6000,
      percent: 4.8,
      expenses: 1,
      used: 30,
      total: 150,
    },
  ];

  return (
    <div className="p-8 space-y-8 bg-[#f4f6fb] min-h-screen">
      
      <SpendIqHeader title="Category Analysis" />

      {/* CHART SECTION */}
      <div className="bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-sm font-semibold text-gray-600 mb-6">
          Spending by Category
        </h2>

        {/* Fake Bar Chart (UI style) */}
        <div className="space-y-6">
          {categories.map((cat) => (
            <div key={cat.name}>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-gray-700">
                  {cat.name}
                </span>
                <span className="text-gray-500">
                  {cat.amount.toLocaleString()} LKR
                </span>
              </div>

              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-3 bg-[#0a234c] rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${cat.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CATEGORY CARDS */}
      <div className="grid md:grid-cols-3 gap-8">
        {categories.map((cat) => {
          const usagePercent = (cat.used / cat.total) * 100;

          return (
            <div
              key={cat.name}
              className="bg-white rounded-2xl shadow-md p-6 space-y-4 hover:shadow-lg transition"
            >
              {/* Header */}
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-semibold text-gray-700">
                  {cat.name}
                </h3>
                <span className="text-xs bg-[#0a234c] text-white px-3 py-1 rounded-full">
                  On Track
                </span>
              </div>

              {/* Amount */}
              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  {cat.amount.toLocaleString()}.00 LKR
                </h2>
                <p className="text-xs text-gray-500">
                  {cat.percent}% of total expenses
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {cat.expenses} expense{cat.expenses > 1 && "s"}
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
                    style={{ width: `${usagePercent}%` }}
                  />
                </div>

                <p className="text-xs text-gray-400 mt-2">
                  ${cat.used.toFixed(2)} / ${cat.total.toFixed(2)}
                </p>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}