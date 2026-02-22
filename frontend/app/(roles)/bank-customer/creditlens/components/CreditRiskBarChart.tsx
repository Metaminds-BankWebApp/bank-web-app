"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

type Props = {
  labels?: string[];
  values?: number[];
};

const defaultLabels = ["April", "May", "June", "July", "August", "September"];
const defaultValues = [80, 50, 90, 70, 60, 55];

export default function CreditRiskBarChart({ labels = defaultLabels, values = defaultValues }: Props) {
  const PURPLE = "rgba(168,85,247,0.75)";
  const GREEN = "rgba(34,197,94,0.80)";

  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [chartValues, setChartValues] = useState<number[]>(() => values.map(() => 0));

  useEffect(() => {
    setChartValues(values.map(() => 0));
    const raf = requestAnimationFrame(() => setChartValues(values));
    return () => cancelAnimationFrame(raf);
  }, [values]);

  const barThickness = labels.length > 6 ? 24 : 50;

  const data = useMemo(
    () => ({
      labels,
      datasets: [
        {
          label: "Credit Risk Score",
          data: chartValues,
          borderRadius: 12,
          borderSkipped: false as const,
          barThickness,
          backgroundColor: labels.map((_, index) => (hoverIndex === index ? GREEN : PURPLE)),
        },
      ],
    }),
    [barThickness, chartValues, hoverIndex, labels]
  );

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 900,
      easing: "easeOutQuart",
      delay: (ctx) => Math.min((ctx.dataIndex ?? 0) * 55, 450),
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(17,24,39,0.95)",
        titleColor: "#fff",
        bodyColor: "#fff",
        displayColors: false,
      },
    },
    scales: {
      x: {
        ticks: { color: "rgba(15,23,42,0.55)", font: { size: 12 } },
        grid: { display: false },
        border: { display: false },
      },
      y: {
        min: 0,
        max: 100,
        ticks: { stepSize: 25, color: "rgba(15,23,42,0.45)" },
        grid: { color: "rgba(15,23,42,0.12)" },
        border: { display: false },
      },
    },
    onHover: (_event, elements) => {
      if (elements?.length) setHoverIndex(elements[0].index);
      else setHoverIndex(null);
    },
  };

  return (
    <div className="h-full min-h-[280px] w-full min-w-0 sm:min-h-[320px] lg:min-h-[420px] xl:min-h-[460px]">
      <Bar data={data} options={options} />
    </div>
  );
}
