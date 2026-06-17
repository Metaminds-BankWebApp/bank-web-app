import { CustomerFeatureNotificationsPage } from "@/src/components/layout/customer-feature-notifications-page";

/**
 * Notification hub wrapper for bank-customer CreditLens updates.
 */
export default function BankCustomerCreditLensNotificationsPage() {
  return <CustomerFeatureNotificationsPage featureName="CreditLens" roleLabel="Bank Customer" />;
}
