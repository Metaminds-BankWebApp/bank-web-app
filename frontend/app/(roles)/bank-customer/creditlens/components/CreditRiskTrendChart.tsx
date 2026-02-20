"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

export default function CreditRiskTrendChart() {
  const labels = ["April", "May", "June", "July", "August", "September"];

  const data = {
    labels,
    datasets: [
      {
        label: "Credit Risk Score",
        data: [80, 50, 92, 70, 60, 55],
        borderColor: "#a3e635",
        backgroundColor: "rgba(163,230,53,0.25)",
        fill: "origin",
        tension: 0.35,
        pointRadius: 2.5,
        pointHoverRadius: 4,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      x: {
        ticks: { color: "rgba(255,255,255,0.65)" },
        grid: { display: false },
      },
      y: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
          color: "rgba(255,255,255,0.55)",
        },
        grid: {
          color: "rgba(255,255,255,0.12)",
          borderDash: [4, 4],
        },
      },
    },
  };

  return (
    <div className="h-full min-h-[150px] w-full min-w-0 sm:min-h-[170px] lg:min-h-[180px] xl:min-h-[200px]">
      <Line data={data} options={options} />
    </div>
  );
}
