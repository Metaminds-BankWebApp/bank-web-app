import { CustomerFeatureNotificationsPage } from "@/src/components/layout/customer-feature-notifications-page";

// Notifications page entry for bank-customer users in the Transact module.
export default function BankCustomerTransactNotificationsPage() {
  // Uses the shared customer notifications layout with Transact-specific labels.
  return <CustomerFeatureNotificationsPage featureName="Transact" roleLabel="Bank Customer" />;
}
