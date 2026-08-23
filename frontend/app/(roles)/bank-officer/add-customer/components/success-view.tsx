"use client";

import Link from "next/link";
import { CheckCircle2, ChevronRight, Eye, FileText, Plus, ShieldCheck } from "lucide-react";
import { Button } from "@/src/components/ui/button";

interface SuccessViewProps {
  customerName: string;
  generatedId: string;
  customerNic: string;
  bankCustomerId: number | null;
  onReset: () => void;
}

export function SuccessView({
  customerName,
  generatedId,
  customerNic,
  bankCustomerId,
  onReset,
}: SuccessViewProps) {
  const customerProfileHref = customerNic
    ? `/bank-officer/all-customers?nic=${encodeURIComponent(customerNic)}`
    : "/bank-officer/all-customers";
  const creditEvaluationHref = bankCustomerId
    ? `/bank-officer/credit-analysis/evaluation/${bankCustomerId}?name=${encodeURIComponent(customerName)}`
    : "/bank-officer/credit-analysis";

  return (
    <section className="w-full max-w-2xl animate-in fade-in zoom-in-95 duration-500">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-sky-50">
            <span className="absolute inset-0 rounded-full border border-sky-200 animate-ping opacity-40" />
            <CheckCircle2 size={42} className="relative text-[#3e9fd3]" />
          </div>

          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#3e9fd3]">Onboarding complete</p>
          <h2 className="mt-2 text-2xl font-bold text-[#0d3b66] sm:text-3xl">Customer created successfully</h2>
          <p className="mt-3 max-w-lg text-sm leading-6 text-slate-500">
            The customer profile is active. You can review the verified details or begin a credit evaluation now.
          </p>
        </div>

        <dl className="mt-7 overflow-hidden rounded-xl border border-slate-200 bg-slate-50/80 sm:grid sm:grid-cols-2">
          <div className="border-b border-slate-200 px-5 py-4 sm:border-b-0 sm:border-r">
            <dt className="text-xs font-bold uppercase tracking-wider text-slate-400">Customer name</dt>
            <dd className="mt-1 truncate text-sm font-semibold text-slate-800">{customerName}</dd>
          </div>
          <div className="px-5 py-4">
            <dt className="text-xs font-bold uppercase tracking-wider text-slate-400">Generated ID</dt>
            <dd className="mt-1 text-sm font-semibold text-[#258ac3]">{generatedId}</dd>
          </div>
        </dl>

        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <Link
            href={creditEvaluationHref}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#3e9fd3] px-4 text-sm font-semibold text-white shadow-md shadow-sky-200 transition-colors hover:bg-[#328ab8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3e9fd3] focus-visible:ring-offset-2"
          >
            <FileText size={18} />
            Trigger Credit Evaluation
            <ChevronRight size={16} />
          </Link>
          <Link
            href={customerProfileHref}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3e9fd3] focus-visible:ring-offset-2"
          >
            <Eye size={18} />
            View Customer Profile
          </Link>
        </div>

        <div className="mt-6 flex flex-col items-center justify-center gap-3 border-t border-slate-100 pt-5 text-sm sm:flex-row sm:gap-6">
          <Link
            href={customerProfileHref}
            className="inline-flex items-center gap-2 font-medium text-slate-500 transition-colors hover:text-[#0d3b66]"
          >
            <ShieldCheck size={16} />
            Review verified data
          </Link>
          <Button onClick={onReset} variant="ghost" className="h-auto px-0 font-medium text-slate-500 hover:bg-transparent hover:text-[#0d3b66]">
            <Plus size={16} />
            Create another customer
          </Button>
        </div>
      </div>
    </section>
  );
}
