"use client";

import { useState } from "react";
import ModuleHeader from "@/src/components/ui/module-header";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Dialog } from "@/src/components/ui/dialog";

export default function SpendIQCustomerHelp(){
  const [open, setOpen] = useState(false);
  const [choice, setChoice] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#ffff] px-1 pt-2 sm:px-2 lg:px-6 lg:pt-4 xl:px-8 2xl:px-10">
      <ModuleHeader theme="spendiq" menuMode="feature-layout" title="SpendIQ Help" name="You" role="Customer" className="mb-6" />
      <main className="max-w-5xl mx-auto p-6">
        <div className="rounded-[20px] bg-[#a2b9cc86] border border-[#BCC5CC] shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-[#063154]">Track and manage your spending effectively</h2>
          <p className="text-sm text-[#063154]/80 mt-2">Help for importing, categorization and corrections.</p>
        </div>

        <section className="rounded-[20px] bg-[#F7F6F2] border border-[#BCC5CC] shadow-sm p-6 mb-6">
          <h3 className="font-semibold text-[#063154]">Top FAQs</h3>
          <div className="mt-3 space-y-2">
            {["Why are my expenses not appearing?","How are categories calculated?","How do I update monthly data?","Why is my total incorrect?","How to connect accounts?"].map(q=> (
              <details key={q} className="bg-white p-3 rounded-md border border-[#E8E8E8]">
                <summary className="cursor-pointer font-medium text-[#063154]">{q}</summary>
                <p className="mt-2 text-sm text-[#063154]/80">Answer for: {q}</p>
              </details>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="col-span-2 bg-white p-4 rounded-md border border-[#E8E8E8]">
              <h4 className="font-semibold text-[#063154]">Troubleshooter</h4>
              <p className="text-sm text-[#063154]/80 mt-1">Choose your issue</p>
              <div className="mt-3 flex gap-2">
                <button onClick={()=>setChoice('missing')} className={`px-3 py-2 rounded-md border ${choice==='missing' ? 'bg-[#2F9D94] text-white' : 'bg-white'}`}>Missing expenses</button>
                <button onClick={()=>setChoice('totals')} className={`px-3 py-2 rounded-md border ${choice==='totals' ? 'bg-[#2F9D94] text-white' : 'bg-white'}`}>Incorrect totals</button>
                <button onClick={()=>setChoice('edit')} className={`px-3 py-2 rounded-md border ${choice==='edit' ? 'bg-[#2F9D94] text-white' : 'bg-white'}`}>Need to edit records</button>
              </div>

              {choice && (
                <div className="mt-4 bg-[#063154]/5 p-3 rounded-md">
                  <ol className="list-decimal list-inside text-sm text-[#063154]/80">
                    <li>Ensure sync is active and latest.</li>
                    <li>Upload CSV or manual receipts.</li>
                    <li>Edit categories or merge duplicates.</li>
                  </ol>
                  <div className="mt-3"><Button className="bg-[#2F9D94]" onClick={()=>document.getElementById('expenses')?.scrollIntoView({behavior:'smooth'})}>Add / Edit Expenses</Button></div>
                </div>
              )}
            </div>

            <div className="bg-white p-4 rounded-md border border-[#E8E8E8]">
              <h4 className="font-semibold text-[#063154]">Quick actions</h4>
              <p className="text-sm text-[#063154]/80 mt-2">Upload or sync data.</p>
              <div className="mt-3"><Button className="bg-[#2F9D94]" onClick={()=>setOpen(true)}>Create Ticket</Button></div>
            </div>
          </div>
        </section>

        <section id="expenses" className="mb-6 text-white">
          <h3 className="text-lg font-semibold">Add Expense Records</h3>
          <p className="text-sm mt-1">Upload or manually add receipts to ensure SpendIQ reflects your spending.</p>
        </section>

        <Dialog open={open} onOpenChange={setOpen} title="Create Support Ticket">
          <SupportForm onClose={()=>setOpen(false)} onCreate={()=>setOpen(false)} />
        </Dialog>
      </main>
    </div>
  );
}

function SupportForm({ onClose, onCreate }: { onClose: ()=>void; onCreate: ()=>void }){
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const submit = ()=>{ alert('Ticket submitted (UI)'); onCreate(); };
  return (
    <div className="space-y-3">
      <Input placeholder="Short title" value={title} onChange={(e:any)=>setTitle(e.target.value)} />
      <div>
        <label className="text-sm">Description</label>
        <textarea className="w-full rounded-md p-2 border" rows={4} value={desc} onChange={(e)=>setDesc(e.target.value)} />
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button className="bg-[#2F9D94]" onClick={submit}>Send</Button>
      </div>
    </div>
  );
}
