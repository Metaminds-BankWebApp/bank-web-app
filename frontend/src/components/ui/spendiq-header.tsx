"use client";

import React, { useState } from "react";
import { Bell, Mail, Plus } from "lucide-react";

export default function SpendIQHeader({ title }: { title: string }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="flex flex-col md:flex-row justify-between items-center bg-[#0b1a3a] text-white p-4 md:p-6 rounded-2xl shadow-lg gap-4">
      <h1 className="text-lg md:text-2xl font-bold tracking-wide w-full md:w-auto">{title}</h1>

      <div className="flex items-center gap-4 w-full md:w-auto justify-end">
        <div className="hidden md:flex gap-4 items-center">
          <button className="relative p-2 hover:bg-white/10 rounded-full transition-colors">
            <Mail size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-[#0b1a3a]"></span>
          </button>
          <button className="relative p-2 hover:bg-white/10 rounded-full transition-colors">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-[#0b1a3a]"></span>
          </button>
          <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded-lg text-sm font-medium">
            <Plus size={16} /> <span className="hidden sm:inline">Add Entry</span>
          </button>
        </div>

        <div className="md:hidden relative">
          <button onClick={() => setOpen((v) => !v)} className="p-2 bg-white/10 rounded-lg" aria-label="Open actions">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-44 bg-white/95 text-slate-800 rounded-lg shadow-lg p-2 z-50">
              <button className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-slate-100"><Mail size={16} /> Messages</button>
              <button className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-slate-100"><Bell size={16} /> Notifications</button>
              <button className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-slate-100"><Plus size={16} /> Add Entry</button>
            </div>
          )}
        </div>

        <div className="hidden md:flex items-center gap-3 border-l border-white/20 pl-6">
          <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white overflow-hidden relative">
            <div className="w-full h-full bg-gradient-to-br from-slate-400 to-slate-600"></div>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-sm font-bold leading-none">Kamal Edirisinghe</p>
            <p className="text-xs text-white/70 mt-1">User</p>
          </div>
        </div>
      </div>
    </header>
  );
}
