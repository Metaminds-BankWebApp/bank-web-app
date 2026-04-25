"use client";

import { AuthGuard } from "@/src/components/auth";
import { SpendIqAddPage } from "@/src/components/spendiq/spendiq-add-page";

export default function PublicCustomerSpendIqAddPage() {
  return (
    <AuthGuard requiredRole="PUBLIC_CUSTOMER">
      <SpendIqAddPage />
    </AuthGuard>
  );
}
