import { StaffProfilePage } from "@/src/components/layout/staff-profile-page";

export default function BankOfficerProfilePage() {
  // Reuse the shared staff profile page with bank-officer role context.
  return <StaffProfilePage role="BANK_OFFICER" roleLabel="Bank Officer" />;
}
