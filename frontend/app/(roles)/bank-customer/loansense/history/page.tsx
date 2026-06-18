"use client";
/**
 * LoanSense history page with loan-type and date filters plus paginated monthly eligibility records.
 */

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ModuleHeader from "@/src/components/ui/module-header";
import { useToast } from "@/src/components/ui";
import { ApiError } from "@/src/types/api-error";
import { getLoanSenseHistory } from "@/src/api/loansense/bank-loansense.service";
import type {
  LoanSenseEligibilityStatus,
  LoanSenseHistoryItemResponse,
  LoanSenseLoanType,
} from "@/src/types/dto/bank-loansense.dto";

type LoanFilter = "ALL" | LoanSenseLoanType;
type DateFilter = "1m" | "3m" | "6m" | "12m";

const dateFilterToMonths: Record<DateFilter, number> = {
  "1m": 1,
  "3m": 3,
  "6m": 6,
  "12m": 12,
};

const rowsPerPage = 8;

function formatCurrency(value: number): string {
  return `LKR ${value.toLocaleString("en-LK", {
    maximumFractionDigits: 0,
  })}`;
}

function statusBadgeClass(status: LoanSenseEligibilityStatus): string {
  if (status === "ELIGIBLE") {
    return "bg-green-100 text-green-800";
  }
  if (status === "PARTIALLY_ELIGIBLE") {
    return "bg-yellow-100 text-yellow-800";
  }
  return "bg-red-100 text-red-800";
}

function riskBadgeClass(level: string): string {
  const normalized = level.toUpperCase();
  if (normalized === "LOW") {
    return "bg-green-100 text-green-800";
  }
  if (normalized === "MEDIUM") {
    return "bg-yellow-100 text-yellow-800";
  }
  return "bg-red-100 text-red-800";
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex min-w-[9rem] items-center justify-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
        active
          ? "bg-[#0B3B66] text-white"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      {label}
    </button>
  );
}

