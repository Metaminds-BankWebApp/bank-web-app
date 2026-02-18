"use client";

import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip);

type Props = { value: number };

export default function CreditRiskGauge({ value }: Props) {
  const safeValue = Math.max(0, Math.min(100, value));

  // Green → Yellow → Red
  const data = {
    datasets: [
      {
        data: [33, 33, 33],
        backgroundColor: ["#34d399", "#fbbf24", "#ef4444"],
        borderWidth: 0,
        hoverOffset: 0,
        borderRadius: 0,
      },
    ],
  };

  const gaugeDecorPlugin = {
    id: "gaugeDecor",
    afterDatasetsDraw(chart: any) {
      const { ctx } = chart;
      const meta = chart.getDatasetMeta(0);
      const arcs = meta?.data;
      if (!arcs || arcs.length === 0) return;

      const first = arcs[0];
      const last = arcs[arcs.length - 1];

      const cx = first.x;
      const cy = first.y;
      const outer = first.outerRadius;

      // IMPORTANT: use the REAL angles from the chart (in radians)
      const startAngle = first.startAngle;
      const endAngle = last.endAngle;

      ctx.save();

      // ticks (minor every 2, major every 10)
      for (let i = 0; i <= 100; i += 2) {
        const t = i / 100;
        const angle = startAngle + t * (endAngle - startAngle);

        const isMajor = i % 10 === 0;
        const tickLen = isMajor ? 18 : 10;

        const r1 = outer - 2;
        const r2 = r1 - tickLen;

        const x1 = cx + Math.cos(angle) * r1;
        const y1 = cy + Math.sin(angle) * r1;
        const x2 = cx + Math.cos(angle) * r2;
        const y2 = cy + Math.sin(angle) * r2;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineWidth = isMajor ? 2 : 1;
        ctx.strokeStyle = isMajor
          ? "rgba(255,255,255,0.9)"
          : "rgba(255,255,255,0.55)";
        ctx.stroke();
      }

      // labels every 10
      ctx.fillStyle = "rgba(255,255,255,0.65)";
      ctx.font = "12px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (let i = 0; i <= 100; i += 10) {
        const t = i / 100;
        const angle = startAngle + t * (endAngle - startAngle);
        const r = outer + 18;

        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;

        ctx.fillText(String(i), x, y);
      }

      // needle (triangle pointer)
      // needle (triangle pointer) - draw INSIDE the cutout so it's always visible
        const inner = first.innerRadius;

const tVal = safeValue / 100;
const pointerAngle = startAngle + tVal * (endAngle - startAngle);

// Put triangle inside the hole
const tipR = inner - 8;
const baseR = tipR - 18;
const spread = 0.12;

const tipX = cx + Math.cos(pointerAngle) * tipR;
const tipY = cy + Math.sin(pointerAngle) * tipR;

const leftX = cx + Math.cos(pointerAngle - spread) * baseR;
const leftY = cy + Math.sin(pointerAngle - spread) * baseR;

const rightX = cx + Math.cos(pointerAngle + spread) * baseR;
const rightY = cy + Math.sin(pointerAngle + spread) * baseR;

ctx.beginPath();
ctx.moveTo(tipX, tipY);
ctx.lineTo(leftX, leftY);
ctx.lineTo(rightX, rightY);
ctx.closePath();

// Fill + thin border so it pops on any background
ctx.fillStyle = "#fbbf24";
ctx.fill();
ctx.lineWidth = 2;
ctx.strokeStyle = "rgba(0,0,0,0.35)";
ctx.stroke();


     
    },
  };

  // ✅ Chart.js expects DEGREES here
const options: any = {
  rotation: -90,        // start at LEFT
  circumference: 180,   // draw to RIGHT across the TOP
  cutout: "85%",
  responsive: true,
  maintainAspectRatio: false,
  animation: { duration: 600 },
  layout: {
    padding: { left: 28, right: 28, top: 18, bottom: 0 }, // keeps 0/100 visible
  },
  plugins: {
    tooltip: { enabled: false },
    legend: { display: false },
  },
};

  return (
    <div className="relative h-full w-full">
      <Doughnut data={data} options={options} plugins={[gaugeDecorPlugin]} />
    </div>
  );
}

