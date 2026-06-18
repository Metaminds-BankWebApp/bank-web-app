export interface BankCustomerSummaryResponse {
  userId: number;
  customerId: string;
  fullName: string;
  nic: string;
  email: string;
  phone: string;
  status: string;
  lastUpdated: string | null;
  // Added from officer-specific endpoint: these values are provided by the
  // backend's credit evaluation service and should be treated as the
  // canonical values for filtering and sorting in the UI.
  riskLevel?: "LOW" | "MEDIUM" | "HIGH" | null;
  creditScore?: number | null;
}
