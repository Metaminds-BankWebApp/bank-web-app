'use client';

import React, { useState } from 'react';

// ==================== TYPE DEFINITIONS ====================
type StatusType = 'Active' | 'Maintenance';

type BranchData = {
  id: string;
  name: string;
  address: string;
  contact: string;
  officers: number;
  customers: number;
  status: StatusType;
};

type SummaryCardProps = {
  label: string;
  value: string | number;
  variant?: 'dark' | 'medium' | 'light';
};

type StatusBadgeProps = {
  status: StatusType;
};

// ==================== COMPONENTS ====================
function SummaryCard({ label, value, variant = 'light' }: SummaryCardProps) {
  const classes =
    variant === 'dark'
      ? 'bg-[#0B3B66] text-white'
      : variant === 'medium'
      ? 'bg-[#1B5E9E] text-white'
      : 'bg-white text-gray-800 border border-blue-200';

  return (
    <div
      className={`rounded-xl shadow-md p-6 flex flex-col justify-between h-full ${classes}`}
    >
      <div className="text-sm font-medium opacity-90">{label}</div>
      <div className="mt-4 text-2xl font-bold">{value}</div>
    </div>
  );
}

function StatusBadge({ status }: StatusBadgeProps) {
  const classes =
    status === 'Active'
      ? 'bg-green-100 text-green-800'
      : 'bg-yellow-100 text-yellow-800';

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${classes}`}>
      {status}
    </span>
  );
}

function ActionIcon({ icon, onClick }: { icon: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 hover:text-gray-900"
      title={icon === '✏️' ? 'Edit' : 'Delete'}
    >
      {icon}
    </button>
  );
}

// Mock avatar component for officer display
function OfficerAvatars({ count }: { count: number }) {
  const displayCount = Math.min(count, 3);
  const remaining = count > 3 ? count - 3 : 0;

  return (
    <div className="flex items-center">
      <div className="flex -space-x-2">
        {Array.from({ length: displayCount }).map((_, i) => (
          <div
            key={i}
            className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white flex items-center justify-center text-white text-xs font-semibold"
          >
            {String.fromCharCode(65 + i)}
          </div>
        ))}
      </div>
      {remaining > 0 && (
        <span className="ml-2 text-xs font-medium text-gray-600">
          +{remaining}
        </span>
      )}
    </div>
  );
}

// ==================== MOCK DATA ====================
const branchData: BranchData[] = [
  {
    id: 'BR-001',
    name: 'Downtown Branch',
    address: '123 Main Street, New York, NY',
    contact: '(555) 123-4567',
    officers: 12,
    customers: 2856,
    status: 'Active',
  },
  {
    id: 'BR-002',
    name: 'Midtown Branch',
    address: '456 Park Avenue, New York, NY',
    contact: '(555) 234-5678',
    officers: 8,
    customers: 1945,
    status: 'Active',
  },
  {
    id: 'BR-003',
    name: 'Uptown Branch',
    address: '789 Fifth Avenue, New York, NY',
    contact: '(555) 345-6789',
    officers: 10,
    customers: 2245,
    status: 'Maintenance',
  },
];

// ==================== MAIN PAGE COMPONENT ====================
export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const totalBranches = 12;
  const branchesPerPage = 3;
  const totalPages = Math.ceil(totalBranches / branchesPerPage);

  const filteredBranches = branchData.filter(
    (branch) =>
      branch.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      branch.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="p-6 space-y-6">
      {/* Page Header */}
      <div className="rounded-xl bg-[#0B3B66] text-white p-6 shadow-md">
        <h1 className="text-2xl font-semibold">Branch Management</h1>
        <p className="text-sm opacity-80 mt-1">Manage and monitor all bank branches</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard label="TOTAL BRANCHES" value={48} variant="dark" />
        <SummaryCard label="ACTIVE BRANCHES" value={48} variant="medium" />
        <SummaryCard label="NO OF OFFICERS" value={546} variant="light" />
        <SummaryCard label="TOTAL CUSTOMERS" value="124,596" variant="light" />
      </div>

      {/* Search and Action Section */}
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search Branches by ID, Name or Address......"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-4 py-3 rounded-full border border-gray-300 bg-white text-gray-800 text-sm focus:outline-none focus:border-[#0B3B66] focus:ring-1 focus:ring-[#0B3B66] placeholder-gray-500"
        />
        <button className="px-6 py-3 bg-[#0B3B66] text-white font-medium rounded-lg hover:bg-[#0a2e52] transition-colors flex items-center gap-2 whitespace-nowrap">
          <span>+</span>
          New Branch
        </button>
      </div>

      {/* Branch Table Section */}
      <div className="rounded-xl bg-white shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Branch Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Address</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Contact</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Officers</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Customers</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBranches.map((branch, index) => (
                <tr
                  key={branch.id}
                  className={`border-b border-gray-100 transition-colors hover:bg-gray-50 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  }`}
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">{branch.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-800 flex items-center gap-2">
                    <span className="text-lg">🏢</span>
                    {branch.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{branch.address}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{branch.contact}</td>
                  <td className="px-6 py-4 text-sm">
                    <OfficerAvatars count={branch.officers} />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 font-medium">{branch.customers.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm">
                    <StatusBadge status={branch.status} />
                  </td>
                  <td className="px-6 py-4 text-sm flex items-center gap-2">
                    <ActionIcon icon="✏️" onClick={() => console.log('Edit:', branch.id)} />
                    <ActionIcon icon="🗑️" onClick={() => console.log('Delete:', branch.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-600">
          Showing {(currentPage - 1) * branchesPerPage + 1} to{' '}
          {Math.min(currentPage * branchesPerPage, totalBranches)} of {totalBranches} branches
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            &lt;
          </button>

          {Array.from({ length: totalPages }).map((_, i) => {
            const pageNum = i + 1;
            // Show first page, last page, current page, and adjacent pages
            const shouldShow =
              pageNum === 1 ||
              pageNum === totalPages ||
              pageNum === currentPage ||
              pageNum === currentPage - 1 ||
              pageNum === currentPage + 1;

            if (!shouldShow) {
              if (pageNum === 2 && currentPage > 3) {
                return (
                  <span key="dots" className="px-2 text-gray-400">
                    ...
                  </span>
                );
              }
              return null;
            }

            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  currentPage === pageNum
                    ? 'bg-[#0B3B66] text-white'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            &gt;
          </button>
        </div>
      </div>
    </main>
  );
}
