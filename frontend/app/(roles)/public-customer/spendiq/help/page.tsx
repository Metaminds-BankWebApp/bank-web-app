"use client";

import { useState } from "react";
import ModuleHeader from "@/src/components/ui/module-header";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import PopupModal from "@/src/components/ui/popup-modal";

export default function SpendIQHelpPage() {
  const [search, setSearch] = useState("");
  const [troubleshooter, setTroubleshooter] = useState<string | null>(null);
  const [openSupport, setOpenSupport] = useState(false);

  return (
    <div className="min-h-screen bg-[#ffff] p-4 md:p-8">
      <ModuleHeader theme="spendiq" menuMode="feature-layout" title="Help & Support" name="Guest" role="Public" className="mb-6" />

      <main className="max-w-6xl mx-auto p-6 ">
        <div className="rounded-[20px] bg-[#a2b9cc86] border border-[#BCC5CC] shadow-md p-8 mb-6">
          <h1 className="text-2xl font-semibold text-[#063154]">Help & Support</h1>
          <p className="mt-1 text-sm text-[#063154]/80">Find answers, fix issues, or contact our support team.</p>

          <div className="mt-6">
            <Input placeholder="Search help articles… (e.g., Why are my expenses not appearing?)" value={search} onChange={(e) => setSearch(e.target.value)} className="h-12 bg-white rounded-[12px]" />
            <div className="mt-4 flex gap-3">
              {[
                "Complete Profile Setup",
                "Improve CreditLens Readiness",
                "Fix SpendIQ Data Issues",
              ].map((s) => (
                <button key={s} className="rounded-full bg-[#063154]/10 px-4 py-2 text-sm text-[#063154]">{s}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {[
            { id: "expenses", title: "Add Expense Records", desc: "Add receipts and transactions to track spending." },
            { id: "categories", title: "How Categories Work", desc: "Improve categorization for better insights." },
            { id: "sync", title: "Sync Bank Accounts", desc: "Connect accounts to import transactions." },
            { id: "verify", title: "Check Data Accuracy", desc: "Resolve mismatches or duplicates." },
          ].map((c) => (
            <div key={c.id} className="rounded-[20px] bg-[#F7F6F2] border border-[#BCC5CC] shadow-sm p-4 hover:shadow-md transition-shadow flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-[#063154]">{c.title}</h3>
                <p className="text-sm text-[#063154]/80 mt-1">{c.desc}</p>
              </div>
              <Button className="bg-[#2F9D94]" onClick={() => document.getElementById(c.id)?.scrollIntoView({ behavior: "smooth" })}>Go Now</Button>
            </div>
          ))}
        </div>

        <section id="spendiq-help" className="rounded-[20px] bg-[#a2b9cc86] border border-[#BCC5CC] shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-[#063154]">SpendIQ Help</h2>
          <p className="text-sm text-[#063154]/80 mt-1">Track and manage your spending effectively.</p>

          <div className="mt-4 space-y-3">
            {[
              { q: "Why are my expenses not appearing?", a: "Transactions may take time to import; ensure account is connected and sync is enabled." },
              { q: "How are categories calculated?", a: "Categories are inferred from transaction description and merchant data; you can edit them." },
              { q: "How do I update monthly data?", a: "Upload CSV or connect your account to re-import latest transactions." },
              { q: "Why is my total incorrect?", a: "Check for duplicate transactions or missing reconciliations." },
            ].map((f) => (
              <details key={f.q} className="bg-white p-3 rounded-lg border border-[#E8E8E8]">
                <summary className="cursor-pointer font-medium text-[#063154]">{f.q}</summary>
                <p className="mt-2 text-sm text-[#063154]/80">{f.a}</p>
              </details>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="col-span-2">
              <div className="bg-white rounded-lg p-4 border border-[#E8E8E8]">
                <h3 className="font-semibold text-[#063154]">Troubleshooter</h3>
                <p className="text-sm text-[#063154]/80 mt-1">Choose an option to get step-by-step help.</p>

                <div className="mt-3 flex gap-2">
                  {[
                    { key: "missing", label: "Missing expenses" },
                    { key: "totals", label: "Incorrect totals" },
                    { key: "edit", label: "Need to edit records" },
                  ].map((opt) => (
                    <button key={opt.key} onClick={() => setTroubleshooter(opt.key)} className={`px-3 py-2 rounded-md border ${troubleshooter === opt.key ? "bg-[#2F9D94] text-white" : "bg-white"}`}>
                      {opt.label}
                    </button>
                  ))}
                </div>

                {troubleshooter && (
                  <div className="mt-4 bg-[#063154]/5 p-3 rounded-md">
                    <p className="font-semibold text-[#063154]">Steps to resolve</p>
                    <ol className="mt-2 text-sm text-[#063154]/80 list-decimal list-inside">
                      <li>Ensure your bank connection is active and synced.</li>
                      <li>Upload missing files or add manual entries.</li>
                      <li>Review category rules and merge duplicates.</li>
                    </ol>
                    <div className="mt-3">
                      <Button className="bg-[#2F9D94]" onClick={() => document.getElementById("expenses")?.scrollIntoView({ behavior: "smooth" })}>Add / Edit Expenses</Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="rounded-[12px] bg-white border border-[#E8E8E8] p-4">
                <h4 className="font-semibold text-[#063154]">Need more help?</h4>
                <p className="text-sm text-[#063154]/80 mt-2">Create a support request and our team will review it.</p>
                <div className="mt-3">
                  <Button className="bg-[#2F9D94]" onClick={() => setOpenSupport(true)}>Create Request</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="expenses" className="mb-6 text-[#063154]">
          <h3 className="text-lg font-semibold">Add Expense Records</h3>
          <p className="text-sm mt-1">Upload receipts or manual entries to ensure SpendIQ captures everything.</p>
        </section>

        <section id="categories" className="mb-6 text-[#063154]">
          <h3 className="text-lg font-semibold">How Categories Work</h3>
          <p className="text-sm mt-1">Categories are assigned automatically; edit any item if it’s wrong.</p>
        </section>

        <section className="rounded-[20px] bg-[#a2b9cc86] border border-[#BCC5CC] shadow-sm p-6 mb-24">
          <h3 className="text-lg font-semibold text-[#063154]">Share Your Feedback</h3>
          <p className="text-sm text-[#063154]/80 mt-1">Your feedback helps us improve PrimeCore.</p>
          <div className="mt-4 flex gap-2">
            <Input placeholder="Short message" className="bg-white" />
            <Button className="bg-[#2F9D94]">Send Feedback</Button>
          </div>
        </section>

        <PopupModal open={openSupport} onOpenChange={setOpenSupport} title="Create Support Request">
          <SupportForm onClose={() => setOpenSupport(false)} onCreate={() => { setOpenSupport(false); }} />
        </PopupModal>
      </main>
    </div>
  );
}

function SupportForm({ onClose, onCreate }: { onClose: () => void; onCreate: () => void }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = () => {
    // UI-only routing: would post to Admin queue in production
    onCreate();
    onClose();
  };

  return (
    <div className="space-y-3">
      <label className="text-sm">Issue Type</label>
      <select className="w-full rounded-md p-2 border">
        <option>Profile Issue</option>
        <option>CreditLens</option>
        <option>SpendIQ</option>
        <option>Verification</option>
        <option>Other</option>
      </select>

      <Input placeholder="Short title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <div>
        <label className="text-sm">Description</label>
        <textarea className="w-full rounded-md p-2 border" rows={4} value={desc} onChange={(e) => setDesc(e.target.value)} />
      </div>

      <div className="flex items-center justify-between">
        <small className="text-xs text-[#063154]/80">Your request will be reviewed by our support team.</small>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button className="bg-[#2F9D94]" onClick={handleSubmit}>Send Request</Button>
        </div>
      </div>
    </div>
  );
}
