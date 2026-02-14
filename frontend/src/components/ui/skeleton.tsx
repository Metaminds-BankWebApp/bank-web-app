import { cn } from "@/src/lib/utils";

export interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return <div className={cn("animate-pulse rounded-md bg-[#BCC5CC]/45 dark:bg-[#BCC5CC]/25", className)} />;
}
