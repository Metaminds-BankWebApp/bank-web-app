export type OfficerFormData = {
  officerName: string;
  officerId: string;
  username: string;
  password: string;
  contact: string;
  email: string;
  assignedBranch: string;
  address: string;
  isActive: boolean;
};

export type OfficerFormErrors = Partial<
  Record<"officerName" | "contact" | "email" | "assignedBranch" | "username" | "password", string>
>;
