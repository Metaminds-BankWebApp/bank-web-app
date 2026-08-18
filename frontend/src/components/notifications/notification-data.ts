import type { NotificationDto, NotificationSeverity } from "@/src/types/dto/notification.dto";

export type RoleSegment = "admin" | "bank-officer" | "bank-customer" | "public-customer";
export type FeatureSegment = "creditlens" | "transact" | "loansense" | "spendiq";
export type NotificationKind = "info" | "success" | "warning" | "alert";

export type NotificationItem = NotificationDto & {
  kind: NotificationKind;
  time: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export type NotificationRouteContext = {
  roleSegment: RoleSegment | null;
  featureSegment: FeatureSegment | null;
  roleLabel: string;
  moduleLabel: string;
  moduleRootPath: string | null;
  profilePath: string | null;
  notificationsPath: string | null;
};

const ROLE_LABELS: Record<RoleSegment, string> = {
  admin: "Admin",
  "bank-officer": "Bank Officer",
  "bank-customer": "Bank Customer",
  "public-customer": "Public Customer",
};

const MODULE_LABELS: Record<FeatureSegment, string> = {
  creditlens: "CreditLens",
  transact: "Transact",
  loansense: "LoanSense",
  spendiq: "SpendIQ",
};

function isFeatureSegment(value: string | undefined): value is FeatureSegment {
  return Boolean(value && ["creditlens", "transact", "loansense", "spendiq"].includes(value));
}

export function buildNotificationRouteContext(
  roleSegment: RoleSegment | null,
  featureSegment: FeatureSegment | null = null
): NotificationRouteContext {
  if (!roleSegment) {
    return {
      roleSegment: null,
      featureSegment: null,
      roleLabel: "User",
      moduleLabel: "Dashboard",
      moduleRootPath: null,
      profilePath: null,
      notificationsPath: null,
    };
  }

  if (roleSegment === "admin") {
    return {
      roleSegment,
      featureSegment: null,
      roleLabel: ROLE_LABELS.admin,
      moduleLabel: "Admin Workspace",
      moduleRootPath: "/admin",
      profilePath: "/admin/profile",
      notificationsPath: "/admin/notifications",
    };
  }

  if (roleSegment === "bank-officer") {
    return {
      roleSegment,
      featureSegment: null,
      roleLabel: ROLE_LABELS["bank-officer"],
      moduleLabel: "Officer Workspace",
      moduleRootPath: "/bank-officer",
      profilePath: "/bank-officer/profile",
      notificationsPath: "/bank-officer/notifications",
    };
  }

  if (featureSegment) {
    const moduleRootPath = `/${roleSegment}/${featureSegment}`;
    return {
      roleSegment,
      featureSegment,
      roleLabel: ROLE_LABELS[roleSegment],
      moduleLabel: MODULE_LABELS[featureSegment],
      moduleRootPath,
      profilePath: `${moduleRootPath}/profile`,
      notificationsPath: `${moduleRootPath}/notifications`,
    };
  }

  return {
    roleSegment,
    featureSegment: null,
    roleLabel: ROLE_LABELS[roleSegment],
    moduleLabel: "Dashboard",
    moduleRootPath: `/${roleSegment}`,
    profilePath: null,
    notificationsPath: null,
  };
}

export function resolveNotificationRouteContext(pathname: string | null): NotificationRouteContext {
  if (!pathname) return buildNotificationRouteContext(null, null);

  const segments = pathname.split("/").filter(Boolean);
  const roleSegment = segments[0] as RoleSegment | undefined;
  if (!roleSegment || !["admin", "bank-officer", "bank-customer", "public-customer"].includes(roleSegment)) {
    return buildNotificationRouteContext(null, null);
  }

  if (roleSegment === "bank-customer" || roleSegment === "public-customer") {
    return buildNotificationRouteContext(roleSegment, isFeatureSegment(segments[1]) ? segments[1] : null);
  }

  return buildNotificationRouteContext(roleSegment, null);
}

export function toNotificationItem(
  notification: NotificationDto,
  context: NotificationRouteContext
): NotificationItem {
  return {
    ...notification,
    kind: severityToKind(notification.severity),
    time: formatRelativeTime(notification.createdAt),
    ctaHref: resolveActionHref(notification, context),
    ctaLabel: resolveActionLabel(notification.actionKey),
  };
}

function severityToKind(severity: NotificationSeverity): NotificationKind {
  return severity.toLowerCase() as NotificationKind;
}

function resolveActionHref(notification: NotificationDto, context: NotificationRouteContext): string | undefined {
  const role = context.roleSegment;
  const metadata = notification.actionMetadata ?? {};
  const customerId = metadata.customerId;

  switch (notification.actionKey) {
    case "SUPPORT_CONVERSATION":
      return resolveSupportConversationHref(role, metadata.category, metadata.conversationId);
    case "ADMIN_USER_MANAGEMENT":
      return "/admin/user-management";
    case "ADMIN_LOAN_POLICY":
      return "/admin/policy-management";
    case "OFFICER_CUSTOMER_PROFILE":
      return customerId ? `/bank-officer/credit-analysis/customer/${customerId}` : "/bank-officer/all-customers";
    case "OFFICER_CREDITLENS_DASHBOARD":
      return "/bank-officer/credit-analysis";
    case "OFFICER_LOANSENSE_DASHBOARD":
      return "/bank-officer/all-customers";
    case "CREDITLENS_RESULT":
      return role === "public-customer" || role === "bank-customer" ? `/${role}/creditlens` : undefined;
    case "LOANSENSE_RESULT":
    case "LOANSENSE_CURRENT":
      return role === "bank-customer" ? "/bank-customer/loansense" : undefined;
    case "SPENDIQ_EXPENSE":
      return role === "public-customer" || role === "bank-customer" ? `/${role}/spendiq/history` : undefined;
    case "SPENDIQ_BUDGET":
      return role === "public-customer" || role === "bank-customer" ? `/${role}/spendiq/budget` : undefined;
    case "PUBLIC_FINANCIAL_DETAILS":
      return "/public-customer/application";
    case "DASHBOARD":
      return context.moduleRootPath ?? undefined;
    default:
      return context.notificationsPath ?? context.moduleRootPath ?? undefined;
  }
}

function resolveSupportConversationHref(
  role: RoleSegment | null,
  category?: string,
  conversationId?: string,
): string | undefined {
  let path: string | undefined;
  if (role === "admin") path = "/admin/support";
  if (role === "bank-officer") path = "/bank-officer/support";
  if (role === "bank-customer") {
    if (category === "Transact") path = "/bank-customer/transact/help";
    if (category === "SpendIQ") path = "/bank-customer/spendiq/help";
    if (category === "LoanSense") path = "/bank-customer/loansense/help";
    if (category === "CreditLens") path = "/bank-customer/creditlens/help";
    path ??= "/bank-customer/creditlens/help";
  }
  if (role === "public-customer") {
    if (category === "SpendIQ") path = "/public-customer/spendiq/help";
    if (category === "CreditLens") path = "/public-customer/creditlens/help";
    path ??= "/public-customer/creditlens/help";
  }
  if (!path) return role ? `/${role}` : undefined;
  return conversationId ? `${path}?conversationId=${encodeURIComponent(conversationId)}` : path;
}

function resolveActionLabel(actionKey: string | null): string | undefined {
  if (!actionKey) return undefined;
  if (actionKey.includes("USER_MANAGEMENT")) return "Open User Management";
  if (actionKey.includes("LOAN_POLICY")) return "Open Policy Management";
  if (actionKey.includes("CUSTOMER_PROFILE")) return "Open Customer";
  if (actionKey.includes("CREDITLENS")) return "Open CreditLens";
  if (actionKey.includes("LOANSENSE")) return "Open LoanSense";
  if (actionKey.includes("SPENDIQ")) return "Open SpendIQ";
  if (actionKey === "SUPPORT_CONVERSATION") return "Open support conversation";
  if (actionKey === "PUBLIC_FINANCIAL_DETAILS") return "Fill Financial Details";
  return "Open";
}

function formatRelativeTime(value: string): string {
  const createdAt = new Date(value);
  const elapsedSeconds = Math.max(0, Math.floor((Date.now() - createdAt.getTime()) / 1000));
  if (!Number.isFinite(elapsedSeconds)) return "Recently";
  if (elapsedSeconds < 60) return "Just now";
  const minutes = Math.floor(elapsedSeconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return createdAt.toLocaleDateString();
}
