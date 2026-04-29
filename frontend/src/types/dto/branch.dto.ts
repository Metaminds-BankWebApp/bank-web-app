export type BranchStatus = "ACTIVE" | "INACTIVE" | "MAINTENANCE";

export type BranchResponse = {
  branchId: number;
  branchCode: string;
  branchName: string;
  branchEmail: string | null;
  branchPhone: string | null;
  address: string | null;
  status: BranchStatus | string | null;
  updatedAt: string | null;
  officerCount: number | null;
  customerCount: number | null;
};

export type BranchRequest = {
  branchName: string;
  branchEmail: string;
  branchPhone: string;
  address: string;
  status: BranchStatus;
};
