export interface CustomerFormData {
  // Personal Details
  firstName: string;
  lastName: string;
  nic: string;
  dob: string;
  email: string;
  mobile: string;
  province: string;
  address: string;
  username: string;
  password: string;
  confirmPassword: string;
  bankAccount: string;
  isAccountVerified: boolean;
  accountVerificationStatus: string;
  accountVerificationMessage: string;
  
  // Financial Data
  employmentType: string;
  monthlySalary: string;
  businessIncome: string;
  
  // Loans
  loans: {
    type: string;
    monthlyEmi: string;
    remainingBalance: string;
  }[];
  
  // Credit Cards
  creditCards: {
    issuer: string;
    limit: string;
    outstandingBalance: string;
  }[];
  
  // Liabilities
  liabilities: {
    category: string;
    monthlyAmount: string;
  }[];
  
  missedPaymentsLast12Months: number;
  creditScore?: number;
  inquiryCount?: number;
  activeLoansCount?: number;
  totalActiveLoanValue?: number;
}

export const initialFormData: CustomerFormData = {
  firstName: "",
  lastName: "",
  nic: "",
  dob: "",
  email: "",
  mobile: "",
  province: "",
  address: "",
  username: "",
  password: "",
  confirmPassword: "",
  bankAccount: "",
  isAccountVerified: false,
  accountVerificationStatus: "",
  accountVerificationMessage: "",
  employmentType: "Permanent",
  monthlySalary: "",
  businessIncome: "",
  loans: [],
  creditCards: [],
  liabilities: [],
  missedPaymentsLast12Months: 0,
};

export interface StepProps {
  formData: CustomerFormData;
  updateFormData: (data: Partial<CustomerFormData>) => void;
  onNext: () => void;
  onBack: () => void;
  onSaveDraftStepOne?: () => Promise<void>;
  onContinueStepOne?: () => Promise<void>;
  isSavingDraftStepOne?: boolean;
  isSubmittingStepOne?: boolean;
  serverStepOneErrors?: Partial<Record<"nic" | "email" | "username", string>>;
  onClearServerStepOneError?: (field: "nic" | "email" | "username") => void;
  onVerifyAccount?: () => Promise<void>;
  isVerifyingAccount?: boolean;
}
