import Link from "next/link";
import Image from "next/image";
import { AuthGuard } from "@/src/components/auth";
import { LogoutButton } from "@/src/components/logout-button";

export default function BankCustomerRolePage() {
  return (
    <AuthGuard requiredRole="BANK_CUSTOMER">
      <div className="relative flex min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#0d3b66] to-[#102a43]">
        <div className="absolute top-6 right-8 z-50">
          <LogoutButton className="text-slate-600 hover:bg-slate-100 hover:text-red-600" />
        </div>
        {/* Left Side - Branding & Illustration */}
        <div className="relative z-10 flex w-full flex-col justify-between p-12 lg:w-[50%]">
          <div className="z-20">
            <h1 className="text-6xl font-extrabold text-[#3e9fd3] tracking-tight">PrimeCore</h1>
            <p className="text-3xl font-light text-white/90 tracking-wide">Bank Digital</p>
          </div>
          
          <div className="relative flex flex-1 items-center justify-center -mt-10 mr-12">
             {/* Decorative Glows */}
             <div className="absolute h-[500px] w-[500px] rounded-full bg-[#3e9fd3] blur-[120px] opacity-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
             
             {/* Illustration - Increased Size */}
             <div className="relative z-10 w-full max-w-[650px] transform transition-transform duration-700 hover:scale-105">
                <Image 
                  src="/selection.png" 
                  alt="Digital Banking Illustration" 
                  width={1000} 
                  height={1000} 
                  className="w-full h-auto drop-shadow-2xl"
                  priority
                />
             </div>
          </div>
        </div>

        {/* Right Side - Navigation Menu */}
        <div 
          className="absolute inset-y-0 right-0 w-[60%] bg-zinc-50 shadow-[-50px_0_100px_rgba(0,0,0,0.3)]" 
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 150px 100%)" }}
        >
           <div className="flex h-full flex-col justify-center px-24 py-12 pl-48">
              <div className="flex flex-col gap-6">
                {[
                  { title: "SpendIQ", subtitle: "Understand where your money goes.", href: "/bank-customer/spendiq" },
                  { title: "CreditLens", subtitle: "Connecting your credit reality", href: "/bank-customer/creditlens" },
                  { title: "LoanSense", subtitle: "Loans that fit your financial reality.", href: "/bank-customer/loansense" },
                  { title: "Transact", subtitle: "Move money with clarity", href: "/bank-customer/transact" },
                ].map((item) => (
                  <Link key={item.title} href={item.href} className="group relative block w-full">
                    <div className="relative overflow-hidden w-full rounded-2xl bg-white px-8 py-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-12px_rgba(13,59,102,0.15)] group-hover:border-[#3e9fd3]/30">
                      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#0d3b66] to-[#3e9fd3] opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                      <div className="flex items-center justify-between">
                         <div className="text-center w-full">
                            <h2 className="text-3xl font-bold text-[#0d3b66] group-hover:text-[#3e9fd3] transition-colors">{item.title}</h2>
                            <p className="mt-2 text-base text-gray-500 font-medium group-hover:text-gray-700">{item.subtitle}</p>
                         </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
           </div>
        </div>
      </div>
    </AuthGuard>
  );
}


