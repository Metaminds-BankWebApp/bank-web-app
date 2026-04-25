"use client";

import { AuthGuard } from "@/src/components/auth";
import { SpendIqCategoryAnalysisPage } from "@/src/components/spendiq/spendiq-category-analysis-page";

export default function PublicCustomerCategoryAnalysisPage() {
  return (
    <AuthGuard requiredRole="PUBLIC_CUSTOMER">
      <SpendIqCategoryAnalysisPage />
    </AuthGuard>
  );
}
