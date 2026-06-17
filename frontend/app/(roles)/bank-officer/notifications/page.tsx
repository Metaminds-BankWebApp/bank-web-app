import { StaffNotificationsPage } from "@/src/components/layout/staff-notifications-page";

export default function BankOfficerNotificationsPage() {
  // Reuse the shared staff notifications page with bank-officer role context.
  return <StaffNotificationsPage role="BANK_OFFICER" roleLabel="Bank Officer" />;
}
