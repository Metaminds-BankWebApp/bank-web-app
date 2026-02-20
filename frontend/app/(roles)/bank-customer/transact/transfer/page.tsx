"use client"

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

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <TransactHeader title="Transfer" subtitle="Dineth Dovindu" />

      <div className="flex justify-end mt-20 mb-8 max-w-6xl mx-auto pr-[7rem]">
        <Link
          href="/bank-customer/transact/beneficiary"
          className="text-[#155E63] font-medium hover:underline"
        >
          + Add Beneficiary
        </Link>
      </div>

      <Card className="rounded-xl shadow-sm p-8 max-w-5xl mx-auto w-full mt-[2rem]">
        <form className="space-y-6">

          <div className="space-y-1">
            <Label htmlFor="accountNumber">Account Number</Label>
            <Input id="accountNumber" type="text" placeholder="Enter account number" />
          </div>

          <div className="space-y-1">
            <Label htmlFor="beneficiaryName">Beneficiary Name</Label>
            <Input id="beneficiaryName" type="text" placeholder="Beneficiary full name" />
          </div>

          <div className="space-y-1">
            <Label htmlFor="amount">Amount</Label>
            <Input id="amount" type="number" placeholder="0.00" />
          </div>

          <div className="space-y-1">
            <Label htmlFor="remark">Remark</Label>
            <Input id="remark" type="text" placeholder="Add a note (optional)" />
          </div>

          <div className="pt-2">
            <label className="inline-flex items-center space-x-2">
              <Checkbox id="expensesTrack" />
              <span>Expenses track</span>
            </label>
          </div>

          <div className="flex justify-end">
            <Button
              type="button"
              size="lg"
              className="bg-[#155E63] hover:bg-[#134e52] text-white px-8 py-6 rounded-xl"
              onClick={() => router.push("/bank-customer/transact/otp")}
            >
              Transfer Amount
            </Button>
          </div>

        </form>
      </Card>
    </div>
  )
}
