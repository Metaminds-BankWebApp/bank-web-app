"use client";

import { AuthGuard } from "@/src/components/auth";
import { SpendIqReportPage } from "@/src/components/spendiq/spendiq-report-page";

export default function BankCustomerSpendIqReportPage() {
  return (
    <AuthGuard requiredRole="BANK_CUSTOMER">
      <SpendIqReportPage />
    </AuthGuard>
  );
}
