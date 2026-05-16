import { CustomerFeatureNotificationsPage } from "@/src/components/layout/customer-feature-notifications-page";

/**
 * Notification hub wrapper for public-customer CreditLens updates.
 */
export default function PublicCustomerCreditLensNotificationsPage() {
  return <CustomerFeatureNotificationsPage featureName="CreditLens" roleLabel="Public Customer" />;
}
