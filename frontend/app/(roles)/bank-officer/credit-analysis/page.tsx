"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/src/components/layout";
import { AuthGuard } from "@/src/components/auth";
import { Search, Filter, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { BankOfficerHeader } from "@/src/components/ui/bank-officer-header";
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

type RiskType = "low" | "medium" | "high";

type CustomerRow = {
  id: string;
  name: string;
  score: number;
  risk: RiskType;
  date: string;
  initials: string;
  avatarClass: string;
};

const customerRows: CustomerRow[] = [
  { id: "C-48292", name: "Amila Silva", score: 82, risk: "low", date: "Oct 24, 2023", initials: "AS", avatarClass: "bg-cyan-100 text-cyan-600" },
  { id: "C-48293", name: "Kasun Perera", score: 65, risk: "medium", date: "Oct 24, 2023", initials: "KP", avatarClass: "bg-amber-100 text-amber-600" },
  { id: "C-48294", name: "Ruwan Fernando", score: 45, risk: "high", date: "Oct 23, 2023", initials: "RF", avatarClass: "bg-red-100 text-red-600" },
  { id: "C-48295", name: "Malani Jayasinghe", score: 90, risk: "low", date: "Oct 23, 2023", initials: "MJ", avatarClass: "bg-purple-100 text-purple-600" },
  { id: "C-48296", name: "Sunil Gunawardena", score: 72, risk: "medium", date: "Oct 22, 2023", initials: "SG", avatarClass: "bg-blue-100 text-blue-600" },
];

const tabOptions: Array<{ key: "all" | RiskType; label: string }> = [
  { key: "all", label: "All Customers" },
  { key: "low", label: "Low Risk" },
  { key: "medium", label: "Medium Risk" },
  { key: "high", label: "High Risk" },
];

export default function CreditAnalysisPage() {
  const [activeTab, setActiveTab] = useState<"all" | RiskType>("all");
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [scoreFilter, setScoreFilter] = useState<"all" | "high" | "medium" | "low">("all");
  const [sortBy, setSortBy] = useState<"date-desc" | "date-asc" | "score-desc" | "score-asc" | "name-asc" | "name-desc">("date-desc");
  const router = useRouter();

  const filteredRows = useMemo(() => {
    const filtered = customerRows.filter((item) => {
      const byTab = activeTab === "all" ? true : item.risk === activeTab;
      const byQuery = `${item.id} ${item.name}`.toLowerCase().includes(query.toLowerCase());
      const byScore =
        scoreFilter === "all"
          ? true
          : scoreFilter === "high"
            ? item.score >= 80
            : scoreFilter === "medium"
              ? item.score >= 60 && item.score < 80
              : item.score < 60;
      return byTab && byQuery && byScore;
    });

    return [...filtered].sort((left, right) => {
      switch (sortBy) {
        case "date-asc":
          return new Date(left.date).getTime() - new Date(right.date).getTime();
        case "date-desc":
          return new Date(right.date).getTime() - new Date(left.date).getTime();
        case "score-asc":
          return left.score - right.score;
        case "score-desc":
          return right.score - left.score;
        case "name-asc":
          return left.name.localeCompare(right.name);
        case "name-desc":
          return right.name.localeCompare(left.name);
        default:
          return 0;
      }
    });
  }, [activeTab, query, scoreFilter, sortBy]);

  const handleExport = () => {
    const header = ["Customer ID", "Name", "Credit Score", "Risk", "Evaluation Date"];
    const rows = filteredRows.map((customer) => [
      customer.id,
      customer.name,
      customer.score.toString(),
      customer.risk,
      customer.date,
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
      <div className="flex h-screen bg-[#f3f4f6] overflow-hidden">
        <Sidebar role="BANK_OFFICER" className="max-lg:hidden h-full" />
        <main className="flex-1 flex flex-col p-3 sm:p-5 lg:p-7 h-full overflow-hidden">
          <BankOfficerHeader title="Credit Analysis" className="mb-6 shrink-0" />

          <div className="flex-1 overflow-y-auto min-h-0">
          <div className="mb-8 text-sm text-slate-500">
            Dashboard <span className="mx-2 text-slate-400">▶</span> <span className="text-[#3e9fd3] font-medium">Credit Analysis</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatCard title="TOTAL CUSTOMERS" value="2,450" trend="+2.5%" highlight />
            <StatCard title="LOW RISK" value="1,820" trend="+1.2%" />
            <StatCard title="MEDIUM RISK" value="420" trend="-0.8%" trendClass="text-amber-500" />
            <StatCard title="HIGH RISK" value="210" trend="+4.1%" trendClass="text-red-500" />
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-4 md:p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-slate-50/40">
              <div className="relative w-full md:max-w-lg">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <Input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search by ID or name"
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
                <Select value={scoreFilter} onValueChange={(value) => setScoreFilter(value as "all" | "high" | "medium" | "low") }>
                  <SelectTrigger>
                    <SelectValue placeholder="Score range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Scores</SelectItem>
                    <SelectItem value="high">High (80+)</SelectItem>
                    <SelectItem value="medium">Medium (60-79)</SelectItem>
                    <SelectItem value="low">Low (&lt;60)</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={(value) => setSortBy(value as "date-desc" | "date-asc" | "score-desc" | "score-asc" | "name-asc" | "name-desc") }>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date-desc">Newest Date</SelectItem>
                    <SelectItem value="date-asc">Oldest Date</SelectItem>
                    <SelectItem value="score-desc">Score: High to Low</SelectItem>
                    <SelectItem value="score-asc">Score: Low to High</SelectItem>
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
                  <TableHead className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">Credit Score</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">Risk Badge</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">Evaluation Date</TableHead>
                  <TableHead className="text-right text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRows.map((customer) => (
                  <TableRow key={customer.id} className="hover:bg-slate-50/70">
                    <TableCell className="font-semibold text-[#0d3b66]">#{customer.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold ${customer.avatarClass}`}>
                          {customer.initials}
                        </div>
                        <span className="font-semibold text-slate-800">{customer.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 font-bold text-slate-800">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        {customer.score}/100
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`uppercase text-[10px] border-0 ${
                        customer.risk === "low"
                          ? "bg-emerald-100 text-emerald-700"
                          : customer.risk === "medium"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-red-100 text-red-700"
                      }`}>
                        {customer.risk} Risk
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-500">{customer.date}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 text-xs bg-sky-50 text-[#0d3b66] border-sky-100"
                          onClick={() =>
                            router.push(
                              `/bank-officer/credit-analysis/evaluation/${customer.id}?name=${encodeURIComponent(customer.name)}`,
                            )
                          }
                        >
                          View Evaluation
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 text-xs bg-white text-slate-600 border-slate-200"
                          onClick={() =>
                            router.push(
                              `/bank-officer/credit-analysis/customer/${customer.id}?name=${encodeURIComponent(customer.name)}`,
                            )
                          }
                        >
                          View Customer
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}

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
                Showing <span className="font-semibold text-slate-800">{filteredRows.length === 0 ? 0 : 1}-{filteredRows.length}</span> of {filteredRows.length}
              </p>
              <div className="flex items-center gap-2">
                <Button size="icon" variant="outline" className="w-8 h-8" disabled>
                  <ChevronLeft size={14} className="text-slate-400" />
                </Button>
                <Button size="icon" variant="outline" className="w-8 h-8 text-xs bg-[#3e9fd3] text-white border-[#3e9fd3]">1</Button>
                <Button size="icon" variant="outline" className="w-8 h-8 text-xs text-slate-600">2</Button>
                <Button size="icon" variant="outline" className="w-8 h-8 text-xs text-slate-600">3</Button>
                <Button size="icon" variant="outline" className="w-8 h-8 text-xs text-slate-600">245</Button>
                <Button size="icon" variant="outline" className="w-8 h-8">
                  <ChevronRight size={14} className="text-slate-600" />
                </Button>
              </div>
            </div>
          </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}

function StatCard({
  title,
  value,
  trend,
  highlight,
  trendClass,
}: {
  title: string;
  value: string;
  trend: string;
  highlight?: boolean;
  trendClass?: string;
}) {
  return (
    <div className={`rounded-xl p-6 border shadow-sm ${highlight ? "bg-[#0d3b66] text-white border-[#0d3b66]" : "bg-white border-slate-100"}`}>
      <p className={`text-xs font-bold tracking-wider mb-2 ${highlight ? "text-white/60" : "text-slate-400"}`}>{title}</p>
      <div className="flex items-center gap-2">
        <span className={`text-4xl font-bold ${highlight ? "text-white" : "text-[#0d3b66]"}`}>{value}</span>
        <span className={`text-xs font-semibold ${trendClass || (highlight ? "text-emerald-300" : "text-emerald-500")}`}>{trend}</span>
      </div>
    </div>
  );
}
