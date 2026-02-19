"use client"

import React, { useRef, useState } from "react"
import Link from "next/link"
import { AlertTriangle } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import TransactHeader from "@/src/components/ui/Transact-Header"

export default function Page() {
  const [showOtp, setShowOtp] = useState(false)
  const length = 6
  const [otpValues, setOtpValues] = useState<string[]>(Array(length).fill(""))
  const inputsRef = useRef<Array<HTMLInputElement | null>>([])

  const handleOtpChange = (index: number, val: string) => {
    if (!/^[0-9]*$/.test(val)) return
    const next = [...otpValues]
    next[index] = val.slice(-1)
    setOtpValues(next)
    if (val && index < length - 1) inputsRef.current[index + 1]?.focus()
  }

  const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    const key = e.key
    if (key === "Backspace") {
      if (otpValues[index]) {
        const next = [...otpValues]
        next[index] = ""
        setOtpValues(next)
      } else if (index > 0) {
        inputsRef.current[index - 1]?.focus()
      }
    }
    if (key === "ArrowLeft" && index > 0) inputsRef.current[index - 1]?.focus()
    if (key === "ArrowRight" && index < length - 1) inputsRef.current[index + 1]?.focus()
  }

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const paste = e.clipboardData.getData("text").trim().slice(0, length)
    if (!/^[0-9]+$/.test(paste)) return
    const next = Array.from({ length }, (_, i) => paste[i] ?? "")
    setOtpValues(next)
    const last = Math.min(paste.length - 1, length - 1)
    if (last >= 0) inputsRef.current[last]?.focus()
  }

  const otpString = otpValues.join("")

  return (
    <div className=" px-4 py-6 sm:px-6 lg:px-8">
      
      <div>
        <TransactHeader title="Transfer" subtitle="Bank transfer" />
        <div className="flex float-right mt-20 mb-8 max-w-6xl mx-auto pr-[7rem]">


          <Link
            href="/bank-customer/transact/beneficiary"
            className="text-[#155E63] font-medium hover:underline"
            
          >
            + Add Beneficiary
          </Link>
        </div>

        <Card className="rounded-xl shadow-sm p-8 max-w-6xl mx-auto w-full mt-[8rem]">
          <form className="space-y-6">
            <div className="space-y-1">
              <Label htmlFor="accountNumber">Account Number</Label>
              <Input
                id="accountNumber"
                name="accountNumber"
                type="text"
                placeholder="Enter account number"
                className="w-full"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="beneficiaryName">Beneficiary Name</Label>
              <Input
                id="beneficiaryName"
                name="beneficiaryName"
                type="text"
                placeholder="Beneficiary full name"
                className="w-full"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                placeholder="0.00"
                className="w-full"
              />
              <div className="flex justify-end mt-2 text-sm text-destructive items-center space-x-2">
                <AlertTriangle className="w-4 h-4" aria-hidden />
                <span>Minimum Transfer is 1000.00</span>
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="remark">Remark</Label>
              <Input
                id="remark"
                name="remark"
                type="text"
                placeholder="Add a note (optional)"
                className="w-full"
              />

              
            </div>

            <div className="pt-2">
              <label className="inline-flex items-center space-x-2">
                <Checkbox id="expensesTrack" name="expensesTrack" />
                <span className="select-none">Expenses track</span>
              </label>
            </div>

            <div className="flex justify-end">
              <Button type="button" size="lg" variant="primary" 
              className="bg-[#155E63] hover:bg-[#134e52] text-white px-8 py-6 rounded-xl"
              onClick={() => setShowOtp(true)}
              >
                Transfer Amount
              </Button>
            </div>
          </form>
        </Card>

        {showOtp && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <Card className="bg-white rounded-2xl shadow-xl border p-10 max-w-xl w-full">
              <div className="flex justify-end">
                <button
                  aria-label="Close"
                  onClick={() => setShowOtp(false)}
                  className="text-sm text-muted-foreground hover:underline"
                >
                  Cancel
                </button>
              </div>

              <h2 className="text-2xl font-semibold text-[#155E63] text-center mb-6">
                OTP Authentication
              </h2>

              <p className="text-sm text-muted-foreground text-center mb-8">
                Enter the 6-digit OTP sent to your registered number
              </p>

              <div className="flex justify-center">
                <div className="grid grid-cols-6 gap-4" onPaste={handleOtpPaste} role="group" aria-label="OTP inputs">
                  {otpValues.map((val, idx) => (
                    <Input
                      key={idx}
                      value={val}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleOtpKeyDown(e, idx)}
                      ref={(el: HTMLInputElement | null) => { inputsRef.current[idx] = el }}
                      inputMode="numeric"
                      pattern="\d*"
                      className="w-14 h-14 text-center text-lg rounded-lg border focus:border-[#155E63] focus:ring-2 focus:ring-[#155E63]/20"
                      aria-label={`OTP digit ${idx + 1}`}
                      maxLength={1}
                    />
                  ))}
                </div>
              </div>

              <div className="flex justify-center">
                <Button
                  type="button"
                  size="lg"
                  className="bg-[#155E63] hover:bg-[#134e52] text-white rounded-xl w-52 mt-8"
                  onClick={() => setShowOtp(false)}
                >
                  Verify
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

