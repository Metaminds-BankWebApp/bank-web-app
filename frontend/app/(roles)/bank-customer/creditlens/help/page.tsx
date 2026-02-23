"use client";

import { useState } from "react";
import ModuleHeader from "@/src/components/ui/module-header";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Dialog } from "@/src/components/ui/dialog";

export default function CreditLensCustomerHelp() {
  const [choice, setChoice] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [loanId, setLoanId] = useState("");

  return (
    <div className="min-h-screen bg-[#ffff] px-1 pt-2 sm:px-2 lg:px-6 lg:pt-4 xl:px-8 2xl:px-10">
      <ModuleHeader theme="creditlens" menuMode="feature-layout" title="CreditLens Help" name="You" role="Customer" className="mb-6" />
      <main className="max-w-5xl mx-auto p-6">
        <div className="rounded-[20px] bg-[#a2b9cc86] border border-[#BCC5CC] shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-[#063154]">Understand your credit score and unlock insights</h2>
          <p className="text-sm text-[#063154]/80 mt-2">Help and troubleshooting for CreditLens features.</p>
        </div>

        <section className="rounded-[20px] bg-[#F7F6F2] border border-[#BCC5CC] shadow-sm p-6 mb-6">
          <h3 className="font-semibold text-[#063154]">Top FAQs</h3>
          <div className="mt-3 space-y-2">
            {["Why is my credit score not showing?","What affects my score?","Why is the feature locked?","How is readiness calculated?","How do I dispute a report entry?"].map(q=> (
              <details key={q} className="bg-white p-3 rounded-md border border-[#E8E8E8]">
                <summary className="cursor-pointer font-medium text-[#063154]">{q}</summary>
                <p className="mt-2 text-sm text-[#063154]/80">Detailed answer for: {q}</p>
              </details>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="col-span-2 bg-white p-4 rounded-md border border-[#E8E8E8]">
              <h4 className="font-semibold text-[#063154]">Troubleshooter</h4>
              <p className="text-sm text-[#063154]/80 mt-1">What issue are you facing?</p>
              <div className="mt-3 flex gap-2">
                <button onClick={()=>setChoice('no-score')} className={`px-3 py-2 rounded-md border ${choice==='no-score' ? 'bg-[#2F9D94] text-white' : 'bg-white'}`}>Score not generated</button>
                <button onClick={()=>setChoice('locked')} className={`px-3 py-2 rounded-md border ${choice==='locked' ? 'bg-[#2F9D94] text-white' : 'bg-white'}`}>Feature locked</button>
                <button onClick={()=>setChoice('incorrect')} className={`px-3 py-2 rounded-md border ${choice==='incorrect' ? 'bg-[#2F9D94] text-white' : 'bg-white'}`}>Data incorrect</button>
              </div>

              {choice && (
                <div className="mt-4 bg-[#063154]/5 p-3 rounded-md">
                  <ol className="list-decimal list-inside text-sm text-[#063154]/80">
                    <li>Confirm your profile completeness.</li>
                    <li>Update income and liabilities.</li>
                    <li>Re-run SpendIQ sync or upload documents.</li>
                  </ol>
                  <div className="mt-3">
                    <Button className="bg-[#2F9D94]" onClick={()=>setOpen(true)}>Go Fix It</Button>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white p-4 rounded-md border border-[#E8E8E8]">
              <h4 className="font-semibold text-[#063154]">Need extra help?</h4>
              <p className="text-sm text-[#063154]/80 mt-2">Create a ticket and our team will investigate.</p>
              <div className="mt-3"><Button className="bg-[#2F9D94]" onClick={()=>setOpen(true)}>Create Ticket</Button></div>
            </div>
          </div>
        </section>

        <Dialog open={open} onOpenChange={setOpen} title="Create Support Ticket">
          <CreditSupportForm onClose={()=>setOpen(false)} />
        </Dialog>
      </main>
    </div>
  );
}

function CreditSupportForm({ onClose }: { onClose: ()=>void }){
  const [subject, setSubject] = useState('');
  const [desc, setDesc] = useState('');
  const submit = ()=>{ alert('Ticket created (UI)'); onClose(); };
  return (
    <div className="space-y-3">
      <Input placeholder="Subject" value={subject} onChange={(e:any)=>setSubject(e.target.value)} />
      <div>
        <label className="text-sm">Description</label>
        <textarea className="w-full rounded-md p-2 border" rows={4} value={desc} onChange={(e)=>setDesc(e.target.value)} />
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button className="bg-[#2F9D94]" onClick={submit}>Submit</Button>
      </div>
    </div>
  );
}
