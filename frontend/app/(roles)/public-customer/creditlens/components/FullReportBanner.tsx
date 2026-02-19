"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";

export default function FullReportBanner() {
  const router = useRouter();

  return (
    <div className="mt-3 rounded-[26px] bg-[linear-gradient(135deg,#0b3a5a,#0a6ea5)] p-7 text-white shadow-lg">
      <div className="flex items-center justify-between gap-6">
        <div className="min-w-0">
          <div className="text-2xl font-semibold">View Full Report</div>
          
        </div>

        <Button 
          onClick={() => router.push("/public-customer/creditlens/report")}
          className="shrink-0 rounded-xl bg-white px-6 text-[#0b2447] hover:bg-white/90"
        >
          Learn More
        </Button>
      </div>
    </div>
  );
}
