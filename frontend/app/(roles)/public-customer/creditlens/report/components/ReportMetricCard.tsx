"use client";

import React from "react";

type Tone = "green" | "orange" | "blue" | "violet";

const toneStyles: Record<Tone, { ring: string; iconBg: string; icon: string }> = {
  green: { ring: "border-emerald-200", iconBg: "bg-emerald-50", icon: "text-emerald-600" },
  orange: { ring: "border-amber-200", iconBg: "bg-amber-50", icon: "text-amber-600" },
  blue: { ring: "border-sky-200", iconBg: "bg-sky-50", icon: "text-sky-600" },
  violet: { ring: "border-violet-200", iconBg: "bg-violet-50", icon: "text-violet-600" },
};

export default function ReportMetricCard({
  title,
  value,
  subValue,
  icon,
  tone = "blue",
}: {
  title: string;
  value: string;
  subValue?: string;
  icon: React.ReactNode;
  tone?: Tone;
}) {
  const t = toneStyles[tone];

  return (
    <div
      className={`creditlens-card creditlens-card-hover min-w-0 rounded-2xl border ${t.ring} bg-white/80 p-4 shadow-[0_14px_45px_-35px_rgba(2,44,67,0.40)] sm:p-5`}
    >
      <div className="flex min-w-0 items-start gap-3">
        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${t.iconBg} ${t.icon} sm:h-10 sm:w-10`}>
          {icon}
        </div>

        <div className="min-w-0 flex-1">
  <div className="text-sm font-medium text-slate-600">{title}</div>

  {/* stack value + subValue vertically */}
  <div className="mt-2 flex min-w-0 flex-col items-start">
    <div className="break-words text-lg font-bold text-slate-900 sm:text-xl">{value}</div>

    {subValue ? (
      <div className="mt-1 break-words text-sm font-normal leading-tight text-slate-500">
        {subValue}
      </div>
    ) : null}
  </div>
</div>

      </div>
    </div>
  );
}
