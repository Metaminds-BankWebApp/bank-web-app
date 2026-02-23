"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sidebar } from "@/src/components/layout";
import ModuleHeader from "@/src/components/ui/module-header";
import { AuthGuard } from "@/src/components/auth";
import { Building2 } from "lucide-react";
import { useRouter } from "next/navigation";


export default function AddBranchPage() {
  const [branchName, setBranchName] = useState("");
  const [branchId, setBranchId] = useState("");
  const[customers, setCustomers] = useState("");
  const[officers, setOfficers] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [isActive, setIsActive] = useState(true);

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      branchName,
      branchId,
      customers,
      officers,
      contact,
      email,
      address,
      isActive,
    });
    


    // Later connect to backend here
  };

  return (
    <AuthGuard requiredRole="ADMIN">
      <div className="flex h-screen bg-[linear-gradient(180deg,#0b1a3a_0%,#0a234c_58%,#08142d_100%)] overflow-hidden">
        {/* Sidebar */}
         <Sidebar role="ADMIN" className="max-lg:hidden h-full z-10 relative" />

        {/* Main Content */}
        <main className="flex-1 flex flex-col bg-[#f3f4f6] overflow-hidden lg:rounded-l-[28px] shadow-2xl p-3 sm:p-5 lg:p-7">
          {/* Header */}
          <div className="shrink-0 mb-5">
            <ModuleHeader theme="staff" menuMode="sidebar-overlay" sidebarRole="ADMIN" mailBadge={2} notificationBadge={8} avatarSrc="https://ui-avatars.com/api/?name=Kamal+E&background=random" avatarStatusDot name="Kamal Edirisinghe" role="Admin" title="Branch Management / Add Branch" />
          </div>

          <div className="flex-1 overflow-y-auto px-6 pb-10">

            {/* Breadcrumb */}
            <div className="mb-6 text-sm text-gray-500">
              <Link
                href="/admin/branch-management"
                className="hover:text-[#0B3B66] font-medium"
              >
                Branch Management
              </Link>{" "}
              / <span className="text-gray-800 font-semibold">Add Branch</span>
            </div>

            {/* Section Title */}
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-lg bg-blue-100 text-[#0B3B66]">
                <Building2 size={20} />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Branch Information
                </h2>
                <p className="text-sm text-gray-500">
                  Configure the primary details for the new bank branch.
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Left Card */}
                <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">

                  <div>
                    <label className="block text-xs font-semibold mb-2">
                      BRANCH NAME
                    </label>
                    <input
                      type="text"
                      value={branchName}
                      onChange={(e) => setBranchName(e.target.value)}
                      placeholder="Colombo Branch"
                      className="w-full px-4 py-3 rounded-lg border text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-2">
                      BRANCH ID
                    </label>
                    <input
                      type="text"
                      value={branchId}
                      onChange={(e) => setBranchId(e.target.value)}
                      placeholder="BR-001"
                      className="w-full px-4 py-3 rounded-lg border text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-2">
                      TOTAL CUSTOMERS
                    </label>
                    <input
                      type="text"
                      value={customers}
                      onChange={(e) => setCustomers(e.target.value)}
                      placeholder="200"
                      className="w-full px-4 py-3 rounded-lg border text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-2">
                      TOTAL OFFICERS
                    </label>
                    <input
                      type="text"
                      value={officers}
                      onChange={(e) => setOfficers(e.target.value)}
                      placeholder="15"
                      className="w-full px-4 py-3 rounded-lg border text-sm"
                    />
                  </div>

                  

                </div>

                {/* Right Card */}
                <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">

                  <div>
                    <label className="block text-xs font-semibold mb-2">
                      CONTACT NUMBER
                    </label>
                    <input
                      type="text"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder="+94 XX XXX XXXX"
                      className="w-full px-4 py-3 rounded-lg border text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-2">
                      EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="branch@primecore.com"
                      className="w-full px-4 py-3 rounded-lg border text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-2">
                      FULL ADDRESS
                    </label>
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter the complete street address and landmarks..."
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border text-sm resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-2">
                      BRANCH STATUS
                    </label>

                    <div className="flex items-center justify-between px-4 py-3 border rounded-lg">
                      <span className="text-sm">
                        {isActive ? "Active" : "Maintenance"}
                      </span>

                      <button
                        type="button"
                        onClick={() => setIsActive(!isActive)}
                        className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                          isActive ? "bg-blue-600" : "bg-gray-300"
                        }`}
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
                            isActive ? "translate-x-6" : ""
                          }`}
                        />
                      </button>
                    </div>
                </div>

                  <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6">
                  <button type="button"
                    onClick={() =>
                      router.push("/admin/branch-management")
                    }
                    className="px-6 py-3 rounded-lg bg-gray-200 hover:bg-gray-300 w-full sm:w-auto"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="px-6 py-3 rounded-lg bg-[#0B3B66] text-white hover:bg-[#082d4a] w-full sm:w-auto">
                    Save Branch
                  </button>
                </div>

                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
