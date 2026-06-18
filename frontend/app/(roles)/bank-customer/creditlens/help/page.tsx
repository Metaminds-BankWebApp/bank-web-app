"use client";

import { useState, ChangeEvent } from "react";
import ModuleHeader from "@/src/components/ui/module-header";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import PopupModal from "@/src/components/ui/popup-modal";

export type Ticket = { id: string; feature: string; category: string; priority: string; status: string; officer: string; updated: string; subject?: string };

const creditLensPanel =
  "creditlens-card creditlens-card-hover rounded-2xl border border-slate-200/70 bg-white/90 shadow-[0_18px_50px_-35px_rgba(2,44,67,0.35)]";
const creditLensPrimary = "bg-[#14517c] text-white hover:bg-[#103f61]";
const creditLensText = "text-[#0b2447]";

/**
 * Bank-customer CreditLens support page with FAQs, officer contact shortcuts, and ticket creation.
 */
export default function CreditLensCustomerHelp() {
  const [search, setSearch] = useState("");
  const [openTicket, setOpenTicket] = useState(false);
  const [openFraud, setOpenFraud] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>([
    { id: "T-4001", feature: "CreditLens", category: "Profile", priority: "Medium", status: "In Progress", officer: "A. Perera", updated: "2026-02-19" },
  ]);

  return (
    <div className="min-h-screen px-1 pt-2 text-[#0b2447] sm:space-y-5 sm:px-2 lg:min-h-[calc(100dvh-2rem)] lg:px-6 lg:pt-4 xl:px-8 2xl:px-10">
      <ModuleHeader theme="creditlens" menuMode="feature-layout" title="Help & Support" className="mb-6" />

      <main className="mx-auto max-w-6xl p-3 sm:p-6">
        <div className="creditlens-card creditlens-card-hover mb-6 rounded-2xl border border-[#66a8d0]/35 bg-[#14517c] p-8 text-white shadow-[0_24px_44px_-30px_rgba(2,18,33,0.82)] md:rounded-[26px]">
          <h1 className="text-2xl font-semibold text-white">Help & Support</h1>
          <p className="mt-1 text-sm text-white/80">Get answers fast, track your requests, or contact your assigned officer.</p>

          <div className="mt-6">
            <Input placeholder="Search help articles... (e.g., OTP not received, loan eligibility, transaction failed)" value={search} onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} className="h-12 rounded-xl bg-white text-slate-900" />
            <div className="mt-4 flex flex-wrap gap-2">
              {["Transaction failed","OTP not received","Loan eligibility","Credit report issue","Spending insights"].map((c)=> (
                <button key={c} className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm text-white transition hover:bg-white/15">{c}</button>
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
            <div key={c.id} className={`${creditLensPanel} flex flex-col justify-between p-4 transition-shadow hover:shadow-md`}>
              <div>
                <h4 className={`font-semibold ${creditLensText}`}>{c.title}</h4>
                <p className="mt-1 text-sm text-slate-600">{c.desc}</p>
              </div>
              <div className="mt-4">
                <Button className={creditLensPrimary} onClick={() => setOpenTicket(true)}>Go Now</Button>
              </div>
            </div>
          ))}
        </section>

        <FeatureHelp title="CreditLens Help" description="Understand your credit score, readiness and reports." faqs={["Why is my credit score not showing?","What affects my score?","Why is the feature locked?","How to dispute a credit item?","How is readiness calculated?"]} troubleshooterOptions={[{key:'missing','label':'Missing score'},{key:'locked','label':'Feature locked'},{key:'data','label':'Incorrect data'}]} openTicket={() => setOpenTicket(true)} />

        <section className="primecore-table-shell mb-6">
          <div className="border-b border-slate-100 bg-slate-50/50 p-4">
            <h3 className={`text-lg font-semibold ${creditLensText}`}>My Support Requests</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="primecore-data-table w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-slate-500">
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
                  <tr key={t.id} className="border-t border-slate-200 bg-white"><td className="px-2 py-3">{t.id}</td><td>{t.feature}</td><td>{t.category}</td><td>{t.priority}</td><td>{t.status}</td><td>{t.officer}</td><td>{t.updated}</td><td><Button variant="outline">View</Button></td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t border-slate-100 bg-slate-50/50 p-4"><Button className={creditLensPrimary} onClick={() => setOpenTicket(true)}>Create New Support Ticket</Button></div>
        </section>

        <div className={`${creditLensPanel} mb-6 p-6`}>
          <h4 className={`text-lg font-semibold ${creditLensText}`}>Quick Feedback</h4>
          <p className="mt-1 text-sm text-slate-600">Share a rating and short message.</p>
          <div className="mt-3 flex gap-2 items-center">
            {[1,2,3,4,5].map(n=> <button key={n} className="rounded-md border border-slate-200 bg-white px-3 py-1 text-sm font-semibold text-[#14517c] transition hover:bg-slate-50">{n}</button>)}
            <Input placeholder="Short message" className="ml-2 bg-white" />
            <Button className={creditLensPrimary}>Send</Button>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-sky-50/80 p-4">
          <p className="text-sm text-[#0b2447]">PrimeCore will never ask for your OTP or password. If you suspect fraud, report immediately.</p>
          <Button className={creditLensPrimary} onClick={() => setOpenFraud(true)}>Report Fraud</Button>
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

// Renders the feature help content and support actions.
function FeatureHelp({ title, description, faqs, troubleshooterOptions, openTicket }: { title: string; description: string; faqs: string[]; troubleshooterOptions: { key: string; label: string }[]; openTicket: () => void }) {
  const [choice, setChoice] = useState<string | null>(null);
  return (
    <section className={`${creditLensPanel} mb-6 p-6`}>
      <h2 className={`text-xl font-semibold ${creditLensText}`}>{title}</h2>
      <p className="mt-1 text-sm text-slate-600">{description}</p>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          {faqs.map((q:string)=> (
            <details key={q} className="mb-2 rounded-lg border border-slate-200 bg-white p-3"><summary className={`font-medium ${creditLensText}`}>{q}</summary><p className="mt-2 text-sm text-slate-600">Short answer and next steps to resolve the issue.</p></details>
          ))}
        </div>

        <div>
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <h3 className={`font-semibold ${creditLensText}`}>Troubleshooter</h3>
            <p className="mt-1 text-sm text-slate-600">What issue are you facing?</p>
            <div className="mt-3 flex flex-col gap-2">
              {troubleshooterOptions.map((o) => (
                <button key={o.key} onClick={() => setChoice(o.key)} className={`rounded-md border px-3 py-2 text-sm font-medium transition ${choice===o.key? 'border-[#14517c] bg-[#14517c] text-white':'border-slate-200 bg-white text-[#0b2447] hover:bg-slate-50'}`}>{o.label}</button>
              ))}
            </div>
            {choice && (<div className="mt-3 rounded-md bg-sky-50/80 p-3"><ol className="list-inside list-decimal text-sm text-slate-600"><li>Step 1: Check profile and data.</li><li>Step 2: Re-sync or upload missing docs.</li><li>Step 3: Contact support if still unresolved.</li></ol><div className="mt-3"><Button className={creditLensPrimary} onClick={openTicket}>Go Fix It</Button></div></div>)}
          </div>
        </div>
      </div>
    </section>
  );
}

// Renders the customer support ticket form.
function TicketForm({ onClose, onCreate }: { onClose: () => void; onCreate: (t: Ticket) => void }) {
  const [category, setCategory] = useState('Credit Report');
  const [feature, setFeature] = useState('CreditLens');
  const [priority, setPriority] = useState('Medium');
  const [txId, setTxId] = useState('');
  const [loanId, setLoanId] = useState('');
  const [subject, setSubject] = useState('');
  const [desc, setDesc] = useState('');

  // Submits the support form and closes the dialog.
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
        <small className="text-xs text-slate-500">The ticket will be sent to your assigned officer and monitored by admin.</small>
        <div className="flex gap-2"><Button variant="outline" onClick={onClose}>Cancel</Button><Button className={creditLensPrimary} onClick={handleSubmit}>Submit Ticket</Button></div>
      </div>
    </div>
  );
}

// Renders the fraud report form in the help page.
function FraudForm({ onClose }: { onClose: () => void }){
  const [type, setType] = useState('Unauthorized transfer');
  const [desc, setDesc] = useState('');
  // Submits the support form and closes the dialog.
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
      <div className="flex items-center justify-end gap-2"><Button variant="outline" onClick={onClose}>Cancel</Button><Button className={creditLensPrimary} onClick={handleSubmit}>Report</Button></div>
    </div>
  );
}
