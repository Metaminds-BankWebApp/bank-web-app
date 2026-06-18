/**
 * LoanSense profile page shell that reuses the shared customer profile layout.
 */

import { CustomerFeatureProfilePage } from "@/src/components/layout/customer-feature-profile-page";

// Entry page for the bank-customer profile inside LoanSense.
export default function BankCustomerLoanSenseProfilePage() {
  return <CustomerFeatureProfilePage featureName="LoanSense" roleLabel="Bank Customer" />;
}



