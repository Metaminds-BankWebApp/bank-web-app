"use client"

import React, { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import ModuleHeader from "@/src/components/ui/module-header";
import { Check } from "lucide-react"
import { useRouter } from "next/navigation"


export default function Page() {
  const [showOtp, setShowOtp] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [accountNumber, setAccountNumber] = useState("")
  const [amount, setAmount] = useState("")
  const [beneficiary, setBeneficiary] = useState("")
  const [remark, setRemark] = useState("")
  const [expenseTrack, setExpenseTrack] = useState(false)
  const balance = 81000.0
  const [formErrors, setFormErrors] = useState({
    accountNumber: "",
    amount: "",
    beneficiary: "",
  remark: "",
  })

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

  const handleAccountNumberChange = (value: string) => {
  // accept only digits and limit to 10 characters
  const digitsOnly = value.replace(/\D/g, "").slice(0, 10)
  setAccountNumber(digitsOnly)
    if (formErrors.accountNumber) {
      setFormErrors((prev) => ({ ...prev, accountNumber: "" }))
    }
  }

  const handleAmountChange = (value: string) => {
    const sanitizedValue = value.replace(/[^0-9.]/g, "")
    if (!/^\d*\.?\d{0,2}$/.test(sanitizedValue)) return

    setAmount(sanitizedValue)
    if (formErrors.amount) {
      setFormErrors((prev) => ({ ...prev, amount: "" }))
    }
  }

  const handleBeneficiaryChange = (value: string) => {
    setBeneficiary(value)
    if (formErrors.beneficiary) {
      setFormErrors((prev) => ({ ...prev, beneficiary: "" }))
    }
  }

  const handleRemarkChange = (value: string) => {
    setRemark(value)
    if (formErrors.remark) {
      setFormErrors((prev) => ({ ...prev, remark: "" }))
    }
  }

  const validateTransferForm = () => {
    const nextErrors = {
      accountNumber: "",
      amount: "",
      beneficiary: "",
      remark: "",
    }

    if (!accountNumber) {
      nextErrors.accountNumber = "Account number is required."
    }

    if (!beneficiary || beneficiary.trim().length < 2) {
      nextErrors.beneficiary = "Beneficiary name is required."
    }

    if (!remark) {
      nextErrors.remark = "Remark is required."
    }

    const parsedAmount = Number.parseFloat(amount)

    if (!amount) {
      nextErrors.amount = "Amount is required."
    } else if (Number.isNaN(parsedAmount)) {
      nextErrors.amount = "Amount must be a valid number."
    } else if (parsedAmount < 1000) {
      nextErrors.amount = "Minimum transfer amount is LKR 1,000."
    } else if (parsedAmount > balance) {
      nextErrors.amount = "Amount exceeds available balance."
    }

  setFormErrors(nextErrors)
  return !nextErrors.accountNumber && !nextErrors.amount && !nextErrors.beneficiary && !nextErrors.remark
  }

  // (removed silent validator; button will be clickable and validation runs on submit)

  const handleTransfer = () => {
    const isValid = validateTransferForm()
    if (!isValid) return

    setSeconds(59)
    setOtpValues(Array(length).fill(""))
    setShowOtp(true)
  }

  return (
    <div className="relative min-h-full">

      {/* 🔹 BLUR MAIN PAGE WHEN MODAL OPEN */}
      <div className={showOtp || showSuccess ? "blur-sm pointer-events-none" : ""}>
        <div className="px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
          <ModuleHeader theme="transact" menuMode="feature-layout" role="Bank Customer" title="Transfer" name="John Deo" />

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
          <Card className="transact-card transact-card-hover transact-creditlens-shade creditlens-delay-1 mt-1 max-w-6xl mx-auto w-full rounded-xl p-4 sm:mt-10 sm:p-6 lg:p-8">
            <form className="space-y-9">
              <div className="space-y-2">
                <Label>Account Number</Label>
                <Input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="Enter 10-digit account number"
                  maxLength={10}
                  value={accountNumber}
                  onChange={(e) => handleAccountNumberChange(e.target.value)}
                  aria-invalid={Boolean(formErrors.accountNumber)}
                />
                {formErrors.accountNumber && (
                  <p className="text-sm text-red-500">{formErrors.accountNumber}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Beneficiary Name</Label>
                <Input
                  placeholder="Beneficiary full name"
                  value={beneficiary}
                  onChange={(e) => handleBeneficiaryChange(e.target.value)}
                  aria-invalid={Boolean(formErrors.beneficiary)}
                />
                {formErrors.beneficiary && (
                  <p className="text-sm text-red-500">{formErrors.beneficiary}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Amount</Label>
                <Input
                  type="text"
                  inputMode="decimal"
                  pattern="[0-9]*[.]?[0-9]*"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  aria-invalid={Boolean(formErrors.amount)}
                />
                <p className="text-sm text-muted-foreground">
                  Available Balance: LKR {balance.toFixed(2)}
                </p>
                {formErrors.amount && (
                  <p className="text-sm text-red-500">{formErrors.amount}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Remark</Label>
                <textarea
                id="remark"
                name="remark"
                placeholder="Add a note"
                value={remark}
                required
                onChange={(e) => setRemark(e.target.value)}
                className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none"
              />
                {formErrors.remark && (
                  <p className="text-sm text-red-500">{formErrors.remark}</p>
                )}
              </div>

              <div className="pt-1">
                <label className="inline-flex items-center space-x-2">
                  <Checkbox checked={expenseTrack} onChange={(e) => setExpenseTrack(Boolean((e.target as HTMLInputElement).checked))} />
                  <span>Expenses track</span>
                </label>
                {/* Note explaining expense tracking behavior */}
                <ul className="mt-2 ml-5 list-disc text-ash text-muted-foreground text-sm">
                  <ul>(If selected, the transaction is stored in the expense tracker; otherwise, it is treated as a standard payment.)
               </ul>
                </ul>
              </div>

              <div className="flex justify-end">
                <Button
                  type="button"
                  onClick={handleTransfer}
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
          <Card className="transact-card transact-creditlens-shade max-w-2xl w-full rounded-3xl p-4 shadow-[0_30px_70px_-36px_rgba(11,62,90,0.55)] sm:p-8">

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

          <Card className="transact-card transact-creditlens-shade max-w-2xl w-full rounded-3xl p-6 text-center shadow-[0_30px_70px_-36px_rgba(11,62,90,0.55)] sm:p-10">

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
