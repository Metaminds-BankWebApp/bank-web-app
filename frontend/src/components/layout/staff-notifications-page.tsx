"use client";

import { AuthGuard } from "@/src/components/auth";
import { Sidebar } from "@/src/components/layout";
import ModuleHeader from "@/src/components/ui/module-header";
import { NotificationPageContent } from "@/src/components/notifications/notification-page-content";
import type { UserRole } from "@/config/site";
import { cn } from "@/src/lib/utils";

type StaffRoleLabel = "Bank Officer" | "Admin";

type StaffNotificationsPageProps = {
  role: Extract<UserRole, "BANK_OFFICER" | "ADMIN">;
  roleLabel: StaffRoleLabel;
};

export function StaffNotificationsPage({ role, roleLabel }: StaffNotificationsPageProps) {
  const roleSegment = role === "ADMIN" ? "admin" : "bank-officer";
  const isAdmin = role === "ADMIN";

  return (
    <AuthGuard requiredRole={role}>
      <div className="flex h-screen overflow-hidden bg-[linear-gradient(180deg,#0b1a3a_0%,#0a234c_58%,#08142d_100%)]">
        <Sidebar role={role} className="h-full max-lg:hidden" hideCollapse={role === "BANK_OFFICER"} />
        <main className="flex h-full flex-1 flex-col overflow-hidden bg-[#f3f4f6] shadow-2xl lg:rounded-l-[28px]">
          <div
            className={cn(
              "min-h-0 flex-1 overflow-y-auto",
              isAdmin ? "p-8 lg:p-10" : "p-3 sm:p-5 lg:p-7"
            )}
          >
            <ModuleHeader
              theme="staff"
              menuMode="sidebar-overlay"
              sidebarRole={role}
              sidebarHideCollapse={role === "BANK_OFFICER"}
              notificationBadge={8}
              avatarSrc="https://ui-avatars.com/api/?name=Kamal+E&background=random"
              avatarStatusDot
              name="Kamal Edirisinghe"
              role={roleLabel}
              title="Notifications"
              className={cn(!isAdmin && "mb-5 shrink-0")}
            />
            <NotificationPageContent roleSegment={roleSegment} />
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
