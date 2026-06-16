const LOW_RISK_TEXT_CLASS = "text-emerald-300";
const MEDIUM_RISK_TEXT_CLASS = "text-amber-300";
const HIGH_RISK_TEXT_CLASS = "text-rose-300";

const LOW_RISK_COLOR = "#86efac";
const MEDIUM_RISK_COLOR = "#fcd34d";
const HIGH_RISK_COLOR = "#fda4af";

export function getCreditLensRiskScoreTextClass(riskLabel?: string | null): string {
  const normalized = (riskLabel ?? "").trim().toLowerCase();

  if (normalized.includes("high")) {
    return HIGH_RISK_TEXT_CLASS;
  }

  if (normalized.includes("medium")) {
    return MEDIUM_RISK_TEXT_CLASS;
  }

  return LOW_RISK_TEXT_CLASS;
}

export function getCreditLensRiskScoreColor(riskLabel?: string | null): string {
  const normalized = (riskLabel ?? "").trim().toLowerCase();

  if (normalized.includes("high")) {
    return HIGH_RISK_COLOR;
  }

  if (normalized.includes("medium")) {
    return MEDIUM_RISK_COLOR;
  }

  return LOW_RISK_COLOR;
}
