export interface BankCustomerSummaryResponse {
  userId: number;
  customerId: string;
  fullName: string;
  nic: string;
  email: string;
  phone: string;
  status: string;
  lastUpdated: string | null;
}
