"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowRight, CheckCircle2, ClipboardCheck, CircleDot, Loader2 } from "lucide-react";
import { AuthGuard } from "@/src/components/auth";
import { Sidebar } from "@/src/components/layout";
import ModuleHeader from "@/src/components/ui/module-header";
import { Badge } from "@/src/components/ui/badge";
import { Button, useToast } from "@/src/components/ui";
import { getBankCustomersForOfficer } from "@/src/api/customers/bank-customer.service";
import { getWorkQueueCases, updateWorkQueueCase } from "@/src/api/customers/work-queue.service";
import type { BankCustomerSummaryResponse } from "@/src/types/dto/bank-customer.dto";
import type { WorkQueueCaseStatus, WorkQueueCaseType } from "@/src/types/dto/work-queue.dto";

type QueueItem = { id: string; userId: number; caseType: WorkQueueCaseType; title: string; detail: string; priority: "High" | "Medium"; href: string; status: WorkQueueCaseStatus };
const statuses: WorkQueueCaseStatus[] = ["OPEN", "IN_PROGRESS", "COMPLETED", "ESCALATED"];
const labels: Record<WorkQueueCaseStatus, string> = { OPEN: "Open", IN_PROGRESS: "In progress", COMPLETED: "Completed", ESCALATED: "Escalated" };
const colours: Record<WorkQueueCaseStatus, string> = { OPEN: "bg-sky-100 text-sky-700", IN_PROGRESS: "bg-violet-100 text-violet-700", COMPLETED: "bg-emerald-100 text-emerald-700", ESCALATED: "bg-red-100 text-red-700" };

