export type OfficerFormData = {
  firstName: string;
  lastName: string;
  nic: string;
  dob: string;
  province: string;
  username: string;
  password: string;
  contact: string;
  email: string;
  assignedBranch: string;
  address: string;
  isActive: boolean;
};

export type OfficerFormErrors = Partial<
  Record<
    "firstName" | "lastName" | "nic" | "dob" | "province" | "contact" | "email" | "assignedBranch" | "username" | "password",
    string
  >
>;
