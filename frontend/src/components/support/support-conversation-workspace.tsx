"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Check, CircleAlert, MessageCircleMore, Plus, Send, Trash2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { ConfirmationModal } from "@/src/components/ui/confirmation-modal";
import { Input } from "@/src/components/ui/input";
import PopupModal from "@/src/components/ui/popup-modal";
import { toApiError } from "@/src/api/client";
import {
  createSupportConversation,
  getAdminSupportConversations,
  getMySupportConversations,
  getSupportConversation,
  permanentlyDeleteSupportConversation,
  sendSupportMessage,
  type SupportConversation,
  type SupportConversationStatus,
  type SupportConversationSummary,
  updateSupportConversationStatus,
} from "@/src/api/support/support.service";
import { cn } from "@/src/lib/utils";

type SupportConversationWorkspaceProps = {
  category?: string;
  admin?: boolean;
};

const POLL_INTERVAL_MS = 15_000;

const statusClasses: Record<SupportConversationStatus, string> = {
  OPEN: "bg-sky-100 text-sky-800",
  IN_PROGRESS: "bg-amber-100 text-amber-800",
  CLOSED: "bg-slate-200 text-slate-700",
};

function formatStatus(status: SupportConversationStatus): string {
  return status === "IN_PROGRESS" ? "In progress" : status.charAt(0) + status.slice(1).toLowerCase();
}

function formatDateTime(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(date);
}

function isAdminSender(role: string | null): boolean {
  return role === "ADMIN";
}