export default function WorkQueuePage() {
  const { showToast } = useToast();
  const [customers, setCustomers] = useState<BankCustomerSummaryResponse[]>([]);
  const [caseStatuses, setCaseStatuses] = useState<Record<string, WorkQueueCaseStatus>>({});
  const [filter, setFilter] = useState<WorkQueueCaseStatus | "ALL">("OPEN");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    void Promise.all([getBankCustomersForOfficer(), getWorkQueueCases()]).then(([customerData, caseData]) => {
      if (!active) return;
      setCustomers(customerData);
      setCaseStatuses(Object.fromEntries(caseData.map((item) => [`${item.userId}-${item.caseType}`, item.status])));
    }).catch((loadError) => {
      if (active) setError(loadError instanceof Error ? loadError.message : "Unable to load the work queue.");
    }).finally(() => { if (active) setIsLoading(false); });
    return () => { active = false; };
  }, []);

  const items = useMemo<QueueItem[]>(() => customers.flatMap((customer) => {
    const name = customer.fullName || customer.customerId;
    const pending = /DRAFT|PENDING/.test((customer.status || "").toUpperCase());
    const status = (caseType: WorkQueueCaseType) => caseStatuses[`${customer.userId}-${caseType}`] ?? "OPEN";
    return [
      ...((customer.riskLevel || "").toUpperCase() === "HIGH" ? [{ id: `risk-${customer.userId}`, userId: customer.userId, caseType: "RISK_REVIEW" as const, title: `Review high-risk customer: ${name}`, detail: `Latest CreditLens score: ${customer.creditScore ?? "not available"}/100`, priority: "High" as const, href: "/bank-officer/credit-analysis", status: status("RISK_REVIEW") }] : []),
      ...(pending ? [{ id: `profile-${customer.userId}`, userId: customer.userId, caseType: "PROFILE_COMPLETION" as const, title: `Resume financial profile: ${name}`, detail: `Customer profile status: ${customer.status.replaceAll("_", " ")}`, priority: "Medium" as const, href: `/bank-officer/add-customer?nic=${encodeURIComponent(customer.nic)}`, status: status("PROFILE_COMPLETION") }] : []),
    ];
  }), [caseStatuses, customers]);
  const visibleItems = filter === "ALL" ? items : items.filter((item) => item.status === filter);

  async function setStatus(item: QueueItem, status: WorkQueueCaseStatus) {
    setUpdatingId(item.id);
    try {
      const saved = await updateWorkQueueCase({ userId: item.userId, caseType: item.caseType, status });
      setCaseStatuses((current) => ({ ...current, [`${saved.userId}-${saved.caseType}`]: saved.status }));
      showToast({ type: "success", title: "Case updated", description: `${item.title} is now ${labels[status].toLowerCase()}.` });
    } catch (updateError) {
      showToast({ type: "error", title: "Case not updated", description: updateError instanceof Error ? updateError.message : "Unable to update this case." });
    } finally { setUpdatingId(null); }
  }

  return <AuthGuard requiredRole="BANK_OFFICER"><div className="flex h-screen overflow-hidden bg-[linear-gradient(180deg,#0b1a3a_0%,#0a234c_58%,#08142d_100%)]"><Sidebar role="BANK_OFFICER" className="h-full max-lg:hidden" /><main className="flex h-full flex-1 flex-col overflow-hidden bg-[#f3f4f6] p-3 shadow-2xl sm:p-5 lg:rounded-l-[28px] lg:p-7"><ModuleHeader theme="staff" menuMode="sidebar-overlay" sidebarRole="BANK_OFFICER" sidebarHideCollapse name="Kamal Edirisinghe" role="Bank Officer" title="Work Queue" className="mb-6 shrink-0" /><div className="min-h-0 flex-1 overflow-y-auto"><div className="mb-6 grid gap-4 md:grid-cols-3"><Summary icon={<ClipboardCheck size={20} />} label="Open cases" value={items.filter((item) => item.status === "OPEN").length} /><Summary icon={<AlertTriangle size={20} />} label="Escalated" value={items.filter((item) => item.status === "ESCALATED").length} tone="red" /><Summary icon={<CheckCircle2 size={20} />} label="Completed" value={items.filter((item) => item.status === "COMPLETED").length} tone="green" /></div><section className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm"><div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="font-semibold text-slate-800">Actionable cases</h2><p className="mt-1 text-sm text-slate-500">Case status is shared so another officer can continue when needed.</p></div><div className="flex flex-wrap gap-1 rounded-lg bg-slate-100 p-1">{(["ALL", ...statuses] as const).map((status) => <button key={status} type="button" onClick={() => setFilter(status)} className={`rounded-md px-3 py-1.5 text-xs font-semibold ${filter === status ? "bg-white text-[#0d3b66] shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>{status === "ALL" ? "All" : labels[status]}</button>)}</div></div>{isLoading ? <p className="p-10 text-center text-slate-500">Loading work queue…</p> : error ? <p className="p-10 text-center text-red-600">{error}</p> : visibleItems.length === 0 ? <p className="p-10 text-center text-slate-500">No {filter === "ALL" ? "" : `${labels[filter].toLowerCase()} `}cases right now.</p> : <div className="divide-y divide-slate-100">{visibleItems.map((item) => <div key={item.id} className="flex flex-col gap-4 p-5 xl:flex-row xl:items-center xl:justify-between"><div><div className="mb-1 flex flex-wrap items-center gap-2"><h3 className="font-semibold text-slate-800">{item.title}</h3><Badge className={`border-0 ${item.priority === "High" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`}>{item.priority}</Badge><Badge className={`border-0 ${colours[item.status]}`}>{labels[item.status]}</Badge></div><p className="text-sm text-slate-500">{item.detail}</p></div><div className="flex flex-wrap items-center gap-2"><Link href={item.href}><Button variant="outline">Open <ArrowRight size={15} className="ml-2" /></Button></Link>{item.status !== "IN_PROGRESS" && item.status !== "COMPLETED" && <Button variant="outline" disabled={updatingId === item.id} onClick={() => void setStatus(item, "IN_PROGRESS")}>{updatingId === item.id ? <Loader2 size={15} className="animate-spin" /> : <CircleDot size={15} className="mr-2" />}Start</Button>}{item.status !== "COMPLETED" && <Button disabled={updatingId === item.id} onClick={() => void setStatus(item, "COMPLETED")}>Complete</Button>}{item.status !== "ESCALATED" && item.status !== "COMPLETED" && <Button variant="outline" disabled={updatingId === item.id} onClick={() => void setStatus(item, "ESCALATED")}>Escalate</Button>}{item.status === "COMPLETED" && <Button variant="outline" disabled={updatingId === item.id} onClick={() => void setStatus(item, "OPEN")}>Reopen</Button>}</div></div>)}</div>}</section></div></main></div></AuthGuard>;
}

function Summary({ icon, label, value, tone = "blue" }: { icon: ReactNode; label: string; value: number; tone?: "blue" | "red" | "green" }) {
	void icon;
  const highlight = label === "Open cases";
  const note = tone === "red" ? "Needs prompt attention" : tone === "green" ? "Resolved customer actions" : "Ready to be worked";
  const valueColor = tone === "red" ? "text-red-600" : tone === "green" ? "text-emerald-600" : "text-[#0d3b66]";
  return <div className={`rounded-xl p-6 ${highlight ? "bg-[#0d3b66] text-white shadow-lg" : "border border-slate-100 bg-white shadow-sm"}`}><p className={`mb-2 text-xs font-bold uppercase tracking-wider ${highlight ? "text-blue-200" : "text-slate-400"}`}>{label}</p><p className={`mb-2 text-3xl font-bold ${highlight ? "text-white" : valueColor}`}>{value}</p><p className={`text-xs font-medium ${highlight ? "text-emerald-300" : "text-slate-500"}`}>{note}</p></div>;
}
