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

  const handleAccountNumberChange = (value: string) => {
    const digitsOnly = value.replace(/\D/g, "")
    setAccountNumber(digitsOnly)
  }

  return (
    <div className="bg-transparent px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <ModuleHeader theme="transact" menuMode="feature-layout" role="Bank Customer" title="Account Detail" name="John deo" />

      <section className="max-w-6xl mx-auto mt-6 sm:mt-8">

        <Card className="transact-card transact-card-hover transact-creditlens-shade creditlens-delay-1 mt-6 w-full rounded-xl p-4 sm:mt-28 sm:min-h-[600px] sm:p-6 lg:p-8 min-h-[700px]">
          <form className="space-y-8 sm:space-y-8">

            <div className="space-y-4">
              <Label htmlFor="accountNumber">Account number</Label>
              <Input
                id="accountNumber"
                name="accountNumber"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="948765"
                value={accountNumber}
                onChange={(e) => handleAccountNumberChange(e.target.value)}
              />
            </div>

            <div className="space-y-4 sm:mt-18">
              <Label htmlFor="nickName">Nick name</Label>
              <Input
                id="nickName"
                name="nickName"
                type="text"
                placeholder="water bill"
              />
            </div>

            <div className="space-y-4 sm:mt-18">
              <Label htmlFor="remark">Remark</Label>
              <textarea
                id="remark"
                name="remark"
                placeholder="Add a note (optional)"
                className="w-full min-h-[150px] rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              />
            </div>
              <div className="flex justify-end mt-8 sm:mt-10">
                <Button
                  type="button"
                  size="lg"
                  onClick={() => router.push("/bank-customer/transact/transfer")}
                  className="w-full sm:w-auto bg-[#155E63] hover:bg-[#134e52] text-white px-8 py-5 rounded-xl"
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
