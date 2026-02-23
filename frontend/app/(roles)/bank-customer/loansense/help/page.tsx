"use client";

import { useState } from "react";
import ModuleHeader from "@/src/components/ui/module-header";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Dialog } from "@/src/components/ui/dialog";

export default function LoanSenseCustomerHelp(){
  const [open, setOpen] = useState(false);
  const [choice, setChoice] = useState<string | null>(null);
  const [loanId, setLoanId] = useState('');

  return (
    <div className="min-h-screen bg-[#ffff] px-1 pt-2 sm:px-2 lg:px-6 lg:pt-4 xl:px-8 2xl:px-10">
      <ModuleHeader theme="loansense" menuMode="feature-layout" title="LoanSense Help" name="You" role="Customer" className="mb-6" />
      <main className="max-w-5xl mx-auto p-6">
        <div className="rounded-[20px] bg-[#a2b9cc86] border border-[#BCC5CC] shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-[#063154]">LoanSense Help</h2>
          <p className="text-sm text-[#063154]/80 mt-2">Eligibility, application status and EMI guidance.</p>
        </div>

        <section className="rounded-[20px] bg-[#F7F6F2] border border-[#BCC5CC] shadow-sm p-6 mb-6">
          <h3 className="font-semibold text-[#063154]">FAQs</h3>
          <div className="mt-3 space-y-2">
            {["How is eligibility calculated?","What documents are required?","How to recalculate EMI?","How to check application status?","Can I request officer review?"].map(q=> (
              <details key={q} className="bg-white p-3 rounded-md border border-[#E8E8E8]">
                <summary className="cursor-pointer font-medium text-[#063154]">{q}</summary>
                <p className="mt-2 text-sm text-[#063154]/80">Answer: {q}</p>
              </details>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="col-span-2 bg-white p-4 rounded-md border border-[#E8E8E8]">
              <h4 className="font-semibold text-[#063154]">Troubleshooter</h4>
              <p className="text-sm text-[#063154]/80 mt-1">Select the loan issue</p>
              <div className="mt-3 flex gap-2">
                <button onClick={()=>setChoice('eligibility')} className={`px-3 py-2 rounded-md border ${choice==='eligibility' ? 'bg-[#2F9D94] text-white' : 'bg-white'}`}>Eligibility</button>
                <button onClick={()=>setChoice('docs')} className={`px-3 py-2 rounded-md border ${choice==='docs' ? 'bg-[#2F9D94] text-white' : 'bg-white'}`}>Missing documents</button>
                <button onClick={()=>setChoice('emi')} className={`px-3 py-2 rounded-md border ${choice==='emi' ? 'bg-[#2F9D94] text-white' : 'bg-white'}`}>EMI calculation</button>
              </div>

              {choice && (
                <div className="mt-4 bg-[#063154]/5 p-3 rounded-md">
                  <ol className="list-decimal list-inside text-sm text-[#063154]/80">
                    <li>Review the eligibility checklist on your profile.</li>
                    <li>Upload missing documents from the profile section.</li>
                    <li>Contact officer if your score or income is borderline.</li>
                  </ol>
                  <div className="mt-3 flex gap-2">
                    <Input placeholder="Loan/Application ID (optional)" value={loanId} onChange={(e:any)=>setLoanId(e.target.value)} className="bg-white" />
                    <Button className="bg-[#2F9D94]" onClick={()=>setOpen(true)}>Request Officer Review</Button>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white p-4 rounded-md border border-[#E8E8E8]">
              <h4 className="font-semibold text-[#063154]">Need help now?</h4>
              <div className="mt-3"><Button className="bg-[#2F9D94]" onClick={()=>setOpen(true)}>Create Ticket</Button></div>
            </div>
          </div>
        </section>

        <Dialog open={open} onOpenChange={setOpen} title="Request Officer Review / Ticket">
          <div className="space-y-3">
            <Input placeholder="Loan/Application ID" value={loanId} onChange={(e:any)=>setLoanId(e.target.value)} />
            <Input placeholder="Short subject" />
            <div>
              <label className="text-sm">Description</label>
              <textarea className="w-full rounded-md p-2 border" rows={4} />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={()=>setOpen(false)}>Cancel</Button>
              <Button className="bg-[#2F9D94]" onClick={()=>{ alert('Officer review requested (UI)'); setOpen(false); }}>Request Officer Review</Button>
            </div>
          </div>
        </Dialog>
      </main>
    </div>
  );
}
