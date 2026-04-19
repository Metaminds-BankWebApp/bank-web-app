export interface AccountVerificationResponse {
  exists: boolean;
  accountId: number | null;
  status: string;
  accountType: string | null;
  message: string;
}
