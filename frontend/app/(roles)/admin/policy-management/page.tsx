"use client";

import React, { useState } from "react";
import { Sidebar } from "@/src/components/layout";
import { AdminHeader } from "@/src/components/ui/adminheader";
import { AuthGuard } from "@/src/components/auth";

type LoanType = {
  id: string;
  title: string;
  description: string;
  rate: number;
  dark?: boolean;
};

export default function page() {
  return (
    <div>
      
    </div>
  )
}