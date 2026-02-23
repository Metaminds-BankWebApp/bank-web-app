"use client";

import { useState } from "react";
import ModuleHeader from "@/src/components/ui/module-header";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Dialog } from "@/src/components/ui/dialog";

export default function LoanSenseCustomerHelp(){
  const [search,setSearch]=useState('');
  const [openTicket,setOpenTicket]=useState(false);
  const [openFraud,setOpenFraud]=useState(false);

  return (
    <div className="min-h-screen bg-[#063154]">
      <ModuleHeader theme="loansense" menuMode="feature-layout" title="Help & Support 👋" name="You" role="Bank Customer" className="mb-6" />
      <main className="max-w-6xl mx-auto p-6">
        <div className="rounded-[20px] bg-[#F7F6F2] border border-[#BCC5CC] shadow-sm p-8 mb-6">
          <h1 className="text-2xl font-semibold text-[#063154]">Help & Support 👋</h1>
          <p className="mt-1 text-sm text-[#063154]/80">Get answers fast, track your requests, or contact your assigned officer.</p>
          <div className="mt-6"><Input placeholder="Search help articles… (e.g., OTP not received, loan eligibility, transaction failed)" value={search} onChange={(e)=>setSearch(e.target.value)} className="h-12 bg-white rounded-[12px]" /></div>
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {["Loan eligibility","Missing documents","EMI calculator","Application status","Request officer review","Contact officer"].map((t)=> (
            <div key={t} className="rounded-[20px] bg-[#F7F6F2] border border-[#BCC5CC] shadow-sm p-4 hover:shadow-md transition-shadow flex flex-col justify-between"><div><h4 className="font-semibold text-[#063154]">{t}</h4><p className="text-sm text-[#063154]/80 mt-1">Quick action</p></div><div className="mt-4"><Button className="bg-[#2F9D94]" onClick={()=> setOpenTicket(true)}>Go Now</Button></div></div>
          ))}
        </section>

        <FeatureHelp title="LoanSense Help" description="Manage loan applications, compute EMIs and track status." faqs={["How is eligibility calculated?","What documents are missing?","How to calculate EMI?","How to check application status?","How long for officer review?"]} troubleshooterOptions={[{key:'elig',label:'Eligibility issues'},{key:'docs',label:'Missing documents'},{key:'emi',label:'EMI calculation'},{key:'status',label:'Application status'}]} openTicket={()=> setOpenTicket(true)} includeLoanInput />

        <div className="rounded-[20px] bg-[#F7F6F2] border border-[#BCC5CC] shadow-sm p-6 mb-6"><h3 className="text-lg font-semibold text-[#063154]">My Support Requests</h3><div className="mt-3">{/* simplified list UI */}<p className="text-sm text-[#063154]/80">No recent tickets</p></div><div className="mt-4"><Button className="bg-[#2F9D94]" onClick={()=> setOpenTicket(true)}>Create New Support Ticket</Button></div></div>

        <section className="rounded-[20px] bg-[#F7F6F2] border border-[#BCC5CC] shadow-sm p-6 mb-24"><h3 className="text-lg font-semibold text-[#063154]">Quick Feedback</h3><div className="mt-3 flex items-center gap-2">{[1,2,3,4,5].map(n=> <button key={n} className="px-3 py-1 bg-white rounded-md">{n}★</button>)}<Input placeholder="Short message" className="ml-2 bg-white" /><Button className="bg-[#2F9D94]">Send</Button></div></section>

        <div className="flex items-center justify-between bg-[#063154]/5 p-4 rounded-[12px]"><p className="text-sm text-[#063154]/90">PrimeCore will never ask for your OTP or password. If you suspect fraud, report immediately.</p><Button className="bg-[#2F9D94]" onClick={()=> setOpenFraud(true)}>Report Fraud</Button></div>

        <Dialog open={openTicket} onOpenChange={setOpenTicket} title="Create Support Ticket"><TicketForm onClose={()=> setOpenTicket(false)} onCreate={()=>{ setOpenTicket(false);}} /></Dialog>
        <Dialog open={openFraud} onOpenChange={setOpenFraud} title="Report Fraud"><FraudForm onClose={()=> setOpenFraud(false)} /></Dialog>
      </main>
    </div>
  );
}

