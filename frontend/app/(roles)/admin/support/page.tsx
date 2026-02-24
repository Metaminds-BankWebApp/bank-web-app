"use client";

import { AuthGuard } from "@/src/components/auth";
import { Sidebar } from "@/src/components/layout";
import ModuleHeader from "@/src/components/ui/module-header";
import { Button } from "@/src/components/ui/button";

export default function AdminHelpPage() {
  return (
    <AuthGuard requiredRole="ADMIN">
      <div className="flex h-screen bg-[linear-gradient(180deg,#0b1a3a_0%,#0a234c_58%,#08142d_100%)] overflow-hidden">
        <Sidebar role="ADMIN" className="max-lg:hidden h-full" />

        <main className="flex-1 flex flex-col bg-[#f4f6f9] p-4 sm:p-6 lg:p-8 h-full overflow-hidden lg:rounded-l-[28px]">
          
          <ModuleHeader
            theme="staff"
            menuMode="sidebar-overlay"
            sidebarRole="ADMIN"
            title="Admin Support Center"
            subtitle="Governance, escalations & system oversight"
            className="mb-6"
            role="Admin"
            avatarSrc="https://ui-avatars.com/api/?name=Kamal+E&background=random" 
            avatarStatusDot 
            name="Kamal Edirisinghe"
          />        
          
          <div className="flex-1 overflow-y-auto space-y-6">

            {/* Overview Summary */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-[#063154] mb-4">
                Support Overview
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                {[
                  { label: "Open Tickets", value: "124", color: "bg-blue-100 text-blue-700" },
                  { label: "High Priority", value: "12", color: "bg-red-100 text-red-700" },
                  { label: "Escalations", value: "8", color: "bg-yellow-100 text-yellow-700" },
                  { label: "SLA Breaches", value: "2", color: "bg-purple-100 text-purple-700" },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl border border-gray-200 p-4">
                    <div className="text-gray-500">{item.label}</div>
                    <div className={`mt-2 inline-block px-3 py-1 rounded-full text-xs font-semibold ${item.color}`}>
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Escalations Panel */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-[#063154] mb-4">
                Active Escalations
              </h2>

              <div className="space-y-3 text-sm">
                {[
                  { id: "TCK-2034", issue: "Loan eligibility dispute", branch: "Colombo Main" },
                  { id: "TCK-1982", issue: "Transaction failure investigation", branch: "Kandy Branch" },
                ].map((e) => (
                  <div key={e.id} className="flex justify-between items-center border border-gray-200 rounded-xl px-4 py-3">
                    <div>
                      <div className="font-medium text-[#063154]">{e.issue}</div>
                      <div className="text-xs text-gray-500">
                        Ticket {e.id} • {e.branch}
                      </div>
                    </div>
                    <Button variant="outline">Review</Button>
                  </div>
                ))}
              </div>
            </section>

            {/* System Alerts */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-[#063154] mb-4">
                System Alerts
              </h2>

              <div className="space-y-3 text-sm">
                <div className="border border-yellow-200 bg-yellow-50 rounded-xl px-4 py-3">
                  <div className="font-medium text-yellow-800">
                    High OTP Failure Rate Detected
                  </div>
                  <div className="text-xs text-yellow-700 mt-1">
                    6% failure spike in last 30 minutes.
                  </div>
                </div>

                <div className="border border-red-200 bg-red-50 rounded-xl px-4 py-3">
                  <div className="font-medium text-red-800">
                    CRIB API Delay
                  </div>
                  <div className="text-xs text-red-700 mt-1">
                    Response time exceeding SLA threshold.
                  </div>
                </div>
              </div>
            </section>

            {/* Feedback Review */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-[#063154] mb-4">
                Recent Customer Feedback
              </h2>

              <div className="space-y-3 text-sm">
                <div className="border border-gray-200 rounded-xl px-4 py-3">
                  <div className="font-medium text-[#063154]">
                    CreditLens – Suggestion
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    “The readiness explanation could be clearer.”
                  </div>
                </div>

                <div className="border border-gray-200 rounded-xl px-4 py-3">
                  <div className="font-medium text-[#063154]">
                    Transact – UI Feedback
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    “OTP screen should auto-focus.”
                  </div>
                </div>
              </div>
            </section>

            {/* Knowledge Base */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-md font-semibold text-[#063154]">
                Governance Knowledge Base
              </h3>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                {[
                  { title: "Audit Log Review Guide", desc: "Interpreting system activity logs." },
                  { title: "Escalation SLA Framework", desc: "Response time and resolution rules." },
                  { title: "Security Compliance Manual", desc: "Baseline enforcement policies." },
                ].map((k) => (
                  <div key={k.title} className="border border-gray-200 rounded-xl p-4">
                    <div className="font-medium text-[#063154]">{k.title}</div>
                    <div className="text-xs text-gray-500 mt-1">{k.desc}</div>
                    <div className="mt-3">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ Section */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-[#063154]">
                Frequently Asked Questions
              </h2>

              <div className="mt-4 space-y-3 text-sm text-[#063154]/85">
                <details className="border-t pt-3">
                  <summary className="font-medium cursor-pointer">
                    How do I override a resolved ticket?
                  </summary>
                  <p className="mt-2">
                    Open the ticket from the Admin Support Console and select Reopen Case.
                  </p>
                </details>

                <details className="border-t pt-3">
                  <summary className="font-medium cursor-pointer">
                    How can I export audit evidence?
                  </summary>
                  <p className="mt-2">
                    Navigate to Audit Logs and use the Export feature with applied filters.
                  </p>
                </details>

                <details className="border-t pt-3">
                  <summary className="font-medium cursor-pointer">
                    Who handles SLA breaches?
                  </summary>
                  <p className="mt-2">
                    SLA breaches trigger alerts to senior administrators automatically.
                  </p>
                </details>
              </div>
            </section>

          </div>
        </main>
      </div>
    </AuthGuard>
  );
}