"use client";
/**
 * LoanSense history page with loan-type and date filters plus paginated monthly eligibility records.
 */

import { useEffect, useMemo, useState } from "react";
import ModuleHeader from "@/src/components/ui/module-header";
import {
  DataTableFilterGroup,
  DataTableFooter,
  DataTablePanel,
  DataTablePagination,
  DataTableStatusBadge,
  DataTableTabButton,
  DataTableToolbar,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  useToast,
} from "@/src/components/ui";
import { ApiError } from "@/src/types/api-error";
import { getLoanSenseHistory } from "@/src/api/loansense/bank-loansense.service";
import type {
  LoanSenseEligibilityStatus,
  LoanSenseHistoryItemResponse,
  LoanSenseLoanType,
} from "@/src/types/dto/bank-loansense.dto";

type LoanFilter = "ALL" | LoanSenseLoanType;
type DateFilter = "thisMonth" | "lastMonth" | "3m" | "6m" | "12m";
type BadgeTone = "success" | "warning" | "danger" | "neutral" | "info";

const fetchWindowMonths = 12;

const rowsPerPage = 8;

function formatCurrency(value: number): string {
  return `LKR ${value.toLocaleString("en-LK", {
    maximumFractionDigits: 0,
  })}`;
}

function eligibilityTone(status: LoanSenseEligibilityStatus): BadgeTone {
  if (status === "ELIGIBLE") return "success";
  if (status === "PARTIALLY_ELIGIBLE") return "warning";
  return "danger";
}

function riskTone(level: string): BadgeTone {
  const normalized = level.toUpperCase();
  if (normalized === "LOW") return "success";
  if (normalized === "MEDIUM") return "warning";
  if (normalized === "HIGH") return "danger";
  return "neutral";
}

function toMonthStart(value: string | null): Date | null {
  if (!value) return null;

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return new Date(parsed.getFullYear(), parsed.getMonth(), 1);
}

function matchesDateFilter(
  item: LoanSenseHistoryItemResponse,
  dateFilter: DateFilter,
  now: Date,
): boolean {
  const itemMonth = toMonthStart(item.evaluationDate);
  if (!itemMonth) {
    return false;
  }

  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  if (dateFilter === "thisMonth") {
    return itemMonth.getTime() === monthStart.getTime();
  }

  if (dateFilter === "lastMonth") {
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    return itemMonth.getTime() === lastMonthStart.getTime();
  }

  if (dateFilter === "3m") {
    const start = new Date(now.getFullYear(), now.getMonth() - 2, 1);
    return itemMonth >= start && itemMonth <= monthStart;
  }

  if (dateFilter === "6m") {
    const start = new Date(now.getFullYear(), now.getMonth() - 5, 1);
    return itemMonth >= start && itemMonth <= monthStart;
  }

  const start = new Date(now.getFullYear(), now.getMonth() - 11, 1);
  return itemMonth >= start && itemMonth <= monthStart;
}

export default function LoanSenseHistoryPage() {
  const { showToast } = useToast();
  const [loanFilter, setLoanFilter] = useState<LoanFilter>("ALL");
  const [dateFilter, setDateFilter] = useState<DateFilter>("thisMonth");
  const [historyItems, setHistoryItems] = useState<LoanSenseHistoryItemResponse[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadHistory = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getLoanSenseHistory({
          loanType: loanFilter === "ALL" ? undefined : loanFilter,
          months: fetchWindowMonths,
        });
        if (mounted) setHistoryItems(data);
      } catch (unknownError) {
        if (!mounted) return;
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
        if (mounted) setIsLoading(false);
      }
    };

    void loadHistory();
    return () => {
      mounted = false;
    };
  }, [loanFilter, showToast]);

  useEffect(() => {
    setCurrentPage(1);
  }, [dateFilter, loanFilter]);

  const grouped = useMemo(() => {
    const now = new Date();
    return historyItems.filter((item) => matchesDateFilter(item, dateFilter, now));
  }, [dateFilter, historyItems]);
  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(grouped.length / rowsPerPage)),
    [grouped.length]
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedRows = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return grouped.slice(start, start + rowsPerPage);
  }, [currentPage, grouped]);

  const showingFrom =
    grouped.length === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const showingTo =
    grouped.length === 0 ? 0 : Math.min(currentPage * rowsPerPage, grouped.length);

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
        <p className="mt-2 text-sm opacity-80">
          Track changes in your loan eligibility over time
        </p>
      </div>

      <DataTableToolbar>
        <DataTableFilterGroup className="flex-1">
          {loanFilters.map((filter) => (
            <DataTableTabButton
              key={filter.value}
              active={loanFilter === filter.value}
              onClick={() => setLoanFilter(filter.value)}
            >
              {filter.label}
            </DataTableTabButton>
          ))}
        </DataTableFilterGroup>

        <div className="w-full sm:w-48">
          <Select value={dateFilter} onValueChange={(value) => setDateFilter(value as DateFilter)}>
            <SelectTrigger className="h-10 rounded-lg border-slate-200 bg-slate-50/70 text-sm">
              <SelectValue placeholder="Date range" />
            </SelectTrigger>
            <SelectContent className="z-[220]">
              <SelectItem value="thisMonth">This Month</SelectItem>
              <SelectItem value="lastMonth">Last Month</SelectItem>
              <SelectItem value="3m">Last 3 Months</SelectItem>
              <SelectItem value="6m">Last 6 Months</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </DataTableToolbar>

      {error && !grouped.length ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
          {error}
        </div>
      ) : null}

      <DataTablePanel>
        <Table className="min-w-[980px]">
          <TableHeader>
            <TableRow>
              <TableHead>Evaluation Month</TableHead>
              <TableHead>Loan Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Max Loan Amount</TableHead>
              <TableHead>Recommended Tenure</TableHead>
              <TableHead>Risk Level</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center text-sm text-slate-500">
                  Loading history...
                </TableCell>
              </TableRow>
            ) : grouped.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center text-sm text-slate-500">
                  No history entries found for the selected filters.
                </TableCell>
              </TableRow>
            ) : (
              paginatedRows.map((row) => (
                <TableRow key={`${row.loanResultId}-${row.loansenseEvaluationId}`}>
                  <TableCell>{row.evaluationMonthLabel}</TableCell>
                  <TableCell>{row.loanTypeLabel}</TableCell>
                  <TableCell>
                    <DataTableStatusBadge tone={eligibilityTone(row.eligibilityStatus)} className="min-w-[8.75rem]">
                      {row.eligibilityLabel}
                    </DataTableStatusBadge>
                  </TableCell>
                  <TableCell className="font-semibold">
                    {formatCurrency(row.recommendedMaxAmount)}
                  </TableCell>
                  <TableCell>{row.tenureLabel || "-"}</TableCell>
                  <TableCell>
                    <DataTableStatusBadge tone={riskTone(row.riskLevel)}>
                      {row.riskLabel}
                    </DataTableStatusBadge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <DataTableFooter>
          <span>
            Showing <span className="font-semibold text-slate-800">{showingFrom}-{showingTo}</span> of{" "}
            <span className="font-semibold text-slate-800">{grouped.length}</span> entries
          </span>

          <DataTablePagination currentPage={currentPage} totalPages={grouped.length === 0 ? 0 : totalPages} onPageChange={setCurrentPage} />
        </DataTableFooter>
      </DataTablePanel>
    </main>
  );
}
