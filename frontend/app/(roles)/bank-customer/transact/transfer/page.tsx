"use client"

import React, { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Check, Download, LayoutDashboard } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import ModuleHeader from "@/src/components/ui/module-header"
import { authService } from "@/src/api/auth/auth.service"
import { beneficiaryService } from "@/src/api/transact/beneficiary.service"
import { transactionService } from "@/src/api/transact/transaction.service"
import { getSpendIqCategories } from "@/src/api/spendiq/spendiq.service"
import { ApiError } from "@/src/types/api-error"
import type { BeneficiaryResponse, TransactionResponse } from "@/src/types/dto/transact.dto"
import type { SpendIqCategoryResponse } from "@/src/types/dto/spendiq.dto"

type TransferFormErrors = {
  accountNumber: string
  amount: string
  beneficiary: string
  remark: string
  expenseCategory: string
}

const OTP_LENGTH = 6
const MAX_OTP_ATTEMPTS = 3

function secondsUntilOtpExpiry(expiresAt: string): number {
  const expiryTime = new Date(expiresAt).getTime()
  if (Number.isNaN(expiryTime)) return 0
  return Math.max(0, Math.ceil((expiryTime - Date.now()) / 1000))
}

function formatOtpCountdown(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
}

export default function Page() {
  // Router handles post-transaction navigation.
  const router = useRouter()
  // Stores refs for each OTP input so focus can move automatically.
  const inputsRef = useRef<Array<HTMLInputElement | null>>([])

  // Core transfer form states.
  const [showOtp, setShowOtp] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showBeneficiaryPicker, setShowBeneficiaryPicker] = useState(false)
  const [accountNumber, setAccountNumber] = useState("")
  const [amount, setAmount] = useState("")
  const [beneficiary, setBeneficiary] = useState("")
  const [remark, setRemark] = useState("")
  const [expenseTrack, setExpenseTrack] = useState(false)
  const [expenseCategoryName, setExpenseCategoryName] = useState("")
  const [expenseCategories, setExpenseCategories] = useState<SpendIqCategoryResponse[]>([])
  const [isLoadingExpenseCategories, setIsLoadingExpenseCategories] = useState(false)
  const [expenseCategoryLoadError, setExpenseCategoryLoadError] = useState("")
  const [formErrors, setFormErrors] = useState<TransferFormErrors>({
    accountNumber: "",
    amount: "",
    beneficiary: "",
    remark: "",
    expenseCategory: "",
  })
  const [submitError, setSubmitError] = useState("")

  // OTP verification states.
  const [otpValues, setOtpValues] = useState<string[]>(Array(OTP_LENGTH).fill(""))
  const [otpError, setOtpError] = useState("")
  const [seconds, setSeconds] = useState(0)
  const [otpAttemptsRemaining, setOtpAttemptsRemaining] = useState(MAX_OTP_ATTEMPTS)
  const [transactionReferenceNo, setTransactionReferenceNo] = useState("")
  const [otpSentToEmail, setOtpSentToEmail] = useState("")
  const [verifiedTransaction, setVerifiedTransaction] = useState<TransactionResponse | null>(null)
  const [savedBeneficiaries, setSavedBeneficiaries] = useState<BeneficiaryResponse[]>([])
  const [beneficiaryLoadError, setBeneficiaryLoadError] = useState("")

  // Loading states for transfer and OTP actions.
  const [isSubmittingTransfer, setIsSubmittingTransfer] = useState(false)
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false)
  const [isCancellingTransaction, setIsCancellingTransaction] = useState(false)
  const [isLoadingBeneficiaries, setIsLoadingBeneficiaries] = useState(false)
  const [isDownloadingReceipt, setIsDownloadingReceipt] = useState(false)
  const [receiptError, setReceiptError] = useState("")

  // Runs the OTP countdown timer while the OTP modal is open.
  useEffect(() => {
    if (!showOtp || seconds <= 0) {
      return
    }
    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [seconds, showOtp])

  // Loads the customer's SpendIQ categories only when expense tracking is selected.
  useEffect(() => {
    if (!expenseTrack) {
      setExpenseCategoryName("")
      setExpenseCategoryLoadError("")
      return
    }

    let cancelled = false
    const loadExpenseCategories = async () => {
      setIsLoadingExpenseCategories(true)
      setExpenseCategoryLoadError("")
      try {
        const categories = await getSpendIqCategories()
        if (!cancelled) {
          setExpenseCategories(categories)
        }
      } catch (error) {
        const message = error instanceof ApiError
          ? error.message
          : error instanceof Error
            ? error.message
            : "Unable to load expense categories."
        if (!cancelled) {
          setExpenseCategoryLoadError(message || "Unable to load expense categories.")
        }
      } finally {
        if (!cancelled) {
          setIsLoadingExpenseCategories(false)
        }
      }
    }

    void loadExpenseCategories()
    return () => {
      cancelled = true
    }
  }, [expenseTrack])

  // Accepts only single numeric OTP characters and advances focus to next input.
  const handleOtpChange = (index: number, value: string) => {
    if (seconds <= 0 || otpAttemptsRemaining <= 0) {
      return
    }
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

  // Keeps account number numeric-only and clears related errors as user types.
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

  // Sanitizes amount input to decimal format with up to 2 fraction digits.
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

  // Updates beneficiary name and clears beneficiary-related error state.
  const handleBeneficiaryChange = (value: string) => {
    setBeneficiary(value)
    if (formErrors.beneficiary) {
      setFormErrors((prev) => ({ ...prev, beneficiary: "" }))
    }
    if (submitError) {
      setSubmitError("")
    }
  }

  // Updates remark text and clears remark-related error state.
  const handleRemarkChange = (value: string) => {
    setRemark(value)
    if (formErrors.remark) {
      setFormErrors((prev) => ({ ...prev, remark: "" }))
    }
    if (submitError) {
      setSubmitError("")
    }
  }

  // Enables expense tracking and resets category validation when it is disabled.
  const handleExpenseTrackingChange = (checked: boolean) => {
    setExpenseTrack(checked)
    if (!checked) {
      setExpenseCategoryName("")
    }
    setFormErrors((prev) => ({ ...prev, expenseCategory: "" }))
    if (submitError) {
      setSubmitError("")
    }
  }

  // Stores the category name that will be persisted with the transfer request.
  const handleExpenseCategoryChange = (value: string) => {
    setExpenseCategoryName(value)
    if (formErrors.expenseCategory) {
      setFormErrors((prev) => ({ ...prev, expenseCategory: "" }))
    }
    if (submitError) {
      setSubmitError("")
    }
  }

  // Loads saved recipients into the selection dialog.
  const handleOpenBeneficiaryPicker = async () => {
    setShowBeneficiaryPicker(true)
    setIsLoadingBeneficiaries(true)
    setBeneficiaryLoadError("")

    try {
      const beneficiaries = await beneficiaryService.getBeneficiaries()
      setSavedBeneficiaries(beneficiaries)
    } catch (error) {
      const message = error instanceof ApiError
        ? error.message
        : error instanceof Error
          ? error.message
          : "Unable to load saved beneficiaries."
      setBeneficiaryLoadError(message || "Unable to load saved beneficiaries.")
    } finally {
      setIsLoadingBeneficiaries(false)
    }
  }

  // Fills recipient fields from one saved beneficiary and returns to the transfer form.
  const handleSelectBeneficiary = (savedBeneficiary: BeneficiaryResponse) => {
    const selectedAccountNumber = savedBeneficiary.beneficiaryAccountNo.replace(/\D/g, "").slice(0, 10)
    const selectedName = savedBeneficiary.accountHolderName.trim() || savedBeneficiary.nickName.trim()

    setAccountNumber(selectedAccountNumber)
    setBeneficiary(selectedName)
    setFormErrors((prev) => ({ ...prev, accountNumber: "", beneficiary: "" }))
    setSubmitError("")
    setShowBeneficiaryPicker(false)
  }

  // Validates transfer form inputs and sets first relevant error for quick feedback.
  const validateTransferForm = (): boolean => {
    const nextErrors: TransferFormErrors = {
      accountNumber: "",
      amount: "",
      beneficiary: "",
      remark: "",
      expenseCategory: "",
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

    if (expenseTrack && !expenseCategoryName.trim()) {
      nextErrors.expenseCategory = "Select an expense category."
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
    const hasErrors = Boolean(nextErrors.accountNumber || nextErrors.amount || nextErrors.beneficiary || nextErrors.remark || nextErrors.expenseCategory)
    if (hasErrors) {
      const firstError = nextErrors.accountNumber || nextErrors.beneficiary || nextErrors.amount || nextErrors.remark || nextErrors.expenseCategory
      setSubmitError(firstError)
    }

    return !hasErrors
  }

  // Initiates transfer request, opens OTP modal on success, and maps API field errors.
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
        expenseCategoryName: expenseTrack ? expenseCategoryName : undefined,
      })

      setTransactionReferenceNo(response.referenceNo)
      setOtpSentToEmail(response.sentToEmail)
      setOtpValues(Array(OTP_LENGTH).fill(""))
      setOtpError("")
      setOtpAttemptsRemaining(response.otpAttemptsRemaining ?? MAX_OTP_ATTEMPTS)
      setSeconds(secondsUntilOtpExpiry(response.otpExpiresAt))
      if ((response.status ?? "").trim().toUpperCase() === "FAILED") {
        setSubmitError(response.message || "OTP could not be delivered. Transaction failed.")
        return
      }

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
          if (typeof fieldErrors.expenseCategoryName === "string") {
            nextErrors.expenseCategory = fieldErrors.expenseCategoryName
          }
        }

        if (!nextErrors.accountNumber && message === "Account number is invalid") {
          nextErrors.accountNumber = message
        }
      } else if (error instanceof Error && error.message) {
        message = error.message
      }

      setFormErrors((prev) => ({ ...prev, ...nextErrors }))
      const firstFieldError = nextErrors.accountNumber || nextErrors.beneficiary || nextErrors.amount || nextErrors.remark || nextErrors.expenseCategory
      setSubmitError(firstFieldError || message)
    } finally {
      setIsSubmittingTransfer(false)
    }
  }

  // Verifies entered OTP against the transaction reference and opens success modal.
  const handleVerify = async () => {
    if (isVerifyingOtp) {
      return
    }

    const otpCode = otpValues.join("").trim()
    if (seconds <= 0) {
      setOtpError("OTP time has expired. This transaction has failed.")
      return
    }
    if (otpAttemptsRemaining <= 0) {
      setOtpError("Maximum of 3 OTP attempts reached. This transaction has failed.")
      return
    }
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
        const message = error.message || "OTP verification failed."
        if (/maximum of 3 otp attempts/i.test(message)) {
          setOtpAttemptsRemaining(0)
          setOtpValues(Array(OTP_LENGTH).fill(""))
        } else {
          const remainingMatch = message.match(/(\d+) attempt\(s\) remaining/i)
          if (remainingMatch) {
            setOtpAttemptsRemaining(Number(remainingMatch[1]))
          }
        }
        setOtpError(message)
      } else if (error instanceof Error && error.message) {
        setOtpError(error.message)
      } else {
        setOtpError("OTP verification failed.")
      }
    } finally {
      setIsVerifyingOtp(false)
    }
  }

  // Cancels an unverified transfer so its persisted status is CANCELLED.
  const handleCancelTransaction = async () => {
    if (isCancellingTransaction || !transactionReferenceNo) {
      return
    }

    setIsCancellingTransaction(true)
    setOtpError("")
    try {
      await transactionService.cancelTransaction(transactionReferenceNo)
      setShowOtp(false)
      setOtpValues(Array(OTP_LENGTH).fill(""))
      router.push("/bank-customer/transact")
    } catch (error) {
      const message = error instanceof ApiError
        ? error.message
        : error instanceof Error
          ? error.message
          : "Unable to cancel this transfer."
      const cancellationError = message || "Unable to cancel this transfer."
      setOtpError(cancellationError)
      if (/only transactions awaiting otp verification can be cancelled/i.test(cancellationError)) {
        window.setTimeout(() => router.push("/bank-customer/transact"), 1500)
      }
    } finally {
      setIsCancellingTransaction(false)
    }
  }

  // Downloads the receipt PDF generated from the saved successful transaction.
  const handleDownloadReceipt = async () => {
    const referenceNo = verifiedTransaction?.referenceNo || transactionReferenceNo
    if (!referenceNo || isDownloadingReceipt) {
      return
    }

    setIsDownloadingReceipt(true)
    setReceiptError("")
    try {
      const receipt = await transactionService.downloadTransactionReceipt(referenceNo)
      const downloadUrl = URL.createObjectURL(receipt)
      const link = document.createElement("a")
      link.href = downloadUrl
      link.download = `transaction-receipt-${referenceNo}.pdf`
      document.body.appendChild(link)
      link.click()
      link.remove()
      URL.revokeObjectURL(downloadUrl)
    } catch (error) {
      const message = error instanceof ApiError
        ? error.message
        : error instanceof Error
          ? error.message
          : "Unable to download the transaction receipt."
      setReceiptError(message || "Unable to download the transaction receipt.")
    } finally {
      setIsDownloadingReceipt(false)
    }
  }

  // Computes whether required fields are valid to enable transfer button.
  const isFormValid = useMemo(() => {
    const parsedAmount = Number.parseFloat(amount || "0")
    return (
      /^\d{10}$/.test(accountNumber.trim()) &&
      beneficiary.trim().length > 0 &&
      remark.trim().length > 0 &&
      !Number.isNaN(parsedAmount) &&
      parsedAmount > 0 &&
      (!expenseTrack || expenseCategoryName.trim().length > 0)
    )
  }, [accountNumber, beneficiary, remark, amount, expenseTrack, expenseCategoryName])

  return (
    <div className="relative min-h-full">
      {/* Main page content gets blurred when OTP/success modal is displayed. */}
      <div className={showOtp || showSuccess || showBeneficiaryPicker ? "blur-sm pointer-events-none" : ""}>
        <div className="px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
          <ModuleHeader theme="transact" menuMode="feature-layout" role="Bank Customer" title="Transfer" name="John Deo" />

          <div className="flex flex-wrap justify-end gap-3 mt-4 pr-[7rem]">
            <Button
              type="button"
              onClick={handleOpenBeneficiaryPicker}
              className="inline-flex h-[52px] items-center justify-center rounded-full border border-cyan-200 bg-cyan-50 px-9 text-[#0e4f62] transition-all duration-200 hover:border-cyan-300 hover:bg-cyan-100"
            >
              Select Beneficiary
            </Button>
            <Link
              href="/bank-customer/transact/beneficiary"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#061e3d] text-[#ffffff] rounded-full font-medium hover:bg-[#0a3046] transition-all duration-200"
            >
              + Add Beneficiary
            </Link>
          </div>

          <Card className="transact-card transact-card-hover bg-white creditlens-delay-1 max-w-6xl mx-auto w-full rounded-xl p-4 sm:mt-8 sm:p-6 lg:p-8">
            {/* Transfer form with inline validation and submission state. */}
            <form className="space-y-9" onSubmit={(event) => event.preventDefault()} noValidate>
              {submitError && (
                <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                  {submitError}
                </div>
              )}

              <div className="space-y-2">
                <Label>Account Number <span className="text-red-500">*</span></Label>
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
              </div>

              <div className="space-y-2">
                <Label>Beneficiary Name <span className="text-red-500">*</span></Label>
                <Input
                  placeholder="Beneficiary full name"
                  value={beneficiary}
                  onChange={(event) => handleBeneficiaryChange(event.target.value)}
                  aria-invalid={Boolean(formErrors.beneficiary)}
                />
              </div>

              <div className="space-y-2">
                <Label>Amount <span className="text-red-500">*</span></Label>
                <Input
                  type="text"
                  inputMode="decimal"
                  pattern="[0-9]*[.]?[0-9]*"
                  placeholder="LKR 0.00"
                  value={amount}
                  onChange={(event) => handleAmountChange(event.target.value)}
                  aria-invalid={Boolean(formErrors.amount)}
                />
              </div>

              <div className="space-y-2">
                <Label>Remark <span className="text-red-500">*</span></Label>
                <textarea
                  id="remark"
                  name="remark"
                  placeholder="Add a note or invoice reference"
                  value={remark}
                  required
                  onChange={(event) => handleRemarkChange(event.target.value)}
                  className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none"
                />
              </div>

              <div className="pt-1">
                <label className="inline-flex items-center space-x-2">
                  <Checkbox
                    checked={expenseTrack}
                    onChange={(event) => handleExpenseTrackingChange(Boolean((event.target as HTMLInputElement).checked))}
                  />
                  <span>Expense tracking</span>
                </label>
                <p className="mt-2 ml-1 text-sm text-muted-foreground">
                  If selected, this transaction will be saved to your expense tracker for reporting.
                </p>
              </div>

              {expenseTrack && (
                <div className="space-y-2">
                  <Label>Expense Category</Label>
                  <Select value={expenseCategoryName} onValueChange={handleExpenseCategoryChange}>
                    <SelectTrigger
                      disabled={isLoadingExpenseCategories}
                      className={formErrors.expenseCategory ? "border-red-500 focus:ring-red-200" : undefined}
                      aria-invalid={Boolean(formErrors.expenseCategory)}
                    >
                      <SelectValue placeholder={isLoadingExpenseCategories ? "Loading categories..." : "Select an expense category"} />
                    </SelectTrigger>
                    <SelectContent>
                      {expenseCategories
                        .filter((category) => category.categoryName.toLowerCase() !== "other")
                        .map((category) => (
                          <SelectItem key={category.categoryId} value={category.categoryName}>
                            {category.categoryName}
                          </SelectItem>
                        ))}
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {formErrors.expenseCategory && <p className="text-sm text-red-600">{formErrors.expenseCategory}</p>}
                  {expenseCategoryLoadError && <p className="text-sm text-red-600">{expenseCategoryLoadError}</p>}
                </div>
              )}

              <div className="flex justify-end">
                <Button
                  type="button"
                  onClick={handleTransfer}
                  disabled={!isFormValid || isSubmittingTransfer}
                  className={`w-full sm:w-auto ${!isFormValid || isSubmittingTransfer ? "bg-[#061e3d]/60 hover:bg-[#061e3d] cursor-not-allowed opacity-70" : "bg-[#061e3d]"} text-[#ffffff] inline-flex items-center justify-center gap-2 px-7 py-5.5 rounded-full font-medium transition-all duration-200`}
                >
                  {isSubmittingTransfer ? "Transferring..." : "Transfer Amount"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>

      {/* Saved beneficiaries can be selected to pre-fill the transfer recipient fields. */}
      {showBeneficiaryPicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <Card className="transact-card w-full max-w-2xl rounded-3xl bg-white p-5 shadow-[0_30px_70px_-36px_rgba(11,62,90,0.55)] sm:p-8">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-[#155E63]">Select Beneficiary</h2>
                <p className="mt-1 text-sm text-muted-foreground">Choose a saved beneficiary to fill the account number and account-holder name.</p>
              </div>
              <Button type="button" variant="outline" onClick={() => setShowBeneficiaryPicker(false)}>
                Close
              </Button>
            </div>

            {isLoadingBeneficiaries ? (
              <p className="py-8 text-center text-sm text-muted-foreground">Loading saved beneficiaries...</p>
            ) : beneficiaryLoadError ? (
              <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{beneficiaryLoadError}</p>
            ) : savedBeneficiaries.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center">
                <p className="text-sm text-muted-foreground">No saved beneficiaries yet.</p>
                <Link href="/bank-customer/transact/beneficiary" className="mt-3 inline-block text-sm font-semibold text-[#1265d6] underline underline-offset-4">
                  Add a beneficiary
                </Link>
              </div>
            ) : (
              <div className="max-h-[55vh] space-y-3 overflow-y-auto pr-1">
                {savedBeneficiaries.map((savedBeneficiary) => {
                  const accountHolderName = savedBeneficiary.accountHolderName || savedBeneficiary.nickName
                  return (
                    <button
                      key={savedBeneficiary.beneficiaryId}
                      type="button"
                      onClick={() => handleSelectBeneficiary(savedBeneficiary)}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-left transition hover:border-[#399FD8] hover:bg-cyan-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#399FD8]"
                    >
                      <span className="block font-semibold text-slate-800">{accountHolderName}</span>
                      <span className="mt-1 block text-sm text-slate-600">A/C {savedBeneficiary.beneficiaryAccountNo}</span>
                      {savedBeneficiary.nickName && savedBeneficiary.nickName !== accountHolderName ? (
                        <span className="mt-1 block text-xs text-slate-500">Saved as: {savedBeneficiary.nickName}</span>
                      ) : null}
                    </button>
                  )
                })}
              </div>
            )}
          </Card>
        </div>
      )}

      {/* OTP verification modal shown after successful transfer initiation. */}
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
                      disabled={seconds <= 0 || otpAttemptsRemaining <= 0 || isVerifyingOtp || isCancellingTransaction}
                      className="w-10 h-12 sm:w-14 sm:h-14 text-center text-base sm:text-lg rounded-xl"
                    />
                  ))}
                </div>
              </div>

              <p className="text-center text-sm text-muted-foreground mb-2">
                {formatOtpCountdown(seconds)}
              </p>
              <p className="text-center text-sm text-muted-foreground mb-4">
                {otpAttemptsRemaining} of {MAX_OTP_ATTEMPTS} OTP attempt(s) remaining
              </p>
              {seconds <= 0 && otpAttemptsRemaining > 0 && (
                <p className="text-center text-sm text-amber-700 mb-4">
                  OTP time has expired. This transaction has failed.
                </p>
              )}
              {otpError && (
                <p className="text-center text-sm text-red-600 mb-4">{otpError}</p>
              )}

              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full sm:w-auto"
                  onClick={handleCancelTransaction}
                  disabled={isCancellingTransaction || isVerifyingOtp}
                >
                  {isCancellingTransaction ? "Cancelling..." : "Cancel Transfer"}
                </Button>

                <Button
                  type="button"
                  onClick={handleVerify}
                  disabled={isVerifyingOtp || isCancellingTransaction || seconds <= 0 || otpAttemptsRemaining <= 0}
                  className="w-full sm:w-auto bg-[#061e3d] hover:bg-[#061e3d]/80 text-white rounded-xl px-9 py-5"
                >
                  {isVerifyingOtp ? "Verifying..." : "Verify"}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Success modal shown after OTP verification completes. */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <Card className="transact-card bg-white max-w-2xl w-full rounded-3xl p-6 text-center shadow-[0_30px_70px_-36px_rgba(11,62,90,0.55)] sm:p-10">
            <div className="flex justify-center mb-6 sm:mb-10">
              <div className="w-24 h-24 sm:w-36 sm:h-36 rounded-full bg-[#061e3d]/40 flex items-center justify-center">
                <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-[#061e3d] flex items-center justify-center shadow-lg">
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

            {receiptError && (
              <p className="mb-4 text-sm text-red-600">{receiptError}</p>
            )}

            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Button
                type="button"
                variant="outline"
                disabled={isDownloadingReceipt}
                className="w-full whitespace-nowrap rounded-full px-7 py-6 text-base font-semibold sm:w-[280px]"
                onClick={handleDownloadReceipt}
              >
                <Download className="mr-2 h-5 w-5" />
                {isDownloadingReceipt ? "DOWNLOADING..." : "DOWNLOAD RECEIPT"}
              </Button>
              <Button
                type="button"
                className="w-full whitespace-nowrap rounded-full bg-[#061e3d] px-7 py-6 text-base font-semibold text-white shadow-md hover:bg-[#061e3d]/80 sm:w-[280px] sm:text-lg"
                onClick={() => router.push("/bank-customer/transact")}
              >
                <LayoutDashboard className="mr-2 h-5 w-5" />
                BACK TO DASHBOARD
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
