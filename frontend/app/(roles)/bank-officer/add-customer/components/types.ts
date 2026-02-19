export interface CustomerFormData {
  // Personal Details
  fullName: string;
  nic: string;
  dob: string;
  email: string;
  mobile: string;
  username: string;
  
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
  fullName: "",
  nic: "",
  dob: "",
  email: "",
  mobile: "",
  username: "",
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
}
