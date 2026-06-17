"use client";

import { type ChangeEvent, useState } from "react";
import ModuleHeader from "@/src/components/ui/module-header";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import PopupModal from "@/src/components/ui/popup-modal";

const quickActions = [
  "Add Expense Records",
  "Category Issues",
  "Sync Accounts",
  "Missing Transactions",
  "Dispute Totals",
  "Contact Support",
];

const faqs = [
  "Why are my expenses not appearing?",
  "How are categories calculated?",
  "How to update monthly data?",
  "Why is my total incorrect?",
  "How to merge duplicates?",
];

const troubleshooterOptions = [
  { key: "missing", label: "Missing expenses" },
  { key: "totals", label: "Incorrect totals" },
  { key: "edit", label: "Need to edit records" },
];

export function SpendIqHelpPage() {
  const [search, setSearch] = useState("");
  const [openTicket, setOpenTicket] = useState(false);
  const [openFraud, setOpenFraud] = useState(false);
  const [choice, setChoice] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 p-4 md:p-8">
      <ModuleHeader theme="spendiq" menuMode="feature-layout" title="Help & Support" name="You" role="Customer" className="mb-6" />
      <main className="max-w-6xl mx-auto p-6">
        <div className="rounded-[20px] bg-[#F7F6F2] dark:bg-slate-900 border border-[#BCC5CC] dark:border-slate-700 shadow-sm p-8 mb-6">
          <h1 className="text-2xl font-semibold text-[#063154] dark:text-slate-100">Help & Support</h1>
          <p className="mt-1 text-sm text-[#063154]/80 dark:text-slate-300">Get answers fast, track your requests, or contact support.</p>
          <div className="mt-6">
            <Input
              placeholder="Search help articles... (e.g., missing expenses, category issue, incorrect total)"
              value={search}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setSearch(event.target.value)}
              className="h-12 bg-white dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700 rounded-[12px]"
            />
          </div>
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {quickActions.map((title) => (
            <div key={title} className="rounded-[20px] bg-[#F7F6F2] dark:bg-slate-900 border border-[#BCC5CC] dark:border-slate-700 shadow-sm p-4 hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <h4 className="font-semibold text-[#063154] dark:text-slate-100">{title}</h4>
                <p className="text-sm text-[#063154]/80 dark:text-slate-300 mt-1">Quick action</p>
              </div>
              <div className="mt-4">
                <Button className="bg-[#2F9D94]" onClick={() => setOpenTicket(true)}>Go Now</Button>
              </div>
            </div>
          ))}
        </section>

        <section className="rounded-[20px] bg-[#F7F6F2] dark:bg-slate-900 border border-[#BCC5CC] dark:border-slate-700 shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-[#063154] dark:text-slate-100">SpendIQ Help</h2>
          <p className="text-sm text-[#063154]/80 dark:text-slate-300 mt-1">Track and manage your spending effectively.</p>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              {faqs.map((question) => (
                <details key={question} className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-[#E8E8E8] dark:border-slate-700 mb-2">
                  <summary className="font-medium text-[#063154] dark:text-slate-100">{question}</summary>
                  <p className="mt-2 text-sm text-[#063154]/80 dark:text-slate-300">Review your records, filters, and category setup, then create a ticket if the issue remains.</p>
                </details>
              ))}
            </div>
            <div>
              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-[#E8E8E8] dark:border-slate-700">
                <h3 className="font-semibold text-[#063154] dark:text-slate-100">Troubleshooter</h3>
                <p className="text-sm text-[#063154]/80 dark:text-slate-300 mt-1">What issue are you facing?</p>
                <div className="mt-3 flex flex-col gap-2">
                  {troubleshooterOptions.map((option) => (
                    <button
                      key={option.key}
                      onClick={() => setChoice(option.key)}
                      className={`px-3 py-2 rounded-md ${choice === option.key ? "bg-[#2F9D94] text-white" : "bg-white dark:bg-slate-800 border dark:border-slate-700 dark:text-slate-100"}`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                {choice ? (
                  <div className="mt-3 bg-[#063154]/5 dark:bg-slate-900 p-3 rounded-md">
                    <ol className="list-decimal list-inside text-sm text-[#063154]/80 dark:text-slate-300">
                      <li>Check this month&apos;s date filters.</li>
                      <li>Review manually added entries and categories.</li>
                      <li>Create a support ticket if totals still look wrong.</li>
                    </ol>
                    <div className="mt-3">
                      <Button className="bg-[#2F9D94]" onClick={() => setOpenTicket(true)}>Create Support Ticket</Button>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        <div className="rounded-[20px] bg-[#F7F6F2] dark:bg-slate-900 border border-[#BCC5CC] dark:border-slate-700 shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-[#063154] dark:text-slate-100">My Support Requests</h3>
          <p className="mt-3 text-sm text-[#063154]/80 dark:text-slate-300">No recent tickets</p>
          <div className="mt-4">
            <Button className="bg-[#2F9D94]" onClick={() => setOpenTicket(true)}>Create New Support Ticket</Button>
          </div>
        </div>

        <section className="rounded-[20px] bg-[#F7F6F2] dark:bg-slate-900 border border-[#BCC5CC] dark:border-slate-700 shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-[#063154] dark:text-slate-100">Quick Feedback</h3>
          <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-center">
            <div className="flex gap-2">{[1, 2, 3, 4, 5].map((rating) => <button key={rating} className="px-3 py-1 bg-white dark:bg-slate-800 dark:text-slate-100 rounded-md">{rating}★</button>)}</div>
            <Input placeholder="Short message" className="bg-white dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700" />
            <Button className="bg-[#2F9D94]">Send</Button>
          </div>
        </section>

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between bg-[#063154]/5 dark:bg-slate-900 p-4 rounded-[12px]">
          <p className="text-sm text-[#063154]/90 dark:text-slate-200">PrimeCore will never ask for your OTP or password. If you suspect fraud, report immediately.</p>
          <Button className="bg-[#2F9D94]" onClick={() => setOpenFraud(true)}>Report Fraud</Button>
        </div>

        <PopupModal open={openTicket} onOpenChange={setOpenTicket} title="Create Support Ticket">
          <TicketForm onClose={() => setOpenTicket(false)} />
        </PopupModal>
        <PopupModal open={openFraud} onOpenChange={setOpenFraud} title="Report Fraud">
          <FraudForm onClose={() => setOpenFraud(false)} />
        </PopupModal>
      </main>
    </div>
  );
}

function TicketForm({ onClose }: { onClose: () => void }) {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="space-y-3">
      <Input placeholder="Subject" value={subject} onChange={(event: ChangeEvent<HTMLInputElement>) => setSubject(event.target.value)} />
      <div>
        <label className="text-sm">Description</label>
        <textarea className="w-full rounded-md p-2 border dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700" rows={4} value={description} onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setDescription(event.target.value)} />
      </div>
      <div className="flex items-center justify-between">
        <small className="text-xs text-[#063154]/80 dark:text-slate-300">Your request will be reviewed by support.</small>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button className="bg-[#2F9D94]" onClick={onClose}>Submit Ticket</Button>
        </div>
      </div>
    </div>
  );
}

function FraudForm({ onClose }: { onClose: () => void }) {
  const [type, setType] = useState("Unauthorized transfer");
  const [description, setDescription] = useState("");

  return (
    <div className="space-y-3">
      <label className="text-sm">Incident Type</label>
      <select className="w-full rounded-md p-2 border dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700" value={type} onChange={(event: ChangeEvent<HTMLSelectElement>) => setType(event.target.value)}>
        <option>Unauthorized transfer</option>
        <option>Suspected phishing</option>
        <option>Account takeover</option>
      </select>
      <div>
        <label className="text-sm">Description</label>
        <textarea className="w-full rounded-md p-2 border dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700" rows={4} value={description} onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setDescription(event.target.value)} />
      </div>
      <div className="flex items-center justify-end gap-2">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button className="bg-[#2F9D94]" onClick={onClose}>Report</Button>
      </div>
    </div>
  );
}
