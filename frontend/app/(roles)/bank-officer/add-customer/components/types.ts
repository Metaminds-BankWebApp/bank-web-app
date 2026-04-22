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
  incomeType: string;
  salaryType: string;
  employmentType: string;
  contractDurationMonths: string;
  monthlySalary: string;
  businessIncome: string;
  incomeStability: string;
  incomes: {
    type: "Salary Worker" | "Business Person";
    amount: string;
    salaryType?: string;
    employmentType?: string;
    contractDurationMonths?: string;
    incomeStability?: string;
  }[];
  
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
  cribRequestType?: string;
  cribRequestStatus?: string;
  cribReportStatus?: string;
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
  incomeType: "Salary Worker",
  salaryType: "Fixed",
  employmentType: "Permanent",
  contractDurationMonths: "",
  monthlySalary: "",
  businessIncome: "",
  incomeStability: "Stable",
  incomes: [],
  loans: [],
  creditCards: [],
  liabilities: [],
  missedPaymentsLast12Months: 0,
  cribRequestType: "FULL_REPORT",
  cribRequestStatus: "PENDING",
  cribReportStatus: "NOT_REQUESTED",
};

export interface StepProps {
  formData: CustomerFormData;
  updateFormData: (data: Partial<CustomerFormData>) => void;
  onNext: () => void;
  onBack: () => void;
  onSaveDraftStepOne?: () => Promise<void>;
  onContinueStepOne?: () => Promise<void>;
  onLookupCustomerByNic?: () => Promise<void>;
  isSavingDraftStepOne?: boolean;
  isSubmittingStepOne?: boolean;
  isLookingUpCustomerByNic?: boolean;
  hasExistingCustomerMatch?: boolean;
  serverStepOneErrors?: Partial<Record<"nic" | "email" | "username", string>>;
  onClearServerStepOneError?: (field: "nic" | "email" | "username" | "bankAccount") => void;
  onVerifyAccount?: () => Promise<void>;
  isVerifyingAccount?: boolean;
  onSaveCribLinkingStep?: (requestType: string) => Promise<unknown>;
  isSavingCribLinkingStep?: boolean;
  onSaveCribRequestStep?: (requestType: string) => Promise<unknown>;
  onSaveCribRetrievalStep?: (payload?: { requestStatus?: string; reportStatus?: string }) => Promise<unknown>;
  onCompleteCribReviewStep?: () => Promise<unknown>;
  isSavingCribRequestStep?: boolean;
  isSavingCribRetrievalStep?: boolean;
  isCompletingCribReviewStep?: boolean;
}
