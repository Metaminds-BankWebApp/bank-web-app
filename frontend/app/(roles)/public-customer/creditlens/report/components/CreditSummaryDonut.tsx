"use client";

import React, { useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";

ChartJS.register(ArcElement, Tooltip);

export default function CreditSummaryDonut({
  score,
  riskLabel,
}: {
  score: number;
  riskLabel: "Low" | "Medium" | "High";
}) {
  const data = useMemo(
    () => ({
      labels: ["Low", "Medium", "High"],
      datasets: [
        {
          data: [34, 33, 33],
          backgroundColor: ["#f87171", "#fb923c", "#4ade80"],
          borderWidth: 0,
          spacing: 4,
          borderRadius: 999,
        },
      ],
    }),
    []
  );

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      cutout: "78%",
      plugins: { legend: { display: false }, tooltip: { enabled: false } },
    }),
    []
  );

  return (
    <div className="relative h-[220px] w-[220px]">
      <Doughnut data={data} options={options as any} />
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-xs font-semibold tracking-widest text-slate-500">RISK SCORE</div>
        <div className="mt-2 text-5xl font-extrabold text-slate-900">{score}</div>

        <div className="mt-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">
          {riskLabel.toUpperCase()}
        </div>
      </div>
    </div>
  );
}
