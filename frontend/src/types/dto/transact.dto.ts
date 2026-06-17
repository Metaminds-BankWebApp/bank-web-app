export type CreateTransactionRequest = {
  receiverAccountNo: string;
  receiverName: string;
  amount: number;
  remark: string;
  expenseTrackingEnabled?: boolean;
};

export type TransactionInitiateResponse = {
  transactionId: number;
  referenceNo: string;
  status: string;
  sentToEmail: string;
  otpExpiresAt: string;
  message: string;
};

export type VerifyTransactionOtpRequest = {
  referenceNo: string;
  otpCode: string;
};

export type ResendTransactionOtpRequest = {
  referenceNo: string;
};

export type TransactionResponse = {
  transactionId: number;
  bankCustomerId: number;
  senderAccountNo: string;
  receiverAccountNo: string;
  receiverName: string;
  amount: number;
  remark: string;
  referenceNo: string;
  status: string;
  otpVerified: boolean;
  expenseTrackingEnabled: boolean;
  failureReason?: string | null;
  transactionDate: string;
};

export type CurrentBalanceResponse = {
  accountNumber: string;
  currentBalance: number;
};

export type TransactDashboardSummaryResponse = {
  accountNumber: string;
  currentBalance: number;
  totalTransactions: number;
  totalSent: number;
  totalReceived: number;
  timeline: {
    labels: string[];
    values: number[];
  };
  transactionStatus: {
    successCount: number;
    failedCount: number;
    pendingOtpCount: number;
    cancelledCount: number;
  };
  otpStatus: {
    sentCount: number;
    verifiedCount: number;
    expiredCount: number;
    failedCount: number;
  };
  savedBeneficiaries: number;
  recentTransactions: Array<{
    transactionId: number;
    referenceNo: string;
    transactionDate: string;
    direction: "SENT" | "RECEIVED" | string;
    counterpartyAccountNo: string;
    counterpartyName: string;
    amount: number;
    status: string;
    remark: string;
  }>;
};

export type CreateBeneficiaryRequest = {
  beneficiaryAccountNo: string;
  nickName: string;
  remark: string;
};

export type BeneficiaryResponse = {
  beneficiaryId: number;
  bankCustomerId: number;
  beneficiaryAccountNo: string;
  nickName: string;
  remark: string;
  createdAt: string;
};
