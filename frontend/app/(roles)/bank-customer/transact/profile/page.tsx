import { CustomerFeatureProfilePage } from "@/src/components/layout/customer-feature-profile-page";

// Profile page entry for bank-customer users within the Transact module.
export default function BankCustomerTransactProfilePage() {
  // Reuses the shared customer feature profile layout with Transact-specific labels.
  return <CustomerFeatureProfilePage featureName="Transact" roleLabel="Bank Customer" />;
}
