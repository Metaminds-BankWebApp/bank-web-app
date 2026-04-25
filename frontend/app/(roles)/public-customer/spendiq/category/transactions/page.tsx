"use client";

import { AuthGuard } from "@/src/components/auth";
import { SpendIqCategoryTransactionsPage } from "@/src/components/spendiq/spendiq-category-transactions-page";

export default function PublicCustomerCategoryTransactionsPage() {
  return (
    <AuthGuard requiredRole="PUBLIC_CUSTOMER">
      <SpendIqCategoryTransactionsPage />
    </AuthGuard>
  );
}
