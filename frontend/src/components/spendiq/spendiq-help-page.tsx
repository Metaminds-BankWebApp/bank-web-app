"use client";

import { type ChangeEvent, useCallback, useEffect, useState } from "react";
import ModuleHeader from "@/src/components/ui/module-header";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import PopupModal from "@/src/components/ui/popup-modal";
import { getMySupportConversations, submitSupportRequest, type SupportConversationSummary } from "@/src/api/support/support.service";
import { toApiError } from "@/src/api/client";

const quickActions = [
  "Add Expense Records",
  "Category Issues",
  "Sync Accounts",
  "Missing Transactions",
  "Dispute Totals",
  "Contact Support",
];

const faqs = [
  ["Why are my expenses not appearing?", "Check the selected month and category filters, then refresh the page. Newly added expenses appear after the save succeeds."],
  ["How are categories calculated?", "Each expense is grouped using its saved category. You can edit an expense to correct an incorrect category."],
  ["Why is my total incorrect?", "Review duplicated or manually added entries first. If it remains incorrect, send a support request with the affected month."],
  ["How do I report an issue safely?", "Never include your password, OTP, card number, or full account number in a support message."],
];

const troubleshooterOptions = [
  { key: "missing", label: "Missing expenses" },
  { key: "totals", label: "Incorrect totals" },
  { key: "edit", label: "Need to edit records" },
];

function formatTicketDate(value: string): string {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(value));
}

const statusStyles: Record<string, string> = {
  OPEN: "bg-amber-100 text-amber-700 dark:bg-amber-950/70 dark:text-amber-200",
  IN_PROGRESS: "bg-sky-100 text-sky-700 dark:bg-sky-950/70 dark:text-sky-200",
  CLOSED: "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200",
};

export function SpendIqHelpPage() {
  const [search, setSearch] = useState("");
  const [openTicket, setOpenTicket] = useState(false);
  const [openFraud, setOpenFraud] = useState(false);
  const [choice, setChoice] = useState<string | null>(null);
  const [conversations, setConversations] = useState<SupportConversationSummary[]>([]);
  const [isLoadingConversations, setIsLoadingConversations] = useState(true);

  const loadConversations = useCallback(async () => {
    setIsLoadingConversations(true);
    try {
      const data = await getMySupportConversations();
      setConversations(data.filter((conversation) => conversation.category === "SpendIQ"));
    } catch {
      setConversations([]);
    } finally {
      setIsLoadingConversations(false);
    }
  }, []);

  useEffect(() => {
    void loadConversations();
  }, [loadConversations]);

  const handleTicketClose = useCallback(() => {
    setOpenTicket(false);
    void loadConversations();
  }, [loadConversations]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 p-4 md:p-8">
      <ModuleHeader theme="spendiq" menuMode="feature-layout" title="Help & Support" name="You" role="Customer" className="mb-6" />
      <main className="max-w-6xl mx-auto p-3 sm:p-6">
        <div className="rounded-[20px] bg-[#F7F6F2] dark:bg-slate-900 border border-[#BCC5CC] dark:border-slate-700 shadow-sm p-5 sm:p-8 mb-6">
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
              {faqs.map(([question, answer]) => (
                <details key={question} className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-[#E8E8E8] dark:border-slate-700 mb-2">
                  <summary className="font-medium text-[#063154] dark:text-slate-100">{question}</summary>
                  <p className="mt-2 text-sm text-[#063154]/80 dark:text-slate-300">{answer}</p>
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

        <section className="rounded-[20px] bg-[#063154] text-white shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold">Contact us</h2>
          <p className="mt-1 text-sm text-white/80">Send a secure support request to the support team. We use your signed-in account details automatically.</p>
          <p className="mt-3 text-xs text-white/70">Do not include passwords, OTPs, card details, or full account numbers.</p>
          <Button className="mt-4 bg-[#2F9D94] hover:bg-[#27857e]" onClick={() => setOpenTicket(true)}>Send support request</Button>
        </section>

        <div className="rounded-[20px] bg-[#F7F6F2] dark:bg-slate-900 border border-[#BCC5CC] dark:border-slate-700 shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-[#063154] dark:text-slate-100">My Support Requests</h3>
          {isLoadingConversations ? (
            <p className="mt-3 text-sm text-[#063154]/80 dark:text-slate-300">Loading tickets...</p>
          ) : conversations.length === 0 ? (
            <p className="mt-3 text-sm text-[#063154]/80 dark:text-slate-300">No recent tickets</p>
          ) : (
            <div className="mt-3 space-y-2">
              {conversations.map((conversation) => (
                <div
                  key={conversation.conversationId}
                  className="flex items-center justify-between gap-3 rounded-lg border border-[#E8E8E8] dark:border-slate-700 bg-white dark:bg-slate-800 p-3"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium text-[#063154] dark:text-slate-100">{conversation.subject}</p>
                    <p className="truncate text-xs text-[#063154]/70 dark:text-slate-400">
                      {conversation.lastMessagePreview ?? "No messages yet"} · {formatTicketDate(conversation.lastMessageAt)}
                    </p>
                  </div>
                  <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[conversation.status] ?? statusStyles.OPEN}`}>
                    {conversation.status.replace("_", " ")}
                  </span>
                </div>
              ))}
            </div>
          )}
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
          <TicketForm onClose={handleTicketClose} />
        </PopupModal>
        <PopupModal open={openFraud} onOpenChange={setOpenFraud} title="Report Fraud">
          <FraudForm onClose={() => setOpenFraud(false)} />
        </PopupModal>
      </main>
    </div>
  );
}

function TicketForm({ onClose }: { onClose: () => void }) {
  const [category, setCategory] = useState("SpendIQ");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submit() {
    setError("");
    if (!subject.trim() || !description.trim()) { setError("Add a subject and description."); return; }
    setSubmitting(true);
    try { await submitSupportRequest({ category, subject, message: description }); onClose(); }
    catch (err) { setError(toApiError(err).message); }
    finally { setSubmitting(false); }
  }

  return (
    <div className="space-y-3">
      <select value={category} onChange={(event) => setCategory(event.target.value)} className="w-full rounded-md border p-2 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700">
        <option>SpendIQ</option><option>Account access</option><option>Transaction</option><option>LoanSense</option><option>CreditLens</option><option>Other</option>
      </select>
      <Input placeholder="Subject" value={subject} onChange={(event: ChangeEvent<HTMLInputElement>) => setSubject(event.target.value)} />
      <div>
        <label className="text-sm">Description</label>
        <textarea className="w-full rounded-md p-2 border dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700" rows={4} value={description} onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setDescription(event.target.value)} />
      </div>
      <div className="flex items-center justify-between">
        <small className="text-xs text-[#063154]/80 dark:text-slate-300">Your request will be reviewed by support.</small>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button className="bg-[#2F9D94]" disabled={submitting} onClick={submit}>{submitting ? "Sending..." : "Send request"}</Button>
        </div>
      </div>
      {error ? <p className="text-sm text-red-600" role="alert">{error}</p> : null}
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
