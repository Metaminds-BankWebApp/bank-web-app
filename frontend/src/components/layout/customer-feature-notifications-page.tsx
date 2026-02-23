"use client";

import ModuleHeader from "@/src/components/ui/module-header";
import { NotificationPageContent } from "@/src/components/notifications/notification-page-content";
import { cn } from "@/src/lib/utils";

type CustomerRoleLabel = "Bank Customer" | "Public Customer";
type FeatureName = "CreditLens" | "SpendIQ" | "LoanSense" | "Transact";

type CustomerFeatureNotificationsPageProps = {
  featureName: FeatureName;
  roleLabel: CustomerRoleLabel;
};

const FEATURE_CONFIG = {
  CreditLens: {
    theme: "creditlens",
    featureSegment: "creditlens",
    outerClassName: "w-full overflow-x-hidden px-1 pt-2 sm:px-2 lg:px-6 lg:pt-4 xl:px-8 2xl:px-10",
    innerClassName: "flex min-h-[calc(100dvh-1.25rem)] flex-col gap-4 sm:gap-5 lg:min-h-[calc(100dvh-2rem)]",
    contentWrapClassName: "lg:px-2 xl:px-3",
  },
  SpendIQ: {
    theme: "spendiq",
    featureSegment: "spendiq",
    outerClassName: "min-h-screen bg-white p-4 md:p-8",
    innerClassName: "space-y-6",
    contentWrapClassName: "",
  },
  LoanSense: {
    theme: "loansense",
    featureSegment: "loansense",
    outerClassName: "min-h-screen bg-transparent p-4 md:p-8",
    innerClassName: "space-y-6",
    contentWrapClassName: "",
  },
  Transact: {
    theme: "transact",
    featureSegment: "transact",
    outerClassName: "min-h-screen bg-transparent px-4 py-4 sm:px-6 sm:py-6 lg:px-8",
    innerClassName: "space-y-6",
    contentWrapClassName: "",
  },
} as const;

export function CustomerFeatureNotificationsPage({
  featureName,
  roleLabel,
}: CustomerFeatureNotificationsPageProps) {
  const config = FEATURE_CONFIG[featureName];
  const roleSegment = roleLabel === "Bank Customer" ? "bank-customer" : "public-customer";

  return (
    <div className={config.outerClassName}>
      <div className={config.innerClassName}>
        <ModuleHeader
          theme={config.theme}
          menuMode="feature-layout"
          title="Notifications"
          name="John Doe"
          role={roleLabel}
        />
        <div className={cn(config.contentWrapClassName)}>
          <NotificationPageContent roleSegment={roleSegment} featureSegment={config.featureSegment} />
        </div>
      </div>
    </div>
  );
}
