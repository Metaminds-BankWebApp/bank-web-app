"use client";

import { useState } from "react";
import ModuleHeader from "@/src/components/ui/module-header";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Dialog } from "@/src/components/ui/dialog";

export default function TransactCustomerHelp(){
  const [choice, setChoice] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [txId, setTxId] = useState('');

  return (
    <div className="min-h-screen bg-[#ffff] px-1 pt-2 sm:px-2 lg:px-6 lg:pt-4 xl:px-8 2xl:px-10">
      <ModuleHeader theme="transact" menuMode="feature-layout" title="Transact Help" name="You" role="Customer" className="mb-6" />
      <main className="max-w-5xl mx-auto p-6">
        <div className="rounded-[20px] bg-[#F7F6F2] border border-[#BCC5CC] shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-[#063154]">Transact Help</h2>
          <p className="text-sm text-[#063154]/80 mt-2">Transfers, OTP issues and troubleshooting for transactions.</p>
        </div>

        <section className="rounded-[20px] bg-[#F7F6F2] border border-[#BCC5CC] shadow-sm p-6 mb-6">
          <h3 className="font-semibold text-[#063154]">Top FAQs</h3>
          <div className="mt-3 space-y-2">
            {["OTP not received","Transfer failed","Pending transfer","Wrong beneficiary","Limits and fees"].map(q=> (
              <details key={q} className="bg-white p-3 rounded-md border border-[#E8E8E8]">
                <summary className="cursor-pointer font-medium text-[#063154]">{q}</summary>
                <p className="mt-2 text-sm text-[#063154]/80">Answer for: {q}</p>
              </details>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="col-span-2 bg-white p-4 rounded-md border border-[#E8E8E8]">
              <h4 className="font-semibold text-[#063154]">Troubleshooter</h4>
              <p className="text-sm text-[#063154]/80 mt-1">Select the issue</p>
              <div className="mt-3 flex gap-2">
                <button onClick={()=>setChoice('otp')} className={`px-3 py-2 rounded-md border ${choice==='otp' ? 'bg-[#2F9D94] text-white' : 'bg-white'}`}>OTP not received</button>
                <button onClick={()=>setChoice('failed')} className={`px-3 py-2 rounded-md border ${choice==='failed' ? 'bg-[#2F9D94] text-white' : 'bg-white'}`}>Transfer failed</button>
                <button onClick={()=>setChoice('pending')} className={`px-3 py-2 rounded-md border ${choice==='pending' ? 'bg-[#2F9D94] text-white' : 'bg-white'}`}>Pending transfer</button>
              </div>

              {choice && (
                <div className="mt-4 bg-[#063154]/5 p-3 rounded-md">
                  <ol className="list-decimal list-inside text-sm text-[#063154]/80">
                    <li>Verify your network and try resending OTP.</li>
                    <li>Check beneficiary details and sufficient balance.</li>
                    <li>Wait a few minutes for processing or contact support with TX ID.</li>
                  </ol>
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <Input placeholder="Transaction ID (optional)" value={txId} onChange={(e:any)=>setTxId(e.target.value)} className="bg-white" />
                    <div className="sm:col-span-2 flex gap-2">
                      <Button className="bg-[#2F9D94]" onClick={()=>setOpen(true)}>Report with Transaction ID</Button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white p-4 rounded-md border border-[#E8E8E8]">
              <h4 className="font-semibold text-[#063154]">Need urgent help?</h4>
              <p className="text-sm text-[#063154]/80 mt-2">Report fraud or failed transfers immediately.</p>
              <div className="mt-3"><Button className="bg-[#2F9D94]" onClick={()=>setOpen(true)}>Create Ticket</Button></div>
            </div>
          </div>
        </section>

        <Dialog open={open} onOpenChange={setOpen} title="Report Transaction / Create Ticket">
          <div className="space-y-3">
            <Input placeholder="Transaction ID (if any)" value={txId} onChange={(e:any)=>setTxId(e.target.value)} />
            <Input placeholder="Short subject" />
            <div>
              <label className="text-sm">Description</label>
              <textarea className="w-full rounded-md p-2 border" rows={4} />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={()=>setOpen(false)}>Cancel</Button>
              <Button className="bg-[#2F9D94]" onClick={()=>{ alert('Report submitted (UI)'); setOpen(false); }}>Report</Button>
            </div>
          </div>
        </Dialog>
      </main>
    </div>
  );
}
