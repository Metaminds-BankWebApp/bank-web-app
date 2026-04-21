export type BranchStatus = "ACTIVE" | "INACTIVE" | "MAINTENANCE";

export type BranchFormData = {
  branchName: string;
  branchId: string; // visible in frontend, maps to backend branchCode
  customers: string;
  officers: string;
  contact: string;
  email: string;
  address: string;
  status: BranchStatus;
};

export type BranchFormErrors = Partial<
  Record<"branchName" | "contact" | "email" | "address", string>
>;
