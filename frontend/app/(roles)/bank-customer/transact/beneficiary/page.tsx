"use client"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import TransactHeader from "@/src/components/ui/Transact-Header"

export default function Page() {
  return (
    <div className="bg-white px-8 py-8">
      <TransactHeader title="Account Detail" subtitle="Bank transfer" />
            <div className="flex items-center justify-between mt-8 mb-8">
              <div />
            </div>

      {/* Centered Content Container */}
      <section className="max-w-6xl mx-auto">

        <Card className="rounded-xl shadow-sm p-8 w-full border min-h-[600px]">
          <form className="space-y-8">

            {/* Account Number */}
            <div className="space-y-4 p-4">
              <Label htmlFor="accountNumber">
                Account number
              </Label>
              <Input
                id="accountNumber"
                name="accountNumber"
                type="text"
                placeholder="948765"
              />
            </div>

            {/* Nick Name */}
            <div className="space-y-4 p-4">
              <Label htmlFor="nickName">
                Nick name
              </Label>
              <Input
                id="nickName"
                name="nickName"
                type="text"
                placeholder="water bill"
              />
            </div>

            {/* Remark */}
            <div className="space-y-4 p-4">
              <Label htmlFor="remark">
                Remark
              </Label>
              <textarea
                id="remark"
                name="remark"
                placeholder="Add a note (optional)"
                className="w-full min-h-[150px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              />
            </div>

          </form>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end mt-8">
          <Button
            size="lg"
            className="bg-[#155E63] hover:bg-[#134e52] text-white px-10 py-6 rounded-xl"
          >
            Save
          </Button>
        </div>

      </section>
    </div>
  )
}
