export type WorkQueueCaseType = "RISK_REVIEW" | "PROFILE_COMPLETION";
export type WorkQueueCaseStatus = "OPEN" | "IN_PROGRESS" | "COMPLETED" | "ESCALATED";

export interface WorkQueueCaseResponse {
  userId: number;
  caseType: WorkQueueCaseType;
  status: WorkQueueCaseStatus;
  updatedByOfficerId: number;
  updatedAt: string;
}

export interface UpdateWorkQueueCaseRequest {
  userId: number;
  caseType: WorkQueueCaseType;
  status: WorkQueueCaseStatus;
}
