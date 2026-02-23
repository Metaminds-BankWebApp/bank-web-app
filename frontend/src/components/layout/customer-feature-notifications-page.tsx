"use client";

import ModuleHeader from "@/src/components/ui/module-header";
import { NotificationPageContent } from "@/src/components/notifications/notification-page-content";

type CustomerRoleLabel = "Bank Customer" | "Public Customer";
type FeatureName = "CreditLens" | "SpendIQ" | "LoanSense" | "Transact";

type CustomerFeatureNotificationsPageProps = {
  featureName: FeatureName;
  roleLabel: CustomerRoleLabel;
};

const FEATURE_CONFIG = {
  CreditLens: { theme: "creditlens", featureSegment: "creditlens" },
  SpendIQ: { theme: "spendiq", featureSegment: "spendiq" },
  LoanSense: { theme: "loansense", featureSegment: "loansense" },
  Transact: { theme: "transact", featureSegment: "transact" },
} as const;

export function CustomerFeatureNotificationsPage({
  featureName,
  roleLabel,
}: CustomerFeatureNotificationsPageProps) {
  const config = FEATURE_CONFIG[featureName];
  const roleSegment = roleLabel === "Bank Customer" ? "bank-customer" : "public-customer";

  return (
    <div className="space-y-6">
      <ModuleHeader
        theme={config.theme}
        menuMode="feature-layout"
        title="Notifications"
        name="John Doe"
        role={roleLabel}
      />
      <NotificationPageContent roleSegment={roleSegment} featureSegment={config.featureSegment} />
    </div>
  );
}
