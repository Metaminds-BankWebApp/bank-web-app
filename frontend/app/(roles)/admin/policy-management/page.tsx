"use client";

import React, { useState } from "react";
import { Sidebar } from "@/src/components/layout";
import ModuleHeader from "@/src/components/ui/module-header";
import { AuthGuard } from "@/src/components/auth";

type LoanType = {
  id: string;
  title: string;
  description: string;
  rate: number;
  dark?: boolean;
};

const initialLoans: LoanType[] = [
  {
    id: "personal",
    title: "Personal Loan",
    description: "Flexible personal financing for day-to-day needs.",
    rate: 17,
    dark: true,
  },
  {
    id: "vehicle",
    title: "Vehicle Loan",
    description: "Auto financing with competitive repayment terms.",
    rate: 15,
  },
  {
    id: "education",
    title: "Educational Loan",
    description: "Loan support for tuition and educational expenses.",
    rate: 12,
  },
  {
    id: "housing",
    title: "Housing Loan",
    description: "Home ownership financing with long-term plans.",
    rate: 10,
  },
];

export default function PolicyManagementPage() {
  const [loans, setLoans] = useState<LoanType[]>(initialLoans);

  const handleRateChange = (id: string, value: string) => {
    const parsed = Number(value);
    const safeRate = Number.isNaN(parsed) ? 0 : Math.min(100, Math.max(0, parsed));

    setLoans((prev) =>
      prev.map((loan) => (loan.id === id ? { ...loan, rate: safeRate } : loan))
    );
  };

  const handleSave = () => {
    // TODO: call your API here
    console.log("Saving policy rates:", loans);
  };
  return (
    <AuthGuard requiredRole="ADMIN">
      <div className="flex h-screen bg-[#f3f4f6] overflow-hidden">
        <Sidebar role="ADMIN" className="max-lg:hidden h-full z-10 relative" />

        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="px-6 pt-4 pb-6">
            <ModuleHeader theme="staff" menuMode="sidebar-overlay" sidebarRole="ADMIN" mailBadge={2} notificationBadge={8} avatarSrc="https://ui-avatars.com/api/?name=Kamal+E&background=random" avatarStatusDot name="Kamal Edirisinghe" role="Admin" title="Loan Interest Policy Management" />
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 pb-10 space-y-5">

            <h2 className="text-2xl font-bold text-[#1e1b4b]">
              LOAN TYPE AND INTEREST RATE
            </h2>

            {loans.map((loan) => (
              <div
                key={loan.id}
                className={`flex flex-col lg:flex-row justify-between items-center rounded-xl px-6 py-5 transition ${
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