export function SupportConversationWorkspace({ category, admin = false }: SupportConversationWorkspaceProps) {
  const [conversations, setConversations] = useState<SupportConversationSummary[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<SupportConversation | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingConversation, setIsLoadingConversation] = useState(false);
  const [error, setError] = useState("");
  const [newRequestOpen, setNewRequestOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<SupportConversation | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadInbox = useCallback(async (showLoading = false) => {
    if (showLoading) setIsLoading(true);
    try {
      const items = admin ? await getAdminSupportConversations() : await getMySupportConversations();
      setConversations(items);
      setError("");
    } catch (loadError) {
      setError(toApiError(loadError).message);
    } finally {
      if (showLoading) setIsLoading(false);
    }
  }, [admin]);

  const openConversation = useCallback(async (conversationId: number, showLoading = true) => {
    if (showLoading) setIsLoadingConversation(true);
    try {
      const conversation = await getSupportConversation(conversationId);
      setSelectedConversation(conversation);
      setSelectedId(conversationId);
      setConversations((current) => current.map((item) => (
        item.conversationId === conversationId ? { ...item, unreadMessageCount: 0, status: conversation.status } : item
      )));
      setError("");
    } catch (loadError) {
      setError(toApiError(loadError).message);
    } finally {
      if (showLoading) setIsLoadingConversation(false);
    }
  }, []);

  useEffect(() => {
    const requestedConversationId = Number(new URLSearchParams(window.location.search).get("conversationId"));
    if (Number.isSafeInteger(requestedConversationId) && requestedConversationId > 0) {
      void openConversation(requestedConversationId);
    }
  }, [openConversation]);

  useEffect(() => {
    void loadInbox(true);
  }, [loadInbox]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      void loadInbox(false);
      if (selectedId !== null) void openConversation(selectedId, false);
    }, POLL_INTERVAL_MS);
    return () => window.clearInterval(intervalId);
  }, [loadInbox, openConversation, selectedId]);

  const emptyText = admin
    ? "There are no support conversations yet. New customer and officer requests will appear here."
    : "You have no support conversations yet. Start one whenever you need help.";

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-200 bg-slate-50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-semibold text-[#063154]">
            <MessageCircleMore size={20} className="text-[#2F9D94]" />
            {admin ? "Support inbox" : "Your support conversations"}
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            {admin ? "All administrators can view and reply to these conversations." : "Messages are shared securely with the support team."}
          </p>
        </div>
        {!admin && (
          <Button className="bg-[#2F9D94] hover:bg-[#25847d]" onClick={() => setNewRequestOpen(true)}>
            <Plus size={16} /> New request
          </Button>
        )}
      </div>

      {error && <p role="alert" className="m-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}

      <div className="grid min-h-[520px] lg:grid-cols-[minmax(280px,0.85fr)_minmax(0,1.8fr)]">
        <aside className="border-b border-slate-200 bg-slate-50/60 lg:max-h-[640px] lg:overflow-y-auto lg:border-b-0 lg:border-r">
          {isLoading ? (
            <p className="p-5 text-sm text-slate-500">Loading support conversations...</p>
          ) : conversations.length === 0 ? (
            <p className="p-5 text-sm leading-6 text-slate-500">{emptyText}</p>
          ) : conversations.map((conversation) => (
            <button
              key={conversation.conversationId}
              type="button"
              onClick={() => void openConversation(conversation.conversationId)}
              className={cn(
                "w-full border-b border-slate-200 px-4 py-4 text-left transition hover:bg-white",
                selectedId === conversation.conversationId && "bg-white shadow-[inset_3px_0_0_#2F9D94]",
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <p className="line-clamp-1 font-semibold text-[#063154]">{conversation.subject}</p>
                {conversation.unreadMessageCount > 0 && (
                  <span className="min-w-5 rounded-full bg-[#2F9D94] px-1.5 py-0.5 text-center text-xs font-bold text-white">
                    {conversation.unreadMessageCount}
                  </span>
                )}
              </div>
              {admin && <p className="mt-1 line-clamp-1 text-xs text-slate-600">{conversation.createdBy.displayName} · {conversation.createdBy.email}</p>}
              <p className="mt-2 line-clamp-2 text-sm text-slate-500">{conversation.lastMessagePreview || "No messages"}</p>
              <div className="mt-3 flex items-center justify-between gap-2">
                <span className={cn("rounded-full px-2 py-1 text-xs font-semibold", statusClasses[conversation.status])}>
                  {formatStatus(conversation.status)}
                </span>
                <span className="text-xs text-slate-400">{formatDateTime(conversation.lastMessageAt)}</span>
              </div>
            </button>
          ))}
        </aside>

        <ConversationPanel
          conversation={selectedConversation}
          isLoading={isLoadingConversation}
          admin={admin}
          onConversationChange={(conversation) => {
            setSelectedConversation(conversation);
            void loadInbox(false);
          }}
          onDelete={() => selectedConversation && setDeleteTarget(selectedConversation)}
        />
      </div>

      {!admin && category && (
        <NewRequestModal
          open={newRequestOpen}
          category={category}
          onClose={() => setNewRequestOpen(false)}
          onCreated={(conversation) => {
            setNewRequestOpen(false);
            setSelectedConversation(conversation);
            setSelectedId(conversation.conversationId);
            void loadInbox(false);
          }}
        />
      )}

      <ConfirmationModal
        open={deleteTarget !== null}
        title="Permanently delete this conversation?"
        message="This permanently removes the conversation, every message, and all read history. It cannot be restored."
        confirmLabel="Delete permanently"
        isProcessing={isDeleting}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={async () => {
          if (!deleteTarget) return;
          setIsDeleting(true);
          try {
            await permanentlyDeleteSupportConversation(deleteTarget.conversationId);
            setDeleteTarget(null);
            setSelectedConversation(null);
            setSelectedId(null);
            await loadInbox(false);
          } catch (deleteError) {
            setError(toApiError(deleteError).message);
          } finally {
            setIsDeleting(false);
          }
        }}
      />
    </section>
  );
}

function ConversationPanel({
  conversation,
  isLoading,
  admin,
  onConversationChange,
  onDelete,
}: {
  conversation: SupportConversation | null;
  isLoading: boolean;
  admin: boolean;
  onConversationChange: (conversation: SupportConversation) => void;
  onDelete: () => void;
}) {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setMessage("");
    setError("");
  }, [conversation?.conversationId]);

  const statusAction = useMemo(() => {
    if (!conversation || !admin) return null;
    return conversation.status === "CLOSED"
      ? { status: "IN_PROGRESS" as const, label: "Reopen" }
      : { status: "CLOSED" as const, label: "Close conversation" };
  }, [admin, conversation]);

  if (isLoading) return <div className="flex min-h-80 items-center justify-center text-sm text-slate-500">Loading conversation...</div>;
  if (!conversation) return <div className="flex min-h-80 items-center justify-center px-6 text-center text-sm text-slate-500">Select a conversation to read and reply.</div>;

  const send = async () => {
    if (!message.trim() || isSending) return;
    setIsSending(true);
    setError("");
    try {
      const updated = await sendSupportMessage(conversation.conversationId, message);
      setMessage("");
      onConversationChange(updated);
    } catch (sendError) {
      setError(toApiError(sendError).message);
    } finally {
      setIsSending(false);
    }
  };

  const changeStatus = async () => {
    if (!statusAction || isUpdatingStatus) return;
    setIsUpdatingStatus(true);
    setError("");
    try {
      onConversationChange(await updateSupportConversationStatus(conversation.conversationId, statusAction.status));
    } catch (statusError) {
      setError(toApiError(statusError).message);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  return (
    <div className="flex min-w-0 flex-col">
      <header className="border-b border-slate-200 px-4 py-4 sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-semibold text-[#063154]">{conversation.subject}</h3>
              <span className={cn("rounded-full px-2 py-1 text-xs font-semibold", statusClasses[conversation.status])}>{formatStatus(conversation.status)}</span>
            </div>
            <p className="mt-1 text-sm text-slate-600">
              {admin ? `${conversation.createdBy.displayName} · ${conversation.createdBy.email}` : conversation.category}
            </p>
          </div>
          {admin && (
            <div className="flex gap-2">
              {statusAction && <Button variant="outline" size="sm" disabled={isUpdatingStatus} onClick={() => void changeStatus()}>{statusAction.label}</Button>}
              <Button variant="outline" size="sm" className="border-red-200 text-red-700 hover:bg-red-50" onClick={onDelete}>
                <Trash2 size={15} /> Delete
              </Button>
            </div>
          )}
        </div>
      </header>

      <div className="min-h-72 flex-1 space-y-4 overflow-y-auto bg-slate-50/50 p-4 sm:max-h-[400px] sm:p-6">
        {conversation.messages.map((item) => {
          const ownSide = admin ? isAdminSender(item.sender.role) : !isAdminSender(item.sender.role);
          return (
            <article key={item.messageId} className={cn("flex", ownSide ? "justify-end" : "justify-start")}>
              <div className={cn("max-w-[85%] rounded-2xl px-4 py-3 shadow-sm", ownSide ? "rounded-br-sm bg-[#063154] text-white" : "rounded-bl-sm border border-slate-200 bg-white text-slate-800")}>
                <p className={cn("mb-1 text-xs font-semibold", ownSide ? "text-white/75" : "text-[#2F9D94]")}>{item.sender.displayName}</p>
                <p className="whitespace-pre-wrap break-words text-sm leading-6">{item.message}</p>
                <div className={cn("mt-2 flex items-center justify-end gap-1 text-[11px]", ownSide ? "text-white/65" : "text-slate-400")}>
                  <span>{formatDateTime(item.createdAt)}</span>
                  {ownSide && item.readByOtherParty && <><Check size={13} /> <span>Read</span></>}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="border-t border-slate-200 bg-white p-4 sm:p-6">
        {conversation.status === "CLOSED" && <p className="mb-3 flex items-center gap-2 rounded-lg bg-slate-100 p-3 text-sm text-slate-600"><CircleAlert size={16} /> Replying will reopen this conversation.</p>}
        {error && <p role="alert" className="mb-3 text-sm text-red-700">{error}</p>}
        <div className="flex items-end gap-3">
          <textarea
            className="min-h-20 flex-1 resize-y rounded-lg border border-slate-300 p-3 text-sm outline-none transition focus:border-[#2F9D94] focus:ring-2 focus:ring-[#2F9D94]/20"
            placeholder="Write a reply. Never include passwords, OTPs, or full card details."
            maxLength={4000}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
          <Button className="bg-[#2F9D94] hover:bg-[#25847d]" disabled={isSending || !message.trim()} onClick={() => void send()}>
            <Send size={16} /> {isSending ? "Sending" : "Send"}
          </Button>
        </div>
      </div>
    </div>
  );
}

function NewRequestModal({
  open,
  category,
  onClose,
  onCreated,
}: {
  open: boolean;
  category: string;
  onClose: () => void;
  onCreated: (conversation: SupportConversation) => void;
}) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const create = async () => {
    if (!subject.trim() || !message.trim()) {
      setError("Add a subject and message.");
      return;
    }
    setIsCreating(true);
    setError("");
    try {
      const conversation = await createSupportConversation({ category, subject, message });
      setSubject("");
      setMessage("");
      onCreated(conversation);
    } catch (createError) {
      setError(toApiError(createError).message);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <PopupModal open={open} onOpenChange={(nextOpen) => !nextOpen && onClose()} title="Start a support conversation">
      <div className="space-y-3">
        <p className="text-sm text-slate-600">Category: <span className="font-semibold text-[#063154]">{category}</span></p>
        <Input placeholder="Subject" maxLength={160} value={subject} onChange={(event) => setSubject(event.target.value)} />
        <textarea
          className="min-h-36 w-full rounded-md border border-slate-300 p-3 text-sm outline-none focus:border-[#2F9D94] focus:ring-2 focus:ring-[#2F9D94]/20"
          placeholder="Describe the issue without sensitive information"
          maxLength={4000}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <p className="text-xs text-slate-500">Never include passwords, OTPs, full account numbers, or card details.</p>
        {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button className="bg-[#2F9D94]" disabled={isCreating} onClick={() => void create()}>{isCreating ? "Starting..." : "Start conversation"}</Button>
        </div>
      </div>
    </PopupModal>
  );
}
