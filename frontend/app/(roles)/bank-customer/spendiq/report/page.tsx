"use client";

import React from "react";
// Recharts removed for build-time safety; render lightweight placeholders instead.


import ModuleHeader from "@/src/components/ui/module-header";
const monthlyData = [
  { month: "Jan", spend: 120000 },
  { month: "Feb", spend: 95000 },
  { month: "Mar", spend: 140000 },
  { month: "Apr", spend: 110000 },
  { month: "May", spend: 160000 },
];

const categoryData = [
  { name: "Marketing", value: 82000 },
  { name: "Operations", value: 61000 },
  { name: "Tech", value: 54000 },
  { name: "HR", value: 35000 },
];

export default function SpendIQDashboard() {
  return (
    <div className="min-h-screen bg-[#f4f6fb] p-8">
         <ModuleHeader theme="spendiq" menuMode="feature-layout" title="SpendIQ — Analytics Dashboard" /><br></br>
        
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        
        <h1 className="text-2xl font-bold text-[#0b1a3a]">
          Monthly Spend Trend
        </h1>
        <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl shadow-md">
          Download Full Report
        </button>
      </div>

      {/* Top Summary Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-10">
        <Card title="Total Spend" value="LKR 148,000" />
        <Card title="Fixed Expenses" value="LKR 39,000" />
        <Card title="Variable Spend" value="LKR 170,000" />
        <Card title="Other Costs" value="LKR 11,000" />
      </div>

      {/* Middle Section */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* SpendIQ Score */}
        <div className="bg-white p-8 rounded-2xl shadow-md">
          <h2 className="font-semibold text-lg mb-6">SpendIQ Score</h2>
          <div className="flex justify-center">
            <RadialScore score={72} />
          </div>
          <div className="mt-6 text-sm text-gray-500">
            Category: <span className="text-orange-500 font-medium">Moderate</span>
          </div>
        </div>

        {/* Monthly Trend */}
        <div className="bg-white p-8 rounded-2xl shadow-md col-span-2">
          <h2 className="font-semibold text-lg mb-6">
            Monthly Spend Trend
          </h2>
          <div className="h-[250px] flex items-center justify-center text-sm text-gray-500 bg-white/40 rounded-md">
            Simple chart placeholder (install `recharts` to enable charts)
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid md:grid-cols-2 gap-8 mt-10">
        {/* Category Breakdown */}
        <div className="bg-white p-8 rounded-2xl shadow-md">
          <h2 className="font-semibold text-lg mb-6">
            Category Breakdown
          </h2>
          <div className="h-[250px] flex items-center justify-center text-sm text-gray-500 bg-white/40 rounded-md">
            Simple chart placeholder (install `recharts` to enable charts)
          </div>
        </div>

        {/* Behavior Panel */}
        <div className="bg-white p-8 rounded-2xl shadow-md">
          <h2 className="font-semibold text-lg mb-6">
            Spend Behavior Insights
          </h2>

          <BehaviorItem
            label="Recurring Transactions"
            value="12"
          />
          <BehaviorItem
            label="High Value Transactions"
            value="4"
          />
          <BehaviorItem
            label="Category Diversity"
            value="6 categories"
          />
          <BehaviorItem
            label="Budget Utilization"
            value="78%"
          />
        </div>
      </div>
    </div>
  );
}

/* Components */

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xl font-bold text-[#0b1a3a] mt-2">{value}</p>
    </div>
  );
}

function BehaviorItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex justify-between py-3 border-b border-gray-100">
      <span className="text-gray-600 text-sm">{label}</span>
      <span className="font-semibold text-[#0b1a3a]">{value}</span>
    </div>
  );
}

function RadialScore({ score }: { score: number }) {
  const percentage = score;

  return (
    <div className="relative w-40 h-40">
      <svg className="w-full h-full">
        <circle
          cx="50%"
          cy="50%"
          r="70"
          stroke="#e5e7eb"
          strokeWidth="15"
          fill="none"
        />
        <circle
          cx="50%"
          cy="50%"
          r="70"
          stroke="#f97316"
          strokeWidth="15"
          fill="none"
          strokeDasharray={`${(percentage / 100) * 440} 440`}
          strokeLinecap="round"
          transform="rotate(-90 80 80)"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-[#0b1a3a]">
        {score}
      </div>
    </div>
  );
}