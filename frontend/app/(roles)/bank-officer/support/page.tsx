"use client";

import { useState, ChangeEvent, MouseEvent } from "react";
import { AuthGuard } from "@/src/components/auth";
import { Sidebar } from "@/src/components/layout";
import ModuleHeader from "@/src/components/ui/module-header";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import PopupModal from "@/src/components/ui/popup-modal";

type Ticket = {
  id: string;
  customer: string;
  customerId: string;
  feature: string;
  category: string;
  priority: "Low" | "Medium" | "High";
  status: string;
  slaHours: number;
  created: string;
  title: string;
  description: string;
  officer?: string;
};

export default function SupportConsolePage() {
  const [tickets, setTickets] = useState<Ticket[]>(() => [
    { id: "T-5001", customer: "Amila Silva", customerId: "C-48292", feature: "Transact", category: "Transfer", priority: "High", status: "Open", slaHours: 5, created: "2026-02-23", title: "Transfer failed", description: "Customer reports failed transfer to beneficiary.", officer: "N. Fernando" },
    { id: "T-5002", customer: "Kasun Perera", customerId: "C-48293", feature: "CreditLens", category: "Report", priority: "Medium", status: "In Progress", slaHours: 48, created: "2026-02-21", title: "Credit discrepancy", description: "Dispute: incorrect credit entry." },
  ]);

  const [filters, setFilters] = useState({ status: "All", priority: "All", feature: "All", query: "" });
  const [selected, setSelected] = useState<Ticket | null>(tickets[0] ?? null);
  const [openEscalate, setOpenEscalate] = useState(false);
  const [openCase, setOpenCase] = useState(false);

  const filtered = tickets.filter((t) => {
    if (filters.status !== "All" && t.status !== filters.status) return false;
    if (filters.priority !== "All" && t.priority !== filters.priority) return false;
    if (filters.feature !== "All" && t.feature !== filters.feature) return false;
    if (filters.query && !(`${t.id} ${t.customer} ${t.customerId}`).toLowerCase().includes(filters.query.toLowerCase())) return false;
    return true;
  });

  const stats = {
    open: tickets.filter((t) => t.status === "Open").length,
    high: tickets.filter((t) => t.priority === "High").length,
    escalated: tickets.filter((t) => t.status === "Escalated").length,
    resolvedToday: 2,
    slaBreaches: tickets.filter((t) => t.slaHours <= 2).length,
  };

  return (
    <AuthGuard requiredRole="BANK_OFFICER">
      <div className="flex h-screen bg-[linear-gradient(180deg,#0b1a3a_0%,#0a234c_58%,#08142d_100%)] overflow-hidden">
        <Sidebar role="BANK_OFFICER" className="max-lg:hidden h-full" />
        <main className="flex-1 flex flex-col bg-[#f3f4f6] p-3 lg:p-7 h-full overflow-hidden lg:rounded-l-[28px] shadow-2xl">
          <ModuleHeader title="Support Console" subtitle="Manage customer support requests." theme="staff" className="mb-4" menuMode="sidebar-overlay" sidebarRole="BANK_OFFICER" sidebarHideCollapse={true} />

          <div className="space-y-4 overflow-y-auto">
            {/* KPI Row */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <StatCard label="Open Tickets" value={stats.open} color="teal" />
              <StatCard label="High Priority" value={stats.high} color="red" />
              <StatCard label="Escalated to Admin" value={stats.escalated} color="red" />
              <StatCard label="Resolved Today" value={stats.resolvedToday} color="teal" />
              <StatCard label="SLA Breaches" value={stats.slaBreaches} color="red" />
            </div>

            {/* Ticket Management Split */}
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
              <div className="lg:col-span-7">
                <div className="rounded-[16px] bg-[#bdd8e71f] border border-[#BCC5CC] shadow-sm p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full">
                      <Input placeholder="Search by Ticket ID or Customer ID" value={filters.query} onChange={(e: ChangeEvent<HTMLInputElement>)=> setFilters({ ...filters, query: e.target.value })} className="w-full sm:w-[320px] bg-white" />
                      <select value={filters.status} onChange={(e: ChangeEvent<HTMLSelectElement>)=> setFilters({ ...filters, status: e.target.value })} className="rounded-md p-2 border w-full sm:w-auto">
                        <option>All</option>
                        <option>Open</option>
                        <option>In Progress</option>
                        <option>Escalated</option>
                        <option>Resolved</option>
                      </select>
                      <select value={filters.priority} onChange={(e: ChangeEvent<HTMLSelectElement>)=> setFilters({ ...filters, priority: e.target.value })} className="rounded-md p-2 border w-full sm:w-auto">
                        <option>All</option>
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                      </select>
                      <select value={filters.feature} onChange={(e: ChangeEvent<HTMLSelectElement>)=> setFilters({ ...filters, feature: e.target.value })} className="rounded-md p-2 border w-full sm:w-auto">
                        <option>All</option>
                        <option>CreditLens</option>
                        <option>SpendIQ</option>
                        <option>LoanSense</option>
                        <option>Transact</option>
                      </select>
                    </div>
                  </div>

                  <div className="overflow-x-auto -mx-2 sm:mx-0 px-2 sm:px-0">
                    <table className="w-full text-sm table-auto">
                      <thead className="sticky top-0 bg-[#F7F6F2]">
                        <tr className="text-left text-xs text-[#063154]/80">
                          <th className="px-3 py-2">Ticket</th>
                          <th>Customer</th>
                          <th>Feature</th>
                          <th>Category</th>
                          <th>Priority</th>
                          <th>Status</th>
                          <th>SLA</th>
                          <th>Created</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filtered.map((t) => (
                          <tr key={t.id} className="hover:bg-white/60 border-t" onClick={() => setSelected(t)}>
                            <td className="px-3 py-3 font-medium max-w-[120px] break-words">{t.id}</td>
                            <td className="max-w-[160px] break-words">{t.customer} <div className="text-xs text-[#063154]/60">{t.customerId}</div></td>
                            <td className="max-w-[100px] break-words">{t.feature}</td>
                            <td className="max-w-[120px] break-words">{t.category}</td>
                            <td><PriorityBadge p={t.priority} /></td>
                            <td><StatusBadge status={t.status} /></td>
                            <td>{t.slaHours}h</td>
                            <td>{t.created}</td>
                            <td className="whitespace-nowrap"><Button variant="outline" size="sm" onClick={(e: MouseEvent<HTMLButtonElement>) => { e.stopPropagation(); setSelected(t); const el = document.getElementById('ticket-preview'); el?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }}>View</Button></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3">
                <div className="rounded-[16px] bg-[#F7F6F2] border border-[#BCC5CC] shadow-sm p-4 h-full flex flex-col">
                  {selected ? (
                    <TicketPreview ticket={selected} onEscalate={() => setOpenEscalate(true)} onCreateCase={() => setOpenCase(true)} />
                  ) : (
                    <div className="text-sm text-[#063154]/80">Select a ticket to see details.</div>
                  )}
                </div>
              </div>
            </div>

            {/* Escalations */}
            <div className="rounded-[16px] bg-[#F7F6F2] border border-[#BCC5CC] shadow-sm p-4">
              <h3 className="font-semibold text-[#063154]">Escalated Cases</h3>
              <p className="text-sm text-[#063154]/80 mt-1">Tickets escalated to admin for review.</p>
              <div className="mt-3 space-y-2">
                {tickets.filter(t=> t.status === 'Escalated').map(e => (
                  <div key={e.id} className="bg-white p-3 rounded-md border border-[#E8E8E8] flex justify-between items-center">
                    <div>
                      <div className="font-medium">{e.id} — {e.title}</div>
                      <div className="text-xs text-[#063154]/70">Reason: Automated escalation • {e.created}</div>
                    </div>
                    <div><Button variant="outline">Follow up</Button></div>
                  </div>
                ))}
                {tickets.filter(t=> t.status === 'Escalated').length === 0 && <div className="text-sm text-[#063154]/80">No escalated cases</div>}
              </div>
            </div>

            {/* Knowledge Base */}
            <div className="rounded-[16px] bg-[#F7F6F2] border border-[#BCC5CC] shadow-sm p-4">
              <h3 className="font-semibold text-[#063154]">Knowledge Base</h3>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { title: 'KYC Verification SOP', desc: 'Step-by-step KYC requirements.' },
                  { title: 'Loan Review Guidelines', desc: 'Checklist for loan officers.' },
                  { title: 'CRIB Mismatch Handling', desc: 'How to handle CRIB disputes.' },
                  { title: 'Transaction Dispute Process', desc: 'Process and SLAs.' },
                  { title: 'Fraud Detection Checklist', desc: 'Indicators and actions.' },
                  { title: 'Risk Grade Guide', desc: 'Interpretation of risk scores.' },
                ].map(k => (
                  <div key={k.title} className="bg-white p-3 rounded-md border border-[#E8E8E8]">
                    <div className="font-medium text-[#063154]">{k.title}</div>
                    <div className="text-xs text-[#063154]/75 mt-1">{k.desc}</div>
                    <div className="mt-3"><Button variant="outline">View</Button></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <PopupModal open={openEscalate} onOpenChange={setOpenEscalate} title="Escalate Ticket to Admin">
            <EscalateForm onClose={() => setOpenEscalate(false)} />
          </PopupModal>

          <PopupModal open={openCase} onOpenChange={setOpenCase} title="Create Internal Case">
            <InternalCaseForm onClose={() => setOpenCase(false)} />
          </PopupModal>
        </main>
      </div>
    </AuthGuard>
  );
}

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  const colorClass = color === 'red' ? 'text-red-600' : 'text-[#2F9D94]';
  return (
    <div className="rounded-[16px] bg-white p-4 shadow-sm border border-[#E8E8E8]">
      <div className="text-sm text-[#063154]/80">{label}</div>
      <div className={`text-2xl font-bold ${colorClass}`}>{value}</div>
    </div>
  );
}

function PriorityBadge({ p }: { p: string }) {
  const bg = p === 'High' ? 'bg-red-100 text-red-700' : p === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700';
  return <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${bg}`}>{p}</span>;
}

function StatusBadge({ status }: { status: string }) {
  const bg = status === 'Open' ? 'bg-blue-100 text-[#063154]' : status === 'In Progress' ? 'bg-sky-100 text-[#0d3b66]' : status === 'Escalated' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700';
  return <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${bg}`}>{status}</span>;
}

function TicketPreview({ ticket, onEscalate, onCreateCase }: { ticket: Ticket; onEscalate: () => void; onCreateCase: () => void }) {
  return (
    <div id="ticket-preview" className="flex-1 flex flex-col">
      <div className="bg-white rounded-md p-3 border border-[#E8E8E8]">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-lg font-semibold text-[#063154]">{ticket.title}</div>
            <div className="text-sm text-[#063154]/70">{ticket.id} • {ticket.feature} • {ticket.category}</div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <StatusBadge status={ticket.status} />
            <PriorityBadge p={ticket.priority} />
          </div>
        </div>
        <div className="mt-3 text-sm text-[#063154]/80">{ticket.description}</div>
      </div>

      <div className="mt-3 bg-white rounded-md p-3 border border-[#E8E8E8]">
        <h4 className="font-semibold text-[#063154]">Customer Summary</h4>
        <div className="mt-2 text-sm text-[#063154]/80">
          <div><strong>{ticket.customer}</strong> ({ticket.customerId})</div>
          <div>Risk: Medium • Active loans: 1 • DTI: 42% • Recent txns: 6</div>
        </div>
      </div>

      <div className="mt-3 flex-1 bg-white rounded-md p-3 border border-[#E8E8E8] overflow-auto">
        <h4 className="font-semibold text-[#063154]">Conversation</h4>
        <div className="mt-3 space-y-3">
          <div className="flex"><div className="bg-[#063154] text-white p-2 rounded-lg">Officer: Thanks for reporting — can you share transaction ID?</div></div>
          <div className="flex justify-end"><div className="bg-[#F0FDF9] text-[#063154] p-2 rounded-lg">Customer: TXN-8821 failed, funds debited but not credited.</div></div>
        </div>
        <div className="mt-3">
          <Input placeholder="Write a reply..." className="bg-white" />
          <div className="mt-2 flex gap-2 justify-end"><Button onClick={() => {}}>Reply</Button><Button className="bg-[#2F9D94]" onClick={onCreateCase}>Escalate to Admin</Button><Button variant="outline" onClick={onEscalate}>Create Case</Button></div>
        </div>
      </div>
    </div>
  );
}

function EscalateForm({ onClose }: { onClose: () => void }) {
  const [reason, setReason] = useState('');
  return (
    <div className="space-y-3">
      <label className="text-sm">Escalation Reason</label>
      <textarea className="w-full rounded-md p-2 border" rows={4} value={reason} onChange={(e: ChangeEvent<HTMLTextAreaElement>)=> setReason(e.target.value)} />
      <div className="flex items-center justify-end gap-2"><Button variant="outline" onClick={onClose}>Cancel</Button><Button className="bg-[#2F9D94]" onClick={() => { onClose(); }}>Escalate</Button></div>
    </div>
  );
}

function InternalCaseForm({ onClose }: { onClose: () => void }) {
  const [type, setType] = useState('Fraud');
  const [linked, setLinked] = useState('');
  const [desc, setDesc] = useState('');
  return (
    <div className="space-y-3">
      <label className="text-sm">Case Type</label>
      <select className="w-full rounded-md p-2 border" value={type} onChange={(e: ChangeEvent<HTMLSelectElement>)=> setType(e.target.value)}>
        <option>Fraud</option>
        <option>Data Error</option>
        <option>System Issue</option>
        <option>Policy Clarification</option>
      </select>
      <Input placeholder="Linked Ticket ID" value={linked} onChange={(e: ChangeEvent<HTMLInputElement>)=> setLinked(e.target.value)} />
      <div>
        <label className="text-sm">Description</label>
        <textarea className="w-full rounded-md p-2 border" rows={4} value={desc} onChange={(e: ChangeEvent<HTMLTextAreaElement>)=> setDesc(e.target.value)} />
      </div>
      <div className="flex items-center justify-end gap-2"><Button variant="outline" onClick={onClose}>Cancel</Button><Button className="bg-[#2F9D94]" onClick={()=> { onClose(); }}>Escalate to Admin</Button></div>
    </div>
  );
}
