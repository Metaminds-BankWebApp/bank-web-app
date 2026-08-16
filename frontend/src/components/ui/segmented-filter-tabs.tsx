"use client";

import * as React from "react";
import { cn } from "@/src/lib/utils";

type SegmentedFilterTabItem<TKey extends string> = {
  key: TKey;
  label: React.ReactNode;
  disabled?: boolean;
};

type SegmentedFilterTabsProps<TKey extends string> = {
  items: readonly SegmentedFilterTabItem<TKey>[];
  activeKey: TKey;
  onChange: (key: TKey) => void;
  className?: string;
};

export function SegmentedFilterTabs<TKey extends string>({
  items,
  activeKey,
  onChange,
  className,
}: SegmentedFilterTabsProps<TKey>) {
  return (
    <div className={cn("border-b border-slate-100 bg-slate-50/50 p-2", className)}>
      <div className="overflow-x-auto">
        <div className="inline-flex min-w-max gap-1 rounded-lg bg-sky-100/70 p-1">
          {items.map((item) => (
            <button
              key={item.key}
              type="button"
              disabled={item.disabled}
              onClick={() => onChange(item.key)}
              className={cn(
                "whitespace-nowrap rounded-md px-4 py-1.5 text-xs font-semibold transition-all",
                "disabled:cursor-not-allowed disabled:opacity-50",
                activeKey === item.key
                  ? "bg-white text-[#0d3b66] shadow-sm"
                  : "text-slate-500 hover:text-slate-700",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
