"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from "react";
import ModuleHeader from "@/src/components/ui/module-header";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import PopupModal from "@/src/components/ui/popup-modal";

export default function TransactCustomerHelp(){
  
  const [openTicket,setOpenTicket]=useState(false);
  const [openFraud,setOpenFraud]=useState(false);
  const [choice,setChoice]=useState<string | null>(null);
  const [txId,setTxId]=useState('');

  return (
    <div className="min-h-screen bg-transparent px-1 pt-2 sm:px-2 lg:px-6 lg:pt-4 xl:px-8 2xl:px-10">
      <ModuleHeader theme="transact" menuMode="feature-layout" title="Transact Help" name="You" role="Customer" className="mb-6" />
      <main className="max-w-5xl mx-auto p-6">
        <div className="transact-card transact-card-hover transact-creditlens-shade creditlens-delay-1 mb-6 rounded-[20px] p-6">
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
                    <Input placeholder="Transaction ID (optional)" value={txId} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setTxId(e.target.value)} className="bg-white" />
                    <div className="sm:col-span-2 flex gap-2">
                      <Button className="bg-[#2F9D94]" onClick={()=>setOpenTicket(true)}>Report with Transaction ID</Button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white p-4 rounded-md border border-[#E8E8E8]">
              <h4 className="font-semibold text-[#063154]">Need urgent help?</h4>
              <p className="text-sm text-[#063154]/80 mt-2">Report fraud or failed transfers immediately.</p>
              <div className="mt-3"><Button className="bg-[#2F9D94]" onClick={()=>setOpenTicket(true)}>Create Ticket</Button></div>
            </div>
          </div>
        </section>


        <div className="rounded-[20px] bg-[#F7F6F2] border border-[#BCC5CC] shadow-sm p-6 mb-6"><h3 className="text-lg font-semibold text-[#063154]">My Support Requests</h3><div className="mt-3">{/* simplified list UI */}<p className="text-sm text-[#063154]/80">No recent tickets</p></div><div className="mt-4"><Button className="bg-[#2F9D94]" onClick={()=> setOpenTicket(true)}>Create New Support Ticket</Button></div></div>

        <section className="rounded-[20px] bg-[#F7F6F2] border border-[#BCC5CC] shadow-sm p-6 mb-24"><h3 className="text-lg font-semibold text-[#063154]">Quick Feedback</h3><div className="mt-3 flex items-center gap-2">{[1,2,3,4,5].map(n=> <button key={n} className="px-3 py-1 bg-white rounded-md">{n}★</button>)}<Input placeholder="Short message" className="ml-2 bg-white" /><Button className="bg-[#2F9D94]">Send</Button></div></section>

        <div className="flex items-center justify-between bg-[#063154]/5 p-4 rounded-xl"><p className="text-sm text-[#063154]/90">PrimeCore will never ask for your OTP or password. If you suspect fraud, report immediately.</p><Button className="bg-[#2F9D94]" onClick={()=> setOpenFraud(true)}>Report Fraud</Button></div>

        <PopupModal open={openTicket} onOpenChange={setOpenTicket} title="Create Support Ticket">
          <TicketForm onClose={()=> setOpenTicket(false)} onCreate={()=>{ setOpenTicket(false);}} />
        </PopupModal>
        <PopupModal open={openFraud} onOpenChange={setOpenFraud} title="Report Fraud">
          <FraudForm onClose={()=> setOpenFraud(false)} />
        </PopupModal>
      </main>
    </div>
  );
}

import { useState as useState2 } from "react";

function TicketForm({ onClose, onCreate }: { onClose: () => void; onCreate: () => void }){
  const [subject,setSubject]=useState('');
  const [desc,setDesc]=useState('');
  const handle=()=>{ onCreate(); onClose(); };
  return (
    <div className="space-y-3">
      <Input placeholder="Subject" value={subject} onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setSubject(e.target.value)} />
      <div>
        <label className="text-sm">Description</label>
        <textarea className="w-full rounded-md p-2 border" rows={4} value={desc} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>)=> setDesc(e.target.value)} />
      </div>
      <div className="flex items-center justify-between">
        <small className="text-xs text-[#063154]/80">Your ticket will be sent to your assigned officer.</small>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button className="bg-[#2F9D94]" onClick={handle}>Submit Ticket</Button>
        </div>
      </div>
    </div>
  );
}

function FraudForm({ onClose }: { onClose: () => void }){
  const [type,setType]=useState('Unauthorized transfer');
  const [desc,setDesc]=useState('');
  return (
    <div className="space-y-3">
      <label className="text-sm">Incident Type</label>
      <select className="w-full rounded-md p-2 border" value={type} onChange={(e: React.ChangeEvent<HTMLSelectElement>)=> setType(e.target.value)}>
        <option>Unauthorized transfer</option>
        <option>Suspected phishing</option>
        <option>Account takeover</option>
      </select>
      <div>
        <label className="text-sm">Description</label>
        <textarea className="w-full rounded-md p-2 border" rows={4} value={desc} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>)=> setDesc(e.target.value)} />
      </div>
      <div className="flex items-center justify-end gap-2">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button className="bg-[#2F9D94]" onClick={()=> onClose()}>Report</Button>
      </div>
    </div>
  );
}
