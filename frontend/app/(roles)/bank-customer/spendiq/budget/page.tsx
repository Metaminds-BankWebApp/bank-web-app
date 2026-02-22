"use client";

import { SpendIqHeader } from "@/src/components/SpendIqHeader";
import { Pencil } from "lucide-react";

export default function BudgetManagementPage() {
  const summary = {
    totalBudget: 1400,
    totalSpent: 621.75,
    remaining: 778.25,
    usage: 44.4,
  };

  const categories = [
    { name: "Food & Dining", budget: 400, spent: 156.75, percent: 39.2 },
    { name: "Transportation", budget: 400, spent: 80, percent: 20.0 },
    { name: "Shopping", budget: 400, spent: 160, percent: 40.0 },
    { name: "Entertainment", budget: 400, spent: 100, percent: 25.0 },
  ];

  return (
    <div className="p-8 space-y-8 bg-[#f4f6fb] min-h-screen">
      <SpendIqHeader title="Budget Management" />

      <p className="text-sm text-gray-500">
        Set and monitor spending limits by category
      </p>

      {/* ---------------- SUMMARY CARDS ---------------- */}
      <div className="grid md:grid-cols-4 gap-6">
        <SummaryCard
          title="Total Budget"
          value={`LKR ${summary.totalBudget.toFixed(2)}`}
          subtitle="6 categories set"
        />
        <SummaryCard
          title="Total Spent"
          value={`LKR ${summary.totalSpent.toFixed(2)}`}
          subtitle="This month"
        />
        <SummaryCard
          title="Remaining"
          value={`LKR ${summary.remaining.toFixed(2)}`}
          subtitle="Within budget"
          highlight="green"
        />
        <SummaryCard
          title="Budget Usage"
          value={`${summary.usage}%`}
          subtitle="Overall progress"
        />
      </div>

      {/* ---------------- CATEGORY BUDGETS ---------------- */}
      <div className="bg-white rounded-2xl shadow-md p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-semibold text-gray-700">
            Category Budgets
          </h2>
          <p className="text-xs text-gray-400">
            Monthly budget limits are optional
          </p>
        </div>

        {categories.map((cat) => {
          const remaining = cat.budget - cat.spent;

          return (
            <div
              key={cat.name}
              className="border rounded-xl p-5 space-y-4 bg-gray-50"
            >
              {/* Header Row */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-gray-700">
                    {cat.name}
                  </h3>
                  <span className="text-xs bg-black text-white px-3 py-1 rounded-full">
                    On Track
                  </span>
                </div>

                <button className="flex items-center gap-2 text-xs border px-3 py-1 rounded-lg hover:bg-gray-100 transition">
                  <Pencil size={14} />
                  Edit Budget
                </button>
              </div>

              {/* Budget Info */}
              <div className="text-xs text-gray-500 flex gap-6">
                <span>Budget: LKR {cat.budget.toFixed(2)}</span>
                <span>Spent: LKR {cat.spent.toFixed(2)}</span>
                <span className="text-green-600">
                  Remaining: LKR {remaining.toFixed(2)}
                </span>
              </div>

              {/* Progress */}
              <div>
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Progress</span>
                  <span>{cat.percent}%</span>
                </div>

                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-2 bg-black rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${cat.percent}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------- SUMMARY CARD ---------------- */

function SummaryCard({
  title,
  value,
  subtitle,
  highlight,
}: {
  title: string;
  value: string;
  subtitle: string;
  highlight?: "green";
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md space-y-2">
      <p className="text-sm text-gray-500">{title}</p>
      <h2
        className={`text-lg font-bold ${
          highlight === "green" ? "text-green-600" : ""
        }`}
      >
        {value}
      </h2>
      <p className="text-xs text-gray-400">{subtitle}</p>
    </div>
  );
}