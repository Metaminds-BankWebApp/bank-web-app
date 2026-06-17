"use client";

import { AuthGuard } from "@/src/components/auth";
import { SpendIqReportPage } from "@/src/components/spendiq/spendiq-report-page";

export default function PublicCustomerSpendIqReportPage() {
  return (
    <AuthGuard requiredRole="PUBLIC_CUSTOMER">
      <SpendIqReportPage />
    </AuthGuard>
  );
}
