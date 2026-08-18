import { apiClient } from "@/src/api/client";
import { SUPPORT_ENDPOINTS } from "@/src/api/endpoints";

export type SupportRequestPayload = { category: string; subject: string; message: string };

export type SupportConversationStatus = "OPEN" | "IN_PROGRESS" | "CLOSED";

export type SupportUser = {
  userId: number | null;
  displayName: string;
  email: string | null;
  role: string | null;
};

export type SupportMessage = {
  messageId: number;
  sender: SupportUser;
  message: string;
  createdAt: string;
  readByCurrentUser: boolean;
  readByOtherParty: boolean;
};

export type SupportConversationSummary = {
  conversationId: number;
  category: string;
  subject: string;
  status: SupportConversationStatus;
  createdBy: SupportUser;
  lastMessagePreview: string | null;
  lastMessageAt: string;
  unreadMessageCount: number;
  createdAt: string;
  closedAt: string | null;
};

export type SupportConversation = Omit<SupportConversationSummary, "unreadMessageCount"> & {
  messages: SupportMessage[];
};

export async function submitSupportRequest(payload: SupportRequestPayload): Promise<void> {
  await apiClient.post(SUPPORT_ENDPOINTS.requests, payload);
}

export async function createSupportConversation(payload: SupportRequestPayload): Promise<SupportConversation> {
  const response = await apiClient.post<SupportConversation>(SUPPORT_ENDPOINTS.conversations, payload);
  return response.data;
}

export async function getMySupportConversations(): Promise<SupportConversationSummary[]> {
  const response = await apiClient.get<SupportConversationSummary[]>(SUPPORT_ENDPOINTS.conversations);
  return response.data;
}

export async function getAdminSupportConversations(): Promise<SupportConversationSummary[]> {
  const response = await apiClient.get<SupportConversationSummary[]>(SUPPORT_ENDPOINTS.adminConversations);
  return response.data;
}

export async function getSupportConversation(conversationId: number): Promise<SupportConversation> {
  const response = await apiClient.get<SupportConversation>(SUPPORT_ENDPOINTS.conversation(conversationId));
  return response.data;
}

export async function sendSupportMessage(conversationId: number, message: string): Promise<SupportConversation> {
  const response = await apiClient.post<SupportConversation>(SUPPORT_ENDPOINTS.messages(conversationId), { message });
  return response.data;
}

export async function markSupportConversationRead(conversationId: number): Promise<void> {
  await apiClient.patch(SUPPORT_ENDPOINTS.read(conversationId));
}

export async function updateSupportConversationStatus(
  conversationId: number,
  status: SupportConversationStatus,
): Promise<SupportConversation> {
  const response = await apiClient.patch<SupportConversation>(SUPPORT_ENDPOINTS.adminStatus(conversationId), { status });
  return response.data;
}

export async function permanentlyDeleteSupportConversation(conversationId: number): Promise<void> {
  await apiClient.delete(SUPPORT_ENDPOINTS.adminConversation(conversationId));
}
