"use client"

import React, { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import TransactHeader from "@/src/components/ui/Transact-Header"

export default function Page() {
  const router = useRouter()
  const [showOtp, setShowOtp] = useState(false)

  const length = 6
  const [otpValues, setOtpValues] = useState<string[]>(Array(length).fill(""))
  const inputsRef = useRef<Array<HTMLInputElement | null>>([])

  const handleOtpChange = (index: number, val: string) => {
    if (!/^[0-9]*$/.test(val)) return

    const next = [...otpValues]
    next[index] = val.slice(-1)
    setOtpValues(next)

    if (val && index < length - 1) {
      inputsRef.current[index + 1]?.focus()
    }
  }

  const handleVerify = () => {
    const otpString = otpValues.join("")

    if (otpString.length !== 6) {
      alert("Please enter full 6-digit OTP")
      return
    }

    // Close modal
    setShowOtp(false)

    // Navigate to success page
    router.push("/bank-customer/transact/success")
  }

  return (
    <div className="relative">

      {/* 🔹 MAIN TRANSFER CONTENT */}
      <div className={showOtp ? "blur-sm pointer-events-none" : ""}>
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          <TransactHeader title="Transfer" subtitle="Bank transfer" />

          <div className="flex justify-end mt-8 mb-8 max-w-6xl mx-auto">
            <Link
              href="/bank-customer/transact/beneficiary"
              className="text-[#155E63] font-medium hover:underline"
            >
              + Add Beneficiary
            </Link>
          </div>

          <Card className="rounded-xl shadow-sm p-8 max-w-6xl mx-auto w-full">
            <form className="space-y-6">
              <div className="space-y-1">
                <Label>Account Number</Label>
                <Input placeholder="Enter account number" />
              </div>

              <div className="space-y-1">
                <Label>Beneficiary Name</Label>
                <Input placeholder="Beneficiary full name" />
              </div>

              <div className="space-y-1">
                <Label>Amount</Label>
                <Input type="number" placeholder="0.00" />
              </div>

              <div className="space-y-1">
                <Label>Remark</Label>
                <Input placeholder="Add a note (optional)" />
              </div>

              <div className="pt-2">
                <label className="inline-flex items-center space-x-2">
                  <Checkbox />
                  <span>Expenses track</span>
                </label>
              </div>

              <div className="flex justify-end">
                <Button
                  type="button"
                  onClick={() => setShowOtp(true)}
                  className="bg-[#155E63] hover:bg-[#134e52] text-white px-8 py-6 rounded-xl"
                >
                  Transfer Amount
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>

      {/* 🔹 OTP MODAL */}
      {showOtp && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <Card className="bg-white rounded-2xl shadow-xl border p-10 max-w-xl w-full">

            <h2 className="text-2xl font-semibold text-[#155E63] text-center mb-6">
              OTP Authentication
            </h2>

            <p className="text-sm text-muted-foreground text-center mb-8">
              Enter the 6-digit OTP sent to your registered number
            </p>

            <div className="flex justify-center mb-8">
              <div className="grid grid-cols-6 gap-4">
                {otpValues.map((val, idx) => (
                  <Input
                    key={idx}
                    value={val}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    ref={(el) => { inputsRef.current[idx] = el }}
                    maxLength={1}
                    className="w-14 h-14 text-center text-lg rounded-lg"
                  />
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                onClick={() => setShowOtp(false)}
              >
                Cancel
              </Button>

              <Button
                onClick={handleVerify}
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-8"
              >
                Verify
              </Button>
            </div>

          </Card>
        </div>
      )}
    </div>
  )
}
