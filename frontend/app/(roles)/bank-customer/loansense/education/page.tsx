/**
 * LoanSense Education Loan detail page wrapper built on the shared loan-type template.
 */

import LoanTypeDetailPage from "@/src/components/loansense/loan-type-detail-page";

// Detail page wrapper for the Education Loan eligibility view.
export default function EducationLoanPage() {
  return (
    <LoanTypeDetailPage
      loanType="EDUCATION"
      title="Education Loan"
      subtitle="Explore your education loan eligibility and affordability insights"
    />
  );
}



