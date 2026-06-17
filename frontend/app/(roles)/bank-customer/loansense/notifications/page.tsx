/**
 * LoanSense notifications page shell that reuses the shared customer notification layout.
 */

import { CustomerFeatureNotificationsPage } from "@/src/components/layout/customer-feature-notifications-page";

// Entry page for LoanSense notifications and alerts.
export default function BankCustomerLoanSenseNotificationsPage() {
  return <CustomerFeatureNotificationsPage featureName="LoanSense" roleLabel="Bank Customer" />;
}



