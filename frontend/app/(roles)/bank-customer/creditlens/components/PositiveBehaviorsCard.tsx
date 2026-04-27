"use client";

import React from "react";
import { BadgeCheck } from "lucide-react";
import type { CreditInsightItemResponse } from "@/src/types/dto/bank-creditlens.dto";
import { CreditInsightIcon, getInsightToneClasses } from "./creditlens-insight-helpers";

export default function PositiveBehaviorsCard({
  items = [],
}: {
  items?: CreditInsightItemResponse[];
}) {
  return (
    <div className="creditlens-card creditlens-card-hover min-w-0 rounded-2xl border border-slate-200/70 bg-white/90 px-4 pb-4 pt-3 shadow-[0_18px_50px_-35px_rgba(2,44,67,0.35)] sm:px-5 sm:pb-3 md:rounded-[26px]">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <BadgeCheck className="h-5 w-5" />
        </div>
        <h3 className="text-base font-semibold text-slate-900 sm:text-lg">Positive Behaviors</h3>
      </div>

      <div className="mt-6 space-y-5">
        {items.length > 0 ? (
          items.map((item) => {
            const tone = getInsightToneClasses(item.badgeTone);

            return (
              <div
                key={`${item.title}-${item.badgeText}`}
                className="rounded-2xl border border-slate-200/60 bg-white p-4 shadow-sm sm:p-5"
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-1 flex h-9 w-9 items-center justify-center rounded-xl ${tone.iconWrapper} ${tone.iconColor}`}>
                    <CreditInsightIcon iconKey={item.iconKey} className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-slate-900">{item.title}</div>
                    <div className="mt-1 text-sm text-slate-600">{item.description}</div>
                    <div className="mt-2 text-xs text-slate-500">{item.detail}</div>

                    <div className={`mt-3 inline-flex rounded-lg px-3 py-1 text-[11px] font-semibold ${tone.badge}`}>
                      {item.badgeText}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-5 text-sm text-slate-500">
            Positive behaviors will appear once your CreditLens evaluation is available.
          </div>
        )}
      </div>
    </div>
  );
}
