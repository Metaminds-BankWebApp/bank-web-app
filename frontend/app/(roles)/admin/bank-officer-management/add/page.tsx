"use client";

import React, { useState } from "react";
import { Sidebar } from "@/src/components/layout";
import { AdminHeader } from "@/src/components/ui/adminheader";
import { AuthGuard } from "@/src/components/auth";
import { useRouter } from "next/navigation";

export default function AddOfficerPage() {
  const router = useRouter();

  const [status, setStatus] = useState(true);

  return (
    <AuthGuard requiredRole="ADMIN">
      <div className="flex h-screen bg-[#f4f6f9] overflow-hidden">
        <Sidebar role="ADMIN" className="hidden lg:block" />

        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Top Header */}
          <div className="px-4 sm:px-6 lg:px-8 pt-4 pb-6">
            <AdminHeader title="Bank Officer Management / Add Officer" />
          </div>

          <div className="flex-1 overflow-y-auto px-2 sm:px-4 lg:px-8 pb-6 lg:pb-12">
            {/* Breadcrumb */}
            <div className="text-sm mb-6 flex flex-wrap items-center">
              <button
                onClick={() => router.push("/admin/bank-officer-management")}
                className="text-gray-500 hover:text-[#0B3B66]"
              >
                Bank Officer Management
              </button>
              <span className="mx-2 text-gray-400">/</span>
              <span className="font-semibold text-gray-800">Add Officer</span>
            </div>

            {/* Section Title */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-[#0B3B66] flex items-center gap-3">
                <span className="bg-blue-100 p-2 rounded-lg">
                  🏦
                </span>
                Bank Officer Information
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                Configure the primary details for the new bank officer.
              </p>
            </div>

            {/* Form Layout */}
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
              {/* LEFT CARD */}
              <div className="bg-[#e9eef5] rounded-2xl p-4 sm:p-6 lg:p-8 space-y-6 flex-1 min-w-0">
                {/* Officer Name */}
                <div>
                  <label className="text-xs font-semibold text-gray-600 uppercase">
                    Officer Name
                  </label>
                  <input
                    type="text"
                    placeholder="Kamal Sooriyarachchi"
                    className="w-full mt-2 px-4 py-3 rounded-lg bg-white border border-gray-300"
                  />
                </div>
                {/* Officer ID */}
                <div>
                  <label className="text-xs font-semibold text-gray-600 uppercase">
                    Officer ID
                  </label>
                  <input
                    type="text"
                    value="OFF-001"
                    disabled
                    className="w-full mt-2 px-4 py-3 rounded-lg bg-gray-200 border border-gray-300 text-gray-500"
                  />
                </div>
                {/* Username */}
                <div>
                  <label className="text-xs font-semibold text-gray-600 uppercase">
                    User Name
                  </label>
                  <div className="flex flex-col sm:flex-row mt-2">
                    <input
                      type="text"
                      placeholder="KamalOFF001"
                      className="flex-1 px-4 py-3 rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none bg-white border border-gray-300 border-b-0 sm:border-b sm:border-r-0"
                    />
                    <button className="px-5 bg-gray-300 rounded-b-lg sm:rounded-r-lg sm:rounded-bl-none border border-t-0 sm:border-t sm:border-l-0 border-gray-300">
                      Create
                    </button>
                  </div>
                </div>
                {/* Password */}
                <div>
                  <label className="text-xs font-semibold text-gray-600 uppercase">
                    Password
                  </label>
                  <div className="flex flex-col sm:flex-row mt-2">
                    <input
                      type="text"
                      placeholder="8uW00Is#F"
                      className="flex-1 px-4 py-3 rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none bg-white border border-gray-300 border-b-0 sm:border-b sm:border-r-0"
                    />
                    <button className="px-5 bg-gray-300 rounded-b-lg sm:rounded-r-lg sm:rounded-bl-none border border-t-0 sm:border-t sm:border-l-0 border-gray-300">
                      Create
                    </button>
                  </div>
                </div>
                {/* Status Toggle */}
                <div>
                  <label className="text-xs font-semibold text-gray-600 uppercase">
                    Officer Status
                  </label>
                  <div className="flex items-center justify-between bg-white px-4 py-3 mt-2 rounded-lg border border-gray-300">
                    <span>{status ? "Active" : "Inactive"}</span>
                    <button
                      onClick={() => setStatus(!status)}
                      className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                        status ? "bg-[#0B3B66]" : "bg-gray-400"
                      }`}
                    >
                      <div
                        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
                          status ? "translate-x-6" : ""
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
              {/* RIGHT CARD */}
              <div className="bg-[#e9eef5] rounded-2xl p-4 sm:p-6 lg:p-8 space-y-6 flex-1 min-w-0">
                {/* Contact */}
                <div>
                  <label className="text-xs font-semibold text-gray-600 uppercase">
                    Contact Number
                  </label>
                  <input
                    type="text"
                    placeholder="+94 XX XXX XXXX"
                    className="w-full mt-2 px-4 py-3 rounded-lg bg-white border border-gray-300"
                  />
                </div>
                {/* Email */}
                <div>
                  <label className="text-xs font-semibold text-gray-600 uppercase">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="kamal@primecore.com"
                    className="w-full mt-2 px-4 py-3 rounded-lg bg-white border border-gray-300"
                  />
                </div>
                {/* Assign Branch */}
                <div>
                  <label className="text-xs font-semibold text-gray-600 uppercase">
                    Assign Branch
                  </label>
                  <select className="w-full mt-2 px-4 py-3 rounded-lg bg-white border border-gray-300">
                    <option>Branch : Kandy</option>
                    <option>Main Street Branch</option>
                    <option>Downtown Branch</option>
                  </select>
                </div>
                {/* Address */}
                <div>
                  <label className="text-xs font-semibold text-gray-600 uppercase">
                    Full Address
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Enter the complete street address and landmarks..."
                    className="w-full mt-2 px-4 py-3 rounded-lg bg-white border border-gray-300"
                  />
                </div>
                {/* Buttons */}
                <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6">
                  <button
                    onClick={() =>
                      router.push("/admin/bank-officer-management")
                    }
                    className="px-6 py-3 rounded-lg bg-gray-200 hover:bg-gray-300 w-full sm:w-auto"
                  >
                    Cancel
                  </button>
                  <button className="px-6 py-3 rounded-lg bg-[#0B3B66] text-white hover:bg-[#082d4a] w-full sm:w-auto">
                    Save OFFICER
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}