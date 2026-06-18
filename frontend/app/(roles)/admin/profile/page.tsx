/**
 * Admin profile page shell rendered from a shared staff layout component.
 */

import { StaffProfilePage } from "@/src/components/layout/staff-profile-page";

// Main page component for the admin profile view.
export default function AdminProfilePage() {
  return <StaffProfilePage role="ADMIN" roleLabel="Admin" />;
}


