"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Sidebar } from "@/src/components/layout";
import { AuthGuard } from "@/src/components/auth";
import { Bell, Mail, Search, Filter, Download, ChevronLeft, ChevronRight } from "lucide-react";
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
  const router = useRouter();

  const filteredRows = useMemo(() => {
    return customerRows.filter((item) => {
      const byTab = activeTab === "all" ? true : item.risk === activeTab;
      const byQuery = `${item.id} ${item.name}`.toLowerCase().includes(query.toLowerCase());
      return byTab && byQuery;
    });
  }, [activeTab, query]);

  return (
    <AuthGuard requiredRole="BANK_OFFICER">
      <div className="flex min-h-screen bg-[#f3f4f6]">
        <Sidebar role="BANK_OFFICER" className="max-lg:hidden" />
        <main className="flex-1 p-8 lg:p-10 overflow-y-auto w-full max-w-400 mx-auto">
          <header className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between rounded-xl bg-[linear-gradient(180deg,#0b1a3a_0%,#0a234c_58%,#08142d_100%)] p-4 text-white shadow-sm">
            <h1 className="text-2xl font-semibold tracking-tight">Credit Analysis</h1>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4">
                <button className="relative text-white/80 hover:text-white">
                  <Mail size={20} />
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold">2</span>
                </button>
                <button className="relative text-white/80 hover:text-white">
                  <Bell size={20} />
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold">8</span>
                </button>
              </div>
              <div className="h-8 w-px bg-white/20" />
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full bg-white/10">
                  <Image src="https://ui-avatars.com/api/?name=Kamal+E&background=random" alt="User" fill sizes="40px" className="h-full w-full object-cover" />
                  <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#0d3b66] bg-green-500"></div>
                </div>
                <div className="hidden text-sm md:block">
                  <p className="font-semibold leading-none">Kamal Edirisinghe</p>
                  <p className="text-white/60">User</p>
                </div>
              </div>
            </div>
          </header>

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
                <Button variant="outline" className="h-10 gap-2 bg-white text-slate-600 border-slate-200">
                  <Filter size={14} /> Filter
                </Button>
                <Button variant="outline" className="h-10 gap-2 bg-white text-slate-600 border-slate-200">
                  <Download size={14} /> Export
                </Button>
              </div>
            </div>

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
              </TableBody>
            </Table>

            <div className="p-4 bg-sky-50/70 border-t border-slate-100 flex items-center justify-between">
              <p className="text-sm text-slate-500">
                Showing <span className="font-semibold text-slate-800">1-10</span> of 2,450
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
