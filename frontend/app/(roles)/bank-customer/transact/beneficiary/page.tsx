"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import ModuleHeader from "@/src/components/ui/module-header";

export default function Page() {
  const router = useRouter()
  const [accountNumber, setAccountNumber] = useState("")
  const [nickName, setNickName] = useState("")
  const [remark, setRemark] = useState("")
  const [errors, setErrors] = useState<{ [k: string]: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Basic validation rules (can be adjusted)
  const validate = () => {
    const e: { [k: string]: string } = {}

    if (!accountNumber) e.accountNumber = "Account number is required"
    else if (!/^\d+$/.test(accountNumber)) e.accountNumber = "Account number must contain only digits"
    else if (accountNumber.length < 6) e.accountNumber = "Account number must be at least 6 digits"
    else if (accountNumber.length > 18) e.accountNumber = "Account number is too long"

  // nickName and remark: required only (no length checks)
  if (!nickName) e.nickName = "Nick name is required"
  if (!remark) e.remark = "Remark is required"

    return e
  }

  const handleAccountNumberChange = (value: string) => {
    const digitsOnly = value.replace(/\D/g, "")
    setAccountNumber(digitsOnly)
  }

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault()
    setIsSubmitting(true)
    const validation = validate()
    setErrors(validation)
    const hasErrors = Object.keys(validation).length > 0
    if (!hasErrors) {
      // persist to localStorage (append to 'beneficiaries' list)
      try {
        const key = "beneficiaries"
        const existing = localStorage.getItem(key)
        const list = existing ? JSON.parse(existing) : []
        list.push({ accountNumber, nickName, remark, createdAt: new Date().toISOString() })
        localStorage.setItem(key, JSON.stringify(list))
      } catch (err) {
        // silent: localStorage may be unavailable in some environments
        // eslint-disable-next-line no-console
        console.error("Failed to save beneficiary to localStorage", err)
      }

      // on success, navigate
      router.push("/bank-customer/transact/transfer")
    } else {
      // focus first invalid field (optional)
      const firstKey = Object.keys(validation)[0]
      const el = document.getElementById(firstKey)
      if (el) (el as HTMLElement).focus()
    }
    setIsSubmitting(false)
  }

  return (
    <div className="bg-transparent px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <ModuleHeader theme="transact" menuMode="feature-layout" role="Bank Customer" title="Account Detail" name="John deo" />

      <section className="max-w-6xl mx-auto mt-6 sm:mt-8">

        <Card className="transact-card transact-card-hover transact-creditlens-shade creditlens-delay-1 mt-6 w-full rounded-xl p-4 sm:mt-35 sm:min-h-[420px] sm:p-6 lg:p-8">
          <form className="space-y-6 sm:space-y-8" onSubmit={handleSubmit} noValidate>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="accountNumber">Account number</Label>
                <Input
                                  id="accountNumber"
                                  type="text"
                                  inputMode="numeric"
                                  pattern="[0-9]*"
                                  placeholder="Enter 10-digit account number"
                                  maxLength={10}
                                  value={accountNumber}
                                  onChange={(e) => handleAccountNumberChange((e as React.ChangeEvent<HTMLInputElement>).target.value)}
                                  aria-invalid={!!errors.accountNumber}
                                />
                {errors.accountNumber && (
                  <p className="text-xs text-red-600 mt-1" role="alert">{errors.accountNumber}</p>
                )}
              </div>
        <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="nickName">Nick name</Label>
                <Input
                  id="nickName"
                  name="nickName"
                  type="text"
                  placeholder="water bill"
                  value={nickName}
                  aria-invalid={!!errors.nickName}
                  required
          onChange={(e) => setNickName(e.target.value)}
          className="w-full"
                />
                {errors.nickName && (
                  <p className="text-xs text-red-600 mt-1" role="alert">{errors.nickName}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="remark">Remark</Label>
              <textarea
                id="remark"
                name="remark"
                placeholder="Add a note"
                value={remark}
                aria-invalid={!!errors.remark}
                required
                onChange={(e) => setRemark(e.target.value)}
                className="w-full min-h-[180px] rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none"
              />
              {errors.remark && (
                <p className="text-xs text-red-600 mt-1" role="alert">{errors.remark}</p>
              )}
            </div>

            <div className="flex justify-end mt-2 sm:mt-4">
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-[#155E63] hover:bg-[#134e52] text-white px-8 py-5 rounded-xl disabled:opacity-60"
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
