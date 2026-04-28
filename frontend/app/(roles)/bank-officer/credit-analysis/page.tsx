"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/src/components/layout";
import { AuthGuard } from "@/src/components/auth";
import { Search, Filter, Download } from "lucide-react";
import ModuleHeader from "@/src/components/ui/module-header";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Badge } from "@/src/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { getOfficerCreditDashboard } from "@/src/api/creditlens/officer-creditlens.service";
import type {
  BankCreditAnalysisDashboardResponse,
} from "@/src/types/dto/officer-creditlens.dto";

type RiskType = "low" | "medium" | "high";

type SortKey =
  | "date-desc"
  | "date-asc"
  | "score-desc"
  | "score-asc"
  | "name-asc"
  | "name-desc";

const tabOptions: Array<{ key: "all" | RiskType; label: string }> = [
  { key: "all", label: "All Customers" },
  { key: "low", label: "Low Risk" },
  { key: "medium", label: "Medium Risk" },
  { key: "high", label: "High Risk" },
];

function toRiskType(value: string): RiskType {
  const normalized = (value ?? "").trim().toUpperCase();
  if (normalized === "LOW") return "low";
  if (normalized === "MEDIUM") return "medium";
  return "high";
}

function buildInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return parts.slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "").join("") || "--";
}

