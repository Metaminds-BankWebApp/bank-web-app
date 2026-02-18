"use client"

import Link from "next/link"
import { AlertTriangle } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import TransactHeader from "@/src/components/ui/Transact-Header"

export default function Page() {
  return (
    
    <div className="bg-white px-4 py-6 sm:px-6 lg:px-8">
      <TransactHeader title="Transfer" subtitle="Bank transfer" />
      <div className="flex items-center justify-between mt-8 mb-8">
        <div />

        <Link
          href="#"
          className="text-[#155E63] font-medium hover:underline"
          aria-label="Add Beneficiary"
        >
          + Add Beneficiary
        </Link>
      </div>

      <Card className="rounded-xl shadow-sm p-8 max-w-6xl mx-auto w-full">
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
            <Button bg-type="button" size="lg" variant="primary" 
            className="bg-[#155E63] hover:bg-[#134e52] text-white px-8 py-6 rounded-xl">
              Transfer Amount
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
