"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Download, Eye, Search } from "lucide-react";
import { AuthGuard } from "@/src/components/auth";
import { Sidebar } from "@/src/components/layout";
import { getOfficerCreditHistory } from "@/src/api/creditlens/officer-creditlens.service";
import type { OfficerCreditHistoryItemResponse } from "@/src/types/dto/officer-creditlens.dto";
import ModuleHeader from "@/src/components/ui/module-header";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table";
import { TableActionIconButton } from "@/src/components/ui/table-action-icon-button";

type RiskFilter = "all" | "LOW" | "MEDIUM" | "HIGH";
type RangeFilter = "all" | "30" | "90" | "365";

export default function HistoryPage() {
  const router = useRouter();
  const [items, setItems] = useState<OfficerCreditHistoryItemResponse[]>([]);
  const [query, setQuery] = useState("");
  const [risk, setRisk] = useState<RiskFilter>("all");
  const [range, setRange] = useState<RangeFilter>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadHistory = async () => {
    try {
      setIsLoading(true); setError(null);
      setItems(await getOfficerCreditHistory());
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to load officer history.");
    } finally { setIsLoading(false); }
  };

  useEffect(() => { void loadHistory(); }, []);

  const visibleItems = useMemo(() => {
    const threshold = range === "all" ? null : Date.now() - Number(range) * 86_400_000;
    return items.filter((item) => `${item.customerName} ${item.customerCode} ${item.evaluationSource}`.toLowerCase().includes(query.toLowerCase()) && (risk === "all" || item.riskLevel.toUpperCase() === risk) && (threshold === null || new Date(item.createdAt).getTime() >= threshold));
  }, [items, query, range, risk]);

  const exportCsv = () => {
    const rows = [["Timestamp", "Customer", "Customer Code", "Activity", "Risk Score", "Risk Level"], ...visibleItems.map((item) => [formatDateTime(item.createdAt), item.customerName, item.customerCode, sourceLabel(item.evaluationSource), String(item.totalRiskPoints), item.riskLabel])];
    const csv = rows.map((row) => row.map((value) => `"${value.replaceAll('"', '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" })); const link = document.createElement("a");
    link.href = url; link.download = `creditlens-officer-history-${new Date().toISOString().slice(0, 10)}.csv`; link.click(); URL.revokeObjectURL(url);
  };

  return <AuthGuard requiredRole="BANK_OFFICER"><div className="flex h-screen overflow-hidden bg-[linear-gradient(180deg,#0b1a3a_0%,#0a234c_58%,#08142d_100%)]">
    <Sidebar role="BANK_OFFICER" className="h-full max-lg:hidden" />
    <main className="flex h-full flex-1 flex-col overflow-hidden bg-[#f3f4f6] p-3 shadow-2xl sm:p-5 lg:rounded-l-[28px] lg:p-7">
      <ModuleHeader theme="staff" menuMode="sidebar-overlay" sidebarRole="BANK_OFFICER" sidebarHideCollapse name="Kamal Edirisinghe" role="Bank Officer" title="History" className="mb-6 shrink-0" />
      <div className="min-h-0 flex-1 overflow-y-auto">
        <section className="mb-6 rounded-xl border border-slate-100 bg-white p-4 shadow-sm"><div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="flex w-full gap-2 lg:w-auto"><div className="relative min-w-0 flex-1 lg:w-80"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search customer or activity" className="bg-slate-50 pl-9" /></div><Button variant="outline" onClick={exportCsv} disabled={!visibleItems.length}><Download size={15} className="mr-2" />Export</Button></div>
          <div className="flex flex-col gap-3 sm:flex-row lg:ml-auto"><Select value={range} onValueChange={(value) => setRange(value as RangeFilter)}><SelectTrigger className="w-full sm:w-40"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All time</SelectItem><SelectItem value="30">Last 30 days</SelectItem><SelectItem value="90">Last 90 days</SelectItem><SelectItem value="365">Last year</SelectItem></SelectContent></Select><Select value={risk} onValueChange={(value) => setRisk(value as RiskFilter)}><SelectTrigger className="w-full sm:w-40"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All risk levels</SelectItem><SelectItem value="LOW">Low risk</SelectItem><SelectItem value="MEDIUM">Medium risk</SelectItem><SelectItem value="HIGH">High risk</SelectItem></SelectContent></Select></div>
        </div></section>
        <section className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm"><div className="border-b border-slate-100 px-5 py-4"><h2 className="font-semibold text-slate-800">Credit evaluation activity</h2><p className="mt-1 text-sm text-slate-500">A live record of evaluations for customers assigned to you.</p></div>
          {isLoading ? <State message="Loading activity history…" /> : error ? <State message={error} action="Try again" onAction={() => void loadHistory()} /> : <div className="overflow-x-auto"><Table><TableHeader className="bg-sky-50/70"><TableRow><TableHead>Timestamp</TableHead><TableHead>Customer</TableHead><TableHead>Activity</TableHead><TableHead>Risk score</TableHead><TableHead>Risk level</TableHead><TableHead className="text-right">Action</TableHead></TableRow></TableHeader><TableBody>{visibleItems.map((item) => <TableRow key={item.bankEvaluationId}><TableCell className="whitespace-nowrap text-slate-600">{formatDateTime(item.createdAt)}</TableCell><TableCell><p className="font-semibold text-slate-800">{item.customerName}</p><p className="text-xs text-slate-400">{item.customerCode}</p></TableCell><TableCell className="font-medium text-slate-700">{sourceLabel(item.evaluationSource)}</TableCell><TableCell className="font-semibold text-slate-800">{item.totalRiskPoints}/100</TableCell><TableCell><Badge className={riskBadge(item.riskLevel)}>{item.riskLabel} risk</Badge></TableCell><TableCell className="text-right"><TableActionIconButton label={`View ${item.customerName}'s evaluation`} tone="blue" onClick={() => router.push(`/bank-officer/credit-analysis/evaluation/${item.bankCustomerId}?evaluationId=${item.bankEvaluationId}&name=${encodeURIComponent(item.customerName)}`)}><Eye size={16} /></TableActionIconButton></TableCell></TableRow>)}{visibleItems.length === 0 && <TableRow><TableCell colSpan={6} className="py-12 text-center text-slate-500">No evaluation activity matches these filters.</TableCell></TableRow>}</TableBody></Table></div>}
          {!isLoading && !error && <div className="border-t border-slate-100 bg-slate-50/50 px-5 py-3 text-sm text-slate-500">Showing <span className="font-semibold text-slate-800">{visibleItems.length}</span> of {items.length} activities</div>}
        </section>
      </div>
    </main>
  </div></AuthGuard>;
}

function State({ message, action, onAction }: { message: string; action?: string; onAction?: () => void }) { return <div className="p-10 text-center text-slate-500"><p>{message}</p>{action && onAction && <Button className="mt-4" onClick={onAction}>{action}</Button>}</div>; }
function formatDateTime(value: string) { const date = new Date(value); return Number.isNaN(date.getTime()) ? value : date.toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" }); }
function sourceLabel(source: string) { return source.replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase()) + " evaluation"; }
function riskBadge(risk: string) { const value = risk.toUpperCase(); return value === "LOW" ? "border-0 bg-emerald-100 text-emerald-700" : value === "HIGH" ? "border-0 bg-red-100 text-red-700" : "border-0 bg-amber-100 text-amber-700"; }
