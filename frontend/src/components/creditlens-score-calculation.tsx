"use client";

import { useMemo, useState } from "react";
import { Calculator, ShieldCheck } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import PopupModal from "@/src/components/ui/popup-modal";

type ScoreFactor = {
  name: string;
  value: number;
  max: number;
  color?: string;
};

function explainFactor(factor: ScoreFactor): string {
  const name = factor.name.toLowerCase();
  const points = factor.value;

  if (name.includes("payment")) {
    if (points <= 0) return "No missed-payment risk points were added.";
    if (points <= 8) return "Your record is in the 1 missed-payment band.";
    if (points <= 18) return "Your record is in the 2–3 missed-payment band.";
    return "Your record is in the 4+ missed-payment band.";
  }

  if (name === "dti" || name.includes("debt-to-income")) {
    if (points <= 0) return "Monthly debt payments are 30% or less of monthly income.";
    if (points <= 12) return "Monthly debt payments are above 30% and up to 50% of monthly income.";
    return "Monthly debt payments are above 50% of monthly income.";
  }

  if (name.includes("utilization")) {
    if (points <= 0) return "Card balances use 40% or less of the available card limits.";
    if (points <= 10) return "Card balances use above 40% and up to 70% of the available limits.";
    return "Card balances use more than 70% of the available limits.";
  }

  if (name.includes("income")) {
    if (points <= 0) return "Your income sources are currently assessed as stable.";
    if (points < factor.max) {
      return "Your income mix has some stability risk based on work type, tenure, or income consistency.";
    }
    return "Your income mix is currently in the highest stability-risk band.";
  }

  if (name.includes("facilit") || name.includes("exposure")) {
    if (points <= 0) return "You have 2 or fewer active credit facilities.";
    if (points <= 5) return "You have between 3 and 4 active credit facilities.";
    return "You have 5 or more active credit facilities.";
  }

  return "These points reflect the latest financial details in your CreditLens evaluation.";
}

/**
 * Opens a concise, customer-friendly explanation of the latest CreditLens factor points.
 */
export default function CreditLensScoreCalculation({ factors }: { factors: ScoreFactor[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const total = useMemo(() => factors.reduce((sum, factor) => sum + factor.value, 0), [factors]);
  const maximum = useMemo(() => factors.reduce((sum, factor) => sum + factor.max, 0), [factors]);
  const pointEquation = factors.map((factor) => factor.value).join(" + ");

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-sky-100/70 bg-sky-100 px-4 py-2.5 text-sm font-semibold text-[#0a3859] shadow-[0_12px_28px_-18px_rgba(2,18,33,0.9)] transition hover:border-white hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#14517c] sm:text-base"
      >
        <Calculator className="h-4 w-4" aria-hidden="true" />
        See how your points are calculated
      </button>

      <PopupModal
        open={isOpen}
        onOpenChange={setIsOpen}
        title="How your risk points are calculated"
        description="A simple view of what added points to your latest CreditLens result. Fewer points means lower credit risk."
        size="md"
        footer={
          <Button
            type="button"
            onClick={() => setIsOpen(false)}
            className="bg-[#14517c] text-white hover:bg-[#0f4266]"
          >
            Got it
          </Button>
        }
      >
        <div className="space-y-5">
          <div className="overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#0d3555,#145f8e)] p-5 text-white shadow-[0_18px_36px_-28px_rgba(2,18,33,0.9)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-sm font-medium text-sky-100">
                  <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                  Your latest total
                </div>
                <p className="mt-2 text-3xl font-bold tracking-tight">
                  {total}<span className="text-lg font-semibold text-white/70">/{maximum}</span>
                </p>
              </div>
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-50">
                Lower is better
              </span>
            </div>
            <p className="mt-3 text-sm text-white/75">
              {pointEquation} = <span className="font-semibold text-white">{total} total risk points</span>
            </p>
          </div>

          <div className="space-y-3">
            {factors.map((factor) => {
              const percentage = Math.max(0, Math.min(100, (factor.value / Math.max(1, factor.max)) * 100));

              return (
                <div key={factor.name} className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-900">{factor.name}</p>
                      <p className="mt-1 text-sm leading-5 text-slate-600">{explainFactor(factor)}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-lg font-bold text-[#14517c]">
                        {factor.value}<span className="text-sm font-semibold text-slate-400">/{factor.max}</span>
                      </p>
                      <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500">points</p>
                    </div>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${percentage}%`, backgroundColor: factor.color ?? "#38bdf8" }}
                    />
                  </div>
                  <p className="mt-2 text-xs text-slate-500">Weight: up to {factor.max} points</p>
                </div>
              );
            })}
          </div>

          <div className="rounded-xl border border-sky-100 bg-sky-50 p-4">
            <p className="text-sm font-semibold text-[#0d466b]">How to read the total</p>
            <div className="mt-2 grid gap-2 text-xs sm:grid-cols-3">
              <span className="rounded-lg bg-emerald-100 px-3 py-2 font-medium text-emerald-800">0–33 · Low risk</span>
              <span className="rounded-lg bg-amber-100 px-3 py-2 font-medium text-amber-800">34–66 · Medium risk</span>
              <span className="rounded-lg bg-rose-100 px-3 py-2 font-medium text-rose-800">67–100 · High risk</span>
            </div>
          </div>
        </div>
      </PopupModal>
    </>
  );
}
