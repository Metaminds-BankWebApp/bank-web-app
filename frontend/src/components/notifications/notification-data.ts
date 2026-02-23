"use client";

export type RoleSegment = "admin" | "bank-officer" | "bank-customer" | "public-customer";
export type FeatureSegment = "creditlens" | "transact" | "loansense" | "spendiq";
export type NotificationKind = "info" | "success" | "warning" | "alert";

export type NotificationItem = {
  id: string;
  title: string;
  message: string;
  time: string;
  kind: NotificationKind;
  unread: boolean;
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
  if (!pathname) {
    return buildNotificationRouteContext(null, null);
  }

  const segments = pathname.split("/").filter(Boolean);
  const roleSegment = segments[0] as RoleSegment | undefined;

  if (!roleSegment || !["admin", "bank-officer", "bank-customer", "public-customer"].includes(roleSegment)) {
    return buildNotificationRouteContext(null, null);
  }

  if (roleSegment === "bank-customer" || roleSegment === "public-customer") {
    const featureCandidate = segments[1];
    const featureSegment = isFeatureSegment(featureCandidate) ? featureCandidate : null;
    return buildNotificationRouteContext(roleSegment, featureSegment);
  }

  return buildNotificationRouteContext(roleSegment, null);
}

function withDefaults(items: Omit<NotificationItem, "id">[]): NotificationItem[] {
  return items.map((item, index) => ({ ...item, id: String(index + 1) }));
}

