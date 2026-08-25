"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import ModuleHeader from "@/src/components/ui/module-header";
import { authService } from "@/src/api/auth/auth.service"
import { beneficiaryService } from "@/src/api/transact/beneficiary.service"
import { ApiError } from "@/src/types/api-error"

export default function Page() {
  // Router is used to redirect after a successful beneficiary creation.
  const router = useRouter()

  // Form input states.
  const [accountNumber, setAccountNumber] = useState("")
  const [nickName, setNickName] = useState("")
  const [remark, setRemark] = useState("")

  // Validation and submission states.
  const [errors, setErrors] = useState<{ [k: string]: string }>({})
  const [submitError, setSubmitError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Validates all fields and returns an error map keyed by field name.
  const validate = () => {
    const e: { [k: string]: string } = {}
    const normalizedAccountNumber = accountNumber.trim()
    const normalizedNickName = nickName.trim()
    const normalizedRemark = remark.trim()

    if (!normalizedAccountNumber) e.accountNumber = "Account number is required"
    else if (!/^\d+$/.test(normalizedAccountNumber)) e.accountNumber = "Account number must contain only digits"
    else if (normalizedAccountNumber.length < 6) e.accountNumber = "Account number must be at least 6 digits"
    else if (normalizedAccountNumber.length > 20) e.accountNumber = "Account number must not exceed 20 digits"

    if (!normalizedNickName) e.nickName = "Nick name is required"
    else if (normalizedNickName.length > 100) e.nickName = "Nick name must not exceed 100 characters"

    if (!normalizedRemark) e.remark = "Remark is required"
    else if (normalizedRemark.length > 255) e.remark = "Remark must not exceed 255 characters"

    return e
  }

  // Restricts account number input to digits and clears related errors while typing.
  const handleAccountNumberChange = (value: string) => {
    const digitsOnly = value.replace(/\D/g, "").slice(0, 20)
    setAccountNumber(digitsOnly)
    if (errors.accountNumber) {
      setErrors((prev) => ({ ...prev, accountNumber: "" }))
    }
    if (submitError) {
      setSubmitError("")
    }
  }

  // Submits the form after validation, then creates beneficiary and redirects.
  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()

    if (isSubmitting) {
      return
    }

    setSubmitError("")
    const validation = validate()
    setErrors(validation)
    const hasErrors = Object.keys(validation).length > 0
    if (hasErrors) {
      const firstKey = Object.keys(validation)[0]
      setSubmitError(validation[firstKey] || "Please fix the form validation errors.")
      const el = document.getElementById(firstKey)
      if (el) (el as HTMLElement).focus()
      return
    }

    setIsSubmitting(true)
    // exception handling
    try {
      const me = await authService.me()
      if (String(me.roleName).toUpperCase() !== "BANK_CUSTOMER" || !me.bankCustomerId) {
        setSubmitError("Only logged-in bank customers can add beneficiaries.")
        return
      }

      await beneficiaryService.createBeneficiary({
        beneficiaryAccountNo: accountNumber.trim(),
        nickName: nickName.trim(),
        remark: remark.trim(),
        accountHolderName: ""
      })

      router.push("/bank-customer/transact/transfer")
    } catch (error) {
      const nextErrors: { [k: string]: string } = {}
      let message = "Unable to save beneficiary. Please try again."

      if (error instanceof ApiError) {
        message = error.message || message
        const details = (error.details ?? {}) as {
          fieldErrors?: Record<string, unknown>
        }
        const fieldErrors = details.fieldErrors
        if (fieldErrors) {
          if (typeof fieldErrors.beneficiaryAccountNo === "string") {
            nextErrors.accountNumber = fieldErrors.beneficiaryAccountNo
          }
          if (typeof fieldErrors.nickName === "string") {
            nextErrors.nickName = fieldErrors.nickName
          }
          if (typeof fieldErrors.remark === "string") {
            nextErrors.remark = fieldErrors.remark
          }
        }

        if (
          !nextErrors.accountNumber &&
          (message === "Account number not found" || message === "Beneficiary already added")
        ) {
          nextErrors.accountNumber = message
        }
      } else if (error instanceof Error && error.message) {
        message = error.message
      }

      setErrors((prev) => ({ ...prev, ...nextErrors }))
      const firstFieldError = Object.values(nextErrors).find((value) => Boolean(value))
      setSubmitError(typeof firstFieldError === "string" ? firstFieldError : message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-transparent px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <ModuleHeader theme="transact" menuMode="feature-layout" role="Bank Customer" title="Account Detail" name="John deo" />

      <section className="max-w-6xl mx-auto mt-20 sm:mt-8">
        {/* Beneficiary creation form card. */}
        <Card className="transact-card transact-card-hover bg-white creditlens-delay-1 mt-20 w-full rounded-xl p-4 sm:mt-20 sm:min-h-[650px] sm:p-6 lg:p-8">
          <form className="space-y-6 sm:space-y-10" onSubmit={handleSubmit} noValidate>
            {/* Top-level submit error message. */}
            {submitError && (
              <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
                {submitError}
              </div>
            )}

            {/* Account and nickname input section. */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="accountNumber">Account number <span className="text-red-500">*</span></Label>
                <Input
                  id="accountNumber"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="Enter account number"
                  maxLength={20}
                  value={accountNumber}
                  onChange={(e) => handleAccountNumberChange((e as React.ChangeEvent<HTMLInputElement>).target.value)}
                  aria-invalid={!!errors.accountNumber}
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="nickName">Nick name <span className="text-red-500">*</span></Label>
                <Input
                  id="nickName"
                  name="nickName"
                  type="text"
                  placeholder="water bill"
                  value={nickName}
                  aria-invalid={!!errors.nickName}
                  required
                  onChange={(e) => {
                    setNickName(e.target.value)
                    if (errors.nickName) {
                      setErrors((prev) => ({ ...prev, nickName: "" }))
                    }
                    if (submitError) {
                      setSubmitError("")
                    }
                  }}
                  className="w-full"
                />
              </div>
            </div>

            {/* Beneficiary remark/description field. */}
            <div className="space-y-2">
              <Label htmlFor="remark">Remark <span className="text-red-500">*</span></Label>
              <textarea
                id="remark"
                name="remark"
                placeholder="Add a note"
                value={remark}
                aria-invalid={!!errors.remark}
                required
                onChange={(e) => {
                  setRemark(e.target.value)
                  if (errors.remark) {
                    setErrors((prev) => ({ ...prev, remark: "" }))
                  }
                  if (submitError) {
                    setSubmitError("")
                  }
                }}
                className="w-full min-h-[180px] rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none"
              />
            </div>

            {/* Form submit action row. */}
            <div className="flex justify-end ">
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-[#061e3d] hover:bg-[#0a3046] text-white inline-flex items-center justify-center gap-2 px-15 py-2.5 rounded-full font-medium disabled:opacity-60"
              >
                Save
              </Button>
            </div>
          </form>
        </Card>
      </section>
    </div>
  )
}