// Main component for filtering and paging monthly eligibility history records.
export default function LoanSenseHistoryPage() {
  const { showToast } = useToast();
  const [loanFilter, setLoanFilter] = useState<LoanFilter>("ALL");
  const [dateFilter, setDateFilter] = useState<DateFilter>("3m");
  const [historyItems, setHistoryItems] = useState<LoanSenseHistoryItemResponse[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    // Loads data required by this view and updates local state.
    const loadHistory = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getLoanSenseHistory({
          loanType: loanFilter === "ALL" ? undefined : loanFilter,
          months: dateFilterToMonths[dateFilter],
        });
        if (!mounted) {
          return;
        }
        setHistoryItems(data);
      } catch (unknownError) {
        if (!mounted) {
          return;
        }
        const message =
          unknownError instanceof ApiError
            ? unknownError.message
            : "Failed to load LoanSense history.";
        setError(message);
        showToast({
          type: "error",
          title: "History load failed",
          description: message,
        });
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    void loadHistory();
    return () => {
      mounted = false;
    };
  }, [dateFilter, loanFilter, showToast]);

  useEffect(() => {
    setCurrentPage(1);
  }, [dateFilter, loanFilter]);

  // Builds derived UI values from API data to keep rendering simple.
  const grouped = useMemo(() => historyItems, [historyItems]);
  // Builds derived UI values from API data to keep rendering simple.
  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(grouped.length / rowsPerPage)),
    [grouped.length]
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  // Builds derived UI values from API data to keep rendering simple.
  const paginatedRows = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return grouped.slice(start, start + rowsPerPage);
  }, [currentPage, grouped]);

  const showingFrom =
    grouped.length === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const showingTo =
    grouped.length === 0 ? 0 : Math.min(currentPage * rowsPerPage, grouped.length);

  // Builds derived UI values from API data to keep rendering simple.
  const visiblePages = useMemo(() => {
    if (totalPages <= 0) {
      return [];
    }

    const maxVisibleButtons = 3;
    let start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages, start + maxVisibleButtons - 1);
    start = Math.max(1, end - maxVisibleButtons + 1);

    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  }, [currentPage, totalPages]);

  const loanFilters: Array<{ label: string; value: LoanFilter }> = [
    { label: "All Loans", value: "ALL" },
    { label: "Personal Loan", value: "PERSONAL" },
    { label: "Vehicle Loan", value: "VEHICLE" },
    { label: "Education Loan", value: "EDUCATION" },
    { label: "Housing Loan", value: "HOUSING" },
  ];

  return (
    <main className="flex min-h-screen flex-col gap-6 bg-transparent p-4 font-sans text-slate-800 md:p-8">
      <ModuleHeader theme="loansense" menuMode="feature-layout" title="Loan Eligibility History" />
      <div>
        <p className="text-sm opacity-80 mt-2">
          Track changes in your loan eligibility over time
        </p>
      </div>

      <div className="loansense-card loansense-card-hover loansense-creditlens-shade rounded-xl p-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-gray-700">Filter by:</span>
            {loanFilters.map((filter) => (
              <FilterChip
                key={filter.value}
                label={filter.label}
                active={loanFilter === filter.value}
                onClick={() => setLoanFilter(filter.value)}
              />
            ))}
          </div>

          <div className="relative w-full lg:w-56">
            <select
              value={dateFilter}
              onChange={(event) => setDateFilter(event.target.value as DateFilter)}
              className="w-full px-4 py-2 rounded-full border border-gray-300 bg-gray-50 text-gray-800 text-sm appearance-none cursor-pointer focus:outline-none focus:border-[#0B3B66] focus:ring-1 focus:ring-[#0B3B66]"
            >
              <option value="1m">Last Month</option>
              <option value="3m">Last 3 Months</option>
              <option value="6m">Last 6 Months</option>
              <option value="12m">Last Year</option>
            </select>
            <div className="pointer-events-none absolute right-3 top-2 text-gray-500 text-sm">
              Calendar
            </div>
          </div>
        </div>
      </div>

      {error && !grouped.length ? (
        <div className="loansense-card loansense-creditlens-shade rounded-xl p-6 text-red-700 border border-red-200 bg-red-50">
          {error}
        </div>
      ) : null}

      <div className="loansense-card loansense-card-hover loansense-creditlens-shade rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px]">
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
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-sm text-gray-500">
                    Loading history...
                  </td>
                </tr>
              ) : grouped.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-sm text-gray-500">
                    No history entries found for the selected filters.
                  </td>
                </tr>
              ) : (
                paginatedRows.map((row, index) => (
                  <tr
                    key={`${row.loanResultId}-${row.loansenseEvaluationId}`}
                    className={`border-b border-gray-100 transition-colors hover:bg-gray-50 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="px-6 py-4 text-sm text-gray-800">{row.evaluationMonthLabel}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{row.loanTypeLabel}</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`inline-flex min-w-[8.75rem] items-center justify-center px-3 py-1 rounded-full text-sm font-medium ${statusBadgeClass(
                          row.eligibilityStatus
                        )}`}
                      >
                        {row.eligibilityLabel}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {formatCurrency(row.recommendedMaxAmount)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">{row.tenureLabel || "-"}</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`inline-flex min-w-[7.5rem] items-center justify-center px-3 py-1 rounded-full text-sm font-medium ${riskBadgeClass(
                          row.riskLevel
                        )}`}
                      >
                        {row.riskLabel}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-gray-600">
          Showing {showingFrom} to {showingTo} of {grouped.length} entries
        </div>

        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1 || grouped.length === 0}
            onClick={() => setCurrentPage((previous) => Math.max(previous - 1, 1))}
            className="px-3 py-1 border rounded-lg disabled:opacity-40 flex items-center justify-center"
            aria-label="Previous page"
          >
            <ChevronLeft size={16} />
          </button>

          {visiblePages.map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded-lg ${
                currentPage === page ? "bg-[#0B3B66] text-white" : "border text-gray-700"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            disabled={grouped.length === 0 || currentPage === totalPages}
            onClick={() => setCurrentPage((previous) => Math.min(previous + 1, totalPages))}
            className="px-3 py-1 border rounded-lg disabled:opacity-40 flex items-center justify-center"
            aria-label="Next page"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </main>
  );
}


