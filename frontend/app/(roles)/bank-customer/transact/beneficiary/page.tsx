"use client"

import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import TransactHeader from "@/src/components/ui/Transact-Header"
import { MessageSquareText } from "lucide-react"

export default function Page() {
  const router = useRouter()

  return (
    <div className="bg-white px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <TransactHeader title="Account Detail" subtitle="Dineth dovindu" />

      <section className="max-w-6xl mx-auto mt-6 sm:mt-8">

        <Card className="rounded-2xl shadow-sm p-4 sm:p-8 lg:p-10 w-full border border-[#D0D0D0] bg-[#F8F8F8] min-h-[700px] sm:min-h-[600px] mt-6 sm:mt-28">
          <form className="space-y-8">

            <div className="space-y-3">
              <Label htmlFor="accountNumber" className="text-[24px] font-semibold text-[#181818]">
                Account number
              </Label>
              <Input
                id="accountNumber"
                name="accountNumber"
                type="text"
                placeholder="948765"
                className="h-[72px] rounded-2xl border-[#D0D0D0] bg-white px-12 text-base"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="nickName" className="text-[24px] font-semibold text-[#181818]">
                Nick name
              </Label>
              <Input
                id="nickName"
                name="nickName"
                type="text"
                placeholder="water bill"
                className="h-[72px] rounded-2xl border-[#D0D0D0] bg-white px-12 text-base"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="remark" className="text-[24px] font-semibold text-[#181818]">
                Remark
              </Label>
              <div className="relative">
                <MessageSquareText className="pointer-events-none absolute left-10 top-1/2 h-6 w-6 -translate-y-1/2 text-[#D4D4D4]" />
                <Input
                  id="remark"
                  name="remark"
                  placeholder="Add a note (optional)"
                  className="h-[72px] rounded-2xl border-[#D0D0D0] bg-white pl-20 pr-6 text-base"
                />
              </div>
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
