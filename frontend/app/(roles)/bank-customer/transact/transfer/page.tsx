"use client"

import React, { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Check } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import ModuleHeader from "@/src/components/ui/module-header"
import { authService } from "@/src/api/auth/auth.service"
import { transactionService } from "@/src/api/transact/transaction.service"
import { ApiError } from "@/src/types/api-error"
import type { TransactionResponse } from "@/src/types/dto/transact.dto"

type TransferFormErrors = {
  accountNumber: string
  amount: string
  beneficiary: string
  remark: string
}

const OTP_LENGTH = 6

export default function Page() {
  const router = useRouter()
  const inputsRef = useRef<Array<HTMLInputElement | null>>([])

  const [showOtp, setShowOtp] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [accountNumber, setAccountNumber] = useState("")
  const [amount, setAmount] = useState("")
  const [beneficiary, setBeneficiary] = useState("")
  const [remark, setRemark] = useState("")
  const [expenseTrack, setExpenseTrack] = useState(false)
  const [formErrors, setFormErrors] = useState<TransferFormErrors>({
    accountNumber: "",
    amount: "",
    beneficiary: "",
    remark: "",
  })
  const [submitError, setSubmitError] = useState("")

  const [otpValues, setOtpValues] = useState<string[]>(Array(OTP_LENGTH).fill(""))
  const [otpError, setOtpError] = useState("")
  const [seconds, setSeconds] = useState(59)
  const [transactionReferenceNo, setTransactionReferenceNo] = useState("")
  const [otpSentToEmail, setOtpSentToEmail] = useState("")
  const [verifiedTransaction, setVerifiedTransaction] = useState<TransactionResponse | null>(null)

  const [isSubmittingTransfer, setIsSubmittingTransfer] = useState(false)
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false)
  const [isResendingOtp, setIsResendingOtp] = useState(false)

  useEffect(() => {
    if (!showOtp || seconds <= 0) {
      return
    }
    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [seconds, showOtp])

  const handleOtpChange = (index: number, value: string) => {
    if (!/^[0-9]*$/.test(value)) {
      return
    }
    const next = [...otpValues]
    next[index] = value.slice(-1)
    setOtpValues(next)
    setOtpError("")

    if (value && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus()
    }
  }

  const handleAccountNumberChange = (value: string) => {
    const digitsOnly = value.replace(/\D/g, "").slice(0, 10)
    setAccountNumber(digitsOnly)
    if (formErrors.accountNumber) {
      setFormErrors((prev) => ({ ...prev, accountNumber: "" }))
    }
    if (submitError) {
      setSubmitError("")
    }
  }

  const handleAmountChange = (value: string) => {
    const sanitized = value.replace(/[^0-9.]/g, "")
    if (!/^\d*\.?\d{0,2}$/.test(sanitized)) {
      return
    }
    setAmount(sanitized)
    if (formErrors.amount) {
      setFormErrors((prev) => ({ ...prev, amount: "" }))
    }
    if (submitError) {
      setSubmitError("")
    }
  }

  const handleBeneficiaryChange = (value: string) => {
    setBeneficiary(value)
    if (formErrors.beneficiary) {
      setFormErrors((prev) => ({ ...prev, beneficiary: "" }))
    }
    if (submitError) {
      setSubmitError("")
    }
  }

  const handleRemarkChange = (value: string) => {
    setRemark(value)
    if (formErrors.remark) {
      setFormErrors((prev) => ({ ...prev, remark: "" }))
    }
    if (submitError) {
      setSubmitError("")
    }
  }

  const validateTransferForm = (): boolean => {
    const nextErrors: TransferFormErrors = {
      accountNumber: "",
      amount: "",
      beneficiary: "",
      remark: "",
    }

    if (!accountNumber.trim()) {
      nextErrors.accountNumber = "Account number is required."
    } else if (!/^\d{10}$/.test(accountNumber.trim())) {
      nextErrors.accountNumber = "Account number must contain exactly 10 digits."
    }

    if (!beneficiary.trim()) {
      nextErrors.beneficiary = "Beneficiary name is required."
    } else if (beneficiary.trim().length > 150) {
      nextErrors.beneficiary = "Beneficiary name must not exceed 150 characters."
    }

    if (!remark.trim()) {
      nextErrors.remark = "Remark is required."
    } else if (remark.trim().length > 255) {
      nextErrors.remark = "Remark must not exceed 255 characters."
    }

    const parsedAmount = Number.parseFloat(amount)
    if (!amount.trim()) {
      nextErrors.amount = "Amount is required."
    } else if (Number.isNaN(parsedAmount)) {
      nextErrors.amount = "Amount must be a valid number."
    } else if (parsedAmount <= 0) {
      nextErrors.amount = "Amount must be greater than 0."
    }

    setFormErrors(nextErrors)
    return !nextErrors.accountNumber && !nextErrors.amount && !nextErrors.beneficiary && !nextErrors.remark
  }

  const handleTransfer = async () => {
    if (isSubmittingTransfer) {
      return
    }

    setSubmitError("")
    const isValid = validateTransferForm()
    if (!isValid) {
      return
    }

    setIsSubmittingTransfer(true)
    try {
      const me = await authService.me()
      if (String(me.roleName).toUpperCase() !== "BANK_CUSTOMER" || !me.bankCustomerId) {
        setSubmitError("Only logged-in bank customers can perform transfers.")
        return
      }

      const response = await transactionService.initiateTransaction({
        receiverAccountNo: accountNumber.trim(),
        receiverName: beneficiary.trim(),
        amount: Number.parseFloat(amount),
        remark: remark.trim(),
        expenseTrackingEnabled: expenseTrack,
      })

      setTransactionReferenceNo(response.referenceNo)
      setOtpSentToEmail(response.sentToEmail)
      setOtpValues(Array(OTP_LENGTH).fill(""))
      setOtpError("")
      setSeconds(59)
      setShowOtp(true)
    } catch (error) {
      const nextErrors: Partial<TransferFormErrors> = {}
      let message = "Unable to initiate transfer. Please try again."

      if (error instanceof ApiError) {
        message = error.message || message
        const details = (error.details ?? {}) as {
          fieldErrors?: Record<string, unknown>
        }
        const fieldErrors = details.fieldErrors
        if (fieldErrors) {
          if (typeof fieldErrors.receiverAccountNo === "string") {
            nextErrors.accountNumber = fieldErrors.receiverAccountNo
          }
          if (typeof fieldErrors.receiverName === "string") {
            nextErrors.beneficiary = fieldErrors.receiverName
          }
          if (typeof fieldErrors.amount === "string") {
            nextErrors.amount = fieldErrors.amount
          }
          if (typeof fieldErrors.remark === "string") {
            nextErrors.remark = fieldErrors.remark
          }
        }

        if (!nextErrors.accountNumber && message === "Account number is invalid") {
          nextErrors.accountNumber = message
        }
      } else if (error instanceof Error && error.message) {
        message = error.message
      }

      setFormErrors((prev) => ({ ...prev, ...nextErrors }))
      setSubmitError(message)
    } finally {
      setIsSubmittingTransfer(false)
    }
  }

  const handleVerify = async () => {
    if (isVerifyingOtp) {
      return
    }

    const otpCode = otpValues.join("").trim()
    if (otpCode.length !== OTP_LENGTH) {
      setOtpError("Please enter the 6-digit OTP.")
      return
    }
    if (!transactionReferenceNo) {
      setOtpError("Transaction reference is missing. Please retry transfer.")
      return
    }

    setIsVerifyingOtp(true)
    setOtpError("")

    try {
      const transaction = await transactionService.verifyTransactionOtp({
        referenceNo: transactionReferenceNo,
        otpCode,
      })

      setVerifiedTransaction(transaction)
      setShowOtp(false)
      setShowSuccess(true)
    } catch (error) {
      if (error instanceof ApiError) {
        setOtpError(error.message || "OTP verification failed.")
      } else if (error instanceof Error && error.message) {
        setOtpError(error.message)
      } else {
        setOtpError("OTP verification failed.")
      }
    } finally {
      setIsVerifyingOtp(false)
    }
  }

  const handleResendOtp = async () => {
    if (isResendingOtp || seconds > 0) {
      return
    }
    if (!transactionReferenceNo) {
      setOtpError("Transaction reference is missing. Please retry transfer.")
      return
    }

    setIsResendingOtp(true)
    setOtpError("")
    try {
      const response = await transactionService.resendTransactionOtp({
        referenceNo: transactionReferenceNo,
      })
      setOtpSentToEmail(response.sentToEmail)
      setSeconds(59)
      setOtpValues(Array(OTP_LENGTH).fill(""))
      inputsRef.current[0]?.focus()
    } catch (error) {
      if (error instanceof ApiError) {
        setOtpError(error.message || "Failed to resend OTP.")
      } else if (error instanceof Error && error.message) {
        setOtpError(error.message)
      } else {
        setOtpError("Failed to resend OTP.")
      }
    } finally {
      setIsResendingOtp(false)
    }
  }

  const isFormValid = useMemo(() => {
    const parsedAmount = Number.parseFloat(amount || "0")
    return (
      /^\d{10}$/.test(accountNumber.trim()) &&
      beneficiary.trim().length > 0 &&
      remark.trim().length > 0 &&
      !Number.isNaN(parsedAmount) &&
      parsedAmount > 0
    )
  }, [accountNumber, beneficiary, remark, amount])

  return (
    <div className="relative min-h-full">
      <div className={showOtp || showSuccess ? "blur-sm pointer-events-none" : ""}>
        <div className="px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
          <ModuleHeader theme="transact" menuMode="feature-layout" role="Bank Customer" title="Transfer" name="John Deo" />

          <div className="flex justify-end mt-14 pr-[7rem]">
            <Link
              href="/bank-customer/transact/beneficiary"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#e6f4f6] text-[#155E63] rounded-full font-medium hover:bg-[#d1ecef] transition-all duration-200"
            >
              + Add Beneficiary
            </Link>
          </div>

          <Card className="transact-card transact-card-hover bg-white creditlens-delay-1 max-w-6xl mx-auto w-full rounded-xl p-4 sm:mt-8 sm:p-6 lg:p-8">
            <form className="space-y-9" onSubmit={(event) => event.preventDefault()} noValidate>
              {submitError && (
                <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                  {submitError}
                </div>
              )}

              <div className="space-y-2">
                <Label>Account Number</Label>
                <Input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="Enter 10-digit account number"
                  maxLength={10}
                  value={accountNumber}
                  onChange={(event) => handleAccountNumberChange(event.target.value)}
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
                  onChange={(event) => handleBeneficiaryChange(event.target.value)}
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
                  placeholder="LKR 0.00"
                  value={amount}
                  onChange={(event) => handleAmountChange(event.target.value)}
                  aria-invalid={Boolean(formErrors.amount)}
                />
                {formErrors.amount && (
                  <p className="text-sm text-red-500">{formErrors.amount}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Remark</Label>
                <textarea
                  id="remark"
                  name="remark"
                  placeholder="Add a note or invoice reference"
                  value={remark}
                  required
                  onChange={(event) => handleRemarkChange(event.target.value)}
                  className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none"
                />
                {formErrors.remark && (
                  <p className="text-sm text-red-500">{formErrors.remark}</p>
                )}
              </div>

              <div className="pt-1">
                <label className="inline-flex items-center space-x-2">
                  <Checkbox
                    checked={expenseTrack}
                    onChange={(event) => setExpenseTrack(Boolean((event.target as HTMLInputElement).checked))}
                  />
                  <span>Expense tracking</span>
                </label>
                <p className="mt-2 ml-1 text-sm text-muted-foreground">
                  If selected, this transaction will be saved to your expense tracker for reporting.
                </p>
              </div>

              <div className="flex justify-end">
                <Button
                  type="button"
                  onClick={handleTransfer}
                  disabled={!isFormValid || isSubmittingTransfer}
                  className={`w-full sm:w-auto ${!isFormValid || isSubmittingTransfer ? "bg-[#155E63]/60 cursor-not-allowed opacity-70" : "bg-[#155E63] hover:bg-[#134e52]"} text-white px-8 py-5 rounded-xl`}
                >
                  {isSubmittingTransfer ? "Transferring..." : "Transfer Amount"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>

      {showOtp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <Card className="transact-card bg-white max-w-2xl w-full rounded-3xl p-4 shadow-[0_30px_70px_-36px_rgba(11,62,90,0.55)] sm:p-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-center text-[#155E63] mb-6 sm:mb-8">
              OTP Authentication
            </h2>

            <div className="bg-gray-50 border rounded-2xl p-4 sm:p-8">
              <p className="text-sm text-muted-foreground mb-6 sm:mb-8 text-center">
                Enter the 6-digit OTP sent to {otpSentToEmail || "your registered EMAIL"}
              </p>

              <div className="flex justify-center mb-6">
                <div className="grid grid-cols-6 gap-2 sm:gap-4">
                  {otpValues.map((value, idx) => (
                    <Input
                      key={idx}
                      value={value}
                      onChange={(event) => handleOtpChange(idx, event.target.value)}
                      ref={(element) => {
                        inputsRef.current[idx] = element
                      }}
                      maxLength={1}
                      className="w-10 h-12 sm:w-14 sm:h-14 text-center text-base sm:text-lg rounded-xl"
                    />
                  ))}
                </div>
              </div>

              <p className="text-center text-sm text-muted-foreground mb-2">
                00:{seconds.toString().padStart(2, "0")}
              </p>
              {otpError && (
                <p className="text-center text-sm text-red-600 mb-4">{otpError}</p>
              )}

              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full sm:w-auto"
                  onClick={() => {
                    setShowOtp(false)
                    setOtpError("")
                  }}
                >
                  Cancel
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full sm:w-auto"
                  onClick={handleResendOtp}
                  disabled={isResendingOtp || seconds > 0}
                >
                  {isResendingOtp ? "Resending..." : "Resend OTP"}
                </Button>

                <Button
                  type="button"
                  onClick={handleVerify}
                  disabled={isVerifyingOtp}
                  className="w-full sm:w-auto bg-[#0B3E5A] hover:bg-[#0B3E5A]/80 text-white rounded-xl px-9 py-5"
                >
                  {isVerifyingOtp ? "Verifying..." : "Verify"}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <Card className="transact-card bg-white max-w-2xl w-full rounded-3xl p-6 text-center shadow-[0_30px_70px_-36px_rgba(11,62,90,0.55)] sm:p-10">
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
                  BENEFICIARY NAME
                </span>
                <span className="font-semibold text-slate-800">
                  {verifiedTransaction?.receiverName || beneficiary.trim()}
                </span>
              </div>

              <div className="flex justify-between items-center pt-4">
                <span className="text-gray-400 font-semibold tracking-widest text-sm">
                  REFERENCE NO
                </span>
                <span className="font-semibold text-teal-600">
                  {verifiedTransaction?.referenceNo || transactionReferenceNo}
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
