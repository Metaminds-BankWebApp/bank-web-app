"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";

export default function FullReportBanner() {
  const router = useRouter();

  return (
    <div className="mt-4 rounded-2xl bg-[linear-gradient(135deg,#0b3a5a,#0a6ea5)] p-4 text-white shadow-lg sm:p-6 md:rounded-[26px] md:p-7">
      <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <div className="min-w-0">
          <div className="text-lg font-semibold sm:text-xl md:text-2xl">View Full Report</div>
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
