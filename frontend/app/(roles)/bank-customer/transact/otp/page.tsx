"use client"

import React, { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import TransactHeader from "@/src/components/ui/Transact-Header"

export default function Page() {
  const router = useRouter()
  const length = 6

  const [otpValues, setOtpValues] = useState<string[]>(Array(length).fill(""))
  const inputsRef = useRef<Array<HTMLInputElement | null>>([])

  const handleOtpChange = (index: number, val: string) => {
    if (!/^[0-9]*$/.test(val)) return
    const next = [...otpValues]
    next[index] = val.slice(-1)
    setOtpValues(next)
    if (val && index < length - 1) inputsRef.current[index + 1]?.focus()
  }

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <TransactHeader title="OTP Authentication" subtitle="Secure verification" />

      <section className="max-w-xl mx-auto mt-20">

        <Card className="rounded-2xl shadow-xl border p-10">

          <h2 className="text-2xl font-semibold text-[#155E63] text-center mb-6">
            OTP Authentication
          </h2>

          <p className="text-sm text-muted-foreground text-center mb-8">
            Enter the 6-digit OTP sent to your registered number
          </p>

          <div className="flex justify-center mb-8">
            <div className="grid grid-cols-6 gap-4">
              {otpValues.map((val, idx) => (
                <Input
                  key={idx}
                  value={val}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  ref={(el) => { inputsRef.current[idx] = el }}
                  maxLength={1}
                  className="w-14 h-14 text-center text-lg rounded-lg border focus:border-[#155E63]"
                />
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              size="lg"
              className="bg-[#155E63] hover:bg-[#134e52] text-white rounded-xl w-52"
              onClick={() => router.push("/bank-customer/transact/success")}
            >
              Verify
            </Button>
          </div>

        </Card>

      </section>
    </div>
  )
}
