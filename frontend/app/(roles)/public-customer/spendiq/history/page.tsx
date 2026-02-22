"use client";

import { Download, Eye } from "lucide-react";
import { SpendIqHeader } from "@/src/components/SpendIqHeader";

export default function ExpenseHistoryPage() {
  const expenses = [
    {
      date: "Feb 8, 2026",
      category: "Food & Dining",
      amount: -450,
      payment: "Card",
      notes: "Lunch at downtown cafe",
    },
    {
      date: "Feb 7, 2026",
      category: "Salary",
      amount: 45000,
      payment: "Online",
      notes: "New running shoes",
    },
    {
      date: "Feb 6, 2026",
      category: "Transportation",
      amount: -200,
      payment: "Cash",
      notes: "Weekly metro pass",
    },
    {
      date: "Feb 5, 2026",
      category: "Food & Dining",
      amount: -450,
      payment: "Card",
      notes: "Grocery shopping",
    },
    {
      date: "Feb 4, 2026",
      category: "Entertainment",
      amount: -450,
      payment: "Online",
      notes: "Movie tickets and dinner",
    },
  ];

  return (
    <div className="p-8 space-y-8 bg-[#f4f6fb] min-h-screen">

      <SpendIqHeader title="Expense History" />

      {/* Subtitle */}
      <div className="mt-4">
        <p className="text-sm text-gray-500">
          Review and manage all your expenses
        </p>
      </div>

      {/* FILTER SECTION */}
      <div className="bg-white rounded-2xl shadow-md p-6 space-y-6">

        <div className="grid md:grid-cols-5 gap-6 items-end">

          <div className="flex flex-col space-y-2">
            <label className="text-xs font-medium text-gray-500">
              Start Date
            </label>
            <input
              type="date"
              className="px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0a234c]/20"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-xs font-medium text-gray-500">
              End Date
            </label>
            <input
              type="date"
              className="px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0a234c]/20"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-xs font-medium text-gray-500">
              Category
            </label>
            <select className="px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0a234c]/20">
              <option>All Categories</option>
              <option>Food & Dining</option>
              <option>Transportation</option>
            </select>
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-xs font-medium text-gray-500">
              Payment Type
            </label>
            <select className="px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0a234c]/20">
              <option>All Types</option>
              <option>Card</option>
              <option>Online</option>
              <option>Cash</option>
            </select>
          </div>

          <div className="flex justify-end">
            <button className="flex items-center gap-2 px-5 py-2 rounded-xl border bg-white hover:bg-gray-50 text-sm shadow-sm transition">
              <Download size={16} />
              Export CSV
            </button>
          </div>

        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="bg-white rounded-2xl shadow-lg p-6">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-sm font-semibold text-gray-700">
            All Expenses
          </h2>
          <span className="text-xs text-gray-500">
            {expenses.length} expenses
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">

            <thead className="border-b text-gray-500">
              <tr>
                <th className="text-left py-3">Date</th>
                <th className="text-left py-3">Category</th>
                <th className="text-left py-3">Amount</th>
                <th className="text-left py-3">Payment Type</th>
                <th className="text-left py-3">Notes</th>
                <th className="text-left py-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {expenses.map((exp, idx) => (
                <tr
                  key={idx}
                  className="border-b last:border-none hover:bg-gray-50 transition"
                >
                  <td className="py-4">{exp.date}</td>

                  <td>
                    <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
                      {exp.category}
                    </span>
                  </td>

                  <td
                    className={`font-semibold ${
                      exp.amount < 0
                        ? "text-red-500"
                        : "text-green-600"
                    }`}
                  >
                    {exp.amount < 0 ? "-" : "+"}
                    {Math.abs(exp.amount).toLocaleString()}.00 LKR
                  </td>

                  <td>
                    <span
                      className={`px-3 py-1 text-xs rounded-full ${
                        exp.payment === "Card"
                          ? "bg-[#0a234c] text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {exp.payment}
                    </span>
                  </td>

                  <td className="text-gray-600">
                    {exp.notes}
                  </td>

                  <td>
                    <button className="text-gray-500 hover:text-[#0a234c] transition">
                      <Eye size={16} />
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>

    </div>
  );
}