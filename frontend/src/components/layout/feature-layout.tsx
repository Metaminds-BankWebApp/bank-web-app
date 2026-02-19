"use client";

import { FeatureSidebar } from "@/src/components/layout";
import { AuthGuard } from "@/src/components/auth";

type FeatureRole = "PUBLIC_CUSTOMER" | "BANK_CUSTOMER";
type FeatureKey = "spendiq" | "creditlens" | "loansense" | "transact";

type FeatureLayoutProps = {
  children: React.ReactNode;
  role: FeatureRole;
  feature: FeatureKey;
};

export function FeatureLayout({ children, role, feature }: FeatureLayoutProps) {
  return (
    <AuthGuard requiredRole={role}>
      <div className="flex min-h-screen">
        <FeatureSidebar role={role} feature={feature} className="max-lg:hidden" />
        <main className="flex-1 rounded-l-[28px] bg-white p-4 lg:p-0">
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}
