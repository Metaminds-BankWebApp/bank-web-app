import { Card, CardContent, CardHeader } from "@/src/components/ui";
import { Sidebar } from "@/src/components/layout";
import { AuthGuard } from "@/src/components/auth";
import ModuleHeader from "@/src/components/ui/module-header";
import Link from "next/link";

export default function BankOfficerRolePage() {
  return (
    <AuthGuard requiredRole="BANK_OFFICER">
      <div className="flex h-screen bg-[linear-gradient(180deg,#0b1a3a_0%,#0a234c_58%,#08142d_100%)] overflow-hidden">
        <Sidebar role="BANK_OFFICER" className="max-lg:hidden h-full" />
      <main className="flex-1 flex flex-col bg-[#f3f4f6] p-3 shadow-2xl sm:p-5 lg:p-7 h-full overflow-hidden lg:rounded-l-[28px]">
          <ModuleHeader theme="staff" menuMode="sidebar-overlay" sidebarRole="BANK_OFFICER" sidebarHideCollapse mailBadge={2} notificationBadge={8} avatarSrc="https://ui-avatars.com/api/?name=Kamal+E&background=random" avatarStatusDot name="Kamal Edirisinghe" role="Bank Officer" title="Dashboard" className="mb-5 shrink-0" />

          <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="grid gap-6 xl:grid-cols-[2fr_1fr] h-full">
            
            {/* Left Column */}
            <div className="flex flex-col gap-6 h-full">
              {/* Bank Target */}
              <Card className="creditlens-card creditlens-card-hover creditlens-delay-1 border-none shadow-sm flex flex-col justify-center flex-shrink-0">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <h2 className="text-lg font-semibold">Bank Target</h2>
                  <span className="rounded-full border border-gray-200 px-2.5 py-0.5 text-xs font-semibold text-gray-500 cursor-pointer hover:bg-gray-50">Show All</span>
                </CardHeader>
                <CardContent className="flex flex-col justify-center">
                  <div className="mb-4 flex items-end justify-between">
                    <div>
                      <p className="text-sm text-gray-500">In Progress</p>
                      <p className="text-2xl font-bold text-[#0d3b66]">LKR 231,032,444</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Target</p>
                      <p className="text-xl font-bold text-gray-400">LKR 500,000,000</p>
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
              <Card className="creditlens-card creditlens-card-hover creditlens-delay-2 border-none shadow-sm flex-1 flex flex-col min-h-[300px]">
                <CardHeader className="flex flex-row items-center justify-between shrink-0">
                  <h2 className="text-lg font-semibold">Customer Risk Segmentation</h2>
                  <div className="flex items-center gap-4">
                     <div className="flex items-center gap-2 text-xs">
                        <span className="block h-2 w-2 rounded-full bg-sky-400"></span>
                        <span className="text-gray-500">Low Risk</span>
                     </div>
                     <div className="flex items-center gap-2 text-xs">
                        <span className="block h-2 w-2 rounded-full bg-blue-600"></span>
                        <span className="text-gray-500">Medium Risk</span>
                     </div>
                     <div className="flex items-center gap-2 text-xs">
                        <span className="block h-2 w-2 rounded-full bg-[#0d3b66]"></span>
                        <span className="text-gray-500">High Risk</span>
                     </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                   {/* Chart Container incl Y-Axis */}
                   <div className="relative flex-1 flex w-full h-full pb-6 px-1 lg:px-2">
                       {/* Y-Axis */}
                       <div className="flex flex-col justify-between items-end pr-3 pb-6 text-[10px] text-gray-400 shrink-0 h-full border-r border-gray-100">
                          <span>3000</span>
                          <span>2250</span>
                          <span>1500</span>
                          <span>750</span>
                          <span>0</span>
                       </div>

                       {/* Stacked Bar Chart & X-Axis Area */}
                       <div className="relative flex-1 flex flex-col h-full border-b border-gray-100 bg-cover bg-no-repeat w-full ml-1">
                           <div className="flex items-end justify-between h-full pt-4 w-full gap-1 lg:gap-2 px-1">
                            {[
                               { month: 'Jan', low: 2100, medium: 240, high: 520 },
                               { month: 'Feb', low: 1850, medium: 630, high: 310 },
                               { month: 'Mar', low: 2350, medium: 190, high: 140 },
                               { month: 'Apr', low: 1600, medium: 510, high: 420 },
                               { month: 'May', low: 1420, medium: 800, high: 650 },
                               { month: 'Jun', low: 1950, medium: 430, high: 530 },
                               { month: 'Jul', low: 1680, medium: 780, high: 360 },
                               { month: 'Aug', low: 2400, medium: 150, high: 190 },
                               { month: 'Sep', low: 1560, medium: 860, high: 240 },
                               { month: 'Oct', low: 1790, medium: 520, high: 580 },
                               { month: 'Nov', low: 2020, medium: 280, high: 180 },
                               { month: 'Dec', low: 1820, medium: 420, high: 210 }, // Matches static values perfectly
                            ].map((data, i) => {
                               const total = data.low + data.medium + data.high;
                               const maxPossible = 3000;
                               
                               const lowPercent = (data.low / maxPossible) * 100;
                               const medPercent = (data.medium / maxPossible) * 100;
                               const highPercent = (data.high / maxPossible) * 100;

                               return (
                                 <div key={i} className="group relative flex flex-col items-center flex-1 h-full justify-end">
                                    {/* Tooltip */}
                                    <div className="absolute -top-16 opacity-0 group-hover:opacity-100 transition-opacity bg-white border border-slate-200 text-slate-800 text-xs py-2 px-3 rounded shadow-xl pointer-events-none whitespace-nowrap z-20 flex flex-col gap-1 min-w-[120px]">
                                       <div className="font-bold text-slate-600 mb-1 border-b pb-1 text-center">{data.month} Portfolio</div>
                                       <div className="flex justify-between w-full"><span>Low:</span> <span className="font-semibold text-sky-500">{data.low}</span></div>
                                       <div className="flex justify-between w-full"><span>Medium:</span> <span className="font-semibold text-blue-600">{data.medium}</span></div>
                                       <div className="flex justify-between w-full"><span>High:</span> <span className="font-semibold text-[#0d3b66]">{data.high}</span></div>
                                       <div className="flex justify-between w-full mt-1 border-t pt-1 font-bold"><span>Total:</span> <span>{total}</span></div>
                                    </div>
                                    
                                    {/* Stacked Bars Container */}
                                    <div className="flex flex-col-reverse w-full max-w-[32px] cursor-pointer" 
                                      style={{ 
                                        height: '100%', 
                                        transformOrigin: "bottom",
                                        animation: `trend-bar-rise 720ms cubic-bezier(0.22,1,0.36,1) ${i * 55}ms both`,
                                      }}
                                    >
                                         {/* Low Risk Segment (Bottom) */}
                                         {lowPercent > 0 && (
                                           <div 
                                             className="w-full bg-sky-400/80 hover:bg-sky-400 transition-colors border-x border-sky-500 rounded-b" 
                                             style={{ height: `${lowPercent}%` }}
                                           />
                                         )}
                                         {/* Medium Risk Segment (Middle) */}
                                         {medPercent > 0 && (
                                           <div 
                                             className="w-full bg-blue-600/80 hover:bg-blue-600 transition-colors border-x border-blue-700" 
                                             style={{ height: `${medPercent}%` }}
                                           />
                                         )}
                                         {/* High Risk Segment (Top) */}
                                         {highPercent > 0 && (
                                           <div 
                                             className="w-full bg-[#0d3b66]/80 hover:bg-[#0d3b66] transition-colors border-t border-x border-[#0a2f52] rounded-t" 
                                             style={{ height: `${highPercent}%` }}
                                           />
                                         )}
                                    </div>

                                    {/* X-Axis Month Label */}
                                    <span 
                                      className="absolute -bottom-6 text-[10px] text-gray-400 whitespace-nowrap"
                                      style={{
                                        animation: `trend-label-fade 360ms ease ${i * 55 + 260}ms both`,
                                      }}
                                    >
                                      {data.month}
                                    </span>
                                 </div>
                               );
                            })}
                          </div>
                       </div>
                   </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Stats Grid */}
            <div className="flex flex-col gap-6 h-full min-h-0">
               <div className="grid grid-cols-2 gap-4 shrink-0 creditlens-stagger-4">
                  {/* Card 1 */}
                  <Card className="creditlens-card creditlens-card-hover col-span-1 border-none bg-[#3b82f6] text-[#0d3b66] shadow-sm flex flex-col justify-center min-h-[140px]">
                     <CardContent className="p-4 flex flex-col justify-between h-full">
                        <div className="flex justify-between items-start mb-1">
                           <p className="text-xs font-medium opacity-90">Total Customers</p>
                           <span className="text-xs"></span>
                        </div>
                        <div>
                           <p className="text-2xl font-bold mb-1">2,450</p>
                           <p className="text-[10px] text-[#0d3b66]/80">— 10.6% <span className="opacity-60">From last week</span></p>
                        </div>
                     </CardContent>
                  </Card>

                  {/* Card 2 */}
                  <Card className="creditlens-card creditlens-card-hover col-span-1 border-none bg-white shadow-sm flex flex-col justify-center min-h-[140px]">
                     <CardContent className="p-4 flex flex-col justify-between h-full">
                        <div className="flex justify-between items-start mb-1">
                           <p className="text-xs font-medium text-gray-500">Low Risk</p>
                           <span className="text-xs text-gray-400"></span>
                        </div>
                        <div>
                           <p className="text-2xl font-bold text-[#0d3b66] mb-1">1,820</p>
                           <p className="text-[10px] text-green-500">— 1.5% <span className="text-gray-400">From last week</span></p>
                        </div>
                     </CardContent>
                  </Card>

                   {/* Card 3 */}
                   <Card className="creditlens-card creditlens-card-hover col-span-1 border-none bg-white shadow-sm flex flex-col justify-center min-h-[140px]">
                     <CardContent className="p-4 flex flex-col justify-between h-full">
                        <div className="flex justify-between items-start mb-1">
                           <p className="text-xs font-medium text-gray-500">Medium Risk</p>
                           <span className="text-xs text-gray-400"></span>
                        </div>
                        <div>
                           <p className="text-2xl font-bold text-[#0d3b66] mb-1">420</p>
                           <p className="text-[10px] text-green-500">— 3.6% <span className="text-gray-400">From last week</span></p>
                        </div>
                     </CardContent>
                  </Card>

                  {/* Card 4 */}
                  <Card className="creditlens-card creditlens-card-hover col-span-1 border-none bg-white shadow-sm flex flex-col justify-center min-h-[140px]">
                     <CardContent className="p-4 flex flex-col justify-between h-full">
                        <div className="flex justify-between items-start mb-1">
                           <p className="text-xs font-medium text-gray-500">High Risk</p>
                           <span className="text-xs text-gray-400"></span>
                        </div>
                        <div>
                           <p className="text-2xl font-bold text-[#0d3b66] mb-1">210</p>
                           <p className="text-[10px] text-red-500">— 1.5% <span className="text-gray-400">From last week</span></p>
                        </div>
                     </CardContent>
                  </Card>
               </div>

               <div className="flex flex-col gap-5 flex-1 min-h-[400px] creditlens-stagger-2">
                  <div className="creditlens-card creditlens-card-hover relative overflow-hidden rounded-2xl bg-linear-to-br from-[#3b82f6] to-[#0d3b66] p-6 text-white shadow-lg flex flex-col justify-center flex-1">
                     <div className="relative z-10 flex flex-col justify-center h-full">
                        <h3 className="mb-3 text-2xl font-bold">Pending Verifications</h3>
                        <p className="mb-6 text-sm text-white/80 leading-relaxed max-w-[85%]">
                           18 customer profiles are waiting for Personal and income document validation.
                        </p>
                        <div>
                           <button className="rounded-lg bg-white px-6 py-3 text-sm font-bold text-[#0d3b66] hover:bg-gray-100 transition-colors">Review Queue</button>
                        </div>
                     </div>
                     <div className="absolute -bottom-4 -right-4 h-40 w-40 rounded-full border-20 border-white/10"></div>
                     <div className="absolute top-6 right-6 h-20 w-20 rounded-full bg-white/5 blur-xl"></div>
                  </div>

                  <div className="creditlens-card creditlens-card-hover relative overflow-hidden rounded-2xl bg-linear-to-br from-[#3b82f6] to-[#0d3b66] p-6 text-white shadow-lg flex flex-col justify-center flex-1">
                     <div className="relative z-10 flex flex-col justify-center h-full">
                        <h3 className="mb-3 text-2xl font-bold">Help Requests</h3>
                        <p className="mb-6 text-sm text-white/80 leading-relaxed max-w-[85%]">
                           27 Help Requests are in progress, with 6 requiring officer decision today.
                        </p>
                                        <div>
                                           <Link href="/bank-officer/support" className="rounded-lg bg-white px-6 py-3 text-sm font-bold text-[#0d3b66] hover:bg-gray-100 transition-colors">View Requests</Link>
                                        </div>
                     </div>
                     <div className="absolute -bottom-4 -right-4 h-40 w-40 rounded-full border-20 border-white/10"></div>
                     <div className="absolute top-6 right-6 h-20 w-20 rounded-full bg-white/5 blur-xl"></div>
                  </div>
               </div>
            </div>
          </div>
          </div>

          {/* Recent Customers Table
          <div className="mt-6">
             <Card className="border-none shadow-sm">
               <CardHeader className="pb-2"><h2 className="text-lg font-semibold text-[#0d3b66]">Recent customers</h2></CardHeader>
               <CardContent className="overflow-x-auto p-0">
                 <table className="w-full min-w-[800px] text-left text-sm">
                   <thead className="bg-gray-50/50">
                     <tr>
                       <th className="px-6 py-3 font-medium text-gray-500">Name Customer</th>
                       <th className="px-6 py-3 font-medium text-gray-500">Contact</th>
                       <th className="px-6 py-3 font-medium text-gray-500">Transactions</th>
                       <th className="px-6 py-3 font-medium text-gray-500"></th>
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
          </div> */}
        </main>
      </div>
    </AuthGuard>
  );
}


