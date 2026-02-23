"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader } from "@/src/components/ui";
import { Sidebar } from "@/src/components/layout";
import { AuthGuard } from "@/src/components/auth";
import ModuleHeader from "@/src/components/ui/module-header";

type ThemeMode = "system" | "light" | "dark";
type DensityMode = "comfortable" | "compact";

export default function BankOfficerSettingsPage() {
  const [themeMode, setThemeMode] = useState<ThemeMode>("system");
  const [density, setDensity] = useState<DensityMode>("comfortable");

  const [notifyTickets, setNotifyTickets] = useState(true);
  const [notifyLoans, setNotifyLoans] = useState(true);
  const [notifyEscalations, setNotifyEscalations] = useState(false);

  const lastLoginText = useMemo(() => "24 Feb 2026 – 09:14 AM", []);

  return (
    <AuthGuard requiredRole="BANK_OFFICER">
      <div className="flex h-screen bg-[linear-gradient(180deg,#0b1a3a_0%,#0a234c_58%,#08142d_100%)] overflow-hidden">
        <Sidebar role="BANK_OFFICER" className="max-lg:hidden h-full" />

        <main className="flex-1 flex flex-col bg-[#f3f4f6] h-full overflow-hidden lg:rounded-l-[28px]">
          <div className="p-4 sm:p-6 lg:p-8 pb-0">
            <ModuleHeader
              theme="staff"
              menuMode="sidebar-overlay"
              sidebarRole="BANK_OFFICER"
              sidebarHideCollapse
              mailBadge={2}
              notificationBadge={8}
              avatarSrc="https://ui-avatars.com/api/?name=Kamal+E&background=random"
              avatarStatusDot
              name="Kamal Edirisinghe"
              role="Bank Officer"
              title="Settings"
              className="mb-6 shrink-0"
            />
          </div>

          <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 pb-8">
            {/* Page header strip */}
            <div className="mb-6 rounded-2xl border border-[#e5e7eb] bg-white/70 backdrop-blur p-4 sm:p-5 shadow-sm">
              <div className="flex flex-col gap-1">
                <p className="text-sm text-gray-600">
                  Manage your profile, security, and work preferences for a
                  smoother day-to-day workflow.
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#e5e7eb] bg-white px-3 py-1 text-xs text-gray-700">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Active Session
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#e5e7eb] bg-white px-3 py-1 text-xs text-gray-700">
                    Last login: <span className="font-semibold">{lastLoginText}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
              {/* LEFT COLUMN */}
              <div className="flex flex-col gap-6">
                {/* Profile Information */}
                <Card className="border-none shadow-sm rounded-2xl">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-lg font-semibold text-[#0d3b66]">
                          Profile Information
                        </h2>
                        <p className="text-sm text-gray-500">
                          Update your personal details and contact information.
                        </p>
                      </div>

                      <div className="hidden sm:flex items-center gap-2">
                        <span className="inline-flex items-center rounded-full bg-[#e6f7f5] px-3 py-1 text-xs font-semibold text-[#2F9D94]">
                          Verified Staff
                        </span>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-gray-500">Full Name</label>
                        <input
                          className="w-full mt-1 rounded-xl border border-gray-200 bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-[#2F9D94]"
                          defaultValue="Kamal Edirisinghe"
                        />
                      </div>

                      <div>
                        <label className="text-sm text-gray-500">Email</label>
                        <input
                          className="w-full mt-1 rounded-xl border border-gray-200 bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-[#2F9D94]"
                          defaultValue="kamal@primecore.lk"
                        />
                      </div>

                      <div>
                        <label className="text-sm text-gray-500">Phone</label>
                        <input
                          className="w-full mt-1 rounded-xl border border-gray-200 bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-[#2F9D94]"
                          defaultValue="+94 77 123 4567"
                        />
                      </div>

                      <div>
                        <label className="text-sm text-gray-500">Officer ID</label>
                        <input
                          disabled
                          className="w-full mt-1 rounded-xl border border-gray-200 bg-gray-100 p-3 text-sm text-gray-600"
                          defaultValue="OF-2391"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3">
                      <button className="rounded-xl border border-gray-200 bg-white px-6 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition">
                        Discard
                      </button>
                      <button className="rounded-xl bg-[#2F9D94] px-6 py-2 text-sm font-semibold text-white hover:bg-[#258b83] transition">
                        Save Changes
                      </button>
                    </div>
                  </CardContent>
                </Card>

                {/* Work Context (Branch & Role) */}
                <Card className="border-none shadow-sm rounded-2xl">
                  <CardHeader>
                    <h2 className="text-lg font-semibold text-[#0d3b66]">
                      Work Context
                    </h2>
                    <p className="text-sm text-gray-500">
                      Read-only operational details for this staff account.
                    </p>
                  </CardHeader>

                  <CardContent className="grid gap-3 text-sm text-gray-700">
                    <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-3">
                      <span className="text-gray-500">Assigned Branch</span>
                      <span className="font-semibold text-[#0d3b66]">
                        Colombo Main Branch
                      </span>
                    </div>

                    <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-3">
                      <span className="text-gray-500">Role</span>
                      <span className="font-semibold text-[#0d3b66]">
                        Bank Officer
                      </span>
                    </div>

                    <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-3">
                      <span className="text-gray-500">Access Level</span>
                      <span className="font-semibold text-[#0d3b66]">
                        Customer & Loan Management
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Preferences (Theme + Density) */}
                <Card className="border-none shadow-sm rounded-2xl">
                  <CardHeader>
                    <h2 className="text-lg font-semibold text-[#0d3b66]">
                      Appearance & Preferences
                    </h2>
                    <p className="text-sm text-gray-500">
                      Customize how PrimeCore looks and feels for you.
                    </p>
                  </CardHeader>

                  <CardContent className="space-y-5">
                    {/* Theme mode segmented control */}
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">Theme</p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <button
                          onClick={() => setThemeMode("system")}
                          className={[
                            "rounded-xl border px-4 py-3 text-sm font-semibold transition",
                            themeMode === "system"
                              ? "border-[#2F9D94] bg-[#e6f7f5] text-[#147a73]"
                              : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50",
                          ].join(" ")}
                        >
                          System
                          <span className="block text-xs font-normal text-gray-500 mt-1">
                            Match device
                          </span>
                        </button>

                        <button
                          onClick={() => setThemeMode("light")}
                          className={[
                            "rounded-xl border px-4 py-3 text-sm font-semibold transition",
                            themeMode === "light"
                              ? "border-[#2F9D94] bg-[#e6f7f5] text-[#147a73]"
                              : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50",
                          ].join(" ")}
                        >
                          Light
                          <span className="block text-xs font-normal text-gray-500 mt-1">
                            Bright UI
                          </span>
                        </button>

                        <button
                          onClick={() => setThemeMode("dark")}
                          className={[
                            "rounded-xl border px-4 py-3 text-sm font-semibold transition",
                            themeMode === "dark"
                              ? "border-[#2F9D94] bg-[#e6f7f5] text-[#147a73]"
                              : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50",
                          ].join(" ")}
                        >
                          Dark
                          <span className="block text-xs font-normal text-gray-500 mt-1">
                            Low glare
                          </span>
                        </button>
                      </div>
                      <p className="text-xs text-gray-500">
                        Tip: Dark mode is recommended for long shifts.
                      </p>
                    </div>

                    {/* Density */}
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">Density</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <button
                          onClick={() => setDensity("comfortable")}
                          className={[
                            "rounded-xl border px-4 py-3 text-sm font-semibold transition",
                            density === "comfortable"
                              ? "border-[#2F9D94] bg-[#e6f7f5] text-[#147a73]"
                              : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50",
                          ].join(" ")}
                        >
                          Comfortable
                          <span className="block text-xs font-normal text-gray-500 mt-1">
                            More spacing
                          </span>
                        </button>

                        <button
                          onClick={() => setDensity("compact")}
                          className={[
                            "rounded-xl border px-4 py-3 text-sm font-semibold transition",
                            density === "compact"
                              ? "border-[#2F9D94] bg-[#e6f7f5] text-[#147a73]"
                              : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50",
                          ].join(" ")}
                        >
                          Compact
                          <span className="block text-xs font-normal text-gray-500 mt-1">
                            Fits more rows
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Quick toggles */}
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-3">
                        <div>
                          <p className="text-sm font-medium text-gray-700">
                            Compact Tables
                          </p>
                          <p className="text-xs text-gray-500">
                            Denser tables for tickets and lists
                          </p>
                        </div>
                        <input type="checkbox" className="h-5 w-5 accent-[#2F9D94]" />
                      </div>

                      <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-3">
                        <div>
                          <p className="text-sm font-medium text-gray-700">
                            Reduce Animations
                          </p>
                          <p className="text-xs text-gray-500">
                            Helpful for slower devices
                          </p>
                        </div>
                        <input type="checkbox" className="h-5 w-5 accent-[#2F9D94]" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* RIGHT COLUMN */}
              <div className="flex flex-col gap-6">
                {/* Security */}
                <Card className="border-none shadow-sm rounded-2xl">
                  <CardHeader>
                    <h2 className="text-lg font-semibold text-[#0d3b66]">
                      Security
                    </h2>
                    <p className="text-sm text-gray-500">
                      Keep your staff account secure.
                    </p>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <button className="w-full rounded-xl border border-gray-200 bg-white py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50 transition">
                      Change Password
                    </button>

                    <button className="w-full rounded-xl border border-gray-200 bg-white py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50 transition">
                      Enable Two-Factor Authentication
                    </button>

                    <div className="rounded-xl border border-[#e5e7eb] bg-white p-3">
                      <p className="text-xs text-gray-500">Last login</p>
                      <p className="text-sm font-semibold text-gray-800">
                        {lastLoginText}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        If this wasn’t you, change your password immediately.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Notifications */}
                <Card className="border-none shadow-sm rounded-2xl">
                  <CardHeader>
                    <h2 className="text-lg font-semibold text-[#0d3b66]">
                      Notifications
                    </h2>
                    <p className="text-sm text-gray-500">
                      Control what you get alerted about.
                    </p>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center rounded-xl border border-gray-100 bg-white p-3">
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          New Support Tickets
                        </p>
                        <p className="text-xs text-gray-500">
                          Alerts for newly assigned tickets
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifyTickets}
                        onChange={(e) => setNotifyTickets(e.target.checked)}
                        className="h-5 w-5 accent-[#2F9D94]"
                      />
                    </div>

                    <div className="flex justify-between items-center rounded-xl border border-gray-100 bg-white p-3">
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Loan Approval Alerts
                        </p>
                        <p className="text-xs text-gray-500">
                          Updates on approvals and reviews
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifyLoans}
                        onChange={(e) => setNotifyLoans(e.target.checked)}
                        className="h-5 w-5 accent-[#2F9D94]"
                      />
                    </div>

                    <div className="flex justify-between items-center rounded-xl border border-gray-100 bg-white p-3">
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Escalation Alerts
                        </p>
                        <p className="text-xs text-gray-500">
                          Notifications when admin responds
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifyEscalations}
                        onChange={(e) => setNotifyEscalations(e.target.checked)}
                        className="h-5 w-5 accent-[#2F9D94]"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Account Actions */}
                <Card className="border-none shadow-sm rounded-2xl">
                  <CardHeader>
                    <h2 className="text-lg font-semibold text-red-500">
                      Account Actions
                    </h2>
                    <p className="text-sm text-gray-500">
                      Manage your session and sign out.
                    </p>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <button className="w-full rounded-xl border border-gray-200 bg-white py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50 transition">
                      View Login Activity
                    </button>

                    <button className="w-full rounded-xl bg-red-500 py-3 text-sm font-semibold text-white hover:bg-red-600 transition">
                      Logout
                    </button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Bottom spacing */}
            <div className="h-2" />
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}