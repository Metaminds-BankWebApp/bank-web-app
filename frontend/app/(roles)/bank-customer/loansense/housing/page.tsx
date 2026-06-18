/**
 * LoanSense Housing Loan detail page wrapper built on the shared loan-type template.
 */

import LoanTypeDetailPage from "@/src/components/loansense/loan-type-detail-page";

// Detail page wrapper for the Housing Loan eligibility view.
export default function HousingLoanPage() {
  return (
    <LoanTypeDetailPage
      loanType="HOUSING"
      title="Housing Loan"
      subtitle="Get insights into your housing loan eligibility and affordability"
    />
  );
}



