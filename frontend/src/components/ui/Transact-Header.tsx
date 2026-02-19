import { Bell, Mail } from 'lucide-react'
import React from 'react'

interface TransactHeaderProps {
  title?: React.ReactNode
  subtitle?: React.ReactNode
  rightContent?: React.ReactNode
}

export default function TransactHeader({ title = 'Dashboard', subtitle = 'User', rightContent }: TransactHeaderProps) {
  return (
     <header className="flex flex-col md:flex-row justify-between items-center bg-[#0B3E5A] text-white p-6 rounded-2xl shadow-lg gap-4">
          <h1 className="text-2xl font-bold tracking-wide w-full md:w-auto">{title}</h1>
          <div className="flex items-center gap-6 w-full md:w-auto justify-end">
            <div className="flex gap-4">
               <button className="relative p-2 hover:bg-white/10 rounded-full transition-colors"><Mail size={20} /><span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-[#0e4f62]"></span></button>
               <button className="relative p-2 hover:bg-white/10 rounded-full transition-colors"><Bell size={20} /><span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-[#0e4f62]"></span></button>
            </div>
            <div className="flex items-center gap-3 border-l border-white/20 pl-6">
               <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white overflow-hidden relative">
                  <div className="w-full h-full bg-gradient-to-br from-slate-400 to-slate-600"></div>
               </div>
               <div className="hidden md:block text-right">
                  <p className="text-sm font-bold leading-none">{subtitle}</p>
               </div>
            </div>

            {rightContent}
          </div>
        </header>
      )
}
