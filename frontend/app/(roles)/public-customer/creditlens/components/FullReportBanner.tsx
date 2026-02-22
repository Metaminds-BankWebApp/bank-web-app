"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import fullReportBg from "../image/creditlens-full-report-bg.svg";

export default function FullReportBanner() {
  const router = useRouter();

  return (
    <div className="creditlens-card creditlens-card-hover creditlens-delay-4 relative mt-4 overflow-hidden rounded-2xl border border-[#4f96c6]/35 bg-[#124b74] p-4 text-white shadow-[0_24px_46px_-30px_rgba(2,18,33,0.84)] sm:p-6 md:rounded-[26px] md:p-7">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `url("${fullReportBg.src}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(12,48,74,0.24)_0%,rgba(12,48,74,0.35)_58%,rgba(12,48,74,0.5)_100%)]" />

      <div className="relative flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <div className="min-w-0">
          <div className="text-lg font-semibold sm:text-xl md:text-2xl">View Full Report</div>
          <p className="mt-1 max-w-3xl text-sm text-white/85 sm:text-base">
            Get a complete summary of your credit profile, risk factors, and recommended next actions.
          </p>
        </div>

        <Button
          onClick={() => router.push("/public-customer/creditlens/report")}
          className="h-11 w-full rounded-xl bg-white px-6 text-[#0b2447] hover:bg-white/90 sm:h-12 sm:w-auto sm:shrink-0"
        >
          Learn More
        </Button>
      </div>
    </div>
  );
}
