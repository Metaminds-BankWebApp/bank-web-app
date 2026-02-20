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
    <div className="px-8 py-6 sm:px-6 lg:px-8">
      <TransactHeader title="Transfer" subtitle="Dineth Dovindu" />

     <div className="flex justify-end mt-8 mb-8 pr-[7rem]">
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


      <Card className="rounded-xl shadow-sm p-8 max-w-7xl mx-auto w-6xl mt-[2rem]">
        <form className="space-y-9">

          <div className="space-y-2">
            <Label htmlFor="accountNumber">Account Number</Label>
            <Input id="accountNumber" type="text" placeholder="Enter account number" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="beneficiaryName">Beneficiary Name</Label>
            <Input id="beneficiaryName" type="text" placeholder="Beneficiary full name" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input id="amount" type="number" placeholder="0.00" />
          </div>

          <div className="space-y-2">
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
