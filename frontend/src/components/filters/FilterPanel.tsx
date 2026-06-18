"use client";

import React from "react";
import { Input } from "@/src/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Button } from "@/src/components/ui/button";

type Props = {
  search: string;
  onSearchChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  onReset: () => void;
};

export default function FilterPanel({ search, onSearchChange, status, onStatusChange, sortBy, onSortChange, onReset }: Props) {
  // This small, reusable panel emits the filter state back to the parent
  // component. The parent controls the debounced server fetch and the
  // final rendering of rows.
  return (
    <div className="px-6 pb-4 grid grid-cols-1 gap-3 border-b border-slate-100 md:grid-cols-3">
      <div>
        <Input
          placeholder="Search by name, NIC..."
          className="bg-slate-50 border-slate-200"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <Select value={status} onValueChange={(value) => onStatusChange(value)}>
        <SelectTrigger className="bg-slate-50 border-slate-200">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value="ACTIVE">Active</SelectItem>
          <SelectItem value="INACTIVE">Inactive</SelectItem>
          <SelectItem value="DRAFT">Draft</SelectItem>
          <SelectItem value="PENDING_STEP_2">Pending Step 2</SelectItem>
          <SelectItem value="PENDING_STEP_3">Pending Step 3</SelectItem>
          <SelectItem value="PENDING_STEP_4">Pending Step 4</SelectItem>
          <SelectItem value="PENDING_STEP_5">Pending Step 5</SelectItem>
          <SelectItem value="PENDING_STEP_6">Pending Step 6</SelectItem>
          <SelectItem value="PENDING_STEP_7">Pending Step 7</SelectItem>
          <SelectItem value="COMPLETED">Completed</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex items-center gap-2">
        <Select value={sortBy} onValueChange={(value) => onSortChange(value)}>
          <SelectTrigger className="bg-slate-50 border-slate-200">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="updated-desc">Newest Updated</SelectItem>
            <SelectItem value="updated-asc">Oldest Updated</SelectItem>
            <SelectItem value="score-desc">Credit Score: High to Low</SelectItem>
            <SelectItem value="score-asc">Credit Score: Low to High</SelectItem>
            <SelectItem value="name-asc">Name: A to Z</SelectItem>
            <SelectItem value="name-desc">Name: Z to A</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" className="border-slate-200 text-slate-600" onClick={onReset}>
          Reset Filters
        </Button>
      </div>
    </div>
  );
}