import { useState as useState2 } from "react";
function FeatureHelp({ title, description, faqs, troubleshooterOptions, openTicket, includeLoanInput }: any){
  const [choice,setChoice]=useState2<string | null>(null);
  const [loanId,setLoanId]=useState2('');
  return (
    <section className="rounded-[20px] bg-[#F7F6F2] border border-[#BCC5CC] shadow-sm p-6 mb-6">
      <h2 className="text-xl font-semibold text-[#063154]">{title}</h2>
      <p className="text-sm text-[#063154]/80 mt-1">{description}</p>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>{faqs.map((q:string)=> <details key={q} className="bg-white p-3 rounded-lg border border-[#E8E8E8] mb-2"><summary className="font-medium text-[#063154]">{q}</summary><p className="mt-2 text-sm text-[#063154]/80">Short answer and next steps.</p></details>)}</div>
        <div><div className="bg-white p-4 rounded-lg border border-[#E8E8E8]"><h3 className="font-semibold text-[#063154]">Troubleshooter</h3><p className="text-sm text-[#063154]/80 mt-1">What issue are you facing?</p><div className="mt-3 flex flex-col gap-2">{troubleshooterOptions.map((o:any)=> <button key={o.key} onClick={()=> setChoice(o.key)} className={`px-3 py-2 rounded-md ${choice===o.key? 'bg-[#2F9D94] text-white':'bg-white border'}`}>{o.label}</button>)}</div>{includeLoanInput && choice && (<div className="mt-3"><input placeholder="Loan/Application ID" className="w-full p-2 rounded-md border mb-2" value={loanId} onChange={(e)=> setLoanId(e.target.value)} /><div className="flex justify-end"><Button className="bg-[#2F9D94]" onClick={openTicket}>Request Officer Review</Button></div></div>)}{!includeLoanInput && choice && (<div className="mt-3 bg-[#063154]/5 p-3 rounded-md"><ol className="list-decimal list-inside text-sm text-[#063154]/80"><li>Step 1</li><li>Step 2</li><li>Step 3</li></ol><div className="mt-3"><Button className="bg-[#2F9D94]" onClick={openTicket}>Go Fix It</Button></div></div>)}</div></div>
      </div>
    </section>
  );
}

function TicketForm({ onClose, onCreate }: any){
  const [subject,setSubject]=useState('');
  const [desc,setDesc]=useState('');
  const handle=()=>{ onCreate(); onClose(); };
  return (<div className="space-y-3"><Input placeholder="Subject" value={subject} onChange={(e:any)=> setSubject(e.target.value)} /><div><label className="text-sm">Description</label><textarea className="w-full rounded-md p-2 border" rows={4} value={desc} onChange={(e)=> setDesc(e.target.value)} /></div><div className="flex items-center justify-between"><small className="text-xs text-[#063154]/80">Your ticket will be sent to your assigned officer.</small><div className="flex gap-2"><Button variant="outline" onClick={onClose}>Cancel</Button><Button className="bg-[#2F9D94]" onClick={handle}>Submit Ticket</Button></div></div></div>);
}

function FraudForm({ onClose }: any){
  const [type,setType]=useState('Unauthorized transfer');
  const [desc,setDesc]=useState('');
  return (<div className="space-y-3"><label className="text-sm">Incident Type</label><select className="w-full rounded-md p-2 border" value={type} onChange={(e)=> setType(e.target.value)}><option>Unauthorized transfer</option><option>Suspected phishing</option><option>Account takeover</option></select><div><label className="text-sm">Description</label><textarea className="w-full rounded-md p-2 border" rows={4} value={desc} onChange={(e)=> setDesc(e.target.value)} /></div><div className="flex items-center justify-end gap-2"><Button variant="outline" onClick={onClose}>Cancel</Button><Button className="bg-[#2F9D94]" onClick={()=> onClose()}>Report</Button></div></div>);
}
