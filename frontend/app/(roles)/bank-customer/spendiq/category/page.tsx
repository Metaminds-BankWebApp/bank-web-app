"use client";

import { Mail, Bell, Plus } from "lucide-react";

export default function CategoryAnalysisPage() {
  const categories = [
    {
      name: "Utilities",
      amount: 20000,
      percentage: 32.2,
      expenses: 1,
      budgetUsed: 200,
      budgetTotal: 250,
    },
    {
      name: "Food & Dining",
      amount: 15000,
      percentage: 25.2,
      expenses: 3,
      budgetUsed: 156.75,
      budgetTotal: 400,
    },
    {
      name: "Shopping",
      amount: 10000,
      percentage: 19.3,
      expenses: 1,
      budgetUsed: 120,
      budgetTotal: 300,
    },
    {
      name: "Healthcare",
      amount: 5000,
      percentage: 10.5,
      expenses: 1,
      budgetUsed: 65,
      budgetTotal: 100,
    },
    {
      name: "Entertainment",
      amount: 2000,
      percentage: 8.0,
      expenses: 1,
      budgetUsed: 50,
      budgetTotal: 200,
    },
    {
      name: "Transportation",
      amount: 6000,
      percentage: 4.8,
      expenses: 1,
      budgetUsed: 30,
      budgetTotal: 150,
    },
  ];

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <header className="flex justify-between items-center bg-[#0a234c] text-white p-4 rounded-2xl shadow-lg">
        <h1 className="text-xl font-bold">Category Analysis</h1>

        <div className="flex items-center gap-6">
          <Mail size={20} />
          <Bell size={20} />
          <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-sm font-medium">
            <Plus size={16} />
            Add Expense
          </button>
        </div>
      </header>

      {/* BAR CHART (Simple Mock Version) */}
      <div className="bg-white rounded-xl p-6 shadow border">
        <h2 className="text-sm font-semibold mb-4 text-gray-600">
          Spending by Category
        </h2>

        <div className="space-y-4">
          {categories.map((cat) => (
            <div key={cat.name}>
              <div className="flex justify-between text-sm mb-1">
                <span>{cat.name}</span>
                <span>{cat.amount.toLocaleString()} LKR</span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full">
                <div
                  className="h-3 bg-blue-500 rounded-full"
                  style={{ width: `${cat.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CATEGORY CARDS */}
      <div className="grid md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="bg-white rounded-xl p-6 shadow border space-y-3"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">{cat.name}</h3>
              <span className="text-xs bg-black text-white px-3 py-1 rounded-full">
                On Track
              </span>
            </div>

            <h2 className="text-xl font-bold">
              {cat.amount.toLocaleString()} LKR
            </h2>

            <p className="text-sm text-gray-500">
              {cat.percentage}% of total expenses
            </p>

            <div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-black rounded-full"
                  style={{
                    width: `${
                      (cat.budgetUsed / cat.budgetTotal) * 100
                    }%`,
                  }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                ${cat.budgetUsed.toFixed(2)} / $
                {cat.budgetTotal.toFixed(2)}
              </p>
            </div>

            <p className="text-xs text-gray-400">
              {cat.expenses} expense
              {cat.expenses > 1 && "s"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
