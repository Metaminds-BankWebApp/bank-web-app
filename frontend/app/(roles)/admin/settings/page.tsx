"use client";

import { useState } from "react";
import { AuthGuard } from "@/src/components/auth";
import { Sidebar } from "@/src/components/layout";
import ModuleHeader from "@/src/components/ui/module-header";
import { Button, Card, CardContent, CardHeader, CardTitle, Checkbox, Input, Switch } from "@/src/components/ui";

export default function AdminSettingsPage() {
  const [auditTrailEnabled, setAuditTrailEnabled] = useState(true);
  const [sessionTimeoutEnabled, setSessionTimeoutEnabled] = useState(true);
  const [approvalWorkflowEnabled, setApprovalWorkflowEnabled] = useState(true);
  const [enforceMfaEnabled, setEnforceMfaEnabled] = useState(true);
  const [permissions, setPermissions] = useState({
    canManageBranches: true,
    canManagePolicies: true,
    canInviteOfficers: true,
    canViewAuditExports: false,
  });

  const togglePermission = (key: keyof typeof permissions) => {
    setPermissions((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));
  };

  return (
    <AuthGuard requiredRole="ADMIN">
      <div className="flex h-screen bg-[linear-gradient(180deg,#0b1a3a_0%,#0a234c_58%,#08142d_100%)] overflow-hidden">
        <Sidebar role="ADMIN" className="max-lg:hidden h-full z-10 relative" />
       

        <main className="flex-1 flex flex-col bg-[#f3f4f6] overflow-hidden lg:rounded-l-[28px] shadow-2xl p-3 sm:p-5 lg:p-7">
          <div className="shrink-0 mb-5">
            <ModuleHeader title="Settings" menuMode="sidebar-overlay" sidebarRole="ADMIN" />
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto">
            <div className="mb-6 text-sm text-slate-500">
              Dashboard <span className="mx-2 text-slate-400">▶</span>
              <span className="text-[#3e9fd3] font-medium">Settings</span>
            </div>

            <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
              <div className="space-y-6">
                <Card className="border-none shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg text-[#0d3b66]">Organization Configuration</CardTitle>
                    <p className="text-sm text-slate-500">Maintain institution-level information and compliance defaults.</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <Input label="Bank Name" defaultValue="PrimeCore Banking" className="bg-white" />
                      <Input label="Support Contact" defaultValue="support@primecore.bank" className="bg-white" />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <Input label="Compliance Region" defaultValue="Sri Lanka" className="bg-white" />
                      <Input label="Data Retention (months)" defaultValue="60" className="bg-white" />
                    </div>
                    <div className="flex justify-end gap-2 pt-1">
                      <Button variant="outline">Reset</Button>
                      <Button className="bg-[#0d3b66] text-white hover:bg-[#0a2f52]">Save Changes</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg text-[#0d3b66]">Role Permission Matrix</CardTitle>
                    <p className="text-sm text-slate-500">Define what delegated admins and operations teams can control.</p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <label className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3">
                      <span className="flex items-center gap-3 text-sm text-slate-700">
                        <Checkbox checked={permissions.canManageBranches} onChange={() => togglePermission("canManageBranches")} />
                        Manage branch profiles
                      </span>
                      <span className="text-xs font-medium text-slate-500">ADMIN+</span>
                    </label>

                    <label className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3">
                      <span className="flex items-center gap-3 text-sm text-slate-700">
                        <Checkbox checked={permissions.canManagePolicies} onChange={() => togglePermission("canManagePolicies")} />
                        Manage policy definitions
                      </span>
                      <span className="text-xs font-medium text-slate-500">ADMIN+</span>
                    </label>

                    <label className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3">
                      <span className="flex items-center gap-3 text-sm text-slate-700">
                        <Checkbox checked={permissions.canInviteOfficers} onChange={() => togglePermission("canInviteOfficers")} />
                        Invite and deactivate officers
                      </span>
                      <span className="text-xs font-medium text-slate-500">ADMIN</span>
                    </label>

                    <label className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3">
                      <span className="flex items-center gap-3 text-sm text-slate-700">
                        <Checkbox checked={permissions.canViewAuditExports} onChange={() => togglePermission("canViewAuditExports")} />
                        Export audit reports
                      </span>
                      <span className="text-xs font-medium text-slate-500">SECURITY</span>
                    </label>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="border-none shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg text-[#0d3b66]">Platform Controls</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-800">Audit trail logging</p>
                        <p className="text-xs text-slate-500">Track all security and policy actions</p>
                      </div>
                      <Switch checked={auditTrailEnabled} onCheckedChange={setAuditTrailEnabled} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-800">Auto session timeout</p>
                        <p className="text-xs text-slate-500">Force idle session termination</p>
                      </div>
                      <Switch checked={sessionTimeoutEnabled} onCheckedChange={setSessionTimeoutEnabled} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-800">Dual approval workflow</p>
                        <p className="text-xs text-slate-500">Require 2 admins for policy changes</p>
                      </div>
                      <Switch checked={approvalWorkflowEnabled} onCheckedChange={setApprovalWorkflowEnabled} />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg text-[#0d3b66]">Security Baseline</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-800">Enforce MFA for all staff</p>
                        <p className="text-xs text-slate-500">Mandatory sign-in protection</p>
                      </div>
                      <Switch checked={enforceMfaEnabled} onCheckedChange={setEnforceMfaEnabled} />
                    </div>
                    <Input label="Password Rotation (days)" defaultValue="90" className="bg-white" />
                    <Button variant="secondary" className="w-full">Apply Security Baseline</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
