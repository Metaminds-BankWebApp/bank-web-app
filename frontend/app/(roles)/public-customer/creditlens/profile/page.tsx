import { CustomerFeatureProfilePage } from "@/src/components/layout/customer-feature-profile-page";

/**
 * Profile wrapper for public-customer CreditLens account details.
 */
export default function PublicCustomerCreditLensProfilePage() {
  return <CustomerFeatureProfilePage featureName="CreditLens" roleLabel="Public Customer" />;
}
