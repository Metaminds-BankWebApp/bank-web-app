/**
 * Admin notifications page shell rendered from a shared staff layout component.
 */

import { StaffNotificationsPage } from "@/src/components/layout/staff-notifications-page";

// Entry page for admin notifications and alerts.
export default function AdminNotificationsPage() {
  return <StaffNotificationsPage role="ADMIN" roleLabel="Admin" />;
}



