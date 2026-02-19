"use client";

import React from "react";
import { CheckCircle2, Building2, Percent, CreditCard } from "lucide-react";

export default function BehaviorExposureCard({
  snapshot,
}: {
  snapshot: {
    missedPayments: number;
    activeFacilities: number;
    dti: number;
    utilization: number;
    dtiLabel: "Low" | "Medium" | "High";
  };
}) {
  return (
    <div className="rounded-[26px] bg-white/92 p-7 shadow-[0_18px_60px_-45px_rgba(2,44,67,0.45)]">
      <h3 className="text-center text-xl font-semibold text-slate-900">
        Credit Behavior &amp; Exposure
      </h3>

      <div className="mt-7 space-y-6">
        <Row
          icon={<CheckCircle2 className="h-5 w-5 text-emerald-600" />}
          title="Missed Payments"
          value={`${snapshot.missedPayments}`}
          sub="Last 12 months"
        />

        <Row
          icon={<Building2 className="h-5 w-5 text-sky-600" />}
          title="Active Facilities"
          value={`${snapshot.activeFacilities}`}
          sub=""
        />

        <div className="flex items-center justify-between">
          <Row
            icon={<Percent className="h-5 w-5 text-emerald-600" />}
            title="Debt-to-Income (DTI)"
            value={`${snapshot.dti}%`}
            sub=""
            compact
          />
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
            {snapshot.dtiLabel}
          </span>
        </div>

        <Row
          icon={<CreditCard className="h-5 w-5 text-indigo-600" />}
          title="Credit Utilization"
          value={`${snapshot.utilization}%`}
          sub=""
        />
      </div>
    </div>
  );
}

function Row({
  icon,
  title,
  value,
  sub,
  compact,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  sub: string;
  compact?: boolean;
}) {
  return (
    <div className={`flex items-center gap-4 ${compact ? "" : ""}`}>
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50">
        {icon}
      </div>

      <div className="flex-1">
        <div className="text-sm font-medium text-slate-600">{title}</div>
        <div className="mt-1 flex items-baseline gap-2">
          <div className="text-lg font-bold text-slate-900">{value}</div>
          {sub ? <div className="text-xs text-slate-500">{sub}</div> : null}
        </div>
      </div>
    </div>
  );
}
