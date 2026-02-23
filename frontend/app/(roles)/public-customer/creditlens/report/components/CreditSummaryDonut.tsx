"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, ChartOptions } from "chart.js";

ChartJS.register(ArcElement, Tooltip);

const SEGMENTS = [34, 33, 33];
const FINAL_ROTATION = -90;

export default function CreditSummaryDonut({
  score,
  riskLabel,
}: {
  score: number;
  riskLabel: "Low" | "Medium" | "High";
}) {
  const chartRef = useRef<ChartJS<"doughnut"> | null>(null);

  useEffect(() => {
    let raf = 0;
    const duration = 1100;
    const startRotation = FINAL_ROTATION - 360;

    const startSpin = () => {
      const chart = chartRef.current;
      if (!chart) {
        raf = requestAnimationFrame(startSpin);
        return;
      }

      chart.options.rotation = startRotation;
      chart.update("none");
      const startTime = performance.now();

      const animate = (now: number) => {
        const elapsed = now - startTime;
        const t = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);

        chart.options.rotation = startRotation + (FINAL_ROTATION - startRotation) * eased;
        chart.update("none");

        if (t < 1) {
          raf = requestAnimationFrame(animate);
        }
      };

      raf = requestAnimationFrame(animate);
    };

    const timer = window.setTimeout(startSpin, 120);

    return () => {
      window.clearTimeout(timer);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [score, riskLabel]);

  const data = useMemo(
    () => ({
      labels: ["Low", "Medium", "High"],
      datasets: [
        {
          data: SEGMENTS,
          backgroundColor: ["#f87171", "#fb923c", "#4ade80"],
          borderWidth: 0,
          spacing: 4,
          borderRadius: 999,
        },
      ],
    }),
    []
  );

  const options = useMemo<ChartOptions<"doughnut">>(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      cutout: "78%",
      rotation: FINAL_ROTATION,
      animation: false,
      plugins: { legend: { display: false }, tooltip: { enabled: false } },
    }),
    []
  );

  return (
    <div className="relative h-[180px] w-[180px] sm:h-[210px] sm:w-[210px] lg:h-[220px] lg:w-[220px]">
      <Doughnut ref={chartRef} data={data} options={options} />
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-xs font-semibold tracking-widest text-slate-500">RISK SCORE</div>
        <div className="mt-1 text-4xl font-extrabold text-slate-900 sm:mt-2 sm:text-5xl">{score}</div>

        <div className="mt-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">
          {riskLabel.toUpperCase()}
        </div>
      </div>
    </div>
  );
}
