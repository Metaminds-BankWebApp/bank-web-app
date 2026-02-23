"use client";

import { useState, ChangeEvent } from "react";
import ModuleHeader from "@/src/components/ui/module-header";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import PopupModal from "@/src/components/ui/popup-modal";

export type Ticket = { id: string; feature: string; category: string; priority: string; status: string; officer: string; updated: string; subject?: string };

export default function CreditLensCustomerHelp() {
  const [search, setSearch] = useState("");
  const [openTicket, setOpenTicket] = useState(false);
  const [openFraud, setOpenFraud] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>([
    { id: "T-4001", feature: "CreditLens", category: "Profile", priority: "Medium", status: "In Progress", officer: "A. Perera", updated: "2026-02-19" },
  ]);

  return (
    <div className="min-h-screen bg-[#ffffff] px-1 pt-2 sm:space-y-5 sm:px-2 lg:min-h-[calc(100dvh-2rem)] lg:px-6 lg:pt-4 xl:px-8 2xl:px-10">
      <ModuleHeader theme="creditlens" menuMode="feature-layout" title="Help & Support" name="You" role="Bank Customer" className="mb-6" />

      <main className="max-w-6xl mx-auto p-6">
        <div className="rounded-[20px] bg-[#F7F6F2] border border-[#BCC5CC] shadow-sm p-8 mb-6">
          <h1 className="text-2xl font-semibold text-[#063154]">Help & Support</h1>
          <p className="mt-1 text-sm text-[#063154]/80">Get answers fast, track your requests, or contact your assigned officer.</p>

          <div className="mt-6">
            <Input placeholder="Search help articles… (e.g., OTP not received, loan eligibility, transaction failed)" value={search} onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} className="h-12 bg-white rounded-[12px]" />
            <div className="mt-4 flex flex-wrap gap-2">
              {["Transaction failed","OTP not received","Loan eligibility","Credit report issue","Spending insights"].map((c)=> (
                <button key={c} className="px-3 py-1 rounded-full bg-[#063154]/8 text-[#063154] text-sm">{c}</button>
              ))}
            </div>
          </div>
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {[
            { id: "r1", title: "Report Transaction Issue", desc: "Report a failed or suspicious transaction." },
            { id: "r2", title: "Loan Application Help", desc: "Questions about loan eligibility and docs." },
            { id: "r3", title: "Dispute Credit Report Entry", desc: "Flag incorrect items on your credit report." },
            { id: "r4", title: "Update Verified Income", desc: "Refresh your income records for better scores." },
            { id: "r5", title: "Security & Fraud Help", desc: "Report fraud or secure your account." },
            { id: "r6", title: "Contact Assigned Officer", desc: "Message your relationship officer directly." },
          ].map((c)=> (
            <div key={c.id} className="rounded-[20px] bg-[#F7F6F2] border border-[#BCC5CC] shadow-sm p-4 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <h4 className="font-semibold text-[#063154]">{c.title}</h4>
                <p className="text-sm text-[#063154]/80 mt-1">{c.desc}</p>
              </div>
              <div className="mt-4">
                <Button className="bg-[#2F9D94]" onClick={() => setOpenTicket(true)}>Go Now</Button>
              </div>
            </div>
          ))}
        </section>

        <FeatureHelp title="CreditLens Help" description="Understand your credit score, readiness and reports." faqs={["Why is my credit score not showing?","What affects my score?","Why is the feature locked?","How to dispute a credit item?","How is readiness calculated?"]} troubleshooterOptions={[{key:'missing','label':'Missing score'},{key:'locked','label':'Feature locked'},{key:'data','label':'Incorrect data'}]} openTicket={() => setOpenTicket(true)} />

        <section className="rounded-[20px] bg-[#F7F6F2] border border-[#BCC5CC] shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-[#063154]">My Support Requests</h3>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-[#063154]/80">
                  <th className="px-2 py-2">Ticket</th>
                  <th>Feature</th>
                  <th>Category</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Officer</th>
                  <th>Updated</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((t: Ticket) => (
                  <tr key={t.id} className="bg-white border-t border-[#E8E8E8]"><td className="px-2 py-3">{t.id}</td><td>{t.feature}</td><td>{t.category}</td><td>{t.priority}</td><td>{t.status}</td><td>{t.officer}</td><td>{t.updated}</td><td><Button variant="outline">View</Button></td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4"><Button className="bg-[#2F9D94]" onClick={() => setOpenTicket(true)}>Create New Support Ticket</Button></div>
        </section>

        <div className="rounded-[20px] bg-[#F7F6F2] border border-[#BCC5CC] shadow-sm p-6 mb-6">
          <h4 className="text-lg font-semibold text-[#063154]">Quick Feedback</h4>
          <p className="text-sm text-[#063154]/80 mt-1">Share a rating and short message.</p>
          <div className="mt-3 flex gap-2 items-center">
            {[1,2,3,4,5].map(n=> <button key={n} className="px-3 py-1 bg-white rounded-md">{n}★</button>)}
            <Input placeholder="Short message" className="ml-2 bg-white" />
            <Button className="bg-[#2F9D94]">Send</Button>
          </div>
        </div>

        <div className="flex items-center justify-between bg-[#063154]/5 p-4 rounded-[12px]">
          <p className="text-sm text-[#063154]/90">PrimeCore will never ask for your OTP or password. If you suspect fraud, report immediately.</p>
          <Button className="bg-[#2F9D94]" onClick={() => setOpenFraud(true)}>Report Fraud</Button>
        </div>

        <PopupModal open={openTicket} onOpenChange={setOpenTicket} title="Create Support Ticket">
          <TicketForm onClose={() => setOpenTicket(false)} onCreate={(t: Ticket) => setTickets(prev => [t, ...prev])} />
        </PopupModal>

        <PopupModal open={openFraud} onOpenChange={setOpenFraud} title="Report Fraud">
          <FraudForm onClose={() => setOpenFraud(false)} />
        </PopupModal>
      </main>
    </div>
  );
}

function FeatureHelp({ title, description, faqs, troubleshooterOptions, openTicket }: { title: string; description: string; faqs: string[]; troubleshooterOptions: { key: string; label: string }[]; openTicket: () => void }) {
  const [active, setActive] = useState<string | null>(null);
  const [choice, setChoice] = useState<string | null>(null);
  return (
    <section className="rounded-[20px] bg-[#F7F6F2] border border-[#BCC5CC] shadow-sm p-6 mb-6">
      <h2 className="text-xl font-semibold text-[#063154]">{title}</h2>
      <p className="text-sm text-[#063154]/80 mt-1">{description}</p>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          {faqs.map((q:string)=> (
            <details key={q} className="bg-white p-3 rounded-lg border border-[#E8E8E8] mb-2"><summary className="font-medium text-[#063154]">{q}</summary><p className="mt-2 text-sm text-[#063154]/80">Short answer and next steps to resolve the issue.</p></details>
          ))}
        </div>

        <div>
          <div className="bg-white p-4 rounded-lg border border-[#E8E8E8]">
            <h3 className="font-semibold text-[#063154]">Troubleshooter</h3>
            <p className="text-sm text-[#063154]/80 mt-1">What issue are you facing?</p>
            <div className="mt-3 flex flex-col gap-2">
              {troubleshooterOptions.map((o) => (
                <button key={o.key} onClick={() => setChoice(o.key)} className={`px-3 py-2 rounded-md ${choice===o.key? 'bg-[#2F9D94] text-white':'bg-white border'}`}>{o.label}</button>
              ))}
            </div>
            {choice && (<div className="mt-3 bg-[#063154]/5 p-3 rounded-md"><ol className="list-decimal list-inside text-sm text-[#063154]/80"><li>Step 1: Check profile and data.</li><li>Step 2: Re-sync or upload missing docs.</li><li>Step 3: Contact support if still unresolved.</li></ol><div className="mt-3"><Button className="bg-[#2F9D94]" onClick={openTicket}>Go Fix It</Button></div></div>)}
          </div>
        </div>
      </div>
    </section>
  );
}

function TicketForm({ onClose, onCreate }: { onClose: () => void; onCreate: (t: Ticket) => void }) {
  const [category, setCategory] = useState('Credit Report');
  const [feature, setFeature] = useState('CreditLens');
  const [priority, setPriority] = useState('Medium');
  const [txId, setTxId] = useState('');
  const [loanId, setLoanId] = useState('');
  const [subject, setSubject] = useState('');
  const [desc, setDesc] = useState('');

  const handleSubmit = () => {
    const ticket = { id: `T-${Math.floor(1000+Math.random()*9000)}`, feature, category, priority, status: 'Open', officer: 'Assigned Officer', updated: new Date().toISOString().slice(0,10), subject };
    onCreate(ticket);
    onClose();
  };

  return (
    <div className="space-y-3">
      <label className="text-sm">Issue Category</label>
      <select className="w-full rounded-md p-2 border" value={category} onChange={(e: ChangeEvent<HTMLSelectElement>)=> setCategory(e.target.value)}>
        <option>Transactions</option>
        <option>Loans</option>
        <option>Credit Report</option>
        <option>SpendIQ</option>
        <option>Account</option>
        <option>Security</option>
      </select>

      <label className="text-sm">Related Feature</label>
      <select className="w-full rounded-md p-2 border" value={feature} onChange={(e: ChangeEvent<HTMLSelectElement>)=> setFeature(e.target.value)}>
        <option>CreditLens</option>
        <option>SpendIQ</option>
        <option>LoanSense</option>
        <option>Transact</option>
      </select>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <select className="rounded-md p-2 border" value={priority} onChange={(e: ChangeEvent<HTMLSelectElement>)=> setPriority(e.target.value)}><option>Low</option><option>Medium</option><option>High</option></select>
        <input placeholder="Transaction ID (optional)" className="rounded-md p-2 border" value={txId} onChange={(e: ChangeEvent<HTMLInputElement>)=> setTxId(e.target.value)} />
        <input placeholder="Loan/Application ID (optional)" className="rounded-md p-2 border" value={loanId} onChange={(e: ChangeEvent<HTMLInputElement>)=> setLoanId(e.target.value)} />
      </div>

      <Input placeholder="Subject" value={subject} onChange={(e: ChangeEvent<HTMLInputElement>)=> setSubject(e.target.value)} />
      <div>
        <label className="text-sm">Description</label>
        <textarea className="w-full rounded-md p-2 border" rows={4} value={desc} onChange={(e: ChangeEvent<HTMLTextAreaElement>)=> setDesc(e.target.value)} />
      </div>

      <div className="flex items-center justify-between">
        <small className="text-xs text-[#063154]/80">The ticket will be sent to your assigned officer and monitored by admin.</small>
        <div className="flex gap-2"><Button variant="outline" onClick={onClose}>Cancel</Button><Button className="bg-[#2F9D94]" onClick={handleSubmit}>Submit Ticket</Button></div>
      </div>
    </div>
  );
}

function FraudForm({ onClose }: { onClose: () => void }){
  const [type, setType] = useState('Unauthorized transfer');
  const [desc, setDesc] = useState('');
  const handleSubmit = () => { onClose(); };
  return (
    <div className="space-y-3">
      <label className="text-sm">Incident Type</label>
      <select className="w-full rounded-md p-2 border" value={type} onChange={(e: ChangeEvent<HTMLSelectElement>)=> setType(e.target.value)}>
        <option>Unauthorized transfer</option>
        <option>Suspected phishing</option>
        <option>Account takeover</option>
      </select>
      <div>
        <label className="text-sm">Description</label>
        <textarea className="w-full rounded-md p-2 border" rows={4} value={desc} onChange={(e: ChangeEvent<HTMLTextAreaElement>)=> setDesc(e.target.value)} />
      </div>
      <div className="flex items-center justify-end gap-2"><Button variant="outline" onClick={onClose}>Cancel</Button><Button className="bg-[#2F9D94]" onClick={handleSubmit}>Report</Button></div>
    </div>
  );
}
