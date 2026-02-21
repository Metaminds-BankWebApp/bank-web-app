'use client';

import React, { useState } from 'react';
import { Mail, Bell } from "lucide-react";
import LoanSenseHeader from "@/src/components/ui/loansenseheader";

type StatusBadgeProps = {
  status: 'Eligible' | 'Partially Eligible' | 'Not Eligible';
};

function StatusBadge({ status }: StatusBadgeProps) {
  const classes =
    status === 'Eligible'
      ? 'bg-green-100 text-green-800'
      : status === 'Partially Eligible'
      ? 'bg-yellow-100 text-yellow-800'
      : 'bg-red-100 text-red-800';

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${classes}`}>
      {status}
    </span>
  );
}

type RiskBadgeProps = {
  level: 'Low' | 'Medium' | 'High';
};

function RiskBadge({ level }: RiskBadgeProps) {
  const classes =
    level === 'Low'
      ? 'bg-green-100 text-green-800'
      : level === 'Medium'
      ? 'bg-yellow-100 text-yellow-800'
      : 'bg-red-100 text-red-800';

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${classes}`}>
      {level}
    </span>
  );
}

type FilterChipProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

function FilterChip({ label, active, onClick }: FilterChipProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
        active
          ? 'bg-[#0B3B66] text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );
}

const historyData = [
  {
    id: 1,
    month: 'February 2026',
    loanType: 'Personal Loan',
    status: 'Eligible' as const,
    maxAmount: 'LKR 2,150,000',
    tenure: '12 - 60 months',
    riskLevel: 'Low' as const,
  },
  {
    id: 2,
    month: 'February 2026',
    loanType: 'Vehicle Loan',
    status: 'Eligible' as const,
    maxAmount: 'LKR 3,450,000',
    tenure: '12 - 84 months',
    riskLevel: 'Low' as const,
  },
  {
    id: 3,
    month: 'February 2026',
    loanType: 'Education Loan',
    status: 'Partially Eligible' as const,
    maxAmount: 'LKR 5,900,000',
    tenure: '12 - 120 months',
    riskLevel: 'Medium' as const,
  },
  {
    id: 4,
    month: 'February 2026',
    loanType: 'Housing Loan',
    status: 'Not Eligible' as const,
    maxAmount: 'LKR 2,150,000',
    tenure: '12 - 60 months',
    riskLevel: 'High' as const,
  },
  {
    id: 5,
    month: 'January 2026',
    loanType: 'Personal Loan',
    status: 'Eligible' as const,
    maxAmount: 'LKR 3,450,000',
    tenure: '12 - 84 months',
    riskLevel: 'Medium' as const,
  },
  {
    id: 6,
    month: 'January 2026',
    loanType: 'Vehicle Loan',
    status: 'Partially Eligible' as const,
    maxAmount: 'LKR 2,150,000',
    tenure: '12 - 48 months',
    riskLevel: 'Medium' as const,
  },
];

export default function Page() {
  const [activeLoanFilter, setActiveLoanFilter] = useState('All Loans');
  const [activeDateFilter, setActiveDateFilter] = useState('Last 3 months');

  const loanFilters = ['All Loans', 'Personal Loan', 'Vehicle Loan', 'Education Loan', 'Housing Loan'];
  const dateFilters = ['Last Month', 'Last 3 months', 'Last 6 months', 'Last Year'];

  // Filter logic: if "All Loans" is selected, show all rows; otherwise filter by loanType
  const filteredData = activeLoanFilter === 'All Loans'
    ? historyData
    : historyData.filter((row) => row.loanType === activeLoanFilter);

  return (
    <main className="flex flex-col gap-6 p-4 md:p-8 min-h-screen bg-white font-sans text-slate-800">
      {/* Header */}
          <LoanSenseHeader title="Loan Eligibility History" />
        <div><p className="text-sm opacity-80 mt-2">Track changes in your loan eligibility over time</p></div>
      {/* Positive Trend Banner */}
      <div className="rounded-xl bg-blue-50 border border-blue-200 p-6 shadow-md flex items-start gap-4">
        <div className="text-blue-600 text-3xl flex-shrink-0">
          ↑
        </div>
        <div>
          <h3 className="text-lg font-semibold text-blue-900">Positive Trend</h3>
          <p className="text-sm text-blue-700 mt-2">
            Your loan eligibility has improved by 12% since the last evaluation. Keep up the good work with timely payments!
          </p>
        </div>
      </div>

      {/* Filter Section */}
<div className="rounded-xl bg-white p-4 shadow-md">
  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

    {/* Left Side: Filter Label + Chips */}
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-sm font-medium text-gray-700">Filter by:</span>

      {loanFilters.map((filter) => (
        <FilterChip
          key={filter}
          label={filter}
          active={activeLoanFilter === filter}
          onClick={() => setActiveLoanFilter(filter)}
        />
      ))}
    </div>

    {/* Right Side: Date Dropdown */}
    <div className="relative w-full lg:w-48">
      <select
        value={activeDateFilter}
        onChange={(e) => setActiveDateFilter(e.target.value)}
        className="w-full px-4 py-2 rounded-full border border-gray-300 bg-gray-50 text-gray-800 text-sm appearance-none cursor-pointer focus:outline-none focus:border-[#0B3B66] focus:ring-1 focus:ring-[#0B3B66]"
      >
        {dateFilters.map((date) => (
          <option key={date} value={date}>
            {date}
          </option>
        ))}
      </select>

      <div className="pointer-events-none absolute right-3 top-2 text-gray-500 text-sm">
        📅
      </div>
    </div>
  </div>
</div>


      {/* History Table Section */}
      <div className="rounded-xl bg-white shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Evaluation Month</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Loan Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Max Loan Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Recommended Tenure</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Risk Level</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, index) => (
                <tr
                  key={row.id}
                  className={`border-b border-gray-100 transition-colors hover:bg-gray-50 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  }`}
                >
                  <td className="px-6 py-4 text-sm text-gray-800">{row.month}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{row.loanType}</td>
                  <td className="px-6 py-4 text-sm">
                    <StatusBadge status={row.status} />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">{row.maxAmount}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{row.tenure}</td>
                  <td className="px-6 py-4 text-sm">
                    <RiskBadge level={row.riskLevel} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
