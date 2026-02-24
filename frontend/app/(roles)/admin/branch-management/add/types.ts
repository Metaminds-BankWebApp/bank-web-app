export type BranchFormData = {
  branchName: string;
  branchId: string;
  customers: string;
  officers: string;
  contact: string;
  email: string;
  address: string;
  isActive: boolean;
};

export type BranchFormErrors = Partial<
  Record<"branchName" | "contact" | "email" | "address", string>
>;
