"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowRight, ClipboardCheck, Users } from "lucide-react";
import { AuthGuard } from "@/src/components/auth";
import { Sidebar } from "@/src/components/layout";
import ModuleHeader from "@/src/components/ui/module-header";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { getBankCustomersForOfficer } from "@/src/api/customers/bank-customer.service";
import type { BankCustomerSummaryResponse } from "@/src/types/dto/bank-customer.dto";

type QueueItem = { id: string; title: string; detail: string; priority: "High" | "Medium"; href: string; kind: "risk" | "profile" };

export default function WorkQueuePage() {
  const [customers, setCustomers] = useState<BankCustomerSummaryResponse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    void getBankCustomersForOfficer()
      .then((data) => { if (active) setCustomers(data); })
      .catch((loadError) => { if (active) setError(loadError instanceof Error ? loadError.message : "Unable to load the work queue."); })
      .finally(() => { if (active) setIsLoading(false); });
    return () => { active = false; };
  }, []);

  const items = useMemo<QueueItem[]>(() => customers.flatMap((customer) => {
    const name = customer.fullName || customer.customerId;
    const risk = (customer.riskLevel || "").toUpperCase();
    const pending = /DRAFT|PENDING/.test((customer.status || "").toUpperCase());
    return [
      ...(risk === "HIGH" ? [{ id: `risk-${customer.userId}`, title: `Review high-risk customer: ${name}`, detail: `Latest CreditLens score: ${customer.creditScore ?? "not available"}/100`, priority: "High" as const, href: "/bank-officer/credit-analysis", kind: "risk" as const }] : []),
      ...(pending ? [{ id: `profile-${customer.userId}`, title: `Complete financial profile: ${name}`, detail: `Customer profile status: ${customer.status.replaceAll("_", " ")}`, priority: "Medium" as const, href: "/bank-officer/all-customers", kind: "profile" as const }] : []),
    ];
  }), [customers]);

  return <AuthGuard requiredRole="BANK_OFFICER"><div className="flex h-screen overflow-hidden bg-[linear-gradient(180deg,#0b1a3a_0%,#0a234c_58%,#08142d_100%)]"><Sidebar role="BANK_OFFICER" className="h-full max-lg:hidden" /><main className="flex h-full flex-1 flex-col overflow-hidden bg-[#f3f4f6] p-3 shadow-2xl sm:p-5 lg:rounded-l-[28px] lg:p-7"><ModuleHeader theme="staff" menuMode="sidebar-overlay" sidebarRole="BANK_OFFICER" sidebarHideCollapse name="Kamal Edirisinghe" role="Bank Officer" title="Work Queue" className="mb-6 shrink-0" /><div className="min-h-0 flex-1 overflow-y-auto"><div className="mb-6 grid gap-4 md:grid-cols-3"><Summary icon={<ClipboardCheck size={20} />} label="Open actions" value={items.length} /><Summary icon={<AlertTriangle size={20} />} label="High-risk reviews" value={items.filter((item) => item.kind === "risk").length} tone="red" /><Summary icon={<Users size={20} />} label="Profiles to complete" value={items.filter((item) => item.kind === "profile").length} tone="amber" /></div><section className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm"><div className="border-b border-slate-100 px-5 py-4"><h2 className="font-semibold text-slate-800">Priority actions</h2><p className="mt-1 text-sm text-slate-500">Live actions generated from customer risk and profile status.</p></div>{isLoading ? <p className="p-10 text-center text-slate-500">Loading work queue…</p> : error ? <p className="p-10 text-center text-red-600">{error}</p> : items.length === 0 ? <p className="p-10 text-center text-slate-500">No customer actions need attention right now.</p> : <div className="divide-y divide-slate-100">{items.map((item) => <div key={item.id} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"><div><div className="mb-1 flex items-center gap-2"><h3 className="font-semibold text-slate-800">{item.title}</h3><Badge className={item.priority === "High" ? "border-0 bg-red-100 text-red-700" : "border-0 bg-amber-100 text-amber-700"}>{item.priority}</Badge></div><p className="text-sm text-slate-500">{item.detail}</p></div><Link href={item.href}><Button variant="outline" className="shrink-0">Open <ArrowRight size={15} className="ml-2" /></Button></Link></div>)}</div>}</section></div></main></div></AuthGuard>;
}

function Summary({ icon, label, value, tone = "blue" }: { icon: ReactNode; label: string; value: number; tone?: "blue" | "red" | "amber" }) {
  void icon;
  const highlight = label === "Open actions";
  const note = tone === "red" ? "Priority customer reviews" : tone === "amber" ? "Incomplete customer profiles" : "Items requiring attention";
  const valueColor = tone === "red" ? "text-red-600" : tone === "amber" ? "text-amber-600" : "text-[#0d3b66]";
  return <div className={`rounded-xl p-6 ${highlight ? "bg-[#0d3b66] text-white shadow-lg" : "border border-slate-100 bg-white shadow-sm"}`}><p className={`mb-2 text-xs font-bold uppercase tracking-wider ${highlight ? "text-blue-200" : "text-slate-400"}`}>{label}</p><p className={`mb-2 text-3xl font-bold ${highlight ? "text-white" : valueColor}`}>{value}</p><p className={`text-xs font-medium ${highlight ? "text-emerald-300" : "text-slate-500"}`}>{note}</p></div>;
}
