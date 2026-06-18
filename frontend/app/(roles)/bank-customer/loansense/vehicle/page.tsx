/**
 * LoanSense Vehicle Loan detail page wrapper built on the shared loan-type template.
 */

import LoanTypeDetailPage from "@/src/components/loansense/loan-type-detail-page";

// Detail page wrapper for the Vehicle Loan eligibility view.
export default function VehicleLoanPage() {
  return (
    <LoanTypeDetailPage
      loanType="VEHICLE"
      title="Vehicle Loan"
      subtitle="Discover your vehicle loan eligibility and affordability insights"
    />
  );
}



