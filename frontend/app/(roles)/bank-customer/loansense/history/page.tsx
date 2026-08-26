"use client";
/**
 * LoanSense history page with loan-type and date filters plus paginated monthly eligibility records.
 */

import { useEffect, useMemo, useState } from "react";
import ModuleHeader from "@/src/components/ui/module-header";
import {
  Button,
  DataTableFooter,
  DataTablePanel,
  DataTablePagination,
  DataTableStatusBadge,
  Input,
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
import { Search } from "lucide-react";
import { ApiError } from "@/src/types/api-error";
import { getLoanSenseHistory } from "@/src/api/loansense/bank-loansense.service";
import type {
  LoanSenseEligibilityStatus,
  LoanSenseHistoryItemResponse,
  LoanSenseLoanType,
} from "@/src/types/dto/bank-loansense.dto";

type LoanFilter = "ALL" | LoanSenseLoanType;
type DateFilter = "thisMonth" | "lastMonth" | "3m" | "6m" | "12m";
type EligibilitySort =
  | "date-desc"
  | "date-asc"
  | "amount-desc"
  | "amount-asc"
  | "loan-asc"
  | "loan-desc";
type BadgeTone = "success" | "warning" | "danger" | "neutral" | "info";

const fetchWindowMonths = 12;

const rowsPerPage = 8;

const loanFilters: Array<{ label: string; value: LoanFilter }> = [
  { label: "All loans", value: "ALL" },
  { label: "Personal loan", value: "PERSONAL" },
  { label: "Vehicle loan", value: "VEHICLE" },
  { label: "Education loan", value: "EDUCATION" },
  { label: "Housing loan", value: "HOUSING" },
];

const eligibilitySortOptions: Array<{ label: string; value: EligibilitySort }> = [
  { label: "Evaluation date: newest", value: "date-desc" },
  { label: "Evaluation date: oldest", value: "date-asc" },
  { label: "Loan amount: high to low", value: "amount-desc" },
  { label: "Loan amount: low to high", value: "amount-asc" },
  { label: "Loan type: A to Z", value: "loan-asc" },
  { label: "Loan type: Z to A", value: "loan-desc" },
];

function formatCurrency(value: number): string {
  return `${value.toLocaleString("en-LK", {
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
  const [searchQuery, setSearchQuery] = useState("");
  const [loanFilter, setLoanFilter] = useState<LoanFilter>("ALL");
  const [dateFilter, setDateFilter] = useState<DateFilter>("thisMonth");
  const [sortBy, setSortBy] = useState<EligibilitySort>("date-desc");
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
  }, [dateFilter, loanFilter, searchQuery, sortBy]);

  const grouped = useMemo(() => {
    const now = new Date();
    const normalizedSearch = searchQuery.trim().toLowerCase();
    const matchingItems = historyItems.filter((item) => {
      if (!matchesDateFilter(item, dateFilter, now)) {
        return false;
      }

      if (!normalizedSearch) {
        return true;
      }

      return [
        item.evaluationMonthLabel,
        item.loanTypeLabel,
        item.eligibilityLabel,
        item.riskLabel,
        item.tenureLabel,
        String(item.recommendedMaxAmount),
      ].some((value) => value.toLowerCase().includes(normalizedSearch));
    });

    return matchingItems.sort((left, right) => {
      if (sortBy === "amount-desc") {
        return right.recommendedMaxAmount - left.recommendedMaxAmount;
      }
      if (sortBy === "amount-asc") {
        return left.recommendedMaxAmount - right.recommendedMaxAmount;
      }
      if (sortBy === "loan-asc") {
        return left.loanTypeLabel.localeCompare(right.loanTypeLabel);
      }
      if (sortBy === "loan-desc") {
        return right.loanTypeLabel.localeCompare(left.loanTypeLabel);
      }

      const leftDate = left.evaluationDate ? new Date(left.evaluationDate).getTime() : Number.NaN;
      const rightDate = right.evaluationDate ? new Date(right.evaluationDate).getTime() : Number.NaN;
      if (Number.isNaN(leftDate) && Number.isNaN(rightDate)) return 0;
      if (Number.isNaN(leftDate)) return 1;
      if (Number.isNaN(rightDate)) return -1;
      return sortBy === "date-asc" ? leftDate - rightDate : rightDate - leftDate;
    });
  }, [dateFilter, historyItems, searchQuery, sortBy]);
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

  const hasActiveFilters =
    Boolean(searchQuery.trim()) ||
    loanFilter !== "ALL" ||
    dateFilter !== "thisMonth" ||
    sortBy !== "date-desc";

  return (
    <main className="flex min-h-screen flex-col gap-6 bg-transparent p-4 font-sans text-slate-800 md:p-8">
      <ModuleHeader theme="loansense" menuMode="feature-layout" title="Loan Eligibility History" />
      <div>
        <p className="mt-2 text-sm opacity-80">
          Track changes in your loan eligibility over time
        </p>
      </div>

      <section
        className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
        aria-label="Loan eligibility filters"
      >
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end">
          <div className="grid w-full gap-3 sm:grid-cols-2 xl:grid-cols-[minmax(280px,1fr)_190px_190px_240px]">
            <div className="sm:col-span-2 xl:col-span-1">
              <label htmlFor="loan-eligibility-search" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                Search eligibility history
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  id="loan-eligibility-search"
                  placeholder="Loan type, status, risk level or month"
                  className="h-10 border-slate-200 bg-slate-50 pl-10"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">Loan type</label>
              <Select value={loanFilter} onValueChange={(value) => setLoanFilter(value as LoanFilter)}>
                <SelectTrigger className="h-10 border-slate-200 bg-slate-50"><SelectValue placeholder="All loans" /></SelectTrigger>
                <SelectContent className="z-[220]">
                  {loanFilters.map((filter) => (
                    <SelectItem key={filter.value} value={filter.value}>{filter.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">Date range</label>
              <Select value={dateFilter} onValueChange={(value) => setDateFilter(value as DateFilter)}>
                <SelectTrigger className="h-10 border-slate-200 bg-slate-50"><SelectValue placeholder="This month" /></SelectTrigger>
                <SelectContent className="z-[220]">
                  <SelectItem value="thisMonth">This month</SelectItem>
                  <SelectItem value="lastMonth">Last month</SelectItem>
                  <SelectItem value="3m">Last 3 months</SelectItem>
                  <SelectItem value="6m">Last 6 months</SelectItem>
                  <SelectItem value="12m">Last 12 months</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">Sort by</label>
              <Select value={sortBy} onValueChange={(value) => setSortBy(value as EligibilitySort)}>
                <SelectTrigger className="h-10 border-slate-200 bg-slate-50"><SelectValue placeholder="Evaluation date: newest" /></SelectTrigger>
                <SelectContent className="z-[220]">
                  {eligibilitySortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-2 xl:justify-end">
            {hasActiveFilters ? (
              <Button
                variant="ghost"
                className="h-10 text-slate-600 hover:bg-slate-100"
                onClick={() => {
                  setSearchQuery("");
                  setLoanFilter("ALL");
                  setDateFilter("thisMonth");
                  setSortBy("date-desc");
                }}
              >
                Clear
              </Button>
            ) : null}
          </div>
        </div>
      </section>

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
              <TableHead>Max Loan Amount (LKR)</TableHead>
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
                  <TableCell>
                    {row.tenureMonths == null ? "-" : `${row.tenureMonths} months`}
                  </TableCell>
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
