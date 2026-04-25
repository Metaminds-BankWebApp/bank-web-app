"use client";

import { AuthGuard } from "@/src/components/auth";
import { SpendIqCategoryAnalysisPage } from "@/src/components/spendiq/spendiq-category-analysis-page";

export default function BankCustomerCategoryAnalysisPage() {
  return (
    <AuthGuard requiredRole="BANK_CUSTOMER">
      <SpendIqCategoryAnalysisPage />
    </AuthGuard>
  );
}