export function getNotificationsForContext(context: NotificationRouteContext): NotificationItem[] {
  const root = context.moduleRootPath ?? "/";

  if (context.roleSegment === "admin") {
    return withDefaults([
      {
        title: "Policy update pending approval",
        message: "A loan interest policy change is waiting for admin validation.",
        time: "5m ago",
        kind: "warning",
        unread: true,
        ctaLabel: "Open Policy Management",
        ctaHref: `${root}/policy-management`,
      },
      {
        title: "Audit event triggered",
        message: "Multiple failed login attempts detected for a branch user.",
        time: "18m ago",
        kind: "alert",
        unread: true,
        ctaLabel: "Review Audit Logs",
        ctaHref: `${root}/audit-logs`,
      },
      {
        title: "Officer profile update request",
        message: "A bank officer submitted changes requiring admin review.",
        time: "1h ago",
        kind: "info",
        unread: true,
        ctaLabel: "Open Officer Management",
        ctaHref: `${root}/bank-officer-management`,
      },
      {
        title: "User access role changed",
        message: "A customer role update was completed successfully.",
        time: "3h ago",
        kind: "success",
        unread: false,
        ctaLabel: "Open User Management",
        ctaHref: `${root}/user-management`,
      },
      {
        title: "Branch setup completed",
        message: "New branch metadata was synced with the core system.",
        time: "Yesterday",
        kind: "success",
        unread: false,
        ctaLabel: "Open Branch Management",
        ctaHref: `${root}/branch-management`,
      },
    ]);
  }

  if (context.roleSegment === "bank-officer") {
    return withDefaults([
      {
        title: "Customer evaluation assigned",
        message: "A new credit assessment was assigned to your queue.",
        time: "6m ago",
        kind: "info",
        unread: true,
        ctaLabel: "Open Credit Analysis",
        ctaHref: `${root}/credit-analysis`,
      },
      {
        title: "High-risk customer alert",
        message: "One customer crossed the risk threshold and needs follow-up.",
        time: "22m ago",
        kind: "alert",
        unread: true,
        ctaLabel: "Open All Customers",
        ctaHref: `${root}/all-customers`,
      },
      {
        title: "Transaction review requested",
        message: "Compliance flagged a transaction for manual verification.",
        time: "55m ago",
        kind: "warning",
        unread: true,
        ctaLabel: "Open Transactions",
        ctaHref: `${root}/transactions`,
      },
      {
        title: "Customer added successfully",
        message: "A new customer record has been created and validated.",
        time: "2h ago",
        kind: "success",
        unread: false,
        ctaLabel: "Open History",
        ctaHref: `${root}/history`,
      },
      {
        title: "Document check complete",
        message: "KYC verification completed for your latest onboarding.",
        time: "Yesterday",
        kind: "success",
        unread: false,
        ctaLabel: "Open Add Customer",
        ctaHref: `${root}/add-customer`,
      },
    ]);
  }

  if (context.featureSegment === "creditlens") {
    return withDefaults([
      {
        title: "Credit score updated",
        message: "Your credit risk score was recalculated with latest data.",
        time: "4m ago",
        kind: "info",
        unread: true,
        ctaLabel: "View Report",
        ctaHref: `${root}/report`,
      },
      {
        title: "Risk factor increased",
        message: "Credit utilization increased and may affect your score.",
        time: "17m ago",
        kind: "warning",
        unread: true,
        ctaLabel: "Open Insights",
        ctaHref: `${root}/insight`,
      },
      {
        title: "Trend alert detected",
        message: "A new monthly trend anomaly has been identified.",
        time: "1h ago",
        kind: "alert",
        unread: true,
        ctaLabel: "Open Trends",
        ctaHref: `${root}/trends`,
      },
      {
        title: "Report exported",
        message: "Your latest credit summary report was generated.",
        time: "3h ago",
        kind: "success",
        unread: false,
        ctaLabel: "View Report",
        ctaHref: `${root}/report`,
      },
      {
        title: "Profile verified",
        message: "Personal profile details were verified successfully.",
        time: "Yesterday",
        kind: "success",
        unread: false,
        ctaLabel: "Open Profile",
        ctaHref: `${root}/profile`,
      },
    ]);
  }

  if (context.featureSegment === "spendiq") {
    return withDefaults([
      {
        title: "Budget limit near threshold",
        message: "Food and Dining reached 85% of this month's budget.",
        time: "3m ago",
        kind: "warning",
        unread: true,
        ctaLabel: "Open Budget",
        ctaHref: `${root}/budget`,
      },
      {
        title: "New expense captured",
        message: "A recent card transaction was categorized automatically.",
        time: "14m ago",
        kind: "info",
        unread: true,
        ctaLabel: "Open History",
        ctaHref: `${root}/history`,
      },
      {
        title: "Category spike detected",
        message: "Shopping spend increased compared to last week.",
        time: "49m ago",
        kind: "alert",
        unread: true,
        ctaLabel: "Open Category Analysis",
        ctaHref: `${root}/category`,
      },
      {
        title: "Expense synced",
        message: "Bank transactions were synced to SpendIQ successfully.",
        time: "2h ago",
        kind: "success",
        unread: false,
        ctaLabel: "Open Dashboard",
        ctaHref: root,
      },
      {
        title: "Monthly summary ready",
        message: "Your monthly summary is now available for review.",
        time: "Yesterday",
        kind: "info",
        unread: false,
        ctaLabel: "Open Summary",
        ctaHref: `${root}/summary`,
      },
    ]);
  }

  if (context.featureSegment === "loansense") {
    return withDefaults([
      {
        title: "Eligibility refreshed",
        message: "Your loan eligibility profile was updated successfully.",
        time: "6m ago",
        kind: "info",
        unread: true,
        ctaLabel: "Open Dashboard",
        ctaHref: root,
      },
      {
        title: "Pre-approved offer available",
        message: "A personal loan offer is now pre-approved for you.",
        time: "19m ago",
        kind: "success",
        unread: true,
        ctaLabel: "Open Personal Loan",
        ctaHref: `${root}/personal`,
      },
      {
        title: "Additional documents needed",
        message: "Education loan request needs additional proof documents.",
        time: "58m ago",
        kind: "warning",
        unread: true,
        ctaLabel: "Open Education Loan",
        ctaHref: `${root}/education`,
      },
      {
        title: "Rate change notice",
        message: "Loan policy rates changed for housing applications.",
        time: "3h ago",
        kind: "alert",
        unread: false,
        ctaLabel: "Open Housing Loan",
        ctaHref: `${root}/housing`,
      },
      {
        title: "History exported",
        message: "Loan eligibility history export completed.",
        time: "Yesterday",
        kind: "success",
        unread: false,
        ctaLabel: "Open History",
        ctaHref: `${root}/history`,
      },
    ]);
  }

  if (context.featureSegment === "transact") {
    return withDefaults([
      {
        title: "Transfer completed",
        message: "Your fund transfer was processed successfully.",
        time: "2m ago",
        kind: "success",
        unread: true,
        ctaLabel: "Open History",
        ctaHref: `${root}/history`,
      },
      {
        title: "Beneficiary added",
        message: "A new beneficiary was added to your transfer list.",
        time: "11m ago",
        kind: "info",
        unread: true,
        ctaLabel: "Open Beneficiary",
        ctaHref: `${root}/beneficiary`,
      },
      {
        title: "Transfer pending review",
        message: "A high-value transfer is under additional verification.",
        time: "39m ago",
        kind: "warning",
        unread: true,
        ctaLabel: "Open Transfer",
        ctaHref: `${root}/transfer`,
      },
      {
        title: "Security check passed",
        message: "Your latest transaction passed security validation.",
        time: "2h ago",
        kind: "success",
        unread: false,
        ctaLabel: "Open Dashboard",
        ctaHref: root,
      },
      {
        title: "Daily summary ready",
        message: "Your daily transfer summary is available now.",
        time: "Yesterday",
        kind: "info",
        unread: false,
        ctaLabel: "Open History",
        ctaHref: `${root}/history`,
      },
    ]);
  }

  return withDefaults([
    {
      title: "No new notifications",
      message: "You are all caught up for now.",
      time: "Just now",
      kind: "info",
      unread: false,
    },
  ]);
}
