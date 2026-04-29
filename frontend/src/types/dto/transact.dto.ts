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