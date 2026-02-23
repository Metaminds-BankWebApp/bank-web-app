"use client";

import React, { useEffect, useMemo, useRef } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  ChartOptions,
  Plugin,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip);

type Props = { value: number };
const SEGMENTS = [33, 33, 33];

export default function CreditRiskGauge({ value }: Props) {
  const safeValue = Math.max(0, Math.min(100, value));
  const chartRef = useRef<ChartJS<"doughnut"> | null>(null);
  const animatedValueRef = useRef(0);

  useEffect(() => {
    let raf = 0;
    const duration = 900;

    const startAnimation = () => {
      const chart = chartRef.current;
      if (!chart) {
        raf = requestAnimationFrame(startAnimation);
        return;
      }

      const startTime = performance.now();
      animatedValueRef.current = 0;
      chart.draw();

      const animate = (timestamp: number) => {
        const elapsed = timestamp - startTime;
        const t = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        animatedValueRef.current = safeValue * eased;
        chart.draw();

        if (t < 1) {
          raf = requestAnimationFrame(animate);
        }
      };

      raf = requestAnimationFrame(animate);
    };

    const timer = window.setTimeout(() => {
      startAnimation();
    }, 120);

    return () => {
      window.clearTimeout(timer);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [safeValue]);

  const data = useMemo(
    () => ({
      datasets: [
        {
          data: SEGMENTS,
          backgroundColor: ["#34d399", "#fbbf24", "#ef4444"],
          borderWidth: 0,
          hoverOffset: 0,
          borderRadius: 0,
        },
      ],
    }),
    []
  );

  const gaugeDecorPlugin = useMemo<Plugin<"doughnut">>(
    () => ({
      id: "gaugeDecor",
      afterDatasetsDraw(chart) {
        const { ctx } = chart;
        const meta = chart.getDatasetMeta(0);
        const arcs = meta?.data;
        if (!arcs || arcs.length === 0) return;

        const first = arcs[0];
        const last = arcs[arcs.length - 1];

        const cx = first.x;
        const cy = first.y;
        const outer = first.outerRadius;
        const startAngle = first.startAngle;
        const endAngle = last.endAngle;
        if (Math.abs(endAngle - startAngle) < 0.0001) return;

        ctx.save();

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
          ctx.strokeStyle = isMajor ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.55)";
          ctx.stroke();
        }

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

        const inner = first.innerRadius;
        const tVal = Math.max(0, Math.min(1, animatedValueRef.current / 100));
        const pointerAngle = startAngle + tVal * (endAngle - startAngle);

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

        ctx.fillStyle = "#fbbf24";
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "rgba(0,0,0,0.35)";
        ctx.stroke();

        ctx.restore();
      },
    }),
    []
  );

  const options = useMemo<ChartOptions<"doughnut">>(
    () => ({
      rotation: -90,
      circumference: 180,
      cutout: "85%",
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      layout: {
        padding: { left: 28, right: 28, top: 18, bottom: 0 },
      },
      plugins: {
        tooltip: { enabled: false },
        legend: { display: false },
      },
    }),
    []
  );

  return (
    <div className="relative h-full w-full">
      <Doughnut ref={chartRef} data={data} options={options} plugins={[gaugeDecorPlugin]} />
    </div>
  );
}
