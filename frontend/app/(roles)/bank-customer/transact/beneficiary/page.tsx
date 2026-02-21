"use client"

import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import TransactHeader from "@/src/components/ui/Transact-Header"

export default function Page() {
  const router = useRouter()

  return (
    <div className="bg-white px-8 py-6">
      <TransactHeader title="Account Detail" subtitle="Dineth dovindu" />

      <section className="max-w-6xl mx-auto mt-8">

        <Card className="rounded-xl shadow-sm p-8 w-full border min-h-[600px] mt-[5rem]">
          <form className="space-y-8">

            <div className="space-y-4 p-4">
              <Label htmlFor="accountNumber">Account number</Label>
              <Input
                id="accountNumber"
                name="accountNumber"
                type="text"
                placeholder="948765"
              />
            </div>

            <div className="space-y-4 p-4">
              <Label htmlFor="nickName">Nick name</Label>
              <Input
                id="nickName"
                name="nickName"
                type="text"
                placeholder="water bill"
              />
            </div>

            <div className="space-y-4 p-4">
              <Label htmlFor="remark">Remark</Label>
              <textarea
                id="remark"
                name="remark"
                placeholder="Add a note (optional)"
                className="w-full min-h-[150px] rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              />
            </div>
              <div className="flex justify-end mt-10 max-w-6xl mx-auto pr-[1rem]">
                <Button
                  type="button"
                  size="lg"
                  onClick={() => router.push("/bank-customer/transact/transfer")}
                  className="bg-[#155E63] hover:bg-[#134e52] text-white px-9 py-6 rounded-xl"
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