export default function CreditAnalysisPage() {
  const router = useRouter();
  const [dashboard, setDashboard] = useState<BankCreditAnalysisDashboardResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | RiskType>("all");
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [scoreFilter, setScoreFilter] = useState<"all" | "low" | "medium" | "high">("all");
  const [sortBy, setSortBy] = useState<SortKey>("date-desc");

  useEffect(() => {
    let isActive = true;

    const loadDashboard = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await getOfficerCreditDashboard();
        if (isActive) {
          setDashboard(response);
        }
      } catch (unknownError) {
        const message = unknownError instanceof Error
          ? unknownError.message
          : "Unable to load the CreditLens customer portfolio.";
        if (isActive) {
          setError(message);
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    void loadDashboard();

    return () => {
      isActive = false;
    };
  }, []);

  // dashboard is loaded in the primary effect above; no duplicate loader here

  const filteredRows = useMemo(() => {
    const sourceRows = dashboard?.customers ?? [];
    const filtered = sourceRows.filter((item) => {
      const normalizedRisk = toRiskType(item.riskLevel);
      const byTab = activeTab === "all" ? true : normalizedRisk === activeTab;
      const byQuery = `${item.customerCode} ${item.fullName} ${item.email} ${item.phone}`
        .toLowerCase()
        .includes(query.toLowerCase());
      const byScore =
        scoreFilter === "all"
          ? true
          : scoreFilter === "low"
            ? item.totalRiskPoints < 40
            : scoreFilter === "medium"
              ? item.totalRiskPoints >= 40 && item.totalRiskPoints < 70
              : item.totalRiskPoints >= 70;
      return byTab && byQuery && byScore;
    });

    return [...filtered].sort((left, right) => {
      switch (sortBy) {
        case "date-asc":
          return new Date(left.evaluationDate).getTime() - new Date(right.evaluationDate).getTime();
        case "date-desc":
          return new Date(right.evaluationDate).getTime() - new Date(left.evaluationDate).getTime();
        case "score-asc":
          return left.totalRiskPoints - right.totalRiskPoints;
        case "score-desc":
          return right.totalRiskPoints - left.totalRiskPoints;
        case "name-asc":
          return left.fullName.localeCompare(right.fullName);
        case "name-desc":
          return right.fullName.localeCompare(left.fullName);
        default:
          return 0;
      }
    });
  }, [activeTab, dashboard?.customers, query, scoreFilter, sortBy]);

  const handleExport = () => {
    const header = ["Customer Code", "Customer Name", "Risk Score", "Risk Badge", "Evaluation Date"];
    const rows = filteredRows.map((customer) => [
      customer.customerCode,
      customer.fullName,
      customer.totalRiskPoints.toString(),
      customer.riskLabel,
      formatDate(customer.evaluationDate),
    ]);

    const csv = [header, ...rows]
      .map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `bank-officer-credit-analysis-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AuthGuard requiredRole="BANK_OFFICER">
      <div className="flex h-screen bg-[linear-gradient(180deg,#0b1a3a_0%,#0a234c_58%,#08142d_100%)] overflow-hidden">
        <Sidebar role="BANK_OFFICER" className="max-lg:hidden h-full" />
        <main className="flex-1 flex flex-col bg-[#f3f4f6] p-3 shadow-2xl sm:p-5 lg:p-7 h-full overflow-hidden lg:rounded-l-[28px]">
          <ModuleHeader
            theme="staff"
            menuMode="sidebar-overlay"
            sidebarRole="BANK_OFFICER"
            sidebarHideCollapse
            mailBadge={2}
            notificationBadge={8}
            avatarSrc="https://ui-avatars.com/api/?name=Kamal+E&background=random"
            avatarStatusDot
            name="Kamal Edirisinghe"
            role="Bank Officer"
            title="Credit Analysis"
            className="mb-6 shrink-0"
          />

          <div className="flex-1 overflow-y-auto min-h-0">
            {isLoading && !dashboard ? (
              <StateCard
                title="Loading credit portfolio"
                description="Fetching your customer risk counts and latest CreditLens evaluations."
              />
            ) : error && !dashboard ? (
              <StateCard
                title="Could not load credit portfolio"
                description={error}
                actionLabel="Try Again"
                onAction={() => window.location.reload()}
              />
            ) : dashboard ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 creditlens-stagger-4">
                  <div className="creditlens-card creditlens-card-hover creditlens-delay-1">
                    <StatCard title="TOTAL CUSTOMERS" value={dashboard.totalCustomers.toLocaleString()} note="Owned portfolio" highlight />
                  </div>
                  <div className="creditlens-card creditlens-card-hover creditlens-delay-2">
                    <StatCard title="LOW RISK" value={dashboard.lowRiskCount.toLocaleString()} note="Latest evaluations" />
                  </div>
                  <div className="creditlens-card creditlens-card-hover creditlens-delay-3">
                    <StatCard title="MEDIUM RISK" value={dashboard.mediumRiskCount.toLocaleString()} note="Needs monitoring" noteClass="text-amber-500" />
                  </div>
                  <div className="creditlens-card creditlens-card-hover creditlens-delay-4">
                    <StatCard title="HIGH RISK" value={dashboard.highRiskCount.toLocaleString()} note="Priority reviews" noteClass="text-red-500" />
                  </div>
                </div>

                <div className="creditlens-card creditlens-card-hover creditlens-delay-1 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                  <div className="p-4 md:p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-slate-50/40">
                    <div className="relative w-full md:max-w-lg">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <Input
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Search by customer code, name, email, or phone"
                        className="pl-9 h-10 bg-sky-50/60 border-sky-100"
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="h-10 gap-2 bg-white text-slate-600 border-slate-200"
                        onClick={() => setShowFilters((previous) => !previous)}
                      >
                        <Filter size={14} /> Filter
                      </Button>
                      <Button variant="outline" className="h-10 gap-2 bg-white text-slate-600 border-slate-200" onClick={handleExport}>
                        <Download size={14} /> Export
                      </Button>
                    </div>
                  </div>

                  {showFilters && (
                    <div className="p-4 md:px-6 border-b border-slate-100 grid gap-3 md:grid-cols-3 bg-white">
                      <Select value={scoreFilter} onValueChange={(value) => setScoreFilter(value as "all" | "low" | "medium" | "high")}>
                        <SelectTrigger>
                          <SelectValue placeholder="Risk score range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Risk Scores</SelectItem>
                          <SelectItem value="low">Low Risk (below 40)</SelectItem>
                          <SelectItem value="medium">Medium Risk (40-69)</SelectItem>
                          <SelectItem value="high">High Risk (70+)</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortKey)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="date-desc">Newest Date</SelectItem>
                          <SelectItem value="date-asc">Oldest Date</SelectItem>
                          <SelectItem value="score-desc">Risk Score: High to Low</SelectItem>
                          <SelectItem value="score-asc">Risk Score: Low to High</SelectItem>
                          <SelectItem value="name-asc">Name: A to Z</SelectItem>
                          <SelectItem value="name-desc">Name: Z to A</SelectItem>
                        </SelectContent>
                      </Select>

                      <Button
                        variant="outline"
                        onClick={() => {
                          setQuery("");
                          setActiveTab("all");
                          setScoreFilter("all");
                          setSortBy("date-desc");
                        }}
                      >
                        Reset Filters
                      </Button>
                    </div>
                  )}

                  <div className="px-4 md:px-6 py-3 border-b border-slate-100 bg-sky-50/50">
                    <div className="inline-flex p-1 rounded-lg bg-sky-100/70 gap-1">
                      {tabOptions.map((tab) => (
                        <button
                          key={tab.key}
                          onClick={() => setActiveTab(tab.key)}
                          className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
                            activeTab === tab.key
                              ? "bg-white text-[#0d3b66] shadow-sm"
                              : "text-slate-500 hover:text-slate-700"
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Table>
                    <TableHeader className="bg-sky-50/70">
                      <TableRow>
                        <TableHead className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">Customer</TableHead>
                        <TableHead className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">Customer Name</TableHead>
                        <TableHead className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">Risk Score</TableHead>
                        <TableHead className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">Risk Badge</TableHead>
                        <TableHead className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">Evaluation Date</TableHead>
                        <TableHead className="text-right text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRows.map((customer) => {
                        const normalizedRisk = toRiskType(customer.riskLevel);
                        const initials = buildInitials(customer.fullName);

                        return (
                          <TableRow key={`${customer.bankCustomerId}-${customer.bankEvaluationId}`} className="hover:bg-slate-50/70">
                            <TableCell className="font-semibold text-[#0d3b66]">#{customer.customerCode}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold ${avatarClasses(normalizedRisk)}`}>
                                  {initials}
                                </div>
                                <span className="font-semibold text-slate-800">{customer.fullName}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2 font-bold text-slate-800">
                                <span className={`w-2 h-2 rounded-full ${indicatorClasses(normalizedRisk)}`} />
                                {customer.totalRiskPoints}/100
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className={`uppercase text-[10px] border-0 ${badgeClasses(normalizedRisk)}`}>
                                {customer.riskLabel} Risk
                              </Badge>
                            </TableCell>
                            <TableCell className="text-slate-500">{formatDate(customer.evaluationDate)}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 text-xs bg-sky-50 text-[#0d3b66] border-sky-100"
                                  onClick={() =>
                                    router.push(
                                      `/bank-officer/credit-analysis/evaluation/${customer.bankCustomerId}?name=${encodeURIComponent(customer.fullName)}`,
                                    )
                                  }
                                >
                                  View Evaluation
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}

                      {filteredRows.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={6} className="py-10 text-center text-sm text-slate-500">
                            No customers found for the selected filters.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>

                  <div className="p-4 bg-sky-50/70 border-t border-slate-100 flex items-center justify-between">
                    <p className="text-sm text-slate-500">
                      Showing <span className="font-semibold text-slate-800">{filteredRows.length}</span> of {dashboard.customers.length}
                    </p>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}

function StatCard({
  title,
  value,
  note,
  highlight,
  noteClass,
}: {
  title: string;
  value: string;
  note: string;
  highlight?: boolean;
  noteClass?: string;
}) {
  return (
    <div className={`rounded-xl p-6 border shadow-sm ${highlight ? "bg-[#0d3b66] text-white border-[#0d3b66]" : "bg-white border-slate-100"}`}>
      <p className={`text-xs font-bold tracking-wider mb-2 ${highlight ? "text-white/60" : "text-slate-400"}`}>{title}</p>
      <div className="flex items-center gap-2">
        <span className={`text-4xl font-bold ${highlight ? "text-white" : "text-[#0d3b66]"}`}>{value}</span>
      </div>
      <p className={`mt-2 text-xs font-semibold ${noteClass || (highlight ? "text-emerald-300" : "text-slate-500")}`}>{note}</p>
    </div>
  );
}

function StateCard({
  title,
  description,
  actionLabel,
  onAction,
}: {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="rounded-2xl border border-slate-200/70 bg-white/90 p-8 text-center shadow-[0_20px_55px_-35px_rgba(2,44,67,0.35)]">
      <div className="mx-auto max-w-xl space-y-3">
        <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
        <p className="text-sm text-slate-600">{description}</p>
        {actionLabel && onAction ? (
          <Button onClick={onAction} className="mt-2 rounded-xl bg-[#14517c] px-5 text-white hover:bg-[#103f61]">
            {actionLabel}
          </Button>
        ) : null}
      </div>
    </div>
  );
}

function badgeClasses(risk: RiskType): string {
  if (risk === "low") {
    return "bg-emerald-100 text-emerald-700";
  }
  if (risk === "high") {
    return "bg-red-100 text-red-700";
  }
  return "bg-amber-100 text-amber-700";
}

function avatarClasses(risk: RiskType): string {
  if (risk === "low") {
    return "bg-cyan-100 text-cyan-600";
  }
  if (risk === "high") {
    return "bg-red-100 text-red-600";
  }
  return "bg-amber-100 text-amber-600";
}

function indicatorClasses(risk: RiskType): string {
  if (risk === "low") {
    return "bg-emerald-500";
  }
  if (risk === "high") {
    return "bg-red-500";
  }
  return "bg-amber-500";
}

function formatDate(value: string): string {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
