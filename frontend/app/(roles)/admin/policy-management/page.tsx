"use client";

import React, { useState } from "react";
import { Sidebar } from "@/src/components/layout";
import { AdminHeader } from "@/src/components/ui/adminheader";
import { AuthGuard } from "@/src/components/auth";

type LoanType = {
  id: string;
  title: string;
  description: string;
  rate: number;
  dark?: boolean;
};

export default function LoanInterestPolicyPage() {
  const [loans, setLoans] = useState<LoanType[]>([
    {
      id: "personal",
      title: "Personal Loan",
      description:
        "A loan borrowed for personal needs such as medical bills, travel, weddings, or other expenses. It can be used for almost any purpose.",
      rate: 17,
    },
    {
      id: "vehicle",
      title: "Vehicle Loan",
      description:
        "A loan taken to purchase a car, bike, or other vehicle. The borrower repays the amount in monthly instalments.",
      rate: 15,
      dark: true,
    },
    {
      id: "education",
      title: "Educational Loan",
      description:
        "A loan provided to help students pay for tuition fees and other education-related expenses.",
      rate: 12,
    },
    {
      id: "housing",
      title: "Housing Loan",
      description:
        "A loan used to buy, build, or renovate a house, which is repaid over a long period in instalments.",
      rate: 10,
      dark: true,
    },
  ]);

  const handleRateChange = (id: string, value: string) => {
    setLoans((prev) =>
      prev.map((loan) =>
        loan.id === id
          ? { ...loan, rate: Number(value) }
          : loan
      )
    );
  };

  const handleSave = () => {
    console.log("Updated Rates:", loans);
    alert("Interest rates saved successfully!");
  };

  return (
    <AuthGuard requiredRole="ADMIN">
      <div className="flex h-screen bg-[#f3f4f6] overflow-hidden">
        <Sidebar role="ADMIN" className="hidden lg:block" />

        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="px-6 pt-4 pb-6">
            <AdminHeader title="Loan Interest Policy Management" />
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 pb-10 space-y-8">

            <h2 className="text-2xl font-bold text-[#1e1b4b]">
              LOAN TYPE AND INTEREST RATE
            </h2>

            {loans.map((loan) => (
              <div
                key={loan.id}
                className={`flex flex-col lg:flex-row justify-between items-center rounded-2xl px-8 py-8 transition ${
                  loan.dark
                    ? "bg-[#0B3B66] text-white"
                    : "bg-[#5f879e] text-white"
                }`}
              >
                {/* Left Section */}
                <div className="flex-1 pr-8">
                  <h3 className="text-xl font-semibold mb-3">
                    {loan.title}
                  </h3>
                  <p className="text-sm opacity-90 max-w-2xl">
                    {loan.description}
                  </p>
                </div>

                {/* Divider */}
                <div className="hidden lg:block w-px h-20 bg-white/30 mx-6"></div>

                {/* Right Section */}
                <div className="flex flex-col items-center gap-3 mt-6 lg:mt-0">
                  <span className="text-xs tracking-widest opacity-80">
                    INTEREST RATE
                  </span>

                  <div className="bg-white rounded-2xl px-6 py-4 flex items-center gap-2 shadow-md">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={loan.rate}
                      onChange={(e) =>
                        handleRateChange(loan.id, e.target.value)
                      }
                      className="w-16 text-center text-lg font-bold text-[#0B3B66] focus:outline-none"
                    />
                    <span className="text-lg font-bold text-[#0B3B66]">
                      %
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Buttons */}
           <div className="flex justify-end gap-6 pt-4">
  <button
    onClick={handleSave}
    className="min-w-[160px] px-8 py-3 rounded-full bg-[#0B3B66] text-white font-semibold text-sm hover:bg-[#082d4a] transition"
  >
    SAVE
  </button>

  <button
    className="min-w-[160px] px-8 py-3 rounded-full border border-[#0B3B66] text-[#0B3B66] font-semibold text-sm hover:bg-gray-100 transition"
  >
    CANCEL
  </button>
</div>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}