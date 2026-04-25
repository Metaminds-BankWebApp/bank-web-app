export type BranchStatus = "ACTIVE" | "INACTIVE" | "MAINTENANCE";

export type BranchFormData = {
  branchName: string;
  contact: string;
  email: string;
  address: string;
  status: BranchStatus;
};

export type BranchFormErrors = Partial<
  Record<"branchName" | "contact" | "email" | "address", string>
>;
