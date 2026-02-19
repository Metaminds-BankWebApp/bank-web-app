"use client";

import { Bell, Mail } from "lucide-react";

export default function SpendIQHistoryPage() {
 const expenses = [
  {
    date: "Feb 12, 2026",
    category: "Utilities",
    amount: -2000,
    payment: "Online",
    notes: "Electricity bill payment",
  },
  {
    date: "Feb 11, 2026",
    category: "Shopping",
    amount: -3500,
    payment: "Card",
    notes: "Clothing purchase",
  },
  {
    date: "Feb 10, 2026",
    category: "Entertainment",
    amount: -1200,
    payment: "Card",
    notes: "Cinema tickets",
  },
  {
    date: "Feb 9, 2026",
    category: "Healthcare",
    amount: -800,
    payment: "Cash",
    notes: "Pharmacy purchase",
  },
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
    notes: "Monthly Salary",
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
    amount: -950,
    payment: "Card",
    notes: "Dinner at restaurant",
  },
  {
    date: "Feb 4, 2026",
    category: "Shopping",
    amount: -6700,
    payment: "Online",
    notes: "Online electronics order",
  },
  {
    date: "Feb 3, 2026",
    category: "Freelance Income",
    amount: 12000,
    payment: "Online",
    notes: "Website design project",
  },
  {
    date: "Feb 2, 2026",
    category: "Utilities",
    amount: -1500,
    payment: "Online",
    notes: "Water bill",
  },
  {
    date: "Feb 1, 2026",
    category: "Transportation",
    amount: -300,
    payment: "Card",
    notes: "Fuel refill",
  },
];


  return (
    <div className="p-6">
      {/* Header */}
      
        <header className="flex flex-col md:flex-row justify-between items-center bg-[#0a234c] text-white p-3 rounded-2xl shadow-lg gap-4">
          <h1 className="text-xl font-bold tracking-wide w-full md:w-auto">Expense History</h1>
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
        <br></br>

      

      {/* Table Container */}
      <div className="bg-white rounded-xl shadow-sm border">
        <table className="w-full text-sm">
          <thead className="border-b bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left p-4">Date</th>
              <th className="text-left p-4">Category</th>
              <th className="text-left p-4">Amount</th>
              <th className="text-left p-4">Payment Type</th>
              <th className="text-left p-4">Notes</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {expenses.map((expense, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-4">{expense.date}</td>

                <td className="p-4">
                  <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs">
                    {expense.category}
                  </span>
                </td>

                <td
                  className={`p-4 font-semibold ${
                    expense.amount < 0
                      ? "text-red-500"
                      : "text-green-600"
                  }`}
                >
                  {expense.amount < 0 ? "-" : "+"}
                  {Math.abs(expense.amount).toFixed(2)} LKR
                </td>

                <td className="p-4">
                  <span className="px-3 py-1 rounded-full bg-gray-200 text-gray-800 text-xs">
                    {expense.payment}
                  </span>
                </td>

                <td className="p-4 text-gray-600">
                  {expense.notes}
                </td>

                <td className="p-4">
                  <button className="text-blue-600 hover:underline text-sm">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
