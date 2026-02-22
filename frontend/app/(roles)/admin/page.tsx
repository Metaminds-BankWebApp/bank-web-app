import { Badge, Card, CardContent, CardHeader } from "@/src/components/ui";
import { Sidebar } from "@/src/components/layout";
import { AuthGuard } from "@/src/components/auth";
import { Bell, Mail, MoreHorizontal, Search, Settings, Eye, Pencil, Trash2 } from "lucide-react";
import { AdminHeader } from "@/src/components/ui/adminheader";
import Image from "next/image";

export default function AdminRolePage() {
  return (
    <AuthGuard requiredRole="ADMIN">
      <div className="flex h-screen bg-[linear-gradient(180deg,#0b1a3a_0%,#0a234c_58%,#08142d_100%)] overflow-hidden">
        <Sidebar role="ADMIN" className="max-lg:hidden h-full z-10 relative" />
        <main className="flex-1 flex flex-col bg-[#f3f4f6] overflow-hidden lg:rounded-l-[28px] shadow-2xl">
           <div className="flex-1 overflow-y-auto p-8 lg:p-10">
             {/* Header */}
             <AdminHeader title="Dashboard" />
               

          <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
            
            {/* Left Column */}
            <div className="space-y-6">
              {/* Bank Target */}
              <Card className="border-none shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <h2 className="text-lg font-semibold">Bank Target</h2>
                  <span className="rounded-full border border-gray-200 px-2.5 py-0.5 text-xs font-semibold text-gray-500 cursor-pointer hover:bg-gray-50">Show All</span>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 flex items-end justify-between">
                    <div>
                      <p className="text-sm text-gray-500">In Progress</p>
                      <p className="text-2xl font-bold text-[#0d3b66]">$231,032,444</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Sales Target</p>
                      <p className="text-xl font-bold text-gray-400">$500,000,000</p>
                    </div>
                  </div>
                  <div className="relative h-4 w-full rounded-full bg-gray-100">
                    <div className="absolute left-0 top-0 h-full w-[46%] rounded-full bg-[#3b82f6]"></div>
                    {/* Knob */}
                    <div className="absolute top-1/2 -translate-y-1/2 h-6 w-6 rounded-full border-4 border-white bg-gray-300 shadow-md" style={{ left: '46%' }}></div>
                  </div>
                </CardContent>
              </Card>

              {/* Chart Section */}
              <Card className="border-none shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <h2 className="text-lg font-semibold">Average credit score trend</h2>
                  <div className="flex items-center gap-4">
                     <div className="flex items-center gap-2 text-xs">
                        <span className="block h-2 w-2 rounded-full bg-[#a3e635]"></span>
                        <span className="text-gray-500">Average Sale Value</span>
                     </div>
                     <div className="flex items-center gap-2 text-xs">
                        <span className="block h-2 w-2 rounded-full bg-[#3b82f6]"></span>
                        <span className="text-gray-500">Average item persale</span>
                     </div>
                     <button className="text-xs font-semibold text-gray-500 hover:text-gray-900">Show All ↗</button>
                  </div>
                </CardHeader>
                <CardContent>
                   <div className="mb-4 flex justify-between text-xs text-gray-400">
                      {['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Des'].map(m => (
                        <span key={m}>{m}</span>
                      ))}
                   </div>
                   {/* Simplified Chart Visual */}
                   <div className="relative h-64 w-full border-l border-b border-gray-100 bg-[url('/chart-placeholder.svg')] bg-cover bg-no-repeat">
                      <div className="absolute left-1/4 top-1/2 rounded-lg bg-white p-2 shadow-lg border border-gray-100">
                        <div className="flex items-center justify-between gap-4 mb-1">
                           <span className="text-[10px] text-gray-400">Average item persale</span>
                           <span className="text-xs font-bold text-[#0d3b66]">$ 211,411,223</span>
                        </div>
                        <div className="flex items-center justify-between gap-4 bg-[#a3e635] px-2 py-1 rounded">
                           <span className="text-[10px] text-[#0d3b66]">Average year value</span>
                           <span className="text-xs font-bold text-[#0d3b66]">$ 339,091,888</span>
                        </div>
                      </div>
                      
                      {/* CSS Line Drawing (Approximation) */}
                      <svg viewBox="0 0 100 40" className="h-full w-full overflow-visible fill-none stroke-2">
                         <path d="M0 35 C 10 30, 20 38, 30 25 S 50 15, 60 20 S 80 10, 90 15" stroke="#3b82f6" strokeDasharray="4 2" />
                         <path d="M0 38 C 10 35, 20 32, 30 28 S 50 25, 60 22 S 80 15, 90 12" stroke="#a3e635" />
                      </svg>
                   </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Stats Grid */}
            <div className="flex flex-col gap-6">
               <div className="grid grid-cols-2 gap-4">
                  {/* Card 1 */}
                  <Card className="col-span-1 border-none bg-[#3b82f6] text-white shadow-sm">
                     <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-4">
                           <p className="text-xs font-medium opacity-90">Total Customers</p>
                           <span className="text-xs">↗</span>
                        </div>
                        <p className="text-2xl font-bold mb-2">81.000</p>
                        <p className="text-[10px] text-white/80">↗ 10.6% <span className="opacity-60">From last week</span></p>
                     </CardContent>
                  </Card>

                  {/* Card 2 */}
                  <Card className="col-span-1 border-none bg-white shadow-sm">
                     <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-4">
                           <p className="text-xs font-medium text-gray-500">Low Risk Customers</p>
                           <span className="text-xs text-gray-400">↗</span>
                        </div>
                        <p className="text-2xl font-bold text-[#0d3b66] mb-2">5.000</p>
                        <p className="text-[10px] text-green-500">↗ 1.5% <span className="text-gray-400">From last week</span></p>
                     </CardContent>
                  </Card>

                   {/* Card 3 */}
                   <Card className="col-span-1 border-none bg-white shadow-sm">
                     <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-4">
                           <p className="text-xs font-medium text-gray-500">Medium Risk Customers</p>
                           <span className="text-xs text-gray-400">↗</span>
                        </div>
                        <p className="text-2xl font-bold text-[#0d3b66] mb-2">12.000</p>
                        <p className="text-[10px] text-green-500">↗ 3.6% <span className="text-gray-400">From last week</span></p>
                     </CardContent>
                  </Card>

                  {/* Card 4 */}
                  <Card className="col-span-1 border-none bg-white shadow-sm">
                     <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-4">
                           <p className="text-xs font-medium text-gray-500">High Risk Customers</p>
                           <span className="text-xs text-gray-400">↗</span>
                        </div>
                        <p className="text-2xl font-bold text-[#0d3b66] mb-2">5.000</p>
                        <p className="text-[10px] text-red-500">↘ 1.5% <span className="text-gray-400">From last week</span></p>
                     </CardContent>
                  </Card>
               </div>

               {/* Promo Card */}
               <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#3b82f6] to-[#0d3b66] p-6 text-white shadow-lg">
                  <div className="relative z-10">
                     <h3 className="mb-2 text-2xl font-bold">Increase your sales</h3>
                     <p className="mb-6 text-xs text-white/80 leading-relaxed max-w-[80%]">
                        Discover the Proven Methods to Skyrocket Your Sales! Unleash the Potential of Your Business and Achieve Remarkable Growth.
                     </p>
                     <button className="rounded-lg bg-white px-4 py-2 text-xs font-bold text-[#0d3b66] hover:bg-gray-100">Learn More</button>
                  </div>
                  <div className="absolute -bottom-4 -right-4 h-32 w-32 rounded-full border-[16px] border-white/10"></div>
                  <div className="absolute top-8 right-8 h-16 w-16 rounded-full bg-white/5 blur-xl"></div>
               </div>
            </div>
          </div>

          {/* Recent Customers Table */}
          <div className="mt-6">
             <Card className="border-none shadow-sm">
               <CardHeader className="pb-2"><h2 className="text-lg font-semibold text-[#0d3b66]">Recent customers</h2></CardHeader>
               <CardContent className="overflow-x-auto p-0">
                 <table className="w-full min-w-[800px] text-left text-sm">
                   <thead className="bg-gray-50/50">
                     <tr>
                       <th className="px-6 py-3 font-medium text-gray-500">Name Customer</th>
                       <th className="px-6 py-3 font-medium text-gray-500">Contact</th>
                       <th className="px-6 py-3 font-medium text-gray-500">Purchases</th>
                       <th className="px-6 py-3 font-medium text-gray-500">Order QTY</th>
                       <th className="px-6 py-3 font-medium text-gray-500">Address</th>
                       <th className="px-6 py-3 font-medium text-gray-500 text-right">Action</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-100">
                     {[
                        { name: "Leslie Alexander", id: "ID 12451", email: "georgia@examp...", phone: "+62 819 1314 1435", price: "$21.78", orders: "30 Order", address: "2972 Westheimer Rd. Santa Ana, Illinois 85486" },
                        { name: "Guy Hawkins", id: "ID 12452", email: "guys@examp.com", phone: "+62 819 1314 1435", price: "$21.78", orders: "30 Order", address: "4517 Washington Ave. Manchester, Kentucky 39495" },
                        { name: "Kristin Watson", id: "ID 12453", email: "kristin@examp...", phone: "+62 819 1314 1435", price: "$21.78", orders: "30 Order", address: "2118 Thornridge Cir. Syracuse, Connecticut 35624" },
                     ].map((item) => (
                       <tr key={item.id} className="hover:bg-gray-50/50">
                         <td className="px-6 py-4">
                           <div className="flex items-center gap-3">
                              <input type="checkbox" className="rounded border-gray-300" />
                              <div>
                                 <p className="font-xs text-blue-500 font-medium mb-0.5">{item.id}</p>
                                 <p className="font-semibold text-gray-900">{item.name}</p>
                              </div>
                           </div>
                         </td>
                         <td className="px-6 py-4">
                           <p className="text-gray-600">{item.email}</p>
                           <p className="text-gray-400 text-xs">{item.phone}</p>
                         </td>
                         <td className="px-6 py-4 font-semibold text-gray-900">{item.price}</td>
                         <td className="px-6 py-4 text-gray-500">{item.orders}</td>
                         <td className="px-6 py-4 text-gray-500 max-w-[200px] truncate">{item.address}</td>
                         <td className="px-6 py-4 text-right">
                           <div className="flex justify-end gap-2 text-gray-400">
                              <button className="hover:text-[#0d3b66]"><Eye size={18} /></button>
                              <button className="hover:text-[#0d3b66]"><Pencil size={18} /></button>
                              <button className="hover:text-red-500"><Trash2 size={18} /></button>
                           </div>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </CardContent>
             </Card>
          </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
