"use client";

import React from "react";
import { Lightbulb } from "lucide-react";
import type { CreditInsightItemResponse } from "@/src/types/dto/public-creditlens.dto";
import { CreditInsightIcon, getInsightToneClasses } from "./creditlens-insight-helpers";

export default function FinancialTipsCard({
  items = [],
}: {
  items?: CreditInsightItemResponse[];
}) {
  return (
    <div className="creditlens-card creditlens-card-hover min-w-0 rounded-2xl border border-slate-200/70 bg-white/90 px-4 pb-4 pt-3 shadow-[0_18px_50px_-35px_rgba(2,44,67,0.35)] sm:px-5 sm:pb-3 md:rounded-[26px]">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
          <Lightbulb className="h-5 w-5" />
        </div>
        <h3 className="text-base font-semibold text-slate-900 sm:text-lg">Financial Tips</h3>
      </div>

      <div className="mt-6">
        <div className="h-px w-full bg-slate-200/80" />
      </div>

      <div className="mt-6 space-y-5 text-sm text-slate-700">
        {items.length > 0 ? (
          items.map((item, index) => {
            const tone = getInsightToneClasses(item.badgeTone);

            return (
              <React.Fragment key={`${item.title}-${item.badgeText}`}>
                <div className="flex gap-3">
                  <div className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${tone.iconWrapper} ${tone.iconColor}`}>
                    <CreditInsightIcon iconKey={item.iconKey} className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">{item.title}</div>
                    <div className="mt-1 text-sm text-slate-600">{item.description}</div>
                    <div className="mt-2 text-xs text-slate-500">{item.detail}</div>
                    <div className={`mt-3 inline-flex rounded-lg px-3 py-1 text-[11px] font-semibold ${tone.badge}`}>
                      {item.badgeText}
                    </div>
                  </div>
                </div>

                {index < items.length - 1 ? <div className="h-px w-full bg-slate-200/80" /> : null}
              </React.Fragment>
            );
          })
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-5 text-sm text-slate-500">
            Personalized financial tips will appear after your CreditLens evaluation is generated.
          </div>
        )}
      </div>
    </div>
  );
}
