"use client"

import React, { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import TransactHeader from "@/src/components/ui/Transact-Header"
import { Check } from "lucide-react"
import { useRouter } from "next/navigation"


export default function Page() {
  const [showOtp, setShowOtp] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const length = 6
  const [otpValues, setOtpValues] = useState<string[]>(Array(length).fill(""))
  const inputsRef = useRef<Array<HTMLInputElement | null>>([])
  const [seconds, setSeconds] = useState(59)
  const router = useRouter()


  // OTP Timer
  useEffect(() => {
    if (!showOtp || seconds <= 0) return
    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [seconds, showOtp])

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
    if (otpString.length === 6) {
      setShowOtp(false)
      setShowSuccess(true)
    }
  }

  useEffect(() => {
    if (!showOtp) return
    if (otpValues.every((digit) => digit !== "")) {
      handleVerify()
    }
  }, [otpValues, showOtp])

  const handleResendOtp = () => {
    setSeconds(59)
    setOtpValues(Array(length).fill(""))
    inputsRef.current[0]?.focus()
  }

  return (
    <div className="relative min-h-full">

      {/* 🔹 BLUR MAIN PAGE WHEN MODAL OPEN */}
      <div className={showOtp || showSuccess ? "blur-sm pointer-events-none" : ""}>
        <div className="px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
          <TransactHeader title="Transfer" subtitle="Dineth dovindu" />

          {/* Add Beneficiary Button */}
          <div className="flex justify-end mt-16  pr-[7rem] ">
            <Link
              href="/bank-customer/transact/beneficiary"
              className="inline-flex items-center gap-2 px-5 py-2.5 
                         bg-[#e6f4f6] text-[#155E63] 
                         rounded-full font-medium 
                         hover:bg-[#d1ecef] transition-all duration-200"
            >
              + Add Beneficiary
            </Link>
          </div>

          {/* Transfer Form */}
          <Card className="rounded-xl shadow-sm p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto w-full mt-4 sm:mt-10">
            <form className="space-y-9">
              <div className="space-y-2">
                <Label>Account Number</Label>
                <Input placeholder="Enter account number" />
              </div>

              <div className="space-y-2">
                <Label>Beneficiary Name</Label>
                <Input placeholder="Beneficiary full name" />
              </div>

              <div className="space-y-2">
                <Label>Amount</Label>
                <Input type="number" placeholder="0.00" />
              </div>

              <div className="space-y-2">
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
                  onClick={() => {
                    setSeconds(59)
                    setOtpValues(Array(length).fill(""))
                    setShowOtp(true)
                  }}
                  className="w-full sm:w-auto bg-[#155E63] hover:bg-[#134e52] text-white px-8 py-5 rounded-xl"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <Card className="bg-white rounded-3xl shadow-2xl border p-4 sm:p-8 max-w-2xl w-full">

            <h2 className="text-xl sm:text-2xl font-semibold text-center text-[#155E63] mb-6 sm:mb-8">
              OTP Authentication
            </h2>

            <div className="bg-gray-50 border rounded-2xl p-4 sm:p-8">
              <p className="text-sm text-muted-foreground mb-6 sm:mb-8 text-center">
                Enter the 6-digit OTP sent to your registered EMAIL
              </p>

              <div className="flex justify-center mb-6">
                <div className="grid grid-cols-6 gap-2 sm:gap-4">
                  {otpValues.map((val, idx) => (
                    <Input
                      key={idx}
                      value={val}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      ref={(el) => { inputsRef.current[idx] = el }}
                      maxLength={1}
                      className="w-10 h-12 sm:w-14 sm:h-14 text-center text-base sm:text-lg rounded-xl"
                    />
                  ))}
                </div>
              </div>

              <p className="text-center text-sm text-muted-foreground mb-6">
                00:{seconds.toString().padStart(2, "0")}
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                <Button type="button" variant="outline" className="w-full sm:w-auto" onClick={() => setShowOtp(false)}>
                  Cancel
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full sm:w-auto"
                  onClick={handleResendOtp}
                >
                  Resend OTP
                </Button>

                <Button
                  type="button"
                  onClick={handleVerify}
                  className="w-full sm:w-auto bg-[#0B3E5A] hover:bg-[#0B3E5A]/80 text-white rounded-xl px-9 py-5"
                >
                  Verify
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* 🔹 SUCCESS MODAL */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">

          <Card className="bg-white rounded-3xl shadow-2xl border p-6 sm:p-10 max-w-2xl w-full text-center">

            <div className="flex justify-center mb-6 sm:mb-10">
              <div className="w-24 h-24 sm:w-36 sm:h-36 rounded-full bg-[#0B3E5A]/40 flex items-center justify-center">
                <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-[#0B3E5A] flex items-center justify-center shadow-lg">
                  <Check className="text-white w-10 h-10 sm:w-14 sm:h-14" />
                </div>
              </div>
            </div>

            <h2 className="text-2xl sm:text-4xl font-bold text-slate-800 mb-6 sm:mb-10">
              Transaction Successful
            </h2>

            <div className="bg-gray-50 rounded-3xl border p-4 sm:p-8 mb-6 sm:mb-8 text-left">
              <div className="flex justify-between items-center pb-4 border-b">
                <span className="text-gray-400 font-semibold tracking-widest text-sm">
                  CUSTOMER NAME
                </span>
                <span className="font-semibold text-slate-800">
                  Dineth
                </span>
              </div>

              <div className="flex justify-between items-center pt-4">
                <span className="text-gray-400 font-semibold tracking-widest text-sm">
                  GENERATED ID
                </span>
                <span className="font-semibold text-teal-600">
                  PC-8821092
                </span>
              </div>
            </div>

            <p className="text-[#399FD8] mb-6 sm:mb-10">
              Transaction has been done.
            </p>

            <Button
              type="button"
              className="w-full sm:w-auto bg-[#0B3E5A] hover:bg-[#0B3E5A]/80 text-white rounded-2xl px-10 sm:px-16 py-5 sm:py-6 text-base sm:text-lg font-semibold shadow-md"
              onClick={() => router.push("/bank-customer/transact")}
            >
              BACK TO DASHBOARD
            </Button>


          </Card>
        </div>
      )}

    </div>
  )
}
