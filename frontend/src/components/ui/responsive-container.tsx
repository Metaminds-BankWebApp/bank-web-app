import React from "react";

export default function ResponsiveContainer({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`p-4 sm:p-6 md:p-8 lg:p-10 space-y-6 bg-transparent min-h-[60vh] ${className}`}>
      {children}
    </div>
  );
}
