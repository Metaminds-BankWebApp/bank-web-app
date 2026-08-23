"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  ClipboardCheck,
} from "lucide-react";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AuthGuard } from "@/src/components/auth";
import { Sidebar } from "@/src/components/layout";
import ModuleHeader from "@/src/components/ui/module-header";
import { Button } from "@/src/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { getBankCustomersForOfficer } from "@/src/api/customers/bank-customer.service";
import { transactionService } from "@/src/api/transact/transaction.service";
import type { BankCustomerSummaryResponse } from "@/src/types/dto/bank-customer.dto";
import type { TransactionResponse } from "@/src/types/dto/transact.dto";

const riskColors = ["#0d3b66", "#0d3b66", "#0d3b66"];
const transactionColors = ["#0d3b66", "#2563a0", "#5b91bd"];
type DateRange = "30" | "90" | "365" | "all" | "custom";

export default function BankOfficerDashboardPage() {
  const [customers, setCustomers] = useState<BankCustomerSummaryResponse[]>([]);
  const [transactions, setTransactions] = useState<TransactionResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [range, setRange] = useState<DateRange>("30");
  const [fromDate, setFromDate] = useState(() => dateInputValue(daysAgo(30)));
  const [toDate, setToDate] = useState(() => dateInputValue(new Date()));

  const loadDashboard = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const [customerRows, transactionRows] = await Promise.all([
        getBankCustomersForOfficer(),
        transactionService.getBankOfficerTransactionHistory(),
      ]);
      setCustomers(customerRows);
      setTransactions(transactionRows);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Unable to load the officer dashboard.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadDashboard();
  }, []);

  const selectRange = (value: DateRange) => {
    setRange(value);
    if (value === "all" || value === "custom") return;
    setFromDate(dateInputValue(daysAgo(Number(value))));
    setToDate(dateInputValue(new Date()));
  };

  const overview = useMemo(() => {
    const start =
      range === "all" || !fromDate
        ? null
        : new Date(`${fromDate}T00:00:00`).getTime();
    const end =
      range === "all" || !toDate
        ? null
        : new Date(`${toDate}T23:59:59.999`).getTime();
    const isInRange = (value: string | null) => {
      const timestamp = value === null ? Number.NaN : new Date(value).getTime();
      return (
        (start === null || timestamp >= start) &&
        (end === null || timestamp <= end)
      );
    };
    const filteredCustomers = customers.filter((customer) =>
      isInRange(customer.lastUpdated),
    );
    const filteredTransactions = transactions.filter((transaction) =>
      isInRange(transaction.transactionDate),
    );
    const riskData = ["LOW", "MEDIUM", "HIGH"].map((level) => ({
      name: `${level[0]}${level.slice(1).toLowerCase()} risk`,
      value: filteredCustomers.filter(
        (customer) => customer.riskLevel === level,
      ).length,
    }));
    const transactionData = [
      {
        name: "Completed",
        value: filteredTransactions.filter((transaction) =>
          /SUCCESS|COMPLETED/.test((transaction.status || "").toUpperCase()),
        ).length,
      },
      {
        name: "Pending",
        value: filteredTransactions.filter((transaction) =>
          /PENDING/.test((transaction.status || "").toUpperCase()),
        ).length,
      },
      {
        name: "Review",
        value: filteredTransactions.filter((transaction) =>
          /FAILED|CANCELLED/.test((transaction.status || "").toUpperCase()),
        ).length,
      },
    ];
    return {
      riskData,
      transactionData,
      chartRangeKey: `${range}-${fromDate}-${toDate}`,
      dateRangeLabel:
        range === "all"
          ? "All time"
          : fromDate && toDate
            ? `${formatDashboardDate(fromDate)} – ${formatDashboardDate(toDate)}`
            : "Selected date range",
      customerCount: filteredCustomers.length,
      transactionCount: filteredTransactions.length,
      highRisk: riskData[2].value,
      pendingProfiles: filteredCustomers.filter((customer) =>
        /DRAFT|PENDING/.test((customer.status || "").toUpperCase()),
      ).length,
      transactionReviews: transactionData[1].value + transactionData[2].value,
    };
  }, [customers, fromDate, range, toDate, transactions]);

  return (
    <AuthGuard requiredRole="BANK_OFFICER">
      <div className="flex h-screen overflow-hidden bg-[linear-gradient(180deg,#0b1a3a_0%,#0a234c_58%,#08142d_100%)]">
        <Sidebar role="BANK_OFFICER" className="h-full max-lg:hidden" />
        <main className="flex h-full flex-1 flex-col overflow-hidden bg-[#f3f4f6] p-3 shadow-2xl sm:p-5 lg:rounded-l-[28px] lg:p-7">
          <ModuleHeader
            theme="staff"
            menuMode="sidebar-overlay"
            sidebarRole="BANK_OFFICER"
            sidebarHideCollapse
            name="Kamal Edirisinghe"
            role="Bank Officer"
            title="Dashboard"
            className="mb-5 shrink-0"
          />
          <div className="min-h-0 flex-1 overflow-y-auto pr-1">
            {isLoading ? (
              <State
                title="Loading dashboard"
                description="Fetching customer and transaction data."
              />
            ) : error ? (
              <State
                title="Dashboard unavailable"
                description={error}
                action="Try again"
                onAction={() => void loadDashboard()}
              />
            ) : (
              <>
                <section className="mb-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                  <NumberCard
                    label="Total customers"
                    value={overview.customerCount}
                    note="Customer directory"
                    href="/bank-officer/all-customers"
                    highlight
                  />
                  <NumberCard
                    label="High-risk customers"
                    value={overview.highRisk}
                    note="Credit portfolio"
                    href="/bank-officer/credit-analysis"
                    valueClassName="text-red-600"
                  />
                  <NumberCard
                    label="Pending profiles"
                    value={overview.pendingProfiles}
                    note="Open work queue"
                    href="/bank-officer/work-queue"
                  />
                  <NumberCard
                    label="Transaction reviews"
                    value={overview.transactionReviews}
                    note="Transfer history"
                    href="/bank-officer/transactions"
                  />
                </section>
                <section className="relative z-[100] mb-6 flex flex-col gap-3 rounded-2xl border border-white/90 bg-white/80 p-4 shadow-[0_18px_38px_-28px_rgba(13,59,102,0.45)] backdrop-blur-md sm:flex-row sm:items-end">
                  <Select
                    value={range}
                    onValueChange={(value) => selectRange(value as DateRange)}
                    className="sm:w-44"
                  >
                    <SelectTrigger className="h-10 w-full rounded-xl border-sky-100 bg-sky-50/60 font-medium text-[#0d3b66] shadow-inner">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">Last 30 days</SelectItem>
                      <SelectItem value="90">Last 90 days</SelectItem>
                      <SelectItem value="365">Last year</SelectItem>
                      <SelectItem value="all">All time</SelectItem>
                      <SelectItem value="custom">Custom range</SelectItem>
                    </SelectContent>
                  </Select>
                  <label className="flex flex-1 flex-col gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                    From
                    <input
                      type="date"
                      value={fromDate}
                      onChange={(event) => {
                        setFromDate(event.target.value);
                        setRange("custom");
                      }}
                      className="h-10 rounded-xl border border-slate-200/90 bg-white px-3 text-sm font-semibold normal-case tracking-normal text-slate-700 outline-none transition focus:border-[#0d3b66] focus:ring-2 focus:ring-sky-100"
                    />
                  </label>
                  <label className="flex flex-1 flex-col gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                    To
                    <input
                      type="date"
                      value={toDate}
                      onChange={(event) => {
                        setToDate(event.target.value);
                        setRange("custom");
                      }}
                      className="h-10 rounded-xl border border-slate-200/90 bg-white px-3 text-sm font-semibold normal-case tracking-normal text-slate-700 outline-none transition focus:border-[#0d3b66] focus:ring-2 focus:ring-sky-100"
                    />
                  </label>
                </section>
                <section className="relative z-0 grid items-stretch gap-6 xl:grid-cols-[1.35fr_1fr]">
                  <ChartCard
                    title="Customer risk distribution"
                    description={`${overview.customerCount} updated customer profiles · ${overview.dateRangeLabel}`}
                    actionHref="/bank-officer/credit-analysis"
                    actionLabel="Credit Review"
                  >
                    <ResponsiveContainer width="100%" height={260}>
                      <BarChart
                        key={`customer-risk-${overview.chartRangeKey}`}
                        data={overview.riskData}
                        margin={{ top: 12, right: 12, left: -20, bottom: 0 }}
                      >
                        <XAxis
                          dataKey="name"
                          tickLine={false}
                          axisLine={false}
                          tick={{ fill: "#64748b", fontSize: 12 }}
                        />
                        <YAxis
                          allowDecimals={false}
                          tickLine={false}
                          axisLine={false}
                          tick={{ fill: "#94a3b8", fontSize: 12 }}
                        />
                        <Tooltip cursor={{ fill: "#edf6ff" }} />
                        <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                          {overview.riskData.map((entry, index) => (
                            <Cell key={entry.name} fill={riskColors[index]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartCard>
                  <ChartCard
                    title="Transaction status"
                    description={`${overview.transactionCount} transactions · ${overview.dateRangeLabel}`}
                    actionHref="/bank-officer/transactions"
                    actionLabel="Transactions"
                  >
                    <div className="flex h-[260px] items-center">
                      <ResponsiveContainer width="58%" height="100%">
                        <PieChart key={`transaction-status-${overview.chartRangeKey}`}>
                          <Pie
                            data={overview.transactionData}
                            dataKey="value"
                            innerRadius={52}
                            outerRadius={82}
                            paddingAngle={3}
                          >
                            {overview.transactionData.map((entry, index) => (
                              <Cell
                                key={entry.name}
                                fill={transactionColors[index]}
                              />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="space-y-3">
                        {overview.transactionData.map((item, index) => (
                          <div
                            key={item.name}
                            className="flex items-center gap-2 text-sm text-slate-600"
                          >
                            <span
                              className="h-2.5 w-2.5 rounded-full"
                              style={{
                                backgroundColor: transactionColors[index],
                              }}
                            />
                            <span>{item.name}</span>
                            <span className="font-semibold text-slate-800">
                              {item.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </ChartCard>
                </section>
              </>
            )}
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}

function NumberCard({
  label,
  value,
  note,
  href,
  highlight = false,
  valueClassName,
}: {
  label: string;
  value: number;
  note: string;
  href: string;
  highlight?: boolean;
  valueClassName?: string;
}) {
  return (
    <Link
      href={href}
      className={`flex min-h-[148px] flex-col justify-between rounded-xl p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3e9fd3] focus-visible:ring-offset-2 ${
        highlight
          ? "bg-[#0d3b66] text-white shadow-lg"
          : "border border-slate-100 bg-white shadow-sm"
      }`}
    >
      <p className={`mb-2 text-xs font-bold uppercase tracking-wider ${highlight ? "text-blue-200" : "text-slate-400"}`}>
        {label}
      </p>
      <p className={`mb-2 text-3xl font-bold ${highlight ? "text-white" : valueClassName ?? "text-[#0d3b66]"}`}>
        {value}
      </p>
      <p className={`text-xs font-medium ${highlight ? "text-emerald-300" : "text-slate-500"}`}>{note}</p>
    </Link>
  );
}
function ChartCard({
  title,
  description,
  actionHref,
  actionLabel,
  children,
}: {
  title: string;
  description: string;
  actionHref: string;
  actionLabel: string;
  children: ReactNode;
}) {
  return (
    <section className="relative flex min-h-[372px] flex-col overflow-hidden rounded-2xl border border-white/90 bg-white/90 p-5 shadow-[0_20px_44px_-32px_rgba(13,59,102,0.5)] backdrop-blur-md sm:p-6">
      <span className="absolute left-0 top-0 h-1 w-16 rounded-r-full bg-[#0d3b66]" />
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="font-semibold tracking-tight text-[#0d3b66]">
            {title}
          </h2>
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        </div>
        <Link
          href={actionHref}
          className="shrink-0 rounded-full border border-sky-100 bg-sky-50 px-3 py-1.5 text-xs font-bold tracking-wide text-[#0d3b66] transition hover:border-sky-200 hover:bg-sky-100"
        >
          {actionLabel}
        </Link>
      </div>
      <div className="flex-1 border-t border-slate-100/90 pt-2">{children}</div>
    </section>
  );
}
function State({
  title,
  description,
  action,
  onAction,
}: {
  title: string;
  description: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-10 text-center shadow-sm">
      <ClipboardCheck className="mx-auto text-slate-400" size={24} />
      <h2 className="mt-3 font-semibold text-slate-800">{title}</h2>
      <p className="mt-2 text-sm text-slate-500">{description}</p>
      {action && onAction && (
        <Button className="mt-4" onClick={onAction}>
          {action}
        </Button>
      )}
    </div>
  );
}
function daysAgo(days: number) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
}
function dateInputValue(value: Date) {
  return value.toISOString().slice(0, 10);
}

function formatDashboardDate(value: string) {
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(date);
}
