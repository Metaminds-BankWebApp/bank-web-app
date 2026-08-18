import { AuthGuard } from "@/src/components/auth";
import { Sidebar } from "@/src/components/layout";
import ModuleHeader from "@/src/components/ui/module-header";
import { SupportConversationWorkspace } from "@/src/components/support/support-conversation-workspace";

export default function AdminSupportPage() {
  return (
    <AuthGuard requiredRole="ADMIN">
      <div className="flex h-screen overflow-hidden bg-[linear-gradient(180deg,#0b1a3a_0%,#0a234c_58%,#08142d_100%)]">
        <Sidebar role="ADMIN" className="h-full max-lg:hidden" />
        <main className="flex-1 overflow-y-auto bg-[#f3f4f6] p-2 sm:p-4 lg:rounded-l-[28px] lg:p-7">
          <ModuleHeader
            title="Help & Support"
            theme="staff"
            menuMode="sidebar-overlay"
            sidebarRole="ADMIN"
            sidebarHideCollapse
            role="Admin"
            className="mb-6"
          />
          <div className="mx-auto max-w-7xl"><SupportConversationWorkspace admin /></div>
        </main>
      </div>
    </AuthGuard>
  );
}
