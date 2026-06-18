"use client";

import { useState, ChangeEvent } from "react";
import ModuleHeader from "@/src/components/ui/module-header";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import PopupModal from "@/src/components/ui/popup-modal";

export type Ticket = { id: string; summary: string; status: string; updated: string };

const creditLensPanel =
  "creditlens-card creditlens-card-hover rounded-2xl border border-slate-200/70 bg-white/90 shadow-[0_18px_50px_-35px_rgba(2,44,67,0.35)]";
const creditLensPrimary = "bg-[#14517c] text-white hover:bg-[#103f61]";
const creditLensText = "text-[#0b2447]";

/**
 * Public-customer CreditLens support page with FAQs, quick actions, and lightweight ticket creation.
 */
export default function CreditLensHelpPage() {
  const [search, setSearch] = useState("");
  const [troubleshooter, setTroubleshooter] = useState<string | null>(null);
  const [openSupport, setOpenSupport] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>(() => [
    { id: "T-1001", summary: "Unable to generate score", status: "Open", updated: "2026-02-20" },
  ]);

  return (
    <div className="min-h-screen px-1 pt-2 text-[#0b2447] sm:px-2 lg:px-6 lg:pt-4 xl:px-8 2xl:px-10">
      <ModuleHeader theme="creditlens" menuMode="feature-layout" title="Help & Support" className="mb-6" />

      <main className="mx-auto max-w-6xl p-3 sm:p-6">
        {/* Hero */}
        <div className="creditlens-card creditlens-card-hover mb-6 rounded-2xl border border-[#66a8d0]/35 bg-[#14517c] p-8 text-white shadow-[0_24px_44px_-30px_rgba(2,18,33,0.82)] md:rounded-[26px]">
          <h1 className="text-2xl font-semibold text-white">Help & Support</h1>
          <p className="mt-1 text-sm text-white/80">Find answers, fix issues, or contact our support team.</p>

          <div className="mt-6">
            <Input
              label={undefined}
              placeholder="Search help articles... (e.g., Why is my CreditLens locked?)"
              className="h-12 rounded-xl bg-white text-slate-900"
              value={search}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            />
            <div className="mt-4 flex gap-3">
              {[
                "Complete Profile Setup",
                "Improve CreditLens Readiness",
                "Fix SpendIQ Data Issues",
              ].map((s) => (
                <button key={s} className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/15">{s}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {[
            { id: "profile", title: "Complete Profile Details", desc: "Add your personal details to unlock features." },
            { id: "income", title: "Add Income Information", desc: "Provide income to improve readiness." },
            { id: "expenses", title: "Add Expense Records (SpendIQ)", desc: "Sync expenses for better insights." },
            { id: "verify", title: "Check Verification Status", desc: "See what's pending to finish verification." },
          ].map((c) => (
            <div key={c.id} className={`${creditLensPanel} flex items-center justify-between p-4 transition-shadow hover:shadow-md`}>
              <div>
                <h3 className={`font-semibold ${creditLensText}`}>{c.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{c.desc}</p>
              </div>
              <div>
                <Button className={creditLensPrimary} onClick={() => document.getElementById(c.id)?.scrollIntoView({ behavior: "smooth" })}>Go Now</Button>
              </div>
            </div>
          ))}
        </div>

        {/* CreditLens Help Section */}
        <section id="creditlens-help" className={`${creditLensPanel} mb-6 p-6`}>
          <h2 className={`text-xl font-semibold ${creditLensText}`}>CreditLens Help</h2>
          <p className="mt-1 text-sm text-slate-600">Understand your credit score and unlock your financial insights.</p>

          <div className="mt-4 space-y-3">
            {/* Accordion using details */}
            {[
              { q: "Why is my credit score not showing?", a: "Scores require completed profile and recent income data. Allow up to 24 hours after updating." },
              { q: "What affects my score?", a: "Payment history, credit utilization, income stability and active liabilities." },
              { q: "Why is the feature partially locked?", a: "Certain data points are missing; complete profile or add required documents." },
              { q: "How is readiness calculated?", a: "Readiness aggregates completeness of key fields and data freshness into a percentage." },
            ].map((f) => (
              <details key={f.q} className="rounded-lg border border-slate-200 bg-white p-3">
                <summary className={`cursor-pointer font-medium ${creditLensText}`}>{f.q}</summary>
                <p className="mt-2 text-sm text-slate-600">{f.a}</p>
              </details>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="col-span-2">
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <h3 className={`font-semibold ${creditLensText}`}>Troubleshooter</h3>
                <p className="mt-1 text-sm text-slate-600">What issue are you facing?</p>

                <div className="mt-3 flex gap-2">
                  {[
                    { key: "score", label: "Score not generated" },
                    { key: "locked", label: "Feature locked" },
                    { key: "data", label: "Data seems incorrect" },
                  ].map((opt) => (
                    <button key={opt.key} onClick={() => setTroubleshooter(opt.key)} className={`rounded-md border px-3 py-2 text-sm font-medium transition ${troubleshooter === opt.key ? "border-[#14517c] bg-[#14517c] text-white" : "border-slate-200 bg-white text-[#0b2447] hover:bg-slate-50"}`}>
                      {opt.label}
                    </button>
                  ))}

                </div>

                {troubleshooter && (
                  <div className="mt-4 rounded-md bg-sky-50/80 p-3">
                    <p className={`font-semibold ${creditLensText}`}>Steps to resolve</p>
                    <ol className="mt-2 list-inside list-decimal text-sm text-slate-600">
                      <li>Check that your profile is complete.</li>
                      <li>Ensure income and liabilities are up to date.</li>
                      <li>Re-run data sync from SpendIQ or upload missing documents.</li>
                    </ol>
                    <div className="mt-3">
                      <Button className={creditLensPrimary} onClick={() => document.getElementById("profile")?.scrollIntoView({ behavior: "smooth" })}>Complete Required Data</Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <h4 className={`font-semibold ${creditLensText}`}>Need more help?</h4>
                <p className="mt-2 text-sm text-slate-600">Create a support request and our team will review it.</p>
                <div className="mt-3">
                  <Button className={creditLensPrimary} onClick={() => setOpenSupport(true)}>Create Request</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={`${creditLensPanel} mb-6 p-6`}>
          <h3 className={`text-lg font-semibold ${creditLensText}`}>Required Data Checklist</h3>
          <p className="mt-1 text-sm text-slate-600">Use these checkpoints to complete the details CreditLens needs.</p>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              { id: "profile", title: "Complete Profile Details", desc: "Add your full name, address, and ID details." },
              { id: "income", title: "Add Income Information", desc: "Provide salary or business income for score calculations." },
              { id: "expenses", title: "Add Expense Records", desc: "Sync SpendIQ expense data for better insights." },
              { id: "verify", title: "Check Verification Status", desc: "Review pending documents or account checks." },
            ].map((item) => (
              <div id={item.id} key={item.id} className="rounded-xl border border-slate-200 bg-white p-4">
                <h4 className={`font-semibold ${creditLensText}`}>{item.title}</h4>
                <p className="mt-1 text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* My Support Requests */}
        <section className={`${creditLensPanel} mb-6 p-6`}>
          <h3 className={`text-lg font-semibold ${creditLensText}`}>My Support Requests</h3>
          <div className="mt-3 space-y-3">
            {tickets.map((t) => (
              <div key={t.id} className="flex items-center justify-between rounded-md border border-slate-200 bg-white p-3">
                <div>
                  <div className={`font-semibold ${creditLensText}`}>{t.id} - {t.summary}</div>
                  <div className="text-xs text-slate-500">Last updated: {t.updated}</div>
                </div>
                <div>
                  <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-[#14517c]">{t.status}</span>
                </div>
              </div>
            ))}

            <div className="mt-3">
              <Button className={creditLensPrimary} onClick={() => setOpenSupport(true)}>Create New Support Request</Button>
            </div>
          </div>
        </section>

        {/* Feedback */}
        <section className={`${creditLensPanel} mb-24 p-6`}>
          <h3 className={`text-lg font-semibold ${creditLensText}`}>Share Your Feedback</h3>
          <p className="mt-1 text-sm text-slate-600">Your feedback helps us improve PrimeCore.</p>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <div className="flex items-center gap-2">
                {[1,2,3,4,5].map((s) => (
                  <button key={s} className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-[#14517c] transition hover:bg-slate-50">{s}</button>
                ))}
              </div>
              <div className="mt-3">
                <Input placeholder="Short message" className="bg-white" />
              </div>
            </div>
            <div className="flex items-start">
              <Button className={creditLensPrimary}>Send Feedback</Button>
            </div>
          </div>
        </section>

        {/* Support Request Dialog */}
        <PopupModal open={openSupport} onOpenChange={setOpenSupport} title="Create Support Request">
          <SupportForm onClose={() => setOpenSupport(false)} onCreate={(t) => setTickets((prev) => [t, ...prev])} />
        </PopupModal>
      </main>
    </div>
  );
}

// Renders the public customer support request form.
function SupportForm({ onClose, onCreate }: { onClose: () => void; onCreate: (t: Ticket) => void }) {
  const [type, setType] = useState("CreditLens");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  // Submits the support form and closes the dialog.
  const handleSubmit = () => {
    const ticket = { id: `T-${Math.floor(1000 + Math.random() * 9000)}`, summary: title || "New issue", status: "Open", updated: new Date().toISOString().slice(0,10) };
    onCreate(ticket);
    onClose();
  };

  return (
    <div className="space-y-3">
      <label className="text-sm">Issue Type</label>
      <select className="w-full rounded-md p-2 border" value={type} onChange={(e: ChangeEvent<HTMLSelectElement>) => setType(e.target.value)}>
        <option>Profile Issue</option>
        <option>CreditLens</option>
        <option>SpendIQ</option>
        <option>Verification</option>
        <option>Other</option>
      </select>

      <Input placeholder="Short title" value={title} onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} />
      <div>
        <label className="text-sm">Description</label>
        <textarea className="w-full rounded-md p-2 border" rows={4} value={desc} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDesc(e.target.value)} />
      </div>

      <div className="flex items-center justify-between">
        <small className="text-xs text-slate-500">Your request will be reviewed by our support team.</small>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button className={creditLensPrimary} onClick={handleSubmit}>Send Request</Button>
        </div>
      </div>
    </div>
  );
}
