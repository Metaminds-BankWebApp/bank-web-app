import React from "react";

export default function ResponsiveContainer({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`  bg-transparent min-h-[60vh] ${className}`}>
      {children}
    </div>
  );
}
