/*"use client";

import React, { createContext, useContext, useState } from "react";

export type StatusType = "Active" | "Maintenance";

export type BranchData = {
  id: string;
  name: string;
  address: string;
  contact: string;
  email: string;
  officers :number;
  customers: number;
  status: StatusType;
};

type BranchContextType = {
  branches: BranchData[];
  addBranch: (branch: Omit<BranchData, "id">) => void;
};

const BranchContext = createContext<BranchContextType | null>(null);

export function BranchProvider({ children }: { children: React.ReactNode }) {
  const [branches, setBranches] = useState<BranchData[]>([
    {
      id: "BR-001",
      name: "Colombo Branch",
      address: "Colombo 07",
      contact: "0771234567",
      officers: 15,
      customers: 200,
      email: "colombo@bank.com",
      status: "Active",
    },
  ]);

  const addBranch = (branch: Omit<BranchData, "id">) => {
    const nextNumber = branches.length + 1;
    const newId = `BR-${String(nextNumber).padStart(3, "0")}`;

    const newBranch: BranchData = {
      id: newId,
      ...branch,
    };

    setBranches((prev) => [...prev, newBranch]);
  };

  return (
    <BranchContext.Provider value={{ branches, addBranch }}>
      {children}
    </BranchContext.Provider>
  );
}

export function useBranches() {
  const context = useContext(BranchContext);
  if (!context) throw new Error("useBranches must be used inside BranchProvider");
  return context;
}*/