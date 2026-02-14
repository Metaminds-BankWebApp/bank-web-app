export type ApiErrorCode =
  | "NETWORK_ERROR"
  | "TIMEOUT"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "VALIDATION_ERROR"
  | "SERVER_ERROR"
  | "UNKNOWN_ERROR";

export type ApiErrorDetails = Record<string, unknown>;

export class ApiError extends Error {
  public readonly code: ApiErrorCode;
  public readonly status?: number;
  public readonly details?: ApiErrorDetails;

  constructor(params: {
    message: string;
    code: ApiErrorCode;
    status?: number;
    details?: ApiErrorDetails;
  }) {
    super(params.message);
    this.name = "ApiError";
    this.code = params.code;
    this.status = params.status;
    this.details = params.details;
  }
}
