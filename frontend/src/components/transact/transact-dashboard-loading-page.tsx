import { Skeleton } from "@/src/components/ui/skeleton";

const TIMELINE_BAR_HEIGHTS = [
  "h-[42%]",
  "h-[59%]",
  "h-[76%]",
  "h-[48%]",
  "h-[67%]",
  "h-[88%]",
  "h-[55%]",
  "h-[71%]",
  "h-[39%]",
  "h-[63%]",
  "h-[82%]",
  "h-[51%]",
];

/**
 * Route-level placeholder for the Transact dashboard. It follows the dashboard
 * layout so loading a route does not cause the page to jump once its content is ready.
 */
export function TransactDashboardLoadingPage() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading transfer dashboard"
      className="bg-transparent px-4 py-4 sm:px-8 sm:py-6"
    >
      <span className="sr-only">Loading transfer dashboard content</span>

      <div className="flex min-h-16 items-center justify-between gap-4 rounded-xl bg-[linear-gradient(100deg,#061e3d_0%,#0e4f62_100%)] px-4 shadow-[0_16px_34px_-24px_rgba(2,18,33,0.8)] sm:px-6">
        <div className="flex items-center gap-3">
          <Skeleton className="h-9 w-9 rounded-lg bg-white/20" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-28 bg-white/25 sm:w-36" />
            <Skeleton className="h-3 w-20 bg-white/15" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="hidden h-8 w-24 bg-white/20 sm:block" />
          <Skeleton className="h-8 w-8 rounded-full bg-white/25" />
        </div>
      </div>

      <div className="mt-3 flex items-center justify-center gap-2 text-sm font-medium text-[#0e4f62] dark:text-sky-200" role="status">
        <span className="h-2 w-2 animate-pulse rounded-full bg-[#399FD8]" />
        Loading dashboard data...
      </div>

      <section className="mx-auto mt-8 max-w-full">
        <div className="transact-creditlens-shade min-h-[600px] w-full rounded-xl p-6 sm:p-8 md:min-h-[700px] lg:min-h-[800px]">
          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-8 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className={
                  index === 0
                    ? "flex min-h-[120px] flex-col justify-between rounded-2xl border border-[#061e3d]/25 bg-[linear-gradient(150deg,#061e3d_0%,#0a3046_100%)] p-4 sm:min-h-[150px] sm:p-6"
                    : "flex min-h-[120px] flex-col justify-between rounded-2xl border border-cyan-200 bg-cyan-50 p-4 sm:min-h-[150px] sm:p-6"
                }
              >
                <div className="space-y-2">
                  <Skeleton className={index === 0 ? "h-4 w-24 bg-white/25" : "h-4 w-24"} />
                  <Skeleton className={index === 0 ? "h-4 w-10 rounded-full bg-emerald-300/30" : "h-4 w-10 rounded-full bg-emerald-300/45"} />
                </div>
                <div className="mt-5 space-y-2 sm:text-right">
                  <Skeleton className={index === 0 ? "ml-auto h-3 w-8 bg-white/20" : "ml-auto h-3 w-8"} />
                  <Skeleton className={index === 0 ? "ml-auto h-8 w-32 bg-white/25" : "ml-auto h-8 w-32"} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-10">
            <div className="transact-creditlens-shade space-y-6 rounded-3xl p-5 md:col-span-2 lg:col-span-2 sm:p-8">
              <Skeleton className="h-5 w-44" />
              <div className="flex h-[220px] items-end gap-3 sm:h-[260px] md:h-[300px] lg:h-[350px]">
                {Array.from({ length: 12 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    // Vary the bars to hint at the timeline chart while it loads.
                    className={`flex-1 rounded-t-md ${TIMELINE_BAR_HEIGHTS[index]}`}
                  />
                ))}
              </div>
            </div>

            <div className="transact-creditlens-shade rounded-3xl p-5 sm:p-8">
              <Skeleton className="h-5 w-36" />
              <Skeleton className="mx-auto mt-8 h-40 w-40 rounded-full sm:h-48 sm:w-48" />
              <div className="mt-10 grid grid-cols-2 gap-3">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className={index > 3 ? "col-span-2" : ""}
                  >
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
                <Skeleton className="col-span-2 h-12 w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
