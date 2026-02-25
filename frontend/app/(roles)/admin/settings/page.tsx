"use client";

import { useState } from "react";
import { AuthGuard } from "@/src/components/auth";
import { Sidebar } from "@/src/components/layout";
import ModuleHeader from "@/src/components/ui/module-header";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Checkbox,
  Input,
  Switch,
} from "@/src/components/ui";

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
    setPermissions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <AuthGuard requiredRole="ADMIN">
      <div className="flex h-screen bg-[linear-gradient(180deg,#0b1a3a_0%,#0a234c_58%,#08142d_100%)] overflow-hidden">
        <Sidebar role="ADMIN" className="max-lg:hidden h-full" />

        <main className="flex-1 flex flex-col bg-[#f4f6f9] overflow-hidden lg:rounded-l-[28px] p-4 sm:p-6 lg:p-8">

          <ModuleHeader title="System Settings" className="mb-6 shrink-0" theme="staff" menuMode="sidebar-overlay" sidebarRole="ADMIN" sidebarHideCollapse={true} role="Admin" avatarSrc="https://ui-avatars.com/api/?name=Kamal+E&background=random" avatarStatusDot name="Kamal Edirisinghe"/>
           
          <div className="flex-1 overflow-y-auto space-y-6">

            {/* System Overview Strip */}
            <div className="rounded-2xl bg-white shadow-sm border border-gray-200 p-5 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-[#0d3b66]">
                  PrimeCore Governance Panel
                </h2>
                <p className="text-sm text-gray-500">
                  Configure organization rules, permissions, and compliance defaults.
                </p>
              </div>

              <div className="flex gap-2 text-xs">
                <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium">
                  Audit Active
                </span>
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">
                  MFA Enforced
                </span>
              </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">

              {/* LEFT COLUMN */}
              <div className="space-y-6">

                {/* Organization Configuration */}
                <Card className="rounded-2xl shadow-sm border-none">
                  <CardHeader>
                    <CardTitle className="text-lg text-[#0d3b66]">
                      Organization Configuration
                    </CardTitle>
                    <p className="text-sm text-gray-500">
                      Maintain institution-level identity and compliance policies.
                    </p>
                  </CardHeader>

                  <CardContent className="space-y-5">
                    <div className="grid gap-4 md:grid-cols-2">
                      <Input label="Bank Name" defaultValue="PrimeCore Banking" />
                      <Input label="Support Contact Email" defaultValue="support@primecore.bank" />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <Input label="Compliance Region" defaultValue="Sri Lanka" />
                      <Input label="Data Retention (months)" defaultValue="60" />
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                      <Button variant="outline">Reset</Button>
                      <Button className="bg-[#0d3b66] text-white hover:bg-[#092a49]">
                        Save Configuration
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Role Permission Matrix */}
                <Card className="rounded-2xl shadow-sm border-none">
                  <CardHeader>
                    <CardTitle className="text-lg text-[#0d3b66]">
                      Role Permission Matrix
                    </CardTitle>
                    <p className="text-sm text-gray-500">
                      Define delegated administrative authority.
                    </p>
                  </CardHeader>

                  <CardContent className="space-y-3">

                    {[
                      {
                        key: "canManageBranches",
                        label: "Manage branch profiles",
                        tag: "ADMIN+",
                      },
                      {
                        key: "canManagePolicies",
                        label: "Manage policy definitions",
                        tag: "ADMIN+",
                      },
                      {
                        key: "canInviteOfficers",
                        label: "Invite & deactivate officers",
                        tag: "ADMIN",
                      },
                      {
                        key: "canViewAuditExports",
                        label: "Export audit reports",
                        tag: "SECURITY",
                      },
                    ].map((item) => (
                      <label
                        key={item.key}
                        className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3"
                      >
                        <span className="flex items-center gap-3 text-sm text-gray-700">
                          <Checkbox
                            checked={permissions[item.key as keyof typeof permissions]}
                            onChange={() =>
                              togglePermission(item.key as keyof typeof permissions)
                            }
                          />
                          {item.label}
                        </span>
                        <span className="text-xs font-medium text-gray-500">
                          {item.tag}
                        </span>
                      </label>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* RIGHT COLUMN */}
              <div className="space-y-6">

                {/* Platform Controls */}
                <Card className="rounded-2xl shadow-sm border-none">
                  <CardHeader>
                    <CardTitle className="text-lg text-[#0d3b66]">
                      Platform Controls
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-6">

                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          Audit Trail Logging
                        </p>
                        <p className="text-xs text-gray-500">
                          Log all security, policy, and configuration changes.
                        </p>
                      </div>
                      <Switch
                        checked={auditTrailEnabled}
                        onCheckedChange={setAuditTrailEnabled}
                      />
                    </div>

                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          Auto Session Timeout
                        </p>
                        <p className="text-xs text-gray-500">
                          Terminate idle sessions automatically.
                        </p>
                      </div>
                      <Switch
                        checked={sessionTimeoutEnabled}
                        onCheckedChange={setSessionTimeoutEnabled}
                      />
                    </div>

                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          Dual Approval Workflow
                        </p>
                        <p className="text-xs text-gray-500">
                          Require two administrators for critical policy changes.
                        </p>
                      </div>
                      <Switch
                        checked={approvalWorkflowEnabled}
                        onCheckedChange={setApprovalWorkflowEnabled}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Security Baseline */}
                <Card className="rounded-2xl shadow-sm border-none">
                  <CardHeader>
                    <CardTitle className="text-lg text-[#0d3b66]">
                      Security Baseline
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-5">

                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          Enforce MFA for All Staff
                        </p>
                        <p className="text-xs text-gray-500">
                          Mandatory multi-factor authentication.
                        </p>
                      </div>
                      <Switch
                        checked={enforceMfaEnabled}
                        onCheckedChange={setEnforceMfaEnabled}
                      />
                    </div>

                    <Input
                      label="Password Rotation (days)"
                      defaultValue="90"
                    />

                    <Button className="w-full bg-[#0d3b66] text-white hover:bg-[#092a49]">
                      Apply Security Baseline
                    </Button>

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