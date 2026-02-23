"use client";

import { useState } from "react";
import ModuleHeader from "@/src/components/ui/module-header";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Dialog } from "@/src/components/ui/dialog";

export default function CreditLensHelpPage() {
  const [search, setSearch] = useState("");
  const [troubleshooter, setTroubleshooter] = useState<string | null>(null);
  const [openSupport, setOpenSupport] = useState(false);
  const [tickets, setTickets] = useState(() => [
    { id: "T-1001", summary: "Unable to generate score", status: "Open", updated: "2026-02-20" },
  ]);

  return (
    <div className="min-h-screen px-1 pt-2 sm:px-2 lg:px-6 lg:pt-4 xl:px-8 2xl:px-10">
      <ModuleHeader theme="creditlens" menuMode="feature-layout" title="Help & Support" role="Public" className="mb-6" />

      <main className="max-w-6xl mx-auto p-6">
        {/* Hero */}
        <div className="rounded-[20px] bg-[#a2b9cc86] border border-[#BCC5CC] shadow-md p-8 mb-6">
          <h1 className="text-2xl font-semibold text-[#063154]">Help & Support</h1>
          <p className="mt-1 text-sm text-[#063154]/80">Find answers, fix issues, or contact our support team.</p>

          <div className="mt-6">
            <Input
              label={undefined}
              placeholder="Search help articles… (e.g., Why is my CreditLens locked?)"
              className="rounded-[12px] h-12 bg-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
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

        {/* Quick Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {[
            { id: "profile", title: "Complete Profile Details", desc: "Add your personal details to unlock features." },
            { id: "income", title: "Add Income Information", desc: "Provide income to improve readiness." },
            { id: "expenses", title: "Add Expense Records (SpendIQ)", desc: "Sync expenses for better insights." },
            { id: "verify", title: "Check Verification Status", desc: "See what’s pending to finish verification." },
          ].map((c) => (
            <div key={c.id} className="rounded-[20px] bg-[#F7F6F2] border border-[#BCC5CC] shadow-sm p-4 hover:shadow-md transition-shadow flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-[#063154]">{c.title}</h3>
                <p className="text-sm text-[#063154]/80 mt-1">{c.desc}</p>
              </div>
              <div>
                <Button className="bg-[#2F9D94] hover:opacity-95" onClick={() => document.getElementById(c.id)?.scrollIntoView({ behavior: "smooth" })}>Go Now</Button>
              </div>
            </div>
          ))}
        </div>

        {/* CreditLens Help Section */}
        <section id="creditlens-help" className="rounded-[20px] bg-[#a2b9cc86] border border-[#BCC5CC] shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-[#063154]">CreditLens Help</h2>
          <p className="text-sm text-[#063154]/80 mt-1">Understand your credit score and unlock your financial insights.</p>

          <div className="mt-4 space-y-3">
            {/* Accordion using details */}
            {[
              { q: "Why is my credit score not showing?", a: "Scores require completed profile and recent income data. Allow up to 24 hours after updating." },
              { q: "What affects my score?", a: "Payment history, credit utilization, income stability and active liabilities." },
              { q: "Why is the feature partially locked?", a: "Certain data points are missing; complete profile or add required documents." },
              { q: "How is readiness calculated?", a: "Readiness aggregates completeness of key fields and data freshness into a percentage." },
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
                <p className="text-sm text-[#063154]/80 mt-1">What issue are you facing?</p>

                <div className="mt-3 flex gap-2">
                  {[
                    { key: "score", label: "Score not generated" },
                    { key: "locked", label: "Feature locked" },
                    { key: "data", label: "Data seems incorrect" },
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
                      <li>Check that your profile is complete.</li>
                      <li>Ensure income and liabilities are up to date.</li>
                      <li>Re-run data sync from SpendIQ or upload missing documents.</li>
                    </ol>
                    <div className="mt-3">
                      <Button className="bg-[#2F9D94]" onClick={() => document.getElementById("profile")?.scrollIntoView({ behavior: "smooth" })}>Complete Required Data</Button>
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

        {/* Anchor sections to satisfy action cards */}
        {/* <section id="profile" className="mb-6 text-[#063154]">
          <h3 className="text-lg font-semibold">Complete Profile Details</h3>
          <p className="text-sm mt-1">Add your full name, address and ID to get verified quickly.</p>
        </section>

        <section id="income" className="mb-6 text-[#063154]">
          <h3 className="text-lg font-semibold">Add Income Information</h3>
          <p className="text-sm mt-1">Provide salary or business income to improve score calculations.</p>
        </section>

        <section id="verify" className="mb-12 text-[#063154]">
          <h3 className="text-lg font-semibold">Check Verification Status</h3>
          <p className="text-sm mt-1">See what documents or steps are outstanding in your account.</p>
        </section> */}

        {/* My Support Requests */}
        <section className="rounded-[20px] bg-[#a2b9cc86] border border-[#BCC5CC] shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-[#063154]">My Support Requests</h3>
          <div className="mt-3 space-y-3">
            {tickets.map((t) => (
              <div key={t.id} className="flex items-center justify-between bg-white p-3 rounded-md border border-[#E8E8E8]">
                <div>
                  <div className="font-semibold text-[#063154]">{t.id} — {t.summary}</div>
                  <div className="text-xs text-[#063154]/80">Last updated: {t.updated}</div>
                </div>
                <div>
                  <span className="px-3 py-1 rounded-full text-xs bg-[#063154]/10 text-[#063154]">{t.status}</span>
                </div>
              </div>
            ))}

            <div className="mt-3">
              <Button className="bg-[#2F9D94]" onClick={() => setOpenSupport(true)}>Create New Support Request</Button>
            </div>
          </div>
        </section>

        {/* Feedback */}
        <section className="rounded-[20px] bg-[#a2b9cc86] border border-[#BCC5CC] shadow-sm p-6 mb-24">
          <h3 className="text-lg font-semibold text-[#063154]">Share Your Feedback</h3>
          <p className="text-sm text-[#063154]/80 mt-1">Your feedback helps us improve PrimeCore.</p>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <div className="flex items-center gap-2">
                {[1,2,3,4,5].map((s) => (
                  <button key={s} className="px-3 py-2 bg-white rounded-md">{s}★</button>
                ))}
              </div>
              <div className="mt-3">
                <Input placeholder="Short message" className="bg-white" />
              </div>
            </div>
            <div className="flex items-start">
              <Button className="bg-[#2F9D94]">Send Feedback</Button>
            </div>
          </div>
        </section>

        {/* Support Request Dialog */}
        <Dialog open={openSupport} onOpenChange={setOpenSupport} title="Create Support Request">
          <SupportForm onClose={() => setOpenSupport(false)} onCreate={(t) => setTickets((prev) => [t, ...prev])} />
        </Dialog>
      </main>
    </div>
  );
}

function SupportForm({ onClose, onCreate }: { onClose: () => void; onCreate: (t: any) => void }) {
  const [type, setType] = useState("CreditLens");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = () => {
    const ticket = { id: `T-${Math.floor(1000 + Math.random() * 9000)}`, summary: title || "New issue", status: "Open", updated: new Date().toISOString().slice(0,10) };
    onCreate(ticket);
    onClose();
  };

  return (
    <div className="space-y-3">
      <label className="text-sm">Issue Type</label>
      <select className="w-full rounded-md p-2 border" value={type} onChange={(e) => setType(e.target.value)}>
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
