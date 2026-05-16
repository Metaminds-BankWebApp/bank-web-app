"use client";

import React from "react";
import {
  Activity,
  AlertTriangle,
  BadgeCheck,
  Briefcase,
  Building2,
  CheckCircle2,
  CircleAlert,
  CreditCard,
  Info,
  Percent,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import type { CreditInfoTooltipResponse } from "@/src/types/dto/public-creditlens.dto";

type ToneClasses = {
  badge: string;
  iconWrapper: string;
  iconColor: string;
};

const toneClasses: Record<string, ToneClasses> = {
  red: {
    badge: "bg-red-500 text-white",
    iconWrapper: "bg-red-50",
    iconColor: "text-red-500",
  },
  orange: {
    badge: "bg-orange-500 text-white",
    iconWrapper: "bg-orange-50",
    iconColor: "text-orange-500",
  },
  amber: {
    badge: "bg-amber-500 text-white",
    iconWrapper: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  green: {
    badge: "bg-emerald-50 text-emerald-700",
    iconWrapper: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  blue: {
    badge: "bg-blue-50 text-blue-700",
    iconWrapper: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  slate: {
    badge: "bg-slate-100 text-slate-700",
    iconWrapper: "bg-slate-100",
    iconColor: "text-slate-600",
  },
};

/**
 * Shared helper utilities for rendering CreditLens insight card tones, icons, and tooltips.
 */
export function getInsightToneClasses(tone?: string): ToneClasses {
  const normalizedTone = (tone ?? "").trim().toLowerCase();
  return toneClasses[normalizedTone] ?? toneClasses.slate;
}

/**
 * Maps backend icon keys to the Lucide icon used by the CreditLens insight cards.
 */
export function CreditInsightIcon({
  iconKey,
  className = "h-5 w-5",
}: {
  iconKey?: string;
  className?: string;
}) {
  switch ((iconKey ?? "").trim().toLowerCase()) {
    case "alert-triangle":
      return <AlertTriangle className={className} />;
    case "credit-card":
      return <CreditCard className={className} />;
    case "circle-alert":
      return <CircleAlert className={className} />;
    case "trending-down":
      return <TrendingDown className={className} />;
    case "trending-up":
      return <TrendingUp className={className} />;
    case "briefcase":
      return <Briefcase className={className} />;
    case "building-2":
      return <Building2 className={className} />;
    case "check-circle":
      return <CheckCircle2 className={className} />;
    case "badge-check":
      return <BadgeCheck className={className} />;
    case "percent":
      return <Percent className={className} />;
    case "activity":
      return <Activity className={className} />;
    default:
      return <Info className={className} />;
  }
}

/**
 * Displays the inline explanation tooltip for a CreditLens factor or insight item.
 */
export function CreditInsightInfoButton({
  tooltip,
}: {
  tooltip?: CreditInfoTooltipResponse | null;
}) {
  if (!tooltip) {
    return null;
  }

  return (
    <button
      type="button"
      className="group relative inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-slate-500 transition hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
      aria-label={`${tooltip.title} details`}
    >
      <Info size={12} />
      <span
        role="tooltip"
        className="pointer-events-none invisible absolute left-1/2 top-[calc(100%+0.45rem)] z-20 w-56 -translate-x-1/2 rounded-lg border border-white/20 bg-[#0b2447] p-2 text-left text-xs leading-relaxed text-white opacity-0 shadow-xl transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-visible:visible group-focus-visible:opacity-100"
      >
        <span className="block font-semibold text-white">{tooltip.title}</span>
        <span className="mt-1 block text-white/85">{tooltip.description}</span>
        <span className="mt-1 block text-sky-100">{tooltip.formula}</span>
      </span>
    </button>
  );
}
