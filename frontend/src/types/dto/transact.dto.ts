export interface CreateBeneficiaryRequest {
  beneficiaryAccountNo: string;
  nickName: string;
  remark: string;
}

export interface BeneficiaryResponse {
  beneficiaryId: number;
  bankCustomerId: number;
  beneficiaryAccountNo: string;
  nickName: string;
  remark: string;
  createdAt: string;
}

export interface CreateTransactionRequest {
  receiverAccountNo: string;
  receiverName: string;
  amount: number;
  remark: string;
  expenseTrackingEnabled?: boolean;
}

export interface VerifyTransactionOtpRequest {
  referenceNo: string;
  otpCode: string;
}

export interface ResendTransactionOtpRequest {
  referenceNo: string;
}

export interface TransactionInitiateResponse {
  transactionId: number;
  referenceNo: string;
  status: string;
  sentToEmail: string;
  otpExpiresAt: string;
  message: string;
}

export interface TransactionResponse {
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
  failureReason: string | null;
  transactionDate: string;
}
