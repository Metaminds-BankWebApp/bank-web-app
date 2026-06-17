/**
 * LoanSense Personal Loan detail page wrapper built on the shared loan-type template.
 */

import LoanTypeDetailPage from "@/src/components/loansense/loan-type-detail-page";

// Detail page wrapper for the Personal Loan eligibility view.
export default function PersonalLoanPage() {
  return (
    <LoanTypeDetailPage
      loanType="PERSONAL"
      title="Personal Loan"
      subtitle="Discover your personal loan eligibility and affordability insights"
    />
  );
}



